// The site's trainers, equipment and blog posts come from the PT7 Academy API, the master copy (owner, 2026-11-15;
// pt7-academy docs/DECISIONS_LOG.md, "Website content: the database is the master copy").
//
//   node scripts/site-content.js fetch         before the build: content and images from the API
//   node scripts/site-content.js copy-images   after `vite build`: the images into dist/assets/images/
//
// fetch reads GET /api/public/site?lang=en|nl with the build key (env SITE_BUILD_KEY, header X-PT7-Build-Key; every
// build needs it, no fallback to files: owner, 2026-11-20), downloads each image under its original file name, keeps
// only known tags and attributes in blog HTML (anyone who can write the database must not be able to publish script
// on pt7.nl), and writes src/data/generated/<kind>.<lang>.json (trainers, equipment, blog; English and Dutch) in the
// shapes the data modules export, one file each so a page loads only the content it shows. Nothing it writes is
// committed. The API's Cloud Run address is used directly (no CDN copy in between); env PT7_API_URL
// overrides it.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sanitizeHtml from 'sanitize-html';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const API_URL = (process.env.PT7_API_URL || 'https://pt7-api-344238205966.europe-west4.run.app').replace(/\/$/, '');
const SITE_URL = 'https://www.pt7.nl';
const IMAGE_DIR = '/assets/images';
const OUT_DIR = path.join(root, 'src/data/generated');
const OUT_IMAGES = path.join(root, '.site-content/images');
const DIST_IMAGES = path.join(root, 'dist/assets/images');
const LANGS = ['en', 'nl'];
const IMAGE_TYPES = { 'image/webp': '.webp', 'image/jpeg': '.jpg', 'image/png': '.png' };

// Exactly what the blog posts use today; anything else is dropped (and logged)
const BLOG_HTML = {
  allowedTags: [
    'p', 'strong', 'em', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'a', 'sup', 'div', 'img', 'br',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
  ],
  allowedAttributes: {
    '*': ['class', 'id'],
    a: ['href', 'target', 'rel'],
    img: ['src', 'alt', 'width', 'height', 'loading', 'decoding'],
  },
  allowedSchemes: ['https', 'mailto', 'tel'],
  allowedSchemesByTag: { img: [] }, // images only from this site (relative paths)
  allowProtocolRelative: false,
  disallowedTagsMode: 'discard',
  parser: { lowerCaseAttributeNames: true },
};

function fail(message) {
  console.error(`✗ site content: ${message}`);
  process.exit(1);
}

async function getJson(pathname, key) {
  const response = await fetch(`${API_URL}${pathname}`, { headers: { 'X-PT7-Build-Key': key } });
  if (!response.ok) fail(`${pathname} answered ${response.status}`);
  const body = await response.json();
  return body && typeof body === 'object' && 'data' in body ? body.data : body;
}

// One download per image; its file name comes from the API (Content-Disposition), so every address stays as it is
const images = new Map(); // API url -> site path
async function sitePath(url) {
  if (!url) return null;
  if (typeof url !== 'string' || !/^\/api\/content-images\/[0-9a-f]{24}$/.test(url)) fail(`unexpected image url ${url}`);
  const known = images.get(url);
  if (known) return known;
  const response = await fetch(`${API_URL}${url}`);
  if (!response.ok) fail(`${url} answered ${response.status}`);
  const type = (response.headers.get('content-type') || '').split(';')[0].trim();
  if (!IMAGE_TYPES[type]) fail(`${url} has an unexpected type ${type}`);
  const name = /filename="([^"]+)"/.exec(response.headers.get('content-disposition') || '')?.[1];
  if (!name || !/^[A-Za-z0-9._-]+$/.test(name) || name.startsWith('.')) fail(`${url} has no usable file name`);
  const file = path.join(OUT_IMAGES, name);
  const data = Buffer.from(await response.arrayBuffer());
  if (fs.existsSync(file) && !fs.readFileSync(file).equals(data)) fail(`two different images are named ${name}`);
  fs.writeFileSync(file, data);
  const site = `${IMAGE_DIR}/${name}`;
  images.set(url, site);
  return site;
}

const keywordText = (keywords) => keywords.join(', ');
const day = (iso) => (iso ? iso.slice(0, 10) : undefined);

async function blogHtml(html, slug) {
  let out = html;
  for (const [, url] of html.matchAll(/src="(\/api\/content-images\/[0-9a-f]{24})"/g)) {
    out = out.split(`src="${url}"`).join(`src="${await sitePath(url)}"`);
  }
  // The import made this site's links absolute; on the site they are relative again
  out = out.split(`href="${SITE_URL}/`).join('href="/');
  const clean = sanitizeHtml(out, BLOG_HTML);
  if (clean !== sanitizeHtml(clean, BLOG_HTML)) fail(`blog ${slug}: HTML is not stable under the filter`);
  const dropped = [...new Set([...out.matchAll(/<([a-zA-Z][a-zA-Z0-9]*)/g)].map((m) => m[1].toLowerCase()))].filter(
    (tag) => !BLOG_HTML.allowedTags.includes(tag),
  );
  if (dropped.length) console.warn(`⚠ blog ${slug}: the HTML filter removed <${dropped.join('>, <')}>`);
  return clean;
}

