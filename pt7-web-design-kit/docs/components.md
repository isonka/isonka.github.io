# PT7 web components

All classes live in `css/pt7-web.css`. Put `class="pt7"` on `<body>` (or a wrapper). Values reference `tokens/`.

## Type
| Class | Desktop | ≤1024 | ≤720 (= app) |
|---|---|---|---|
| `.pt7-display` (h1) | 300 72/76, −2px | 56/60 | 40/42 |
| `.pt7-heading` (h2) | 300 44/50, −1px | 36/42 | 30/34 |
| `.pt7-title` | 400 22/30 | | 20/28 |
| `.pt7-lead` | 400 18/28, ink-muted | | 17/26 |
| body | 400 16/24 | | 16/22 |
| `.pt7-meta` | 400 13/18, ink-muted | | |
| `.pt7-eyebrow` | 500 13/18, 0.04em, gold-text | | |
| `.pt7-label` | 500 13/18, ink-muted (group labels, form labels) | | |
Key word in a headline: `<b>` (renders medium 500). `.pt7-head` = heading row with a right-aligned text link.

## 7-stripe
`<span class="pt7-stripe lane-pilates" aria-hidden="true">` — 14×22. `--sm` 11×18 (coach cards). `--lg` 40×64 (section edges, campaign blocks). Lanes: `lane-pilates` gold, `lane-yoga` sage, `lane-strength` orange.

## Buttons — `.pt7-btn` + variant + size
| Variant | Look | Use |
|---|---|---|
| `--primary` | gold, ink text | main action ("Book a class", "Buy") |
| `--outline` | 1px ink ring | secondary ("Schedule", "Waitlist") |
| `--quiet` | stone fill | low emphasis, "Booked" state, close |
| `--ink` | charcoal, cream text | action on gold cards |
| `--text` | gold-text, no fill | "See all", "Full schedule" |
| `--glass` | glass | buttons floating over photos |
Sizes: default 44, `--lg` 52 (hero, card CTA), `--sm` 36 (row actions), `--round` 44×44 icon button. Group with `.pt7-btns`. Hover on gold = gold-deep. Disabled = 40% opacity.

## Chips, badges, segmented
- `.pt7-chip` 40 high, white + hairline. Selected: `aria-pressed="true"` → ink fill. Filters ("All", "Pilates", "All coaches").
- `.pt7-badge` 24 high gold pill ("Most popular", "Best value"). `--stone` for status ("Open"), `--ink` for "New".
- `.pt7-seg` stone pill with `button[role=tab]`; selected `aria-selected="true"` → white + hairline + medium.

## Cards
- `.pt7-card` white, hairline, radius 24. `--pad` 24 padding.
- `.pt7-card--feature` charcoal, padding 32 (48 desktop hero-size). One per page: Academy, campaigns (e.g. Black Friday).
- `.pt7-card--gold` gold fill for the intro offer. Button inside = `--ink`.
- `.pt7-photo` placeholder/photo slot, radius 24, `[Photo: …]` caption. Put `<img>` inside when real.
- `.pt7-stats` + `.pt7-stat` (`.pt7-stat__n` 36 light number + meta). Stays 3-up on phones. Dark automatically inside a feature card.

## Lists
`.pt7-list` (white card, radius 24) holding `li > .pt7-row`. Rows are divided by hairlines, min 64 high, padding 14 16 14 20.
- `.pt7-row__time` 48 wide, medium (schedule).
- `.pt7-row__main` name + `.pt7-meta`.
- `.pt7-row__end` price / actions / `.pt7-chev`.
- Make the whole row a link with `a.pt7-row` (hover = cream).
Row states (schedule): bookable → `--primary --sm` "Book"; full → `--outline --sm` "Waitlist" + meta "Full"; booked → `--quiet --sm` "✓ Booked" (not a button). Scarcity in meta: "3 spots left".

## Coach card
`a.pt7-coach` → `.pt7-photo` (4:5, radius 24) + `.pt7-coach__name` (small stripe + name + meta). Grid `.pt7-grid--4` (2-up ≤960). Hide extra coaches on phones with `.pt7-hide-sm`.

## Glass chrome
- `.pt7-nav > .pt7-nav__bar` sticky capsule (top 16, 64 high, glass). Inside: `.pt7-nav__logo` (logo 30 high), `.pt7-nav__links` (pill links, active `aria-current="page"` = gold), `.pt7-nav__end` (Log in quiet + Book primary + `.pt7-nav__menu` round). ≤960 links hide and the menu button shows. ≤720 the bar is 56 high and "Log in" moves into the menu.
- `.pt7-tabbar` phones only (≤720): fixed capsule, 5 items, 22px icons from `assets/icons/`, active gold pill. Body gets `.pt7-has-tabbar`.

## Hero
`.pt7-hero` (pulls up under the sticky nav) → `.pt7-hero__media` (photo, 640 high, radius 32) + `.pt7-hero__sheet` (cream, radius 32, overlaps the photo by 200, max 620 wide). Content: eyebrow, `.pt7-display`, `.pt7-lead`, `.pt7-btns` with `--lg` buttons. Phones: app hero (photo 440 edge to edge, sheet −36, 32 top corners, buttons fill the row). Campaigns (admin panel) swap the photo and copy only.

## Layout
`.pt7-wrap` (1200 + gutters), `.pt7-section` (96 top / 56 on phones), `.pt7-grid--2/3/4`, `.pt7-split` (two equal columns, stacks ≤960).

## Forms
`.pt7-field` > `.pt7-label` + `.pt7-input` (52 high, white, hairline, radius 16, 16px text so iOS doesn't zoom).

## Footer
`.pt7-footer` stone, 32 top corners, logo + address + pill links + "Download the app".

## Evening theme
`data-theme="evening"` on any element flips ground/ink/line tokens to charcoal. Use for Academy pages and campaign blocks.
