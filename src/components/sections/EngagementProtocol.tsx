'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Scan, Layers, Cog, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface EngagementProtocolProps {
  headline?: string;
  className?: string;
}

const phases = [
  {
    number: 1,
    title: 'THE AUDIT',
    subtitle: '(The Gate)',
    description:
      'We do not guess. We diagnose. You book a high-level Strategy Session where we audit your current revenue leaks and map the opportunities.',
    icon: Scan,
  },
  {
    number: 2,
    title: 'THE ARCHITECTURE',
    subtitle: '',
    description:
      'Based on the audit, we engineer a custom Revenue Roadmap. You receive a proprietary execution plan tailored to your market position.',
    icon: Layers,
  },
  {
    number: 3,
    title: 'THE DEPLOYMENT',
    subtitle: '',
    description:
      'We execute the build. Whether it is a Digital HQ or a Growth System, we deploy within a 90-day sprint cycle.',
    icon: Cog,
  },
  {
    number: 4,
    title: 'OPTIMIZATION & SCALE',
    subtitle: '',
    description:
      'Launch is just Day 1. For the next 90 days, we analyze live traffic, calibrate user behavior, and harden the security. We turn the build into a performing asset.',
    icon: TrendingUp,
  },
];

export default function EngagementProtocol({
  headline = 'HOW WE ENGAGE',
  className = '',
}: EngagementProtocolProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activePhase, setActivePhase] = useState<number | null>(null);

  return (
    <section className={`relative bg-cream-200 py-16 sm:py-24 md:py-32 overflow-hidden ${className}`}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-copper-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 0.3 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-[1px] w-32 bg-copper-500 mx-auto mb-8"
          />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase text-near-black tracking-brand-header">
            {headline}
          </h2>
        </motion.div>

        {/* Desktop: Sequential Arc Cascade */}
        <div className="hidden lg:block mb-16">
          <div
            className="flex justify-center items-end gap-5 pt-20 pb-4"
            style={{
              perspective: '1200px',
              perspectiveOrigin: 'center bottom',
            }}
          >
            {phases.map((phase, index) => {
              const Icon = phase.icon;
              const isActive = activePhase === phase.number;

              // Arc curve: center cards rise upward, edge cards at baseline
              const normalizedX = index / (phases.length - 1);
              const arcRise = 4 * 60 * normalizedX * (1 - normalizedX);

              // Rotation: tilt panels based on arc position (-8° to +8°)
              const rotation = ((index - (phases.length - 1) / 2) / ((phases.length - 1) / 2)) * 8;

              // Adjacent panel interactions on hover
              const getAdjacentRotation = () => {
                if (!isActive) return 0;
                const activeIndex = activePhase! - 1;
                if (index === activeIndex - 1) return -5;
                if (index === activeIndex + 1) return 5;
                return 0;
              };

              // Opacity for non-active panels
              const getOpacity = () => {
                if (!activePhase) return 1;
                if (isActive) return 1;
                if (Math.abs(index - (activePhase - 1)) === 1) return 1;
                return 0.7;
              };

              return (
                <div
                  key={phase.number}
                  onMouseEnter={() => setActivePhase(phase.number)}
                  onMouseLeave={() => setActivePhase(null)}
                  onFocus={() => setActivePhase(phase.number)}
                  onBlur={() => setActivePhase(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActivePhase(isActive ? null : phase.number);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`Phase ${phase.number}: ${phase.title}`}
                  className="flex-1 max-w-[280px] cursor-pointer focus:outline-none focus:ring-2 focus:ring-copper-500 focus:ring-offset-2 rounded-lg transition-all duration-400 ease-out"
                  style={{
                    transformStyle: 'preserve-3d',
                    willChange: 'transform, opacity',
                    zIndex: isActive ? 50 : 10 + index,
                    transform: `
                      translateY(${-arcRise}px)
                      rotateY(${rotation + getAdjacentRotation()}deg)
                      rotateZ(${rotation * 0.15}deg)
                      translateZ(${isActive ? 80 : 0}px)
                      scale(${isActive ? 1.05 : 1})
                    `,
                    opacity: getOpacity(),
                  }}
                >
                  {/* Glass Panel */}
                  <div
                    className="relative w-full h-[420px] rounded-lg overflow-hidden transition-all duration-400 ease-out"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      border: isActive
                        ? '2px solid rgba(184, 115, 51, 0.6)'
                        : '2px solid rgba(184, 115, 51, 0.3)',
                      boxShadow: isActive
                        ? `
                          0 8px 32px rgba(184, 115, 51, 0.3),
                          0 4px 16px rgba(184, 115, 51, 0.2),
                          0 2px 8px rgba(184, 115, 51, 0.15),
                          inset 0 1px 0 rgba(255, 255, 255, 0.3),
                          inset 0 -1px 0 rgba(0, 0, 0, 0.1)
                        `
                        : `
                          0 8px 32px rgba(0, 0, 0, 0.12),
                          0 4px 16px rgba(0, 0, 0, 0.08),
                          0 2px 8px rgba(0, 0, 0, 0.04),
                          inset 0 1px 0 rgba(255, 255, 255, 0.2)
                        `,
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Frosted texture overlay */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                      }}
                    />

                    {/* Content */}
                    <div className="relative h-full p-8 flex flex-col">
                      {/* Phase Number - Engraved Style */}
                      <div className="text-8xl font-bold font-display text-copper-500/20 leading-none mb-4">
                        {phase.number}
                      </div>

                      {/* Icon */}
                      <div className="mb-6">
                        <Icon
                          className="w-12 h-12 text-copper-500"
                          strokeWidth={1.5}
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold font-display uppercase text-near-black mb-2 tracking-brand-header">
                        {phase.title}
                        {phase.subtitle && (
                          <span className="block text-base font-normal text-copper-600 mt-1">
                            {phase.subtitle}
                          </span>
                        )}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-near-black/70 leading-relaxed mt-auto">
                        {phase.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tablet: 2x2 Grid with Glass Effect */}
        <div className="hidden md:grid lg:hidden grid-cols-2 gap-8 mb-16">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.6,
                  delay: prefersReducedMotion ? 0 : index * 0.1,
                }}
                className="relative rounded-lg overflow-hidden p-8"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '2px solid rgba(184, 115, 51, 0.3)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                }}
              >
                {/* Phase Number */}
                <div className="text-6xl font-bold font-display text-copper-500/20 leading-none mb-4">
                  {phase.number}
                </div>

                {/* Icon */}
                <div className="mb-4">
                  <Icon className="w-10 h-10 text-copper-500" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold font-display uppercase text-near-black mb-2 tracking-brand-header">
                  {phase.title}
                  {phase.subtitle && (
                    <span className="block text-base font-normal text-copper-500 mt-1">
                      {phase.subtitle}
                    </span>
                  )}
                </h3>

                {/* Description */}
                <p className="text-base text-near-black/70 leading-relaxed">
                  {phase.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: Vertical Stack with Glass Effect */}
        <div className="md:hidden space-y-6 mb-12">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            return (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.6,
                  delay: prefersReducedMotion ? 0 : index * 0.1,
                }}
                className="relative rounded-lg overflow-hidden p-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '2px solid rgba(184, 115, 51, 0.3)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                }}
              >
                {/* Phase Number */}
                <div className="text-5xl font-bold font-display text-copper-500/20 leading-none mb-3">
                  {phase.number}
                </div>

                {/* Icon */}
                <div className="mb-3">
                  <Icon className="w-8 h-8 text-copper-500" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold font-display uppercase text-near-black mb-2 tracking-brand-header">
                  {phase.title}
                  {phase.subtitle && (
                    <span className="block text-base font-normal text-copper-500 mt-1">
                      {phase.subtitle}
                    </span>
                  )}
                </h3>

                {/* Description */}
                <p className="text-base text-near-black/70 leading-relaxed">
                  {phase.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.4 }}
          className="text-center"
        >
          <Button asChild variant="primary" size="lg" className="group">
            <Link href="/booking" data-gtm-event="cta_book_strategy" data-gtm-location="engagement_protocol">
              SECURE DIAGNOSTIC SESSION
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 group-hover:scale-110 transition-all duration-300" />
            </Link>
          </Button>
          <p className="text-sm text-near-black/60 mt-4 tracking-normal">
            60-minute executive review • Revenue stress-test • Custom roadmap
          </p>
        </motion.div>
      </div>
    </section>
  );
}
