'use client';

/**
 * Mobile Progress Header Component
 * Compact sticky header for mobile viewports
 */

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface MobileProgressHeaderProps {
  currentStep: number;
  totalSteps: number;
  steps: Step[];
  progressPercentage: number;
  onExpand: () => void;
}

export default function MobileProgressHeader({
  currentStep,
  totalSteps,
  steps,
  progressPercentage,
  onExpand,
}: MobileProgressHeaderProps) {
  const currentStepData = steps[currentStep - 1];

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border"
    >
      <div className="max-w-4xl mx-auto px-4 py-3">
        {/* Linear Progress Bar */}
        <div className="relative h-1.5 bg-copper-500/10 rounded-full mb-3 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-copper-600 via-copper-500 to-copper-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>

        {/* Step Info Row */}
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-copper-500/60 mb-0.5">
              Step {currentStep} of {totalSteps}
            </p>
            <p className="text-sm font-medium text-foreground truncate">
              {currentStepData.title}
            </p>
          </div>

          <div className="flex items-center gap-3 ml-4">
            <span className="text-2xl font-light text-copper-500 tabular-nums">
              {Math.round(progressPercentage)}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onExpand}
              className="h-8 w-8 p-0"
              aria-label="View all steps"
            >
              <ChevronDown className="h-4 w-4 text-copper-500" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
