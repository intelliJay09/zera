/**
 * ZERA Strategy Session Booking System - TypeScript Types
 * Complete type definitions for strategy session booking lifecycle
 */

// ============================================================
// FORM DATA TYPES
// ============================================================

export type RevenueRange = 'pre-revenue' | '50k-250k' | '250k-1m' | '1m+' | 'custom';
export type GrowthObstacle = 'visibility' | 'lead-flow' | 'retention' | 'chaos';
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'abandoned';
export type CalendlyStatus = 'not_booked' | 'booked' | 'canceled' | 'rescheduled';
export type BookingStage =
  | 'form_submitted'
  | 'payment_completed'
  | 'calendar_booked'
  | 'session_held'
  | 'no_show';

/**
 * Form submission data from StrategySessionForm
 */
export interface StrategySessionFormData {
  fullName: string;
  businessEmail: string;
  companyName: string;
  websiteUrl: string;
  whatsappNumber: string;
  revenueRange: RevenueRange;
  customRevenue?: string;
  growthObstacle: GrowthObstacle;
  magicWandOutcome: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
  referrerUrl?: string;
}

// ============================================================
// DATABASE RECORD TYPES
// ============================================================

/**
 * Complete strategy session record from database
 */
export interface StrategySession {
  // Primary Key
  id: string;

  // Contact Information
  full_name: string;
  business_email: string;
  company_name: string;
  website_url: string;
  whatsapp_number: string;

  // Business Context
  revenue_range: RevenueRange;
  custom_revenue: string | null;
  growth_obstacle: GrowthObstacle;
  magic_wand_outcome: string;

  // Payment Tracking
  payment_status: PaymentStatus;
  payment_reference: string;
  payment_amount: number;
  payment_currency: string;
  paid_at: Date | null;
  payment_error_message: string | null;
  paystack_customer_code: string | null;

  // Calendly Integration
  calendly_event_uri: string | null;
  calendly_invitee_uri: string | null;
  calendly_scheduled_at: Date | null;
  calendly_status: CalendlyStatus;
  calendly_cancellation_reason: string | null;

  // Email Tracking
  confirmation_email_sent: boolean;
  confirmation_email_sent_at: Date | null;
  team_notification_sent: boolean;
  team_notification_sent_at: Date | null;
  calendar_confirmation_email_sent: boolean;
  calendar_confirmation_email_sent_at: Date | null;
  reminder_email_sent: boolean;
  reminder_email_sent_at: Date | null;
  abandoned_email_sent: boolean;
  abandoned_email_sent_at: Date | null;

  // CRM Integration
  crm_webhook_sent: boolean;
  crm_webhook_sent_at: Date | null;
  crm_webhook_response: string | null;
  crm_webhook_error: string | null;
  crm_webhook_retry_count: number;
  crm_webhook_last_retry_at: Date | null;

  // Booking Lifecycle
  booking_stage: BookingStage;

  // Marketing Attribution
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  referrer_url: string | null;

  // Metadata
  ip_address: string | null;
  user_agent: string | null;

  // Timestamps
  created_at: Date;
  updated_at: Date;
}

// ============================================================
// API RESPONSE TYPES
// ============================================================

/**
 * Response from /api/book-strategy-session/submit
 */
export interface SubmitStrategySessionResponse {
  success: boolean;
  sessionId: string;
  authorizationUrl: string;
  reference: string;
  message?: string;
  error?: string;
}

/**
 * Response from payment verification
 */
export interface VerifyPaymentResponse {
  success: boolean;
  status: 'success' | 'failed' | 'pending';
  reference: string;
  amount: number;
  currency: string;
  paidAt?: Date;
  message?: string;
  error?: string;
}

// ============================================================
// PAYSTACK TYPES
// ============================================================

/**
 * Paystack payment initialization request
 */
export interface PaystackInitializeRequest {
  email: string;
  amount: number; // In kobo (cents)
  reference: string;
  callback_url: string;
  metadata: {
    session_id: string;
    full_name: string;
    company_name: string;
    custom_fields: Array<{
      display_name: string;
      variable_name: string;
      value: string;
    }>;
  };
  currency?: string;
  channels?: string[];
}

/**
 * Paystack payment initialization response
 */
export interface PaystackInitializeResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

/**
 * Paystack transaction verification response
 */
export interface PaystackVerificationResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    domain: string;
    status: 'success' | 'failed' | 'pending' | 'abandoned';
    reference: string;
    amount: number;
    message: string | null;
    gateway_response: string;
    paid_at: string | null;
    created_at: string;
    channel: string;
    currency: string;
    ip_address: string;
    metadata: {
      session_id?: string;
      custom_fields?: Array<{
        display_name: string;
        variable_name: string;
        value: string;
      }>;
    };
    customer: {
      id: number;
      customer_code: string;
      email: string;
      first_name: string | null;
      last_name: string | null;
    };
    authorization: {
      authorization_code: string;
      bin: string;
      last4: string;
      exp_month: string;
      exp_year: string;
      channel: string;
      card_type: string;
      bank: string;
      country_code: string;
      brand: string;
      reusable: boolean;
    };
  };
}

