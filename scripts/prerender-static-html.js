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

const routes = [
  '/',
  '/pricing',
  '/schedule',
  '/equipment',
  '/equipment/reformer',
  '/equipment/tower-reformer',
  '/equipment/cadillac',
  '/equipment/wunda-chair',
  '/equipment/ladder-barrel',
  '/workouts/reformer-pilates',
  '/workouts/trx',
  '/workouts/functional-training',
  '/workouts/cardio',
  '/workouts/summer-shred-lab',
  '/congrats',
  '/instructors',
  '/trainer/elif',
  '/trainer/gokben',
  '/trainer/goknur',
  '/trainer/gulce',
  '/trainer/lal',
  '/trainer/nisan',
  '/academy',
  '/healthcare-providers',
  '/classpass-offer',
  '/pregnancy-pilates-amsterdam',
  '/private-pilates-amsterdam',
  '/trx-training-amsterdam',
  '/strength-training-amsterdam',
  '/blog',
  '/blog/prenatal-pilates-supporting-body-through-every-trimester',
  '/blog/pilates-for-men-strength-flexibility-athletic-performance',
  '/blog/pilates-prices-amsterdam-2026-complete-guide',
  '/blog/career-change-banker-to-pilates-instructor',
];

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
  return path.join(distDir, route.replace(/^\//, ''), 'index.html');
}

function shouldAllowRequest(url) {
  return (
    url.startsWith(baseUrl) ||
    url.startsWith('data:') ||
    url.startsWith('blob:')
  );
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

  try {
    browser = await launchBrowser();
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(60000);

    await page.setRequestInterception(true);
    page.on('request', (request) => {
      if (shouldAllowRequest(request.url())) {
        request.continue().catch(() => {});
        return;
      }
      request.abort().catch(() => {});
    });

    for (const route of routes) {
      const url = `${baseUrl}${route}`;
      await page.goto(url, { waitUntil: 'networkidle2' });
      await page.waitForSelector('#root *', { timeout: 30000 });
      const html = await page.content();
      const outputFile = outputPathForRoute(route);
      fs.mkdirSync(path.dirname(outputFile), { recursive: true });
      fs.writeFileSync(outputFile, html);
      console.log(`✓ Prerendered: ${route}`);
    }
  } finally {
    if (browser) {
      await browser.close();
    }
    await stopProcess(server);
  }
}

prerenderRoutes()
  .then(() => {
    console.log(`\n✅ Prerendered ${routes.length} routes to static HTML`);
  })
  .catch((error) => {
    console.error('\n❌ Static prerender failed:', error);
    process.exit(1);
  });
