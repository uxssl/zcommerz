import { gsap } from 'gsap';

/** Dev-only QA switch: `?reduced` forces the reduced-motion path (browsers can't be told to emulate it here). */
const forced = import.meta.env.DEV && new URLSearchParams(location.search).has('reduced');
const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
export const prefersReducedMotion = () => forced || mq.matches;
/** Media query for gsap.matchMedia conditions */
export const MOTION_OK = forced ? '(max-width: 0px)' : '(prefers-reduced-motion: no-preference)';

gsap.defaults({ ease: 'power3.out', duration: 0.6 });

/** Motion tokens, mirrored from docs/02-design-direction.md */
export const ease = {
  entrance: 'expo.out',
  ui: 'power3.out',
  move: 'power2.inOut',
} as const;

export { gsap };

if (import.meta.env.DEV) (window as any).gsap = gsap;
