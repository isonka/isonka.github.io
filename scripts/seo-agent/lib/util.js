import fs from 'fs';
import path from 'path';

const DAY = 86400000;

export const isoDate = (d) => new Date(d).toISOString().slice(0, 10);
export const addDays = (date, n) => isoDate(new Date(date).getTime() + n * DAY);
export const daysBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / DAY);
export const today = () => process.env.SEO_TODAY || isoDate(Date.now());

export function dateRange(start, end) {
  const out = [];
  for (let d = start; d <= end; d = addDays(d, 1)) out.push(d);
  return out;
}

// GSC and GA4 report URLs in different shapes. Reduce all of them to the
// trailing-slash path used in site/routes.ts.
export function normalizePath(url) {
  let p = url;
  try {
    p = new URL(url, 'https://www.pt7.nl').pathname;
  } catch {
    // keep as-is
  }
  p = p.replace(/\/index\.html$/, '/').replace(/\.html$/, '/');
  if (!p.endsWith('/')) p += '/';
  return p.replace(/\/{2,}/g, '/');
}

export function normalizeQuery(q) {
  return q
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function readJson(file, fallback = null) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return fallback;
  }
}

export function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

export function listDated(dir, ext = '.json') {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /^\d{4}-\d{2}-\d{2}/.test(f) && f.endsWith(ext))
    .sort();
}

export const round = (n, d = 2) => (Number.isFinite(n) ? Math.round(n * 10 ** d) / 10 ** d : null);
export const pct = (n) => (Number.isFinite(n) ? `${(n * 100).toFixed(1)}%` : '–');
