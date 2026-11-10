/**
 * Choreography for the four hero scenes. Every timeline fits the 4.5s scene slot.
 * Scene 0 carries the Facebook → store story: the cursor presses "Build my store",
 * and each product photo travels from its Facebook post on the phone into its
 * place in the new storefront (FLIP-style, measured at play time).
 */
import { gsap } from './motion';
import type { SceneBuilder } from './tour';

const rel = (el: Element, stage: HTMLElement) => {
  const r = el.getBoundingClientRect();
  const s = stage.getBoundingClientRect();
  return { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height, cx: r.left - s.left + r.width / 2, cy: r.top - s.top + r.height / 2 };
};

const buildFromPage: SceneBuilder = ({ els, q, stage }) => {
  const curSvg = els.find((e) => e.classList.contains('cur'))!;
  const ripWrap = els.find((e) => e.classList.contains('rip'))!;
  const [btn] = q('btn');
  const tiles = q('tile');
  const thumbs = q('thumb');
  const fly = q('fly');
  const built = q('built');
  const TIP = { x: 5.4, y: 3.2 }; // cursor hotspot inside the 26px svg
  const box = (i: number) => rel(tiles[i].parentElement!, stage);
  const size = (i: number) => tiles[i].offsetWidth;

  // The final frame of this timeline is the hero's resting state (finished store, button done).
  // Playing from 0 "rewinds" that state first, then rebuilds it.
  const tl = gsap
    .timeline({ paused: true, defaults: { ease: 'power3.out' } })
    .fromTo(built, { clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.5, ease: 'expo.inOut' }, 0)
    .fromTo(q('fill'), { scaleX: 1 }, { scaleX: 0, duration: 0.3 }, 0)
    .fromTo(q('ok'), { autoAlpha: 1, scale: 1 }, { autoAlpha: 0, scale: 0.5, duration: 0.2 }, 0)
    .fromTo(q('thread'), { scaleX: 1 }, { scaleX: 0, duration: 0.3 }, 0)
    .set(tiles, { autoAlpha: 0 }, 0.3)
    .set(fly, { autoAlpha: 0, width: (i: number) => size(i), height: (i: number) => size(i) }, 0)
    .from(q('post'), { y: 10, autoAlpha: 0, stagger: 0.08, duration: 0.45 }, 0.35)
    // Cursor comes in and presses "Build my store" on the seam
    .fromTo(
      curSvg,
      { x: () => stage.clientWidth * 0.96, y: () => stage.clientHeight * 0.95 },
      { x: () => rel(btn, stage).cx - TIP.x, y: () => rel(btn, stage).cy - TIP.y, duration: 0.9, ease: 'power2.inOut', immediateRender: false },
      0.55,
    )
    .fromTo(q('cur'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 0.55)
    .to(btn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, ease: 'power1.inOut' }, 1.45)
    .set(ripWrap, { x: () => rel(btn, stage).cx, y: () => rel(btn, stage).cy }, 1.45)
    .fromTo(q('rip'), { scale: 0.3, opacity: 0.5 }, { scale: 1.5, opacity: 0, duration: 0.6, ease: 'power2.out', immediateRender: false }, 1.45)
    // The thread connects page and store; the button fills as the build progresses
    .to(q('thread'), { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, 1.55)
    .to(q('fill'), { scaleX: 1, duration: 1.6, ease: 'power1.inOut' }, 1.55)
    .to(q('cur'), { opacity: 0, duration: 0.3 }, 2.3)
    // Product photos travel from the Facebook posts across the seam into the store grid
    .fromTo(
      fly,
      {
        autoAlpha: 1,
        x: (i: number) => rel(thumbs[i], stage).cx - size(i) / 2,
        y: (i: number) => rel(thumbs[i], stage).cy - size(i) / 2,
        scale: (i: number) => thumbs[i].offsetWidth / size(i),
      },
      {
        x: (i: number) => box(i).cx - size(i) / 2,
        y: (i: number) => box(i).cy - size(i) / 2,
        scale: 1,
        duration: 0.85,
        stagger: 0.18,
        ease: 'expo.inOut',
        immediateRender: false,
      },
      1.65,
    );
  tiles.forEach((t, i) => {
    const land = 1.65 + 0.85 + i * 0.18;
    tl.set(t, { autoAlpha: 1 }, land).set(fly[i], { autoAlpha: 0 }, land);
  });
  // The finished storefront unmasks over the skeleton; the seam button resolves to done
  return tl
    .to(built, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'expo.inOut' }, 3.0)
    .to(q('ok'), { autoAlpha: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, 3.15);
};

/* Store themes rotate across the whole tour (user, 2026-11-10: "not only green"). Each
   "Switching themes…" moment moves forward three themes and stays there, so the scenes after it
   (build, orders, checkout) carry that colour and every loop looks different. */
const THEMES = ['grocery', 'fashion', 'electronics', 'beauty'] as const;
let themeIdx = 0;
const nextTheme = (stage: HTMLElement) => {
  themeIdx = (themeIdx + 1) % THEMES.length;
  stage.dataset.theme = THEMES[themeIdx];
};

const storeLive: SceneBuilder = ({ q, stage }) => {
  return gsap
    .timeline({ paused: true, defaults: { ease: 'power3.out' } })
    .fromTo(q('url'), { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 0.8, ease: 'steps(21)' }, 0)
    .from(q('shead'), { autoAlpha: 0, y: 8, duration: 0.5 }, 0.1)
    .from([...q('ban'), ...q('mban')], { autoAlpha: 0, y: 14, duration: 0.6 }, 0.2)
    .from([...q('item'), ...q('mitem')], { autoAlpha: 0, y: 14, stagger: 0.08, duration: 0.5 }, 0.4)
    .from(q('pay'), { autoAlpha: 0, duration: 0.4 }, 0.8)
    .from(q('live'), { scale: 0.6, autoAlpha: 0, duration: 0.45, ease: 'back.out(2.2)' }, 1)
    // "Switching themes…": three themes forward, and the last one stays for the rest of the loop
    .fromTo(q('hint'), { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 1.9)
    .add(() => nextTheme(stage), 2.25)
    .add(() => nextTheme(stage), 2.95)
    .add(() => nextTheme(stage), 3.65)
    .to(q('hint'), { autoAlpha: 0, duration: 0.3 }, 4.05);
};

const ordersArrive: SceneBuilder = ({ q }) => {
  const rows = q('orow');
  const notes = q('note');
  const tl = gsap
    .timeline({ paused: true, defaults: { ease: 'power3.out' } })
    .from(q('card'), { autoAlpha: 0, y: 12, duration: 0.6 }, 0);
  notes.forEach((n, i) => {
    const t = 0.4 + i * 0.75;
    tl.from(n, { autoAlpha: 0, y: -18, scale: 0.96, duration: 0.6, ease: 'expo.out' }, t)
      .from(rows[i], { autoAlpha: 0, x: -10, duration: 0.45 }, t + 0.15);
  });
  return tl.from(q('total'), { autoAlpha: 0, y: 12, duration: 0.6, ease: 'expo.out' }, 2.75);
};

const payAndDeliver: SceneBuilder = ({ q }) => {
  const bk = q('pc').filter((p) => p.dataset.pc === 'bk');
  const tl = gsap
    .timeline({ paused: true, defaults: { ease: 'power3.out' } })
    .from(q('card'), { autoAlpha: 0, y: 14, duration: 0.6 }, 0)
    .from(q('amt'), { autoAlpha: 0, y: 8, duration: 0.45 }, 0.2)
    .from(q('morder'), { autoAlpha: 0, y: 8, duration: 0.45 }, 0.25)
    .from(q('pc'), { autoAlpha: 0, y: 8, stagger: 0.06, duration: 0.4 }, 0.35)
    .from(q('gw'), { autoAlpha: 0, y: 6, duration: 0.4 }, 0.6)
    .set(bk, { attr: { 'data-on': '1' } }, 1.1)
    // SSLCOMMERZ processes the payment: the gateway row lights up just before "Payment received"
    .set(q('gw'), { attr: { 'data-on': '1' } }, 1.35)
    .from(q('paid'), { autoAlpha: 0, scale: 0.94, duration: 0.45, ease: 'back.out(2)' }, 1.6)
    .fromTo(q('tline'), { scaleY: 0 }, { scaleY: 1, duration: 1.8, ease: 'none' }, 2.1);
  q('tli').forEach((li, i) => tl.set(li, { attr: { 'data-on': '1' } }, 2.1 + i * 0.6));
  return tl;
};

// Indexed by scene id: 4 is the Daraz version of the build (same choreography, Daraz shop on the phone)
export const heroScenes = [buildFromPage, storeLive, ordersArrive, payAndDeliver, buildFromPage];
