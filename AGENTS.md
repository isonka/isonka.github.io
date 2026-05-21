# Agent guide — PT Studio 7 website

This document orients **SEO**, **Marketing**, and **Developer** agents working on this repository. Human maintainers can point automation or Cursor rules here so each agent knows scope, facts, and where to change things safely.

For day-to-day human setup, see [README.md](./README.md).

---

## 1. Project snapshot (all agents)

| Item | Detail |
|------|--------|
| **What this is** | Marketing site for **PT Studio 7 Amsterdam** — Reformer Pilates, TRX, strength training, small groups and privates. |
| **Stack** | React 19, TypeScript, Vite 7, React Router 7. Static output in `dist/` after build. |
| **Production site** | `https://www.pt7.nl` (canonical URLs and structured data assume this host). |
| **Repo / hosting** | GitHub repo `isonka.github.io`; **GitHub Pages** deploy via [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) on push to `main` (and manual `workflow_dispatch`). |
| **Node** | `>=20.19.1` (see `package.json` and workflow). |
| **Build** | `npm run build` runs TypeScript, Vite build, static route generation, and **Puppeteer prerender** for HTML snapshots (important for crawlers and first paint). |
| **AI / LLM context** | `public/llms.txt` — curated business facts; keep in sync when marketing facts change. |

**Do not** change production canonical base (`https://www.pt7.nl`) in SEO components unless the business explicitly moves domain — `SEOHead` hardcodes the OG image base URL.

---

## 2. Canonical facts (Marketing + SEO — cite consistently)

Use these in copy, meta, and structured data. If something changes in the real world, update **both** site content and `public/llms.txt` where applicable.

- **Brand**: PT Studio 7 Amsterdam  
- **Web**: `https://www.pt7.nl`  
- **Address**: Van Baerlestraat 76C, 1071 BB Amsterdam (Museumplein area)  
- **Email**: info@pt7.nl  
- **Phone**: +31 685 162693  
- **Social**: Instagram `@ptstudio7amsterdam`; Facebook / LinkedIn company pages (see `public/llms.txt`)  
- **Positioning**: Boutique studio, small groups (site copy often mentions max 5), privates, pregnancy-friendly offering, English-Turkish friendly, expats and locals from museumplein area  

MindBody widget IDs (booking) are documented in README; Schedule/Pricing pages embed widgets — verify IDs there before editing.

---

## 3. SEO agent

### Role

Improve discoverability, correct metadata, structured data, sitemap, internal linking, and crawler-friendly output — without breaking the prerender pipeline or contradicting canonical URLs.

### Homepage (landing `/`)

The home route is implemented in **`src/pages/Home.tsx`**. SEO work here includes **`SEOHead`** / **`StructuredData`** on that page plus on-page signals: a single primary **`h1`**, logical heading levels, descriptive **`alt`** text, working **social preview image** paths under `public/`, internal links to key routes, and consistency with **`public/llms.txt`**. Cursor’s SEO project rule attaches to this file when you iterate on the home screen.

### Key files and patterns

| Area | Location |
|------|----------|
| Per-page title, description, keywords, canonical, OG/Twitter | `src/components/SEOHead.tsx` — consumed on each page; passes **absolute** `canonical` (typically `https://www.pt7.nl/...`). |
| JSON-LD | `src/components/StructuredData.tsx` + page-level usage. |
| Sitemap | `public/sitemap.xml` — update `loc`, `lastmod`, and entries when routes or priority change. |
| Static routes for prerender | `scripts/generate-static-routes.js` — new public routes usually need inclusion so prerender generates HTML. |
| Prerender | `scripts/prerender-static-html.js` — uses Puppeteer; CI installs Chrome (see workflow). |
| Breadcrumbs | `src/components/Breadcrumbs.tsx` |
| Public hints | `public/llms.txt`, `index.html` default meta if any |

### Route reference (sync with `src/App.tsx`)

Core paths include: `/`, `/pricing`, `/schedule`, `/equipment`, `/equipment/:slug`, `/workouts/:slug`, `/instructors`, `/trainer/:slug`, `/academy`, `/blog`, `/blog/:slug`, `/congrats`, `/classpass-offer`, `/healthcare-providers`, `/prenatal-pilates-amsterdam`, `/pregnancy-pilates-amsterdam`, `/private-pilates-amsterdam`, `/trx-training-amsterdam`, `/strength-training-amsterdam`. Legacy redirects: `/index.html` → `/`, `/congrats.html` → `/congrats`.

### Checklist when adding or renaming a page

1. Add route in `src/App.tsx` (and lazy import if following existing pattern).  
2. Add `SEOHead` + any `StructuredData` on the page.  
3. Append URL(s) to `public/sitemap.xml` with sensible `changefreq` / `priority`.  
4. Ensure `scripts/generate-static-routes.js` includes new paths so prerender runs.  
5. Run `npm run build` locally if possible; fix TypeScript and prerender errors.  
6. Align key claims with `public/llms.txt`.

### Guardrails

