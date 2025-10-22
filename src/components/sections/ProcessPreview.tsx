'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Target, Lightbulb, Rocket, TrendingUp } from 'lucide-react';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  timeline: string;
}

const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Strategic Discovery',
    description:
      'Deep-dive analysis of your business, market positioning, competitive landscape, and growth objectives. We identify untapped opportunities and strategic gaps.',
    icon: Target,
    timeline: 'Week 1-2',
  },
  {
    number: '02',
    title: 'Strategic Blueprint',
    description:
      'Custom growth architecture tailored to your unique business model. Comprehensive roadmap covering channels, messaging, metrics, and success milestones.',
    icon: Lightbulb,
    timeline: 'Week 2-3',
  },
  {
    number: '03',
    title: 'Launch & Execution',
    description:
      'Precision implementation across all digital touchpoints. Campaign deployment, creative production, technical optimization, and performance tracking.',
    icon: Rocket,
    timeline: 'Week 4+',
  },
  {
    number: '04',
    title: 'Optimize & Scale',
    description:
      'Continuous refinement based on real-time data. A/B testing, budget optimization, channel expansion, and strategic pivots to maximize ROI.',
    icon: TrendingUp,
    timeline: 'Ongoing',
  },
];

export default function ProcessPreview() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [lineProgress, setLineProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setLineProgress(100);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream-200 py-16 sm:py-24 md:py-32 lg:py-40 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-copper-500/5 to-transparent pointer-events-none" />

      {/* Decorative copper accents */}
      <div className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-copper-500 to-transparent" />
      <div className="absolute bottom-0 right-0 w-1/3 h-px bg-gradient-to-l from-copper-500 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] relative">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20 lg:mb-24">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-copper-500 mb-6">
            Our Process
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light font-playfair text-near-black tracking-tight max-w-3xl mx-auto leading-tight mb-4 sm:mb-6">
            The Astra Flow Methodology
          </h2>
          <p className="text-sm sm:text-base font-light text-near-black/80 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-8 px-4 sm:px-0">
            A proven system that transforms ambitious businesses into market leaders. Strategic,
            data-driven, and relentlessly focused on measurable growth.
          </p>
          <Link
            href="/process"
            className="group inline-flex items-center gap-3 text-copper-500 hover:gap-5 transition-all duration-300"
          >
            <span className="text-sm font-medium tracking-[0.15em] uppercase">
              View Full Process
            </span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Timeline */}
        <div className="relative max-w-6xl mx-auto">
          {/* Horizontal Line */}
          <div className="absolute top-12 left-0 w-full h-px bg-copper-500/20 hidden lg:block" />
          <div
            className="absolute top-12 left-0 h-px bg-copper-500 hidden lg:block transition-all duration-2000 ease-out"
            style={{ width: `${lineProgress}%` }}
          />

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="group relative"
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Step Number & Icon */}
                  <div className="relative mb-6 flex flex-col items-center">
                    {/* Timeline Dot */}
                    <div
                      className={`w-6 h-6 rounded-full border-2 bg-cream-200 z-10 transition-all duration-500 ${
                        activeStep === index
                          ? 'border-copper-500 scale-125'
                          : 'border-copper-500/40 group-hover:border-copper-500 group-hover:scale-110'
                      }`}
                    >
                      <div
                        className={`absolute inset-1 rounded-full transition-all duration-500 ${
                          activeStep === index ? 'bg-copper-500' : 'bg-transparent'
                        }`}
                      />
                    </div>

                    {/* Icon Container */}
                    <div
                      className={`mt-6 sm:mt-8 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
                        activeStep === index
                          ? 'bg-copper-500/20 scale-110'
                          : 'bg-copper-500/10 group-hover:bg-copper-500/15 group-hover:scale-105'
                      }`}
                    >
                      <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-copper-500" />
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="text-center">
                    <div className="mb-3">
                      <span className="text-xs font-medium tracking-[0.2em] uppercase text-copper-500 bg-copper-500/10 px-3 py-1.5 rounded-sm">
                        {step.timeline}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl lg:text-2xl font-normal font-montserrat text-near-black mb-3 sm:mb-4 tracking-wide">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-light text-near-black/80 leading-relaxed tracking-wide">
                      {step.description}
                    </p>
                  </div>

                  {/* Step Number Watermark */}
                  <div
                    className={`absolute -top-4 left-1/2 -translate-x-1/2 text-[80px] font-light font-playfair text-copper-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 leading-none pointer-events-none`}
                  >
                    {step.number}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-copper-500/10 blur-xl rounded-full" />
            <div className="relative bg-white/60 backdrop-blur-sm px-12 py-8 rounded-sm">
              <p className="text-xl font-light font-playfair text-near-black mb-4 tracking-tight">
                Ready to transform your business?
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 text-copper-500 hover:gap-5 transition-all duration-300 font-medium text-sm tracking-[0.15em] uppercase"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
