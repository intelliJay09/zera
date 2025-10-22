import { Code2, TrendingUp, Share2, Palette, PenTool, LucideIcon } from 'lucide-react';

export type ServiceCategory = 'waas' | 'custom' | 'both';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  icon: LucideIcon;
  href: string;
  featured?: boolean;
}

export const services: Service[] = [
  // WaaS-specific
  {
    id: 'waas-starter',
    name: 'WaaS Starter Package',
    category: 'waas',
    description: 'Quick-launch website for new businesses. Get online in 14 days with our entry-level monthly plan.',
    icon: Code2,
    href: '/waas-plans#starter',
    featured: true,
  },
  {
    id: 'waas-growth',
    name: 'WaaS Growth Package',
    category: 'waas',
    description: 'Scaling business solution with e-commerce capabilities and advanced features.',
    icon: Code2,
    href: '/waas-plans#growth',
    featured: true,
  },
  {
    id: 'waas-pro',
    name: 'WaaS Pro Package',
    category: 'waas',
    description: 'Enterprise-grade website platform with unlimited pages and dedicated support.',
    icon: Code2,
    href: '/waas-plans#pro',
  },

  // Custom-specific
  {
    id: 'custom-web-app',
    name: 'Custom Web Application',
    category: 'custom',
    description: 'Bespoke SaaS platforms, web portals, and custom digital products built to your exact specifications.',
    icon: Code2,
    href: '/solutions/web-development',
    featured: true,
  },
  {
    id: 'digital-strategy',
    name: 'Digital Strategy & Consulting',
    category: 'custom',
    description: 'Comprehensive strategic planning and execution for brands seeking transformational growth.',
    icon: TrendingUp,
    href: '/custom-services',
    featured: true,
  },
  {
    id: 'brand-development',
    name: 'Strategic Brand Development',
    category: 'custom',
    description: 'Complete brand strategy, visual identity systems, and positioning for premium brands.',
    icon: Palette,
    href: '/solutions/branding-design',
  },

  // Both (available as add-on to WaaS or standalone for Custom)
  {
    id: 'seo-marketing',
    name: 'SEO & Digital Marketing',
    category: 'both',
    description: 'Available as WaaS add-on or standalone custom service. Drive organic growth and visibility.',
    icon: TrendingUp,
    href: '/solutions/seo',
    featured: true,
  },
  {
    id: 'social-media',
    name: 'Social Media Management',
    category: 'both',
    description: 'Community building and engagement strategies available for all client types.',
    icon: Share2,
    href: '/solutions/social-media-management',
  },
  {
    id: 'content-marketing',
    name: 'Content Marketing',
    category: 'both',
    description: 'Strategic content creation and distribution for WaaS clients and custom campaigns.',
    icon: PenTool,
    href: '/solutions/content-marketing',
  },
];

export function getServicesByCategory(category: ServiceCategory): Service[] {
  return services.filter((service) => service.category === category || service.category === 'both');
}

export function getWaaSServices(): Service[] {
  return services.filter((service) => service.category === 'waas');
}

export function getCustomServices(): Service[] {
  return services.filter((service) => service.category === 'custom');
}

export function getFeaturedServices(): Service[] {
  return services.filter((service) => service.featured === true);
}
