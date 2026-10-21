// Step 3: compare what changed on the site with what happened in search, then
// write a budgeted action plan for the editing step.
//
//   losing change   → revert to the previous (measured) version
//   winning change  → keep it, then strengthen the page (content + internal links)
//   weak snippet    → rewrite title/description around the queries it really gets
//   strong page     → strengthen; never touch its snippet
//
// Output: reports/<date>.json (machine plan) and reports/<date>.md (PR body).

import fs from 'fs';
import path from 'path';
import { config, dirs } from './config.js';
import {
  addDays,
  daysBetween,
  listDated,
  normalizePath,
  normalizeQuery,
  pct,
  readJson,
  round,
  today,
  writeJson,
} from './lib/util.js';
import { indexGa4, indexGsc, pageMetrics, queryTable, rateChangeZ, siteWindow, sumQueryRows } from './lib/metrics.js';

const E = config.evaluation;
const O = config.opportunities;

const loadDir = (dir) => listDated(dir).map((f) => readJson(path.join(dir, f)));

const gscDays = loadDir(dirs.gsc);
const ga4Days = loadDir(dirs.ga4);
const snapshots = loadDir(dirs.snapshots);
const proposals = listDated(dirs.proposals).flatMap((f) =>
  (readJson(path.join(dirs.proposals, f), { changes: [] }).changes || []).map((c) => ({ ...c, proposedOn: f.slice(0, 10) })),
);

if (!snapshots.length) {
  console.error('✗ No snapshots found. Run snapshot.js first.');
  process.exit(1);
}

const runDate = today();
const dataEnd = gscDays.length ? gscDays[gscDays.length - 1].date : addDays(runDate, -config.gscLagDays);
const hasGsc = gscDays.length > 0;
const hasGa4 = ga4Days.length > 0;
const gsc = indexGsc(gscDays);
const ga4 = indexGa4(ga4Days);
const latest = snapshots[snapshots.length - 1];

const win = (endOffset, days) => ({ start: addDays(dataEnd, endOffset - days + 1), end: addDays(dataEnd, endOffset) });
const W = { cur: win(0, 28), prev: win(-28, 28), week: win(0, 7), prevWeek: win(-7, 7) };

const tokens = (s) => normalizeQuery(s).split(' ').filter((t) => t.length > 2);
const covers = (haystack, query) => {
  const hay = new Set(normalizeQuery(haystack).split(' '));
  const t = tokens(query);
  return t.length > 0 && t.every((x) => hay.has(x));
};
const isFrozen = (page) => config.frozenPages.includes(page);
const isIndexable = (p) => p && p.status === 200 && !/noindex/i.test(p.robots || '') && (!p.canonical || p.canonical === p.url);

// ---------------------------------------------------------------------------
// 1. Detect changes between consecutive snapshots
// ---------------------------------------------------------------------------

function detectChanges() {
  const changes = [];
  for (let i = 1; i < snapshots.length; i++) {
    const prev = snapshots[i - 1];
    const cur = snapshots[i];
    for (const [page, b] of Object.entries(cur.pages)) {
      const a = prev.pages[page];
      if (!a || a.status !== 200 || b.status !== 200) continue;
      const base = { page, prevSnapshot: prev.date, detectedOn: cur.date };
      if (a.title !== b.title || a.description !== b.description) {
        changes.push({
          ...base,
          kind: 'snippet',
          before: { title: a.title, description: a.description },
          after: { title: b.title, description: b.description },
        });
      }
      if (a.contentHash !== b.contentHash || a.h1.join('|') !== b.h1.join('|')) {
        changes.push({
          ...base,
          kind: 'content',
          before: { h1: a.h1, h2: a.h2, words: a.words, contentLinks: a.contentLinks.length },
          after: { h1: b.h1, h2: b.h2, words: b.words, contentLinks: b.contentLinks.length },
        });
      }
    }
  }
  return changes;
}

