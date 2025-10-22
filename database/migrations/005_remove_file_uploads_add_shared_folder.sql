-- Migration 005: Remove File Upload System, Add Shared Folder Link
-- Purpose: Replace individual file uploads with single shared folder link approach
-- Date: 2025-01-06

USE astraflow;

-- Drop the uploaded_files table entirely (no longer needed)
DROP TABLE IF EXISTS uploaded_files;

-- Modify discovery_submissions table
ALTER TABLE discovery_submissions
  -- Remove individual file URL columns
  DROP COLUMN IF EXISTS logo_url,
  DROP COLUMN IF EXISTS homepage_banner_url,
  DROP COLUMN IF EXISTS team_photos,
  DROP COLUMN IF EXISTS gallery_images,

  -- Add shared folder link column
  ADD COLUMN shared_folder_link VARCHAR(500) NULL AFTER gallery_headline,
  ADD COLUMN folder_organization_notes TEXT NULL AFTER shared_folder_link;

-- Add index for faster queries on folder links
CREATE INDEX idx_shared_folder_link ON discovery_submissions(shared_folder_link(255));

-- Update comment on table
ALTER TABLE discovery_submissions
COMMENT = 'Discovery form submissions with shared folder link for all client assets';