/**
 * Paystack webhook event payload
 */
export interface PaystackWebhookEvent {
  event: 'charge.success' | 'charge.failed' | 'transfer.success' | 'transfer.failed';
  data: PaystackVerificationResponse['data'];
}

// ============================================================
// CALENDLY TYPES
// ============================================================

/**
 * Calendly webhook event payload
 */
export interface CalendlyWebhookEvent {
  event: 'invitee.created' | 'invitee.canceled';
  created_at: string;
  payload: {
    event_type: {
      uuid: string;
      name: string;
    };
    event: {
      uri: string;
      start_time: string;
      end_time: string;
      name: string;
    };
    invitee: {
      uri: string;
      email: string;
      name: string;
      text_reminder_number: string | null;
      timezone: string;
      created_at: string;
      canceled: boolean;
      cancellation?: {
        canceled_by: string;
        reason: string;
      };
    };
    questions_and_answers?: Array<{
      question: string;
      answer: string;
      position: number;
    }>;
    tracking?: {
      utm_source?: string;
      utm_medium?: string;
      utm_campaign?: string;
      utm_term?: string;
      utm_content?: string;
    };
  };
}

// ============================================================
// CRM WEBHOOK TYPES
// ============================================================

/**
 * Data sent to CRM webhook
 */
export interface CRMWebhookPayload {
  event: 'strategy_session_booked' | 'strategy_session_canceled' | 'strategy_session_completed';
  timestamp: string;
  session: {
    id: string;
    full_name: string;
    business_email: string;
    company_name: string;
    website_url: string;
    whatsapp_number: string;
    revenue_range: RevenueRange;
    custom_revenue?: string;
    growth_obstacle: GrowthObstacle;
    magic_wand_outcome: string;
    payment_reference: string;
    payment_amount: number;
    payment_currency: string;
    paid_at?: string;
    calendly_scheduled_at?: string;
    booking_stage: BookingStage;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };
}

/**
 * CRM webhook retry configuration
 */
export interface CRMRetryConfig {
  maxRetries: number;
  retryDelays: number[]; // In milliseconds [1h, 4h, 24h]
}

// ============================================================
// EMAIL TEMPLATE TYPES
// ============================================================

/**
 * Email template data for customer confirmation
 */
export interface ConfirmationEmailData {
  fullName: string;
  businessEmail: string;
  companyName: string;
  paymentReference: string;
  paymentAmount: number;
  paymentCurrency: string;
  calendlyBookingUrl: string;
}

/**
 * Email template data for team notification
 */
export interface TeamNotificationEmailData {
  sessionId: string;
  fullName: string;
  businessEmail: string;
  companyName: string;
  websiteUrl: string;
  whatsappNumber: string;
  revenueRange: RevenueRange;
  customRevenue?: string;
  growthObstacle: GrowthObstacle;
  magicWandOutcome: string;
  paymentReference: string;
  paymentAmount: number;
  utmSource?: string;
  utmCampaign?: string;
}

/**
 * Email template data for calendar booking confirmation
 */
export interface CalendarConfirmationEmailData {
  fullName: string;
  businessEmail: string;
  companyName: string;
  scheduledDate?: string;
  scheduledTime?: string;
  timezone?: string;
  meetingLink?: string;
  cancelLink?: string;
  rescheduleLink?: string;
}

/**
 * Email template data for 24h reminder
 */
export interface ReminderEmailData {
  fullName: string;
  businessEmail: string;
  companyName: string;
  scheduledDate: string;
  scheduledTime: string;
  timezone: string;
  meetingLink: string;
  prepChecklist: string[];
}

/**
 * Email template data for abandoned booking recovery
 */
export interface AbandonedBookingEmailData {
  fullName: string;
  businessEmail: string;
  companyName: string;
  resumePaymentUrl: string;
  expiresIn: string; // e.g., "48 hours"
}

// ============================================================
// UTILITY TYPES
// ============================================================

/**
 * Partial update for strategy session
 */
export type StrategySessionUpdate = Partial<Omit<StrategySession, 'id' | 'created_at'>>;

/**
 * Database query filters
 */
export interface StrategySessionFilters {
  payment_status?: PaymentStatus | PaymentStatus[];
  booking_stage?: BookingStage | BookingStage[];
  business_email?: string;
  payment_reference?: string;
  created_after?: Date;
  created_before?: Date;
  calendly_scheduled_after?: Date;
  calendly_scheduled_before?: Date;
}

/**
 * Pagination parameters
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: keyof StrategySession;
  sortOrder?: 'ASC' | 'DESC';
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
