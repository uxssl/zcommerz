/**
 * Shrink-wraps wrapped headings to their longest line (user, 2026-11-12).
 * A heading that wraps keeps the width it wrapped at, so in a heading | lead row the empty space at
 * the end of its lines reads as an over-wide gap. CSS can't size a box to its wrapped lines, so on
 * desktop this measures the longest rendered line and caps the heading's width to it; the grid
 * column (fit-content) then hugs the text. Re-runs on resize, font load and language switch.
 */
const MQ = '(min-width: 1024px)';

function wrapOne(el: HTMLElement) {
  el.style.maxWidth = ''; // back to the stylesheet cap, so the heading wraps as designed
  if (!matchMedia(MQ).matches) return;
  const range = document.createRange();
  range.selectNodeContents(el);
  const left = el.getBoundingClientRect().left;
  const widest = Math.max(...Array.from(range.getClientRects(), (r) => r.right - left));
  if (Number.isFinite(widest) && widest > 0) el.style.maxWidth = `${Math.ceil(widest) + 1}px`;
}

export function initShrinkwrap(selector: string) {
  const els = () => Array.from(document.querySelectorAll<HTMLElement>(selector));
  const run = () => els().forEach(wrapOne);
  let raf = 0;
  const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(run); };
  run();
  document.fonts?.ready.then(run);
  addEventListener('resize', schedule);
  document.addEventListener('langchange', schedule);
}
