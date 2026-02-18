'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Palette,
  Sparkles,
  Target,
  Zap,
  Heart,
  TrendingUp,
  CheckCircle2,
  ChevronDown,
  Calendar,
  Trophy,
  Users,
  Eye,
  Layers,
  MessageCircle,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { Button } from '@/components/ui/button';
import { brandingDesignPricingConfig } from '@/data/branding-design-pricing';

const PricingSection = dynamic(() => import('@/components/pricing/PricingSection'));

export default function BrandDevelopmentPage() {
  const router = useRouter();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Section refs for scroll triggers
  const servicesRef = useRef(null);
  const whyBrandRef = useRef(null);
  const approachRef = useRef(null);
  const resultsRef = useRef(null);
  const faqRef = useRef(null);

  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.15 });
  const isWhyBrandInView = useInView(whyBrandRef, { once: true, amount: 0.2 });
  const isApproachInView = useInView(approachRef, { once: true, amount: 0.15 });
  const isResultsInView = useInView(resultsRef, { once: true, amount: 0.2 });
  const isFaqInView = useInView(faqRef, { once: true, amount: 0.2 });

  // Animation variants
  const heroContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const heroItem = {
    hidden: { opacity: 0, y: 60, filter: 'blur(20px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1.4,
        ease: [0.19, 0.91, 0.38, 0.98] as const,
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariant = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
      rotateX: 20,
      filter: 'blur(10px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const metricCard = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateY: -15,
      filter: 'blur(12px)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const timelineStep = {
    hidden: {
      opacity: 0,
      x: -40,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.7,
        ease: [0.33, 0.82, 0.44, 0.99] as const,
      },
    },
  };

  // Data
  const brandServices = [
    {
      icon: Palette,
      title: 'Visual Identity Design',
      tagline: 'The Face of Your Brand',
      description:
        'Custom logo design, color palettes, typography systems, and visual elements that capture your brand essence and stand out in the market.',
      features: [
        'Logo design & variations',
        'Brand color system',
        'Typography selection',
        'Iconography & patterns',
      ],
    },
    {
      icon: Layers,
      title: 'Brand Strategy',
      tagline: 'The Foundation of Everything',
      description:
        'Strategic brand positioning, messaging frameworks, and competitive differentiation that define who you are and how you connect with customers.',
      features: [
        'Brand positioning strategy',
        'Target audience research',
        'Competitor analysis',
        'Value proposition development',
      ],
    },
    {
      icon: MessageCircle,
      title: 'Brand Voice & Messaging',
      tagline: 'Words That Resonate',
      description:
        'Distinctive brand voice, messaging pillars, and communication guidelines that ensure consistency across every customer touchpoint.',
      features: [
        'Brand voice guidelines',
        'Messaging frameworks',
        'Tagline development',
        'Communication templates',
      ],
    },
    {
      icon: Eye,
      title: 'Brand Guidelines',
      tagline: 'Consistency at Scale',
      description:
        'Comprehensive brand guideline documents that ensure flawless execution across all media, platforms, and team members.',
      features: [
        'Logo usage rules',
        'Color & typography standards',
        'Design system documentation',
        'Application examples',
      ],
    },
    {
      icon: Sparkles,
      title: 'Brand Collateral Design',
      tagline: 'Every Touchpoint Matters',
      description:
        'Professional design of business cards, stationery, presentations, and marketing materials that bring your brand to life.',
      features: [
        'Business card design',
        'Letterhead & stationery',
        'Presentation templates',
        'Social media templates',
      ],
    },
  ];

  const whyBrandMetrics = [
    {
      icon: TrendingUp,
      metric: '23%',
      label: 'Higher Revenue Growth',
      description: 'Brands with consistent presentation grow revenue 23% faster',
      color: 'from-copper-500 to-copper-600',
    },
    {
      icon: Heart,
      metric: '3.5x',
      label: 'Brand Visibility',
      description: 'Consistent branding increases brand recognition by 3.5x',
      color: 'from-rose-500 to-pink-600',
    },
    {
      icon: Target,
      metric: '68%',
      label: 'Customer Trust',
      description: 'Professional branding makes businesses appear more trustworthy',
      color: 'from-violet-500 to-purple-600',
    },
    {
      icon: Zap,
      metric: '89%',
      label: 'First Impression',
      description: 'Consumers form first impressions based on visual design',
      color: 'from-amber-500 to-orange-600',
    },
  ];

  const approachSteps = [
    {
      number: 1,
      title: 'Brand Discovery & Research',
      description:
        'Deep-dive workshops to understand your business, audience, values, and market position. Competitive analysis and industry research inform strategic direction.',
      deliverables: ['Brand workshop session', 'Competitor analysis', 'Audience personas', 'Market positioning map'],
    },
    {
      number: 2,
      title: 'Strategic Foundation',
      description:
        'Develop brand positioning, messaging framework, and visual direction. Define what makes you unique and how you&apos;ll communicate it consistently.',
      deliverables: ['Brand positioning statement', 'Messaging pillars', 'Visual mood boards', 'Brand personality traits'],
    },
    {
      number: 3,
      title: 'Visual Identity Creation',
      description:
        'Design custom logo concepts, color palettes, typography systems, and supporting visual elements. Multiple concepts refined based on your feedback.',
      deliverables: ['Logo concepts & variations', 'Color palette', 'Typography system', 'Visual elements'],
    },
    {
      number: 4,
      title: 'Brand Guidelines Development',
      description:
        'Create comprehensive brand guideline documents that ensure consistent application across all media and touchpoints.',
      deliverables: ['Brand guidelines PDF', 'Logo files package', 'Usage examples', 'Asset library'],
    },
    {
      number: 5,
      title: 'Collateral Design',
      description:
        'Apply your brand identity to essential marketing materials including business cards, stationery, presentations, and digital templates.',
      deliverables: ['Business card design', 'Letterhead templates', 'Presentation deck', 'Social media templates'],
    },
    {
      number: 6,
      title: 'Implementation & Support',
      description:
        'Provide guidance on brand rollout, vendor coordination, and ongoing support to ensure flawless execution across all channels.',
      deliverables: ['Implementation roadmap', 'Vendor specifications', 'Team training', 'Ongoing support'],
    },
  ];

  const results = [
    {
      icon: Trophy,
      industry: 'Tech Startup',
      result: 'Brand Refresh Led to 340% Funding Increase',
      timeline: '8 weeks',
      description:
        'Complete brand identity redesign with strategic positioning helped secure Series A funding by presenting a more professional, trustworthy image to investors.',
      metrics: [
        { label: 'Funding Increase', value: '+340%' },
        { label: 'Media Features', value: '12+' },
        { label: 'Brand Recognition', value: '+89%' },
      ],
    },
    {
      icon: Target,
      industry: 'E-commerce Fashion',
      result: 'Premium Rebrand Drove 280% Revenue Growth',
      timeline: '6 weeks',
      description:
        'Luxury brand identity with sophisticated visual system positioned business as premium, justified higher prices, and attracted aspirational customers.',
      metrics: [
        { label: 'Revenue Growth', value: '+280%' },
        { label: 'Average Order', value: '+65%' },
        { label: 'Customer LTV', value: '+120%' },
      ],
    },
    {
      icon: Users,
      industry: 'Professional Services',
      result: 'Brand Identity Increased Client Acquisition 4.2x',
      timeline: '5 weeks',
      description:
        'Professional brand identity with clear messaging helped differentiate from competitors and communicate expertise, resulting in significant client growth.',
      metrics: [
        { label: 'New Clients', value: '4.2x' },
        { label: 'Referrals', value: '+190%' },
        { label: 'Win Rate', value: '+58%' },
      ],
    },
  ];

  const faqs = [
    {
      question: 'What\'s the difference between branding and a logo?',
      answer:
        'A logo is just one small part of your brand. Branding encompasses your entire identity: visual design, messaging, voice, values, and how customers perceive you. Your logo is the face, but your brand is the complete personality, promise, and experience. Think of Apple—their logo is iconic, but their brand is minimalism, innovation, and premium quality. We build complete brand systems, not just logos.',
    },
    {
      question: 'How long does a brand development project take?',
      answer:
        'Most brand development projects take 4-8 weeks from kickoff to final delivery. Launch packages (essential identity) take 2-3 weeks, Scale packages (complete brand system) take 3-4 weeks, and Dominate packages (comprehensive brand ecosystem) take 4-6 weeks. Timeline depends on revision rounds, stakeholder availability, and project complexity. We move efficiently while ensuring strategic depth.',
    },
    {
      question: 'Will I own all the brand assets you create?',
      answer:
        'Yes, absolutely. You own 100% of the final brand identity we create—logo files, design assets, guidelines, and all deliverables. We provide files in all necessary formats (vector, raster, web-optimized) and comprehensive usage guidelines. You have full ownership and can use, modify, or license your brand identity however you choose. Our goal is partnership, not lock-in.',
    },
    {
      question: 'Can you work with our existing brand or do we start fresh?',
      answer:
        'We can do either! Brand evolution (refining existing identity) is common for growing businesses that need to level up without losing brand equity. Complete rebrand (starting fresh) works when your current identity doesn\'t reflect where you\'re going or doesn\'t resonate with your target audience. We assess your current brand during discovery and recommend the best approach for your specific situation.',
    },
    {
      question: 'What if we don\'t like the initial brand concepts?',
      answer:
        'We build revision rounds into every package to ensure you love the final result. Launch includes 2 revision rounds, Scale includes 3, and Dominate includes 6. We present multiple initial concepts based on strategic discovery, then refine your preferred direction through collaborative feedback. Our process is iterative by design—your satisfaction is the metric that matters. We don\'t stop until your brand feels right.',
    },
    {
      question: 'Do you provide brand strategy or just design?',
      answer:
        'We provide both strategic and creative services. Brand development starts with strategy—understanding your market position, target audience, value proposition, and competitive differentiation. Design comes after strategy, ensuring every visual choice supports business objectives. Scale and Dominate packages include comprehensive brand strategy. Launch packages focus on visual identity but are informed by strategic discovery conversations.',
    },
  ];

  return (
    <main className="min-h-screen bg-cream-50">
      {/* Hero Section - Dark Asymmetric Split */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-near-black via-[#1a1a1a] to-near-black px-6 sm:px-8 lg:px-12 py-32 sm:py-40 overflow-hidden">
        {/* Decorative Background Elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-[120px] pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-copper-500/5 rounded-full blur-[120px] pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        <div className="relative max-w-7xl mx-auto w-full grid lg:grid-cols-[60%_40%] gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="visible"
            variants={heroContainer}
          >
            {/* Overline */}
            <motion.p
              variants={heroItem}
              className="text-copper-500 font-montserrat font-semibold text-sm sm:text-base tracking-brand-label uppercase mb-6"
            >
              Brand Development Excellence
            </motion.p>

            {/* Main Headline */}
            <motion.h1
              variants={heroItem}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-light text-cream-50 tracking-brand-header leading-[1.1] mb-6"
            >
              Build a Brand That{' '}
              <span className="bg-gradient-to-r from-copper-400 to-copper-600 bg-clip-text text-transparent">
                Demands Attention
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={heroItem}
              className="text-lg sm:text-xl lg:text-2xl font-montserrat font-light text-cream-200 leading-relaxed tracking-normal max-w-2xl mb-10"
            >
              Strategic brand identity that transforms businesses into memorable brands. Professional design, clear messaging, and cohesive visual systems that drive recognition and revenue.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={heroItem} className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                variant="primary"
                size="default"
                className="group w-full sm:w-fit"
              >
                <Link href="/contact">
                  Start Your Brand Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                size="default"
                className="w-full sm:w-fit bg-transparent border-2 border-cream-50/40 text-cream-50 hover:bg-copper-500/10 hover:border-cream-50 backdrop-blur-md"
              >
                <Link href="/portfolio">
                  View Our Work
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Floating Design Elements */}
          <motion.div
            className="hidden lg:block relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="relative h-[400px]">
              {/* Floating badge 1 */}
              <motion.div
                className="absolute top-0 right-12 bg-white/10 backdrop-blur-md border border-copper-500/30 rounded-lg px-6 py-4 shadow-lg shadow-copper-500/20"
                animate={{
                  y: [0, -15, 0],
                  rotateZ: [0, 2, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Palette className="w-8 h-8 text-copper-400 mb-2" />
                <p className="text-copper-400 text-xs font-medium mb-1">Brand Recognition</p>
                <p className="text-cream-50 text-2xl font-display font-bold">+340%</p>
              </motion.div>

              {/* Floating badge 2 */}
              <motion.div
                className="absolute top-32 left-8 bg-white/10 backdrop-blur-md border border-rose-500/30 rounded-lg px-6 py-4 shadow-lg shadow-rose-500/20"
                animate={{
                  y: [0, 20, 0],
                  rotateZ: [0, -3, 0],
                }}
                transition={{
                  duration: 5,
                  delay: 0.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Heart className="w-8 h-8 text-rose-400 mb-2" />
                <p className="text-rose-400 text-xs font-medium mb-1">Customer Trust</p>
                <p className="text-cream-50 text-2xl font-display font-bold">68%</p>
              </motion.div>

              {/* Floating badge 3 */}
              <motion.div
                className="absolute bottom-12 right-4 bg-white/10 backdrop-blur-md border border-violet-500/30 rounded-lg px-6 py-4 shadow-lg shadow-violet-500/20"
                animate={{
                  y: [0, -20, 0],
                  rotateZ: [0, 1.5, 0],
                }}
                transition={{
                  duration: 4.5,
                  delay: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <TrendingUp className="w-8 h-8 text-violet-400 mb-2" />
                <p className="text-violet-400 text-xs font-medium mb-1">Revenue Growth</p>
                <p className="text-cream-50 text-2xl font-display font-bold">+280%</p>
              </motion.div>

              {/* Central icon */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <Sparkles className="w-32 h-32 text-copper-500/30" strokeWidth={1} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="relative bg-cream-50 px-6 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-copper-500/5 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 sm:mb-20"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(15px)' }}
            animate={isServicesInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, ease: [0.19, 0.91, 0.38, 0.98] }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase font-bold text-near-black tracking-brand-header leading-tight mb-4">
              COMPLETE BRAND IDENTITY SERVICES
            </h2>
            <p className="text-base sm:text-lg text-near-black/70 font-montserrat max-w-3xl mx-auto">
              From strategic positioning to visual design, we build cohesive brand systems that resonate
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isServicesInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {brandServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariant}
                  className="group relative bg-white p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-copper-500/0 to-copper-500/0 group-hover:from-copper-500/5 group-hover:to-copper-500/10 transition-all duration-500" />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-copper-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <div className="relative">
                    <motion.div
                      className="w-16 h-16 flex items-center justify-center bg-copper-500/10 text-copper-500 mb-6 group-hover:bg-copper-500 group-hover:text-white transition-all duration-500"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-8 h-8" strokeWidth={1.5} />
                    </motion.div>

                    <h3 className="text-xl sm:text-2xl font-display uppercase font-semibold text-near-black mb-2 tracking-brand-header">
                      {service.title}
                    </h3>

                    <p className="text-copper-600 font-montserrat font-medium text-sm mb-4 tracking-normal">{service.tagline}</p>

                    <p className="text-near-black/70 font-montserrat text-sm sm:text-base leading-relaxed mb-6">{service.description}</p>

                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-near-black/80 font-montserrat text-sm">
                          <CheckCircle2 className="w-4 h-4 text-copper-500 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Branding Matters - 3D Metrics */}
      <section ref={whyBrandRef} className="relative bg-gradient-to-br from-near-black via-[#1a1a1a] to-near-black px-6 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-36">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 sm:mb-20"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(15px)' }}
            animate={isWhyBrandInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, ease: [0.19, 0.91, 0.38, 0.98] }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase font-bold text-cream-50 tracking-brand-header leading-tight mb-4">
              WHY PROFESSIONAL BRANDING{' '}
              <span className="bg-gradient-to-r from-copper-400 to-copper-600 bg-clip-text text-transparent">
                MATTERS MORE THAN EVER
              </span>
            </h2>
            <p className="text-base sm:text-lg text-cream-200 font-montserrat max-w-3xl mx-auto">
              In crowded markets, brand identity is the difference between being remembered and being ignored
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isWhyBrandInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {whyBrandMetrics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={metricCard}
                  className="group relative bg-white/5 backdrop-blur-md border border-white/10 p-8 hover:bg-white/10 hover:border-copper-500/50 transition-all duration-500"
                  style={{
                    perspective: '1000px',
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    transition: { duration: 0.3 },
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />

                  <div className="relative">
                    <div className={`w-12 h-12 flex items-center justify-center bg-gradient-to-br ${stat.color} text-white rounded-lg mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </div>

                    <p className="text-4xl sm:text-5xl font-display font-bold text-cream-50 mb-2">{stat.metric}</p>

                    <p className="text-copper-400 font-montserrat font-semibold text-sm tracking-normal uppercase mb-3">{stat.label}</p>

                    <p className="text-cream-200/80 font-montserrat text-sm leading-relaxed">{stat.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Our Approach - Timeline */}
      <section ref={approachRef} className="relative bg-cream-100 px-6 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16 sm:mb-20"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(15px)' }}
            animate={isApproachInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, ease: [0.19, 0.91, 0.38, 0.98] }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase font-bold text-near-black tracking-brand-header leading-tight mb-4">
              FROM STRATEGY TO LAUNCH
            </h2>
            <p className="text-base sm:text-lg text-near-black/70 font-montserrat max-w-3xl mx-auto">
              A proven 6-step process that transforms business vision into cohesive brand identity
            </p>
          </motion.div>

          <motion.div
            className="relative space-y-8"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isApproachInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-copper-500 via-copper-400 to-copper-300 hidden sm:block" />

            {approachSteps.map((step, index) => (
              <motion.div key={index} variants={timelineStep} className="relative flex gap-6 items-start">
                <div className="relative flex-shrink-0 w-16 h-16 flex items-center justify-center bg-gradient-to-br from-copper-500 to-copper-600 text-white rounded-full font-display font-bold text-xl shadow-lg shadow-copper-500/30 z-10">
                  {step.number}
                </div>

                <div className="flex-1 bg-white p-6 sm:p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl sm:text-2xl font-display uppercase font-semibold text-near-black mb-3 tracking-brand-header">{step.title}</h3>
                  <p className="text-near-black/70 font-montserrat text-sm sm:text-base leading-relaxed mb-5">{step.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {step.deliverables.map((deliverable, idx) => (
                      <span key={idx} className="inline-block px-3 py-1.5 bg-cream-200 text-near-black font-montserrat font-medium text-xs border-l-2 border-copper-500">
                        {deliverable}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection
        config={brandingDesignPricingConfig}
        className="bg-cream-50"
        onSelectPlan={() => router.push('/contact')}
      />

      {/* Results Section */}
      <section ref={resultsRef} className="relative bg-gradient-to-br from-near-black via-[#1a1a1a] to-near-black px-6 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-36">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 sm:mb-20"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(15px)' }}
            animate={isResultsInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, ease: [0.19, 0.91, 0.38, 0.98] }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase font-bold text-cream-50 tracking-brand-header leading-tight mb-4">
              REAL BRANDS. REAL RESULTS.
            </h2>
            <p className="text-base sm:text-lg text-cream-200 font-montserrat max-w-3xl mx-auto">
              See how strategic brand identity transformed businesses into memorable, profitable brands
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isResultsInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {results.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariant}
                  className="group bg-white/5 backdrop-blur-md border border-white/10 p-8 hover:bg-white/10 hover:border-copper-500/50 transition-all duration-500"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-copper-500/20 text-copper-400 rounded-lg group-hover:bg-copper-500 group-hover:text-white transition-all duration-500">
                      <Icon className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <span className="text-copper-400 font-montserrat font-medium text-sm tracking-normal uppercase">{item.industry}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-display uppercase font-semibold text-cream-50 mb-3 tracking-brand-header">{item.result}</h3>

                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-cream-300" />
                    <span className="text-cream-300 font-montserrat text-sm">Achieved in {item.timeline}</span>
                  </div>

                  <p className="text-cream-200/80 font-montserrat text-sm leading-relaxed mb-6">{item.description}</p>

                  <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10">
                    {item.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <p className="text-copper-400 font-display font-bold text-lg mb-1">{metric.value}</p>
                        <p className="text-cream-300 font-montserrat text-xs">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="relative bg-cream-100 px-6 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16 sm:mb-20"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(15px)' }}
            animate={isFaqInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, ease: [0.19, 0.91, 0.38, 0.98] }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase font-bold text-near-black tracking-brand-header leading-tight mb-4">
              QUESTIONS ABOUT BRANDING?
            </h2>
            <p className="text-base sm:text-lg text-near-black/70 font-montserrat max-w-2xl mx-auto">
              Get answers to common questions about our process, deliverables, and what to expect
            </p>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isFaqInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {faqs.map((faq, index) => (
              <motion.details key={index} variants={timelineStep} className="group bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-base sm:text-lg font-display uppercase font-semibold text-near-black tracking-brand-header pr-4 leading-tight">{faq.question}</h3>
                  <ChevronDown className="w-5 h-5 text-copper-500 shrink-0 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="mt-4 text-near-black/70 font-montserrat text-sm sm:text-base leading-relaxed">{faq.answer}</p>
              </motion.details>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative bg-gradient-to-br from-near-black via-[#1a1a1a] to-near-black px-6 sm:px-8 lg:px-12 py-20 sm:py-32 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-copper-500/10 rounded-full blur-[120px] pointer-events-none"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(20px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.19, 0.91, 0.38, 0.98] }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-display uppercase font-bold text-cream-50 tracking-brand-header leading-tight mb-6">
              READY TO BUILD A BRAND THAT{' '}
              <span className="bg-gradient-to-r from-copper-400 to-copper-600 bg-clip-text text-transparent">
                STANDS OUT?
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-cream-200 font-montserrat font-normal leading-relaxed max-w-2xl mx-auto mb-10">
              Let&apos;s create a professional brand identity that captures attention, builds trust, and drives business growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="primary"
                size="default"
                className="group w-full sm:w-fit"
              >
                <Link href="/contact">
                  Start Your Brand Project
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                size="default"
                className="w-full sm:w-fit bg-transparent border-2 border-cream-50/40 text-cream-50 hover:bg-copper-500/10 hover:border-cream-50 backdrop-blur-md"
              >
                <Link href="/portfolio">
                  View Brand Portfolio
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
