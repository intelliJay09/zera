'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { NAV_LINKS, SERVICE_ITEMS } from './navigation';

interface DesktopNavProps {
  variant?: 'default' | 'light';
  scrolled?: boolean;
}

export default function DesktopNav({ variant = 'default', scrolled = false }: DesktopNavProps) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const isLight = variant === 'light';
  // When scrolled, both variants use cream background, so use dark text
  const useWhiteText = isLight && !scrolled;

  return (
    <div className="hidden lg:flex lg:items-center lg:gap-x-10">
      {/* Navigation Links */}
      {NAV_LINKS.map((link) =>
        link.hasDropdown ? (
          <div
            key={link.name}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href={link.href}
              className={cn(
                "group flex items-center gap-1.5 text-[15px] font-medium tracking-wide transition-all duration-300 ease-out hover:-translate-y-0.5",
                useWhiteText
                  ? "text-white/95 hover:text-copper-400"
                  : "text-gray-900 hover:text-copper-500"
              )}
            >
              {link.name}
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5",
                  useWhiteText ? "text-white/90" : "text-gray-900"
                )}
              />
            </Link>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute left-0 mt-4 w-72 rounded-none backdrop-blur-xl shadow-2xl ring-1 bg-cream-200/95 ring-black/5 shadow-black/10"
                >
                  <div className="p-3">
                    {SERVICE_ITEMS.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        className="block rounded-none px-5 py-3.5 text-[15px] font-medium transition-all duration-200 hover:translate-x-1 text-gray-700 hover:bg-cream-300/40 hover:text-copper-600"
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
            className={cn(
              "text-[15px] font-medium tracking-wide transition-all duration-300 ease-out hover:-translate-y-0.5",
              useWhiteText
                ? "text-white/95 hover:text-copper-400"
                : "text-gray-900 hover:text-copper-500"
            )}
          >
            {link.name}
          </Link>
        )
      )}

      {/* CTA Button */}
      <Button
        asChild
        variant="primary"
        size="sm"
        className="group"
      >
        <Link href="/contact">
          Get Started
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 group-hover:scale-110 transition-all duration-300" />
        </Link>
      </Button>
    </div>
  );
}
