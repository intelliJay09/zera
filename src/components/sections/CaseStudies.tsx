'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CASE_STUDIES, logoSize, type CaseStudy } from '@/data/case-studies';

const ease = [0.19, 0.91, 0.38, 0.98] as const;

// The first case study in the data leads; the rest sit in a lighter row beneath it.
const [featured, ...others] = CASE_STUDIES;

function Meta({ study }: { study: CaseStudy }) {
  return (
    <p className="text-xs font-medium uppercase tracking-brand-label text-copper-700">
      {study.industry}
      <span className="mx-2 text-copper-500/50" aria-hidden="true">
        /
      </span>
      {study.location}
    </p>
  );
}

function ReadMore() {
  return (
    <span className="flex w-fit items-center gap-2 text-sm font-medium uppercase tracking-brand-label text-copper-700 transition-all duration-300 group-hover:gap-3 group-hover:text-copper-500">
      Read the case study
      <ArrowRight className="h-4 w-4" />
    </span>
  );
}

function FeaturedStudy({ study }: { study: CaseStudy }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, ease }}
      className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-14"
    >
      <Link
        href={`/portfolio/${study.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-[16/10] overflow-hidden bg-near-black lg:col-span-7"
      >
        <Image
          src={study.hero.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 55vw, 100vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute top-0 left-0 z-10 h-[3px] w-24 bg-copper-500 transition-all duration-700 group-hover:w-full" />
        <span className="absolute top-4 left-4 bg-near-black/80 px-3 py-1.5 text-xs font-medium uppercase tracking-brand-label text-cream-100 backdrop-blur-sm">
          {study.status}
        </span>
      </Link>

      <div className="lg:col-span-5">
        <Image
          src={study.logo.src}
          alt={study.client}
          width={study.logo.width}
          height={study.logo.height}
          style={logoSize(study.logo, study.logo.displayHeight)}
          className="mb-5"
        />
        <Meta study={study} />

        <h3 className="mt-4 text-2xl font-semibold leading-tight text-near-black sm:text-3xl xl:text-4xl">
          <Link
            href={`/portfolio/${study.slug}`}
            className="transition-colors duration-300 hover:text-copper-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-4"
          >
            {study.headline}
          </Link>
        </h3>

        <dl className="my-8 grid grid-cols-3 border-y border-copper-500/25">
          {study.figures.slice(0, 3).map((figure, index) => (
            <motion.div
              key={figure.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.12, ease }}
              className={`flex flex-col-reverse justify-end gap-2 py-5 ${
                index === 0 ? 'pr-3' : 'border-l border-copper-500/25 px-3 sm:px-5'
              }`}
            >
              <dt className="text-xs leading-snug text-near-black/60 sm:text-sm">{figure.label}</dt>
              <dd className="whitespace-nowrap text-lg font-light font-display tracking-tight text-copper-500 sm:text-2xl 2xl:text-3xl">
                {figure.value}
              </dd>
            </motion.div>
          ))}
        </dl>

        <Link href={`/portfolio/${study.slug}`} className="group/link inline-block">
          <span className="flex w-fit items-center gap-2 text-sm font-medium uppercase tracking-brand-label text-copper-700 transition-all duration-300 group-hover/link:gap-3 group-hover/link:text-copper-500">
            Read the case study
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </motion.article>
  );
}

function SecondaryStudy({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease }}
    >
      <Link
        href={`/portfolio/${study.slug}`}
        className="group grid grid-cols-1 items-start gap-6 sm:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-4"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-near-black">
          <Image
            src={study.hero.src}
            alt={study.hero.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 100vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute top-0 left-0 z-10 h-[3px] w-16 bg-copper-500 transition-all duration-700 group-hover:w-full" />
          <span className="absolute top-3 left-3 bg-near-black/80 px-2.5 py-1 text-[11px] font-medium uppercase tracking-brand-label text-cream-100 backdrop-blur-sm">
            {study.status}
          </span>
        </div>

        <div>
          <Image
            src={study.logo.src}
            alt={study.client}
            width={study.logo.width}
            height={study.logo.height}
            style={logoSize(study.logo, study.logo.displayHeight * 0.85)}
            className="mb-4"
          />
          <Meta study={study} />
          <h3 className="mt-3 mb-5 text-lg font-semibold leading-snug text-near-black transition-colors duration-300 group-hover:text-copper-700 sm:text-xl">
            {study.headline}
          </h3>
          <ReadMore />
        </div>
      </Link>
    </motion.article>
  );
}

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

        <FeaturedStudy study={featured} />

        <div className="mt-16 grid grid-cols-1 gap-12 border-t border-copper-500/25 pt-12 lg:mt-24 lg:grid-cols-2 lg:gap-16 lg:pt-16">
          {others.map((study, index) => (
            <SecondaryStudy key={study.slug} study={study} index={index} />
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
