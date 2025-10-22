/**
 * Discovery Form Final Submission API
 * Marks submission as complete and sends confirmation emails
 */

import { NextRequest, NextResponse } from 'next/server';
import { queryOne, update } from '@/lib/db';
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit';
import {
  sendDiscoveryFormConfirmation,
  sendDiscoveryFormNotification,
  type DiscoveryFormData,
} from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 10 requests per hour
    const rateLimit = await checkRateLimit(
      request,
      '/api/discovery/submit',
      RATE_LIMITS.DISCOVERY_SUBMIT.maxRequests,
      RATE_LIMITS.DISCOVERY_SUBMIT.windowMinutes
    );

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many submission attempts. Please try again later.',
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
            'X-RateLimit-Limit': RATE_LIMITS.DISCOVERY_SUBMIT.maxRequests.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.resetAt.toISOString(),
          },
        }
      );
    }
    const body = await request.json();
    const { submissionId } = body;

    if (!submissionId) {
      return NextResponse.json(
        { success: false, error: 'Submission ID is required' },
        { status: 400 }
      );
    }

    // Fetch the complete submission data
    const submission = await queryOne(
      `SELECT * FROM discovery_submissions WHERE id = ?`,
      [submissionId]
    );

    if (!submission) {
      return NextResponse.json(
        { success: false, error: 'Submission not found' },
        { status: 404 }
      );
    }

    const data = submission as any;

    // Check if already completed
    if (data.completion_status === 'completed') {
      return NextResponse.json({
        success: true,
        message: 'Submission already completed',
        data: { submissionId },
      });
    }

    // Parse JSON fields
    const socialLinks = data.social_links ? JSON.parse(data.social_links) : [];
    const inspirationSites = data.inspiration_sites
      ? JSON.parse(data.inspiration_sites)
      : null;
    const offeringsList = data.offerings_list
      ? JSON.parse(data.offerings_list)
      : [];

    // Prepare form data for emails
    const formData: DiscoveryFormData = {
      email: data.email,
      business_name: data.business_name,
      business_tagline: data.business_tagline,
      social_links: socialLinks,
      brand_style: data.brand_style,
      inspiration_sites: inspirationSites,
      main_goal: data.main_goal,
      desired_domain: data.desired_domain,
      alt_domain_1: data.alt_domain_1,
      alt_domain_2: data.alt_domain_2,
      homepage_headline: data.homepage_headline,
      homepage_intro: data.homepage_intro,
      about_headline: data.about_headline,
      about_description: data.about_description,
      offerings_headline: data.offerings_headline,
      offerings_list: offeringsList,
      gallery_headline: data.gallery_headline,
      shared_folder_link: data.shared_folder_link,
      folder_organization_notes: data.folder_organization_notes,
      contact_phone: data.contact_phone,
      contact_email: data.contact_email,
      contact_address: data.contact_address,
      contact_form_recipient: data.contact_form_recipient,
    };

    // Send emails (in parallel for better performance)
    const emailResults = await Promise.allSettled([
      sendDiscoveryFormConfirmation(
        data.email,
        data.business_name,
        submissionId
      ),
      sendDiscoveryFormNotification(formData, submissionId),
    ]);

    // Check if emails succeeded
    const confirmationResult = emailResults[0];
    const notificationResult = emailResults[1];

    let emailErrors: string[] = [];

    if (
      confirmationResult.status === 'rejected' ||
      (confirmationResult.status === 'fulfilled' &&
        !confirmationResult.value.success)
    ) {
      const error =
        confirmationResult.status === 'rejected'
          ? confirmationResult.reason
          : confirmationResult.value.error;
      emailErrors.push(`Customer confirmation: ${error}`);
      console.error('Failed to send customer confirmation email:', error);
    }

    if (
      notificationResult.status === 'rejected' ||
      (notificationResult.status === 'fulfilled' &&
        !notificationResult.value.success)
    ) {
      const error =
        notificationResult.status === 'rejected'
          ? notificationResult.reason
          : notificationResult.value.error;
      emailErrors.push(`Team notification: ${error}`);
      console.error('Failed to send team notification email:', error);
    }

    // Mark submission as completed regardless of email status
    // (We've saved the data, emails can be retried manually if needed)
    await update(
      `UPDATE discovery_submissions
       SET completion_status = 'completed',
           completed_at = NOW(),
           updated_at = NOW()
       WHERE id = ?`,
      [submissionId]
    );

    // Return response
    if (emailErrors.length > 0) {
      // Submission succeeded but emails had issues
      return NextResponse.json({
        success: true,
        warning: 'Submission completed but some emails failed',
        emailErrors,
        data: { submissionId },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      data: { submissionId },
    });
  } catch (error: any) {
    console.error('Discovery form submission error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to submit form',
      },
      { status: 500 }
    );
  }
}
