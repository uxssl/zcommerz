/**
 * Phase 03 content: channels, insights, more ways, how it works, pricing, FAQ, closing CTA
 * and the Facebook→website section. Every string (EN + BN), price and feature line is
 * verbatim from the product-team file (reference/zcommerz-landing.html). Only presentation is new.
 */
import type { T } from './sections';

/* ---------- F · Facebook → website ---------- */
export const videoHead = {
  h2: { en: 'From Facebook page to website, in one click', bn: 'ফেসবুক পেজ থেকে ওয়েবসাইট, মাত্র একটি ক্লিকে' },
  lead: {
    en: 'Connect your page once, click once, and your website is ready to share.',
    bn: 'পেজ একবার কানেক্ট করুন, একটি ক্লিক করুন, আর আপনার ওয়েবসাইট শেয়ার করার জন্য তৈরি।',
  },
  sample: { en: 'Sample data', bn: 'নমুনা ডেটা' },
};
export const videoSteps = [
  {
    n: '01',
    t: { en: 'Connect your page', bn: 'পেজ কানেক্ট করুন' },
    s: { en: 'Choose a page to connect', bn: 'কানেক্ট করার পেজ বেছে নিন' },
  },
  {
    n: '02',
    t: { en: 'Create my website', bn: 'আমার ওয়েবসাইট বানান' },
    s: { en: 'No coding. No hosting.', bn: 'কোডিং নয়, হোস্টিং নয়।' },
  },
  {
    n: '03',
    t: { en: 'Your website is live', bn: 'আপনার ওয়েবসাইট লাইভ' },
    s: { en: '12 products found on your page', bn: 'আপনার পেজে ১২টি পণ্য পাওয়া গেছে' },
  },
];

/* ---------- G · Channels ---------- */
export const connHead = {
  h2: { en: 'Sell where your customers already are', bn: 'যেখানে কাস্টমার আছে, সেখানেই বিক্রি করুন' },
  lead: {
    en: 'Connect each channel once and run everything from one dashboard.',
    bn: 'প্রতিটি চ্যানেল একবার কানেক্ট করুন, সবকিছু চালান একটি ড্যাশবোর্ড থেকে।',
  },
  note: {
    en: 'Demo buttons. Real connections are set up inside the merchant dashboard.',
    bn: 'ডেমো বাটন। আসল কানেকশন মার্চেন্ট ড্যাশবোর্ড থেকে সেট করতে হয়।',
  },
  on: { en: 'Connected', bn: 'কানেক্টেড' },
  off: { en: 'Connect', bn: 'কানেক্ট' },
};
export const connPoints = [
  {
    t: { en: 'Orders in one place', bn: 'এক জায়গায় অর্ডার' },
    s: { en: 'Website, Facebook, Daraz and WhatsApp orders in the same list.', bn: 'ওয়েবসাইট, ফেসবুক, দারাজ ও হোয়াটসঅ্যাপের অর্ডার একই তালিকায়।' },
  },
  {
    t: { en: 'Secure payments', bn: 'নিরাপদ পেমেন্ট' },
    s: { en: 'Payments run through SSLCOMMERZ, a PCI-DSS certified gateway.', bn: 'পেমেন্ট চলে PCI-DSS সার্টিফায়েড গেটওয়ে SSLCOMMERZ-এর মাধ্যমে।' },
  },
  {
    t: { en: 'You stay in control', bn: 'আপনার নিয়ন্ত্রণে' },
    s: { en: 'You choose which page and accounts to connect.', bn: 'কোন পেজ ও কোন অ্যাকাউন্ট কানেক্ট করবেন, তা আপনিই ঠিক করেন।' },
  },
];
export const connRows = [
  {
    id: 'fb', logos: ['facebook', 'messenger'] as const, name: 'Facebook & Messenger', on: true,
    s: { en: 'Start an online business from your page in one click, and reply to customers on Messenger.', bn: 'এক ক্লিকে পেজ থেকে অনলাইন বিজনেস শুরু করুন, আর মেসেঞ্জারে কাস্টমারকে উত্তর দিন।' },
  },
  {
    id: 'dz', logos: ['daraz'] as const, name: 'Daraz', on: false,
    s: { en: 'Keep products, stock and orders in step with Daraz.', bn: 'পণ্য, স্টক ও অর্ডার দারাজের সঙ্গে মিলিয়ে রাখুন।' },
  },
  {
    id: 'wa', logos: ['whatsapp'] as const, name: 'WhatsApp', on: false,
    s: { en: 'Customers message you directly and get order updates.', bn: 'কাস্টমার সরাসরি মেসেজ করবে, আর পাবে অর্ডার আপডেট।' },
  },
  {
    id: 'cr', logos: ['pathao', 'ecourier'] as const, name: 'Pathao & eCourier', on: false,
    s: { en: 'Book and track deliveries without leaving the dashboard.', bn: 'ড্যাশবোর্ড ছাড়াই ডেলিভারি বুক ও ট্র্যাক করুন।' },
  },
  {
    id: 'ssl', logos: [] as const, name: 'SSLCOMMERZ', on: false,
    s: { en: 'Accept cards, mobile wallets and Bangla QR.', bn: 'কার্ড, মোবাইল ওয়ালেট ও বাংলা QR-এ পেমেন্ট নিন।' },
  },
];

