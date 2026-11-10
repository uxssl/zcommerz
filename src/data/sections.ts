/**
 * Phase 02 content. Every string (EN + BN), price and product is verbatim from the
 * product-team file (reference/zcommerz-landing.html). Only presentation is new.
 */
export type T = { en: string; bn: string };
export const SIGNUP = 'https://merchant.zcommerz.com/auth/signup';

/* ---------- A · Pillars ---------- */
export const pillarsHead: T = { en: 'One platform to manage, sell and grow', bn: 'ম্যানেজ, সেল ও গ্রো, সবকিছু একটি প্ল্যাটফর্মে' };
/** Derived from the three pillar lines below; no new claims. */
export const pillarsLead: T = {
  en: 'Orders, channels and growth tools, all from one dashboard.',
  bn: 'অর্ডার, চ্যানেল ও গ্রোথ টুল, সবকিছু এক ড্যাশবোর্ড থেকে।',
};
export const pillarsNote: T = { en: 'Sample data', bn: 'নমুনা ডেটা' };
export const pillars = [
  {
    id: 'manage', href: '#tools', tone: 'blue',
    verb: { en: 'Manage', bn: 'ম্যানেজ' },
    line: { en: 'Orders, products and stock in one place.', bn: 'অর্ডার, পণ্য ও স্টক এক জায়গায়।' },
    items: [
      { en: 'Order Management', bn: 'অর্ডার ম্যানেজমেন্ট' },
      { en: 'Products and stock', bn: 'পণ্য ও স্টক' },
      { en: 'Customer Management', bn: 'কাস্টমার ম্যানেজমেন্ট' },
      { en: 'Staff and roles', bn: 'স্টাফ ও রোল' },
    ],
  },
  {
    id: 'sell', href: '#features', tone: 'mango',
    verb: { en: 'Sell', bn: 'সেল' },
    line: { en: 'Every channel, one checkout.', bn: 'সব চ্যানেল, একটাই চেকআউট।' },
    items: [
      { en: 'Online store and themes', bn: 'অনলাইন স্টোর ও থিম' },
      { en: 'Facebook page', bn: 'ফেসবুক পেজ' },
      { en: 'Daraz and WhatsApp', bn: 'দারাজ ও হোয়াটসঅ্যাপ' },
      { en: '36+ payment channels', bn: '৩৬+ পেমেন্ট চ্যানেল' },
      { en: 'Pathao and eCourier', bn: 'পাঠাও ও ই-কুরিয়ার' },
    ],
  },
  {
    id: 'grow', href: '#ai', tone: 'mint',
    verb: { en: 'Grow', bn: 'গ্রো' },
    line: { en: 'Tools that bring shoppers back.', bn: 'যে টুল কাস্টমারকে ফিরিয়ে আনে।' },
    // "(PRO)" from the source copy is rendered as a badge
    items: [
      { en: 'AI product descriptions', bn: 'AI পণ্যের বিবরণ' },
      { en: 'Coupons', bn: 'কুপন' },
      { en: 'Campaigns', bn: 'ক্যাম্পেইন', pro: true },
      { en: 'Abandoned Cart', bn: 'অ্যাবান্ডনড কার্ট', pro: true },
      { en: 'Inventory Aging', bn: 'ইনভেন্টরি এজিং', pro: true },
    ],
  },
] as const;

