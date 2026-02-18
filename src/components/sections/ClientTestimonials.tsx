'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Testimonial {
  headline: string;
  metric: string;
  narrative: string;
  author: string;
  role: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    headline: "We finally have a digital asset that matches our reputation.",
    metric: "#1 Search Ranking",
    narrative: "Before Zera, our digital presence was non-existent. We were losing contracts to smaller competitors simply because they looked better online. Zera didn't just build a website; they architected a commercial headquarters. We now rank #1 for our category in Accra, and the quality of our inbound inquiries has tripled.",
    author: "Kwame A.",
    role: "Managing Director",
    company: "Apex Capital Partners"
  },
  {
    headline: "They turned our chaotic sales process into a predictable machine.",
    metric: "240% Increase in Qualified Leads",
    narrative: "We had traffic, but we weren't capturing it. The Zera team installed their 'Lead Capture Engine' and completely automated our follow-up. We went from chasing leads manually to waking up to booked appointments. It's not just marketing; it's an engineered revenue system.",
    author: "Sarah T.",
    role: "Founder",
    company: "Lumina Lifestyle"
  },
  {
    headline: "Zera is the partner that secured our category leadership.",
    metric: "35% Increase in Customer LTV",
    narrative: "Scale usually brings chaos. Zera brought structure. Their 'Lifecycle Ecosystem' allowed us to retain customers automatically while expanding into two new markets. They act less like an agency and more like a strategic Directorate. A critical asset to our board.",
    author: "E. Mensah",
    role: "CEO",
    company: "West African Logistics Group"
  }
];

export default function ClientTestimonials() {
  return (
    <section className="relative bg-cream py-16 sm:py-24 md:py-32 lg:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <p className="text-sm font-medium tracking-brand-label uppercase text-copper-700 mb-6">
            TRUSTED BY MARKET LEADERS
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light font-display uppercase text-gray-900 tracking-brand-header max-w-3xl mx-auto leading-tight">
            WHAT OUR PARTNERS SAY
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.19, 0.91, 0.38, 0.98] }}
              className="group relative overflow-hidden rounded-sm bg-white transition-all duration-500 p-8 lg:p-10 flex flex-col hover:-translate-y-2 hover:shadow-xl"
            >
              {/* Copper accent border that expands on hover */}
              <div className="absolute top-0 left-0 w-16 h-px bg-copper-500 group-hover:w-full transition-all duration-700" />

              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-12 h-12 text-copper-500" />
              </div>

              {/* Headline */}
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 relative z-10 leading-tight">
                {testimonial.headline}
              </h3>

              {/* Metric - Highlighted in Copper */}
              <div className="mb-6">
                <p className="text-2xl font-bold text-copper-500 tracking-tight">
                  {testimonial.metric}
                </p>
              </div>

              {/* Narrative Quote */}
              <blockquote className="text-base text-gray-700 leading-relaxed mb-8 flex-grow italic">
                &ldquo;{testimonial.narrative}&rdquo;
              </blockquote>

              {/* Authority */}
              <div className="border-t border-gray-200 pt-6">
                <p className="text-base font-semibold text-gray-900 mb-1">
                  {testimonial.author}
                </p>
                <p className="text-sm text-gray-600">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
