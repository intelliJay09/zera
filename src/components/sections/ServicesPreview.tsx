import React from 'react';
import Link from 'next/link';
import { ArrowRight, Code2, TrendingUp, Share2, Palette, PenTool } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  href: string;
  size: 'large' | 'small';
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}

const services: Service[] = [
  {
    title: 'Web Development',
    description:
      'High-performance digital experiences that convert visitors into customers and customers into advocates. Your website isn\'t a brochure—it\'s your most powerful sales engine.',
    href: '/solutions/web-development',
    size: 'large',
    icon: Code2,
  },
  {
    title: 'SEO & Digital Marketing',
    description:
      'Strategic visibility where your ideal customers are searching. We architect search dominance that commands attention.',
    href: '/solutions/seo',
    size: 'small',
    icon: TrendingUp,
  },
  {
    title: 'Social Media Management',
    description:
      'Brand presence that builds communities, not just follower counts. Turn engagement into business outcomes.',
    href: '/solutions/social-media-management',
    size: 'small',
    icon: Share2,
  },
  {
    title: 'Branding & Design',
    description:
      'Visual identity that commands premium positioning. From logo to full brand systems, we craft aesthetic authority.',
    href: '/solutions/branding-design',
    size: 'small',
    icon: Palette,
  },
  {
    title: 'Content Marketing',
    description:
      'Strategic narratives that establish thought leadership and drive decisions. Content engines that attract, educate, and convert.',
    href: '/solutions/content-marketing',
    size: 'large',
    icon: PenTool,
  },
];

