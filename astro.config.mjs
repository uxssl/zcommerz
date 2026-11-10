// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://zcommerz.com',
  vite: { plugins: [/** @type {any} */ (tailwindcss())] /* vite type mismatch between astro@5 and @tailwindcss/vite */ },
});
