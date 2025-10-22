'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight,
  Lightbulb,
  TrendingUp,
  Zap,
  Shield,
  Users,
  Link as LinkIcon,
  Server,
  ShoppingCart,
  Cloud,
  Database,
  Smartphone,
  Code
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  customWebHeroOverline,
  customWebHeroHeadline,
  customWebHeroDescription,
  customWebFeaturesHeader,
  customWebFeaturesCardStagger,
  customWebFeaturesCard,
  customWebServicesHeader,
  customWebServicesCardStagger,
  customWebServicesCard,
  customWebProcessHeader,
  customWebProcessStepStagger,
  customWebProcessStep,
  customWebPortfolioHeader,
  customWebPortfolioCardStagger,
  customWebPortfolioCard,
  customWebFAQSection,
  customWebFAQCategoryStagger,
  customWebFAQCategory,
  customWebCTASection,
  customWebCTAButton,
} from '@/lib/animation-variants';

const features = [
  {
    icon: Lightbulb,
    title: 'Strategic Partnership, Not Just Development',
    description: 'We don\'t build what you ask for—we collaborate to build what you actually need. Our discovery process uncovers opportunities you haven\'t yet considered, ensuring every line of code serves your strategic objectives.',
  },
  {
    icon: TrendingUp,
    title: 'Built for Scale From Day One',
    description: 'We engineer platforms with growth built into their foundation—modular architectures that adapt as you expand, integrate new technologies, and enter new markets. Technical debt eliminated before it begins.',
  },
  {
    icon: Zap,
    title: 'Technology That Performs When It Matters',
    description: 'We optimize for sub-second load times, seamless user experiences, and infrastructure that handles traffic spikes without breaking. Performance metrics that translate directly to revenue impact.',
  },
  {
    icon: Shield,
    title: 'Security Beyond Compliance',
    description: 'Enterprise-grade protection, penetration testing, ongoing vulnerability monitoring, and data architecture that keeps your customers\' trust intact. Because one breach can undo years of brand building.',
  },
  {
    icon: Users,
    title: 'Ongoing Partnership, Not One-Time Delivery',
    description: 'Launch day is just the beginning. We provide dedicated technical support, proactive monitoring, regular performance audits, and evolutionary enhancements that keep your platform ahead of market demands.',
  },
  {
    icon: LinkIcon,
    title: 'Integration Excellence Across Your Stack',
    description: 'We create seamless integrations that eliminate data silos, automate workflows, and give you the unified visibility modern businesses demand.',
  },
];

const services = [
  {
    icon: Server,
    title: 'Enterprise Web Applications',
    description: 'Scalable platforms built for complex business logic, high transaction volumes, and mission-critical operations.',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce Platforms',
    description: 'Custom shopping experiences that go beyond templates, with advanced inventory management and payment integration.',
  },
  {
    icon: Cloud,
    title: 'SaaS Development',
    description: 'Multi-tenant architectures, subscription management, and cloud-native applications built for growth.',
  },
  {
    icon: Database,
    title: 'Custom CMS Solutions',
    description: 'Content management systems tailored to your workflow, with powerful editorial tools and API-first architecture.',
  },
  {
    icon: Smartphone,
    title: 'Progressive Web Apps',
    description: 'Native-quality experiences that work offline, send push notifications, and install on any device.',
  },
  {
    icon: Code,
    title: 'API Development & Integration',
    description: 'RESTful and GraphQL APIs, third-party integrations, and middleware that connects your entire tech stack.',
  },
];

