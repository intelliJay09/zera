'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Shield, ChevronDown } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const StrategySessionForm = dynamic(() => import('@/components/forms/StrategySessionForm'));
const EngagementProtocol = dynamic(() => import('@/components/sections/EngagementProtocol'));
import {
  contactHeroHeadline,
  contactHeroDescription,
  contactFormContainer,
  contactInfoContainer,
} from '@/lib/animation-variants';

export default function BookSessionContent() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* Hero Section - Split Screen */}
      <section className="relative bg-near-black pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pb-32 overflow-hidden">
        {/* Ambient copper glow */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-copper-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-copper-500/5 rounded-full blur-[150px] pointer-events-none" />

        {/* Decorative lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-20 items-start">
            {/* Left: Text/Value */}
            <motion.div
              initial={prefersReducedMotion ? false : 'hidden'}
              animate="visible"
              variants={contactInfoContainer}
              className="lg:pt-8"
            >
              <motion.h1
                className="text-4xl leading-[1.3em] sm:text-5xl sm:leading-[1.1] lg:text-5xl xl:text-6xl font-bold font-display uppercase text-white tracking-brand-header mb-6 sm:mb-8 w-full text-center lg:text-left"
                variants={contactHeroHeadline}
              >
                THE ZERA STRATEGY SESSION
              </motion.h1>

              <motion.p
                className="text-lg sm:text-xl font-normal text-white leading-relaxed tracking-normal mb-8 text-center lg:text-left"
                variants={contactHeroDescription}
              >
                <span className="font-semibold text-copper-500">Stop Guessing. Get the Blueprint.</span>
                <br />
                <br />
                Secure a high-level executive review of your digital infrastructure. We diagnose your
                revenue leaks and engineer a custom roadmap for market sovereignty.
              </motion.p>

              {/* Trust Signal */}
              <motion.div
                className="flex items-center gap-4 flex-wrap justify-center lg:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <Shield className="w-4 h-4 text-copper-400" strokeWidth={1.5} />
                  <span className="font-medium">Limited Availability</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/70">
                  <CheckCircle2 className="w-4 h-4 text-copper-400" strokeWidth={1.5} />
                  <span className="font-medium">100% Satisfaction Guarantee</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Form (Sticky) */}
            <motion.div
              className="relative lg:sticky lg:top-32"
              initial={prefersReducedMotion ? false : 'hidden'}
              animate="visible"
              variants={contactFormContainer}
            >
              {/* Refined copper glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-copper-500/10 via-copper-500/5 to-transparent rounded-sm blur-3xl" />

              <div className="relative bg-[#2a2a2a] border border-copper-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-sm p-6 sm:p-8 lg:p-10">
                <StrategySessionForm />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Engagement Protocol Section */}
      <EngagementProtocol headline="WHAT YOU ARE BUYING" />

      {/* Value Stack Section */}
      <section className="relative bg-cream-200 py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-copper-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase text-near-black tracking-brand-header mb-12 sm:mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            WHAT YOU RECEIVE
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 mb-16">
            {/* Value Prop 1 */}
            <motion.div
              className="bg-white border border-gray-200 border-l-4 border-l-transparent hover:border-l-copper-500 p-8 lg:p-10 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="w-12 h-12 bg-copper-500/10 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-copper-500">1</span>
              </div>
              <h3 className="text-xl font-bold font-display uppercase text-near-black mb-4 tracking-brand-header">
                THE REVENUE STRESS-TEST
              </h3>
              <p className="text-base text-near-black/70 leading-relaxed">
                We audit your current digital foundation, website, ads, and lead flow against industrial
                benchmarks to identify exactly where you are losing money.
              </p>
            </motion.div>

            {/* Value Prop 2 */}
            <motion.div
              className="bg-white border border-gray-200 border-l-4 border-l-transparent hover:border-l-copper-500 p-8 lg:p-10 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-12 h-12 bg-copper-500/10 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-copper-500">2</span>
              </div>
              <h3 className="text-xl font-bold font-display uppercase text-near-black mb-4 tracking-brand-header">
                THE 60-MINUTE EXECUTIVE DEEP DIVE
              </h3>
              <p className="text-base text-near-black/70 leading-relaxed">
                A dedicated consultation with a Zera Strategy Director (not a salesperson). We strip away
                the jargon and focus on your P&L (Profit and Loss).
              </p>
            </motion.div>

            {/* Value Prop 3 */}
            <motion.div
              className="bg-white border border-gray-200 border-l-4 border-l-transparent hover:border-l-copper-500 p-8 lg:p-10 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="w-12 h-12 bg-copper-500/10 flex items-center justify-center mb-6">
                <span className="text-2xl font-bold text-copper-500">3</span>
              </div>
              <h3 className="text-xl font-bold font-display uppercase text-near-black mb-4 tracking-brand-header">
                THE SOVEREIGN ROADMAP
              </h3>
              <p className="text-base text-near-black/70 leading-relaxed">
                You leave the session with a documented architectural plan. Whether you hire us or not, you
                will know exactly what systems you need to build to dominate your category.
              </p>
            </motion.div>
          </div>

          {/* Price Anchor */}
          <motion.div
            className="max-w-3xl mx-auto text-center bg-gradient-to-br from-copper-500/10 via-copper-500/5 to-transparent border border-copper-500/20 p-8 lg:p-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="text-lg sm:text-xl font-normal text-near-black/70 mb-4">
              <span className="font-semibold text-near-black">Investment:</span>
            </p>
            <p className="text-3xl sm:text-4xl font-bold text-copper-500 mb-4">
              $100 USD / GHS 2,000
            </p>
            <p className="text-base text-near-black/60 leading-relaxed">
              Includes Pre-Session Audit + 60-Min Call + Roadmap
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section - Objection Handler */}
      <section className="relative bg-cream-100 py-16 sm:py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl font-semibold font-display uppercase text-near-black tracking-brand-header mb-12 sm:mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            FREQUENTLY ASKED QUESTIONS
          </motion.h2>

          <div className="max-w-4xl mx-auto space-y-4">
            {/* FAQ 1 */}
            <motion.div
              className="bg-white border border-gray-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <button
                onClick={() => toggleFaq(1)}
                className="w-full flex items-center justify-between p-8 text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-xl font-medium text-near-black capitalize">Why Is This Session Paid?</h3>
                <ChevronDown
                  className={`w-6 h-6 text-copper-500 transition-transform duration-300 flex-shrink-0 ${
                    openFaq === 1 ? 'rotate-180' : ''
                  }`}
                  strokeWidth={2}
                />
              </button>
              <AnimatePresence>
                {openFaq === 1 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8">
                      <p className="text-base text-near-black/70 leading-relaxed">
                        Most agencies offer &ldquo;Free Consultations&rdquo; which are thinly veiled sales pitches. The Zera
                        Strategy Session is a <span className="font-semibold">consulting product</span>, not a
                        sales call. You get actionable data, a technical audit, and a strategy roadmap that
                        provides value regardless of whether we work together long-term.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* FAQ 2 */}
            <motion.div
              className="bg-white border border-gray-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button
                onClick={() => toggleFaq(2)}
                className="w-full flex items-center justify-between p-8 text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-xl font-medium text-near-black capitalize">Who Is This Session For?</h3>
                <ChevronDown
                  className={`w-6 h-6 text-copper-500 transition-transform duration-300 flex-shrink-0 ${
                    openFaq === 2 ? 'rotate-180' : ''
                  }`}
                  strokeWidth={2}
                />
              </button>
              <AnimatePresence>
                {openFaq === 2 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8">
                      <p className="text-base text-near-black/70 leading-relaxed">
                        This is for <span className="font-semibold">Decision Makers</span> (CEOs, Founders, CMOs)
                        who are serious about installing a Digital Growth System. It is not for those looking for
                        &ldquo;cheap tricks&rdquo; or basic social media advice.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* FAQ 3 */}
            <motion.div
              className="bg-white border border-gray-200"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button
                onClick={() => toggleFaq(3)}
                className="w-full flex items-center justify-between p-8 text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-xl font-medium text-near-black capitalize">What Happens After I Book?</h3>
                <ChevronDown
                  className={`w-6 h-6 text-copper-500 transition-transform duration-300 flex-shrink-0 ${
                    openFaq === 3 ? 'rotate-180' : ''
                  }`}
                  strokeWidth={2}
                />
              </button>
              <AnimatePresence>
                {openFaq === 3 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8">
                      <p className="text-base text-near-black/70 leading-relaxed">
                        You will be redirected to our calendar to select your time. Our team immediately begins
                        your <span className="font-semibold">Pre-Call Audit</span>, analyzing your search entity
                        and digital footprint so we can hit the ground running during our call.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