/* ---------- H · Insights ---------- */
export const insHead = {
  tag: { en: 'Reports & insights', bn: 'রিপোর্ট ও ইনসাইট' },
  h2: { en: 'See what sells, as it happens', bn: 'কী বিক্রি হচ্ছে, দেখুন সঙ্গে সঙ্গে' },
  cta: { en: 'Start free trial', bn: 'ফ্রি ট্রায়াল শুরু করুন' },
  chart: { en: 'Orders this week', bn: 'সাপ্তাহিক অর্ডার' },
  sample: { en: 'Sample data', bn: 'নমুনা ডেটা' },
};
export const insBullets: T[] = [
  { en: 'Track orders, sales and profit in one view', bn: 'অর্ডার, বিক্রি ও মুনাফা এক নজরে দেখুন' },
  { en: 'Spot slow-moving stock with Inventory Aging (PRO)', bn: 'ইনভেন্টরি এজিং (PRO) দিয়ে ধীরগতির স্টক চিনুন' },
  { en: 'See abandoned carts to win back lost sales (PRO)', bn: 'অ্যাবান্ডনড কার্ট (PRO) দেখে হারানো বিক্রি ফিরিয়ে আনুন' },
];
export const insStats = [
  { l: { en: 'Products', bn: 'পণ্য' }, v: '1.2k', vbn: '১.২k' },
  { l: { en: 'Customers', bn: 'কাস্টমার' }, v: '4.8k', vbn: '৪.৮k' },
  { l: { en: 'Orders', bn: 'অর্ডার' }, v: '850', vbn: '৮৫০' },
  { l: { en: 'Profit', bn: 'মুনাফা' }, v: '৳12k', vbn: '৳১২k' },
];
/** Bar heights from the product-team chart (80, 100, 65, 115, 95, 130, 142 of 142). */
export const insBars = [
  { d: { en: 'Mon', bn: 'সোম' }, v: 80 }, { d: { en: 'Tue', bn: 'মঙ্গল' }, v: 100 },
  { d: { en: 'Wed', bn: 'বুধ' }, v: 65 }, { d: { en: 'Thu', bn: 'বৃহঃ' }, v: 115 },
  { d: { en: 'Fri', bn: 'শুক্র' }, v: 95 }, { d: { en: 'Sat', bn: 'শনি' }, v: 130 },
  { d: { en: 'Sun', bn: 'রবি' }, v: 142, now: true },
];

