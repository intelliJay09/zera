'use client';

/**
 * Progress Indicator Component
 * Staggered elevation cards with premium aesthetics
 * Responsive: Mobile shows compact header, Desktop shows full cards
 */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import MobileProgressHeader from './MobileProgressHeader';
import MobileProgressExpanded from './MobileProgressExpanded';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: Step[];
  className?: string;
}

export default function ProgressIndicator({
  currentStep,
  totalSteps,
  steps,
  className,
}: ProgressIndicatorProps) {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      {/* Mobile Progress Header (< lg) */}
      <div className={cn('lg:hidden', className)}>
        <MobileProgressHeader
          currentStep={currentStep}
          totalSteps={totalSteps}
          steps={steps}
          progressPercentage={progressPercentage}
          onExpand={() => setIsExpanded(true)}
        />
        <MobileProgressExpanded
          isOpen={isExpanded}
          onClose={() => setIsExpanded(false)}
          currentStep={currentStep}
          steps={steps}
        />
      </div>

      {/* Desktop Progress Indicator (lg+) */}
      <div className={cn('hidden lg:block w-full', className)}>
      {/* Progress Arc */}
      <div className="relative h-32 mb-12">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 100"
          preserveAspectRatio="none"
        >
          {/* Base Arc */}
          <motion.path
            d="M 0 80 Q 500 0 1000 80"
            fill="none"
            stroke="rgba(180, 110, 70, 0.1)"
            strokeWidth="2"
          />
          {/* Progress Arc */}
          <motion.path
            d="M 0 80 Q 500 0 1000 80"
            fill="none"
            stroke="url(#copperGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progressPercentage / 100 }}
            transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          />
          <defs>
            <linearGradient id="copperGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#B46E46" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#B46E46" stopOpacity="1" />
              <stop offset="100%" stopColor="#D4A574" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Progress Text - Centered on Arc */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-7xl font-extralight tracking-tighter text-copper-500">
            {Math.round(progressPercentage)}
            <span className="text-2xl align-top">%</span>
          </div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-copper-500/50 mt-1">
            Complete
          </div>
        </motion.div>
      </div>

      {/* Staggered Cards */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isUpcoming = stepNumber > currentStep;
          const baseStagger = index * 8;

          return (
            <motion.div
              key={step.number}
              className="relative"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1]
              }}
              style={{ marginTop: `${baseStagger}px` }}
            >
              {/* Connecting Line to Next Step */}
              {index < steps.length - 1 && (
                <motion.div
                  className="hidden lg:block absolute top-8 right-0 w-8 h-[1px] bg-gradient-to-r from-copper-500/30 to-transparent"
                  style={{
                    transform: 'translateX(100%) rotate(8deg)',
                    transformOrigin: 'left'
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isCompleted || isCurrent ? 1 : 0.3 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
              )}

              {/* Card */}
              <motion.div
                className={cn(
                  'relative rounded-sm overflow-hidden backdrop-blur-sm cursor-pointer',
                  isCurrent ? 'bg-white/90' : 'bg-white/60'
                )}
                initial={{
                  opacity: 0,
                  y: 80,
                  rotateX: 15,
                  scale: 0.9
                }}
                animate={{
                  opacity: 1,
                  y: isCurrent ? -24 : 0,
                  rotateX: 0,
                  scale: 1,
                  boxShadow: isCurrent
                    ? '0 24px 64px rgba(180, 110, 70, 0.18), 0 8px 24px rgba(0, 0, 0, 0.08)'
                    : isCompleted
                      ? '0 4px 16px rgba(0, 0, 0, 0.04)'
                      : '0 2px 8px rgba(0, 0, 0, 0.02)'
                }}
                transition={{
                  opacity: { delay: index * 0.1 + 0.2, duration: 0.5 },
                  y: { delay: index * 0.1 + 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
                  rotateX: { delay: index * 0.1 + 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
                  scale: { delay: index * 0.1 + 0.2, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
                  boxShadow: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
                }}
                whileHover={{
                  y: isCurrent ? -28 : -8,
                  scale: 1.02,
                  boxShadow: isCurrent
                    ? '0 32px 80px rgba(180, 110, 70, 0.24), 0 12px 32px rgba(0, 0, 0, 0.12)'
                    : isCompleted
                      ? '0 12px 32px rgba(180, 110, 70, 0.08), 0 4px 16px rgba(0, 0, 0, 0.06)'
                      : '0 8px 24px rgba(180, 110, 70, 0.06), 0 2px 12px rgba(0, 0, 0, 0.04)',
                  transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
                }}
                style={{ perspective: 1000 }}
              >
                {/* Copper Tint Overlay for Completed */}
                {isCompleted && !isCurrent && (
                  <div className="absolute inset-0 bg-gradient-to-br from-copper-500/5 to-transparent" />
                )}

                {/* Active Glow */}
                {isCurrent && (
                  <>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-copper-500/8 via-transparent to-copper-400/5"
                      animate={{ opacity: [0.4, 0.7, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                    {/* Top Accent */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-copper-500 to-transparent" />
                  </>
                )}

                <div className="relative p-6 sm:p-8 text-center md:text-left">
                  {/* Step Number - Large */}
                  <div className="relative h-20 sm:h-28 mb-4 sm:mb-6 flex justify-center md:justify-start">
                    {isCompleted ? (
                      <motion.div
                        className="absolute top-0 left-0"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 150,
                          damping: 12,
                          delay: 0.2
                        }}
                      >
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-copper-500 flex items-center justify-center shadow-lg">
                          <Check className="w-8 h-8 sm:w-10 sm:h-10 text-white" strokeWidth={2.5} />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        className={cn(
                          'text-[72px] sm:text-[96px] font-extralight leading-none tracking-tighter',
                          isCurrent ? 'text-copper-500' : 'text-copper-500/20'
                        )}
                        animate={{
                          scale: isCurrent ? 1.05 : 1,
                          opacity: isCurrent ? 1 : isUpcoming ? 0.3 : 0.5
                        }}
                      >
                        {step.number}
                      </motion.div>
                    )}
                  </div>

                  {/* Step Info */}
                  <div className="space-y-2">
                    <motion.div
                      className={cn(
                        'text-[9px] uppercase tracking-[0.25em]',
                        isCurrent ? 'text-copper-500' : isCompleted ? 'text-copper-500/70' : 'text-copper-500/40'
                      )}
                      animate={{
                        letterSpacing: isCurrent ? '0.3em' : '0.25em'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {step.description}
                    </motion.div>
                    <motion.div
                      className={cn(
                        'text-lg sm:text-xl font-medium tracking-tight leading-tight',
                        isCurrent ? 'text-copper-900' : isCompleted ? 'text-copper-800/70' : 'text-copper-500/40'
                      )}
                    >
                      {step.title}
                    </motion.div>
                  </div>

                  {/* Active Pulse Indicator */}
                  {isCurrent && (
                    <motion.div
                      className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 w-3 h-3 rounded-full bg-copper-500"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [1, 0.6, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
    </>
  );
}
