'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Target, Database, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { elegantEase } from '@/lib/animation-variants';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const EngagementProtocol = dynamic(() => import('@/components/sections/EngagementProtocol'));

export default function GrowthSystemContent() {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Service JSON-LD Schema for Growth System
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Revenue Operations & Marketing Automation',
    name: 'The Growth System',
    description: 'Install the machinery that brings customers to you 24/7. We replace manual chasing with automated attracting using high-velocity pipelines.',
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
      name: 'Growth System',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'CRM Integration & Automation',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Lead Generation Systems',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Revenue Operations Setup',
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
              TIER II • VELOCITY LAYER
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-8xl font-bold uppercase text-cream-50 mb-8 tracking-tight leading-[0.9]">
            THE GROWTH
            <br />
            <span className="text-copper-500">SYSTEM</span>
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-cream-50/80 mb-4 tracking-tight">
            Automate The Momentum.
          </p>

          <p className="text-lg text-cream-50/60 max-w-3xl mx-auto font-mono mb-12">
            Install the machinery that brings customers to you 24/7. We replace manual
            chasing with automated attracting using high-velocity pipelines.
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
              <Link href="/booking" data-gtm-event="cta_book_strategy" data-gtm-location="product_growth_system_hero">DEPLOY SYSTEM</Link>
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
              THE LEAKY BUCKET PROBLEM
            </h2>
            <p className="text-xl text-near-black/80 leading-relaxed font-light">
              You have traffic, but you don&apos;t have leads. People visit your site and leave
              without a trace. Your sales team is wasting time on manual follow-ups. You are leaking
              revenue every hour.
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
                  <Target className="h-7 w-7 text-copper-500" strokeWidth={2} />
                </div>
              </div>
              <div className="md:col-span-10 space-y-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-copper-500">FEATURE A</span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-cream-50 mt-1 tracking-tight">
                    Lead Acquisition Pipelines
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-mono uppercase tracking-wider text-cream-50/60 mb-1">Deliverable</div>
                    <div className="text-sm sm:text-base text-cream-50/90">Dedicated Squeeze Pages & Funnels</div>
                  </div>
                  <div>
                    <div className="text-sm font-mono uppercase tracking-wider text-cream-50/60 mb-1">Engineering</div>
                    <div className="text-sm sm:text-base text-cream-50/90">Distraction-free landing pages designed for a single purpose: capturing the prospect&apos;s data. We use psychological triggers to increase opt-in rates by 200-300%</div>
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
                  <Database className="h-7 w-7 text-copper-500" strokeWidth={2} />
                </div>
              </div>
              <div className="md:col-span-10 space-y-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-copper-500">FEATURE B</span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-cream-50 mt-1 tracking-tight">
                    Lead Capture Engine
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-mono uppercase tracking-wider text-cream-50/60 mb-1">Deliverable</div>
                    <div className="text-sm sm:text-base text-cream-50/90">CRM & Database Integration</div>
                  </div>
                  <div>
                    <div className="text-sm font-mono uppercase tracking-wider text-cream-50/60 mb-1">Engineering</div>
                    <div className="text-sm sm:text-base text-cream-50/90">Enterprise database architecture with automated lead routing, intelligent tagging, segmentation protocols, and sales pipeline integration for zero-latency prospect capture</div>
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
                  <TrendingUp className="h-7 w-7 text-copper-500" strokeWidth={2} />
                </div>
              </div>
              <div className="md:col-span-10 space-y-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-copper-500">FEATURE C</span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-cream-50 mt-1 tracking-tight">
                    Traffic Converter (CRO)
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-mono uppercase tracking-wider text-cream-50/60 mb-1">Deliverable</div>
                    <div className="text-sm sm:text-base text-cream-50/90">Heatmaps & A/B Testing</div>
                  </div>
                  <div>
                    <div className="text-sm font-mono uppercase tracking-wider text-cream-50/60 mb-1">Engineering</div>
                    <div className="text-sm sm:text-base text-cream-50/90">We install Digital CCTV (Heatmaps) to watch how users behave. We tweak headlines, button colors, and layouts based on data, not guesses, to squeeze more revenue from existing traffic</div>
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
                  <td className="py-4 px-4 sm:px-8 text-near-black/80">Funnel Technology</td>
                  <td className="py-4 px-4 sm:px-8 text-near-black font-medium">Next.js / React Commercial Architecture</td>
                </tr>
                <tr className="border-b border-near-black/10">
                  <td className="py-4 px-4 sm:px-8 text-near-black/80">CRM Integration</td>
                  <td className="py-4 px-4 sm:px-8 text-near-black font-medium">Enterprise Database Handshake Protocols</td>
                </tr>
                <tr className="border-b border-near-black/10">
                  <td className="py-4 px-4 sm:px-8 text-near-black/80">Automation Protocol</td>
                  <td className="py-4 px-4 sm:px-8 text-near-black font-medium">Server-Side API Webhooks (Low-Latency)</td>
                </tr>
                <tr className="border-b border-near-black/10">
                  <td className="py-4 px-4 sm:px-8 text-near-black/80">Tracking Infrastructure</td>
                  <td className="py-4 px-4 sm:px-8 text-near-black font-medium">Entity-Level Event Tracking & Attribution</td>
                </tr>
                <tr className="border-b border-near-black/10">
                  <td className="py-4 px-4 sm:px-8 text-near-black/80">Optimization Tools</td>
                  <td className="py-4 px-4 sm:px-8 text-near-black font-medium">Behavioral Intelligence & Heatmap Surveillance</td>
                </tr>
                <tr className="border-b border-near-black/10">
                  <td className="py-4 px-4 sm:px-8 text-near-black/80">Deployment Timeline</td>
                  <td className="py-4 px-4 sm:px-8 text-near-black font-medium">180-Day Velocity Cycle (Discovery → Build → Scale)</td>
                </tr>
                <tr className="border-b border-near-black/10">
                  <td className="py-4 px-4 sm:px-8 text-near-black/80">Conversion Protocol</td>
                  <td className="py-4 px-4 sm:px-8 text-near-black font-medium">Continuous A/B Testing & Statistical Validation</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 sm:px-8 text-near-black/80">Support Protocol</td>
                  <td className="py-4 px-4 sm:px-8 text-near-black font-medium">Quarterly Revenue Operations Review</td>
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
            READY TO AUTOMATE THE MOMENTUM?
          </h2>
          <p className="text-xl text-cream-50/70 mb-10 max-w-2xl mx-auto font-light">
            Start with a 60-minute strategy session. We&apos;ll audit your current funnel and design
            the pipeline that converts traffic into revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="default"
              className="w-full sm:w-fit bg-copper-500 hover:bg-copper-600 text-cream-50 shadow-xl font-semibold"
            >
              <Link href="/booking" data-gtm-event="cta_book_strategy" data-gtm-location="product_growth_system_cta">Book Your Strategy Session</Link>
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
