/**
 * Theme switcher for the store builder (B).
 * - WAI-ARIA tabs: click, ←/→, Home/End; roving tabindex; aria-selected; inactive panels are [data-off] + inert + aria-hidden
 *   (not [hidden]: Tailwind's preflight forces display:none on it, which would break the shared height).
 * - Transition: the incoming storefront wipes in over the outgoing one (clip-path),
 *   then its pieces ([data-pi]) settle in with a short stagger. Reduced motion: instant swap.
 * All panels share one grid cell, so the browser keeps the tallest height: no layout jump.
 */
import { gsap, prefersReducedMotion } from './motion';

export function initStoreThemes() {
  const root = document.querySelector<HTMLElement>('[data-store]');
  if (!root) return;
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const panels = new Map(Array.from(root.querySelectorAll<HTMLElement>('[data-panel]')).map((p) => [p.dataset.panel!, p]));
  let current = tabs.find((t) => t.getAttribute('aria-selected') === 'true')?.dataset.theme ?? 'grocery';
  let tl: gsap.core.Timeline | null = null;

  function setOn(p: HTMLElement, on: boolean) {
    p.toggleAttribute('data-off', !on);
    p.inert = !on;
    p.setAttribute('aria-hidden', String(!on));
  }

  function select(id: string, focus = false) {
    if (id === current) return;
    const prev = panels.get(current)!;
    const next = panels.get(id)!;
    current = id;

    tabs.forEach((t) => {
      const on = t.dataset.theme === id;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });

    tl?.progress(1).kill();
    setOn(next, true);
    if (prefersReducedMotion()) {
      setOn(prev, false);
      return;
    }
    gsap.set(next, { zIndex: 2 });
    gsap.set(prev, { zIndex: 1 });
    tl = gsap
      .timeline({
        onComplete: () => {
          setOn(prev, false);
          gsap.set([prev, next], { clearProps: 'zIndex,clipPath' });
        },
      })
      .fromTo(next, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.75, ease: 'expo.inOut' }, 0)
      .from(next.querySelectorAll('[data-pi]'), { y: 14, autoAlpha: 0, duration: 0.6, stagger: 0.05, ease: 'expo.out', clearProps: 'transform,translate,opacity,visibility' }, 0.3);
  }

  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t.dataset.theme!));
    t.addEventListener('keydown', (e) => {
      const k = e.key;
      let j = -1;
      if (k === 'ArrowRight') j = (i + 1) % tabs.length;
      else if (k === 'ArrowLeft') j = (i - 1 + tabs.length) % tabs.length;
      else if (k === 'Home') j = 0;
      else if (k === 'End') j = tabs.length - 1;
      if (j < 0) return;
      e.preventDefault();
      select(tabs[j].dataset.theme!, true);
    });
  });
}