/* ---------- B · Online store ---------- */
export const storeHead = {
  tag: { en: 'Online store', bn: 'অনলাইন স্টোর' },
  h2: { en: 'Launch your online store within minutes', bn: 'কয়েক মিনিটেই চালু করুন আপনার অনলাইন স্টোর' },
  bullets: [
    { en: 'Create a professional store, with no coding or hosting needed', bn: 'কোডিং বা হোস্টিং ছাড়াই পেশাদার স্টোর বানান' },
    { en: 'Start from your Facebook page in one click', bn: 'এক ক্লিকে ফেসবুক পেজ থেকে শুরু করুন' },
    { en: 'Choose a ready-made theme and make it yours', bn: 'তৈরি থিম বেছে নিয়ে নিজের মতো সাজান' },
    { en: 'Payments and delivery are built in', bn: 'পেমেন্ট ও ডেলিভারি আগে থেকেই যুক্ত' },
  ],
  payWith: { en: 'Customers pay with', bn: 'কাস্টমার পেমেন্ট করে' },
  cta: { en: 'Launch your store', bn: 'আপনার স্টোর চালু করুন' },
  link: { en: 'See how it works', bn: 'কীভাবে কাজ করে' },
  note: { en: 'Sample preview. Your theme and products are editable from the dashboard.', bn: 'নমুনা প্রিভিউ। আপনার থিম ও পণ্য ড্যাশবোর্ড থেকে এডিট করা যাবে।' },
};
export const storeUi = {
  nav: { en: ['Shop', 'Offers', 'Cart'], bn: ['দোকান', 'অফার', 'কার্ট'] },
  shopNow: { en: 'Shop now', bn: 'এখনই কিনুন' },
  add: { en: 'Add', bn: 'যোগ করুন' },
  theme: { en: 'Theme', bn: 'থিম' },
  preview: { en: 'Live preview', bn: 'লাইভ প্রিভিউ' },
};
/**
 * Four sample storefronts. `style` names the art direction shown in the theme rail;
 * `promo`, `cats` and each item's `meta` are sample shop content that makes the preview
 * read as a real store (clearly labelled "sample preview" in the UI).
 */
