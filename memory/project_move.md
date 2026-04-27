---
name: PT Studio 7 - Planned Location Move
description: Studio is planning to move from Van Baerlestraat 76C to Beethovenstraat 57H, Amsterdam
type: project
---

PT Studio 7 is planning to move to **Beethovenstraat 57H, Amsterdam Oud-Zuid**.

**Current address**: Van Baerlestraat 76C, 1071BB Amsterdam (Museumplein)
**New address**: Beethovenstraat 57H, Amsterdam (postcode TBC — likely 1077 area)

**Why:** Studio is relocating. Beethovenstraat was chosen over Laan der Hesperiden 144. Existing client base confirmed they will follow to Beethovenstraat.

**How to apply:** When the move is confirmed, the entire website needs to be updated:
- Address in structured data (index.html: Organization, LocalBusiness schemas)
- Address in StructuredData.tsx (LocalBusiness schema)
- geo coordinates in index.html and SEOHead.tsx
- Google Maps link (hasMap field in schema)
- Meta description and og:description (currently mention "Museumplein")
- Title tags (currently mention "Museumplein")
- Static fallback content in index.html
- llms.txt in public/
- sitemap.xml lastmod dates
- generate-static-routes.js (any address references)
- SEO keywords (currently "Pilates Museumplein Amsterdam")
