'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import CurrencyToggleWithSuspense from '@/components/currency/CurrencyProvider';
import PricingCard from './PricingCard';
import { ServicePricingConfig } from '@/types/pricing';

interface PricingSectionProps {
  config: ServicePricingConfig;
  className?: string;
  onSelectPlan: (planName: string) => void;
}

export default function PricingSection({ config, className = '', onSelectPlan }: PricingSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const pricingRef = useRef(null);
  const isPricingInView = useInView(pricingRef, { once: true, amount: 0.15 });

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariant = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.19, 0.91, 0.38, 0.98] as const,
      },
    },
  };

  return (
    <section
      ref={pricingRef}
      className={`relative bg-cream-50 px-6 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-4"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(15px)' }}
          animate={isPricingInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 1, ease: [0.19, 0.91, 0.38, 0.98] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase font-bold text-near-black tracking-brand-header leading-tight mb-4">
            {config.sectionTitle}
          </h2>
          <p className="text-base sm:text-lg text-near-black/70 font-montserrat max-w-3xl mx-auto mb-3">
            {config.sectionSubtitle}
          </p>

          {/* Currency Toggle */}
          <CurrencyToggleWithSuspense />
        </motion.div>

        {/* Pricing Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0 gap-x-6 lg:gap-x-8"
          initial={prefersReducedMotion ? false : 'hidden'}
          animate={isPricingInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {config.plans.map((plan, index) => (
            <motion.div key={index} variants={prefersReducedMotion ? {} : cardVariant}>
              <PricingCard
                plan={plan}
                onSelectPlan={() => onSelectPlan(plan.name)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