/* ---------- I · More ways ---------- */
export const moreHead: T = { en: 'More ways ZCOMMERZ powers your business', bn: 'আরও যেভাবে ZCOMMERZ আপনার ব্যবসাকে এগিয়ে নেয়' };
export const moreRows = [
  { href: '#how', t: { en: 'Build an online business with zero coding', bn: 'কোডিং ছাড়াই অনলাইন বিজনেস বানান' }, s: { en: 'Pick a theme and go live.', bn: 'থিম বেছে লাইভ করুন।' } },
  { href: '#tools', t: { en: 'Create discount codes with Coupons', bn: 'কুপন দিয়ে ডিসকাউন্ট দিন' }, s: { en: 'Reward customers and lift sales.', bn: 'কাস্টমারকে পুরস্কৃত করুন, বিক্রি বাড়ান।' } },
  { href: '#chat', t: { en: 'Talk to customers with Live Chat', bn: 'লাইভ চ্যাটে কাস্টমারের সঙ্গে কথা বলুন' }, s: { en: 'Answer questions the moment they arrive.', bn: 'প্রশ্ন আসামাত্র উত্তর দিন।' } },
  { href: '#ai', t: { en: 'Write listings with AI', bn: 'AI দিয়ে বিবরণ লিখুন' }, s: { en: 'English or Bangla in seconds.', bn: 'সেকেন্ডে ইংরেজি বা বাংলায়।' } },
  { href: '#channels', t: { en: 'Deliver with Pathao and eCourier', bn: 'পাঠাও ও ই-কুরিয়ারে ডেলিভারি দিন' }, s: { en: 'Book and track from the dashboard.', bn: 'ড্যাশবোর্ড থেকেই বুক ও ট্র্যাক করুন।' } },
  { href: '#tools', t: { en: 'Share the work with your team', bn: 'টিমের সঙ্গে কাজ ভাগ করুন' }, s: { en: 'Add staff and set their roles.', bn: 'স্টাফ যোগ করুন, রোল ঠিক করুন।' } },
];

/* ---------- J · How it works ---------- */
export const howHead = {
  h2: { en: 'Live in four steps', bn: 'চারটি ধাপেই লাইভ' },
  lead: { en: 'A simple path from idea to an online business that takes orders.', bn: 'ঝামেলা ছাড়া ধাপে ধাপে ব্যবসা অনলাইনে আনুন।' },
};
export const howSteps = [
  {
    // shortened 2026-11-12 at the user's request (was: "Add your business, or connect your Facebook page" /
    // "Enter your online business name, logo, category and contact details. Or pick your page.")
    t: { en: 'Add your business', bn: 'বিজনেস যুক্ত করুন' },
    s: { en: 'Enter your business name and logo, or connect your Facebook page.', bn: 'বিজনেসের নাম ও লোগো দিন, অথবা ফেসবুক পেজ কানেক্ট করুন।' },
  },
  {
    t: { en: 'Choose a theme', bn: 'থিম বেছে নিন' },
    s: { en: 'Pick a design that matches your brand and products, then make it yours.', bn: 'আপনার ব্র্যান্ড ও পণ্যের সঙ্গে মানানসই থিম নিন এবং নিজের মতো সাজান।' },
  },
  {
    t: { en: 'Connect your tools', bn: 'ইন্টিগ্রেশন যুক্ত করুন' },
    s: { en: 'Add SSLCOMMERZ, Pathao or eCourier, Daraz and WhatsApp.', bn: 'SSLCOMMERZ, পাঠাও বা ই-কুরিয়ার, দারাজ এবং হোয়াটসঅ্যাপ যুক্ত করুন।' },
  },
  {
    t: { en: 'Go live', bn: 'লাইভ করুন' },
    s: { en: 'Choose your plan and start selling right away.', bn: 'প্ল্যান বেছে নিন আর সঙ্গে সঙ্গে বিক্রি শুরু করুন।' },
  },
];

