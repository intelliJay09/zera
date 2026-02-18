/**
 * ZERA Strategy Session - Email Templates
 *
 * 5 Email Templates:
 * 1. Customer Payment Confirmation
 * 2. Team Notification
 * 3. Calendar Booking Confirmation
 * 4. 24h Session Reminder
 * 5. Abandoned Booking Recovery
 *
 * Style: Copper (#B87333) and Cream (#F3E9DC) colors
 * UPPERCASE headlines with Lato Bold, HTML with inline CSS, mobile-responsive
 */

import nodemailer from 'nodemailer';
import type {
  ConfirmationEmailData,
  TeamNotificationEmailData,
  CalendarConfirmationEmailData,
  ReminderEmailData,
  AbandonedBookingEmailData,
} from '@/types/strategy-session';

// ============================================================
// EMAIL CONFIGURATION
// ============================================================

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const FROM_EMAIL = process.env.SMTP_FROM_EMAIL || 'hello@zerahq.com';
const FROM_NAME = 'ZERA';
const TEAM_EMAIL = 'jacque.amoako@gmail.com';

// Brand colors
const COPPER = '#B87333';
const CREAM = '#F3E9DC';
const NEAR_BLACK = '#1a1a1a';

// ============================================================
// EMAIL TEMPLATE WRAPPER
// ============================================================

