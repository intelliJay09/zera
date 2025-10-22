import React from 'react';
import { getFeaturedClientLogos } from '@/data/client-logos';

export default function TrustedByLogos() {
  const logos = getFeaturedClientLogos(12);

  return (
    <section className="bg-cream-200 py-16 border-t border-copper-500/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <p className="text-center text-sm font-medium tracking-[0.25em] uppercase text-copper-500/70 mb-10">
          Trusted By Forward-Thinking Brands
        </p>

        {/* Logo Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-10 items-center">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="flex items-center justify-center opacity-50 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-500"
            >
              {/* Placeholder for logo images - replace with actual Image components when assets are ready */}
              <div className="w-full h-16 flex items-center justify-center">
                <div className="text-xs font-medium text-near-black/40 tracking-wide text-center">
                  {logo.name}
                </div>
              </div>
              {/* When logos are ready, use this structure:
              <Image
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={60}
                className="w-auto h-12 object-contain"
              />
              */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
