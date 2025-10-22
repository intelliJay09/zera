/**
 * Email Service
 * Handles sending emails via SMTP
 */

import nodemailer from 'nodemailer';

if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
  console.warn('SMTP configuration is incomplete in environment variables');
}

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const FROM_EMAIL = process.env.SMTP_FROM_EMAIL || 'hello@theastroflow.com';
const FROM_NAME = process.env.SMTP_FROM_NAME || 'TheAstroFlow';
const TO_EMAIL = process.env.EMAIL_TO || 'hello@theastroflow.com';

export interface DiscoveryFormData {
  // Section 1
  email: string;
  business_name: string;
  business_tagline?: string;
  social_links?: Array<{ platform: string; url: string }>;
  brand_style: string;
  inspiration_sites?: { site1?: string; site2?: string };
  main_goal: string;

  // Section 2
  desired_domain: string;
  alt_domain_1: string;
  alt_domain_2: string;

  // Section 3
  homepage_headline: string;
  homepage_intro?: string;
  about_headline: string;
  about_description: string;
  offerings_headline?: string;
  offerings_list?: Array<{
    type: string;
    name: string;
    description: string;
    category?: string;
    price?: string;
  }>;
  gallery_headline: string;
  shared_folder_link: string;
  folder_organization_notes?: string;
  contact_phone: string;
  contact_email: string;
  contact_address?: string;
  contact_form_recipient?: string;
}

/**
 * Send confirmation email to customer
 */
