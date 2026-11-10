/**
 * Section after the hero on / (Pillars, rewritten 2026-11-10): the focus is that ZCOMMERZ builds
 * the website for your online business, and everything to run it comes with it.
 * Capability lines are product-team copy or built from it:
 *   Build   "No coding. No hosting." + "Pick a theme and go live." (FB walkthrough, How it works)
 *   Sell    "Every channel, one checkout."                       (Pillars, verbatim)
 *   Manage  "Orders, products and stock in one place."           (Pillars, verbatim)
 *   Grow    "Tools that bring shoppers back."                     (Pillars, verbatim)
 * No "store" wording (user rule). The /old page keeps the previous copy (PillarsV1 + sections.ts).
 */
type T = { en: string; bn: string };

export const pillarsTitle: T[] = [
  { en: 'We build your website.', bn: 'আপনার ওয়েবসাইট আমরা বানাই।' },
  { en: 'You grow your business.', bn: 'আপনি বিজনেস বাড়ান।' },
];

export const pillarsIntro: T = {
  en: 'Your online business gets its own website, and everything to run it comes with it: every sales channel, one place for orders, and tools that bring shoppers back.',
  bn: 'আপনার অনলাইন বিজনেস পায় নিজের ওয়েবসাইট, সাথে চালানোর সবকিছু: সব সেলস চ্যানেল, অর্ডারের জন্য এক জায়গা, আর কাস্টমার ফিরিয়ে আনার টুল।',
};

export const pillarRows = [
  {
    id: 'build', href: '#pricing',
    verb: { en: 'Build', bn: 'বিল্ড' },
    line: { en: 'Your own website, ready to share. Pick a theme and go live.', bn: 'নিজের ওয়েবসাইট, শেয়ার করার জন্য তৈরি। থিম বেছে লাইভ করুন।' },
  },
  {
    id: 'sell', href: '#channels',
    verb: { en: 'Sell', bn: 'সেল' },
    line: { en: 'Every channel, one checkout.', bn: 'সব চ্যানেল, একটাই চেকআউট।' },
  },
  {
    id: 'manage', href: '#tools',
    verb: { en: 'Manage', bn: 'ম্যানেজ' },
    line: { en: 'Orders, products and stock in one place.', bn: 'অর্ডার, পণ্য ও স্টক এক জায়গায়।' },
  },
  {
    id: 'grow', href: '#ai',
    verb: { en: 'Grow', bn: 'গ্রো' },
    line: { en: 'Tools that bring shoppers back.', bn: 'যে টুল কাস্টমারকে ফিরিয়ে আনে।' },
  },
] as const;

/** Theme names from the Store Builder section; swatch colours match the hero tour's theme cycle. */
export const themeSwatches = [
  { en: 'Grocery', bn: 'গ্রোসারি', c: '#1E6B43' },
  { en: 'Fashion', bn: 'ফ্যাশন', c: '#B4325A' },
  { en: 'Electronics', bn: 'ইলেকট্রনিক্স', c: '#2A5DA8' },
  { en: 'Beauty', bn: 'বিউটি', c: '#7A4DD8' },
];

export const pillarsSample: T = { en: 'Sample data', bn: 'নমুনা ডেটা' };

/* ---------- Phase 3: tabbed showcase ---------- */
type Item = { en: string; bn: string; pro?: boolean };

/**
 * Each tab's tool index. Sell / Manage / Grow are the product-team lists, verbatim
 * (src/data/sections.ts → pillars[].items). Build is taken from the Store Builder bullets.
 */
export const pillarItems: Record<'build' | 'sell' | 'manage' | 'grow', Item[]> = {
  build: [
    { en: 'No coding or hosting needed', bn: 'কোডিং বা হোস্টিং লাগে না' },
    { en: 'Ready-made themes', bn: 'তৈরি থিম' },
    { en: 'Start from your Facebook page', bn: 'ফেসবুক পেজ থেকে শুরু' },
    { en: 'Payments and delivery built in', bn: 'পেমেন্ট ও ডেলিভারি যুক্ত' },
  ],
  sell: [
    { en: 'Online business and themes', bn: 'অনলাইন বিজনেস ও থিম' },
    { en: 'Facebook page', bn: 'ফেসবুক পেজ' },
    { en: 'Daraz and WhatsApp', bn: 'দারাজ ও হোয়াটসঅ্যাপ' },
    { en: '36+ payment channels', bn: '৩৬+ পেমেন্ট চ্যানেল' },
    { en: 'Pathao and eCourier', bn: 'পাঠাও ও ই-কুরিয়ার' },
  ],
  manage: [
    { en: 'Order Management', bn: 'অর্ডার ম্যানেজমেন্ট' },
    { en: 'Products and stock', bn: 'পণ্য ও স্টক' },
    { en: 'Customer Management', bn: 'কাস্টমার ম্যানেজমেন্ট' },
    { en: 'Staff and roles', bn: 'স্টাফ ও রোল' },
  ],
  grow: [
    { en: 'AI product descriptions', bn: 'AI পণ্যের বিবরণ' },
    { en: 'Coupons', bn: 'কুপন' },
    { en: 'Campaigns', bn: 'ক্যাম্পেইন', pro: true },
    { en: 'Abandoned Cart', bn: 'অ্যাবান্ডনড কার্ট', pro: true },
    { en: 'Inventory Aging', bn: 'ইনভেন্টরি এজিং', pro: true },
  ],
};

