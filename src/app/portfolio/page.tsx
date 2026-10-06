import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { CASE_STUDIES } from '@/data/case-studies';
import CaseStudyCard from '@/components/sections/CaseStudyCard';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com';

export const metadata: Metadata = {
  title: 'Portfolio | Our Work & Case Studies',
  description:
    'Case studies from Zera: the revenue systems, websites and brand work we have built for Gwen Addo, Allure Bloom and Finest Dietitian.',
  keywords: [
    'Portfolio',
    'Case Studies',
    'Web Design Portfolio',
    'Operational Systems Work',
    'Client Results',
  ],
  openGraph: {
    title: 'Portfolio | ZERA',
    description:
      'Case studies from Zera: the revenue systems, websites and brand work we have built for our clients.',
    url: `${baseUrl}/portfolio`,
    siteName: 'ZERA',
    type: 'website',
    images: [
      {
        url: '/images/og-zera-primary.png',
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
      'Case studies from Zera: the revenue systems, websites and brand work we have built for our clients.',
    site: '@zerahq',
    creator: '@zerahq',
    images: ['/images/og-zera-primary.png'],
  },
  alternates: {
    canonical: `${baseUrl}/portfolio`,
  },
};

export default function PortfolioPage() {
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Zera Case Studies',
    url: `${baseUrl}/portfolio`,
    hasPart: CASE_STUDIES.map((study) => ({
      '@type': 'Article',
      headline: study.headline,
      url: `${baseUrl}/portfolio/${study.slug}`,
      about: { '@type': 'Organization', name: study.client },
    })),
  };

  return (
    <main className="min-h-screen bg-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Hero Section */}
      <section className="relative bg-cream pt-32 pb-12 sm:pt-40 sm:pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-copper-500/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-copper-500/20 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-sm font-medium tracking-brand-label uppercase text-copper-700 mb-6">
              CASE STUDIES
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-display uppercase text-near-black tracking-brand-header mb-6 leading-[1.1]">
              OUR WORK
            </h1>
            <p className="text-lg sm:text-xl text-near-black/70 leading-relaxed max-w-3xl mx-auto">
              What we built for each client, why it mattered to their business, and what it has produced so far.
            </p>
          </div>
        </div>
      </section>

      {/* Case Study Grid */}
      <section className="relative bg-cream pb-16 sm:pb-20 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {CASE_STUDIES.map((study, index) => (
              <CaseStudyCard key={study.slug} study={study} index={index} headingLevel="h2" />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative bg-near-black py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-copper-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase text-white tracking-brand-header mb-6">
              YOUR BUSINESS COULD BE NEXT
            </h2>
            <p className="text-lg text-white/70 mb-10">
              Start with a systems audit. We will show you where revenue is leaking and what to build first.
            </p>
            <Link
              href="/systems-audit"
              data-gtm-event="cta_book_strategy"
              data-gtm-location="portfolio"
              className="group inline-flex items-center justify-center gap-3 bg-copper-500 hover:bg-copper-600 hover:scale-[1.02] text-white font-medium text-base tracking-brand-label uppercase px-8 py-3.5 min-h-[44px] transition-all duration-300 w-fit shadow-lg shadow-copper-500/10 hover:shadow-2xl hover:shadow-copper-500/25"
            >
              Book Your Systems Audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 group-hover:scale-110 transition-all duration-300" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
