import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Brand Development | Complete Brand Strategy & Identity',
  description:
    'Complete brand strategy, visual identity systems, and brand positioning for high-performance brands. From logo design to comprehensive brand guidelines.',
  keywords: [
    'Brand Development',
    'Brand Strategy',
    'Brand Positioning',
    'Visual Identity',
    'Brand Guidelines',
    'Brand Design Agency',
  ],
  openGraph: {
    title: 'Brand Development | ZERA',
    description:
      'Complete brand strategy, visual identity systems, and positioning for high-performance brands.',
    url: `${SITE_URL}/solutions/brand-development`,
    siteName: 'ZERA',
    type: 'website',
    images: [
      {
        url: '/images/og-zera-primary.png',
        width: 3000,
        height: 1575,
        alt: 'ZERA Brand Development',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand Development | ZERA',
    description:
      'Complete brand strategy and visual identity for high-performance brands.',
    site: '@zerahq',
    creator: '@zerahq',
    images: ['/images/og-zera-primary.png'],
  },
  alternates: {
    canonical: `${SITE_URL}/solutions/brand-development`,
  },
};

export default function BrandDevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