/** "See it in full" link labels, one per tab, pointing at the section that shows the capability. */
export const pillarMore: Record<'build' | 'sell' | 'manage' | 'grow', T> = {
  build: { en: 'See website pricing', bn: 'ওয়েবসাইটের প্রাইসিং দেখুন' },
  sell: { en: 'See every channel', bn: 'সব চ্যানেল দেখুন' },
  manage: { en: 'See the dashboard', bn: 'ড্যাশবোর্ড দেখুন' },
  grow: { en: 'See the AI writer', bn: 'AI রাইটার দেখুন' },
};

/** Build tab: four colourways (same palette as the hero tour's theme cycle). */
export const colourways = [
  { a: '#1E6B43', b: '#F6F3EA', t: '#ECE6D6' },
  { a: '#B4325A', b: '#FBF5F2', t: '#F6E6EA' },
  { a: '#7A4DD8', b: '#F6F2FF', t: '#ECE4FB' },
  { a: '#2A5DA8', b: '#F2F6FC', t: '#E3ECF8' },
];

/** Grow tab: tool descriptions, verbatim from the dashboard tools list (src/data/sections.ts). */
export const growTools: { n: T; d: T; pro?: boolean }[] = [
  { n: { en: 'Coupons', bn: 'কুপন' }, d: { en: 'Create discount codes for your customers.', bn: 'কাস্টমারের জন্য ডিসকাউন্ট কোড বানান।' } },
  { n: { en: 'Campaigns', bn: 'ক্যাম্পেইন' }, d: { en: 'Run campaigns to bring customers back to your online business.', bn: 'ক্যাম্পেইনের মাধ্যমে কাস্টমারকে আবার অনলাইন বিজনেসে ফিরিয়ে আনুন।' }, pro: true },
  { n: { en: 'Abandoned Cart', bn: 'অ্যাবান্ডনড কার্ট' }, d: { en: 'See carts customers left behind before paying.', bn: 'পেমেন্টের আগে কাস্টমার যেসব কার্ট ফেলে গেছে তা দেখুন।' }, pro: true },
  { n: { en: 'Inventory Aging', bn: 'ইনভেন্টরি এজিং' }, d: { en: 'See which stock has been sitting the longest.', bn: 'কোন স্টক সবচেয়ে বেশি দিন পড়ে আছে তা দেখুন।' }, pro: true },
];

/* ---------- Showcase (tabs) — short description, three key benefits per tab ---------- */
/**
 * Benefits are product-team copy, tightened: Build ← Store Builder bullets; Sell ← Channels
 * ("Payments run through SSLCOMMERZ…") + Pillars items; Manage ← dashboard tool lines
 * (Order Management, Products, Roles); Grow ← More ways + Pricing ("Campaigns, Inventory Aging and
 * Abandoned Cart recovery come with Pro"). The full tool list still shows, compactly, per tab.
 */
export const showcase: Record<'build' | 'sell' | 'manage' | 'grow', { benefits: T[] }> = {
  build: {
    benefits: [
      { en: 'No coding or hosting needed', bn: 'কোডিং বা হোস্টিং লাগে না' },
      { en: 'Choose a ready-made theme and make it yours', bn: 'তৈরি থিম বেছে নিয়ে নিজের মতো সাজান' },
      { en: 'Share the link and start selling', bn: 'লিংক শেয়ার করে বিক্রি শুরু করুন' },
    ],
  },
  sell: {
    benefits: [
      { en: 'Sell on your website, Facebook page, Daraz and WhatsApp', bn: 'ওয়েবসাইট, ফেসবুক পেজ, দারাজ ও হোয়াটসঅ্যাপে বিক্রি করুন' },
      { en: '36+ payment channels through SSLCOMMERZ', bn: 'SSLCOMMERZ-এর মাধ্যমে ৩৬+ পেমেন্ট চ্যানেল' },
      { en: 'Deliver with Pathao and eCourier', bn: 'পাঠাও ও ই-কুরিয়ারে ডেলিভারি দিন' },
    ],
  },
  manage: {
    benefits: [
      { en: 'Track every order and update its status', bn: 'প্রতিটি অর্ডার ট্র্যাক করুন ও স্ট্যাটাস আপডেট করুন' },
      { en: 'Add products, set prices and keep stock up to date', bn: 'পণ্য যোগ করুন, দাম ঠিক করুন ও স্টক হালনাগাদ রাখুন' },
      { en: 'Decide what each team member can see and do', bn: 'প্রতিটি টিম সদস্য কী দেখতে ও করতে পারবেন তা ঠিক করুন' },
    ],
  },
  grow: {
    benefits: [
      { en: 'Write product descriptions with AI', bn: 'AI দিয়ে পণ্যের বিবরণ লিখুন' },
      { en: 'Create discount codes with Coupons', bn: 'কুপন দিয়ে ডিসকাউন্ট দিন' },
      { en: 'Campaigns, Abandoned Cart and Inventory Aging on Pro', bn: 'প্রো প্ল্যানে ক্যাম্পেইন, অ্যাবান্ডনড কার্ট ও ইনভেন্টরি এজিং' },
    ],
  },
};

/** Dashboard tool lines used inside the product screens (verbatim, src/data/sections.ts). */
export const toolLines = {
  payments: { en: 'Choose which payment options customers see at checkout.', bn: 'চেকআউটে কাস্টমার কোন পেমেন্ট অপশন দেখবে তা ঠিক করুন।' },
  roles: { en: 'Decide what each team member can see and do.', bn: 'প্রতিটি টিম সদস্য কী দেখতে ও করতে পারবেন তা ঠিক করুন।' },
  coupons: { en: 'Create discount codes for your customers.', bn: 'কাস্টমারের জন্য ডিসকাউন্ট কোড বানান।' },
  abandoned: { en: 'See carts customers left behind before paying.', bn: 'পেমেন্টের আগে কাস্টমার যেসব কার্ট ফেলে গেছে তা দেখুন।' },
} satisfies Record<string, T>;
