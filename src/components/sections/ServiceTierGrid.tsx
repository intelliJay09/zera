'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PRODUCT_TIERS } from '@/data/products';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import {
  twoPillarsOverline,
  twoPillarsHeadline,
  customWebFeaturesCardStagger,
  customWebFeaturesCard,
} from '@/lib/animation-variants';

/**
 * Helper function to get phase label based on tier
 */
function getPhaseLabel(tier: 'I' | 'II' | 'III'): string {
  switch (tier) {
    case 'I':
      return 'Phase I: Foundation (Web & SEO)';
    case 'II':
      return 'Phase II: Velocity (Funnels & Ads)';
    case 'III':
      return 'Phase III: Sovereignty (Retention & Scale)';
  }
}

/**
 * ServiceTierGrid Component
 * Displays the three product tiers (Digital HQ, Growth System, Market Monopoly)
 * with deliverables and CTAs
 */
export default function ServiceTierGrid() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const prefersReducedMotion = usePrefersReducedMotion();

  // Disable animations if user prefers reduced motion
  const shouldAnimate = !prefersReducedMotion && isInView;

  return (
    <section
      ref={sectionRef}
      className="bg-cream-50 pt-20 pb-16 sm:pt-28 sm:pb-24 md:pt-32 md:pb-28 lg:pt-40 lg:pb-36 relative"
    >
      {/* Ambient Copper Glow Background */}
      <div className="absolute inset-x-0 top-0 h-[400px] pointer-events-none overflow-hidden">
        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 top-0 h-[400px] bg-gradient-to-b from-copper-500/20 via-copper-500/10 to-transparent" />

        {/* Animated Blur Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={shouldAnimate ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-[400px] bg-copper-500/30 rounded-full blur-[120px]"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.p
            initial="hidden"
            animate={shouldAnimate ? 'visible' : 'hidden'}
            variants={twoPillarsOverline}
            className="text-sm font-medium tracking-brand-label uppercase text-copper-700 mb-6"
          >
            OUR SYSTEM
          </motion.p>
          <motion.h2
            initial="hidden"
            animate={shouldAnimate ? 'visible' : 'hidden'}
            variants={twoPillarsHeadline}
            className="text-4xl sm:text-5xl lg:text-6xl font-light font-display text-near-black tracking-brand-header"
          >
            THREE PHASES. ONE TRAJECTORY.
          </motion.h2>
        </div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          animate={shouldAnimate ? 'visible' : 'hidden'}
          variants={customWebFeaturesCardStagger}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {PRODUCT_TIERS.map((tier) => (
            <motion.article
              key={tier.tier}
              variants={customWebFeaturesCard}
              className="group relative h-full"
            >
              {/* Card Container - Exact "Scale Your Impact" Design */}
              <div className="relative h-full bg-gradient-to-br from-near-black via-near-black/95 to-near-black/90 rounded-none p-6 sm:p-10 md:p-12 lg:p-14 transition-all duration-700 ease-out hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-2 overflow-hidden">
                {/* Copper accent border - expands on hover */}
                <div className="absolute top-0 left-0 w-24 h-[3px] bg-copper-500 group-hover:w-full transition-all duration-700 z-50" />

                {/* Subtle glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-copper-500/0 via-copper-500/0 to-copper-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Tier Badge */}
                  <div className="text-xs font-medium tracking-brand-label uppercase text-copper-500 mb-3">
                    TIER {tier.tier}
                  </div>

                  {/* Asset Name (H3 for SEO) */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light font-display uppercase text-cream-50 mb-3 tracking-brand-header leading-[1.2]">
                    {tier.assetName}
                  </h3>

                  {/* Phase Label */}
                  <p className="text-sm text-cream-50 opacity-70 font-medium uppercase tracking-normal mb-6">
                    {getPhaseLabel(tier.tier)}
                  </p>

                  {/* Promise */}
                  <p className="text-base font-normal text-cream-50 opacity-70 italic leading-relaxed tracking-normal mb-10">
                    &quot;{tier.promise}&quot;
                  </p>

                  {/* Deliverables (titles only) */}
                  <ul className="space-y-4 mb-10 flex-grow">
                    {tier.deliverables.map((deliverable) => (
                      <li key={deliverable.title} className="flex items-start gap-3">
                        <CheckCircle2
                          className="w-5 h-5 text-copper-500 flex-shrink-0 mt-0.5"
                          strokeWidth={1.5}
                        />
                        <span className="text-base font-medium text-cream-50 tracking-normal">
                          {deliverable.title}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={`/products/${tier.slug}`}
                    aria-label={`Explore ${tier.assetName}`}
                    className="inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 bg-copper-600 text-cream-50 hover:bg-copper-700 font-medium text-sm sm:text-base tracking-normal transition-all duration-300 group/btn mt-auto uppercase w-full"
                  >
                    <span>Explore {tier.assetName}</span>
                    <ArrowRight className="w-5 h-5 flex-shrink-0 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
