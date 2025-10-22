'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Home, Briefcase, FolderOpen, Mail, ArrowLeft } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function NotFound() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const contentRef = useRef(null);
  const isInView = useInView(contentRef, { once: true, amount: 0.3 });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.33, 0.82, 0.44, 0.99],
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const navigationCards = [
    {
      icon: Briefcase,
      title: 'Explore Our Solutions',
      description: 'Web Development, SEO, Branding & More',
      href: '/solutions',
    },
    {
      icon: FolderOpen,
      title: 'See Our Work',
      description: 'Portfolio of Strategic Digital Success',
      href: '/portfolio',
    },
    {
      icon: Mail,
      title: 'Talk to Our Team',
      description: 'Get Personalized Strategic Support',
      href: '/contact',
    },
  ];

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-cream-100 to-cream-50 px-6 sm:px-8 lg:px-12 py-32 sm:py-40 overflow-hidden">
      {/* Decorative Background Elements */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-copper-500/5 rounded-full blur-[120px] pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-copper-500/3 rounded-full blur-[120px] pointer-events-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      <div ref={contentRef} className="relative max-w-6xl mx-auto w-full">
        <motion.div
          className="text-center mb-16"
          initial={prefersReducedMotion ? false : 'hidden'}
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          {/* Error Badge */}
          <motion.div
            className="inline-flex items-center justify-center w-32 h-32 mb-8 bg-copper-500/10 backdrop-blur-sm rounded-full"
            variants={itemVariants}
          >
            <span className="text-6xl font-bold text-copper-500" aria-hidden="true">
              404
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-light font-playfair text-near-black tracking-tight mb-6 leading-tight"
            variants={itemVariants}
          >
            Lost in the Flow?
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="text-lg sm:text-xl lg:text-2xl font-light text-near-black/70 leading-relaxed tracking-wide max-w-3xl mx-auto mb-4"
            variants={itemVariants}
          >
            Even the most strategic paths have unexpected turns. Let&apos;s redirect your journey.
          </motion.p>

          {/* Primary CTA */}
          <motion.div variants={itemVariants}>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-copper-500 text-white font-medium text-base tracking-wide hover:bg-copper-600 active:scale-95 transition-all duration-300 w-fit shadow-lg hover:shadow-xl hover:shadow-copper-500/30 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Home</span>
              <Home className="w-5 h-5" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Navigation Cards */}
        <motion.div
          className="mb-12"
          initial={prefersReducedMotion ? false : 'hidden'}
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.p
            className="text-sm font-semibold text-near-black/60 uppercase tracking-wider text-center mb-8"
            variants={itemVariants}
          >
            Or try these:
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {navigationCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <motion.div key={index} variants={cardVariants}>
                  <Link
                    href={card.href}
                    className="group block h-full bg-white/60 backdrop-blur-sm p-8 transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-copper-500/10 hover:-translate-y-2"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 mb-6 flex items-center justify-center bg-copper-500/5 text-copper-500 group-hover:bg-copper-500 group-hover:text-white transition-all duration-500">
                        <Icon className="w-8 h-8" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-semibold font-montserrat text-near-black mb-3 group-hover:text-copper-500 transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-sm font-light text-near-black/70 leading-relaxed tracking-wide">
                        {card.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Secondary Links */}
        <motion.div
          className="text-center"
          initial={prefersReducedMotion ? false : 'hidden'}
          animate={isInView ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.p
            className="text-sm text-near-black/60 mb-4"
            variants={itemVariants}
          >
            You might find what you&apos;re looking for here:
          </motion.p>
          <motion.nav
            className="flex flex-wrap items-center justify-center gap-6"
            variants={itemVariants}
            aria-label="Additional navigation"
          >
            <Link
              href="/about"
              className="text-sm font-medium text-copper-500 hover:text-copper-600 transition-colors duration-200"
            >
              About Us
            </Link>
            <Link
              href="/waas-plans"
              className="text-sm font-medium text-copper-500 hover:text-copper-600 transition-colors duration-200"
            >
              WaaS Plans
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-copper-500 hover:text-copper-600 transition-colors duration-200"
            >
              Blog & Resources
            </Link>
          </motion.nav>
        </motion.div>
      </div>
    </main>
  );
}