function emailWrapper(content: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ZERA Strategy Session</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: ${NEAR_BLACK}; background-color: ${CREAM}; margin: 0; padding: 0;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: ${CREAM}; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="background: linear-gradient(135deg, ${COPPER} 0%, #9a6028 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: ${CREAM}; text-transform: uppercase; letter-spacing: 2px; font-family: 'Lato', sans-serif;">
                      ZERA
                    </h1>
                    <p style="margin: 10px 0 0; font-size: 12px; color: ${CREAM}; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9;">
                      Digital Growth Systems
                    </p>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">
                    ${content}
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="background-color: ${CREAM}; padding: 30px; text-align: center; border-top: 2px solid ${COPPER};">
                    <p style="margin: 0 0 10px; font-size: 14px; color: ${NEAR_BLACK};">
                      <strong>ZERA Digital Growth Systems</strong>
                    </p>
                    <p style="margin: 0 0 15px; font-size: 13px; color: #666;">
                      <a href="mailto:hello@zerahq.com" style="color: ${COPPER}; text-decoration: none;">hello@zerahq.com</a> |
                      <a href="https://wa.me/233246492873" style="color: ${COPPER}; text-decoration: none;">+233246492873</a>
                    </p>
                    <p style="margin: 0; font-size: 12px; color: #999;">
                      &copy; ${new Date().getFullYear()} ZERA. All Rights Reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

// ============================================================
// 1. CUSTOMER PAYMENT CONFIRMATION
// ============================================================

export async function sendStrategySessionConfirmation(
  data: ConfirmationEmailData
): Promise<void> {
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; background-color: ${COPPER}; color: white; border-radius: 50%; width: 60px; height: 60px; line-height: 60px; font-size: 30px; margin-bottom: 20px;">
        ✓
      </div>
      <h2 style="margin: 0 0 10px; font-size: 28px; font-weight: 700; color: ${NEAR_BLACK}; text-transform: uppercase; letter-spacing: 1px;">
        PAYMENT CONFIRMED
      </h2>
      <p style="margin: 0; font-size: 16px; color: #666;">
        Your strategy session is secured
      </p>
    </div>

    <div style="background-color: ${CREAM}; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
      <p style="margin: 0 0 10px; font-size: 14px; color: #666;">
        <strong>Payment Reference:</strong>
      </p>
      <p style="margin: 0; font-size: 16px; color: ${NEAR_BLACK}; font-family: monospace; background-color: #fff; padding: 10px; border-radius: 4px;">
        ${data.paymentReference}
      </p>
    </div>

    <div style="margin-bottom: 30px;">
      <p style="margin: 0 0 15px; font-size: 16px; color: ${NEAR_BLACK};">
        Hi <strong>${data.fullName}</strong>,
      </p>
      <p style="margin: 0 0 15px; font-size: 15px; color: #444; line-height: 1.6;">
        Thank you for booking your ZERA Strategy Session. Your payment of <strong>${data.paymentCurrency} ${data.paymentAmount.toFixed(2)}</strong> has been successfully processed.
      </p>
    </div>

    <div style="background: linear-gradient(135deg, ${COPPER}15 0%, ${COPPER}05 100%); padding: 25px; border-radius: 6px; border-left: 4px solid ${COPPER}; margin-bottom: 30px;">
      <h3 style="margin: 0 0 15px; font-size: 18px; font-weight: 700; color: ${NEAR_BLACK}; text-transform: uppercase;">
        NEXT STEP: BOOK YOUR TIME SLOT
      </h3>
      <p style="margin: 0 0 20px; font-size: 14px; color: #555;">
        Choose a convenient time for your 60-minute strategy session:
      </p>
      <div style="text-align: center;">
        <a href="${data.calendlyBookingUrl}" style="display: inline-block; background-color: ${COPPER}; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px;">
          BOOK YOUR TIME SLOT
        </a>
      </div>
    </div>

    <div style="margin-bottom: 30px;">
      <h3 style="margin: 0 0 15px; font-size: 18px; font-weight: 700; color: ${NEAR_BLACK}; text-transform: uppercase;">
        WHAT HAPPENS NEXT
      </h3>
      <div style="margin-bottom: 15px; padding-left: 30px; position: relative;">
        <div style="position: absolute; left: 0; top: 0; width: 24px; height: 24px; background-color: ${COPPER}; color: white; border-radius: 50%; text-align: center; line-height: 24px; font-size: 13px; font-weight: 700;">
          1
        </div>
        <p style="margin: 0; font-size: 14px; color: #444;">
          <strong>Pre-Call Audit:</strong> Our team conducts a comprehensive analysis of your digital infrastructure. Findings will be shared during your session.
        </p>
      </div>
      <div style="margin-bottom: 15px; padding-left: 30px; position: relative;">
        <div style="position: absolute; left: 0; top: 0; width: 24px; height: 24px; background-color: ${COPPER}; color: white; border-radius: 50%; text-align: center; line-height: 24px; font-size: 13px; font-weight: 700;">
          2
        </div>
        <p style="margin: 0; font-size: 14px; color: #444;">
          <strong>Strategy Session:</strong> 60-minute deep-dive consultation with findings and custom roadmap
        </p>
      </div>
      <div style="padding-left: 30px; position: relative;">
        <div style="position: absolute; left: 0; top: 0; width: 24px; height: 24px; background-color: ${COPPER}; color: white; border-radius: 50%; text-align: center; line-height: 24px; font-size: 13px; font-weight: 700;">
          3
        </div>
        <p style="margin: 0; font-size: 14px; color: #444;">
          <strong>Action Plan:</strong> You receive a detailed roadmap you can implement yourself or with our team
        </p>
      </div>
    </div>

    <div style="background-color: ${CREAM}; padding: 20px; border-radius: 6px; text-align: center;">
      <p style="margin: 0 0 10px; font-size: 13px; color: #666;">
        Questions or need help?
      </p>
      <p style="margin: 0; font-size: 14px;">
        <a href="mailto:hello@zerahq.com" style="color: ${COPPER}; text-decoration: none; font-weight: 600;">Email Us</a> |
        <a href="https://wa.me/233246492873" style="color: ${COPPER}; text-decoration: none; font-weight: 600;">WhatsApp</a>
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to: `${data.fullName} <${data.businessEmail}>`,
    subject: `✓ Strategy Session Confirmed - Next: Book Your Time Slot`,
    html: emailWrapper(content),
    text: `PAYMENT CONFIRMED\n\nHi ${data.fullName},\n\nThank you for booking your ZERA Strategy Session. Your payment of ${data.paymentCurrency} ${data.paymentAmount.toFixed(2)} has been successfully processed.\n\nPayment Reference: ${data.paymentReference}\n\nNEXT STEP: Book your time slot at ${data.calendlyBookingUrl}\n\nWhat happens next:\n1. Pre-Call Audit: Our team conducts a comprehensive analysis\n2. Strategy Session: 60-minute deep-dive consultation\n3. Action Plan: Detailed roadmap for implementation\n\nQuestions? Email hello@zerahq.com or WhatsApp +233246492873`,
  });

  console.log(`Confirmation email sent to: ${data.fullName}`);
}

