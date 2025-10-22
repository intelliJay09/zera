-- Rename services columns to offerings
-- This supports both services and products

ALTER TABLE discovery_submissions
  CHANGE COLUMN services_headline offerings_headline VARCHAR(500) COMMENT 'Offerings page headline',
  CHANGE COLUMN services_list offerings_list JSON COMMENT 'Array of offerings/services/products';
