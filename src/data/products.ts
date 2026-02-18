export interface ProductDeliverable {
  title: string;
  description: string;
  why?: string;
}

export interface ProductTier {
  tier: 'I' | 'II' | 'III';
  tierNumber: number;
  duration: string;
  assetName: string;
  promise: string;
  tagline: string;
  deliverables: ProductDeliverable[];
  slug: string;
  featured: boolean;
}

export const PRODUCT_TIERS: ProductTier[] = [
  {
    tier: 'I',
    tierNumber: 1,
    duration: '90 Days',
    assetName: 'THE DIGITAL HQ',
    promise: 'Secure the territory.',
    tagline: 'We build your permanent base of operations.',
    deliverables: [
      {
        title: 'Commercial Web Architecture',
        description:
          'A high-performance website built to convert, not just look good.',
      },
      {
        title: 'Search Entity Setup',
        description:
          'We register your business as an authority with Google so you rank for your own name.',
      },
    ],
    slug: 'digital-hq',
    featured: true,
  },
  {
    tier: 'II',
    tierNumber: 2,
    duration: '180 Days',
    assetName: 'THE GROWTH SYSTEM',
    promise: 'Automate the momentum.',
    tagline: 'The Promise: Automate the momentum.',
    deliverables: [
      {
        title: 'Lead Acquisition Pipelines',
        description:
          'We build pages and forms that guide visitors to a single goal—booking a call or buying a product.',
        why: 'A standard "Contact Us" page leaks revenue. A "Pipeline" captures it.',
      },
      {
        title: 'The Lead Capture Engine',
        description:
          'We connect your website directly to a CRM database. Whether a lead comes from Google, a referral, or a cold email, they are instantly captured, tagged, and sent an automated "Welcome" email.',
      },
      {
        title: 'The Traffic Converter (CRO)',
        description:
          'We install tracking tools (heatmaps/analytics) to watch how people use your site. We then tweak your headlines, buttons, and layouts to turn more of your existing visitors into customers.',
      },
    ],
    slug: 'growth-system',
    featured: true,
  },
  {
    tier: 'III',
    tierNumber: 3,
    duration: '365 Days',
    assetName: 'THE MARKET MONOPOLY',
    promise: 'Maximize the yield.',
    tagline: 'We turn customers into an asset class that pays you forever.',
    deliverables: [
      {
        title: 'The Lifecycle Ecosystem',
        description:
          'We build automated email & SMS flows that resell to your customers automatically.',
      },
      {
        title: 'The "Win-Back" Protocol',
        description:
          'A dedicated system to reactivate "dead" leads and turn them into revenue.',
      },
      {
        title: 'The LTV Strategy',
        description:
          'A year-long campaign calendar designed to maximize the Lifetime Value (LTV) of every client.',
      },
    ],
    slug: 'market-monopoly',
    featured: true,
  },
];

/**
 * Get a product tier by its tier number (I, II, III)
 */
export function getProductByTier(tier: 'I' | 'II' | 'III'): ProductTier | undefined {
  return PRODUCT_TIERS.find((product) => product.tier === tier);
}

/**
 * Get a product tier by its slug
 */
export function getProductBySlug(slug: string): ProductTier | undefined {
  return PRODUCT_TIERS.find((product) => product.slug === slug);
}

/**
 * Get all featured products
 */
export function getFeaturedProducts(): ProductTier[] {
  return PRODUCT_TIERS.filter((product) => product.featured);
}

/**
 * Get the next product tier (for upsell suggestions)
 */
export function getNextTier(currentTier: 'I' | 'II' | 'III'): ProductTier | null {
  const currentProduct = getProductByTier(currentTier);
  if (!currentProduct) return null;

  const nextTierNumber = currentProduct.tierNumber + 1;
  return PRODUCT_TIERS.find((product) => product.tierNumber === nextTierNumber) || null;
}

/**
 * Get the previous product tier (for downgrade suggestions)
 */
export function getPreviousTier(currentTier: 'I' | 'II' | 'III'): ProductTier | null {
  const currentProduct = getProductByTier(currentTier);
  if (!currentProduct) return null;

  const previousTierNumber = currentProduct.tierNumber - 1;
  return PRODUCT_TIERS.find((product) => product.tierNumber === previousTierNumber) || null;
}