// ============================================================
// 2. TEAM NOTIFICATION
// ============================================================

export async function sendStrategySessionTeamNotification(
  data: TeamNotificationEmailData,
  sessionId: string
): Promise<void> {
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; background-color: ${COPPER}; color: white; border-radius: 50%; width: 60px; height: 60px; line-height: 60px; font-size: 30px; margin-bottom: 20px;">
        🎯
      </div>
      <h2 style="margin: 0 0 10px; font-size: 28px; font-weight: 700; color: ${NEAR_BLACK}; text-transform: uppercase; letter-spacing: 1px;">
        NEW STRATEGY SESSION BOOKED
      </h2>
      <p style="margin: 0; font-size: 16px; color: #666;">
        ${data.companyName}
      </p>
    </div>

    <div style="background-color: ${CREAM}; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
      <h3 style="margin: 0 0 15px; font-size: 16px; font-weight: 700; color: ${NEAR_BLACK};">
        CONTACT INFORMATION
      </h3>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #666; width: 140px;"><strong>Full Name:</strong></td>
          <td style="padding: 8px 0; color: ${NEAR_BLACK};">${data.fullName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
          <td style="padding: 8px 0; color: ${NEAR_BLACK};"><a href="mailto:${data.businessEmail}" style="color: ${COPPER}; text-decoration: none;">${data.businessEmail}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Company:</strong></td>
          <td style="padding: 8px 0; color: ${NEAR_BLACK};">${data.companyName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Website:</strong></td>
          <td style="padding: 8px 0; color: ${NEAR_BLACK};"><a href="${data.websiteUrl}" target="_blank" style="color: ${COPPER}; text-decoration: none;">${data.websiteUrl}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>WhatsApp:</strong></td>
          <td style="padding: 8px 0; color: ${NEAR_BLACK};"><a href="https://wa.me/${data.whatsappNumber.replace(/[^0-9]/g, '')}" style="color: ${COPPER}; text-decoration: none;">${data.whatsappNumber}</a></td>
        </tr>
      </table>
    </div>

    <div style="background-color: ${CREAM}; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
      <h3 style="margin: 0 0 15px; font-size: 16px; font-weight: 700; color: ${NEAR_BLACK};">
        BUSINESS CONTEXT
      </h3>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #666; width: 140px;"><strong>Revenue Range:</strong></td>
          <td style="padding: 8px 0; color: ${NEAR_BLACK};">${data.revenueRange}${data.customRevenue ? ` (${data.customRevenue})` : ''}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Growth Obstacle:</strong></td>
          <td style="padding: 8px 0; color: ${NEAR_BLACK};">${data.growthObstacle}</td>
        </tr>
      </table>
      <div style="margin-top: 15px;">
        <p style="margin: 0 0 8px; font-size: 13px; color: #666; font-weight: 700;">DESIRED OUTCOME:</p>
        <p style="margin: 0; font-size: 14px; color: ${NEAR_BLACK}; background-color: #fff; padding: 15px; border-radius: 4px; line-height: 1.6;">
          ${data.magicWandOutcome}
        </p>
      </div>
    </div>

    <div style="background-color: ${CREAM}; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
      <h3 style="margin: 0 0 15px; font-size: 16px; font-weight: 700; color: ${NEAR_BLACK};">
        PAYMENT DETAILS
      </h3>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #666; width: 140px;"><strong>Reference:</strong></td>
          <td style="padding: 8px 0; color: ${NEAR_BLACK}; font-family: monospace;">${data.paymentReference}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Amount:</strong></td>
          <td style="padding: 8px 0; color: ${NEAR_BLACK}; font-weight: 600;">$${data.paymentAmount.toFixed(2)} USD</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Session ID:</strong></td>
          <td style="padding: 8px 0; color: ${NEAR_BLACK}; font-family: monospace; font-size: 12px;">${sessionId}</td>
        </tr>
      </table>
    </div>

    ${data.utmSource || data.utmCampaign ? `
    <div style="background-color: #f0f0f0; padding: 15px; border-radius: 6px;">
      <h3 style="margin: 0 0 10px; font-size: 14px; font-weight: 700; color: #666; text-transform: uppercase;">
        Marketing Attribution
      </h3>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 13px;">
        ${data.utmSource ? `<tr><td style="padding: 4px 0; color: #666; width: 100px;">Source:</td><td style="padding: 4px 0; color: #444;">${data.utmSource}</td></tr>` : ''}
        ${data.utmCampaign ? `<tr><td style="padding: 4px 0; color: #666;">Campaign:</td><td style="padding: 4px 0; color: #444;">${data.utmCampaign}</td></tr>` : ''}
      </table>
    </div>
    ` : ''}
  `;

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to: TEAM_EMAIL,
    subject: `🎯 New Strategy Session - ${data.companyName}`,
    html: emailWrapper(content),
    text: `NEW STRATEGY SESSION BOOKED\n\nCompany: ${data.companyName}\nContact: ${data.fullName}\nEmail: ${data.businessEmail}\nWebsite: ${data.websiteUrl}\nWhatsApp: ${data.whatsappNumber}\n\nRevenue: ${data.revenueRange}\nObstacle: ${data.growthObstacle}\nDesired Outcome: ${data.magicWandOutcome}\n\nPayment: $${data.paymentAmount.toFixed(2)}\nReference: ${data.paymentReference}\nSession ID: ${sessionId}`,
  });

  console.log(`Team notification sent for session: ${sessionId}`);
}

// ============================================================
// 3. CALENDAR BOOKING CONFIRMATION
// ============================================================

export async function sendCalendarBookingConfirmation(
  data: CalendarConfirmationEmailData
): Promise<void> {
  const hasSchedule = data.scheduledDate && data.scheduledTime;
  const hasMeetingLink = data.meetingLink;
  const hasManageLinks = data.rescheduleLink && data.cancelLink;

  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; background-color: ${COPPER}; color: white; border-radius: 50%; width: 60px; height: 60px; line-height: 60px; font-size: 30px; margin-bottom: 20px;">
        &#10003;
      </div>
      <h2 style="margin: 0 0 10px; font-size: 28px; font-weight: 700; color: ${NEAR_BLACK}; text-transform: uppercase; letter-spacing: 1px;">
        SESSION SCHEDULED
      </h2>
      <p style="margin: 0; font-size: 16px; color: #666;">
        Your time slot is confirmed
      </p>
    </div>

    ${hasSchedule ? `
    <div style="background: linear-gradient(135deg, ${COPPER}15 0%, ${COPPER}05 100%); padding: 25px; border-radius: 6px; border-left: 4px solid ${COPPER}; margin-bottom: 30px; text-align: center;">
      <p style="margin: 0 0 10px; font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">
        Your strategy session is on
      </p>
      <p style="margin: 0 0 5px; font-size: 24px; font-weight: 700; color: ${NEAR_BLACK};">
        ${data.scheduledDate}
      </p>
      <p style="margin: 0; font-size: 20px; font-weight: 600; color: ${COPPER};">
        ${data.scheduledTime}${data.timezone ? ` ${data.timezone}` : ''}
      </p>
    </div>
    ` : ''}

    <div style="margin-bottom: 30px;">
      <p style="margin: 0 0 15px; font-size: 16px; color: ${NEAR_BLACK};">
        Hi <strong>${data.fullName}</strong>,
      </p>
      <p style="margin: 0 0 15px; font-size: 15px; color: #444; line-height: 1.6;">
        Your ZERA Strategy Session for <strong>${data.companyName}</strong> is confirmed. We're preparing a comprehensive audit of your digital infrastructure and will be ready with insights and recommendations.
      </p>
    </div>

    ${hasMeetingLink ? `
    <div style="text-align: center; margin-bottom: 30px;">
      <a href="${data.meetingLink}" style="display: inline-block; background-color: ${COPPER}; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px;">
        JOIN MEETING
      </a>
      ${hasManageLinks ? `
      <p style="margin: 0; font-size: 13px; color: #666;">
        <a href="${data.rescheduleLink}" style="color: ${COPPER}; text-decoration: none;">Reschedule</a> |
        <a href="${data.cancelLink}" style="color: #999; text-decoration: none;">Cancel</a>
      </p>
      ` : ''}
    </div>
    ` : hasManageLinks ? `
    <div style="text-align: center; margin-bottom: 30px;">
      <p style="margin: 0; font-size: 14px; color: #666;">
        <a href="${data.rescheduleLink}" style="color: ${COPPER}; text-decoration: none; font-weight: 600;">Reschedule</a> |
        <a href="${data.cancelLink}" style="color: #999; text-decoration: none;">Cancel</a>
      </p>
    </div>
    ` : ''}

    <div style="background-color: ${CREAM}; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
      <h3 style="margin: 0 0 15px; font-size: 18px; font-weight: 700; color: ${NEAR_BLACK}; text-transform: uppercase;">
        PREPARE FOR YOUR SESSION
      </h3>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #444; line-height: 1.8;">
        <li>Have access to your website analytics (Google Analytics, Search Console, etc.)</li>
        <li>Prepare specific questions about your growth challenges</li>
        <li>Be ready to discuss business goals for the next 6-12 months</li>
        <li>Our team is conducting your pre-call audit - findings will be shared during the session</li>
        <li>Have notepad ready to capture insights and action items</li>
        <li>Test your audio/video setup 5 minutes before the call</li>
      </ul>
    </div>

    <div style="text-align: center; background-color: ${CREAM}; padding: 20px; border-radius: 6px;">
      <p style="margin: 0 0 10px; font-size: 13px; color: #666;">
        Need to make changes?
      </p>
      <p style="margin: 0; font-size: 14px;">
        <a href="mailto:hello@zerahq.com" style="color: ${COPPER}; text-decoration: none; font-weight: 600;">Email Us</a> |
        <a href="https://wa.me/233246492873" style="color: ${COPPER}; text-decoration: none; font-weight: 600;">WhatsApp</a>
      </p>
    </div>
  `;

  const subject = hasSchedule
    ? `Strategy Session Scheduled - ${data.scheduledDate}`
    : `Strategy Session Scheduled - ${data.companyName}`;

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to: `${data.fullName} <${data.businessEmail}>`,
    subject,
    html: emailWrapper(content),
    text: `SESSION SCHEDULED\n\nHi ${data.fullName},\n\nYour ZERA Strategy Session for ${data.companyName} is confirmed.${hasSchedule ? `\n\n${data.scheduledDate} at ${data.scheduledTime}${data.timezone ? ` ${data.timezone}` : ''}` : ''}${hasMeetingLink ? `\n\nMeeting Link: ${data.meetingLink}` : ''}\n\nPrepare:\n- Website analytics access\n- Specific growth questions\n- Business goals for next 6-12 months${hasManageLinks ? `\n\nReschedule: ${data.rescheduleLink}\nCancel: ${data.cancelLink}` : ''}`,
  });

  console.log(`Calendar confirmation sent to: ${data.fullName}`);
}

