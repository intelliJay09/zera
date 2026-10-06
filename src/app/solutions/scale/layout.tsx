import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Scale | SEO, Social Media & Content Creation',
  description:
    'Amplify your reach with data-driven SEO, strategic social media management, and AI-powered content creation. Growth services for ambitious brands.',
  keywords: [
    'SEO Services',
    'Social Media Management',
    'Content Creation',
    'Digital Marketing',
    'Growth Strategy',
    'Search Engine Optimization Ghana',
  ],
  openGraph: {
    title: 'Scale Your Growth | ZERA',
    description:
      'Data-driven SEO, strategic social media management, and AI-powered content creation for ambitious brands.',
    url: `${SITE_URL}/solutions/scale`,
    siteName: 'ZERA',
    type: 'website',
    images: [
      {
        url: '/images/og-zera-primary.png',
        width: 3000,
        height: 1575,
        alt: 'ZERA Scale Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scale Your Growth | ZERA',
    description:
      'Data-driven SEO, strategic social media management, and AI-powered content creation.',
    site: '@zerahq',
    creator: '@zerahq',
    images: ['/images/og-zera-primary.png'],
  },
  alternates: {
    canonical: `${SITE_URL}/solutions/scale`,
  },
};

export default function ScaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
