# ZERA - Digital Growth Systems Platform

ZERA Digital Growth Systems - Commercial web design, SEO, and revenue automation platform built with Next.js 15, TypeScript, and Tailwind CSS.

## ✅ What's Been Set Up

### Core Technologies
- **Next.js 15.5.4** with App Router
- **React 19** with Server Components
- **TypeScript 5.9.3** (strict mode)
- **Tailwind CSS 4.1.14** with custom design system

### Design System
- **Brand Colors:**
  - Cream: `#F3E9DC` (primary background)
  - Copper: `#B87333` (accent/CTA)
- **Typography:**
  - Lato Regular (400) - Body text
  - Lato Bold (700) - Headlines (uppercase, luxury brand standard)
- **Spacing:** 8px grid system

### Essential Dependencies
- **Forms:** React Hook Form + Zod validation
- **Security:** DOMPurify (sanitization) + Upstash rate limiting
- **Email:** Resend
- **Analytics:** Google Analytics 4 (@next/third-parties)
- **UI Utilities:** Framer Motion, Lucide React, CVA, clsx

### Project Structure
```
src/
├── app/                    # App Router
│   ├── (marketing)/       # Marketing pages route group
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Header, Footer, Nav
│   ├── sections/          # Page sections
│   └── forms/             # Form components
├── lib/
│   └── utils.ts           # Utility functions
├── hooks/                 # Custom React hooks
└── types/                 # TypeScript types
```

### Configuration Files
- `tsconfig.json` - TypeScript config (strict mode)
- `.eslintrc.json` - ESLint for code quality
- `tailwind.config.ts` - Design system
- `next.config.ts` - Security headers, VPS deployment config
- `.env.local` - Environment variables

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
Open http://localhost:3000 (or 3001 if 3000 is in use)

### Build for Production
```bash
npm run build
npm start
```

### Type Check
```bash
npm run type-check
```

### Lint Code
```bash
npm run lint
```

## 📦 Package Count

**Total:** 29 packages (down from 47)
- **Production:** 17 packages
- **Development:** 12 packages

**Removed:**
- ❌ Sanity CMS (not needed - you're solo dev)
- ❌ Prettier (formatting - not functional)
- ❌ Husky/lint-staged (git hooks - not functional)

## 📝 Content Management

**No CMS** - You edit content directly in code:
- Static pages: React components
- Blog/case studies (when needed): Add MDX or hardcode data

## 🔐 Security Features

ZERA implements comprehensive security measures to protect against common web vulnerabilities:

### Input Sanitization
All user inputs are sanitized with DOMPurify before processing or storage:
- **XSS Protection**: Strips malicious scripts from form submissions
- **HTML Cleaning**: Removes dangerous HTML tags while preserving content
- **URL Validation**: Ensures URLs use safe protocols (http/https only)
- **Email Validation**: Regex-based email format verification

**Implementation**: `src/lib/sanitize.ts`

### CSRF Protection
Token-based CSRF protection on all form submissions:
- **Token Generation**: Cryptographically secure random tokens (32 bytes)
- **HTTP-Only Cookies**: Tokens stored in secure, HTTP-only cookies
- **Timing-Safe Comparison**: Prevents timing attacks on token verification
- **Per-Session Tokens**: New token generated for each session

**Endpoints**:
- `GET /api/csrf-token` - Obtain CSRF token before form submission
- All POST requests require `x-csrf-token` header

**Implementation**: `src/lib/csrf.ts`, `src/app/api/csrf-token/route.ts`

### Rate Limiting
Database-backed rate limiting prevents API abuse:
- **5 requests per hour** per IP address on form submissions
- **MariaDB storage** for persistent tracking across server restarts
- **Automatic cleanup** of expired rate limit records
- **429 responses** with `Retry-After` header when limit exceeded

**Implementation**: `src/lib/rate-limit.ts`

### Server-Side Validation
Zod schema validation on all API inputs:
- **Type safety**: Ensures data matches expected types
- **Length limits**: Prevents oversized inputs
- **Format validation**: Email, URL, enum validation
- **Required fields**: Enforces mandatory data
- **Detailed errors**: Returns validation issues for client handling

**Example Schema**:
```typescript
const quoteRequestSchema = z.object({
  type: z.enum(['audit_request', 'social_media_request', ...]),
  fullName: z.string().min(2).max(100),
  email: z.string().email(),
  // ... additional fields
});
```

### Environment Security
- **Credentials**: Sensitive data stored in `.env.local` (gitignored)
- **CSRF Secret**: Unique secret for token signing
- **Database passwords**: Never committed to version control
- **API keys**: Rotated regularly, never exposed client-side

## 🔌 API Endpoints

### POST /api/submit-quote
Submit a custom quote request (audit, service inquiry, etc.)

**Rate Limit**: 5 requests per hour per IP

**Required Headers**:
```
Content-Type: application/json
x-csrf-token: <token>
```

**Request Body**:
```typescript
{
  type: 'audit_request' | 'social_media_request' | ...,
  service: string,
  plan: string,
  fullName: string,
  email: string,
  phone?: string,
  companyName?: string,
  websiteUrl?: string,
  // ... additional fields based on type
}
```

**Responses**:
- `200` - Success
- `400` - Invalid form data (returns Zod validation errors)
- `403` - Invalid CSRF token
- `429` - Rate limit exceeded (includes `Retry-After` header)
- `500` - Server error

**Security**: Input sanitization, CSRF protection, rate limiting, Zod validation

### GET /api/csrf-token
Obtain CSRF token for form submission

**Response**:
```json
{
  "token": "abc123..."
}
```

**Behavior**: Sets `csrf-token` HTTP-only cookie automatically

**Usage**:
```typescript
const response = await fetch('/api/csrf-token');
const { token } = await response.json();

// Use token in subsequent POST requests
fetch('/api/submit-quote', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-csrf-token': token
  },
  body: JSON.stringify(data)
});
```

## 🔐 Environment Variables

Required for production:
```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
RESEND_API_KEY=your_key_here
UPSTASH_REDIS_REST_URL=your_url_here
UPSTASH_REDIS_REST_TOKEN=your_token_here
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Security
CSRF_SECRET=generate-a-random-32-byte-hex-string-for-production

# Database (MariaDB)
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_db_user
DB_PASSWORD=your_secure_password
DB_NAME=zera_db

# Email (SMTP)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASSWORD=your_smtp_password
SMTP_FROM_NAME=ZERA
SMTP_FROM_EMAIL=noreply@example.com
EMAIL_TO=hello@example.com
```

## 📚 Documentation

- `DEVELOPER_BRIEF.md` - Complete project blueprint
- `TECHNICAL_ARCHITECTURE.md` - Detailed technical specs
- `SEO_STRATEGY.md` - Complete SEO roadmap
- `QUICK_REFERENCE.md` - Quick reference guide

## 🎯 Next Steps

1. **Build Pages**
   - Homepage with hero section
   - About page
   - Service pages (5 services)
   - Contact page with form
   - Portfolio/case studies
   - Blog (optional)

2. **Implement Contact Form**
   - API route with validation
   - Rate limiting
   - Email delivery with Resend

3. **Deploy to VPS**
   - Create Dockerfile
   - Set up Nginx
   - Configure CI/CD

## 🛠️ Tech Stack Summary

| Category | Technology |
|----------|------------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| UI Components | Radix UI + CVA |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Email | Resend |
| Rate Limiting | Upstash Redis |
| Analytics | Google Analytics 4 |
| Hosting | VPS (self-hosted) |

---

**Ready to build!** Start with `npm run dev` and begin creating your pages.
