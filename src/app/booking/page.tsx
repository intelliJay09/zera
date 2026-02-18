import { Suspense } from 'react';
import { Metadata } from 'next';
import BookSessionContent from './BookSessionContent';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Secure Strategy Session',
  description:
    'Book a 60-minute executive diagnostic. We audit your revenue operations and engineer a custom roadmap for market sovereignty.',
};

export default function BookSessionPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-cream-200 pt-32 pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h1 className="font-display text-4xl font-bold uppercase text-near-black sm:text-5xl mb-6 tracking-brand-header">
              LOADING...
            </h1>
          </div>
        </main>
      }
    >
      <BookSessionContent />
    </Suspense>
  );
}
