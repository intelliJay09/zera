export interface NavigationLink {
  name: string;
  href: string;
  hasDropdown?: boolean;
}

export interface ServiceItem {
  name: string;
  href: string;
}

export const NAV_LINKS: NavigationLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Plans & Pricing', href: '/waas-plans' },
  { name: 'Solutions', href: '/solutions', hasDropdown: true },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const SERVICE_ITEMS: ServiceItem[] = [
  { name: 'Custom Web Development', href: '/solutions/web-development' },
  { name: 'SEO', href: '/solutions/seo' },
  { name: 'Social Media Management', href: '/solutions/social-media-management' },
  { name: 'Branding & Design', href: '/solutions/branding-design' },
  { name: 'Content Marketing', href: '/solutions/content-marketing' },
];
