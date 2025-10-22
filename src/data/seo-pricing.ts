import { MultiCurrencyPrice } from '@/types/currency';

export interface SEOPlan {
  name: string;
  price: MultiCurrencyPrice | 'Custom';
  period: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  featured: boolean;
}

export const seoPricingPlans: SEOPlan[] = [
  {
    name: 'Foundation',
    price: { USD: 300, GHS: 2000 },
    period: 'per month',
    description: 'Essential SEO for growing businesses ready to establish organic visibility',
    features: [
      'Technical SEO audit & fixes',
      'On-page optimization (up to 10 pages)',
      '2 SEO-optimized blog posts/month',
      'Monthly ranking reports',
      'Google Business Profile setup',
      'Basic link building (5 quality links/month)',
    ],
    cta: 'Start Growing',
    href: '/contact?service=seo&plan=foundation',
    featured: false,
  },
  {
    name: 'Growth',
    price: { USD: 500, GHS: 4000 },
    period: 'per month',
    description: 'Comprehensive SEO strategy for businesses serious about dominating search',
    features: [
      'Everything in Foundation',
      'Advanced technical optimization',
      'On-page optimization (up to 25 pages)',
      '4 SEO-optimized blog posts/month',
      'Competitive gap analysis',
      'Strategic link building (15 quality links/month)',
      'Conversion rate optimization',
      'Bi-weekly strategy calls',
    ],
    cta: 'Accelerate Growth',
    href: '/contact?service=seo&plan=growth',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'tailored pricing',
    description: 'White-glove SEO for established brands and high-stakes campaigns',
    features: [
      'Everything in Growth',
      'Dedicated SEO strategist',
      'Unlimited page optimization',
      '8+ SEO-optimized content pieces/month',
      'Digital PR & content partnerships',
      'Advanced link acquisition (30+ quality links/month)',
      'Custom reporting dashboard',
      'Weekly strategy sessions',
      'International SEO support',
    ],
    cta: 'Get Custom Quote',
    href: '/contact?service=seo&plan=enterprise',
    featured: false,
  },
];
