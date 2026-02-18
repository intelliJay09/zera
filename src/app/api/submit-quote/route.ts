import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';
import { sanitizeForEmail } from '@/lib/sanitize';
import {
  verifyFormSubmission,
  createVerificationErrorResponse,
} from '@/lib/form-verification';

// Zod validation schema for contact form
const quoteRequestSchema = z.object({
  recaptchaToken: z.string().min(1, 'reCAPTCHA token is required'),
  type: z.enum(['contact_inquiry']),
  service: z.string().min(1, 'Service is required').max(100),
  plan: z.string().min(1, 'Plan is required').max(100),
  fullName: z.string().min(2, 'Full name must be at least 2 characters').max(100),
  inquiryType: z.enum(['media', 'partnership', 'careers', 'general']).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export async function POST(request: NextRequest) {
  try {
    // Unified verification: CSRF + Rate Limiting + reCAPTCHA
    const verification = await verifyFormSubmission(request, {
      endpoint: '/api/submit-quote',
      maxRequests: 5,
      windowMinutes: 60,
      recaptchaAction: 'submit_quote',
    });

    if (!verification.allowed) {
      return createVerificationErrorResponse(verification);
    }

    // Use parsed body from verification (avoid double parsing)
    const rawData = verification.body;

    // Validate request data with Zod
    const validationResult = quoteRequestSchema.safeParse(rawData);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid form data',
          details: validationResult.error.issues
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    const categoryLabels: Record<string, string> = {
      media: 'Media / Press',
      partnership: 'Partnership',
      careers: 'Careers / Talent',
      general: 'General',
    };

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
      to: 'jacque.amoako@gmail.com',
      subject: `New Contact Inquiry — ${sanitizeForEmail(data.fullName)} (${categoryLabels[data.inquiryType || 'general'] || 'General'})`,
      html: `
        <h2>New Contact Inquiry</h2>
        <p><strong>Category:</strong> ${categoryLabels[data.inquiryType || 'general'] || 'General'}</p>
        <hr>
        <p><strong>Name:</strong> ${sanitizeForEmail(data.fullName)}</p>
        <hr>
        <h3>Message</h3>
        <p>${sanitizeForEmail(data.message)}</p>
      `,
      text: `New Contact Inquiry\n\nCategory: ${categoryLabels[data.inquiryType || 'general'] || 'General'}\nName: ${data.fullName}\n\nMessage:\n${data.message}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
