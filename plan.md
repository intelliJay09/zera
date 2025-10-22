# Discovery Form System - Complete Implementation Plan

**Project:** The Astra Flow Website Discovery Form
**Timeline:** 24 Days
**Last Updated:** January 2025

---

## Project Overview

Building a comprehensive two-part client onboarding system for The Astra Flow's WaaS (Website as a Service) offering with payment integration, multi-step forms, file uploads, and automation workflows.

### Key Components
1. **Part 1:** Checkout & Payment Form
2. **Part 2:** Multi-Step Website Discovery Form
3. File Upload System
4. Save & Resume Functionality
5. Email Automation
6. Webhook Integration (Project Management Tools)

---

## Phase 1: Foundation & Architecture (Days 1-2)

### Status: ✅ Complete

### 1.1 Database Setup

**Choice:** Supabase (recommended) or Vercel Postgres

**Why Supabase:**
- Free tier supports all requirements
- Built-in auth, file storage, real-time subscriptions
- PostgreSQL with Row Level Security
- Excellent Next.js integration
- Generous free tier

**Tables to Create:**

```sql
-- Checkout submissions
CREATE TABLE checkout_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  plan_price JSONB NOT NULL, -- {USD: 570, GHS: 2000}
  full_name TEXT NOT NULL,
  business_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  payment_reference TEXT,
  payment_amount DECIMAL,
  payment_currency TEXT,
  agreed_to_terms BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Discovery form submissions
CREATE TABLE discovery_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  checkout_id UUID REFERENCES checkout_submissions(id),
  email TEXT NOT NULL,
  resume_token TEXT UNIQUE,
  completion_status TEXT DEFAULT 'incomplete', -- incomplete, partial, completed

  -- Section 1: Brand Identity
  business_name TEXT,
  business_tagline TEXT,
  logo_url TEXT,
  social_links JSONB, -- [{platform: 'Facebook', url: '...'}]
  brand_style TEXT,
  inspiration_sites JSONB, -- ['url1', 'url2']
  main_goal TEXT,

  -- Section 2: Domain
  desired_domain TEXT,
  alt_domain_1 TEXT,
  alt_domain_2 TEXT,

  -- Section 3: Content
  homepage_headline TEXT,
  homepage_intro TEXT,
  homepage_banner_url TEXT,
  about_headline TEXT,
  about_description TEXT,
  team_photos JSONB, -- ['url1', 'url2']
  services_headline TEXT,
  services_list JSONB, -- [{name, description, image_url}]
  gallery_headline TEXT,
  gallery_images JSONB, -- ['url1', 'url2']
  contact_phone TEXT,
  contact_email TEXT,
  contact_address TEXT,
  contact_form_recipient TEXT,

  -- Section 4: Final
  content_signoff BOOLEAN DEFAULT false,

  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- File uploads tracking
CREATE TABLE uploaded_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES discovery_submissions(id),
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_type TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  public_url TEXT NOT NULL,
  field_name TEXT NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_checkout_email ON checkout_submissions(email);
CREATE INDEX idx_discovery_resume_token ON discovery_submissions(resume_token);
CREATE INDEX idx_discovery_checkout_id ON discovery_submissions(checkout_id);
```

### 1.2 Environment Variables

Add to `.env.local`:

```bash
# Database (Supabase)
DATABASE_URL=your_supabase_postgres_url
DIRECT_URL=your_direct_database_url

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
SUPABASE_SERVICE_KEY=eyJxxx

# File Storage (Uploadthing)
UPLOADTHING_SECRET=sk_live_xxx
UPLOADTHING_APP_ID=your_app_id

# Payment Gateway (Paystack)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxx
PAYSTACK_SECRET_KEY=sk_test_xxx
PAYSTACK_WEBHOOK_SECRET=whsec_xxx

# Webhooks (Project Management)
TRELLO_WEBHOOK_URL=optional_trello_webhook
ASANA_WEBHOOK_URL=optional_asana_webhook

# Email (Already configured)
RESEND_API_KEY=re_xxx

# Rate Limiting (Already configured)
UPSTASH_REDIS_REST_URL=xxx
UPSTASH_REDIS_REST_TOKEN=xxx

# Site Config (Already exists)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 1.3 Dependencies to Install

```bash
npm install @supabase/supabase-js
npm install uploadthing @uploadthing/react
npm install react-paystack
npm install crypto-js
npm install react-dropzone
npm install @tanstack/react-query
```

### Deliverables
- [ ] Supabase project created
- [ ] Database schema deployed
- [ ] Environment variables configured
- [ ] Dependencies installed
- [ ] Database connection tested

---

## Phase 2: Payment Integration (Days 3-4)

### Status: ✅ Complete

### 2.1 Paystack Integration

**Why Paystack:**
- Ghana-focused (₵ cedis support)
- Mobile Money integration
- Recurring billing support
- Excellent webhook system
- Better than Flutterwave for West Africa

**Files to Create:**

1. **`/src/lib/paystack.ts`** - Paystack SDK wrapper
```typescript
import { Paystack } from 'paystack-node';

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!);

