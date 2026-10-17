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
 * The phone's glass, measured from the still: a 390 x 844 portrait surface mapped onto the four
 * corners of the screen (near-left, far-left, far-right, near-right in image pixels). The phone
 * lies with its top to the left, so the surface reads rotated, exactly as a phone on a desk does.
 */
const SCREEN = {
  w: 390,
  h: 844,
  matrix:
    'matrix3d(0.576504, -0.115979, 0, 5.16509e-05, 0.197037, 0.116234, 0, -0.00024982, 0, 0, 1, 0, 430.3, 428.5, 0, 1)',
  cx: 711,
  cy: 517,
  /** The glass is about 585px wide in the still; on a phone the stage is scaled so it fits. */
  glassWidth: 585,
};

const HERO_LINE = 'Zera catches the revenue your business is already losing.';

interface Event {
  time: string;
  app: string;
  title: string;
  text: string;
  line: string;
}

/**
 * A demonstration of one after-hours sale, the kind the systems Zera builds take every evening.
 * The amount is a real price: a general consultation on the booking page Zera built for
 * Finest Dietitian is GHS 600. The names and times are illustrative, and the page says so.
 */
const EVENTS: Event[] = [
  {
    time: '21:52',
    app: 'WhatsApp',
    title: 'Ama',
    text: 'Hi, do you have anything on Saturday afternoon?',
    line: 'An enquiry comes in after closing. This is the lead that usually goes unanswered.',
  },
  {
    time: '21:52',
    app: 'WhatsApp',
    title: 'Reply sent',
    text: 'Saturday 2:00 pm is open. You can book and pay here.',
    line: 'It’s answered at once, and nobody is at the desk.',
  },
  {
    time: '21:55',
    app: 'Bookings',
    title: 'New booking',
    text: 'Saturday, 2:00 pm. General consultation, 45 min.',
    line: 'Ama books Saturday at 2pm, on the booking page.',
  },
  {
    time: '21:56',
    app: 'Paystack',
    title: 'Payment received',
    text: 'GHS 600.00 from Ama',
    line: 'She pays GHS 600 before she puts the phone down.',
  },
];

/** Shared placement for the transcript and the closing: a column beside the phone on desktop. */
const SIDE_LAYER =
  'relative px-6 py-10 sm:px-10 lg:px-16 live:absolute live:inset-x-0 live:bottom-0 live:pt-0 live:pb-10 md:live:inset-x-auto md:live:top-1/2 md:live:right-10 md:live:bottom-auto md:live:w-[38vw] md:live:max-w-xl md:live:-translate-y-1/2 md:live:px-0 md:live:pb-0 lg:live:right-16';

