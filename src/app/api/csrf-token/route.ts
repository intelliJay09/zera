import { NextResponse } from 'next/server';
import { generateCSRFToken } from '@/lib/csrf';

/**
 * GET /api/csrf-token
 * Generates and returns a CSRF token for form submission
 * Token is also set as an HTTP-only cookie for verification
 */
export async function GET() {
  const token = generateCSRFToken();

  const response = NextResponse.json({ token });

  // Set CSRF token as HTTP-only cookie
  response.cookies.set('csrf-token', token, {
    httpOnly: true, // Prevents JavaScript access
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'strict', // Prevents CSRF attacks
    maxAge: 60 * 60, // 1 hour
    path: '/', // Available to all routes
  });

  return response;
}