const processPhases = [
  {
    number: '01',
    title: 'Discovery & Strategic Alignment',
    description: 'We immerse ourselves in your business model, competitive landscape, user research, and technical requirements. Deep-dive workshops with stakeholders across departments ensure we understand not just what you want, but why it matters.',
    deliverables: [
      'Technical requirements document',
      'User journey mapping',
      'Competitive analysis report',
      'Technology stack recommendations',
      'Project roadmap with milestones',
    ],
    timeline: '2-4 weeks',
  },
  {
    number: '02',
    title: 'Architecture & Design',
    description: 'Our technical architects design scalable infrastructure while our designers craft interfaces that balance aesthetics with conversion optimization. Everything validated through user testing before a single line of code is written.',
    deliverables: [
      'System architecture documentation',
      'Database schema design',
      'API structure and endpoints',
      'High-fidelity UI/UX designs',
      'Interactive prototypes',
    ],
    timeline: '3-6 weeks',
  },
  {
    number: '03',
    title: 'Agile Development',
    description: 'Sprint-based development with bi-weekly demos keeps you involved throughout. Our developers follow industry best practices—clean code, comprehensive testing, security-first architecture, and performance optimization at every layer.',
    deliverables: [
      'Functional modules delivered iteratively',
      'Automated test coverage',
      'Security audits per sprint',
      'Performance benchmarking',
      'Regular stakeholder demos',
    ],
    timeline: '8-20 weeks',
  },
  {
    number: '04',
    title: 'Testing & Refinement',
    description: 'Rigorous quality assurance across devices, browsers, and edge cases. Load testing ensures your platform handles peak traffic. User acceptance testing with your team validates that every feature delivers the intended value.',
    deliverables: [
      'QA testing reports',
      'Performance optimization documentation',
      'Browser/device compatibility validation',
      'User acceptance testing results',
      'Pre-launch security audit',
    ],
    timeline: '2-4 weeks',
  },
  {
    number: '05',
    title: 'Launch & Continuous Evolution',
    description: 'Carefully orchestrated deployment with zero-downtime migrations. Post-launch monitoring tracks performance, user behavior, and system health. Ongoing optimization based on real-world data keeps your platform performing at peak effectiveness.',
    deliverables: [
      'Deployment plan and execution',
      'Monitoring dashboard setup',
      'Team training and documentation',
      '30/60/90-day performance reports',
      'Evolutionary enhancement roadmap',
    ],
    timeline: 'Ongoing partnership',
  },
];

const caseStudies = [
  {
    category: 'B2B SaaS Platform',
    title: 'TechFlow Solutions',
    description: 'Custom web application delivering 320% increase in qualified leads and 4.8x ROI through strategic development and integration excellence.',
    image: '/images/case-study-hero.jpg',
    technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    link: '/portfolio/techflow-solutions',
  },
  {
    category: 'E-Commerce Platform',
    title: 'Modern Threads',
    description: 'Custom e-commerce solution generating $2M first-year revenue with 50K+ customers and advanced inventory management.',
    image: '/images/case-study-ecommerce-1.jpg',
    technologies: ['React', 'Node.js', 'Stripe', 'Redis'],
    link: '/portfolio/modern-threads',
  },
  {
    category: 'Enterprise CMS',
    title: 'Apex Manufacturing',
    description: 'Headless CMS platform driving 180% increase in enterprise deals through content-first architecture and seamless integrations.',
    image: '/images/case-study-4.jpg',
    technologies: ['GraphQL', 'Headless CMS', 'AWS', 'Docker'],
    link: '/portfolio/apex-manufacturing',
  },
];

