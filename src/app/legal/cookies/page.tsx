import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Data protection protocols for Zera Dynamics.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[800px] pt-30 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-24">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-near-black/60 hover:text-near-black mb-12 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Document Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-normal text-near-black mb-4" style={{ fontFamily: 'Lato, sans-serif' }}>
            COOKIE POLICY
          </h1>
          <p className="text-base text-near-black/60" style={{ fontFamily: 'Lato, sans-serif' }}>
            The Tracking Protocol.
          </p>
          <div className="mt-6 space-y-1 text-sm text-near-black/60" style={{ fontFamily: 'Lato, sans-serif' }}>
            <p><strong>Status:</strong> Active</p>
          </div>
        </div>

        {/* Document Content */}
        <article className="prose prose-lg max-w-none" style={{ fontFamily: 'Lato, sans-serif' }}>
          <h3 className="text-xl font-semibold text-near-black mt-8 mb-4">1. DEFINITION</h3>
          <p className="text-base text-near-black/80 leading-relaxed mb-6">
            Cookies are small data beacons deployed by our server to your device. They allow our Digital HQ to recognize you and optimize your experience.
          </p>

          <h3 className="text-xl font-semibold text-near-black mt-8 mb-4">2. COOKIE CLASSIFICATION</h3>
          <ul className="list-disc pl-6 space-y-3 text-base text-near-black/80 mb-6">
            <li>
              <strong>Essential Cookies:</strong> Required for the site to function (e.g., Security tokens, Payment session data). These cannot be disabled.
            </li>
            <li>
              <strong>Intelligence Cookies (Analytics):</strong> We use <strong>Google Analytics 4</strong> to track user behavior, dwell time, and conversion paths. This data is anonymized.
            </li>
            <li>
              <strong>Marketing Cookies:</strong> Used to retarget visitors who have engaged with our high-value content.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-near-black mt-8 mb-4">3. CONSENT PROTOCOL</h3>
          <p className="text-base text-near-black/80 leading-relaxed mb-6">
            Upon your first arrival at the Zera Digital HQ, you were presented with a <strong>Consent Control Panel</strong>. You may alter your preferences at any time by clearing your browser cache.
          </p>

          <h3 className="text-xl font-semibold text-near-black mt-8 mb-4">4. THIRD-PARTY BEACONS</h3>
          <p className="text-base text-near-black/80 leading-relaxed mb-6">
            Our site may utilize infrastructure from third-party providers (e.g., YouTube embeds, Paystack Checkout). These entities may deploy their own cookies, which are governed by their respective privacy policies.
          </p>
        </article>

        {/* Document Footer */}
        <div className="mt-16 pt-8 border-t border-near-black/10">
          <p className="text-sm text-near-black/60" style={{ fontFamily: 'Lato, sans-serif' }}>
            Last Updated: January 1, 2026
          </p>
        </div>
      </div>
    </main>
  );
}