/* ---------- K · Pricing ---------- */
export const priceHead = {
  // retitled 2026-11-12 at the user's request (was "Simple plans, clear prices" / "সহজ প্ল্যান, স্পষ্ট দাম")
  // \n = explicit line break (user, 2026-11-12), shown via white-space: pre-line
  h2: { en: 'Simple pricing for\nevery online business', bn: 'প্রতিটি অনলাইন বিজনেসের\nজন্য সহজ প্রাইসিং' },
  lead: { en: 'Choose the plan that fits your business size. Pay yearly and save 15%.', bn: 'ব্যবসার আকার অনুযায়ী প্ল্যান বেছে নিন। বছরে পরিশোধ করলে ১৫% ছাড়।' },
  note: {
    en: 'Coupons come with Growth. Campaigns, Inventory Aging and Abandoned Cart recovery come with Pro.',
    bn: 'কুপন আসে Growth-এ। ক্যাম্পেইন, ইনভেন্টরি এজিং ও অ্যাবান্ডনড কার্ট রিকভারি আসে Pro-তে।',
  },
  billing: { en: 'Billing period', bn: 'বিলিং পিরিয়ড' },
  monthly: { en: 'Monthly', bn: 'মাসিক' },
  yearly: { en: 'Yearly', bn: 'বার্ষিক' },
  best: { en: 'Best value', bn: 'সেরা মূল্য' },
  save: { en: 'Save', bn: 'সাশ্রয়' },
  cta: { en: 'Get Started', bn: 'শুরু করুন' },
  mo: { en: '/mo', bn: '/মাস' },
  perYear: { en: 'Extra 15% off when billed yearly', bn: 'বছরে একসাথে পরিশোধ করলে আরও ১৫% ছাড়' },
  perMonth: { en: 'Billed monthly', bn: 'মাসিক পরিশোধ' },
  yearChip: { en: '−15% yearly', bn: 'বার্ষিকে −১৫%' },
  billedYear: { en: 'billed yearly', bn: 'বার্ষিক পরিশোধে' },
};
/** Feature lines, verbatim. A leading "!" in a plan's list means "not included". */
export const planFeats: Record<string, T> = {
  prod: { en: 'Unlimited Products', bn: 'আনলিমিটেড পণ্য' },
  integ: { en: 'Seamless Payment & Logistics Integration', bn: 'নির্বিঘ্ন পেমেন্ট ও লজিস্টিকস ইন্টিগ্রেশন' },
  dashS: { en: 'Show Total Revenue, Order Shipped, Sales Overview, Latest orders in the dashboard', bn: 'ড্যাশবোর্ডে মোট আয়, শিপ হওয়া অর্ডার, সেলস ওভারভিউ ও সর্বশেষ অর্ডার দেখুন' },
  dashG: { en: 'Show Total Revenue, Order Shipped, Products, Customers, Categories, Sales Overview, Latest orders in the dashboard', bn: 'ড্যাশবোর্ডে মোট আয়, শিপ হওয়া অর্ডার, পণ্য, কাস্টমার, ক্যাটাগরি, সেলস ওভারভিউ ও সর্বশেষ অর্ডার দেখুন' },
  dashP: { en: 'Show Total Revenue, Order Shipped, Products, Customers, Categories, Sales Overview, Latest orders, Order by status in the dashboard', bn: 'ড্যাশবোর্ডে মোট আয়, শিপ হওয়া অর্ডার, পণ্য, কাস্টমার, ক্যাটাগরি, সেলস ওভারভিউ, সর্বশেষ অর্ডার ও স্ট্যাটাস অনুযায়ী অর্ডার দেখুন' },
  track: { en: 'Pending & Delivered Order Tracking', bn: 'পেন্ডিং ও ডেলিভারড অর্ডার ট্র্যাকিং' },
  notify: { en: 'Instant notify alert to merchant on new orders', bn: 'নতুন অর্ডার এলে মার্চেন্টের কাছে তাৎক্ষণিক অ্যালার্ট' },
  autoS: { en: 'Automated order status updates to customers (Order Received, Shipped, Delivered)', bn: 'কাস্টমারকে স্বয়ংক্রিয় অর্ডার স্ট্যাটাস আপডেট (অর্ডার গৃহীত, শিপড, ডেলিভারড)' },
  autoG: { en: 'Automated customer notifications (Order Received, Shipped, Delivered)', bn: 'স্বয়ংক্রিয় কাস্টমার নোটিফিকেশন (অর্ডার গৃহীত, শিপড, ডেলিভারড)' },
  owner: { en: 'Only Shop Owner access', bn: 'শুধু শপ ওনারের অ্যাক্সেস' },
  staff2: { en: 'Owner + 2 Staff Members access', bn: 'ওনার + ২ জন স্টাফের অ্যাক্সেস' },
  staff4: { en: 'Owner + 4 Staff Members access', bn: 'ওনার + ৪ জন স্টাফের অ্যাক্সেস' },
  cust: { en: 'Unlimited customers', bn: 'আনলিমিটেড কাস্টমার' },
  noCoup: { en: 'No Coupon or Campaign feature', bn: 'কুপন বা ক্যাম্পেইন ফিচার নেই' },
  low: { en: 'Low Stock Alerts', bn: 'লো স্টক অ্যালার্ট' },
  coup: { en: 'Coupon Feature Available', bn: 'কুপন ফিচার আছে' },
  inv: { en: "Inventory Aging Reports (slow-moving products, what's not selling)", bn: 'ইনভেন্টরি এজিং রিপোর্ট (ধীরগতির পণ্য, কোনটি বিক্রি হচ্ছে না)' },
  aband: { en: 'Abandoned Cart Recovery reminders', bn: 'অ্যাবান্ডনড কার্ট রিকভারি রিমাইন্ডার' },
  coupCamp: { en: 'Coupon & Campaign Features Available', bn: 'কুপন ও ক্যাম্পেইন ফিচার আছে' },
};
/**
 * Presentation only: the feature lines above, grouped so a plan reads as structure instead of
 * one long list. Membership per plan is unchanged — each plan still shows exactly its own lines.
 * `dash` is rendered as a description line (one long sentence), not a ticked bullet.
 */