function matchProposal(change) {
  return proposals.find(
    (p) =>
      p.page === change.page &&
      p.proposedOn <= change.detectedOn &&
      (change.kind === 'snippet'
        ? (p.after?.title && p.after.title === change.after.title) ||
          (p.after?.description && p.after.description === change.after.description)
        : p.kind === 'content' || p.kind === 'strengthen'),
  );
}

function evaluateChange(change, all) {
  const before = { start: addDays(change.prevSnapshot, -E.windowDays), end: addDays(change.prevSnapshot, -1) };
  const afterStart = addDays(change.detectedOn, E.settleDays);
  let afterEnd = addDays(afterStart, E.windowDays - 1);
  if (afterEnd > dataEnd) afterEnd = dataEnd;

  // A later change of the same kind ends this experiment early.
  const next = all.find((c) => c.page === change.page && c.kind === change.kind && c.detectedOn > change.detectedOn);
  if (next && addDays(next.prevSnapshot, -1) < afterEnd) afterEnd = addDays(next.prevSnapshot, -1);

  const after = { start: afterStart, end: afterEnd };
  const afterDays = afterEnd >= afterStart ? daysBetween(afterStart, afterEnd) + 1 : 0;
  const age = daysBetween(change.detectedOn, runDate);
  const result = { ...change, proposal: matchProposal(change) || null, windows: { before, after }, afterDays, age };

  if (next && afterDays < E.minAfterDays) return { ...result, verdict: 'superseded' };
  if (!hasGsc || afterDays < E.minAfterDays) return { ...result, verdict: 'pending' };

  const mb = pageMetrics(gsc, ga4, change.page, before);
  const ma = pageMetrics(gsc, ga4, change.page, after);
  // Same segment on both sides, or the comparison means nothing.
  const segment = mb.segment === 'nonbrand' && ma.segment === 'nonbrand' ? 'nonbrand' : 'all';
  const b = segment === 'nonbrand' ? mb.nonbrand : mb.all;
  const a = segment === 'nonbrand' ? ma.nonbrand : ma.all;
  const full = afterDays >= E.windowDays;
  const undecided = age > E.closeNeutralAfterDays || full ? 'no-effect' : 'neutral';
  const evidence = {
    segment,
    before: { clicks: b.clicks, impressions: b.impressions, position: round(b.position, 1), ctr: round(b.ctr, 4), expClicks: round(b.expClicks, 1) },
    after: { clicks: a.clicks, impressions: a.impressions, position: round(a.position, 1), ctr: round(a.ctr, 4), expClicks: round(a.expClicks, 1) },
    ga4: { before: mb.ga4, after: ma.ga4 },
  };

  if (change.kind === 'snippet') {
    if (b.impressions < E.minImpressions || a.impressions < E.minImpressions || b.expClicks < E.minExpectedClicks || a.expClicks < E.minExpectedClicks) {
      return { ...result, evidence, verdict: age > E.closeNeutralAfterDays ? 'inconclusive' : 'pending' };
    }
    const z = rateChangeZ(b.clicks, b.expClicks, a.clicks, a.expClicks);
    const lift = b.clicks ? a.clicks / a.expClicks / (b.clicks / b.expClicks) - 1 : null;
    const verdict = z >= E.z ? 'winning' : z <= -E.z ? 'losing' : undecided;
    return { ...result, evidence: { ...evidence, z: round(z, 2), ctrLiftPositionAdjusted: round(lift, 3) }, verdict };
  }

  // Content: impressions relative to the rest of the site (cancels
  // seasonality), plus position.
  const siteSegment = (w) => {
    const s = siteWindow(gsc, w, change.page);
    return segment === 'nonbrand' ? s.nonbrand : sumQueryRows(s.rows);
  };
  const sb = siteSegment(before);
  const sa = siteSegment(after);
  if (b.impressions < E.minImpressions / 2 || !sb.impressions || !sa.impressions) {
    return { ...result, evidence, verdict: age > E.closeNeutralAfterDays ? 'inconclusive' : 'pending' };
  }
  const impLift = a.impressions / b.impressions / (sa.impressions / sb.impressions) - 1;
  const posDelta = a.position - b.position; // negative = better
  let verdict = undecided;
  if ((impLift >= 0.25 && posDelta <= 1) || (posDelta <= -2 && impLift >= 0)) verdict = 'winning';
  if ((impLift <= -0.25 && posDelta >= 1) || posDelta >= 3) verdict = 'losing';
  return { ...result, evidence: { ...evidence, impressionLiftVsSite: round(impLift, 3), positionDelta: round(posDelta, 1) }, verdict };
}

