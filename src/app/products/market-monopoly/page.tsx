import { Metadata } from 'next';
import MarketMonopolyContent from './MarketMonopolyContent';

export const metadata: Metadata = {
  title: 'The Retention Engine | Customer Retention & LTV Strategy',
  description:
    'Maximize yield from your existing database. We engineer the Win-Back Protocols and lifecycle ecosystems that turn customers into a recurring asset class.',
  keywords: [
    'customer retention systems',
    'lifetime value optimization',
    'lifecycle automation',
    'win-back protocols',
    'LTV optimization',
    'recurring revenue systems',
  ],
  openGraph: {
    title: 'The Retention Engine | Keep the Customers You Already Have',
    description:
      'Scale requires retention. We engineer the systems that keep your customers paying forever.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com'}/products/market-monopoly`,
    type: 'website',
    images: [
      {
        url: '/images/og-zera-primary.png',
        width: 3000,
        height: 1575,
        alt: 'The Retention Engine - Customer Retention & LTV Strategy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Retention Engine | Keep the Customers You Already Have',
    description:
      'Scale requires retention. We engineer the systems that keep your customers paying forever.',
    images: ['/images/og-zera-primary.png'],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com'}/products/market-monopoly`,
  },
};

export default function MarketMonopolyPage() {
  return <MarketMonopolyContent />;
}