export const themes = [
  {
    id: 'grocery', tab: { en: 'Grocery', bn: 'গ্রোসারি' }, name: 'SSL Organic BD', url: 'sslorganic',
    style: { en: 'Farm market', bn: 'খামার বাজার' },
    banner: { en: 'Fresh from the farm', bn: 'খামার থেকে সরাসরি' },
    promo: { en: 'Free delivery in Dhaka over ৳1,000', bn: 'ঢাকায় ৳১,০০০-এর বেশি অর্ডারে ফ্রি ডেলিভারি' },
    cats: { en: ['Rice', 'Oil & ghee', 'Honey', 'Spices'], bn: ['চাল', 'তেল ও ঘি', 'মধু', 'মসলা'] },
    items: [
      { img: 'honey', name: { en: 'Mustard honey', bn: 'সরিষার মধু' }, price: '৳650', meta: { en: '500 g jar', bn: '৫০০ গ্রাম জার' } },
      { img: 'ghee', name: { en: 'Pure ghee', bn: 'খাঁটি ঘি' }, price: '৳980', meta: { en: '450 g jar', bn: '৪৫০ গ্রাম জার' } },
      { img: 'rice', name: { en: 'Red rice 5kg', bn: 'লাল চাল ৫ কেজি' }, price: '৳540', meta: { en: '5 kg sack', bn: '৫ কেজি বস্তা' } },
    ],
  },
  {
    id: 'fashion', tab: { en: 'Fashion', bn: 'ফ্যাশন' }, name: 'Nokshi Lane', url: 'nokshilane',
    style: { en: 'Boutique', bn: 'বুটিক' },
    banner: { en: 'New season, new drape', bn: 'নতুন মৌসুম, নতুন কালেকশন' },
    promo: { en: 'Free size exchange within 7 days', bn: '৭ দিনের মধ্যে ফ্রি সাইজ এক্সচেঞ্জ' },
    cats: { en: ['New in', 'Kurti', 'Shawl', 'Bags'], bn: ['নতুন', 'কুর্তি', 'শাল', 'ব্যাগ'] },
    items: [
      { img: 'kurti', name: { en: 'Cotton kurti', bn: 'সুতির কুর্তি' }, price: '৳1,450', meta: { en: 'S · M · L', bn: 'এস · এম · এল' } },
      { img: 'tote', name: { en: 'Jute tote', bn: 'পাটের ব্যাগ' }, price: '৳720', meta: { en: 'Handwoven', bn: 'হাতে বোনা' } },
      { img: 'shawl', name: { en: 'Winter shawl', bn: 'শীতের শাল' }, price: '৳1,890', meta: { en: '3 colours', bn: '৩ রঙ' } },
    ],
  },
  {
    id: 'electronics', tab: { en: 'Electronics', bn: 'ইলেকট্রনিক্স' }, name: 'Gadget Ghar', url: 'gadgetghar',
    style: { en: 'Tech launch', bn: 'টেক লঞ্চ' },
    banner: { en: 'Upgrade your everyday tech', bn: 'প্রতিদিনের টেক হোক আরও স্মার্ট' },
    promo: { en: 'EMI available · 1 year warranty', bn: 'ইএমআই সুবিধা · ১ বছরের ওয়ারেন্টি' },
    cats: { en: ['Audio', 'Wearables', 'Power', 'Cables'], bn: ['অডিও', 'ওয়্যারেবল', 'পাওয়ার', 'ক্যাবল'] },
    items: [
      { img: 'buds', name: { en: 'Wireless earbuds', bn: 'ওয়্যারলেস ইয়ারবাড' }, price: '৳1,990', meta: { en: '30h battery', bn: '৩০ ঘণ্টা ব্যাটারি' } },
      { img: 'watch', name: { en: 'Smartwatch', bn: 'স্মার্টওয়াচ' }, price: '৳3,450', meta: { en: 'AMOLED · IP68', bn: 'অ্যামোলেড · আইপি৬৮' } },
      { img: 'bank', name: { en: 'Power bank', bn: 'পাওয়ার ব্যাংক' }, price: '৳1,250', meta: { en: '20,000 mAh', bn: '২০,০০০ এমএএইচ' } },
    ],
  },
  {
    id: 'beauty', tab: { en: 'Beauty', bn: 'বিউটি' }, name: 'Rupa Skin', url: 'rupaskin',
    style: { en: 'Beauty counter', bn: 'বিউটি কাউন্টার' },
    banner: { en: 'Simple routines, real glow', bn: 'সহজ রুটিন, প্রাণবন্ত উজ্জ্বলতা' },
    promo: { en: 'Dermatologist tested · Cruelty free', bn: 'ডার্মাটোলজিস্ট টেস্টেড · ক্রুয়েলটি ফ্রি' },
    cats: { en: ['Skin', 'Lips', 'Bath', 'Gift sets'], bn: ['স্কিন', 'লিপ', 'বাথ', 'গিফট সেট'] },
    items: [
      { img: 'serum', name: { en: 'Face serum', bn: 'ফেস সিরাম' }, price: '৳890', meta: { en: '30 ml', bn: '৩০ মিলি' } },
      { img: 'lip', name: { en: 'Lip tint', bn: 'লিপ টিন্ট' }, price: '৳450', meta: { en: '4 shades', bn: '৪ শেড' } },
      { img: 'soap', name: { en: 'Neem soap', bn: 'নিম সাবান' }, price: '৳180', meta: { en: 'Pack of 2', bn: '২টির প্যাক' } },
    ],
  },
] as const;

