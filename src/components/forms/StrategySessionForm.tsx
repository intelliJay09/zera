'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader2, ArrowRight, ArrowLeft, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { executeRecaptcha } from '@/lib/recaptcha-client';

const strategySessionSchema = z
  .object({
    fullName: z.string().min(2, 'Name must be at least 2 characters'),
    businessEmail: z.string().email('Please enter a valid email address'),
    companyName: z.string().min(1, 'Company name is required'),
    websiteUrl: z.string().optional(),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    revenueRange: z.enum(['under-25k', '25k-100k', '100k-500k', '500k-2m', '2m+', 'custom']),
    customRevenue: z.string().optional(),
    growthObstacle: z.enum(['manual-chaos', 'lead-leakage', 'fragmented-tech', 'client-retention']),
    hoursWasted: z.string().min(1, 'Please estimate hours wasted per week'),
    magicWandOutcome: z.string().min(10, 'Please describe your target metric (at least 10 characters)'),
    investmentQualifier: z.enum(['yes', 'evaluating', 'no-budget']),
    budgetRange: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      (data.investmentQualifier === 'yes' || data.investmentQualifier === 'evaluating') &&
      (!data.budgetRange || data.budgetRange.trim() === '')
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please provide your approximate budget range',
        path: ['budgetRange'],
      });
    }
  });

type StrategySessionData = z.infer<typeof strategySessionSchema>;

const revenueOptions = [
  { value: 'under-25k', label: 'Under $25k (Under GHS 400k)' },
  { value: '25k-100k', label: '$25k - $100k (GHS 400k - 1.5M)' },
  { value: '100k-500k', label: '$100k - $500k (GHS 1.5M - 7.5M)' },
  { value: '500k-2m', label: '$500k - $2M (GHS 7.5M - 30M)' },
  { value: '2m+', label: '$2M+ (Enterprise)' },
  { value: 'custom', label: 'Custom Range (specify below)' },
];

const obstacleOptions = [
  { value: 'manual-chaos', label: 'Manual Chaos - Team drowns in repetitive, manual processes.' },
  { value: 'lead-leakage', label: 'Lead Leakage - Traffic and interest, but leads slip through.' },
  { value: 'fragmented-tech', label: 'Fragmented Tech - Our tools do not talk to each other.' },
  { value: 'client-retention', label: 'Client Retention - We acquire customers but struggle to keep them.' },
];

const investmentOptions = [
  { value: 'yes', label: 'Yes - budget is allocated, we are ready to move.' },
  { value: 'evaluating', label: 'Evaluating - it is a priority and we are aligning budget now.' },
  { value: 'no-budget', label: 'No - we do not have budget allocated at this time.' },
];

// ============================================================
// CUSTOM SELECT COMPONENT
// ============================================================

