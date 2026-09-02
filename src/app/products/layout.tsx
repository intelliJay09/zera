import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com';

export const metadata: Metadata = {
  title: 'Products',
  description:
    'Three tiers, one job: catch the revenue your business is already losing. From Digital HQ to The Retention Engine, pick the system that matches where you actually lose money.',
  keywords: [
    'Revenue Systems',
    'Web Development Packages',
    'SEO Packages',
    'Revenue Automation',
    'Digital HQ',
    'The Velocity System',
    'The Retention Engine',
  ],
  openGraph: {
    title: 'Products | Zera',
    description:
      'Three tiers, one job: catch the revenue your business is already losing. From Digital HQ to The Retention Engine.',
    url: `${baseUrl}/products`,
    siteName: 'Zera',
    type: 'website',
    images: [
      {
        url: '/images/og-zera-primary.png',
        width: 3000,
        height: 1575,
        alt: 'Zera Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products | Zera',
    description:
      'Three tiers, one job: catch the revenue your business is already losing.',
    site: '@zerahq',
    creator: '@zerahq',
    images: ['/images/og-zera-primary.png'],
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
