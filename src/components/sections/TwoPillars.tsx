'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Compass, Package } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import {
  twoPillarsDivider,
  twoPillarsOverline,
  twoPillarsHeadline,
  cardEntranceLeft,
  cardEntranceRight,
  cardContentContainer,
  cardIcon,
  cardTextItem,
  cardCTA,
} from '@/lib/animation-variants';

export default function TwoPillars() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = usePrefersReducedMotion();
  return (
    <section ref={ref} className="relative bg-white py-24 sm:py-32 lg:py-40">
      {/* Decorative copper line - subtle divider */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent origin-center"
        initial={prefersReducedMotion ? false : "hidden"}
        animate={isInView ? "visible" : "hidden"}
        variants={twoPillarsDivider}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.p
            className="text-sm font-medium tracking-[0.25em] uppercase text-copper-500 mb-6"
            initial={prefersReducedMotion ? false : "hidden"}
            animate={isInView ? "visible" : "hidden"}
            variants={twoPillarsOverline}
          >
            Choose Your Path
          </motion.p>
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-light font-playfair text-near-black tracking-tight"
            initial={prefersReducedMotion ? false : "hidden"}
            animate={isInView ? "visible" : "hidden"}
            variants={twoPillarsHeadline}
          >
            Scale Smart or Build Bespoke
          </motion.h2>
        </div>

        {/* The Pillars - Asymmetric 7/5 split with mobile WaaS-first ordering */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* PILLAR 2: WaaS - Mobile First, Desktop Right (5 columns) */}
          <motion.div
            className="order-1 lg:order-2 lg:col-span-5 group relative h-full"
            initial={prefersReducedMotion ? false : "hidden"}
            animate={isInView ? "visible" : "hidden"}
            variants={cardEntranceRight}
          >
            {/* Light card with subtle depth */}
            <div className="relative h-full bg-gradient-to-br from-cream-100 via-cream-50 to-white rounded-none p-10 sm:p-12 lg:p-14 transition-all duration-700 ease-out hover:shadow-2xl hover:shadow-copper-500/5 hover:scale-[1.02] hover:-translate-y-2 overflow-hidden border border-cream-300/50 group-hover:border-copper-500/30">
              {/* Subtle glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-copper-500/0 to-copper-500/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Copper accent line */}
              <div className="absolute top-0 right-0 h-px w-24 bg-gradient-to-l from-copper-500 to-transparent group-hover:w-full transition-all duration-1000" />

              <motion.div
                className="relative z-10"
                initial={prefersReducedMotion ? false : "hidden"}
                animate={isInView ? "visible" : "hidden"}
                variants={cardContentContainer}
              >
                {/* Icon */}
                <motion.div className="mb-8" variants={cardIcon}>
                  <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-shadow duration-500">
                    <Package className="w-7 h-7 text-copper-500" strokeWidth={1.5} />
                  </div>
                </motion.div>

                {/* Overline */}
                <motion.p
                  className="text-xs font-medium tracking-[0.3em] uppercase text-copper-600 mb-4"
                  variants={cardTextItem}
                >
                  Productized Offering
                </motion.p>

                {/* Headline */}
                <motion.h3
                  className="text-2xl sm:text-3xl lg:text-4xl font-light font-playfair text-near-black mb-5 tracking-tight leading-[1.2]"
                  variants={cardTextItem}
                >
                  Website as a Service (WaaS)
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="text-base font-light text-near-black/70 leading-relaxed tracking-wide mb-10"
                  variants={cardTextItem}
                >
                  Premium websites delivered as transparent monthly plans. Perfect for businesses
                  seeking predictable costs, rapid deployment, and ongoing maintenance without agency
                  overhead.
                </motion.p>

                {/* Feature Highlights */}
                <motion.div className="space-y-3.5 mb-12" variants={cardTextItem}>
                  <div className="flex items-start gap-3.5">
                    <div className="w-2 h-2 rounded-full bg-copper-500 mt-2 flex-shrink-0" />
                    <p className="text-sm font-light text-near-black/60 tracking-wide">
                      Launch-ready websites in 14 days or less
                    </p>
                  </div>
                  <div className="flex items-start gap-3.5">
                    <div className="w-2 h-2 rounded-full bg-copper-500 mt-2 flex-shrink-0" />
                    <p className="text-sm font-light text-near-black/60 tracking-wide">
                      Fixed monthly pricing with no hidden fees
                    </p>
                  </div>
                  <div className="flex items-start gap-3.5">
                    <div className="w-2 h-2 rounded-full bg-copper-500 mt-2 flex-shrink-0" />
                    <p className="text-sm font-light text-near-black/60 tracking-wide">
                      Maintenance, hosting, and updates included
                    </p>
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div variants={cardCTA}>
                  <Link
                    href="/waas-plans"
                    className="inline-flex items-center gap-3 px-8 py-3.5 bg-near-black text-cream-50 font-medium text-base tracking-wide hover:bg-near-black/90 transition-all duration-300 group/btn"
                  >
                    <span>View WaaS Plans</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* PILLAR 1: Custom Services - Mobile Second, Desktop Left (7 columns - Flagship) */}
          <motion.div
            className="order-2 lg:order-1 lg:col-span-7 group relative h-full"
            initial={prefersReducedMotion ? false : "hidden"}
            animate={isInView ? "visible" : "hidden"}
            variants={cardEntranceLeft}
          >
            {/* Floating card with elevated glass effect */}
            <div className="relative h-full bg-gradient-to-br from-near-black via-near-black/95 to-near-black/90 rounded-none p-12 sm:p-14 lg:p-16 transition-all duration-700 ease-out hover:shadow-2xl hover:shadow-copper-500/10 hover:scale-[1.02] hover:-translate-y-2 overflow-hidden">
              {/* Gradient glow overlay - activated on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-copper-500/0 via-copper-500/0 to-copper-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Copper accent line - grows on hover */}
              <div className="absolute top-0 left-0 h-px w-32 bg-gradient-to-r from-copper-500 to-transparent group-hover:w-full transition-all duration-1000" />

              {/* Content - relative z-index to stay above overlays */}
              <motion.div
                className="relative z-10"
                initial={prefersReducedMotion ? false : "hidden"}
                animate={isInView ? "visible" : "hidden"}
                variants={cardContentContainer}
              >
                {/* Icon/Emblem Area */}
                <motion.div className="mb-8" variants={cardIcon}>
                  <div className="w-16 h-16 rounded-full bg-copper-500/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-copper-500/20 transition-colors duration-500">
                    <Compass className="w-8 h-8 text-copper-500" strokeWidth={1.5} />
                  </div>
                </motion.div>

                {/* Overline */}
                <motion.p
                  className="text-xs font-medium tracking-[0.3em] uppercase text-copper-500 mb-4"
                  variants={cardTextItem}
                >
                  Bespoke Solutions
                </motion.p>

                {/* Headline */}
                <motion.h3
                  className="text-3xl sm:text-4xl lg:text-5xl font-light font-playfair text-cream-50 mb-6 tracking-tight leading-[1.15]"
                  variants={cardTextItem}
                >
                  Custom Services
                </motion.h3>

                {/* Description */}
                <motion.p
                  className="text-base sm:text-lg font-light text-cream-100/80 leading-relaxed tracking-wide mb-10"
                  variants={cardTextItem}
                >
                  Strategic partnerships built on deep collaboration. For brands seeking
                  transformational growth through bespoke digital experiences, comprehensive marketing
                  ecosystems, and consultative expertise.
                </motion.p>

                {/* Feature Highlights - subtle, not bulleted */}
                <motion.div className="space-y-4 mb-12" variants={cardTextItem}>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-copper-500 mt-2 flex-shrink-0" />
                    <p className="text-sm font-light text-cream-100/70 tracking-wide">
                      Dedicated strategic team assigned to your account
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-copper-500 mt-2 flex-shrink-0" />
                    <p className="text-sm font-light text-cream-100/70 tracking-wide">
                      Unlimited scope flexibility and custom development
                    </p>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-2 h-2 rounded-full bg-copper-500 mt-2 flex-shrink-0" />
                    <p className="text-sm font-light text-cream-100/70 tracking-wide">
                      White-glove service with executive-level reporting
                    </p>
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div variants={cardCTA}>
                  <Link
                    href="/solutions"
                    className="inline-flex items-center gap-3 px-10 py-4 bg-copper-500 text-cream-50 font-medium text-base tracking-wide hover:bg-copper-600 transition-all duration-300 group/btn"
                  >
                    <span>Explore Our Solutions</span>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
