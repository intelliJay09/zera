import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Check Your Inbox | ZERA',
  robots: 'noindex, nofollow',
};

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-near-black flex items-center justify-center relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-copper-500/10 rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-copper-500/20 to-transparent" />

      <div className="relative text-center px-4 sm:px-6 max-w-2xl mx-auto">
        {/* Icon */}
        <div className="flex items-center justify-center mb-10">
          <div className="w-20 h-20 border border-copper-500/40 flex items-center justify-center">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 8L16 18L28 8"
                stroke="#B87333"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
              <rect
                x="4"
                y="6"
                width="24"
                height="20"
                stroke="#B87333"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>

        {/* Badge */}
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-copper-500 mb-6">
          AUDIT DISPATCHED
        </p>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display uppercase text-white tracking-brand-header leading-[1.05] mb-6">
          CHECK YOUR<br />INBOX.
        </h1>

        <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-4 max-w-lg mx-auto">
          Your copy of the 2026 Ghana Executive Audit is on its way. It should
          arrive within the next few minutes.
        </p>

        <p className="text-sm text-white/35 leading-relaxed mb-12 max-w-md mx-auto">
          If you don&rsquo;t see it, check your spam folder and mark it as safe.
        </p>

        {/* Divider */}
        <div className="w-12 h-px bg-copper-500/40 mx-auto mb-12" />

        {/* Next step */}
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mb-4">
          WHILE YOU WAIT
        </p>
        <p className="text-base text-white/60 leading-relaxed mb-8 max-w-md mx-auto">
          The audit reveals the leaks. The Diagnostic calculates your exact
          recovery number. Ready to see it?
        </p>

        <Link
          href="/growth-audit"
          className="group inline-flex items-center justify-center gap-3 bg-copper-500 hover:bg-copper-600 text-white font-bold text-xs tracking-[0.15em] uppercase px-8 py-4 transition-all duration-300 w-fit"
        >
          Request Your Infrastructure Diagnostic
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </main>
  );
}