const faqCategories = [
  {
    category: 'Service Delivery',
    questions: [
      {
        question: 'How is custom development different from your WaaS plans?',
        answer: 'WaaS plans deliver premium websites quickly using proven templates, optimized workflows, and predictable monthly pricing. Custom development is for organizations with specific needs that standard platforms can\'t address—complex integrations, proprietary functionality, unique user experiences, or technical requirements that demand bespoke engineering. Think of it this way: WaaS is like buying a luxury car perfectly suited to most drivers. Custom development is commissioning a vehicle engineered specifically for how you operate.',
      },
      {
        question: 'How long does a custom development project take?',
        answer: 'Most projects launch within 3-6 months from kickoff, though timelines vary based on scope and complexity. Our phased approach allows you to see progress every two weeks through sprint demos. Timeline factors include feature complexity, stakeholder availability, third-party integrations, content preparation, and testing scope. We can also structure projects with phased launches—delivering core functionality first, then evolving with additional features based on user feedback.',
      },
    ],
  },
  {
    category: 'Pricing & Contracts',
    questions: [
      {
        question: 'What\'s the typical investment range for custom development projects?',
        answer: 'Projects typically range from $25,000 to $250,000+ depending on scope, complexity, and timeline. We provide detailed proposals after discovery that break down costs by phase, giving you transparency and the option to proceed incrementally. Factors influencing investment include platform complexity, integration requirements, design customization, expected traffic, and security needs. We focus on ROI, not just cost—the right custom solution often delivers returns that justify significantly higher upfront investment.',
      },
      {
        question: 'Will I own the code and intellectual property?',
        answer: 'Absolutely. You own 100% of the custom code we write, the design assets we create, and the intellectual property developed for your project. We provide complete source code access, comprehensive documentation, and knowledge transfer to your team. Our goal is partnership, not lock-in. You should have the freedom to take your platform in-house, engage different developers, or continue working with us because we deliver value—not because you\'re technically dependent.',
      },
    ],
  },
  {
    category: 'Technical Details',
    questions: [
      {
        question: 'How do you ensure the platform will scale as we grow?',
        answer: 'Scalability isn\'t something we add later—it\'s engineered from the foundation. Our strategy includes horizontal scaling architecture, database optimization, content delivery networks, caching strategies, load balancing and redundancy, performance benchmarking at every sprint, and infrastructure that grows incrementally with demand. We design for 10x your current traffic, then stress-test beyond that.',
      },
      {
        question: 'What if we need integrations with systems you haven\'t worked with before?',
        answer: 'We thrive on technical challenges. Our developers are platform-agnostic problem-solvers who\'ve integrated hundreds of systems. Our approach includes API documentation analysis, sandbox testing, error handling strategies, data synchronization, and ongoing monitoring of integration health. If a system has an API, webhook, or database we can access, we can integrate it. If it doesn\'t, we find creative solutions.',
      },
      {
        question: 'Do you provide ongoing support after launch?',
        answer: 'Yes—and we recommend it. Technology doesn\'t stand still, and neither should your platform. Support options include reactive support for issues and emergency response, proactive maintenance for monitoring and optimization, and evolutionary development for ongoing enhancements. Most clients choose retainer-based support that combines all three, giving them dedicated technical partnership without the overhead of in-house development teams.',
      },
    ],
  },
];