/* ---------- C · Management ---------- */
export const toolsHead = {
  tag: { en: 'Management platform', bn: 'ম্যানেজমেন্ট প্ল্যাটফর্ম' },
  h2: { en: 'One platform to manage your business', bn: 'আপনার ব্যবসা সামলান একটি প্ল্যাটফর্মেই' },
  bullets: [
    { en: 'Manage orders, products and stock from one place', bn: 'অর্ডার, পণ্য ও স্টক এক জায়গা থেকে সামলান' },
    { en: 'Organise with categories, brands and specifications', bn: 'ক্যাটাগরি, ব্র্যান্ড ও স্পেসিফিকেশন দিয়ে সাজান' },
    { en: 'Grow with coupons and campaigns', bn: 'কুপন ও ক্যাম্পেইন দিয়ে বিক্রি বাড়ান' },
    { en: 'Add staff and control what each person can do', bn: 'স্টাফ যোগ করুন, কে কী করতে পারবে তা ঠিক করুন' },
  ],
  cta: { en: 'Start free trial', bn: 'ফ্রি ট্রায়াল শুরু করুন' },
  pro: { en: 'tools are available on PRO plans.', bn: 'চিহ্নিত টুল PRO প্ল্যানে পাওয়া যায়।' },
  tools: { en: 'Dashboard tools', bn: 'ড্যাশবোর্ড টুল' },
};
type Tool = { name: string; en: string; bn: string; pro?: boolean; icon: string };
export const toolGroups: { id: string; color: string; n: T; items: Tool[] }[] = [
  { id: 'core', color: '#2A5DA8', n: { en: 'Core', bn: 'মূল টুল' }, items: [
    { name: 'Dashboard', icon: 'LayoutDashboard', en: 'Sales, orders and store activity at a glance.', bn: 'বিক্রি, অর্ডার ও স্টোরের কার্যক্রম এক নজরে।' },
    { name: 'Payment Methods', icon: 'CreditCard', en: 'Choose which payment options customers see at checkout.', bn: 'চেকআউটে কাস্টমার কোন পেমেন্ট অপশন দেখবে তা ঠিক করুন।' },
    { name: 'Integrations', icon: 'Plug', en: 'Connect SSLCOMMERZ, couriers, Daraz and WhatsApp.', bn: 'SSLCOMMERZ, কুরিয়ার, দারাজ ও হোয়াটসঅ্যাপ কানেক্ট করুন।' },
    { name: 'Plans & Subscription', icon: 'BadgeCheck', en: 'See your plan, upgrade or renew in a few clicks.', bn: 'আপনার প্ল্যান দেখুন, কয়েক ক্লিকেই আপগ্রেড বা রিনিউ করুন।' },
    { name: 'Live Chat', icon: 'MessagesSquare', en: 'Chat with customers on WhatsApp and Messenger from one inbox.', bn: 'হোয়াটসঅ্যাপ ও মেসেঞ্জারের কাস্টমারদের সঙ্গে এক ইনবক্স থেকে চ্যাট করুন।' },
  ] },
  { id: 'catalog', color: '#7C5CE0', n: { en: 'Product catalog', bn: 'পণ্য ক্যাটালগ' }, items: [
    { name: 'Products', icon: 'Package', en: 'Add products, set prices and keep stock up to date.', bn: 'পণ্য যোগ করুন, দাম ঠিক করুন ও স্টক হালনাগাদ রাখুন।' },
    { name: 'Manage Categories', icon: 'FolderTree', en: 'Organise products into categories shoppers can browse.', bn: 'পণ্যকে ক্যাটাগরিতে সাজান, যাতে কেনাকাটা সহজ হয়।' },
    { name: 'Product Specification', icon: 'ListChecks', en: 'Describe each product with details like size or colour.', bn: 'সাইজ বা রঙের মতো তথ্য দিয়ে প্রতিটি পণ্য বর্ণনা করুন।' },
    { name: 'Brands', icon: 'Tag', en: 'Group your products by brand.', bn: 'ব্র্যান্ড অনুযায়ী পণ্য সাজান।' },
  ] },
  { id: 'sales', color: '#12A57C', n: { en: 'Sales & customers', bn: 'সেলস ও কাস্টমার' }, items: [
    { name: 'Order Management', icon: 'ShoppingCart', en: 'Track every order and update its status.', bn: 'প্রতিটি অর্ডার ট্র্যাক করুন ও স্ট্যাটাস আপডেট করুন।' },
    { name: 'Customer Management', icon: 'Users', en: 'See who your customers are and what they buy.', bn: 'আপনার কাস্টমার কারা এবং কী কিনছেন তা দেখুন।' },
  ] },
  { id: 'marketing', color: '#E8940B', n: { en: 'Marketing & growth', bn: 'মার্কেটিং ও গ্রোথ' }, items: [
    { name: 'Campaigns', icon: 'Megaphone', pro: true, en: 'Run campaigns to bring customers back to your store.', bn: 'ক্যাম্পেইনের মাধ্যমে কাস্টমারকে আবার স্টোরে ফিরিয়ে আনুন।' },
    { name: 'Coupons', icon: 'TicketPercent', en: 'Create discount codes for your customers.', bn: 'কাস্টমারের জন্য ডিসকাউন্ট কোড বানান।' },
  ] },
  { id: 'config', color: '#D6336C', n: { en: 'Store configuration', bn: 'স্টোর কনফিগারেশন' }, items: [
    { name: 'Store Settings', icon: 'Settings', en: 'Update your store name, contact details and preferences.', bn: 'স্টোরের নাম, যোগাযোগের তথ্য ও পছন্দ বদলান।' },
    { name: 'Media Gallery', icon: 'Images', en: 'Keep product photos and banners in one library.', bn: 'পণ্যের ছবি ও ব্যানার এক লাইব্রেরিতে রাখুন।' },
    { name: 'Storefront & Themes', icon: 'Palette', en: 'Pick a theme and shape how your storefront looks.', bn: 'থিম বেছে নিন এবং স্টোরফ্রন্টের চেহারা সাজান।' },
  ] },
  { id: 'staff', color: '#0A8FB0', n: { en: 'Staff management', bn: 'স্টাফ ম্যানেজমেন্ট' }, items: [
    { name: 'Roles', icon: 'ShieldCheck', en: 'Decide what each team member can see and do.', bn: 'প্রতিটি টিম সদস্য কী দেখতে ও করতে পারবেন তা ঠিক করুন।' },
    { name: 'Staff', icon: 'UserPlus', en: 'Add teammates so you can run the store together.', bn: 'টিমের সদস্য যোগ করুন, একসাথে স্টোর চালান।' },
  ] },
  { id: 'reports', color: '#6B3FD4', n: { en: 'Reports & analytics', bn: 'রিপোর্ট ও অ্যানালিটিক্স' }, items: [
    { name: 'Inventory Aging', icon: 'Hourglass', pro: true, en: 'See which stock has been sitting the longest.', bn: 'কোন স্টক সবচেয়ে বেশি দিন পড়ে আছে তা দেখুন।' },
    { name: 'Abandoned Cart', icon: 'ShoppingBag', pro: true, en: 'See carts customers left behind before paying.', bn: 'পেমেন্টের আগে কাস্টমার যেসব কার্ট ফেলে গেছে তা দেখুন।' },
  ] },
];

