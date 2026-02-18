import { Suspense } from 'react';
import { Metadata } from 'next';
import AssetAccessionContent from './AssetAccessionContent';

export const metadata: Metadata = {
  title: 'Asset Accession Protocol | ZERA',
  description:
    'Secure client onboarding portal. Submit your brand assets, digital credentials, and business information to initiate the 90-day build cycle.',
  robots: { index: false, follow: false },
};

export default function AssetAccessionPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-gradient-to-b from-cream-50 to-cream-200 pt-32 pb-24">
          <div className="mx-auto max-w-[1000px] px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse space-y-8">
              <div className="h-8 w-64 bg-near-black/5 rounded-sm" />
              <div className="h-4 w-48 bg-near-black/5 rounded-sm" />
              <div className="h-px bg-copper-500/20 w-full" />
              <div className="space-y-4">
                <div className="h-40 bg-cream-50 rounded-sm border border-copper-500/10" />
                <div className="h-40 bg-cream-50 rounded-sm border border-copper-500/10" />
                <div className="h-40 bg-cream-50 rounded-sm border border-copper-500/10" />
              </div>
            </div>
          </div>
        </main>
      }
    >
      <AssetAccessionContent />
    </Suspense>
  );
}
