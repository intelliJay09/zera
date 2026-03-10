-- 1. Disable checks to prevent lockups
SET FOREIGN_KEY_CHECKS = 0;
SET UNIQUE_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- 2. Clear existing structure
DROP VIEW IF EXISTS `v_abandoned_bookings_pending`;
DROP VIEW IF EXISTS `v_crm_webhook_failures`;
DROP VIEW IF EXISTS `v_payment_success_rate_7d`;
DROP VIEW IF EXISTS `v_sessions_needing_reminder`;
DROP VIEW IF EXISTS `v_todays_bookings`;
DROP TABLE IF EXISTS `strategy_sessions`;
DROP TABLE IF EXISTS `rate_limit_attempts`;

-- 3. Create Tables
CREATE TABLE `rate_limit_attempts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(45) NOT NULL,
  `endpoint` varchar(255) NOT NULL,
  `attempted_at` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `strategy_sessions` (
  `id` char(36) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `business_email` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `website_url` varchar(500) NOT NULL,
  `whatsapp_number` varchar(50) NOT NULL,
  `revenue_range` varchar(50) NOT NULL,
  `payment_status` varchar(50) NOT NULL DEFAULT 'pending',
  `payment_reference` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `payment_reference` (`payment_reference`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. Insert Data (Simplified for the bridge)
INSERT INTO `rate_limit_attempts` (id, ip_address, endpoint, attempted_at) VALUES
(38,'::1','/api/asset-accession/submit','2026-02-13 12:06:02');

-- 5. Re-enable checks and Commit
COMMIT;
SET FOREIGN_KEY_CHECKS = 1;
SET UNIQUE_CHECKS = 1;