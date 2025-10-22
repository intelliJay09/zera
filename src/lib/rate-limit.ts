/**
 * Database-Based Rate Limiting Utility
 * Tracks API request attempts and enforces configurable rate limits
 */

import { query, insert } from '@/lib/db';
import { NextRequest } from 'next/server';

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
  total: number;
}

/**
 * Extract client IP address from request
 * Handles X-Forwarded-For header for proxied requests
 */
function getClientIp(request: NextRequest): string {
  // Check X-Forwarded-For header (set by proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    // X-Forwarded-For can be comma-separated list, take first IP
    return forwarded.split(',')[0].trim();
  }

  // Fallback to X-Real-IP
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // In development, IP might not be available
  return 'unknown';
}

/**
 * Check if request is within rate limit
 * @param request - Next.js request object
 * @param endpoint - API endpoint path (e.g., '/api/discovery/save')
 * @param maxRequests - Maximum number of requests allowed in the time window
 * @param windowMinutes - Time window in minutes
 * @returns RateLimitResult with allowed status and metadata
 */
export async function checkRateLimit(
  request: NextRequest,
  endpoint: string,
  maxRequests: number,
  windowMinutes: number
): Promise<RateLimitResult> {
  const ip = getClientIp(request);
  const now = new Date();
  const windowStart = new Date(now.getTime() - windowMinutes * 60 * 1000);

  try {
    // Count recent attempts from this IP for this endpoint
    const result = await query(
      `SELECT COUNT(*) as attempt_count
       FROM rate_limit_attempts
       WHERE ip_address = ?
         AND endpoint = ?
         AND attempted_at >= ?`,
      [ip, endpoint, windowStart]
    );

    const attemptCount = (result[0] as any).attempt_count || 0;

    // Calculate reset time (end of current window)
    const resetAt = new Date(now.getTime() + windowMinutes * 60 * 1000);

    // Check if limit exceeded
    if (attemptCount >= maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetAt,
        total: attemptCount,
      };
    }

    // Record this attempt
    await insert(
      `INSERT INTO rate_limit_attempts (ip_address, endpoint, attempted_at)
       VALUES (?, ?, NOW())`,
      [ip, endpoint]
    );

    // Cleanup old records (async, don't await - fire and forget)
    // Delete records older than 24 hours
    cleanupOldAttempts().catch((error) => {
      console.error('Failed to cleanup old rate limit attempts:', error);
    });

    return {
      allowed: true,
      remaining: maxRequests - attemptCount - 1,
      resetAt,
      total: attemptCount + 1,
    };
  } catch (error) {
    console.error('Rate limit check error:', error);
    // On error, allow the request (fail open)
    // Better to allow some abuse than block legitimate users
    return {
      allowed: true,
      remaining: maxRequests,
      resetAt: new Date(now.getTime() + windowMinutes * 60 * 1000),
      total: 0,
    };
  }
}

/**
 * Cleanup old rate limit attempts (older than 24 hours)
 * Runs asynchronously to avoid blocking requests
 */
async function cleanupOldAttempts(): Promise<void> {
  const cutoffTime = new Date(Date.now() - 24 * 60 * 60 * 1000); // 24 hours ago

  try {
    await query(
      `DELETE FROM rate_limit_attempts WHERE attempted_at < ?`,
      [cutoffTime]
    );
  } catch (error) {
    // Silently fail - cleanup is not critical
    console.error('Rate limit cleanup error:', error);
  }
}

/**
 * Predefined rate limit configurations
 */
export const RATE_LIMITS = {
  // Auto-save endpoint - frequent legitimate usage
  DISCOVERY_SAVE: { maxRequests: 60, windowMinutes: 5 },

  // Final submission - allow retries but prevent spam
  DISCOVERY_SUBMIT: { maxRequests: 10, windowMinutes: 60 },

  // Payment initialization - browsing multiple services
  CHECKOUT_INITIALIZE: { maxRequests: 20, windowMinutes: 60 },

  // Payment verification - webhook + user verification
  CHECKOUT_VERIFY: { maxRequests: 30, windowMinutes: 60 },
} as const;
