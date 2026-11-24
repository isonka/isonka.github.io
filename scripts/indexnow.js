#!/usr/bin/env node
// IndexNow: tells Bing (and the other IndexNow search engines) which pt7.nl URLs a deploy changed, so they are
// re-crawled in days instead of weeks. ChatGPT search draws on Bing's index.
//
//   node scripts/indexnow.js changed <distDir> <outFile>   before the deploy: compares the new build with the live site
//                                                           and writes the changed URLs, one per line
//   node scripts/indexnow.js submit <urlFile>              after the deploy: sends those URLs to IndexNow
//
// No dependencies and no secrets: the key is public by design, and IndexNow checks it against public/<KEY>.txt.
// Neither mode ever fails the workflow; problems are reported as warnings.

import fs from 'node:fs';
import path from 'node:path';

const HOST = 'www.pt7.nl';
const SITE = `https://${HOST}`;
const KEY = 'dc2b01d8ef475dec6b1f09faa373d839';
const KEY_LOCATION = `${SITE}/${KEY}.txt`;
/** Files outside the sitemap that AI crawlers read. */
const TEXT_FILES = ['/llms.txt', '/llms-full.txt', '/index.md'];
const UA = 'pt7-indexnow (+https://www.pt7.nl/)';

const warn = (message) => console.log(`::warning::IndexNow: ${message}`);

async function get(url) {
  try {
    const res = await fetch(url, { headers: { 'user-agent': UA }, signal: AbortSignal.timeout(20_000) });
    return res.ok ? await res.text() : null;
  } catch {
    return null;
  }
}

const sitemapUrls = (xml) => [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1]);

/** What a search engine indexes: title, meta, canonical, JSON-LD and visible text. Asset hashes and scripts are ignored. */
function fingerprint(html) {
  const pick = (re) => [...html.matchAll(re)].map((m) => (m[1] ?? m[0]).trim()).join('\n');
  const body = (html.match(/<body[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html)
    .replace(/<(script|style|noscript|svg|template)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return [
    pick(/<title[^>]*>([\s\S]*?)<\/title>/gi),
    pick(/<meta[^>]*name="description"[^>]*>/gi),
    pick(/<link[^>]*rel="canonical"[^>]*>/gi),
    pick(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi),
    body,
  ].join('\n');
}

function builtFile(dist, url) {
  const p = new URL(url).pathname;
  return path.join(dist, p.endsWith('/') ? `${p}index.html` : p);
}

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (next < items.length) {
        const i = next++;
        out[i] = await fn(items[i]);
      }
    }),
  );
  return out;
}

async function changed(dist, outFile) {
  let urls = [];
  try {
    const newSitemap = fs.readFileSync(path.join(dist, 'sitemap.xml'), 'utf8');
    const pages = sitemapUrls(newSitemap).filter((u) => u.startsWith(`${SITE}/`));
    const texts = TEXT_FILES.filter((f) => fs.existsSync(path.join(dist, f))).map((f) => `${SITE}${f}`);

    const results = await mapLimit([...pages, ...texts], 8, async (url) => {
      const file = builtFile(dist, url);
      if (!fs.existsSync(file)) return null;
      const built = fs.readFileSync(file, 'utf8');
      const live = await get(url);
      if (live === null) return url; // new page, or the live site didn't answer
      const isHtml = file.endsWith('.html');
      return (isHtml ? fingerprint(built) !== fingerprint(live) : built !== live) ? url : null;
    });
    urls = results.filter(Boolean);

    // Pages dropped from the sitemap: IndexNow also wants removed URLs, so engines see the redirect or 404
    const liveSitemap = await get(`${SITE}/sitemap.xml`);
    if (liveSitemap) {
      const kept = new Set(pages);
      urls.push(...sitemapUrls(liveSitemap).filter((u) => u.startsWith(`${SITE}/`) && !kept.has(u)));
    }
  } catch (error) {
    warn(`could not compare the build with the live site (${error.message}); nothing will be sent`);
    urls = [];
  }
  urls = [...new Set(urls)];
  fs.writeFileSync(outFile, urls.length ? `${urls.join('\n')}\n` : '');
  console.log(`IndexNow: ${urls.length} changed URL(s)`);
  for (const u of urls) console.log(`  ${u}`);
}

async function submit(urlFile) {
  const urls = fs.existsSync(urlFile)
    ? fs
        .readFileSync(urlFile, 'utf8')
        .split('\n')
        .map((l) => l.trim())
        .filter((u) => u === SITE || u.startsWith(`${SITE}/`))
    : [];
  if (urls.length === 0) {
    console.log('IndexNow: nothing changed, nothing to send');
    return;
  }
  const live = await get(KEY_LOCATION);
  if (live?.trim() !== KEY) {
    warn(`${KEY_LOCATION} does not serve the key yet; nothing sent`);
    return;
  }
  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8', 'user-agent': UA },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls.slice(0, 10_000) }),
      signal: AbortSignal.timeout(30_000),
    });
    if (res.status === 200 || res.status === 202) {
      console.log(`IndexNow: sent ${urls.length} URL(s), HTTP ${res.status}`);
    } else {
      warn(`HTTP ${res.status} ${(await res.text()).slice(0, 300)}`);
    }
  } catch (error) {
    warn(`request failed (${error.message})`);
  }
}

const [mode, ...args] = process.argv.slice(2);
if (mode === 'changed' && args.length === 2) await changed(args[0], args[1]);
else if (mode === 'submit' && args.length === 1) await submit(args[0]);
else {
  console.error('usage: indexnow.js changed <distDir> <outFile> | submit <urlFile>');
  process.exit(1);
}