// ============================================================
// 4. 24-HOUR REMINDER
// ============================================================

export async function send24HourReminder(data: ReminderEmailData): Promise<void> {
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; background-color: ${COPPER}; color: white; border-radius: 50%; width: 60px; height: 60px; line-height: 60px; font-size: 30px; margin-bottom: 20px;">
        ⏰
      </div>
      <h2 style="margin: 0 0 10px; font-size: 28px; font-weight: 700; color: ${NEAR_BLACK}; text-transform: uppercase; letter-spacing: 1px;">
        TOMORROW: YOUR STRATEGY SESSION
      </h2>
      <p style="margin: 0; font-size: 16px; color: #666;">
        24-hour reminder
      </p>
    </div>

    <div style="background: linear-gradient(135deg, ${COPPER}20 0%, ${COPPER}10 100%); padding: 25px; border-radius: 6px; border-left: 4px solid ${COPPER}; margin-bottom: 30px; text-align: center;">
      <p style="margin: 0 0 5px; font-size: 18px; font-weight: 700; color: ${NEAR_BLACK};">
        ${data.scheduledDate}
      </p>
      <p style="margin: 0; font-size: 24px; font-weight: 600; color: ${COPPER};">
        ${data.scheduledTime} ${data.timezone}
      </p>
    </div>

    <div style="margin-bottom: 30px;">
      <p style="margin: 0 0 15px; font-size: 16px; color: ${NEAR_BLACK};">
        Hi <strong>${data.fullName}</strong>,
      </p>
      <p style="margin: 0 0 15px; font-size: 15px; color: #444; line-height: 1.6;">
        This is a friendly reminder that your ZERA Strategy Session for <strong>${data.companyName}</strong> is tomorrow. We've completed your pre-call audit and findings will be shared during your session.
      </p>
    </div>

    <div style="text-align: center; margin-bottom: 30px;">
      <a href="${data.meetingLink}" style="display: inline-block; background-color: ${COPPER}; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px;">
        JOIN MEETING TOMORROW
      </a>
    </div>

    <div style="background-color: ${CREAM}; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
      <h3 style="margin: 0 0 15px; font-size: 18px; font-weight: 700; color: ${NEAR_BLACK}; text-transform: uppercase;">
        FINAL PREP CHECKLIST
      </h3>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #444; line-height: 1.8;">
        ${data.prepChecklist.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </div>

    <div style="text-align: center; background-color: ${CREAM}; padding: 20px; border-radius: 6px;">
      <p style="margin: 0 0 10px; font-size: 13px; color: #666;">
        Can't make it?
      </p>
      <p style="margin: 0; font-size: 14px;">
        <a href="mailto:hello@zerahq.com" style="color: ${COPPER}; text-decoration: none; font-weight: 600;">Let us know</a>
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to: `${data.fullName} <${data.businessEmail}>`,
    subject: `⏰ Tomorrow: Your ZERA Strategy Session`,
    html: emailWrapper(content),
    text: `TOMORROW: YOUR STRATEGY SESSION\n\nHi ${data.fullName},\n\nReminder: Your ZERA Strategy Session is tomorrow!\n\n${data.scheduledDate} at ${data.scheduledTime} ${data.timezone}\n\nMeeting Link: ${data.meetingLink}\n\nPrep Checklist:\n${data.prepChecklist.map((item, i) => `${i + 1}. ${item}`).join('\n')}\n\nSee you tomorrow!`,
  });

  console.log(`24h reminder sent to: ${data.fullName}`);
}

