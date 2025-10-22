'use client';

import { usePathname } from 'next/navigation';
import Header from './Header/Header';

export default function HeaderWrapper() {
  const pathname = usePathname();

  // Use light header variant for solution pages
  const isLightHeader = pathname?.startsWith('/solutions');

  return <Header variant={isLightHeader ? 'light' : 'default'} />;
}
