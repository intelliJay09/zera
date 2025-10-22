'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { scrollIndicatorPulse } from '@/lib/animation-variants';

export default function ScrollIndicator() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight * 0.85,
      behavior: 'smooth',
    });
  };

  if (prefersReducedMotion) {
    return (
      <button
        onClick={handleClick}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-near-black/40 hover:text-copper-500 transition-colors cursor-pointer group"
        aria-label="Scroll to content"
      >
        <span className="text-xs uppercase tracking-widest font-light">Scroll</span>
        <ChevronDown className="w-5 h-5" strokeWidth={1.5} />
      </button>
    );
  }

  return (
    <motion.button
      onClick={handleClick}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-near-black/40 hover:text-copper-500 transition-colors cursor-pointer group"
      aria-label="Scroll to content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 4.5, duration: 1.0 }}
    >
      <span className="text-xs uppercase tracking-widest font-light">Scroll</span>
      <motion.div animate={scrollIndicatorPulse}>
        <ChevronDown className="w-5 h-5" strokeWidth={1.5} />
      </motion.div>
    </motion.button>
  );
}
