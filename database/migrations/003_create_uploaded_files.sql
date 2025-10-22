-- Migration: Create uploaded_files table
-- Description: Tracks all files uploaded during the discovery form process
-- Created: January 2025

CREATE TABLE IF NOT EXISTS uploaded_files (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),

  -- Reference to Submission
  submission_id CHAR(36) NOT NULL COMMENT 'Links to discovery_submissions.id',

  -- File Metadata
  file_name VARCHAR(255) NOT NULL COMMENT 'Original filename',
  file_size INT NOT NULL COMMENT 'File size in bytes',
  file_type VARCHAR(100) NOT NULL COMMENT 'MIME type (image/png, image/jpeg, etc)',
  file_extension VARCHAR(10) COMMENT 'File extension (.png, .jpg, etc)',

  -- Storage Information
  storage_path VARCHAR(500) NOT NULL COMMENT 'Path in storage system',
  public_url VARCHAR(500) NOT NULL COMMENT 'Publicly accessible URL',
  storage_provider VARCHAR(50) DEFAULT 'uploadthing' COMMENT 'uploadthing, supabase, s3, etc',

  -- Form Field Association
  field_name VARCHAR(100) NOT NULL COMMENT 'Form field this file belongs to (logo, homepage_banner, etc)',
  field_index INT COMMENT 'Index for array fields (team_photos[0], gallery_images[3])',

  -- Validation
  is_validated BOOLEAN DEFAULT FALSE COMMENT 'Whether file passed security/type validation',
  validation_errors JSON COMMENT 'Any validation errors encountered',

  -- Processing Status
  processing_status VARCHAR(50) DEFAULT 'uploaded' COMMENT 'uploaded, processing, optimized, failed',
  thumbnail_url VARCHAR(500) COMMENT 'URL to thumbnail/preview (for images)',

  -- Timestamps
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME COMMENT 'Soft delete timestamp',

  -- Foreign Key Constraint
  FOREIGN KEY (submission_id) REFERENCES discovery_submissions(id) ON DELETE CASCADE,

  -- Indexes
  INDEX idx_submission_id (submission_id),
  INDEX idx_field_name (field_name),
  INDEX idx_uploaded_at (uploaded_at),
  INDEX idx_processing_status (processing_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='File uploads tracking for discovery forms';