function CustomSelect({
  id,
  options,
  placeholder,
  value,
  onChange,
  isError,
}: {
  id: string;
  options: { value: string; label: string }[];
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  isError?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    function onOutside(e: MouseEvent | TouchEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('touchstart', onOutside);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('touchstart', onOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        id={id}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`w-full px-4 py-3 pr-10 bg-white/10 border rounded-sm text-left text-sm focus:outline-none focus:ring-2 focus:ring-copper-500/20 transition-colors duration-300 cursor-pointer flex items-center justify-between gap-3 ${
          isError
            ? 'border-copper-400'
            : 'border-copper-500/40 focus:border-copper-500'
        }`}
      >
        <span className={`flex-1 leading-snug ${selected ? 'text-white' : 'text-white/40'}`}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-copper-500 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 top-full left-0 right-0 mt-1 bg-near-black border border-copper-500/40 rounded-sm shadow-xl max-h-60 overflow-y-auto"
          >
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={value === option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`px-4 py-3 text-sm cursor-pointer leading-snug transition-colors ${
                  value === option.value
                    ? 'text-copper-400 bg-copper-500/10'
                    : 'text-white hover:bg-white/5'
                }`}
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================
// FORM COMPONENT
// ============================================================

export default function StrategySessionForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    trigger,
    getValues,
  } = useForm<StrategySessionData>({
    resolver: zodResolver(strategySessionSchema),
    mode: 'onBlur',
  });

  const revenueRange = watch('revenueRange');
  const investmentQualifier = watch('investmentQualifier');

  const onSubmit = async (data: StrategySessionData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const recaptchaToken = await executeRecaptcha('book_strategy_session');

      if (!recaptchaToken) {
        throw new Error('Security verification failed. Please try again.');
      }

      const csrfResponse = await fetch('/api/csrf-token');
      const { token: csrfToken } = await csrfResponse.json();

      const params = new URLSearchParams(window.location.search);
      const utmData = {
        utmSource: params.get('utm_source') || undefined,
        utmMedium: params.get('utm_medium') || undefined,
        utmCampaign: params.get('utm_campaign') || undefined,
        utmTerm: params.get('utm_term') || undefined,
        utmContent: params.get('utm_content') || undefined,
      };

      const response = await fetch('/api/book-strategy-session/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify({
          ...data,
          ...utmData,
          recaptchaToken,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit form');
      }

      const result = await response.json();

      if (result.success) {
        (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer?.push({
          event: 'strategy_session_submitted',
          company_name: data.companyName,
          revenue_range: data.revenueRange,
          growth_obstacle: data.growthObstacle,
        });

        // Paystack redirect preserved for future activation:
        // if (result.authorizationUrl) window.location.href = result.authorizationUrl;

        setSubmitStatus('success');
        setIsSubmitting(false);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      );
      setIsSubmitting(false);
    }
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof StrategySessionData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ['fullName', 'businessEmail', 'companyName', 'phoneNumber'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['revenueRange', 'growthObstacle', 'hoursWasted', 'magicWandOutcome', 'investmentQualifier'];
      if (revenueRange === 'custom') {
        fieldsToValidate.push('customRevenue');
      }
      if (investmentQualifier === 'yes' || investmentQualifier === 'evaluating') {
        fieldsToValidate.push('budgetRange');
      }
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      if (currentStep === 2 && getValues('investmentQualifier') === 'no-budget') {
        router.push('/systems-audit/not-qualified');
        return;
      }

      const nextStepNumber = currentStep + 1;
      setCurrentStep(nextStepNumber);

      (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer?.push({
        event: 'booking_form_step',
        step_number: nextStepNumber,
        step_label: nextStepNumber === 2 ? 'business_details' : 'review',
      });
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      {/* Form Header */}
      <div className="text-center border-b border-copper-500/40 pb-6">
        <h2 className="text-2xl sm:text-3xl font-bold font-display uppercase text-white mb-2 tracking-brand-header">
          SYSTEMS AUDIT INTAKE
        </h2>
        <p className="text-sm text-cream-200/80">
          Confidential Data Collection for Pre-Session Analysis.
        </p>
      </div>

      {/* Thank You State */}
      {submitStatus === 'success' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center py-10 space-y-6"
        >
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full bg-copper-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-copper-400" strokeWidth={1.5} />
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-bold font-display text-white uppercase tracking-brand-header">
              Request Received
            </h3>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm mx-auto">
              Your Systems Audit intake has been submitted. Our team will review your submission and reach out within 24 hours to confirm your session.
            </p>
          </div>
          <div className="border-t border-copper-500/20 pt-6">
            <p className="text-xs text-white/50 tracking-normal">
              Watch your inbox for a confirmation from the ZERA team.
            </p>
          </div>
        </motion.div>
      ) : (
        <>

      {/* Step Indicator */}
      <div className="flex items-center justify-center gap-2">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step === currentStep
                  ? 'bg-copper-500 text-white'
                  : step < currentStep
                  ? 'bg-copper-500/30 text-copper-400'
                  : 'bg-white/10 text-white/50'
              }`}
            >
              {step < currentStep ? <CheckCircle2 className="w-5 h-5" /> : step}
            </div>
            {step < 3 && (
              <div
                className={`w-12 h-[2px] transition-colors ${
                  step < currentStep ? 'bg-copper-500/30' : 'bg-white/5'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* STEP 1: THE ENTITY */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="border-l-2 border-copper-500 pl-6">
                <h3 className="text-lg font-bold text-copper-500 mb-1 uppercase tracking-wide">
                  STEP 1: THE ENTITY
                </h3>
                <p className="text-sm text-white/60">
                  We pre-analyze every entity before the session. No cold calls.
                </p>
              </div>

              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2 tracking-normal">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="John Smith"
                  {...register('fullName')}
                  aria-invalid={errors.fullName ? 'true' : 'false'}
                  className="w-full px-4 py-3 bg-white/10 border border-copper-500/40 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-copper-500 transition-colors duration-300"
                />
                {errors.fullName && (
                  <p className="text-sm text-copper-400 font-normal mt-1">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="businessEmail" className="block text-sm font-medium text-white mb-2 tracking-normal">
                  Business Email *
                </label>
                <input
                  type="email"
                  id="businessEmail"
                  placeholder="name@company.com"
                  {...register('businessEmail')}
                  aria-invalid={errors.businessEmail ? 'true' : 'false'}
                  className="w-full px-4 py-3 bg-white/10 border border-copper-500/40 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-copper-500 transition-colors duration-300"
                />
                {errors.businessEmail && (
                  <p className="text-sm text-copper-400 font-normal mt-1">{errors.businessEmail.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-white mb-2 tracking-normal">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="companyName"
                  placeholder="Your Company"
                  {...register('companyName')}
                  aria-invalid={errors.companyName ? 'true' : 'false'}
                  className="w-full px-4 py-3 bg-white/10 border border-copper-500/40 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-copper-500 transition-colors duration-300"
                />
                {errors.companyName && (
                  <p className="text-sm text-copper-400 font-normal mt-1">{errors.companyName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="websiteUrl" className="block text-sm font-medium text-white mb-2 tracking-normal">
                  Website URL
                </label>
                <input
                  type="text"
                  id="websiteUrl"
                  placeholder="https://www.yoursite.com"
                  {...register('websiteUrl')}
                  className="w-full px-4 py-3 bg-white/10 border border-copper-500/40 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-copper-500 transition-colors duration-300"
                />
                <p className="text-xs text-white/50 mt-1">Optional - leave blank if you do not have one yet.</p>
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-white mb-2 tracking-normal">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  placeholder="+1 555 000 0000"
                  {...register('phoneNumber')}
                  aria-invalid={errors.phoneNumber ? 'true' : 'false'}
                  className="w-full px-4 py-3 bg-white/10 border border-copper-500/40 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-copper-500 transition-colors duration-300"
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-copper-400 font-normal mt-1">{errors.phoneNumber.message}</p>
                )}
                <p className="text-xs text-white/50 mt-1">Include country code. We use this to confirm your session.</p>
              </div>
            </div>
          )}

          {/* STEP 2: THE DIAGNOSTIC */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="border-l-2 border-copper-500 pl-6">
                <h3 className="text-lg font-bold text-copper-500 mb-1 uppercase tracking-wide">
                  STEP 2: THE DIAGNOSTIC
                </h3>
                <p className="text-sm text-white/60">
                  Operational diagnostics. Tell us where your systems are breaking down.
                </p>
              </div>

              {/* Revenue Range */}
              <div>
                <label htmlFor="revenueRange" className="block text-sm font-medium text-white mb-2 tracking-normal">
                  Current Annual Revenue Range (Confidential) *
                </label>
                <Controller
                  name="revenueRange"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      id="revenueRange"
                      options={revenueOptions}
                      placeholder="Select revenue range"
                      value={field.value || ''}
                      onChange={field.onChange}
                      isError={!!errors.revenueRange}
                    />
                  )}
                />
                {errors.revenueRange && (
                  <p className="text-sm text-copper-400 font-normal mt-1">{errors.revenueRange.message}</p>
                )}
              </div>

              {revenueRange === 'custom' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label htmlFor="customRevenue" className="block text-sm font-medium text-white mb-2 tracking-normal">
                    Specify Your Revenue Range *
                  </label>
                  <input
                    type="text"
                    id="customRevenue"
                    placeholder="e.g. GHS 5M - 10M or $500k - $750k"
                    {...register('customRevenue')}
                    className="w-full px-4 py-3 bg-white/10 border border-copper-500/40 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-copper-500 transition-colors duration-300"
                  />
                </motion.div>
              )}

              {/* Q1: Operational Bottleneck */}
              <div>
                <label htmlFor="growthObstacle" className="block text-sm font-medium text-white mb-2 tracking-normal">
                  What is your primary operational bottleneck? *
                </label>
                <Controller
                  name="growthObstacle"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      id="growthObstacle"
                      options={obstacleOptions}
                      placeholder="Select your bottleneck"
                      value={field.value || ''}
                      onChange={field.onChange}
                      isError={!!errors.growthObstacle}
                    />
                  )}
                />
                {errors.growthObstacle && (
                  <p className="text-sm text-copper-400 font-normal mt-1">{errors.growthObstacle.message}</p>
                )}
              </div>

              {/* Q2: Hours Wasted */}
              <div>
                <label htmlFor="hoursWasted" className="block text-sm font-medium text-white mb-2 tracking-normal">
                  How many hours per week does your team lose to manual processes? *
                </label>
                <input
                  type="text"
                  id="hoursWasted"
                  placeholder="e.g. 15-20 hours across sales, ops, and admin"
                  {...register('hoursWasted')}
                  aria-invalid={errors.hoursWasted ? 'true' : 'false'}
                  className="w-full px-4 py-3 bg-white/10 border border-copper-500/40 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-copper-500 transition-colors duration-300"
                />
                {errors.hoursWasted && (
                  <p className="text-sm text-copper-400 font-normal mt-1">{errors.hoursWasted.message}</p>
                )}
              </div>

              {/* Q3: Commercial Outcome */}
              <div>
                <label htmlFor="magicWandOutcome" className="block text-sm font-medium text-white mb-2 tracking-normal">
                  In 12 months, what commercial metric would prove this engagement succeeded? *
                </label>
                <textarea
                  id="magicWandOutcome"
                  {...register('magicWandOutcome')}
                  aria-invalid={errors.magicWandOutcome ? 'true' : 'false'}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-copper-500/40 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-copper-500 transition-colors duration-300 resize-none"
                  placeholder="Be specific. e.g. $500k in recurring revenue, 3x lead-to-close rate, 40% reduction in ops overhead..."
                />
                {errors.magicWandOutcome && (
                  <p className="text-sm text-copper-400 font-normal mt-1">{errors.magicWandOutcome.message}</p>
                )}
              </div>

              {/* Q4: Investment Qualifier */}
              <div>
                <p className="text-sm text-white/70 mb-3 leading-relaxed">
                  Zera&apos;s architectures are custom-built based on the complexity of your operational bottlenecks. Our foundational builds (Digital HQ + Basic Routing) start at a minimum CapEx of GHS 10,500, while full automated ecosystems scale upward.
                </p>
                <label htmlFor="investmentQualifier" className="block text-sm font-medium text-white mb-2 tracking-normal">
                  Which investment tier aligns with your allocated budget for solving this problem? *
                </label>
                <Controller
                  name="investmentQualifier"
                  control={control}
                  render={({ field }) => (
                    <CustomSelect
                      id="investmentQualifier"
                      options={investmentOptions}
                      placeholder="Select an option"
                      value={field.value || ''}
                      onChange={field.onChange}
                      isError={!!errors.investmentQualifier}
                    />
                  )}
                />
                {errors.investmentQualifier && (
                  <p className="text-sm text-copper-400 font-normal mt-1">{errors.investmentQualifier.message}</p>
                )}
              </div>

              {/* Conditional budget range input */}
              {(investmentQualifier === 'yes' || investmentQualifier === 'evaluating') && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="budgetRange" className="block text-sm font-medium text-white mb-2 tracking-normal">
                    What is your approximate budget range for this engagement? *
                  </label>
                  <input
                    type="text"
                    id="budgetRange"
                    placeholder="e.g. $5,000 - $10,000"
                    {...register('budgetRange')}
                    aria-invalid={errors.budgetRange ? 'true' : 'false'}
                    className="w-full px-4 py-3 bg-white/10 border border-copper-500/40 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-copper-500 transition-colors duration-300"
                  />
                  {errors.budgetRange && (
                    <p className="text-sm text-copper-400 font-normal mt-1">{errors.budgetRange.message}</p>
                  )}
                </motion.div>
              )}
            </div>
          )}

          {/* STEP 3: CONFIRM & SUBMIT */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-l-2 border-copper-500 pl-6">
                <h3 className="text-lg font-bold text-copper-500 mb-1 uppercase tracking-wide">
                  STEP 3: CONFIRM YOUR REQUEST
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  You are almost there. Submit your Systems Audit request and our team will review your submission and reach out within 24 hours to schedule your session.
                </p>
              </div>

              {submitStatus === 'error' && (
                <motion.div
                  className="flex items-start gap-3 bg-copper-500/10 border border-copper-500/30 p-4 rounded-sm"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <AlertCircle className="w-5 h-5 text-copper-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <p className="text-sm font-normal text-white leading-relaxed">{errorMessage}</p>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full bg-copper-500 hover:bg-copper-600 text-white font-medium text-sm sm:text-base tracking-brand-label uppercase px-6 sm:px-8 py-4 rounded-sm transition-all duration-300 flex items-center justify-center gap-3 hover:gap-5 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-5 h-5" />
                    <span>SUBMIT YOUR REQUEST</span>
                  </>
                )}
              </button>

              <p className="text-xs font-normal text-white/70 text-center tracking-normal">
                Our team reviews every submission before reaching out.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-copper-500/20">
        {currentStep > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-sm transition-colors font-medium uppercase tracking-wide"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        ) : (
          <div />
        )}

        {currentStep < 3 && (
          <button
            type="button"
            onClick={nextStep}
            className="flex items-center gap-2 bg-copper-500 hover:bg-copper-600 text-white px-6 py-3 rounded-sm transition-colors font-medium uppercase tracking-wide"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

        </>
      )}
    </form>
  );
}
