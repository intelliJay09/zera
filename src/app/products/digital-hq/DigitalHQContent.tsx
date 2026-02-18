'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Zap, Shield, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { elegantEase } from '@/lib/animation-variants';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const EngagementProtocol = dynamic(() => import('@/components/sections/EngagementProtocol'));

export default function DigitalHQContent() {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Service JSON-LD Schema for Digital HQ
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Commercial Web Architecture',
    name: 'The Digital Headquarters',
    description: 'A commercial-grade web architecture designed to establish immediate legitimacy and search entity authority.',
    provider: {
      '@type': 'Organization',
      name: 'ZERA',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Global',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Digital Headquarters',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Next.js Web Development',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Entity SEO Setup',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Commercial Web Design',
          },
        },
      ],
    },
  };

  return (
    <div className="bg-near-black">
      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      {/* Hero Section - Industrial/High-Contrast */}
      <section className="relative min-h-[70vh] flex items-center justify-center px-6 py-32 bg-near-black border-b border-copper-500/10">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(191,138,100,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(191,138,100,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: elegantEase }}
          className="relative z-10 max-w-5xl mx-auto text-center"
        >
          <div className="inline-block px-4 py-1 bg-copper-500/10 border border-copper-500/30 mb-6">
            <span className="text-xs font-mono uppercase tracking-wider text-copper-500">
              TIER I • FOUNDATION LAYER
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-8xl font-bold uppercase text-cream-50 mb-8 tracking-tight leading-[0.9]">
            THE DIGITAL
            <br />
            <span className="text-copper-500">HEADQUARTERS</span>
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-cream-50/80 mb-4 tracking-tight">
            Secure Your Territory.
          </p>

          <p className="text-lg text-cream-50/60 max-w-3xl mx-auto font-mono mb-12">
            A commercial-grade web architecture designed to establish immediate legitimacy and
            search entity authority. Stop looking like a freelancer. Look like an institution.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: elegantEase, delay: 0.4 }}
          >
            <Button
              asChild
              size="default"
              className="w-fit bg-copper-500 hover:bg-copper-600 text-cream-50 font-semibold shadow-xl"
            >
              <Link href="/booking" data-gtm-event="cta_book_strategy" data-gtm-location="product_digital_hq_hero">DEPLOY SYSTEM</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* The 'Pain' Block - White Background */}
      <section className="py-24 px-6 bg-cream-50">
        <motion.div
          initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: elegantEase }}
          className="max-w-4xl mx-auto"
        >
          <div className="border-l-4 border-copper-500 pl-8">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-near-black mb-6 tracking-tight">
              THE INVISIBLE PROBLEM
            </h2>
            <p className="text-xl text-near-black/80 leading-relaxed font-light">
              Your business is credible offline, but invisible online. You are losing high-value
              contracts because your digital presence looks cheap or non-existent. You don&apos;t
              need a brochure; you need a Headquarters.
            </p>
          </div>
        </motion.div>
      </section>

      {/* The 'Specs' Grid - Dark Charcoal Background */}
      <section className="py-24 px-6 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: elegantEase }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-cream-50 mb-16 tracking-tight text-center"
          >
            SYSTEM SPECIFICATIONS
          </motion.h2>

          <div className="space-y-8">
            {/* Feature A */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: elegantEase, delay: 0 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 p-8 bg-near-black/50 border border-copper-500/20 hover:border-copper-500/40 transition-colors duration-500"
            >
              <div className="md:col-span-2 flex items-start">
                <div className="w-14 h-14 flex items-center justify-center bg-copper-500/10 border border-copper-500/30">
                  <Zap className="h-7 w-7 text-copper-500" strokeWidth={2} />
                </div>
              </div>
              <div className="md:col-span-10 space-y-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-copper-500">FEATURE A</span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-cream-50 mt-1 tracking-tight">
                    Commercial Web Architecture
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-mono uppercase tracking-wider text-cream-50/60 mb-1">Deliverable</div>
                    <div className="text-sm sm:text-base text-cream-50/90">7-Page Server-Side Rendered Architecture</div>
                  </div>
                  <div>
                    <div className="text-sm font-mono uppercase tracking-wider text-cream-50/60 mb-1">Engineering</div>
                    <div className="text-sm sm:text-base text-cream-50/90">Sub-2-second load time, mobile-first responsive design, and conversion-optimized layouts</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature B */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: elegantEase, delay: 0.15 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 p-8 bg-near-black/50 border border-copper-500/20 hover:border-copper-500/40 transition-colors duration-500"
            >
              <div className="md:col-span-2 flex items-start">
                <div className="w-14 h-14 flex items-center justify-center bg-copper-500/10 border border-copper-500/30">
                  <Shield className="h-7 w-7 text-copper-500" strokeWidth={2} />
                </div>
              </div>
              <div className="md:col-span-10 space-y-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-copper-500">FEATURE B</span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-cream-50 mt-1 tracking-tight">
                    Search Entity Setup (SEO)
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-mono uppercase tracking-wider text-cream-50/60 mb-1">Deliverable</div>
                    <div className="text-sm sm:text-base text-cream-50/90">Search Entity Registration & Knowledge Graph Optimization</div>
                  </div>
                  <div>
                    <div className="text-sm font-mono uppercase tracking-wider text-cream-50/60 mb-1">Engineering</div>
                    <div className="text-sm sm:text-base text-cream-50/90">Register your business as a recognized search entity, configure structured data markup, and claim local search authority</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature C */}
            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: elegantEase, delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 p-8 bg-near-black/50 border border-copper-500/20 hover:border-copper-500/40 transition-colors duration-500"
            >
              <div className="md:col-span-2 flex items-start">
                <div className="w-14 h-14 flex items-center justify-center bg-copper-500/10 border border-copper-500/30">
                  <BarChart3 className="h-7 w-7 text-copper-500" strokeWidth={2} />
                </div>
              </div>
              <div className="md:col-span-10 space-y-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-copper-500">FEATURE C</span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-cream-50 mt-1 tracking-tight">
                    Data Infrastructure (The Black Box)
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-mono uppercase tracking-wider text-cream-50/60 mb-1">Deliverable</div>
                    <div className="text-sm sm:text-base text-cream-50/90">Complete Analytics & Tracking Infrastructure</div>
                  </div>
                  <div>
                    <div className="text-sm font-mono uppercase tracking-wider text-cream-50/60 mb-1">Engineering</div>
                    <div className="text-sm sm:text-base text-cream-50/90">Real-time event tracking, traffic attribution analysis, search performance monitoring, and conversion funnel intelligence</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* The 'Tech Specs' Table - Engineering Datasheet */}
      <section className="py-24 px-6 bg-cream-50">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30, filter: 'blur(12px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: elegantEase }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-near-black mb-12 tracking-tight text-center"
          >
            TECHNICAL DATASHEET
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8, ease: elegantEase }}
            className="overflow-x-auto"
          >
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="border-b-2 border-near-black">
                  <th className="text-left py-4 px-4 sm:px-8 font-mono text-xs uppercase tracking-wider text-near-black/60">Parameter</th>
                  <th className="text-left py-4 px-4 sm:px-8 font-mono text-xs uppercase tracking-wider text-near-black/60">Specification</th>
                </tr>
              </thead>
              <tbody className="font-mono text-sm">
                <tr className="border-b border-near-black/10">
                  <td className="py-4 px-4 sm:px-8 text-near-black/80">Framework</td>
                  <td className="py-4 px-4 sm:px-8 text-near-black font-medium">Server-Side Rendered Commercial Architecture</td>
                </tr>
                <tr className="border-b border-near-black/10">
                  <td className="py-4 px-4 sm:px-8 text-near-black/80">Page Count</td>
                  <td className="py-4 px-4 sm:px-8 text-near-black font-medium">7-Page Strategic Infrastructure</td>
                </tr>
                <tr className="border-b border-near-black/10">
                  <td className="py-4 px-4 sm:px-8 text-near-black/80">Performance Standard</td>
                  <td className="py-4 px-4 sm:px-8 text-near-black font-medium">Sub-2-Second Load Time (Core Web Vitals Compliant)</td>
                </tr>
                <tr className="border-b border-near-black/10">
                  <td className="py-4 px-4 sm:px-8 text-near-black/80">Search Protocol</td>
                  <td className="py-4 px-4 sm:px-8 text-near-black font-medium">Structured Data Markup + Entity Registration</td>
                </tr>
                <tr className="border-b border-near-black/10">
                  <td className="py-4 px-4 sm:px-8 text-near-black/80">Analytics Infrastructure</td>
                  <td className="py-4 px-4 sm:px-8 text-near-black font-medium">Real-Time Event Tracking & Traffic Attribution</td>
                </tr>
                <tr className="border-b border-near-black/10">
                  <td className="py-4 px-4 sm:px-8 text-near-black/80">Deployment Timeline</td>
                  <td className="py-4 px-4 sm:px-8 text-near-black font-medium">90-Day Foundation Cycle (Discovery → Build → Launch)</td>
                </tr>
                <tr className="border-b border-near-black/10">
                  <td className="py-4 px-4 sm:px-8 text-near-black/80">Hosting Infrastructure</td>
                  <td className="py-4 px-4 sm:px-8 text-near-black font-medium">Global Edge Network (Multi-Region Deployment)</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 sm:px-8 text-near-black/80">Support Protocol</td>
                  <td className="py-4 px-4 sm:px-8 text-near-black font-medium">30-Day Post-Launch Stabilization & Optimization</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      {/* Engagement Protocol Section */}
      <EngagementProtocol />

      {/* CTA Section */}
      <section className="py-24 px-6 bg-near-black border-t border-copper-500/20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.9, ease: elegantEase }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-cream-50 mb-6 tracking-tight">
            READY TO SECURE YOUR TERRITORY?
          </h2>
          <p className="text-xl text-cream-50/70 mb-10 max-w-2xl mx-auto font-light">
            Start with a 60-minute strategy session. We&apos;ll map your current position and chart
            the path to market dominance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="default"
              className="w-full sm:w-fit bg-copper-500 hover:bg-copper-600 text-cream-50 shadow-xl font-semibold"
            >
              <Link href="/booking" data-gtm-event="cta_book_strategy" data-gtm-location="product_digital_hq_cta">Book Your Strategy Session</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="default"
              className="w-full sm:w-fit bg-transparent border-2 border-cream-50/30 text-cream-50 hover:bg-cream-50/10 hover:border-cream-50/50 font-semibold"
            >
              <Link href="/products">View All Tiers</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
