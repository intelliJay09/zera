'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/layout/Footer';

export default function FooterWrapper() {
  const pathname = usePathname();

  // Pages where footer should not be shown
  const noFooterPages = ['/connect'];
  if (noFooterPages.includes(pathname || '')) {
    return null;
  }

  return <Footer />;
}
