'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import {
  contactHeroOverline,
  contactHeroHeadline,
  contactHeroDescription,
  contactFormContainer,
  contactInfoContainer,
  contactInfoItemStagger,
  contactInfoItem,
} from '@/lib/animation-variants';

function ContactPageContent() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-cream-200 pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-copper-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
          <div className="text-center max-w-3xl mx-auto">
            <motion.p
              className="text-sm font-medium tracking-[0.25em] uppercase text-copper-500 mb-6"
              initial={prefersReducedMotion ? false : 'hidden'}
              animate="visible"
              variants={contactHeroOverline}
            >
              Get in Touch
            </motion.p>
            <motion.h1
              className="text-[2.75rem] leading-[1.1] sm:text-5xl lg:text-6xl xl:text-7xl font-light font-playfair text-near-black tracking-tight mb-6 sm:mb-8"
              initial={prefersReducedMotion ? false : 'hidden'}
              animate="visible"
              variants={contactHeroHeadline}
            >
              Let&apos;s Work Together
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl font-light text-near-black/70 leading-relaxed tracking-wide max-w-2xl mx-auto"
              initial={prefersReducedMotion ? false : 'hidden'}
              animate="visible"
              variants={contactHeroDescription}
            >
              Have a question or want to discuss your project? We are here to help. Reach out and let&apos;s start a conversation.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content - Form + Contact Info */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Contact Form */}
            <motion.div
              className="lg:col-span-7"
              initial={prefersReducedMotion ? false : 'hidden'}
              animate="visible"
              variants={contactFormContainer}
            >
              <div className="bg-white/60 backdrop-blur-sm border border-cream-300/50 p-6 sm:p-8 lg:p-10">
                <h2 className="text-2xl sm:text-3xl font-light font-playfair text-near-black mb-2 tracking-tight">
                  Send Us a Message
                </h2>
                <p className="text-base font-light text-near-black/60 mb-8 tracking-wide">
                  Fill out the form below and we will get back to you within 24 hours.
                </p>
                <ContactForm />
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="lg:col-span-5"
              initial={prefersReducedMotion ? false : 'hidden'}
              animate="visible"
              variants={contactInfoContainer}
            >
              <div className="sticky top-24">
                <h2 className="text-2xl sm:text-3xl font-light font-playfair text-near-black mb-8 tracking-tight">
                  Contact Information
                </h2>

                <motion.div
                  className="space-y-8"
                  initial={prefersReducedMotion ? false : 'hidden'}
                  animate="visible"
                  variants={contactInfoItemStagger}
                >
                  {/* Email */}
                  <motion.div variants={contactInfoItem} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-copper-500/10 flex items-center justify-center">
                      <Mail className="w-5 h-5 text-copper-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium tracking-[0.15em] uppercase text-copper-500 mb-2">
                        Email
                      </h3>
                      <a
                        href="mailto:hello@theastroflow.com"
                        className="text-base font-light text-near-black hover:text-copper-600 transition-colors duration-300 tracking-wide"
                      >
                        hello@theastroflow.com
                      </a>
                    </div>
                  </motion.div>

                  {/* Phone */}
                  <motion.div variants={contactInfoItem} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-copper-500/10 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-copper-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium tracking-[0.15em] uppercase text-copper-500 mb-2">
                        Phone
                      </h3>
                      <a
                        href="tel:+233508688828"
                        className="text-base font-light text-near-black hover:text-copper-600 transition-colors duration-300 tracking-wide"
                      >
                        +233 50 868 8828
                      </a>
                    </div>
                  </motion.div>

                  {/* Location */}
                  <motion.div variants={contactInfoItem} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-copper-500/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-copper-500" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium tracking-[0.15em] uppercase text-copper-500 mb-2">
                        Location
                      </h3>
                      <p className="text-base font-light text-near-black tracking-wide leading-relaxed">
                        Remote-first agency
                        <br />
                        Serving clients worldwide
                      </p>
                    </div>
                  </motion.div>

                  {/* Response Time */}
                  <motion.div
                    variants={contactInfoItem}
                    className="bg-copper-50/50 border border-copper-200/30 p-6 mt-8"
                  >
                    <h3 className="text-lg font-light font-playfair text-near-black mb-2 tracking-tight">
                      Quick Response Guaranteed
                    </h3>
                    <p className="text-sm font-light text-near-black/70 leading-relaxed tracking-wide">
                      We typically respond to all inquiries within 24 hours during business days.
                      For urgent matters, please call us directly.
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </>
  );
}

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-cream-200 pt-32 pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h1 className="font-playfair text-4xl font-light text-near-black sm:text-5xl mb-6 tracking-tight">
              Loading...
            </h1>
          </div>
        </main>
      }
    >
      <ContactPageContent />
    </Suspense>
  );
}