const detected = detectChanges();
const changes = detected.map((c) => evaluateChange(c, detected));
const latestChange = (page, kind) => changes.filter((c) => c.page === page && c.kind === kind).at(-1);
const OPEN = new Set(['pending', 'neutral']);
const snippetLocked = (page) => OPEN.has(latestChange(page, 'snippet')?.verdict);
const contentLocked = (page) => OPEN.has(latestChange(page, 'content')?.verdict);

// ---------------------------------------------------------------------------
// 2. Current state per page
// ---------------------------------------------------------------------------

const siteCur = siteWindow(gsc, W.cur);
const sitePrev = siteWindow(gsc, W.prev);
const siteRatio = siteCur.nonbrand.expClicks >= 10 && siteCur.nonbrand.clicks ? siteCur.nonbrand.clicks / siteCur.nonbrand.expClicks : 1;

const inbound = new Map();
for (const [from, p] of Object.entries(latest.pages)) {
  for (const l of p.contentLinks || []) {
    if (l.to === from) continue;
    (inbound.get(l.to) || inbound.set(l.to, new Set()).get(l.to)).add(from);
  }
}

const allPages = new Set([...Object.keys(latest.pages), ...[...gsc.pages.keys()].filter((p) => pageMetrics(gsc, ga4, p, W.cur).totals.impressions > 0)]);

const pages = {};
for (const page of allPages) {
  const snap = latest.pages[page] || null;
  const m = pageMetrics(gsc, ga4, page, W.cur);
  const mp = pageMetrics(gsc, ga4, page, W.prev);
  const rel = m.ratio != null ? m.ratio / siteRatio : null;
  const snippet =
    !hasGsc || m.scored.expClicks < E.minExpectedClicks
      ? 'low-data'
      : rel <= O.weakSnippetRatio
        ? 'weak'
        : rel >= O.strongSnippetRatio
          ? 'strong'
          : 'ok';
  const queries = queryTable(gsc, page, W.cur);
  const headings = snap ? [...snap.h1, ...snap.h2].join(' ') : '';
  const striking = queries
    .filter((q) => !q.brand && q.position >= O.strikingMin && q.position <= O.strikingMax && q.impressions >= O.strikingMinImpressions)
    .map((q) => ({
      query: q.query,
      impressions: q.impressions,
      clicks: q.clicks,
      position: round(q.position, 1),
      inTitle: snap ? covers(snap.title, q.query) : false,
      inHeadings: covers(headings, q.query),
    }));

  pages[page] = {
    page,
    live: snap
      ? { title: snap.title, description: snap.description, h1: snap.h1, lang: snap.lang, words: snap.words, status: snap.status }
      : null,
    indexable: isIndexable(snap),
    frozen: isFrozen(page),
    snippetLocked: snippetLocked(page),
    contentLocked: contentLocked(page),
    snippet,
    ctrVsExpected: round(rel, 2),
    gsc: {
      clicks: m.totals.clicks,
      impressions: m.totals.impressions,
      position: round(m.totals.position, 1),
      nonbrandClicks: m.nonbrand.clicks,
      nonbrandImpressions: m.nonbrand.impressions,
      clicksPrev: mp.totals.clicks,
      impressionsPrev: mp.totals.impressions,
    },
    ga4: m.ga4,
    expectedClicksAtSiteRate: round(m.scored.expClicks * siteRatio, 1),
    scoredClicks: m.scored.clicks,
    topQueries: queries.slice(0, 10).map((q) => ({
      query: q.query,
      brand: q.brand,
      clicks: q.clicks,
      impressions: q.impressions,
      position: round(q.position, 1),
      ctr: round(q.ctr, 4),
    })),
    striking,
    inboundContentLinks: [...(inbound.get(page) || [])].sort(),
  };
}

