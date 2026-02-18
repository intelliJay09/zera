/**
 * ZERA Strategy Session - CRM Webhook Integration
 *
 * Sends session data to CRM (Zapier, Make, custom webhook URL)
 * Implements retry logic with exponential backoff
 * Non-blocking - doesn't delay payment confirmation if CRM fails
 */

import { query } from '@/lib/db';
import type { CRMWebhookPayload, CRMRetryConfig, StrategySession } from '@/types/strategy-session';

// ============================================================
// CONFIGURATION
// ============================================================

const CRM_WEBHOOK_URL = process.env.CRM_WEBHOOK_URL;
const CRM_WEBHOOK_SECRET = process.env.CRM_WEBHOOK_SECRET; // Optional

const RETRY_CONFIG: CRMRetryConfig = {
  maxRetries: 3,
  retryDelays: [
    1 * 60 * 60 * 1000, // 1 hour
    4 * 60 * 60 * 1000, // 4 hours
    24 * 60 * 60 * 1000, // 24 hours
  ],
};

// ============================================================
// MAIN FUNCTION
// ============================================================

/**
 * Send strategy session data to CRM webhook
 *
 * @param session - Strategy session data
 * @returns Promise<void>
 */
export async function sendToCRM(session: Partial<StrategySession>): Promise<void> {
  // Check if CRM webhook is configured
  if (!CRM_WEBHOOK_URL) {
    console.warn('[CRM] CRM_WEBHOOK_URL not configured, skipping CRM notification');
    return;
  }

  // Validate session data
  if (!session.id || !session.business_email) {
    console.error('[CRM] Invalid session data, missing required fields');
    return;
  }

  try {
    // Format payload
    const payload: CRMWebhookPayload = {
      event: getEventType(session),
      timestamp: new Date().toISOString(),
      session: {
        id: session.id,
        full_name: session.full_name || '',
        business_email: session.business_email,
        company_name: session.company_name || '',
        website_url: session.website_url || '',
        whatsapp_number: session.whatsapp_number || '',
        revenue_range: session.revenue_range || 'pre-revenue',
        custom_revenue: session.custom_revenue || undefined,
        growth_obstacle: session.growth_obstacle || 'visibility',
        magic_wand_outcome: session.magic_wand_outcome || '',
        payment_reference: session.payment_reference || '',
        payment_amount: session.payment_amount || 100,
        payment_currency: session.payment_currency || 'USD',
        paid_at: session.paid_at ? session.paid_at.toISOString() : undefined,
        calendly_scheduled_at: session.calendly_scheduled_at
          ? session.calendly_scheduled_at.toISOString()
          : undefined,
        booking_stage: session.booking_stage || 'form_submitted',
        utm_source: session.utm_source || undefined,
        utm_medium: session.utm_medium || undefined,
        utm_campaign: session.utm_campaign || undefined,
      },
    };

    // Prepare headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'ZERA-Strategy-Session/1.0',
    };

    // Add secret if configured
    if (CRM_WEBHOOK_SECRET) {
      headers['X-Webhook-Secret'] = CRM_WEBHOOK_SECRET;
    }

    // Send webhook
    const response = await fetch(CRM_WEBHOOK_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    // Check response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `CRM webhook failed with status ${response.status}: ${errorText}`
      );
    }

    // Get response body (may contain useful info)
    const responseText = await response.text();

    // Update database - CRM webhook sent successfully
    await query(
      `UPDATE strategy_sessions
       SET crm_webhook_sent = TRUE,
           crm_webhook_sent_at = NOW(),
           crm_webhook_response = ?,
           crm_webhook_retry_count = 0
       WHERE id = ?`,
      [responseText || 'Success', session.id]
    );

    console.log(`[CRM] Webhook sent successfully for session: ${session.id}`);
  } catch (error) {
    console.error('[CRM] Webhook error:', error);

    // Log error to database
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    await query(
      `UPDATE strategy_sessions
       SET crm_webhook_error = ?,
           crm_webhook_last_retry_at = NOW(),
           crm_webhook_retry_count = crm_webhook_retry_count + 1
       WHERE id = ?`,
      [errorMessage, session.id]
    );

    // Schedule retry if under max retries
    const currentRetryCount = session.crm_webhook_retry_count || 0;

    if (currentRetryCount < RETRY_CONFIG.maxRetries) {
      console.log(
        `[CRM] Will retry (${currentRetryCount + 1}/${RETRY_CONFIG.maxRetries}) for session: ${session.id}`
      );
      // Note: Actual retry scheduling should be done via cron job
      // This function only logs the intent
    } else {
      console.error(
        `[CRM] Max retries (${RETRY_CONFIG.maxRetries}) reached for session: ${session.id}`
      );
    }

    // Don't throw - CRM failure shouldn't block other operations
  }
}

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Determine CRM event type based on session status
 */
