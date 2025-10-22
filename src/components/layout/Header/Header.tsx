'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useScrollHeader } from '@/hooks/useScrollHeader';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';

interface HeaderProps {
  variant?: 'default' | 'light';
}

export default function Header({ variant = 'default' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrolled } = useScrollHeader();

  const isLight = variant === 'light';
  // When scrolled, both variants use cream background, so use dark logo/text
  const useWhiteElements = isLight && !scrolled;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 pt-2.5',
        isLight ? 'header-light-base' : 'header-base',
        scrolled && (isLight ? 'header-light-scrolled !pt-0' : 'header-scrolled !pt-0')
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center transition-transform duration-300 hover:scale-105 active:scale-95 -m-2 p-2 min-h-[44px]"
        >
          <Image
            src={useWhiteElements ? "/logo-white.png" : "/logo.png"}
            alt="The Astra Flow"
            width={400}
            height={146}
            priority
            className="h-14 w-[153px]"
            style={{ objectFit: 'contain' }}
          />
        </Link>

        {/* Desktop Navigation */}
        <DesktopNav variant={variant} scrolled={scrolled} />

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="rounded-none p-3 lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center group"
          onClick={() => setMobileMenuOpen(true)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          <Menu
            className={cn(
              "h-6 w-6 transition-all duration-300 group-hover:scale-110 group-active:scale-95",
              useWhiteElements
                ? "text-white group-hover:text-copper-400"
                : "text-gray-900 group-hover:text-copper-500"
            )}
            strokeWidth={1}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} variant={variant} scrolled={scrolled} />
    </header>
  );
}
