'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CheckCircle2, TrendingUp, Shield, Zap } from 'lucide-react';

export default function WhyAstraFlow() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      ref={sectionRef}
      className="bg-cream-200 pt-24 sm:pt-32 lg:pt-40 pb-12 sm:pb-16 lg:pb-20 relative overflow-hidden"
    >
      {/* Opening Statement */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] mb-32 sm:mb-40 lg:mb-48">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.19, 1.0, 0.22, 1.0] }}
          className="text-center max-w-4xl mx-auto"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-copper-500 mb-6">
            Our Difference
          </p>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light font-playfair text-near-black tracking-tight leading-tight mb-8">
            Most agencies show you what they want you to see.
          </h2>

          <p className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light font-playfair text-copper-500 tracking-tight leading-tight">
            We show you everything.
          </p>

          <p className="mt-8 text-lg sm:text-xl font-light text-near-black/70 max-w-2xl mx-auto">
            Scroll to reveal the difference between agency promises and Astra Flow reality.
          </p>
        </motion.div>
      </div>

      {/* Revelation 1: Flexible Service Tiers */}
      <RevelationSection
        scrollProgress={scrollYProgress}
        progressRange={[0, 0.25]}
        icon={<TrendingUp className="h-12 w-12 text-copper-500" />}
        number="01"
        genericPromise="One-size-fits-all approach"
        boldDeclaration="Two paths to digital excellence. Choose transparent WaaS plans or bespoke custom partnerships."
        realityContent={
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <MetricCard
                value="150+"
                label="Businesses Transformed"
                description="WaaS + Custom Services"
              />
              <MetricCard
                value="2"
                label="Service Tiers"
                description="Flexible approach"
              />
            </div>

            <div className="bg-white/40 backdrop-blur-sm p-6 rounded-lg border border-copper-500/20">
              <p className="text-sm font-medium tracking-wide uppercase text-copper-500 mb-3">
                Why This Matters
              </p>
              <p className="text-base font-light text-near-black/80 leading-relaxed">
                WaaS plans deliver affordable, managed websites for growing businesses. Custom services
                provide bespoke digital solutions for brands demanding exceptional outcomes. Whatever your
                needs, we have a path designed for your success.
              </p>
            </div>
          </div>
        }
      />

      {/* Revelation 2: Transparency */}
      <RevelationSection
        scrollProgress={scrollYProgress}
        progressRange={[0.25, 0.5]}
        icon={<Shield className="h-12 w-12 text-copper-500" />}
        number="02"
        genericPromise="Regular reporting and updates"
        boldDeclaration="Your money, your data, your dashboard. Always."
        realityContent={
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <TransparencyBadge
                icon="24/7"
                label="Dashboard Access"
              />
              <TransparencyBadge
                icon="$0"
                label="Hidden Fees"
              />
              <TransparencyBadge
                icon="100%"
                label="Data Visibility"
              />
            </div>

            <div className="bg-gradient-to-br from-white/60 to-white/30 backdrop-blur-sm p-8 rounded-lg border border-copper-500/20 relative overflow-hidden">
              {/* Mock Dashboard Preview */}
              <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-copper-500/10 to-transparent pointer-events-none" />

              <p className="text-sm font-medium tracking-wide uppercase text-copper-500 mb-4">
                Transparency Dashboard Preview
              </p>

              <div className="space-y-3 relative z-10">
                <DashboardMetric label="Campaign Performance" value="Live Tracking" />
                <DashboardMetric label="Budget Allocation" value="Every Dollar Tracked" />
                <DashboardMetric label="Monthly Reporting" value="Comprehensive Insights" />
              </div>

              <p className="mt-6 text-sm font-light text-near-black/70 leading-relaxed">
                No hidden fees. No opaque processes. You receive comprehensive monthly reporting
                with full visibility into campaign performance, spend allocation, and strategic
                recommendations.
              </p>
            </div>
          </div>
        }
      />

      {/* Revelation 3: Agility */}
      <RevelationSection
        scrollProgress={scrollYProgress}
        progressRange={[0.5, 0.75]}
        icon={<Zap className="h-12 w-12 text-copper-500" />}
        number="03"
        genericPromise="Flexible approach to your needs"
        boldDeclaration="Market changes weekly. Your strategy should too."
        realityContent={
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <ComparisonCard
                label="Traditional Agency"
                value="90 days"
                description="Average pivot time"
                negative
              />
              <ComparisonCard
                label="Astra Flow"
                value="14 days"
                description="Bi-weekly reviews"
                positive
              />
            </div>

            <div className="bg-white/40 backdrop-blur-sm p-6 rounded-lg border border-copper-500/20">
              <p className="text-sm font-medium tracking-wide uppercase text-copper-500 mb-3">
                Agile Framework
              </p>
              <div className="space-y-4">
                <AgilityFeature
                  title="Bi-weekly Strategy Reviews"
                  description="Course-correct based on real-time performance data"
                />
                <AgilityFeature
                  title="Rapid Market Response"
                  description="Pivot quickly when opportunities or challenges emerge"
                />
                <AgilityFeature
                  title="Startup Speed, Enterprise Quality"
                  description="Agile methodology with proven results"
                />
              </div>
            </div>
          </div>
        }
      />
    </section>
  );
}

// Revelation Section Component with Diagonal Reveal
interface RevelationSectionProps {
  scrollProgress: any;
  progressRange: [number, number];
  icon: React.ReactNode;
  number: string;
  genericPromise: string;
  boldDeclaration: string;
  realityContent: React.ReactNode;
}

