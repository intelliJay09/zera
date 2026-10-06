'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { CompanyStat } from '@/data/company-stats';

function AnimatedCounter({ target, suffix }: { target: string; suffix: string }) {
  const [count, setCount] = useState(0);
  // A ref, not state: flipping it must not re-run the effect and cancel the running count
  const hasAnimatedRef = useRef(false);
  const ref = useRef<HTMLParagraphElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const reduceMotionRef = useRef(reduceMotion);
  reduceMotionRef.current = reduceMotion;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (hasAnimatedRef.current || !entries[0].isIntersecting) return;

        hasAnimatedRef.current = true;
        observer.disconnect();
        const targetNum = parseFloat(target);

        if (reduceMotionRef.current) {
          setCount(targetNum);
          return;
        }

        const duration = 2500;
        const startTime = performance.now();

        // Ease-out expo, so the count settles gently on the final figure
        const animate = (currentTime: number) => {
          const progress = Math.min((currentTime - startTime) / duration, 1);
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          setCount(targetNum * eased);

          if (progress < 1) {
            animationFrameRef.current = requestAnimationFrame(animate);
          }
        };

        animationFrameRef.current = requestAnimationFrame(animate);
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      observer.disconnect();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [target]);

  const displayValue = target.includes('.') ? count.toFixed(1) : Math.floor(count);

  return (
    <p
      ref={ref}
      className="text-5xl sm:text-7xl xl:text-8xl font-light font-display text-copper-500 tracking-brand-header tabular-nums leading-none"
      style={{ textShadow: '0 2px 30px rgba(184, 115, 51, 0.2)' }}
    >
      {displayValue}
      <span className={suffix === '★' ? 'ml-1 text-3xl sm:text-4xl xl:text-5xl' : 'text-4xl sm:text-5xl xl:text-6xl'}>
        {suffix}
      </span>
    </p>
  );
}

export default function Metric({ stat, index }: { stat: CompanyStat; index: number }) {
  return (
    <div className="flex flex-col items-center text-center">
      <AnimatedCounter target={stat.number} suffix={stat.suffix} />

      <p className="mt-5 text-xs sm:text-sm lg:text-base font-semibold tracking-brand-label uppercase text-near-black/75">
        {stat.label}
      </p>

      {/* Copper underline that draws in once the figure is on screen */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.4 + index * 0.15, ease: [0.19, 0.91, 0.38, 0.98] }}
        className="mt-5 h-px w-12 origin-center bg-copper-500/60"
      />
    </div>
  );
}
