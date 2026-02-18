/**
 * Google Drive Service Module
 *
 * Handles authentication via OAuth 2.0 refresh token and file uploads
 * to a shared Google Drive folder for client asset accession.
 *
 * Required env vars:
 *   GOOGLE_OAUTH_CLIENT_ID
 *   GOOGLE_OAUTH_CLIENT_SECRET
 *   GOOGLE_OAUTH_REFRESH_TOKEN
 *   GOOGLE_DRIVE_FOLDER_ID
 */

import { google } from 'googleapis';
import { Readable } from 'stream';

/**
 * Authenticate with Google Drive using OAuth 2.0 refresh token.
 * Files are created as the real Google account owner, using their storage quota.
 */
function getDriveClient() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_OAUTH_REFRESH_TOKEN;
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;

  if (!clientId || !clientSecret || !refreshToken || !folderId) {
    throw new Error(
      'Missing Google Drive configuration. Ensure GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_REFRESH_TOKEN, and GOOGLE_DRIVE_FOLDER_ID are set.'
    );
  }

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
  oauth2Client.setCredentials({ refresh_token: refreshToken });

  return google.drive({ version: 'v3', auth: oauth2Client });
}

/**
 * Create a client-specific subfolder inside the root Drive folder.
 *
 * @param clientName - The client's legal entity name (used as folder name)
 * @returns The created folder's ID and web view link
 */
export async function createClientFolder(clientName: string): Promise<{
  folderId: string;
  folderUrl: string;
}> {
  const drive = getDriveClient();
  const parentFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID!;

  const response = await drive.files.create({
    requestBody: {
      name: clientName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId],
    },
    fields: 'id, webViewLink',
  });

  const folderId = response.data.id;
  const folderUrl = response.data.webViewLink;

  if (!folderId) {
    throw new Error('Google Drive folder creation returned no ID');
  }

  console.warn(`[Google Drive] Created folder "${clientName}" (${folderId})`);

  return {
    folderId,
    folderUrl: folderUrl || `https://drive.google.com/drive/folders/${folderId}`,
  };
}

/**
 * Upload a single file to a specific Google Drive folder.
 *
 * @param folderId - Target folder ID in Google Drive
 * @param fileName - Name for the file in Drive
 * @param mimeType - MIME type of the file
 * @param buffer - File contents as a Buffer
 * @returns The uploaded file's ID and web view link
 */
export async function uploadFileToDrive(
  folderId: string,
  fileName: string,
  mimeType: string,
  buffer: Buffer
): Promise<{ fileId: string; fileUrl: string }> {
  const drive = getDriveClient();

  const response = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
    },
    media: {
      mimeType,
      body: Readable.from(buffer),
    },
    fields: 'id, webViewLink',
  });

  const fileId = response.data.id;
  const fileUrl = response.data.webViewLink;

  if (!fileId) {
    throw new Error(`Google Drive upload returned no ID for "${fileName}"`);
  }

  return {
    fileId,
    fileUrl: fileUrl || `https://drive.google.com/file/d/${fileId}/view`,
  };
}

export interface FileUploadInput {
  fileName: string;
  mimeType: string;
  buffer: Buffer;
  /** Which dropzone category: logo, secondary, guideline */
  category: string;
}

export interface UploadResult {
  fileName: string;
  category: string;
  success: boolean;
  fileId?: string;
  fileUrl?: string;
  error?: string;
}

/**
 * Orchestrator: create a client folder, upload all files, return results.
 *
 * Partial failures are tolerated — if some files fail to upload,
 * the successful ones are still reported. The caller decides how to
 * present partial results to the user.
 *
 * @param clientName - Legal entity name (becomes the folder name)
 * @param files - Array of files to upload
 * @returns Folder info + per-file upload results
 */
export async function uploadClientFiles(
  clientName: string,
  files: FileUploadInput[]
): Promise<{
  folderId: string;
  folderUrl: string;
  results: UploadResult[];
}> {
  // Step 1: Create the client folder
  const { folderId, folderUrl } = await createClientFolder(clientName);

  // Step 2: Upload all files concurrently
  const results = await Promise.all(
    files.map(async (file): Promise<UploadResult> => {
      try {
        const { fileId, fileUrl } = await uploadFileToDrive(
          folderId,
          file.fileName,
          file.mimeType,
          file.buffer
        );

        console.warn(`[Google Drive] Uploaded "${file.fileName}" → ${fileId}`);

        return {
          fileName: file.fileName,
          category: file.category,
          success: true,
          fileId,
          fileUrl,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown upload error';
        console.error(`[Google Drive] Failed to upload "${file.fileName}":`, message);

        return {
          fileName: file.fileName,
          category: file.category,
          success: false,
          error: message,
        };
      }
    })
  );

  return { folderId, folderUrl, results };
}
