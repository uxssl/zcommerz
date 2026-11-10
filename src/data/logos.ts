/** Partner logos extracted from the product-team file. `ar` = width / height. */
export const logos = {
  bkash: { src: '/assets/logos/bk.png', ar: 1.075, name: 'bKash' },
  daraz: { src: '/assets/logos/dz.png', ar: 3.2927, name: 'Daraz' },
  ecourier: { src: '/assets/logos/ec.png', ar: 5.7812, name: 'eCourier' },
  facebook: { src: '/assets/logos/fb.svg', ar: 1, name: 'Facebook' },
  whatsapp: { src: '/assets/logos/wa.svg', ar: 1, name: 'WhatsApp' },
  messenger: { src: '/assets/logos/ms.svg', ar: 1, name: 'Messenger' },
  visa: { src: '/assets/logos/visa.svg', ar: 2.5, name: 'Visa' },
  mastercard: { src: '/assets/logos/mc.svg', ar: 1.5833, name: 'Mastercard' },
  pathao: { src: '/assets/logos/pa.svg', ar: 2.9574, name: 'Pathao Courier' },
} as const;
export type LogoKey = keyof typeof logos;

export const SIGNUP_URL = 'https://merchant.zcommerz.com/auth/signup';
export const LOGIN_URL = 'https://merchant.zcommerz.com/auth/login';
