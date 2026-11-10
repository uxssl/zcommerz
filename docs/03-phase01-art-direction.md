# Phase 01: art direction, navigation and hero

## What the product is (from the product-team HTML)

- **Offer:** build an online store, starting from a Facebook page ("Connect once, we build the first draft"), then sell, take payment and deliver from one dashboard.
- **Users:** Bangladeshi small businesses that already sell through Facebook, Daraz and WhatsApp (sample shops: grocery, fashion, electronics, beauty).
- **Value:** ready themes · SSLCOMMERZ payments (36+ channels, bKash, cards, Bangla QR) · Pathao / eCourier delivery · Daraz and WhatsApp · one dashboard · AI descriptions · 7-day free trial.
- **Conversion:** primary = "Start 7-day free trial" → `merchant.zcommerz.com/auth/signup`. Secondary = "Watch the demo" → `#video`. Header: Login, Free trial.
- **Brand:** navy `#070B24`, blue `#2A5DA8`, mango `#FFB21E`, mint `#19C28F` (success). Bricolage Grotesque (display) + Hind Siliguri (Bangla, body).
- **Existing motion:** a 4-scene hero tour (4.5s per scene, progress bars, step select, play/pause, pause off-screen) plus CSS keyframes. The 5-scene tour is the "Facebook page to website" section, which comes in Phase 02.

## Pathao Commerce: what to learn, what not to copy

It sells with a full-bleed lifestyle photo, purple overlay, one CTA and a stat strip ("64 districts", "100000+ merchants"). That's clear and trust-heavy, but the product itself is never shown.

**ZCOMMERZ opportunity:** show the product doing the work. A visitor should see their Facebook page become a store, take an order, get paid and ship, without reading.

We don't copy its photo hero, purple, layout or stat claims, and we don't invent merchant counts.

## Three directions

### A · Editorial showcase
A very large headline spans the page. Under it sits one wide, static storefront in a browser, with the walkthrough controls tucked under the browser.
- Strong typographic poster.
- The headline competes with the product and costs vertical space (the brief warns against both).
- The Facebook-to-store idea has to be read, not seen.

### B · Commerce transformation, "From feed to storefront"
Copy on the left. On the right, a phone and a browser stand on a navy plinth that bleeds off the right edge.
- The phone starts as the Facebook page and the browser as an empty store.
- The cursor presses "Build my store". Product photos lift out of the Facebook posts and land in the store.
- The same two devices then carry the live store (desktop + mobile), the order list with phone notifications, and checkout with Pathao tracking.
- The walkthrough controls sit on the plinth like a caption.

### C · Immersive canvas
The live storefront fills the hero edge to edge, and the marketing headline sits inside the store's banner. The walkthrough runs as state changes of that one canvas.
- Very immersive.
- But the headline and the sample store's own copy blur together ("is this ZCOMMERZ or SSL Organic?").
- On mobile the canvas has to shrink or crop until the store is unreadable.
- The CTA competes with the store's own buttons.

## Scoring (1–5)

| Criterion | A | B | C |
|---|---|---|---|
| Originality / differentiation | 3 | 4 | 5 |
| Immediate product understanding | 2 | 5 | 3 |
| Visual sophistication | 4 | 4 | 4 |
| First impression | 4 | 4 | 5 |
| Conversion clarity | 4 | 5 | 2 |
| Practical implementation | 5 | 4 | 2 |
| Mobile adaptability | 4 | 4 | 2 |
| **Total** | **26** | **30** | **23** |

## Chosen: B, "From feed to storefront"

The product's whole promise is a transformation, and B is the only direction where the transformation is the picture. The phone (where these merchants already sell) and the browser (the store they get) are the two characters, and the photos physically moving from one to the other is the memorable moment.

The navy plinth gives the light/dark contrast the brief asks for:
- **White page:** carries the promise.
- **Navy block:** carries the product.
- **Next section:** the plinth continues into the dark "Facebook to website" section in Phase 02.

## System

- **Type:** Bricolage Grotesque Variable for display and Latin UI. The optical-size axis follows the type size, and width is narrowed slightly for the headline. Hind Siliguri for all Bangla. Product mocks use the system UI font, so they read as *someone else's* website.
- **Colour:**
  - **Ground and text:** white ground and cool neutrals (`#F4F5F8`, lines `#E3E6EE`); ink `#0E1A2B`.
  - **Navy** `#070B24`: product plinth only.
  - **Blue:** links and the rotating word.
  - **Mango:** primary CTA, progress, the one underline.
  - **Mint:** success states inside the product.
- **Shape:** sharp plinth, 14px browser, real phone proportions, 8px buttons.
- **Icons:** Lucide via `@lucide/astro` (rendered at build time, zero client JS).
