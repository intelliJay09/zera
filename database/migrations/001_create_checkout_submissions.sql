-- Migration: Create checkout_submissions table
-- Description: Stores initial checkout and payment information when clients sign up for WaaS plans
-- Created: January 2025

CREATE TABLE IF NOT EXISTS checkout_submissions (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),

  -- Plan Information
  plan_id VARCHAR(50) NOT NULL COMMENT 'Plan identifier (e.g., business-commerce)',
  plan_name VARCHAR(100) NOT NULL COMMENT 'Human-readable plan name',
  plan_price JSON NOT NULL COMMENT 'Pricing in multiple currencies: {"USD": 570, "GHS": 2000}',

  -- Contact Information
  full_name VARCHAR(255) NOT NULL,
  business_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,

  -- Payment Information
  payment_status VARCHAR(50) DEFAULT 'pending' COMMENT 'pending, processing, completed, failed, refunded',
  payment_reference VARCHAR(255) COMMENT 'Paystack transaction reference',
  payment_amount DECIMAL(10, 2) COMMENT 'Actual amount paid',
  payment_currency VARCHAR(10) COMMENT 'Currency used (GHS, USD)',
  payment_method VARCHAR(50) COMMENT 'card, mobile_money, bank_transfer',
  payment_completed_at DATETIME COMMENT 'When payment was confirmed',

  -- Legal Agreement
  agreed_to_terms BOOLEAN DEFAULT FALSE,
  agreed_to_sla BOOLEAN DEFAULT FALSE,

  -- Metadata
  ip_address VARCHAR(45) COMMENT 'Client IP address for security',
  user_agent TEXT COMMENT 'Browser/device information',

  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- Indexes
  INDEX idx_email (email),
  INDEX idx_payment_status (payment_status),
  INDEX idx_payment_reference (payment_reference),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='WaaS checkout and payment submissions';
