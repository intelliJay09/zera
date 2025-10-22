'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  TrendingUp,
  Search,
  Link2,
  MapPin,
  FileText,
  Code,
  CheckCircle2,
  BarChart3,
  Target,
  Zap,
  ChevronDown,
  Trophy,
  Calendar,
  Users
} from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { Button } from '@/components/ui/button';
import CurrencyToggleWithSuspense from '@/components/currency/CurrencyProvider';
import PriceDisplay from '@/components/currency/PriceDisplay';
import { seoPricingPlans } from '@/data/seo-pricing';

export default function SEODigitalMarketingPage() {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Section refs for scroll triggers
  const servicesRef = useRef(null);
  const whySeofRef = useRef(null);
  const approachRef = useRef(null);
  const resultsRef = useRef(null);
  const pricingRef = useRef(null);
  const faqRef = useRef(null);

  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.15 });
  const isWhySeoInView = useInView(whySeofRef, { once: true, amount: 0.2 });
  const isApproachInView = useInView(approachRef, { once: true, amount: 0.15 });
  const isResultsInView = useInView(resultsRef, { once: true, amount: 0.2 });
  const isPricingInView = useInView(pricingRef, { once: true, amount: 0.15 });
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
        ease: [0.19, 0.91, 0.38, 0.98],
      },
    },
  };

  const servicesCardStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const serviceCard = {
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
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const statsCardStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const statsCard = {
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
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const timelineStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.3,
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
        ease: [0.33, 0.82, 0.44, 0.99],
      },
    },
  };

  const seoServices = [
    {
      icon: Search,
      title: 'On-Page SEO',
      tagline: 'The Foundation of Search Success',
      description: 'Strategic optimization of your content, meta tags, and page structure. We make every page a ranking opportunity.',
      features: [
        'Keyword research & mapping',
        'Content optimization',
        'Meta tags & schema markup',
        'Internal linking strategy',
      ],
    },
    {
      icon: Code,
      title: 'Technical SEO',
      tagline: 'The Infrastructure Google Rewards',
      description: 'Lightning-fast load times, perfect mobile experience, and crawlable architecture. The technical foundation that separates winners from wishful thinkers.',
      features: [
        'Core Web Vitals optimization',
        'Mobile-first indexing',
        'Site speed enhancement',
        'Structured data implementation',
      ],
    },
    {
      icon: Link2,
      title: 'Link Building',
      tagline: 'Authority That Compounds',
      description: 'White-hat link acquisition from authoritative sources. Every quality backlink is a vote of confidence that Google respects.',
      features: [
        'High-authority backlinks',
        'Content-driven outreach',
        'Digital PR campaigns',
        'Competitor gap analysis',
      ],
    },
    {
      icon: MapPin,
      title: 'Local SEO',
      tagline: 'Dominate Your Geography',
      description: 'Own your local market. When nearby customers search, you appear. Google Business optimization, local citations, and review management.',
      features: [
        'Google Business Profile optimization',
        'Local citation building',
        'Review generation strategy',
        'Location-specific content',
      ],
    },
    {
      icon: FileText,
      title: 'Content Strategy',
      tagline: 'Words That Work 24/7',
      description: 'Topic clusters that establish authority. Content that ranks, converts, and compounds. Every article is an asset, not an expense.',
      features: [
        'Topic cluster development',
        'SEO content writing',
        'Content gap analysis',
        'Editorial calendar planning',
      ],
    },
  ];

  const seoStats = [
    {
      icon: TrendingUp,
      metric: '312%',
      label: 'Average Traffic Growth',
      description: 'Organic traffic increase within 6 months for our clients',
      color: 'from-copper-500 to-copper-600',
    },
    {
      icon: Target,
      metric: '4.2x',
      label: 'Average ROI',
      description: 'Return on investment compared to paid advertising spend',
      color: 'from-amber-500 to-amber-600',
    },
    {
      icon: BarChart3,
      metric: '68%',
      label: 'First-Page Rankings',
      description: 'Target keywords ranking on Google page 1 within 4 months',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: Zap,
      metric: '24/7',
      label: 'Traffic Generation',
      description: 'Your content works around the clock, no ad spend required',
      color: 'from-yellow-500 to-yellow-600',
    },
  ];

  const approachSteps = [
    {
      number: 1,
      title: 'SEO Audit & Strategy',
      description: 'We analyze your current rankings, identify quick wins, and map out a 6-month roadmap tailored to your business goals.',
      deliverables: ['Comprehensive audit report', 'Competitor analysis', 'Keyword strategy', 'Priority roadmap'],
    },
    {
      number: 2,
      title: 'Technical Foundation',
      description: 'Fix what\'s broken. Core Web Vitals, mobile optimization, site speed, and crawlability. Google can\'t rank what it can\'t crawl.',
      deliverables: ['Speed optimization', 'Mobile-first setup', 'Schema markup', 'XML sitemap'],
    },
    {
      number: 3,
      title: 'On-Page Optimization',
      description: 'Transform your pages into ranking machines. Keyword-optimized content, compelling meta tags, and strategic internal linking.',
      deliverables: ['Page optimization', 'Content updates', 'Meta tag creation', 'Internal linking'],
    },
    {
      number: 4,
      title: 'Content Creation',
      description: 'Publish authority-building content that attracts links and ranks. Topic clusters that establish you as the go-to expert.',
      deliverables: ['Monthly blog posts', 'Topic clusters', 'SEO copywriting', 'Content calendar'],
    },
    {
      number: 5,
      title: 'Link Acquisition',
      description: 'Earn high-quality backlinks through digital PR, content partnerships, and strategic outreach. Quality over quantity, always.',
      deliverables: ['Monthly backlinks', 'Digital PR outreach', 'Content promotion', 'Link tracking'],
    },
    {
      number: 6,
      title: 'Measure & Optimize',
      description: 'Monthly reporting with actionable insights. Track rankings, traffic, conversions. Iterate based on data, not guesses.',
      deliverables: ['Monthly reports', 'Ranking updates', 'Traffic analysis', 'Strategy refinement'],
    },
  ];

  const results = [
    {
      icon: Trophy,
      industry: 'E-commerce Fashion',
      result: '312% Organic Traffic Growth',
      timeline: '6 months',
      description: 'Comprehensive on-page optimization, technical SEO overhaul, and strategic content creation resulted in first-page rankings for 45+ target keywords.',
      metrics: [
        { label: 'Traffic Increase', value: '+312%' },
        { label: 'Keywords Ranked', value: '45+' },
        { label: 'Revenue Growth', value: '+189%' },
      ],
    },
    {
      icon: Target,
      industry: 'B2B SaaS Platform',
      result: '4.8x ROI from Organic Search',
      timeline: '8 months',
      description: 'Technical SEO foundation, topic cluster strategy, and high-authority link building transformed organic search into their #1 customer acquisition channel.',
      metrics: [
        { label: 'Organic ROI', value: '4.8x' },
        { label: 'MQL Growth', value: '+245%' },
        { label: 'Domain Authority', value: '+28' },
      ],
    },
    {
      icon: Users,
      industry: 'Local Service Provider',
      result: 'Page 1 for 68% of Keywords',
      timeline: '4 months',
      description: 'Local SEO strategy, Google Business Profile optimization, and location-specific content drove dominance in their geographic market.',
      metrics: [
        { label: 'Local Rankings', value: '68%' },
        { label: 'Call Volume', value: '+156%' },
        { label: 'Review Score', value: '4.9/5' },
      ],
    },
  ];


  const faqs = [
    {
      question: 'How long does it take to see results from SEO?',
      answer: 'Most clients see initial improvements within 2-3 months, with significant traffic growth by month 4-6. SEO is a long-term investment - the best results compound over 12+ months. Unlike paid ads that stop working when you stop paying, SEO builds equity that continues delivering returns.',
    },
    {
      question: 'What makes your SEO approach different?',
      answer: 'We focus on sustainable, white-hat strategies that build real authority. No black-hat tactics, no link farms, no content spam. We combine technical excellence with strategic content and authentic relationship-building to earn rankings that last. Plus, we\'re transparent about what we do and why.',
    },
    {
      question: 'Do you guarantee first-page rankings?',
      answer: 'No reputable SEO agency can guarantee specific rankings - Google\'s algorithm is constantly evolving. What we guarantee is strategic execution: comprehensive audits, technical fixes, quality content, and ethical link building. We focus on metrics that matter: qualified traffic, engagement, and conversions.',
    },
    {
      question: 'Can you work with our existing marketing team?',
      answer: 'Absolutely. We collaborate seamlessly with in-house teams, providing SEO expertise while respecting your brand voice and marketing strategy. We can integrate with your content team, work alongside your developers, and align with your broader marketing goals.',
    },
    {
      question: 'What industries do you specialize in?',
      answer: 'We\'ve delivered results across e-commerce, B2B SaaS, professional services, healthcare, finance, and local businesses. Our strategic approach adapts to your industry\'s unique search landscape, competition level, and customer journey. We research your market before we start, not after.',
    },
    {
      question: 'How do you measure SEO success?',
      answer: 'We track what matters to your business: organic traffic growth, keyword rankings, conversion rates, and revenue attribution. Monthly reports include Google Analytics data, Search Console insights, ranking progress, and recommendations. You\'ll always know exactly what\'s working and what\'s next.',
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
              className="text-copper-500 font-montserrat font-semibold text-sm sm:text-base tracking-[0.2em] uppercase mb-6"
            >
              Rank Higher, Grow Faster
            </motion.p>

            {/* Main Headline */}
            <motion.h1
              variants={heroItem}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-playfair font-light text-cream-50 tracking-tight leading-[1.1] mb-6"
            >
              Dominate Search Rankings,{' '}
              <span className="bg-gradient-to-r from-copper-400 to-copper-600 bg-clip-text text-transparent">
                Drive Real Business Growth
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={heroItem}
              className="text-lg sm:text-xl lg:text-2xl font-montserrat font-light text-cream-200 leading-relaxed tracking-wide max-w-2xl mb-10"
            >
              Strategic SEO that transforms your online visibility into measurable revenue. No black-hat tactics. No empty promises. Just results that compound month after month.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={heroItem}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                asChild
                variant="primary"
                size="default"
                className="group w-full sm:w-fit"
              >
                <Link href="/contact?service=seo">
                  Get Your Free SEO Audit
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
                  View Our Results
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: 3D Floating Metrics Visualization */}
          <motion.div
            className="hidden lg:block relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Floating metric badges */}
            <div className="relative h-[400px]">
              {/* Badge 1 */}
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
                <p className="text-copper-400 text-sm font-medium mb-1">Traffic Growth</p>
                <p className="text-cream-50 text-3xl font-playfair font-bold">+245%</p>
              </motion.div>

              {/* Badge 2 */}
              <motion.div
                className="absolute top-32 left-8 bg-white/10 backdrop-blur-md border border-amber-500/30 rounded-lg px-6 py-4 shadow-lg shadow-amber-500/20"
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
                <p className="text-amber-400 text-sm font-medium mb-1">Page 1 Rankings</p>
                <p className="text-cream-50 text-3xl font-playfair font-bold">68%</p>
              </motion.div>

              {/* Badge 3 */}
              <motion.div
                className="absolute bottom-12 right-4 bg-white/10 backdrop-blur-md border border-orange-500/30 rounded-lg px-6 py-4 shadow-lg shadow-orange-500/20"
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
                <p className="text-orange-400 text-sm font-medium mb-1">ROI Average</p>
                <p className="text-cream-50 text-3xl font-playfair font-bold">4.8x</p>
              </motion.div>

              {/* Central graph visual */}
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
                <TrendingUp className="w-32 h-32 text-copper-500/30" strokeWidth={1} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What We Do - SEO Services */}
      <section ref={servicesRef} className="relative bg-cream-50 px-6 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32 overflow-hidden">
        {/* Decorative Element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-copper-500/5 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16 sm:mb-20"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(15px)' }}
            animate={isServicesInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, ease: [0.19, 0.91, 0.38, 0.98] }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-light text-near-black tracking-tight leading-tight mb-4">
              Comprehensive SEO Services
            </h2>
            <p className="text-base sm:text-lg text-near-black/70 font-montserrat max-w-3xl mx-auto">
              From technical foundations to content that converts, we handle every aspect of your search visibility
            </p>
          </motion.div>

          {/* Service Cards Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isServicesInView ? 'visible' : 'hidden'}
            variants={servicesCardStagger}
          >
            {seoServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  variants={serviceCard}
                  className="group relative bg-white p-8 shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-copper-500/0 to-copper-500/0 group-hover:from-copper-500/5 group-hover:to-copper-500/10 transition-all duration-500" />

                  {/* Top border on hover */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-copper-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                  <div className="relative">
                    {/* Icon */}
                    <motion.div
                      className="w-16 h-16 flex items-center justify-center bg-copper-500/10 text-copper-500 mb-6 group-hover:bg-copper-500 group-hover:text-white transition-all duration-500"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="w-8 h-8" strokeWidth={1.5} />
                    </motion.div>

                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-near-black mb-2 tracking-tight">
                      {service.title}
                    </h3>

                    {/* Tagline */}
                    <p className="text-copper-600 font-montserrat font-medium text-sm mb-4 tracking-wide">
                      {service.tagline}
                    </p>

                    {/* Description */}
                    <p className="text-near-black/70 font-montserrat text-sm sm:text-base leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features */}
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

      {/* Why SEO Matters - 3D Stats Cards */}
      <section ref={whySeofRef} className="relative bg-near-black px-6 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-36 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(#B87333 1px, transparent 1px), linear-gradient(90deg, #B87333 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16 sm:mb-20"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(15px)' }}
            animate={isWhySeoInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, ease: [0.19, 0.91, 0.38, 0.98] }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-light text-cream-50 tracking-tight leading-tight mb-4">
              Stop Renting Traffic.{' '}
              <span className="bg-gradient-to-r from-copper-400 to-copper-600 bg-clip-text text-transparent">
                Start Owning It.
              </span>
            </h2>
            <p className="text-base sm:text-lg text-cream-200 font-montserrat max-w-3xl mx-auto">
              While paid ads disappear the moment you stop paying, SEO builds equity. Every ranking is an asset that compounds.
            </p>
          </motion.div>

          {/* 3D Stats Cards Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isWhySeoInView ? 'visible' : 'hidden'}
            variants={statsCardStagger}
          >
            {seoStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={statsCard}
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
                  {/* Gradient glow on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`} />

                  <div className="relative">
                    {/* Icon */}
                    <div className={`w-12 h-12 flex items-center justify-center bg-gradient-to-br ${stat.color} text-white rounded-lg mb-6 group-hover:scale-110 transition-transform duration-500`}>
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    </div>

                    {/* Metric */}
                    <p className="text-4xl sm:text-5xl font-playfair font-bold text-cream-50 mb-2">
                      {stat.metric}
                    </p>

                    {/* Label */}
                    <p className="text-copper-400 font-montserrat font-semibold text-sm tracking-wide uppercase mb-3">
                      {stat.label}
                    </p>

                    {/* Description */}
                    <p className="text-cream-200/80 font-montserrat text-sm leading-relaxed">
                      {stat.description}
                    </p>
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
          {/* Section Header */}
          <motion.div
            className="text-center mb-16 sm:mb-20"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(15px)' }}
            animate={isApproachInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, ease: [0.19, 0.91, 0.38, 0.98] }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-light text-near-black tracking-tight leading-tight mb-4">
              How We Drive Results
            </h2>
            <p className="text-base sm:text-lg text-near-black/70 font-montserrat max-w-3xl mx-auto">
              A proven 6-step process refined over years of delivering measurable SEO success
            </p>
          </motion.div>

          {/* Timeline */}
          <motion.div
            className="relative space-y-12 sm:space-y-16"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isApproachInView ? 'visible' : 'hidden'}
            variants={timelineStagger}
          >
            {/* Vertical connector line - enhanced with glow */}
            <div className="absolute left-6 top-6 bottom-6 w-[2px] bg-gradient-to-b from-copper-500/40 via-copper-400/60 to-copper-300/40 hidden sm:block">
              <div className="absolute inset-0 bg-gradient-to-b from-copper-500/30 via-copper-400/40 to-copper-300/30 blur-sm" />
            </div>

            {approachSteps.map((step, index) => (
              <motion.div
                key={index}
                variants={timelineStep}
                className="relative flex flex-col sm:flex-row gap-6 sm:gap-8 items-center sm:items-start group"
              >
                {/* Step number badge - enhanced luxury design */}
                <div className="relative flex-shrink-0 z-10">
                  <div className="relative w-12 h-12 flex items-center justify-center">
                    {/* Glow effect background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-copper-500/20 to-copper-600/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

                    {/* Main badge */}
                    <div className="relative w-12 h-12 flex items-center justify-center bg-gradient-to-br from-copper-500 via-copper-600 to-copper-700 rounded-full shadow-lg shadow-copper-500/40 group-hover:shadow-xl group-hover:shadow-copper-500/60 transition-all duration-500 group-hover:scale-110">
                      {/* Inner subtle gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-full" />

                      {/* Number */}
                      <span className="relative text-base font-playfair font-bold text-white tracking-tight">
                        {step.number}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content card - premium design */}
                <div className="flex-1 relative group/card">
                  {/* Gradient border effect */}
                  <div className="absolute -inset-[1px] bg-gradient-to-br from-copper-500/20 via-copper-400/10 to-transparent rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Card background with subtle gradient */}
                  <div className="relative bg-white p-8 sm:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-1 overflow-hidden">
                    {/* Subtle copper glow on hover */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-copper-500/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

                    {/* Content */}
                    <div className="relative">
                      {/* Title with refined spacing */}
                      <h3 className="text-2xl sm:text-3xl font-playfair font-semibold text-near-black mb-4 tracking-tight leading-tight" style={{ letterSpacing: '-0.01em' }}>
                        {step.title}
                      </h3>

                      {/* Description with elegant typography */}
                      <p className="text-near-black/70 font-montserrat text-base sm:text-lg leading-relaxed mb-8" style={{ letterSpacing: '0.01em' }}>
                        {step.description}
                      </p>

                      {/* Deliverables - luxury pill design */}
                      <div className="flex flex-wrap gap-3">
                        {step.deliverables.map((deliverable, idx) => (
                          <motion.span
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1, duration: 0.3 }}
                            className="group/tag relative inline-flex items-center"
                          >
                            {/* Gradient border wrapper */}
                            <span className="absolute -inset-[1px] bg-gradient-to-r from-copper-500/40 to-copper-600/40 rounded-full opacity-50 group-hover/tag:opacity-100 transition-opacity duration-300" />

                            {/* Tag content */}
                            <span className="relative inline-flex items-center px-5 py-2.5 bg-white rounded-full">
                              {/* Subtle background gradient */}
                              <span className="absolute inset-0 bg-gradient-to-r from-cream-50 to-cream-100 rounded-full opacity-60" />

                              {/* Copper accent dot */}
                              <span className="relative flex items-center gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-copper-500 to-copper-600 group-hover/tag:scale-125 transition-transform duration-300" />
                                <span className="relative text-near-black font-montserrat font-medium text-sm tracking-wide">
                                  {deliverable}
                                </span>
                              </span>
                            </span>
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Results Section */}
      <section ref={resultsRef} className="relative bg-gradient-to-br from-near-black via-[#1a1a1a] to-near-black px-6 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-36">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16 sm:mb-20"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(15px)' }}
            animate={isResultsInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, ease: [0.19, 0.91, 0.38, 0.98] }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-light text-cream-50 tracking-tight leading-tight mb-4">
              Real Results. Real Businesses.
            </h2>
            <p className="text-base sm:text-lg text-cream-200 font-montserrat max-w-3xl mx-auto">
              See how strategic SEO transformed organic visibility into measurable business growth
            </p>
          </motion.div>

          {/* Results Cards */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isResultsInView ? 'visible' : 'hidden'}
            variants={servicesCardStagger}
          >
            {results.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={serviceCard}
                  className="group bg-white/5 backdrop-blur-md border border-white/10 p-8 hover:bg-white/10 hover:border-copper-500/50 transition-all duration-500"
                >
                  {/* Icon & Industry */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-copper-500/20 text-copper-400 rounded-lg group-hover:bg-copper-500 group-hover:text-white transition-all duration-500">
                      <Icon className="w-5 h-5" strokeWidth={2} />
                    </div>
                    <span className="text-copper-400 font-montserrat font-medium text-sm tracking-wide uppercase">
                      {item.industry}
                    </span>
                  </div>

                  {/* Result */}
                  <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-cream-50 mb-3 tracking-tight">
                    {item.result}
                  </h3>

                  {/* Timeline */}
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-cream-300" />
                    <span className="text-cream-300 font-montserrat text-sm">
                      Achieved in {item.timeline}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-cream-200/80 font-montserrat text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-3 pt-6 border-t border-white/10">
                    {item.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <p className="text-copper-400 font-playfair font-bold text-lg mb-1">
                          {metric.value}
                        </p>
                        <p className="text-cream-300 font-montserrat text-xs">
                          {metric.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="relative bg-cream-50 px-6 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-4"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(15px)' }}
            animate={isPricingInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, ease: [0.19, 0.91, 0.38, 0.98] }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-light text-near-black tracking-tight leading-tight mb-4">
              Transparent Pricing,{' '}
              <span className="bg-gradient-to-r from-copper-500 to-copper-600 bg-clip-text text-transparent">
                Compounding Results
              </span>
            </h2>
            <p className="text-base sm:text-lg text-near-black/70 font-montserrat max-w-3xl mx-auto mb-3">
              Invest in an asset that grows in value month after month
            </p>

            {/* Currency Toggle */}
            <CurrencyToggleWithSuspense />
          </motion.div>

          {/* Pricing Cards */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-y-0 gap-x-6 lg:gap-x-8"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isPricingInView ? 'visible' : 'hidden'}
            variants={servicesCardStagger}
          >
            {seoPricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                variants={serviceCard}
                className={`relative bg-white p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 ${
                  plan.featured ? 'ring-2 ring-copper-500' : ''
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-copper-500 to-copper-600 text-white font-montserrat font-semibold text-xs tracking-wider uppercase">
                    Most Popular
                  </div>
                )}

                {/* Plan Name */}
                <h3 className="text-2xl font-playfair font-semibold text-near-black mb-2 tracking-tight">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-4">
                  {plan.price === 'Custom' ? (
                    <>
                      <span className="text-4xl font-playfair font-bold text-copper-600">
                        Custom
                      </span>
                      <span className="text-near-black/60 font-montserrat text-sm ml-2">
                        {plan.period}
                      </span>
                    </>
                  ) : (
                    <PriceDisplay price={plan.price} period={`/${plan.period.replace('per ', '')}`} />
                  )}
                </div>

                {/* Description */}
                <p className="text-near-black/70 font-montserrat text-sm leading-relaxed mb-6 pb-6 border-b border-near-black/10">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-near-black/80 font-montserrat text-sm">
                      <CheckCircle2 className="w-4 h-4 text-copper-500 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  href={plan.href}
                  className={`block w-fit mx-auto px-8 py-3 text-center font-montserrat font-semibold text-sm tracking-wide transition-all duration-300 ${
                    plan.featured
                      ? 'bg-gradient-to-r from-copper-500 to-copper-600 text-white hover:shadow-lg hover:shadow-copper-500/40'
                      : 'bg-cream-200 text-near-black hover:bg-copper-500 hover:text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="relative bg-cream-100 px-6 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16 sm:mb-20"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(15px)' }}
            animate={isFaqInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, ease: [0.19, 0.91, 0.38, 0.98] }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-light text-near-black tracking-tight leading-tight mb-4">
              Questions About SEO?
            </h2>
            <p className="text-base sm:text-lg text-near-black/70 font-montserrat max-w-2xl mx-auto">
              Get answers to common questions about our approach, timelines, and what to expect
            </p>
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            className="space-y-4"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isFaqInView ? 'visible' : 'hidden'}
            variants={timelineStagger}
          >
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                variants={timelineStep}
                className="group bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg font-playfair font-semibold text-near-black tracking-tight pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown className="w-5 h-5 text-copper-500 shrink-0 transition-transform duration-300 group-open:rotate-180" />
                </summary>
                <p className="mt-4 text-near-black/70 font-montserrat text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </p>
              </motion.details>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative bg-gradient-to-br from-near-black via-[#1a1a1a] to-near-black px-6 sm:px-8 lg:px-12 py-20 sm:py-32 overflow-hidden">
        {/* Decorative Elements */}
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-playfair font-light text-cream-50 tracking-tight leading-tight mb-6">
              Ready to Stop Renting Traffic and{' '}
              <span className="bg-gradient-to-r from-copper-400 to-copper-600 bg-clip-text text-transparent">
                Start Owning Rankings?
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-cream-200 font-montserrat font-light leading-relaxed max-w-2xl mx-auto mb-10">
              Get a free SEO audit and 30-minute strategy session. We&apos;ll show you exactly where the opportunities are and how we&apos;ll capture them.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="primary"
                size="default"
                className="group w-full sm:w-fit"
              >
                <Link href="/contact?service=seo">
                  Get Your Free SEO Audit
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                size="default"
                className="w-full sm:w-fit bg-transparent border-2 border-cream-50/40 text-cream-50 hover:bg-copper-500/10 hover:border-cream-50 backdrop-blur-md"
              >
                <Link href="/waas-plans">
                  Explore WaaS Plans
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