export const initializeTransaction = async (data) => { ... }
export const verifyTransaction = async (reference) => { ... }
```

2. **`/src/app/api/checkout/initialize/route.ts`** - Initialize payment
3. **`/src/app/api/checkout/verify/route.ts`** - Verify payment
4. **`/src/app/api/webhooks/paystack/route.ts`** - Payment webhooks

### 2.2 Checkout Page

**Route:** `/app/checkout/page.tsx`

**Features:**
- Pre-fill plan from URL params (`?plan=business-commerce`)
- Display selected plan details from `waas-pricing.ts`
- React Hook Form + Zod validation
- Paystack popup integration (react-paystack)
- Terms & SLA checkboxes (mandatory)
- Loading states during payment
- Error handling for failed payments

**Form Fields:**
- Plan confirmation (pre-selected, locked)
- Full Name (required)
- Business Name (required)
- Email (required, validation)
- Phone Number (required, format validation)
- Terms of Service checkbox (required)
- SLA Agreement checkbox (required)

**Payment Flow:**
1. User fills contact info
2. Validates form locally
3. Clicks "Pay Now" → POST to `/api/checkout/initialize`
4. Receive payment reference
5. Paystack popup opens with payment options
6. User completes payment (card or Mobile Money)
7. Webhook fires → Update database
8. Redirect to success page
9. Send discovery form email automatically

### Deliverables
- [ ] Paystack account created (test mode)
- [ ] Payment initialization API working
- [ ] Checkout page designed & functional
- [ ] Webhook endpoint secured & tested
- [ ] Email sent on successful payment
- [ ] Database records created correctly

---

## Phase 3: File Upload System (Days 5-6)

### Status: ✅ Complete

### 3.1 File Storage Setup

**Choice:** Uploadthing (recommended for Next.js)

**Why Uploadthing:**
- Easiest integration with Next.js
- Free tier: 2GB storage, 1GB bandwidth/month
- Automatic image optimization
- Secure signed URLs
- Simple API, great DX

**Uploadthing Configuration:**

**`/src/app/api/uploadthing/core.ts`** - File upload handlers
```typescript
import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  logo: f({ image: { maxFileSize: "5MB", maxFileCount: 1 } })
    .middleware(async () => ({ /* auth */ }))
    .onUploadComplete(async ({ metadata, file }) => { /* save to db */ }),

  homepageBanner: f({ image: { maxFileSize: "10MB", maxFileCount: 1 } }),
  teamPhotos: f({ image: { maxFileSize: "5MB", maxFileCount: 10 } }),
  serviceImages: f({ image: { maxFileSize: "5MB", maxFileCount: 1 } }),
  galleryImages: f({ image: { maxFileSize: "5MB", maxFileCount: 20 } }),
};
```

**File Upload Zones:**
1. **Logo:** 5MB max, `.png/.svg/.jpg` (1 file)
2. **Homepage Banner:** 10MB max, `.jpg/.png/.webp` (1 file)
3. **Team Photos:** 5MB each, up to 10 files
4. **Service Images:** 5MB each, 1 per service
5. **Gallery Images:** 5MB each, up to 20 files

### 3.2 Upload Component

**Create:** `/src/components/forms/FileUpload.tsx`

**Features:**
- Drag & drop support (react-dropzone)
- Upload progress indicators
- Image previews before upload
- File validation (type, size)
- Multiple file support
- Delete uploaded files
- Premium animations (Framer Motion)
- Accessible (keyboard navigation)

**Props:**
```typescript
interface FileUploadProps {
  name: string;
  maxFiles?: number;
  maxSize?: number; // in MB
  accept?: string[];
  onUpload: (urls: string[]) => void;
  label: string;
  description?: string;
}
```

### Deliverables
- [x] Uploadthing configured
- [x] File upload API routes working
- [x] FileUpload component created
- [x] Image previews working
- [x] Progress indicators functional
- [x] File validation working
- [x] Premium animations applied

---

## Phase 4: Discovery Form - Multi-Step Wizard (Days 7-10)

### Status: ✅ Complete

### 4.1 Form State Management

**Route:** `/app/discovery-form/page.tsx`

**Architecture:**
- Multi-step wizard with 4 main sections
- React Hook Form with Zod validation per section
- State persistence to database on each "Next" click
- Resume functionality via secure token
- Progress indicator (Step X of 4)
- Breadcrumb navigation

**State Machine:**
```
incomplete → section_1 → section_2 → section_3 → section_4 → completed
```

### 4.2 Form Sections

#### Section 1: Brand Identity
**Component:** `/src/components/discovery/Section1BrandIdentity.tsx`

**Fields:**
- Official Business Name (text, required)
- Business Tagline (text, optional)
- High-Resolution Logo (file upload, required)
- Social Media Links (repeater field)
  - Platform dropdown
  - URL input
  - Add/Remove buttons
- Brand Style (textarea, required, 3-5 words)
- Inspiration Websites (2 URL inputs, required, validated)
- Main Website Goal (dropdown, required)

**Validation Schema:**
```typescript
const section1Schema = z.object({
  business_name: z.string().min(2),
  business_tagline: z.string().optional(),
  logo_url: z.string().url(),
  social_links: z.array(z.object({
    platform: z.enum(['Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'TikTok']),
    url: z.string().url()
  })),
  brand_style: z.string().min(10).max(100),
  inspiration_sites: z.array(z.string().url()).length(2),
  main_goal: z.enum(['call', 'contact_form', 'portfolio', 'information', 'sell_products'])
});
```

#### Section 2: Domain Name
**Component:** `/src/components/discovery/Section2Domain.tsx`

**Fields:**
- Desired Domain Name (text, required)
- Alternative Domain #1 (text, required)
- Alternative Domain #2 (text, required)

**Optional Enhancement:**
- Domain availability checker (via API)
- Suggestions if domain unavailable

#### Section 3: Website Content
**Component:** `/src/components/discovery/Section3Content.tsx`

**Structure:** Tabbed sub-sections

**Sub-section 3.1: Homepage**
- Main Headline (text, required)
- Introductory Paragraph (textarea, required)
- Homepage Banner Image (file upload, required)

**Sub-section 3.2: About Us**
- Page Headline (text, required)
- Company History/Description (textarea, required)
- Team Photos (multiple file upload, optional, up to 10)

**Sub-section 3.3: Services/Products**
- Page Headline (text, required)
- **Services List (repeater field, CRITICAL)**
  - Service Name (text)
  - Service Description (textarea)
  - Service Image (file upload)
  - Add/Remove service buttons

**Sub-section 3.4: Gallery**
- Page Headline (text, required)
- Gallery Images (multiple file upload, required, up to 20)

**Sub-section 3.5: Contact**
- Business Phone Number (phone input, required)
- Business Email Address (email, required, validated)
- Physical Address (textarea, required)
- Contact Form Recipient Email (email, required, validated)

#### Section 4: Final Confirmation
**Component:** `/src/components/discovery/Section4Confirmation.tsx`

**Features:**
- Summary of all submitted data
- Preview uploaded images
- Edit buttons to jump back to sections
- Content Sign-off checkbox (required)
- Final submit button
- Terms acknowledgment

### 4.3 Repeater Field Component

**Create:** `/src/components/forms/RepeaterField.tsx`

**Features:**
- Dynamic add/remove fields
- Drag-to-reorder (optional)
- Field groups with multiple inputs
- Validation for each item
- Animations for add/remove

**Usage Example:**
```tsx
<RepeaterField
  name="social_links"
  fields={[
    { name: 'platform', type: 'select', options: platforms },
    { name: 'url', type: 'text', placeholder: 'https://' }
  ]}
  addButtonText="Add Another Profile"
  max={10}
/>

<RepeaterField
  name="services"
  fields={[
    { name: 'name', type: 'text', placeholder: 'Service name' },
    { name: 'description', type: 'textarea', placeholder: 'Describe the service' },
    { name: 'image', type: 'file', accept: ['image/*'] }
  ]}
  addButtonText="Add Another Service"
  min={1}
/>
```

### Deliverables
- [ ] Multi-step wizard structure working
- [ ] Section 1 component complete
- [ ] Section 2 component complete
- [ ] Section 3 component complete (all sub-sections)
- [ ] Section 4 component complete
- [ ] RepeaterField component working
- [ ] Navigation (Back/Next) working
- [ ] Progress indicator showing correctly
- [ ] Form validation per section
- [ ] Premium animations applied

---

## Phase 5: Save & Resume Feature (Days 11-12)

### Status: 🔴 Not Started

### 5.1 Auto-Save Logic

**Implementation:**
- Debounced auto-save every 30 seconds
- Manual save on "Next" button click
- Save to database via API
- Generate secure resume token on first save
- Update `completion_status` field

**API Route:** `/src/app/api/discovery/save/route.ts`

```typescript
export async function POST(req: Request) {
  const data = await req.json();

  // Validate token or email
  // Update discovery_submissions table
  // Return updated status
}
```

### 5.2 Resume Token Generation

**Security:**
- Use `crypto.randomBytes(32).toString('hex')`
- Store hashed version in database
- Expires after 30 days
- Single-use or renewable

**API Route:** `/src/app/api/discovery/resume/route.ts`

### 5.3 Resume Email System

**Trigger Points:**
1. User saves progress but doesn't submit
2. Send reminder after 24 hours
3. Send follow-up after 3 days
4. Final reminder after 6 days

**Email Template:** `DiscoveryFormReminder.tsx`

```
Subject: Complete Your Website Discovery Form

Hi [Name],

We noticed you started your website discovery form but haven't finished yet.

Continue where you left off:
[Secure Link with Token]

This link expires in 30 days.

Need help? Reply to this email.

Best,
The Astra Flow Team
```

### 5.4 Resume Flow

**Route:** `/app/discovery-form/resume/[token]/page.tsx`

**Flow:**
1. Extract token from URL
2. Verify token validity (not expired, not used)
3. Load saved submission from database
4. Redirect to form with pre-filled data
5. Show "Resuming your submission..." toast
6. Jump to last incomplete section

### Deliverables
- [ ] Auto-save implemented (debounced)
- [ ] Manual save on Next click
- [ ] Resume token generation working
- [ ] Resume page created
- [ ] Email reminders scheduled
- [ ] Token expiration logic
- [ ] Pre-fill form with saved data

---

## Phase 6: API Routes & Automation (Days 13-14)

### Status: 🔴 Not Started

### 6.1 Form Submission API

**Route:** `/src/app/api/discovery/submit/route.ts`

**Actions on Submit:**
1. Validate all form data
2. Update `completion_status` to 'completed'
3. Set `submitted_at` timestamp
4. Send client confirmation email
5. Send admin notification email
6. Trigger webhook to project management tool
7. Return success response

**Response:**
```json
{
  "success": true,
  "submission_id": "uuid",
  "redirect_url": "/discovery-form/success"
}
```

### 6.2 Email Templates

**Create in `/src/emails/`:**

**1. CheckoutConfirmation.tsx**
- Subject: "Payment Received - Let's Build Your Website!"
- Content: Payment confirmed, discovery form link, next steps

**2. DiscoveryFormLink.tsx**
- Subject: "Next Step: Share Your Website Vision"
- Content: Personalized greeting, form link, timeline

**3. DiscoveryFormReminder.tsx**
- Subject: "Complete Your Website Discovery Form"
- Content: Resume link, expiration notice, support

**4. DiscoveryFormComplete.tsx**
- Subject: "We Received Your Website Details!"
- Content: Confirmation, timeline, what happens next

**5. AdminDiscoveryNotification.tsx**
- Subject: "[New WaaS Project] Business Name - Plan Name"
- Content: All submitted data, file links, client contact

### 6.3 Webhook Integration

**Route:** `/src/app/api/webhooks/send-to-pm/route.ts`

**Trello Integration:**
```typescript
const createTrelloCard = async (submission) => {
  const response = await fetch('https://api.trello.com/1/cards', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: `New WaaS: ${submission.business_name}`,
      desc: formatSubmissionForTrello(submission),
      idList: process.env.TRELLO_LIST_ID,
      labels: [submission.plan_id],
      attachments: submission.all_file_urls
    })
  });
};
```

**Asana Integration (Alternative):**
Similar structure for Asana API

### Deliverables
- [ ] Submit API endpoint working
- [ ] All email templates created
- [ ] Email sending tested (dev & production)
- [ ] Webhook to Trello/Asana working
- [ ] Error handling for webhook failures
- [ ] Admin dashboard shows submissions

---

## Phase 7: UI Components & Pages (Days 15-17)

### Status: 🔴 Not Started

### 7.1 Checkout Page Design

**Route:** `/app/checkout/page.tsx`

**Layout:**
- Single-column layout (max-w-2xl)
- Elegant card design with glassmorphism
- Plan summary sidebar/card
- Contact form section
- Payment button (Paystack)
- Terms & SLA checkboxes with links

**Plan Summary Card:**
```
Selected Plan: Business Commerce
Monthly Fee: ₵2,000 / $570