// ---------------------------------------------------------------------------
// 3. Site-level signals
// ---------------------------------------------------------------------------

const brandForms = (rows) => {
  const brandRows = rows.filter((r) => r.brand);
  const old = sumQueryRows(brandRows.filter((r) => config.oldBrandPattern.test(r.query)));
  const neu = sumQueryRows(brandRows.filter((r) => !config.oldBrandPattern.test(r.query)));
  return { ptStudio7: { clicks: old.clicks, impressions: old.impressions }, pt7: { clicks: neu.clicks, impressions: neu.impressions } };
};
const brandCur = brandForms(siteCur.rows);
const brandPrev = brandForms(sitePrev.rows);
const brandCrossover =
  hasGsc && brandCur.pt7.impressions > brandCur.ptStudio7.impressions && brandPrev.pt7.impressions > brandPrev.ptStudio7.impressions;

function targetStats(t, w) {
  const want = tokens(t.keyword);
  const rows = siteWindow(gsc, w).rows.filter((r) => {
    const have = new Set(r.nq.split(' '));
    return want.every((x) => have.has(x));
  });
  const byPage = {};
  for (const r of rows) (byPage[r.page] ||= []).push(r);
  const ranking = Object.entries(byPage)
    .map(([url, rs]) => ({ page: normalizePath(url), ...sumQueryRows(rs) }))
    .sort((a, b) => b.impressions - a.impressions);
  const total = sumQueryRows(rows);
  const intended = ranking.find((r) => r.page === t.page);
  return {
    impressions: total.impressions,
    clicks: total.clicks,
    position: round(total.position, 1),
    intendedPagePosition: intended ? round(intended.position, 1) : null,
    topPage: ranking[0]?.page || null,
    queries: [...new Set(rows.map((r) => r.query))].length,
  };
}

const targets = config.targets.map((t) => {
  const cur = targetStats(t, W.cur);
  const prev = targetStats(t, W.prev);
  return { ...t, ...cur, positionPrev: prev.position, impressionsPrev: prev.impressions, wrongPage: !!cur.topPage && cur.topPage !== t.page };
});

const cannibalization = (() => {
  const byQuery = new Map();
  for (const r of siteCur.rows.filter((r) => !r.brand)) {
    const q = byQuery.get(r.nq) || new Map();
    const p = normalizePath(r.page);
    q.set(p, (q.get(p) || 0) + r.impressions);
    byQuery.set(r.nq, q);
  }
  const out = [];
  for (const [query, perPage] of byQuery) {
    const total = [...perPage.values()].reduce((a, b) => a + b, 0);
    if (total < O.cannibalMinImpressions) continue;
    const competing = [...perPage].filter(([, imp]) => imp / total >= O.cannibalShare);
    if (competing.length >= 2) {
      out.push({ query, impressions: total, pages: competing.map(([page, imp]) => ({ page, share: round(imp / total, 2) })) });
    }
  }
  return out.sort((a, b) => b.impressions - a.impressions).slice(0, 15);
})();

