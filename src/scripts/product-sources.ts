/**
 * "Your products" section: draws the threads that join sources → catalog → website (desktop),
 * and plays the product journey once when the section comes into view:
 *   each source lights in turn → its thread draws → its product photo travels into the catalog
 *   (the row lands, the count ticks up) → the catalog thread draws → the website fills in → Live.
 * The resting state (no JS, reduced motion, after playing) is the finished journey.
 */
import { gsap, prefersReducedMotion } from './motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NS = 'http://www.w3.org/2000/svg';

export function initProductSources() {
  const root = document.querySelector<HTMLElement>('[data-ps]');
  const journey = root?.querySelector<HTMLElement>('[data-journey]');
  if (!root || !journey) return;

  const $ = <T extends Element = HTMLElement>(s: string) => Array.from(journey.querySelectorAll<T & HTMLElement>(s));
  const srcs = $('[data-src]');
  const frags = $('[data-frag]');
  const cat = journey.querySelector<HTMLElement>('[data-cat]')!;
  const site = journey.querySelector<HTMLElement>('[data-site]')!;
  const rows = $('[data-row]');
  const tiles = $('[data-tile]');
  const flies = $<HTMLImageElement>('[data-fly]');
  const fromImg = (i: number) => journey.querySelector<HTMLElement>(`[data-from="${i}"]`)!;
  const toImg = (i: number) => journey.querySelector<HTMLElement>(`[data-to="${i}"]`)!;
  const count = journey.querySelector<HTMLElement>('[data-count]')!;
  const live = journey.querySelector<HTMLElement>('[data-live]')!;
  const typed = journey.querySelector<HTMLElement>('[data-type]');
  const typedPrice = journey.querySelector<HTMLElement>('[data-type-price]');
  const addBtn = journey.querySelector<HTMLElement>('[data-addbtn]');
  const replayBtn = root.querySelector<HTMLButtonElement>('[data-ps-replay]');
  const svg = journey.querySelector<SVGSVGElement>('[data-threads]')!;
  const total = rows.length;

  /* ---------- Threads (desktop): source → its first catalog row, catalog → website ---------- */
  const rowOf = (si: number) => rows.findIndex((r) => sourceOfRow(r) === si);
  const sourceOfRow = (r: HTMLElement) => {
    const i = Number(r.dataset.row);
    return srcs.findIndex((s) => s.querySelector(`[data-from="${i}"]`));
  };
  type Thread = { base: SVGPathElement; run: SVGPathElement; dot: SVGCircleElement };
  const threads: Thread[] = [];
  for (let k = 0; k <= srcs.length; k++) {
    const base = document.createElementNS(NS, 'path');
    const run = document.createElementNS(NS, 'path');
    const dot = document.createElementNS(NS, 'circle');
    base.setAttribute('class', 'base');
    run.setAttribute('class', 'run');
    dot.setAttribute('class', 'end');
    dot.setAttribute('r', '4');
    svg.append(base, run, dot);
    threads.push({ base, run, dot });
  }

  function layoutThreads() {
    const J = journey!.getBoundingClientRect();
    if (getComputedStyle(svg).display === 'none' || !J.width) return;
    svg.setAttribute('viewBox', `0 0 ${J.width} ${J.height}`);
    const curve = (x1: number, y1: number, x2: number, y2: number) => {
      const mx = (x1 + x2) / 2;
      return `M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
    };
    const C = cat.getBoundingClientRect();
    srcs.forEach((_, si) => {
      const f = frags[si].getBoundingClientRect();
      const r = rows[rowOf(si)]?.getBoundingClientRect();
      if (!r) return;
      const x1 = f.right - J.left + 10;
      const y1 = f.top + f.height / 2 - J.top;
      const x2 = C.left - J.left - 6;
      const y2 = r.top + r.height / 2 - J.top;
      const d = curve(x1, y1, x2, y2);
      threads[si].base.setAttribute('d', d);
      threads[si].run.setAttribute('d', d);
      threads[si].dot.setAttribute('cx', String(x2));
      threads[si].dot.setAttribute('cy', String(y2));
    });
    const S = site.getBoundingClientRect();
    const last = threads[srcs.length];
    const y = Math.min(C.top + C.height / 2, S.top + S.height / 2) - J.top;
    const d = curve(C.right - J.left + 6, y, S.left - J.left - 6, y);
    last.base.setAttribute('d', d);
    last.run.setAttribute('d', d);
    last.dot.setAttribute('cx', String(S.left - J.left - 6));
    last.dot.setAttribute('cy', String(y));
  }
  layoutThreads();
  new ResizeObserver(() => layoutThreads()).observe(journey);
  document.fonts?.ready.then(layoutThreads);
  document.addEventListener('langchange', () => requestAnimationFrame(layoutThreads));

  if (prefersReducedMotion()) return; // finished journey, threads drawn, nothing moves

  /* ---------- Journey timeline ---------- */
  const rel = (el: Element) => {
    const r = el.getBoundingClientRect();
    const J = journey!.getBoundingClientRect();
    return { cx: r.left - J.left + r.width / 2, cy: r.top - J.top + r.height / 2, w: r.width };
  };

  function reset() {
    gsap.set([...rows, ...tiles], { autoAlpha: 0, y: 10 });
    gsap.set(live, { autoAlpha: 0, scale: 0.6 });
    gsap.set(flies, { autoAlpha: 0 });
    threads.forEach((t) => {
      const len = t.run.getTotalLength() || 1;
      gsap.set(t.run, { strokeDasharray: len, strokeDashoffset: len });
      gsap.set(t.dot, { autoAlpha: 0 });
    });
    // The name is revealed with a mask, never rewritten, so the language switch keeps working
    if (typed) gsap.set(typed, { clipPath: 'inset(0% 100% 0% 0%)' });
    if (typedPrice) gsap.set(typedPrice, { autoAlpha: 0 });
    rows.forEach((r) => r.classList.remove('is-new'));
    srcs.forEach((s) => s.classList.remove('is-on'));
    count.textContent = '0';
  }

  let landed = 0;
  function build() {
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        // threads stay drawn and keep following the layout on resize
        gsap.set(threads.map((t) => t.run), { clearProps: 'strokeDasharray,strokeDashoffset' });
        if (replayBtn) replayBtn.hidden = false;
      },
    });
    landed = 0;
    srcs.forEach((src, si) => {
      const t = 0.3 + si * 1.35;
      const items = rows.map((r) => Number(r.dataset.row)).filter((i) => sourceOfRow(rows[i]) === si);
      tl.call(() => src.classList.add('is-on'), [], t)
        .to(threads[si].run, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, t + 0.1)
        .to(threads[si].dot, { autoAlpha: 1, duration: 0.2 }, t + 0.75);

      let flyAt = t + 0.35;
      // Your own product: the name is typed, the price appears, "Add product" is pressed
      if (src.querySelector('[data-type]') && typed) {
        tl.to(typed, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6, ease: 'steps(16)' }, t + 0.05)
          .to(typedPrice, { autoAlpha: 1, duration: 0.25 }, t + 0.65)
          .to(addBtn, { scale: 0.93, duration: 0.1, yoyo: true, repeat: 1, ease: 'power1.inOut' }, t + 0.85);
        flyAt = t + 0.95;
      }

      items.forEach((i, k) => {
        const at = flyAt + k * 0.16;
        tl.fromTo(
          flies[i],
          {
            autoAlpha: 1,
            width: () => rel(toImg(i)).w,
            height: () => rel(toImg(i)).w,
            x: () => rel(fromImg(i)).cx - rel(toImg(i)).w / 2,
            y: () => rel(fromImg(i)).cy - rel(toImg(i)).w / 2,
            scale: () => rel(fromImg(i)).w / rel(toImg(i)).w,
          },
          {
            x: () => rel(toImg(i)).cx - rel(toImg(i)).w / 2,
            y: () => rel(toImg(i)).cy - rel(toImg(i)).w / 2,
            scale: 1,
            duration: 0.85,
            ease: 'expo.inOut',
            immediateRender: false,
          },
          at,
        )
          .to(rows[i], { autoAlpha: 1, y: 0, duration: 0.35 }, at + 0.7)
          .call(() => { rows[i].classList.add('is-new'); count.textContent = String(++landed); }, [], at + 0.7)
          .set(flies[i], { autoAlpha: 0 }, at + 0.86)
          .call(() => rows[i].classList.remove('is-new'), [], at + 2.2);
      });
      tl.call(() => src.classList.remove('is-on'), [], t + 1.55);
    });

    // The catalog becomes the website
    const T = 0.3 + srcs.length * 1.35 + 0.35;
    const last = threads[srcs.length];
    return tl
      .to(last.run, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.inOut' }, T)
      .to(last.dot, { autoAlpha: 1, duration: 0.2 }, T + 0.55)
      .to(tiles, { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.09 }, T + 0.45)
      .to(live, { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'back.out(2.2)' }, T + 0.95)
      .call(() => { count.textContent = String(total); }, [], T + 1);
  }

  reset();
  let tl = build();
  ScrollTrigger.create({ trigger: journey, start: 'top 72%', once: true, onEnter: () => tl.play(0) });
  if (import.meta.env.DEV) (window as any).__ps = { get tl() { return tl; }, layoutThreads };

  replayBtn?.addEventListener('click', () => {
    replayBtn.hidden = true;
    tl.kill();
    reset();
    tl = build();
    tl.play(0);
  });

  // A language switch mid-play would leave a half-typed name: show the finished journey instead
  document.addEventListener('langchange', () => {
    if (tl.isActive()) tl.progress(1);
  });
}
