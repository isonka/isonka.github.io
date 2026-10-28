# PT7 SEO Strategy

Oct 21, 2026 · @Onur

## Situation

pt7.nl did not appear in any of 15 searches checked on 21 Oct 2026, including the two branded ones. The only own-brand result was the Urban Sports Club listing. Aggregators (Urban Sports Club, ClassPass) own the commercial Pilates queries; training queries go to BASI, PPN and hipsy.eu; "reformer kopen" goes to Decathlon.

What the site already has: 80 URLs in the sitemap, EN/NL twins for every page, seven service landers, five Sole equipment pages, 8 trainer profiles, 8 blog posts, a robots.txt that welcomes AI crawlers. The foundation is better than most Amsterdam studios. The problem is authority and signals, not page count.

What holds it back:

| Issue | Evidence | Impact |
| --- | --- | --- |
| Zero third-party links beyond USC | No press, no PPN listing, no PMA directory hit, no Sole dealer-locator link found | Google has no reason to rank pt7.nl over aggregators |
| Brand split | "PT Studio 7" on USC, "PT7" on the new site | Branded search is diluted; GBP name unclear |
| Bare and trailing-slash URLs both indexed | Search Console lists `/pricing` and `/pricing/`, `/trainer/elif` and `/trainer/elif/`; the client-side normalizer does not stop Google indexing the bare path | Signals split across two URLs per page |
| NL pages thin | /nl/ is 450–700 words vs 1,100+ on EN; reviews on /nl/ are in English | Dutch queries (opleiding, rugklachten, kopen) under-served |
| GBP under-used | 33 reviews at 4.8, yet local queries sit at positions 6–8 with zero clicks | Map pack is where local Pilates searches convert |
| Content gaps | No back-pain page, no mat/yoga page, no Olympisch Stadion location page, no proefles page | Misses the injury segment you said you want and the move |
| Small inconsistencies | Live pages showed a "from €28" pricing meta, a duplicated tram sentence and a "move on 2 Nov" post. Checked 21 Oct: the prerender was not stale. €28 is the correct 20-pack per-class price, the post already says the move is postponed, and the tram sentence was a real duplicate in source (fixed) | Trust and CTR leaks |

