'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { X, ChevronDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useMobileMenu } from '@/hooks/useMobileMenu';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { NAV_LINKS, SERVICE_ITEMS } from './navigation';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'default' | 'light';
  scrolled?: boolean;
}

export default function MobileMenu({ isOpen, onClose, variant = 'default', scrolled = false }: MobileMenuProps) {
  const [servicesOpen, setServicesOpen] = useState(false);
  useMobileMenu({ isOpen, onClose });
  const containerRef = useFocusTrap(isOpen);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isLight = variant === 'light';
  // Mobile menu always uses cream background for consistency
  const useWhiteElements = false; // Mobile menu always dark text on cream

  const animationConfig = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.3 }}
            className="fixed inset-0 z-[55] backdrop-blur-sm lg:hidden bg-black/20"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu Panel */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={animationConfig}
            className="fixed top-0 left-0 right-0 z-[60] w-full lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            {/* Copper accent edge */}
            <motion.div
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-copper-400 via-copper-500 to-copper-600 origin-top"
            />

            {/* Height container */}
            <div className="h-screen flex flex-col backdrop-blur-xl shadow-2xl sm:ring-1 bg-cream-200/98 sm:ring-black/5">

              {/* Isolated scroll container */}
              <div
                className="relative flex-1 overflow-y-auto overflow-x-hidden"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  touchAction: 'pan-y',
                  paddingTop: 'env(safe-area-inset-top)',
                  paddingBottom: 'env(safe-area-inset-bottom)',
                }}
              >
                {/* Top fade */}
                <div className="pointer-events-none sticky top-0 z-10 h-4 bg-gradient-to-b to-transparent from-cream-200/98" />

                <div className="px-6">
                {/* Header */}
                <div className="flex items-center justify-between py-6">
                  <Link
                    href="/"
                    onClick={onClose}
                    className="transition-transform active:scale-95 -m-2 p-2 focus:outline-none focus-visible:outline-none"
                  >
                    <Image
                      src="/logo.png"
                      alt="The Astra Flow"
                      width={160}
                      height={53}
                      className="h-11 w-auto"
                    />
                  </Link>
                  <button
                    type="button"
                    className="rounded-none p-3 min-w-[44px] min-h-[44px] flex items-center justify-center group text-gray-900"
                    onClick={onClose}
                    aria-label="Close menu"
                  >
                    <X
                      className="h-6 w-6 transition-all duration-300 group-hover:rotate-90 group-hover:scale-110 group-hover:text-copper-500"
                      strokeWidth={1.5}
                    />
                  </button>
                </div>

                {/* Separator */}
                <div className="h-px bg-gradient-to-r from-transparent to-transparent mb-8 via-gray-200" />

                {/* Navigation */}
                <div className="space-y-1 pb-8">
                  {NAV_LINKS.map((link, index) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: prefersReducedMotion ? 0.01 : 0.4,
                        delay: prefersReducedMotion ? 0 : index * 0.05,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      {link.hasDropdown ? (
                        <div>
                          <button
                            onClick={() => setServicesOpen(!servicesOpen)}
                            className="w-full flex items-center justify-between px-6 py-4 text-[15px] font-normal tracking-wide transition-all min-h-[44px] rounded-none text-gray-900 hover:bg-cream-300/40 hover:text-copper-500 active:bg-cream-300/60"
                          >
                            {link.name}
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-300 ${
                                servicesOpen ? 'rotate-180' : ''
                              }`}
                              strokeWidth={1.5}
                            />
                          </button>
                          <AnimatePresence>
                            {servicesOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                className="overflow-hidden"
                              >
                                <div className="space-y-1 mt-1">
                                  {SERVICE_ITEMS.map((service) => (
                                    <Link
                                      key={service.href}
                                      href={service.href}
                                      className="block px-6 pl-10 py-3.5 text-[15px] font-normal transition-all hover:translate-x-1 min-h-[44px] flex items-center rounded-none text-gray-600 hover:bg-cream-300/40 active:bg-cream-300/60 hover:text-copper-500"
                                      onClick={onClose}
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
                          href={link.href}
                          className="block px-6 py-4 text-[15px] font-normal tracking-wide transition-all hover:translate-x-1 min-h-[44px] flex items-center rounded-none text-gray-900 hover:bg-cream-300/40 hover:text-copper-500 active:bg-cream-300/60"
                          onClick={onClose}
                        >
                          {link.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* CTA */}
                <div className="border-t pt-8 pb-8 border-gray-200/50">
                  <Button
                    asChild
                    variant="primary"
                    size="sm"
                    className="w-full justify-center group"
                  >
                    <Link href="/contact" onClick={onClose}>
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1.5 group-hover:scale-110 transition-all duration-300" />
                    </Link>
                  </Button>
                </div>
              </div>

                {/* Bottom fade */}
                <div className="pointer-events-none sticky bottom-0 z-10 h-4 bg-gradient-to-t to-transparent from-cream-200/98" />
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
