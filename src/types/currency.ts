export type CurrencyCode = 'USD' | 'GHS';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  locale: string;
  decimalPlaces: number;
  position: 'before' | 'after';
}

export interface MultiCurrencyPrice {
  USD: number;
  GHS: number;
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
  GHS: {
    code: 'GHS',
    symbol: '₵',
    name: 'Ghana Cedi',
    locale: 'en-GH',
    decimalPlaces: 0,
    position: 'before',
  },
};

export const DEFAULT_CURRENCY: CurrencyCode = 'USD';
