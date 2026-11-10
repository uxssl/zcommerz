# Visual direction and design system

## Direction: "The merchant's ledger"

Zcommerz sells to Bangladeshi shop owners who already run their business on a Facebook page. The page should feel like a well-made trade publication about their shop. It should be confident, printed and specific, not like a dark SaaS template with glowing blobs.

- **Editorial, not decorative.** Large display type set tight, a hairline grid, numbered chapters (01–04), generous margins. The structure carries the style, not gradients or glass.
- **Product as the hero image.** Every visual is a believable Zcommerz interface (Facebook page, storefront, order list, checkout, courier timeline) built in HTML. That keeps it crisp, translatable and accessible. No abstract dashboards.
- **Two grounds.** Warm paper (`#F4F1EA`) for the editorial surfaces, deep night (`#0A0F2C`) only where the product is on stage. Sections alternate by ground and composition, not by boxing everything in cards.
- **Colour is information.** Brand blue = the platform, mango = the one action (start trial), mint = success states (paid, live, delivered). Partner colours appear only inside partner logos.
- **Motion tells the story once, then gets out of the way.** One choreographed hero entrance, one scroll-driven Facebook→store transformation (section 5), the tour driven by GSAP timelines. Everything else is a short reveal or a micro-interaction.

What we avoid: mesh/aurora gradients, blurred orbs, glassmorphism, floating tilted cards, icon-in-a-box feature grids, fake metrics or testimonials.

## Typography

| Role | Latin | Bangla | Notes |
|---|---|---|---|
| Display | Schibsted Grotesk Variable 700–800, tracking −0.035em | Anek Bangla Variable 600–700 | Newspaper-grotesk with character, less common than Bricolage/Inter |
| Accent | Instrument Serif Italic | Anek Bangla (no italic) | Only the rotating hero word and rare pull-words |
| Body/UI | Geist Variable 400–600 | Hind Siliguri 400–600 | Geist has no Bengali glyphs, so the browser falls through to Hind Siliguri per character |

All fonts are self-hosted via Fontsource (no Google request, better privacy and LCP).

Scale (fluid, `clamp`): display-xl 3.25→6.5rem / display-l 2.5→4.25rem / display-m 2→3rem / h3 1.25→1.5rem / body-l 1.125→1.25rem / body 1rem / small .875rem / micro .75rem uppercase +0.08em (labels, chapter numbers).
Bangla gets +0.04 line-height and 0 tracking (Bengali conjuncts break with negative tracking).

## Colour tokens

| Token | Value | Use |
|---|---|---|
| `paper` | `#F4F1EA` | Main ground |
| `paper-2` | `#ECE7DC` | Inset areas |
| `ink` | `#0B1020` | Text on paper |
| `ink-2` | `#4A5163` | Secondary text (AA on paper) |
| `rule` | `#D9D3C5` | Hairlines on paper |
| `night` | `#0A0F2C` | Product stage ground |
| `night-2` | `#121940` | Raised surfaces on night |
| `night-rule` | `rgb(255 255 255 / .12)` | Hairlines on night |
| `mist` | `#AEB6D6` | Secondary text on night |
| `blue` | `#2A5DA8` | Brand, links, platform UI |
| `mango` | `#FFB21E` | Primary CTA, progress, highlights |
| `mint` | `#19C28F` | Live / paid / delivered |
| `fb` | `#1877F2` | Facebook UI mock only |

## Layout

- 12-column grid, max 1240px content, 20px gutters on mobile, 32px desktop.
- Section rhythm: 128px desktop / 88px mobile vertical padding. Each section opens with a chapter label (`02 — Online store`) on a hairline.
- Radius scale is restrained: 6 (chips, inputs), 12 (UI windows), 20 (stage). No pill-shaped everything.
- Shadows only on product UI ("objects"), never on text blocks.

## Components (first pass)

- **Button**: primary = mango on ink text; secondary = 1px ink outline; text link with an underline that animates in from the left. 48px min touch target.
- **Chapter label**: micro caps + number + rule.
- **Logo chip**: logo + name, hairline border, no fill.
- **Product window**: browser chrome (URL + "Live" state) wrapping real-looking storefront markup.

## Motion system (GSAP)

| Token | Value |
|---|---|
| ease-out | `expo.out` for entrances, `power3.out` for UI |
| ease-in-out | `power2.inOut` for transforms between states |
| durations | micro 0.18s, UI 0.4s, entrance 0.9–1.2s |
| stagger | 0.06s (lines), 0.08s (items) |
| distance | 24px max translate, no scale-from-zero |

Rules:
1. Animate only `transform`, `opacity` and `clip-path`.
2. Content is visible without JS. Initial hidden states are set by JS (`html.js`) so nothing ever stays hidden if a script fails.
3. `prefers-reduced-motion: reduce` means no entrance, no scrub, no autoplay. Final states render immediately; the tour stays fully navigable by click.
4. ScrollTrigger only for the Facebook→store story (section 5) and light reveals. No scroll-jacking. Lenis is off by default and opt-in later if it tests well on low-end Android.
5. Autoplay pauses off-screen, on hidden tabs, and on user request (WCAG 2.2.2).

## Tech decisions

- Astro static output, zero JS by default. Hero and tour use one vanilla TS module (GSAP core). A React island only where state is complex (likely the theme preview and AI demo, decided per section).
- i18n: one dictionary (`src/i18n/*.ts`) renders EN into HTML with `data-bn`. The toggle swaps text in place, exactly like the original, and fires a `langchange` event for scripted components.
- Images: extracted from base64 to `/public/assets` (SVG/PNG), with explicit dimensions.

---

## Phase 01 revision: "One window, the whole shop" (hero + nav)

The first hero (huge headline over a dark tour box) read as a template. The revision makes the product the composition:

- **Asymmetric split.** Copy on 5 of 12 columns; the product stage takes the other 7 and bleeds to the right edge of the viewport.
- **Two persistent devices.** A browser window and a phone stay on screen through the tour; only their content changes. The story reads as one shop growing:
  1. Phone shows the Facebook page; the window is an empty store. The cursor presses "Build my store" and each product photo travels from its Facebook post into its slot in the store.
  2. Window and phone show the same live store (desktop + mobile); the theme cycles through Fashion and Beauty colours.
  3. Window becomes the merchant order list (`merchant.zcommerz.com`); the phone receives the order notifications.
  4. Window shows checkout (bKash selected, payment received); the phone tracks the Pathao delivery.
- **Controls as a caption index** under the stage (01–04, progress, play/pause, "Product tour · sample data").
- **Mobile is its own composition:** the phone leads in front and stays readable; the window becomes a cropped backdrop.
- **Texture:** a very light paper grain (SVG noise), hairline rules, no gradients or glass in the layout.
- **Motion:** header settles → eyebrow → headline words rise → underline draws → lead → CTAs → window wipes in from the edge it bleeds into → phone rises → tour starts. One scrubbed ScrollTrigger adds slight depth on desktop only. Everything is registered through `gsap.matchMedia`, so reduced motion and breakpoint changes revert cleanly.
- **Lenis is not used:** the hero has no scroll-linked story that needs smoothing, and native scrolling is more reliable on low-end Android.
