'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, TrendingUp, Share2, FileText } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const services = [
  {
    icon: TrendingUp,
    title: 'SEO Services',
    description:
      'Data-driven search engine optimization that increases your visibility and drives qualified organic traffic. We implement comprehensive strategies that improve rankings, enhance user experience, and deliver measurable ROI.',
    features: [
      'Technical SEO optimization',
      'Keyword research & strategy',
      'Link building & authority growth',
      'Performance tracking & reporting',
    ],
    link: '/products/digital-hq',
  },
  {
    icon: Share2,
    title: 'Social Media Management',
    description:
      'Strategic social media presence that engages your audience and builds brand loyalty. We create compelling content, manage community interactions, and leverage paid campaigns to amplify your reach across all platforms.',
    features: [
      'Content strategy & creation',
      'Community engagement management',
      'Paid advertising campaigns',
      'Analytics & performance optimization',
    ],
    link: '/solutions/social-media-management',
  },
  {
    icon: FileText,
    title: 'Content Creation',
    description:
      'AI-powered content creation combined with human creativity. From blog posts and social media campaigns to email marketing and video scripts, we produce content that engages audiences and delivers measurable results.',
    features: [
      'AI-powered content strategy',
      'Blog posts & articles',
      'Social media content creation',
      'Email campaigns & video scripts',
    ],
    link: '/products/growth-system',
  },
];

export default function ScalePage() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const servicesRef = useRef(null);
  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.15 });

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: i * 0.15,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    }),
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-near-black via-near-black/95 to-near-black/90 pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        {/* Decorative elements */}
        <motion.div
          className="absolute top-0 right-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-[120px] pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-96 h-96 bg-copper-500/5 rounded-full blur-[120px] pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
          <div className="text-center max-w-4xl mx-auto">
            <motion.p
              className="text-sm font-medium tracking-brand-label uppercase text-copper-500 mb-6"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Growth Services
            </motion.p>
            <motion.h1
              className="text-[2.75rem] leading-[1.1] sm:text-5xl lg:text-6xl xl:text-7xl font-light font-display text-cream-50 tracking-brand-header mb-6 sm:mb-8"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Scale Your
              <span className="block mt-3 text-copper-500">Business Impact</span>
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl font-light text-cream-50/70 leading-relaxed tracking-normal max-w-3xl mx-auto"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              Amplify your reach and convert prospects into loyal customers. Our data-driven
              marketing strategies increase visibility, drive qualified traffic, and accelerate
              growth across all channels.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section ref={servicesRef} className="bg-white py-20 sm:py-28 lg:py-36">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  className="group relative h-full"
                  initial={prefersReducedMotion ? false : 'hidden'}
                  animate={isServicesInView ? 'visible' : 'hidden'}
                  custom={index}
                  variants={cardVariants}
                >
                  {/* Card Container */}
                  <div className="relative h-full bg-gradient-to-br from-near-black via-near-black/95 to-near-black/90 p-10 sm:p-12 lg:p-14 transition-all duration-700 ease-out hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-2 overflow-hidden">
                    {/* Subtle glow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-copper-500/0 via-copper-500/0 to-copper-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Copper accent line */}
                    <div className="absolute top-0 right-0 h-px w-24 bg-gradient-to-l from-copper-500 to-transparent group-hover:w-full transition-all duration-1000" />

                    <div className="relative z-10">
                      {/* Icon */}
                      <div className="mb-8">
                        <div className="w-14 h-14 rounded-full bg-copper-500/10 backdrop-blur-sm group-hover:bg-copper-500/20 flex items-center justify-center transition-all duration-500">
                          <Icon className="w-7 h-7 text-copper-500" strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light font-display uppercase text-cream-50 mb-5 tracking-brand-header leading-[1.2]">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-base font-normal text-cream-50 opacity-70 leading-relaxed tracking-normal mb-10">
                        {service.description}
                      </p>

                      {/* Feature Highlights */}
                      <div className="space-y-3.5 mb-12">
                        {service.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3.5">
                            <div className="w-2 h-2 rounded-full bg-copper-500 mt-2 flex-shrink-0" />
                            <p className="text-sm font-normal text-cream-100/70 tracking-normal">
                              {feature}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <Link
                        href={service.link}
                        className="inline-flex items-center gap-3 px-8 py-3.5 bg-copper-500 text-cream-50 hover:bg-copper-600 font-medium text-base tracking-normal transition-all duration-300 group/btn"
                      >
                        <span>Learn More</span>
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-cream-200 py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-[120px] pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1000px] relative text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-display uppercase text-near-black tracking-brand-header mb-6">
            READY TO SCALE YOUR GROWTH?
          </h2>
          <p className="text-lg font-normal text-near-black/70 leading-relaxed tracking-normal mb-10 max-w-2xl mx-auto">
            Let&apos;s amplify your reach and accelerate your business growth with data-driven
            marketing strategies.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 bg-near-black hover:bg-near-black/90 text-cream-50 font-medium text-base tracking-brand-label uppercase transition-all duration-300 group"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 group-hover:scale-110 transition-all duration-300" />
          </Link>
        </div>
      </section>
    </>
  );
}
