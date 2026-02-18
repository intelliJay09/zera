/**
 * POST /api/asset-accession/submit
 *
 * Accepts multipart form data with text fields + files from the
 * Asset Accession form. Uploads files to Google Drive under a
 * client-specific subfolder, then uploads a formatted summary
 * document with all text fields (including credentials) to the
 * same folder.
 */

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  verifyMultipartSubmission,
  createVerificationErrorResponse,
} from '@/lib/form-verification';
import {
  uploadClientFiles,
  uploadFileToDrive,
  type FileUploadInput,
} from '@/lib/google-drive';
import { sendAssetAccessionTeamNotification } from '@/lib/email-asset-accession';

// 25 MB max per file
const MAX_FILE_SIZE = 25 * 1024 * 1024;

// Text field validation
const textFieldSchema = z.object({
  clientTier: z.enum(['tier-1', 'tier-2', 'tier-3'], {
    message: 'Please select your service tier',
  }),
  legalEntityName: z.string().min(2, 'Legal entity name is required'),
  businessRegistrationAddress: z.string().min(5, 'Business registration address is required'),
  brandVoiceLink: z.string().optional(),
  domainRegistrarUrl: z.string().min(1, 'Domain registrar URL is required'),
  domainRegistrarUsername: z.string().min(1, 'Username is required'),
  domainRegistrarPassword: z.string().min(1, 'Password is required'),
  existingWebsiteUrl: z.string().optional(),
  existingWebsiteUsername: z.string().optional(),
  existingWebsitePassword: z.string().optional(),
  desiredPrimaryEmail: z.string().min(1, 'Primary email address is required'),
  additionalTeamSeats: z.string().optional(),
  currentEmailService: z.string().optional(),
  metaBusinessSuiteDetails: z.string().optional(),
  googleAdsDetails: z.string().optional(),
  crmDetails: z.string().optional(),
  targetAudienceProfile: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.clientTier !== 'tier-1') {
    if (!data.targetAudienceProfile || data.targetAudienceProfile.length < 10) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Please describe your ideal client in at least 3 sentences',
        path: ['targetAudienceProfile'],
      });
    }
  }
});

