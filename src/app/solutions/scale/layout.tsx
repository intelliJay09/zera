import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com';

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
    url: `${baseUrl}/solutions/scale`,
    siteName: 'ZERA',
    type: 'website',
    images: [
      {
        url: '/images/og-zera-sovereign.png',
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
    images: ['/images/og-zera-sovereign.png'],
  },
  alternates: {
    canonical: `${baseUrl}/solutions/scale`,
  },
};

export default function ScaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