export async function sendDiscoveryFormConfirmation(
  customerEmail: string,
  businessName: string,
  submissionId: string
) {
  try {
    const info = await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: customerEmail,
      subject: `Discovery Form Received - ${businessName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Discovery Form Confirmation</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #B46E46 0%, #D4A574 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">Thank You!</h1>
            </div>

            <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 8px 8px;">
              <p style="font-size: 16px; margin-bottom: 20px;">Hi there,</p>

              <p style="font-size: 16px; margin-bottom: 20px;">
                We've successfully received your website discovery form for <strong>${businessName}</strong>.
              </p>

              <div style="background: #f8f8f8; padding: 20px; border-radius: 6px; margin: 30px 0;">
                <p style="margin: 0 0 10px 0; font-weight: 600; color: #B46E46;">What happens next?</p>
                <ol style="margin: 0; padding-left: 20px;">
                  <li style="margin-bottom: 10px;">Our team will review your requirements and prepare a custom proposal</li>
                  <li style="margin-bottom: 10px;">We'll contact you within 1-2 business days to discuss next steps</li>
                  <li style="margin-bottom: 10px;">Once approved, we'll begin building your website (typically 7-14 days)</li>
                </ol>
              </div>

              <p style="font-size: 16px; margin-bottom: 20px;">
                Your submission reference ID is: <strong style="color: #B46E46;">${submissionId}</strong>
              </p>

              <p style="font-size: 16px; margin-bottom: 20px;">
                If you have any questions in the meantime, please don't hesitate to reach out to us at
                <a href="mailto:${FROM_EMAIL}" style="color: #B46E46; text-decoration: none;">${FROM_EMAIL}</a>.
              </p>

              <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">

              <p style="font-size: 14px; color: #666; margin: 0;">
                Best regards,<br>
                <strong style="color: #B46E46;">The AstroFlow Team</strong>
              </p>
            </div>

            <div style="text-align: center; margin-top: 30px; padding: 20px; color: #999; font-size: 12px;">
              <p style="margin: 0;">© ${new Date().getFullYear()} TheAstroFlow. All rights reserved.</p>
            </div>
          </body>
        </html>
      `,
    });

    return { success: true, data: { messageId: info.messageId } };
  } catch (error: any) {
    console.error('Error in sendDiscoveryFormConfirmation:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send notification email to internal team
 */
export async function sendDiscoveryFormNotification(
  formData: DiscoveryFormData,
  submissionId: string
) {
  try {
    // Format offerings list
    const offeringsHTML = formData.offerings_list?.length
      ? formData.offerings_list
          .map(
            (item) => `
              <li style="margin-bottom: 15px; padding: 15px; background: #f8f8f8; border-radius: 6px;">
                <strong style="color: #B46E46;">${item.name}</strong>
                <span style="background: #B46E46; color: white; padding: 2px 8px; border-radius: 3px; font-size: 11px; text-transform: uppercase; margin-left: 8px;">${item.type}</span>
                <br>
                <span style="color: #666; font-size: 14px;">${item.description}</span>
                ${item.price ? `<br><strong>Price:</strong> ${item.price}` : ''}
                ${item.category ? `<br><strong>Category:</strong> ${item.category}` : ''}
              </li>
            `
          )
          .join('')
      : '<li>No offerings listed</li>';

    // Format social links
    const socialLinksHTML = formData.social_links?.length
      ? formData.social_links
          .map((link) => `<li>${link.platform}: <a href="${link.url}" style="color: #B46E46;">${link.url}</a></li>`)
          .join('')
      : '<li>No social links provided</li>';

    const info = await transporter.sendMail({
      from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      subject: `🎉 New Discovery Form Submission - ${formData.business_name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Discovery Form Submission</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #B46E46 0%, #D4A574 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 28px;">🎉 New Discovery Form Submission</h1>
              <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">${formData.business_name}</p>
            </div>

            <div style="background: #ffffff; padding: 40px 30px; border: 1px solid #e5e5e5; border-top: none; border-radius: 0 0 8px 8px;">
              <div style="background: #f0f9ff; padding: 15px; border-left: 4px solid #B46E46; margin-bottom: 30px; border-radius: 4px;">
                <p style="margin: 0; font-weight: 600;">Submission ID: <span style="color: #B46E46;">${submissionId}</span></p>
                <p style="margin: 5px 0 0 0;">Customer Email: <a href="mailto:${formData.email}" style="color: #B46E46;">${formData.email}</a></p>
              </div>

              <!-- Section 1: Brand Identity -->
              <h2 style="color: #B46E46; border-bottom: 2px solid #B46E46; padding-bottom: 10px; margin-top: 30px;">1. Brand Identity</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; vertical-align: top; width: 180px;"><strong>Business Name:</strong></td>
                  <td style="padding: 10px 0;">${formData.business_name}</td>
                </tr>
                ${formData.business_tagline ? `
                <tr>
                  <td style="padding: 10px 0; vertical-align: top;"><strong>Tagline:</strong></td>
                  <td style="padding: 10px 0;">${formData.business_tagline}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 10px 0; vertical-align: top;"><strong>Brand Style:</strong></td>
                  <td style="padding: 10px 0;">${formData.brand_style}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; vertical-align: top;"><strong>Main Goal:</strong></td>
                  <td style="padding: 10px 0; text-transform: capitalize;">${formData.main_goal.replace('_', ' ')}</td>
                </tr>
                ${formData.inspiration_sites?.site1 || formData.inspiration_sites?.site2 ? `
                <tr>
                  <td style="padding: 10px 0; vertical-align: top;"><strong>Inspiration Sites:</strong></td>
                  <td style="padding: 10px 0;">
                    ${formData.inspiration_sites.site1 ? `<a href="${formData.inspiration_sites.site1}" style="color: #B46E46; display: block;">${formData.inspiration_sites.site1}</a>` : ''}
                    ${formData.inspiration_sites.site2 ? `<a href="${formData.inspiration_sites.site2}" style="color: #B46E46; display: block;">${formData.inspiration_sites.site2}</a>` : ''}
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 10px 0; vertical-align: top;"><strong>Social Links:</strong></td>
                  <td style="padding: 10px 0;">
                    <ul style="margin: 0; padding-left: 20px;">
                      ${socialLinksHTML}
                    </ul>
                  </td>
                </tr>
              </table>

              <!-- Section 2: Domain Names -->
              <h2 style="color: #B46E46; border-bottom: 2px solid #B46E46; padding-bottom: 10px; margin-top: 30px;">2. Domain Names</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; vertical-align: top; width: 180px;"><strong>Preferred Domain:</strong></td>
                  <td style="padding: 10px 0;">${formData.desired_domain}.com</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; vertical-align: top;"><strong>Alternative 1:</strong></td>
                  <td style="padding: 10px 0;">${formData.alt_domain_1}.com</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; vertical-align: top;"><strong>Alternative 2:</strong></td>
                  <td style="padding: 10px 0;">${formData.alt_domain_2}.com</td>
                </tr>
              </table>

              <!-- Section 3: Website Content -->
              <h2 style="color: #B46E46; border-bottom: 2px solid #B46E46; padding-bottom: 10px; margin-top: 30px;">3. Website Content</h2>

              <h3 style="color: #666; font-size: 16px; margin-top: 20px;">Homepage</h3>
              <p style="margin: 10px 0;"><strong>Headline:</strong> ${formData.homepage_headline}</p>
              ${formData.homepage_intro ? `<p style="margin: 10px 0;">${formData.homepage_intro}</p>` : ''}

              <h3 style="color: #666; font-size: 16px; margin-top: 20px;">About</h3>
              <p style="margin: 10px 0;"><strong>Headline:</strong> ${formData.about_headline}</p>
              <p style="margin: 10px 0;">${formData.about_description}</p>

              ${formData.offerings_headline || formData.offerings_list?.length ? `
              <h3 style="color: #666; font-size: 16px; margin-top: 20px;">Offerings</h3>
              ${formData.offerings_headline ? `<p style="margin: 10px 0;"><strong>Headline:</strong> ${formData.offerings_headline}</p>` : ''}
              <ul style="list-style: none; padding: 0; margin: 20px 0;">
                ${offeringsHTML}
              </ul>
              ` : ''}

              <h3 style="color: #666; font-size: 16px; margin-top: 20px;">Gallery</h3>
              <p style="margin: 10px 0;"><strong>Headline:</strong> ${formData.gallery_headline}</p>

              <h3 style="color: #666; font-size: 16px; margin-top: 20px;">Files & Assets</h3>
              <p style="margin: 10px 0;">
                <strong>Shared Folder:</strong>
                <a href="${formData.shared_folder_link}" style="color: #B46E46; text-decoration: none;" target="_blank">
                  View Folder →
                </a>
              </p>
              ${formData.folder_organization_notes ? `<p style="margin: 10px 0; padding: 15px; background: #f8f8f8; border-radius: 6px;"><em>${formData.folder_organization_notes}</em></p>` : ''}

              <h3 style="color: #666; font-size: 16px; margin-top: 20px;">Contact Information</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; vertical-align: top; width: 180px;"><strong>Phone:</strong></td>
                  <td style="padding: 10px 0;">${formData.contact_phone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; vertical-align: top;"><strong>Email:</strong></td>
                  <td style="padding: 10px 0;"><a href="mailto:${formData.contact_email}" style="color: #B46E46;">${formData.contact_email}</a></td>
                </tr>
                ${formData.contact_address ? `
                <tr>
                  <td style="padding: 10px 0; vertical-align: top;"><strong>Address:</strong></td>
                  <td style="padding: 10px 0;">${formData.contact_address}</td>
                </tr>
                ` : ''}
                ${formData.contact_form_recipient ? `
                <tr>
                  <td style="padding: 10px 0; vertical-align: top;"><strong>Form Recipient:</strong></td>
                  <td style="padding: 10px 0;">${formData.contact_form_recipient}</td>
                </tr>
                ` : ''}
              </table>

              <hr style="border: none; border-top: 2px solid #e5e5e5; margin: 40px 0;">

              <div style="text-align: center; padding: 20px; background: #f0f9ff; border-radius: 8px;">
                <p style="margin: 0; font-size: 14px; color: #666;">
                  <strong>Action Required:</strong> Review the submission and contact the customer within 1-2 business days.
                </p>
              </div>
            </div>

            <div style="text-align: center; margin-top: 30px; padding: 20px; color: #999; font-size: 12px;">
              <p style="margin: 0;">Discovery Form Notification System</p>
            </div>
          </body>
        </html>
      `,
    });

    return { success: true, data: { messageId: info.messageId } };
  } catch (error: any) {
    console.error('Error in sendDiscoveryFormNotification:', error);
    return { success: false, error: error.message };
  }
}
