'use client';

import { useLayoutEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';
import { SEAL_CENTER, SEAL_RADIUS, SEAL_Z_PATH } from '@/lib/seal-geometry';

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const INK = '#B87333';
const SHEET = '#050505';
const LABEL = '#F3E9DC';

/** Where each stage starts on the 0..1 scroll timeline; the last entry is the end. */
const STAGE_BOUNDS = [0, 0.12, 0.27, 0.42, 0.58, 0.72, 0.87, 1];

const STAGES = [
  {
    eyebrow: 'Sheet 01 of 05 · The plan',
    title: 'A revenue system, drawn.',
    line: 'Every business has one, whether anyone drew it or not. This is the one Zera builds, room by room.',
  },
  {
    eyebrow: 'Room 01 · Entrance',
    title: 'A front door people find.',
    line: 'Your website, built to be found and built to take the enquiry.',
  },
  {
    eyebrow: 'Room 02 · Reception',
    title: 'Every enquiry answered.',
    line: 'At 11pm, on a Sunday, while you sleep. Nothing waits until Monday.',
  },
  {
    eyebrow: 'Rooms 03 and 04 · Booking, Payments',
    title: 'Booked and paid, hands off.',
    line: 'Card, mobile money or cash. One record for every payment.',
  },
  {
    eyebrow: 'Room 05 · Follow-up',
    title: 'Follow-up that sends itself.',
    line: 'The message after the sale. The reminder before the appointment.',
  },
  {
    eyebrow: 'Room 06 · Return',
    title: 'Customers brought back.',
    line: 'Past buyers invited back at the right moment. The loop that pays for the rest.',
  },
  {
    eyebrow: 'Issued',
    title: 'Revenue, Realized.',
    line: 'Proved every month, in real numbers.',
  },
];

const SEAL_SIZE = 150;
const SEAL_SCALE = SEAL_SIZE / 512;

export default function BlueprintStage() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.8 },
      });

      STAGES.forEach((_, i) => {
        const a = STAGE_BOUNDS[i];
        const d = STAGE_BOUNDS[i + 1] - a;
        const ink = section.querySelectorAll<SVGElement>(`[data-s="${i}"] .ink`);
        const fills = section.querySelectorAll<SVGElement>(`[data-s="${i}"] .fill`);
        const route = section.querySelectorAll<SVGElement>(`[data-s="${i}"] .route`);
        const stamp = section.querySelector<SVGElement>(`[data-s="${i}"] .stamp`);
        const text = section.querySelector<HTMLElement>(`[data-stage-text="${i}"]`);

        if (ink.length) {
          tl.from(ink, { drawSVG: '0%', duration: d * 0.5, stagger: (d * 0.3) / Math.max(ink.length - 1, 1) }, a);
        }
        if (fills.length) tl.from(fills, { autoAlpha: 0, duration: d * 0.25 }, a + d * 0.45);
        if (route.length) tl.from(route, { drawSVG: '0%', duration: d * 0.4 }, a + d * 0.55);
        if (stamp) {
          tl.from(
            stamp,
            { scale: 1.35, autoAlpha: 0, transformOrigin: '50% 50%', duration: d * 0.45, ease: 'power3.out' },
            a + d * 0.2
          );
        }
        if (text) {
          if (i > 0) tl.fromTo(text, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: d * 0.25 }, a);
          if (i < STAGES.length - 1) tl.to(text, { autoAlpha: 0, y: -28, duration: d * 0.15 }, a + d * 0.85);
        }
      });

      section.dataset.ready = '';
    }, section);

    const sync = () => ScrollTrigger.update();
    window.lenis?.on('scroll', sync);
    return () => {
      window.lenis?.off('scroll', sync);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="The revenue system, drawn room by room"
      className="relative h-[720vh] motion-reduce:h-auto"
    >
      <style>{`
        @media (scripting: enabled) and (prefers-reduced-motion: no-preference) {
          [data-stage-text]:not([data-stage-text="0"]) { visibility: hidden; }
          [data-ready] [data-stage-text] { visibility: visible; }
        }
      `}</style>
      <div className="sticky top-0 grid h-svh grid-rows-[50svh_1fr] md:grid-cols-[1.15fr_1fr] md:grid-rows-none motion-reduce:static motion-reduce:h-auto motion-reduce:grid-cols-1 motion-reduce:grid-rows-none">
        <div className="flex items-center justify-center p-3 pt-20 md:p-10 md:pt-24">
          <svg
            viewBox="0 0 1000 1000"
            className="h-auto max-h-full w-full max-w-[86svh]"
            role="img"
            aria-label="Floor plan of a revenue system: entrance, reception, booking, payments, follow-up and return, arranged around a courtyard stamped with the Zera seal"
            fill="none"
            stroke={INK}
            strokeWidth={1.6}
            strokeLinecap="square"
          >
            <defs>
              <pattern id="hatch" patternUnits="userSpaceOnUse" width="10" height="10">
                <path d="M0 10 L10 0" stroke={INK} strokeWidth={0.7} strokeOpacity={0.7} />
              </pattern>
              <mask id="route-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1000" height="1000">
                <g stroke="#fff" strokeWidth={12} strokeLinecap="butt" strokeLinejoin="miter">
                  <g data-s="1"><path className="route" d="M250 985 V750" /></g>
                  <g data-s="2"><path className="route" d="M250 750 H500" /></g>
                  <g data-s="3"><path className="route" d="M500 750 H744 V500" /></g>
                  <g data-s="4"><path className="route" d="M744 500 V256" /></g>
                  <g data-s="5"><path className="route" d="M744 256 H250 V736" /></g>
                </g>
              </mask>
            </defs>

            {/* Sheet 0: the outer walls, drawn from the front door around the building, and the dimensions */}
            <g data-s="0">
              <path className="ink" d="M220 880 H120 V120 H880 V880 H280" strokeWidth={2} />
              <path className="ink" d="M220 868 H132 V132 H868 V868 H280" />
              <path className="ink" d="M220 868 V880 M280 868 V880" />
              <g className="fill" fill="url(#hatch)" stroke="none">
                <rect x="120" y="120" width="760" height="12" />
                <rect x="120" y="132" width="12" height="736" />
                <rect x="868" y="132" width="12" height="736" />
                <rect x="120" y="868" width="100" height="12" />
                <rect x="280" y="868" width="600" height="12" />
              </g>
              {/* Dimensions: the three tiers' durations */}
              <g strokeWidth={1} strokeOpacity={0.8}>
                <path className="ink" d="M120 890 V948 M880 890 V948 M120 940 H880" />
                <path className="ink" d="M114 946 L126 934 M874 946 L886 934" />
                <path className="ink" d="M890 120 H948 M890 880 H948 M940 120 V880" />
                <path className="ink" d="M934 126 L946 114 M934 886 L946 874" />
                <path className="ink" d="M120 110 V52 M880 110 V52 M120 60 H880" />
                <path className="ink" d="M114 66 L126 54 M874 66 L886 54" />
              </g>
              <g className="fill" fill={LABEL} stroke="none" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="20" letterSpacing="3">
                <text x="500" y="978" textAnchor="middle">180 DAYS</text>
                <text x="500" y="44" textAnchor="middle">365 DAYS</text>
                <text x="966" y="500" textAnchor="middle" transform="rotate(90 966 500)">180 DAYS</text>
              </g>
            </g>

            {/* Room 01: Entrance */}
            <g data-s="1">
              <path className="ink" d="M220 868 V808" />
              <path className="ink" d="M220 808 A60 60 0 0 1 280 868" strokeDasharray="3 5" />
              <g className="fill" fill={LABEL} stroke="none" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="22" letterSpacing="2">
                <text x="154" y="660" fillOpacity={0.55}>01</text>
                <text x="154" y="688">ENTRANCE</text>
              </g>
            </g>

            {/* Room 02: Reception */}
            <g data-s="2">
              <path className="ink" d="M380 620 V720 M380 780 V868" />
              <path className="ink" d="M380 720 H440" />
              <path className="ink" d="M440 720 A60 60 0 0 1 380 780" strokeDasharray="3 5" />
              <g className="fill" fill={LABEL} stroke="none" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="22" letterSpacing="2">
                <text x="402" y="660" fillOpacity={0.55}>02</text>
                <text x="402" y="688">RECEPTION</text>
              </g>
            </g>

            {/* Rooms 03 and 04: Booking, Payments, and the courtyard they wrap */}
            <g data-s="3">
              <path className="ink" d="M620 620 V720 M620 780 V868" />
              <path className="ink" d="M620 720 H680" />
              <path className="ink" d="M680 720 A60 60 0 0 1 620 780" strokeDasharray="3 5" />
              <path className="ink" d="M380 620 V380 H620 V620 Z" />
              <path className="ink" d="M620 620 H720 M780 620 H868" />
              <path className="ink" d="M720 620 V560" />
              <path className="ink" d="M720 560 A60 60 0 0 1 780 620" strokeDasharray="3 5" />
              <g className="fill" fill={LABEL} stroke="none" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="22" letterSpacing="2">
                <text x="642" y="660" fillOpacity={0.55}>03</text>
                <text x="642" y="688">BOOKING</text>
                <text x="642" y="420" fillOpacity={0.55}>04</text>
                <text x="642" y="448">PAYMENTS</text>
              </g>
            </g>

            {/* Room 05: Follow-up */}
            <g data-s="4">
              <path className="ink" d="M620 380 H720 M780 380 H868" />
              <path className="ink" d="M720 380 V320" />
              <path className="ink" d="M720 320 A60 60 0 0 1 780 380" strokeDasharray="3 5" />
              <g className="fill" fill={LABEL} stroke="none" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="22" letterSpacing="2">
                <text x="642" y="172" fillOpacity={0.55}>05</text>
                <text x="642" y="200">FOLLOW-UP</text>
              </g>
            </g>

            {/* Room 06: Return, and the way back to the door */}
            <g data-s="5">
              <path className="ink" d="M620 132 V220 M620 280 V380" />
              <path className="ink" d="M620 220 H560" />
              <path className="ink" d="M560 220 A60 60 0 0 0 620 280" strokeDasharray="3 5" />
              <path className="ink" d="M132 380 H220 M280 380 H380" />
              <path className="ink" d="M220 380 V440" />
              <path className="ink" d="M220 440 A60 60 0 0 0 280 380" strokeDasharray="3 5" />
              <path className="ink" d="M132 620 H220 M280 620 H380" />
              <path className="ink" d="M220 620 V680" />
              <path className="ink" d="M220 680 A60 60 0 0 0 280 620" strokeDasharray="3 5" />
              <g className="fill" fill={LABEL} stroke="none" fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace" fontSize="22" letterSpacing="2">
                <text x="154" y="172" fillOpacity={0.55}>06</text>
                <text x="154" y="200">RETURN</text>
                <text x="166" y="500" fontSize="16" fillOpacity={0.7} textAnchor="middle" transform="rotate(-90 166 500)">THE WAY BACK</text>
              </g>
              <path className="fill" d="M236 722 L250 738 L264 722" strokeWidth={2} />
            </g>

            {/* The lead's route through the building, revealed by the mask as each room is drawn */}
            <path
              d="M250 985 V750 H744 V256 H250 V736"
              stroke={INK}
              strokeWidth={2.4}
              strokeDasharray="10 8"
              strokeLinejoin="miter"
              mask="url(#route-mask)"
            />

            {/* Issued: the seal, stamped flat into the courtyard */}
            <g data-s="6">
              <g className="stamp" transform={`translate(${500 - SEAL_SIZE / 2} ${500 - SEAL_SIZE / 2}) rotate(-8 ${SEAL_SIZE / 2} ${SEAL_SIZE / 2}) scale(${SEAL_SCALE})`} stroke="none">
                <circle cx={SEAL_CENTER} cy={SEAL_CENTER} r={SEAL_RADIUS} fill={INK} />
                <path d={SEAL_Z_PATH} fill={SHEET} />
              </g>
            </g>
          </svg>
        </div>

        <div className="relative flex items-center px-6 md:pr-16 lg:pr-24 motion-reduce:block motion-reduce:py-16">
          {STAGES.map((stage, i) => (
            <div
              key={stage.eyebrow}
              data-stage-text={i}
              className="absolute inset-x-6 top-1/2 -translate-y-1/2 md:inset-x-0 md:pr-16 lg:pr-24 motion-reduce:static motion-reduce:mb-16 motion-reduce:translate-y-0"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-copper-400 sm:text-xs">{stage.eyebrow}</p>
              <h2 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-tight text-cream-200 sm:text-5xl lg:text-6xl">
                {stage.title}
              </h2>
              <p className="mt-4 max-w-md text-base text-cream-200/70 sm:text-lg">{stage.line}</p>
              {i === STAGES.length - 1 && (
                <Link
                  href="/systems-audit"
                  className="mt-8 inline-flex min-h-[48px] w-fit items-center bg-copper-600 px-7 font-medium uppercase tracking-brand-label text-white transition-colors hover:bg-copper-700"
                >
                  Book your systems audit
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
