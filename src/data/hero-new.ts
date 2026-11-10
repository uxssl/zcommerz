/**
 * Hero copy for the new page (/new): an all-in-one platform for every kind of online business.
 * Facebook and Daraz appear only as import sources in the description, never as the theme.
 * No "store" / স্টোর anywhere (user, 2026-11-10). The rotating word carries the mango underline.
 */
export const heroCopy = {
  /** Same pattern as the earlier hero ("…that sells / ships / grows"): fixed pre-text plus a rotating word.
   *  Rotating words are the product-team's own; the pre-text puts the website first. */
  headline: {
    // one-click build first: the website is built for the merchant (user's pick, 2026-11-10)
    en: { pre: 'One click to a website that', words: ['sells', 'ships', 'grows'] },
    bn: { pre: 'এক ক্লিকে এমন ওয়েবসাইট, যা', words: ['বিক্রি করে', 'ডেলিভারি দেয়', 'বড় হয়'] },
  },
  lead: {
    // says the build is done for you (the headline carries "one click"; product-team: "From Facebook page to website, in one click")
    en: 'Connect your Facebook page or Daraz shop and we build your website for you, with your products already in. Then sell, ship and grow from one dashboard.',
    bn: 'ফেসবুক পেজ বা দারাজ শপ কানেক্ট করুন, আমরা পণ্যসহ আপনার ওয়েবসাইট বানিয়ে দেব। তারপর এক ড্যাশবোর্ড থেকে বিক্রি, ডেলিভারি ও গ্রোথ।',
  },
  primary: { en: 'Start Your Online Business', bn: 'আপনার অনলাইন বিজনেস শুরু করুন' },
  secondary: { en: 'Explore Features', bn: 'ফিচারগুলো দেখুন', href: '#pillars' },
  meta: {
    title: 'ZCOMMERZ | One click to a website that sells',
    description:
      'Connect your Facebook page or Daraz shop and your website is built for you in one click, with your products already in. Ready themes, AI product descriptions, SSLCOMMERZ payments, and Pathao and eCourier delivery.',
  },
} as const;
