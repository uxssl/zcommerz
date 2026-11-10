/**
 * E · AI product description walkthrough. Same player as the hero and the chat section
 * (scripts/tour.ts): 5s per scene, step select, play/pause, replay, pauses off-screen;
 * reduced motion shows final states.
 *   0 the brief      name types in, keywords pop, the cursor presses "Write with AI"
 *   1 AI writes      skeleton → three lines land → "Description ready"
 *   2 tone + language  selection moves, the paragraph is rewritten each time
 *   3 publish        the product page, cursor presses Publish → Published
 * Resting frame = end of scene 0 (a filled-in form), so the idle state looks finished.
 */
import { gsap } from './motion';
import { createTour, type SceneBuilder } from './tour';

/** Move a cursor to an element's centre, then press. */
function press(tl: gsap.core.Timeline, cur: HTMLElement, rip: HTMLElement, target: HTMLElement, stage: HTMLElement, at: number) {
  const r = target.getBoundingClientRect();
  const s = stage.getBoundingClientRect();
  const x = r.left - s.left + r.width * 0.62;
  const y = r.top - s.top + r.height * 0.6;
  tl.set(cur, { x: x + s.width * 0.18, y: y + s.height * 0.22, autoAlpha: 0 }, 0)
    .to(cur, { autoAlpha: 1, duration: 0.2 }, at - 0.5)
    .to(cur, { x, y, duration: 0.85, ease: 'power2.inOut' }, at - 0.5)
    .to(target, { scale: 0.95, duration: 0.12, yoyo: true, repeat: 1, ease: 'power2.out' }, at + 0.35)
    .fromTo(rip, { scale: 0.3, autoAlpha: 0.9 }, { scale: 2.2, autoAlpha: 0, duration: 0.7, ease: 'power2.out' }, at + 0.35)
    .to(cur, { autoAlpha: 0, duration: 0.3 }, at + 1.1);
}

/** Type a string into an element, with a blinking caret. */
function typeInto(tl: gsap.core.Timeline, el: HTMLElement, caret: HTMLElement | undefined, at: number, dur = 1.1) {
  const text = el.dataset.text ?? '';
  const c = { i: 0 };
  // no TextPlugin: the counter drives a plain slice
  tl.call(() => { el.textContent = ''; }, undefined, 0)
    .to(c, { i: text.length, duration: dur, ease: 'none', onUpdate: () => { el.textContent = text.slice(0, Math.round(c.i)); } }, at);
  if (caret) {
    tl.set(caret, { autoAlpha: 1 }, at)
      .to(caret, { autoAlpha: 0, duration: 0.01, repeat: 10, yoyo: true, repeatDelay: 0.22 }, at)
      .to(caret, { autoAlpha: 0, duration: 0.2 }, at + dur + 0.4);
  }
}

const theBrief: SceneBuilder = ({ q, stage }) => {
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
  const [shot] = q('shot');
  const [field] = q('type');
  const [car] = q('car');
  const [go] = q('go');
  const [cur] = q('cur');
  const [rip] = q('rip');

  tl.from(shot, { scale: 0.86, autoAlpha: 0, duration: 0.5, ease: 'back.out(1.8)' }, 0.15);
  typeInto(tl, field, car, 0.5, 1.1);
  tl.from(q('kw'), { scale: 0.7, autoAlpha: 0, duration: 0.4, stagger: 0.16, ease: 'back.out(2)' }, 1.9)
    .from(q('tone'), { y: 8, autoAlpha: 0, duration: 0.35, stagger: 0.08 }, 2.5)
    .from(go, { scale: 0.9, autoAlpha: 0, duration: 0.45, ease: 'back.out(1.8)' }, 2.9);
  press(tl, cur, rip, go, stage, 3.6);
  return tl;
};

const aiWrites: SceneBuilder = ({ q }) => {
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
  const [sk] = q('sk');
  const [s1] = q('s1');
  const [s2] = q('s2');
  const [sp] = q('sp');

  tl.set(s2, { autoAlpha: 0, position: 'absolute' }, 0)
    .set(q('ln'), { autoAlpha: 0 }, 0)
    .to(sp, { rotate: 360, duration: 1.4, ease: 'power1.inOut', repeat: 1 }, 0)
    .fromTo(sk.querySelectorAll('i'), { backgroundPositionX: '140%' }, { backgroundPositionX: '-40%', duration: 1.1, repeat: 2, ease: 'none', stagger: 0.1 }, 0.2)
    .to(sk, { autoAlpha: 0, height: 0, marginTop: 0, duration: 0.4 }, 1.8)
    .to(q('ln'), { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.55, startAt: { y: 10 } }, 1.9)
    .to(s1, { autoAlpha: 0, duration: 0.25 }, 3.1)
    .set(s1, { position: 'absolute' }, 3.35)
    .set(s2, { position: 'relative' }, 3.35)
    .to(s2, { autoAlpha: 1, duration: 0.3 }, 3.35);
  return tl;
};

const toneAndLanguage: SceneBuilder = ({ q }) => {
  const tl = gsap.timeline({ paused: true });
  const [t0] = q('t0');
  const [t2] = q('t2');
  const [l0] = q('l0');
  const [l1] = q('l1');
  const [b0] = q('b0');
  const [b1] = q('b1');
  const [b2] = q('b2');
  const on = { backgroundColor: '#0e1a2b', color: '#ffffff', boxShadow: 'none', duration: 0.3 };
  const off = { backgroundColor: '#f4f5f8', color: '#4b5568', duration: 0.3 };

  tl.set([b1, b2], { autoAlpha: 0 }, 0)
    // friendly → festive
    .to(t0, off, 1.5)
    .to(t2, on, 1.5)
    .to(b0, { autoAlpha: 0, y: -8, duration: 0.3 }, 1.5)
    .fromTo(b1, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 1.75)
    // English → Bangla
    .to(l0, off, 3.2)
    .to(l1, on, 3.2)
    .to(b1, { autoAlpha: 0, y: -8, duration: 0.3 }, 3.2)
    .fromTo(b2, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.4 }, 3.45);
  return tl;
};

const publish: SceneBuilder = ({ q, stage }) => {
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
  const [pub] = q('pub');
  const [cur] = q('cur');
  const [rip] = q('rip');
  const p1 = pub.querySelector<HTMLElement>('.p1')!;
  const p2 = pub.querySelector<HTMLElement>('.p2')!;

  tl.set(p2, { autoAlpha: 0 }, 0)
    .from(q('pshot'), { scale: 0.88, autoAlpha: 0, duration: 0.5, ease: 'back.out(1.7)' }, 0.1)
    .from(q('pb'), { y: 12, autoAlpha: 0, duration: 0.5, stagger: 0.14 }, 0.3);
  press(tl, cur, rip, pub, stage, 1.9);
  tl.to(p1, { autoAlpha: 0, duration: 0.2 }, 2.35)
    .to(p2, { autoAlpha: 1, duration: 0.25 }, 2.45)
    .to(pub, { backgroundColor: '#19c28f', duration: 0.3 }, 2.35);
  return tl;
};

export function initAiTour() {
  const root = document.querySelector<HTMLElement>('[data-ai-tour]');
  if (!root) return;
  createTour(root, { duration: 5600, builders: [theBrief, aiWrites, toneAndLanguage, publish] });
}