Included:
✓ Up to 10 pages
✓ E-commerce setup
✓ 25 products
✓ Weekly backups
✓ Standard support

[View Full Details]
```

**Form Layout:**
- Full Name + Business Name (grid-cols-2)
- Email + Phone (grid-cols-2)
- Terms checkboxes (stacked)
- Pay Now button (gradient, prominent)

### 7.2 Discovery Form Page Design

**Route:** `/app/discovery-form/page.tsx`

**Header Section:**
```
Welcome aboard, [Client Name]! 🎉
We're excited to start building your new website.

[Progress: Step 1 of 4] ━━━━━━━━━━━━━━ 25%
```

**Main Layout:**
- Premium card design with glassmorphism
- Section title with icon
- Helpful tips sidebar (optional)
- Form fields with labels + descriptions
- Field-level validation with animations
- Back/Next navigation buttons
- Save Draft button (top-right)

**Navigation:**
- Back button (goes to previous section)
- Next button (validates & saves current section)
- Save Draft (saves without validation)
- Breadcrumb (click to jump if previous sections complete)

**Premium Features:**
- Smooth transitions between sections (Framer Motion)
- Field animations on error/success
- Upload progress indicators
- Helpful tooltips
- Example text in placeholders

### 7.3 Success Pages

**Checkout Success:** `/app/checkout/success/page.tsx`

```
✓ Payment Confirmed!

