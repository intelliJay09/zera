import { CurrencyCode, CURRENCY_CONFIGS, MultiCurrencyPrice } from '@/types/currency';

/**
 * Format a price value in the specified currency
 */
export function formatPrice(amount: number, currency: CurrencyCode): string {
  const config = CURRENCY_CONFIGS[currency];

  const formatted = new Intl.NumberFormat(config.locale, {
    style: 'decimal',
    minimumFractionDigits: config.decimalPlaces,
    maximumFractionDigits: config.decimalPlaces,
  }).format(amount);

  return config.position === 'before'
    ? `${config.symbol}${formatted}`
    : `${formatted}${config.symbol}`;
}

/**
 * Get the price value for a specific currency from a multi-currency price object
 */
export function getPrice(price: MultiCurrencyPrice, currency: CurrencyCode): number {
  return price[currency];
}

/**
 * Format a multi-currency price in the specified currency
 */
export function formatMultiCurrencyPrice(
  price: MultiCurrencyPrice,
  currency: CurrencyCode
): string {
  const amount = getPrice(price, currency);
  return formatPrice(amount, currency);
}
