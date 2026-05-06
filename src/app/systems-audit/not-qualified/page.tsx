import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Not the Right Fit - For Now | ZERA',
  robots: { index: false, follow: false },
};

export default function NotQualifiedPage() {
  return (
    <div className="min-h-screen bg-near-black flex items-center justify-center px-4 py-24">
      <div className="max-w-xl w-full text-center space-y-8">
        {/* Divider mark */}
        <div className="w-12 h-[2px] bg-copper-500/60 mx-auto" />

        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold font-display uppercase text-white tracking-brand-header">
            NOT THE RIGHT FIT
          </h1>
          <p className="text-copper-400 text-sm font-medium uppercase tracking-widest">
            For now.
          </p>
        </div>

        <div className="space-y-4 text-white/60 text-base leading-relaxed">
          <p>
            Our Systems Audit is engineered for organizations actively investing in
            production-grade operational infrastructure. Based on your current budget parameters,
            the fit is not right at this stage.
          </p>
          <p>
            This is not a rejection - it is a timing decision. When budget is allocated and
            the mandate is clear, we would be glad to build together.
          </p>
        </div>

        <div className="w-px h-12 bg-copper-500/20 mx-auto" />

        <div className="space-y-3">
          <p className="text-white/40 text-xs uppercase tracking-widest">In the meantime</p>
          <p className="text-white/60 text-sm leading-relaxed">
            Explore our thinking on revenue systems architecture or reach out directly when
            the time is right.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href="/blog"
            className="px-8 py-3 bg-white/10 hover:bg-white/15 text-white text-sm font-medium uppercase tracking-wide rounded-sm transition-colors duration-300 w-fit"
          >
            Read Our Thinking
          </Link>
          <Link
            href="/"
            className="px-8 py-3 bg-copper-500 hover:bg-copper-600 text-white text-sm font-medium uppercase tracking-wide rounded-sm transition-colors duration-300 w-fit"
          >
            Return Home
          </Link>
        </div>

        <div className="w-12 h-[2px] bg-copper-500/60 mx-auto" />
      </div>
    </div>
  );
}
