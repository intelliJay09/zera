/**
 * Discovery Form Auto-Save API
 * Saves form progress to database
 */

import { NextRequest, NextResponse } from 'next/server';
import { queryOne, insert, update } from '@/lib/db';
import { checkRateLimit, RATE_LIMITS } from '@/lib/rate-limit';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting: 60 requests per 5 minutes
    const rateLimit = await checkRateLimit(
      request,
      '/api/discovery/save',
      RATE_LIMITS.DISCOVERY_SAVE.maxRequests,
      RATE_LIMITS.DISCOVERY_SAVE.windowMinutes
    );

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many save requests. Please slow down.',
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
            'X-RateLimit-Limit': RATE_LIMITS.DISCOVERY_SAVE.maxRequests.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.resetAt.toISOString(),
          },
        }
      );
    }
    const body = await request.json();
    const {
      submissionId,
      email,
      checkoutId,
      currentSection,
      formData,
    } = body;

    // Extract email from formData if not provided directly
    let userEmail = email;
    if (!userEmail && formData.email) {
      userEmail = formData.email;
    }

    // Validate required fields
    if (!userEmail) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      );
    }

    let id = submissionId;
    let resumeToken = null;

    // Check if submission exists
    if (submissionId) {
      const existing = await queryOne(
        `SELECT id, resume_token FROM discovery_submissions WHERE id = ?`,
        [submissionId]
      );

      if (!existing) {
        return NextResponse.json(
          { success: false, error: 'Submission not found' },
          { status: 404 }
        );
      }

      resumeToken = (existing as any).resume_token;
    } else {
      // Check if email already has a submission
      const existing = await queryOne(
        `SELECT id, resume_token FROM discovery_submissions WHERE email = ? AND completion_status != 'completed'`,
        [userEmail]
      );

      if (existing) {
        id = (existing as any).id;
        resumeToken = (existing as any).resume_token;
      }
    }

    // Prepare update fields based on form data
    const updates: string[] = [];
    const values: any[] = [];

    // Section-specific fields
    if (formData.business_name !== undefined) {
      updates.push('business_name = ?');
      values.push(formData.business_name);
    }
    if (formData.business_tagline !== undefined) {
      updates.push('business_tagline = ?');
      values.push(formData.business_tagline);
    }
    if (formData.social_links !== undefined) {
      updates.push('social_links = ?');
      values.push(JSON.stringify(formData.social_links));
    }
    if (formData.brand_style !== undefined) {
      updates.push('brand_style = ?');
      values.push(formData.brand_style);
    }
    if (formData.inspiration_sites !== undefined) {
      updates.push('inspiration_sites = ?');
      values.push(JSON.stringify(formData.inspiration_sites));
    }
    if (formData.main_goal !== undefined) {
      updates.push('main_goal = ?');
      values.push(formData.main_goal);
    }

    // Domain fields
    if (formData.desired_domain !== undefined) {
      updates.push('desired_domain = ?');
      values.push(formData.desired_domain);
    }
    if (formData.alt_domain_1 !== undefined) {
      updates.push('alt_domain_1 = ?');
      values.push(formData.alt_domain_1);
    }
    if (formData.alt_domain_2 !== undefined) {
      updates.push('alt_domain_2 = ?');
      values.push(formData.alt_domain_2);
    }

    // Content fields
    if (formData.homepage_headline !== undefined) {
      updates.push('homepage_headline = ?');
      values.push(formData.homepage_headline);
    }
    if (formData.homepage_intro !== undefined) {
      updates.push('homepage_intro = ?');
      values.push(formData.homepage_intro);
    }
    if (formData.about_headline !== undefined) {
      updates.push('about_headline = ?');
      values.push(formData.about_headline);
    }
    if (formData.about_description !== undefined) {
      updates.push('about_description = ?');
      values.push(formData.about_description);
    }
    if (formData.offerings_headline !== undefined) {
      updates.push('offerings_headline = ?');
      values.push(formData.offerings_headline);
    }
    if (formData.offerings_list !== undefined) {
      updates.push('offerings_list = ?');
      values.push(JSON.stringify(formData.offerings_list));
    }
    if (formData.gallery_headline !== undefined) {
      updates.push('gallery_headline = ?');
      values.push(formData.gallery_headline);
    }
    if (formData.shared_folder_link !== undefined) {
      updates.push('shared_folder_link = ?');
      values.push(formData.shared_folder_link);
    }
    if (formData.folder_organization_notes !== undefined) {
      updates.push('folder_organization_notes = ?');
      values.push(formData.folder_organization_notes);
    }
    if (formData.contact_phone !== undefined) {
      updates.push('contact_phone = ?');
      values.push(formData.contact_phone);
    }
    if (formData.contact_email !== undefined) {
      updates.push('contact_email = ?');
      values.push(formData.contact_email);
    }
    if (formData.contact_address !== undefined) {
      updates.push('contact_address = ?');
      values.push(formData.contact_address);
    }
    if (formData.contact_form_recipient !== undefined) {
      updates.push('contact_form_recipient = ?');
      values.push(formData.contact_form_recipient);
    }

    // Update completion status based on current section
    if (currentSection !== undefined) {
      const statusMap: Record<number, string> = {
        1: 'section_1',
        2: 'section_2',
        3: 'section_3',
        4: 'section_4',
      };
      updates.push('completion_status = ?');
      values.push(statusMap[currentSection] || 'incomplete');
    }

    // Always update the timestamp
    updates.push('updated_at = NOW()');

    if (id) {
      // Update existing submission
      values.push(id);
      await update(
        `UPDATE discovery_submissions SET ${updates.join(', ')} WHERE id = ?`,
        values
      );
    } else {
      // Create new submission
      resumeToken = crypto.randomBytes(32).toString('hex');

      // Filter out email from formData since we handle it separately
      const formDataWithoutEmail = { ...formData };
      delete formDataWithoutEmail.email;

      const hasOtherFields = Object.keys(formDataWithoutEmail).length > 0;

      await insert(
        `INSERT INTO discovery_submissions (
          email,
          checkout_id,
          resume_token,
          completion_status${hasOtherFields ? ',' : ''}
          ${hasOtherFields ? Object.keys(formDataWithoutEmail).join(', ') : ''}
        ) VALUES (?, ?, ?, ?${hasOtherFields ? ', ' + Object.keys(formDataWithoutEmail).map(() => '?').join(', ') : ''})`,
        [
          userEmail,
          checkoutId || null,
          resumeToken,
          currentSection ? `section_${currentSection}` : 'incomplete',
          ...(hasOtherFields ? Object.values(formDataWithoutEmail).map((v) =>
            typeof v === 'object' ? JSON.stringify(v) : v
          ) : []),
        ]
      );

      // Query to get the actual UUID that was created (since insertId returns 0 for UUID columns)
      const newRecord = await queryOne(
        `SELECT id FROM discovery_submissions WHERE email = ? AND resume_token = ? LIMIT 1`,
        [userEmail, resumeToken]
      );

      if (!newRecord) {
        throw new Error('Failed to retrieve created submission ID');
      }

      id = (newRecord as any).id;
    }

    return NextResponse.json({
      success: true,
      data: {
        submissionId: id,
        resumeToken,
      },
    });
  } catch (error: any) {
    console.error('Discovery form save error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to save form data',
      },
      { status: 500 }
    );
  }
}
