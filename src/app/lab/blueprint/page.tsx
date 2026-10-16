import Link from 'next/link';
import { PRODUCT_TIERS } from '@/data/products';
import { CASE_STUDIES } from '@/data/case-studies';
import BlueprintStage from './BlueprintStage';

const TITLE_BLOCK = [
  ['Project', 'A revenue system'],
  ['Drawn by', 'Zera, Accra'],
  ['Scale', '1 : 1'],
  ['Status', 'Issued for revenue'],
];

export default function BlueprintDirection() {
  return (
    <main className="bg-near-black text-cream-200">
      {/* Sheet 01: the title */}
      <section className="relative flex min-h-svh flex-col justify-center px-6 pt-28 pb-16 sm:px-10 lg:px-16">
        <p className="rise-in font-mono text-[11px] uppercase tracking-[0.22em] text-copper-400 sm:text-xs">
          Drawing set · Sheet 01 of 05
        </p>
        <h1 className="rise-in [--rise-delay:100ms] mt-6 font-display text-[16vw] font-bold leading-[0.92] tracking-tight text-cream-200 sm:text-[11vw] lg:text-[9.5vw]">
          Revenue,
          <br />
          Realized.
        </h1>
        <p className="rise-in [--rise-delay:250ms] mt-8 max-w-md text-lg text-cream-200/70 sm:text-xl">
          Zera draws, builds and runs the system that catches the revenue your business already
          loses. Scroll to see it drawn.
        </p>
        <Link
          href="/systems-audit"
          className="rise-in [--rise-delay:380ms] mt-8 inline-flex min-h-[48px] w-fit items-center bg-copper-600 px-7 font-medium uppercase tracking-brand-label text-white transition-colors hover:bg-copper-700"
        >
          Book your systems audit
        </Link>

        {/* Title block, bottom right, as on a drawing sheet */}
        <dl className="mt-16 grid w-fit grid-cols-[auto_auto] gap-x-8 gap-y-1.5 font-mono text-[11px] uppercase tracking-[0.18em] sm:absolute sm:right-10 sm:bottom-10 sm:mt-0 lg:right-16 lg:bottom-12">
          {TITLE_BLOCK.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-cream-200/45">{k}</dt>
              <dd className="text-cream-200/90">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* The signature moment: the plan draws itself as you scroll */}
      <BlueprintStage />

      {/* Sheets 02 to 04: the three tiers */}
      <section className="px-6 py-28 sm:px-10 sm:py-40 lg:px-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-copper-400 sm:text-xs">The drawing set</p>
        <ol className="mt-10 max-w-4xl">
          {PRODUCT_TIERS.map((tier, i) => (
            <li key={tier.slug}>
              <Link
                href={`/products/${tier.slug}`}
                className="group grid grid-cols-[3.5rem_1fr] items-baseline gap-4 py-6 sm:grid-cols-[4rem_1fr_auto] sm:gap-8"
              >
                <span className="font-mono text-sm text-cream-200/45">0{i + 2}</span>
                <span className="font-display text-2xl font-bold uppercase tracking-brand-header text-cream-200 transition-colors group-hover:text-copper-400 sm:text-4xl">
                  {tier.assetName}
                </span>
                <span className="col-start-2 font-mono text-xs uppercase tracking-[0.18em] text-cream-200/55 sm:col-start-3">
                  {tier.duration}
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      {/* Project sheets: real clients */}
      <section className="px-6 pb-32 sm:px-10 sm:pb-44 lg:px-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-copper-400 sm:text-xs">Project sheets</p>
        <ul className="mt-10 max-w-4xl">
          {CASE_STUDIES.map((study) => (
            <li key={study.slug}>
              <Link href={`/portfolio/${study.slug}`} className="group block py-6">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-cream-200/55">
                  {study.client} · {study.location} · {study.year}
                </span>
                <span className="mt-2 block max-w-2xl text-xl text-cream-200/90 transition-colors group-hover:text-copper-400 sm:text-2xl">
                  {study.headline}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
