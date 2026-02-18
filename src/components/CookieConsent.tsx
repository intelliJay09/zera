'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Shield, BarChart3, Target, Check } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cookieBanner, cookieContent, cookieCategoryItem, cookieToggleSwitch } from '@/lib/animation-variants';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CONSENT_KEY = 'zera-cookie-consent';
const CONSENT_DURATION = 365 * 24 * 60 * 60 * 1000; // 1 year

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
  });
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    // Check if consent already exists
    const consent = getConsent();
    if (!consent) {
      // Show popup after 2 seconds to let user see content first
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const getConsent = () => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;

    try {
      const consent = JSON.parse(stored);
      // Check if consent has expired
      if (Date.now() - consent.timestamp > CONSENT_DURATION) {
        localStorage.removeItem(CONSENT_KEY);
        return null;
      }
      return consent;
    } catch {
      return null;
    }
  };

  const saveConsent = (prefs: CookiePreferences) => {
    const consentData = {
      ...prefs,
      timestamp: Date.now(),
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consentData));

    // Trigger GTM event if available
    if (typeof window !== 'undefined' && (window as Window & { dataLayer?: unknown[] }).dataLayer) {
      (window as Window & { dataLayer: unknown[] }).dataLayer.push({
        event: 'cookie_consent_update',
        analytics_storage: prefs.analytics ? 'granted' : 'denied',
        ad_storage: prefs.marketing ? 'granted' : 'denied',
      });
    }
  };

  const acceptAll = () => {
    const allAccepted = { essential: true, analytics: true, marketing: true };
    saveConsent(allAccepted);
    setIsVisible(false);
  };

  const acceptEssentialOnly = () => {
    const essentialOnly = { essential: true, analytics: false, marketing: false };
    saveConsent(essentialOnly);
    // Show success feedback
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setTimeout(() => setIsVisible(false), 300);
    }, 1500);
  };

  const saveCustomPreferences = () => {
    saveConsent(preferences);
    setIsVisible(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Essential cookies cannot be disabled
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* Cookie Consent Banner */}
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={prefersReducedMotion ? false : 'hidden'}
          animate={prefersReducedMotion ? {} : 'visible'}
          exit={prefersReducedMotion ? {} : 'hidden'}
          variants={cookieBanner}
          className="fixed bottom-0 left-0 right-0 z-[999] bg-cream-50/98 backdrop-blur-xl shadow-[0_-4px_24px_rgba(139,115,85,0.12)]"
        >
          {/* Top border accent */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-copper-500/40 to-transparent" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {!showCustomize ? (
              // Main Banner View
              <motion.div
                initial={prefersReducedMotion ? {} : 'hidden'}
                animate={prefersReducedMotion ? {} : 'visible'}
                variants={cookieContent}
                className="py-4 sm:py-5"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                  {/* Icon + Text */}
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex-shrink-0 hidden sm:block">
                      <div className="relative">
                        <div className="absolute inset-0 bg-copper-500/10 rounded-full blur-lg" />
                        <div className="relative bg-gradient-to-br from-copper-400 to-copper-600 p-2.5 rounded-full">
                          <Cookie className="w-4 h-4 text-cream-50" />
                        </div>
                      </div>
                    </div>

                    <div className="flex-1">
                      <p className="text-sm sm:text-base text-near-black/90 font-medium leading-relaxed">
                        We use cookies to improve your experience and analyze site performance.{' '}
                        <a
                          href="/legal/privacy-policy"
                          className="text-copper-600 font-bold hover:text-copper-700 transition-colors duration-200 underline underline-offset-2"
                        >
                          Privacy Policy
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                    {!showSuccess ? (
                      <>
                        <button
                          onClick={acceptAll}
                          className="whitespace-nowrap px-6 py-3 min-h-[44px] bg-gradient-to-r from-copper-500 to-copper-600 text-cream-50 font-bold text-sm rounded-lg hover:from-copper-600 hover:to-copper-700 transition-all duration-300 hover:scale-105 active:scale-95 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2"
                        >
                          Accept All
                        </button>

                        <button
                          onClick={acceptEssentialOnly}
                          className="whitespace-nowrap px-6 py-3 min-h-[44px] bg-cream-200/60 backdrop-blur-sm text-near-black font-bold text-sm rounded-lg hover:bg-cream-300/70 transition-all duration-300 hover:scale-105 active:scale-95 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2"
                        >
                          Essential Only
                        </button>

                        <button
                          onClick={() => setShowCustomize(true)}
                          className="whitespace-nowrap px-5 py-3 min-h-[44px] text-copper-600 font-bold text-sm hover:text-copper-700 transition-colors duration-200 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2 rounded-lg"
                        >
                          Customize
                        </button>
                      </>
                    ) : (
                      // Success Feedback
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center gap-2 px-6 py-3 bg-copper-500/10 rounded-lg"
                      >
                        <div className="bg-copper-500 rounded-full p-1">
                          <Check className="w-3 h-3 text-cream-50" />
                        </div>
                        <span className="text-sm font-bold text-copper-700">Preferences saved!</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              // Customize View
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="py-5 sm:py-6 space-y-5"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="font-display uppercase text-xl sm:text-2xl font-bold text-near-black tracking-brand-header">
                    Customize Cookie Preferences
                  </h3>
                </div>

                {/* Cookie Categories - Compact Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {/* Essential Cookies */}
                  <CompactCookieCategory
                    icon={<Shield className="w-4 h-4" />}
                    title="Essential"
                    enabled={preferences.essential}
                    disabled={true}
                    onToggle={() => {}}
                  />

                  {/* Analytics Cookies */}
                  <CompactCookieCategory
                    icon={<BarChart3 className="w-4 h-4" />}
                    title="Analytics"
                    enabled={preferences.analytics}
                    disabled={false}
                    onToggle={() => togglePreference('analytics')}
                  />

                  {/* Marketing Cookies */}
                  <CompactCookieCategory
                    icon={<Target className="w-4 h-4" />}
                    title="Marketing"
                    enabled={preferences.marketing}
                    disabled={false}
                    onToggle={() => togglePreference('marketing')}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setShowCustomize(false)}
                    className="px-5 py-3 min-h-[44px] text-copper-600 font-bold text-sm hover:text-copper-700 transition-colors duration-200 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={saveCustomPreferences}
                    className="px-6 py-3 min-h-[44px] bg-gradient-to-r from-copper-500 to-copper-600 text-cream-50 font-bold text-sm rounded-lg hover:from-copper-600 hover:to-copper-700 transition-all duration-300 hover:scale-105 active:scale-95 w-fit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2"
                  >
                    Save Preferences
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

// Compact Cookie Category Component
interface CompactCookieCategoryProps {
  icon: React.ReactNode;
  title: string;
  enabled: boolean;
  disabled: boolean;
  onToggle: () => void;
}

function CompactCookieCategory({ icon, title, enabled, disabled, onToggle }: CompactCookieCategoryProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? false : 'hidden'}
      animate={prefersReducedMotion ? {} : 'visible'}
      variants={cookieCategoryItem}
      className="flex items-center justify-between gap-3 p-4 bg-cream-100/50 backdrop-blur-sm rounded-lg"
    >
      <div className="flex items-center gap-2.5">
        <div className="text-copper-600 flex-shrink-0">{icon}</div>
        <h4 className="font-bold text-sm text-near-black">{title}</h4>
      </div>

      {/* Toggle Switch */}
      <button
        onClick={onToggle}
        disabled={disabled}
        className={`
          relative w-12 h-6 rounded-full transition-all duration-300 flex-shrink-0
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
          ${enabled ? 'bg-gradient-to-r from-copper-500 to-copper-600' : 'bg-cream-300'}
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2
        `}
        aria-label={`Toggle ${title}`}
        aria-pressed={enabled}
      >
        <motion.div
          initial={false}
          animate={{ x: enabled ? 24 : 2 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          variants={cookieToggleSwitch}
          className="absolute top-1 left-0 w-4 h-4 bg-cream-50 rounded-full shadow-md"
        />
      </button>
    </motion.div>
  );
}
