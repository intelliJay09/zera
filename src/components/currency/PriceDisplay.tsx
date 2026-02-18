'use client';

import { Suspense } from 'react';
import { useCurrency } from '@/hooks/useCurrency';
import { formatPrice } from '@/lib/currency';
import { DEFAULT_CURRENCY } from '@/types/currency';

interface PriceDisplayProps {
  price: number; // USD amount
  className?: string;
  period?: string;
  variant?: 'large' | 'inline';
}

function PriceDisplayInner({
  price,
  className = '',
  period,
  variant = 'large'
}: PriceDisplayProps) {
  const { currency, isInitialized, exchangeRates } = useCurrency();

  // Use the current currency if initialized, otherwise use default to match SSR
  const displayCurrency = isInitialized ? currency : DEFAULT_CURRENCY;

  // Fallback to USD if rates unavailable for non-USD currencies
  const effectiveCurrency =
    displayCurrency !== 'USD' && !exchangeRates
      ? 'USD'
      : displayCurrency;

  const formattedPrice = formatPrice(price, effectiveCurrency, exchangeRates || undefined);

  if (variant === 'inline') {
    return (
      <span className={`font-light text-copper-500 ${className}`}>
        {formattedPrice}
      </span>
    );
  }

  return (
    <div className={`flex items-baseline gap-1 ${className}`}>
      <span className="text-5xl font-light font-display text-copper-500">
        {formattedPrice}
      </span>
      {period && (
        <span className="text-lg font-light text-near-black/60">{period}</span>
      )}
    </div>
  );
}

export default function PriceDisplay(props: PriceDisplayProps) {
  return (
    <Suspense fallback={
      props.variant === 'inline' ? (
        <span className="font-light text-copper-500">...</span>
      ) : (
        <div className="flex items-baseline gap-1">
          <span className="text-5xl font-light font-display text-copper-500">...</span>
        </div>
      )
    }>
      <PriceDisplayInner {...props} />
    </Suspense>
  );
}
