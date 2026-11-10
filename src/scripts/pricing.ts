/**
 * K · Pricing: the monthly / yearly toggle. Same behaviour as the product-team file — it
 * swaps the billing note under each price (the listed prices themselves do not change).
 */
const bn = () => document.documentElement.lang === 'bn';

export function initPricing() {
  const grp = document.querySelector<HTMLElement>('[data-bill]');
  if (!grp) return;
  const btns = Array.from(grp.querySelectorAll<HTMLButtonElement>('button'));
  const notes = Array.from(document.querySelectorAll<HTMLElement>('[data-pernote]'));
  let bill: 'm' | 'y' = 'm';

  const grid = document.querySelector<HTMLElement>('[data-plans]');

  function render() {
    btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === bill)));
    grid?.classList.toggle('is-yearly', bill === 'y');
    notes.forEach((n) => {
      const d = n.dataset;
      const en = bill === 'y' ? d.y! : d.m!;
      const b = bill === 'y' ? d.yBn! : d.mBn!;
      n.textContent = bn() ? b : en;
      n.dataset.bn = b; // keep i18n in step when the language is switched
    });
  }

  btns.forEach((b) => b.addEventListener('click', () => { bill = b.dataset.v as 'm' | 'y'; render(); }));
  document.addEventListener('langchange', render);
}
