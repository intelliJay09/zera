/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-12.0.2-MariaDB, for osx10.21 (arm64)
--
-- Host: localhost    Database: zera
-- ------------------------------------------------------
-- Server version	12.0.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `rate_limit_attempts`
--

DROP TABLE IF EXISTS `rate_limit_attempts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `rate_limit_attempts` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ip_address` varchar(45) NOT NULL COMMENT 'Client IP address (supports IPv4 and IPv6)',
  `endpoint` varchar(255) NOT NULL COMMENT 'API endpoint path',
  `attempted_at` datetime DEFAULT current_timestamp() COMMENT 'When the request was made',
  PRIMARY KEY (`id`),
  KEY `idx_rate_limit_lookup` (`ip_address`,`endpoint`,`attempted_at`) COMMENT 'Primary lookup index for rate limit checks',
  KEY `idx_cleanup` (`attempted_at`) COMMENT 'Index for periodic cleanup of old records'
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tracks API request attempts for rate limiting';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rate_limit_attempts`
--

LOCK TABLES `rate_limit_attempts` WRITE;
/*!40000 ALTER TABLE `rate_limit_attempts` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `rate_limit_attempts` VALUES
(38,'::1','/api/asset-accession/submit','2026-02-13 12:06:02'),
(39,'::1','/api/asset-accession/submit','2026-02-13 12:33:04');
/*!40000 ALTER TABLE `rate_limit_attempts` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Table structure for table `strategy_sessions`
--

DROP TABLE IF EXISTS `strategy_sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `strategy_sessions` (
  `id` char(36) NOT NULL DEFAULT uuid(),
  `full_name` varchar(255) NOT NULL,
  `business_email` varchar(255) NOT NULL,
  `company_name` varchar(255) NOT NULL,
  `website_url` varchar(500) NOT NULL,
  `whatsapp_number` varchar(50) NOT NULL,
  `revenue_range` enum('pre-revenue','50k-250k','250k-1m','1m+','custom') NOT NULL,
  `custom_revenue` varchar(255) DEFAULT NULL,
  `growth_obstacle` enum('visibility','lead-flow','retention','chaos') NOT NULL,
  `magic_wand_outcome` text NOT NULL,
  `payment_status` enum('pending','completed','failed','abandoned') NOT NULL DEFAULT 'pending',
  `payment_reference` varchar(100) NOT NULL,
  `payment_amount` decimal(10,2) DEFAULT 100.00,
  `payment_currency` varchar(3) DEFAULT 'USD',
  `paid_at` timestamp NULL DEFAULT NULL,
  `payment_error_message` text DEFAULT NULL,
  `paystack_customer_code` varchar(100) DEFAULT NULL,
  `calendly_event_uri` varchar(500) DEFAULT NULL,
  `calendly_invitee_uri` varchar(500) DEFAULT NULL,
  `calendly_scheduled_at` timestamp NULL DEFAULT NULL,
  `calendly_status` enum('not_booked','booked','canceled','rescheduled') NOT NULL DEFAULT 'not_booked',
  `calendly_cancellation_reason` text DEFAULT NULL,
  `confirmation_email_sent` tinyint(1) DEFAULT 0,
  `confirmation_email_sent_at` timestamp NULL DEFAULT NULL,
  `team_notification_sent` tinyint(1) DEFAULT 0,
  `team_notification_sent_at` timestamp NULL DEFAULT NULL,
  `calendar_confirmation_email_sent` tinyint(1) DEFAULT 0,
  `calendar_confirmation_email_sent_at` timestamp NULL DEFAULT NULL,
  `reminder_email_sent` tinyint(1) DEFAULT 0,
  `reminder_email_sent_at` timestamp NULL DEFAULT NULL,
  `abandoned_email_sent` tinyint(1) DEFAULT 0,
  `abandoned_email_sent_at` timestamp NULL DEFAULT NULL,
  `crm_webhook_sent` tinyint(1) DEFAULT 0,
  `crm_webhook_sent_at` timestamp NULL DEFAULT NULL,
  `crm_webhook_response` text DEFAULT NULL,
  `crm_webhook_error` text DEFAULT NULL,
  `crm_webhook_retry_count` int(11) DEFAULT 0,
  `crm_webhook_last_retry_at` timestamp NULL DEFAULT NULL,
  `booking_stage` enum('form_submitted','payment_completed','calendar_booked','session_held','no_show') NOT NULL DEFAULT 'form_submitted',
  `utm_source` varchar(100) DEFAULT NULL,
  `utm_medium` varchar(100) DEFAULT NULL,
  `utm_campaign` varchar(100) DEFAULT NULL,
  `utm_term` varchar(100) DEFAULT NULL,
  `utm_content` varchar(100) DEFAULT NULL,
  `referrer_url` varchar(500) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `booking_token` varchar(64) DEFAULT NULL,
  `booking_token_used` tinyint(1) DEFAULT 0,
  `booking_token_expires_at` datetime DEFAULT NULL,
  `calendly_event_booked` tinyint(1) DEFAULT 0,
  `calendly_event_booked_at` datetime DEFAULT NULL,
  `incomplete_booking_email_sent` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Whether incomplete booking reminder email has been sent',
  `incomplete_booking_email_sent_at` timestamp NULL DEFAULT NULL COMMENT 'When incomplete booking reminder email was sent',
  PRIMARY KEY (`id`),
  UNIQUE KEY `payment_reference` (`payment_reference`),
  UNIQUE KEY `booking_token` (`booking_token`),
  KEY `idx_business_email` (`business_email`),
  KEY `idx_payment_status` (`payment_status`),
  KEY `idx_payment_reference` (`payment_reference`),
  KEY `idx_booking_stage` (`booking_stage`),
  KEY `idx_created_at` (`created_at`),
  KEY `idx_calendly_scheduled_at` (`calendly_scheduled_at`),
  KEY `idx_payment_completed` (`payment_status`,`paid_at`),
  KEY `idx_abandoned_bookings` (`payment_status`,`abandoned_email_sent`,`created_at`),
  KEY `idx_reminder_eligible` (`booking_stage`,`reminder_email_sent`,`calendly_scheduled_at`),
  KEY `idx_booking_token` (`booking_token`),
  KEY `idx_token_expiry` (`booking_token_expires_at`),
  KEY `idx_token_used` (`booking_token_used`),
  KEY `idx_event_booked` (`calendly_event_booked`),
  KEY `idx_incomplete_booking_check` (`payment_status`,`calendly_status`,`incomplete_booking_email_sent`,`paid_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `strategy_sessions`
--

LOCK TABLES `strategy_sessions` WRITE;
/*!40000 ALTER TABLE `strategy_sessions` DISABLE KEYS */;
set autocommit=0;
INSERT INTO `strategy_sessions` VALUES
('21b14fd1-1868-42a2-a076-4efc974ce153','Testing','test@gmail.com','ABC Test','https://test.com','0556723456','50k-250k',NULL,'lead-flow','This is a test','completed','ZERA_STRAT_20260201_C2DDC730',2000.00,'GHS','2026-02-01 18:44:52',NULL,'CUS_jf2gunkpw1xoch7',NULL,NULL,NULL,'not_booked',NULL,0,NULL,1,'2026-02-01 18:44:56',0,NULL,0,NULL,0,NULL,1,'2026-02-01 18:44:57','{\"attempt\":\"019c1a85-ba7d-2143-7616-b40c579cfde8\",\"id\":\"019c1a85-ba7d-2143-7616-b40c579cfde8\",\"request_id\":\"019c1a85-ba7d-2143-7616-b40c579cfde8\",\"status\":\"success\"}\n',NULL,0,NULL,'payment_completed',NULL,NULL,NULL,NULL,NULL,'https://11a8032db8df.ngrok-free.app/booking','154.161.134.138','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Safari/605.1.15','2026-02-01 18:44:37','2026-02-01 18:47:20','0cb75e9aa922f74db7d3de6c07a1430f7bd97806d996331096e8ab5cb120a4b7',1,'2026-02-02 18:44:54',1,'2026-02-01 18:47:20',0,NULL),
('3add0b4e-a432-4a69-9a82-83156b0d37c9','Check','nharnaheqwa@gmail.com','ABC Tesg','https://test.com','03346782940','50k-250k',NULL,'lead-flow','This is a test','completed','ZERA_STRAT_20260201_64378A88',2000.00,'GHS','2026-02-01 17:06:45',NULL,'CUS_ouki9yd15e2ikub',NULL,NULL,NULL,'not_booked',NULL,0,NULL,1,'2026-02-01 17:06:54',0,NULL,0,NULL,0,NULL,1,'2026-02-01 17:06:55','{\"attempt\":\"019c1a2b-f841-5647-3300-bc4bb6771b4e\",\"id\":\"019c1a2b-f841-5647-3300-bc4bb6771b4e\",\"request_id\":\"019c1a2b-f841-5647-3300-bc4bb6771b4e\",\"status\":\"success\"}\n',NULL,0,NULL,'payment_completed',NULL,NULL,NULL,NULL,NULL,'https://11a8032db8df.ngrok-free.app/booking','154.161.134.138','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Safari/605.1.15','2026-02-01 17:02:16','2026-02-01 17:06:55','07c2706bdad6c54c3a12ac3b66703cc25252c6a19cb2438eaea89a4e9b5f44ac',1,'2026-02-02 17:02:32',1,'2026-02-01 17:03:26',0,NULL),
('4eadd610-3546-49b3-b424-b53000c2cfef','Jackie','nharnaheqwa@gmail.com','Tst','https://test.com','05578352673','250k-1m',NULL,'lead-flow','This is another test','completed','ZERA_STRAT_20260201_69ED47AE',2000.00,'GHS','2026-02-01 16:03:55',NULL,'CUS_ouki9yd15e2ikub',NULL,NULL,NULL,'not_booked',NULL,0,NULL,1,'2026-02-01 16:03:59',0,NULL,0,NULL,0,NULL,1,'2026-02-01 16:04:00','{\"attempt\":\"019c19f2-5feb-6e75-8df2-32c08fec7774\",\"id\":\"019c19f2-5feb-6e75-8df2-32c08fec7774\",\"request_id\":\"019c19f2-5feb-6e75-8df2-32c08fec7774\",\"status\":\"success\"}\n',NULL,0,NULL,'payment_completed',NULL,NULL,NULL,NULL,NULL,'https://11a8032db8df.ngrok-free.app/booking','143.105.209.48','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Safari/605.1.15','2026-02-01 16:03:06','2026-02-01 16:05:29','94bf108ed7f646f52c9b6d0caeb26a24cd0bf017c0462ca922f3e5bc3c6be01c',1,'2026-02-02 16:03:57',1,'2026-02-01 16:05:29',0,NULL),
('571dcefd-fefe-4e5b-9399-6e158b8169dc','Jackie','nharnaheqwa@gmail.com','ABC Dynamics','https://zerahq.com','0556723456','1m+',NULL,'retention','This is a test','failed','ZERA_STRAT_20260201_878B2D8D',100.00,'USD',NULL,'Failed to initialize payment: Unexpected token \'<\', \"<!DOCTYPE \"... is not valid JSON',NULL,NULL,NULL,NULL,'not_booked',NULL,0,NULL,0,NULL,0,NULL,0,NULL,0,NULL,0,NULL,NULL,NULL,0,NULL,'form_submitted',NULL,NULL,NULL,NULL,NULL,'https://11a8032db8df.ngrok-free.app/booking','143.105.209.48','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Safari/605.1.15','2026-02-01 15:07:42','2026-02-01 15:07:43',NULL,0,NULL,0,NULL,0,NULL),
('76b38bd6-109d-4ae4-885e-94a51603e25e','Jackie','nharnaheqwa@gmail.com','Test','https://testing.com','0557823456','50k-250k',NULL,'retention','In 12 months, what specific outcome would make this partnership a massive success','completed','ZERA_STRAT_20260201_558DBE51',2000.00,'GHS','2026-02-01 18:49:01',NULL,'CUS_ouki9yd15e2ikub',NULL,NULL,NULL,'not_booked',NULL,0,NULL,1,'2026-02-01 18:49:13',0,NULL,0,NULL,0,NULL,1,'2026-02-01 18:49:14','{\"attempt\":\"019c1a89-a675-d6bb-9dd0-4da2f6e0924b\",\"id\":\"019c1a89-a675-d6bb-9dd0-4da2f6e0924b\",\"request_id\":\"019c1a89-a675-d6bb-9dd0-4da2f6e0924b\",\"status\":\"success\"}\n',NULL,0,NULL,'payment_completed',NULL,NULL,NULL,NULL,NULL,'https://11a8032db8df.ngrok-free.app/booking','154.161.134.138','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Safari/605.1.15','2026-02-01 18:48:52','2026-02-01 18:50:36','99fa03e3cf42e0e5746036840d5ce52d8cf142749d20189b95660c3dca523c2d',1,'2026-02-02 18:49:03',1,'2026-02-01 18:50:36',0,NULL),
('824a6b84-9161-43e6-9f48-0d63baf034e6','Test','test@gmail.com','test acc','https://test.com','0234567893','1m+',NULL,'retention','Test is here again','completed','ZERA_STRAT_20260129_E175D091',2000.00,'GHS','2026-01-29 20:34:26',NULL,'CUS_jf2gunkpw1xoch7',NULL,NULL,NULL,'not_booked',NULL,0,NULL,1,'2026-01-29 20:34:31',0,NULL,0,NULL,0,NULL,1,'2026-01-29 20:34:32','{\"attempt\":\"019c0b76-fa04-eaea-89ee-179816c8e57b\",\"id\":\"019c0b76-fa04-eaea-89ee-179816c8e57b\",\"request_id\":\"019c0b76-fa04-eaea-89ee-179816c8e57b\",\"status\":\"success\"}\n',NULL,0,NULL,'payment_completed',NULL,NULL,NULL,NULL,NULL,'https://8db2367d6ec4.ngrok-free.app/booking','143.105.209.14','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Safari/605.1.15','2026-01-29 20:34:07','2026-01-29 20:37:16','0259086314267a1dead84a9b48977a24f90e6bc1213af2b1091c741728c81604',1,'2026-01-30 20:34:27',1,'2026-01-29 20:37:16',0,NULL),
('83dfb28b-fa1e-4e8e-81d0-43c86bf74998','John','nharnaheqwa@gmil.com','test','https://testing.com','033456892','1m+',NULL,'retention','this is a test','completed','ZERA_STRAT_20260201_B9B39707',2000.00,'GHS','2026-02-01 22:07:22',NULL,'CUS_lv1bi1qzd8fyg9u','https://api.calendly.com/scheduled_events/37b4034c-d331-4d07-b229-51e36aa3cd8e','https://api.calendly.com/scheduled_events/37b4034c-d331-4d07-b229-51e36aa3cd8e/invitees/d0cdeb19-071c-49db-80ab-2da1e2c59c9d',NULL,'booked',NULL,0,NULL,1,'2026-02-01 22:07:26',1,'2026-02-01 22:08:51',0,NULL,0,NULL,1,'2026-02-01 22:07:27','{\"attempt\":\"019c1b3f-1fbb-0654-aa55-b9c673d8806b\",\"id\":\"019c1b3f-1fbb-0654-aa55-b9c673d8806b\",\"request_id\":\"019c1b3f-1fbb-0654-aa55-b9c673d8806b\",\"status\":\"success\"}\n',NULL,0,NULL,'calendar_booked',NULL,NULL,NULL,NULL,NULL,'https://11a8032db8df.ngrok-free.app/booking','154.161.163.91','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Safari/605.1.15','2026-02-01 22:07:11','2026-02-01 22:08:51','b1d26db7d5e1b57eb2848241de60f0bfb9788c414c8ed17894ca81087e86eb4b',1,'2026-02-02 22:07:23',1,'2026-02-01 22:08:47',0,NULL),
('84316dc8-0272-4e01-af04-7bce6dff9f2f','Jackie','nharnaheqwa@gmail.com','Test','https://test.com','0552347890','250k-1m',NULL,'retention','This is a test','completed','ZERA_STRAT_20260201_499228C4',2000.00,'GHS','2026-02-01 15:17:03',NULL,'CUS_ouki9yd15e2ikub',NULL,NULL,NULL,'not_booked',NULL,1,'2026-02-01 15:17:07',1,'2026-02-01 15:17:11',0,NULL,0,NULL,0,NULL,1,'2026-02-01 15:17:12','{\"attempt\":\"019c19c7-84c0-6bfa-10ab-bdea01936a65\",\"id\":\"019c19c7-84c0-6bfa-10ab-bdea01936a65\",\"request_id\":\"019c19c7-84c0-6bfa-10ab-bdea01936a65\",\"status\":\"success\"}\n',NULL,0,NULL,'payment_completed',NULL,NULL,NULL,NULL,NULL,'https://11a8032db8df.ngrok-free.app/booking','143.105.209.48','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Safari/605.1.15','2026-02-01 15:16:48','2026-02-01 15:18:13','43fd5fcb90ea0ed958971a0ecbd0324b12dfa68c9b94f9709d01d70aaff58f7f',1,'2026-02-02 15:17:04',1,'2026-02-01 15:18:13',0,NULL),
('8d178124-7eb2-4ae5-bd0b-a9c0e784aacc','Test','test@gmail.com','test','https://test.com','0234580345','1m+',NULL,'retention','test is here','completed','ZERA_STRAT_20260129_083386C9',2000.00,'GHS','2026-01-29 20:21:25',NULL,'CUS_jf2gunkpw1xoch7',NULL,NULL,NULL,'not_booked',NULL,0,NULL,1,'2026-01-29 20:21:30',0,NULL,0,NULL,0,NULL,1,'2026-01-29 20:21:31','{\"attempt\":\"019c0b6b-0f67-296a-4d7e-9ea6de357052\",\"id\":\"019c0b6b-0f67-296a-4d7e-9ea6de357052\",\"request_id\":\"019c0b6b-0f67-296a-4d7e-9ea6de357052\",\"status\":\"success\"}\n',NULL,0,NULL,'payment_completed',NULL,NULL,NULL,NULL,NULL,'https://8db2367d6ec4.ngrok-free.app/booking','143.105.209.14','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Safari/605.1.15','2026-01-29 20:21:14','2026-01-29 20:21:31','68c0e2c237b1d214070227edd22d1e83ccb702b869e89b73158199c53113c639',0,'2026-01-30 20:21:26',0,NULL,0,NULL),
('93c5f74e-a04c-444f-b069-c83a0e796423','Jackie','nharnaheqwa@gmail.com','ABC Test','https://zerahq.com','0241234567','50k-250k',NULL,'retention','Test is this','completed','ZERA_STRAT_20260129_620C3068',2000.00,'GHS','2026-01-29 19:38:32',NULL,'CUS_ouki9yd15e2ikub',NULL,NULL,NULL,'not_booked',NULL,0,NULL,0,NULL,0,NULL,0,NULL,0,NULL,0,NULL,NULL,NULL,0,NULL,'payment_completed',NULL,NULL,NULL,NULL,NULL,'https://8e8fbdcb1a7a.ngrok-free.app/booking','143.105.209.14','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Safari/605.1.15','2026-01-29 19:38:20','2026-01-29 19:38:32',NULL,0,NULL,0,NULL,0,NULL),
('9b351f15-ec55-4149-ba5b-1fe22d773c3c','Jackie','jacque.amoako@gmail.com','testabac','https://testbed.com','0234567822','1m+',NULL,'lead-flow','This is another test','completed','ZERA_STRAT_20260129_F3386795',2000.00,'GHS','2026-01-29 21:27:51',NULL,'CUS_ntrsjub3ovjc6k2',NULL,NULL,NULL,'not_booked',NULL,1,'2026-01-29 21:27:54',1,'2026-01-29 21:27:58',0,NULL,0,NULL,0,NULL,1,'2026-01-29 21:27:58','{\"attempt\":\"019c0ba7-e60d-0abf-bfc8-23c9f84cb9b3\",\"id\":\"019c0ba7-e60d-0abf-bfc8-23c9f84cb9b3\",\"request_id\":\"019c0ba7-e60d-0abf-bfc8-23c9f84cb9b3\",\"status\":\"success\"}\n',NULL,0,NULL,'payment_completed',NULL,NULL,NULL,NULL,NULL,'https://8db2367d6ec4.ngrok-free.app/booking','143.105.209.14','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Safari/605.1.15','2026-01-29 21:27:36','2026-01-29 21:27:58','0643b9558980fb5ccbe9fdedc8b9002953443ab8b9470ac7bd7d9069018d168e',0,'2026-01-30 21:27:51',0,NULL,0,NULL),
('9f218016-fb42-4966-a78e-0d04481b5015','Jackie','nharnaheqwa@gmail.com','Testing','https://testing.com','0556723456','250k-1m',NULL,'lead-flow','This is a test','completed','ZERA_STRAT_20260201_8104FC7E',2000.00,'GHS','2026-02-01 20:09:04',NULL,'CUS_ouki9yd15e2ikub',NULL,NULL,NULL,'not_booked',NULL,1,'2026-02-01 20:09:16',1,'2026-02-01 20:09:26',0,NULL,0,NULL,0,NULL,1,'2026-02-01 20:09:28','{\"attempt\":\"019c1ad3-19c9-3032-e623-01419092c564\",\"id\":\"019c1ad3-19c9-3032-e623-01419092c564\",\"request_id\":\"019c1ad3-19c9-3032-e623-01419092c564\",\"status\":\"success\"}\n',NULL,0,NULL,'payment_completed',NULL,NULL,NULL,NULL,NULL,'https://11a8032db8df.ngrok-free.app/booking','154.161.33.26','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Safari/605.1.15','2026-02-01 20:02:45','2026-02-01 20:09:28','ec6ff60b183b54d03a5b0e776bbc7a3dd50b01db902afea55c27c4ef87104384',1,'2026-02-02 20:03:24',1,'2026-02-01 20:06:15',0,NULL),
('dac9e1f6-47f4-4311-ac58-fd41a47818cb','test','test@gmail.com','testing','https://test.com','0552345876','250k-1m',NULL,'chaos','11a8032db8df.ngrok-free.app/','completed','ZERA_STRAT_20260201_70B7AC02',2000.00,'GHS','2026-02-01 15:02:16',NULL,'CUS_jf2gunkpw1xoch7',NULL,NULL,NULL,'not_booked',NULL,1,'2026-02-01 15:02:20',1,'2026-02-01 15:02:23',0,NULL,0,NULL,0,NULL,1,'2026-02-01 15:02:23','{\"attempt\":\"019c19b9-f79f-bc23-1089-54a2a0145db8\",\"id\":\"019c19b9-f79f-bc23-1089-54a2a0145db8\",\"request_id\":\"019c19b9-f79f-bc23-1089-54a2a0145db8\",\"status\":\"success\"}\n',NULL,0,NULL,'payment_completed',NULL,NULL,NULL,NULL,NULL,'https://11a8032db8df.ngrok-free.app/booking','143.105.209.48','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Safari/605.1.15','2026-02-01 15:02:02','2026-02-01 15:04:13','b46e8d6552a0e52ecd12a0b5b4d75ba04fdfc5b1556eae3a795002dc32d602bf',1,'2026-02-02 15:02:17',1,'2026-02-01 15:04:13',0,NULL),
('df6284e0-c444-452b-95b5-18dc1a76b0d1','Jack','nharnaheqwa@gmail.com','Test','https://Testing.com','0445809039021','250k-1m',NULL,'retention','This is a test','completed','ZERA_STRAT_20260202_378A32F5',2000.00,'GHS','2026-02-02 11:33:36',NULL,'CUS_ouki9yd15e2ikub','https://api.calendly.com/scheduled_events/e260c5e3-afa5-48ab-b59a-0965b2bda3c7','https://api.calendly.com/scheduled_events/e260c5e3-afa5-48ab-b59a-0965b2bda3c7/invitees/c8dcdedd-987b-4422-a5bf-e37636af7431',NULL,'booked',NULL,0,NULL,1,'2026-02-02 11:29:56',1,'2026-02-02 11:31:10',0,NULL,0,NULL,1,'2026-02-02 11:33:37','{\"attempt\":\"019c1e21-2f35-b69e-6701-8c805b84c218\",\"id\":\"019c1e21-2f35-b69e-6701-8c805b84c218\",\"request_id\":\"019c1e21-2f35-b69e-6701-8c805b84c218\",\"status\":\"success\"}\n',NULL,0,NULL,'payment_completed',NULL,NULL,NULL,NULL,NULL,'https://11a8032db8df.ngrok-free.app/booking','154.161.143.148','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Safari/605.1.15','2026-02-02 11:29:15','2026-02-02 11:33:37','2bb4a7901e7d3e02b6d55098dee73332c7eb0e18fc5b70d59920b088c027785e',1,'2026-02-03 11:29:29',1,'2026-02-02 11:30:41',0,NULL),
('f2a46d99-3f5a-49ea-a962-f22aa6845437','Test','nharnaheqwa@gmail.com','testing','https://test.com','03747899003','250k-1m',NULL,'retention','testing is good','completed','ZERA_STRAT_20260201_5CC4544B',2000.00,'GHS','2026-02-01 16:34:18',NULL,'CUS_ouki9yd15e2ikub',NULL,NULL,NULL,'not_booked',NULL,0,NULL,1,'2026-02-01 16:34:21',0,NULL,0,NULL,0,NULL,1,'2026-02-01 16:34:22','{\"attempt\":\"019c1a0e-2d4c-b5ab-3eee-887f0c9e5bf8\",\"id\":\"019c1a0e-2d4c-b5ab-3eee-887f0c9e5bf8\",\"request_id\":\"019c1a0e-2d4c-b5ab-3eee-887f0c9e5bf8\",\"status\":\"success\"}\n',NULL,0,NULL,'payment_completed',NULL,NULL,NULL,NULL,NULL,'https://11a8032db8df.ngrok-free.app/booking','143.105.209.48','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.2 Safari/605.1.15','2026-02-01 16:34:04','2026-02-01 16:35:20','288536be0aaf35f6d88266142d84ea313bc63a255c296787b54b6259d4c3adca',1,'2026-02-02 16:34:21',1,'2026-02-01 16:35:20',0,NULL);
/*!40000 ALTER TABLE `strategy_sessions` ENABLE KEYS */;
UNLOCK TABLES;
commit;

