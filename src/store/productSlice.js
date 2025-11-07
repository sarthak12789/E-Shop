import { createSlice, createSelector } from '@reduxjs/toolkit';

// Minimal local dataset focused on shoes only
const initialItems = [
  {
    id: 'nike-air-max-90-men',
    title: 'Nike Air Max 90',
    brand: 'Nike',
    line: 'Air Max',
    gender: 'men',
    price: 129.99,
    description:
      'Classic comfort with iconic style. The Nike Air Max 90 features durable materials and visible Air cushioning.',
    images: [
      'https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/cbd90f0d-55d0-4e09-b093-1be3782b8522/W+NIKE+STRUCTURE+26.png',
    ],
    offers: [{ type: 'discount', value: 15, label: 'Festive 15% OFF' }],
    rating: { rate: 4.6, count: 210 },
    category: 'shoes',
  },
  {
    id: 'adidas-ultraboost-men',
    title: 'Adidas Ultraboost 22',
    brand: 'Adidas',
    line: 'Ultraboost',
    gender: 'men',
    price: 159.99,
    description:
      'Responsive cushioning with Primeknit upper for adaptive support. Perfect for daily runs and all-day comfort.',
    images: [
      'https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/29884934/2024/8/23/b870b213-7047-4549-ae14-7f266de70e5e1724402267142-ADIDAS-Women-Sports-Shoes-8191724402266805-1.jpg',
    ],
    offers: [{ type: 'discount', value: 20, label: 'New Year 20% OFF' }],
    rating: { rate: 4.7, count: 180 },
    category: 'shoes',
  },
  {
    id: 'puma-rsx-men',
    title: 'Puma RS-X',
    brand: 'Puma',
    line: 'RS',
    gender: 'men',
    price: 99.99,
    description:
      'Bold, retro-inspired design with comfortable cushioning. Street-ready style for everyday wear.',
    images: [
      'https://rukminim2.flixcart.com/image/480/580/xif0q/shoe/h/h/z/-original-imahfhjwpe8gbbfn.jpeg?q=90',
    ],
    offers: [{ type: 'discount', value: 10, label: 'Save 10%' }],
    rating: { rate: 4.3, count: 90 },
    category: 'shoes',
  },
  {
    id: 'nike-air-force-1-women',
    title: 'Nike Air Force 1',
    brand: 'Nike',
    line: 'Air Force',
    gender: 'women',
    price: 109.99,
    description:
      'Legendary AF1 with premium leather and classic cupsole support. Clean look that pairs with any outfit.',
    images: [
      'https://sportsstation.in/cdn/shop/files/original-imahfhjepz3kffkk.jpg?v=1756101708&width=693',
    ],
    offers: [{ type: 'discount', value: 5, label: '5% OFF' }],
    rating: { rate: 4.8, count: 320 },
    category: 'shoes',
  },
  {
    id: 'new-balance-574-women',
    title: 'New Balance 574 Core',
    brand: 'New Balance',
    line: '574',
    gender: 'women',
    price: 89.99,
    description:
      'Timeless silhouette with ENCAP cushioning. Versatile lifestyle sneaker with a soft ride.',
    images: [
      'https://images-static.nykaa.com/media/catalog/product/b/f/bf0558737957901_1.jpg?tr=w-500',
    ],
    offers: [{ type: 'discount', value: 12, label: 'Spring 12% OFF' }],
    rating: { rate: 4.4, count: 140 },
    category: 'shoes',
  },
  {
    id: 'adidas-stan-smith-women',
    title: 'Adidas Stan Smith',
    brand: 'Adidas',
    line: 'Originals',
    gender: 'women',
    price: 84.99,
    description:
      'Clean and minimal tennis classic. Smooth synthetic upper with signature perforated 3-Stripes.',
    images: [
      'https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/1330971571de42ce8f563da587123f3b_9366/pureboost-5-running-shoes.jpg',
    ],
    offers: [{ type: 'discount', value: 18, label: 'End of Season 18% OFF' }],
    rating: { rate: 4.5, count: 230 },
    category: 'shoes',
  },
  {
    id: 'converse-chuck70-kids',
    title: 'Converse Chuck 70 Kids',
    brand: 'Converse',
    line: 'Chuck 70',
    gender: 'kids',
    price: 54.99,
    description:
      'Scaled-down classic Chuck 70 for kids. Durable canvas upper and flexible rubber outsole.',
    images: [
      'https://www.converse.in/media/catalog/product/3/j/3j233c_03.jpg',
    ],
    offers: [{ type: 'discount', value: 10, label: 'Kids Special 10% OFF' }],
    rating: { rate: 4.2, count: 60 },
    category: 'shoes',
  },
  {
    id: 'vans-old-skool-kids',
    title: 'Vans Old Skool Kids',
    brand: 'Vans',
    line: 'Old Skool',
    gender: 'kids',
    price: 49.99,
    description:
      'Iconic side stripe with sturdy canvas and suede. Easy-on features for everyday adventures.',
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfRQByjtUlyhkBin_DqFbcafVHercngY667A&s',
    ],
    offers: [{ type: 'discount', value: 8, label: 'Back to School 8% OFF' }],
    rating: { rate: 4.1, count: 45 },
    category: 'shoes',
  },
  {
    id: 'reebok-nano-men',
    title: 'Reebok Nano X3',
    brand: 'Reebok',
    line: 'Nano',
    gender: 'men',
    price: 119.99,
    description:
      'Versatile training shoe with Floatride Energy Foam for stability and comfort in the gym.',
    images: [
      'https://parmarboothouse.com/StoreImages/extralarge/1535LIFT-PROWHITE.jpg',
    ],
    offers: [{ type: 'discount', value: 15, label: 'Gym Days 15% OFF' }],
    rating: { rate: 4.3, count: 80 },
    category: 'shoes',
  },
  {
    id: 'nike-pegasus-40-women',
    title: 'Nike Pegasus 40',
    brand: 'Nike',
    line: 'Pegasus',
    gender: 'women',
    price: 129.99,
    description:
      'Everyday running essential with smooth transitions and plush cushioning mile after mile.',
    images: [
      'https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/25503840/2023/10/16/db142f36-9011-4774-8799-08f7685025b81697471896207NikeLegendEssentialMenWorkoutShoes1.jpg',
    ],
    offers: [{ type: 'discount', value: 10, label: 'Runner 10% OFF' }],
    rating: { rate: 4.6, count: 160 },
    category: 'shoes',
  },
  {
    id: 'asics-gel-kayano-men',
    title: 'ASICS Gel-Kayano 30',
    brand: 'ASICS',
    line: 'Gel-Kayano',
    gender: 'men',
    price: 169.99,
    description:
      'Stability favorite with updated cushioning for long-distance comfort and support.',
    images: [
      'https://www.asics.co.in/media/catalog/product/4/5/4550455902627_1.jpg',
    ],
    offers: [{ type: 'discount', value: 22, label: 'Super Saver 22% OFF' }],
    rating: { rate: 4.7, count: 95 },
    category: 'shoes',
  },
  // Additional variety across brands
  {
    id: 'nike-dunk-low-men',
    title: 'Nike Dunk Low',
    brand: 'Nike',
    line: 'Dunk',
    gender: 'men',
    price: 119.99,
    description: 'Heritage basketball style turned street staple with padded collar.',
    images: ['https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/27063088/2024/1/23/2f371f3e-4181-46fe-9ce8-3266c897490b1706033053097NikeFlexExperienceRun12MenTexturedRoadRunningSportsShoes1.jpg'],
    offers: [{ type: 'discount', value: 12, label: '12% OFF' }],
    rating: { rate: 4.5, count: 200 },
    category: 'shoes',
  },
  {
    id: 'nike-jordan-1-women',
    title: 'Air Jordan 1 Mid',
    brand: 'Nike',
    line: 'Jordan',
    gender: 'women',
    price: 139.99,
    description: 'Iconic Jordan look with a supportive mid-cut and premium materials.',
    images: ['https://www.misterrunning.com/media/products/2025-media-08/fd2722-215-A-600x600.jpg'],
    offers: [{ type: 'discount', value: 18, label: 'Limited 18% OFF' }],
    rating: { rate: 4.8, count: 350 },
    category: 'shoes',
  },
  {
    id: 'adidas-ozweego-men',
    title: 'Adidas OZWEEGO',
    brand: 'Adidas',
    line: 'Originals',
    gender: 'men',
    price: 99.99,
    description: 'Chunky retro style with Adiprene cushioning for all-day comfort.',
    images: ['https://assets.adidas.com/images/w_383,h_383,f_auto,q_auto,fl_lossy,c_fill,g_auto/e9dd9ed74d1248b8a8cf8551bf52d3f4_9366/ultraboost-5-shoes.jpg'],
    offers: [{ type: 'discount', value: 25, label: 'Mega 25% OFF' }],
    rating: { rate: 4.4, count: 150 },
    category: 'shoes',
  },
  {
    id: 'adidas-samba-women',
    title: 'Adidas Samba',
    brand: 'Adidas',
    line: 'Originals',
    gender: 'women',
    price: 89.99,
    description: 'Timeless soccer-inspired silhouette with suede overlays.',
    images: ['https://media.centrepointstores.com/i/centrepoint/IE8803NAVY-IE8803-SMAW24240624_01-2100.jpg?fmt=auto&$quality-standard$&sm=c&$prodimg-m-prt-pdp-2x$'],
    offers: [{ type: 'discount', value: 10, label: 'Samba 10% OFF' }],
    rating: { rate: 4.6, count: 220 },
    category: 'shoes',
  },
  {
    id: 'puma-cali-women',
    title: 'Puma Cali',
    brand: 'Puma',
    line: 'Cali',
    gender: 'women',
    price: 89.99,
    description: 'Laid-back West Coast vibes with a platform sole and clean lines.',
    images: ['https://images.puma.net/images/309834/03/sv01/fnd/IND/w/800/h/800/'],
    offers: [{ type: 'discount', value: 14, label: 'Cali 14% OFF' }],
    rating: { rate: 4.3, count: 120 },
    category: 'shoes',
  },
  {
    id: 'new-balance-990-men',
    title: 'New Balance 990v5',
    brand: 'New Balance',
    line: '990',
    gender: 'men',
    price: 184.99,
    description: 'Made in USA craftsmanship with premium cushioning and stability.',
    images: ['https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/28483908/2024/4/1/40ece72c-ef14-4041-8b1b-08a847d3e9781711966756874-New-Balance-Men-Woven-Design-574-Sneakers-6741711966756512-1.jpg'],
    offers: [{ type: 'discount', value: 15, label: 'Premium 15% OFF' }],
    rating: { rate: 4.7, count: 110 },
    category: 'shoes',
  },
  {
    id: 'vans-authentic-men',
    title: 'Vans Authentic',
    brand: 'Vans',
    line: 'Authentic',
    gender: 'men',
    price: 54.99,
    description: 'The original stack—simple low top with sturdy canvas upper.',
    images: ['https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1200&auto=format&fit=crop'],
    offers: [{ type: 'discount', value: 10, label: '10% OFF' }],
    rating: { rate: 4.2, count: 180 },
    category: 'shoes',
  },
  {
    id: 'converse-run-star-hike-women',
    title: 'Converse Run Star Hike',
    brand: 'Converse',
    line: 'Run Star',
    gender: 'women',
    price: 109.99,
    description: 'Platform twist on a classic with a chunky outsole for bold style.',
    images: ['https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_300,h_300/global/311839/03/sv01/fnd/IND/fmt/png/Galaxis-Pro-Womens-Performance-Boost-Running-Shoes'],
    offers: [{ type: 'discount', value: 20, label: '20% OFF' }],
    rating: { rate: 4.5, count: 95 },
    category: 'shoes',
  },
  {
    id: 'reebok-classic-leather-men',
    title: 'Reebok Classic Leather',
    brand: 'Reebok',
    line: 'Classic',
    gender: 'men',
    price: 74.99,
    description: 'Everyday essential with a soft leather upper and EVA cushioning.',
    images: ['https://media.landmarkshops.in/cdn-cgi/image/h=1125,w=1125,q=85,fit=cover/lifestyle/1000014259755-Black-Black-1000014259755_02-2100.jpg'],
    offers: [{ type: 'discount', value: 12, label: '12% OFF' }],
    rating: { rate: 4.4, count: 160 },
    category: 'shoes',
  },
  {
    id: 'asics-gel-lyte-iii-women',
    title: 'ASICS Gel-Lyte III',
    brand: 'ASICS',
    line: 'Gel-Lyte',
    gender: 'women',
    price: 109.99,
    description: 'Split-tongue classic with GEL cushioning and retro style.',
    images: ['https://images-static.nykaa.com/media/catalog/product/4/4/449bdbb1012b047-701_1.jpg?tr=w-500'],
    offers: [{ type: 'discount', value: 16, label: '16% OFF' }],
    rating: { rate: 4.5, count: 130 },
    category: 'shoes',
  },
];

const initialState = {
  items: initialItems,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Placeholder for future async loading
    setProducts(state, action) {
      state.items = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;

// Selectors
export const selectAllShoes = (state) => state.products.items;
export const selectBrands = createSelector([selectAllShoes], (items) =>
  Array.from(new Set(items.map((p) => p.brand))).sort()
);
