'use client';

import { Suspense } from 'react';
import { useCurrency } from '@/hooks/useCurrency';
import { formatMultiCurrencyPrice } from '@/lib/currency';
import { MultiCurrencyPrice, DEFAULT_CURRENCY } from '@/types/currency';

interface PriceDisplayProps {
  price: MultiCurrencyPrice;
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
  const { currency, isInitialized } = useCurrency();

  // Use the current currency if initialized, otherwise use default to match SSR
  const displayCurrency = isInitialized ? currency : DEFAULT_CURRENCY;
  const formattedPrice = formatMultiCurrencyPrice(price, displayCurrency);

  if (variant === 'inline') {
    return (
      <span className={`font-light text-copper-500 ${className}`}>
        {formattedPrice}
      </span>
    );
  }

  return (
    <div className={`flex items-baseline gap-1 ${className}`}>
      <span className="text-5xl font-light font-playfair text-copper-500">
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
          <span className="text-5xl font-light font-playfair text-copper-500">...</span>
        </div>
      )
    }>
      <PriceDisplayInner {...props} />
    </Suspense>
  );
}
