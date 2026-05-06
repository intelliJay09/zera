'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Loader2, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { executeRecaptcha } from '@/lib/recaptcha-client';

const strategySessionSchema = z.object({
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
  { value: 'manual-chaos', label: 'Manual Chaos - Our team drowns in repetitive, manual processes.' },
  { value: 'lead-leakage', label: 'Lead Leakage - We have traffic and interest, but leads slip through.' },
  { value: 'fragmented-tech', label: 'Fragmented Tech - Our tools do not talk to each other.' },
  { value: 'client-retention', label: 'Client Retention - We acquire customers but struggle to keep them.' },
];

const investmentOptions = [
  { value: 'yes', label: 'Yes - budget is allocated, we are ready to move.' },
  { value: 'evaluating', label: 'Evaluating - it is a priority and we are aligning budget now.' },
  { value: 'no-budget', label: 'No - we do not have budget allocated at this time.' },
];

const selectStyle = {
  paddingTop: '12px',
  paddingBottom: '12px',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23B87333' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
  backgroundPosition: 'right 0.75rem center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '1.5em 1.5em',
};

export default function StrategySessionForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
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

      if (result.success && result.authorizationUrl) {
        (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer?.push({
          event: 'strategy_session_submitted',
          company_name: data.companyName,
          revenue_range: data.revenueRange,
          growth_obstacle: data.growthObstacle,
        });

        window.location.href = result.authorizationUrl;
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
                <select
                  id="revenueRange"
                  {...register('revenueRange')}
                  aria-invalid={errors.revenueRange ? 'true' : 'false'}
                  className="w-full appearance-none px-4 py-3 pr-10 bg-white/10 border border-copper-500/40 rounded-sm text-white focus:outline-none focus:border-copper-500 focus:ring-2 focus:ring-copper-500/20 transition-colors duration-300 cursor-pointer [&>option]:py-2 [&>option]:px-4"
                  style={selectStyle}
                >
                  <option value="" className="bg-near-black text-white py-3">Select revenue range</option>
                  {revenueOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-near-black text-white py-3">
                      {option.label}
                    </option>
                  ))}
                </select>
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
                <select
                  id="growthObstacle"
                  {...register('growthObstacle')}
                  aria-invalid={errors.growthObstacle ? 'true' : 'false'}
                  className="w-full appearance-none px-4 py-3 pr-10 bg-white/10 border border-copper-500/40 rounded-sm text-white focus:outline-none focus:border-copper-500 focus:ring-2 focus:ring-copper-500/20 transition-colors duration-300 cursor-pointer [&>option]:py-2 [&>option]:px-4"
                  style={selectStyle}
                >
                  <option value="" className="bg-near-black text-white py-3">Select your bottleneck</option>
                  {obstacleOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-near-black text-white py-3">
                      {option.label}
                    </option>
                  ))}
                </select>
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
                <label htmlFor="investmentQualifier" className="block text-sm font-medium text-white mb-2 tracking-normal">
                  Does your organization have budget allocated for operational systems this year? *
                </label>
                <select
                  id="investmentQualifier"
                  {...register('investmentQualifier')}
                  aria-invalid={errors.investmentQualifier ? 'true' : 'false'}
                  className="w-full appearance-none px-4 py-3 pr-10 bg-white/10 border border-copper-500/40 rounded-sm text-white focus:outline-none focus:border-copper-500 focus:ring-2 focus:ring-copper-500/20 transition-colors duration-300 cursor-pointer [&>option]:py-2 [&>option]:px-4"
                  style={selectStyle}
                >
                  <option value="" className="bg-near-black text-white py-3">Select an option</option>
                  {investmentOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-near-black text-white py-3">
                      {option.label}
                    </option>
                  ))}
                </select>
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
                    What is your approximate budget range for this engagement?
                  </label>
                  <input
                    type="text"
                    id="budgetRange"
                    placeholder="e.g. $5,000 - $10,000"
                    {...register('budgetRange')}
                    className="w-full px-4 py-3 bg-white/10 border border-copper-500/40 rounded-sm text-white placeholder-white/40 focus:outline-none focus:border-copper-500 transition-colors duration-300"
                  />
                  <p className="text-xs text-white/50 mt-1">Optional - helps us prepare the right scope for your session.</p>
                </motion.div>
              )}
            </div>
          )}

          {/* STEP 3: THE GATE */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="border-l-2 border-copper-500 pl-6">
                <h3 className="text-lg font-bold text-copper-500 mb-1 uppercase tracking-wide">
                  STEP 3: SECURE YOUR SESSION
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  The Strategy Session fee is <span className="text-copper-400 font-semibold">$100 USD / GHS 1,000</span>. This secures your 60-minute deep-dive and includes your customized Roadmap Report.
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
                    <Lock className="w-5 h-5" />
                    <span>SECURE SYSTEMS AUDIT</span>
                  </>
                )}
              </button>

              <p className="text-xs font-normal text-white/70 text-center tracking-normal">
                Redirects to Secure Payment and Calendar Booking.
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
    </form>
  );
}