Thank you for choosing The Astra Flow!

Your first month's subscription (₵2,000) has been received.

Next Steps:
1. Check your email ([email]) for important links
2. Complete your Website Discovery Form
3. We'll start building your website immediately

Estimated Timeline: 14 days

Questions? Contact us at hello@theastroflow.com
```

**Discovery Form Success:** `/app/discovery-form/success/page.tsx`

```
✓ Submission Complete!

We've received all your website details. Thank you!

What Happens Next:
1. Our team will review your submission (within 24 hours)
2. We'll confirm your domain name availability
3. Design mockups ready in 3-5 days
4. Your website launches in 14 days

We'll keep you updated via email.

Project Dashboard: [Link]
```

### Deliverables
- [ ] Checkout page designed & responsive
- [ ] Discovery form page designed
- [ ] Section transitions smooth
- [ ] Progress indicator working
- [ ] Success pages designed
- [ ] Mobile responsiveness perfect
- [ ] Premium animations applied
- [ ] Accessibility tested

---

## Phase 8: Admin Dashboard (Optional - Days 18-20)

### Status: 🔴 Not Started

### 8.1 Admin Routes

**Route:** `/app/admin/submissions/page.tsx`

**Features:**
- Authentication required (password or OAuth)
- List all submissions in table
- Filter by status (pending, partial, completed)
- Search by business name or email
- Sort by date
- Pagination (20 per page)

**Table Columns:**
- Business Name
- Email
- Plan
- Status (badge with color)
- Progress (%)
- Submitted Date
- Actions (View, Download, Mark Complete)

### 8.2 Submission Detail View

**Route:** `/app/admin/submissions/[id]/page.tsx`

**Sections:**
- Client info (name, email, phone, plan)
- All form data organized by section
- Uploaded files (preview + download)
- Timeline (created, last updated, submitted)
- Status management (dropdown to change)
- Notes section (internal comments)
- Export to PDF button

### 8.3 Authentication

**Options:**
1. **Simple Password Protection** (easiest)
   - Single password in env variable
   - Session-based auth

2. **NextAuth with Google OAuth** (recommended)
   - Allow team member access
   - Secure and scalable

### Deliverables
- [ ] Admin route protected
- [ ] Submissions list page working
- [ ] Filters & search functional
- [ ] Detail view showing all data
- [ ] File previews/downloads working
- [ ] Export to PDF functional
- [ ] Status management working

---

## Phase 9: Testing & Refinement (Days 21-22)

### Status: 🔴 Not Started

### 9.1 Testing Checklist

#### Checkout Flow
- [ ] Plan pre-selection works from WaaS plans page
- [ ] Form validation prevents invalid submissions
- [ ] Paystack popup opens correctly
- [ ] Payment success updates database
- [ ] Payment failure shows error message
- [ ] Webhook processes correctly
- [ ] Confirmation email sent
- [ ] Discovery form email sent
- [ ] Database records accurate

#### Discovery Form
- [ ] Multi-step navigation works smoothly
- [ ] Form validation per section correct
- [ ] File uploads successful for all types
- [ ] Repeater fields add/remove correctly
- [ ] Auto-save triggers after 30s
- [ ] Manual save on Next click works
- [ ] Resume via email link functional
- [ ] Pre-fill form with saved data works
- [ ] Final submission creates all records
- [ ] Admin notification sent correctly

#### Mobile Responsiveness
- [ ] Checkout form usable on mobile
- [ ] Discovery form usable on mobile
- [ ] File uploads work on mobile
- [ ] Payment flow smooth on mobile
- [ ] All buttons touch-friendly (44px min)
- [ ] Typography readable (16px min)

#### Error Scenarios
- [ ] Payment failure handled gracefully
- [ ] File upload failures show errors
- [ ] Network interruptions during save
- [ ] Invalid resume token shows message
- [ ] Expired token redirects properly
- [ ] Database errors logged
- [ ] Email failures logged (Resend)

### 9.2 Performance Testing

- [ ] Lighthouse score > 90
- [ ] Page load < 2s
- [ ] File upload progress accurate
- [ ] No layout shift (CLS < 0.1)
- [ ] Forms responsive (no lag)

### 9.3 Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Form labels properly associated
- [ ] Error messages announced
- [ ] Focus states visible
- [ ] ARIA attributes correct

### Deliverables
- [ ] All critical bugs fixed
- [ ] Edge cases handled
- [ ] Error messages user-friendly
- [ ] Performance optimized
- [ ] Accessibility compliant

---

## Phase 10: Documentation & Deployment (Days 23-24)

### Status: 🔴 Not Started

### 10.1 Technical Documentation

**Create:** `/docs/discovery-form-technical.md`

**Contents:**
- System architecture diagram
- Database schema documentation
- API endpoints reference
- Webhook configuration guide
- Email template customization
- Environment variables reference
- Troubleshooting guide
- Common errors and solutions

### 10.2 User Documentation

**Create:** `/docs/discovery-form-user-guide.md`

**Contents:**
- How to use the checkout form
- How to complete discovery form
- How to save and resume
- How to upload files
- FAQ section
- Contact support information

### 10.3 Deployment Checklist

#### Pre-Deployment
- [ ] All environment variables set in production
- [ ] Database migrations run on production DB
- [ ] File storage configured (Uploadthing prod mode)
- [ ] Payment gateway switched to live mode
- [ ] Paystack webhook URL updated to production
- [ ] Email templates tested in production
- [ ] Rate limiting configured
- [ ] CORS settings verified

#### Production Settings
- [ ] Paystack live keys configured
- [ ] Webhook secret updated
- [ ] Email from address verified
- [ ] File storage production bucket
- [ ] Database connection pooling enabled
- [ ] Error monitoring setup (Sentry)
- [ ] Analytics tracking verified
- [ ] SSL certificate active

#### Post-Deployment Testing
- [ ] End-to-end checkout flow tested
- [ ] Test payment successful
- [ ] Discovery form submission works
- [ ] Emails delivered successfully
- [ ] Webhooks firing correctly
- [ ] Admin dashboard accessible
- [ ] File uploads working
- [ ] Mobile experience verified

#### Monitoring Setup
- [ ] Error tracking (Sentry)
- [ ] Uptime monitoring
- [ ] Database performance monitoring
- [ ] File storage usage tracking
- [ ] Email delivery monitoring
- [ ] Payment success rate tracking

### 10.4 Maintenance Plan

**Weekly:**
- Check failed payments
- Monitor email delivery rates
- Review error logs

**Monthly:**
- Review incomplete submissions
- Send follow-up to abandoned forms
- Database backup verification
- File storage usage review

### Deliverables
- [ ] Technical docs complete
- [ ] User guide complete
- [ ] Deployment successful
- [ ] Monitoring active
- [ ] Maintenance plan documented

---

## Technical Architecture

### Technology Stack

**Frontend:**
- Next.js 15.5.4 (App Router)
- React 19
- TypeScript 5.9.3
- Tailwind CSS 4.1.14
- Framer Motion 12.23.22
- React Hook Form 7.63.0
- Zod 4.1.11

**Backend:**
- Next.js API Routes
- Supabase (PostgreSQL)
- Uploadthing (File Storage)
- Resend (Email)
- Upstash Redis (Rate Limiting)

**Integrations:**
- Paystack (Payments)
- Trello/Asana (Project Management)
- Google Analytics 4

### Why These Choices?

**Supabase over alternatives:**
- PostgreSQL (robust, relational)
- Built-in file storage
- Real-time capabilities
- Generous free tier
- Simple Next.js integration

**Uploadthing over alternatives:**
- Easiest Next.js integration
- Free tier: 2GB storage
- Automatic image optimization
- Secure signed URLs
- Great developer experience

**Paystack over Flutterwave:**
- Ghana-focused (₵ cedis)
- Mobile Money integration
- Better recurring billing
- Superior webhook system
- Preferred in West Africa

**React Hook Form + Zod:**
- Best performance
- Type-safe validation
- Excellent developer experience
- Easy integration with TypeScript

---

## File Structure

```
/src
├── app
│   ├── checkout
│   │   ├── page.tsx                      # Checkout form
│   │   ├── success/page.tsx              # Payment success
│   │   └── cancelled/page.tsx            # Payment cancelled
│   ├── discovery-form
│   │   ├── page.tsx                      # Main multi-step form
│   │   ├── resume/[token]/page.tsx       # Resume with token
│   │   └── success/page.tsx              # Submission success
│   ├── admin
│   │   ├── login/page.tsx                # Admin login
│   │   ├── submissions/page.tsx          # List submissions
│   │   └── submissions/[id]/page.tsx     # Submission details
│   └── api
│       ├── checkout
│       │   ├── initialize/route.ts       # Initialize Paystack
│       │   └── verify/route.ts           # Verify payment
│       ├── discovery
│       │   ├── save/route.ts             # Auto-save form
│       │   ├── submit/route.ts           # Final submission
│       │   └── load/route.ts             # Load saved data
│       ├── webhooks
│       │   ├── paystack/route.ts         # Payment webhooks
│       │   └── send-to-pm/route.ts       # Send to Trello/Asana
│       └── uploadthing
│           ├── core.ts                   # Upload handlers
│           └── route.ts                  # API route
├── components
│   ├── discovery
│   │   ├── ProgressIndicator.tsx         # Step progress bar
│   │   ├── Section1BrandIdentity.tsx     # Section 1
│   │   ├── Section2Domain.tsx            # Section 2
│   │   ├── Section3Content.tsx           # Section 3
│   │   └── Section4Confirmation.tsx      # Section 4
│   ├── forms
│   │   ├── FileUpload.tsx                # File upload component
│   │   ├── RepeaterField.tsx             # Dynamic fields
│   │   └── FormSection.tsx               # Wrapper component
│   ├── checkout
│   │   ├── PlanSummary.tsx               # Selected plan card
│   │   └── PaystackButton.tsx            # Payment button
│   └── admin
│       ├── SubmissionsTable.tsx          # Admin table
│       └── SubmissionDetail.tsx          # Detail view
├── lib
│   ├── supabase.ts                       # Supabase client
│   ├── paystack.ts                       # Paystack SDK
│   ├── uploadthing.ts                    # Uploadthing config
│   ├── email.ts                          # Resend wrapper
│   └── utils.ts                          # Utilities
├── emails
│   ├── CheckoutConfirmation.tsx          # Payment confirmed
│   ├── DiscoveryFormLink.tsx             # Form link email
│   ├── DiscoveryFormReminder.tsx         # Resume reminder
│   ├── DiscoveryFormComplete.tsx         # Submission confirmed
│   └── AdminDiscoveryNotification.tsx    # Internal notification
├── types
│   ├── checkout.ts                       # Checkout types
│   ├── discovery.ts                      # Discovery form types
│   └── database.ts                       # Database types
└── hooks
    ├── useAutoSave.ts                    # Auto-save hook
    └── useMultiStepForm.ts               # Form state management
