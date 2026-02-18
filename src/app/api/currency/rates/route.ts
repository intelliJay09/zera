import { NextResponse } from 'next/server';
import { ExchangeRates, FALLBACK_EXCHANGE_RATES } from '@/types/currency';

// In-memory cache (simple approach for VPS deployment)
let ratesCache: ExchangeRates | null = null;
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

export async function GET() {
  try {
    // Check if cache is still valid
    if (ratesCache && Date.now() - ratesCache.timestamp < CACHE_TTL) {
      return NextResponse.json(ratesCache);
    }

    // Fetch fresh rates from Frankfurter API
    const response = await fetch(
      'https://api.frankfurter.dev/v1/latest?base=USD&symbols=GBP,EUR',
      { next: { revalidate: 3600 } } // Next.js cache for 1 hour
    );

    if (!response.ok) {
      throw new Error(`Frankfurter API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform to our format
    const rates: ExchangeRates = {
      base: 'USD',
      rates: {
        GBP: data.rates.GBP,
        EUR: data.rates.EUR,
      },
      timestamp: Date.now(),
      source: 'frankfurter',
    };

    // Update cache
    ratesCache = rates;

    return NextResponse.json(rates);
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);

    // Return fallback rates
    const fallbackWithTimestamp: ExchangeRates = {
      ...FALLBACK_EXCHANGE_RATES,
      timestamp: Date.now(),
    };

    return NextResponse.json(fallbackWithTimestamp, { status: 200 });
  }
}
