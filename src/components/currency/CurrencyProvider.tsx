'use client';

import { Suspense } from 'react';
import CurrencyToggle from './CurrencyToggle';

function CurrencyToggleWithSuspense() {
  return (
    <Suspense fallback={<div className="flex justify-center py-8"><div className="h-12 w-64 bg-cream-100/50 rounded-full animate-pulse" /></div>}>
      <CurrencyToggle />
    </Suspense>
  );
}

export default CurrencyToggleWithSuspense;
