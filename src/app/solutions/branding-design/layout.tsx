import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com';

export const metadata: Metadata = {
  title: 'Branding & Design | Premium Identity Systems',
  description:
    'Premium brand identity design for ambitious brands. Logo design, visual identity systems, brand guidelines, and marketing collateral that communicate authority.',
  keywords: [
    'Brand Identity Design',
    'Logo Design',
    'Visual Identity',
    'Brand Guidelines',
    'Graphic Design',
    'Branding Agency Ghana',
  ],
  openGraph: {
    title: 'Branding & Design | ZERA',
    description:
      'Premium brand identity design for ambitious brands. Visual identity systems that communicate authority.',
    url: `${baseUrl}/solutions/branding-design`,
    siteName: 'ZERA',
    type: 'website',
    images: [
      {
        url: '/images/og-zera-sovereign.png',
        width: 3000,
        height: 1575,
        alt: 'ZERA Branding & Design',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Branding & Design | ZERA',
    description:
      'Premium brand identity design for ambitious brands.',
    site: '@zerahq',
    creator: '@zerahq',
    images: ['/images/og-zera-sovereign.png'],
  },
  alternates: {
    canonical: `${baseUrl}/solutions/branding-design`,
  },
};

export default function BrandingDesignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
