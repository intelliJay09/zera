'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { CurrencyCode, DEFAULT_CURRENCY } from '@/types/currency';

const CURRENCY_STORAGE_KEY = 'preferred-currency';

/**
 * Custom hook for managing currency selection with URL params and localStorage persistence
 * IMPORTANT: Components using this hook MUST be wrapped in a Suspense boundary
 * due to useSearchParams usage
 */
export function useCurrency() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize with DEFAULT_CURRENCY to match SSR
  // This prevents hydration mismatches
  const [currency, setCurrencyState] = useState<CurrencyCode>(DEFAULT_CURRENCY);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize from URL or localStorage ONLY on client after mount
  useEffect(() => {
    // Priority 1: URL parameter
    const urlCurrency = searchParams?.get('currency')?.toUpperCase() as CurrencyCode;
    if (urlCurrency === 'USD' || urlCurrency === 'GHS') {
      setCurrencyState(urlCurrency);
      localStorage.setItem(CURRENCY_STORAGE_KEY, urlCurrency);
      setIsInitialized(true);
      return;
    }

    // Priority 2: localStorage
    const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
    if (stored === 'USD' || stored === 'GHS') {
      setCurrencyState(stored as CurrencyCode);
      setIsInitialized(true);
      return;
    }

    // Priority 3: Default (already set in initial state)
    setIsInitialized(true);
  }, [searchParams]);

  /**
   * Change the active currency
   * Updates: state, localStorage, and URL params
   */
  const setCurrency = (newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);

    // Update localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENCY_STORAGE_KEY, newCurrency);
    }

    // Update URL without navigation
    const params = new URLSearchParams(searchParams?.toString());
    params.set('currency', newCurrency);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return {
    currency,
    setCurrency,
    isInitialized,
  };
}
