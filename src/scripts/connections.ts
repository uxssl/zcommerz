/**
 * G · Channels: demo connect toggles. Same behaviour as the product-team file — the button
 * flips between "Connect" and "Connected"; nothing is actually connected here.
 */
const bn = () => document.documentElement.lang === 'bn';

export function initConnections() {
  const root = document.querySelector<HTMLElement>('[data-conn]');
  if (!root) return;
  const btns = Array.from(root.querySelectorAll<HTMLButtonElement>('.cbtn'));

  function label(b: HTMLButtonElement) {
    const on = b.getAttribute('aria-pressed') === 'true';
    const lbl = b.querySelector<HTMLElement>('[data-cbtn-lbl]')!;
    const d = b.dataset;
    lbl.textContent = bn() ? (on ? d.onBn! : d.offBn!) : on ? d.on! : d.off!;
    // keep i18n in step: it owns data-bn when the language is switched
    lbl.dataset.bn = on ? d.onBn! : d.offBn!;
  }

  btns.forEach((b) => {
    b.addEventListener('click', () => {
      b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
      label(b);
    });
  });
  document.addEventListener('langchange', () => btns.forEach(label));
}
