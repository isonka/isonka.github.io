// Step 1: pull Search Console + GA4 data into one file per day.
// Idempotent: fetches only missing days plus the last few (GSC revises
// recent data), so a skipped week heals itself on the next run.

import fs from 'fs';
import path from 'path';
import { config, dirs } from './config.js';
import { gscQuery, ga4OrganicLandingPages } from './lib/google.js';
import { addDays, dateRange, listDated, today, writeJson } from './lib/util.js';

function daysToFetch(dir, end) {
  const have = new Set(listDated(dir).map((f) => f.slice(0, 10)));
  const start = addDays(end, -config.backfillDays + 1);
  const refetchFrom = addDays(end, -config.refetchDays + 1);
  return dateRange(start, end).filter((d) => !have.has(d) || d >= refetchFrom);
}

async function collectGsc(end) {
  const days = daysToFetch(dirs.gsc, end);
  console.log(`GSC: ${days.length} day(s) to fetch for ${config.gscSite}`);
  for (const date of days) {
    // Page totals come from their own query: the query dimension drops
    // anonymised queries, so summing query rows undercounts.
    const [pages, queries] = await Promise.all([
      gscQuery(config.gscSite, date, ['page']),
      gscQuery(config.gscSite, date, ['page', 'query']),
    ]);
    writeJson(path.join(dirs.gsc, `${date}.json`), { date, pages, queries });
    process.stdout.write('.');
  }
  if (days.length) process.stdout.write('\n');
}

async function collectGa4(end) {
  if (!config.ga4PropertyId) {
    console.log('GA4: GA4_PROPERTY_ID not set, skipping');
    return;
  }
  const days = daysToFetch(dirs.ga4, end);
  if (!days.length) return;
  console.log(`GA4: ${days.length} day(s) to fetch for property ${config.ga4PropertyId}`);
  const rows = await ga4OrganicLandingPages(config.ga4PropertyId, days[0], days[days.length - 1]);
  const wanted = new Set(days);
  const byDay = Object.fromEntries(days.map((d) => [d, []]));
  for (const r of rows) if (wanted.has(r.date)) byDay[r.date].push(r);
  for (const [date, dayRows] of Object.entries(byDay)) {
    writeJson(path.join(dirs.ga4, `${date}.json`), { date, rows: dayRows });
  }
}

const end = addDays(today(), -config.gscLagDays);
fs.mkdirSync(config.dataDir, { recursive: true });
await collectGsc(end);
await collectGa4(addDays(today(), -1));
console.log(`✓ Data collected through ${end} into ${config.dataDir}`);