export const featGroups: { id: string; n: T; keys: string[] }[] = [
  { id: 'catalog', n: { en: 'Catalogue & payments', bn: 'ক্যাটালগ ও পেমেন্ট' }, keys: ['prod', 'integ'] },
  { id: 'dash', n: { en: 'Dashboard', bn: 'ড্যাশবোর্ড' }, keys: ['dashS', 'dashG', 'dashP'] },
  { id: 'orders', n: { en: 'Orders & notifications', bn: 'অর্ডার ও নোটিফিকেশন' }, keys: ['track', 'notify', 'autoS', 'autoG'] },
  { id: 'stock', n: { en: 'Stock', bn: 'স্টক' }, keys: ['low', 'inv'] },
  { id: 'growth', n: { en: 'Marketing', bn: 'মার্কেটিং' }, keys: ['coup', 'coupCamp', 'noCoup', 'aband'] },
  { id: 'team', n: { en: 'Team & customers', bn: 'টিম ও কাস্টমার' }, keys: ['owner', 'staff2', 'staff4', 'cust'] },
];
/**
 * Yearly figures are derived from the monthly price, not supplied by the product team:
 * priceY = round(price × 0.85) (the "Pay yearly and save 15%" line in the source copy),
 * saveY  = price − priceY, totalY = priceY × 12 (so the arithmetic on screen adds up).
 * Confirm these against real billing before launch.
 */
export const plans = [
  {
    name: 'Start', price: '499', was: '699', save: '200',
    priceY: '424', saveY: '75', totalY: '5,088',
    tag: { en: 'Perfect for starting your journey', bn: 'যাত্রা শুরু করার জন্য একদম ঠিক' },
    feats: ['prod', 'integ', 'dashS', 'track', 'notify', 'autoS', 'owner', 'cust', '!noCoup'],
  },
  {
    name: 'Growth', price: '1,049', was: '1,499', save: '450', pop: true,
    priceY: '892', saveY: '157', totalY: '10,704',
    tag: { en: 'Designed for scaling brands', bn: 'ব্র্যান্ড বড় করার জন্য' },
    feats: ['prod', 'integ', 'dashG', 'track', 'notify', 'autoG', 'low', 'staff2', 'cust', 'coup'],
  },
  {
    name: 'Pro', price: '2,299', was: '3,299', save: '1,000',
    priceY: '1,954', saveY: '345', totalY: '23,448',
    tag: { en: 'Maximum power and insights', bn: 'সর্বোচ্চ ক্ষমতা ও ইনসাইট' },
    feats: ['prod', 'integ', 'dashP', 'track', 'notify', 'autoG', 'inv', 'low', 'aband', 'staff4', 'cust', 'coupCamp'],
  },
];

