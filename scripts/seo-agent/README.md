# Weekly SEO agent

Every Monday, `.github/workflows/seo-weekly.yml` runs this loop and opens a PR for review:

```
collect.js   Search Console (page + page×query, daily) and GA4 organic landing pages
snapshot.js  title / description / H1 / headings / content links of every sitemap URL, live
evaluate.js  diff snapshots → each change becomes an experiment; score it; plan actions
Claude Code  carries out the plan (prompt.md), within AGENTS.md rules
verify.js    the built pages serve exactly the proposed text; lengths ok; no guardrail breaches
PR           one PR per week: what changed, why, with the numbers
```

History (daily data, snapshots, reports, proposals) is committed to the **`seo-data`** branch, not `main`.

## How it decides

- **Any title/description change** (by a human or the agent) is detected from weekly snapshots and evaluated as an experiment. The before window is the 28 days before the change. The after window is 28 days, starting 7 days after detection so Google can recrawl.
- **Snippet changes** are scored on *position-adjusted CTR*: actual clicks ÷ the clicks expected at the positions the page held. A rank change can't pass for a better title. A two-rate Poisson test (z ≥ 1.64) decides:
  - **losing** → *revert* to the exact previous version
  - **winning** → keep it, then *strengthen* the page (cover striking-distance queries, add internal links). Its snippet is not touched.
  - **neutral** after the full window → closed as *no effect*. That variant is never re-proposed.
- **Content changes** are scored on impressions relative to the rest of the site (cancels seasonality) plus position.
- **Unchanged pages**: a CTR at ≤0.6× the site-calibrated expectation gets a snippet *rewrite* from its real queries. Strong or growing pages and target pages with queries at positions 4–20 get *strengthened*.
- Brand queries ("pt7", "pt studio 7") are left out of scoring wherever there is enough non-brand data.
- **Budget:** at most 3 snippet changes and 2 content changes per week, one action per page, and no edits to a page while its experiment is still running. This keeps every effect measurable.
- **Humans only (reported, never auto-fixed):** cannibalisation, target keyword ranking on the wrong page, low GA4 engagement, the "pt7" vs "pt studio 7" crossover (plan decision #6), sitemap URLs that 404 or are noindexed.

Tune all thresholds, the target keywords and the frozen pages in `config.js`.

## One-time setup

1. **Google Cloud** (any project): enable *Google Search Console API* and *Google Analytics Data API*. Create a service account and download a JSON key.
2. **Search Console** → Settings → Users and permissions → add the service account email (*Restricted* is enough).
3. **GA4** → Admin → Property access management → add the same email as *Viewer*. Note the numeric Property ID (Admin → Property details).
4. **GitHub repo → Settings → Secrets and variables → Actions**
   - Secrets: `GOOGLE_SERVICE_ACCOUNT_JSON` (the whole key file), `CLAUDE_CODE_OAUTH_TOKEN` (run `claude setup-token` locally, logged in with your claude.ai Pro/Max account; it uses your subscription, no API billing)
   - Variables: `GSC_SITE_URL` (`sc-domain:pt7.nl` for a Domain property, or `https://www.pt7.nl/`), `GA4_PROPERTY_ID`
5. **Settings → Actions → General → Workflow permissions**: "Read and write", and tick "Allow GitHub Actions to create and approve pull requests".
6. Commit `PT7_SEO_PLAN.md`: the agent follows its decisions, and CI only sees committed files.
7. First run: Actions → *Weekly SEO agent* → Run workflow with **apply off**. It backfills 120 days of data and posts the report in the run summary.

## Run locally

```bash
export SEO_DATA_DIR=.seo-data GSC_SITE_URL=sc-domain:pt7.nl GA4_PROPERTY_ID=123456789
export GOOGLE_SERVICE_ACCOUNT_JSON="$(cat ~/keys/pt7-seo.json)"
npm run seo:weekly          # collect + snapshot + evaluate
open .seo-data/reports/latest.md
npm run seo:test            # synthetic win/lose/rewrite/strengthen check
```

To start from CI history: `git worktree add .seo-data origin/seo-data`.
