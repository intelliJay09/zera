import { Metadata } from 'next';
import DigitalHQContent from './DigitalHQContent';

export const metadata: Metadata = {
  title: 'The Digital HQ - Your Revenue Command Center | Commercial Web Architecture',
  description:
    'A commercial-grade web architecture engineered for revenue and search authority, built to convert from day one.',
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
      'A website built to convert from day one, engineered for search authority and lead capture, not just designed to look good.',
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
      'A website built to convert from day one, engineered for search authority and lead capture, not just designed to look good.',
    images: ['/images/og-zera-sovereign.png'],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com'}/products/digital-hq`,
  },
};

export default function DigitalHQPage() {
  return <DigitalHQContent />;
}
