import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';
import net from 'net';
import http from 'http';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const host = '127.0.0.1';
let baseUrl = '';

const manifestPath = path.join(projectRoot, '.routes-manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('✗ .routes-manifest.json not found — run `npm run routes:manifest` first.');
  process.exit(1);
}

// Routes with `prerender: false` in site/routes.ts are absent here on purpose:
// a page that redirects client-side would be snapshotted as its redirect target.
// generate-static-routes.js still emits a shell for those with the right canonical.
const routes = JSON.parse(fs.readFileSync(manifestPath, 'utf-8')).prerenderPaths;

function findAvailablePort(start = 4173) {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(findAvailablePort(start + 1));
      } else {
        reject(err);
      }
    });
    server.listen(start, host, () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
  });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function pingPreviewServer(url) {
  return new Promise((resolve) => {
    const req = http.get(url, (res) => {
      res.resume();
      resolve(res.statusCode === 200);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForPreviewServer(url, timeoutMs = 60000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    if (await pingPreviewServer(url)) {
      return;
    }
    await wait(500);
  }
  throw new Error(`Preview server did not become ready within ${timeoutMs}ms (${url})`);
}

function startPreviewServer(port) {
  return new Promise((resolve, reject) => {
    baseUrl = `http://${host}:${port}`;
    const server = spawn(
      process.platform === 'win32' ? 'npm.cmd' : 'npm',
      ['run', 'preview', '--', '--host', host, '--port', String(port), '--strictPort'],
      { cwd: projectRoot, stdio: ['ignore', 'ignore', 'pipe'] }
    );

    const stderrChunks = [];
    server.stderr.on('data', (data) => {
      stderrChunks.push(data.toString());
      if (stderrChunks.length > 40) stderrChunks.shift();
    });

    server.on('error', reject);
    server.on('exit', (code) => {
      const details = stderrChunks.join('').trim();
      reject(
        new Error(
          `Preview server exited before starting (code ${code ?? 'unknown'})` +
          (details ? `\n${details}` : '')
        )
      );
    });

    waitForPreviewServer(baseUrl)
      .then(() => resolve(server))
      .catch((error) => {
        server.kill('SIGTERM');
        reject(error);
      });
  });
}

function stopProcess(child, timeoutMs = 10000) {
  return new Promise((resolve) => {
    if (!child || child.exitCode !== null || child.killed) {
      resolve();
      return;
    }

    let done = false;
    const finish = () => {
      if (!done) {
        done = true;
        resolve();
      }
    };

    const timer = setTimeout(() => {
      try {
        child.kill('SIGKILL');
      } catch {
        // ignore
      }
      finish();
    }, timeoutMs);

    child.once('close', () => {
      clearTimeout(timer);
      finish();
    });

    try {
      child.kill('SIGTERM');
    } catch {
      clearTimeout(timer);
      finish();
    }
  });
}

function outputPathForRoute(route) {
  if (route === '/') return path.join(distDir, 'index.html');
  // Accept /path or /path/ — write to path/index.html for GH Pages
  const cleaned = route.replace(/^\//, '').replace(/\/$/, '');
  return path.join(distDir, cleaned, 'index.html');
}

function shouldAllowRequest(url) {
  return (
    url.startsWith(baseUrl) ||
    url.startsWith('data:') ||
    url.startsWith('blob:')
  );
}

// Text that must never reach a published snapshot. Each entry is a state that is
// true only inside the prerender sandbox (third-party requests are blocked) or
// only for a real visitor (per-visitor UI), never for a crawler.
const FORBIDDEN_SNIPPETS = [
  { needle: 'Booking calendar could not load', reason: 'MindBody widget error state' },
  { needle: 'pt7-consent-panel', reason: 'cookie consent dialog' },
  { needle: 'Unexpected Application Error', reason: 'router error boundary' },
];

/** Returns a list of problems; empty means the snapshot is publishable. */
function findSnapshotProblems(html) {
  const problems = [];

  const title = html.match(/<title>([\s\S]*?)<\/title>/i);
  if (!title || !title[1].trim()) {
    problems.push('missing or empty <title>');
  }

  const description = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  if (!description || !description[1].trim()) {
    problems.push('missing or empty meta description');
  }

  const canonicals = html.match(/<link[^>]+rel="canonical"[^>]*>/gi) ?? [];
  if (canonicals.length !== 1) {
    problems.push(`expected exactly 1 canonical link, found ${canonicals.length}`);
  } else if (!/href="https:\/\/www\.pt7\.nl\//.test(canonicals[0])) {
    problems.push(`canonical is not an absolute www.pt7.nl URL: ${canonicals[0]}`);
  }

  if (!/<h1[\s>]/i.test(html)) {
    problems.push('no <h1> in rendered output');
  }

  for (const { needle, reason } of FORBIDDEN_SNIPPETS) {
    if (html.includes(needle)) {
      problems.push(`contains ${reason} ("${needle}")`);
    }
  }

  return problems;
}

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: projectRoot, stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`${command} ${args.join(' ')} failed with exit code ${code ?? 'unknown'}`));
      }
    });
  });
}

