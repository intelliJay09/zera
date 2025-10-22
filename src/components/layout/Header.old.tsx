'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  { name: 'Web Development', href: '/services/web-development' },
  { name: 'SEO & Digital Marketing', href: '/services/seo-digital-marketing' },
  { name: 'Social Media Management', href: '/services/social-media-management' },
  { name: 'Branding & Design', href: '/services/branding-design' },
  { name: 'Content Marketing', href: '/services/content-marketing' },
];

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services', hasDropdown: true },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out will-change-[background,backdrop-filter,box-shadow]"
      style={{
        background: scrolled
          ? 'rgba(243, 233, 220, 0.85)'
          : 'transparent',
        backdropFilter: scrolled
          ? 'blur(16px) saturate(200%)'
          : 'none',
        WebkitBackdropFilter: scrolled
          ? 'blur(16px) saturate(200%)'
          : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(139, 115, 85, 0.12)'
          : 'none',
        boxShadow: scrolled
          ? '0 1px 0 0 rgba(255, 255, 255, 0.6) inset, 0 4px 24px rgba(139, 115, 85, 0.06)'
          : 'none',
      }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center transition-transform duration-300 hover:scale-105">
          <Image
            src="/logo.png"
            alt="The Astra Flow"
            width={200}
            height={66}
            priority
            className="h-14 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-x-10">
          {navLinks.map((link) =>
            link.hasDropdown ? (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button className="group flex items-center gap-1.5 text-[15px] font-medium tracking-wide text-gray-900 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-copper-500">
                  {link.name}
                  <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute left-0 mt-4 w-72 rounded-none bg-white/95 backdrop-blur-xl shadow-2xl shadow-black/10 ring-1 ring-black/5"
                    >
                      <div className="p-3">
                        {services.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="block rounded-none px-5 py-3.5 text-[15px] font-medium text-gray-700 transition-all duration-200 hover:bg-copper-50 hover:text-copper-600 hover:translate-x-1"
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="text-[15px] font-medium tracking-wide text-gray-900 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:text-copper-500"
              >
                {link.name}
              </Link>
            )
          )}
        </div>

        {/* CTA Button (Desktop) */}
        <div className="hidden lg:block">
          <Button asChild variant="primary" size="sm">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="rounded-none p-2 transition-colors hover:bg-copper-50 lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-900" />
          ) : (
            <Menu className="h-6 w-6 text-gray-900" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white/98 backdrop-blur-xl px-6 py-6 shadow-2xl sm:max-w-md sm:ring-1 sm:ring-black/5 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="transition-transform hover:scale-105">
                <Image src="/logo.png" alt="The Astra Flow" width={160} height={53} className="h-11 w-auto" />
              </Link>
              <button
                type="button"
                className="rounded-none p-2.5 text-gray-900 transition-colors hover:bg-copper-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mt-8 flow-root">
              <div className="-my-6 divide-y divide-gray-200/50">
                <div className="space-y-1 py-8">
                  {navLinks.map((link) =>
                    link.hasDropdown ? (
                      <div key={link.name} className="space-y-1">
                        <Link
                          href={link.href}
                          className="-mx-3 block rounded-none px-4 py-3.5 text-base font-bold tracking-wide text-gray-900 transition-all hover:bg-copper-50 hover:translate-x-1"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.name}
                        </Link>
                        <div className="ml-4 space-y-1">
                          {services.map((service) => (
                            <Link
                              key={service.href}
                              href={service.href}
                              className="-mx-3 block rounded-none px-4 py-3 text-[15px] font-medium text-gray-600 transition-all hover:bg-copper-50 hover:text-copper-600 hover:translate-x-1"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {service.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="-mx-3 block rounded-none px-4 py-3.5 text-base font-bold tracking-wide text-gray-900 transition-all hover:bg-copper-50 hover:translate-x-1"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    )
                  )}
                </div>
                <div className="py-8">
                  <Button asChild variant="primary" onClick={() => setMobileMenuOpen(false)}>
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
