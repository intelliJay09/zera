import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com';

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
    url: `${baseUrl}/blog`,
    siteName: 'Zera',
    type: 'website',
    images: [
      {
        url: '/images/og-zera-sovereign.png',
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
    images: ['/images/og-zera-sovereign.png'],
  },
  alternates: {
    canonical: `${baseUrl}/blog`,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
