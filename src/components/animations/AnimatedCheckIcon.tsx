'use client';

import { motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

interface AnimatedCheckIconProps {
  className?: string;
  strokeWidth?: number;
  delay?: number;
}

export default function AnimatedCheckIcon({
  className = 'w-5 h-5 text-copper-500',
  strokeWidth = 1.5,
  delay = 0,
}: AnimatedCheckIconProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: prefersReducedMotion ? 0.01 : 0.4,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.19, 0.91, 0.38, 0.98] as const, // elegantEase
      },
    },
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <motion.path
        d="M20 6 9 17l-5-5"
        variants={pathVariants}
        initial="hidden"
        animate="visible"
      />
    </svg>
  );
}
