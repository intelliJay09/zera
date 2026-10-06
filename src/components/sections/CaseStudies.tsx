'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CASE_STUDIES } from '@/data/case-studies';
import CaseStudyCard from './CaseStudyCard';

export default function CaseStudies() {
  return (
    <section className="relative bg-cream py-16 sm:py-24 md:py-32 lg:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <p className="text-sm font-medium tracking-brand-label uppercase text-copper-700 mb-6">
            CASE STUDIES
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light font-display uppercase text-gray-900 tracking-brand-header max-w-5xl mx-auto leading-tight mb-6">
            SYSTEMS WE HAVE PUT TO WORK
          </h2>
          <p className="text-base sm:text-lg font-normal text-near-black/80 max-w-2xl mx-auto leading-relaxed">
            Three recent engagements: what we built, and what it has produced so far.
          </p>
        </motion.div>

        {/* Case Study Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {CASE_STUDIES.map((study, index) => (
            <CaseStudyCard key={study.slug} study={study} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 sm:mt-16 flex justify-center"
        >
          <Button asChild variant="secondary" size="sm" className="group">
            <Link href="/portfolio">
              View all case studies
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 group-hover:scale-110 transition-all duration-300" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
