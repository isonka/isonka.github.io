import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');
const indexPath = path.join(distDir, 'index.html');
const notFoundPath = path.join(distDir, '404.html');

if (!fs.existsSync(indexPath)) {
  console.error('✗ dist/index.html not found — run vite build first.');
  process.exit(1);
}

const title = 'Page not found | PT 7 Pilates Amsterdam';
const description =
  'This page does not exist or has moved. Book a Reformer Pilates class, view pricing, or return home.';

let html = fs.readFileSync(indexPath, 'utf-8');

html = html.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
html = html.replace(
  /<meta name="description" content="[^"]*" \/>/,
  `<meta name="description" content="${description}" />`,
);
html = html.replace(
  /<meta name="robots" content="[^"]*" \/>/,
  '<meta name="robots" content="noindex, follow" />',
);
html = html.replace(
  /<meta property="og:title" content="[^"]*" \/>/,
  `<meta property="og:title" content="${title}" />`,
);
html = html.replace(
  /<meta property="og:description" content="[^"]*" \/>/,
  `<meta property="og:description" content="${description}" />`,
);
html = html.replace(
  /<meta name="twitter:title" content="[^"]*" \/>/,
  `<meta name="twitter:title" content="${title}" />`,
);
html = html.replace(
  /<meta name="twitter:description" content="[^"]*" \/>/,
  `<meta name="twitter:description" content="${description}" />`,
);
html = html.replace(/<link rel="canonical" href="[^"]*" \/>\n?/, '');
html = html.replace(/<meta property="og:url" content="[^"]*" \/>\n?/, '');
html = html.replace(/<meta name="twitter:url" content="[^"]*" \/>\n?/, '');

fs.writeFileSync(notFoundPath, html);
console.log('✓ dist/404.html — SPA shell with noindex (GitHub Pages fallback)');
