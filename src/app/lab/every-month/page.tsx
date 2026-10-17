import Image from 'next/image';
import Link from 'next/link';
import { PRODUCT_TIERS } from '@/data/products';
import EveryMonthStage from './EveryMonthStage';

export default function EveryMonthDirection() {
  return (
    <main className="bg-near-black text-cream-200">
      {/* The signature moment: one month of a business Zera runs, on the screens on its counter */}
      <EveryMonthStage />

      {/* Chapter 01: the work you can hold */}
      <section className="px-6 py-28 sm:px-10 sm:py-40 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-center lg:gap-20">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-copper-400 sm:text-xs">
              01 · The cards on the counter
            </p>
            <h2 className="mt-5 font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
              The printed work is real too.
            </h2>
            <p className="mt-6 max-w-md text-lg text-cream-200/75 sm:text-xl">
              Zera rebranded Allure Bloom, a luxury beauty studio in Accra, and carried the identity through
              its grand opening: the invitation box, the cards, the gift vouchers, and the RSVP pages that
              count the replies.
            </p>
            <Link
              href="/case-studies/allure-bloom"
              className="mt-8 inline-flex min-h-[48px] w-fit items-center font-medium uppercase tracking-brand-label text-copper-400 transition-colors hover:text-copper-300"
            >
              Read the case study
            </Link>
          </div>
          <Image
            src="/images/case-studies/allure-bloom/voucher.webp"
            alt="The Allure Bloom gift voucher in cream and espresso, beside its folded cover"
            width={1600}
            height={880}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="block w-full"
          />
        </div>
      </section>

      {/* The three ways in */}
      <section className="px-6 pb-28 sm:px-10 sm:pb-40 lg:px-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-copper-400 sm:text-xs">
          What Zera builds
        </p>
        <ol className="mt-10 max-w-4xl">
          {PRODUCT_TIERS.map((tier, i) => (
            <li key={tier.slug}>
              <Link
                href={`/products/${tier.slug}`}
                className="group grid grid-cols-[3.5rem_1fr] items-baseline gap-4 py-6 sm:grid-cols-[4rem_1fr_auto] sm:gap-8"
              >
                <span className="font-mono text-sm text-cream-200/40">0{i + 1}</span>
                <span>
                  <span className="block font-display text-2xl font-bold uppercase tracking-brand-header text-cream-200 group-hover:text-copper-400 sm:text-3xl">
                    {tier.assetName}
                  </span>
                  <span className="mt-2 block max-w-xl text-base text-cream-200/65 sm:text-lg">{tier.tagline}</span>
                </span>
                <span className="col-start-2 font-mono text-xs uppercase tracking-[0.18em] text-cream-200/45 sm:col-start-3">
                  {tier.duration}
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <Link
          href="/systems-audit"
          className="mt-16 inline-flex min-h-[48px] w-fit items-center bg-copper-600 px-7 font-medium uppercase tracking-brand-label text-white transition-colors hover:bg-copper-700"
        >
          Book your systems audit
        </Link>
      </section>
    </main>
  );
}
