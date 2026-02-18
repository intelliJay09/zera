'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import MetricCard from './MetricCard';

interface Stat {
  number: string;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { number: '150', suffix: '+', label: 'Businesses Transformed' },
  { number: '4.2', suffix: 'x', label: 'Average ROI' },
  { number: '92', suffix: '%', label: 'Client Retention' },
  { number: '5', suffix: '★', label: 'Client Rating' },
];

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
          className="text-center mb-12 sm:mb-16 lg:mb-20"
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

        {/* Scrollytelling Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.19, 0.91, 0.38, 0.98]
              }}
            >
              <MetricCard stat={stat} index={index} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
