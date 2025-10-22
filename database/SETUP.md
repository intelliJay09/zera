# Database Setup Guide

## Phase 1: Foundation & Architecture - COMPLETE ✅

This guide will help you set up the MariaDB database for the Discovery Form system.

---

## Prerequisites

- MariaDB 10.5+ installed and running
- Database user with CREATE, INSERT, UPDATE, DELETE privileges
- Node.js 18+ installed

---

## Step 1: Create Database

Create a new database for the project:

```sql
CREATE DATABASE astraflow_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Create a database user (or use existing):

```sql
CREATE USER 'astraflow_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON astraflow_db.* TO 'astraflow_user'@'localhost';
FLUSH PRIVILEGES;
```

---

## Step 2: Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your database credentials:

```bash
# Database (MariaDB)
DB_HOST=localhost
DB_USER=astraflow_user
DB_PASSWORD=your_secure_password
DB_NAME=astraflow_db
```

---

## Step 3: Run Migrations

### Option A: Using npm script (Recommended)

```bash
npm run db:migrate
```

This will:
- Connect to your MariaDB database
- Run all migration files in order
- Create the 3 tables: `checkout_submissions`, `discovery_submissions`, `uploaded_files`
- Display verification of created tables

### Option B: Manual SQL Execution

Run each migration file manually:

```bash
mysql -u astraflow_user -p astraflow_db < database/migrations/001_create_checkout_submissions.sql
mysql -u astraflow_user -p astraflow_db < database/migrations/002_create_discovery_submissions.sql
mysql -u astraflow_user -p astraflow_db < database/migrations/003_create_uploaded_files.sql
```

### Option C: All at Once

```bash
cat database/migrations/*.sql | mysql -u astraflow_user -p astraflow_db
```

---

## Step 4: Verify Installation

### Test Database Connection

```bash
npm run db:test
```

Expected output:
```
Connection: OK
```

### Verify Tables

Connect to your database:

```bash
mysql -u astraflow_user -p astraflow_db
```

Check tables:

```sql
SHOW TABLES;
```

Expected output:
```
+----------------------------+
| Tables_in_astraflow_db     |
+----------------------------+
| checkout_submissions       |
| discovery_submissions      |
| uploaded_files             |
+----------------------------+
```

### Check Table Structure

```sql
DESCRIBE checkout_submissions;
DESCRIBE discovery_submissions;
DESCRIBE uploaded_files;
```

---

## Database Schema Overview

### checkout_submissions
**Purpose:** Stores checkout and payment data when clients sign up for WaaS plans

**Key Fields:**
- Contact info (name, email, phone, business name)
- Plan details (plan_id, plan_name, plan_price)
- Payment tracking (payment_status, payment_reference, payment_amount)
- Legal agreements (agreed_to_terms, agreed_to_sla)

### discovery_submissions
**Purpose:** Stores website discovery form data submitted by clients

**Sections:**
1. Brand Identity (logo, social links, brand style)
2. Domain (desired domain + 2 alternatives)
3. Content (homepage, about, services, gallery, contact)
4. Confirmation (content sign-off)

**Special Features:**
- Resume token for save & resume functionality
- JSON fields for complex data (services_list, gallery_images)
- Links to checkout via checkout_id foreign key

### uploaded_files
**Purpose:** Tracks all files uploaded during the discovery process

**Key Fields:**
- File metadata (name, size, type)
- Storage info (storage_path, public_url)
- Form association (field_name, field_index)
- Processing status

---

## Troubleshooting

### Connection Failed

**Error:** `ER_ACCESS_DENIED_ERROR: Access denied for user`

**Solution:**
- Verify database credentials in `.env.local`
- Check user has correct permissions: `SHOW GRANTS FOR 'astraflow_user'@'localhost';`

### Migration Already Ran

**Error:** `Table already exists`

**Solution:**
- Migrations use `CREATE TABLE IF NOT EXISTS`, so this is safe to ignore
- To start fresh, drop and recreate database

### Foreign Key Errors

**Error:** `Cannot add or update a child row: a foreign key constraint fails`

**Solution:**
- Ensure migrations run in correct order (001, 002, 003)
- Check that referenced tables exist before creating dependent tables

---

## Next Steps

Phase 1 is now complete! ✅

**What's Next:**
- Phase 2: Payment Integration (Paystack)
- Phase 3: File Upload System (Uploadthing)
- Phase 4: Discovery Form Multi-Step Wizard

See `plan.md` for the complete implementation roadmap.

---

## Files Created in Phase 1

```
database/
├── migrations/
│   ├── 001_create_checkout_submissions.sql
│   ├── 002_create_discovery_submissions.sql
│   ├── 003_create_uploaded_files.sql
│   └── README.md
├── run-migrations.js
└── SETUP.md (this file)

src/
└── lib/
    └── db.ts (MariaDB connection library)
```

## Dependencies Installed

- `mysql2` - MySQL/MariaDB client for Node.js
- `uploadthing` - File upload service
- `@uploadthing/react` - React components for Uploadthing
- `crypto-js` - Cryptography for secure tokens
- `react-dropzone` - Drag & drop file uploads
- `@tanstack/react-query` - Data fetching & caching

---

**Last Updated:** January 2025
**Status:** Phase 1 Complete ✅
