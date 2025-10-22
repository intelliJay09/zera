'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
  industry: string;
  metric: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "The Astra Flow didn't just improve our digital presence—they fundamentally transformed how we compete in our market. Within 6 months, we went from regional player to national contender. Their strategic approach is unmatched.",
    author: 'Marcus Chen',
    title: 'CEO',
    company: 'TechFlow Solutions',
    industry: 'B2B SaaS',
    metric: '320% lead increase',
  },
  {
    quote:
      "Working with The Astra Flow was the smartest investment we made this year. They understand business challenges intimately and deliver enterprise-grade results without the enterprise price tag. Truly exceptional partnership.",
    author: 'Sarah Mitchell',
    title: 'Marketing Director',
    company: 'Luxe Wellness',
    industry: 'E-commerce',
    metric: '210% revenue growth',
  },
  {
    quote:
      "What sets The Astra Flow apart is their obsessive attention to ROI. Every recommendation is backed by data, every campaign is meticulously tracked. They're not just marketers—they're growth architects.",
    author: 'David Park',
    title: 'Founder',
    company: 'Meridian Financial',
    industry: 'Financial Services',
    metric: '500% organic traffic increase',
  },
  {
    quote:
      "As a B2B manufacturer, we were skeptical about digital marketing. The Astra Flow changed our perspective entirely. Their strategic campaigns positioned us as thought leaders and doubled our enterprise deal pipeline.",
    author: 'Jennifer Torres',
    title: 'VP of Business Development',
    company: 'Apex Manufacturing',
    industry: 'Industrial B2B',
    metric: '180% enterprise deal increase',
  },
];

export default function ClientTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative bg-near-black py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Ambient copper glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-copper-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-copper-500/20 to-transparent" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-copper-500/20 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-copper-500 mb-6">
            Client Testimonials
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light font-playfair text-cream-200 tracking-tight max-w-3xl mx-auto leading-tight">
            What Our Partners Say
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative">
          {/* Quote Icon */}
          <div className="absolute -top-8 left-0 lg:left-1/4 transform -translate-x-1/2 opacity-10">
            <Quote className="w-32 h-32 text-copper-500" />
          </div>

          {/* Testimonial Content */}
          <div className="max-w-5xl mx-auto">
            <div
              className={`transition-all duration-500 ${
                isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              {/* Quote */}
              <blockquote className="text-center mb-8 sm:mb-12">
                <p className="text-xl sm:text-2xl lg:text-3xl font-light font-playfair text-cream-200 leading-relaxed tracking-tight mb-6 sm:mb-8 px-4 sm:px-0">
                  {currentTestimonial.quote}
                </p>
              </blockquote>

              {/* Author Info */}
              <div className="flex flex-col items-center gap-4">
                <div className="text-center">
                  <p className="text-lg sm:text-xl font-medium font-montserrat text-cream-200 mb-2">
                    {currentTestimonial.author}
                  </p>
                  <p className="text-sm font-light text-light-gray tracking-wide mb-1">
                    {currentTestimonial.title}, {currentTestimonial.company}
                  </p>
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <span className="text-xs font-medium tracking-[0.2em] uppercase text-copper-500 bg-copper-500/10 px-3 py-1.5 backdrop-blur-sm rounded-sm">
                      {currentTestimonial.industry}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-copper-500/30" />
                    <span className="text-xs font-medium text-copper-500 tracking-wide">
                      {currentTestimonial.metric}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 mt-12 sm:mt-16">
            <button
              onClick={handlePrevious}
              disabled={isTransitioning}
              className="group flex items-center justify-center w-16 h-16 sm:w-14 sm:h-14 rounded-full border border-copper-500/30 text-copper-500 hover:bg-copper-500/10 hover:border-copper-500/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform duration-300" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isTransitioning) {
                      setIsTransitioning(true);
                      setCurrentIndex(index);
                    }
                  }}
                  disabled={isTransitioning}
                  className={`transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                    index === currentIndex
                      ? ''
                      : ''
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                >
                  <div
                    className={`transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-12 h-1.5 bg-copper-500'
                        : 'w-1.5 h-1.5 bg-copper-500/30 hover:bg-copper-500/60'
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={isTransitioning}
              className="group flex items-center justify-center w-16 h-16 sm:w-14 sm:h-14 rounded-full border border-copper-500/30 text-copper-500 hover:bg-copper-500/10 hover:border-copper-500/60 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
