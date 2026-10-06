'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { CaseStudy } from '@/data/case-studies';

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
  headingLevel?: 'h2' | 'h3';
}

export default function CaseStudyCard({ study, index, headingLevel = 'h3' }: CaseStudyCardProps) {
  const Heading = headingLevel;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.19, 0.91, 0.38, 0.98] }}
      className="group relative bg-white transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
    >
      <Link
        href={`/portfolio/${study.slug}`}
        className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-4"
      >
        {/* Copper accent that expands on hover */}
        <div className="absolute top-0 left-0 z-10 h-px w-16 bg-copper-500 transition-all duration-700 group-hover:w-full" />

        <div className="relative aspect-[16/10] overflow-hidden bg-cream-200">
          <Image
            src={study.hero.src}
            alt={study.hero.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <span className="absolute top-4 left-4 bg-near-black/80 px-3 py-1.5 text-xs font-medium uppercase tracking-brand-label text-cream-100 backdrop-blur-sm">
            {study.status}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-8 lg:p-10">
          <div className="mb-6 flex min-h-10 items-center justify-between gap-4">
            <Image
              src={study.logo.src}
              alt={study.client}
              width={study.logo.width}
              height={study.logo.height}
              style={{ height: study.logo.displayHeight * 0.85 }}
              className="w-auto max-w-[60%] object-contain object-left"
            />
            <span className="shrink-0 bg-copper-50 px-3 py-1.5 text-xs font-medium uppercase tracking-brand-label text-copper-700">
              {study.industry}
            </span>
          </div>

          <Heading className="mb-6 text-xl font-semibold leading-tight text-gray-900 sm:text-2xl">
            {study.headline}
          </Heading>

          <div className="mb-8 flex-grow">
            <p className="text-2xl font-bold tracking-tight text-copper-500">{study.keyFigure.value}</p>
            <p className="mt-1 text-sm text-gray-600">{study.keyFigure.label}</p>
          </div>

          <span className="flex items-center gap-2 text-sm font-medium uppercase tracking-brand-label text-copper-600 transition-all duration-300 group-hover:gap-3 group-hover:text-copper-500">
            Read the case study
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
