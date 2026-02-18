import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com';

export const metadata: Metadata = {
  title: 'Portfolio | Our Work & Case Studies',
  description:
    'Explore our portfolio of digital growth systems, web architecture, and revenue infrastructure built for high-performance brands worldwide.',
  keywords: [
    'Portfolio',
    'Case Studies',
    'Web Design Portfolio',
    'Digital Agency Work',
    'Client Results',
  ],
  openGraph: {
    title: 'Portfolio | ZERA',
    description:
      'Explore our portfolio of digital growth systems built for high-performance brands worldwide.',
    url: `${baseUrl}/portfolio`,
    siteName: 'ZERA',
    type: 'website',
    images: [
      {
        url: '/images/og-zera-sovereign.png',
        width: 3000,
        height: 1575,
        alt: 'ZERA Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | ZERA',
    description:
      'Digital growth systems built for high-performance brands worldwide.',
    site: '@zerahq',
    creator: '@zerahq',
    images: ['/images/og-zera-sovereign.png'],
  },
  alternates: {
    canonical: `${baseUrl}/portfolio`,
  },
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-cream-200 pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="font-display uppercase text-4xl font-bold text-near-black sm:text-5xl mb-6 tracking-brand-header">
          OUR WORK
        </h1>
        <p className="text-lg text-near-black/70 font-normal tracking-normal">
          Case studies and success stories. Content coming soon...
        </p>
      </div>
    </main>
  );
}
