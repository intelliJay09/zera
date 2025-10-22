'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { portfolioProjects, PORTFOLIO_CATEGORIES, PortfolioCategory } from '@/data/portfolio-categorized';

export default function FeaturedPortfolio() {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory | 'all'>('all');

  const filteredProjects = activeFilter === 'all'
    ? portfolioProjects
    : portfolioProjects.filter(project => project.category === activeFilter);

  const heroCase = filteredProjects.find((project) => project.featured);
  const standardCases = filteredProjects.filter((project) => !project.featured);

  return (
    <section className="bg-white py-16 sm:py-24 md:py-32 lg:py-40 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-200/30 via-transparent to-cream-200/30 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] relative">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-copper-500 mb-6">
            Client Success Stories
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light font-playfair text-near-black tracking-tight max-w-3xl leading-tight mb-4 sm:mb-6">
                Transformations That Define Excellence
              </h2>
              <p className="text-sm sm:text-base font-light text-near-black/80 max-w-2xl leading-relaxed">
                Real businesses. Real growth. Real results. These are the stories of ambitious brands
                who partnered with us to achieve extraordinary market impact.
              </p>
            </div>
            <Link
              href="/case-studies"
              className="group flex items-center gap-3 text-copper-500 hover:gap-5 transition-all duration-300 w-fit"
            >
              <span className="text-sm font-medium tracking-[0.15em] uppercase">
                View All Case Studies
              </span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-6 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
              activeFilter === 'all'
                ? 'bg-copper-500 text-cream-50'
                : 'bg-cream-100 text-near-black hover:bg-cream-200'
            }`}
          >
            All Projects ({portfolioProjects.length})
          </button>
          {PORTFOLIO_CATEGORIES.map((category) => {
            const count = portfolioProjects.filter(p => p.category === category.value).length;
            return (
              <button
                key={category.value}
                onClick={() => setActiveFilter(category.value)}
                className={`px-6 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 ${
                  activeFilter === category.value
                    ? 'bg-copper-500 text-cream-50'
                    : 'bg-cream-100 text-near-black hover:bg-cream-200'
                }`}
              >
                {category.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Hero Case Study */}
        {heroCase && (
          <Link
            href={heroCase.href}
            className="block mb-8 group relative overflow-hidden rounded-sm"
          >
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-black via-zinc-900 to-zinc-800">
              {/* Image overlay */}
              <div className="absolute inset-0 bg-near-black/40 group-hover:bg-near-black/20 transition-all duration-700" />

              {/* Copper accent borders */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-copper-500 to-transparent" />
              <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-copper-500 to-transparent" />
              <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-copper-500 to-transparent" />
              <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-copper-500 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-16">
                <div className="max-w-4xl">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <span className="text-xs font-medium tracking-[0.2em] uppercase text-copper-500 bg-copper-500/10 px-4 py-2 backdrop-blur-sm rounded-sm w-fit">
                      {heroCase.industry}
                    </span>
                    <span className="text-xs sm:text-sm font-light text-cream-200/80 tracking-wide">
                      {heroCase.client}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light font-playfair text-cream-200 mb-6 sm:mb-8 tracking-tight group-hover:text-white transition-colors duration-500">
                    {heroCase.title}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {heroCase.results.map((result, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-3 top-0 w-1 h-full bg-copper-500/30 group-hover:bg-copper-500/60 transition-colors duration-500" />
                        <p className="text-base font-light text-cream-200/90 leading-relaxed tracking-wide">
                          {result}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 text-copper-500 group-hover:gap-5 transition-all duration-300">
                    <span className="text-xs font-medium tracking-[0.15em] uppercase">
                      Read Full Case Study
                    </span>
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Standard Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {standardCases.map((caseStudy, index) => (
            <Link
              key={index}
              href={caseStudy.href}
              className="group relative overflow-hidden rounded-sm bg-gradient-to-br from-cream-200/50 to-cream-200/20 hover:from-cream-200/70 hover:to-cream-200/40 transition-all duration-500"
            >
              {/* Copper accent border */}
              <div className="absolute top-0 left-0 w-16 h-px bg-copper-500 group-hover:w-full transition-all duration-700" />

              <div className="p-6 sm:p-8 lg:p-10 h-full flex flex-col">
                <div className="mb-4 sm:mb-6">
                  <span className="text-xs font-medium tracking-[0.2em] uppercase text-copper-500 bg-copper-500/10 px-3 py-1.5 rounded-sm">
                    {caseStudy.industry}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl lg:text-2xl font-normal font-montserrat text-near-black mb-2 sm:mb-3 tracking-wide">
                  {caseStudy.title}
                </h3>

                <p className="text-xs sm:text-sm font-medium text-near-black/60 mb-4 sm:mb-6 tracking-wide">
                  {caseStudy.client}
                </p>

                <div className="space-y-3 mb-8 flex-grow">
                  {caseStudy.results.map((result, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-copper-500 flex-shrink-0" />
                      <p className="text-sm font-light text-near-black/80 leading-relaxed tracking-wide">
                        {result}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-copper-500 group-hover:gap-4 transition-all duration-300">
                  <span className="text-xs font-medium tracking-[0.15em] uppercase">
                    View Case Study
                  </span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
