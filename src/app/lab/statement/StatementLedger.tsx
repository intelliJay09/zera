'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEAL_CENTER, SEAL_RADIUS, SEAL_Z_PATH } from '@/lib/seal-geometry';

gsap.registerPlugin(ScrollTrigger);

interface Entry {
  date: string;
  client: string;
  entry: string;
  amount: { prefix?: string; value: number; suffix?: string };
}

/** Every line traces to src/data/case-studies.ts. Nothing here is invented. */
const ENTRIES: Entry[] = [
  {
    date: '22 Aug 2026',
    client: 'Gwen Addo',
    entry: 'The Vision Masterclass, Cohort III. 45 paying attendees, net collected.',
    amount: { prefix: 'GHS ', value: 60000, suffix: '+' },
  },
  {
    date: '22 Aug 2026',
    client: 'Gwen Addo',
    entry: 'Nine alumni of earlier cohorts, brought back into the room.',
    amount: { prefix: 'GHS ', value: 14000, suffix: '+' },
  },
  {
    date: 'Aug 2026',
    client: 'Gwen Addo',
    entry: 'Cohort III payments taken outside working hours. Not one missed.',
    amount: { value: 70, suffix: '%' },
  },
  {
    date: '2026',
    client: 'Gwen Addo',
    entry: 'The Vision Masterclass, three cohorts, collected by the system.',
    amount: { prefix: 'GHS ', value: 100000, suffix: '+' },
  },
  {
    date: '2026',
    client: 'Finest Dietitian',
    entry: 'Services patients can book on her own site, with the emails sending themselves.',
    amount: { value: 14 },
  },
  {
    date: '17 Oct 2026',
    client: 'Allure Bloom',
    entry: 'Gift voucher values, GHS 500 to 2,000, for a grand opening carried through every piece.',
    amount: { value: 4 },
  },
];

const format = (a: Entry['amount'], v: number) =>
  `${a.prefix ?? ''}${Math.round(v).toLocaleString('en-GB')}${a.suffix ?? ''}`;

const SEAL_SIZE = 120;

export default function StatementLedger() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      root.querySelectorAll<HTMLElement>('[data-row]').forEach((row) => {
        const amountEl = row.querySelector<HTMLElement>('[data-amount]');
        const entry = ENTRIES[Number(row.dataset.row)];
        const counter = { v: 0 };
        gsap
          .timeline({ scrollTrigger: { trigger: row, start: 'top 88%', end: 'top 52%', scrub: true } })
          .fromTo(row, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', ease: 'none' }, 0)
          .to(
            counter,
            {
              v: entry.amount.value,
              ease: 'none',
              onUpdate: () => {
                if (amountEl) amountEl.textContent = format(entry.amount, counter.v);
              },
            },
            0
          );
      });

      const stamp = root.querySelector('[data-stamp]');
      if (stamp) {
        gsap.from(stamp, {
          scale: 1.35,
          autoAlpha: 0,
          transformOrigin: '50% 50%',
          ease: 'power3.out',
          duration: 0.6,
          scrollTrigger: { trigger: stamp, start: 'top 80%' },
        });
      }
      root.dataset.ready = '';
    }, root);

    const sync = () => ScrollTrigger.update();
    window.lenis?.on('scroll', sync);
    return () => {
      window.lenis?.off('scroll', sync);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef} className="px-6 sm:px-10 lg:px-16">
      <style>{`
        @media (scripting: enabled) and (prefers-reduced-motion: no-preference) {
          [data-row] { clip-path: inset(0 100% 0 0); }
        }
      `}</style>
      <div className="mx-auto max-w-5xl">
        <div
          className="sticky top-16 z-10 grid grid-cols-[6.5rem_1fr_auto] gap-6 bg-near-black py-4 font-mono text-[11px] uppercase tracking-[0.22em] text-cream-200/45 sm:grid-cols-[9rem_1fr_auto] sm:top-20"
          aria-hidden="true"
        >
          <span>Date</span>
          <span>Entry</span>
          <span className="text-right">Realized</span>
        </div>

        <ol className="divide-y divide-cream-200/10">
          {ENTRIES.map((e, i) => (
            <li
              key={`${e.client}-${i}`}
              data-row={i}
              className="grid grid-cols-[6.5rem_1fr] items-baseline gap-x-6 gap-y-3 py-8 sm:grid-cols-[9rem_1fr_auto] sm:py-10"
            >
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-cream-200/55">{e.date}</span>
              <span className="text-lg text-cream-200/90 sm:text-xl">
                <span className="block font-mono text-[11px] uppercase tracking-[0.18em] text-copper-400">{e.client}</span>
                <span className="mt-1 block max-w-xl">{e.entry}</span>
              </span>
              <span
                data-amount
                className="col-start-2 font-display text-3xl font-bold tabular-nums tracking-tight text-copper-400 sm:col-start-3 sm:text-right sm:text-5xl"
              >
                {format(e.amount, e.amount.value)}
              </span>
            </li>
          ))}
        </ol>

        {/* The statement closes: the seal, stamped flat */}
        <div className="grid grid-cols-[6.5rem_1fr] items-center gap-6 py-16 sm:grid-cols-[9rem_1fr_auto] sm:py-24">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-cream-200/55">Carried forward</span>
          <span className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-cream-200 sm:text-6xl">
            Your business.
          </span>
          <svg
            data-stamp
            viewBox="0 0 512 512"
            width={SEAL_SIZE}
            height={SEAL_SIZE}
            className="col-start-2 sm:col-start-3 sm:justify-self-end"
            role="img"
            aria-label="The Zera seal"
          >
            <g transform="rotate(-8 256 256)">
              <circle cx={SEAL_CENTER} cy={SEAL_CENTER} r={SEAL_RADIUS} fill="#B87333" />
              <path d={SEAL_Z_PATH} fill="#050505" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
