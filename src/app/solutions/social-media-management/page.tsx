'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Instagram,
  Linkedin,
  MessageCircle,
  Users,
  TrendingUp,
  Target,
  BarChart3,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  Calendar,
  Trophy,
  Share2,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { Button } from '@/components/ui/button';
import { socialMediaPricingConfig } from '@/data/social-media-pricing';

const PricingSection = dynamic(() => import('@/components/pricing/PricingSection'));

export default function SocialMediaManagementPage() {
  const router = useRouter();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Section refs for scroll triggers
  const servicesRef = useRef(null);
  const platformsRef = useRef(null);
  const whySocialRef = useRef(null);
  const approachRef = useRef(null);
  const resultsRef = useRef(null);
  const faqRef = useRef(null);

  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.15 });
  const isPlatformsInView = useInView(platformsRef, { once: true, amount: 0.15 });
  const isWhySocialInView = useInView(whySocialRef, { once: true, amount: 0.2 });
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
  const socialServices = [
    {
      icon: Sparkles,
      title: 'Content Creation & Strategy',
      tagline: 'Stories That Stop the Scroll',
      description:
        'Custom visual content, strategic copywriting, and platform-specific formats designed to capture attention and drive action.',
      features: [
        'Platform-specific content calendars',
        'Professional photography & videography',
        'On-brand graphic design',
        'Hashtag research & optimization',
      ],
    },
    {
      icon: MessageCircle,
      title: 'Community Management',
      tagline: 'Conversations That Convert',
      description:
        'Active community engagement, comment moderation, and strategic relationship building that transforms followers into customers.',
      features: [
        'Real-time comment responses',
        'DM management & lead qualification',
        'Community building strategies',
        'Crisis management protocols',
      ],
    },
    {
      icon: Target,
      title: 'Paid Social Advertising',
      tagline: 'Precision Targeting, Maximum ROI',
      description:
        'Data-driven ad campaigns across platforms with audience targeting, creative testing, and continuous optimization for measurable results.',
      features: [
        'Audience research & segmentation',
        'Ad creative development',
        'Campaign optimization & A/B testing',
        'Conversion tracking & attribution',
      ],
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reporting',
      tagline: 'Insights That Drive Decisions',
      description:
        'Comprehensive performance tracking, competitive analysis, and actionable insights delivered monthly with strategic recommendations.',
      features: [
        'Monthly performance dashboards',
        'Competitor benchmarking',
        'Engagement & reach analytics',
        'ROI tracking & reporting',
      ],
    },
    {
      icon: Users,
      title: 'Influencer Partnerships',
      tagline: 'Authentic Reach, Amplified Impact',
      description:
        'Strategic influencer identification, relationship management, and campaign execution that extends your reach to engaged audiences.',
      features: [
        'Influencer vetting & selection',
        'Partnership negotiation',
        'Campaign coordination',
        'Performance measurement',
      ],
    },
  ];

  const platforms = [
    {
      icon: Instagram,
      name: 'Instagram',
      gradient: 'from-purple-600 via-pink-500 to-orange-500',
      description:
        'Visual storytelling that builds brand identity and drives e-commerce sales through Stories, Reels, and shoppable posts.',
    },
    {
      icon: Linkedin,
      name: 'LinkedIn',
      gradient: 'from-blue-700 to-blue-500',
      description:
        'B2B authority building through thought leadership content, strategic networking, and lead generation campaigns.',
    },
    {
      icon: MessageCircle,
      name: 'TikTok',
      gradient: 'from-black via-cyan-500 to-fuchsia-500',
      description:
        'Viral-ready short-form video content that captures attention, builds brand awareness, and connects with younger demographics.',
    },
    {
      icon: Share2,
      name: 'Facebook',
      gradient: 'from-blue-600 to-blue-400',
      description:
        'Community building and targeted advertising for local businesses, with proven conversion through Meta Business Suite.',
    },
    {
      icon: TrendingUp,
      name: 'Twitter/X',
      gradient: 'from-black to-neutral-800',
      description:
        'Real-time engagement and brand voice development through timely content, trending conversations, and customer service.',
    },
  ];

  const whySocialMetrics = [
    {
      icon: Users,
      metric: '4.8B',
      label: 'Daily Active Users',
      description: 'Global reach across all social platforms - your customers are already there',
      color: 'from-copper-500 to-copper-600',
    },
    {
      icon: Target,
      metric: '63%',
      label: 'Brand Discovery via Social',
      description: 'Consumers discover new brands and products through social media',
      color: 'from-violet-500 to-fuchsia-600',
    },
    {
      icon: TrendingUp,
      metric: '5.2x',
      label: 'Higher Engagement',
      description: 'Social media delivers higher engagement than traditional advertising',
      color: 'from-cyan-500 to-blue-600',
    },
    {
      icon: BarChart3,
      metric: '89%',
      label: 'Measurable ROI',
      description: 'Marketers confirm social media delivers trackable business results',
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  const approachSteps = [
    {
      number: 1,
      title: 'Discovery & Social Audit',
      description:
        'Comprehensive analysis of your current social presence, competitor landscape, and audience insights to identify opportunities.',
      deliverables: ['Platform audit report', 'Competitor analysis', 'Audience research', 'Content gap analysis'],
    },
    {
      number: 2,
      title: 'Strategy Development',
      description:
        'Platform-specific strategies aligned with business goals, including content themes, posting schedules, and growth targets.',
      deliverables: ['Social media strategy', 'Content pillars', 'Platform roadmaps', 'KPI framework'],
    },
    {
      number: 3,
      title: 'Content Creation',
      description:
        'Professional content production including photography, videography, graphic design, and strategic copywriting for each platform.',
      deliverables: ['Monthly content calendar', 'Visual assets', 'Platform-specific copy', 'Hashtag strategy'],
    },
    {
      number: 4,
      title: 'Publishing & Engagement',
      description:
        'Consistent content publishing, active community management, and real-time engagement to build relationships and drive growth.',
      deliverables: ['Scheduled posting', 'Comment management', 'DM responses', 'Community engagement'],
    },
    {
      number: 5,
      title: 'Performance Tracking',
      description:
        'Comprehensive analytics monitoring, competitor benchmarking, and performance tracking to measure impact and identify trends.',
      deliverables: ['Weekly performance checks', 'Analytics dashboards', 'Engagement tracking', 'Growth metrics'],
    },
    {
      number: 6,
      title: 'Optimization & Growth',
      description:
        'Data-driven optimization of content, timing, and strategy based on performance insights to accelerate growth and ROI.',
      deliverables: ['Monthly strategy reviews', 'A/B test results', 'Optimization reports', 'Growth initiatives'],
    },
  ];

  const results = [
    {
      icon: Trophy,
      industry: 'E-commerce Fashion',
      result: 'Instagram Drove $2.4M in Revenue',
      timeline: '6 months',
      description:
        'Strategic Instagram content strategy with shoppable posts, influencer partnerships, and targeted Stories campaigns transformed followers into customers.',
      metrics: [
        { label: 'Revenue Generated', value: '$2.4M' },
        { label: 'Engagement Rate', value: '8.7%' },
        { label: 'Follower Growth', value: '+340%' },
      ],
    },
    {
      icon: Target,
      industry: 'B2B SaaS Platform',
      result: 'LinkedIn Generated 450+ Qualified Leads',
      timeline: '8 months',
      description:
        'Thought leadership content strategy, strategic networking, and targeted InMail campaigns established authority and drove enterprise leads.',
      metrics: [
        { label: 'Qualified Leads', value: '450+' },
        { label: 'Content Reach', value: '2.1M' },
        { label: 'Engagement Rate', value: '12.3%' },
      ],
    },
    {
      icon: Users,
      industry: 'Local Restaurant Chain',
      result: 'TikTok Increased Foot Traffic 280%',
      timeline: '4 months',
      description:
        'Viral-ready short-form video content showcasing menu items, behind-the-scenes, and user-generated content drove massive local awareness.',
      metrics: [
        { label: 'Foot Traffic', value: '+280%' },
        { label: 'Video Views', value: '4.8M' },
        { label: 'New Followers', value: '18K+' },
      ],
    },
  ];

  const faqs = [
    {
      question: 'Which social platforms should we focus on for our industry?',
      answer:
        'Platform selection depends on where your target audience spends time and your business goals. B2B companies typically see strong results on LinkedIn, while consumer brands excel on Instagram and TikTok. We conduct audience research and competitor analysis during our discovery phase to recommend the optimal platform mix for your specific business.',
    },
    {
      question: 'How often will you post content on our behalf?',
      answer:
        'Posting frequency varies by package and platform. Our Foundation plan includes 12 posts monthly across 2-3 platforms, while Growth includes 20+ posts plus Stories and Reels. We develop platform-specific schedules based on audience behavior data and engagement patterns to maximize reach and impact.',
    },
    {
      question: 'Do you provide content creation or do we supply it?',
      answer:
        'We handle all content creation including mobile videography, graphic design, and copywriting. Our team produces professional, on-brand content tailored to each platform. While we don\'t provide photography services, we can incorporate your existing photos or recommend trusted photographers. For businesses with brand assets, we seamlessly integrate your materials into our content strategy.',
    },
    {
      question: 'How do you measure social media success?',
      answer:
        'We track business-focused metrics including engagement rate, follower growth, website traffic from social, lead generation, and revenue attribution. Monthly reports include platform-specific analytics, competitive benchmarking, and strategic recommendations. Success is measured by business outcomes, not vanity metrics.',
    },
    {
      question: 'Can you handle customer comments and messages?',
      answer:
        'Yes. All packages include community management with varying response times. We monitor comments, answer questions, engage with followers, and manage direct messages according to your brand voice and response protocols. Enterprise clients receive real-time monitoring and immediate response to customer inquiries.',
    },
    {
      question: 'Do you offer paid social advertising?',
      answer:
        'Growth and Enterprise packages include paid social campaign management. We handle audience targeting, creative development, budget optimization, and performance tracking across Facebook Ads, Instagram Ads, LinkedIn Ads, and TikTok Ads. Campaign spend is separate from management fees and scaled to your business goals.',
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
              Social Media Excellence
            </motion.p>

            {/* Main Headline */}
            <motion.h1
              variants={heroItem}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-cream-50 uppercase tracking-tight sm:tracking-brand-header leading-[1.1] mb-6"
            >
              TRANSFORM PASSIVE FOLLOWERS INTO{' '}
              <span className="bg-gradient-to-r from-copper-400 to-copper-600 bg-clip-text text-transparent">
                ACTIVE CUSTOMERS
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={heroItem}
              className="text-lg sm:text-xl lg:text-2xl font-montserrat font-light text-cream-200 leading-relaxed tracking-normal max-w-2xl mb-10"
            >
              Strategic social media management that builds engaged communities, drives conversions, and amplifies your brand across every platform that matters.
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
                  Get Your Social Strategy
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

          {/* Right: Platform Icons Constellation - Hidden on Mobile */}
          <motion.div
            className="hidden lg:block relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="relative h-[400px]">
              {/* Floating platform badges */}
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
                <Instagram className="w-8 h-8 text-pink-400 mb-2" />
                <p className="text-copper-400 text-xs font-medium mb-1">Engagement</p>
                <p className="text-cream-50 text-2xl font-display font-bold">8.7%</p>
              </motion.div>

              <motion.div
                className="absolute top-32 left-8 bg-white/10 backdrop-blur-md border border-blue-500/30 rounded-lg px-6 py-4 shadow-lg shadow-blue-500/20"
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
                <Linkedin className="w-8 h-8 text-blue-400 mb-2" />
                <p className="text-blue-400 text-xs font-medium mb-1">Leads Generated</p>
                <p className="text-cream-50 text-2xl font-display font-bold">450+</p>
              </motion.div>

              <motion.div
                className="absolute bottom-12 right-4 bg-white/10 backdrop-blur-md border border-cyan-500/30 rounded-lg px-6 py-4 shadow-lg shadow-cyan-500/20"
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
                <MessageCircle className="w-8 h-8 text-cyan-400 mb-2" />
                <p className="text-cyan-400 text-xs font-medium mb-1">Video Views</p>
                <p className="text-cream-50 text-2xl font-display font-bold">4.8M</p>
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
              COMPREHENSIVE SOCIAL MEDIA SERVICES
            </h2>
            <p className="text-base sm:text-lg text-near-black/70 font-montserrat max-w-3xl mx-auto">
              From content creation to community building, we handle every aspect of your social presence
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isServicesInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {socialServices.map((service, index) => {
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

      {/* Platform Expertise Section */}
      <section ref={platformsRef} className="relative bg-gradient-to-br from-near-black via-[#1a1a1a] to-near-black px-6 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 sm:mb-20"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(15px)' }}
            animate={isPlatformsInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, ease: [0.19, 0.91, 0.38, 0.98] }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase font-bold text-cream-50 tracking-brand-header leading-tight mb-4">
              PLATFORMS WE MASTER
            </h2>
            <p className="text-base sm:text-lg text-cream-200 font-montserrat max-w-3xl mx-auto">
              Strategic presence across every platform where your audience lives
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isPlatformsInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {platforms.map((platform, index) => {
              const Icon = platform.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariant}
                  className="group bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-copper-500/50 transition-all duration-500 overflow-hidden"
                >
                  <div className={`h-32 bg-gradient-to-br ${platform.gradient} relative flex items-center justify-center`}>
                    <Icon className="w-16 h-16 text-white/90" strokeWidth={1.5} />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-display uppercase font-semibold text-cream-50 mb-3 tracking-brand-header">{platform.name}</h3>
                    <p className="text-cream-200/80 font-montserrat text-sm leading-relaxed">{platform.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Why Social Media Matters - 3D Metrics */}
      <section ref={whySocialRef} className="relative bg-cream-100 px-6 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-36">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 sm:mb-20"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(15px)' }}
            animate={isWhySocialInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, ease: [0.19, 0.91, 0.38, 0.98] }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase font-bold text-near-black tracking-brand-header leading-tight mb-4">
              THE NUMBERS DON&apos;T LIE
            </h2>
            <p className="text-base sm:text-lg text-near-black/70 font-montserrat max-w-3xl mx-auto">
              Social media isn&apos;t optional—it&apos;s where your customers discover, engage, and buy
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isWhySocialInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {whySocialMetrics.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={metricCard}
                  className="group relative bg-white p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
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

                    <p className="text-4xl sm:text-5xl font-display font-bold text-near-black mb-2">{stat.metric}</p>

                    <p className="text-copper-600 font-montserrat font-semibold text-sm tracking-normal uppercase mb-3">{stat.label}</p>

                    <p className="text-near-black/70 font-montserrat text-sm leading-relaxed">{stat.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Our Approach - Timeline */}
      <section ref={approachRef} className="relative bg-cream-50 px-6 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16 sm:mb-20"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(15px)' }}
            animate={isApproachInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, ease: [0.19, 0.91, 0.38, 0.98] }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase font-bold text-near-black tracking-brand-header leading-tight mb-4">
              FROM STRATEGY TO SCROLL-STOPPING SUCCESS
            </h2>
            <p className="text-base sm:text-lg text-near-black/70 font-montserrat max-w-3xl mx-auto">
              A proven 6-step process that transforms social media from noise into strategic business infrastructure
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
        config={socialMediaPricingConfig}
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
              REAL RESULTS. REAL BUSINESSES.
            </h2>
            <p className="text-base sm:text-lg text-cream-200 font-montserrat max-w-3xl mx-auto">
              See how strategic social media transformed followers into revenue-driving customers
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
      <section ref={faqRef} className="relative bg-cream-50 px-6 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16 sm:mb-20"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(15px)' }}
            animate={isFaqInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, ease: [0.19, 0.91, 0.38, 0.98] }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase font-bold text-near-black tracking-brand-header leading-tight mb-4">
              QUESTIONS ABOUT SOCIAL MEDIA?
            </h2>
            <p className="text-base sm:text-lg text-near-black/70 font-montserrat max-w-2xl mx-auto">
              Get answers to common questions about our approach, process, and what to expect
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
              READY TO TURN FOLLOWERS INTO{' '}
              <span className="bg-gradient-to-r from-copper-400 to-copper-600 bg-clip-text text-transparent">REVENUE?</span>
            </h2>

            <p className="text-lg sm:text-xl text-cream-200 font-montserrat font-normal leading-relaxed max-w-2xl mx-auto mb-10">
              Get a free social media audit and strategy session. We&apos;ll show you exactly where the opportunities are and how we&apos;ll capitalize on them.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="primary"
                size="default"
                className="group w-full sm:w-fit"
              >
                <Link href="/contact">
                  Get Your Free Audit
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                size="default"
                className="w-full sm:w-fit bg-transparent border-2 border-cream-50/40 text-cream-50 hover:bg-copper-500/10 hover:border-cream-50 backdrop-blur-md"
              >
                <Link href="/contact">
                  Get a Quote
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
