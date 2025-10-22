'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import LiquidEther from '@/components/backgrounds/LiquidEther';
import { Button } from '@/components/ui/button';
import TwoPillars from '@/components/sections/TwoPillars';
import TrustedByLogos from '@/components/sections/TrustedByLogos';
import ResultsMetrics from '@/components/sections/ResultsMetrics';
import WhyAstraFlow from '@/components/sections/WhyAstraFlow';
import ValuePropositionsDual from '@/components/sections/ValuePropositionsDual';
import FeaturedPortfolio from '@/components/sections/FeaturedPortfolio';
import ClientTestimonials from '@/components/sections/ClientTestimonials';
import FinalCTA from '@/components/sections/FinalCTA';
import {
  heroHeadline,
  heroSubheadline,
} from '@/lib/animation-variants';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <main className="relative h-screen">
        <LiquidEther />
        <div className="mx-auto max-w-7xl px-4 pt-44 pb-24 sm:px-6 sm:pt-40 sm:pb-24 md:pt-48 md:pb-32 lg:px-8">
          <div className="text-center">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light font-playfair text-near-black tracking-tight leading-[1.1] mb-8"
              initial="hidden"
              animate="visible"
              variants={heroHeadline}
            >
              Strategic Digital Growth
              <motion.span
                className="block mt-3 text-copper-500"
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 1.0, ease: [0.33, 0.82, 0.44, 0.99] }}
              >
                All in One Flow
              </motion.span>
            </motion.h1>

            <motion.p
              className="mx-auto max-w-3xl text-lg sm:text-xl text-near-black/70 font-light tracking-wide leading-relaxed px-4 sm:px-0 mb-12"
              initial="hidden"
              animate="visible"
              variants={heroSubheadline}
            >
              Choose the path that aligns with your vision: transparent monthly website plans for growing
              businesses, or bespoke strategic partnerships for brands demanding exceptional outcomes.
            </motion.p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.92, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                transition={{
                  duration: 1.0,
                  delay: 2.3,
                  ease: [0.25, 0.85, 0.35, 1.0],
                }}
              >
                <Button asChild variant="primary" size="lg" className="group">
                  <Link href="/contact">
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 group-hover:scale-110 transition-all duration-300" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.92, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                transition={{
                  duration: 1.0,
                  delay: 2.6,
                  ease: [0.25, 0.85, 0.35, 1.0],
                }}
              >
                <Button asChild variant="ghost" size="lg" className="group">
                  <Link href="/portfolio">
                    View Our Work
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 group-hover:scale-110 transition-all duration-300" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Two Pillars Section - CRITICAL */}
      <TwoPillars />

      {/* Trusted By Logos Section */}
      <TrustedByLogos />

      {/* Results Metrics Section */}
      <ResultsMetrics />

      {/* Why Choose The Astra Flow Section */}
      <WhyAstraFlow />

      {/* Value Propositions Dual Section */}
      <ValuePropositionsDual />

      {/* Featured Portfolio Section */}
      <FeaturedPortfolio />

      {/* Client Testimonials Section */}
      <ClientTestimonials />

      {/* Final CTA Section */}
      <FinalCTA />
    </>
  );
}
