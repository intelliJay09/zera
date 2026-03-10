/**
 * ZERA Lead Magnet — Email Delivery
 *
 * Handles:
 * 1. PDF delivery to the lead (with attachment)
 * 2. Team notification with lead details
 */

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  pool: true,
  maxConnections: 3,
  connectionTimeout: 15000,
  socketTimeout: 30000,
});

const FROM_EMAIL = process.env.SMTP_FROM_EMAIL || 'hello@zerahq.com';
const FROM_NAME = 'ZERA';
const TEAM_EMAIL = 'jacque.amoako@gmail.com';

const COPPER = '#B87333';
const CREAM = '#F3E9DC';
const NEAR_BLACK = '#1a1a1a';

function emailWrapper(content: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ZERA</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: ${NEAR_BLACK}; background-color: ${CREAM}; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: #ffffff; border: 1px solid rgba(184,115,51,0.2); padding: 40px;">
            <div style="text-align: center; margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid rgba(184,115,51,0.2);">
              <p style="font-size: 12px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: ${COPPER}; margin: 0;">ZERA | DIGITAL GROWTH ARCHITECTS</p>
            </div>
            ${content}
            <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid rgba(184,115,51,0.2); text-align: center;">
              <p style="font-size: 12px; color: #999999; margin: 0;">ZERA Digital Growth Architects &middot; zerahq.com &middot; hello@zerahq.com</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export interface GhanaAuditLeadData {
  fullName: string;
  email: string;
  phone: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export async function sendGhanaAuditDelivery(data: GhanaAuditLeadData): Promise<void> {
  const firstName = data.fullName.split(' ')[0];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zerahq.com';
  const pdfUrl = `${siteUrl}/2026-Ghana-Executive-Audit.pdf`;

  const content = `
    <h1 style="font-size: 22px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: ${NEAR_BLACK}; margin: 0 0 8px 0;">Your Executive Briefing Is Ready.</h1>
    <p style="font-size: 13px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: ${COPPER}; margin: 0 0 28px 0;">2026 GHANA EXECUTIVE AUDIT</p>

    <p style="font-size: 15px; color: ${NEAR_BLACK}; margin: 0 0 16px 0;">Hi ${firstName},</p>

    <p style="font-size: 15px; color: ${NEAR_BLACK}; margin: 0 0 16px 0;">Your copy of the 2026 Ghana Executive Audit is ready. Click the button below to download it now.</p>

    <p style="font-size: 15px; color: ${NEAR_BLACK}; margin: 0 0 28px 0;">Inside, you will find three documented infrastructure leaks destroying 40% of ad spend across Accra's mid-market operators — and the precise engineering fix for each one.</p>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${pdfUrl}" style="display: inline-block; background-color: ${COPPER}; color: #ffffff; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; padding: 16px 36px;">DOWNLOAD YOUR FREE COPY</a>
    </div>

    <div style="background-color: ${NEAR_BLACK}; padding: 28px; margin: 0 0 28px 0;">
      <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: ${COPPER}; margin: 0 0 16px 0;">WHAT'S INSIDE</p>
      <p style="font-size: 14px; color: #ffffff; margin: 0 0 12px 0; padding-bottom: 12px; border-bottom: 1px solid rgba(184,115,51,0.2);">Leak #1 &mdash; The 8-Second Death Trap<br><span style="color: rgba(255,255,255,0.6); font-size: 13px;">Why your site speed is silently destroying your ad ROI</span></p>
      <p style="font-size: 14px; color: #ffffff; margin: 0 0 12px 0; padding-bottom: 12px; border-bottom: 1px solid rgba(184,115,51,0.2);">Leak #2 &mdash; The Data Black Hole<br><span style="color: rgba(255,255,255,0.6); font-size: 13px;">How broken lead routing corrupts your Pixel and inflates CPCs</span></p>
      <p style="font-size: 14px; color: #ffffff; margin: 0;">Leak #3 &mdash; The Follow-Up Fatigue<br><span style="color: rgba(255,255,255,0.6); font-size: 13px;">Why your competitor closes your leads while your team sleeps</span></p>
    </div>

    <p style="font-size: 15px; color: ${NEAR_BLACK}; margin: 0 0 28px 0;">After reading, the logical next step is a private <strong>Infrastructure Diagnostic</strong> — a 60-minute session where we audit your specific numbers and calculate your exact capital recovery potential.</p>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${siteUrl}/growth-audit" style="display: inline-block; background-color: ${COPPER}; color: #ffffff; font-size: 12px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; text-decoration: none; padding: 16px 36px;">REQUEST YOUR INFRASTRUCTURE DIAGNOSTIC</a>
    </div>

    <p style="font-size: 12px; color: #999999; text-align: center; margin: 0;">Limited to businesses generating over GHS 50,000 per month running active paid acquisition.</p>
  `;

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to: data.email,
    subject: 'Your 2026 Ghana Executive Audit — Download Link Inside',
    html: emailWrapper(content),
  });
}

export async function sendGhanaAuditTeamNotification(data: GhanaAuditLeadData): Promise<void> {
  const sourceRow = (data.utmSource || data.utmMedium || data.utmCampaign)
    ? `<tr>
        <td style="padding: 12px; background-color: #f8f5f0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #666; width: 40%;">Source</td>
        <td style="padding: 12px; background-color: #f8f5f0; font-size: 14px; color: ${NEAR_BLACK};">${data.utmSource || '—'} / ${data.utmMedium || '—'} / ${data.utmCampaign || '—'}</td>
      </tr>`
    : '';

  const content = `
    <h1 style="font-size: 20px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: ${NEAR_BLACK}; margin: 0 0 8px 0;">New Lead Magnet Download</h1>
    <p style="font-size: 13px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: ${COPPER}; margin: 0 0 28px 0;">2026 GHANA EXECUTIVE AUDIT</p>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
      <tr>
        <td style="padding: 12px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #666; width: 40%;">Name</td>
        <td style="padding: 12px; font-size: 14px; color: ${NEAR_BLACK};">${data.fullName}</td>
      </tr>
      <tr>
        <td style="padding: 12px; background-color: #f8f5f0; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #666;">Email</td>
        <td style="padding: 12px; background-color: #f8f5f0; font-size: 14px; color: ${NEAR_BLACK};">${data.email}</td>
      </tr>
      <tr>
        <td style="padding: 12px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #666;">Phone</td>
        <td style="padding: 12px; font-size: 14px; color: ${NEAR_BLACK};">${data.phone}</td>
      </tr>
      ${sourceRow}
    </table>

    <p style="font-size: 13px; color: #999999; margin: 0;">PDF delivered to their inbox. Follow up within 24 hours.</p>
  `;

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to: TEAM_EMAIL,
    subject: `New Lead — ${data.fullName} downloaded the Ghana Executive Audit`,
    html: emailWrapper(content),
  });
}
