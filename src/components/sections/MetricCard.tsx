'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  number: string;
  suffix: string;
  label: string;
}

interface MetricCardProps {
  stat: Stat;
  index: number;
}

function AnimatedCounter({ target, suffix }: { target: string; suffix: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (hasAnimated) return;

        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          const targetNum = parseFloat(target);
          const duration = 2500; // Slightly slower for elegance
          const startTime = performance.now();

          // Use RAF for smooth animation
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Elegant ease-out expo for smooth, luxurious deceleration
            const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const value = targetNum * eased;

            setCount(value);

            if (progress < 1) {
              animationFrameRef.current = requestAnimationFrame(animate);
            } else {
              setCount(targetNum);
            }
          };

          animationFrameRef.current = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [target]);

  const displayValue = target.includes('.')
    ? count.toFixed(1)
    : Math.floor(count);

  return (
    <div ref={ref} className="relative">
      <h3
        className="text-5xl sm:text-6xl lg:text-8xl font-light font-display uppercase text-copper-500 mb-4 tracking-brand-header transition-all duration-300"
        style={{
          textShadow: '0 2px 30px rgba(184, 115, 51, 0.2)',
        }}
      >
        {displayValue}
        <span className={suffix === '★' ? 'text-3xl sm:text-4xl lg:text-5xl ml-1' : 'text-4xl sm:text-5xl lg:text-6xl'}>{suffix}</span>
      </h3>
    </div>
  );
}

export default function MetricCard({ stat }: MetricCardProps) {
  return (
    <div className="group relative bg-white backdrop-blur-sm px-6 py-10 sm:px-12 sm:py-16 lg:px-14 lg:py-20 text-center hover:shadow-2xl rounded-3xl shadow-lg transition-all duration-500 border border-copper-500/10 hover:border-copper-500/20">
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-copper-500/0 via-copper-500/5 to-copper-500/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />

      {/* Content */}
      <div className="relative">
        {/* Animated Counter */}
        <AnimatedCounter target={stat.number} suffix={stat.suffix} />

        {/* Label */}
        <p className="text-base sm:text-lg font-semibold tracking-brand-label uppercase text-near-black/80 mt-2">
          {stat.label}
        </p>

        {/* Decorative line */}
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-copper-500/40 to-transparent mx-auto mt-6" />
      </div>
    </div>
  );
}