/* ---------- D · Chat to order ---------- */
export const chatHead = {
  h2: { en: 'Chat with customers, turn chats into orders', bn: 'কাস্টমারের সঙ্গে চ্যাট করুন, চ্যাট থেকেই অর্ডার বানান' },
  lead: { en: 'Customers message you on WhatsApp or Messenger. Reply from one inbox and create the order without leaving the chat.', bn: 'কাস্টমার হোয়াটসঅ্যাপ বা মেসেঞ্জারে মেসেজ করে। এক ইনবক্স থেকে উত্তর দিন আর চ্যাট না ছেড়েই অর্ডার বানান।' },
  cta: { en: 'Start free trial', bn: 'ফ্রি ট্রায়াল শুরু করুন' },
};
export const chatSteps = [
  { en: 'Customers message you where they already are', bn: 'কাস্টমার যেখানে আছে, সেখানেই মেসেজ করে', sen: 'WhatsApp and Messenger.', sbn: 'হোয়াটসঅ্যাপ ও মেসেঞ্জার।' },
  { en: 'Every chat in one inbox', bn: 'সব চ্যাট এক ইনবক্সে', sen: 'Reply from Live Chat.', sbn: 'লাইভ চ্যাট থেকে উত্তর দিন।' },
  { en: 'Turn the chat into an order', bn: 'চ্যাট থেকেই অর্ডার বানান', sen: 'Product, address, payment, delivery.', sbn: 'পণ্য, ঠিকানা, পেমেন্ট, ডেলিভারি।' },
  { en: 'Customers get updates automatically', bn: 'কাস্টমার স্বয়ংক্রিয় আপডেট পায়', sen: 'Received, shipped, delivered.', sbn: 'গৃহীত, শিপড, ডেলিভারড।' },
];

