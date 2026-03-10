'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

// ============================================================
// VALIDATION SCHEMA
// ============================================================

const leadSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(255, 'Name is too long'),
  email: z
    .string()
    .email('Please enter a valid email address')
    .max(255, 'Email is too long'),
  phone: z
    .string()
    .min(7, 'Please enter a valid phone number')
    .max(50, 'Phone number is too long')
    .refine(
      (num) => /^[\+]?[0-9]{7,15}$/.test(num.replace(/[\s\-\(\)]/g, '')),
      { message: 'Please enter a valid phone number' }
    ),
  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(255, 'Company name is too long'),
});

// ============================================================
// FORM STATE TYPE
// ============================================================

export type LeadFormState = {
  error: string;
  fieldErrors?: Partial<Record<'name' | 'email' | 'phone' | 'company', string>>;
} | null;

// ============================================================
// SERVER ACTION
// ============================================================

export async function submitLeadForm(
  _prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  try {
    // 1. Extract fields
    const raw = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      company: formData.get('company') as string,
    };

    // 2. Validate
    const result = leadSchema.safeParse(raw);

    if (!result.success) {
      const fieldErrors: Partial<Record<'name' | 'email' | 'phone' | 'company', string>> = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof typeof fieldErrors;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      return { error: 'Please correct the fields below.', fieldErrors };
    }

    const { name, email, phone, company } = result.data;

    // 3. POST to Make.com webhook
    const webhookUrl = process.env.MAKE_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error('[LeadForm] MAKE_WEBHOOK_URL is not configured');
      return { error: 'Service temporarily unavailable. Please try again later.' };
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, company }),
    });

    if (!webhookResponse.ok) {
      console.error('[LeadForm] Make.com webhook failed:', webhookResponse.status, await webhookResponse.text());
      return { error: 'Submission failed. Please try again.' };
    }

    // 4. Redirect to success page
    redirect('/success');
  } catch (error) {
    // Re-throw Next.js redirect — it's not an error
    if (isRedirectError(error)) throw error;

    console.error('[LeadForm] Unexpected error:', error);
    return { error: 'Something went wrong. Please try again.' };
  }
}
