/**
 * Hero behaviour: entrance choreography, the rotating headline word (sells / ships / grows)
 * and the product tour. The tour starts after the entrance, only while the stage is in view;
 * with reduced motion it stays on its resting frame (the live website) and the word rests on
 * "sells". All motion is registered through gsap.matchMedia so it is reverted automatically
 * when reduced motion is switched on.
 */
import { gsap, prefersReducedMotion, MOTION_OK } from './motion';
import { createTour } from './tour';
import { heroScenes } from './hero-tour';
import { heroCopy } from '../data/hero-new';
import { getLang } from './i18n';

const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

export function initHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const h1 = hero.querySelector<HTMLElement>('[data-h1]')!;
  const q = (k: string) => hero.querySelectorAll<HTMLElement>(`[data-h="${k}"]`);
  const header = document.querySelector<HTMLElement>('[data-header]');

  // The stage's scene order comes from data-scenes; builders are looked up by scene id
  const tour = createTour(hero, { duration: 4500, builders: heroScenes });
  if (import.meta.env.DEV) (window as any).__heroTour = tour;

  /* ---------- Rotating word: two passes, then it rests on the first word ---------- */
  let rot: gsap.core.Timeline | null = null;
  function startRotator() {
    rot?.kill();
    const words = Array.from(h1.querySelectorAll<HTMLElement>('.rw'));
    gsap.set(words, { yPercent: 125 });
    gsap.set(words[0], { yPercent: 0 });
    if (prefersReducedMotion()) return;
    rot = gsap.timeline({ delay: 2.6 });
    const passes = words.length * 2;
    for (let n = 0; n < passes; n++) {
      const cur = words[n % words.length];
      const nxt = words[(n + 1) % words.length];
      const at = n * 2.6;
      rot.to(cur, { yPercent: -125, duration: 0.75, ease: 'expo.inOut' }, at)
        .fromTo(nxt, { yPercent: 125 }, { yPercent: 0, duration: 0.75, ease: 'expo.inOut' }, at);
    }
  }

  // Language switch: rebuild the headline in the other language and restart the rotation
  function renderHeadline() {
    const h = heroCopy.headline[getLang()];
    h1.querySelector('[data-h1-sr]')!.textContent = `${h.pre} ${h.words.join(', ')}`;
    const visual = h1.querySelector<HTMLElement>('[data-h1-visual]')!;
    const line = visual.querySelector('.rot-line')!.outerHTML;
    visual.innerHTML =
      `${esc(h.pre)} ` +
      `<span class="rot"><span class="rot-words">${h.words.map((w) => `<span class="rw">${esc(w)}</span>`).join('')}</span>${line}</span>`;
    startRotator();
  }
  let rendered = 'en';
  document.addEventListener('langchange', () => {
    if (getLang() === rendered) return;
    rendered = getLang();
    renderHeadline();
  });

  /* ---------- Entrance ---------- */
  // Base state: content hidden by [data-reveal] until scripts are ready
  document.documentElement.classList.add('motion-ready');
  startRotator();
  if (prefersReducedMotion()) tour.setReady();

  const mm = gsap.matchMedia();
  mm.add(MOTION_OK, () => {
    // Runs once per page load
    if (hero.dataset.entered) {
      tour.setReady();
      return () => rot?.kill();
    }
    hero.dataset.entered = '1';

    const path = h1.querySelector<SVGPathElement>('.rot-line path');
    const len = path?.getTotalLength() ?? 300;
    const phone = hero.querySelector<HTMLElement>('.phone');
    const win = hero.querySelector<HTMLElement>('.win');

    gsap
      .timeline({ defaults: { ease: 'expo.out' } })
      // 1 nav settles · 2 headline rises as one masked block · 3 underline draws under the rotating word
      .from(header, { y: -12, autoAlpha: 0, duration: 0.8 }, 0)
      .fromTo(q('title'), { y: 28, clipPath: 'inset(0% 0% 100% 0%)' }, { y: 0, clipPath: 'inset(0% 0% -25% 0%)', duration: 1.05, clearProps: 'clipPath' }, 0.2)
      .fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.85)
      // 4 lead · 5 CTAs
      .from(q('lead'), { y: 14, autoAlpha: 0, duration: 0.9 }, 0.5)
      .from(q('cta'), { y: 14, autoAlpha: 0, duration: 0.9, clearProps: 'transform,translate' }, 0.62)
      // 6 product: the browser unmasks from its far edge, the phone rises beside it
      .from(q('visual'), { autoAlpha: 0, duration: 0.01 }, 0.55)
      .fromTo(win, { clipPath: 'inset(0% 0% 0% 100% round 14px)' }, { clipPath: 'inset(0% 0% 0% 0% round 14px)', duration: 1.15, ease: 'expo.inOut', clearProps: 'clipPath' }, 0.6)
      .from(phone, { y: 56, autoAlpha: 0, duration: 1.05 }, 0.95)
      .from(q('proof'), { y: 12, autoAlpha: 0, duration: 0.8 }, 1.3)
      // 7 the finished frame holds for a beat, then the tour begins (only if in view)
      .add(() => tour.setReady(), 2.6);

    return () => rot?.kill();
  });
}
