export type CurrencyCode = 'USD' | 'GBP' | 'EUR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  locale: string;
  decimalPlaces: number;
  position: 'before' | 'after';
}

export interface ExchangeRates {
  base: 'USD';
  rates: {
    GBP: number;
    EUR: number;
  };
  timestamp: number;
  source: 'frankfurter' | 'fallback';
}

export const CURRENCY_CONFIGS: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    locale: 'en-US',
    decimalPlaces: 0,
    position: 'before',
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    locale: 'en-GB',
    decimalPlaces: 0,
    position: 'before',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    locale: 'de-DE',
    decimalPlaces: 0,
    position: 'before',
  },
};

export const FALLBACK_EXCHANGE_RATES: ExchangeRates = {
  base: 'USD',
  rates: {
    GBP: 0.79,
    EUR: 0.95,
  },
  timestamp: 0,
  source: 'fallback',
};

export const DEFAULT_CURRENCY: CurrencyCode = 'USD';
