'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Target, Lightbulb, Rocket, TrendingUp, Search, Users, Map, Palette, Megaphone, FileText, BarChart3, Settings, Zap, Database, LineChart } from 'lucide-react';

export default function SolutionsContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-near-black via-near-black/95 to-near-black/90 pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Ambient copper glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-copper-500/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Decorative copper lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-copper-500 via-copper-500/50 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
          <div className="max-w-4xl">
            <p className="text-sm font-medium tracking-brand-label uppercase text-copper-500 mb-6">
              Our Solutions
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-display uppercase text-cream-50 tracking-tight sm:tracking-brand-header leading-tight mb-6 sm:mb-8">
              STRATEGIC DIGITAL MARKETING SOLUTIONS
            </h1>
            <p className="text-lg sm:text-xl font-normal text-cream-100/80 leading-relaxed tracking-normal max-w-3xl">
              Transform your digital presence with strategic marketing solutions designed to accelerate growth and market dominance. Our comprehensive suite of services—from custom web development and data-driven SEO to premium brand design and social media management—delivers measurable results for ambitious businesses ready to lead their industries.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="bg-white py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            {/* Left: Content */}
            <div>
              <p className="text-sm font-medium tracking-brand-label uppercase text-copper-500 mb-6">
                Our Philosophy
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase text-near-black tracking-brand-header leading-tight mb-6">
                STRATEGIC PARTNERSHIP,{' '}
                <span className="text-copper-500">NOT VENDOR RELATIONSHIP</span>
              </h2>
              <p className="text-lg font-normal text-near-black/70 leading-relaxed tracking-normal mb-8">
                We don&apos;t believe in cookie-cutter solutions or transactional engagements. Every
                business has unique challenges, audiences, and opportunities. Our solutions are built
                on deep strategic collaboration, data-driven insights, and a relentless focus on
                measurable outcomes.
              </p>
              <p className="text-base font-normal text-near-black/60 leading-relaxed tracking-normal">
                From Fortune 500 enterprises to ambitious startups, we&apos;ve partnered with businesses
                across industries to architect digital strategies that drive sustainable competitive
                advantage.
              </p>
            </div>

            {/* Right: Stats */}
            <div className="grid grid-cols-2 gap-8">
              {[
                { number: '150+', label: 'Projects Delivered' },
                { number: '4.8x', label: 'Average ROI' },
                { number: '98%', label: 'Client Retention Rate' },
                { number: '$50M+', label: 'Revenue Generated for Clients' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl lg:text-5xl font-bold font-display uppercase text-copper-500 mb-2 tracking-brand-header">
                    {stat.number}
                  </div>
                  <div className="text-sm font-normal text-near-black/60 tracking-normal">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Solutions */}
      <section className="bg-white py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <div className="text-center mb-16 sm:mb-20">
            <p className="text-sm font-medium tracking-brand-label uppercase text-copper-500 mb-6">
              Our Services
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase text-near-black tracking-brand-header max-w-3xl mx-auto leading-tight">
              COMPREHENSIVE DIGITAL MARKETING SOLUTIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Custom Web Development',
                description:
                  'Bespoke websites and web applications built to your exact specifications. From business websites to SaaS platforms, we create scalable digital experiences that convert.',
                link: '/products/digital-hq',
              },
              {
                title: 'Software Development',
                description:
                  'Custom software solutions, mobile applications, and enterprise systems built with cutting-edge technologies. From MVP to full-scale production applications.',
                link: '/solutions/software-development',
              },
              {
                title: 'Strategic Brand Development',
                description:
                  'Complete brand strategy, visual identity systems, and positioning for premium brands. Create distinctive brand experiences that resonate with your target audience.',
                link: '/solutions/branding-design',
              },
              {
                title: 'SEO & Digital Marketing',
                description:
                  'Data-driven search engine optimization that increases organic visibility, drives qualified traffic, and establishes your brand as an industry authority.',
                link: '/products/digital-hq',
              },
              {
                title: 'Social Media Management',
                description:
                  'Strategic social media marketing that builds engaged communities, amplifies brand awareness, and converts followers into customers across all major platforms.',
                link: '/solutions/social-media-management',
              },
              {
                title: 'Content Creation',
                description:
                  'AI-powered content creation with human creativity. Blog posts, social media campaigns, email marketing, and video scripts that engage audiences and deliver measurable results.',
                link: '/products/growth-system',
              },
            ].map((service, index) => (
              <Link
                key={index}
                href={service.link}
                className="group relative bg-cream-100 p-10 hover:bg-cream-50 transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-16 h-px bg-copper-500 group-hover:w-full transition-all duration-700" />

                <h3 className="text-2xl font-normal font-montserrat text-near-black mb-4 tracking-wide">
                  {service.title}
                </h3>

                <p className="text-base font-normal text-near-black/70 leading-relaxed tracking-normal mb-6">
                  {service.description}
                </p>

                <div className="flex items-center gap-2 text-copper-500 group-hover:gap-4 transition-all duration-300">
                  <span className="text-xs font-medium tracking-brand-label uppercase">Learn More</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process - SCROLLYTELLING SECTION */}
      <ProcessScrollytelling />

      {/* Final CTA */}
      <section className="bg-gradient-to-br from-near-black via-near-black/95 to-near-black/90 py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1000px] relative text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase text-cream-200 tracking-brand-header mb-6">
            LET&apos;S BUILD YOUR GROWTH STORY
          </h2>
          <p className="text-lg font-normal text-cream-100/80 leading-relaxed tracking-normal mb-10 max-w-2xl mx-auto">
            Schedule a complimentary strategy consultation to explore how our solutions can transform
            your digital presence and drive measurable business growth.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-4 bg-copper-500 text-cream-50 font-medium text-sm tracking-brand-label uppercase hover:bg-copper-600 transition-all duration-300 group"
          >
            <span>Book Strategy Call</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </>
  );
}

