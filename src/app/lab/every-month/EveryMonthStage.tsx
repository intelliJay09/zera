'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** The rendered still, in its own pixel space. Everything on the stage is placed in these units. */
const IMG = { w: 1680, h: 945 };

/**
 * The two screens on the counter, measured from the still. Each is a flat surface in its own
 * logical size, mapped onto the four corners of the glass in image pixels, so what plays on it
 * sits in the photograph with the right perspective.
 */
const LAPTOP = {
  w: 1440,
  h: 810,
  matrix: 'matrix3d(0.325, 0, 0, 0, -0.0477917, 0.318467, 0, -2.58278e-05, 0, 0, 1, 0, 306, 212, 0, 1)',
  cx: 526,
  cy: 346,
};
const PHONE = {
  w: 390,
  h: 844,
  matrix:
    'matrix3d(0.223407, -0.0459948, 0, -0.000103024, -0.297838, -0.0653621, 0, -0.000223471, 0, 0, 1, 0, 937, 542, 0, 1)',
  cx: 963,
  cy: 574,
};
/** The subject spans from the laptop's left edge to the phone's right edge; a phone keeps it whole. */
const SUBJECT = { left: 273, right: 1067 };

const HERO_LINE = 'Zera catches the revenue your business is already losing.';

interface Event {
  day: string;
  time: string;
  line: string;
}

/**
 * One month of a business Zera runs, as a demonstration. The screens are real pages Zera built
 * for clients; the names and dates are illustrative, and the page says so.
 */
const EVENTS: Event[] = [
  {
    day: '3rd',
    time: '07:40',
    line: 'The website takes a booking before the studio opens. Ama picks Saturday at 2pm and pays GHS 600.',
  },
  {
    day: '9th',
    time: '12:15',
    line: 'The opening invitations go out with a QR code, and the RSVPs count themselves.',
  },
  {
    day: '21st',
    time: '18:05',
    line: 'A client who went quiet six weeks ago gets a message from the studio. She rebooks that evening.',
  },
  {
    day: '30th',
    time: '09:00',
    line: 'The month’s report lands, in real numbers, so nobody has to take Zera’s word for it.',
  },
];

/** The hero line, the transcript and the closing all sit over the dark counter, bottom left. */
const TEXT_LAYER =
  'relative px-6 py-10 sm:px-10 lg:px-16 live:absolute live:inset-x-0 live:bottom-0 live:pt-0 live:pb-10 lg:live:pb-14 md:live:max-w-[46vw]';

