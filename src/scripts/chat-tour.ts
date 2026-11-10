/**
 * Chat-to-order walkthrough (D). Same player as the hero (scripts/tour.ts): 5s per scene,
 * step select, play/pause, replay, pauses off-screen; reduced motion shows final states.
 * Resting frame = end of scene 1 (both conversations complete).
 */
import { gsap } from './motion';
import { createTour, type SceneBuilder } from './tour';

const rel = (el: Element, stage: HTMLElement) => {
  const r = el.getBoundingClientRect();
  const s = stage.getBoundingClientRect();
  return { cx: r.left - s.left + r.width / 2, cy: r.top - s.top + r.height / 2 };
};

/** Bubbles arrive one by one; an optional typing indicator shows before the reply at `typeAt`. */
function bubbles(tl: gsap.core.Timeline, msgs: HTMLElement[], times: number[], typing?: HTMLElement[], typeAt?: [number, number]) {
  if (typing?.length && typeAt) {
    tl.set(typing, { display: 'flex', autoAlpha: 0 }, 0)
      .to(typing, { autoAlpha: 1, duration: 0.2 }, typeAt[0])
      .to(typing, { autoAlpha: 0, duration: 0.15 }, typeAt[1])
      .set(typing, { display: 'none' }, typeAt[1] + 0.15);
  }
  msgs.forEach((m, i) => tl.from(m, { y: 10, autoAlpha: 0, scale: 0.96, transformOrigin: m.classList.contains('out') ? '100% 100%' : '0% 100%', duration: 0.45, ease: 'back.out(1.6)' }, times[i]));
}

const customersMessage: SceneBuilder = ({ q }) => {
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
  // phone (WhatsApp, Rahim) and browser (Messenger, Nusrat) run side by side
  bubbles(tl, q('rm'), [0.2, 1.35, 1.8, 2.6], q('rtyping'), [0.7, 1.3]);
  bubbles(tl, q('nm'), [0.5, 1.75, 2.9], q('ntyping'), [1.05, 1.7]);
  return tl;
};

const oneInbox: SceneBuilder = ({ q }) =>
  gsap
    .timeline({ paused: true, defaults: { ease: 'expo.out' } })
    .from(q('lrow'), { x: -12, autoAlpha: 0, stagger: 0.12, duration: 0.6 }, 0.2)
    .from(q('lm'), { y: 10, autoAlpha: 0, stagger: 0.25, duration: 0.5 }, 0.6)
    .from(q('lprof'), { autoAlpha: 0, x: 12, duration: 0.6 }, 1.3)
    .to(q('lbtn'), { scale: 1.06, duration: 0.25, yoyo: true, repeat: 1, ease: 'power1.inOut' }, 2.4);

const createOrder: SceneBuilder = ({ els, q, stage }) => {
  const curSvg = els.find((e) => e.classList.contains('cur'))!;
  const ripWrap = els.find((e) => e.classList.contains('rip'))!;
  const [btn] = q('obtn');
  const TIP = { x: 5.4, y: 3.2 };
  return gsap
    .timeline({ paused: true, defaults: { ease: 'power3.out' } })
    .from(q('frow'), { y: 12, autoAlpha: 0, stagger: 0.18, duration: 0.5 }, 0.25)
    .from(btn, { y: 8, autoAlpha: 0, duration: 0.45 }, 1.1)
    .fromTo(curSvg,
      { x: () => stage.clientWidth * 0.95, y: () => stage.clientHeight * 0.95 },
      { x: () => rel(btn, stage).cx - TIP.x, y: () => rel(btn, stage).cy - TIP.y, duration: 0.9, ease: 'power2.inOut', immediateRender: false }, 1.4)
    .fromTo(q('cur'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, 1.4)
    .to(btn, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, ease: 'power1.inOut' }, 2.35)
    .set(ripWrap, { x: () => rel(btn, stage).cx, y: () => rel(btn, stage).cy }, 2.35)
    .fromTo(q('rip'), { scale: 0.3, opacity: 0.5 }, { scale: 1.5, opacity: 0, duration: 0.6, ease: 'power2.out', immediateRender: false }, 2.35)
    .set(btn, { attr: { 'data-on': '1' } }, 2.5)
    .to(q('cur'), { opacity: 0, duration: 0.3 }, 3.2);
};

const updates: SceneBuilder = ({ q }) => {
  const msgs = q('um');
  const steps = q('tstep');
  const tl = gsap.timeline({ paused: true });
  // each WhatsApp update ticks its step on the timeline at the same moment
  [0.4, 1.4, 2.4].forEach((t, i) => {
    tl.from(msgs[i], { y: 10, autoAlpha: 0, scale: 0.96, transformOrigin: '0% 100%', duration: 0.45, ease: 'back.out(1.6)' }, t)
      .set(steps[i], { attr: { 'data-on': '1' } }, t + 0.15);
  });
  return tl.from(msgs[3], { y: 10, autoAlpha: 0, scale: 0.96, transformOrigin: '100% 100%', duration: 0.45, ease: 'back.out(1.6)' }, 3.3);
};

export function initChatTour() {
  const root = document.querySelector<HTMLElement>('[data-chat]');
  if (!root) return;
  const tour = createTour(root, { duration: 5000, builders: [customersMessage, oneInbox, createOrder, updates] });
  tour.setReady(); // starts only once the stage is ≥25% in view
  if (import.meta.env.DEV) (window as any).__chatTour = tour;
}
