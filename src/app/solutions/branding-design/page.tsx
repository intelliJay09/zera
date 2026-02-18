'use client';

import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { brandingDesignPricingConfig } from '@/data/branding-design-pricing';

const PricingSection = dynamic(() => import('@/components/pricing/PricingSection'));

export default function BrandingDesignPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-cream-200">
      <div className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-near-black uppercase tracking-brand-header sm:text-5xl mb-6">
            BRANDING & DESIGN
          </h1>
          <p className="text-lg text-near-black/70 font-normal tracking-normal">
            Premium identity design for ambitious brands. Content coming soon...
          </p>
        </div>
      </div>

      {/* Pricing Section */}
      <PricingSection config={brandingDesignPricingConfig} onSelectPlan={() => router.push('/contact')} />
    </main>
  );
}