// Scrollytelling Process Section Component
function ProcessScrollytelling() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      number: '01',
      title: 'Strategic Discovery',
      description:
        'Deep-dive analysis of your business, market positioning, competitive landscape, and growth objectives.',
      icon: Target,
      visual: {
        items: [
          {
            title: 'Market Analysis',
            description: 'Deep competitive positioning research across your target landscape',
            icon: Target
          },
          {
            title: 'Competitor Research',
            description: 'Industry landscape mapping and differentiation opportunities',
            icon: Search
          },
          {
            title: 'Audience Insights',
            description: 'Psychographic profiling and behavioral analysis of target segments',
            icon: Users
          },
          {
            title: 'Growth Mapping',
            description: 'Strategic opportunity identification and prioritization framework',
            icon: Map
          }
        ],
      },
    },
    {
      number: '02',
      title: 'Strategic Blueprint',
      description:
        'Custom growth architecture tailored to your unique business model with comprehensive roadmap.',
      icon: Lightbulb,
      visual: {
        items: [
          {
            title: 'Brand Strategy',
            description: 'Positioning architecture and messaging framework development',
            icon: Palette
          },
          {
            title: 'Channel Selection',
            description: 'Strategic platform mix based on audience behavior and ROI potential',
            icon: Megaphone
          },
          {
            title: 'Content Framework',
            description: 'Editorial calendar and content pillar structure for sustained engagement',
            icon: FileText
          },
          {
            title: 'KPI Definition',
            description: 'Performance metrics aligned with business objectives and growth targets',
            icon: BarChart3
          }
        ],
      },
    },
    {
      number: '03',
      title: 'Launch & Execution',
      description:
        'Precision implementation across all digital touchpoints with dedicated project management.',
      icon: Rocket,
      visual: {
        items: [
          {
            title: 'Platform Setup',
            description: 'Technical infrastructure and integration across all marketing channels',
            icon: Settings
          },
          {
            title: 'Content Creation',
            description: 'Premium asset production aligned with brand guidelines and strategy',
            icon: FileText
          },
          {
            title: 'Campaign Launch',
            description: 'Coordinated rollout with real-time monitoring and optimization',
            icon: Zap
          },
          {
            title: 'Performance Tracking',
            description: 'Dashboard implementation for transparent reporting and insights',
            icon: BarChart3
          }
        ],
      },
    },
    {
      number: '04',
      title: 'Optimize & Scale',
      description:
        'Continuous refinement based on real-time data, A/B testing, and strategic pivots to maximize ROI.',
      icon: TrendingUp,
      visual: {
        items: [
          {
            title: 'A/B Testing',
            description: 'Systematic experimentation to identify highest-performing variants',
            icon: Target
          },
          {
            title: 'Data Analysis',
            description: 'Deep-dive performance review identifying optimization opportunities',
            icon: Database
          },
          {
            title: 'Strategy Refinement',
            description: 'Quarterly planning cycles incorporating learnings and market shifts',
            icon: Settings
          },
          {
            title: 'Growth Acceleration',
            description: 'Resource reallocation and scaling of proven successful initiatives',
            icon: LineChart
          }
        ],
      },
    },
  ];

  // IntersectionObserver for scroll detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setActiveStep(index);
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' }
    );

    // Observe all step elements
    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream-200 py-16 sm:py-24 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <div className="text-center mb-16 sm:mb-20">
          <p className="text-sm font-medium tracking-brand-label uppercase text-copper-500 mb-6">
            How We Work
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display uppercase text-near-black tracking-brand-header max-w-3xl mx-auto leading-tight">
            OUR COLLABORATIVE PROCESS
          </h2>
        </div>

        {/* Desktop: Sticky Left + Scrolling Right */}
        <div className="hidden lg:grid lg:grid-cols-5 lg:gap-16 lg:items-start">
          {/* Sticky Left Side (40%) */}
          <div className="lg:col-span-2 lg:sticky lg:top-32 lg:h-[80vh]" style={{ perspective: '2000px' }}>
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`absolute inset-0 ${isActive ? '' : 'pointer-events-none'}`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Large Number with 3D flip + zoom animation */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, rotateX: 90 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 0.9,
                      rotateX: isActive ? 0 : 90,
                      filter: isActive ? 'blur(0px)' : 'blur(4px)',
                    }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-[200px] font-light font-display text-copper-500/5 leading-none mb-8"
                    style={{
                      transformOrigin: 'center',
                      transform: 'translateZ(-30px)',
                    }}
                  >
                    {step.number}
                  </motion.div>

                  {/* Icon with bounce animation */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 0.5,
                    }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
                    className="w-16 h-16 rounded-full bg-copper-500/10 flex items-center justify-center mb-8 shadow-lg shadow-copper-500/10"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    <Icon className="w-8 h-8 text-copper-500" strokeWidth={1.5} />
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      x: isActive ? 0 : -20,
                    }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-3xl font-bold font-display uppercase text-near-black mb-6 tracking-brand-header"
                    style={{ transform: 'translateZ(10px)' }}
                  >
                    {step.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      x: isActive ? 0 : -10,
                    }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="text-lg font-normal text-near-black/70 leading-relaxed tracking-normal mb-10"
                    style={{ transform: 'translateZ(5px)' }}
                  >
                    {step.description}
                  </motion.p>

                  {/* Progress Dots */}
                  <div className="flex items-center gap-3">
                    {steps.map((_, dotIndex) => (
                      <motion.div
                        key={dotIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                          opacity: isActive ? 1 : 0,
                          scale: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, delay: 0.5 + dotIndex * 0.1 }}
                        className={`${
                          dotIndex === activeStep
                            ? 'w-3 h-3 bg-copper-500'
                            : dotIndex < activeStep
                            ? 'w-2 h-2 bg-copper-500/50'
                            : 'w-2 h-2 bg-copper-500/20'
                        } rounded-full`}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Side: Scroll Trigger Zones (60%) */}
          <div className="lg:col-span-3 space-y-64">
            {steps.map((step, index) => (
              <DesktopTimelineZone
                key={index}
                step={step}
                index={index}
                stepRefs={stepRefs}
              />
            ))}
          </div>
        </div>

        {/* Mobile: Vertical Stack with Framer Motion */}
        <div className="lg:hidden space-y-16" style={{ perspective: '1000px' }}>
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <MobileStepItem key={index} step={step} index={index} Icon={Icon} />
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Desktop Timeline Zone Component with Framer Motion
function DesktopTimelineZone({
  step,
  index,
  stepRefs,
}: {
  step: any;
  index: number;
  stepRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div
      ref={(el) => {
        stepRefs.current[index] = el;
        if (ref) {
          (ref as any).current = el;
        }
      }}
      className="min-h-[400px] flex items-center justify-center"
    >
      <div className="w-full relative" style={{ transformStyle: 'preserve-3d' }}>
        {/* Vertical Timeline with draw animation */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute left-5 top-5 bottom-12 w-px bg-gradient-to-b from-copper-500/40 via-copper-500/20 to-copper-500/40 origin-top"
        />

        {/* Timeline Items */}
        <div className="space-y-16 pl-16">
          {step.visual.items.map((item: any, idx: number) => {
            const ItemIcon = item.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.4 + idx * 0.15 }}
                className="relative group"
                style={{ transform: 'translateZ(3px)' }}
              >
                {/* Icon on Timeline with zoom + hover effects */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.5 + idx * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                  className="absolute -left-16 top-1 w-10 h-10 rounded-full bg-white flex items-center justify-center border-2 border-copper-500/30 shadow-sm shadow-copper-500/10 transition-all group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-copper-500/25 group-hover:border-copper-500/50"
                >
                  <ItemIcon className="w-5 h-5 text-copper-500 transition-transform group-hover:scale-110" strokeWidth={1.5} />
                </motion.div>

                {/* Content with hover translation */}
                <div className="transition-all duration-300 group-hover:translate-x-2">
                  <h4 className="text-xl font-medium tracking-normal text-near-black mb-2 transition-colors group-hover:text-copper-600">
                    {item.title}
                  </h4>
                  <p className="text-base font-normal tracking-normal text-near-black/70 leading-relaxed transition-colors group-hover:text-near-black/90">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Mobile Step Item Component with Framer Motion
function MobileStepItem({ step, Icon }: { step: any; index: number; Icon: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Number Background with 3D depth */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
        transition={{ duration: 1, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-[100px] font-light font-display text-copper-500/5 leading-none mb-6"
        style={{ transform: 'translateZ(-20px)' }}
      >
        {step.number}
      </motion.div>

      {/* Icon with pop animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        className="w-14 h-14 rounded-full bg-copper-500/10 flex items-center justify-center mb-6 shadow-lg shadow-copper-500/10"
        style={{ transform: 'translateZ(10px)' }}
      >
        <Icon className="w-7 h-7 text-copper-500" strokeWidth={1.5} />
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-2xl font-bold font-display uppercase text-near-black mb-4 tracking-brand-header"
      >
        {step.title}
      </motion.h3>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-base font-normal text-near-black/70 leading-relaxed tracking-normal mb-8"
      >
        {step.description}
      </motion.p>

      {/* Timeline Items - Mobile with 3D card effect */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="relative mt-8"
        style={{ transform: 'translateZ(5px)' }}
      >
        {/* Vertical Timeline with draw animation */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute left-4 top-4 bottom-4 w-px bg-gradient-to-b from-copper-500/40 via-copper-500/20 to-copper-500/40 origin-top"
        />

        {/* Timeline Items */}
        <div className="space-y-8 pl-12">
          {step.visual.items.map((item: any, idx: number) => {
            const ItemIcon = item.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.7 + idx * 0.15 }}
                className="relative"
                style={{ transform: 'translateZ(3px)' }}
              >
                {/* Icon on Timeline with zoom */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.8 + idx * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                  className="absolute -left-12 top-0 w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 border-copper-500/30 shadow-md shadow-copper-500/15"
                >
                  <ItemIcon className="w-4 h-4 text-copper-500" strokeWidth={1.5} />
                </motion.div>

                {/* Content */}
                <div>
                  <h4 className="text-lg font-medium tracking-normal text-near-black mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm font-normal tracking-normal text-near-black/70 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