```

---

## Development Timeline

**Total Duration:** 24 Days (approximately 5 weeks)

### Week 1: Foundation
- **Days 1-2:** Database setup, environment config
- **Days 3-4:** Payment integration (Paystack)
- **Day 5:** File upload system setup

### Week 2: Core Forms
- **Day 6:** File upload UI components
- **Days 7-8:** Discovery form structure + Section 1
- **Days 9-10:** Sections 2, 3, 4 complete

### Week 3: Advanced Features
- **Days 11-12:** Save & Resume functionality
- **Days 13-14:** API routes, webhooks, emails

### Week 4: Polish & Admin
- **Days 15-17:** UI/UX refinement, animations
- **Days 18-20:** Admin dashboard (optional)

### Week 5: Launch
- **Days 21-22:** Testing, bug fixes
- **Days 23-24:** Documentation, deployment

---

## Critical Success Factors

### 1. Repeater Fields (Highest Complexity)
- Most complex UI component
- Must handle add/remove smoothly
- Validation for each item
- File uploads within repeater items

### 2. File Upload UX
- Must be smooth, visual feedback
- Progress indicators essential
- Handle failures gracefully
- Preview before upload

### 3. Save & Resume
- Essential for long forms
- Secure token generation
- Email reliability critical
- Pre-fill must work perfectly

### 4. Payment Webhooks
- Handle all edge cases
- Idempotency (no duplicate processing)
- Retry failed webhooks
- Logging for debugging

### 5. Email Reliability
- All emails must send
- Resend monitoring setup
- Fallback for failures
- Template testing

### 6. Mobile UX
- Most users on mobile in Ghana
- Touch targets 44px minimum
- Typography 16px minimum
- File uploads must work

---

## Risk Mitigation

### Technical Risks

**Risk:** Payment webhook failures
- **Mitigation:** Manual verification API, admin dashboard to retry

**Risk:** File upload failures
- **Mitigation:** Chunked uploads, retry logic, clear error messages

**Risk:** Form data loss
- **Mitigation:** Auto-save every 30s, localStorage backup

**Risk:** Email delivery issues
- **Mitigation:** Resend monitoring, retry queue, admin notifications

### Business Risks

**Risk:** Incomplete submissions
- **Mitigation:** Automated reminder emails, easy resume process

**Risk:** Payment fraud
- **Mitigation:** Paystack fraud detection, manual review for high-value

**Risk:** Low completion rate
- **Mitigation:** Progress saving, clear instructions, support contact

---

## Metrics to Track

### Conversion Funnel
1. WaaS Plans page visits
2. Checkout page views
3. Payment initiated
4. Payment completed
5. Discovery form accessed
6. Discovery form completed

### Key Metrics
- Checkout conversion rate (target: >60%)
- Discovery form completion rate (target: >80%)
- Average time to complete form (track for UX improvements)
- File upload success rate (target: >95%)
- Email delivery rate (target: >99%)
- Payment success rate (target: >90%)

### Support Metrics
- Incomplete submission rate
- Resume link click rate
- Support requests related to form
- Most common errors

---

## Next Steps

1. **Choose database provider** (Supabase recommended)
2. **Create Supabase project** and run schema
3. **Set up Paystack account** (test mode first)
4. **Configure Uploadthing** for file storage
5. **Install dependencies** listed in Phase 1
6. **Begin Phase 1 implementation**

---

## Notes & Updates

### Session 1 (January 2025)
- Created comprehensive implementation plan
- Analyzed discovery-form.json requirements
- Designed database schema
- Outlined all phases and deliverables
- Ready to begin implementation

---

**Last Updated:** January 2025
**Status:** Planning Complete, Ready for Implementation
**Next Phase:** Phase 1 - Foundation & Architecture
