/**
 * E · AI product description preview.
 * Same generation as the product-team file: a template per language + tone, with {name} and
 * {kw} filled from the form. Nothing leaves the page.
 * GSAP drives the typing (one tween over a counter, so it respects reduced motion and can be
 * interrupted cleanly), the result's entrance and the copy feedback.
 */
import { gsap, prefersReducedMotion } from './motion';
import { aiTpl, aiFallback, aiUi } from '../data/sections';

type Lang = 'en' | 'bn';
const uiLang = (): Lang => (document.documentElement.lang === 'bn' ? 'bn' : 'en');

export function initAiWriter() {
  const root = document.querySelector<HTMLElement>('[data-ai]');
  if (!root) return;

  const q = <T extends HTMLElement>(s: string) => root.querySelector<T>(s)!;
  const nameEl = q<HTMLInputElement>('[data-ai-name]');
  const kwWrap = q('[data-ai-kws]');
  const kwInput = q<HTMLInputElement>('[data-ai-kw]');
  const toneGrp = q('[data-ai-tone]');
  const langGrp = q('[data-ai-lang]');
  const goBtn = q<HTMLButtonElement>('[data-ai-go]');
  const out = q<HTMLParagraphElement>('[data-ai-out]');
  const stateEl = q('[data-ai-state]');
  const stateTxt = stateEl.querySelector('b')!;
  const metaEl = q('[data-ai-meta]');
  const copyBtn = q<HTMLButtonElement>('[data-ai-copy]');
  const copyLbl = copyBtn.querySelector<HTMLElement>('[data-cpy-lbl]')!;

  let tween: gsap.core.Tween | null = null;
  let text = '';

  /* ---------- keyword tokens ---------- */
  const keywords = () => Array.from(kwWrap.querySelectorAll<HTMLElement>('.kw')).map((k) => k.dataset.kw!);

  function addKeyword(v: string) {
    const w = v.trim().replace(/,+$/, '');
    if (!w || keywords().includes(w)) return;
    const el = document.createElement('span');
    el.className = 'kw';
    el.dataset.kw = w;
    el.innerHTML = `${w}<button type="button" class="kx" data-kw-del aria-label="Remove ${w}"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg></button>`;
    kwWrap.insertBefore(el, kwInput);
    if (!prefersReducedMotion()) gsap.from(el, { scale: 0.8, autoAlpha: 0, duration: 0.3, ease: 'back.out(2)', clearProps: 'all' });
  }

  kwInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addKeyword(kwInput.value);
      kwInput.value = '';
    } else if (e.key === 'Backspace' && !kwInput.value) {
      kwWrap.querySelectorAll('.kw')[keywords().length - 1]?.remove();
    }
  });
  kwInput.addEventListener('blur', () => { addKeyword(kwInput.value); kwInput.value = ''; });
  kwWrap.addEventListener('click', (e) => {
    const del = (e.target as HTMLElement).closest('[data-kw-del]');
    if (del) del.closest('.kw')!.remove();
    else if (e.target === kwWrap) kwInput.focus();
  });

  /* ---------- segmented controls (radiogroup) ---------- */
  function wireGroup(grp: HTMLElement, onPick: () => void) {
    const btns = Array.from(grp.querySelectorAll<HTMLButtonElement>('[role="radio"]'));
    const pick = (b: HTMLButtonElement, focus = false) => {
      btns.forEach((x) => {
        const on = x === b;
        x.setAttribute('aria-checked', String(on));
        x.tabIndex = on ? 0 : -1;
      });
      if (focus) b.focus();
      onPick();
    };
    btns.forEach((b, i) => {
      b.addEventListener('click', () => pick(b));
      b.addEventListener('keydown', (e) => {
        let j = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % btns.length;
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + btns.length) % btns.length;
        if (j < 0) return;
        e.preventDefault();
        pick(btns[j], true);
      });
    });
    return () => grp.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.dataset.v ?? btns[0].dataset.v!;
  }
  // changing tone or language after a first result re-writes it straight away
  const getTone = wireGroup(toneGrp, () => text && write());
  const getLang = wireGroup(langGrp, () => text && write());

  /* ---------- generate ---------- */
  function compose() {
    const l = getLang() as Lang;
    const ui = uiLang();
    const name = nameEl.value.trim() || aiFallback.name[ui];
    const kw = keywords().join(', ') || aiFallback.kw[ui];
    return aiTpl[l][getTone()].replace('{name}', name).replace('{kw}', kw);
  }

  function setMeta(done: boolean) {
    const ui = uiLang();
    stateTxt.textContent = done ? aiUi.ready[ui] : aiUi.writing[ui];
    stateTxt.removeAttribute('data-bn');
    stateEl.classList.toggle('writing', !done);
    if (done) {
      const n = text.trim().split(/\s+/).length;
      metaEl.textContent = `${n} ${aiUi.words[ui]}`;
      copyBtn.disabled = false;
    }
  }

  function write() {
    text = compose();
    tween?.kill();
    out.removeAttribute('data-bn'); // generated text is not a translatable string
    out.classList.remove('is-empty');
    out.lang = getLang();
    resetCopy();
    setMeta(false);

    if (prefersReducedMotion()) {
      out.textContent = text;
      setMeta(true);
      return;
    }
    goBtn.classList.add('busy');
    out.textContent = '';
    out.classList.add('typing');
    const c = { i: 0 };
    tween = gsap.to(c, {
      i: text.length,
      duration: Math.min(2.2, 0.5 + text.length * 0.012),
      ease: 'none',
      delay: 0.22,
      onUpdate: () => { out.textContent = text.slice(0, Math.round(c.i)); },
      onComplete: () => {
        out.textContent = text;
        out.classList.remove('typing');
        goBtn.classList.remove('busy');
        setMeta(true);
      },
    });
  }

  goBtn.addEventListener('click', write);

  /* ---------- data-ai-auto: rest on a finished result, type it once when first seen ---------- */
  if (root.hasAttribute('data-ai-auto')) {
    if (!out.classList.contains('is-empty') && out.textContent?.trim()) {
      text = out.textContent.trim();
      setMeta(true);
    }
    if (!prefersReducedMotion() && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        write();
      }, { threshold: 0.45 });
      io.observe(out);
    }
  }
  nameEl.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); write(); } });

  /* ---------- copy ---------- */
  function resetCopy() {
    copyBtn.classList.remove('done');
    copyLbl.textContent = uiLang() === 'bn' ? copyBtn.dataset.copyBn! : aiUi.copy.en;
  }
  copyBtn.addEventListener('click', async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }
    copyBtn.classList.add('done');
    copyLbl.textContent = uiLang() === 'bn' ? copyBtn.dataset.copiedBn! : copyBtn.dataset.copied!;
    if (!prefersReducedMotion()) gsap.fromTo(copyBtn, { scale: 0.92 }, { scale: 1, duration: 0.35, ease: 'back.out(3)', clearProps: 'scale' });
    setTimeout(resetCopy, 1500);
  });

  /* ---------- language toggle: re-render what we own ---------- */
  document.addEventListener('langchange', () => {
    if (text) write();
    else resetCopy();
  });
}
