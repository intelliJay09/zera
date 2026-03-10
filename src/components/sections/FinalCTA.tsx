'use client';

import { CheckCircle2 } from 'lucide-react';
import dynamic from 'next/dynamic';

const StrategySessionForm = dynamic(() => import('@/components/forms/StrategySessionForm'));

export default function FinalCTA() {
  return (
    <section className="relative bg-gradient-to-br from-near-black via-[#0a0a0a] to-near-black py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden">
      {/* Ambient copper glow */}
      <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-copper-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-copper-500/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px] relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-20 items-start">
          {/* Left: Content */}
          <div className="lg:sticky lg:top-32">
            <p className="text-sm font-medium tracking-brand-label uppercase text-copper-500 mb-6 text-center lg:text-left">
              The Growth Audit
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light font-display uppercase text-cream-200 tracking-brand-header leading-tight mb-6 sm:mb-8 text-center lg:text-left">
              Your Revenue Infrastructure
              <span className="block text-copper-500">Is Leaking.</span>
            </h2>
            <p className="text-base sm:text-lg font-normal text-light-gray leading-relaxed mb-12 text-center lg:text-left">
              60 minutes to map the leaks in your growth infrastructure and hand you a clear roadmap to fix them.
            </p>

            {/* What You Get */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-copper-500 flex-shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h3 className="text-base font-medium text-cream-200 mb-1">Digital HQ Infrastructure Audit</h3>
                  <p className="text-sm text-light-gray/70">Core Web Vitals analysis, conversion physics diagnosis, and revenue leak identification</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-copper-500 flex-shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h3 className="text-base font-medium text-cream-200 mb-1">Search Authority Diagnostic</h3>
                  <p className="text-sm text-light-gray/70">Entity mapping, schema architecture gaps, and organic visibility failure points</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-copper-500 flex-shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h3 className="text-base font-medium text-cream-200 mb-1">Lead & CRM Pipeline Review</h3>
                  <p className="text-sm text-light-gray/70">CRM integration status, automation infrastructure, and pipeline efficiency analysis</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-copper-500 flex-shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h3 className="text-base font-medium text-cream-200 mb-1">Traffic Quality Assessment</h3>
                  <p className="text-sm text-light-gray/70">Source integrity verification, visitor qualification metrics, and growth ceiling analysis</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-copper-500 flex-shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h3 className="text-base font-medium text-cream-200 mb-1">Your Growth Roadmap</h3>
                  <p className="text-sm text-light-gray/70">Priority-ranked implementation roadmap with projected revenue impact per intervention</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="relative">
            {/* Background glow */}
            <div className="absolute -inset-1 bg-gradient-to-br from-copper-500/10 via-copper-500/5 to-transparent rounded-sm blur-3xl" />

            <div className="relative bg-[#2a2a2a] border border-copper-500/20 shadow-[0_20px_60px_rgba(0,0,0,0.5)] rounded-sm p-6 sm:p-8 lg:p-10">
              <StrategySessionForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