export async function POST(request: NextRequest) {
  try {
    // STEP 1: CSRF + Rate Limiting (no body parsing)
    const verification = await verifyMultipartSubmission(request, {
      endpoint: '/api/asset-accession/submit',
      maxRequests: 5,
      windowMinutes: 60,
    });

    if (!verification.allowed) {
      return createVerificationErrorResponse(verification);
    }

    // STEP 2: Parse multipart form data
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Invalid form data. Expected multipart/form-data.' },
        { status: 400 }
      );
    }

    // STEP 3: Extract and validate text fields
    const textFields: Record<string, string> = {};
    const textKeys = [
      'clientTier',
      'legalEntityName',
      'businessRegistrationAddress',
      'brandVoiceLink',
      'domainRegistrarUrl',
      'domainRegistrarUsername',
      'domainRegistrarPassword',
      'existingWebsiteUrl',
      'existingWebsiteUsername',
      'existingWebsitePassword',
      'desiredPrimaryEmail',
      'additionalTeamSeats',
      'currentEmailService',
      'metaBusinessSuiteDetails',
      'googleAdsDetails',
      'crmDetails',
      'targetAudienceProfile',
    ];

    for (const key of textKeys) {
      const value = formData.get(key);
      if (typeof value === 'string') {
        textFields[key] = value;
      }
    }

    const validationResult = textFieldSchema.safeParse(textFields);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid form data',
          details: validationResult.error.issues,
        },
        { status: 400 }
      );
    }

    // STEP 4: Extract and validate files
    const logoEntries = formData.getAll('logoFiles');
    const secondaryEntries = formData.getAll('secondaryFiles');
    const guidelineEntries = formData.getAll('guidelineFiles');

    // Logo is required
    const logoFiles = logoEntries.filter((entry): entry is File => entry instanceof File && entry.size > 0);
    if (logoFiles.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Primary brand logo is required.' },
        { status: 400 }
      );
    }

    // Collect all files with category tags
    const allFileEntries: { file: File; category: string }[] = [
      ...logoFiles.map((f) => ({ file: f, category: 'logo' })),
      ...secondaryEntries
        .filter((entry): entry is File => entry instanceof File && entry.size > 0)
        .map((f) => ({ file: f, category: 'secondary' })),
      ...guidelineEntries
        .filter((entry): entry is File => entry instanceof File && entry.size > 0)
        .map((f) => ({ file: f, category: 'guideline' })),
    ];

    // Validate file sizes
    for (const { file } of allFileEntries) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            success: false,
            error: `File "${file.name}" exceeds the 25MB limit (${(file.size / 1024 / 1024).toFixed(1)}MB).`,
          },
          { status: 400 }
        );
      }
    }

    // STEP 5: Convert files to buffers for upload
    const filesToUpload: FileUploadInput[] = await Promise.all(
      allFileEntries.map(async ({ file, category }) => {
        const arrayBuffer = await file.arrayBuffer();
        return {
          fileName: file.name,
          mimeType: file.type || 'application/octet-stream',
          buffer: Buffer.from(arrayBuffer),
          category,
        };
      })
    );

    // STEP 6: Upload to Google Drive
    const clientName = validationResult.data.legalEntityName;
    const { folderId, folderUrl, results } = await uploadClientFiles(clientName, filesToUpload);

    const filesUploaded = results.filter((r) => r.success).length;
    const filesFailed = results.filter((r) => !r.success).length;

    console.warn(
      `[Asset Accession] "${clientName}" — ${filesUploaded} uploaded, ${filesFailed} failed → ${folderUrl}`
    );

    // STEP 7: Build and upload submission summary document
    const data = validationResult.data;
    const tierLabels: Record<string, string> = {
      'tier-1': 'Tier I',
      'tier-2': 'Tier II',
      'tier-3': 'Tier III',
    };

    const now = new Date();
    const timestamp =
      now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) +
      ' at ' +
      now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' }) +
      ' UTC';

    const line = '────────────────────────────────────────────────────────';
    const doubleLine = '════════════════════════════════════════════════════════';

    let summary = `${doubleLine}
ZERA — ASSET ACCESSION SUMMARY
${doubleLine}
Submitted: ${timestamp}

${line}
I. CLIENT INFORMATION
${line}

Service Tier:            ${tierLabels[data.clientTier] || data.clientTier}
Legal Entity:            ${data.legalEntityName}
Registration Address:    ${data.businessRegistrationAddress}`;

    if (data.brandVoiceLink) {
      summary += `\nBrand Voice Link:        ${data.brandVoiceLink}`;
    }

    summary += `

${line}
II. DIGITAL INFRASTRUCTURE
${line}

DOMAIN REGISTRAR
  URL:                   ${data.domainRegistrarUrl}
  Username:              ${data.domainRegistrarUsername}
  Password:              ${data.domainRegistrarPassword}`;

    if (data.existingWebsiteUrl) {
      summary += `\n\nEXISTING WEBSITE
  URL:                   ${data.existingWebsiteUrl}`;
      if (data.existingWebsiteUsername) {
        summary += `\n  Username:              ${data.existingWebsiteUsername}`;
      }
      if (data.existingWebsitePassword) {
        summary += `\n  Password:              ${data.existingWebsitePassword}`;
      }
    }

    summary += `\n\nEMAIL CONFIGURATION
  Desired Primary Email:   ${data.desiredPrimaryEmail}`;

    if (data.additionalTeamSeats) {
      summary += `\n  Additional Team Seats:  ${data.additionalTeamSeats}`;
    }
    if (data.currentEmailService) {
      summary += `\n  Current Email Service:  ${data.currentEmailService}`;
    }

    if (data.clientTier !== 'tier-1') {
      summary += `\n\n${line}\nIII. ACQUISITION & INTEL\n${line}`;

      if (data.metaBusinessSuiteDetails) {
        summary += `\n\nMeta Business Suite:\n${data.metaBusinessSuiteDetails}`;
      }
      if (data.googleAdsDetails) {
        summary += `\n\nGoogle Ads:\n${data.googleAdsDetails}`;
      }
      if (data.crmDetails) {
        summary += `\n\nCRM:\n${data.crmDetails}`;
      }
      if (data.targetAudienceProfile) {
        summary += `\n\nTarget Audience Profile:\n${data.targetAudienceProfile}`;
      }
    }

    // File upload results grouped by category
    const logoResults = results.filter((r) => r.category === 'logo');
    const secondaryResults = results.filter((r) => r.category === 'secondary');
    const guidelineResults = results.filter((r) => r.category === 'guideline');

    summary += `\n\n${line}\nIV. UPLOADED FILES\n${line}`;

    if (logoResults.length > 0) {
      summary += '\n\nLogo Files:';
      for (const r of logoResults) {
        summary += `\n  ${r.fileName} — ${r.success ? 'uploaded' : 'FAILED: ' + r.error}`;
      }
    }
    if (secondaryResults.length > 0) {
      summary += '\n\nSecondary Assets:';
      for (const r of secondaryResults) {
        summary += `\n  ${r.fileName} — ${r.success ? 'uploaded' : 'FAILED: ' + r.error}`;
      }
    }
    if (guidelineResults.length > 0) {
      summary += '\n\nBrand Guidelines:';
      for (const r of guidelineResults) {
        summary += `\n  ${r.fileName} — ${r.success ? 'uploaded' : 'FAILED: ' + r.error}`;
      }
    }

    summary += `\n\n${doubleLine}\n`;

    try {
      await uploadFileToDrive(
        folderId,
        'ACCESSION_SUMMARY.txt',
        'text/plain',
        Buffer.from(summary, 'utf-8')
      );
      console.warn(`[Asset Accession] Summary document uploaded to: ${folderUrl}`);
    } catch (summaryError) {
      console.error('[Asset Accession] Failed to upload summary document:', summaryError);
    }

    // STEP 8: Send team notification email
    try {
      await sendAssetAccessionTeamNotification({
        clientName,
        clientTier: data.clientTier,
        registrationAddress: data.businessRegistrationAddress,
        desiredPrimaryEmail: data.desiredPrimaryEmail,
        folderUrl,
        filesUploaded,
        filesFailed,
        fileResults: results.map((r) => ({
          fileName: r.fileName,
          category: r.category,
          success: r.success,
          error: r.error,
        })),
      });
    } catch (emailError) {
      console.error('[Asset Accession] Failed to send team notification:', emailError);
    }

    return NextResponse.json({
      success: true,
      folderId,
      folderUrl,
      filesUploaded,
      filesFailed,
      results,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Asset Accession] Submission failed:', message);

    return NextResponse.json(
      { success: false, error: 'Submission failed. Please try again or contact support.' },
      { status: 500 }
    );
  }
}
