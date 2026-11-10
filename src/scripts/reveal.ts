/**
 * Scroll reveals for sections below the hero: elements marked [data-sr] rise in once
 * as they enter the viewport. Registered through matchMedia, so reduced motion gets
 * no reveal (content simply visible) and everything reverts cleanly.
 */
import { gsap, MOTION_OK } from './motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initReveals(root: ParentNode = document) {
  const mm = gsap.matchMedia();
  mm.add(MOTION_OK, () => {
    const els = gsap.utils.toArray<HTMLElement>(root.querySelectorAll('[data-sr]'));
    els.forEach((el) => {
      // stagger direct children that ask for it (lists, rows)
      const kids = el.hasAttribute('data-sr-stagger') ? Array.from(el.children) : [el];
      gsap.from(kids, {
        y: 18,
        autoAlpha: 0,
        duration: 0.85,
        ease: 'expo.out',
        stagger: 0.07,
        clearProps: 'transform,translate,opacity,visibility',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
  });
  return mm;
}
