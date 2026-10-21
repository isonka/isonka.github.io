// Synthetic end-to-end check of evaluate.js: plant a winning title change, a
// losing one, a weak snippet and a target page in striking distance, then
// assert the plan reverts / rewrites / strengthens the right pages.

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'child_process';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';
import { expectedCtr } from '../lib/metrics.js';
import { addDays, dateRange } from '../lib/util.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const BASE = 'https://www.pt7.nl';
const CHANGE_LIVE = '2026-09-03';

// page → [query, position, impressions/day, ctr multiplier before, after]
const PLAN = {
  '/winner/': [['pilates oud zuid', 6, 60, 1, 2.2]],
  '/loser/': [['reformer class amsterdam', 6, 60, 1, 0.35]],
  '/weak/': [['pilates prices amsterdam', 5, 50, 0.3, 0.3]],
  '/trx-training-amsterdam/': [
    ['trx amsterdam', 3, 40, 1, 1],
    ['suspension training amsterdam', 9, 15, 1, 1],
  ],
  '/steady/': [
    ['pilates studio amsterdam', 7, 200, 1, 1],
    ['pt studio 7', 1, 30, 1, 1],
  ],
};

function page(title, extra = {}) {
  return {
    status: 200,
    title,
    description: `${title} — a description long enough to pass the seventy character minimum check.`,
    h1: [title],
    h2: ['About'],
    canonical: null,
    robots: 'index, follow',
    lang: 'en',
    hreflang: [],
    words: 600,
    contentHash: 'same',
    contentLinks: [],
    ...extra,
  };
}

function snapshot(date, titles) {
  const pages = {};
  for (const [p, t] of Object.entries(titles)) pages[p] = { url: BASE + p, ...page(t), canonical: BASE + p };
  return { date, pages };
}

function setup() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'seo-agent-'));
  for (const date of dateRange('2026-06-18', '2026-10-16')) {
    const pages = [];
    const queries = [];
    for (const [p, qs] of Object.entries(PLAN)) {
      let clicks = 0;
      let impressions = 0;
      for (const [query, position, impr, before, after] of qs) {
        const mult = date >= CHANGE_LIVE ? after : before;
        const c = Math.round(impr * expectedCtr(position) * mult * (query.includes('studio 7') ? 2 : 1));
        queries.push({ page: BASE + p, query, clicks: c, impressions: impr, position });
        clicks += c;
        impressions += impr;
      }
      pages.push({ page: BASE + p, clicks, impressions, position: qs[0][1] });
    }
    fs.mkdirSync(path.join(dir, 'gsc'), { recursive: true });
    fs.writeFileSync(path.join(dir, 'gsc', `${date}.json`), JSON.stringify({ date, pages, queries }));
  }

  const titles = {
    '/winner/': 'Old winner title',
    '/loser/': 'Old loser title',
    '/weak/': 'Weak page',
    '/trx-training-amsterdam/': 'TRX Amsterdam',
    '/steady/': 'Steady page',
  };
  const changed = { ...titles, '/winner/': 'New winner title', '/loser/': 'New loser title' };
  fs.mkdirSync(path.join(dir, 'snapshots'), { recursive: true });
  for (const [date, t] of [['2026-08-31', titles], ['2026-09-07', changed], ['2026-10-19', changed]]) {
    fs.writeFileSync(path.join(dir, 'snapshots', `${date}.json`), JSON.stringify(snapshot(date, t)));
  }
  fs.mkdirSync(path.join(dir, 'proposals'), { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'proposals', `${addDays(CHANGE_LIVE, -2)}.json`),
    JSON.stringify({ changes: [{ page: '/winner/', kind: 'snippet', after: { title: 'New winner title' }, hypothesis: 'neighbourhood in title' }] }),
  );
  return dir;
}

test('evaluate.js reverts losers, keeps winners, rewrites weak snippets, strengthens targets', () => {
  const dir = setup();
  execFileSync(process.execPath, [path.join(here, '..', 'evaluate.js')], {
    env: { ...process.env, SEO_DATA_DIR: dir, SEO_TODAY: '2026-10-19' },
    stdio: 'pipe',
  });
  const report = JSON.parse(fs.readFileSync(path.join(dir, 'reports', 'latest.json'), 'utf8'));
  const verdict = (p) => report.experiments.find((e) => e.page === p && e.kind === 'snippet')?.verdict;

  assert.equal(verdict('/winner/'), 'winning');
  assert.equal(verdict('/loser/'), 'losing');
  assert.equal(report.experiments.find((e) => e.page === '/winner/').proposal?.hypothesis, 'neighbourhood in title');

  const action = (p) => report.actions.find((a) => a.page === p);
  assert.equal(action('/loser/')?.type, 'revert-snippet');
  assert.equal(action('/loser/').restore.title, 'Old loser title');
  assert.equal(action('/weak/')?.type, 'rewrite-snippet');
  assert.notEqual(action('/winner/')?.type, 'rewrite-snippet');
  assert.notEqual(action('/winner/')?.type, 'fix-snippet-hygiene');

  const strengthen = report.actions.filter((a) => a.type === 'strengthen').map((a) => a.page);
  assert.ok(strengthen.includes('/winner/'), `winner should be strengthened, got ${strengthen}`);
  assert.ok(report.actions.length <= 5, 'stays within budget');

  const trx = report.targets.find((t) => t.keyword === 'trx amsterdam');
  assert.equal(trx.topPage, '/trx-training-amsterdam/');
  assert.equal(trx.position, 3);
  assert.equal(report.brand.cur28.ptStudio7.impressions, 30 * 28);

  if (process.env.SEO_KEEP_FIXTURE) console.log(dir);
  else fs.rmSync(dir, { recursive: true, force: true });
});
