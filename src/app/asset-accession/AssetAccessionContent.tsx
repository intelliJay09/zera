'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import Link from 'next/link';
import {
  Upload,
  X,
  FileText,
  Lock,
  Eye,
  EyeOff,
  Globe,
  BarChart3,
  ScrollText,
  Shield,
  CheckCircle2,
  Loader2,
  AlertCircle,
  ChevronRight,
  ChevronLeft,
  Check,
} from 'lucide-react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import {
  accessionFieldStagger,
  accessionFieldItem,
} from '@/lib/animation-variants';

// ─── Validation Schema ───────────────────────────────────────────────
const accessionSchema = z.object({
  // Section I: Brand Sovereignty
  clientTier: z.enum(['tier-1', 'tier-2', 'tier-3'], {
    message: 'Please select your service tier',
  }),
  legalEntityName: z.string().min(2, 'Legal entity name is required'),
  businessRegistrationAddress: z.string().min(5, 'Business registration address is required'),
  brandVoiceLink: z.string().optional(),

  // Section II: Digital Infrastructure
  domainRegistrarUrl: z.string().min(1, 'Domain registrar URL is required'),
  domainRegistrarUsername: z.string().min(1, 'Username is required'),
  domainRegistrarPassword: z.string().min(1, 'Password is required'),
  existingWebsiteUrl: z.string().optional(),
  existingWebsiteUsername: z.string().optional(),
  existingWebsitePassword: z.string().optional(),
  desiredPrimaryEmail: z.string().min(1, 'Primary email address is required'),
  additionalTeamSeats: z.string().optional(),
  currentEmailService: z.string().optional(),

  // Section III: Acquisition & Intel (conditionally required for Tier II & III)
  metaBusinessSuiteDetails: z.string().optional(),
  googleAdsDetails: z.string().optional(),
  crmDetails: z.string().optional(),
  targetAudienceProfile: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.clientTier !== 'tier-1') {
    if (!data.targetAudienceProfile || data.targetAudienceProfile.length < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please describe your ideal client in at least 3 sentences',
        path: ['targetAudienceProfile'],
      });
    }
  }
});

type AccessionFormData = z.infer<typeof accessionSchema>;

// ─── Step configuration ─────────────────────────────────────────────
const STEPS = [
  { numeral: 'I', label: 'Brand Sovereignty', subtitle: 'Identity Assets' },
  { numeral: 'II', label: 'Digital Infrastructure', subtitle: 'Credentials' },
  { numeral: 'III', label: 'Acquisition & Intel', subtitle: 'Tier II & III Only' },
  { numeral: 'IV', label: 'Terms of Accession', subtitle: 'Security Protocol' },
] as const;

const STEP_FIELDS: Record<number, (keyof AccessionFormData)[]> = {
  1: ['clientTier', 'legalEntityName', 'businessRegistrationAddress'],
  2: ['domainRegistrarUrl', 'domainRegistrarUsername', 'domainRegistrarPassword', 'desiredPrimaryEmail'],
  3: [],
  4: [],
};

// ─── Input styling constants ─────────────────────────────────────────
const inputClasses =
  'w-full px-4 py-3.5 bg-white/60 backdrop-blur-sm border border-cream-300/50 rounded-sm text-near-black placeholder:text-near-black/40 focus:outline-none focus:border-copper-500/50 focus-visible:ring-2 focus-visible:ring-copper-500/20 transition-all duration-300 text-sm min-h-[48px]';
const labelClasses = 'block text-sm font-medium text-near-black mb-2 tracking-normal';
const errorClasses = 'text-sm text-red-600 font-normal mt-1';

// ─── Step transition variants ───────────────────────────────────────
const stepVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -60 : 60,
    opacity: 0,
  }),
};

