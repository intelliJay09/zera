# Database Migrations

This directory contains SQL migration files for the Discovery Form system.

## Migration Files

- `001_create_checkout_submissions.sql` - Checkout and payment data
- `002_create_discovery_submissions.sql` - Discovery form submissions
- `003_create_uploaded_files.sql` - File upload tracking

## Running Migrations

### Option 1: Manual Execution (Recommended for initial setup)

Run each migration file in order using your MariaDB client:

```bash
mysql -u your_username -p your_database_name < database/migrations/001_create_checkout_submissions.sql
mysql -u your_username -p your_database_name < database/migrations/002_create_discovery_submissions.sql
mysql -u your_username -p your_database_name < database/migrations/003_create_uploaded_files.sql
```

### Option 2: Using Node.js Script

```bash
npm run db:migrate
```

This will run all pending migrations in order.

### Option 3: All at Once

```bash
cat database/migrations/*.sql | mysql -u your_username -p your_database_name
```

## Verifying Migrations

After running migrations, verify tables were created:

```sql
SHOW TABLES;
DESCRIBE checkout_submissions;
DESCRIBE discovery_submissions;
DESCRIBE uploaded_files;
```

## Database Schema

### checkout_submissions
Stores initial checkout and payment information when clients sign up for WaaS plans.

**Key Fields:**
- `id` - UUID primary key
- `plan_id`, `plan_name`, `plan_price` - Selected WaaS plan
- `full_name`, `business_name`, `email`, `phone` - Contact info
- `payment_status`, `payment_reference` - Payment tracking
- `agreed_to_terms`, `agreed_to_sla` - Legal agreements

### discovery_submissions
Stores website discovery form data submitted by clients after payment.

**Key Sections:**
1. **Brand Identity** - business name, logo, social links, brand style
2. **Domain** - desired domain and alternatives
3. **Content** - homepage, about, services, gallery, contact info
4. **Confirmation** - content sign-off

**Special Fields:**
- `resume_token` - For save & resume functionality
- `completion_status` - incomplete, partial, completed
- `current_section` - Last completed section (for resume)
- `services_list`, `social_links`, `gallery_images` - JSON arrays

### uploaded_files
Tracks all files uploaded during the discovery form process.

**Key Fields:**
- `submission_id` - Links to discovery_submissions
- `file_name`, `file_size`, `file_type` - File metadata
- `storage_path`, `public_url` - Storage locations
- `field_name`, `field_index` - Form field association

## Foreign Key Relationships

```
checkout_submissions (id)
    ↓
discovery_submissions (checkout_id)
    ↓
uploaded_files (submission_id)
```

## Indexes

All tables include optimized indexes for:
- Primary keys (id)
- Foreign keys (checkout_id, submission_id)
- Common query fields (email, resume_token, payment_status)
- Timestamp fields (created_at)

## Notes

- All tables use `utf8mb4_unicode_ci` collation for full Unicode support
- UUIDs are used for primary keys (CHAR(36))
- JSON fields store complex data structures (arrays, objects)
- Timestamps use MariaDB's `CURRENT_TIMESTAMP` and `ON UPDATE CURRENT_TIMESTAMP`
- Soft deletes available on uploaded_files (deleted_at)
