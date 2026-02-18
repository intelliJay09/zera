'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Target,
  TrendingUp,
  Trophy,
  CheckCircle2,
  Layers,
  Zap,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PRODUCT_TIERS } from '@/data/products';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function ProductsPage() {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Section refs for scroll triggers
  const heroRef = useRef(null);
  const productsRef = useRef(null);
  const howItWorksRef = useRef(null);
  const faqRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true, amount: 0.2 });
  const isProductsInView = useInView(productsRef, { once: true, amount: 0.1 });
  const isHowItWorksInView = useInView(howItWorksRef, { once: true, amount: 0.2 });
  const isFaqInView = useInView(faqRef, { once: true, amount: 0.2 });

  // Animation variants
  const heroContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const heroItem = {
    hidden: { opacity: 0, y: 60, filter: 'blur(20px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: prefersReducedMotion ? 0 : 1.4,
        ease: [0.19, 0.91, 0.38, 0.98] as const,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariant = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: [0.19, 0.91, 0.38, 0.98] as const,
      },
    },
  };

  const getTierIcon = (tier: 'I' | 'II' | 'III') => {
    switch (tier) {
      case 'I':
        return Target;
      case 'II':
        return TrendingUp;
      case 'III':
        return Trophy;
      default:
        return Target;
    }
  };

  return (
    <div className="bg-gradient-to-b from-cream-50 to-cream-200">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] flex items-center justify-center px-6 py-20 sm:py-28 lg:py-36 overflow-hidden border-b border-copper-500/20"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(191,138,100,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(191,138,100,0.08),transparent_50%)]" />

        <motion.div
          className="relative z-10 max-w-5xl mx-auto text-center"
          variants={heroContainer}
          initial="hidden"
          animate={isHeroInView ? 'visible' : 'hidden'}
        >
          <motion.div variants={heroItem} className="mb-6">
            <div className="inline-block px-6 py-2 bg-copper-500/10 backdrop-blur-sm rounded-full border border-copper-500/20 mb-8">
              <span className="text-sm font-medium tracking-wide uppercase text-copper-500">
                Engineered Growth
              </span>
            </div>
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold uppercase text-near-black mb-6 tracking-brand-header"
          >
            ENGINEERED GROWTH
            <br />
            <span className="text-copper-500">FOR THE DIGITAL AGE</span>
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="text-xl sm:text-2xl text-near-black/70 font-normal max-w-3xl mx-auto mb-12"
          >
            Three tiers. One trajectory. Market sovereignty.
          </motion.p>

          <motion.div variants={heroItem}>
            <Button
              asChild
              size="default"
              className="w-fit bg-copper-500 hover:bg-copper-600 text-cream-50 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Link href="/contact">Book Strategy Session</Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Product Ladder Section */}
      <section ref={productsRef} className="pt-20 sm:pt-28 lg:pt-36 pb-12 sm:pb-16 lg:pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isProductsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-near-black mb-6 tracking-brand-header">
              THE PRODUCT LADDER
            </h2>
            <p className="text-lg text-near-black/70 max-w-2xl mx-auto">
              Systematic infrastructure-building in three distinct phases
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isProductsInView ? 'visible' : 'hidden'}
          >
            {PRODUCT_TIERS.map((product) => {
              const IconComponent = getTierIcon(product.tier);
              return (
                <motion.div
                  key={product.tier}
                  variants={cardVariant}
                  className="group relative bg-cream-50 rounded-2xl p-8 border-2 border-copper-500/20 hover:border-copper-500/50 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-2 transition-all duration-500 ease-out"
                >
                  {/* Tier Badge */}
                  <div className="absolute -top-4 left-8">
                    <div className="bg-copper-500 text-cream-50 px-4 py-1 rounded-full text-sm font-medium group-hover:bg-copper-600 group-hover:shadow-lg transition-all duration-500">
                      TIER {product.tier}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="mb-6 mt-4">
                    <div className="inline-flex p-4 bg-copper-500/10 rounded-xl group-hover:bg-copper-500/20 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ease-out">
                      <IconComponent className="h-8 w-8 text-copper-500 group-hover:text-copper-600 transition-colors duration-500" />
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="text-sm text-copper-500 font-medium uppercase tracking-wide mb-3">
                    {product.duration}
                  </div>

                  {/* Asset Name */}
                  <h3 className="font-display text-2xl font-bold uppercase text-near-black mb-3 tracking-brand-header">
                    {product.assetName}
                  </h3>

                  {/* Promise */}
                  <p className="text-lg italic text-near-black/80 mb-8 border-l-2 border-copper-500/30 pl-4">
                    &quot;{product.promise}&quot;
                  </p>

                  {/* Deliverables */}
                  <div className="space-y-4 mb-8">
                    {product.deliverables.map((deliverable, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-copper-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-near-black">
                            {deliverable.title}
                          </p>
                          <p className="text-xs text-near-black/60 mt-1">
                            {deliverable.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="flex items-center justify-center w-full px-6 py-3 rounded-md border-2 border-copper-500 bg-transparent text-copper-500 font-semibold group-hover:bg-copper-500 group-hover:text-cream-50 group-hover:border-copper-500 transition-all duration-500 ease-out"
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-500" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        ref={howItWorksRef}
        className="pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-28 lg:pb-36 px-6 bg-cream-100"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isHowItWorksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-near-black mb-16 text-center tracking-brand-header">
              HOW IT WORKS
            </h2>

            <div className="space-y-12">
              {[
                {
                  number: '01',
                  title: 'The Audit',
                  description:
                    'Diagnosis before prescription. We audit your digital infrastructure, identify the fractures, and map your growth trajectory.',
                  icon: Shield,
                },
                {
                  number: '02',
                  title: 'The Strategy',
                  description:
                    'Custom roadmap tailored to your business goals. No cookie-cutter templates—every plan is architected for your specific market position.',
                  icon: Layers,
                },
                {
                  number: '03',
                  title: 'The Execution',
                  description:
                    'Build and deploy. Systematic implementation of your digital infrastructure with regular progress updates and quality checkpoints.',
                  icon: Zap,
                },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={
                    isHowItWorksInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }
                  }
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="flex gap-6 items-start"
                >
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-copper-500/10 flex items-center justify-center">
                      <step.icon className="h-7 w-7 text-copper-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-copper-500 font-medium uppercase tracking-wide mb-2">
                      STEP {step.number}
                    </div>
                    <h3 className="font-display text-2xl font-bold uppercase text-near-black mb-3 tracking-brand-header">
                      {step.title}
                    </h3>
                    <p className="text-base text-near-black/70 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="py-20 sm:py-28 lg:py-36 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isFaqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-near-black mb-16 text-center tracking-brand-header">
              COMMON QUESTIONS
            </h2>

            <div className="space-y-8">
              {[
                {
                  question: 'Why tiers instead of packages?',
                  answer:
                    'Traditional agencies sell you isolated services. We build systems. Each tier is a complete phase in your digital infrastructure—foundation, growth mechanisms, then market dominance. You can\'t skip leg day and expect to run marathons.',
                },
                {
                  question: 'Can I skip to Tier III?',
                  answer:
                    'No. Tier III tools are worthless without Tier I infrastructure and Tier II conversion systems. You need the base before the penthouse. We audit first to determine your current position.',
                },
                {
                  question: 'What if I only need the website?',
                  answer:
                    'Then book an audit. We\'ll assess whether Tier I alone solves your problem or if you\'re leaving money on the table. Some businesses need the full stack immediately.',
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isFaqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-cream-50 rounded-xl p-8 border border-copper-500/20"
                >
                  <h3 className="font-display text-xl font-bold uppercase text-near-black mb-4 tracking-brand-header">
                    {faq.question}
                  </h3>
                  <p className="text-base text-near-black/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-24 px-6 bg-gradient-to-br from-copper-500 to-copper-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-cream-50 mb-6 tracking-brand-header">
              BOOK YOUR ZERA STRATEGY SESSION
            </h2>
            <p className="text-xl text-cream-50/90 mb-10 max-w-2xl mx-auto">
              60-minute strategy session. No pitch. Just infrastructure analysis and a clear roadmap.
            </p>
            <Button
              asChild
              size="default"
              className="w-fit bg-cream-50 text-copper-500 hover:bg-cream-100 shadow-xl"
            >
              <Link href="/contact">Book Your Strategy Session</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
