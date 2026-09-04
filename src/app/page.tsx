'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  heroHeadline,
} from '@/lib/animation-variants';

const LiquidEther = dynamic(() => import('@/components/backgrounds/LiquidEther'));
const TrustedByLogos = dynamic(() => import('@/components/sections/TrustedByLogos'));
const ServiceTierGrid = dynamic(() => import('@/components/sections/ServiceTierGrid'));
const ResultsMetrics = dynamic(() => import('@/components/sections/ResultsMetrics'));
const ClientTestimonials = dynamic(() => import('@/components/sections/ClientTestimonials'));
const EngagementProtocol = dynamic(() => import('@/components/sections/EngagementProtocol'));
const FAQSection = dynamic(() => import('@/components/sections/FAQSection'));
const FinalCTA = dynamic(() => import('@/components/sections/FinalCTA'));

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Schema Markup for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfessionalService',
            name: 'Zera',
            alternateName: 'Zera HQ',
            description:
              'Zera builds and runs the systems that turn leads into revenue and keep customers from quietly leaving, proving results every month.',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Accra',
              addressCountry: 'Ghana',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: '5.6037',
              longitude: '-0.1870',
            },
            url: process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com',
            email: 'hello@zerahq.com',
            telephone: '+233246492873',
            priceRange: '$$$$',
            areaServed: {
              '@type': 'Place',
              name: 'Global',
            },
            serviceType: [
              'Commercial Web Architecture',
              'Search Engine Optimization',
              'Automated Lead Generation',
              'Customer Retention Systems',
              'CRM Integration',
            ],
          }),
        }}
      />

      {/* Hero Section */}
      <main className="relative min-h-[80vh] sm:min-h-screen flex items-center">
        <LiquidEther />
        <div className="mx-auto max-w-7xl px-4 pt-44 pb-32 sm:px-6 sm:py-40 md:py-48 lg:px-8 w-full">
          <div className="text-center">
            <motion.h1
              className="text-[3.5rem] sm:text-7xl xl:text-8xl font-display font-bold text-copper-500 tracking-normal leading-[1.1] mb-8"
              initial="hidden"
              animate="visible"
              variants={heroHeadline}
            >
              Revenue, Realized.
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
              className="h-[2px] w-10 bg-copper-500 mx-auto mb-8 origin-center"
            />

            <motion.h2
              className="text-sm sm:text-base lg:text-sm font-normal text-cream-50/70 tracking-normal mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 1.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              Zera catches the revenue your business is already losing: the lead that goes
              unanswered, the customer who quietly stops buying. And proves it, every month,
              in real numbers.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.92, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              transition={{
                duration: 1.0,
                delay: 1.8,
                ease: [0.25, 0.85, 0.35, 1.0],
              }}
              className="flex flex-col items-center gap-4"
            >
              <Button asChild variant="primary" size="lg" className="group">
                <Link href="/systems-audit" data-gtm-event="cta_book_strategy" data-gtm-location="hero">
                  Book your systems audit
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 group-hover:scale-110 transition-all duration-300" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Trusted By Logos Section */}
      <TrustedByLogos />

      {/* Introduction Section */}
      <section className="bg-cream-200 pt-12 pb-8 sm:pt-16 sm:pb-12 md:pt-20 md:pb-14">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          {/* Decorative Divider */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-[1px] w-32 bg-copper-500 mx-auto mb-12 sm:mb-16"
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center max-w-4xl mx-auto text-lg sm:text-xl text-near-black/70 font-normal leading-relaxed"
          >
            Stop operating on manual processes and scattered tactics. ZERA architects automated
            operational systems that eliminate bottlenecks, route leads with precision, and build
            the revenue infrastructure that scales your business without adding overhead.
          </motion.p>
        </div>
      </section>

      {/* Service Tier Grid - Three Phases */}
      <ServiceTierGrid />

      {/* Results Metrics Section */}
      <ResultsMetrics />

      {/* Client Testimonials Section */}
      <ClientTestimonials />

      {/* Engagement Protocol Section */}
      <EngagementProtocol />

      {/* Divider */}
      <div className="bg-cream py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-[1px] w-32 bg-copper-500 mx-auto"
          />
        </div>
      </div>

      {/* FAQ Section - SEO Honey Pot */}
      <FAQSection />

      {/* Final CTA Section */}
      <FinalCTA />
    </>
  );
}