export default function AfterHoursStage() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLHeadingElement>(null);

  // Fit the still: cover the stage when it is live, a 62svh band when motion is off, and on a
  // phone a band scaled so the whole phone stays in frame.
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const wrap = wrapRef.current;
    if (!stage || !wrap) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    const fit = () => {
      const vw = stage.clientWidth;
      const vh = reduced.matches ? Math.round(window.innerHeight * 0.62) : stage.clientHeight;
      const cover = Math.max(vw / IMG.w, vh / IMG.h);
      const band = SCREEN.glassWidth * cover > vw - 32;
      const k = band ? (vw - 32) / SCREEN.glassWidth : cover;
      const tx = band ? vw / 2 - SCREEN.cx * k : (vw - IMG.w * k) / 2;
      const ty = band ? 0 : (vh - IMG.h * k) / 2;
      wrap.style.transform = `translate(${tx}px, ${ty}px) scale(${k})`;
      stage.style.setProperty(
        '--band-h',
        band ? `${Math.round(IMG.h * k)}px` : reduced.matches ? `${vh}px` : '100%'
      );
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

  // The sale plays out on the phone as you scroll; the hero line types itself on load
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

      // 0 to 10 is the whole scroll. The line goes, the phone wakes, the sale lands, the point is made.
      tl.to(q('[data-hero-layer]'), { autoAlpha: 0, y: -24, duration: 0.8 }, 0.5);
      tl.to(q('[data-screen]'), { autoAlpha: 1, duration: 0.5 }, 1.0);
      tl.to(q('[data-glow]'), { autoAlpha: 0.9, duration: 0.7 }, 1.0);
      tl.to(q('[data-clock]'), { autoAlpha: 1, duration: 0.4 }, 1.1);

      EVENTS.forEach((_, i) => {
        const at = 2.0 + i * 1.7;
        tl.fromTo(q(`[data-card="${i}"]`), { autoAlpha: 0, x: -24 }, { autoAlpha: 1, x: 0, duration: 0.5 }, at);
        tl.fromTo(q(`[data-narr="${i}"]`), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.5 }, at + 0.1);
      });

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
    <section ref={sectionRef} className="relative live:h-[520vh]" aria-label="One sale, after hours">
      <div ref={stageRef} className="bg-near-black live:sticky live:top-0 live:h-svh live:overflow-hidden">
        {/* The still, scaled as one unit so the screen stays locked to the photograph */}
        <div className="relative h-[var(--band-h,62svh)] overflow-hidden live:absolute live:inset-x-0 live:top-0">
          <div
            ref={wrapRef}
            className="absolute top-0 left-0 origin-top-left will-change-transform"
            style={{ width: IMG.w, height: IMG.h }}
          >
            <Image
              src="/images/lab/after-hours-desk.jpg"
              alt="A phone face up on the desk of a beauty studio in Accra, after closing, its screen dark"
              width={IMG.w}
              height={IMG.h}
              priority
              sizes="100vw"
              className="block"
            />

            {/* The screen's light on the desk */}
            <div
              data-glow
              aria-hidden="true"
              className="pointer-events-none absolute mix-blend-screen live:invisible live:opacity-0"
              style={{
                left: SCREEN.cx - 640,
                top: SCREEN.cy - 640,
                width: 1280,
                height: 1280,
                background:
                  'radial-gradient(closest-side, rgba(255, 221, 190, 0.5), rgba(255, 221, 190, 0.18) 38%, rgba(255, 221, 190, 0) 70%)',
              }}
            />

            {/* The live surface, mapped onto the glass */}
            <div
              data-screen
              aria-hidden="true"
              className="absolute top-0 left-0 overflow-hidden text-cream-200 live:invisible live:opacity-0"
              style={{
                width: SCREEN.w,
                height: SCREEN.h,
                transform: SCREEN.matrix,
                transformOrigin: '0 0',
                borderRadius: 46,
                background: 'linear-gradient(180deg, #1a1210 0%, #0b0908 55%, #070605 100%)',
              }}
            >
              <div data-clock className="pt-24 text-center live:invisible live:opacity-0">
                <p className="text-[22px] tracking-wide text-cream-200/80">Tuesday</p>
                <p className="font-display text-[110px] font-bold leading-none tracking-tight">21:52</p>
              </div>
              <ol className="mt-10 space-y-3 px-4">
                {EVENTS.map((e, i) => (
                  <li
                    key={i}
                    data-card={i}
                    className="rounded-[22px] bg-cream-200/10 px-4 py-3.5 backdrop-blur-md live:invisible live:opacity-0"
                  >
                    <div className="flex items-baseline justify-between text-[13px] text-cream-200/60">
                      <span className="uppercase tracking-[0.14em]">{e.app}</span>
                      <span>{e.time}</span>
                    </div>
                    <p className="mt-1 text-[17px] font-bold leading-tight">{e.title}</p>
                    <p className="mt-0.5 text-[16px] leading-snug text-cream-200/85">{e.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* The desk sinks into the sheet */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-near-black via-near-black/70 to-transparent"
          />
        </div>

        {/* The hero line, over the dark desk */}
        <div
          data-hero-layer
          className="relative px-6 pt-10 pb-10 sm:px-10 lg:px-16 live:absolute live:inset-x-0 live:bottom-0 live:pt-0 lg:live:pb-16"
        >
          <h1
            ref={heroRef}
            className="max-w-[18ch] font-display text-[9.5vw] font-bold leading-[0.98] tracking-tight text-cream-200 sm:text-[6vw] lg:text-[4.6vw]"
          >
            {HERO_LINE}
          </h1>
          <p className="mt-6 max-w-md text-base text-cream-200/70 sm:text-lg">
            The lead that goes unanswered, the customer who quietly stops buying. Scroll to watch the
            first one get caught.
          </p>
          <Link
            href="/systems-audit"
            className="mt-7 inline-flex min-h-[48px] w-fit items-center bg-copper-600 px-7 font-medium uppercase tracking-brand-label text-white transition-colors hover:bg-copper-700"
          >
            Book your systems audit
          </Link>
        </div>

        {/* The transcript: what the phone is doing, in words a visitor can read */}
        <ol data-narration className={`${SIDE_LAYER} space-y-4`}>
          {EVENTS.map((e, i) => (
            <li
              key={i}
              data-narr={i}
              className="grid grid-cols-[4.5rem_1fr] items-baseline gap-4 live:invisible live:opacity-0"
            >
              <span className="font-mono text-xs tracking-[0.16em] text-copper-400">{e.time}</span>
              <span className="text-xl leading-snug text-cream-200 sm:text-2xl lg:text-[1.75rem]">{e.line}</span>
            </li>
          ))}
        </ol>

        {/* The point */}
        <div data-closing className={`${SIDE_LAYER} live:invisible live:opacity-0`}>
          <p className="font-display text-4xl font-bold leading-[1.02] tracking-tight text-cream-200 sm:text-5xl lg:text-6xl">
            Nobody was awake for this.
          </p>
          <p className="mt-6 max-w-md text-lg text-cream-200/75 sm:text-xl">
            Zera builds the system that catches that lead, and the customer who quietly stops buying,
            then proves it every month in real numbers. In one client’s last cohort, 70% of payments
            came in outside working hours: before 8am, after 9pm or at the weekend. Not one was missed.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-cream-200/40">
            The sale above is a demonstration. GHS 600 is a real price from a booking page Zera built.
          </p>
        </div>
      </div>
    </section>
  );
}
