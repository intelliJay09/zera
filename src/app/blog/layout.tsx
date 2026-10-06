import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Strategic insights on web architecture, SEO, revenue systems, and digital infrastructure from the Zera team.',
  keywords: [
    'Digital Growth Blog',
    'SEO Strategy',
    'Web Architecture',
    'Revenue Systems',
    'Revenue Operations Intelligence',
    'Business Growth',
  ],
  openGraph: {
    title: 'Blog | Zera',
    description:
      'Strategic insights on web architecture, SEO, revenue systems, and digital infrastructure.',
    url: `${SITE_URL}/blog`,
    siteName: 'Zera',
    type: 'website',
    images: [
      {
        url: '/images/og-zera-primary.png',
        width: 3000,
        height: 1575,
        alt: 'Zera Blog',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Zera',
    description:
      'Strategic insights on web architecture, SEO, revenue systems, and digital infrastructure.',
    site: '@zerahq',
    creator: '@zerahq',
    images: ['/images/og-zera-primary.png'],
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