/* ---------- E · AI product descriptions ---------- */
export const aiHead = {
  tag: { en: 'AI-powered', bn: 'AI চালিত' },
  h2: { en: 'Write product descriptions in seconds with AI', bn: 'কয়েক সেকেন্ডে AI দিয়ে লিখুন পণ্যের বিবরণ' },
  lead: {
    en: 'Type a product name and a few keywords. AI writes the description in English or Bangla, and you edit it before publishing.',
    bn: 'পণ্যের নাম আর কয়েকটি কিওয়ার্ড লিখুন। AI ইংরেজি বা বাংলায় বিবরণ লিখে দেয়, প্রকাশের আগে আপনি এডিট করতে পারেন।',
  },
  cta: { en: 'Try it in the dashboard', bn: 'ড্যাশবোর্ডে চেষ্টা করুন' },
  note: {
    en: 'This is a preview of the format. The dashboard generator uses your real product details.',
    bn: 'এটি ফরম্যাটের প্রিভিউ। ড্যাশবোর্ডের জেনারেটর আপনার আসল পণ্যের তথ্য ব্যবহার করে।',
  },
};
export const aiPoints: T[] = [
  { en: 'Enter a product name and a few keywords', bn: 'পণ্যের নাম ও কয়েকটি কিওয়ার্ড লিখুন' },
  { en: 'Pick a tone, from friendly to festive', bn: 'বন্ধুসুলভ থেকে উৎসবের, পছন্দের টোন বেছে নিন' },
  { en: 'Get English or Bangla copy you can edit before publishing', bn: 'ইংরেজি বা বাংলায় বিবরণ পান, প্রকাশের আগে এডিট করুন' },
];
export const aiUi = {
  name: { en: 'Product name', bn: 'পণ্যের নাম' },
  kw: { en: 'Keywords (separate with commas)', bn: 'কিওয়ার্ড (কমা দিয়ে আলাদা করুন)' },
  tone: { en: 'Tone', bn: 'টোন' },
  lang: { en: 'Language', bn: 'ভাষা' },
  go: { en: 'Write with AI', bn: 'AI দিয়ে লিখুন' },
  out: { en: 'AI description', bn: 'AI বিবরণ' },
  copy: { en: 'Copy', bn: 'কপি' },
  copied: { en: 'Copied', bn: 'কপি হয়েছে' },
  empty: { en: 'Your description will appear here.', bn: 'আপনার বিবরণ এখানে আসবে।' },
  writing: { en: 'AI is writing…', bn: 'AI লিখছে…' },
  ready: { en: 'Description ready', bn: 'বিবরণ তৈরি' },
  words: { en: 'words', bn: 'শব্দ' },
  sample: { en: 'Sample product', bn: 'নমুনা পণ্য' },
};
export const aiTones = [
  { v: 'friendly', t: { en: 'Friendly', bn: 'বন্ধুসুলভ' } },
  { v: 'pro', t: { en: 'Professional', bn: 'পেশাদার' } },
  { v: 'festive', t: { en: 'Festive', bn: 'উৎসবের' } },
];
export const aiLangs = [{ v: 'en', t: 'English' }, { v: 'bn', t: 'বাংলা' }];
/** Verbatim from the product-team file. */
export const aiTpl: Record<string, Record<string, string>> = {
  en: {
    friendly: "Meet your new favourite: {name}. {kw} - everything you want, nothing you don't. Order today and we'll bring it to your door.",
    pro: '{name}: {kw}. Selected for quality and consistency. Available now with secure online payment and tracked delivery.',
    festive: 'Make every celebration special with {name}. {kw}. A thoughtful pick for gifting. Order now and surprise someone today!',
  },
  bn: {
    friendly: 'আপনার নতুন প্রিয় পণ্য: {name}। {kw} — যা চান ঠিক তাই। আজই অর্ডার করুন, পৌঁছে যাবে আপনার দরজায়।',
    pro: '{name}: {kw}। মান ও ধারাবাহিকতার কথা ভেবে বাছাই করা। এখনই নিরাপদ অনলাইন পেমেন্ট ও ট্র্যাকযোগ্য ডেলিভারিতে পাওয়া যাচ্ছে।',
    festive: '{name} দিয়ে প্রতিটি উৎসব হোক আরও বিশেষ। {kw}। উপহারের জন্য দারুণ পছন্দ — এখনই অর্ডার করুন!',
  },
};
export const aiFallback = { name: { en: 'Your product', bn: 'আপনার পণ্য' }, kw: { en: 'high quality', bn: 'উচ্চমান' } };
export const aiSteps = [
  { en: 'Add the name and a few keywords', bn: 'নাম আর কিওয়ার্ড দিন', sen: 'Pick a tone: friendly, professional or festive.', sbn: 'টোন বেছে নিন: বন্ধুসুলভ, পেশাদার বা উৎসবের।' },
  { en: 'AI writes the description', bn: 'AI বিবরণ লিখে দেয়', sen: 'Ready in seconds.', sbn: 'কয়েক সেকেন্ডেই তৈরি।' },
  { en: 'English or Bangla, any tone', bn: 'ইংরেজি বা বাংলা, যেকোনো টোন', sen: 'Switch language and tone in one click.', sbn: 'এক ক্লিকে ভাষা ও টোন বদলান।' },
  { en: 'Edit and publish', bn: 'এডিট করে প্রকাশ করুন', sen: 'It goes straight to your product page.', sbn: 'সরাসরি আপনার প্রোডাক্ট পেজে চলে যায়।' },
];
export const aiWalk = {
  label: { en: 'AI walkthrough steps', bn: 'AI ওয়াকথ্রুর ধাপ' },
  title: { en: 'AI product description', bn: 'AI পণ্যের বিবরণ' },
  sample: { en: 'sample data', bn: 'নমুনা ডেটা' },
  fine: {
    en: 'Illustrated walkthrough with sample data. Screens may differ slightly in your dashboard.',
    bn: 'নমুনা ডেটা দিয়ে সাজানো ওয়াকথ্রু। আপনার ড্যাশবোর্ডের স্ক্রিন কিছুটা আলাদা হতে পারে।',
  },
  tryHead: { en: 'Try it yourself', bn: 'নিজে চেষ্টা করুন' },
  newProduct: { en: 'New product', bn: 'নতুন পণ্য' },
  publish: { en: 'Publish', bn: 'প্রকাশ করুন' },
  published: { en: 'Published', bn: 'প্রকাশিত' },
  written: { en: 'AI-written', bn: 'AI লিখেছে' },
  lines: [
    'Meet your new favourite: Mustard honey 500g.',
    "Raw, unfiltered, glass jar - everything you want, nothing you don't.",
    "Order today and we'll bring it to your door.",
  ],
  blocks: {
    friendly: "Meet your new favourite: Mustard honey 500g. Raw, unfiltered, glass jar - everything you want, nothing you don't. Order today and we'll bring it to your door.",
    festive: 'Make every celebration special with Mustard honey 500g. Raw, unfiltered, glass jar. A thoughtful pick for gifting. Order now and surprise someone today!',
    festiveBn: 'সরিষার মধু ৫০০ গ্রাম দিয়ে প্রতিটি উৎসব হোক আরও বিশেষ। কাঁচা, ছাঁকা ছাড়া, কাচের বোতল। উপহারের জন্য দারুণ পছন্দ — এখনই অর্ডার করুন!',
  },
};
