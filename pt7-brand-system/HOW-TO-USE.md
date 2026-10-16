# Using the PT7 brand system in Cursor

1. Unzip and put the `pt7-brand` folder contents in your website repo as `brand/`.
2. Move `brand/.cursor/rules/pt7-brand.mdc` to `<repo>/.cursor/rules/pt7-brand.mdc` (create the folders). Cursor now applies the brand rules automatically.
3. Load the tokens once in your site: `<link rel="stylesheet" href="/brand/tokens.css">` (or `@import` it in your main CSS).
4. Use variables like `var(--ground)`, `var(--ink)`, `var(--gold)`, `var(--space-6)` and the type classes `.display`, `.heading`, `.eyebrow`, `.lead`, `.body`.
5. Logos are in `brand/assets/logos/` (SVG). Replace them with your original vector files if you have them — these are redraws of the PNG.
6. In Cursor chat, refer to the brand with `@pt7-brand` or `@brand/README.md` when asking for new pages.

Files: `README.md` (brand book) · `tokens.json` (source) · `tokens.css` (CSS variables) · `components/*` (previews + usage notes) · `assets/` (logos, track art, 1928 flame) · `reference-homepage-B.html` (approved homepage).

## Prices page

- `data/prices.json` — all prices as structured data (single source of truth). Build the page from this file; do not hard-code prices in markup.
- `reference-prices-page.html` — approved prices page design (Design canvas source). Layout: header → intro-offer card with 7-stripe → tabs (Memberships · Class packs · Private · Couples) → 4 price cards per tab (highlight = gold stripe + badge + gold button) → private tab has a coach-level switch (Master / Senior / Coach) → "What's included" row → FAQ with <details>.
- Prompt for Cursor: "Build /pricing from @brand/data/prices.json following @brand/reference-prices-page.html and the pt7-brand rules. Mobile: tabs wrap, cards stack, no horizontal scroll."
