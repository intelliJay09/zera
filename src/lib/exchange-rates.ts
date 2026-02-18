import { ExchangeRates, FALLBACK_EXCHANGE_RATES } from '@/types/currency';

const STORAGE_KEY = 'currency-exchange-rates';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

/**
 * Fetch exchange rates with client-side caching
 */
export async function getExchangeRates(): Promise<ExchangeRates> {
  try {
    // Check localStorage first
    const cached = getStoredRates();
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached;
    }

    // Fetch from API route
    const response = await fetch('/api/currency/rates', {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch rates');
    }

    const rates: ExchangeRates = await response.json();

    // Store in localStorage
    storeRates(rates);

    return rates;
  } catch (error) {
    console.error('Exchange rate fetch failed, using fallback:', error);

    // Try stored rates even if expired
    const stored = getStoredRates();
    if (stored) {
      return stored;
    }

    // Last resort: fallback constants
    return FALLBACK_EXCHANGE_RATES;
  }
}

function getStoredRates(): ExchangeRates | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored) as ExchangeRates;
  } catch {
    return null;
  }
}

function storeRates(rates: ExchangeRates): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(rates));
  } catch (error) {
    console.error('Failed to cache exchange rates:', error);
  }
}

/**
 * Convert USD amount to target currency
 */
export function convertCurrency(
  usdAmount: number,
  targetCurrency: 'USD' | 'GBP' | 'EUR',
  rates: ExchangeRates
): number {
  if (targetCurrency === 'USD') {
    return usdAmount;
  }

  const rate = rates.rates[targetCurrency];
  return Math.round(usdAmount * rate);
}
