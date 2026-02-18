import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com';

export const metadata: Metadata = {
  title: 'Blog | Digital Growth Intelligence',
  description:
    'Strategic insights on web architecture, SEO, revenue systems, and digital infrastructure. Intelligence from the ZERA Directorate for high-performance brands.',
  keywords: [
    'Digital Growth Blog',
    'SEO Strategy',
    'Web Architecture',
    'Revenue Systems',
    'Digital Marketing Insights',
    'Business Growth',
  ],
  openGraph: {
    title: 'Blog | ZERA Digital Growth Intelligence',
    description:
      'Strategic insights on web architecture, SEO, revenue systems, and digital infrastructure.',
    url: `${baseUrl}/blog`,
    siteName: 'ZERA',
    type: 'website',
    images: [
      {
        url: '/images/og-zera-sovereign.png',
        width: 3000,
        height: 1575,
        alt: 'ZERA Blog - Digital Growth Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | ZERA Digital Growth Intelligence',
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
