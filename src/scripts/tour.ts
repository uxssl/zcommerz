/**
 * Scene player shared by the hero tour (and later the section walkthroughs).
 *
 * A scene can span several elements: every element with `data-scene="i"` belongs to
 * scene i (e.g. the browser window body, the phone screen, the URL text).
 * They are shown, hidden and animated together.
 *
 * Preserves the product-team player contract:
 *  - fixed duration per scene with a progress bar, auto-advance, loop
 *  - click a step to jump; play/pause with a translated label
 *  - starts when ≥25% in view; pauses off-screen and when the tab is hidden
 *  - reduced motion: no autoplay, scenes render in their final state
 */
import { gsap, prefersReducedMotion } from './motion';
import { tr } from './i18n';

export interface SceneCtx {
  /** All elements of this scene */
  els: HTMLElement[];
  /** Query inside this scene's elements: `q('tile')` → `[data-a="tile"]` */
  q: (key: string) => HTMLElement[];
  /** The stage element (for positioning things relative to it) */
  stage: HTMLElement;
}
export type SceneBuilder = (ctx: SceneCtx) => gsap.core.Timeline;

interface Options {
  duration: number; // ms per scene
  builders: SceneBuilder[];
}

const ANIMATED = 'transform,translate,rotate,scale,opacity,visibility,clipPath,strokeDashoffset,zIndex';

