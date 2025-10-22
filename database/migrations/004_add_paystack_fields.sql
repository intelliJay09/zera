-- Migration: Add Paystack-specific fields to checkout_submissions
-- Description: Adds columns for Paystack customer code and payment error messages
-- Created: January 2025

ALTER TABLE checkout_submissions
  ADD COLUMN IF NOT EXISTS paystack_customer_code VARCHAR(100) COMMENT 'Paystack customer code for future charges',
  ADD COLUMN IF NOT EXISTS payment_error_message TEXT COMMENT 'Error message if payment failed',
  ADD COLUMN IF NOT EXISTS paid_at DATETIME COMMENT 'Timestamp from Paystack when payment was completed';

-- Update existing payment_completed_at to use paid_at if exists
UPDATE checkout_submissions
SET payment_completed_at = paid_at
WHERE paid_at IS NOT NULL AND payment_completed_at IS NULL;