--
-- Temporary table structure for view `v_abandoned_bookings_pending`
--

DROP TABLE IF EXISTS `v_abandoned_bookings_pending`;
/*!50001 DROP VIEW IF EXISTS `v_abandoned_bookings_pending`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `v_abandoned_bookings_pending` AS SELECT
 1 AS `id`,
  1 AS `full_name`,
  1 AS `business_email`,
  1 AS `company_name`,
  1 AS `payment_reference`,
  1 AS `created_at`,
  1 AS `hours_since_submission` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_crm_webhook_failures`
--

DROP TABLE IF EXISTS `v_crm_webhook_failures`;
/*!50001 DROP VIEW IF EXISTS `v_crm_webhook_failures`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `v_crm_webhook_failures` AS SELECT
 1 AS `id`,
  1 AS `full_name`,
  1 AS `business_email`,
  1 AS `company_name`,
  1 AS `payment_reference`,
  1 AS `crm_webhook_retry_count`,
  1 AS `crm_webhook_error`,
  1 AS `crm_webhook_last_retry_at`,
  1 AS `created_at` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_payment_success_rate_7d`
--

DROP TABLE IF EXISTS `v_payment_success_rate_7d`;
/*!50001 DROP VIEW IF EXISTS `v_payment_success_rate_7d`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `v_payment_success_rate_7d` AS SELECT
 1 AS `total_submissions`,
  1 AS `completed_payments`,
  1 AS `failed_payments`,
  1 AS `pending_payments`,
  1 AS `abandoned_payments`,
  1 AS `success_rate_percent` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_sessions_needing_reminder`
--

DROP TABLE IF EXISTS `v_sessions_needing_reminder`;
/*!50001 DROP VIEW IF EXISTS `v_sessions_needing_reminder`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `v_sessions_needing_reminder` AS SELECT
 1 AS `id`,
  1 AS `full_name`,
  1 AS `business_email`,
  1 AS `company_name`,
  1 AS `calendly_scheduled_at`,
  1 AS `hours_until_session` */;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `v_todays_bookings`
