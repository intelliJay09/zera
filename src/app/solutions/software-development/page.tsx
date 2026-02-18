'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Smartphone,
  Cloud,
  Database,
  Zap,
  Shield,
  Users,
  Code,
  Server,
  TrendingUp,
  Target,
  CheckCircle2,
  ChevronDown,
  Calendar,
  Trophy,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { softwareDevelopmentPricingConfig } from '@/data/software-development-pricing';

const PricingSection = dynamic(() => import('@/components/pricing/PricingSection'));

export default function SoftwareDevelopmentPage() {
  const router = useRouter();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Section refs for scroll triggers
  const servicesRef = useRef(null);
  const whySoftwareRef = useRef(null);
  const approachRef = useRef(null);
  const resultsRef = useRef(null);
  const faqRef = useRef(null);

  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.15 });
  const isWhySoftwareInView = useInView(whySoftwareRef, { once: true, amount: 0.2 });
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
  const softwareServices = [
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      tagline: 'Native & Cross-Platform Excellence',
      description:
        'Beautiful, performant mobile applications for iOS and Android. Native Swift/Kotlin or cross-platform React Native/Flutter—optimized for your needs.',
      features: [
        'iOS & Android development',
        'Cross-platform solutions',
        'App Store optimization',
        'Push notifications & analytics',
      ],
    },
    {
      icon: Cloud,
      title: 'SaaS Platform Development',
      tagline: 'Scalable Subscription Software',
      description:
        'Multi-tenant architectures, subscription management, and cloud-native applications built for recurring revenue and exponential growth.',
      features: [
        'Multi-tenant architecture',
        'Subscription billing integration',
        'User provisioning & onboarding',
        'Cloud-native deployment',
      ],
    },
    {
      icon: Server,
      title: 'Enterprise System Integration',
      tagline: 'Connected Ecosystems',
      description:
        'Eliminate data silos by connecting disparate systems. API integrations, workflow automation, and unified data ecosystems.',
      features: [
        'Third-party API integrations',
        'Workflow automation',
        'Data synchronization',
        'Legacy system modernization',
      ],
    },
    {
      icon: Database,
      title: 'Custom Business Software',
      tagline: 'Tailored Internal Tools',
      description:
        'Custom CRM systems, inventory management, project tracking, and internal tools that streamline operations and boost productivity.',
      features: [
        'Custom CRM & ERP systems',
        'Inventory management',
        'Project tracking tools',
        'Reporting dashboards',
      ],
    },
    {
      icon: Code,
      title: 'API Development',
      tagline: 'Robust Backend Infrastructure',
      description:
        'RESTful and GraphQL APIs, microservices architecture, and scalable backend systems that power modern applications.',
      features: [
        'RESTful & GraphQL APIs',
        'Microservices architecture',
        'Authentication & authorization',
        'Real-time data processing',
      ],
    },
  ];

  const whySoftwareMetrics = [
    {
      icon: TrendingUp,
      metric: '47%',
      label: 'Operational Efficiency Gain',
      description: 'Custom software automates workflows and eliminates manual processes',
      color: 'from-copper-500 to-copper-600',
    },
    {
      icon: Target,
      metric: '3.2x',
      label: 'Average ROI',
      description: 'Strategic software investments deliver measurable returns within 18 months',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Zap,
      metric: '68%',
      label: 'Faster Time-to-Market',
      description: 'Agile development delivers functional software in sprints, not years',
      color: 'from-violet-500 to-purple-600',
    },
    {
      icon: Shield,
      metric: '99.9%',
      label: 'Uptime Reliability',
      description: 'Enterprise-grade infrastructure ensures business continuity',
      color: 'from-emerald-500 to-teal-600',
    },
  ];

  const approachSteps = [
    {
      number: 1,
      title: 'Requirements & Strategy',
      description:
        'Deep-dive discovery sessions to understand your business model, user needs, technical constraints, and competitive landscape. We map user journeys and architect solutions.',
      deliverables: ['Requirements document', 'User journey maps', 'Technical architecture', 'Project roadmap'],
    },
    {
      number: 2,
      title: 'System Design & Architecture',
      description:
        'Technical architects design scalable infrastructure, data models, API structures, and security protocols. Everything validated through prototyping before development.',
      deliverables: ['System architecture', 'Database design', 'API specifications', 'Interactive prototypes'],
    },
    {
      number: 3,
      title: 'Agile Development',
      description:
        'Sprint-based development with continuous integration and deployment. Bi-weekly demos keep you involved. Test-driven development ensures quality.',
      deliverables: ['Functional modules', 'Automated testing', 'Code documentation', 'Sprint demos'],
    },
    {
      number: 4,
      title: 'QA & Performance Optimization',
      description:
        'Comprehensive testing across devices, platforms, and edge cases. Load testing, security audits, and performance optimization ensure production readiness.',
      deliverables: ['QA test reports', 'Performance benchmarks', 'Security audit', 'Bug fixes'],
    },
    {
      number: 5,
      title: 'Deployment & Training',
      description:
        'Carefully orchestrated deployment with zero-downtime strategies. Team training, documentation, and knowledge transfer ensure smooth adoption.',
      deliverables: ['Production deployment', 'User documentation', 'Team training', 'Admin guides'],
    },
    {
      number: 6,
      title: 'Support & Evolution',
      description:
        'Post-launch monitoring, performance tracking, and evolutionary enhancements based on real-world usage. Ongoing support keeps your software competitive.',
      deliverables: ['Performance monitoring', 'Bug fixes', 'Feature enhancements', 'Monthly reports'],
    },
  ];

  const results = [
    {
      icon: Trophy,
      industry: 'B2B SaaS Platform',
      result: 'Custom Platform Generated $8M ARR',
      timeline: '12 months',
      description:
        'Multi-tenant SaaS platform with subscription billing, user provisioning, and advanced analytics transformed business model from services to scalable software.',
      metrics: [
        { label: 'Annual Revenue', value: '$8M' },
        { label: 'Active Users', value: '12K+' },
        { label: 'Churn Rate', value: '<3%' },
      ],
    },
    {
      icon: Target,
      industry: 'Manufacturing Enterprise',
      result: 'Inventory System Cut Costs 47%',
      timeline: '9 months',
      description:
        'Custom inventory management system with real-time tracking, automated reordering, and predictive analytics eliminated waste and optimized operations.',
      metrics: [
        { label: 'Cost Reduction', value: '47%' },
        { label: 'Time Saved', value: '320h/mo' },
        { label: 'Accuracy', value: '99.8%' },
      ],
    },
    {
      icon: Users,
      industry: 'Healthcare Provider',
      result: 'Patient Portal Improved Satisfaction 89%',
      timeline: '7 months',
      description:
        'Custom patient portal with appointment scheduling, secure messaging, and medical records access transformed patient experience and reduced admin workload.',
      metrics: [
        { label: 'Patient Satisfaction', value: '+89%' },
        { label: 'Admin Time Saved', value: '60%' },
        { label: 'Portal Adoption', value: '94%' },
      ],
    },
  ];

  const faqs = [
    {
      question: 'How is software development different from web development?',
      answer:
        'Web development focuses on websites and browser-based applications—online presence, marketing sites, e-commerce platforms. Software development encompasses custom business tools, mobile applications, SaaS platforms, enterprise systems, and internal automation. Think of web development as your digital storefront; software development as the operational engine that powers your business processes. Both require technical excellence, but software development typically involves more complex logic, data architecture, and system integrations.',
    },
    {
      question: 'Do you develop mobile apps for both iOS and Android?',
      answer:
        'Yes. We offer both native development (Swift for iOS, Kotlin for Android) and cross-platform solutions (React Native, Flutter). Native development delivers maximum performance and platform-specific features. Cross-platform accelerates time-to-market and reduces costs by sharing code across platforms. We recommend the approach based on your specific requirements, budget, timeline, and target audience. Most clients start with cross-platform for speed, then optimize critical features with native code if needed.',
    },
    {
      question: 'What is the typical investment for custom software development?',
      answer:
        'Projects typically range from $35,000 for MVP mobile apps to $300,000+ for comprehensive enterprise systems. Investment depends on complexity, platform requirements, integrations, expected user load, and security needs. We provide transparent proposals with phase breakdowns after discovery, giving you flexibility to proceed incrementally. Our focus is ROI—the right software investment often delivers returns that justify significantly higher upfront costs through operational efficiency, revenue generation, or competitive differentiation.',
    },
    {
      question: 'How long does it take to build custom software?',
      answer:
        'Most projects launch within 4-8 months from kickoff, though timelines vary based on scope and complexity. Simple mobile apps: 3-4 months. Mid-complexity SaaS platforms: 6-9 months. Enterprise systems: 9-18 months. Our agile approach delivers functional increments every 2-3 weeks, allowing you to see progress continuously. We can also structure phased launches—delivering core functionality first, then iterating based on user feedback and business priorities.',
    },
    {
      question: 'Will we own the source code?',
      answer:
        'Absolutely. You own 100% of the custom code we write, design assets, and intellectual property developed for your project. We provide complete source code access, comprehensive documentation, deployment guides, and knowledge transfer. Our goal is partnership, not lock-in. You should have the freedom to take development in-house, engage different developers, or continue with us because we deliver exceptional value—not because you&apos;re technically dependent.',
    },
    {
      question: 'Do you provide ongoing support and maintenance?',
      answer:
        'Yes, and we strongly recommend it. Software requires ongoing attention—security updates, performance monitoring, bug fixes, and evolutionary enhancements. Our support packages include reactive support (issue resolution), proactive maintenance (monitoring and optimization), and evolutionary development (feature enhancements). Most clients choose comprehensive retainers that combine all three, providing dedicated technical partnership without the overhead of in-house development teams.',
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
              Software Development Excellence
            </motion.p>

            {/* Main Headline */}
            <motion.h1
              variants={heroItem}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-light text-cream-50 tracking-brand-header leading-[1.1] mb-6"
            >
              Custom Software That{' '}
              <span className="bg-gradient-to-r from-copper-400 to-copper-600 bg-clip-text text-transparent">
                Transforms Operations
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={heroItem}
              className="text-lg sm:text-xl lg:text-2xl font-montserrat font-light text-cream-200 leading-relaxed tracking-normal max-w-2xl mb-10"
            >
              From mobile applications to enterprise systems, we build custom software that automates workflows, eliminates inefficiencies, and drives measurable business value.
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
                  Start Your Project
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
                  View Case Studies
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right: Floating Tech Elements */}
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
                <Cloud className="w-8 h-8 text-copper-400 mb-2" />
                <p className="text-copper-400 text-xs font-medium mb-1">Cloud-Native</p>
                <p className="text-cream-50 text-2xl font-display font-bold">99.9%</p>
              </motion.div>

              {/* Floating badge 2 */}
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
                <TrendingUp className="w-8 h-8 text-blue-400 mb-2" />
                <p className="text-blue-400 text-xs font-medium mb-1">Efficiency Gain</p>
                <p className="text-cream-50 text-2xl font-display font-bold">+47%</p>
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
                <Target className="w-8 h-8 text-violet-400 mb-2" />
                <p className="text-violet-400 text-xs font-medium mb-1">Average ROI</p>
                <p className="text-cream-50 text-2xl font-display font-bold">3.2x</p>
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
                <Code className="w-32 h-32 text-copper-500/30" strokeWidth={1} />
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
              COMPLETE SOFTWARE DEVELOPMENT SERVICES
            </h2>
            <p className="text-base sm:text-lg text-near-black/70 font-montserrat max-w-3xl mx-auto">
              From mobile apps to enterprise platforms, we build software that solves real business problems
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isServicesInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {softwareServices.map((service, index) => {
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

      {/* Why Software Matters - 3D Metrics */}
      <section ref={whySoftwareRef} className="relative bg-gradient-to-br from-near-black via-[#1a1a1a] to-near-black px-6 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-36">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16 sm:mb-20"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(15px)' }}
            animate={isWhySoftwareInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 1, ease: [0.19, 0.91, 0.38, 0.98] }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display uppercase font-bold text-cream-50 tracking-brand-header leading-tight mb-4">
              WHY CUSTOM SOFTWARE{' '}
              <span className="bg-gradient-to-r from-copper-400 to-copper-600 bg-clip-text text-transparent">
                BEATS OFF-THE-SHELF
              </span>
            </h2>
            <p className="text-base sm:text-lg text-cream-200 font-montserrat max-w-3xl mx-auto">
              Generic software forces your business to adapt to its limitations. Custom software adapts to your business.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isWhySoftwareInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            {whySoftwareMetrics.map((stat, index) => {
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
              FROM CONCEPT TO LAUNCH
            </h2>
            <p className="text-base sm:text-lg text-near-black/70 font-montserrat max-w-3xl mx-auto">
              A proven 6-step agile process that transforms business requirements into production-ready software
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
      <PricingSection config={softwareDevelopmentPricingConfig} onSelectPlan={() => router.push('/contact')} className="bg-cream-50" />

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
              REAL SOFTWARE. REAL RESULTS.
            </h2>
            <p className="text-base sm:text-lg text-cream-200 font-montserrat max-w-3xl mx-auto">
              See how custom software development transformed operations and drove measurable business outcomes
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
              QUESTIONS ABOUT SOFTWARE DEVELOPMENT?
            </h2>
            <p className="text-base sm:text-lg text-near-black/70 font-montserrat max-w-2xl mx-auto">
              Get answers to common questions about our process, pricing, and what to expect
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
              READY TO BUILD SOFTWARE THAT{' '}
              <span className="bg-gradient-to-r from-copper-400 to-copper-600 bg-clip-text text-transparent">
                TRANSFORMS YOUR BUSINESS?
              </span>
            </h2>

            <p className="text-lg sm:text-xl text-cream-200 font-montserrat font-normal leading-relaxed max-w-2xl mx-auto mb-10">
              Let&apos;s build custom software that automates operations, eliminates inefficiencies, and delivers measurable ROI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="primary"
                size="default"
                className="group w-full sm:w-fit"
              >
                <Link href="/contact">
                  Start Your Project
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
                  View Case Studies
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
