import Image from 'next/image';
import { getCaseStudy, logoSize } from '@/data/case-studies';

interface Brand {
  name: string;
  src: string;
  width: number;
  height: number;
  displayHeight: number;
}

function clientLogo(slug: string) {
  const study = getCaseStudy(slug);
  if (!study) throw new Error(`Case study "${slug}" not found`);
  return { name: study.client, ...study.logo };
}

const gwenAddo = clientLogo('gwen-addo');
const allureBloom = clientLogo('allure-bloom');
const finestDietitian = clientLogo('finest-dietitian');

// Wordmarks and compact marks carry different visual weight at the same
// height, so each logo is sized optically rather than to one fixed height.
const brands: Brand[] = [
  gwenAddo,
  { name: 'Apex Capital Partners', src: '/images/clients/apex-capital-partners.svg', width: 206, height: 56, displayHeight: 40 },
  { name: 'Lumina Lifestyle', src: '/images/clients/lumina-lifestyle.svg', width: 165, height: 56, displayHeight: 40 },
  { name: 'West African Logistics Group', src: '/images/clients/west-african-logistics-group.svg', width: 246, height: 56, displayHeight: 38 },
  allureBloom,
  { name: 'TechFlow Solutions', src: '/images/clients/techflow-solutions.svg', width: 177, height: 56, displayHeight: 40 },
  { name: 'Luxe Wellness', src: '/images/clients/luxe-wellness.svg', width: 152, height: 56, displayHeight: 40 },
  { name: 'Meridian Financial', src: '/images/clients/meridian-financial.svg', width: 192, height: 56, displayHeight: 40 },
  finestDietitian,
  { name: 'Keystone Manufacturing', src: '/images/clients/keystone-manufacturing.svg', width: 215, height: 56, displayHeight: 38 },
  { name: 'Verde Organics', src: '/images/clients/verde-organics.svg', width: 150, height: 56, displayHeight: 40 },
  { name: 'Modern Threads', src: '/images/clients/modern-threads.svg', width: 194, height: 56, displayHeight: 40 },
  { name: 'Zenith Partners', src: '/images/clients/zenith-partners.svg', width: 197, height: 56, displayHeight: 40 },
  { name: 'Elevation Studio', src: '/images/clients/elevation-studio.svg', width: 179, height: 56, displayHeight: 40 },
];

function LogoSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      className={`logo-marquee-set flex shrink-0 items-center gap-14 pr-14 lg:gap-20 lg:pr-20${hidden ? ' logo-marquee-duplicate' : ''}`}
      aria-hidden={hidden || undefined}
    >
      {brands.map((brand) => (
        <li key={brand.name} className="flex-shrink-0">
          <Image
            src={brand.src}
            alt={hidden ? '' : brand.name}
            width={brand.width}
            height={brand.height}
            unoptimized={brand.src.endsWith('.svg')}
            style={logoSize(brand, brand.displayHeight)}
            className="client-logo"
          />
        </li>
      ))}
    </ul>
  );
}

export default function TrustedByLogos() {
  return (
    <section className="bg-cream-100 py-16 border-t border-copper-500/10 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
        <p className="text-center text-sm font-medium tracking-brand-label uppercase text-copper-700 mb-10">
          TRUSTED BY MARKET LEADERS
        </p>

        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-cream-100 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-cream-100 to-transparent z-10 pointer-events-none" />

          {/* Infinite marquee: two identical sets, the track moves by one set width */}
          <div className="flex overflow-hidden py-2">
            <div className="logo-marquee-track flex w-max">
              <LogoSet />
              <LogoSet hidden />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
