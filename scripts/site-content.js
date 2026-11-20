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
// The file name's extension must match the type: Hosting serves a file by its extension (an "image" named x.html or
// x.svg would be a page on this site)
const IMAGE_TYPES = { 'image/webp': ['.webp'], 'image/jpeg': ['.jpg', '.jpeg'], 'image/png': ['.png'] };
// Slugs become paths, file names, sitemap entries and canonical addresses
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const SITE_IMAGE = /^\/assets\/images\/[A-Za-z0-9_-][A-Za-z0-9._-]*$/;
// Whether a link leads into this site's API (on any of its addresses), read the way a browser reads it (`\api`,
// `/./api`, `%61pi` included)
const SITE_HOSTS = ['www.pt7.nl', 'pt7.nl', 'pt7-academy.web.app', 'pt7-academy.firebaseapp.com'];
function intoApi(href) {
  try {
    const url = new URL(href, `${SITE_URL}/`);
    return SITE_HOSTS.includes(url.hostname) && /^\/api(\/|$)/i.test(decodeURIComponent(url.pathname));
  } catch {
    return true; // not a usable address: drop it
  }
}

// Ids and classes the posts use (reference anchors, the site's blog styles); others are dropped, so a post can't
// overwrite page variables through an id or dress up as other page elements
const BLOG_CLASSES = [
  'accreditation-logos', 'blog-callout', 'blog-compare-grid', 'blog-compare-no', 'blog-compare-yes', 'blog-figure',
  'blog-refs', 'blog-table', 'blog-table--prose', 'blog-table-wrap', 'ittap-logo', 'pma-logo',
];
const BLOG_IDS = Array.from({ length: 30 }, (_, i) => `ref-${i + 1}`);

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
  allowedClasses: { '*': BLOG_CLASSES },
  // Only the reference anchors' ids, only target="_blank", and no links into the API
  transformTags: {
    '*': (tagName, attribs) => {
      const kept = { ...attribs };
      if ('id' in kept && !BLOG_IDS.includes(kept.id)) delete kept.id;
      if ('target' in kept && kept.target !== '_blank') delete kept.target;
      if (typeof kept.href === 'string' && intoApi(kept.href)) delete kept.href;
      return { tagName, attribs: kept };
    },
  },
  // Images only from the site's own image folder (not /api/..., which the browser would call with the trainee cookie)
  exclusiveFilter: (frame) => frame.tag === 'img' && !SITE_IMAGE.test(frame.attribs.src || ''),
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

// Two more tries after a network error, a 429 or a 5xx, a few seconds apart
async function request(url, options = {}) {
  for (let attempt = 1; ; attempt += 1) {
    try {
      const response = await fetch(url, options);
      if (attempt < 3 && (response.status === 429 || response.status >= 500)) throw new Error(`HTTP ${response.status}`);
      return response;
    } catch (error) {
      if (attempt >= 3) throw error;
      console.warn(`↻ ${url.replace(API_URL, '')}: ${error.message}; trying again`);
      await new Promise((resolve) => setTimeout(resolve, 3000 * attempt));
    }
  }
}

async function getJson(pathname, key) {
  const response = await request(`${API_URL}${pathname}`, { headers: { 'X-PT7-Build-Key': key } });
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
  const response = await request(`${API_URL}${url}`);
  if (!response.ok) fail(`${url} answered ${response.status}`);
  const type = (response.headers.get('content-type') || '').split(';')[0].trim();
  if (!IMAGE_TYPES[type]) fail(`${url} has an unexpected type ${type}`);
  const name = /filename="([^"]+)"/.exec(response.headers.get('content-disposition') || '')?.[1];
  if (!name || !/^[A-Za-z0-9_-][A-Za-z0-9._-]*$/.test(name)) fail(`${url} has no usable file name`);
  if (!IMAGE_TYPES[type].includes(path.extname(name).toLowerCase())) fail(`${url}: ${name} doesn't match its type ${type}`);
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
  if (clean !== out) console.warn(`⚠ blog ${slug}: the HTML filter changed the post (a tag, attribute, class or link it doesn't allow)`);
  return clean;
}

function checkItem(kind, item) {
  if (typeof item?.slug !== 'string' || !SLUG.test(item.slug)) fail(`${kind}: unusable slug ${JSON.stringify(item?.slug)}`);
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
    for (const t of site.trainers) checkItem('trainer', t), content[lang].trainers.push(await trainer(t));
    for (const e of site.equipment) checkItem('equipment', e), content[lang].equipment.push(await equipment(e));
    for (const p of site.blog) {
      checkItem('blog post', p);
      const shaped = await post(p);
      if (!DATE.test(shaped.date) || (shaped.dateModified && !DATE.test(shaped.dateModified))) fail(`blog ${p.slug}: unusable date`);
      content[lang].blog.push(shaped);
    }
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
  for (const name of names) {
    const from = path.join(OUT_IMAGES, name);
    const to = path.join(DIST_IMAGES, name);
    // A content image must not silently replace a different site image of the same name (from public/)
    if (fs.existsSync(to) && !fs.readFileSync(to).equals(fs.readFileSync(from))) {
      fail(`${name} from the database differs from the site's own ${IMAGE_DIR}/${name}: rename one of them`);
    }
    fs.copyFileSync(from, to);
  }
  console.log(`✓ ${names.length} content images copied into dist${IMAGE_DIR}/`);
}

// The blog filter, slug and image rules, for scripts/test/site-content.test.js
export const rules = { BLOG_HTML, SLUG, SITE_IMAGE, IMAGE_TYPES };

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const command = process.argv[2];
  if (command === 'fetch') await fetchContent();
  else if (command === 'copy-images') copyImages();
  else fail('usage: node scripts/site-content.js fetch | copy-images');
}