async function trainer(t) {
  return {
    slug: t.slug, name: t.name, displayName: t.displayName, title: t.title, heroTitle: t.heroTitle, tier: t.tier,
    image: await sitePath(t.imageUrl), languages: t.languages, specialties: t.specialties, available: t.available,
    seo: { title: t.seo.title, description: t.seo.description, keywords: keywordText(t.seo.keywords) },
    structuredData: t.structuredData, bio: t.bio, qualifications: t.qualifications, ctaText: t.ctaText,
  };
}

async function equipment(e) {
  const images = [];
  for (const img of e.images) images.push({ src: await sitePath(img.url), alt: img.alt, width: img.width, height: img.height });
  return {
    slug: e.slug, name: e.name, priceEur: e.priceEur,
    seo: { title: e.seo.title, description: e.seo.description, keywords: keywordText(e.seo.keywords) },
    images, shortDesc: e.shortDesc, features: e.features, description: e.description, specs: e.specs, faq: e.faq,
  };
}

async function post(p) {
  return {
    id: p.slug, slug: p.slug, title: p.title,
    ...(p.seo.title ? { seoTitle: p.seo.title } : {}), // none: the site uses `${title} | PT7`
    excerpt: p.excerpt, content: await blogHtml(p.content, p.slug), author: p.author, date: day(p.date),
    ...(p.dateModified ? { dateModified: day(p.dateModified) } : {}),
    image: await sitePath(p.imageUrl),
    ...(p.imagePosition && p.imagePosition !== 'center' ? { imagePosition: p.imagePosition } : {}), // center: the default
    tags: p.tags,
    metaDescription: p.seo.description, keywords: p.seo.keywords,
    ...(p.faqs?.length ? { faqs: p.faqs } : {}),
  };
}

async function fetchContent() {
  const key = (process.env.SITE_BUILD_KEY || '').trim();
  if (!key) fail('SITE_BUILD_KEY is not set (every build needs it: pt7-academy docs/DEPLOY_GCP.md)');
  fs.rmSync(OUT_IMAGES, { recursive: true, force: true });
  fs.mkdirSync(OUT_IMAGES, { recursive: true });
  const content = {};
  for (const lang of LANGS) {
    const site = await getJson(`/api/public/site?lang=${lang}`, key);
    if (!Array.isArray(site?.trainers) || !Array.isArray(site?.equipment) || !Array.isArray(site?.blog)) fail(`unexpected answer for ${lang}`);
    if (!site.trainers.length || !site.equipment.length || !site.blog.length) fail(`empty content for ${lang}`);
    content[lang] = { trainers: [], equipment: [], blog: [] };
    for (const t of site.trainers) content[lang].trainers.push(await trainer(t));
    for (const e of site.equipment) content[lang].equipment.push(await equipment(e));
    for (const p of site.blog) content[lang].blog.push(await post(p));
  }
  const slugs = (lang, kind) => content[lang][kind].map((x) => x.slug).join(',');
  for (const kind of ['trainers', 'equipment', 'blog']) {
    if (slugs('en', kind) !== slugs('nl', kind)) fail(`${kind}: English and Dutch differ in items or order`);
  }
  fs.rmSync(OUT_DIR, { recursive: true, force: true });
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const lang of LANGS) {
    for (const kind of ['trainers', 'equipment', 'blog']) {
      fs.writeFileSync(path.join(OUT_DIR, `${kind}.${lang}.json`), `${JSON.stringify(content[lang][kind], null, 2)}\n`);
    }
  }
  console.log(
    `✓ site content from ${API_URL}: ${content.en.trainers.length} trainers, ${content.en.equipment.length} equipment, ` +
      `${content.en.blog.length} blog posts, ${images.size} images`,
  );
}

function copyImages() {
  if (!fs.existsSync(OUT_IMAGES)) fail('no images fetched (run `node scripts/site-content.js fetch` first)');
  fs.mkdirSync(DIST_IMAGES, { recursive: true });
  const names = fs.readdirSync(OUT_IMAGES);
  for (const name of names) fs.copyFileSync(path.join(OUT_IMAGES, name), path.join(DIST_IMAGES, name));
  console.log(`✓ ${names.length} content images copied into dist${IMAGE_DIR}/`);
}

const command = process.argv[2];
if (command === 'fetch') await fetchContent();
else if (command === 'copy-images') copyImages();
else fail('usage: node scripts/site-content.js fetch | copy-images');
