---
name: seo
description: Reads AGENTS.md, performs thorough on-page/off-page SEO analysis for a named screen, produces a change plan only, then hands off to implementation after explicit user approval. Use when the user invokes /seo, @seo, or asks for the SEO analysis-and-plan workflow before development.
disable-model-invocation: true
---

# SEO (`/seo`)

## When this skill applies

The user named **this skill** (`/seo`, `@seo`, or equivalent). Do **not** implement code or edit files until the user **explicitly approves** the plan.

## Step 1 — Read project agent context

1. Read **`AGENTS.md`** at the repository root (same directory as `package.json`).
2. Use it for: canonical host, route list, SEO vs Marketing vs Developer ownership, sitemap/prerender pointers, and **which files typically back each screen**.

If **`AGENTS.md`** is missing, note that gap and still proceed using `src/App.tsx` routes and this repo’s patterns (`SEOHead`, `StructuredData`, `public/sitemap.xml`, `scripts/generate-static-routes.js`, `public/llms.txt`).

## Step 2 — Scope the “provided screen”

From the user message, fix the **screen** (one primary target):

| User might say | Resolve to |
|----------------|------------|
| Path (`/pricing`, `/`) | Route → primary page under `src/pages/` (and related components/data). |
| Page name (“Home”, “Pricing”) | Map to route + `src/pages/…`. |
| File path | Treat that file as primary; include parent route if obvious. |

State the **route**, **primary files**, and **secondary files** (e.g. `SEOHead` usage, `StructuredData`, shared data in `src/data/`, `public/sitemap.xml` entries, images under `public/assets/`).

## Step 3 — Thorough analysis (no edits yet)

Cover everything relevant to that screen. Use the codebase (read files) as evidence—not guesses.

**Technical / discovery**

- `SEOHead` (or equivalent): title, description, keywords, canonical, OG/Twitter; `ogImage` path exists under `public/`.
- JSON-LD / `StructuredData`: types used, NAP and offer consistency vs **`AGENTS.md`** / **`public/llms.txt`**.
- Heading model: single **`h1`** where appropriate; logical **`h2`/`h3`**; hero/section semantics.
- Links: internal links to priority URLs; external `rel`; crawlable navigation.
- Media: meaningful **`alt`**; hero/lazy/fetch priority where it matters; **`iframe title`** if present.
- **Sitemap**: URL present, `lastmod`/priority sensible if the screen is public.
- **Prerender**: route listed in **`scripts/generate-static-routes.js`** if new or non-index routes matter for static HTML.
- **Cross-doc**: if copy asserts facts, **`public/llms.txt`** alignment.

**Content / intent (still analysis, not rewrite)**

- Primary query or user intent for the screen; gaps vs current title/description/body.
- Duplication or cannibalization vs other routes (same head terms, thin pages).

Output **findings** grouped: *Critical*, *Important*, *Nice-to-have*. Cite file paths and short evidence (line-level only when useful).

## Step 4 — Plan (still no implementation)

Produce a **numbered change plan**. Each item must include:

- **Action** (what to change).
- **File(s)** (exact paths).
- **Rationale** (SEO why).
- **Risk / note** (e.g. marketing tone, legal/pregnancy pages, analytics).

End with: **“No files have been modified. Reply with approval to proceed (e.g. ‘approved’ or ‘implement the plan’), or request revisions.”**

## Step 5 — After user approves the plan

Only after **explicit approval** in the user’s reply (e.g. “approved”, “implement the plan”, “LGTM”):

1. **Do not** expand scope beyond what was approved.
2. **Hand off to the Developer agent**: output one **Developer handoff** block (below). That block is the primary deliverable so a **developer**-scoped follow-up (or the same agent under developer rules) can implement without redoing discovery.

```markdown
## Developer handoff — SEO plan approved

**Screen / route:** …
**Approved plan summary:** …

### Implementation checklist (ordered)
1. … — files: …
2. … — files: …

### Acceptance criteria
- …
- `npm run build` succeeds if routes, prerender list, sitemap, or TS/React files change.

### Out of scope (do not do)
- …

### Reference
- Approved in this thread. Read **`AGENTS.md`**. Rules: `.cursor/rules/ptstudio7-developer.mdc`, `.cursor/rules/ptstudio7-seo.mdc`.
```

3. **Implementation in this same chat**: run code edits **only** if the user clearly asked for it together with approval (e.g. “approved — implement now”). Otherwise **stop after the handoff** so the workflow stays analyze → plan → approve → **developer implements**.

## Anti-patterns

- Implementing before approval.
- Changing canonical domain or stripping GTM/analytics without stakeholder direction (see **`AGENTS.md`**).
- Planning without reading **`AGENTS.md`** first.
