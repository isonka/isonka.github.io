// Step 2: record what is live on www.pt7.nl right now (title, description,
// H1, canonical, content links...). Comparing weekly snapshots tells the
// evaluator when each page changed, whether a human or the agent did it.

import crypto from 'crypto';
import path from 'path';
import { pathToFileURL } from 'url';
import { config, dirs } from './config.js';
import { normalizePath, today, writeJson } from './lib/util.js';

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));

const text = (html) =>
  decode(html.replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i'));
  return m ? decode(m[2] ?? m[3]) : null;
};

const findTag = (html, re) => (html.match(re) || [null])[0];

export function parsePage(html) {
  const head = html.split(/<\/head>/i)[0];
  const title = text((head.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ''])[1]);
  const description = attr(findTag(head, /<meta[^>]+name=["']description["'][^>]*>/i) || '', 'content');
  const canonical = attr(findTag(head, /<link[^>]+rel=["']canonical["'][^>]*>/i) || '', 'href');
  const robots = attr(findTag(head, /<meta[^>]+name=["']robots["'][^>]*>/i) || '', 'content');
  const lang = attr(findTag(html, /<html[^>]*>/i) || '', 'lang');
  const hreflang = [...head.matchAll(/<link[^>]+hreflang=[^>]*>/gi)].map((m) => attr(m[0], 'hreflang'));

  // Body content without site-wide chrome, so a footer edit doesn't look
  // like a content change on every page.
  let main = (html.match(/<main[\s\S]*?<\/main>/i) || [html.split(/<body[^>]*>/i)[1] || ''])[0];
  main = main
    .replace(/<(script|style|noscript)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<(nav|footer)[\s\S]*?<\/\1>/gi, ' ');

  const h1 = [...main.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => text(m[1]));
  const h2 = [...main.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => text(m[1]));
  const bodyText = text(main);
  const contentLinks = [
    ...new Set(
      [...main.matchAll(/<a[^>]+href=["']([^"'#]+)[^"']*["'][^>]*>([\s\S]*?)<\/a>/gi)]
        .filter((m) => m[1].startsWith('/') || m[1].startsWith(config.baseUrl))
        .map((m) => `${normalizePath(m[1])}|${text(m[2]).slice(0, 80)}`),
    ),
  ].map((s) => {
    const [to, anchor] = s.split('|');
    return { to, anchor };
  });

  return {
    title,
    description,
    h1,
    h2,
    canonical,
    robots,
    lang,
    hreflang,
    words: bodyText ? bodyText.split(' ').length : 0,
    contentHash: crypto.createHash('sha1').update(bodyText).digest('hex').slice(0, 12),
    contentLinks,
  };
}

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'pt7-seo-agent/1.0 (+https://www.pt7.nl)' } });
  return { status: res.status, body: await res.text() };
}

async function main() {
  const sitemap = await fetchText(`${config.baseUrl}/sitemap.xml`);
  if (sitemap.status !== 200) throw new Error(`sitemap.xml returned ${sitemap.status}`);
  const urls = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1].trim())
    .filter((u) => !/\.(webp|png|jpe?g)$/i.test(u));

  const pages = {};
  const queue = [...urls];
  const worker = async () => {
    for (let url; (url = queue.shift()); ) {
      const { status, body } = await fetchText(url);
      pages[normalizePath(url)] = { url, status, ...(status === 200 ? parsePage(body) : {}) };
    }
  };
  await Promise.all(Array.from({ length: 4 }, worker));

  const date = today();
  const sorted = Object.fromEntries(Object.entries(pages).sort(([a], [b]) => a.localeCompare(b)));
  writeJson(path.join(dirs.snapshots, `${date}.json`), { date, pages: sorted });
  console.log(`✓ Snapshot of ${urls.length} pages → snapshots/${date}.json`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) await main();
