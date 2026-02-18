'use client';

import { usePathname } from 'next/navigation';
import Header from './Header/Header';

export default function HeaderWrapper() {
  const pathname = usePathname();

  // Pages where header should not be shown at all
  const noHeaderPages = ['/connect'];
  if (noHeaderPages.includes(pathname || '')) {
    return null;
  }

  // Pages with dark backgrounds require light header (white logo/text)
  const darkBackgroundPages = [
    '/contact',
    '/booking',
    '/products/digital-hq',
    '/products/growth-system',
    '/products/market-monopoly',
    '/solutions',
    '/solutions/social-media-management',
    '/solutions/brand-development',
    '/solutions/software-development',
    '/solutions/scale',
  ];

  const isLightHeader = darkBackgroundPages.includes(pathname || '');

  return <Header variant={isLightHeader ? 'light' : 'default'} />;
}
