/**
 * Management (/): the dashboard plays itself — Orders → Products & stock → Sales overview —
 * driven by its own cursor, so it reads as someone using the product (user, 2026-11-10:
 * "should feel like a cursor is clicking", the earlier progress line read as a loader).
 *
 * Per view: the panel settles in (rows, stock meters + low flag, chart bars + KPI count-up),
 * the cursor glides to that view's point of interest [data-dash-poi] and hovers it, then moves
 * to the next sidebar item, presses, a ripple lands, and that view opens.
 * The sidebar itself is not interactive. Plays only while on screen and the tab is visible;
 * mouse hover pauses it. Reduced motion: Orders, still. (No pause button: removed at the user's request.)
 */
import { gsap, prefersReducedMotion } from './motion';

const ORDER = ['orders', 'stock', 'sales'] as const;
type View = (typeof ORDER)[number];
/* the arrow's tip inside the 22px cursor svg (path starts at 5,3 of 24) */
const TIP = { x: 4.6, y: 2.75 };

export function initDashAuto() {
  document.querySelectorAll<HTMLElement>('[data-dash]').forEach(initOne);
}

function initOne(root: HTMLElement) {
  const nav = root.querySelector<HTMLElement>('[data-dash-nav]')!;
  const items = new Map(Array.from(nav.querySelectorAll<HTMLElement>('[data-group]')).map((n) => [n.dataset.group as View, n]));
  const panels = new Map(Array.from(root.querySelectorAll<HTMLElement>('[data-gpanel]')).map((p) => [p.dataset.gpanel as View, p]));
  const cur = root.querySelector<SVGElement>('[data-dash-cur]')!;
  const rip = root.querySelector<HTMLElement>('[data-dash-rip]')!;

  if (prefersReducedMotion()) return; // resting frame: Orders, as rendered

  let idx = 0;
  let tl: gsap.core.Timeline | null = null;
  let onScreen = false;
  let hovered = false;
  let cursorShown = false;
  const bn = () => document.documentElement.lang === 'bn';

  /* ---------- geometry: a point inside an element, in .app coordinates ---------- */
  function pointIn(el: Element, fx = 0.5, fy = 0.5) {
    const a = root.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    return { x: r.left - a.left + r.width * fx, y: r.top - a.top + r.height * fy };
  }
  const tipTo = (p: { x: number; y: number }) => ({ x: p.x - TIP.x, y: p.y - TIP.y });

  /* ---------- switching views ---------- */
  function show(i: number) {
    idx = i;
    const id = ORDER[i];
    items.forEach((n, k) => { n.setAttribute('aria-current', String(k === id)); n.classList.remove('is-hover'); });
    panels.forEach((p, k) => {
      const on = k === id;
      p.toggleAttribute('data-off', !on);
      p.inert = !on;
      p.setAttribute('aria-hidden', String(!on));
    });
    enter(panels.get(id)!, id);
    play(id);
  }

  function enter(p: HTMLElement, id: View) {
    const ph = p.querySelector('.d-ph');
    if (ph) gsap.fromTo(ph, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: 'expo.out', clearProps: 'all' });
    gsap.fromTo(p.querySelectorAll('[data-trow]'), { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.07, delay: 0.08, ease: 'expo.out', clearProps: 'opacity,visibility,transform', overwrite: true });

    if (id === 'orders') {
      gsap.fromTo(p.querySelectorAll('.st'), { scale: 0.85, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.4, stagger: 0.1, delay: 0.35, ease: 'back.out(2.2)', clearProps: 'all' });
    }
    if (id === 'stock') {
      gsap.fromTo(p.querySelectorAll('.meter u'), { scaleX: 0 },
        { scaleX: 1, transformOrigin: 'left center', duration: 0.9, stagger: 0.1, delay: 0.25, ease: 'power3.out', clearProps: 'transform' });
      gsap.fromTo(p.querySelectorAll('.low'), { scale: 0.6, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.45, delay: 0.95, ease: 'back.out(2.6)', clearProps: 'opacity,visibility,transform' });
    }
    if (id === 'sales') {
      gsap.fromTo(p.querySelectorAll('.cb i'), { scaleY: 0 },
        { scaleY: 1, duration: 0.8, stagger: 0.06, delay: 0.25, ease: 'power3.out', clearProps: 'transform' });
      p.querySelectorAll<HTMLElement>('.kpis dd').forEach(countUp);
    }
  }

  /** Count a KPI up to its rendered value (English digits only; Bangla shows the final value). */
  function countUp(dd: HTMLElement) {
    const final = dd.textContent ?? '';
    const m = final.match(/^(\D*)([\d,]+)(\D*)$/);
    if (bn() || !m) return;
    const [, pre, num, post] = m;
    const target = Number(num.replace(/,/g, ''));
    const c = { v: 0 };
    gsap.to(c, {
      v: target, duration: 0.9, delay: 0.2, ease: 'power2.out',
      onUpdate: () => { dd.textContent = `${pre}${Math.round(c.v).toLocaleString('en-US')}${post}`; },
      onComplete: () => { dd.textContent = final; },
    });
  }

  /* ---------- one view's choreography: look, then click the next item ---------- */
  function play(id: View) {
    tl?.kill();
    const next = ORDER[(idx + 1) % ORDER.length];
    const poi = panels.get(id)!.querySelector<HTMLElement>(`[data-dash-poi="${id}"]`);
    const nextItem = items.get(next)!;
    const panel = panels.get(id)!;

    tl = gsap.timeline({ onComplete: () => show((idx + 1) % ORDER.length) });

    // first run: the cursor appears resting in the content area
    if (!cursorShown) {
      cursorShown = true;
      tl.set(cur, { ...tipTo(pointIn(panel, 0.78, 0.7)) }, 0)
        .to(cur, { autoAlpha: 1, duration: 0.4 }, 0.3);
    }

    // look at the thing worth seeing in this view
    if (poi) {
      tl.to(cur, { x: () => tipTo(pointIn(poi, 0.55, 0.5)).x, y: () => tipTo(pointIn(poi, 0.55, 0.5)).y, duration: 0.9, ease: 'power2.inOut' }, 1.1)
        .add(() => poi.classList.add('is-hover'))
        .to({}, { duration: 1.5 })
        .add(() => poi.classList.remove('is-hover'));
    } else {
      tl.to({}, { duration: 3.5 }, 1.1);
    }

    // keep the next item in view on the mobile scroller (horizontal only, never the page)
    tl.add(() => {
      if (nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: nextItem.offsetLeft - 8, behavior: 'smooth' });
    });

    // go to the next sidebar item and click it
    tl.to(cur, { x: () => tipTo(pointIn(nextItem, 0.42, 0.5)).x, y: () => tipTo(pointIn(nextItem, 0.42, 0.5)).y, duration: 0.85, ease: 'power2.inOut' }, '+=0.3')
      .add(() => nextItem.classList.add('is-hover'))
      .to(cur, { scale: 0.84, duration: 0.1, ease: 'power2.in', transformOrigin: `${TIP.x}px ${TIP.y}px` }, '+=0.22')
      .add(() => {
        const p = pointIn(nextItem, 0.42, 0.5);
        gsap.fromTo(rip, { x: p.x, y: p.y, scale: 0.2, autoAlpha: 0.9 }, { scale: 2.2, autoAlpha: 0, duration: 0.55, ease: 'power2.out' });
      })
      .to(cur, { scale: 1, duration: 0.16, ease: 'power2.out' });

    sync();
  }

  /* ---------- play / pause ---------- */
  function sync() {
    if (!tl) return;
    // re-check :hover so a missed pointerleave (resize, window switch) can't leave it stuck paused
    if (hovered && !root.matches(':hover')) hovered = false;
    const go = onScreen && !hovered && !document.hidden;
    if (go) tl.resume(); else tl.pause();
  }

  root.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { hovered = true; sync(); } });
  root.addEventListener('pointerleave', () => { hovered = false; sync(); });
  window.addEventListener('blur', () => { hovered = false; sync(); });
  // a stuck hover clears itself on the next check
  setInterval(() => { if (hovered) sync(); }, 1500);
  document.addEventListener('visibilitychange', sync);

  // start on first view; hold still whenever it is off screen
  let started = false;
  new IntersectionObserver((entries) => {
    onScreen = entries.some((e) => e.isIntersecting);
    if (onScreen && !started) { started = true; show(0); return; }
    sync();
  }, { threshold: 0.35 }).observe(root);
}