// ============================================================
// 5. ABANDONED BOOKING RECOVERY
// ============================================================

export async function sendAbandonedBookingEmail(
  data: AbandonedBookingEmailData
): Promise<void> {
  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <div style="display: inline-block; background-color: ${COPPER}; color: white; border-radius: 50%; width: 60px; height: 60px; line-height: 60px; font-size: 30px; margin-bottom: 20px;">
        ⏳
      </div>
      <h2 style="margin: 0 0 10px; font-size: 28px; font-weight: 700; color: ${NEAR_BLACK}; text-transform: uppercase; letter-spacing: 1px;">
        COMPLETE YOUR BOOKING
      </h2>
      <p style="margin: 0; font-size: 16px; color: #666;">
        Your strategy session is waiting
      </p>
    </div>

    <div style="margin-bottom: 30px;">
      <p style="margin: 0 0 15px; font-size: 16px; color: ${NEAR_BLACK};">
        Hi <strong>${data.fullName}</strong>,
      </p>
      <p style="margin: 0 0 15px; font-size: 15px; color: #444; line-height: 1.6;">
        We noticed you started booking a ZERA Strategy Session for <strong>${data.companyName}</strong> but didn't complete the payment. Your spot is still available, but it expires in <strong>${data.expiresIn}</strong>.
      </p>
    </div>

    <div style="background: linear-gradient(135deg, ${COPPER}15 0%, ${COPPER}05 100%); padding: 25px; border-radius: 6px; border-left: 4px solid ${COPPER}; margin-bottom: 30px;">
      <h3 style="margin: 0 0 15px; font-size: 18px; font-weight: 700; color: ${NEAR_BLACK}; text-transform: uppercase;">
        WHAT YOU'LL GET
      </h3>
      <ul style="margin: 0; padding-left: 20px; font-size: 14px; color: #444; line-height: 1.8;">
        <li><strong>Pre-Call Audit:</strong> Comprehensive analysis of your digital infrastructure (findings shared during session)</li>
        <li><strong>60-Minute Session:</strong> Deep-dive consultation with our growth strategists</li>
        <li><strong>Custom Roadmap:</strong> Actionable plan tailored to your business goals</li>
        <li><strong>Revenue Opportunities:</strong> Identify $50K-$500K in annual potential</li>
      </ul>
    </div>

    <div style="text-align: center; margin-bottom: 30px;">
      <a href="${data.resumePaymentUrl}" style="display: inline-block; background-color: ${COPPER}; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px;">
        COMPLETE PAYMENT NOW
      </a>
      <p style="margin: 15px 0 0; font-size: 13px; color: #666;">
        Only <strong>$100 USD / GHS 2,000</strong> - Investment in your growth
      </p>
    </div>

    <div style="background-color: #FFF5E6; padding: 20px; border-radius: 6px; border-left: 4px solid #FFA500; margin-bottom: 30px;">
      <p style="margin: 0; font-size: 14px; color: #444;">
        ⏰ <strong>Expires in ${data.expiresIn}</strong> - Don't miss this opportunity to unlock your business growth potential.
      </p>
    </div>

    <div style="text-align: center; background-color: ${CREAM}; padding: 20px; border-radius: 6px;">
      <p style="margin: 0 0 10px; font-size: 13px; color: #666;">
        Questions or need help?
      </p>
      <p style="margin: 0; font-size: 14px;">
        <a href="mailto:hello@zerahq.com" style="color: ${COPPER}; text-decoration: none; font-weight: 600;">Email Us</a> |
        <a href="https://wa.me/233246492873" style="color: ${COPPER}; text-decoration: none; font-weight: 600;">WhatsApp</a>
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to: `${data.fullName} <${data.businessEmail}>`,
    subject: `⏳ Complete Your ZERA Strategy Session Booking - Expires in ${data.expiresIn}`,
    html: emailWrapper(content),
    text: `COMPLETE YOUR BOOKING\n\nHi ${data.fullName},\n\nYou started booking a strategy session for ${data.companyName} but didn't complete payment. Your spot expires in ${data.expiresIn}.\n\nWhat you'll get:\n- Pre-call comprehensive audit\n- 60-minute strategy session\n- Custom growth roadmap\n- Revenue opportunities worth $50K-$500K\n\nInvestment: $100 USD / GHS 2,000\n\nComplete payment: ${data.resumePaymentUrl}\n\nQuestions? Email hello@zerahq.com or WhatsApp +233246492873`,
  });

  console.log(`Abandoned booking email sent to: ${data.fullName}`);
}
