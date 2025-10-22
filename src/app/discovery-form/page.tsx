'use client';

/**
 * Discovery Form - Multi-Step Wizard
 * Main container for the 4-section discovery form
 */

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Save, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProgressIndicator from '@/components/discovery/ProgressIndicator';
import Section1BrandIdentity, {
  type Section1Data,
} from '@/components/discovery/Section1BrandIdentity';
import Section2Domain, {
  type Section2Data,
} from '@/components/discovery/Section2Domain';
import Section3Content, {
  type Section3Data,
} from '@/components/discovery/Section3Content';
import Section4Confirmation, {
  type Section4Data,
} from '@/components/discovery/Section4Confirmation';

const steps = [
  { number: 1, title: 'Brand Identity', description: 'Logo & style' },
  { number: 2, title: 'Domain Name', description: 'Choose domain' },
  { number: 3, title: 'Website Content', description: 'Pages & info' },
  { number: 4, title: 'Confirmation', description: 'Review & submit' },
];

type FormData = {
  section1?: Section1Data;
  section2?: Section2Data;
  section3?: Section3Data;
  section4?: Section4Data;
};

export default function DiscoveryFormPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [showResumeMessage, setShowResumeMessage] = useState(false);
  const [sectionsValid, setSectionsValid] = useState({
    section1: false,
    section2: false,
    section3: false,
  });
  const scrollLockActiveRef = useRef(false);
  const scrollAttemptCountRef = useRef(0);

  // Load existing submission on mount
  useEffect(() => {
    const loadExistingSubmission = async () => {
      try {
        setIsLoading(true);

        const emailParam = searchParams.get('email');
        const checkoutIdParam = searchParams.get('checkout');
        const resumeTokenParam = searchParams.get('token');
        const submissionIdParam = searchParams.get('id');

        // Try to get saved submissionId from localStorage
        const savedSubmissionId = localStorage.getItem('discoveryFormSubmissionId');

        if (emailParam) {
          setEmail(emailParam);
        }

        // Try to load saved data if we have any identifier
        const hasIdentifier = emailParam || checkoutIdParam || resumeTokenParam || submissionIdParam || savedSubmissionId;

        if (hasIdentifier) {
          const params = new URLSearchParams();
          if (emailParam) params.append('email', emailParam);
          if (checkoutIdParam) params.append('checkoutId', checkoutIdParam);
          if (resumeTokenParam) params.append('resumeToken', resumeTokenParam);
          if (submissionIdParam) params.append('submissionId', submissionIdParam);
          if (!emailParam && !checkoutIdParam && !resumeTokenParam && !submissionIdParam && savedSubmissionId) {
            params.append('submissionId', savedSubmissionId);
          }

          const response = await fetch(`/api/discovery/load?${params.toString()}`);
          const result = await response.json();

          if (result.success && result.data) {
            // Restore saved data
            setFormData(result.data.formData);
            setSubmissionId(result.data.submissionId);
            setEmail(result.data.email);
            setCurrentStep(result.data.currentSection);

            // Mark sections as valid if they have data
            setSectionsValid({
              section1: !!result.data.formData.section1,
              section2: !!result.data.formData.section2,
              section3: !!result.data.formData.section3,
            });

            // Save to localStorage for future refreshes
            localStorage.setItem('discoveryFormSubmissionId', result.data.submissionId);

            // Show resume message temporarily
            setShowResumeMessage(true);

            // Hide message after 4.5 seconds with smooth fade out
            setTimeout(() => {
              setShowResumeMessage(false);
            }, 4500);
          }
        }
      } catch (error) {
        console.error('Failed to load saved data:', error);
        setLoadError('Failed to load your saved progress. Starting fresh.');
      } finally {
        setIsLoading(false);
        // Scroll to top after loading completes
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    };

    loadExistingSubmission();
  }, [searchParams]);

  // Save submissionId to localStorage whenever it changes
  useEffect(() => {
    if (submissionId) {
      localStorage.setItem('discoveryFormSubmissionId', submissionId);
    }
  }, [submissionId]);

  // Auto-save handler
  const handleAutoSave = async (sectionNumber: number, data: Partial<any>) => {
    try {
      const response = await fetch('/api/discovery/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId,
          email,
          currentSection: sectionNumber,
          formData: data,
        }),
      });

      const result = await response.json();
      if (result.success) {
        if (!submissionId) {
          setSubmissionId(result.data.submissionId);
        }
      }
    } catch (error) {
      console.error('Auto-save failed:', error);
    }
  };

  // Section 1 handlers
  const handleSection1Next = (data: Section1Data) => {
    setSectionsValid((prev) => ({ ...prev, section1: true }));
    setFormData((prev) => ({ ...prev, section1: data }));
    // Extract and store email from section1 data
    if (data.email) {
      setEmail(data.email);
    }
    // Save with section 2 since we're moving TO section 2
    handleAutoSave(2, data);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSection1Save = (data: Partial<Section1Data>) => {
    // Extract and store email from section1 data
    if (data.email) {
      setEmail(data.email);
    }
    handleAutoSave(1, data);
  };

  // Section 2 handlers
  const handleSection2Next = (data: Section2Data) => {
    setSectionsValid((prev) => ({ ...prev, section2: true }));
    setFormData((prev) => ({ ...prev, section2: data }));
    // Save with section 3 since we're moving TO section 3
    handleAutoSave(3, data);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSection2Back = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSection2Save = (data: Partial<Section2Data>) => {
    handleAutoSave(2, data);
  };

  // Section 3 handlers
  const handleSection3Next = (data: Section3Data) => {
    setSectionsValid((prev) => ({ ...prev, section3: true }));
    setFormData((prev) => ({ ...prev, section3: data }));
    // Save with section 4 since we're moving TO section 4
    handleAutoSave(4, data);
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSection3Back = () => {
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSection3Save = (data: Partial<Section3Data>) => {
    handleAutoSave(3, data);
  };

  // Section 4 handlers
  const handleSection4Submit = async (data: Section4Data) => {
    setIsSubmitting(true);

    try {
      // Final save with completion status
      await handleAutoSave(4, { content_signoff: data.content_signoff });

      // Submit to final submission endpoint (sends confirmation emails)
      const response = await fetch('/api/discovery/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId,
        }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Submission failed');
      }

      // Clear localStorage since submission is complete
      localStorage.removeItem('discoveryFormSubmissionId');

      // Redirect to success page
      router.push('/discovery-form/success');
    } catch (error) {
      console.error('Submission failed:', error);

      // Redirect to error page with error details
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      const params = new URLSearchParams({
        error: errorMessage,
        ...(submissionId && { id: submissionId }),
      });

      router.push(`/discovery-form/error?${params.toString()}`);
      setIsSubmitting(false);
    }
  };

  const handleSection4Back = () => {
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditSection = (section: number) => {
    setCurrentStep(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 4 scroll-lock: Lock on first scroll, unlock on second scroll
  useEffect(() => {
    if (currentStep !== 4) {
      // Reset scroll lock when leaving step 4
      scrollLockActiveRef.current = false;
      scrollAttemptCountRef.current = 0;
      if (window.lenis) {
        window.lenis.start();
      }
      return;
    }

    // Lock scroll when entering step 4 using Lenis
    scrollLockActiveRef.current = true;
    scrollAttemptCountRef.current = 0;

    // Wait for Lenis to be available
    const lockScroll = () => {
      if (window.lenis) {
        window.lenis.stop();
      }
    };

    // Small delay to ensure Lenis is initialized
    const timeout = setTimeout(lockScroll, 100);

    const handleWheel = (e: WheelEvent) => {
      if (!scrollLockActiveRef.current) return;

      // Increment scroll attempt
      scrollAttemptCountRef.current += 1;

      // Unlock after first scroll attempt
      if (scrollAttemptCountRef.current >= 1) {
        scrollLockActiveRef.current = false;
        if (window.lenis) {
          window.lenis.start();
        }
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!scrollLockActiveRef.current) return;

      // Increment scroll attempt
      scrollAttemptCountRef.current += 1;

      // Unlock after first scroll attempt
      if (scrollAttemptCountRef.current >= 1) {
        scrollLockActiveRef.current = false;
        if (window.lenis) {
          window.lenis.start();
        }
      }
    };

    // Add listeners (no preventDefault needed, Lenis handles it)
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleTouchMove);
      if (window.lenis) {
        window.lenis.start();
      }
      scrollLockActiveRef.current = false;
    };
  }, [currentStep]);

  // Show loading state while fetching saved data
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-36 sm:pt-40 lg:pt-40 pb-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4"
          >
            <Save className="h-12 w-12 mx-auto text-primary animate-pulse" />
          </motion.div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Restoring your progress...
          </h2>
          <p className="text-muted-foreground">
            Please wait while we load your saved data
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 pt-36 sm:pt-40 lg:pt-40 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12 lg:mb-20 text-center"
        >
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 sm:mb-6 lg:mb-8">
            Website Discovery Form
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 lg:mb-12">
            Share your vision and requirements with us
          </p>

          {/* Load Error Message */}
          {loadError && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg"
            >
              <p className="text-sm text-amber-700">{loadError}</p>
            </motion.div>
          )}

          {/* Resume Success Message */}
          {showResumeMessage && submissionId && !loadError && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="p-3 bg-primary/10 border border-primary/20 rounded-lg relative overflow-hidden"
            >
              {/* Animated progress bar showing time remaining */}
              <motion.div
                className="absolute bottom-0 left-0 h-[2px] bg-primary/30"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 4.5, ease: 'linear' }}
              />
              <p className="text-sm text-primary flex items-center justify-center gap-2">
                <Save className="h-4 w-4" />
                Welcome back! Your progress has been restored.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 lg:mb-24"
        >
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={4}
            steps={steps}
          />
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-6 sm:p-8 md:p-10 mb-6 sm:mb-8"
        >
          {/* Section 1 */}
          {currentStep === 1 && (
            <Section1BrandIdentity
              initialData={formData.section1}
              onNext={handleSection1Next}
              onSave={handleSection1Save}
            />
          )}

          {/* Section 2 */}
          {currentStep === 2 && (
            <Section2Domain
              initialData={formData.section2}
              onNext={handleSection2Next}
              onBack={handleSection2Back}
              onSave={handleSection2Save}
            />
          )}

          {/* Section 3 */}
          {currentStep === 3 && (
            <Section3Content
              initialData={formData.section3}
              onNext={handleSection3Next}
              onBack={handleSection3Back}
              onSave={handleSection3Save}
              mainGoal={formData.section1?.main_goal}
            />
          )}

          {/* Section 4 */}
          {currentStep === 4 &&
           sectionsValid.section1 &&
           sectionsValid.section2 &&
           sectionsValid.section3 &&
           formData.section1 &&
           formData.section2 &&
           formData.section3 && (
            <Section4Confirmation
              section1Data={formData.section1}
              section2Data={formData.section2}
              section3Data={formData.section3}
              onSubmit={handleSection4Submit}
              onBack={handleSection4Back}
              onEdit={handleEditSection}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-8 pt-8 border-t border-border">
            {/* Back Button */}
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  if (currentStep === 2) handleSection2Back();
                  else if (currentStep === 3) handleSection3Back();
                  else if (currentStep === 4) handleSection4Back();
                }}
                className="w-full sm:w-fit"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            ) : (
              <div className="hidden sm:block" />
            )}

            {/* Next/Submit Button */}
            {currentStep < 4 ? (
              <Button
                type="submit"
                form={`section-${currentStep}-form`}
                className="w-full sm:w-fit"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                form="section-4-form"
                disabled={isSubmitting}
                className="w-full sm:w-fit"
              >
                {isSubmitting ? (
                  <>
                    <Save className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Form
                  </>
                )}
              </Button>
            )}
          </div>
        </motion.div>

        {/* Auto-save Indicator */}
        {submissionId && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-muted-foreground"
          >
            <Save className="inline h-4 w-4 mr-1" />
            Progress saved automatically
          </motion.p>
        )}
      </div>
    </div>
  );
}
