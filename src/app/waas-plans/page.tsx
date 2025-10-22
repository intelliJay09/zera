'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { waasPlans } from '@/data/waas-pricing';
import CurrencyToggleWithSuspense from '@/components/currency/CurrencyProvider';
import PriceDisplay from '@/components/currency/PriceDisplay';
import AnimatedCheckIcon from '@/components/animations/AnimatedCheckIcon';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  waasHeroOverline,
  waasHeroHeadline,
  waasHeroDescription,
  waasDecorativeBlob,
  waasPricingHeader,
  waasPricingCardStagger,
  waasPricingCardEntrance,
  waasPopularBadge,
  waasFAQSection,
  waasFAQCategoryStagger,
  waasFAQCategory,
  waasCTASection,
  waasCTAButton,
} from '@/lib/animation-variants';

export default function WaaSPlansPage() {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Refs for scroll detection
  const pricingRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);

  // Scroll detection hooks
  const isPricingInView = useInView(pricingRef, { once: true, amount: 0.15 });
  const isFAQInView = useInView(faqRef, { once: true, amount: 0.2 });
  const isCTAInView = useInView(ctaRef, { once: true, amount: 0.25 });

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-cream-200 pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-[120px] pointer-events-none"
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="visible"
          variants={waasDecorativeBlob}
        />
        <motion.div
          className="absolute bottom-0 right-1/3 w-96 h-96 bg-copper-500/5 rounded-full blur-[120px] pointer-events-none"
          initial={prefersReducedMotion ? false : 'hidden'}
          animate="visible"
          variants={waasDecorativeBlob}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.p
              className="text-sm font-medium tracking-[0.25em] uppercase text-copper-500 mb-6"
              initial={prefersReducedMotion ? false : 'hidden'}
              animate="visible"
              variants={waasHeroOverline}
            >
              Website as a Service
            </motion.p>
            <motion.h1
              className="text-[2.75rem] leading-[1.1] sm:text-5xl lg:text-6xl xl:text-7xl font-light font-playfair text-near-black tracking-tight mb-6 sm:mb-8"
              initial={prefersReducedMotion ? false : 'hidden'}
              animate="visible"
              variants={waasHeroHeadline}
            >
              Premium Websites,{' '}
              <span className="block text-copper-500">Simple Monthly Plans</span>
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl font-light text-near-black/70 leading-relaxed tracking-wide max-w-3xl mx-auto"
              initial={prefersReducedMotion ? false : 'hidden'}
              animate="visible"
              variants={waasHeroDescription}
            >
              Launch your business online in 14 days or less. All plans include design, development,
              hosting, security, and ongoing support. No hidden fees, no surprises.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section ref={pricingRef} className="bg-white pt-20 pb-16 sm:pt-24 sm:pb-24 lg:pt-28 lg:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px]">
          {/* Section Header */}
          <motion.div
            className="text-center mb-4"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isPricingInView ? 'visible' : 'hidden'}
            variants={waasPricingHeader}
          >
            <h2 className="text-4xl sm:text-4xl lg:text-5xl font-light font-playfair text-near-black tracking-tight mb-3">
              Choose Your Plan
            </h2>

            {/* Currency Toggle */}
            <CurrencyToggleWithSuspense />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 md:gap-16 lg:gap-20"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isPricingInView ? 'visible' : 'hidden'}
            variants={waasPricingCardStagger}
          >
            {waasPlans.map((plan, planIndex) => (
              <motion.div
                key={plan.id}
                className="relative group"
                variants={waasPricingCardEntrance}
                style={{ perspective: '1000px' }}
              >
                {plan.popular && (
                  <motion.div
                    className="absolute -top-5 left-1/2 -translate-x-1/2 z-10"
                    initial={prefersReducedMotion ? false : 'hidden'}
                    animate={isPricingInView ? 'visible' : 'hidden'}
                    variants={waasPopularBadge}
                  >
                    <span className="inline-block px-4 py-1.5 bg-copper-500 text-cream-50 text-xs font-medium tracking-[0.15em] uppercase rounded-sm">
                      Most Popular
                    </span>
                  </motion.div>
                )}

                <motion.div
                  className={`relative h-full bg-gradient-to-br from-cream-100 to-white border transition-all duration-500 p-6 sm:p-8 lg:p-10 ${
                    plan.popular
                      ? 'border-copper-500/50 shadow-xl shadow-copper-500/10'
                      : 'border-cream-300/50 hover:border-copper-500/30 hover:shadow-lg'
                  }`}
                  whileHover={
                    prefersReducedMotion
                      ? {}
                      : {
                          y: -8,
                          boxShadow: plan.popular
                            ? '0 20px 40px rgba(184, 115, 51, 0.15)'
                            : '0 20px 40px rgba(0, 0, 0, 0.08)',
                          transition: { duration: 0.3 },
                        }
                  }
                >
                  {/* Plan Header */}
                  <div className="mb-8">
                    <h3 className="text-2xl lg:text-3xl font-light font-playfair text-near-black mb-2 tracking-tight">
                      {plan.name}
                    </h3>
                    <p className="text-base sm:text-sm font-light text-near-black/60 tracking-wide">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="mb-8 pb-8 border-b border-copper-500/10">
                    <PriceDisplay price={plan.price.monthly} period="/month" />
                  </div>

                  {/* Features */}
                  <div className="space-y-8 mb-10">
                    {plan.features.map((featureGroup, idx) => (
                      <div key={idx}>
                        <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-copper-500 mb-4">
                          {featureGroup.category}
                        </h4>
                        <ul className="space-y-4">
                          {featureGroup.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-3">
                              <AnimatedCheckIcon
                                className="w-5 h-5 sm:w-6 sm:h-6 text-copper-500 flex-shrink-0 mt-0.5"
                                strokeWidth={1.5}
                                delay={isPricingInView ? 0.4 + planIndex * 0.15 + itemIdx * 0.05 : 0}
                              />
                              <span className="text-base sm:text-sm font-light text-near-black/80 leading-relaxed tracking-wide">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Button
                    asChild
                    variant="primary"
                    size="lg"
                    className="w-full uppercase tracking-[0.15em] text-sm group"
                  >
                    <Link href={plan.cta.href}>
                      <span>{plan.cta.text}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 group-hover:scale-110 transition-all duration-300" />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="bg-cream-200 py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-6 sm:px-8 lg:px-8 max-w-[1000px]">
          <motion.div
            className="text-center mb-16"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isFAQInView ? 'visible' : 'hidden'}
            variants={waasFAQSection}
          >
            <p className="text-sm font-medium tracking-[0.25em] uppercase text-copper-500 mb-6">
              Common Questions
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-playfair text-near-black tracking-tight">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div
            className="space-y-8 sm:space-y-12"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isFAQInView ? 'visible' : 'hidden'}
            variants={waasFAQCategoryStagger}
          >
            {/* Service & Support */}
            <motion.div variants={waasFAQCategory}>
              <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-copper-500 mb-6">
                Service & Support
              </h3>
              <Accordion type="single" collapsible className="space-y-4">
                {([
                  {
                    question: 'What are your support response times?',
                    answer:
                      'Standard Support (Business Standard & Commerce plans): We acknowledge requests within 8 business hours. Priority Support (Business Growth+ plan): We acknowledge requests within 4 business hours.',
                  },
                  {
                    question: 'What is your uptime guarantee?',
                    answer:
                      'We guarantee 99.9% uptime for your website, excluding scheduled maintenance. In the unlikely event of downtime, we work diligently to restore service as quickly as possible.',
                  },
                  {
                    question: 'What maintenance is included?',
                    answer:
                      'All plans include weekly backups of your website files and database, regular security scans, and necessary software updates to protect your site.',
                  },
                  {
                    question: 'What counts as a "minor update"?',
                    answer:
                      'A minor update is any single task that can be completed in 30 minutes or less. Examples include: changing text on a page, updating contact information, swapping an image you provide, adding photos to an existing gallery, or minor menu changes. This does NOT include: creating new pages, adding new features, significant layout changes, or graphic design work.',
                  },
                ] as const).map((faq, index) => (
                  <AccordionItem key={index} value={`service-${index}`} className="bg-white/60 backdrop-blur-sm px-5 sm:px-8 rounded-sm border-b-0">
                    <AccordionTrigger className="text-lg sm:text-xl font-normal font-montserrat text-near-black tracking-wide hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base font-light text-near-black/70 leading-relaxed tracking-wide">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            {/* Ownership & Flexibility */}
            <motion.div variants={waasFAQCategory}>
              <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-copper-500 mb-6">
                Ownership & Flexibility
              </h3>
              <Accordion type="single" collapsible className="space-y-4">
                {([
                  {
                    question: 'Do I own my website?',
                    answer:
                      'You have complete ownership of your domain name, all content, images, and brand assets from day one. The website platform, code, and technical infrastructure remain our property during your subscription. You can purchase full ownership for a one-time fee of ₵5,000.',
                  },
                  {
                    question: 'Can I buy out my website?',
                    answer:
                      "Yes! For a one-time buyout fee of ₵5,000, you can purchase full ownership of your website. You'll receive a complete package of your website files and database, allowing you to move to any hosting provider of your choice.",
                  },
                  {
                    question: 'What happens if I cancel?',
                    answer:
                      'You can cancel anytime with 30 days notice. Your website remains active for 30 days after cancellation. We provide a complete content export (text, images, data) so you never lose your work. The website will go offline after the 30-day period unless you opt for the buyout.',
                  },
                  {
                    question: 'Can I upgrade or downgrade my plan?',
                    answer:
                      'Absolutely! Change plans at any time with no penalties or switching fees. Upgrades take effect immediately with prorated billing. Downgrades apply at your next billing cycle to ensure uninterrupted service.',
                  },
                ] as const).map((faq, index) => (
                  <AccordionItem key={index} value={`ownership-${index}`} className="bg-white/60 backdrop-blur-sm px-5 sm:px-8 rounded-sm border-b-0">
                    <AccordionTrigger className="text-lg sm:text-xl font-normal font-montserrat text-near-black tracking-wide hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base font-light text-near-black/70 leading-relaxed tracking-wide">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            {/* Billing & Payments */}
            <motion.div variants={waasFAQCategory}>
              <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-copper-500 mb-6">
                Billing & Payments
              </h3>
              <Accordion type="single" collapsible className="space-y-4">
                {([
                  {
                    question: 'What payment methods do you accept?',
                    answer:
                      'We accept all major credit cards (Visa, Mastercard, American Express), bank transfers, and mobile money (for Ghana clients). Monthly subscriptions are billed automatically on your chosen date.',
                  },
                  {
                    question: 'When are payments due?',
                    answer:
                      'Invoices are issued on the 25th of each month for the upcoming month of service. Payment is due by the 1st of the service month. Payments more than 7 days late may incur a 5% late fee.',
                  },
                  {
                    question: 'Will my price ever increase?',
                    answer:
                      "Your monthly rate is locked in for your first 12 months. After that, we may adjust pricing with 60 days advance notice. You can cancel or downgrade if the new pricing doesn't work for you.",
                  },
                ] as const).map((faq, index) => (
                  <AccordionItem key={index} value={`billing-${index}`} className="bg-white/60 backdrop-blur-sm px-5 sm:px-8 rounded-sm border-b-0">
                    <AccordionTrigger className="text-lg sm:text-xl font-normal font-montserrat text-near-black tracking-wide hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base font-light text-near-black/70 leading-relaxed tracking-wide">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            {/* What's Included & Excluded */}
            <motion.div variants={waasFAQCategory}>
              <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-copper-500 mb-6">
                What&apos;s Included & Excluded
              </h3>
              <Accordion type="single" collapsible className="space-y-4">
                {([
                  {
                    question: 'How long does it take to launch?',
                    answer:
                      "Business Standard and Commerce plans typically launch in 10-14 days after you provide all content and assets. Business Growth+ plans may take 3-4 weeks depending on complexity and custom features. We'll provide a detailed timeline during onboarding.",
                  },
                  {
                    question: 'How many updates are included each month?',
                    answer:
                      'Business Standard includes 2 minor updates per month. Business Commerce includes 4 minor updates. Business Growth+ includes 6 minor updates. A minor update is any task taking 30 minutes or less. Larger changes are quoted separately.',
                  },
                  {
                    question: "What's NOT included in my plan?",
                    answer:
                      'Plans do not include: third-party service fees (domain registration, premium plugins, paid APIs), copywriting or content creation, professional photography, extensive custom development (quoted separately), advertising/marketing spend, or migration from complex legacy systems.',
                  },
                ] as const).map((faq, index) => (
                  <AccordionItem key={index} value={`included-${index}`} className="bg-white/60 backdrop-blur-sm px-5 sm:px-8 rounded-sm border-b-0">
                    <AccordionTrigger className="text-lg sm:text-xl font-normal font-montserrat text-near-black tracking-wide hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-base font-light text-near-black/70 leading-relaxed tracking-wide">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section ref={ctaRef} className="bg-near-black py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1000px] relative text-center"
          initial={prefersReducedMotion ? false : 'hidden'}
          animate={isCTAInView ? 'visible' : 'hidden'}
          variants={waasCTASection}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-playfair text-cream-200 tracking-tight mb-6">
            Let&apos;s Build Your Digital Presence
          </h2>
          <p className="text-lg font-light text-light-gray leading-relaxed tracking-wide mb-10 max-w-2xl mx-auto">
            Tell us about your project and we&apos;ll craft a tailored solution for your business.
          </p>
          <motion.div
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isCTAInView ? 'visible' : 'hidden'}
            variants={waasCTAButton}
          >
            <Button
              asChild
              variant="primary"
              size="lg"
              className="uppercase tracking-[0.15em] text-sm group"
            >
              <Link href="/contact">
                <span className="whitespace-nowrap">Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 group-hover:scale-110 transition-all duration-300 flex-shrink-0" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
