export interface NavigationLink {
  name: string;
  href: string;
  hasDropdown?: boolean;
}

export interface ProductItem {
  name: string;
  href: string;
  subtitle: string;
}

export const NAV_LINKS: NavigationLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products', hasDropdown: true },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export const PRODUCT_ITEMS: ProductItem[] = [
  { name: 'The Digital HQ', href: '/products/digital-hq', subtitle: 'Secure the territory.' },
  { name: 'The Growth System', href: '/products/growth-system', subtitle: 'Automate the momentum.' },
  { name: 'The Market Monopoly', href: '/products/market-monopoly', subtitle: 'Maximize the yield.' },
];
