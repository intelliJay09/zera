'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import {
  contactFormFieldStagger,
  contactFormField,
  contactSuccessContainer,
  contactSuccessIcon,
} from '@/lib/animation-variants';

// Form validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  subject: z.string().min(1, 'Please select a subject'),
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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send message');
      }

      setSubmitStatus('success');
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
        <h3 className="text-2xl font-light font-playfair text-near-black mb-3 tracking-tight">
          Message Sent Successfully
        </h3>
        <p className="text-base font-light text-near-black/70 leading-relaxed tracking-wide mb-8">
          Thank you for reaching out. We will get back to you within 24 hours.
        </p>
        <Button
          onClick={() => setSubmitStatus('idle')}
          variant="ghost"
          size="default"
          className="w-fit mx-auto"
        >
          Send Another Message
        </Button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <motion.div
        initial={prefersReducedMotion ? false : 'hidden'}
        animate="visible"
        variants={contactFormFieldStagger}
        className="space-y-6"
      >
        {/* Name */}
        <motion.div variants={contactFormField} className="space-y-2">
          <Label htmlFor="name">
            Name <span className="text-copper-500">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Your full name"
            {...register('name')}
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && (
            <p className="text-sm text-copper-600 font-light">{errors.name.message}</p>
          )}
        </motion.div>

        {/* Email & Phone (2 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={contactFormField} className="space-y-2">
            <Label htmlFor="email">
              Email <span className="text-copper-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && (
              <p className="text-sm text-copper-600 font-light">{errors.email.message}</p>
            )}
          </motion.div>

          <motion.div variants={contactFormField} className="space-y-2">
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input id="phone" type="tel" placeholder="+1 (234) 567-890" {...register('phone')} />
          </motion.div>
        </div>

        {/* Subject */}
        <motion.div variants={contactFormField} className="space-y-2">
          <Label htmlFor="subject">
            Subject <span className="text-copper-500">*</span>
          </Label>
          <Select id="subject" {...register('subject')} aria-invalid={errors.subject ? 'true' : 'false'}>
            <option value="">Select a subject</option>
            <option value="general">General Inquiry</option>
            <option value="partnership">Partnership Opportunity</option>
            <option value="support">Support Request</option>
            <option value="feedback">Feedback</option>
            <option value="other">Other</option>
          </Select>
          {errors.subject && (
            <p className="text-sm text-copper-600 font-light">{errors.subject.message}</p>
          )}
        </motion.div>

        {/* Message */}
        <motion.div variants={contactFormField} className="space-y-2">
          <Label htmlFor="message">
            Message <span className="text-copper-500">*</span>
          </Label>
          <Textarea
            id="message"
            placeholder="Tell us about your project, goals, and timeline..."
            rows={6}
            {...register('message')}
            aria-invalid={errors.message ? 'true' : 'false'}
          />
          {errors.message && (
            <p className="text-sm text-copper-600 font-light">{errors.message.message}</p>
          )}
        </motion.div>

        {/* Error Message */}
        {submitStatus === 'error' && (
          <motion.div
            className="flex items-start gap-3 bg-copper-50 border border-copper-200 p-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle className="w-5 h-5 text-copper-600 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-sm font-light text-copper-700 leading-relaxed">{errorMessage}</p>
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.div variants={contactFormField}>
          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            size="lg"
            className="w-full sm:w-fit group/btn"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send Message</span>
                <Send className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </>
            )}
          </Button>
        </motion.div>
      </motion.div>
    </form>
  );
}
