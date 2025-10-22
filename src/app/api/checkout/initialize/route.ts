/**
 * Payment Initialization API
 * Initializes Paystack transaction and creates checkout submission record
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  initializeTransaction,
  generateTransactionReference,
  convertToKobo,
} from '@/lib/paystack';
import { insert } from '@/lib/db';
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit';
import { getPlanById } from '@/data/waas-pricing';

// Request validation schema
const checkoutSchema = z.object({
  planId: z.string().min(1, 'Plan ID is required'),
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  agreedToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Terms of Service',
  }),
  agreedToSla: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the SLA Agreement',
  }),
  currency: z.enum(['GHS', 'USD']).default('GHS'),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 20 requests per hour
    const rateLimit = await checkRateLimit(
      request,
      '/api/checkout/initialize',
      RATE_LIMITS.CHECKOUT_INITIALIZE.maxRequests,
      RATE_LIMITS.CHECKOUT_INITIALIZE.windowMinutes
    );

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many checkout attempts. Please try again later.',
          retryAfter: Math.ceil(
            (rateLimit.resetAt.getTime() - Date.now()) / 1000
          ),
        },
        {
          status: 429,
          headers: {
            'Retry-After': Math.ceil(
              (rateLimit.resetAt.getTime() - Date.now()) / 1000
            ).toString(),
            'X-RateLimit-Limit': RATE_LIMITS.CHECKOUT_INITIALIZE.maxRequests.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.resetAt.toISOString(),
          },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = checkoutSchema.parse(body);

    // Get plan details
    const plan = getPlanById(validatedData.planId);
    if (!plan) {
      return NextResponse.json(
        { success: false, error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    // Get amount based on currency
    const amount = plan.price.monthly[validatedData.currency];

    // Generate unique transaction reference
    const reference = generateTransactionReference('TAF-WAAS');

    // Create callback URL
    const callbackUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/verify?reference=${reference}`;

    // Initialize Paystack transaction
    const paystackResponse = await initializeTransaction({
      email: validatedData.email,
      amount: convertToKobo(amount),
      currency: validatedData.currency,
      reference,
      callback_url: callbackUrl,
      metadata: {
        plan_id: plan.id,
        plan_name: plan.name,
        business_name: validatedData.businessName,
        full_name: validatedData.fullName,
        phone: validatedData.phone,
        custom_fields: [
          {
            display_name: 'Plan',
            variable_name: 'plan_name',
            value: plan.name,
          },
          {
            display_name: 'Business Name',
            variable_name: 'business_name',
            value: validatedData.businessName,
          },
        ],
      },
      channels: ['card', 'mobile_money'],
    });

    if (!paystackResponse.status) {
      return NextResponse.json(
        { success: false, error: 'Payment initialization failed' },
        { status: 500 }
      );
    }

    // Create checkout submission record in database
    const checkoutId = await insert(
      `INSERT INTO checkout_submissions (
        plan_id,
        plan_name,
        plan_price,
        full_name,
        business_name,
        email,
        phone,
        payment_status,
        payment_reference,
        payment_amount,
        payment_currency,
        agreed_to_terms,
        agreed_to_sla
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        plan.id,
        plan.name,
        JSON.stringify(plan.price.monthly),
        validatedData.fullName,
        validatedData.businessName,
        validatedData.email,
        validatedData.phone,
        'pending',
        reference,
        amount,
        validatedData.currency,
        validatedData.agreedToTerms,
        validatedData.agreedToSla,
      ]
    );

    // Return success response with payment URL
    return NextResponse.json({
      success: true,
      data: {
        checkoutId,
        reference,
        authorizationUrl: paystackResponse.data.authorization_url,
        accessCode: paystackResponse.data.access_code,
      },
    });
  } catch (error: any) {
    console.error('Checkout initialization error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error.issues,
        },
        { status: 400 }
      );
    }

    // Handle other errors
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'An unexpected error occurred',
      },
      { status: 500 }
    );
  }
}
