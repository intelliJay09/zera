'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { logoSize, type CaseStudy } from '@/data/case-studies';
import CaseStudyCard from '@/components/sections/CaseStudyCard';

interface CaseStudyClientProps {
  study: CaseStudy;
  otherStudies: CaseStudy[];
}

const reveal = {
  initial: { opacity: 0, y: 30, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-80px' },
};

export default function CaseStudyClient({ study, otherStudies }: CaseStudyClientProps) {
  const details = [study.industry, study.location, study.year];

  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative bg-cream pt-32 pb-12 sm:pt-40 sm:pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-copper-500/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-copper-500/20 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1100px] relative">
          <motion.div
            initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-medium tracking-brand-label uppercase text-copper-600 hover:text-copper-500 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All case studies
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <Image
              src={study.logo.src}
              alt={study.client}
              width={study.logo.width}
              height={study.logo.height}
              priority
              style={logoSize(study.logo, study.logo.displayHeight * 1.25)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-6 flex flex-wrap gap-2"
          >
            {details.map((detail) => (
              <span
                key={detail}
                className="bg-copper-50 px-3 py-1.5 text-xs font-medium uppercase tracking-brand-label text-copper-700"
              >
                {detail}
              </span>
            ))}
            <span className="bg-near-black px-3 py-1.5 text-xs font-medium uppercase tracking-brand-label text-cream-100">
              {study.status}
            </span>
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold font-display uppercase text-near-black tracking-brand-header mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {study.headline}
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl text-near-black/70 leading-relaxed max-w-3xl mb-10"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {study.summary}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-x-8 gap-y-4"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href={study.liveUrl.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-brand-label uppercase text-near-black hover:text-copper-600 transition-colors"
            >
              Visit {study.liveUrl.label}
              <ArrowUpRight className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300" />
            </a>
            <Link
              href={study.service.href}
              className="group inline-flex items-center gap-2 text-sm font-medium tracking-brand-label uppercase text-copper-600 hover:text-copper-500 transition-colors"
            >
              {study.service.name}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="bg-cream pb-16 sm:pb-20 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <motion.figure
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.19, 0.91, 0.38, 0.98] }}
          >
            <div className="overflow-hidden bg-cream-200 shadow-2xl shadow-near-black/10">
              <Image
                src={study.hero.src}
                alt={study.hero.alt}
                width={study.hero.width}
                height={study.hero.height}
                priority
                sizes="(min-width: 1400px) 1336px, 100vw"
                className="h-auto w-full"
              />
            </div>
            {study.hero.caption && (
              <figcaption className="mt-4 text-sm text-near-black/60">{study.hero.caption}</figcaption>
            )}
          </motion.figure>
        </div>
      </section>

      {/* Figures */}
      <section className="relative bg-near-black py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-copper-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1100px] relative">
          <motion.h2
            {...reveal}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium tracking-brand-label uppercase text-copper-400 mb-10 sm:mb-12"
          >
            {study.figuresTitle}
          </motion.h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 sm:gap-y-12">
            {study.figures.map((figure, index) => (
              <motion.li
                key={figure.label}
                {...reveal}
                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.19, 0.91, 0.38, 0.98] }}
                className="flex flex-col gap-2"
              >
                <span className="text-4xl sm:text-5xl font-bold font-display tracking-tight text-white">
                  {figure.value}
                </span>
                <span className="text-sm sm:text-base text-white/60 leading-snug">{figure.label}</span>
              </motion.li>
            ))}
          </ul>

          <motion.p
            {...reveal}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 text-sm text-white/50"
          >
            {study.figuresNote}
          </motion.p>
        </div>
      </section>

      {/* The Challenge */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1100px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-16">
            <motion.h2
              {...reveal}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl font-bold font-display uppercase text-near-black tracking-brand-header"
            >
              What {study.client} needed
            </motion.h2>
            <div className="space-y-6">
              {study.challenge.map((paragraph, index) => (
                <motion.p
                  key={index}
                  {...reveal}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-lg text-near-black/75 leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What We Built */}
      <section className="bg-cream-100 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1100px]">
          <motion.h2
            {...reveal}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold font-display uppercase text-near-black tracking-brand-header mb-10 sm:mb-14"
          >
            What ZERA built
          </motion.h2>

          <ol className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {study.build.map((step, index) => (
              <motion.li
                key={step.title}
                {...reveal}
                transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
                className="group relative bg-white p-8 lg:p-10 transition-all duration-500 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute top-0 left-0 h-px w-12 bg-copper-500 transition-all duration-700 group-hover:w-full" />
                <span className="block text-sm font-medium tracking-brand-label text-copper-500 mb-4">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-base text-near-black/70 leading-relaxed">{step.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Gallery */}
      {study.gallery.length > 0 && (
        <section className="bg-cream py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
            <div className={study.gallery.length > 1 ? 'columns-1 md:columns-2 gap-6 lg:gap-8' : 'max-w-[1100px] mx-auto'}>
              {study.gallery.map((image, index) => (
                <motion.figure
                  key={image.src}
                  {...reveal}
                  transition={{ duration: 0.7, delay: index * 0.1, ease: [0.19, 0.91, 0.38, 0.98] }}
                  className="mb-6 lg:mb-8 break-inside-avoid"
                >
                  <div className="overflow-hidden bg-cream-200 shadow-xl shadow-near-black/5">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="h-auto w-full transition-transform duration-700 ease-out hover:scale-[1.02]"
                    />
                  </div>
                  {image.caption && (
                    <figcaption className="mt-4 text-sm text-near-black/60">{image.caption}</figcaption>
                  )}
                </motion.figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Questions, always open so search and answer engines read every answer */}
      <section className="bg-cream-100 py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1100px]">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6 lg:gap-16">
            <motion.h2
              {...reveal}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl font-bold font-display uppercase text-near-black tracking-brand-header"
            >
              Questions about this project
            </motion.h2>
            <dl className="border-t border-copper-500/25">
              {study.faqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  {...reveal}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  className="border-b border-copper-500/25 py-6 sm:py-8"
                >
                  <dt className="text-lg sm:text-xl font-semibold text-near-black mb-3">{faq.question}</dt>
                  <dd className="text-base sm:text-lg text-near-black/70 leading-relaxed">{faq.answer}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* More Case Studies */}
      {otherStudies.length > 0 && (
        <section className="bg-cream-200 py-16 sm:py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
            <motion.h2
              {...reveal}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl font-bold font-display uppercase text-near-black tracking-brand-header mb-10 sm:mb-14 text-center"
            >
              MORE CASE STUDIES
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-[1000px] mx-auto">
              {otherStudies.map((other, index) => (
                <CaseStudyCard key={other.slug} study={other} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="relative bg-near-black py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-copper-500/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            {...reveal}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase text-white tracking-brand-header mb-6">
              WANT A SYSTEM LIKE THIS?
            </h2>
            <p className="text-lg text-white/70 mb-10">
              Start with a systems audit. We will show you where revenue is leaking and what to build first.
            </p>
            <Link
              href="/systems-audit"
              data-gtm-event="cta_book_strategy"
              data-gtm-location={`case_study_${study.slug}`}
              className="group inline-flex items-center justify-center gap-3 bg-copper-500 hover:bg-copper-600 hover:scale-[1.02] text-white font-medium text-base tracking-brand-label uppercase px-8 py-3.5 min-h-[44px] transition-all duration-300 w-fit shadow-lg shadow-copper-500/10 hover:shadow-2xl hover:shadow-copper-500/25"
            >
              Book Your Systems Audit
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 group-hover:scale-110 transition-all duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