- Keep **one canonical URL** per page; avoid duplicate content across paths.  
- OG image defaults live under `public/assets/images/`; large social images should meet typical 1200×630 guidance (see `SEOHead` defaults).  
- Do not strip or bypass GTM / analytics in `index.html` unless explicitly requested by stakeholders — Marketing relies on these.

---

## 4. Marketing agent

### Role

Messaging, offers, partner pages (e.g. ClassPass), campaign landing copy, trainer bios, blog content, pricing presentation, and consistency of brand voice — implemented in React pages/components and data modules.

### Where content usually lives

| Content type | Typical locations |
|--------------|-------------------|
| Home sections, hero, reviews | `src/pages/Home.tsx`, `src/styles/Home.css`, images under `public/assets/images/` |
| Pricing copy and packages | `src/pages/Pricing.tsx`, `src/styles/Pricing.css` |
| Schedule framing (widget is external) | `src/pages/Schedule.tsx` |
| Equipment catalog | `src/pages/Equipment.tsx`, `src/pages/EquipmentDetail.tsx`, `src/data/workouts.ts` / related data |
| Trainers list and detail | `src/pages/Trainers.tsx`, `src/pages/TrainerDetail.tsx`, `src/data/trainers.ts` |
| Blog | `src/data/blogPosts.ts`, `src/pages/Blog.tsx`, `src/pages/BlogPost.tsx` |
| Workouts | `src/data/workouts.ts`, `src/data/workoutDetails.ts`, `src/pages/WorkoutDetail.tsx` |
| Academy / healthcare / pregnancy / city SEO landers | Matching files under `src/pages/` and co-located CSS in `src/styles/` |
| Footer / nav | `src/components/Footer.tsx`, `src/components/Navbar.tsx` |
| Cookie / consent copy | `src/components/CookieConsent.tsx` |
| Tracking helpers | `src/utils/gtmTracking.ts`, `src/utils/fbPixelTracking.ts` |

### Guardrails

- Match existing tone: professional, welcoming, clear; avoid unverifiable superlatives unless supported elsewhere on site or in `llms.txt`.  
- Any **price, legal, or medical** claim should be double-checked with stakeholders; pregnancy and healthcare pages need careful wording.  
- After copy changes that alter facts (hours, address, services), update **`public/llms.txt`** and any FAQ or structured data on affected pages.  
- Images: prefer WebP in `public/assets/images/`; repo includes `scripts/convert-to-webp.js` for batch work.

---

## 5. Developer agent

### Role

Feature work, refactors, performance, routing, build pipeline, dependencies, and bug fixes — preserving SEO and marketing instrumentation.

### Commands

```bash
npm install          # dependencies
npm run dev          # Vite dev server (default http://localhost:5173)
npm run lint         # ESLint
npm run build        # full production build + static routes + prerender
npm run build:only   # tsc + vite only (no prerender) — faster debug
npm run preview      # serve dist locally
```

Deploy: merging to `main` triggers GitHub Actions; no separate `npm run deploy` needed for Pages if that workflow is enabled.

### Architecture notes

- **SPA + prerender**: Client-side routing with React Router; prerender writes static HTML for configured routes — understand both before changing hydration or root layout.  
- **GitHub Pages**: `RedirectHandler` in `src/App.tsx` reads `sessionStorage` for `ghPagesRedirect` (SPA fallback from `404.html` pattern). Do not remove without a replacement strategy.  
- **Vite**: `vite.config.ts` — `base: '/'` for root domain; change only if hosting path changes.  
- **Code splitting**: Many pages are `lazy()` loaded in `App.tsx`; keep Suspense boundaries coherent when adding routes.  
- **Type safety**: Run `tsc -b` via build; fix types in `src/` and strict data modules.

### Guardrails

- Do not commit secrets; analytics IDs in `index.html` are public by nature but still treat config as intentional.  
- Puppeteer in CI: workflow caches browser; if build fails on prerender, check Chrome install step and route list.  
- Respect `.nvmrc` / `engines` when advising Node version.

---

## 6. How agents should hand off work

1. **Developer** adds or changes routes and build behavior.  
2. **SEO** updates `SEOHead` / `StructuredData` / `sitemap.xml` / prerender list.  
3. **Marketing** updates page copy, `blogPosts.ts`, `trainers.ts`, and `public/llms.txt` for outward-facing facts.

Any single change that spans areas should list touched files in the PR or automation summary so reviewers see SEO + content + code together.

---

## 7. Quick file index

| Path | Purpose |
|------|---------|
| `src/App.tsx` | Routes, lazy pages, GH Pages redirect handler |
| `src/components/SEOHead.tsx` | Meta, OG, Twitter, canonical |
| `src/components/StructuredData.tsx` | JSON-LD schemas |
| `public/sitemap.xml` | URL discovery for search engines |
| `public/llms.txt` | Consolidated brand/service facts for LLMs |
| `scripts/generate-static-routes.js` | URLs fed to prerender |
| `scripts/prerender-static-html.js` | Static HTML generation |
| `.github/workflows/deploy.yml` | CI build and GitHub Pages deploy |

---

*Last aligned with repository layout and README as of project state in-repo; update this file when deployment target, domain, or major information architecture changes.*
