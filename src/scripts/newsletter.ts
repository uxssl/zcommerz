/**
 * Footer newsletter. Same as the product-team file: the address is validated in the page and a
 * message is shown. Nothing is submitted anywhere, so no address leaves the browser.
 */
const bn = () => document.documentElement.lang === 'bn';
const MSG = {
  idle: { en: 'Get the latest updates and news.', bn: 'সর্বশেষ আপডেট ও খবর পান।' },
  ok: { en: 'Thanks! Updates are on the way.', bn: 'ধন্যবাদ! শীঘ্রই আপডেট পাবেন।' },
  bad: { en: 'Enter a valid email address.', bn: 'সঠিক ইমেইল ঠিকানা দিন।' },
};

export function initNewsletter() {
  const form = document.querySelector<HTMLFormElement>('[data-news]');
  if (!form) return;
  const input = form.querySelector<HTMLInputElement>('[data-news-input]')!;
  const msg = form.querySelector<HTMLElement>('[data-news-msg]')!;
  let state: keyof typeof MSG = 'idle';

  function render() {
    msg.textContent = bn() ? MSG[state].bn : MSG[state].en;
    msg.dataset.bn = MSG[state].bn; // keep i18n in step on language switch
    msg.classList.toggle('ok', state === 'ok');
    msg.classList.toggle('bad', state === 'bad');
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    state = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(input.value.trim()) ? 'ok' : 'bad';
    render();
  });
  document.addEventListener('langchange', render);
}