export function createTour(root: HTMLElement, { duration, builders }: Options) {
  const stage = root.querySelector<HTMLElement>('[data-tour-stage]')!;
  // A stage may carry only some of the scenes (data-scenes="1,2,3"); builders are indexed by scene id
  const ids = stage.dataset.scenes ? stage.dataset.scenes.split(',').map(Number) : builders.map((_, i) => i);
  const scenes = ids.map((id) => builders[id]);
  // An element can belong to several scenes (data-scene="0 4"), and a scene id can repeat in the order
  const groups = ids.map((id) => Array.from(stage.querySelectorAll<HTMLElement>(`[data-scene~="${id}"]`)));
  const steps = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-step]'));
  const bars = steps.map((s) => s.querySelector<HTMLElement>('[data-bar]')!);
  const playBtn = root.querySelector<HTMLButtonElement>('[data-tour-play]'); // optional: the hero runs without controls
  const caption = root.querySelector<HTMLElement>('[data-tour-caption]');

  const reduce = prefersReducedMotion();
  const state = { cur: -1, elapsed: 0, playing: !reduce, inView: false, ready: false, started: false };
  let tl: gsap.core.Timeline | null = null;
  let fade: gsap.core.Tween | null = null;

  const running = () => state.playing && state.started && state.inView && state.ready && !document.hidden;

  function resetGroup(els: HTMLElement[]) {
    const inner = els.flatMap((el) => [el, ...Array.from(el.querySelectorAll<HTMLElement>('[data-a]'))]);
    gsap.set(inner, { clearProps: ANIMATED });
    inner.forEach((el) => {
      el.removeAttribute('data-on');
      ['--ta', '--tb', '--tt'].forEach((v) => el.style.removeProperty(v));
    });
  }

  function setGroupVisible(els: HTMLElement[], on: boolean) {
    els.forEach((el) => {
      el.classList.toggle('is-active', on);
      el.toggleAttribute('inert', !on);
      el.setAttribute('aria-hidden', String(!on));
    });
  }

  function syncCaption() {
    if (!caption || state.cur < 0) return;
    const s = steps[state.cur];
    caption.querySelector('b')!.textContent = s.querySelector('b')?.textContent ?? '';
    caption.querySelector('small')!.textContent = s.querySelector('small')?.textContent ?? '';
  }

  function activate(i: number, animate = true) {
    const prevIdx = state.cur;
    state.cur = i;
    state.elapsed = 0;
    tl?.kill();
    fade?.progress(1).kill();

    const next = groups[i];
    // The leaving scene, minus any elements it shares with the next one (those simply stay)
    const prevAll = prevIdx >= 0 && prevIdx !== i ? groups[prevIdx] : null;
    const prevOnly = prevAll?.filter((el) => !next.includes(el)) ?? [];
    const prev = prevOnly.length ? prevOnly : null;

    // Hide every other scene, except elements the next or the leaving scene still uses
    const keep = new Set([...next, ...(prev ?? [])]);
    groups.forEach((g, k) => {
      if (k !== i) setGroupVisible(g.filter((el) => !keep.has(el)), false);
    });
    resetGroup(next);
    setGroupVisible(next, true);

    const q = (key: string) => next.flatMap((el) => Array.from(el.querySelectorAll<HTMLElement>(`[data-a="${key}"]`)));
    tl = scenes[i]({ els: next, q, stage });

    if (prev && animate && !reduce) {
      // Scenes marked data-enter="wipe" arrive through a mask over the previous one
      // (masked state change); others crossfade (used where geometry is continuous).
      const wipes = next.filter((el) => el.dataset.enter === 'wipe');
      const fades = next.filter((el) => el.dataset.enter !== 'wipe');
      const D = wipes.length ? 0.7 : 0.35;
      prev.forEach((el) => el.classList.add('is-leaving'));
      if (wipes.length) {
        gsap.fromTo(wipes, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: D, ease: 'expo.inOut', clearProps: 'clipPath' });
      }
      if (fades.length) gsap.fromTo(fades, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, ease: 'power1.out', clearProps: 'opacity,visibility' });
      // Under a wipe, the previous screen bodies stay put until covered; chrome bits (URL, badges) fade
      const held = wipes.length ? prev.filter((el) => el.matches('.ws, .ps')) : [];
      const out = prev.filter((el) => !held.includes(el));
      if (out.length) gsap.to(out, { autoAlpha: 0, duration: 0.3, ease: 'power2.out' });
      fade = gsap.to(held.length ? held : prev, {
        autoAlpha: held.length ? 1 : 0,
        duration: D,
        ease: 'power2.out',
        onComplete: () => {
          setGroupVisible(prev, false);
          prev.forEach((el) => el.classList.remove('is-leaving'));
          gsap.set(prev, { clearProps: 'opacity,visibility' });
        },
      });
    } else if (prev) {
      setGroupVisible(prev, false);
    }

    if (reduce || !animate) tl.progress(1);
    if (!running() || reduce) tl.pause();

    steps.forEach((s, k) => {
      s.classList.toggle('done', k < i);
      if (k === i) s.setAttribute('aria-current', 'step');
      else s.removeAttribute('aria-current');
      gsap.set(bars[k], { scaleX: k < i ? 1 : 0 });
    });
    syncCaption();
  }

  function sync() {
    root.classList.toggle('is-paused', !state.playing);
    playBtn?.setAttribute('aria-label', state.playing ? tr('Pause tour', 'ট্যুর থামান') : tr('Play tour', 'ট্যুর চালান'));
    if (!tl || reduce) return;
    if (running()) tl.play();
    else tl.pause();
  }

  function start() {
    if (state.started || !state.ready || !state.inView) return;
    state.started = true;
    // Parked on the resting (final) frame: play the scene from its beginning
    if (!reduce && tl && tl.progress() === 1) tl.progress(0);
    sync();
  }

  const tick = (_t: number, dt: number) => {
    if (!running() || state.cur < 0) return;
    state.elapsed += Math.min(dt, 100);
    if (bars[state.cur]) gsap.set(bars[state.cur], { scaleX: Math.min(state.elapsed / duration, 1) });
    if (state.elapsed >= duration) {
      activate((state.cur + 1) % groups.length);
      sync();
    }
  };
  gsap.ticker.add(tick);

  steps.forEach((s, i) =>
    s.addEventListener('click', () => {
      state.started = state.ready = true;
      activate(i);
      sync();
    }),
  );
  playBtn?.addEventListener('click', () => {
    state.playing = !state.playing;
    state.started = state.ready = true;
    if (state.playing && !reduce && tl && tl.progress() === 1 && state.elapsed === 0) tl.progress(0);
    sync();
  });
  function replay() {
    state.playing = state.started = state.ready = true;
    activate(0);
    sync();
  }
  root.querySelector<HTMLButtonElement>('[data-tour-replay]')?.addEventListener('click', replay);

  const onVis = () => sync();
  const onLang = () => {
    sync();
    syncCaption();
  };
  document.addEventListener('visibilitychange', onVis);
  document.addEventListener('langchange', onLang);

  const io = new IntersectionObserver(
    ([e]) => {
      state.inView = e.isIntersecting;
      start();
      sync();
    },
    { threshold: 0.25 },
  );
  // Observe the stage, not the whole section: a tall mobile hero might never reach 25%
  io.observe(stage);

  // Some tweens measure the DOM (cursor target, flying thumbnails): rebuild on resize
  let lastW = stage.clientWidth;
  let rz = 0;
  const ro = new ResizeObserver(() => {
    if (Math.abs(stage.clientWidth - lastW) < 2) return;
    lastW = stage.clientWidth;
    cancelAnimationFrame(rz);
    rz = requestAnimationFrame(() => {
      if (state.cur < 0 || !tl) return;
      const p = tl.progress();
      const elapsed = state.elapsed;
      activate(state.cur, false);
      tl.progress(reduce ? 1 : p);
      state.elapsed = elapsed;
      if (bars[state.cur]) gsap.set(bars[state.cur], { scaleX: elapsed / duration });
      sync();
    });
  });
  ro.observe(stage);

  // Park on scene 1's final frame: the finished store is the resting state (also under reduced motion)
  stage.classList.add('tour-ready');
  activate(0, false);
  sync();

  return {
    /** Called by the hero entrance once the stage has been revealed */
    setReady() {
      state.ready = true;
      start();
      sync();
    },
    /** Restart from scene 1 and play */
    replay,
    /** Dev/QA: current player flags */
    debug: () => ({ ...state, running: running() }),
    /** Dev/QA: simulate the stage entering/leaving the viewport */
    setInView(v: boolean) {
      state.inView = v;
      start();
      sync();
    },
    /** Dev/QA: show scene i frozen at timeline progress p */
    seek(i: number, p = 1) {
      state.playing = false;
      state.started = state.ready = true;
      activate(i, false);
      tl?.progress(p);
      sync();
    },
    destroy() {
      gsap.ticker.remove(tick);
      io.disconnect();
      ro.disconnect();
      tl?.kill();
      document.removeEventListener('visibilitychange', onVis);
      document.removeEventListener('langchange', onLang);
    },
  };
}
