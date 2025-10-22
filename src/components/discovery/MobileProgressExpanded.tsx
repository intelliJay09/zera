'use client';

/**
 * Mobile Progress Expanded Component
 * Bottom sheet modal showing all steps
 */

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CompactStepCard from './CompactStepCard';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface MobileProgressExpandedProps {
  isOpen: boolean;
  onClose: () => void;
  currentStep: number;
  steps: Step[];
}

export default function MobileProgressExpanded({
  isOpen,
  onClose,
  currentStep,
  steps,
}: MobileProgressExpandedProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 300
            }}
            className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-3xl shadow-2xl"
          >
            {/* Drag Handle */}
            <div className="flex justify-center pt-4 pb-2">
              <div className="w-12 h-1.5 bg-muted-foreground/20 rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-border">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Your Progress
                </h3>
                <p className="text-xs text-muted-foreground">
                  Step {currentStep} of {steps.length}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="h-8 w-8 p-0"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Cards Grid - Compact Version */}
            <div className="p-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {steps.map((step, index) => {
                  const stepNumber = index + 1;
                  return (
                    <CompactStepCard
                      key={step.number}
                      step={step}
                      isCurrent={currentStep === stepNumber}
                      isCompleted={stepNumber < currentStep}
                    />
                  );
                })}
              </div>
            </div>

            {/* Bottom Padding for Safe Area */}
            <div className="h-safe-area-inset-bottom" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
