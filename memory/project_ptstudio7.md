---
name: PT Studio 7 Amsterdam - Project Overview
description: Details about the ptstudio7amsterdam.nl website project built with React + TypeScript + Vite
type: project
---

PT Studio 7 Amsterdam is a boutique Reformer Pilates studio website at Van Baerlestraat 76C, Amsterdam Museumplein.

**Tech Stack**: React 19 + TypeScript + Vite + React Router v7
**Deployment**: GitHub Pages (primary) + Netlify support
**Primary domain**: https://www.pt7.nl/ (secondary: ptstudio7amsterdam.nl — to be consolidated via 301 redirect)

**Key features**:
- 19 routes with lazy-loaded pages (added 4 service landing pages in 2026-03-27 SEO sprint)
- SEOHead.tsx component for dynamic meta tags per route
- StructuredData.tsx for JSON-LD schema injection
- Post-build script (generate-static-routes.js) creates static HTML for each route with correct OG tags for social sharing
- MindBody Healcode widget for class booking
- Google Tag Manager (GTM-KB25PGXB), Google Analytics (G-J7K4DF0N40), Google Ads (AW-17684932205), Meta Pixel (1197758608916828)
- Chatbot component integrated

**SEO**: Very mature setup — 5 structured data schemas, full OG/Twitter cards, geo-targeting, 27-URL sitemap, llms.txt, AI-friendly robots.txt

**Known issues (as of 2026-03-27 — post SEO sprint)**:
- No WebP images — all images are JPG/PNG/JPEG in public/assets/images/
- Meta Pixel loads synchronously at top of <head> (render-blocking — should be deferred)
- ViteImageOptimizer only optimizes assets imported in JS/CSS, NOT the public/ folder images
- Max 4/5 inconsistency FIXED (2026-03-27) — homepage meta description intentionally kept at "max 5" per client instruction; all other content updated to "max 4"
- Only en + x-default hreflang, missing nl hreflang
- No manifest.json (PWA not configured)
- ptstudio7amsterdam.nl domain redirect added to netlify.toml — requires domain alias setup in Netlify dashboard

**Why:** This context helps understand the architecture and known issues when making changes.
**How to apply:** When suggesting image optimization, remember public/ folder images bypass Vite's optimizer. When touching SEO copy, check for the 4 vs 5 participants inconsistency.