export default function EveryMonthStage() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLHeadingElement>(null);

  // Fit the still: cover the stage when it is live, a 62svh band when motion is off, and on a
  // phone a band scaled so both screens stay in frame.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const wrap = wrapRef.current;
    if (!stage || !wrap) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const subjectW = SUBJECT.right - SUBJECT.left;
    const subjectCx = (SUBJECT.left + SUBJECT.right) / 2;

    const fit = () => {
      const vw = stage.clientWidth;
      const vh = reduced.matches ? Math.round(window.innerHeight * 0.62) : stage.clientHeight;
      // Top-aligned, covering the width and at least four fifths of the height, so the dark
      // counter runs out into the sheet and the words sit below the screens, never over them.
      const cover = Math.max(vw / IMG.w, (reduced.matches ? 1 : 0.8) * (vh / IMG.h));
      const band = subjectW * cover > vw - 32;
      const k = band ? (vw - 32) / subjectW : cover;
      const tx = band ? vw / 2 - subjectCx * k : (vw - IMG.w * k) / 2;
      const imgH = Math.round(IMG.h * k);
      wrap.style.transform = `translate(${tx}px, 0px) scale(${k})`;
      stage.style.setProperty('--band-h', `${reduced.matches ? Math.min(imgH, vh) : imgH}px`);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(stage);
    reduced.addEventListener('change', fit);
    return () => {
      ro.disconnect();
      reduced.removeEventListener('change', fit);
    };
  }, []);

  // The month plays out on the two screens as you scroll; the hero line types itself on load
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const hero = heroRef.current;
    if (!section || !hero) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const full = hero.textContent ?? '';
      const typed = { n: 0 };
      hero.textContent = '';
      gsap.to(typed, {
        n: full.length,
        duration: 1.6,
        delay: 0.3,
        ease: 'none',
        onUpdate: () => {
          const n = Math.round(typed.n);
          hero.innerHTML = `${full.slice(0, Math.max(0, n - 1))}<span class="text-copper-400">${full.slice(Math.max(0, n - 1), n)}</span>`;
        },
        onComplete: () => {
          hero.textContent = full;
        },
      });

      const q = gsap.utils.selector(section);
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      });

      // 0 to 10 is the whole scroll: the line goes, the laptop wakes, the month lands, the point is made.
      tl.to(q('[data-hero-layer]'), { autoAlpha: 0, y: -24, duration: 0.8 }, 0.5);

      // 3rd: the booking page, then its confirmation
      tl.to(q('[data-laptop]'), { autoAlpha: 1, duration: 0.5 }, 1.0);
      tl.to(q('[data-glow="laptop"]'), { autoAlpha: 0.85, duration: 0.7 }, 1.0);
      tl.fromTo(q('[data-card="0"]'), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 1.8);
      tl.fromTo(q('[data-narr="0"]'), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 1.9);
      tl.to(q('[data-narr="0"]'), { autoAlpha: 0, y: -12, duration: 0.3 }, 3.5);

      // 9th: the RSVP page
      tl.to(q('[data-lap="0"]'), { autoAlpha: 0, duration: 0.4 }, 3.4);
      tl.fromTo(q('[data-lap="1"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 3.4);
      tl.fromTo(q('[data-card="1"]'), { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 3.9);
      tl.fromTo(q('[data-narr="1"]'), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 4.0);
      tl.to(q('[data-narr="1"]'), { autoAlpha: 0, y: -12, duration: 0.3 }, 5.4);

      // 21st: the phone, a quiet client brought back
      tl.to(q('[data-phone]'), { autoAlpha: 1, duration: 0.4 }, 5.4);
      tl.to(q('[data-glow="phone"]'), { autoAlpha: 0.8, duration: 0.6 }, 5.4);
      tl.fromTo(q('[data-card="2"]'), { autoAlpha: 0, x: -16 }, { autoAlpha: 1, x: 0, duration: 0.5 }, 5.8);
      tl.fromTo(q('[data-narr="2"]'), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 5.9);
      tl.to(q('[data-narr="2"]'), { autoAlpha: 0, y: -12, duration: 0.3 }, 7.2);

      // 30th: the report
      tl.to(q('[data-lap="1"]'), { autoAlpha: 0, duration: 0.4 }, 7.2);
      tl.fromTo(q('[data-lap="2"]'), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, 7.2);
      tl.fromTo(q('[data-narr="3"]'), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 7.6);

      tl.to(q('[data-narration]'), { autoAlpha: 0, y: -18, duration: 0.6 }, 8.9);
      tl.fromTo(q('[data-closing]'), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 9.2);
      tl.to({}, { duration: 0.1 }, 9.9);

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
    <section ref={sectionRef} className="relative live:h-[560vh]" aria-label="One month of a business Zera runs">
      <div ref={stageRef} className="bg-near-black live:sticky live:top-0 live:h-svh live:overflow-hidden">
        {/* The still, scaled as one unit so both screens stay locked to the photograph */}
        <div className="relative h-[var(--band-h,62svh)] overflow-hidden live:absolute live:inset-x-0 live:top-0">
          <div
            ref={wrapRef}
            className="absolute top-0 left-0 origin-top-left will-change-transform"
            style={{ width: IMG.w, height: IMG.h }}
          >
            <Image
              src="/images/lab/every-month-counter.jpg"
              alt="The reception counter of a beauty studio in Accra after closing: a laptop and a phone asleep beside the studio’s printed cards"
              width={IMG.w}
              height={IMG.h}
              priority
              sizes="100vw"
              className="block"
            />

            {/* The screens’ light on the counter */}
            <div
              data-glow="laptop"
              aria-hidden="true"
              className="pointer-events-none absolute mix-blend-screen live:invisible live:opacity-0"
              style={{
                left: LAPTOP.cx - 760,
                top: LAPTOP.cy - 560,
                width: 1520,
                height: 1400,
                background:
                  'radial-gradient(closest-side, rgba(255, 228, 205, 0.42), rgba(255, 228, 205, 0.14) 40%, rgba(255, 228, 205, 0) 70%)',
              }}
            />
            <div
              data-glow="phone"
              aria-hidden="true"
              className="pointer-events-none absolute mix-blend-screen live:invisible live:opacity-0"
              style={{
                left: PHONE.cx - 420,
                top: PHONE.cy - 420,
                width: 840,
                height: 840,
                background:
                  'radial-gradient(closest-side, rgba(255, 221, 190, 0.5), rgba(255, 221, 190, 0.16) 40%, rgba(255, 221, 190, 0) 70%)',
              }}
            />

            {/* The laptop: three real pages, one after another */}
            <div
              data-laptop
              aria-hidden="true"
              className="absolute top-0 left-0 overflow-hidden bg-[#0b0908] live:invisible live:opacity-0"
              style={{ width: LAPTOP.w, height: LAPTOP.h, transform: LAPTOP.matrix, transformOrigin: '0 0' }}
            >
              {/* 3rd: the booking page */}
              <div data-lap="0" className="absolute inset-0">
                <Image
                  src="/images/case-studies/finest-dietitian/booking.webp"
                  alt=""
                  width={1600}
                  height={1000}
                  className="h-full w-full object-cover object-top"
                />
                <div
                  data-card="0"
                  className="absolute right-16 bottom-16 w-[820px] bg-near-black px-12 py-10 text-cream-200 shadow-2xl live:invisible live:opacity-0"
                >
                  <p className="font-mono text-[26px] uppercase tracking-[0.2em] text-copper-400">Booking confirmed</p>
                  <p className="mt-4 text-[60px] font-bold leading-tight">Saturday, 2:00 pm</p>
                  <p className="mt-2 text-[40px] text-cream-200/80">General consultation · GHS 600 paid</p>
                </div>
              </div>

              {/* 9th: the RSVP page */}
              <div data-lap="1" className="absolute inset-0 live:invisible live:opacity-0">
                <Image
                  src="/images/case-studies/allure-bloom/rsvp.webp"
                  alt=""
                  width={1600}
                  height={1420}
                  className="h-full w-full object-cover object-top"
                />
                <div
                  data-card="1"
                  className="absolute right-16 bottom-16 w-[820px] bg-near-black px-12 py-10 text-cream-200 shadow-2xl live:invisible live:opacity-0"
                >
                  <p className="font-mono text-[26px] uppercase tracking-[0.2em] text-copper-400">RSVP received</p>
                  <p className="mt-4 text-[60px] font-bold leading-tight">Grand opening, 17 October</p>
                  <p className="mt-2 text-[40px] text-cream-200/80">Counted. Nobody had to reply by hand.</p>
                </div>
              </div>

              {/* 30th: the report */}
              <div data-lap="2" className="absolute inset-0 bg-near-black px-24 py-20 text-cream-200 live:invisible live:opacity-0">
                <p className="font-mono text-[22px] uppercase tracking-[0.22em] text-copper-400">Revenue system report · October</p>
                <p className="mt-8 font-display text-[88px] font-bold leading-[1.02] tracking-tight">What the system caught this month.</p>
                <dl className="mt-16 grid grid-cols-3 gap-12">
                  {[
                    ['Bookings taken', '1'],
                    ['Customers brought back', '1'],
                    ['Revenue caught', 'GHS 600'],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-mono text-[20px] uppercase tracking-[0.18em] text-cream-200/50">{k}</dt>
                      <dd className="mt-3 font-display text-[72px] font-bold leading-none tabular-nums">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-16 font-mono text-[18px] uppercase tracking-[0.18em] text-cream-200/40">
                  The figures above are the events of this demonstration, added up.
                </p>
              </div>
            </div>

            {/* The phone: a quiet client, brought back */}
            <div
              data-phone
              aria-hidden="true"
              className="absolute top-0 left-0 overflow-hidden text-cream-200 live:invisible live:opacity-0"
              style={{
                width: PHONE.w,
                height: PHONE.h,
                transform: PHONE.matrix,
                transformOrigin: '0 0',
                borderRadius: 46,
                background: 'linear-gradient(180deg, #1a1210 0%, #0b0908 55%, #070605 100%)',
              }}
            >
              <div className="pt-16 text-center">
                <p className="text-[22px] tracking-wide text-cream-200/80">Tuesday 21st</p>
                <p className="font-display text-[110px] font-bold leading-none tracking-tight">18:05</p>
              </div>
              <div
                data-card="2"
                className="mx-4 mt-10 rounded-[22px] bg-cream-200/10 px-4 py-3.5 backdrop-blur-md live:invisible live:opacity-0"
              >
                <div className="flex items-baseline justify-between text-[13px] text-cream-200/60">
                  <span className="uppercase tracking-[0.14em]">WhatsApp</span>
                  <span>18:05</span>
                </div>
                <p className="mt-1 text-[17px] font-bold leading-tight">The studio</p>
                <p className="mt-0.5 text-[16px] leading-snug text-cream-200/85">
                  Hi Efua, it has been six weeks since your last visit. Saturday at 11am is open if you want it.
                </p>
              </div>
            </div>
          </div>

          {/* The counter sinks into the sheet */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-near-black via-near-black/70 to-transparent"
          />
        </div>

        {/* The hero line, over the dark counter */}
        <div data-hero-layer className={TEXT_LAYER}>
          <h1
            ref={heroRef}
            className="max-w-[24ch] font-display text-[9.5vw] font-bold leading-[0.98] tracking-tight text-cream-200 sm:text-[6vw] lg:text-[3.6vw]"
          >
            {HERO_LINE}
          </h1>
          <p className="mt-6 max-w-lg text-base text-cream-200/70 sm:text-lg">
            The lead that goes unanswered, the customer who quietly stops buying. Scroll through one
            month of a business Zera runs.
          </p>
          <Link
            href="/systems-audit"
            className="mt-7 inline-flex min-h-[48px] w-fit items-center bg-copper-600 px-7 font-medium uppercase tracking-brand-label text-white transition-colors hover:bg-copper-700"
          >
            Book your systems audit
          </Link>
        </div>

        {/* The transcript: what the system is doing, in words a visitor can read */}
        <ol data-narration className={`${TEXT_LAYER} space-y-4 live:space-y-0`}>
          {EVENTS.map((e, i) => (
            <li
              key={i}
              data-narr={i}
              className="grid grid-cols-[4.5rem_1fr] items-baseline gap-4 live:invisible live:opacity-0 live:absolute live:right-6 live:bottom-10 live:left-6 sm:live:right-10 sm:live:left-10 lg:live:right-16 lg:live:bottom-14 lg:live:left-16"
            >
              <span className="font-mono text-xs tracking-[0.16em] text-copper-400">
                {e.day}
                <span className="block text-cream-200/40">{e.time}</span>
              </span>
              <span className="text-xl leading-snug text-cream-200 sm:text-2xl lg:text-[1.75rem]">{e.line}</span>
            </li>
          ))}
        </ol>

        {/* The point */}
        <div data-closing className={`${TEXT_LAYER} live:invisible live:opacity-0`}>
          <p className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-cream-200 sm:text-5xl lg:text-6xl">
            Zera proves it every month.
          </p>
          <p className="mt-6 max-w-lg text-lg text-cream-200/75 sm:text-xl">
            Every client gets a report of what the system caught: the bookings, the payments, the
            customers brought back. In one client’s last cohort, 70% of payments came in outside working
            hours, and not one was missed.
          </p>
          <p className="mt-4 max-w-lg font-mono text-[11px] uppercase tracking-[0.18em] text-cream-200/40">
            This month is a demonstration on real pages Zera built for clients. GHS 600 is a real price from
            the Finest Dietitian booking page. The follow-up message is sent by Orella, Zera’s own software.
          </p>
        </div>
      </div>
    </section>
  );
}
