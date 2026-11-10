# Hero revision 2: response to creative director review

## Diagnosis
- **The unfinished browser was not just a mid-animation frame.** The tour parked on scene 1's *first* frame (an empty skeleton) before it played, and reduced-motion and no-JS users stayed on it. With no JS, all scenes were hidden, so the devices were empty.
- **Imbalance.** The right column stacked three objects (devices, a navy plinth, a 4-column tour panel). The left column had a gap under the CTA because the stats were pinned to the grid's bottom row.
- **Tour panel weight.** A navy block existed mainly to hold the controls.
- **No relationship in a still frame.** Phone and browser only overlapped, so nothing said "page → store" without motion.
- **Store didn't look like a store.** It used our type and generic chips, so it read as a wireframe.

## Kept
- **Two devices:** the phone (where merchants sell today) and the browser (the store they get).
- **The 4 scenes**, with all controls (play/pause, step select, auto-advance, pause off-screen); replay added.
- **Motion:** the photo flight, wipe transitions between scenes, and the rotating word with its mango underline.
- **Brand:** fonts and palette.

## Changed
| Area | Change |
|---|---|
| Resting state | The resting frame is now the **end** of scene 1: Facebook page, "Build my store" done, finished storefront. Page load, reduced motion and no-JS all show it. The tour rewinds and plays only after the entrance, and only when in view. |
| Signature | **The seam.** The approved "Build my store" button sits between the phone and the browser on a mango thread. During the demo it fills while it builds and resolves to a check. As a still frame it reads: Facebook page → Build my store → store. |
| Storefront | The merchant has its own brand: serif wordmark and banner, a two-product banner, Add buttons, search and cart icons, cream ground. One `Storefront.astro` component renders both the built layer (scene 1) and the live store (scene 2), so the hand-off is seamless. |
| Tour controls | The navy panel is gone. A compact rail under the stage holds play/pause, replay, 4 segments with mango progress, the active step's line, and "Product tour · sample data". On mobile the segments show numbers only and the caption carries the text. |
| Composition | Copy is vertically centred on the stage. Stats and "Works with" moved into one full-width proof band, so there's no hole under the CTA. |
| Title | Standard Bricolage Grotesque, weight 800 at 100% width, as in the product-team file (per your request). |

## Content check
- **Stats.** 36+ payment channels, 20 dashboard tools and the 7-day free trial match the source `.stats` block. The 20 matches the source tool list (5+4+2+2+3+2+2).
- **No new copy.** Every visible string comes from the product-team file. The store URL `xyzstore.zcommerz.com` and all sample data are from the source tour.

## Bugs fixed during review
- **Rotating word.** On mobile with reduced motion, all three words showed stacked. `gsap.matchMedia` with a conditions object doesn't run when no condition matches, so base setup now runs outside it.
- **Stray ripple.** The click ripple was visible at the stage's top-left for 1.4s at the start of scene 1. Its `fromTo` rendered immediately; it now waits for the click.
- **No-JS.** Scene groups were all hidden without JS. Scene 1 is now visible by default until the player takes over (`.tour-ready`).

## Verified
- **Layout:** 1440, 1280, 1024, 768, 393 and 375px with no horizontal overflow.
- **Language:** the EN/BN toggle works, including the seam button, Add buttons, captions and ARIA labels.
- **Keyboard:** focus order runs logo → nav → language → Login → Free trial → CTAs → play → replay → steps, with a visible focus ring. Inactive scenes are inert.
- **Mobile menu:** focus moves into it, the background stops scrolling, Escape closes it, and the CTA links point to signup and login.
- **Reduced-motion path:** rendered via the dev-only `?reduced` switch.
- **Production build:** passes; JS is 51.7 KB gzip.

## Limits
- **Screenshot environment.** The hidden browser pane freezes `requestAnimationFrame` and CSS transitions, so the scene screenshots were taken by seeking the timelines. Real-time playback should be watched in a visible browser.
- **Product imagery.** It is the product team's SVG illustrations. Real product photography would raise realism further.
