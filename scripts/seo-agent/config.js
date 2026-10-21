// Weekly SEO agent configuration. Thresholds are tuned for a small site
// (~350 organic visits/month), so evaluation windows are long and minimum
// sample sizes are modest. Raise them as traffic grows.

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const projectRoot = path.join(__dirname, '..', '..');

export const config = {
  baseUrl: 'https://www.pt7.nl',

  // Search Console property: "sc-domain:pt7.nl" for a Domain property,
  // "https://www.pt7.nl/" for a URL-prefix property.
  gscSite: process.env.GSC_SITE_URL || 'sc-domain:pt7.nl',
  ga4PropertyId: process.env.GA4_PROPERTY_ID || '',

  // Where history lives (a checkout of the `seo-data` branch in CI).
  dataDir: path.resolve(projectRoot, process.env.SEO_DATA_DIR || '.seo-data'),

  // GSC data is incomplete for the most recent ~2-3 days.
  gscLagDays: 3,
  // First run backfills this many days so baselines exist immediately.
  backfillDays: 120,
  // Days re-fetched on every run because GSC revises recent data.
  refetchDays: 4,

  // Brand queries have very high CTR and hide whether a snippet works,
  // so evaluation uses non-brand queries wherever there is enough of them.
  brandPattern: /\bpt\s*-?\s*(studio\s*)?(7|seven)\b|ptstudio\s*7|\bpt7\b/i,
  // Old vs new brand form, for the homepage title decision (#6 in PT7_SEO_PLAN.md).
  oldBrandPattern: /studio/i,

  evaluation: {
    // A change only counts once Google has had time to recrawl.
    settleDays: 7,
    // Before/after windows for a change.
    windowDays: 28,
    // Minimum after-window length before a verdict is given.
    minAfterDays: 21,
    // Neutral changes older than this are closed as "no effect".
    closeNeutralAfterDays: 70,
    // Minimum impressions per window to judge a snippet at all.
    minImpressions: 150,
    // Minimum expected clicks per window (position-adjusted) to judge CTR.
    minExpectedClicks: 4,
    // One-sided z threshold (~95%).
    z: 1.64,
  },

  opportunities: {
    // Page CTR at or below this share of the position-expected CTR = weak snippet.
    weakSnippetRatio: 0.6,
    // Page CTR at or above this share = strong snippet, keep it.
    strongSnippetRatio: 1.2,
    // "Striking distance" queries: positions where small gains pay off.
    strikingMin: 4,
    strikingMax: 20,
    strikingMinImpressions: 20,
    // Two pages sharing a query, each with at least this share of its impressions.
    cannibalShare: 0.2,
    cannibalMinImpressions: 30,
    // Organic landing engagement below this suggests the snippet over-promises.
    lowEngagementRate: 0.4,
    lowEngagementMinSessions: 20,
  },

  // How much the agent may change per run, so each effect stays measurable.
  budget: {
    maxSnippetChanges: 3,
    maxContentChanges: 2,
  },

  // Target keywords from PT7_SEO_PLAN.md. A query matches when it contains
  // every token (accents and order ignored).
  targets: [
    { keyword: 'reformer pilates amsterdam zuid', page: '/reformer-pilates-amsterdam/' },
    { keyword: 'reformer pilates amsterdam', page: '/reformer-pilates-amsterdam/' },
    { keyword: 'pilates amsterdam zuid', page: '/reformer-pilates-amsterdam/' },
    { keyword: 'pilates oud-zuid', page: '/reformer-pilates-amsterdam/' },
    { keyword: 'trx amsterdam', page: '/trx-training-amsterdam/' },
    { keyword: 'pilates equipment', page: '/equipment/' },
    { keyword: 'reformer kopen', page: '/equipment/' },
    { keyword: 'private pilates amsterdam', page: '/private-pilates-amsterdam/' },
    { keyword: 'prive pilates les', page: '/private-pilates-amsterdam/nl/' },
    { keyword: 'personal training amsterdam zuid', page: '/strength-training-amsterdam/' },
    { keyword: 'pilates docentenopleiding', page: '/academy/nl/' },
    { keyword: 'pilates instructor course amsterdam', page: '/academy/' },
    { keyword: 'prenatal pilates amsterdam', page: '/prenatal-pilates-amsterdam/' },
  ],

  // Pages the agent must never edit automatically. The move notice and its
  // blog post stay as written (PT7_SEO_PLAN.md, Phase 5).
  frozenPages: [
    '/congrats/',
    '/privacy/',
    '/classpass-offer/',
    '/opening-offer/',
    '/opening-offer/nl/',
    '/blog/pt-7-moves-to-olympisch-stadion/',
    '/blog/pt-7-moves-to-olympisch-stadion/nl/',
  ],
};

export const dirs = {
  gsc: path.join(config.dataDir, 'gsc'),
  ga4: path.join(config.dataDir, 'ga4'),
  snapshots: path.join(config.dataDir, 'snapshots'),
  reports: path.join(config.dataDir, 'reports'),
  proposals: path.join(config.dataDir, 'proposals'),
};