Sources: [pt7.nl sitemap](https://www.pt7.nl/sitemap.xml), [pt7.nl](https://www.pt7.nl/), [/nl/](https://www.pt7.nl/nl/), [/pricing/](https://www.pt7.nl/pricing/), [/academy/](https://www.pt7.nl/academy/), [/equipment/](https://www.pt7.nl/equipment/), [USC listing](https://urbansportsclub.com/en/venues/pt-studio-7-museumplein). Search checks ran through a US-oriented tool, not Google NL; treat rankings as indicative.

## Search Console baseline

The site is growing but almost all of it is people who already know the name. Export covers 22 Mar – 19 Oct 2026 (the new domain's first 7 months): 1,121 clicks, 24,160 impressions, 4.6% CTR, average position 8.

| Month | Clicks | Impressions | Clicks/day |
| --- | --- | --- | --- |
| Apr | 104 | 2,137 | 3.5 |
| May | 131 | 2,029 | 4.2 |
| Jun | 115 | 2,612 | 3.8 |
| Jul | 139 | 3,302 | 4.5 |
| Aug | 199 | 4,357 | 6.4 |
| Sep | 260 | 5,924 | 8.7 |
| Oct (to 19th) | 156 | 3,224 | 8.2 |

What the data says:

- Brand is 80%+ of clicks. "pt studio 7" alone is 233 clicks at position 1.7; the homepage takes 862 of 1,121 clicks. Non-brand Pilates queries bring about 50 clicks in seven months.
- You are on page 2 for the money terms: "pilates amsterdam" position 12.6 (302 impressions), "reformer pilates amsterdam" 11.8 (176), "pilates studio amsterdam" 9.1 (286). "pilates amsterdam zuid" is at 6.5 and "pilates oud zuid" at 6.8 with 275 impressions and zero clicks: positions 5–8 on a local query means you are below the map pack. That is the GBP problem in numbers.
- "pilates classes near me": 986 impressions, 0 clicks, position 8.1. Same cause.
- Academy NL is invisible. `/academy/nl/` averages position 22.7; "pilates opleiding amsterdam" 17.7, "opleiding pilates reformer" 67, "pilates docent opleiding" 62. English academy terms sit at 9–36. This is the single biggest gap against the highest-value line.
- Equipment gets impressions, not clicks. `/equipment/reformer/` 862 impressions at 0.8% CTR, `/equipment/` 890 at 2.3%. Product snippets showed 348 times. The snippet shows no price and no reason to click. Since price stays on request, the title and description have to sell the showroom visit instead.
- The price guide post has 884 impressions at 0.9% CTR from position 6.8. The title is not winning the click; rewrite it with the actual number in it.
- Duplicate URLs are indexed: `/trainer/elif/` and `/trainer/elif`, `/schedule/` and `/schedule`, `/pricing` and `/pricing/`. The site is splitting its own signals.
- Mobile is 61% of clicks and ranks better (position 6.6 vs 10.7 on desktop). Netherlands is 85% of clicks; Turkey is second at 36, almost all brand and instructor-name searches.
- 10 impressions as "translated results" means Google is guessing the language on a few pages; hreflang is set in `SEOHead` on 23 of 25 pages, so check the two that lack it and the NL pages' `<html lang>`.

Queries you rank for but have no page for: "ems training amsterdam" (position 1.5, two clicks, you do not offer EMS), "spicy reformer amsterdam", "hot pilates", "duet pilates sessions" (position 1, 43 impressions), "pilates for healthcare workers". Duet and healthcare workers are worth a page; the rest are noise.

## Goals

Academy and studio classes carry equal weight; Sole equipment is the third line to grow. ClassPass stays as it is.

| Line | Where it stands | 6-month target |
| --- | --- | --- |
| Academy | €2,000/head, sold-out cohorts, 20 per term. English page ranks 9–36 on training terms; NL page at position 22.7 | Page 1 for "pilates opleiding amsterdam" and "reformer pilates instructor training amsterdam"; 30% of trainee leads from organic |
| Studio classes | Mostly expat clients. Positions 9–13 on "pilates amsterdam" terms, 6–8 on local terms with zero clicks: below the map pack | Map pack top 3 for "reformer pilates amsterdam zuid"; non-brand clicks from 15/month to 100/month |
| Sole equipment | Dutch "reformer kopen" is served by Decathlon and marketplaces; no specialist ranks. Price stays on request | Page 1 for "pilates reformer kopen" and "sole pilates nederland"; 2 quote requests/month |

Constraint: €300/month marketing budget, no ad spend. Claude Code does the build and the writing, so page and post volume is not the bottleneck. The bottleneck is review: Elif checks every health, training and equipment claim before it goes live, and you handle GBP, reviews and link outreach, which cannot be automated. Budget 2–3 hours/week of your time.

## Keyword map

One page owns one intent. Two pages chasing the same query cancel each other out, which is exactly what EN/NL twins without hreflang do today. Volumes are not listed: no NL keyword tool was available. Pull them from Google Search Console and Keyword Planner before writing, and drop any row with under 30 searches/month.

| Query cluster (NL / EN) | Owning page | Status |
| --- | --- | --- |
| reformer pilates amsterdam zuid / oud-zuid / museumplein | /reformer-pilates-amsterdam/ | Exists, 1,100 words. Add FAQ, schema, NL twin to parity |
| pilates amsterdam zuid, pilates studio amsterdam | Homepage | Exists. H1 already matches |
| pilates opleiding amsterdam, reformer opleiding, pilates docent opleiding | /academy/ (NL twin must be a real NL page, not a translation) | Exists EN. NL needs rewrite with NL terms: opleiding, docent, erkend, PMA |
| pilates instructor training amsterdam, reformer teacher training netherlands | /academy/ EN | Exists |
| pilates reformer kopen, reformer pilates apparaat kopen, sole pilates nederland | /equipment/ + per-machine pages | Exists but thin (350–500 words). Needs specs, delivery, financing, showroom; price on request |
| private pilates amsterdam, personal pilates trainer amsterdam | /private-pilates-amsterdam/ | Exists. USC outranks you on this; add testimonials and schema |
| pilates rugklachten amsterdam, pilates bij rugpijn, pilates na fysiotherapie | New: /pilates-rugklachten-amsterdam/ | Missing. Your stated target segment |
| pilates proefles amsterdam, pilates intro aanbieding | /intro/ | Exists. Rename title to include "proefles" |
| pilates olympisch stadion, pilates stadionbuurt, pilates zuidas | New: /olympisch-stadion/ location page | Missing. Build before move, not after |
| mat pilates amsterdam, yoga amsterdam zuid | New: /mat-pilates-yoga-amsterdam/ | Missing. 10 classes/week with no page |
| pilates prijzen amsterdam, pilates kosten | /pricing/ + existing blog post | Exists. €28 (20-pack per class) and €37 (single class) are both correct; consider showing both in the meta |
| prenatal pilates amsterdam, zwangerschap pilates | /prenatal-pilates-amsterdam/ | Exists |
| pilates voor mannen, pilates for men | Blog post | Exists |

Rule for the EN/NL split: EN stays primary for class landers and the homepage, since most clients are expats. NL is primary for the academy, rugklachten and kopen pages, where Dutch searchers are the growth you do not have yet. An NL page is written for Dutch searchers, not run through a translator.

## Technical fixes

The repo already has most of the plumbing: hreflang in `SEOHead`, JSON-LD for LocalBusiness, Service, Product, Course and FAQPage in `StructuredData`, `llms.txt`, a 404 page, a trailing-slash normalizer, sitemap `lastmod`, and a weekly SEO agent that runs title and description experiments. What is left is short. Claude Code does these under `AGENTS.md` rules; each is one PR.

- [x] Bare URLs. Search Console indexes `/pricing` next to `/pricing/`. Done 21 Oct: no code change needed. GitHub Pages already 301s bare paths to the slash form, and every internal link, canonical, hreflang, breadcrumb and sitemap URL in the built `dist/` is already slashed. Indexing of the slash form requested in GSC; watch the "Google-selected canonical" column until the bare ones drop.
- [x] Verify live vs source. Done 21 Oct: live `/pricing/`, `/reformer-pilates-amsterdam/` and `/blog/pt-7-moves-to-olympisch-stadion/` matched a fresh `npm run build`, so the prerender was not stale. "From €28" and "2 November" are correct. The duplicate tram sentence was in source (Reformer page paragraph plus map caption); the paragraph was removed in `244ddb8`.
- [x] Titles. Done 21 Oct in `e8fd553`, by hand because the weekly SEO agent was not live yet. The Academy title was already 58 characters; the 78-character one was the stale fallback shell in `scripts/generate-static-routes.js`, now synced. Pricing and Academy `og:title` now match `<title>`.
- [ ] `/nl/` parity. The NL homepage has half the words of EN and English reviews. Bring it to the same sections and schema as EN, with Dutch reviews.
- [ ] Product schema on equipment pages: keep `Offer` but drop any `price` field, since price is on request. Add `availability` and a `url` to the quote form.
- [ ] Trim the nav. Navbar has 11 links and the footer 16; move trainer and individual equipment links into their hub pages.
- [ ] Run PageSpeed Insights on mobile for `/` and `/reformer-pilates-amsterdam/`. Prerendered React should score 90+; if not, it is the image weight or the MindBody widget script.
- [ ] Add the new pages from the Content plan to `site/routes.ts` so sitemap and prerender pick them up.

## Local SEO

For a studio, the map pack beats the organic ten blue links. Most "pilates amsterdam zuid" clicks go to the three pins. This is the highest-return work on the list and costs nothing.

Google Business Profile:

- [ ] Settle the name once: "PT7 - Pilates & Strength Training Amsterdam Zuid" was the plan. Use exactly that on GBP, USC, ClassPass, Instagram, Facebook, LinkedIn and the site footer. Keep "PT Studio 7" only as an alias in schema `alternateName`.
- [ ] Primary category: Pilates studio. Secondary: Personal trainer, Physical fitness program, Training centre (for the Academy).
- [ ] Services list: one entry per lander (Reformer Pilates, Private Pilates, Prenatal, TRX, Strength, Instructor Course, Equipment sales) each linking to its page.
- [ ] Reviews: 33 at 4.8 today. Target 75 in 90 days. You have \~20 private students at 1.5 sessions/week and sold-out Academy cohorts: ask every graduate and every private client in person, then WhatsApp the short link. Ask for Dutch-language reviews that mention "reformer" or "opleiding". Reply to every review within 48 hours.
- [ ] Photos: 20+ of the studio, reformers, instructors teaching. Geotagged phone photos uploaded weekly for the first two months.
- [ ] Posts: one GBP post per week (cohort dates, intro offer, new class). Google rewards activity.
- [ ] Q&A: seed 6 questions yourself (parking, proefles, beginners, prijzen, rugklachten, opleiding dates) and answer them.

Second location: create the Olympisch Stadion GBP the day you have a signed lease and keys, mark it "opening soon", and give it its own page on the site. Do not merge the two profiles when you move; keep the Van Baerlestraat one live until the last class, then mark it permanently closed and point the page to the new one with a 301.

Citations (NAP consistency): Apple Maps, Bing Places, Yelp NL, Treatwell (Pilates is listed there), iamexpat.nl business directory, Oozo/Telefoonboek, ClassPass and USC venue pages. Same name, address, phone, URL everywhere.

## ClassPass listing

On 21 Oct 2026 a ClassPass search for Pilates at postcode 1071 BB, the studio's own, showed PT7 in 8th place behind Saints & Stars, PILAT3S, Movements, PLTS and De Roos. Distance is not the ranking; engagement signals are. Every studio above PT7 carries 2–3 category tags; PT7 carries one.

- [ ] Category tags in the partner dashboard: add Strength Training, TRX, Yoga, Stretching, Prenatal alongside Pilates. Tag matches drive relevance.
- [ ] Inventory: keep bookable spots visible for the next 7 days, especially 7–9am and 17–19h. Sync the 10-person cap so spots show rather than "full".
- [ ] Reviews on ClassPass: ask the regulars who book through it. Rating is 4.9; count is what moves rank.
- [ ] Profile: 8+ photos, description naming reformer, Museumplein and Oud-Zuid, full amenities list.
- [ ] Name: "PT7" to match GBP and the site.

No paid placement exists on ClassPass. Re-check the same search monthly from the studio postcode.

## Content plan

Four new pages, three page upgrades, then two posts a month. Pages before posts: a lander ranks for years, a post for weeks.

New pages, in build order:

| Page | NL and EN | What it must contain |
| --- | --- | --- |
| /pilates-rugklachten-amsterdam/ | Both | Who it is for (after fysio, chronic lower back, desk workers), what a first session looks like, Elif's rehab background and the scoliosis/osteoporosis cases from the concept doc, which fysio practices you work with, FAQ, booking CTA. 1,200+ words NL |
| /olympisch-stadion/ | Both | Address, map, opening date, 1928 flame story kept to one paragraph, parking and tram, what is new (10 reformers, café, strength), waitlist form. Publish now with "opening 2027" and update |
| /mat-pilates-yoga-amsterdam/ | Both | Schedule, max 8, price, difference from reformer, instructor bios |
| /academy/nl/ rewrite | NL only | Not a translation. Use opleiding, docent, erkend, PMA ITTAP, 300 uur, prijs €2.000 ex btw, data, graduate quotes in Dutch, a comparison to BASI and Balanced Body on hours, price and accreditation |

Upgrades:

| Page | Change |
| --- | --- |
| /equipment/ and the 5 machine pages | No published price. Add specs table, delivery time, lease option, "try it in our Amsterdam showroom" (Decathlon cannot offer that), a quote-request form, Product schema without price. Target 600+ words per machine |
| /reformer-pilates-amsterdam/ | Add 6-question FAQ with FAQPage schema, 3 Dutch testimonials, NL twin to parity |
| /private-pilates-amsterdam/ | Add pricing from the pricing page, 2 case stories, Service schema |

Blog cadence: 1 post/week, drafted by Claude Code, fact-checked by Elif before publishing, each 900–1,500 words, each linking to one lander. First six, in order:

1. Pilates na fysiotherapie: wanneer en hoe (links to rugklachten page)
2. Reformer kopen voor thuis of studio: waar let je op (links to equipment)
3. Pilates opleiding kiezen in Nederland: BASI, Balanced Body, PMA ITTAP vergeleken (links to academy)
4. Wat kost reformer pilates in Amsterdam in 2027 (refresh the existing price guide)
5. Olympisch Stadion: wat er verandert voor leden (links to location page)
6. Pilates bij scoliose: wat de wetenschap zegt (cite Kloubec 2010, Wells 2012 from your concept doc)

Every trainer profile gets a 150-word bio in NL, their certifications spelled out, and `Person` schema. These pages are your E-E-A-T signal for health queries.

What not to write: generic "benefits of Pilates" posts. Every studio in Europe has one; you will not outrank them and they bring tourists, not clients.

## Links and authority

This is the gap that explains the zero rankings. Twenty relevant Dutch links will do more than fifty pages. Aim for 15–20 in 90 days, all free.

| Source | How | Value |
| --- | --- | --- |
| PMA / ITTAP program directory | Confirm PT7 Academy is listed with a link to /academy/. You are accredited; the listing is owed to you | Highest: the one authority link in your niche |
| Pilates Professionals Netherlands (PPN) | Apply to be listed under teacher certification alongside BASI and Balanced Body | High, exactly the "opleiding" audience |
| Sole Pilates | Get onto their official dealer locator with a link to /equipment/ | High for "reformer kopen" |
| Nike Strength | If the collaboration happens, the studio locator link is worth more than most press | High |
| Graduates' own sites | Every Academy graduate who opens a studio or freelances: ask for "Trained at PT7 Academy" with a link. 20 trainees per cohort, two cohorts a year | Compounding; nobody else has this |
| Physiotherapy practices in Zuid | Referral partnership page on their site, yours on theirs. Ties to the rugklachten page | Medium, strong relevance |
| iamexpat.nl, DutchNews, Amsterdam Expat Hub | Pitch: "Pilates instructor training in English in Amsterdam" is a story for them | Medium |
| Olympisch Stadion tenant page | The stadium lists its tenants; ask for the link when you move in | Medium, strong local signal |
| Hacettepe / Polestar alumni mentions | Polestar lists where graduates teach | Low–medium |
| Local press (Het Parool wijk, De Echo Zuid) | The move into the Olympisch Stadion is a local story | Medium, one-off |

Internal links matter too. Every blog post links to one lander; every lander links to pricing, schedule and the relevant trainer; the homepage links to all four business-line hubs above the fold. Trainer profiles link to the Academy.

Do not buy links, do not use link exchanges with unrelated sites, and do not post on directory spam sites. A handful of relevant Dutch links is the whole game.

## 90-day roadmap

Three phases, each gated. Do not start the next until the gate is met.

1. Weeks 1–2, fix the plumbing. www 301, hreflang, JSON-LD on homepage and academy, the tram duplicate (the other two "content errors" were correct), GBP name and categories, Search Console and GA4 verified. Gate: Search Console shows pt7.nl indexed with no duplicate-URL warnings and GBP name is final everywhere.
2. Weeks 3–6, build the four pages and the two upgrades. Rugklachten page first, academy NL rewrite second, equipment upgrade third, Olympisch Stadion page fourth. Review drive starts: 33 to 50 Google reviews by week 6. Gate: four pages live in both languages with schema, 50 reviews.
3. Weeks 7–12, authority. PMA and PPN listings confirmed, Sole dealer locator, 5 graduate links, 2 fysio partnerships, 1 expat-press placement. Blog cadence running at one a week. Gate: 15 referring domains in Search Console, 75 reviews.

After day 90: one post a week, one new link a week, one GBP post a week, quarterly refresh of the price guide and cohort dates. About 3–4 hours a week.

Sequencing risk: if the Olympisch Stadion move slips past Q1 2027, keep the location page live as "opening 2027" rather than pulling it. A page that has been indexed for six months before the move ranks on day one; a page published the week you open does not.

## Measurement

Check monthly, not daily. Rankings move in weeks.

| Metric | Tool | Baseline (Sep 2026) | Day 90 target |
| --- | --- | --- | --- |
| Organic clicks/month | Search Console | 260 (80%+ brand) | 450, with non-brand at 25% |
| Non-brand clicks/month | Search Console, filter out "pt", "studio 7", "pt7" | \~15 | 100 |
| Map pack position, "reformer pilates amsterdam zuid" | Manual check from a Zuid postcode, incognito | Not in pack; organic 6.1 | Top 3 |
| Organic rank, "pilates opleiding amsterdam" | Search Console average position | 17.7 | Top 10 |
| Organic rank, "reformer pilates amsterdam" | Search Console | 11.8 | Top 8 |
| `/equipment/reformer/` CTR | Search Console | 0.8% | 3% |
| Google reviews | GBP | 33 at 4.8 | 75 |
| Referring domains | Search Console Links report | \~1 (USC) | 15 |
| Academy enquiries from organic | Form field "how did you find us" + GA4 | Unknown | 30% of enquiries |
| Equipment quote requests | Form + GA4 event | Unknown | 2/month |

Re-export Search Console on 20 Jan 2027 and compare against the September column above.

ClassPass stays as it is; no direct-booking-share target.
