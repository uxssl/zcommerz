/**
 * Hero media: a silent background loop that plays only while on screen (and never under
 * reduced motion), a pause toggle for it (WCAG 2.2.2), and the full video in a modal dialog
 * opened from the frame or from "Watch the demo". Every part is optional: with no video files
 * the frame is a still poster and this does nothing.
 */
import { prefersReducedMotion } from './motion';
import { tr } from './i18n';

export function initHeroMedia() {
  const frame = document.querySelector<HTMLElement>('[data-hero-media]');
  if (!frame) return;
  const loop = frame.querySelector<HTMLVideoElement>('[data-hm-loop]');
  const toggle = frame.querySelector<HTMLButtonElement>('[data-hm-toggle]');
  const dialog = document.querySelector<HTMLDialogElement>('[data-hm-dialog]');
  const full = dialog?.querySelector<HTMLVideoElement>('[data-hm-full]');

  /* ---------- Background loop ---------- */
  // Reduced motion: the loop starts paused (poster shown); the toggle still lets people play it.
  let userPaused = prefersReducedMotion();
  let inView = false;
  let modalOpen = false;

  const syncLoop = () => {
    if (!loop) return;
    const run = !userPaused && inView && !modalOpen && !document.hidden;
    if (run) loop.play().catch(() => {}); // autoplay can be refused (e.g. data saver): poster stays
    else loop.pause();
    frame.classList.toggle('is-paused', userPaused);
    toggle?.setAttribute('aria-label', userPaused ? tr('Play background video', 'ব্যাকগ্রাউন্ড ভিডিও চালান') : tr('Pause background video', 'ব্যাকগ্রাউন্ড ভিডিও থামান'));
  };

  if (loop) {
    loop.addEventListener('playing', () => loop.classList.add('is-playing'), { once: true });
    new IntersectionObserver(([e]) => {
      inView = e.isIntersecting;
      syncLoop();
    }, { threshold: 0.2 }).observe(frame);
    document.addEventListener('visibilitychange', syncLoop);
    document.addEventListener('langchange', syncLoop);
    toggle?.addEventListener('click', () => {
      userPaused = !userPaused;
      syncLoop();
    });
    syncLoop();
  }

  /* ---------- Full video ---------- */
  if (!dialog || !full) return;
  let opener: HTMLElement | null = null;

  const open = (e: Event) => {
    e.preventDefault();
    opener = e.currentTarget as HTMLElement;
    modalOpen = true;
    syncLoop();
    dialog.showModal();
    full.currentTime = 0;
    full.play().catch(() => {}); // controls are there if the browser blocks playback with sound
  };
  document.querySelectorAll<HTMLElement>('[data-hm-open]').forEach((el) => el.addEventListener('click', open));

  dialog.querySelector('[data-hm-close]')?.addEventListener('click', () => dialog.close());
  // Click on the backdrop (outside the video box) closes
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', () => {
    full.pause();
    modalOpen = false;
    syncLoop();
    opener?.focus();
  });
}
