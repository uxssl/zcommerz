/**
 * Language switching, kept behaviour-compatible with the product-team page:
 * every translatable element carries its Bangla text in `data-bn`; English is the
 * server-rendered text. Switching swaps text in place, updates <html lang>, and
 * emits `langchange` so scripted components can re-render their own strings.
 *
 * Additions over the original: `data-bn-aria-label` for translated accessible names,
 * `data-bn-alt` for image alt text.
 */
export type Lang = 'en' | 'bn';

let current: Lang = 'en';
export const getLang = (): Lang => current;

const $$ = <T extends Element = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T & HTMLElement>(sel));

/** Snapshot English strings once, before any switch. Safe to call again for new nodes. */
export function captureEnglish(root: ParentNode = document) {
  $$('[data-bn]', root).forEach((el) => {
    if (el.dataset.en === undefined) el.dataset.en = el.textContent ?? '';
  });
  $$('[data-bn-aria-label]', root).forEach((el) => {
    if (el.dataset.enAriaLabel === undefined) el.dataset.enAriaLabel = el.getAttribute('aria-label') ?? '';
  });
  $$('[data-bn-alt]', root).forEach((el) => {
    if (el.dataset.enAlt === undefined) el.dataset.enAlt = el.getAttribute('alt') ?? '';
  });
}

export function applyLang(root: ParentNode = document) {
  $$('[data-bn]', root).forEach((el) => {
    el.textContent = (current === 'bn' ? el.dataset.bn : el.dataset.en) ?? '';
  });
  $$('[data-bn-aria-label]', root).forEach((el) => {
    const v = current === 'bn' ? el.dataset.bnAriaLabel : el.dataset.enAriaLabel;
    if (v) el.setAttribute('aria-label', v);
  });
  $$('[data-bn-alt]', root).forEach((el) => {
    const v = current === 'bn' ? el.dataset.bnAlt : el.dataset.enAlt;
    if (v) el.setAttribute('alt', v);
  });
}

export function setLang(lang: Lang) {
  current = lang;
  document.documentElement.lang = lang;
  applyLang();
  $$('[data-lang]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  document.dispatchEvent(new CustomEvent<Lang>('langchange', { detail: lang }));
}

export function initLang() {
  captureEnglish();
  $$('[data-lang]').forEach((b) =>
    b.addEventListener('click', () => setLang(b.dataset.lang === 'bn' ? 'bn' : 'en')),
  );
  setLang('en');
}

/** Pick a string for the current language. */
export const tr = (en: string, bn: string) => (current === 'bn' ? bn : en);