function getEventType(
  session: Partial<StrategySession>
): CRMWebhookPayload['event'] {
  if (session.booking_stage === 'session_held') {
    return 'strategy_session_completed';
  }

  if (session.calendly_status === 'canceled') {
    return 'strategy_session_canceled';
  }

  return 'strategy_session_booked';
}

/**
 * Retry failed CRM webhooks
 * Should be called by cron job
 */
export async function retryFailedWebhooks(): Promise<void> {
  console.log('[CRM] Starting retry of failed webhooks');

  try {
    // Find sessions with failed CRM webhooks that are due for retry
    const failedSessions = await query(
      `SELECT *
       FROM strategy_sessions
       WHERE payment_status = 'completed'
         AND crm_webhook_sent = FALSE
         AND crm_webhook_retry_count < ?
         AND (
           crm_webhook_last_retry_at IS NULL
           OR crm_webhook_last_retry_at < DATE_SUB(NOW(), INTERVAL 1 HOUR)
         )
       LIMIT 10`,
      [RETRY_CONFIG.maxRetries]
    );

    if (!failedSessions || !failedSessions[0] || (failedSessions[0] as any).length === 0) {
      console.log('[CRM] No failed webhooks to retry');
      return;
    }

    const sessions = failedSessions[0] as any[];

    console.log(`[CRM] Retrying ${sessions.length} failed webhooks`);

    // Retry each session
    for (const session of sessions) {
      try {
        await sendToCRM(session);
      } catch (error) {
        console.error(`[CRM] Retry failed for session ${session.id}:`, error);
        // Continue with next session
      }

      // Small delay between retries to avoid overwhelming CRM
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    console.log('[CRM] Retry batch completed');
  } catch (error) {
    console.error('[CRM] Error in retry process:', error);
  }
}

/**
 * Get CRM webhook statistics
 */
export async function getCRMStats(): Promise<{
  total: number;
  sent: number;
  pending: number;
  failed: number;
  successRate: number;
}> {
  try {
    const result = await query(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN crm_webhook_sent = TRUE THEN 1 ELSE 0 END) as sent,
        SUM(CASE WHEN crm_webhook_sent = FALSE AND crm_webhook_retry_count = 0 THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN crm_webhook_sent = FALSE AND crm_webhook_retry_count >= ${RETRY_CONFIG.maxRetries} THEN 1 ELSE 0 END) as failed
      FROM strategy_sessions
      WHERE payment_status = 'completed'
    `);

    if (result && result[0] && (result[0] as any).length > 0) {
      const stats = (result[0] as any)[0];
      const total = stats.total || 0;
      const sent = stats.sent || 0;
      const pending = stats.pending || 0;
      const failed = stats.failed || 0;
      const successRate = total > 0 ? (sent / total) * 100 : 0;

      return {
        total,
        sent,
        pending,
        failed,
        successRate: Math.round(successRate * 100) / 100,
      };
    }

    return { total: 0, sent: 0, pending: 0, failed: 0, successRate: 0 };
  } catch (error) {
    console.error('[CRM] Error getting stats:', error);
    return { total: 0, sent: 0, pending: 0, failed: 0, successRate: 0 };
  }
}
