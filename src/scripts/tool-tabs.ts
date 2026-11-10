/**
 * Management (C): vertical WAI-ARIA tabs for the four jobs; inactive panels are [data-off] + inert
 * (stacked in one grid cell so the dashboard keeps one height).
 * Click, ↑/↓ (and ←/→), Home/End; the incoming panel's rows settle in with a short stagger.
 */
import { gsap, prefersReducedMotion } from './motion';

export function initToolTabs() {
  document.querySelectorAll<HTMLElement>('[data-tools]').forEach(initOne);
}

function initOne(root: HTMLElement) {
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const panels = new Map(Array.from(root.querySelectorAll<HTMLElement>('[data-gpanel]')).map((p) => [p.dataset.gpanel!, p]));
  let current = tabs.find((t) => t.getAttribute('aria-selected') === 'true')?.dataset.group;

  function select(id: string, focus = false) {
    if (id === current) return;
    current = id;
    tabs.forEach((t) => {
      const on = t.dataset.group === id;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
      if (on) t.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
    });
    panels.forEach((p, k) => {
      const on = k === id;
      p.toggleAttribute('data-off', !on);
      p.inert = !on;
      p.setAttribute('aria-hidden', String(!on));
    });
    if (prefersReducedMotion()) return;
    const p = panels.get(id)!;
    const ph = p.querySelector('.d-ph:not([hidden])');
    if (ph) gsap.fromTo(ph, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'expo.out', clearProps: 'all' });
    gsap.fromTo(p.querySelectorAll('[data-trow]'), { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'expo.out', clearProps: 'all', overwrite: true });
  }

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t.dataset.group!));
    t.addEventListener('keydown', (e) => {
      const k = e.key;
      let j = -1;
      if (k === 'ArrowDown' || k === 'ArrowRight') j = (i + 1) % tabs.length;
      else if (k === 'ArrowUp' || k === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
      else if (k === 'Home') j = 0;
      else if (k === 'End') j = tabs.length - 1;
      if (j < 0) return;
      e.preventDefault();
      select(tabs[j].dataset.group!, true);
    });
  });
}