/* ---------- L · FAQ ---------- */
export const faqHead: T = { en: 'Questions, answered', bn: 'সাধারণ প্রশ্ন' };
export const faqs = [
  {
    q: { en: 'What is ZCOMMERZ?', bn: 'ZCOMMERZ কী?' },
    a: { en: 'ZCOMMERZ lets you build and run an online business in Bangladesh: themes, products, payments, delivery and sales channels in one place.', bn: 'ZCOMMERZ দিয়ে আপনি বাংলাদেশে অনলাইন বিজনেস বানাতে ও চালাতে পারবেন: থিম, পণ্য, পেমেন্ট, ডেলিভারি ও সেলস চ্যানেল এক জায়গায়।' },
  },
  {
    q: { en: 'Can I build my online business from my Facebook page?', bn: 'ফেসবুক পেজ থেকে কি অনলাইন বিজনেস বানানো যায়?' },
    a: { en: 'Yes. Connect your page, review what comes across, pick a theme and publish. You can edit everything afterwards.', bn: 'হ্যাঁ। পেজ কানেক্ট করুন, যা এসেছে দেখে নিন, থিম বেছে প্রকাশ করুন। পরে সবকিছু এডিট করা যাবে।' },
  },
  {
    q: { en: 'Do I need technical skills?', bn: 'টেকনিক্যাল জ্ঞান লাগবে কি?' },
    a: { en: 'No. Everything is point and click.', bn: 'না। সবকিছুই ক্লিক করে করা যায়।' },
  },
  {
    q: { en: 'Can I sell on Daraz and WhatsApp too?', bn: 'দারাজ ও হোয়াটসঅ্যাপেও কি বিক্রি করা যাবে?' },
    a: { en: 'Yes. Connect Daraz and WhatsApp from the dashboard and manage them alongside your online business.', bn: 'হ্যাঁ। ড্যাশবোর্ড থেকে দারাজ ও হোয়াটসঅ্যাপ কানেক্ট করে অনলাইন বিজনেসের সঙ্গে একসাথে চালান।' },
  },
  {
    q: { en: 'How do customers pay?', bn: 'কাস্টমার কীভাবে পেমেন্ট করবে?' },
    a: { en: 'Through SSLCOMMERZ: Visa, Mastercard, mobile wallets like bKash and Bangla QR, 36+ channels in total.', bn: 'SSLCOMMERZ-এর মাধ্যমে: ভিসা, মাস্টারকার্ড, বিকাশের মতো মোবাইল ওয়ালেট ও বাংলা QR সহ মোট ৩৬+ চ্যানেল।' },
  },
  {
    q: { en: 'Is there a free trial?', bn: 'ফ্রি ট্রায়াল আছে কি?' },
    a: { en: 'Yes, a 7-day free trial.', bn: 'হ্যাঁ, ৭ দিনের ফ্রি ট্রায়াল।' },
  },
  {
    q: { en: 'How do I get started?', bn: 'কীভাবে শুরু করব?' },
    a: { en: 'Choose Start free trial, create your account, then follow the four steps.', bn: '“ফ্রি ট্রায়াল শুরু করুন” চাপুন, অ্যাকাউন্ট খুলুন, তারপর চারটি ধাপ অনুসরণ করুন।' },
  },
];

/* ---------- M · Closing CTA ---------- */
export const ctaBand = {
  h2: { en: 'Take your brand online today', bn: 'আজই আপনার ব্র্যান্ড অনলাইনে নিন' },
  lead: { en: 'The easiest way to run and grow your business.', bn: 'ব্যবসা পরিচালনা ও বড় করার সবচেয়ে সহজ উপায়।' },
  cta: { en: 'Start 7-day free trial', bn: '৭ দিনের ফ্রি ট্রায়াল শুরু করুন' },
};