// ─── File Drop Zone Component ────────────────────────────────────────
function FileDropZone({
  label,
  accept,
  multiple = false,
  files,
  onDrop,
  onRemove,
  required = false,
  hint,
}: {
  label: string;
  accept: Record<string, string[]>;
  multiple?: boolean;
  files: File[];
  onDrop: (files: File[]) => void;
  onRemove: (index: number) => void;
  required?: boolean;
  hint?: string;
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    multiple,
    onDrop,
    maxSize: 25 * 1024 * 1024,
  });

  return (
    <div>
      <label className={labelClasses}>
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div
        {...getRootProps()}
        className={`
          relative cursor-pointer border-2 border-dashed rounded-sm p-8 sm:p-6 text-center transition-all duration-300
          ${
            isDragActive
              ? 'border-copper-500/60 bg-copper-500/5'
              : 'border-copper-500/25 hover:border-copper-500/45 bg-white/40'
          }
        `}
      >
        <input {...getInputProps()} />
        <Upload
          className={`w-10 h-10 sm:w-8 sm:h-8 mx-auto mb-3 transition-colors duration-300 ${
            isDragActive ? 'text-copper-500' : 'text-near-black/30'
          }`}
          strokeWidth={1.5}
        />
        <p className="text-sm text-near-black/50">
          {isDragActive ? 'Drop files here' : 'Drag files here or click to browse'}
        </p>
        {hint && <p className="text-xs text-near-black/30 mt-2">{hint}</p>}
      </div>

      {files.length > 0 && (
        <div className="mt-3 space-y-2">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center justify-between gap-3 px-3 py-2 bg-white/50 border border-cream-300/50 rounded-sm"
            >
              <div className="flex items-center gap-2 min-w-0">
                <FileText className="w-4 h-4 text-copper-500 flex-shrink-0" strokeWidth={1.5} />
                <span className="text-sm text-near-black/70 truncate">{file.name}</span>
                <span className="text-xs text-near-black/40 flex-shrink-0">
                  {(file.size / 1024).toFixed(0)}KB
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(index);
                }}
                className="text-near-black/30 hover:text-copper-500 transition-colors flex-shrink-0 p-2 -m-2"
                aria-label="Remove file"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Password Input Component ────────────────────────────────────────
function PasswordInput({
  id,
  placeholder,
  register,
  error,
  label,
  required = false,
}: {
  id: string;
  placeholder: string;
  register: ReturnType<typeof useForm<AccessionFormData>>['register'];
  error?: string;
  label: string;
  required?: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label htmlFor={id} className={labelClasses}>
        <span className="flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-copper-500/60" strokeWidth={1.5} />
          {label} {required && <span className="text-red-400">*</span>}
        </span>
      </label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          id={id}
          placeholder={placeholder}
          autoComplete="off"
          {...register(id as keyof AccessionFormData)}
          className={`${inputClasses} pr-10`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-1 top-1/2 -translate-y-1/2 text-near-black/30 hover:text-copper-500 transition-colors p-2 -m-2"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" strokeWidth={1.5} />
          ) : (
            <Eye className="w-5 h-5" strokeWidth={1.5} />
          )}
        </button>
      </div>
      {error && <p className={errorClasses}>{error}</p>}
    </div>
  );
}

