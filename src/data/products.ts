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
    duration: '180 Days',
    assetName: 'THE DIGITAL HQ',
    promise: 'Secure the territory.',
    tagline: 'We build your permanent base of operations.',
    deliverables: [
      {
        title: 'Commercial Web Architecture',
        description:
          'A high-performance website engineered for conversion and speed.',
      },
      {
        title: 'Search Entity & Authority Registration',
        description:
          'We make Google recognize your business as an authority — not just a website.',
      },
      {
        title: 'Technical SEO Foundation',
        description:
          'Site architecture, Core Web Vitals, and structured data. Built to rank from day one.',
      },
      {
        title: 'Analytics Foundation',
        description:
          'GTM and GA4 with conversion tracking. The intelligence layer everything else depends on.',
      },
      {
        title: 'Payment Infrastructure',
        description:
          'Payment gateway integration so your website collects revenue directly.',
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
        why: 'A standard Contact Us page leaks revenue. A Pipeline captures it.',
      },
      {
        title: 'The Lead Capture Engine',
        description:
          'CRM integration that instantly captures, tags, and sequences every lead — regardless of source.',
      },
      {
        title: 'The Automation Architecture',
        description:
          'We engineer and deploy a proprietary workflow automation infrastructure across your entire business. Every lead entry triggers instant tagging, pipeline routing, team notifications, and onboarding sequences — zero manual intervention.',
      },
      {
        title: 'The Lead Magnet System',
        description:
          'A downloadable asset that converts cold visitors into owned subscribers — no social platform required.',
      },
      {
        title: 'The Operations Bridge',
        description:
          'We eliminate your team\'s manual follow-up cycles and communication overhead. Automated retainer protocols, dynamic scheduling systems, and real-time operational alerts — your business executes without the bottlenecks.',
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
          'We engineer cross-system data routing that automatically moves leads between CRMs with customized executive follow-up sequences — your entire customer base managed on autopilot.',
      },
      {
        title: 'The Win-Back Protocol',
        description:
          'A dedicated reactivation system that identifies dormant leads, scores their re-entry likelihood, and deploys precision sequences to convert them back into revenue.',
      },
      {
        title: 'The LTV Strategy',
        description:
          'A year-long operational calendar engineered to maximize Lifetime Value — structured around your revenue cycles, not arbitrary send schedules.',
      },
      {
        title: 'The Audience Infrastructure',
        description:
          'Automated onboarding and segmentation systems that route new contacts into the correct pipeline based on their source, behavior, and intent — zero manual sorting.',
      },
      {
        title: 'Scalable Revenue Architecture',
        description:
          'We build the data infrastructure that allows your business to generate revenue from multiple channels simultaneously — digital assets, events, and automated monetization running in parallel.',
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
