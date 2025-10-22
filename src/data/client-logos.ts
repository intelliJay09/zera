export interface ClientLogo {
  id: string;
  name: string;
  src: string;
  alt: string;
  category?: 'waas' | 'custom' | 'both';
}

export const clientLogos: ClientLogo[] = [
  {
    id: 'techflow',
    name: 'TechFlow Solutions',
    src: '/images/clients/techflow-logo.svg',
    alt: 'TechFlow Solutions',
    category: 'custom',
  },
  {
    id: 'luxe-wellness',
    name: 'Luxe Wellness',
    src: '/images/clients/luxe-wellness-logo.svg',
    alt: 'Luxe Wellness',
    category: 'custom',
  },
  {
    id: 'meridian',
    name: 'Meridian Financial',
    src: '/images/clients/meridian-logo.svg',
    alt: 'Meridian Financial',
    category: 'custom',
  },
  {
    id: 'apex',
    name: 'Apex Manufacturing',
    src: '/images/clients/apex-logo.svg',
    alt: 'Apex Manufacturing',
    category: 'custom',
  },
  {
    id: 'artisan',
    name: 'Artisan Cafe',
    src: '/images/clients/artisan-logo.svg',
    alt: 'Artisan Cafe',
    category: 'waas',
  },
  {
    id: 'bloom',
    name: 'Bloom Wellness Spa',
    src: '/images/clients/bloom-logo.svg',
    alt: 'Bloom Wellness Spa',
    category: 'waas',
  },
  {
    id: 'summit',
    name: 'Summit Consulting',
    src: '/images/clients/summit-logo.svg',
    alt: 'Summit Consulting Group',
    category: 'waas',
  },
  {
    id: 'verde',
    name: 'Verde Organics',
    src: '/images/clients/verde-logo.svg',
    alt: 'Verde Organics',
    category: 'both',
  },
  {
    id: 'modern-threads',
    name: 'Modern Threads',
    src: '/images/clients/modern-threads-logo.svg',
    alt: 'Modern Threads',
    category: 'custom',
  },
  {
    id: 'zenith',
    name: 'Zenith Partners',
    src: '/images/clients/zenith-logo.svg',
    alt: 'Zenith Partners',
    category: 'custom',
  },
  {
    id: 'pure-co',
    name: 'Pure & Co',
    src: '/images/clients/pure-co-logo.svg',
    alt: 'Pure & Co',
    category: 'waas',
  },
  {
    id: 'elevation',
    name: 'Elevation Studio',
    src: '/images/clients/elevation-logo.svg',
    alt: 'Elevation Studio',
    category: 'both',
  },
];

export function getClientLogosByCategory(category: 'waas' | 'custom' | 'both'): ClientLogo[] {
  return clientLogos.filter((logo) => logo.category === category || logo.category === 'both');
}

export function getFeaturedClientLogos(count: number = 12): ClientLogo[] {
  return clientLogos.slice(0, count);
}
