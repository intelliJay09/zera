'use client';

/**
 * Compact Step Card Component
 * Smaller card variant for mobile bottom sheet
 */

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface CompactStepCardProps {
  step: Step;
  isCurrent: boolean;
  isCompleted: boolean;
}

export default function CompactStepCard({
  step,
  isCurrent,
  isCompleted,
}: CompactStepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'p-4 rounded-lg backdrop-blur-sm transition-all duration-300',
        isCurrent
          ? 'bg-copper-500/10 border border-copper-500/20'
          : isCompleted
            ? 'bg-copper-500/5 border border-copper-500/10'
            : 'bg-muted/50 border border-transparent'
      )}
    >
      {/* Number/Check - Smaller */}
      <div className="h-12 mb-3">
        {isCompleted ? (
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15
            }}
            className="w-10 h-10 rounded-full bg-copper-500 flex items-center justify-center"
          >
            <Check className="w-5 h-5 text-white" strokeWidth={2.5} />
          </motion.div>
        ) : (
          <span
            className={cn(
              'text-4xl font-light leading-none',
              isCurrent ? 'text-copper-500' : 'text-copper-500/30'
            )}
          >
            {step.number}
          </span>
        )}
      </div>

      {/* Info - Condensed */}
      <div className="space-y-1">
        <p
          className={cn(
            'text-[8px] uppercase tracking-wider',
            isCurrent
              ? 'text-copper-500'
              : isCompleted
                ? 'text-copper-500/70'
                : 'text-copper-500/40'
          )}
        >
          {step.description}
        </p>
        <p
          className={cn(
            'text-sm font-medium leading-tight',
            isCurrent
              ? 'text-copper-900'
              : isCompleted
                ? 'text-copper-800/70'
                : 'text-copper-500/40'
          )}
        >
          {step.title}
        </p>
      </div>

      {/* Active Indicator */}
      {isCurrent && (
        <motion.div
          className="mt-3 w-full h-0.5 bg-copper-500 rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ transformOrigin: 'left' }}
        />
      )}
    </motion.div>
  );
}
