'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { executeRecaptcha } from '@/lib/recaptcha-client';
import {
  contactFormFieldStagger,
  contactFormField,
  contactSuccessContainer,
  contactSuccessIcon,
} from '@/lib/animation-variants';

// Form validation schema for contact form
const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  inquiryCategory: z.enum(['media', 'partnership', 'careers', 'general'], {
    message: 'Please select an inquiry category',
  }),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const prefersReducedMotion = usePrefersReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Execute reCAPTCHA
      const recaptchaToken = await executeRecaptcha('submit_quote');

      if (!recaptchaToken) {
        throw new Error('Security verification failed. Please try again.');
      }

      // Get CSRF token
      const csrfResponse = await fetch('/api/csrf-token');
      const { token: csrfToken } = await csrfResponse.json();

      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrfToken,
        },
        body: JSON.stringify({
          type: 'contact_inquiry',
          service: 'General Inquiry Transmission',
          plan: 'Contact Form',
          inquiryType: data.inquiryCategory,
          recaptchaToken,
          ...data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      setSubmitStatus('success');

      // Track contact form submission in GTM
      (window as Window & { dataLayer?: Record<string, unknown>[] }).dataLayer?.push({
        event: 'contact_form_submitted',
        inquiry_category: data.inquiryCategory,
      });

      reset();

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (submitStatus === 'success') {
    return (
      <motion.div
        className="bg-white/60 backdrop-blur-sm border border-cream-300/50 p-8 sm:p-12 text-center"
        initial={prefersReducedMotion ? false : 'hidden'}
        animate="visible"
        variants={contactSuccessContainer}
      >
        <motion.div variants={contactSuccessIcon}>
          <CheckCircle2 className="w-16 h-16 mx-auto text-copper-500 mb-6" strokeWidth={1.5} />
        </motion.div>
        <h3 className="text-2xl font-light font-display uppercase text-white mb-3 tracking-brand-header">
          Transmission Received
        </h3>
        <p className="text-base font-normal text-white/70 leading-relaxed tracking-normal mb-8">
          Your inquiry has been securely transmitted. The Directorate will respond within 24 hours.
        </p>
        <Button
          onClick={() => setSubmitStatus('idle')}
          variant="ghost"
          size="default"
          className="w-fit mx-auto text-white hover:text-copper-500"
        >
          Send Another Transmission
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
      <motion.div
        initial={prefersReducedMotion ? false : 'hidden'}
        animate="visible"
        variants={contactFormFieldStagger}
        className="space-y-4 sm:space-y-6"
      >
        {/* Full Name */}
        <motion.div variants={contactFormField}>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-white mb-2 tracking-normal"
          >
            Full Name *
          </label>
          <input
            type="text"
            id="fullName"
            placeholder="John Smith"
            {...register('fullName')}
            aria-invalid={errors.fullName ? 'true' : 'false'}
            className="w-full px-4 py-3 bg-white/5 border border-copper-500/20 rounded-sm text-white placeholder-white/30 focus:outline-none focus:border-copper-500/60 transition-colors duration-300"
          />
          {errors.fullName && (
            <p className="text-sm text-copper-400 font-normal mt-1">{errors.fullName.message}</p>
          )}
        </motion.div>

        {/* Inquiry Category */}
        <motion.div variants={contactFormField}>
          <label
            htmlFor="inquiryCategory"
            className="block text-sm font-medium text-white mb-2 tracking-normal"
          >
            Inquiry Category *
          </label>
          <select
            id="inquiryCategory"
            {...register('inquiryCategory')}
            aria-invalid={errors.inquiryCategory ? 'true' : 'false'}
            className="w-full appearance-none px-4 py-3.5 pr-10 bg-white/5 border border-copper-500/20 rounded-sm text-white focus:outline-none focus:border-copper-500/60 focus:ring-2 focus:ring-copper-500/20 transition-colors duration-300 cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%23B87333' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundPosition: 'right 0.75rem center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
            }}
          >
            <option value="" className="bg-[#2a2a2a] text-white">Select category...</option>
            <option value="media" className="bg-[#2a2a2a] text-white">Media / Press Request</option>
            <option value="partnership" className="bg-[#2a2a2a] text-white">Partnership Proposal</option>
            <option value="careers" className="bg-[#2a2a2a] text-white">Careers / Talent</option>
            <option value="general" className="bg-[#2a2a2a] text-white">General Information</option>
          </select>
          {errors.inquiryCategory && (
            <p className="text-sm text-copper-400 font-normal mt-1">{errors.inquiryCategory.message}</p>
          )}
        </motion.div>

        {/* Message */}
        <motion.div variants={contactFormField}>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-white mb-2 tracking-normal"
          >
            Your Message *
          </label>
          <textarea
            id="message"
            rows={6}
            placeholder="Brief us on your requirements..."
            {...register('message')}
            aria-invalid={errors.message ? 'true' : 'false'}
            className="w-full px-4 py-3 bg-white/5 border border-copper-500/20 rounded-sm text-white placeholder-white/30 focus:outline-none focus:border-copper-500/60 transition-colors duration-300 resize-none"
          />
          {errors.message && (
            <p className="text-sm text-copper-400 font-normal mt-1">{errors.message.message}</p>
          )}
        </motion.div>

        {/* Error Message */}
        {submitStatus === 'error' && (
          <motion.div
            className="flex items-start gap-3 bg-copper-500/10 border border-copper-500/30 p-4 rounded-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-5 h-5 text-copper-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-sm font-normal text-cream-200 leading-relaxed">{errorMessage}</p>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.div variants={contactFormField}>
          <button
            type="submit"
            disabled={isSubmitting}
            className="group w-full bg-copper-500 hover:bg-copper-600 text-cream-200 font-medium text-sm tracking-brand-label uppercase px-8 py-4 rounded-sm transition-all duration-300 flex items-center justify-center gap-3 hover:gap-5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Submitting...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </motion.div>

        <p className="text-xs font-normal text-white/40 text-center tracking-normal">
          By submitting, you agree to our privacy policy. We respect your data and never
          share it with third parties.
        </p>
      </motion.div>
    </form>
  );
}
