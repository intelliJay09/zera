import { Metadata } from 'next';
import DigitalHQContent from './DigitalHQContent';

export const metadata: Metadata = {
  title: 'The Digital HQ | Commercial Web Architecture & Entity SEO',
  description:
    'A commercial-grade web architecture designed to secure search authority and brand legitimacy. Stop looking like a freelancer. Deploy a Digital HQ.',
  keywords: [
    'commercial web architecture',
    'entity SEO',
    'search authority',
    'brand legitimacy',
    'professional web development',
    'Next.js',
    'corporate website design',
  ],
  openGraph: {
    title: 'The Digital HQ | Build Your Digital Asset',
    description:
      'Most websites are liabilities. We build assets. Commercial architecture for market leaders.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com'}/products/digital-hq`,
    type: 'website',
    images: [
      {
        url: '/images/og-zera-sovereign.png',
        width: 3000,
        height: 1575,
        alt: 'The Digital HQ - Commercial Web Architecture & Entity SEO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Digital HQ | Build Your Digital Asset',
    description:
      'Most websites are liabilities. We build assets. Commercial architecture for market leaders.',
    images: ['/images/og-zera-sovereign.png'],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com'}/products/digital-hq`,
  },
};

export default function DigitalHQPage() {
  return <DigitalHQContent />;
}
