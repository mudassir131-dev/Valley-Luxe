export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'Pashmina' | 'Saffron' | 'Dry Fruits' | 'Handicrafts' | 'Carpets' | 'More';
  description: string;
  story: string;
  care: string;
  materials: string;
  origin: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  badge?: string;
  inStock: boolean;
  isDeal?: boolean;
  isRecommended?: boolean;
}

export const products: Product[] = [
  // SECTION 4: BEST DEALS FOR YOU
  {
    id: 'pure-pashmina-shawl',
    name: 'Pure Pashmina Shawl',
    price: 8500,
    originalPrice: 12000,
    category: 'Pashmina',
    description: 'Authentic hand-woven pure Kashmiri pashmina wool shawl, spun from Ladakhi Changthangi cashmere goat down.',
    story: 'Woven in the old quarters of Srinagar, this shawl represents centuries of textile mastery. Each thread is hand-spun and carefully loomed, offering unmatched luxury weight and soft insulation.',
    care: 'Dry clean only. Store wrapped in organic muslin cloth with cedar blocks.',
    materials: '100% Changthangi Cashmere wool.',
    origin: 'Handcrafted in Srinagar, Kashmir',
    images: [
      '/images/products/media__1779274547753.jpg',
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=800'
    ],
    rating: 4.9,
    reviewsCount: 128,
    badge: 'Deal of the Season',
    inStock: true,
    isDeal: true
  },
  {
    id: 'kashmir-saffron-5g',
    name: 'Kashmir Saffron 5g',
    price: 1800,
    originalPrice: 2200,
    category: 'Saffron',
    description: 'Deep red, long stigma Grade A+ Pampore saffron. Famously rich in Crocin, Safranal, and organic fragrance.',
    story: 'Harvested during a narrow two-week window in Pampore, our saffron crocuses are hand-plucked and dried over slow charcoal. Regarded as the gold standard of organic spices.',
    care: 'Store in an airtight dark glass vial away from direct sunlight and humidity.',
    materials: '100% Pure Crocus Sativus Stigmas (Pampore Harvest).',
    origin: 'Pampore Saffron Fields, Kashmir',
    images: [
      '/images/products/media__1779274547884.jpg',
      'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800'
    ],
    rating: 5.0,
    reviewsCount: 94,
    badge: 'Organic Gold',
    inStock: true,
    isDeal: true
  },
  {
    id: 'mamra-almonds-1kg',
    name: 'Mamra Almonds 1kg',
    price: 1200,
    originalPrice: 1800,
    category: 'Dry Fruits',
    description: 'Concave-shaped premium organic Kashmiri Mamra almonds. High natural oil content and crisp wood-fired taste.',
    story: 'Kashmiri Mamra almonds are smaller and crunchier, containing up to 50% more almond oils than standard California varieties. Hand-sorted and cracked in Pulwama orchards.',
    care: 'Store in a airtight container. Keep refrigerated for prolonged crispness.',
    materials: '100% Raw Kashmiri Mamra Almond Kernels.',
    origin: 'Pulwama Orchard Belts, Kashmir',
    images: [
      '/images/products/media__1779274547785.jpg',
      'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=800'
    ],
    rating: 4.8,
    reviewsCount: 165,
    badge: 'Oil Rich',
    inStock: true,
    isDeal: true
  },
  {
    id: 'kashmiri-walnuts-1kg',
    name: 'Kashmiri Walnuts 1kg',
    price: 950,
    originalPrice: 1400,
    category: 'Dry Fruits',
    description: 'Premium paper-shell Kashmiri walnuts, known for their high brain-boosting Omega-3 oils and rich taste.',
    story: 'Cultivated in the cool mountain belts of Kupwara, these wild walnuts are naturally organic and hand-cracked to preserve the whole kernels.',
    care: 'Store in a cool dry place. Keep in an airtight container.',
    materials: '100% Organic Raw Walnuts.',
    origin: 'Kupwara Orchards, Kashmir',
    images: [
      '/images/products/media__1779274547774.jpg',
      'https://images.unsplash.com/photo-1596003903067-bf5762ad5c18?q=80&w=800'
    ],
    rating: 4.9,
    reviewsCount: 88,
    badge: 'Omega Rich',
    inStock: true,
    isDeal: true
  },
  {
    id: 'silk-carpet-4x6',
    name: 'Silk Carpet 4x6',
    price: 65000,
    originalPrice: 85000,
    category: 'Carpets',
    description: 'Hand-knotted Kashmiri mulberry silk carpet, featuring 324 knots-per-inch Persian Tree of Life layouts.',
    story: 'Crafted on traditional looms in Srinagar over 6 months, this pure silk rug reflects a shifting array of shades depending on lighting angles.',
    care: 'Vacuum vacuum only along the pile. Avoid moisture. Professional rug cleaning recommended.',
    materials: '100% Mulberry Silk Pile, Cotton Warp Base.',
    origin: 'Carpet Guild of Srinagar, Kashmir',
    images: [
      'https://images.unsplash.com/photo-1576016770956-debb63d90029?q=80&w=800',
      'https://images.unsplash.com/photo-1600166898405-da9535204843?q=80&w=800'
    ],
    rating: 5.0,
    reviewsCount: 12,
    badge: 'Collector Heritage',
    inStock: true,
    isDeal: true
  },

  // SECTION 5: RECOMMENDED FOR YOU
  {
    id: 'dried-apricots-500g',
    name: 'Dried Apricots 500g',
    price: 680,
    category: 'Dry Fruits',
    description: 'Wild seedless apricots sun-dried on organic straw mats, containing zero added preservatives or sugars.',
    story: 'Harvested in the remote, high-altitude orchards of Kargil, these apricots dry naturally in dry mountain air, locking in vitamins, fibers, and rich sweet tartness.',
    care: 'Keep in airtight jars in a dark dry pantry or freezer.',
    materials: '100% Organic Sun-Dried Seedless Apricots.',
    origin: 'Kargil Orchards, Ladakh/Kashmir',
    images: [
      '/images/products/media__1779274547762.jpg',
      'https://images.unsplash.com/photo-1596003903067-bf5762ad5c18?q=80&w=800'
    ],
    rating: 4.6,
    reviewsCount: 52,
    badge: '100% Organic',
    inStock: true,
    isRecommended: true
  },
  {
    id: 'kani-shawl',
    name: 'Kani Shawl',
    price: 28000,
    category: 'Pashmina',
    description: 'Traditional Kashmiri Kani weave shawl, hand-loomed with wooden needles (Kanis) using a coded Talim design grid.',
    story: 'This weaving requires translating a poetic script of knots called a Talim into precise weave matrices. A luxury heirloom piece representing over six months of two weavers sitting at a single loom.',
    care: 'Dry clean only. Store flat in cedar chests or wrapped in soft organic sheets.',
    materials: 'Grade-A Pashmina Wool, natural vegetable dyes.',
    origin: 'Kanihama Weaving Village, Kashmir',
    images: [
      'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?q=80&w=800',
      'https://images.unsplash.com/photo-1608748010899-18f300247112?q=80&w=800'
    ],
    rating: 5.0,
    reviewsCount: 19,
    badge: 'Museum Grade',
    inStock: true,
    isRecommended: true
  },
  {
    id: 'walnut-wood-bowl',
    name: 'Walnut Wood Bowl',
    price: 2800,
    category: 'Handicrafts',
    description: 'Single-piece hand-carved seasoning walnut wood salad bowl, detailing native Chinar leaf motifs.',
    story: 'Seasoned for up to 5 years, this bowl is meticulously carved from heavy wild walnut trunks by multi-generational wood sculptors in Safapora.',
    care: 'Wipe with dry cloth. Do not soak or run in a dishwasher. Buff with olive oil to restore glow.',
    materials: 'Seasoned Wild Walnut timber, organic polish.',
    origin: 'Safapora Woodcarvers, Kashmir',
    images: [
      'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?q=80&w=800',
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800'
    ],
    rating: 4.7,
    reviewsCount: 38,
    badge: 'Artisanal Wood',
    inStock: true,
    isRecommended: true
  },
  {
    id: 'paper-mache-box',
    name: 'Paper Mache Box',
    price: 1800,
    category: 'Handicrafts',
    description: 'Hand-crafted paper pulp organizer box, hand-painted with gold Chinar leaves and floral scrolls.',
    story: 'Constructed from mashed recycled paper, molded and sun-dried, then decorated using hair brushes with miniature 24K liquid gold paint highlights.',
    care: 'Wipe clean with a soft dry cloth. Avoid direct sun contact and damp areas.',
    materials: 'Recycled Paper Pulp, Organic dyes, 24K Gold highlights, varnish.',
    origin: 'Rainawari Craft Quarter, Srinagar',
    images: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800'
    ],
    rating: 4.8,
    reviewsCount: 42,
    badge: '24K Painted',
    inStock: true,
    isRecommended: true
  },
  {
    id: 'copper-samovar',
    name: 'Copper Samovar',
    price: 8500,
    category: 'Handicrafts',
    description: 'Classic engraved tinned copper tea-maker samovar, featuring traditional arabesques engravings.',
    story: 'The warm center of Kashmiri gatherings, this copper samovar is tin-plated inside to safely boil water over charcoal, then etched with floral calligraphy outside.',
    care: 'Clean interior with mild soap. Polish brass/copper exterior with a lemon paste.',
    materials: 'Pure Hammered Copper, interior tin plating, wooden safety handle.',
    origin: 'Zaina Kadal Copper Market, Srinagar',
    images: [
      'https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?q=80&w=800',
      'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?q=80&w=800'
    ],
    rating: 5.0,
    reviewsCount: 7,
    badge: 'Engraved Antique',
    inStock: true,
    isRecommended: true
  },
  {
    id: 'crewel-cushion-cover',
    name: 'Crewel Cushion Cover',
    price: 2400,
    category: 'Handicrafts',
    description: 'Thick cotton duck canvas cushion cover, hand-stitched with woolen yarn using classical crewel needle hooks.',
    story: 'Features traditional swirling paisley and floral patterns, hook-embroidered in rural Badgam homes, producing raised details and premium textural durability.',
    care: 'Dry clean only. Gentle iron on the reverse canvas side.',
    materials: '100% Cotton base, 2-ply highland wool embroidery threads.',
    origin: 'Badgam Artisan Guild, Kashmir',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800',
      'https://images.unsplash.com/photo-1576016770956-debb63d90029?q=80&w=800'
    ],
    rating: 4.7,
    reviewsCount: 31,
    badge: 'Hand Hooked',
    inStock: true,
    isRecommended: true
  }
];
