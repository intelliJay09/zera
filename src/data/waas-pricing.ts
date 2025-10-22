import { MultiCurrencyPrice } from '@/types/currency';

export interface WaaSPlan {
  id: string;
  name: string;
  tagline: string;
  price: {
    monthly: MultiCurrencyPrice;
  };
  features: {
    category: string;
    items: string[];
  }[];
  cta: {
    text: string;
    href: string;
  };
  popular?: boolean;
}

export const waasPlans: WaaSPlan[] = [
  {
    id: 'business-standard',
    name: 'Business Standard',
    tagline: 'Perfect for new businesses',
    price: {
      monthly: { USD: 285, GHS: 1000 },
    },
    features: [
      {
        category: 'Website Features',
        items: [
          'Up to 5 pages',
          'Mobile responsive design',
          'Product showcase (up to 5 items, catalog only)',
          'Contact forms',
          'SSL certificate included',
        ],
      },
      {
        category: 'Hosting & Support',
        items: [
          'Managed cloud hosting',
          'Standard support (8hr response)',
          '2 minor update requests per month',
          'Weekly backups',
          '99.9% uptime guarantee',
        ],
      },
      {
        category: 'Marketing & SEO',
        items: [
          'Basic SEO (on-page setup only)',
          'Social media integration',
        ],
      },
    ],
    cta: {
      text: 'Get Started',
      href: '/checkout?plan=business-standard',
    },
  },
  {
    id: 'business-commerce',
    name: 'Business Commerce',
    tagline: 'For growing online stores',
    price: {
      monthly: { USD: 570, GHS: 2000 },
    },
    popular: true,
    features: [
      {
        category: 'Website Features',
        items: [
          'Up to 10 pages',
          'Mobile responsive design',
          'E-commerce setup included',
          'Mobile Money & Card payment integration',
          'Up to 25 products listed',
          'Advanced contact forms',
        ],
      },
      {
        category: 'Hosting & Support',
        items: [
          'Managed cloud hosting',
          'Standard support (8hr response)',
          '4 minor update requests per month',
          'Weekly backups',
          '99.9% uptime guarantee',
        ],
      },
      {
        category: 'Marketing & SEO',
        items: [
          'Basic SEO (on-page setup only)',
          'Google Analytics setup',
          'Social media integration',
          'Newsletter signup integration',
        ],
      },
    ],
    cta: {
      text: 'Choose Commerce',
      href: '/checkout?plan=business-commerce',
    },
  },
  {
    id: 'business-growth-plus',
    name: 'Business Growth+',
    tagline: 'Premium features for scaling businesses',
    price: {
      monthly: { USD: 998, GHS: 3500 },
    },
    features: [
      {
        category: 'Website Features',
        items: [
          'Up to 15 pages',
          'Mobile responsive design',
          'E-commerce setup included',
          'Mobile Money & Card payment integration',
          'Up to 50 products listed',
          'Basic booking/appointment system',
          'Advanced custom forms',
        ],
      },
      {
        category: 'Hosting & Support',
        items: [
          'Managed cloud hosting',
          'Priority support (4hr response)',
          '6 minor update requests per month',
          'Weekly backups',
          '99.9% uptime guarantee',
        ],
      },
      {
        category: 'Marketing & SEO',
        items: [
          'Basic SEO + monthly keyword monitoring',
          'Google Analytics & Tag Manager',
          'Social media integration',
          'Newsletter signup integration',
          'Conversion tracking',
        ],
      },
    ],
    cta: {
      text: 'Go Growth+',
      href: '/checkout?plan=business-growth-plus',
    },
  },
];

export function getPlanById(id: string): WaaSPlan | undefined {
  return waasPlans.find((plan) => plan.id === id);
}

export function getPopularPlan(): WaaSPlan | undefined {
  return waasPlans.find((plan) => plan.popular);
}
