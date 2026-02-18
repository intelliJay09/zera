import { Metadata } from 'next';
import { Suspense } from 'react';

/**
 * Metadata for booking success page
 * NoIndex prevents search engines from indexing the thank you page
 */
export const metadata: Metadata = {
  title: 'Strategy Session Booked',
  description: 'Your strategy session has been successfully booked.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function BookingSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback={<div className="min-h-screen bg-cream flex items-center justify-center"><div className="text-near-black">Loading...</div></div>}>{children}</Suspense>;
}
