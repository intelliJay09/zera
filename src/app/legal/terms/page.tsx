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

export default function TermsPage() {
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
            TERMS OF SERVICE
          </h1>
          <p className="text-base text-near-black/60" style={{ fontFamily: 'Lato, sans-serif' }}>
            The Rules of Engagement.
          </p>
          <div className="mt-6 space-y-1 text-sm text-near-black/60" style={{ fontFamily: 'Lato, sans-serif' }}>
            <p><strong>Jurisdiction:</strong> Republic of Ghana</p>
          </div>
        </div>

        {/* Document Content */}
        <article className="prose prose-lg max-w-none" style={{ fontFamily: 'Lato, sans-serif' }}>
          <h3 className="text-xl font-semibold text-near-black mt-8 mb-4">1. ACCEPTANCE OF TERMS</h3>
          <p className="text-base text-near-black/80 leading-relaxed mb-6">
            By accessing or using the Zera Dynamics website, you agree to be bound by these Terms. If you do not agree to these protocols, you are prohibited from using this site.
          </p>

          <h3 className="text-xl font-semibold text-near-black mt-8 mb-4">2. INTELLECTUAL PROPERTY (THE ASSET)</h3>
          <p className="text-base text-near-black/80 leading-relaxed mb-4">
            All content on this site—including the &ldquo;Zera&rdquo; brand, the &ldquo;Digital HQ&rdquo; methodology, copy, code, and visual architecture—is the exclusive intellectual property of Zera Dynamics Ltd.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-base text-near-black/80 mb-6">
            <li><strong>Prohibition:</strong> You may not copy, replicate, or reverse-engineer our proprietary frameworks for commercial use without written authorization from the Directorate.</li>
          </ul>

          <h3 className="text-xl font-semibold text-near-black mt-8 mb-4">3. SERVICE DISCLAIMER</h3>
          <p className="text-base text-near-black/80 leading-relaxed mb-6">
            The content provided on this site is for educational and informational purposes. While we engineer high-performance growth systems, Zera Dynamics makes no absolute guarantees regarding specific revenue figures, as market conditions vary. <strong>Results are a function of execution.</strong>
          </p>

          <h3 className="text-xl font-semibold text-near-black mt-8 mb-4">4. LIMITATION OF LIABILITY</h3>
          <p className="text-base text-near-black/80 leading-relaxed mb-6">
            To the fullest extent permitted by Ghanaian law, Zera Dynamics shall not be liable for any indirect, incidental, or consequential damages arising from your use of this site or our services.
          </p>

          <h3 className="text-xl font-semibold text-near-black mt-8 mb-4">5. GOVERNING LAW</h3>
          <p className="text-base text-near-black/80 leading-relaxed mb-6">
            These Terms shall be governed by the laws of the <strong>Republic of Ghana</strong>. Any disputes arising from the use of this website shall be resolved exclusively in the courts of Accra.
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