function RevelationSection({
  scrollProgress,
  progressRange,
  icon,
  number,
  genericPromise,
  boldDeclaration,
  realityContent
}: RevelationSectionProps) {
  const revealProgress = useTransform(
    scrollProgress,
    progressRange,
    [0, 1]
  );

  const clipPath = useTransform(
    revealProgress,
    [0, 1],
    ['polygon(0 0, 0% 0, 0% 100%, 0 100%)', 'polygon(0 0, 100% 0, 100% 100%, 0 100%)']
  );

  const genericOpacity = useTransform(revealProgress, [0, 0.6], [1, 0]);
  const realityOpacity = useTransform(revealProgress, [0.2, 0.9], [0, 1]);

  // Title and icon reveal/conceal animations
  const titleOpacity = useTransform(revealProgress, [0.2, 0.9], [0, 1]);
  const titleY = useTransform(revealProgress, [0.2, 0.9], [20, 0]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
      <div className="relative min-h-[700px]">
        {/* Large Background Number */}
        <div className="absolute -top-12 -left-4 sm:-left-8 text-[200px] sm:text-[280px] font-light font-playfair text-copper-500/10 leading-none pointer-events-none select-none">
          {number}
        </div>

        {/* Generic Promise Side (Left) - Fades Out */}
        <motion.div
          style={{ opacity: genericOpacity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="max-w-xl text-center">
            <div className="mb-6 flex justify-center opacity-30">
              {icon}
            </div>
            <p className="text-3xl sm:text-4xl lg:text-5xl font-light font-playfair text-near-black/50 blur-[2px] italic">
              &ldquo;{genericPromise}&rdquo;
            </p>
            <p className="mt-4 text-sm font-medium tracking-wide uppercase text-near-black/30">
              Typical Agency Promise
            </p>
          </div>
        </motion.div>

        {/* Astra Flow Reality (Right) - Diagonal Reveal */}
        <motion.div
          style={{
            clipPath,
            opacity: realityOpacity
          }}
          className="relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left: Bold Declaration */}
            <motion.div
              style={{ opacity: titleOpacity, y: titleY }}
              className="flex flex-col justify-center"
            >
              <div className="mb-8">
                {icon}
              </div>

              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light font-playfair text-near-black tracking-tight leading-tight mb-6">
                {boldDeclaration}
              </h3>

              <div className="w-24 h-1 bg-gradient-to-r from-copper-500 to-transparent" />
            </motion.div>

            {/* Right: Reality Content */}
            <div>
              {realityContent}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Metric Card
interface MetricCardProps {
  value: string;
  label: string;
  description: string;
}

function MetricCard({ value, label, description }: MetricCardProps) {
  return (
    <div className="bg-white/60 backdrop-blur-sm p-6 rounded-lg border border-copper-500/20 hover:border-copper-500/40 transition-all duration-300">
      <div className="text-4xl sm:text-5xl font-light font-playfair text-copper-500 mb-2">
        {value}
      </div>
      <div className="text-sm font-semibold tracking-wide uppercase text-near-black mb-1">
        {label}
      </div>
      <div className="text-xs font-light text-near-black/60">
        {description}
      </div>
    </div>
  );
}

// Transparency Badge
interface TransparencyBadgeProps {
  icon: string;
  label: string;
}

function TransparencyBadge({ icon, label }: TransparencyBadgeProps) {
  return (
    <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-copper-500/20 text-center hover:scale-105 transition-transform duration-300">
      <div className="text-2xl font-semibold font-playfair text-copper-500 mb-1">
        {icon}
      </div>
      <div className="text-xs font-medium tracking-wide text-near-black/70">
        {label}
      </div>
    </div>
  );
}

// Dashboard Metric
interface DashboardMetricProps {
  label: string;
  value: string;
}

function DashboardMetric({ label, value }: DashboardMetricProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-copper-500/10">
      <span className="text-sm font-medium text-near-black/70">{label}</span>
      <span className="text-sm font-semibold text-copper-500">{value}</span>
    </div>
  );
}

// Comparison Card
interface ComparisonCardProps {
  label: string;
  value: string;
  description: string;
  positive?: boolean;
  negative?: boolean;
}

function ComparisonCard({ label, value, description, positive, negative }: ComparisonCardProps) {
  return (
    <div className={`
      bg-white/60 backdrop-blur-sm p-6 rounded-lg border transition-all duration-300
      ${positive ? 'border-copper-500/40 hover:border-copper-500/60 hover:shadow-lg' : ''}
      ${negative ? 'border-near-black/10 opacity-60' : ''}
    `}>
      <div className="text-xs font-medium tracking-wide uppercase text-near-black/60 mb-3">
        {label}
      </div>
      <div className={`text-4xl sm:text-5xl font-light font-playfair mb-2 ${positive ? 'text-copper-500' : 'text-near-black/50'}`}>
        {value}
      </div>
      <div className="text-xs font-light text-near-black/60">
        {description}
      </div>
    </div>
  );
}

// Agility Feature
interface AgilityFeatureProps {
  title: string;
  description: string;
}

function AgilityFeature({ title, description }: AgilityFeatureProps) {
  return (
    <div className="flex items-start gap-3">
      <CheckCircle2 className="h-5 w-5 text-copper-500 mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-sm font-semibold text-near-black mb-1">{title}</p>
        <p className="text-xs font-light text-near-black/70 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