export default function ServicesPreview() {
  return (
    <section className="relative bg-near-black py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Ambient copper glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-copper-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-copper-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1600px] relative">
        {/* Section Header */}
        <div className="mb-16 sm:mb-20 lg:mb-24">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-copper-500 mb-6">
            Our Expertise
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light font-playfair text-cream-200 tracking-tight max-w-3xl leading-tight mb-4 sm:mb-6">
            The Full Arsenal for Market Dominance
          </h2>
          <p className="text-base font-light text-light-gray max-w-2xl leading-relaxed">
            Growth isn&apos;t about isolated tactics—it&apos;s about orchestrated excellence across
            every digital touchpoint.
          </p>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 auto-rows-auto md:auto-rows-[240px] lg:auto-rows-[280px]">
          {/* Service 1 - Web Development (Large) */}
          <Link
            href={services[0].href}
            className="col-span-12 lg:col-span-5 row-span-2 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-transparent" />
            <div className="absolute inset-px bg-gradient-to-br from-copper-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-copper-500 to-transparent" />
            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-copper-500 to-transparent" />

            <div className="relative h-full p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-6 sm:mb-8 bg-copper-500/5 rounded-lg group-hover:bg-copper-500/10 transition-all duration-500">
                  {React.createElement(services[0].icon, {
                    className: "w-8 h-8 sm:w-10 sm:h-10 text-copper-400 group-hover:text-copper-300 group-hover:scale-110 transition-all duration-500",
                    strokeWidth: 1.5
                  })}
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal font-montserrat text-cream-200 mb-4 sm:mb-6 tracking-wide">
                  {services[0].title}
                </h3>

                <p className="text-sm sm:text-base font-light text-light-gray leading-relaxed tracking-wide mb-6 sm:mb-8">
                  {services[0].description}
                </p>
              </div>

              <div className="flex items-center gap-3 text-copper-500 group-hover:gap-5 transition-all duration-300">
                <span className="text-xs font-medium tracking-[0.15em] uppercase">
                  Explore Service
                </span>
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </Link>

          {/* Service 2 - SEO (Small) */}
          <Link
            href={services[1].href}
            className="col-span-12 md:col-span-6 lg:col-span-4 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-transparent" />
            <div className="absolute inset-px bg-gradient-to-br from-copper-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-copper-500 to-transparent" />

            <div className="relative h-full p-5 sm:p-6 lg:p-8 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6 bg-copper-500/5 rounded-lg group-hover:bg-copper-500/10 transition-all duration-500">
                  {React.createElement(services[1].icon, {
                    className: "w-7 h-7 sm:w-8 sm:h-8 text-copper-400 group-hover:text-copper-300 group-hover:scale-110 transition-all duration-500",
                    strokeWidth: 1.5
                  })}
                </div>

                <h3 className="text-lg sm:text-xl lg:text-2xl font-normal font-montserrat text-cream-200 mb-3 sm:mb-4 tracking-wide">
                  {services[1].title}
                </h3>

                <p className="text-xs sm:text-sm font-light text-light-gray leading-relaxed tracking-wide">
                  {services[1].description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-copper-500 group-hover:gap-4 transition-all duration-300">
                <span className="text-xs font-medium tracking-[0.15em] uppercase">
                  Learn More
                </span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </Link>

          {/* Service 3 - Social Media (Small) */}
          <Link
            href={services[2].href}
            className="col-span-12 md:col-span-6 lg:col-span-3 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-transparent" />
            <div className="absolute inset-px bg-gradient-to-br from-copper-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-copper-500 to-transparent" />

            <div className="relative h-full p-5 sm:p-6 lg:p-8 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6 bg-copper-500/5 rounded-lg group-hover:bg-copper-500/10 transition-all duration-500">
                  {React.createElement(services[2].icon, {
                    className: "w-7 h-7 sm:w-8 sm:h-8 text-copper-400 group-hover:text-copper-300 group-hover:scale-110 transition-all duration-500",
                    strokeWidth: 1.5
                  })}
                </div>

                <h3 className="text-lg sm:text-xl lg:text-2xl font-normal font-montserrat text-cream-200 mb-3 sm:mb-4 tracking-wide">
                  {services[2].title}
                </h3>

                <p className="text-xs sm:text-sm font-light text-light-gray leading-relaxed tracking-wide">
                  {services[2].description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-copper-500 group-hover:gap-4 transition-all duration-300">
                <span className="text-xs font-medium tracking-[0.15em] uppercase">
                  Learn More
                </span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </Link>

          {/* Service 4 - Branding (Small) */}
          <Link
            href={services[3].href}
            className="col-span-12 md:col-span-6 lg:col-span-4 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-transparent" />
            <div className="absolute inset-px bg-gradient-to-br from-copper-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-copper-500 to-transparent" />

            <div className="relative h-full p-5 sm:p-6 lg:p-8 flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center mb-4 sm:mb-6 bg-copper-500/5 rounded-lg group-hover:bg-copper-500/10 transition-all duration-500">
                  {React.createElement(services[3].icon, {
                    className: "w-7 h-7 sm:w-8 sm:h-8 text-copper-400 group-hover:text-copper-300 group-hover:scale-110 transition-all duration-500",
                    strokeWidth: 1.5
                  })}
                </div>

                <h3 className="text-lg sm:text-xl lg:text-2xl font-normal font-montserrat text-cream-200 mb-3 sm:mb-4 tracking-wide">
                  {services[3].title}
                </h3>

                <p className="text-xs sm:text-sm font-light text-light-gray leading-relaxed tracking-wide">
                  {services[3].description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-copper-500 group-hover:gap-4 transition-all duration-300">
                <span className="text-xs font-medium tracking-[0.15em] uppercase">
                  Learn More
                </span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </Link>

          {/* Service 5 - Content Marketing (Large) */}
          <Link
            href={services[4].href}
            className="col-span-12 lg:col-span-5 row-span-2 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-transparent" />
            <div className="absolute inset-px bg-gradient-to-br from-copper-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-copper-500 to-transparent" />
            <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-copper-500 to-transparent" />

            <div className="relative h-full p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-6 sm:mb-8 bg-copper-500/5 rounded-lg group-hover:bg-copper-500/10 transition-all duration-500">
                  {React.createElement(services[4].icon, {
                    className: "w-8 h-8 sm:w-10 sm:h-10 text-copper-400 group-hover:text-copper-300 group-hover:scale-110 transition-all duration-500",
                    strokeWidth: 1.5
                  })}
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-normal font-montserrat text-cream-200 mb-4 sm:mb-6 tracking-wide">
                  {services[4].title}
                </h3>

                <p className="text-sm sm:text-base font-light text-light-gray leading-relaxed tracking-wide mb-6 sm:mb-8">
                  {services[4].description}
                </p>
              </div>

              <div className="flex items-center gap-3 text-copper-500 group-hover:gap-5 transition-all duration-300">
                <span className="text-xs font-medium tracking-[0.15em] uppercase">
                  Explore Service
                </span>
                <ArrowRight className="w-6 h-6" />
              </div>
            </div>
          </Link>

          {/* Empty space for grid balance */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3 hidden lg:block" />
        </div>
      </div>
    </section>
  );
}