export default function CustomWebDevelopmentPage() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const featuresRef = useRef(null);
  const servicesRef = useRef(null);
  const processRef = useRef(null);
  const portfolioRef = useRef(null);
  const faqRef = useRef(null);
  const ctaRef = useRef(null);

  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.15 });
  const isServicesInView = useInView(servicesRef, { once: true, amount: 0.15 });
  const isProcessInView = useInView(processRef, { once: true, amount: 0.15 });
  const isPortfolioInView = useInView(portfolioRef, { once: true, amount: 0.15 });
  const isFAQInView = useInView(faqRef, { once: true, amount: 0.15 });
  const isCTAInView = useInView(ctaRef, { once: true, amount: 0.25 });

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-cream-200 pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
        {/* Decorative elements with parallax */}
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
              className="text-sm font-medium tracking-[0.25em] uppercase text-copper-500 mb-6"
              initial={prefersReducedMotion ? false : 'hidden'}
              animate="visible"
              variants={customWebHeroOverline}
            >
              Custom Web Development
            </motion.p>
            <motion.h1
              className="text-[2.75rem] leading-[1.1] sm:text-5xl lg:text-6xl xl:text-7xl font-light font-playfair text-near-black tracking-tight mb-6 sm:mb-8"
              initial={prefersReducedMotion ? false : 'hidden'}
              animate="visible"
              variants={customWebHeroHeadline}
            >
              Digital Experiences,
              <span className="block mt-3 text-copper-500">Crafted to Perfection</span>
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl font-light text-near-black/70 leading-relaxed tracking-wide max-w-3xl mx-auto"
              initial={prefersReducedMotion ? false : 'hidden'}
              animate="visible"
              variants={customWebHeroDescription}
            >
              When off-the-shelf solutions fall short and your digital ambitions require bespoke engineering, we build custom web experiences that transform business goals into measurable market advantage.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="bg-white py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isFeaturesInView ? 'visible' : 'hidden'}
            variants={customWebFeaturesHeader}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-playfair text-near-black tracking-tight mb-6 leading-tight">
              We Architect{' '}
              <motion.span
                className="text-copper-500 inline-block"
                initial={{ scale: 1 }}
                animate={isFeaturesInView ? {
                  scale: [1, 1.08, 1],
                  filter: ['blur(0px)', 'blur(0px)', 'blur(0px)'],
                } : {}}
                transition={{
                  duration: 1.8,
                  delay: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  times: [0, 0.5, 1],
                  repeat: 0,
                }}
              >
                Solutions
              </motion.span>
              , Not Just Websites
            </h2>
            <p className="text-lg font-light text-near-black/70 leading-relaxed tracking-wide">
              Custom development begins with understanding your unique challenges, market position, and growth trajectory.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isFeaturesInView ? 'visible' : 'hidden'}
            variants={customWebFeaturesCardStagger}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  className="group bg-cream-100/50 p-8 transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-copper-500/10 hover:-translate-y-2"
                  variants={customWebFeaturesCard}
                >
                  <div className="w-16 h-16 mb-6 flex items-center justify-center bg-copper-500/5 text-copper-500 group-hover:bg-copper-500 group-hover:text-white transition-all duration-500 relative z-10">
                    <Icon className="w-8 h-8 relative z-10" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-light font-playfair text-near-black mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-light text-near-black/70 leading-relaxed tracking-wide">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Services Showcase Section */}
      <section ref={servicesRef} className="bg-cream-200 py-20 sm:py-28 lg:py-36">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isServicesInView ? 'visible' : 'hidden'}
            variants={customWebServicesHeader}
          >
            <p className="text-sm font-medium tracking-[0.25em] uppercase text-copper-500 mb-4">
              Our Capabilities
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-playfair text-near-black tracking-tight mb-6">
              What We Build
            </h2>
            <p className="text-lg font-light text-near-black/70 leading-relaxed tracking-wide">
              From MVPs to enterprise-scale systems, we deliver technical excellence across every platform and use case.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isServicesInView ? 'visible' : 'hidden'}
            variants={customWebServicesCardStagger}
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={index}
                  className="group bg-white/60 backdrop-blur-sm p-8 transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-copper-500/10 hover:-translate-y-2"
                  variants={customWebServicesCard}
                >
                  <div className="w-16 h-16 mb-6 flex items-center justify-center bg-copper-500/5 text-copper-500 group-hover:bg-copper-500 group-hover:text-white transition-all duration-500 relative z-10">
                    <Icon className="w-8 h-8 relative z-10" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-light font-playfair text-near-black mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm font-light text-near-black/70 leading-relaxed tracking-wide">
                    {service.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section ref={processRef} className="bg-white py-20 sm:py-28 lg:py-36">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-20"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isProcessInView ? 'visible' : 'hidden'}
            variants={customWebProcessHeader}
          >
            <p className="text-sm font-medium tracking-[0.25em] uppercase text-copper-500 mb-4">
              How We Work
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-playfair text-near-black tracking-tight mb-6">
              Our Collaborative Process
            </h2>
            <p className="text-lg font-light text-near-black/70 leading-relaxed tracking-wide">
              Strategic development partnerships built on transparency, collaboration, and measurable results.
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isProcessInView ? 'visible' : 'hidden'}
            variants={customWebProcessStepStagger}
          >
            {processPhases.map((phase, index) => (
              <motion.div
                key={index}
                className="relative pl-20 pb-16 last:pb-0"
                variants={customWebProcessStep}
              >
                {/* Vertical connecting line */}
                {index !== processPhases.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-[1px] bg-gradient-to-b from-copper-500/30 to-copper-500/5" />
                )}

                {/* Number badge */}
                <div className="absolute left-0 top-0 w-12 h-12 bg-copper-500 text-white flex items-center justify-center">
                  <span className="text-lg font-light">{phase.number}</span>
                </div>

                {/* Content */}
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                    <h3 className="text-2xl font-light font-playfair text-near-black">
                      {phase.title}
                    </h3>
                    <span className="text-sm font-medium tracking-[0.15em] uppercase text-copper-500 mt-2 sm:mt-0">
                      {phase.timeline}
                    </span>
                  </div>
                  <p className="text-base font-light text-near-black/70 leading-relaxed mb-4">
                    {phase.description}
                  </p>

                  {/* Deliverables */}
                  <div className="bg-cream-100/50 p-6 mt-4">
                    <p className="text-xs font-medium tracking-[0.2em] uppercase text-copper-500 mb-4">
                      Deliverables
                    </p>
                    <ul className="space-y-3">
                      {phase.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-copper-500 mt-1 text-base">→</span>
                          <span className="text-base font-light text-near-black/80 leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section ref={portfolioRef} className="bg-cream-200 py-20 sm:py-28 lg:py-36">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isPortfolioInView ? 'visible' : 'hidden'}
            variants={customWebPortfolioHeader}
          >
            <p className="text-sm font-medium tracking-[0.25em] uppercase text-copper-500 mb-4">
              Proven Results
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-playfair text-near-black tracking-tight mb-6">
              Strategic Development in Action
            </h2>
            <p className="text-lg font-light text-near-black/70 leading-relaxed tracking-wide">
              Real projects, real results, real business transformation.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isPortfolioInView ? 'visible' : 'hidden'}
            variants={customWebPortfolioCardStagger}
          >
            {caseStudies.map((project, index) => (
              <motion.div
                key={index}
                className="group bg-white overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-copper-500/15 hover:-translate-y-2"
                variants={customWebPortfolioCard}
              >
                {/* Project Image */}
                <div className="relative h-64 overflow-hidden bg-near-black/5">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-near-black/60 to-transparent"
                    initial={{ opacity: 0.6 }}
                    whileHover={{ opacity: 0.8 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <p className="text-xs font-medium tracking-[0.2em] uppercase text-copper-500 mb-3">
                    {project.category}
                  </p>
                  <h3 className="text-2xl font-light font-playfair text-near-black mb-4">
                    {project.title}
                  </h3>
                  <p className="text-base font-light text-near-black/70 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-copper-500/5 text-copper-600 text-xs tracking-wide"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={project.link}
                    className="inline-flex items-center gap-2 text-sm font-medium tracking-[0.15em] uppercase text-copper-500 hover:text-copper-600 transition-colors group/link"
                  >
                    <span>View Case Study</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1.5 group-hover/link:scale-110 transition-all duration-300" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section ref={faqRef} className="bg-white py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1000px]">
          <motion.div
            className="text-center mb-16"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isFAQInView ? 'visible' : 'hidden'}
            variants={customWebFAQSection}
          >
            <p className="text-sm font-medium tracking-[0.25em] uppercase text-copper-500 mb-4">
              Questions Answered
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-playfair text-near-black tracking-tight">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <motion.div
            className="space-y-12"
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isFAQInView ? 'visible' : 'hidden'}
            variants={customWebFAQCategoryStagger}
          >
            {faqCategories.map((category, categoryIndex) => (
              <motion.div key={categoryIndex} variants={customWebFAQCategory}>
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-copper-500 mb-6">
                  {category.category}
                </p>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((item, questionIndex) => (
                    <AccordionItem
                      key={questionIndex}
                      value={`${categoryIndex}-${questionIndex}`}
                      className="bg-cream-100/50 backdrop-blur-sm px-5 sm:px-8 border-none"
                    >
                      <AccordionTrigger className="text-left text-lg sm:text-xl font-normal font-montserrat text-near-black hover:no-underline hover:text-copper-600 transition-colors py-6">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-base font-light text-near-black/70 leading-relaxed tracking-wide pb-6">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section ref={ctaRef} className="bg-near-black py-16 sm:py-24 lg:py-32 relative overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-[120px] pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isCTAInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        <motion.div
          className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1000px] relative text-center"
          initial={prefersReducedMotion ? false : 'hidden'}
          animate={isCTAInView ? 'visible' : 'hidden'}
          variants={customWebCTASection}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light font-playfair text-cream-200 tracking-tight mb-6">
            Let&apos;s Build Something Exceptional
          </h2>
          <p className="text-lg font-light text-light-gray leading-relaxed tracking-wide mb-10 max-w-2xl mx-auto">
            Tell us about your vision and we&apos;ll craft a tailored solution that exceeds expectations.
          </p>
          <motion.div
            initial={prefersReducedMotion ? false : 'hidden'}
            animate={isCTAInView ? 'visible' : 'hidden'}
            variants={customWebCTAButton}
          >
            <Button
              asChild
              variant="primary"
              size="lg"
              className="uppercase tracking-[0.15em] text-sm group"
            >
              <Link href="/contact">
                <span className="whitespace-nowrap">Start Your Project</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1.5 group-hover:scale-110 transition-all duration-300 flex-shrink-0" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
