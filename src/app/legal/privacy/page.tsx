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

export default function PrivacyPage() {
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
            PRIVACY POLICY
          </h1>
          <p className="text-base text-near-black/60" style={{ fontFamily: 'Lato, sans-serif' }}>
            The Data Protection Protocol.
          </p>
          <div className="mt-6 space-y-1 text-sm text-near-black/60" style={{ fontFamily: 'Lato, sans-serif' }}>
            <p><strong>Effective Date:</strong> January 1, 2026</p>
            <p><strong>Identity:</strong> ZERA DYNAMICS LTD. (&ldquo;The Company&rdquo;)</p>
          </div>
        </div>

        {/* Document Content */}
        <article className="prose prose-lg max-w-none" style={{ fontFamily: 'Lato, sans-serif' }}>
          <h3 className="text-xl font-semibold text-near-black mt-8 mb-4">1. THE PREAMBLE</h3>
          <p className="text-base text-near-black/80 leading-relaxed mb-6">
            Zera Dynamics respects the sovereignty of your data. This policy outlines how we collect, process, and fortify the information you transmit to our Digital HQ. By accessing <code className="text-copper-600 bg-copper-50 px-1">zerahq.com</code>, you consent to the protocols defined herein.
          </p>

          <h3 className="text-xl font-semibold text-near-black mt-8 mb-4">2. DATA COLLECTION ARCHITECTURE</h3>
          <p className="text-base text-near-black/80 leading-relaxed mb-4">
            We collect two categories of data:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base text-near-black/80 mb-6">
            <li><strong>Voluntary Transmissions:</strong> Information you explicitly provide via our Strategy Session forms, including Name, Email, Phone Number, and Revenue Data.</li>
            <li><strong>Telemetry Data:</strong> Information automatically collected by our infrastructure, including IP address, browser type, and engagement metrics via Google Analytics 4 (GA4).</li>
          </ul>

          <h3 className="text-xl font-semibold text-near-black mt-8 mb-4">3. PURPOSE OF PROCESSING</h3>
          <p className="text-base text-near-black/80 leading-relaxed mb-4">
            We process data solely for the following objectives:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base text-near-black/80 mb-6">
            <li><strong>Operational:</strong> To schedule Strategy Sessions and deploy client services.</li>
            <li><strong>Transactional:</strong> To process payments via our secure gateway (Paystack).</li>
            <li><strong>Optimization:</strong> To analyze traffic patterns and improve the performance of our digital assets.</li>
          </ul>

          <h3 className="text-xl font-semibold text-near-black mt-8 mb-4">4. DATA SOVEREIGNTY & SHARING</h3>
          <p className="text-base text-near-black/80 leading-relaxed mb-4">
            We do not sell your data to third-party brokers. Data is only shared with trusted infrastructure partners required to deliver our service:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base text-near-black/80 mb-6">
            <li><strong>Payment Processing:</strong> Paystack (PCI-DSS Compliant).</li>
            <li><strong>Analytics:</strong> Google (Alphabet Inc.).</li>
            <li><strong>Communication:</strong> WhatsApp and Enterprise Email Providers.</li>
          </ul>

          <h3 className="text-xl font-semibold text-near-black mt-8 mb-4">5. INTERNATIONAL TRANSFER</h3>
          <p className="text-base text-near-black/80 leading-relaxed mb-6">
            Zera Dynamics operates from <strong>Accra, Ghana</strong>. If you are accessing this site from the EU or USA, you acknowledge that your data will be transferred to and processed in Ghana under the Data Protection Act, 2012 (Act 843).
          </p>

          <h3 className="text-xl font-semibold text-near-black mt-8 mb-4">6. YOUR RIGHTS</h3>
          <p className="text-base text-near-black/80 leading-relaxed mb-6">
            You retain the right to request a copy of your data or demand its deletion from our servers. To initiate a <strong>Data Purge Request</strong>, contact: <a href="mailto:legal@zerahq.com" className="text-copper-600 hover:text-copper-500 underline">legal@zerahq.com</a>.
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