const hygiene = [];
const titleCount = {};
for (const p of Object.values(latest.pages)) if (isIndexable(p)) titleCount[p.title] = (titleCount[p.title] || 0) + 1;
for (const [page, p] of Object.entries(latest.pages)) {
  const issues = [];
  if (p.status !== 200) issues.push(`status ${p.status} but listed in sitemap`);
  else {
    if (!isIndexable(p)) issues.push('in sitemap but noindex or canonicalised elsewhere');
    if (p.title.length > 60) issues.push(`title ${p.title.length} chars (>60)`);
    if (!p.description) issues.push('missing meta description');
    else if (p.description.length > 160) issues.push(`description ${p.description.length} chars (>160)`);
    else if (p.description.length < 70) issues.push(`description ${p.description.length} chars (<70)`);
    if (/https?:\/\//.test(p.description || '')) issues.push('bare URL in description');
    if (p.h1.length !== 1) issues.push(`${p.h1.length} H1 tags`);
    if (titleCount[p.title] > 1 && isIndexable(p)) issues.push('duplicate title');
  }
  if (issues.length) hygiene.push({ page, issues, snippetFix: issues.some((i) => /title|description/.test(i)) });
}

// ---------------------------------------------------------------------------
// 4. Budgeted action plan
// ---------------------------------------------------------------------------

const failedVariants = (page) =>
  changes
    .filter((c) => c.page === page && c.kind === 'snippet' && ['losing', 'no-effect'].includes(c.verdict))
    .map((c) => ({ ...c.after, verdict: c.verdict }));

const learnings = changes
  .filter((c) => ['winning', 'losing'].includes(c.verdict))
  .map((c) => ({ page: c.page, kind: c.kind, verdict: c.verdict, before: c.before, after: c.after, evidence: c.evidence, hypothesis: c.proposal?.hypothesis || null }));

const candidates = [];
const editable = (page) => pages[page] && pages[page].indexable && !pages[page].frozen;

// a) Revert changes that measurably lost.
for (const page of new Set(changes.map((c) => c.page))) {
  if (!editable(page)) continue;
  const s = latestChange(page, 'snippet');
  if (s?.verdict === 'losing') {
    candidates.push({ type: 'revert-snippet', budget: 'snippet', priority: 100, page, restore: s.before, failed: s.after, evidence: s.evidence });
  }
  const c = latestChange(page, 'content');
  if (c?.verdict === 'losing') {
    candidates.push({
      type: 'review-content-regression',
      budget: 'content',
      priority: 90,
      page,
      changedBetween: [c.prevSnapshot, c.detectedOn],
      before: c.before,
      after: c.after,
      evidence: c.evidence,
    });
  }
}

// b) Rewrite weak snippets, worst missed-clicks first.
const hygieneByPage = Object.fromEntries(hygiene.map((h) => [h.page, h.issues]));
for (const p of Object.values(pages)) {
  if (!editable(p.page) || p.snippetLocked || p.snippet !== 'weak') continue;
  if (candidates.some((c) => c.page === p.page && c.budget === 'snippet')) continue;
  candidates.push({
    type: 'rewrite-snippet',
    budget: 'snippet',
    priority: 50 + Math.min(40, p.expectedClicksAtSiteRate - p.scoredClicks),
    page: p.page,
    current: { title: p.live.title, description: p.live.description },
    why: `CTR is ${p.ctrVsExpected}× what its positions predict (site-calibrated); ~${round(p.expectedClicksAtSiteRate - p.scoredClicks, 0)} clicks/28d missed`,
    topQueries: p.topQueries.filter((q) => !q.brand).slice(0, 8),
    hygiene: hygieneByPage[p.page] || [],
    doNotReuse: failedVariants(p.page),
  });
}

// c) Snippet hygiene (lengths, bare URLs, duplicates) on pages not already queued.
for (const h of hygiene) {
  if (!h.snippetFix || !editable(h.page) || pages[h.page].snippetLocked) continue;
  if (pages[h.page].snippet === 'strong') continue; // a strong snippet stays, even if long
  if (candidates.some((c) => c.page === h.page && c.budget === 'snippet')) continue;
  const p = pages[h.page];
  candidates.push({
    type: 'fix-snippet-hygiene',
    budget: 'snippet',
    priority: 30 + Math.min(15, p.gsc.impressions / 100),
    page: h.page,
    current: { title: p.live.title, description: p.live.description },
    issues: h.issues.filter((i) => /title|description/.test(i)),
    topQueries: p.topQueries.filter((q) => !q.brand).slice(0, 5),
    doNotReuse: failedVariants(h.page),
  });
}

// d) Strengthen what works: winners, strong snippets, and target pages close to page 1.
const targetPages = new Set(config.targets.map((t) => t.page));
for (const p of Object.values(pages)) {
  if (!editable(p.page) || p.contentLocked) continue;
  const winner = changes.some((c) => c.page === p.page && c.verdict === 'winning' && c === latestChange(p.page, c.kind));
  const growing = p.gsc.clicks >= 10 && p.gsc.clicks >= p.gsc.clicksPrev * 1.3;
  const reason = winner
    ? 'a recent change won'
    : p.snippet === 'strong'
      ? 'snippet outperforms its position'
      : growing
        ? `clicks up ${p.gsc.clicksPrev}→${p.gsc.clicks} vs previous 28d`
        : targetPages.has(p.page) && p.striking.length
          ? 'target page with striking-distance queries'
          : null;
  if (!reason) continue;
  const uncovered = p.striking.filter((q) => !q.inHeadings);
  const linkSources = Object.values(pages)
    .filter(
      (s) =>
        s.page !== p.page &&
        s.indexable &&
        !s.frozen &&
        s.live?.lang === p.live?.lang &&
        !p.inboundContentLinks.includes(s.page),
    )
    .sort((a, b) => b.gsc.impressions - a.gsc.impressions)
    .slice(0, 3)
    .map((s) => s.page);
  if (!uncovered.length && !linkSources.length) continue;
  candidates.push({
    type: 'strengthen',
    budget: 'content',
    priority: (winner ? 80 : targetPages.has(p.page) ? 70 : 60) + Math.min(9, uncovered.reduce((s, q) => s + q.impressions, 0) / 100),
    page: p.page,
    reason,
    keepSnippet: true,
    uncoveredQueries: uncovered.slice(0, 6),
    addInternalLinksFrom: linkSources,
    currentInboundContentLinks: p.inboundContentLinks.length,
  });
}

candidates.sort((a, b) => b.priority - a.priority);
const used = { snippet: 0, content: 0 };
const limit = { snippet: config.budget.maxSnippetChanges, content: config.budget.maxContentChanges };
const actions = [];
const deferred = [];
const touched = new Set();
for (const c of candidates) {
  // One action per page per run, so effects stay attributable.
  if (touched.has(c.page) || used[c.budget] >= limit[c.budget]) {
    deferred.push({ type: c.type, page: c.page, priority: round(c.priority, 1) });
    continue;
  }
  used[c.budget]++;
  touched.add(c.page);
  actions.push({ ...c, priority: round(c.priority, 1) });
}

const advisory = [];
if (brandCrossover) {
  advisory.push({
    type: 'brand-crossover',
    note: '"pt 7" brand queries now out-number "pt studio 7" in two consecutive 28-day windows. PT7_SEO_PLAN.md decision #6 says to drop "PT Studio 7" from the homepage title/description now (and update the AGENTS.md exception).',
    data: brandCur,
  });
}
for (const t of targets.filter((t) => t.wrongPage && t.impressions >= 20)) {
  advisory.push({ type: 'target-on-wrong-page', note: `"${t.keyword}" mostly shows ${t.topPage} instead of ${t.page}`, data: t });
}
for (const c of cannibalization.slice(0, 5)) {
  advisory.push({ type: 'cannibalization', note: `"${c.query}" splits impressions across ${c.pages.map((p) => p.page).join(', ')}`, data: c });
}
for (const p of Object.values(pages)) {
  if (p.ga4.sessions >= O.lowEngagementMinSessions && p.ga4.engagementRate != null && p.ga4.engagementRate < O.lowEngagementRate) {
    advisory.push({ type: 'low-engagement', note: `${p.page}: organic engagement rate ${pct(p.ga4.engagementRate)} over ${p.ga4.sessions} sessions; the snippet may over-promise or the page under-delivers`, data: p.ga4 });
  }
}
for (const h of hygiene.filter((h) => h.issues.some((i) => /status|noindex/.test(i)))) {
  advisory.push({ type: 'sitemap', note: `${h.page}: ${h.issues.join('; ')}` });
}

// ---------------------------------------------------------------------------
// 5. Write the report
// ---------------------------------------------------------------------------

const kpi = (w) => {
  const s = siteWindow(gsc, w);
  const ga = [...ga4.values()].flat().filter((r) => r.date >= w.start && r.date <= w.end);
  return {
    clicks: s.totals.clicks,
    impressions: s.totals.impressions,
    position: round(s.totals.position, 1),
    nonbrandClicks: s.nonbrand.clicks,
    brandClicks: s.brand.clicks,
    nonbrandShare: s.nonbrand.clicks + s.brand.clicks ? round(s.nonbrand.clicks / (s.nonbrand.clicks + s.brand.clicks), 3) : null,
    organicSessions: ga.reduce((a, r) => a + r.sessions, 0),
    organicKeyEvents: ga.reduce((a, r) => a + r.keyEvents, 0),
  };
};

const report = {
  generatedAt: new Date().toISOString(),
  runDate,
  dataThrough: dataEnd,
  sources: { gscDays: gscDays.length, ga4Days: ga4Days.length, snapshots: snapshots.length },
  windows: W,
  siteCtrCalibration: round(siteRatio, 3),
  kpis: { week: kpi(W.week), prevWeek: kpi(W.prevWeek), cur28: kpi(W.cur), prev28: kpi(W.prev) },
  brand: { cur28: brandCur, prev28: brandPrev, crossover: brandCrossover },
  targets,
  experiments: changes.map(({ windows, ...c }) => ({ ...c, windows })),
  learnings,
  actions,
  deferred,
  advisory,
  hygiene,
  pages,
};

const md = [];
const delta = (a, b) => (b ? `${a >= b ? '+' : ''}${Math.round(((a - b) / b) * 100)}%` : '–');
const k = report.kpis;
md.push(`# Weekly SEO report — ${runDate}`, '');
md.push(`Search Console data through **${dataEnd}** · ${snapshots.length} weekly snapshot(s) · GA4 ${hasGa4 ? 'on' : 'off'}`, '');
if (!hasGsc) md.push('> ⚠ No Search Console data yet. Only on-page hygiene was evaluated.', '');
if (snapshots.length < 2) md.push('> First snapshot: change tracking starts with next week’s run.', '');
md.push('## KPIs', '', '| | Last 7d | vs prev | Last 28d | vs prev |', '|---|---|---|---|---|');
for (const [label, key] of [['Clicks', 'clicks'], ['Impressions', 'impressions'], ['Non-brand clicks', 'nonbrandClicks'], ['Organic sessions (GA4)', 'organicSessions'], ['Organic key events (GA4)', 'organicKeyEvents']]) {
  md.push(`| ${label} | ${k.week[key]} | ${delta(k.week[key], k.prevWeek[key])} | ${k.cur28[key]} | ${delta(k.cur28[key], k.prev28[key])} |`);
}
md.push(`| Non-brand share | ${pct(k.week.nonbrandShare)} | | ${pct(k.cur28.nonbrandShare)} | (goal ≥30% at 6 months) |`, '');
md.push(`Brand queries (28d): "pt 7" ${brandCur.pt7.impressions} impr / "pt studio 7" ${brandCur.ptStudio7.impressions} impr${brandCrossover ? ' → **crossover reached**' : ''}`, '');

md.push('## Experiments', '');
const shown = changes.filter((c) => c.verdict !== 'superseded').slice(-15).reverse();
if (!shown.length) md.push('_No changes detected between snapshots yet._', '');
else {
  md.push('| Page | Kind | Live since | Verdict | Evidence |', '|---|---|---|---|---|');
  for (const c of shown) {
    const ev = c.evidence
      ? c.kind === 'snippet'
        ? `CTR ${pct(c.evidence.before.ctr)} → ${pct(c.evidence.after.ctr)}, pos ${c.evidence.before.position} → ${c.evidence.after.position}${c.evidence.z != null ? `, z=${c.evidence.z}` : ''}`
        : `impr vs site ${c.evidence.impressionLiftVsSite != null ? pct(c.evidence.impressionLiftVsSite) : '–'}, pos Δ ${c.evidence.positionDelta ?? '–'}`
      : `${c.afterDays}/${E.minAfterDays} days of data`;
    md.push(`| ${c.page} | ${c.kind}${c.proposal ? ' (agent)' : ''} | ${c.detectedOn} | **${c.verdict}** | ${ev} |`);
  }
  md.push('');
}

md.push('## Planned actions', '');
if (!actions.length) md.push('_Nothing to change this week._', '');
for (const a of actions) {
  const detail =
    a.type === 'revert-snippet'
      ? `restore title “${a.restore.title}”`
      : a.type === 'rewrite-snippet'
        ? a.why
        : a.type === 'fix-snippet-hygiene'
          ? a.issues.join('; ')
          : a.type === 'strengthen'
            ? `${a.reason}; cover ${a.uncoveredQueries.map((q) => `“${q.query}”`).join(', ') || '—'}; links from ${a.addInternalLinksFrom.join(', ') || '—'}`
            : `content changed ${a.changedBetween.join('…')}`;
  md.push(`- **${a.type}** \`${a.page}\`: ${detail}`);
}
if (deferred.length) md.push('', `<details><summary>${deferred.length} deferred (budget / one per page)</summary>`, '', ...deferred.map((d) => `- ${d.type} \`${d.page}\``), '', '</details>');
md.push('');

md.push('## Target keywords (28d)', '', '| Keyword | Intended page | Impr | Clicks | Pos | Prev pos | Top page |', '|---|---|---|---|---|---|---|');
for (const t of targets) {
  md.push(`| ${t.keyword} | ${t.page} | ${t.impressions} | ${t.clicks} | ${t.position ?? '–'} | ${t.positionPrev ?? '–'} | ${t.topPage ? (t.wrongPage ? `⚠ ${t.topPage}` : '✓') : '–'} |`);
}
md.push('');

if (advisory.length) {
  md.push('## For a human', '', ...advisory.map((a) => `- **${a.type}**: ${a.note}`), '');
}
if (hygiene.length) {
  md.push(`<details><summary>On-page hygiene (${hygiene.length} pages)</summary>`, '', ...hygiene.map((h) => `- \`${h.page}\`: ${h.issues.join('; ')}`), '', '</details>', '');
}

fs.mkdirSync(dirs.reports, { recursive: true });
writeJson(path.join(dirs.reports, `${runDate}.json`), report);
fs.writeFileSync(path.join(dirs.reports, `${runDate}.md`), md.join('\n') + '\n');
writeJson(path.join(dirs.reports, 'latest.json'), report);
fs.writeFileSync(path.join(dirs.reports, 'latest.md'), md.join('\n') + '\n');
console.log(`✓ Report: ${changes.length} change(s) evaluated, ${actions.length} action(s), ${deferred.length} deferred, ${advisory.length} advisory → reports/${runDate}.md`);
