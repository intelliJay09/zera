import { Metadata } from 'next';
import MarketMonopolyContent from './MarketMonopolyContent';

export const metadata: Metadata = {
  title: 'The Market Monopoly | Customer Retention & LTV Strategy',
  description:
    'Maximize yield from your existing database. We engineer the "Win-Back Protocols" and lifecycle ecosystems that turn customers into a recurring asset class.',
  keywords: [
    'customer retention systems',
    'lifetime value optimization',
    'email marketing automation',
    'win-back campaigns',
    'LTV optimization',
    'recurring revenue systems',
  ],
  openGraph: {
    title: 'The Market Monopoly | Dominate Your Category',
    description:
      'Scale requires retention. We engineer the systems that keep your customers paying forever.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com'}/products/market-monopoly`,
    type: 'website',
    images: [
      {
        url: '/images/og-zera-sovereign.png',
        width: 3000,
        height: 1575,
        alt: 'The Market Monopoly - Customer Retention & LTV Strategy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Market Monopoly | Dominate Your Category',
    description:
      'Scale requires retention. We engineer the systems that keep your customers paying forever.',
    images: ['/images/og-zera-sovereign.png'],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com'}/products/market-monopoly`,
  },
};

export default function MarketMonopolyPage() {
  return <MarketMonopolyContent />;
}
