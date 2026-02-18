import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com';

export const metadata: Metadata = {
  title: 'Products | Digital Growth Systems',
  description:
    'Three-tier digital growth systems engineered for market sovereignty. From Digital HQ to Market Monopoly — choose the system that matches your ambition.',
  keywords: [
    'Digital Growth Systems',
    'Web Development Packages',
    'SEO Packages',
    'Revenue Automation',
    'Digital HQ',
    'Growth System',
    'Market Monopoly',
  ],
  openGraph: {
    title: 'Products | ZERA Digital Growth Systems',
    description:
      'Three-tier digital growth systems engineered for market sovereignty. From Digital HQ to Market Monopoly.',
    url: `${baseUrl}/products`,
    siteName: 'ZERA',
    type: 'website',
    images: [
      {
        url: '/images/og-zera-sovereign.png',
        width: 3000,
        height: 1575,
        alt: 'ZERA Digital Growth Systems - Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products | ZERA Digital Growth Systems',
    description:
      'Three-tier digital growth systems engineered for market sovereignty.',
    site: '@zerahq',
    creator: '@zerahq',
    images: ['/images/og-zera-sovereign.png'],
  },
  alternates: {
    canonical: `${baseUrl}/products`,
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