// ─── Section Header Component ────────────────────────────────────────
function SectionHeader({
  numeral,
  title,
  subtitle,
  icon: Icon,
}: {
  numeral: string;
  title: string;
  subtitle: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  return (
    <div className="mb-6 sm:mb-8 pb-5 sm:pb-6 border-b border-copper-500/15">
      {/* Mobile: stacked layout */}
      <div className="flex flex-col items-center gap-3 text-center sm:hidden">
        <div className="flex items-center justify-center w-11 h-11 border border-copper-500/30">
          <span className="text-copper-500 font-display font-bold text-sm">{numeral}</span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4 text-copper-500/60 flex-shrink-0" strokeWidth={1.5} />}
            <h2 className="font-display font-bold text-lg uppercase text-near-black tracking-brand-header">
              {title}
            </h2>
          </div>
          <p className="text-xs text-copper-500/60 uppercase tracking-brand-label mt-1">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Desktop: horizontal layout */}
      <div className="hidden sm:flex items-center gap-4">
        <div className="flex items-center justify-center w-11 h-11 border border-copper-500/30 flex-shrink-0">
          <span className="text-copper-500 font-display font-bold text-sm">{numeral}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4 text-copper-500/60 flex-shrink-0" strokeWidth={1.5} />}
            <h2 className="font-display font-bold text-xl uppercase text-near-black tracking-brand-header">
              {title}
            </h2>
          </div>
          <p className="text-xs text-copper-500/60 uppercase tracking-brand-label mt-1">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Step Progress Indicator ────────────────────────────────────────
function StepProgress({
  currentStep,
  completedSteps,
  onStepClick,
  skippedSteps = [],
}: {
  currentStep: number;
  completedSteps: Record<number, boolean>;
  onStepClick: (step: number) => void;
  skippedSteps?: number[];
}) {
  return (
    <div className="flex items-center justify-center gap-0 px-2">
      {STEPS.map((step, i) => {
        const stepNum = i + 1;
        const isSkipped = skippedSteps.includes(stepNum);
        const isCompleted = !isSkipped && completedSteps[stepNum] && stepNum < currentStep;
        const isCurrent = stepNum === currentStep;
        const isClickable = !isSkipped && (stepNum <= currentStep || completedSteps[stepNum]);

        return (
          <div key={stepNum} className="flex items-center">
            {/* Step node */}
            <button
              type="button"
              onClick={() => isClickable && onStepClick(stepNum)}
              disabled={isSkipped}
              className={`
                relative flex items-center justify-center transition-all duration-500
                ${isClickable ? 'cursor-pointer' : 'cursor-default'}
                ${isSkipped
                  ? 'w-9 h-9 border border-copper-500/10 bg-cream-100/50'
                  : isCurrent
                    ? 'w-11 h-11 border-2 border-copper-500 bg-copper-500/10'
                    : isCompleted
                      ? 'w-9 h-9 bg-copper-500'
                      : 'w-9 h-9 border border-copper-500/25'
                }
              `}
              aria-label={`${step.label} - Step ${stepNum}${isSkipped ? ' (not applicable)' : ''}`}
            >
              {isSkipped ? (
                <span className="text-copper-500/20 font-display font-bold text-xs">&mdash;</span>
              ) : isCompleted ? (
                <Check className="w-5 h-5 text-cream-50" strokeWidth={2.5} />
              ) : (
                <span
                  className={`font-display font-bold text-xs ${
                    isCurrent ? 'text-copper-500' : 'text-near-black/25'
                  }`}
                >
                  {step.numeral}
                </span>
              )}
              {isCurrent && (
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] text-copper-500 font-medium uppercase tracking-brand-label whitespace-nowrap hidden sm:block">
                  {step.label}
                </span>
              )}
            </button>

            {/* Connector line */}
            {i < STEPS.length - 1 && (
              <div
                className={`w-6 sm:w-12 h-px transition-colors duration-500 ${
                  isCompleted ? 'bg-copper-500' : 'bg-copper-500/15'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────
export default function AssetAccessionContent() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>(
    'idle'
  );

  // File upload state
  const [logoFiles, setLogoFiles] = useState<File[]>([]);
  const [secondaryFiles, setSecondaryFiles] = useState<File[]>([]);
  const [guidelineFiles, setGuidelineFiles] = useState<File[]>([]);

  // Checkbox state for Section III
  const [metaAccess, setMetaAccess] = useState(false);
  const [googleAdsAccess, setGoogleAdsAccess] = useState(false);
  const [crmAccess, setCrmAccess] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    setError,
    formState: { errors },
    watch,
  } = useForm<AccessionFormData>({
    resolver: zodResolver(accessionSchema),
    defaultValues: {
      metaBusinessSuiteDetails: '',
      googleAdsDetails: '',
      crmDetails: '',
    },
  });

  // Watch required fields for completion tracking
  const watchedFields = watch();
  const clientTier = watchedFields.clientTier;
  const isTier1 = clientTier === 'tier-1';

  const sectionComplete: Record<number, boolean> = {
    1:
      !!watchedFields.clientTier &&
      !!watchedFields.legalEntityName &&
      !!watchedFields.businessRegistrationAddress &&
      logoFiles.length > 0 &&
      (guidelineFiles.length > 0 || (!!watchedFields.brandVoiceLink && watchedFields.brandVoiceLink.trim().length > 0)),
    2:
      !!watchedFields.domainRegistrarUrl &&
      !!watchedFields.domainRegistrarUsername &&
      !!watchedFields.domainRegistrarPassword &&
      !!watchedFields.desiredPrimaryEmail,
    3: isTier1 || (!!watchedFields.targetAudienceProfile && watchedFields.targetAudienceProfile.length >= 10),
    4: true,
  };

  // File handlers
  const handleRemoveFile = (
    setter: React.Dispatch<React.SetStateAction<File[]>>,
    index: number
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleLogoDrop = useCallback(
    (accepted: File[]) => setLogoFiles(accepted),
    []
  );
  const handleSecondaryDrop = useCallback(
    (accepted: File[]) => setSecondaryFiles((prev) => [...prev, ...accepted]),
    []
  );
  const handleGuidelineDrop = useCallback(
    (accepted: File[]) => setGuidelineFiles((prev) => [...prev, ...accepted]),
    []
  );

  // ─── Step Navigation ──────────────────────────────────────────────
  const handleNext = async () => {
    const fields = STEP_FIELDS[currentStep];
    const isValid = fields.length === 0 || (await trigger(fields));
    if (!isValid) return;

    // Manual validation for step 1 (brand guidelines: file upload or link required)
    if (currentStep === 1) {
      const hasGuidelineFiles = guidelineFiles.length > 0;
      const hasGuidelineLink = !!watchedFields.brandVoiceLink && watchedFields.brandVoiceLink.trim().length > 0;
      if (!hasGuidelineFiles && !hasGuidelineLink) {
        setError('brandVoiceLink', {
          type: 'manual',
          message: 'Please upload brand guidelines or provide a link',
        });
        return;
      }
    }

    // Manual validation for step 3 (targetAudienceProfile is conditionally required)
    if (currentStep === 3) {
      const profile = watchedFields.targetAudienceProfile;
      if (!profile || profile.length < 10) {
        setError('targetAudienceProfile', {
          type: 'manual',
          message: 'Please describe your ideal client in at least 3 sentences',
        });
        return;
      }
    }

    // Skip step 3 for Tier I clients
    const nextStep = currentStep === 2 && isTier1 ? 4 : currentStep + 1;
    setDirection(1);
    setCurrentStep(Math.min(nextStep, 4));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    // Skip step 3 for Tier I clients
    const prevStep = currentStep === 4 && isTier1 ? 2 : currentStep - 1;
    setDirection(-1);
    setCurrentStep(Math.max(prevStep, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStepClick = (step: number) => {
    if (step === currentStep) return;
    if (step === 3 && isTier1) return;
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ─── Submit ───────────────────────────────────────────────────────
  const onSubmit = async (data: AccessionFormData) => {
    setSubmitStatus('submitting');

    try {
      const csrfResponse = await fetch('/api/csrf-token');
      if (!csrfResponse.ok) {
        throw new Error('Failed to obtain security token.');
      }
      const { token: csrfToken } = await csrfResponse.json();

      const formData = new FormData();

      const isNotTier1 = data.clientTier !== 'tier-1';
      const textFields: Record<string, string | undefined> = {
        clientTier: data.clientTier,
        legalEntityName: data.legalEntityName,
        businessRegistrationAddress: data.businessRegistrationAddress,
        brandVoiceLink: data.brandVoiceLink,
        domainRegistrarUrl: data.domainRegistrarUrl,
        domainRegistrarUsername: data.domainRegistrarUsername,
        domainRegistrarPassword: data.domainRegistrarPassword,
        existingWebsiteUrl: data.existingWebsiteUrl,
        existingWebsiteUsername: data.existingWebsiteUsername,
        existingWebsitePassword: data.existingWebsitePassword,
        desiredPrimaryEmail: data.desiredPrimaryEmail,
        additionalTeamSeats: data.additionalTeamSeats,
        currentEmailService: data.currentEmailService,
        metaBusinessSuiteDetails: isNotTier1 && metaAccess ? data.metaBusinessSuiteDetails : undefined,
        googleAdsDetails: isNotTier1 && googleAdsAccess ? data.googleAdsDetails : undefined,
        crmDetails: isNotTier1 && crmAccess ? data.crmDetails : undefined,
        targetAudienceProfile: isNotTier1 ? data.targetAudienceProfile : undefined,
      };

      for (const [key, value] of Object.entries(textFields)) {
        if (value !== undefined && value !== '') {
          formData.append(key, value);
        }
      }

      for (const file of logoFiles) {
        formData.append('logoFiles', file);
      }
      for (const file of secondaryFiles) {
        formData.append('secondaryFiles', file);
      }
      for (const file of guidelineFiles) {
        formData.append('guidelineFiles', file);
      }

      const response = await fetch('/api/asset-accession/submit', {
        method: 'POST',
        headers: {
          'x-csrf-token': csrfToken,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Submission failed.');
      }

      setSubmitStatus('success');
    } catch (error) {
      console.error('[Asset Accession] Submit error:', error);
      setSubmitStatus('error');
    }
  };

  // ─── Success State ────────────────────────────────────────────────
  if (submitStatus === 'success') {
    return (
      <main className="min-h-screen bg-gradient-to-b from-cream-50 to-cream-200">
        <div className="min-h-screen flex items-center justify-center px-4 py-8">
          <motion.div
            className="text-center max-w-lg px-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
            >
              <CheckCircle2
                className="w-20 h-20 mx-auto text-copper-500 mb-8"
                strokeWidth={1}
              />
            </motion.div>

            <h2 className="font-display font-bold text-xl sm:text-3xl uppercase text-near-black tracking-brand-header mb-4">
              Assets Received
            </h2>
            <p className="text-base text-near-black/60 leading-relaxed mb-8">
              Your assets have been secured. We will initiate a 24-hour Security
              Audit of your credentials. Your project will then advance to the Mobilization
              Phase.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-copper-500 hover:bg-copper-600 text-cream-50 font-medium text-sm tracking-brand-label uppercase px-8 py-4 rounded-sm transition-all duration-300 w-fit min-h-[48px]"
            >
              Return to HQ
            </Link>
          </motion.div>
        </div>
      </main>
    );
  }

  // ─── Form ─────────────────────────────────────────────────────────
  return (
    <main className="min-h-screen bg-gradient-to-b from-cream-50 to-cream-200 relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ─── Header ────────────────────────────────────────── */}
        <section className="relative pt-32 sm:pt-40 pb-12 sm:pb-16 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1000px] relative">
            <motion.div
              className="text-center"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 30, filter: 'blur(12px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 border border-copper-500/30 px-4 py-1.5 rounded-sm mb-6">
                <div className="w-2 h-2 rounded-full bg-copper-500 animate-pulse" />
                <span className="text-xs text-copper-500 uppercase tracking-brand-label font-medium">
                  Phase 1: Mobilization
                </span>
              </div>

              <h1 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl uppercase text-near-black tracking-brand-header mb-6">
                Asset Accession Protocol
              </h1>

              <p className="text-base text-near-black/50 leading-relaxed max-w-2xl mx-auto mb-12">
                Complete each section to proceed. Fields marked with a red asterisk (
                <span className="text-red-400">*</span>) are required.
              </p>

              {/* Step progress */}
              <div className="mb-4">
                <StepProgress
                  currentStep={currentStep}
                  completedSteps={sectionComplete}
                  onStepClick={handleStepClick}
                  skippedSteps={isTier1 ? [3] : []}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* ─── Step Content ──────────────────────────────────── */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1000px] relative pb-16 sm:pb-24">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={prefersReducedMotion ? undefined : stepVariants}
              initial={prefersReducedMotion ? false : 'enter'}
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* ═══ Step 1: Brand Sovereignty ═══ */}
              {currentStep === 1 && (
                <div className="relative bg-cream-50 border-2 border-copper-500/20 p-5 sm:p-8 lg:p-10 rounded-sm">
                  <SectionHeader numeral="I" title="Brand Sovereignty" subtitle="Identity Assets" />

                  <motion.div
                    className="space-y-6"
                    variants={accessionFieldStagger}
                    initial={prefersReducedMotion ? false : 'hidden'}
                    animate="visible"
                  >
                    <motion.div variants={accessionFieldItem}>
                      <label htmlFor="legalEntityName" className={labelClasses}>
                        Legal Entity Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="legalEntityName"
                        placeholder="The exact name for legal footers and contracts"
                        {...register('legalEntityName')}
                        className={inputClasses}
                      />
                      {errors.legalEntityName && (
                        <p className={errorClasses}>{errors.legalEntityName.message}</p>
                      )}
                    </motion.div>

                    <motion.div variants={accessionFieldItem}>
                      <label htmlFor="businessRegistrationAddress" className={labelClasses}>
                        Business Registration Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="businessRegistrationAddress"
                        placeholder="Physical or registered address"
                        {...register('businessRegistrationAddress')}
                        className={inputClasses}
                      />
                      {errors.businessRegistrationAddress && (
                        <p className={errorClasses}>{errors.businessRegistrationAddress.message}</p>
                      )}
                    </motion.div>

                    <motion.div variants={accessionFieldItem}>
                      <label htmlFor="clientTier" className={labelClasses}>
                        Service Tier <span className="text-red-400">*</span>
                      </label>
                      <div className="relative">
                        <select
                          id="clientTier"
                          {...register('clientTier')}
                          className={`${inputClasses} appearance-none cursor-pointer pr-10`}
                          defaultValue=""
                        >
                          <option value="" disabled>Select your service tier</option>
                          <option value="tier-1">Tier I</option>
                          <option value="tier-2">Tier II</option>
                          <option value="tier-3">Tier III</option>
                        </select>
                        <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-copper-500/50 rotate-90 pointer-events-none" strokeWidth={1.5} />
                      </div>
                      {errors.clientTier && (
                        <p className={errorClasses}>{errors.clientTier.message}</p>
                      )}
                    </motion.div>

                    <motion.div variants={accessionFieldItem}>
                      <FileDropZone
                        label="Primary Brand Logo (Master File)"
                        accept={{ 'image/svg+xml': ['.svg'], 'image/png': ['.png'] }}
                        files={logoFiles}
                        onDrop={handleLogoDrop}
                        onRemove={(index) => handleRemoveFile(setLogoFiles, index)}
                        required
                        hint="SVG or high-resolution PNG"
                      />
                    </motion.div>

                    <motion.div variants={accessionFieldItem}>
                      <FileDropZone
                        label="Secondary Assets"
                        accept={{
                          'image/*': ['.svg', '.png', '.jpg', '.jpeg', '.webp'],
                          'application/pdf': ['.pdf'],
                        }}
                        multiple
                        files={secondaryFiles}
                        onDrop={handleSecondaryDrop}
                        onRemove={(index) => handleRemoveFile(setSecondaryFiles, index)}
                        hint="Sub-logos, icons, or brand patterns"
                      />
                    </motion.div>

                    <motion.div variants={accessionFieldItem}>
                      <FileDropZone
                        label="Brand Voice / Guidelines"
                        accept={{
                          'application/pdf': ['.pdf'],
                          'image/*': ['.png', '.jpg', '.jpeg'],
                          'application/zip': ['.zip'],
                        }}
                        multiple
                        files={guidelineFiles}
                        onDrop={handleGuidelineDrop}
                        onRemove={(index) => handleRemoveFile(setGuidelineFiles, index)}
                        required
                        hint="Fonts, color hex codes, or existing brand boards"
                      />
                      <div className="mt-3">
                        <label htmlFor="brandVoiceLink" className="block text-xs text-near-black/40 mb-1.5">
                          Or provide a link to your brand guidelines
                        </label>
                        <input
                          type="url"
                          id="brandVoiceLink"
                          placeholder="https://drive.google.com/..."
                          {...register('brandVoiceLink')}
                          className={`${inputClasses} text-xs`}
                        />
                        {errors.brandVoiceLink && (
                          <p className={errorClasses}>{errors.brandVoiceLink.message}</p>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {/* ═══ Step 2: Digital Infrastructure ═══ */}
              {currentStep === 2 && (
                <div className="relative bg-cream-50 border-2 border-copper-500/20 p-5 sm:p-8 lg:p-10 rounded-sm">
                  <SectionHeader
                    numeral="II"
                    title="Digital Infrastructure"
                    subtitle="Credentials"
                    icon={Globe}
                  />

                  <motion.div
                    className="space-y-8"
                    variants={accessionFieldStagger}
                    initial={prefersReducedMotion ? false : 'hidden'}
                    animate="visible"
                  >
                    <motion.div variants={accessionFieldItem}>
                      <p className="text-sm font-medium text-near-black mb-4 tracking-normal">
                        Domain Registrar Login <span className="text-red-400">*</span>
                        <span className="text-xs text-near-black/40 ml-2 font-normal">
                          (Namecheap, GoDaddy, etc.)
                        </span>
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="domainRegistrarUrl" className="block text-xs text-near-black/40 mb-1.5">
                            URL
                          </label>
                          <input
                            type="text"
                            id="domainRegistrarUrl"
                            placeholder="https://namecheap.com"
                            {...register('domainRegistrarUrl')}
                            className={inputClasses}
                          />
                          {errors.domainRegistrarUrl && (
                            <p className={errorClasses}>{errors.domainRegistrarUrl.message}</p>
                          )}
                        </div>
                        <div>
                          <label htmlFor="domainRegistrarUsername" className="block text-xs text-near-black/40 mb-1.5">
                            Username
                          </label>
                          <input
                            type="text"
                            id="domainRegistrarUsername"
                            placeholder="Username"
                            autoComplete="off"
                            {...register('domainRegistrarUsername')}
                            className={inputClasses}
                          />
                          {errors.domainRegistrarUsername && (
                            <p className={errorClasses}>{errors.domainRegistrarUsername.message}</p>
                          )}
                        </div>
                        <PasswordInput
                          id="domainRegistrarPassword"
                          label="Password"
                          placeholder="Password"
                          register={register}
                          error={errors.domainRegistrarPassword?.message}
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div variants={accessionFieldItem}>
                      <p className="text-sm font-medium text-near-black mb-4 tracking-normal">
                        Existing Website Access
                        <span className="text-xs text-near-black/40 ml-2 font-normal">
                          (WordPress, Wix, etc. - if migrating data)
                        </span>
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="existingWebsiteUrl" className="block text-xs text-near-black/40 mb-1.5">
                            URL
                          </label>
                          <input
                            type="text"
                            id="existingWebsiteUrl"
                            placeholder="https://yourdomain.com/wp-admin"
                            {...register('existingWebsiteUrl')}
                            className={inputClasses}
                          />
                        </div>
                        <div>
                          <label htmlFor="existingWebsiteUsername" className="block text-xs text-near-black/40 mb-1.5">
                            Username
                          </label>
                          <input
                            type="text"
                            id="existingWebsiteUsername"
                            placeholder="Username"
                            autoComplete="off"
                            {...register('existingWebsiteUsername')}
                            className={inputClasses}
                          />
                        </div>
                        <PasswordInput
                          id="existingWebsitePassword"
                          label="Password"
                          placeholder="Password"
                          register={register}
                        />
                      </div>
                    </motion.div>

                    <div className="h-px bg-copper-500/15" />

                    <motion.div variants={accessionFieldItem}>
                      <label htmlFor="desiredPrimaryEmail" className={labelClasses}>
                        Professional Email Setup <span className="text-red-400">*</span>
                        <span className="text-xs text-near-black/40 ml-2 font-normal">
                          Desired primary address
                        </span>
                      </label>
                      <input
                        type="text"
                        id="desiredPrimaryEmail"
                        placeholder="e.g. john@brand.com"
                        {...register('desiredPrimaryEmail')}
                        className={inputClasses}
                      />
                      {errors.desiredPrimaryEmail && (
                        <p className={errorClasses}>{errors.desiredPrimaryEmail.message}</p>
                      )}
                    </motion.div>

                    <motion.div variants={accessionFieldItem} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="additionalTeamSeats" className={labelClasses}>
                          Additional Team Seats Required
                        </label>
                        <input
                          type="text"
                          id="additionalTeamSeats"
                          placeholder="List additional email addresses needed"
                          {...register('additionalTeamSeats')}
                          className={inputClasses}
                        />
                      </div>
                      <div>
                        <label htmlFor="currentEmailService" className={labelClasses}>
                          Current Email Service
                        </label>
                        <input
                          type="text"
                          id="currentEmailService"
                          placeholder="e.g. Personal Gmail, Zoho, etc."
                          {...register('currentEmailService')}
                          className={inputClasses}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {/* ═══ Step 3: Acquisition & Intel ═══ */}
              {currentStep === 3 && (
                <div className="relative bg-cream-50 border-2 border-copper-500/20 p-5 sm:p-8 lg:p-10 rounded-sm">
                  <SectionHeader
                    numeral="III"
                    title="Acquisition & Intel"
                    subtitle="Tier II & III Only"
                    icon={BarChart3}
                  />

                  <motion.div
                    className="space-y-6"
                    variants={accessionFieldStagger}
                    initial={prefersReducedMotion ? false : 'hidden'}
                    animate="visible"
                  >
                    <motion.div variants={accessionFieldItem}>
                      <div className="p-4 bg-white/40 border border-copper-500/15 rounded-sm">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={metaAccess}
                            onChange={(e) => setMetaAccess(e.target.checked)}
                            className="mt-1 w-5 h-5 rounded-sm border-copper-500/40 bg-white/60 text-copper-500 focus:ring-copper-500/30 cursor-pointer accent-copper-500"
                          />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-near-black">
                              Meta Business Suite Access <span className="text-red-400">*</span>
                            </span>
                            <p className="text-xs text-near-black/40 mt-1">
                              Login or Admin Invite to ZERA
                            </p>
                          </div>
                        </label>
                        <AnimatePresence>
                          {metaAccess && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <input
                                type="text"
                                placeholder="Admin email or login details"
                                {...register('metaBusinessSuiteDetails')}
                                className={`${inputClasses} mt-3`}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    <motion.div variants={accessionFieldItem}>
                      <div className="p-4 bg-white/40 border border-copper-500/15 rounded-sm">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={googleAdsAccess}
                            onChange={(e) => setGoogleAdsAccess(e.target.checked)}
                            className="mt-1 w-5 h-5 rounded-sm border-copper-500/40 bg-white/60 text-copper-500 focus:ring-copper-500/30 cursor-pointer accent-copper-500"
                          />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-near-black">
                              Google Ads / Search Console Access
                            </span>
                            <p className="text-xs text-near-black/40 mt-1">If existing</p>
                          </div>
                        </label>
                        <AnimatePresence>
                          {googleAdsAccess && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <input
                                type="text"
                                placeholder="Google Ads account email or access details"
                                {...register('googleAdsDetails')}
                                className={`${inputClasses} mt-3`}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    <motion.div variants={accessionFieldItem}>
                      <div className="p-4 bg-white/40 border border-copper-500/15 rounded-sm">
                        <label className="flex items-start gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={crmAccess}
                            onChange={(e) => setCrmAccess(e.target.checked)}
                            className="mt-1 w-5 h-5 rounded-sm border-copper-500/40 bg-white/60 text-copper-500 focus:ring-copper-500/30 cursor-pointer accent-copper-500"
                          />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-near-black">CRM Credentials</span>
                            <p className="text-xs text-near-black/40 mt-1">
                              HubSpot, Mailchimp, or similar
                            </p>
                          </div>
                        </label>
                        <AnimatePresence>
                          {crmAccess && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <input
                                type="text"
                                placeholder="CRM login details"
                                {...register('crmDetails')}
                                className={`${inputClasses} mt-3`}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    <div className="h-px bg-copper-500/15" />

                    <motion.div variants={accessionFieldItem}>
                      <label htmlFor="targetAudienceProfile" className={labelClasses}>
                        Target Audience Whale Profile <span className="text-red-400">*</span>
                      </label>
                      <p className="text-xs text-near-black/40 mb-2">
                        Describe your ideal high-value client in 3 sentences.
                      </p>
                      <textarea
                        id="targetAudienceProfile"
                        rows={4}
                        placeholder="e.g. Our ideal client is a mid-to-large enterprise in the logistics sector with annual revenue above $5M. They are actively looking to digitize their operations and expand into new markets. They value long-term partnerships and data-driven decision making."
                        {...register('targetAudienceProfile')}
                        className={`${inputClasses} resize-none`}
                      />
                      {errors.targetAudienceProfile && (
                        <p className={errorClasses}>{errors.targetAudienceProfile.message}</p>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              )}

              {/* ═══ Step 4: Terms of Accession ═══ */}
              {currentStep === 4 && (
                <div className="relative bg-cream-50 border-2 border-copper-500/20 p-5 sm:p-8 lg:p-10 rounded-sm">
                  <SectionHeader
                    numeral="IV"
                    title="Terms of Accession"
                    subtitle="Security Protocol"
                    icon={ScrollText}
                  />

                  <motion.div
                    className="space-y-6"
                    variants={accessionFieldStagger}
                    initial={prefersReducedMotion ? false : 'hidden'}
                    animate="visible"
                  >
                    <motion.div variants={accessionFieldItem}>
                      <div className="flex items-start gap-3 p-4 bg-copper-500/5 border border-copper-500/25 rounded-sm">
                        <Shield
                          className="w-5 h-5 text-copper-500 flex-shrink-0 mt-0.5"
                          strokeWidth={1.5}
                        />
                        <div>
                          <p className="text-sm font-medium text-copper-600 uppercase tracking-brand-label mb-2">
                            Security Advisory
                          </p>
                          <p className="text-sm text-near-black/60 leading-relaxed">
                            By providing these credentials, you authorize ZERA Dynamics to perform a
                            Security Audit and Infrastructure Configuration. We recommend changing
                            temporary passwords once the Mobilization Phase is complete.
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div variants={accessionFieldItem}>
                      <div className="p-4 border border-near-black/[0.08] rounded-sm">
                        <p className="text-xs text-near-black/50 leading-relaxed">
                          Once submitted, ZERA will perform a Security Audit of your credentials within
                          24 hours. Your project will then move into the Mobilization Phase. Please note
                          that the 90-day build cycle begins only once all Critical Assets marked with an
                          asterisk (<span className="text-red-400">*</span>) have been received.
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* ─── Navigation ────────────────────────────────────── */}
          <div className={`mt-8 ${currentStep > 1 ? 'flex items-center justify-between' : 'flex justify-center'}`}>
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-sm font-medium text-near-black/50 hover:text-near-black transition-colors duration-300 uppercase tracking-brand-label py-3 px-2 min-h-[48px]"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
                <span>Back</span>
              </button>
            )}

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center justify-center gap-2 bg-copper-500 hover:bg-copper-600 text-cream-50 font-medium text-sm tracking-brand-label uppercase px-12 sm:px-20 py-4 rounded-sm transition-all duration-300 min-h-[48px]"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
              </button>
            ) : (
              <div className="text-center">
                {submitStatus === 'error' && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-200 p-4 rounded-sm mb-4 text-left max-w-lg mx-auto">
                    <AlertCircle
                      className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
                      strokeWidth={1.5}
                    />
                    <p className="text-sm font-normal text-near-black/70 leading-relaxed">
                      Submission failed. Please try again or contact support.
                    </p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={submitStatus === 'submitting'}
                  className="inline-flex items-center gap-3 bg-copper-500 hover:bg-copper-600 text-cream-50 font-medium text-sm tracking-brand-label uppercase px-8 sm:px-10 py-4 rounded-sm transition-all duration-300 w-fit disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px]"
                >
                  {submitStatus === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span className="hidden sm:inline">Processing...</span>
                      <span className="sm:hidden">Processing</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" strokeWidth={1.5} />
                      <span className="hidden sm:inline">Submit Accession Protocol</span>
                      <span className="sm:hidden">Submit</span>
                    </>
                  )}
                </button>
                <p className="text-xs text-near-black/30 mt-3">
                  All credentials are encrypted in transit and handled under strict security protocols.
                </p>
              </div>
            )}
          </div>
        </div>
      </form>
    </main>
  );
}
