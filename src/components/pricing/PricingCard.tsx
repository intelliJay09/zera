'use client';

import { CheckCircle2 } from 'lucide-react';
import PriceDisplay from '@/components/currency/PriceDisplay';
import { ServicePricingPlan } from '@/types/pricing';

interface PricingCardProps {
  plan: ServicePricingPlan;
  className?: string;
  onSelectPlan?: () => void;
}

export default function PricingCard({ plan, className = '', onSelectPlan }: PricingCardProps) {
  const { name, price, period, bestFor, features, cta, featured } = plan;

  return (
    <div
      className={`relative flex flex-col bg-white p-8 sm:p-10 transition-all duration-500 ${
        featured
          ? 'ring-2 ring-copper-500 shadow-xl scale-105'
          : 'shadow-md hover:shadow-lg'
      } ${className}`}
    >
      {/* Most Popular Badge */}
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="inline-block px-6 py-2 bg-copper-500 text-cream-50 text-xs font-medium tracking-brand-label uppercase shadow-sm">
            Most Popular
          </span>
        </div>
      )}

      {/* Tier Name */}
      <h3 className="text-2xl sm:text-3xl font-light font-display uppercase text-near-black tracking-brand-header mb-3">
        {name}
      </h3>

      {/* Best For Description */}
      <p className="text-sm sm:text-base font-normal text-near-black/70 leading-relaxed tracking-normal mb-6">
        {bestFor}
      </p>

      {/* Price */}
      <div className="mb-8">
        {price === 'Custom' ? (
          <div className="flex items-baseline gap-1">
            <span className="text-5xl font-light font-display text-copper-500">Custom</span>
            <span className="text-lg font-light text-near-black/60">{period}</span>
          </div>
        ) : (
          <PriceDisplay price={price} period={period} variant="large" />
        )}
      </div>

      {/* Features */}
      <ul className="space-y-4 mb-10 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-copper-500 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <span className="text-sm sm:text-base font-light text-near-black/80 leading-relaxed tracking-normal">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={onSelectPlan}
        className={`w-fit px-8 py-4 text-sm font-medium tracking-brand-label uppercase transition-all duration-300 ${
          featured
            ? 'bg-copper-500 text-cream-50 hover:bg-copper-600 shadow-sm hover:shadow-md'
            : 'bg-cream-100 text-near-black hover:bg-cream-200'
        }`}
      >
        {cta}
      </button>
    </div>
  );
}
