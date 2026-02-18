'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * FAQ data from home.json specification
 * These questions are designed to capture SEO keywords and answer common queries
 */
const faqs = [
  {
    question: 'What is the difference between a Digital Agency and a Growth System?',
    answer:
      'A traditional digital marketing agency often focuses on "vanity metrics" like likes and views. ZERA (A Growth System) focuses on Revenue Operations. We build assets—like SEO structures and Automated Funnels—that belong to you and generate returns long after the campaign ends.',
  },
  {
    question: 'Does ZERA handle Web Design and SEO?',
    answer:
      'Yes. The Digital HQ package is our proprietary approach to Web Design. We do not just make sites look good; we engineer them for Search Engine Optimization (SEO) and lead conversion from day one.',
  },
  {
    question: 'Who is ZERA designed for?',
    answer:
      'We work with ambitious companies in Ghana and globally who are ready to move beyond "freelancer" support and install a professional Lead Generation System.',
  },
];

/**
 * FAQSection Component
 * SEO honey pot - captures common search queries with keyword-rich answers
 */
export default function FAQSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const prefersReducedMotion = usePrefersReducedMotion();

  // Disable animations if user prefers reduced motion
  const shouldAnimate = !prefersReducedMotion && isInView;

  return (
    <section
      ref={sectionRef}
      className="bg-cream-200 pt-8 pb-16 sm:pt-12 sm:pb-24 md:pt-14 md:pb-28 lg:pt-16 lg:pb-36"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium tracking-brand-label uppercase text-copper-700 mb-6"
          >
            Questions & Answers
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl lg:text-6xl font-light font-display text-near-black tracking-tight sm:tracking-brand-header"
          >
            FREQUENTLY ASKED QUESTIONS
          </motion.h2>
        </div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={shouldAnimate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Accordion type="single" collapsible className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-cream-300/50"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-near-black hover:text-copper-600">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base font-light text-near-black/80 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
