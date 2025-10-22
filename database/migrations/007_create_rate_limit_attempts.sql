-- Migration: Create rate_limit_attempts table
-- Description: Tracks API request attempts for database-based rate limiting
-- Created: January 2025

CREATE TABLE IF NOT EXISTS rate_limit_attempts (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,

  -- Request Identification
  ip_address VARCHAR(45) NOT NULL COMMENT 'Client IP address (supports IPv4 and IPv6)',
  endpoint VARCHAR(255) NOT NULL COMMENT 'API endpoint path (e.g., /api/discovery/save)',

  -- Timestamp
  attempted_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'When the request was made',

  -- Indexes for Fast Lookups
  INDEX idx_rate_limit_lookup (ip_address, endpoint, attempted_at) COMMENT 'Primary lookup index for rate limit checks',
  INDEX idx_cleanup (attempted_at) COMMENT 'Index for periodic cleanup of old records'

) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tracks API request attempts for rate limiting';
