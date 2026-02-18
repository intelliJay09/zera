/**
 * One-time script to obtain a Google OAuth 2.0 refresh token.
 *
 * Usage:
 *   node scripts/get-google-token.js
 *
 * Prerequisites:
 *   - GOOGLE_OAUTH_CLIENT_ID and GOOGLE_OAUTH_CLIENT_SECRET in .env
 *   - Authorized redirect URI in Cloud Console: http://localhost:3000/oauth/callback
 *
 * What it does:
 *   1. Starts a temporary local server on port 3000
 *   2. Opens your browser to Google's consent screen
 *   3. After you authorize, Google redirects back with an auth code
 *   4. The script exchanges the code for a refresh token
 *   5. Prints the refresh token — paste it into .env as GOOGLE_OAUTH_REFRESH_TOKEN
 *   6. Shuts down automatically
 */

const http = require('http');
const { google } = require('googleapis');
const { exec } = require('child_process');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '..', '.env.local') });

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:3000/oauth/callback';
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('\n  Missing GOOGLE_OAUTH_CLIENT_ID or GOOGLE_OAUTH_CLIENT_SECRET in .env\n');
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: SCOPES,
});

const server = http.createServer(async (req, res) => {
  if (!req.url.startsWith('/oauth/callback')) {
    res.writeHead(404);
    res.end('Not found');
    return;
  }

  const url = new URL(req.url, 'http://localhost:3000');
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>Authorization denied.</h1><p>You can close this tab.</p>');
    console.error(`\n  Authorization denied: ${error}\n`);
    server.close();
    process.exit(1);
    return;
  }

  if (!code) {
    res.writeHead(400, { 'Content-Type': 'text/html' });
    res.end('<h1>Missing authorization code.</h1>');
    return;
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(
      '<h1 style="color: #B87333; font-family: sans-serif;">Authorization successful.</h1>' +
      '<p style="font-family: sans-serif;">Refresh token has been printed to your terminal. You can close this tab.</p>'
    );

    console.log('\n════════════════════════════════════════════════════════');
    console.log('  GOOGLE OAUTH REFRESH TOKEN');
    console.log('════════════════════════════════════════════════════════\n');
    console.log(`  ${tokens.refresh_token}`);
    console.log('\n────────────────────────────────────────────────────────');
    console.log('  Add this to your .env file:');
    console.log(`  GOOGLE_OAUTH_REFRESH_TOKEN=${tokens.refresh_token}`);
    console.log('────────────────────────────────────────────────────────\n');

    server.close();
    process.exit(0);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end('<h1>Failed to exchange authorization code.</h1><p>Check terminal for details.</p>');
    console.error('\n  Token exchange failed:', err.message, '\n');
    server.close();
    process.exit(1);
  }
});

server.listen(3000, () => {
  console.log('\n────────────────────────────────────────────────────────');
  console.log('  ZERA — Google OAuth Token Generator');
  console.log('────────────────────────────────────────────────────────');
  console.log('  Server listening on http://localhost:3000');
  console.log('  Opening browser for authorization...\n');

  // Open browser (macOS)
  exec(`open "${authUrl}"`);
});
