import Link from 'next/link';
import StatementLedger from './StatementLedger';

export default function StatementDirection() {
  return (
    <main className="bg-near-black text-cream-200">
      <section className="flex min-h-svh flex-col justify-center px-6 pt-28 pb-16 sm:px-10 lg:px-16">
        <p className="rise-in font-mono text-[11px] uppercase tracking-[0.22em] text-copper-400 sm:text-xs">
          Statement · October 2026
        </p>
        <h1 className="rise-in [--rise-delay:100ms] mt-6 font-display text-[16vw] font-bold leading-[0.92] tracking-tight text-cream-200 sm:text-[11vw] lg:text-[9.5vw]">
          Revenue,
          <br />
          Realized.
        </h1>
        <p className="rise-in [--rise-delay:250ms] mt-8 max-w-md text-lg text-cream-200/70 sm:text-xl">
          Every month, Zera&apos;s clients get a statement of what the system caught. This is ours,
          in public.
        </p>
        <Link
          href="/systems-audit"
          className="rise-in [--rise-delay:380ms] mt-8 inline-flex min-h-[48px] w-fit items-center bg-copper-600 px-7 font-medium uppercase tracking-brand-label text-white transition-colors hover:bg-copper-700"
        >
          Book your systems audit
        </Link>
      </section>

      <StatementLedger />

      <section className="px-6 pb-32 sm:px-10 sm:pb-44 lg:px-16">
        <div className="mx-auto max-w-5xl">
          <p className="max-w-xl text-lg text-cream-200/70 sm:text-xl">
            The next line on this statement could be yours. It starts with an audit of where your
            revenue goes now.
          </p>
          <Link
            href="/systems-audit"
            className="mt-8 inline-flex min-h-[48px] w-fit items-center bg-copper-600 px-7 font-medium uppercase tracking-brand-label text-white transition-colors hover:bg-copper-700"
          >
            Book your systems audit
          </Link>
        </div>
      </section>
    </main>
  );
}
