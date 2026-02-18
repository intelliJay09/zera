import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com';

export const metadata: Metadata = {
  title: 'Build | Web Development, Software & Brand Design',
  description:
    'Establish your digital presence with custom web development, software solutions, and brand identity design. Foundation services for high-performance brands.',
  keywords: [
    'Web Development',
    'Custom Software',
    'Brand Design',
    'Digital Presence',
    'Website Design Ghana',
    'App Development',
  ],
  openGraph: {
    title: 'Build Your Digital Presence | ZERA',
    description:
      'Custom web development, software solutions, and brand identity design for high-performance brands.',
    url: `${baseUrl}/solutions/build`,
    siteName: 'ZERA',
    type: 'website',
    images: [
      {
        url: '/images/og-zera-sovereign.png',
        width: 3000,
        height: 1575,
        alt: 'ZERA Build Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Build Your Digital Presence | ZERA',
    description:
      'Custom web development, software solutions, and brand identity design.',
    site: '@zerahq',
    creator: '@zerahq',
    images: ['/images/og-zera-sovereign.png'],
  },
  alternates: {
    canonical: `${baseUrl}/solutions/build`,
  },
};

export default function BuildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