function isMissingChromeError(error) {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes('Could not find Chrome');
}

async function launchBrowser() {
  const launchOptions = {
    headless: true,
    ...(process.env.CI === 'true'
      ? {
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        }
      : {}),
  };

  try {
    return await puppeteer.launch(launchOptions);
  } catch (error) {
    if (!isMissingChromeError(error)) {
      throw error;
    }
    console.log('ℹ️  Chrome for Puppeteer not found. Installing...');
    const npxCmd = process.platform === 'win32' ? 'npx.cmd' : 'npx';
    await runCommand(npxCmd, ['puppeteer', 'browsers', 'install', 'chrome']);
    console.log('ℹ️  Chrome installation complete. Retrying prerender...');
    return await puppeteer.launch(launchOptions);
  }
}

async function prerenderRoutes() {
  const previewPort = await findAvailablePort();
  const server = await startPreviewServer(previewPort);
  let browser;
  let successCount = 0;
  let skippedCount = 0;
  const invalid = [];

  try {
    browser = await launchBrowser();
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);

    // Tells the app it is being captured, so effect-driven UI (cookie banner,
    // third-party widgets, idle images, scroll reveals) stays at first-paint state.
    // See src/utils/prerender.ts.
    await page.evaluateOnNewDocument(() => {
      window.__PT7_PRERENDER__ = true;
    });

    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (shouldAllowRequest(request.url())) {
        request.continue().catch(() => {});
        return;
      }
      request.abort().catch(() => {});
    });

    for (const route of routes) {
      try {
        const url = `${baseUrl}${route}`;
        await page.goto(url, { waitUntil: 'networkidle2' });
        await page.waitForSelector('#root *', { timeout: 30000 });

        // Marks this HTML as safe to hydrate rather than re-render. src/main.tsx reads it.
        // Files without the marker (dev server, 404.html, rejected routes) still contain
        // the static fallback inside #root and must be rendered fresh.
        await page.evaluate(() => {
          document.getElementById('root')?.setAttribute('data-prerendered', 'true');
        });

        const html = await page.content();

        const problems = findSnapshotProblems(html);
        if (problems.length > 0) {
          invalid.push({ route, problems });
          console.warn(`✗ Rejected ${route}: ${problems.join('; ')}`);
          continue;
        }

        const outputFile = outputPathForRoute(route);
        fs.mkdirSync(path.dirname(outputFile), { recursive: true });
        fs.writeFileSync(outputFile, html);
        successCount += 1;
        console.log(`✓ Prerendered: ${route}`);
      } catch (error) {
        skippedCount += 1;
        const message = error instanceof Error ? error.message : String(error);
        console.warn(`⚠ Skipped prerender for ${route}: ${message}`);
      }
    }
  } finally {
    if (browser) {
      await browser.close();
    }
    await stopProcess(server);
  }

  if (invalid.length > 0) {
    console.error(`\n❌ ${invalid.length} route(s) produced unpublishable HTML:\n`);
    for (const { route, problems } of invalid) {
      console.error(`  ${route}`);
      for (const problem of problems) {
        console.error(`    - ${problem}`);
      }
    }
    console.error('\nThe existing file for each rejected route was left untouched.');
  }

  if (skippedCount > 0) {
    console.error(`\n❌ Prerender skipped ${skippedCount} route(s) (render or navigation failure).`);
  }

  if (invalid.length > 0 || skippedCount > 0) {
    console.error(`\n${successCount}/${routes.length} routes written.`);
    process.exit(1);
  }

  console.log(`\n✅ Prerendered ${successCount}/${routes.length} routes.`);
}

prerenderRoutes()
  .then(() => {
    // Ensure CI does not wait on lingering event-loop handles.
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Static prerender failed:', error);
    process.exit(1);
  });
