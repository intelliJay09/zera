-- Migration: Create discovery_submissions table
-- Description: Stores website discovery form data submitted by clients after payment
-- Created: January 2025

CREATE TABLE IF NOT EXISTS discovery_submissions (
  id CHAR(36) PRIMARY KEY DEFAULT (UUID()),

  -- Foreign Key to Checkout
  checkout_id CHAR(36) COMMENT 'Links to checkout_submissions.id',
  email VARCHAR(255) NOT NULL COMMENT 'Client email for identification',

  -- Resume Functionality
  resume_token VARCHAR(64) UNIQUE COMMENT 'Secure token for save & resume feature',
  resume_token_expires_at DATETIME COMMENT 'Token expiration timestamp',
  completion_status VARCHAR(20) DEFAULT 'incomplete' COMMENT 'incomplete, partial, completed',

  -- Section 1: Business & Brand Identity
  business_name VARCHAR(255) COMMENT 'Official business name as it appears on website',
  business_tagline VARCHAR(500) COMMENT 'Optional business tagline/slogan',
  logo_url VARCHAR(500) COMMENT 'URL to uploaded logo file',
  social_links JSON COMMENT 'Array of social media links: [{"platform": "Facebook", "url": "..."}]',
  brand_style TEXT COMMENT 'Brand description in 3-5 words',
  inspiration_sites JSON COMMENT 'Array of 2 inspiration website URLs',
  main_goal VARCHAR(50) COMMENT 'call, contact_form, portfolio, information, sell_products',

  -- Section 2: Domain Name
  desired_domain VARCHAR(255) COMMENT 'Primary domain choice',
  alt_domain_1 VARCHAR(255) COMMENT 'Alternative domain option 1',
  alt_domain_2 VARCHAR(255) COMMENT 'Alternative domain option 2',

  -- Section 3.1: Homepage Content
  homepage_headline VARCHAR(500) COMMENT 'Main headline for homepage',
  homepage_intro TEXT COMMENT 'Introductory paragraph',
  homepage_banner_url VARCHAR(500) COMMENT 'URL to homepage banner image',

  -- Section 3.2: About Us Page
  about_headline VARCHAR(500) COMMENT 'About page headline',
  about_description TEXT COMMENT 'Company history/description',
  team_photos JSON COMMENT 'Array of team photo URLs (up to 10)',

  -- Section 3.3: Services/Products Page
  services_headline VARCHAR(500) COMMENT 'Services page headline',
  services_list JSON COMMENT 'Array of services: [{"name": "", "description": "", "image_url": ""}]',

  -- Section 3.4: Gallery Page
  gallery_headline VARCHAR(500) COMMENT 'Gallery page headline',
  gallery_images JSON COMMENT 'Array of gallery image URLs (up to 20)',

  -- Section 3.5: Contact Page
  contact_phone VARCHAR(50) COMMENT 'Business phone number for display',
  contact_email VARCHAR(255) COMMENT 'Public business email',
  contact_address TEXT COMMENT 'Physical address for map',
  contact_form_recipient VARCHAR(255) COMMENT 'Private email to receive contact form submissions',

  -- Section 4: Final Confirmation
  content_signoff BOOLEAN DEFAULT FALSE COMMENT 'Client confirmed content is final',

  -- Submission Metadata
  submitted_at DATETIME COMMENT 'When form was fully submitted',
  last_saved_at DATETIME COMMENT 'Last auto-save timestamp',
  current_section INT DEFAULT 1 COMMENT 'Last completed section (for resume)',

  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  -- Foreign Key Constraint
  FOREIGN KEY (checkout_id) REFERENCES checkout_submissions(id) ON DELETE SET NULL,

  -- Indexes
  INDEX idx_email (email),
  INDEX idx_resume_token (resume_token),
  INDEX idx_checkout_id (checkout_id),
  INDEX idx_completion_status (completion_status),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Website discovery form submissions';
