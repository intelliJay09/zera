'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, LifeBuoy, Globe, ChevronDown } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import Link from 'next/link';

export default function ContactPageContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-near-black pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        {/* Ambient copper glow */}
        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-copper-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-copper-500/5 rounded-full blur-[150px] pointer-events-none" />

        {/* Decorative line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-display uppercase text-white tracking-brand-header mb-6"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6 }}
            >
              GET IN TOUCH
            </motion.h1>

            <motion.p
              className="text-lg text-white/70 leading-relaxed max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Have questions about our services? Ready to start a project? Our team is here to help. For urgent matters, schedule a strategy session directly.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Traffic Control Grid */}
      <section className="relative bg-near-black py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card A: New Partnerships */}
            <motion.div
              className="relative bg-[#2a2a2a] border border-copper-500/20 p-8 lg:p-10 group hover:border-copper-500/40 transition-all duration-300"
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <ArrowRight className="w-8 h-8 text-copper-500 mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold font-display uppercase text-white mb-4 tracking-brand-header">
                Start a Project
              </h3>
              <Link
                href="/booking"
                data-gtm-event="cta_book_strategy"
                data-gtm-location="contact"
                className="inline-flex items-center gap-2 text-sm font-medium tracking-brand-label uppercase text-copper-500 hover:text-copper-400 transition-colors group-hover:gap-3 duration-300"
              >
                BOOK STRATEGY SESSION
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Card B: Client Support */}
            <motion.div
              className="relative bg-[#2a2a2a] border border-copper-500/20 p-8 lg:p-10 group hover:border-copper-500/40 transition-all duration-300"
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <LifeBuoy className="w-8 h-8 text-copper-500 mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold font-display uppercase text-white mb-4 tracking-brand-header">
                Active Systems Support
              </h3>
              <a
                href="mailto:support@zerahq.com"
                className="inline-flex items-center gap-2 text-sm font-medium text-copper-500 hover:text-copper-400 transition-colors"
              >
                support@zerahq.com
              </a>
            </motion.div>

            {/* Card C: Operational Base */}
            <motion.div
              className="relative bg-[#2a2a2a] border border-copper-500/20 p-8 lg:p-10 group hover:border-copper-500/40 transition-all duration-300"
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Globe className="w-8 h-8 text-copper-500 mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-bold font-display uppercase text-white mb-4 tracking-brand-header">
                Cloud-Native HQ
              </h3>
              <p className="text-sm text-white/70 mb-4">
                Operating from Accra, Ghana. Deploying systems globally.
              </p>
              <span className="inline-block text-xs font-medium tracking-brand-label uppercase text-copper-500 border border-copper-500/30 px-3 py-1.5">
                100% REMOTE
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* General Inquiry Form */}
      <section className="relative bg-near-black py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl relative">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold font-display uppercase text-white tracking-brand-header mb-12 text-center"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            SEND US A MESSAGE
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Refined copper glow */}
            <div className="absolute -inset-1 bg-gradient-to-br from-copper-500/10 via-copper-500/5 to-transparent rounded-sm blur-3xl" />

            <div className="relative bg-[#2a2a2a] border border-copper-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-sm p-6 sm:p-8 lg:p-10">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative bg-near-black py-16 sm:py-20 lg:py-24 overflow-hidden">
        {/* Decorative line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold font-display uppercase text-white tracking-brand-header mb-12 text-center"
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            FREQUENTLY ASKED QUESTIONS
          </motion.h2>

          <div className="space-y-4">
            {/* FAQ 1 */}
            <motion.div
              className="bg-[#2a2a2a] border border-copper-500/20"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <button
                onClick={() => toggleFaq(1)}
                className="w-full flex items-center justify-between p-6 sm:p-8 text-left hover:bg-white/5 transition-colors"
              >
                <h3 className="text-lg font-medium text-white">Do you accept walk-in consultations?</h3>
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
                    <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                      <p className="text-base text-white/70 leading-relaxed">
                        No. ZERA operates as a fully remote, cloud-native agency. All consultations are conducted via secure video conferencing to ensure maximum efficiency and global accessibility.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* FAQ 2 */}
            <motion.div
              className="bg-[#2a2a2a] border border-copper-500/20"
              initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <button
                onClick={() => toggleFaq(2)}
                className="w-full flex items-center justify-between p-6 sm:p-8 text-left hover:bg-white/5 transition-colors"
              >
                <h3 className="text-lg font-medium text-white">What is your response time?</h3>
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
                    <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                      <p className="text-base text-white/70 leading-relaxed">
                        All general inquiries are processed within <span className="font-semibold text-white">24 hours</span>. Active Client Support tickets are resolved faster.
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
