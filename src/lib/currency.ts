import { CurrencyCode, CURRENCY_CONFIGS, ExchangeRates } from '@/types/currency';
import { convertCurrency } from './exchange-rates';

/**
 * Format a price value in the specified currency
 * Amount is always in USD, conversion happens here if needed
 */
export function formatPrice(
  usdAmount: number,
  currency: CurrencyCode,
  rates?: ExchangeRates
): string {
  const config = CURRENCY_CONFIGS[currency];

  // Convert if not USD
  let amount = usdAmount;
  if (currency !== 'USD' && rates) {
    amount = convertCurrency(usdAmount, currency, rates);
  }

  const formatted = new Intl.NumberFormat(config.locale, {
    style: 'decimal',
    minimumFractionDigits: config.decimalPlaces,
    maximumFractionDigits: config.decimalPlaces,
  }).format(amount);

  return config.position === 'before'
    ? `${config.symbol}${formatted}`
    : `${formatted}${config.symbol}`;
}
