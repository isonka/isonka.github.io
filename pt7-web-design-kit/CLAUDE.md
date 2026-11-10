# PT7 website — design kit (app language)

Design source of truth for pt7.nl. It uses the same language as the PT7 app (rounded, cream, glass chrome, 7-stripe), scaled for the browser. Drop this folder into the website repo as `design/` and import it from the root CLAUDE.md with `@design/CLAUDE.md`. For Cursor, `.cursor/rules/pt7-web.mdc` is already set up.

## What's here
- `css/pt7-web.css` — tokens + base + every component as CSS classes. Link it once; build pages from its classes.
- `tokens/tokens.css` — CSS variables only. `tokens/tokens.json` — same values for Tailwind/JS.
- `docs/components.md` — every component: class names, sizes, states.
- `reference/homepage.html` — full responsive homepage built only from the kit. Open it at 1440 and 390 wide.
- `reference/kit.html` — visual overview of colours, type, shapes and live components.
- `assets/` — logos and line icons (stroke = currentColor). Same files as the app.
- `data/` — real content from pt7.nl (Nov 2026): pricing, instructors, blog, equipment. In production: Mindbody (classes, prices, coaches), admin panel (campaign hero, news).

## Hard rules
- Font: Poppins only (300/400/500/600). Headlines light (300) with the last word medium (500), sentence case, end with a full stop: "Meet your **coaches.**"
- Colours are the app's. Gold `#ffd700` is a fill only. Gold as text = `--pt7-gold-text` `#7a6400`.
- Rounded: pills for buttons, chips, nav and tab bar; 24 cards; 32 hero frame and sheets; 16 inputs; 14 thumbs; 36 modals. Nothing square.
- Glass only on floating chrome: sticky nav, phone tab bar, bottom sheets, buttons over photos. Never on cards.
- Lane colour = the slanted 7-stripe (`.pt7-stripe .lane-*`): Pilates gold, Yoga sage, Strength/TRX orange. Never tint whole cards.
- One charcoal feature card per page (Academy or a campaign).
- Eyebrows sentence case. No all caps, no emoji, no exclamation marks. Line icons 1.5–1.8 stroke.
- No horizontal scrolling inside sections. Rails become grids (coaches: 4-up desktop, 2-up phone).
- Touch targets ≥44px. Text contrast ≥4.5:1.
- Bracketed copy (`[Coach]`, `[price]`) is live data. Never hard-code it.

## Layout
- Content max 1200, gutter 24 (16 on phones). Sections 96 apart (56 on phones).
- Breakpoints: 1024 tablet type; 960 nav links collapse into the menu, 4-up grids go 2-up, splits stack; 720 phone: app type scale, single column, glass tab bar at the bottom (Home, Schedule, Prices, Shop, Academy), add `.pt7-has-tabbar` to `<body>`.
- Hero: rounded photo frame (`.pt7-hero__media`, 640 high) with a cream sheet overlapping it (`.pt7-hero__sheet`). On phones it becomes the app hero: edge-to-edge photo 440 high, sheet with 32 top corners, −36 overlap.

## Workflow for a page
1. Look at `reference/homepage.html` and the matching app screen (the app kit's `reference/png/`).
2. Build from kit classes. If you need a hex or px not in the tokens, it's probably wrong.
3. Check it at 1440, 1024, 390. No horizontal scroll at 390.
