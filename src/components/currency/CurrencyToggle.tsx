'use client';

import { motion } from 'framer-motion';
import { useCurrency } from '@/hooks/useCurrency';
import { CurrencyCode, CURRENCY_CONFIGS } from '@/types/currency';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export default function CurrencyToggle() {
  const { currency, setCurrency, isInitialized } = useCurrency();
  const prefersReducedMotion = usePrefersReducedMotion();

  const currencies: CurrencyCode[] = ['GHS', 'USD'];

  // Prevent rendering until currency is initialized to avoid hydration mismatch
  if (!isInitialized) {
    return (
      <div className="flex justify-center py-8">
        <div className="relative inline-flex items-center gap-3 rounded-full bg-cream-100/50 p-2 backdrop-blur-sm border border-cream-300/30">
          <div className="h-14 w-72 opacity-50" />
        </div>
      </div>
    );
  }

  const springConfig = prefersReducedMotion
    ? { duration: 0.01 }
    : { type: 'spring' as const, stiffness: 400, damping: 30 };

  return (
    <div className="flex justify-center py-8">
      <div className="relative inline-flex items-center gap-3 rounded-full bg-cream-100/50 p-2 backdrop-blur-sm border border-cream-300/30">
        {/* Currency buttons */}
        {currencies.map((curr) => {
          const config = CURRENCY_CONFIGS[curr];
          const isActive = currency === curr;

          return (
            <button
              key={curr}
              onClick={() => setCurrency(curr)}
              className="relative z-10 min-h-14 px-6 sm:px-10 py-3 rounded-full font-medium text-sm tracking-wide uppercase transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2"
              style={{
                color: isActive ? '#FFFBF5' : '#1A1614',
              }}
              aria-pressed={isActive}
              aria-label={`Switch to ${config.name}`}
            >
              {/* Sliding background - only renders on active button */}
              {isActive && (
                <motion.div
                  layoutId="currency-indicator"
                  className="absolute inset-0 rounded-full bg-copper-500 shadow-sm"
                  transition={springConfig}
                />
              )}

              {/* Button content */}
              <span className="relative flex items-center gap-2.5">
                <span className="text-base">{config.symbol}</span>
                <span>{curr}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
