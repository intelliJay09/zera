'use client';

import { motion } from 'framer-motion';

const brands = [
  'Gwen Addo',
  'Apex Capital Partners',
  'Lumina Lifestyle',
  'West African Logistics Group',
  'TechFlow Solutions',
  'Luxe Wellness',
  'Meridian Financial',
  'Apex Manufacturing',
  'Verde Organics',
  'Modern Threads',
  'Zenith Partners',
  'Elevation Studio',
];

export default function TrustedByLogos() {
  return (
    <section className="bg-cream-100 py-16 border-t border-copper-500/10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <p className="text-center text-sm font-medium tracking-brand-label uppercase text-copper-700 mb-10">
          TRUSTED BY MARKET LEADERS
        </p>

        {/* Infinite Marquee */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-cream-100 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-cream-100 to-transparent z-10 pointer-events-none" />

          {/* Marquee Container */}
          <div className="flex overflow-hidden">
            {/* First set of brands */}
            <motion.div
              className="flex gap-12 lg:gap-16 items-center whitespace-nowrap"
              animate={{
                x: ['0%', '-100%'],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 40,
                  ease: 'linear',
                },
              }}
            >
              {brands.map((brand, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 text-lg font-medium text-near-black/60 tracking-wide uppercase"
                >
                  {brand}
                </div>
              ))}
            </motion.div>

            {/* Duplicate set for seamless loop */}
            <motion.div
              className="flex gap-12 lg:gap-16 items-center whitespace-nowrap ml-12 lg:ml-16"
              animate={{
                x: ['0%', '-100%'],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: 'loop',
                  duration: 40,
                  ease: 'linear',
                },
              }}
            >
              {brands.map((brand, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 text-lg font-medium text-near-black/60 tracking-wide uppercase"
                >
                  {brand}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
