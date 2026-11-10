/**
 * Phase 2 · "Your products" section (homepage only; /old keeps the Facebook → website section).
 * Every capability line is product-team copy:
 *   Facebook  "Your page comes across: Name, logo, cover and products."  (FB walkthrough)
 *   Daraz     "Keep products, stock and orders in step with Daraz."        (Channels)
 *   Your own  "Add products, set prices and keep stock up to date."        (Products tool)
 * The brief's headline said "store"; per the user's wording rule it reads "online business".
 * Products and prices are sample data (honey, ghee, rice from the product-team file; the pickle is
 * an added sample so the third source has a product) and are labelled as such in the UI.
 */
type T = { en: string; bn: string };

export const sourcesHead: { h2: T; lead: T } = {
  h2: { en: 'Your products. Your own online business.', bn: 'আপনার পণ্য। আপনার নিজের অনলাইন বিজনেস।' },
  lead: {
    en: 'Bring products from Facebook or Daraz, or add your own products to start building your online business.',
    bn: 'ফেসবুক বা দারাজ থেকে পণ্য নিয়ে আসুন, অথবা নিজের পণ্য যোগ করে গড়ে তুলুন আপনার অনলাইন বিজনেস।',
  },
};

export type SourceKey = 'facebook' | 'daraz' | 'own';

export const sources: { key: SourceKey; name: T; line: T }[] = [
  { key: 'facebook', name: { en: 'Facebook page', bn: 'ফেসবুক পেজ' }, line: { en: 'Name, logo, cover and products come across.', bn: 'নাম, লোগো, কভার ও পণ্য চলে আসে।' } },
  { key: 'daraz', name: { en: 'Daraz', bn: 'দারাজ' }, line: { en: 'Keep products, stock and orders in step with Daraz.', bn: 'পণ্য, স্টক ও অর্ডার দারাজের সঙ্গে মিলিয়ে রাখুন।' } },
  { key: 'own', name: { en: 'Your own products', bn: 'আপনার নিজের পণ্য' }, line: { en: 'Add products, set prices and keep stock up to date.', bn: 'পণ্য যোগ করুন, দাম ঠিক করুন ও স্টক হালনাগাদ রাখুন।' } },
];

export const catalog: { img: string; name: T; price: string; from: SourceKey }[] = [
  { img: 'honey', name: { en: 'Mustard honey 500g', bn: 'সরিষার মধু ৫০০ গ্রাম' }, price: '৳650', from: 'facebook' },
  { img: 'ghee', name: { en: 'Ghee 500g', bn: 'ঘি ৫০০ গ্রাম' }, price: '৳980', from: 'facebook' },
  { img: 'rice', name: { en: 'Red rice 5kg', bn: 'লাল চাল ৫ কেজি' }, price: '৳540', from: 'daraz' },
  { img: 'pickle', name: { en: 'Mango pickle 400g', bn: 'আমের আচার ৪০০ গ্রাম' }, price: '৳320', from: 'own' },
];

export const labels = {
  connected: { en: 'Connected', bn: 'কানেক্টেড' },
  synced: { en: 'In step', bn: 'মিলিয়ে রাখা' },
  addProduct: { en: 'Add product', bn: 'পণ্য যোগ করুন' },
  productName: { en: 'Product name', bn: 'পণ্যের নাম' },
  price: { en: 'Price', bn: 'দাম' },
  products: { en: 'Products', bn: 'পণ্য' },
  source: { en: 'Source', bn: 'উৎস' },
  own: { en: 'Added by you', bn: 'আপনার যোগ করা' },
  live: { en: 'Live', bn: 'লাইভ' },
  add: { en: 'Add', bn: 'যোগ করুন' },
  sample: { en: 'Sample data. Screens may differ slightly in your dashboard.', bn: 'নমুনা ডেটা। আপনার ড্যাশবোর্ডে স্ক্রিন কিছুটা আলাদা হতে পারে।' },
  replay: { en: 'Replay', bn: 'আবার দেখুন' },
} satisfies Record<string, T>;