--

DROP TABLE IF EXISTS `v_todays_bookings`;
/*!50001 DROP VIEW IF EXISTS `v_todays_bookings`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `v_todays_bookings` AS SELECT
 1 AS `id`,
  1 AS `full_name`,
  1 AS `business_email`,
  1 AS `company_name`,
  1 AS `revenue_range`,
  1 AS `growth_obstacle`,
  1 AS `payment_status`,
  1 AS `booking_stage`,
  1 AS `created_at` */;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `v_abandoned_bookings_pending`
--

/*!50001 DROP VIEW IF EXISTS `v_abandoned_bookings_pending`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_uca1400_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`jacqueline`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_abandoned_bookings_pending` AS select `strategy_sessions`.`id` AS `id`,`strategy_sessions`.`full_name` AS `full_name`,`strategy_sessions`.`business_email` AS `business_email`,`strategy_sessions`.`company_name` AS `company_name`,`strategy_sessions`.`payment_reference` AS `payment_reference`,`strategy_sessions`.`created_at` AS `created_at`,timestampdiff(HOUR,`strategy_sessions`.`created_at`,current_timestamp()) AS `hours_since_submission` from `strategy_sessions` where `strategy_sessions`.`payment_status` = 'pending' and `strategy_sessions`.`abandoned_email_sent` = 0 and `strategy_sessions`.`created_at` < current_timestamp() - interval 24 hour order by `strategy_sessions`.`created_at` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_crm_webhook_failures`
--

/*!50001 DROP VIEW IF EXISTS `v_crm_webhook_failures`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_uca1400_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`jacqueline`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_crm_webhook_failures` AS select `strategy_sessions`.`id` AS `id`,`strategy_sessions`.`full_name` AS `full_name`,`strategy_sessions`.`business_email` AS `business_email`,`strategy_sessions`.`company_name` AS `company_name`,`strategy_sessions`.`payment_reference` AS `payment_reference`,`strategy_sessions`.`crm_webhook_retry_count` AS `crm_webhook_retry_count`,`strategy_sessions`.`crm_webhook_error` AS `crm_webhook_error`,`strategy_sessions`.`crm_webhook_last_retry_at` AS `crm_webhook_last_retry_at`,`strategy_sessions`.`created_at` AS `created_at` from `strategy_sessions` where `strategy_sessions`.`payment_status` = 'completed' and `strategy_sessions`.`crm_webhook_sent` = 0 order by `strategy_sessions`.`created_at` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_payment_success_rate_7d`
--

/*!50001 DROP VIEW IF EXISTS `v_payment_success_rate_7d`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_uca1400_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`jacqueline`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_payment_success_rate_7d` AS select count(0) AS `total_submissions`,sum(case when `strategy_sessions`.`payment_status` = 'completed' then 1 else 0 end) AS `completed_payments`,sum(case when `strategy_sessions`.`payment_status` = 'failed' then 1 else 0 end) AS `failed_payments`,sum(case when `strategy_sessions`.`payment_status` = 'pending' then 1 else 0 end) AS `pending_payments`,sum(case when `strategy_sessions`.`payment_status` = 'abandoned' then 1 else 0 end) AS `abandoned_payments`,round(sum(case when `strategy_sessions`.`payment_status` = 'completed' then 1 else 0 end) / count(0) * 100,2) AS `success_rate_percent` from `strategy_sessions` where `strategy_sessions`.`created_at` >= current_timestamp() - interval 7 day */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_sessions_needing_reminder`
--

/*!50001 DROP VIEW IF EXISTS `v_sessions_needing_reminder`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_uca1400_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`jacqueline`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_sessions_needing_reminder` AS select `strategy_sessions`.`id` AS `id`,`strategy_sessions`.`full_name` AS `full_name`,`strategy_sessions`.`business_email` AS `business_email`,`strategy_sessions`.`company_name` AS `company_name`,`strategy_sessions`.`calendly_scheduled_at` AS `calendly_scheduled_at`,timestampdiff(HOUR,current_timestamp(),`strategy_sessions`.`calendly_scheduled_at`) AS `hours_until_session` from `strategy_sessions` where `strategy_sessions`.`booking_stage` = 'calendar_booked' and `strategy_sessions`.`reminder_email_sent` = 0 and `strategy_sessions`.`calendly_scheduled_at` between current_timestamp() + interval 23 hour and current_timestamp() + interval 25 hour order by `strategy_sessions`.`calendly_scheduled_at` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_todays_bookings`
--

/*!50001 DROP VIEW IF EXISTS `v_todays_bookings`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_uca1400_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`jacqueline`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_todays_bookings` AS select `strategy_sessions`.`id` AS `id`,`strategy_sessions`.`full_name` AS `full_name`,`strategy_sessions`.`business_email` AS `business_email`,`strategy_sessions`.`company_name` AS `company_name`,`strategy_sessions`.`revenue_range` AS `revenue_range`,`strategy_sessions`.`growth_obstacle` AS `growth_obstacle`,`strategy_sessions`.`payment_status` AS `payment_status`,`strategy_sessions`.`booking_stage` AS `booking_stage`,`strategy_sessions`.`created_at` AS `created_at` from `strategy_sessions` where cast(`strategy_sessions`.`created_at` as date) = curdate() order by `strategy_sessions`.`created_at` desc */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-02-20 22:56:58
