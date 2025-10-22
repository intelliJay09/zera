import React from 'react';
import { TrendingUp, Users, Award, Sparkles, Layers, Shield } from 'lucide-react';

export default function ValuePropositionsDual() {
  const differentiators = [
    {
      icon: TrendingUp,
      title: 'Data-Driven Growth',
      description:
        "Every strategy backed by analytics, rigorous A/B testing, and continuous optimization. We don't guess—we measure, learn, and scale what works. Our 4.2x average ROI isn't luck, it's methodology.",
    },
    {
      icon: Users,
      title: 'Partnership, Not Vendor',
      description:
        '92% client retention because we become an extension of your team. Deep collaboration, strategic alignment, and genuine investment in your success—not transactional project work.',
    },
    {
      icon: Award,
      title: 'Proven Track Record',
      description:
        '150+ businesses transformed, $50M+ in client revenue generated, and industry-leading retention rates. Our results speak louder than promises ever could.',
    },
    {
      icon: Sparkles,
      title: 'Premium Design Standards',
      description:
        'Zero cookie-cutter templates. Every project—whether WaaS or custom—is architected with meticulous attention to design excellence, brand consistency, and user experience that converts.',
    },
    {
      icon: Layers,
      title: 'Full-Spectrum Expertise',
      description:
        'Strategy, design, development, marketing, and optimization—all under one roof. No juggling multiple vendors or fragmented communications. Complete accountability from discovery to scale.',
    },
    {
      icon: Shield,
      title: 'Transparent & Predictable',
      description:
        'No surprise costs, no hidden fees, no vague timelines. Clear pricing structures, honest communication, and realistic expectations from day one. Fixed monthly rates for WaaS, detailed scopes for custom projects.',
    },
  ];

  return (
    <section className="bg-cream-200 py-16 sm:py-24 md:py-28 lg:py-36 relative overflow-hidden">
      {/* Decorative copper accents */}
      <div className="absolute top-0 left-0 w-1/3 h-px bg-gradient-to-r from-copper-500 to-transparent" />
      <div className="absolute bottom-0 right-0 w-1/3 h-px bg-gradient-to-l from-copper-500 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-copper-500 mb-6">
            Our Difference
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light font-playfair text-near-black tracking-tight mb-6">
            Why The Astra Flow
          </h2>
          <p className="text-base sm:text-lg font-light text-near-black/70 leading-relaxed tracking-wide max-w-3xl mx-auto">
            What sets us apart from other agencies and makes us the strategic partner businesses
            trust for transformational growth.
          </p>
        </div>

        {/* Unified Brand Differentiators - 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="relative group">
                <div className="relative bg-white/50 backdrop-blur-sm p-8 lg:p-10 rounded-sm hover:bg-white/70 transition-all duration-500 h-full">
                  {/* Copper accent line */}
                  <div className="absolute top-0 left-0 w-16 h-px bg-copper-500 group-hover:w-full transition-all duration-700" />

                  {/* Icon circle */}
                  <div className="w-14 h-14 rounded-full bg-copper-500/10 flex items-center justify-center mb-6 group-hover:bg-copper-500/20 transition-colors duration-500">
                    <Icon className="w-7 h-7 text-copper-500" strokeWidth={1.5} />
                  </div>

                  {/* Headline */}
                  <h3 className="text-xl lg:text-2xl font-medium font-montserrat text-near-black mb-4 tracking-wide">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm sm:text-base font-light text-near-black/80 leading-relaxed tracking-wide">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
