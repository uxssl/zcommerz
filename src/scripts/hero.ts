/**
 * Hero behaviour: entrance choreography and the rotating headline word (the media frame's
 * video is handled by hero-media.ts). All motion is registered through gsap.matchMedia so it is
 * reverted automatically when reduced motion is switched on, or the breakpoint changes.
 */
import { gsap, prefersReducedMotion, MOTION_OK } from './motion';
import { heroHeadline } from '../data/hero';
import { getLang } from './i18n';


const esc = (s: string) =>
  s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

export function initHero() {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (!hero) return;
  const h1 = hero.querySelector<HTMLElement>('[data-h1]')!;
  const root = document.documentElement;

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

  function renderHeadline() {
    const h = heroHeadline[getLang()];
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
  const q = (k: string) => hero.querySelectorAll<HTMLElement>(`[data-h="${k}"]`);
  const header = document.querySelector<HTMLElement>('[data-header]');
  // Base state, independent of matchMedia (a conditions object only fires when one condition matches)
  root.classList.add('motion-ready');
  startRotator();

  const mm = gsap.matchMedia();
  mm.add(
    { motion: MOTION_OK, desktop: '(min-width: 1024px)' },
    (ctx) => {
      const { motion } = ctx.conditions as { motion: boolean };
      if (!motion) return;

      const path = h1.querySelector<SVGPathElement>('.rot-line path');
      const len = path?.getTotalLength() ?? 300;

      // Runs once per page load; a breakpoint change only re-registers the scroll depth
      if (!hero.dataset.entered) {
        hero.dataset.entered = '1';
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          // 1 nav settles · 2 headline (one masked block, not word-by-word) · 4 lead · 5 CTA
          .from(header, { y: -12, autoAlpha: 0, duration: 0.8 }, 0)
          .fromTo(q('title'), { y: 28, clipPath: 'inset(0% 0% 100% 0%)' }, { y: 0, clipPath: 'inset(0% 0% -25% 0%)', duration: 1.05, clearProps: 'clipPath' }, 0.2)
          .fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut', clearProps: 'strokeDasharray,strokeDashoffset' }, 0.85)
          .from(q('lead'), { y: 14, autoAlpha: 0, duration: 0.9 }, 0.5)
          .from(q('cta'), { y: 14, autoAlpha: 0, duration: 0.9, clearProps: 'transform,translate' }, 0.62) // the button row moves as one unit
          // 6 media frame opens from a centred band to full width
          .from(q('visual'), { autoAlpha: 0, duration: 0.01 }, 0.55)
          .fromTo(q('visual'), { clipPath: 'inset(6% 8% 6% 8% round 20px)' }, { clipPath: 'inset(0% 0% 0% 0% round 20px)', duration: 1.2, ease: 'expo.inOut', clearProps: 'clipPath' }, 0.6)
          .from(q('proof'), { y: 12, autoAlpha: 0, duration: 0.8 }, 1.3);
      }


      return () => rot?.kill();
    },
  );
}
