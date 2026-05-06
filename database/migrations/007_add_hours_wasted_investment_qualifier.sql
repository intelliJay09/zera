-- Migration 007: Add hours_wasted and investment_qualifier columns to growth_audit
-- Required before deploying form changes (phone number rename, new diagnostic questions)
-- Run against production DB before deploying this code

ALTER TABLE `growth_audit`
  ADD COLUMN `hours_wasted` VARCHAR(500) NULL DEFAULT NULL AFTER `magic_wand_outcome`,
  ADD COLUMN `investment_qualifier` VARCHAR(50) NULL DEFAULT NULL AFTER `hours_wasted`,
  ADD COLUMN `budget_range` VARCHAR(500) NULL DEFAULT NULL AFTER `investment_qualifier`;
