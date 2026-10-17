'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useProgress } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);

const Scene = dynamic(() => import('./Scene'), { ssr: false });

const HERO_LINE = 'Zera catches the revenue your business is already losing.';

interface Event {
  day: string;
  time: string;
  line: string;
}

/**
 * One month of a business Zera runs, as a demonstration. The screens show real pages Zera built
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
  'relative z-10 px-6 py-10 sm:px-10 lg:px-16 live:absolute live:inset-x-0 live:bottom-0 live:pt-0 live:pb-10 lg:live:pb-14 md:live:max-w-[46vw]';

function canRunScene() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

export default function EveryMonthStage() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLHeadingElement>(null);
  const progress = useRef(0);
  const [mode, setMode] = useState<'pending' | 'scene' | 'still'>('pending');
  const [active, setActive] = useState(true);
  const [isPhone, setIsPhone] = useState(false);
  const [ready, setReady] = useState(false);
  const loading = useProgress();

  // Decide once, on the client: the live scene, or the still with everything stacked
  useLayoutEffect(() => {
    setMode(canRunScene() ? 'scene' : 'still');
    const phone = window.matchMedia('(max-width: 767px)');
    setIsPhone(phone.matches);
    const onChange = () => setIsPhone(phone.matches);
    phone.addEventListener('change', onChange);
    return () => phone.removeEventListener('change', onChange);
  }, []);

  // Only render the scene while the stage is on screen
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || mode !== 'scene') return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0 });
    io.observe(stage);
    return () => io.disconnect();
  }, [mode]);

  // The scroll drives both the words and the scene; the hero line types itself on load
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const hero = heroRef.current;
    if (!section || !hero || mode !== 'scene') return;

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
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          onUpdate: (self) => {
            progress.current = self.progress;
          },
        },
      });

      // 0 to 10 is the whole scroll; the scene’s camera and screens follow the same progress.
      tl.to(q('[data-hero-layer]'), { autoAlpha: 0, y: -24, duration: 0.8 }, 0.5);
      const narr = (i: number, at: number, out: number) => {
        tl.fromTo(q(`[data-narr="${i}"]`), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.5 }, at);
        tl.to(q(`[data-narr="${i}"]`), { autoAlpha: 0, y: -12, duration: 0.3 }, out);
      };
      narr(0, 2.0, 3.4);
      narr(1, 4.2, 5.4);
      narr(2, 6.2, 7.2);
      narr(3, 7.7, 8.9);
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
  }, [mode]);

  const onReady = useCallback(() => setReady(true), []);
  const live = mode === 'scene';

  return (
    <section
      ref={sectionRef}
      className="relative live:h-[560vh]"
      aria-label="One month of a business Zera runs"
      data-mode={mode}
      data-scene-ready={ready ? '' : undefined}
    >
      <div ref={stageRef} className="relative bg-near-black live:sticky live:top-0 live:h-svh live:overflow-hidden">
        {/* The counter: the live scene, with the still behind it until the scene is ready */}
        <div className="relative h-[62svh] overflow-hidden live:absolute live:inset-0 live:h-auto">
          <Image
            src="/images/lab/every-month-counter.jpg"
            alt="The reception counter of a beauty studio in Accra after closing: a laptop and a phone asleep beside the studio’s printed cards"
            fill
            priority
            sizes="100vw"
            className={`object-cover object-[38%_40%] transition-opacity duration-700 ${ready ? 'opacity-0' : 'opacity-100'}`}
          />
          {live && (
            <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? 'opacity-100' : 'opacity-0'}`}>
              <Scene progress={progress} active={active} isPhone={isPhone} onReady={onReady} />
            </div>
          )}
          {/* The counter sinks into the sheet */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-near-black via-near-black/60 to-transparent"
          />
        </div>

        {/* Real progress while the scene loads */}
        {live && !ready && (
          <div aria-hidden="true" className="absolute inset-x-0 top-0 z-20 h-[2px] bg-cream-200/10">
            <div className="h-full bg-copper-500 transition-[width] duration-300" style={{ width: `${Math.round(loading.progress)}%` }} />
          </div>
        )}

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

        {/* The transcript: what the system is doing, one entry at a time */}
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
