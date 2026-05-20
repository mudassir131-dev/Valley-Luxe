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
      '/images/products/media__1779274547753.jpg'
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
      '/images/products/media__1779274547884.jpg'
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
      '/images/products/media__1779274547785.jpg'
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
      '/images/products/media__1779274547774.jpg'
    ],
    rating: 4.9,
    reviewsCount: 88,
    badge: 'Omega Rich',
    inStock: true,
    isDeal: true
  },
  {
    id: 'royal-dry-fruits-gift-box',
    name: 'Royal Dry Fruits Gift Box',
    price: 4500,
    originalPrice: 5500,
    category: 'Dry Fruits',
    description: 'A luxurious wooden lacquered box containing an assortment of premium Kashmiri dry fruits packed in glass jars.',
    story: 'The perfect festive gift representing the bounty of the valley. Hand-packed with love, this assortment features figs, raisins, walnuts, almonds, cashews, and pistachios arranged elegantly.',
    care: 'Keep in a cool dry place. Glass jars are reusable.',
    materials: 'Assorted Nuts, Glass Jars, Wooden Presentation Box.',
    origin: 'Kashmir Valley',
    images: [
      '/images/products/media__1779276494217.jpg'
    ],
    rating: 5.0,
    reviewsCount: 41,
    badge: 'Best Seller',
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
      '/images/products/media__1779274547762.jpg'
    ],
    rating: 4.6,
    reviewsCount: 52,
    badge: '100% Organic',
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
      '/images/products/media__1779276489754.jpg'
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
      '/images/products/media__1779276486405.jpg'
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
      '/images/products/media__1779276483223.jpg'
    ],
    rating: 4.7,
    reviewsCount: 31,
    badge: 'Hand Hooked',
    inStock: true,
    isRecommended: true
  }
];
