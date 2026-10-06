'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { COMPANY_STATS } from '@/data/company-stats';
import Metric from './Metric';

// Copper rules between figures: one row of four on desktop, a 2x2 grid below lg
function dividerClasses(index: number) {
  return [
    index % 2 === 1 && 'border-l',
    index >= 2 && 'border-t lg:border-t-0',
    index === 2 && 'lg:border-l',
  ]
    .filter(Boolean)
    .join(' ');
}

export default function ResultsMetrics() {
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress for background gradient
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Transform scroll to gradient colors
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["rgb(253, 244, 235)", "rgb(251, 239, 228)", "rgb(253, 244, 235)"]
  );

  return (
    <motion.section
      ref={sectionRef}
      style={{ backgroundColor }}
      className="relative overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-copper-500/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative py-16 sm:py-24 lg:py-32">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10 sm:mb-14 lg:mb-20"
        >
          <p className="text-sm font-medium tracking-brand-label uppercase text-copper-700 mb-4">
            The Operating Record
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light font-display uppercase text-near-black tracking-brand-header mb-4 sm:mb-6">
            DATA, NOT PROMISES.
          </h2>
          <p className="text-base sm:text-lg font-normal text-near-black/80 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            We engineer revenue infrastructure. Every growth system we deploy is precision-calibrated for measurable ROI. The numbers don&apos;t lie.
          </p>
        </motion.div>

        {/* Figures in one open row, separated by copper rules */}
        <ul className="grid grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {COMPANY_STATS.map((stat, index) => (
            <motion.li
              key={stat.label}
              className={`border-copper-500/25 px-2 py-10 sm:px-6 sm:py-12 lg:py-4 ${dividerClasses(index)}`}
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.19, 0.91, 0.38, 0.98]
              }}
            >
              <Metric stat={stat} index={index} />
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}
