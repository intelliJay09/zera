/**
 * Discovery Form Load/Resume API
 * Retrieves saved form progress from database
 */

import { NextRequest, NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const submissionId = searchParams.get('submissionId');
    const resumeToken = searchParams.get('resumeToken');
    const checkoutId = searchParams.get('checkoutId');

    // Need at least one identifier
    if (!email && !submissionId && !resumeToken && !checkoutId) {
      return NextResponse.json(
        { success: false, error: 'Email, submission ID, resume token, or checkout ID required' },
        { status: 400 }
      );
    }

    // Build query based on available parameters
    let query = `SELECT * FROM discovery_submissions WHERE `;
    const conditions: string[] = [];
    const values: any[] = [];

    if (submissionId) {
      conditions.push('id = ?');
      values.push(submissionId);
    } else if (resumeToken) {
      conditions.push('resume_token = ?');
      values.push(resumeToken);
    } else if (checkoutId) {
      conditions.push('checkout_id = ?');
      values.push(checkoutId);
    } else if (email) {
      conditions.push('email = ?');
      values.push(email);
    }

    // Only get incomplete or in-progress submissions
    conditions.push("completion_status != 'completed'");

    query += conditions.join(' AND ');
    query += ' ORDER BY updated_at DESC LIMIT 1';

    const submission = await queryOne(query, values);

    if (!submission) {
      return NextResponse.json({
        success: true,
        data: null,
        message: 'No saved progress found',
      });
    }

    const data = submission as any;

    // Parse JSON fields
    const socialLinks = data.social_links ? JSON.parse(data.social_links) : [];
    const inspirationSites = data.inspiration_sites ? JSON.parse(data.inspiration_sites) : null;
    const offeringsList = data.offerings_list ? JSON.parse(data.offerings_list) : [];

    // Determine current section from completion status
    let currentSection = 1;
    if (data.completion_status === 'section_1') currentSection = 1;
    else if (data.completion_status === 'section_2') currentSection = 2;
    else if (data.completion_status === 'section_3') currentSection = 3;
    else if (data.completion_status === 'section_4') currentSection = 4;

    // Build structured response matching form data structure
    return NextResponse.json({
      success: true,
      data: {
        submissionId: data.id,
        email: data.email,
        currentSection,
        resumeToken: data.resume_token,
        formData: {
          section1: {
            email: data.email || '',
            business_name: data.business_name || '',
            business_tagline: data.business_tagline || '',
            social_links: socialLinks,
            brand_style: data.brand_style || '',
            inspiration_sites: inspirationSites || { site1: '', site2: '' },
            main_goal: data.main_goal || '',
          },
          section2: {
            desired_domain: data.desired_domain || '',
            alt_domain_1: data.alt_domain_1 || '',
            alt_domain_2: data.alt_domain_2 || '',
          },
          section3: {
            homepage_headline: data.homepage_headline || '',
            homepage_intro: data.homepage_intro || '',
            about_headline: data.about_headline || '',
            about_description: data.about_description || '',
            offerings_headline: data.offerings_headline || '',
            offerings_list: offeringsList,
            gallery_headline: data.gallery_headline || '',
            shared_folder_link: data.shared_folder_link || '',
            folder_organization_notes: data.folder_organization_notes || '',
            contact_phone: data.contact_phone || '',
            contact_email: data.contact_email || '',
            contact_address: data.contact_address || '',
            contact_form_recipient: data.contact_form_recipient || '',
          },
          section4: {
            content_signoff: false, // Always reset this
          },
        },
      },
    });
  } catch (error: any) {
    console.error('Discovery form load error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to load form data',
      },
      { status: 500 }
    );
  }
}
