// Aggregation and scoring.
//
// Snippet quality (title + description) is judged by CTR *relative to
// position*: every query row contributes impressions × expectedCtr(position)
// "expected clicks", and a page's ratio is actual / expected. This separates
// "the title got worse" from "the page dropped two positions".

import { config } from '../config.js';
import { normalizePath, normalizeQuery } from './util.js';

// Approximate organic CTR by position (blended desktop/mobile). Only
// relative comparisons matter: ratios are recalibrated against the site's own
// average, so a local pack pushing every result down cancels out.
const CTR_CURVE = [0.28, 0.16, 0.11, 0.08, 0.06, 0.045, 0.035, 0.028, 0.022, 0.018];

export function expectedCtr(position) {
  if (!Number.isFinite(position) || position < 1) return CTR_CURVE[0];
  if (position <= 10) {
    const i = Math.floor(position) - 1;
    const next = CTR_CURVE[Math.min(i + 1, 9)] ?? CTR_CURVE[9];
    return CTR_CURVE[i] + (next - CTR_CURVE[i]) * (position - Math.floor(position));
  }
  if (position <= 20) return 0.012 - ((position - 10) / 10) * 0.007; // 1.2% → 0.5%
  return 0.003;
}

export const isBrand = (q) => config.brandPattern.test(q);

export function indexGsc(days) {
  const pages = new Map();
  const queries = new Map();
  const push = (map, key, row) => (map.get(key) || map.set(key, []).get(key)).push(row);
  for (const day of days) {
    for (const r of day.pages) push(pages, normalizePath(r.page), { ...r, date: day.date });
    for (const r of day.queries) {
      push(queries, normalizePath(r.page), { ...r, date: day.date, brand: isBrand(r.query), nq: normalizeQuery(r.query) });
    }
  }
  return { pages, queries };
}

export function indexGa4(days) {
  const byPage = new Map();
  for (const day of days) {
    for (const r of day.rows) {
      const key = normalizePath(r.landingPage || '/');
      (byPage.get(key) || byPage.set(key, []).get(key)).push(r);
    }
  }
  return byPage;
}

const inWindow = (r, w) => r.date >= w.start && r.date <= w.end;

function sumRows(rows) {
  let clicks = 0;
  let impressions = 0;
  let posWeighted = 0;
  let expClicks = 0;
  for (const r of rows) {
    clicks += r.clicks;
    impressions += r.impressions;
    posWeighted += r.position * r.impressions;
    expClicks += r.impressions * expectedCtr(r.position);
  }
  return {
    clicks,
    impressions,
    position: impressions ? posWeighted / impressions : null,
    ctr: impressions ? clicks / impressions : null,
    expClicks,
  };
}

// Metrics for one page in one window. `segment` is "nonbrand" when there are
// enough non-brand impressions to judge on, otherwise "all".
export function pageMetrics(gsc, ga4, page, w) {
  const totals = sumRows((gsc.pages.get(page) || []).filter((r) => inWindow(r, w)));
  const qRows = (gsc.queries.get(page) || []).filter((r) => inWindow(r, w));
  const nonbrand = sumRows(qRows.filter((r) => !r.brand));
  const brand = sumRows(qRows.filter((r) => r.brand));
  const all = sumRows(qRows);
  const segment = nonbrand.impressions >= config.evaluation.minImpressions ? 'nonbrand' : 'all';
  const scored = segment === 'nonbrand' ? nonbrand : all;

  const gaRows = (ga4.get(page) || []).filter((r) => inWindow(r, w));
  const sessions = gaRows.reduce((s, r) => s + r.sessions, 0);
  const engaged = gaRows.reduce((s, r) => s + r.engagedSessions, 0);
  const keyEvents = gaRows.reduce((s, r) => s + r.keyEvents, 0);

  return {
    window: w,
    totals,
    nonbrand,
    brand,
    all,
    segment,
    scored,
    ratio: scored.expClicks ? scored.clicks / scored.expClicks : null,
    ga4: { sessions, engagementRate: sessions ? engaged / sessions : null, keyEvents },
  };
}

export function queryTable(gsc, page, w) {
  const agg = new Map();
  for (const r of (gsc.queries.get(page) || []).filter((r) => inWindow(r, w))) {
    const a = agg.get(r.query) || { query: r.query, nq: r.nq, brand: r.brand, rows: [] };
    a.rows.push(r);
    agg.set(r.query, a);
  }
  return [...agg.values()]
    .map(({ rows, ...q }) => ({ ...q, ...sumRows(rows) }))
    .sort((a, b) => b.impressions - a.impressions);
}

// Conditional binomial test for two Poisson rates: given the clicks in both
// windows, would the after-window share be this high if the snippet's
// click rate (per expected click) had not changed?
export function rateChangeZ(clicksBefore, expBefore, clicksAfter, expAfter) {
  const n = clicksBefore + clicksAfter;
  if (!n || !expBefore || !expAfter) return 0;
  const p0 = expAfter / (expAfter + expBefore);
  return (clicksAfter - n * p0) / Math.sqrt(n * p0 * (1 - p0));
}

export function siteWindow(gsc, w, excludePage = null) {
  const rows = [];
  for (const [page, list] of gsc.queries) if (page !== excludePage) rows.push(...list.filter((r) => inWindow(r, w)));
  const totals = [];
  for (const [page, list] of gsc.pages) if (page !== excludePage) totals.push(...list.filter((r) => inWindow(r, w)));
  return { totals: sumRows(totals), nonbrand: sumRows(rows.filter((r) => !r.brand)), brand: sumRows(rows.filter((r) => r.brand)), rows };
}

export function sumQueryRows(rows) {
  return sumRows(rows);
}
