# Source audit: `zcommerz-landing.html`

Source of truth for content: the product-team file `reference/zcommerz-landing.html` (1,746 lines, single file, inline CSS/JS, all images as base64 data URIs).
Only one HTML file was supplied. The "redesigned HTML concept" mentioned in the brief is not in the folder. If it exists, add it and this audit will be extended.

Everything below must survive the redesign: copy (EN + BN), prices, features, integrations, link destinations and behaviours.

## Global

| Item | Detail |
|---|---|
| Languages | EN default, BN via toggle. Every string carries `data-bn`; switching swaps `textContent`, sets `<html lang>`, re-renders JS-built blocks. No persistence, no URL change. |
| Fonts | Bricolage Grotesque (display), Hind Siliguri (body + Bangla), Google Fonts CDN. |
| Tokens | night `#070B24`, ink `#0E1A2B`, blue `#2A5DA8`, mango `#FFB21E` (CTA), mint `#19C28F`, paper `#F5F7FC`. |
| Reduced motion | `prefers-reduced-motion` stops players autoplaying, AI text appears without typing. |
| Meta | Title "ZCOMMERZ \| Turn your Facebook page into an online store", description, theme-color. No OG tags, no structured data. |
| External links | Signup `https://merchant.zcommerz.com/auth/signup` (all trial/start CTAs, plan CTAs). Login `https://merchant.zcommerz.com/auth/login`. Terms `https://zcommerz.com/terms-and-conditions`. Privacy `https://zcommerz.com/privacy-policy`. |
| Assets | Logo PNG; partner logos bKash, Daraz, eCourier (PNG), Facebook, WhatsApp, Messenger, Visa, Mastercard, Pathao (SVG); 15 product illustrations (honey, ghee, rice, mango, pickle, tea, kurti, tote, shawl, buds, watch, bank, serum, lip, soap); 5 UI glyphs (leaf, shop, link, spark, spark-w). |

## Sections, in order

| # | Section | Anchor | Content | Interactions |
|---|---|---|---|---|
| 1 | Header | — | Logo, links (How it works → `#how`, Features → `#pillars`, Pricing → `#pricing`, FAQ → `#faq`), EN/বাং toggle, Login, "Free trial" | Sticky. **Mobile hides links and Login with no menu** (gap to fix). |
| 2 | Hero | — | "Powered by SSLCOMMERZ" chip; H1 "Turn your Facebook page into a store that **sells / ships / grows**" (rotating); lead; CTAs "Start 7-day free trial" (signup), "Watch the demo" (`#video`) | Rotating word (9s CSS loop). Screen-reader text lists all three words. |
| 3 | Hero product tour | `#player` | 4 scenes: Facebook page (SSL Organic BD, 3 products) → store live (`xyzstore.zcommerz.com`, payments) → orders from FB/Daraz/WhatsApp (৳1,300 / ৳980 / ৳540, total ৳2,820) → checkout bKash + Pathao timeline. All marked "sample data". | 4.5s/scene auto-advance with progress bars, click a step to jump, play/pause button, starts when 25% in view, pauses off-screen and on hidden tab. |
| 4 | Stats + Works with | — | 36+ payment channels, 20 dashboard tools, 7 days free trial. Chips: SSLCOMMERZ, bKash, Visa, Mastercard, Bangla QR, Pathao, eCourier, Daraz, WhatsApp… | none |
| 5 | Facebook → website | `#video` | "From Facebook page to website, in one click", 5-step walkthrough (Connect page, Click once, Page comes across, Pick a look, Website is live) | Player, 5s/scene |
| 6 | Pillars | `#pillars` | Manage / Sell / Grow lists (PRO tags on Campaigns, Abandoned Cart, Inventory Aging) | none |
| 7 | Online store | `#features` | 4 bullets, "Customers pay with" chips, CTAs | Theme tabs: Grocery, Fashion, Electronics, Beauty. Each re-renders store name, colours, banner, 3 products with prices. |
| 8 | Management | `#tools` | 4 bullets, CTA | 7 tool groups (Core 5, Catalog 4, Sales 2, Marketing 2, Config 3, Staff 2, Reports 2 = 20 tools) with PRO flags |
| 9 | Chat to order | `#chat` | 4-step walkthrough (message → inbox → order → auto updates) | Player, 5s/scene |
| 10 | AI descriptions | `#ai` | Copy + 3 points; demo form | Player; form (name, keywords, tone Friendly/Professional/Festive, output EN/BN) → templated text with typing effect; Copy button with "Copied" feedback |
| 11 | Channels | `#channels` | 3 benefits incl. "SSLCOMMERZ, a PCI-DSS certified gateway"; 5 connection rows | Connect/Connected toggles (labelled as demo) |
| 12 | Insights | `#insights` | 3 bullets; dashboard: Products 1.2k, Customers 4.8k, Orders 850, Profit ৳12k, weekly bar chart, labelled "sample data" | none |
| 13 | More ways | `#more` | 6 rows linking to `#features`, `#tools`, `#chat`, `#ai`, `#channels`, `#tools` | anchors |
| 14 | How | `#how` | 4 steps | none |
| 15 | Pricing | `#pricing` | Start ৳499 (was 699, save 200), Growth ৳1,049 (was 1,499, save 450, "Best value"), Pro ৳2,299 (was 3,299, save 1,000); feature lists per plan; yearly note "Extra 15% off" | Monthly/Yearly toggle (changes billing note only, not the price) |
| 16 | FAQ | `#faq` | 7 Q&As, first open | `<details>` accordion |
| 17 | Final CTA | — | "Take your brand online today" + trial CTA | none |
| 18 | Footer | — | Tagline, Product links, Terms, Privacy, newsletter, "Verified by SSLCOMMERZ", © 2026 | Newsletter: client-side email validation and a message only, **no data is sent anywhere** |

## Issues to carry into the redesign

1. **Mobile navigation**: links and Login vanish under the breakpoint. Add a menu sheet, so no destination is lost.
2. **Language**: no persistence and no indexable Bangla URL. Keep the in-page toggle for parity; recommend a `/bn/` route later for SEO.
3. **Newsletter**: the form looks real but posts nowhere. Keep it as is. Before launch it needs a real endpoint, a consent line and a privacy-policy link (data privacy, Bangladesh data-protection expectations).
4. **Yearly toggle**: shows "Extra 15% off" but prices do not change. This is preserved exactly. Confirm with product before showing computed yearly prices.
5. **Weight**: ~284 KB HTML because every image is base64. Extract to static files (cacheable, lazy-loadable).
6. **Rotating H1 word**: CSS loop never stops. Needs a pause under reduced motion (it already has SR text).
7. **Sample numbers** (৳2,820, 1.2k products…) are labelled "sample data". Keep the label wherever they appear.
