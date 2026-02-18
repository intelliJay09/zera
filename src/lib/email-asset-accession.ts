/**
 * ZERA Asset Accession - Team Notification Email
 *
 * Sends a branded notification to the team when a client
 * submits the Asset Accession form with a link to their
 * Google Drive folder.
 *
 * Style: Copper (#B87333) and Cream (#F3E9DC), UPPERCASE headlines
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
        <title>ZERA Asset Accession</title>
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: ${NEAR_BLACK}; background-color: ${CREAM}; margin: 0; padding: 0;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: ${CREAM}; padding: 40px 20px;">
          <tr>
            <td align="center">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <tr>
                  <td style="background: linear-gradient(135deg, ${COPPER} 0%, #9a6028 100%); padding: 40px 30px; text-align: center;">
                    <h1 style="margin: 0; font-size: 32px; font-weight: 700; color: ${CREAM}; text-transform: uppercase; letter-spacing: 2px; font-family: 'Lato', sans-serif;">
                      ZERA
                    </h1>
                    <p style="margin: 10px 0 0; font-size: 12px; color: ${CREAM}; text-transform: uppercase; letter-spacing: 1px; opacity: 0.9;">
                      Asset Accession Protocol
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px 30px;">
                    ${content}
                  </td>
                </tr>
                <tr>
                  <td style="background-color: ${CREAM}; padding: 30px; text-align: center; border-top: 2px solid ${COPPER};">
                    <p style="margin: 0 0 10px; font-size: 14px; color: ${NEAR_BLACK};">
                      <strong>ZERA Digital Growth Systems</strong>
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

export interface AssetAccessionNotificationData {
  clientName: string;
  clientTier: string;
  registrationAddress: string;
  desiredPrimaryEmail: string;
  folderUrl: string;
  filesUploaded: number;
  filesFailed: number;
  fileResults: Array<{
    fileName: string;
    category: string;
    success: boolean;
    error?: string;
  }>;
}

export async function sendAssetAccessionTeamNotification(
  data: AssetAccessionNotificationData
): Promise<void> {
  const tierLabels: Record<string, string> = {
    'tier-1': 'Tier I',
    'tier-2': 'Tier II',
    'tier-3': 'Tier III',
  };

  const logoFiles = data.fileResults.filter((r) => r.category === 'logo');
  const secondaryFiles = data.fileResults.filter((r) => r.category === 'secondary');
  const guidelineFiles = data.fileResults.filter((r) => r.category === 'guideline');

  const fileListHtml = (files: typeof data.fileResults, label: string) => {
    if (files.length === 0) return '';
    return `
      <p style="margin: 10px 0 5px; font-size: 13px; color: #666; font-weight: 700;">${label}</p>
      ${files
        .map(
          (f) =>
            `<p style="margin: 0 0 4px; font-size: 14px; color: ${NEAR_BLACK}; padding-left: 12px;">
              ${f.success ? '<span style="color: #22c55e;">&#10003;</span>' : '<span style="color: #ef4444;">&#10007;</span>'}
              ${f.fileName}${!f.success ? ` <span style="color: #ef4444; font-size: 12px;">(${f.error})</span>` : ''}
            </p>`
        )
        .join('')}
    `;
  };

  const content = `
    <div style="text-align: center; margin-bottom: 30px;">
      <h2 style="margin: 0 0 10px; font-size: 28px; font-weight: 700; color: ${NEAR_BLACK}; text-transform: uppercase; letter-spacing: 1px;">
        NEW ASSET ACCESSION
      </h2>
      <p style="margin: 0; font-size: 16px; color: #666;">
        ${data.clientName}
      </p>
    </div>

    <div style="background-color: ${CREAM}; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
      <h3 style="margin: 0 0 15px; font-size: 16px; font-weight: 700; color: ${NEAR_BLACK};">
        CLIENT DETAILS
      </h3>
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-size: 14px;">
        <tr>
          <td style="padding: 8px 0; color: #666; width: 140px;"><strong>Legal Entity:</strong></td>
          <td style="padding: 8px 0; color: ${NEAR_BLACK};">${data.clientName}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Service Tier:</strong></td>
          <td style="padding: 8px 0; color: ${NEAR_BLACK};">${tierLabels[data.clientTier] || data.clientTier}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Address:</strong></td>
          <td style="padding: 8px 0; color: ${NEAR_BLACK};">${data.registrationAddress}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><strong>Desired Email:</strong></td>
          <td style="padding: 8px 0; color: ${NEAR_BLACK};"><a href="mailto:${data.desiredPrimaryEmail}" style="color: ${COPPER}; text-decoration: none;">${data.desiredPrimaryEmail}</a></td>
        </tr>
      </table>
    </div>

    <div style="background-color: ${CREAM}; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
      <h3 style="margin: 0 0 15px; font-size: 16px; font-weight: 700; color: ${NEAR_BLACK};">
        UPLOADED FILES — ${data.filesUploaded} uploaded${data.filesFailed > 0 ? `, ${data.filesFailed} failed` : ''}
      </h3>
      ${fileListHtml(logoFiles, 'LOGO')}
      ${fileListHtml(secondaryFiles, 'SECONDARY ASSETS')}
      ${fileListHtml(guidelineFiles, 'BRAND GUIDELINES')}
    </div>

    <div style="text-align: center; margin-bottom: 30px;">
      <a href="${data.folderUrl}" style="display: inline-block; background-color: ${COPPER}; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; text-transform: uppercase; letter-spacing: 0.5px;">
        OPEN DRIVE FOLDER
      </a>
      <p style="margin: 10px 0 0; font-size: 13px; color: #666;">
        Full credentials and details in ACCESSION_SUMMARY.txt
      </p>
    </div>
  `;

  await transporter.sendMail({
    from: `"${FROM_NAME}" <${FROM_EMAIL}>`,
    to: TEAM_EMAIL,
    subject: `New Asset Accession — ${data.clientName} (${tierLabels[data.clientTier] || data.clientTier})`,
    html: emailWrapper(content),
    text: `NEW ASSET ACCESSION\n\nClient: ${data.clientName}\nTier: ${tierLabels[data.clientTier] || data.clientTier}\nAddress: ${data.registrationAddress}\nDesired Email: ${data.desiredPrimaryEmail}\n\nFiles: ${data.filesUploaded} uploaded, ${data.filesFailed} failed\n\nDrive Folder: ${data.folderUrl}\nFull credentials in ACCESSION_SUMMARY.txt`,
  });

  console.warn(`[Asset Accession] Team notification sent for: ${data.clientName}`);
}
