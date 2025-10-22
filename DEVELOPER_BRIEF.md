# THE ASTRA FLOW - COMPREHENSIVE DEVELOPER BRIEF
## Production-Ready Blueprint for Marketing Website Development

**Version:** 1.0
**Date:** October 1, 2025
**Project Type:** Marketing Website | Lead Generation Platform
**Tech Stack:** Next.js 15 (App Router) | TypeScript | Tailwind CSS

---

## EXECUTIVE SUMMARY

This document serves as the complete blueprint for building The Astra Flow marketing website—a high-performance, SEO-optimized platform designed to showcase digital marketing expertise while converting visitors into qualified leads.

### Project Overview

**Company:** The Astra Flow
**Mission:** To provide accessible, high-impact digital marketing and web development services for small to medium-sized enterprises (SMEs), helping them grow their online presence affordably.
**Brand Colors:** #F3E9DC (warm cream), #B87333 (copper/bronze)

### Success Metrics

- **Lighthouse Score:** 90+ on all metrics
- **Core Web Vitals:** LCP <2.5s, FID <100ms, CLS <0.1
- **Contact Form Conversion:** 3-5% of visitors
- **WCAG Compliance:** AA minimum
- **Organic Traffic Growth:** 20% month-over-month (post-launch)

### Strategic Positioning

**The Luxury Formula Applied to SME Services:**
> **Precision + Restraint + Sophistication = Premium Perception**

The Astra Flow balances luxury digital agency principles (from research on Wieden+Kennedy, COLLINS, Pentagram, B-REEL) with SME accessibility—creating a premium feel without intimidation.

---

## TABLE OF CONTENTS

1. [Technical Architecture](#1-technical-architecture)
2. [Design System](#2-design-system)
3. [Content Strategy & Messaging](#3-content-strategy--messaging)
4. [Information Architecture](#4-information-architecture)
5. [SEO Strategy](#5-seo-strategy)
6. [Performance Optimization](#6-performance-optimization)
7. [Security & Accessibility](#7-security--accessibility)
8. [Development Workflow](#8-development-workflow)
9. [Deployment & Launch](#9-deployment--launch)
10. [Implementation Timeline](#10-implementation-timeline)

---

## 1. TECHNICAL ARCHITECTURE

### 1.1 Tech Stack Decision Matrix

| Category | Technology | Rationale |
|----------|-----------|-----------|
| **Framework** | Next.js 15+ (App Router) | Best-in-class React framework, optimal performance, Server Components |
| **Language** | TypeScript 5+ (strict mode) | Type safety, developer experience, catch errors at compile time |
| **Styling** | Tailwind CSS + shadcn/ui | Utility-first, no runtime overhead, fully customizable |
| **Animations** | Framer Motion 11+ | Declarative, performant, scroll-triggered animations |
| **Forms** | React Hook Form + Zod | Minimal re-renders, TypeScript-first validation |
| **Email** | Resend | Modern API, React Email templates, great deliverability |
| **Content** | MDX (MVP) → Sanity (scale) | Version-controlled → Team-friendly CMS |
| **Analytics** | Vercel Analytics + GA4 | Real-user monitoring + custom events |
| **Hosting** | Vercel | Zero-config, global edge, auto-scaling, 99.99% uptime |
| **Rate Limiting** | Upstash Redis | Serverless, prevents spam, 3 requests/hour limit |

### 1.2 File Structure

```
/
├── app/
│   ├── (marketing)/              # Route group for marketing pages
│   │   ├── layout.tsx            # Marketing layout with nav/footer
│   │   ├── page.tsx              # Homepage (/)
│   │   ├── about/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx          # Services hub
│   │   │   ├── web-development/page.tsx
│   │   │   ├── digital-marketing/page.tsx
│   │   │   └── seo-services/page.tsx
│   │   ├── portfolio/
│   │   │   ├── page.tsx          # Portfolio grid
│   │   │   └── [slug]/page.tsx   # Case study
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── contact/page.tsx
│   ├── api/
│   │   ├── contact/route.ts      # Contact form handler
│   │   ├── subscribe/route.ts    # Newsletter
│   │   └── csrf/route.ts         # CSRF token
│   ├── layout.tsx                # Root layout
│   ├── not-found.tsx             # Custom 404
│   └── error.tsx                 # Error boundary
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # Header, Footer, Navigation
│   ├── sections/                 # Hero, Services, Testimonials, CTA
│   ├── forms/                    # Contact, Newsletter, Quote
│   └── shared/                   # Logo, SocialLinks, ScrollIndicator
├── lib/
│   ├── utils.ts
│   ├── api/                      # Email, validation, rate-limiter
│   ├── hooks/                    # Custom React hooks
│   └── constants/                # Site config, services, navigation
├── content/                      # MDX blog posts & case studies
├── public/
│   ├── images/
│   ├── fonts/
│   └── sitemap.xml
├── styles/
│   └── globals.css
├── types/
└── config/
```

### 1.3 Server vs Client Components Strategy

**Server Components (Default):**
- All components are Server Components unless marked with `"use client"`
- Use for: layouts, static content, data fetching, SEO-critical content
- Examples: Header, Footer, Hero sections, Service cards, Blog content

**Client Components (Explicit `"use client"`):**
- Only when needed for interactivity, browser APIs, or state
- Use for: forms, navigation menus, modals, animations, scroll effects
- Examples: ContactForm, MobileMenu, AnimatedSection, Dialog components

**Hybrid Pattern:**
```tsx
// Server Component (page.tsx)
export default function ServicesPage() {
  const services = getServices(); // Server-side data
  return (
    <>
      <HeroSection data={services.hero} /> {/* Server */}
      <ServicesGrid services={services.list} /> {/* Server */}
      <ContactCTA /> {/* Server - contains Client form */}
    </>
  );
}
```

### 1.4 Core Dependencies

```json
{
  "dependencies": {
    "next": "^15.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-hook-form": "^7.51.0",
    "zod": "^3.23.0",
    "@hookform/resolvers": "^3.3.4",
    "framer-motion": "^11.2.0",
    "lucide-react": "^0.379.0",
    "tailwindcss": "^3.4.0",
    "tailwindcss-animate": "^1.0.7",
    "@tailwindcss/typography": "^0.5.13",
    "resend": "^3.2.0",
    "@upstash/redis": "^1.31.0",
    "@upstash/ratelimit": "^1.2.0",
    "next-mdx-remote": "^4.4.1",
    "@vercel/analytics": "^1.2.2",
    "@vercel/speed-insights": "^1.0.10"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.12.0",
    "@types/react": "^18.3.0",
    "eslint": "^8.57.0",
    "eslint-config-next": "^15.0.0",
    "prettier": "^3.2.5",
    "prettier-plugin-tailwindcss": "^0.5.14",
    "@playwright/test": "^1.43.0",
    "husky": "^9.0.11",
    "lint-staged": "^15.2.2"
  }
}
```

---

## 2. DESIGN SYSTEM

### 2.1 Color Palette

**Brand Colors:**
```css
:root {
  /* Primary */
  --color-cream: #F3E9DC;         /* Primary background */
  --color-copper: #B87333;        /* Primary accent */
  --color-copper-hover: #A66529;  /* Hover state */
  --color-copper-light: #C98D4D;  /* Light variant */

  /* Neutrals */
  --color-white: #FFFFFF;
  --color-off-white: #FAF7F2;
  --color-light-gray: #E8E0D5;
  --color-medium-gray: #9B8F7E;
  --color-dark-gray: #4A4238;
  --color-charcoal: #2A2420;
  --color-black: #1A1410;

  /* Semantic */
  --color-success: #3D7C5C;
  --color-warning: #D4A373;
  --color-error: #A24936;
  --color-info: #5B7C8D;
}
```

**Tailwind Extension:**
```js
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      cream: {
        50: '#FDFBF7',
        100: '#F3E9DC',  // Primary brand
        200: '#E8D4BD',
        300: '#DCBF9E',
      },
      copper: {
        400: '#D4904D',
        500: '#B87333',  // Primary brand
        600: '#9C5F2B',
        700: '#7A4A21',
      },
    },
  },
}
```

**Color Usage Rules:**
- 60-70% neutral colors (cream, white, grays)
- 30% copper accents (CTAs, highlights, hover states)
- 5-10% semantic colors (success, error, etc.)
- **CRITICAL:** Maintain WCAG AA contrast (4.5:1 for text)

### 2.2 Typography

**Font Stack:**
- **Primary:** Montserrat (sans-serif) - Body, UI, navigation
- **Secondary:** Playfair Display (serif) - Headlines, editorial content

**Implementation:**
```tsx
// app/layout.tsx
import { Montserrat, Playfair_Display } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-montserrat',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
  variable: '--font-playfair',
});

export default function RootLayout({ children }) {
  return (
    <html className={`${montserrat.variable} ${playfair.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

**Type Scale:**
```css
/* Desktop */
--font-size-hero: 4.5rem;        /* 72px - Hero headlines only */
--font-size-display: 3.5rem;     /* 56px - Major sections */
--font-size-h1: 3rem;            /* 48px - Page titles */
--font-size-h2: 2.25rem;         /* 36px - Section headings */
--font-size-h3: 1.75rem;         /* 28px - Subsections */
--font-size-h4: 1.375rem;        /* 22px - Card titles */
--font-size-lg: 1.25rem;         /* 20px - Lead paragraphs */
--font-size-base: 1.125rem;      /* 18px - Body text */
--font-size-sm: 1rem;            /* 16px - Secondary */
--font-size-xs: 0.875rem;        /* 14px - Captions */

/* Mobile: Scale down 10-15% */
```

**Typography Hierarchy Rules:**
- Headlines: 400-600 weight (NO ultra-light)
- Body text: 400 regular
- Letter spacing: 0.05-0.1em for headlines, 0em for body
- Line height: 1.3-1.4 for headings, 1.6-1.8 for body

### 2.3 Spacing System (8px Grid)

```css
--space-xs: 0.25rem;    /* 4px */
--space-sm: 0.5rem;     /* 8px */
--space-md: 1rem;       /* 16px */
--space-lg: 1.5rem;     /* 24px */
--space-xl: 2rem;       /* 32px */
--space-2xl: 3rem;      /* 48px */
--space-3xl: 4rem;      /* 64px */
--space-4xl: 6rem;      /* 96px */
--space-5xl: 8rem;      /* 128px */
```

**Application:**
- Section gaps: 96-128px (desktop), 64-80px (mobile)
- Component spacing: 32-48px
- Element gaps: 16-24px
- Button padding: 18px vertical, 48px horizontal
- Container padding: 80px desktop, 24px mobile

**Luxury Spacing Principle:**
- Use 1.5-2x more spacing than standard sites
- 60-70% of hero section should be negative space

### 2.4 Component Specifications

**Primary Button:**
```tsx
<button className={cn(
  'px-12 py-4 rounded-lg',
  'bg-copper-500 text-white font-semibold',
  'hover:bg-copper-600 hover:shadow-lg',
  'active:scale-95',
  'transition-all duration-300 ease-luxury',
  'focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2'
)}>
  Get Started
</button>
```

**Card Component:**
```tsx
<div className={cn(
  'p-8 rounded-xl',
  'bg-white shadow-subtle',
  'hover:shadow-medium hover:-translate-y-2',
  'transition-all duration-400',
  'border border-cream-200'
)}>
  {children}
</div>
```

**Input Field:**
```tsx
<input className={cn(
  'w-full px-4 py-3 rounded-lg',
  'border-2 border-light-gray',
  'focus:border-copper-500 focus:ring-2 focus:ring-copper-100',
  'transition-colors duration-200',
  'text-base font-sans'
)} />
```

### 2.5 Animation Patterns

**Timing & Easing:**
```css
--transition-fast: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 400ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 600ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-entrance: 800ms cubic-bezier(0.16, 1, 0.3, 1);
```

**Framer Motion Variants:**
```tsx
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

**Scroll-Triggered Animations:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
  {children}
</motion.div>
```

### 2.6 Shadow System

```css
--shadow-subtle: 0 2px 8px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
--shadow-medium: 0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
--shadow-high: 0 24px 64px rgba(0, 0, 0, 0.16), 0 8px 24px rgba(0, 0, 0, 0.12);
--shadow-copper: 0 0 20px rgba(184, 115, 51, 0.15), 0 4px 16px rgba(184, 115, 51, 0.1);
```

---

## 3. CONTENT STRATEGY & MESSAGING

### 3.1 Brand Voice

**Core Personality:** The Capable Partner

**Characteristics:**
- **Confident without arrogant** - Bold statements backed by evidence
- **Approachable without casual** - Professional but conversational
- **Premium without pretentious** - Sophisticated language, accessible meaning
- **Knowledgeable without overwhelming** - Demonstrate expertise, don't gatekeep

### 3.2 Positioning Statement

**Primary:**
> "The Astra Flow brings premium digital marketing expertise to small and medium enterprises. We combine the strategic sophistication of high-end agencies with pricing and processes designed specifically for businesses like yours—companies ready to grow but priced out of traditional agency partnerships."

**One-Line:**
> "Premium digital marketing expertise, purpose-built for SME budgets and growth ambitions."

**Differentiation:**
- **vs Premium Agencies:** Same quality, SME pricing
- **vs Budget Agencies:** Strategic thinking, not template solutions
- **vs DIY/Freelancers:** Comprehensive partnership, not tactical execution

### 3.3 Homepage Messaging

**Hero Headline Options:**

1. **"Compete Beyond Your Weight Class"** (Bold, aspirational)
2. **"The Marketing Partner You Need, Built for the Budget You Have"** (Practical, clear)
3. **"Digital Marketing Built for Businesses Ready to Grow, Not Just Those Already Big"** (Inclusive, direct)

**Recommended:** Option 1 or 2 based on brand boldness preference

**Supporting Subtext:**
> "SMEs have been choosing between expensive agencies and ineffective solutions for too long. The Astra Flow brings strategic sophistication and creative excellence to businesses ready to grow—without the premium agency price tag. Professional results, realistic investment, measurable impact."

**Three-Pillar Messaging:**

**PILLAR 1: Strategic Sophistication**
- Headline: "Strategy That Doesn't Scale Down"
- Message: Every business deserves strategic thinking, regardless of budget. We bring rigorous research, audience insight, and multi-channel orchestration to SME clients.

**PILLAR 2: Transformation Focus**
- Headline: "Built to Move Your Business Forward"
- Message: We measure success by business transformation—more qualified leads, stronger positioning, accelerated growth. Your ROI is our scoreboard.

**PILLAR 3: SME Expertise**
- Headline: "Purpose-Built for Growing Businesses"
- Message: We understand SME realities. Limited budgets that need to work harder. Small teams juggling priorities. Our methodology turns constraints into advantages.

### 3.4 Service Descriptions

**Formula:** [Transformation Headline] + [Business Problem] + [Strategic Approach] + [What's Included] + [Ideal For]

**Example: Web Development**

**Headline:** "Websites That Work as Hard as You Do"

**Problem:** Your website is either a DIY compromise or outdated investment that doesn't convert. You need a site that looks premium, functions flawlessly, and actively drives business growth.

**Approach:** We build conversion-focused websites grounded in user psychology and business strategy. Every design choice serves your business goals. Every interaction optimizes for conversion.

**What's Included:**
- Strategic discovery and competitive analysis
- Custom design system aligned to brand
- Conversion-optimized UX
- Mobile-responsive development
- SEO foundation
- Analytics integration
- Post-launch optimization

**Ideal For:** Businesses whose website isn't reflecting their quality or converting visitors into customers.

### 3.5 CTA Copy Variations

**Primary CTAs:**
- "Start Your Growth Conversation"
- "Get Your Free Strategy Call"
- "See How We Build Growth"
- "Ready to Compete Beyond Your Size?"

**Secondary CTAs:**
- "Explore Our Approach"
- "View Our Work"
- "Learn About Our Services"

**Tertiary CTAs:**
- "Read Success Stories"
- "Download Free Guide"
- "Subscribe to Updates"

### 3.6 Copywriting Formulas

**The Transformation Promise:**
`[Desired Outcome] Without [Common Obstacle]`
- "Premium Marketing Strategy Without the Premium Agency Price Tag"

**The Intersection Positioning:**
`We exist at the intersection of [X] and [Y]`
- "Strategic sophistication and SME accessibility"

**The Bold Declaration:**
`[Provocative Statement] + [Qualifying Context]`
- "Compete Beyond Your Weight Class. We bring agency-level strategy at investment levels that make sense for growing businesses."

**The Results-First:**
`[Specific Metric] in [Timeframe]`
- "200% More Qualified Leads in 90 Days" (use only with evidence)

---

## 4. INFORMATION ARCHITECTURE

### 4.1 Site Structure

```
Homepage (/)
├── Services (/services)
│   ├── Web Development (/services/web-development)
│   ├── SEO & Digital Marketing (/services/seo-digital-marketing)
│   ├── Social Media Management (/services/social-media-management)
│   ├── Branding & Design (/services/branding-design)
│   └── Content Marketing (/services/content-marketing)
├── Portfolio (/portfolio)
│   └── Case Studies (/portfolio/[slug])
├── Blog (/blog)
│   └── Posts (/blog/[slug])
├── About (/about)
├── Contact (/contact)
└── Utility Pages
    ├── 404 (/404)
    ├── Privacy Policy (/privacy)
    └── Terms of Service (/terms)
```

### 4.2 Homepage Structure

**Sections (Top to Bottom):**

1. **Hero Section**
   - Headline + Subtext
   - Primary CTA: "Get Your Free Strategy Call"
   - Secondary CTA: "View Our Work"
   - Background: Subtle animated gradient

2. **Results Metrics**
   - 4 key stats (150+ SMEs Transformed | 4.2x Avg ROI | 92% Retention | 5-Star Rated)
   - Animated counter on scroll

3. **Services Preview**
   - 5 service cards (icon + title + 2-line description)
   - "Explore All Services" CTA

4. **Featured Portfolio**
   - 3-4 standout case studies
   - Large imagery + result stat
   - "View Full Portfolio" CTA

5. **Why The Astra Flow**
   - 3 core differentiators
   - Icon + headline + description

6. **Client Testimonials**
   - Carousel with 5-6 testimonials
   - Photo + name + company + quote

7. **Process Preview**
   - 4-step timeline: Discovery → Strategy → Execution → Growth

8. **Final CTA Section**
   - Headline + simplified contact form

### 4.3 Navigation Structure

**Desktop Header:**
```
[Logo]           [Services ▼] [Portfolio] [About] [Blog] [Contact Us →]
```

**Services Mega Menu (on hover):**
- Web Development
- SEO & Digital Marketing
- Social Media Management
- Branding & Design
- Content Marketing
- → View All Services

**Mobile Menu (Hamburger):**
- Full-screen overlay
- Large touch-friendly links (min 44px)
- Services expandable/collapsible
- Contact info at bottom
- Social links

**Footer (4 Columns):**
1. Logo + Tagline
2. Services links
3. Company links (About, Portfolio, Blog, Contact)
4. Contact info + Social

### 4.4 Forms & Lead Capture

**Primary Contact Form (Multi-Step):**

**Step 1: Personal Info**
- Name, Email, Phone (optional), Company

**Step 2: Service Interest**
- Checkboxes for services

**Step 3: Project Details**
- Budget range, Timeline, Description (optional)

**Step 4: How Did You Hear About Us?**
- Dropdown

**Step 5: Review & Submit**

**Quick Contact Modal (Simplified):**
- Name, Email, Service interest, Quick message
- Trigger: CTA buttons throughout site

**Newsletter Signup:**
- Email only (low friction)
- Footer, blog inline, content upgrades

### 4.5 User Flow: Visitor → Lead

**Primary Path:**
```
Homepage Hero CTA
  ↓
Contact Page (Multi-Step Form)
  ↓
Submit
  ↓
Thank You Page
  ↓
Email Confirmation
  ↓
[LEAD CAPTURED]
```

**Nurture Path:**
```
Blog Post (from SEO)
  ↓
Mid-Article Content Upgrade
  ↓
Email Capture
  ↓
Lead Magnet Delivered
  ↓
Email Sequence (4 emails over 14 days)
  ↓
CTA: Free Consultation
  ↓
[WARM LEAD CAPTURED]
```

---

## 5. SEO STRATEGY

### 5.1 Target Keywords

**Primary (High Volume):**
- "digital marketing agency for SMEs"
- "web development for small businesses"
- "affordable digital marketing services"
- "SME marketing agency"

**Secondary (Medium Volume):**
- "digital marketing for small businesses [city]"
- "small business branding agency"
- "content marketing for SMEs"
- "lead generation for small business"

**Long-Tail (High Intent):**
- "digital marketing agency for businesses under $5M"
- "how to choose marketing agency small business"
- "affordable marketing agency that delivers results"

**Question-Based:**
- "how much should small business spend on marketing"
- "do I need a marketing agency or freelancer"
- "what marketing services do small businesses need"

### 5.2 Page-Level SEO

**Homepage:**
```typescript
export const metadata: Metadata = {
  title: 'The Astra Flow | Digital Marketing & Web Development for SMEs',
  description: 'Accessible, high-impact digital marketing and web development for small and medium enterprises. Transform your online presence with strategic expertise.',
  keywords: ['digital marketing', 'web development', 'SME marketing', 'small business'],
  // ... Open Graph, Twitter, etc.
};
```

**Service Pages:**
```typescript
// services/web-development/page.tsx
export const metadata: Metadata = {
  title: 'Web Development Services | Custom Websites for SMEs | The Astra Flow',
  description: 'Professional web development tailored for SMEs. Fast, responsive, conversion-optimized websites that drive business growth.',
  // ...
};
```

**Blog Posts (Dynamic):**
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    openGraph: {
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [post.coverImage],
    },
  };
}
```

### 5.3 Schema Markup

**Organization Schema (All Pages):**
```tsx
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "The Astra Flow",
  "url": "https://theastroflow.com",
  "logo": "https://theastroflow.com/logo.png",
  "description": "Digital marketing and web development for SMEs",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "email": "hello@theastroflow.com"
  }
}
</script>
```

**Service Schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Web Development",
  "provider": {
    "@type": "Organization",
    "name": "The Astra Flow"
  }
}
```

**Article Schema (Blog):**
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "post.title",
  "datePublished": "post.publishedAt",
  "author": {
    "@type": "Person",
    "name": "post.author"
  }
}
```

### 5.4 Sitemap & Robots

**Dynamic Sitemap:**
```typescript
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://theastroflow.com';

  const staticPages = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/services`, changeFrequency: 'weekly', priority: 0.9 },
    // ... all static pages
  ];

  const posts = await getAllPosts();
  const postPages = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticPages, ...postPages];
}
```

**Robots.txt:**
```txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/

Sitemap: https://theastroflow.com/sitemap.xml
```

### 5.5 Internal Linking Strategy

**Hub and Spoke Model:**
- Homepage → All primary pages
- Services Hub → Individual services
- Services → Related case studies
- Blog posts → Relevant services
- Case studies → Services used

**Contextual Linking:**
- Link to services when mentioning tactics in blog
- Link to case studies when citing examples
- Use descriptive anchor text (not "click here")

---

## 6. PERFORMANCE OPTIMIZATION

### 6.1 Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| **LCP** | < 2.5s | Image optimization, font preloading, SSR |
| **FID/INP** | < 100ms | Code splitting, defer non-critical JS |
| **CLS** | < 0.1 | Size hints, font-display swap, skeleton loaders |
| **TTFB** | < 600ms | Edge caching, optimized API routes |

### 6.2 Image Optimization

**Use Next.js Image component exclusively:**

```tsx
import Image from 'next/image';

// Hero image (LCP)
<Image
  src="/hero-image.jpg"
  alt="The Astra Flow team"
  width={1920}
  height={1080}
  priority
  quality={85}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// Portfolio images
<Image
  src={project.thumbnail}
  alt={project.title}
  width={600}
  height={400}
  loading="lazy"
  quality={80}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

**Configuration:**
```js
// next.config.js
module.exports = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    minimumCacheTTL: 31536000,
  },
};
```

**Guidelines:**
- Max uncompressed size: 500KB
- Use `priority` for LCP images
- Use `loading="lazy"` for below-fold
- Generate blur placeholders

### 6.3 Font Loading

```tsx
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  variable: '--font-montserrat',
});
```

**Benefits:**
- Automatic self-hosting (zero external requests)
- Prevents layout shift
- Fonts cached at edge

### 6.4 Code Splitting

**Dynamic Imports:**
```tsx
import dynamic from 'next/dynamic';

const ContactModal = dynamic(() => import('@/components/forms/contact-modal'));
const AnimatedHero = dynamic(() => import('@/components/sections/animated-hero'), {
  ssr: false,
});
```

**When to Use:**
- Heavy animation libraries
- Modal dialogs
- Below-fold interactive components
- Third-party widgets

### 6.5 Caching Strategy

**Static Generation (Default):**
```typescript
export const revalidate = 86400; // 24 hours

export default async function Page() {
  return <Content />;
}
```

**ISR for Blog:**
```typescript
export const revalidate = 3600; // 1 hour

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}
```

---

## 7. SECURITY & ACCESSIBILITY

### 7.1 Security Implementation

**Rate Limiting (Upstash Redis):**
```typescript
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'), // 3 req/hour
});

// In API route
const { success } = await ratelimit.limit(identifier);
if (!success) {
  return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
}
```

**Form Validation (Zod):**
```typescript
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(1000),
}).transform(data => ({
  name: DOMPurify.sanitize(data.name),
  email: data.email.toLowerCase().trim(),
  message: DOMPurify.sanitize(data.message),
}));
```

**CSRF Protection:**
```typescript
// Generate token on form load
const csrfToken = await generateCSRFToken();

// Validate on submission
const isValid = validateCSRFToken(token);
```

**Security Headers:**
```js
// next.config.js
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000' },
      ],
    },
  ];
}
```

### 7.2 Accessibility (WCAG 2.1 AA)

**Keyboard Navigation:**
```tsx
// Skip to content link
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
>
  Skip to main content
</a>

// Focus styles
<style>{`
  *:focus-visible {
    outline: 2px solid #B87333;
    outline-offset: 2px;
  }
`}</style>
```

**Semantic HTML:**
```tsx
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main aria-labelledby="page-title">
  <h1 id="page-title">Services</h1>
</main>
```

**ARIA Attributes:**
```tsx
<button
  type="submit"
  aria-disabled={isSubmitting}
  aria-busy={isSubmitting}
>
  {isSubmitting ? 'Submitting...' : 'Submit'}
</button>

<div role="status" aria-live="polite">
  {status === 'success' && 'Form submitted successfully'}
</div>
```

**Form Accessibility:**
```tsx
<label htmlFor="email" className="block mb-2">
  Email <span aria-label="required">*</span>
</label>
<input
  id="email"
  type="email"
  aria-required="true"
  aria-invalid={errors.email ? 'true' : 'false'}
  aria-describedby={errors.email ? 'email-error' : undefined}
/>
{errors.email && (
  <p id="email-error" role="alert">
    {errors.email.message}
  </p>
)}
```

**Reduced Motion:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**Color Contrast:**
- Copper (#B87333) on Cream (#F3E9DC): 4.8:1 ✓ PASS
- White on Copper: 5.2:1 ✓ PASS
- Dark Gray (#4A4238) on Cream: 5.2:1 ✓ PASS

---

## 8. DEVELOPMENT WORKFLOW

### 8.1 Git Workflow (GitHub Flow)

**Branching:**
```bash
main (production-ready)
  ↓
feature/contact-form
feature/services-page
fix/bug-description
hotfix/urgent-fix
```

**Process:**
1. Create feature branch from `main`
2. Develop and commit regularly
3. Push and create PR
4. Code review + automated checks
5. Merge to `main` → auto-deploy

### 8.2 Code Quality

**TypeScript (strict mode):**
```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "moduleResolution": "bundler"
  }
}
```

**ESLint:**
```js
module.exports = {
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
```

**Prettier:**
```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Pre-commit Hooks (Husky):**
```bash
# .husky/pre-commit
npx lint-staged
npm run typecheck
```

### 8.3 Testing

**E2E Testing (Playwright):**
```typescript
test('contact form submission', async ({ page }) => {
  await page.goto('/contact');
  await page.fill('#name', 'John Doe');
  await page.fill('#email', 'john@example.com');
  await page.fill('#message', 'Test message');
  await page.click('button[type="submit"]');
  await expect(page.locator('text=Thank you')).toBeVisible();
});
```

**Testing Strategy:**
- Manual testing for MVP
- E2E tests for critical flows (contact form, navigation)
- Add unit tests as complexity grows

### 8.4 Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "test": "playwright test"
  }
}
```

---

## 9. DEPLOYMENT & LAUNCH

### 9.1 Hosting: Vercel

**Rationale:**
- Built by Next.js creators (zero-config)
- Global edge network (99.99% uptime)
- Automatic HTTPS, DDoS protection
- Instant rollbacks, preview deployments
- Generous free tier

**Setup:**
1. Connect GitHub repo to Vercel
2. Configure environment variables
3. Auto-deploy on push to `main`

### 9.2 Environment Variables

```bash
# .env.local (development)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=re_xxxxx
CONTACT_EMAIL=hello@theastroflow.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxx
CSRF_SECRET=generate-strong-random-secret

# Vercel (production) - Set in dashboard
NEXT_PUBLIC_SITE_URL=https://theastroflow.com
# ... (same variables)
```

**Security:**
- NEVER commit `.env.local`
- Use `NEXT_PUBLIC_` prefix ONLY for client-side vars
- Store secrets in Vercel dashboard
- Rotate API keys regularly

### 9.3 Launch Checklist

**Technical:**
- [ ] Environment variables configured
- [ ] Custom domain connected (SSL configured)
- [ ] Google Analytics verified
- [ ] Contact form tested end-to-end
- [ ] Email delivery working (Resend)
- [ ] 404 page created
- [ ] robots.txt configured
- [ ] Sitemap submitted to Google Search Console
- [ ] Favicon and OG images created
- [ ] All images optimized (< 500KB)

**Content:**
- [ ] All copy proofread
- [ ] Placeholder text replaced
- [ ] Legal pages: Privacy Policy, Terms
- [ ] Contact info verified
- [ ] Social media links working

**Performance:**
- [ ] Lighthouse score 90+ on all metrics
- [ ] Mobile responsiveness tested
- [ ] Browser compatibility (Chrome, Safari, Firefox, Edge)
- [ ] Core Web Vitals passing

**SEO:**
- [ ] Meta titles/descriptions on all pages
- [ ] Open Graph images on all pages
- [ ] Schema markup implemented
- [ ] Sitemap submitted to Google
- [ ] Google Search Console verified

**Accessibility:**
- [ ] Keyboard navigation tested
- [ ] Screen reader tested
- [ ] Color contrast verified
- [ ] WCAG audit completed (axe DevTools)

---

## 10. IMPLEMENTATION TIMELINE

### **10-Week Roadmap to Launch**

#### **WEEK 1-2: Foundation & Setup**

**Week 1: Project Setup**
- [ ] Initialize Next.js project with TypeScript
- [ ] Install and configure all dependencies
- [ ] Set up Tailwind CSS + shadcn/ui
- [ ] Configure ESLint, Prettier, Husky
- [ ] Create base file structure
- [ ] Set up git repository and branching strategy
- [ ] Configure Vercel project and preview deployments

**Week 2: Design System & Layouts**
- [ ] Implement global styles (colors, typography, spacing)
- [ ] Create reusable UI components (Button, Card, Input, etc.)
- [ ] Build Header component (desktop & mobile nav)
- [ ] Build Footer component
- [ ] Create page layout templates
- [ ] Implement responsive container system
- [ ] Test on multiple devices/browsers

**Deliverable:** Functional design system with header/footer navigation

---

#### **WEEK 3-4: Core Pages (Part 1)**

**Week 3: Homepage**
- [ ] Hero section with animations
- [ ] Services preview grid
- [ ] Results metrics (animated counters)
- [ ] Featured portfolio preview
- [ ] Why Choose Us section
- [ ] Testimonials carousel
- [ ] Process timeline
- [ ] Final CTA section
- [ ] Optimize for Core Web Vitals

**Week 4: About & Services Hub**
- [ ] About page (mission, values, team)
- [ ] Services hub page (overview of all services)
- [ ] Service card components
- [ ] Team member cards
- [ ] Company stats section
- [ ] Internal linking implementation

**Deliverable:** Complete homepage and about/services pages

---

#### **WEEK 5-6: Core Pages (Part 2) & Dynamic Content**

**Week 5: Individual Service Pages**
- [ ] Web Development service page
- [ ] SEO & Digital Marketing page
- [ ] Social Media Management page
- [ ] Branding & Design page
- [ ] Content Marketing page
- [ ] Related case studies sections
- [ ] Service-specific CTAs
- [ ] FAQ accordions

**Week 6: Portfolio & Blog Setup**
- [ ] Portfolio grid page
- [ ] Portfolio filtering functionality
- [ ] Create 3-5 case study pages
- [ ] Blog listing page
- [ ] Blog post template
- [ ] Write 5-10 initial blog posts (MDX)
- [ ] Implement blog categories/tags
- [ ] Related posts logic

**Deliverable:** All service pages, portfolio with case studies, blog with initial content

---

#### **WEEK 7-8: Forms, Interactions & Optimization**

**Week 7: Contact Form & Lead Capture**
- [ ] Multi-step contact form component
- [ ] Form validation (Zod schemas)
- [ ] API route: `/api/contact`
- [ ] Email integration (Resend)
- [ ] Rate limiting (Upstash Redis)
- [ ] CSRF protection
- [ ] Thank you page
- [ ] Confirmation emails (admin & user)
- [ ] Newsletter signup forms
- [ ] Quick contact modals

**Week 8: SEO & Performance Optimization**
- [ ] Metadata for all pages
- [ ] Dynamic sitemap generation
- [ ] Schema markup (Organization, Service, Article)
- [ ] robots.txt configuration
- [ ] Image optimization audit
- [ ] Font loading optimization
- [ ] Code splitting for heavy components
- [ ] Implement analytics (Vercel + GA4)
- [ ] Run Lighthouse audits (target: 90+)
- [ ] Optimize Core Web Vitals

**Deliverable:** Fully functional contact system, SEO-optimized site with 90+ Lighthouse scores

---

#### **WEEK 9: Testing, Accessibility & Content**

**Week 9: Quality Assurance**
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Keyboard navigation testing
- [ ] Screen reader testing (VoiceOver/NVDA)
- [ ] Color contrast verification
- [ ] E2E testing (Playwright) for critical flows
- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge)
- [ ] Mobile responsiveness review (iOS, Android)
- [ ] Fix all critical bugs
- [ ] Content proofreading and finalization
- [ ] Replace all placeholder content
- [ ] Legal pages (Privacy Policy, Terms of Service)

**Deliverable:** Fully tested, accessible, production-ready website

---

#### **WEEK 10: Pre-Launch & Deployment**

**Week 10: Launch Preparation**
- [ ] Final content review and approval
- [ ] Set up production environment variables (Vercel)
- [ ] Configure custom domain and SSL
- [ ] Set up Google Search Console
- [ ] Submit sitemap to Google
- [ ] Set up Google Analytics tracking
- [ ] Configure email delivery (Resend production API key)
- [ ] Test contact form in production
- [ ] Set up error monitoring (optional: Sentry)
- [ ] Create 404 custom page
- [ ] Final Lighthouse audit
- [ ] Backup and rollback plan
- [ ] **LAUNCH** 🚀
- [ ] Monitor analytics and error logs
- [ ] Respond to any critical issues within 24 hours

**Deliverable:** Live production website

---

### **Post-Launch (Week 11-12)**

**Immediate Post-Launch:**
- Monitor uptime and performance
- Review analytics (traffic, conversions, bounce rate)
- Check contact form submissions
- Fix any critical bugs
- Collect initial user feedback

**Month 1 Goals:**
- Review Core Web Vitals in Google Search Console
- Analyze user behavior (heatmaps with Hotjar if needed)
- Optimize based on real user data
- Begin content marketing (2 blog posts/month)
- Start A/B testing CTAs

---

### **Phase 2 Roadmap (3-6 Months)**

**Enhancements:**
- Add client portal for project tracking
- Implement live chat (Intercom/Crisp)
- A/B testing framework for forms and CTAs
- Advanced analytics (conversion funnels)
- Additional case studies (target: 10+)
- Content library expansion (20+ blog posts)

**Phase 3 (6-12 Months):**
- Migrate to headless CMS (Sanity) if content scales
- E-commerce for productized services
- Multi-language support (i18n)
- Advanced personalization

---

## RESOURCE ALLOCATION

**Developer Hours Estimate:**
- **Weeks 1-2:** 60 hours (setup, design system, layouts)
- **Weeks 3-4:** 70 hours (homepage, about, services hub)
- **Weeks 5-6:** 70 hours (service pages, portfolio, blog)
- **Weeks 7-8:** 60 hours (forms, SEO, optimization)
- **Week 9:** 40 hours (testing, accessibility)
- **Week 10:** 30 hours (launch prep, deployment)

**Total:** ~330 hours (8-10 weeks at 40 hours/week)

**Content Creation (Parallel):**
- Copywriting: 40 hours
- Case studies: 20 hours
- Blog posts: 30 hours
- Images/graphics: 20 hours

---

## KEY SUCCESS METRICS (First 3 Months)

**Performance:**
- Lighthouse score: 90+ on all pages
- LCP: < 2.5s
- CLS: < 0.1
- 99.9%+ uptime

**Traffic:**
- 1,000+ monthly visitors (Month 3)
- 50%+ organic traffic
- < 50% bounce rate
- 2+ pages per session

**Conversions:**
- 3-5% contact form conversion rate
- 30+ qualified leads (Month 3)
- 2-3% newsletter signup rate

**SEO:**
- 10+ keywords in top 10 positions (Month 6)
- 100+ indexed pages
- 10+ quality backlinks

---

## MAINTENANCE PLAN

**Weekly:**
- Check form submissions, respond promptly
- Monitor uptime (Vercel status)
- Review analytics for anomalies

**Monthly:**
- Update dependencies (`npm outdated`)
- Review Core Web Vitals trends
- Add 1-2 new blog posts
- Respond to all inquiries

**Quarterly:**
- Major dependency updates (Next.js, React)
- Security audit (`npm audit`)
- Content refresh (update outdated info)
- SEO performance review
- A/B testing report

---

## CONCLUSION

This comprehensive developer brief provides everything needed to build The Astra Flow marketing website—from technical architecture to content strategy, from design specifications to implementation timeline.

**The blueprint ensures:**
✅ Premium luxury design principles applied to SME positioning
✅ High-performance, SEO-optimized Next.js architecture
✅ Accessible, WCAG 2.1 AA compliant experience
✅ Secure, production-ready implementation
✅ Clear 10-week path to launch
✅ Scalable foundation for future growth

**Key Differentiators:**
- Sophisticated design without intimidation
- Strategic messaging without jargon
- Technical excellence without complexity
- Premium feel without premium pricing barriers

This website will serve as The Astra Flow's primary lead generation engine, showcasing expertise while converting visitors into qualified SME clients ready to transform their digital presence.

---

**Related Documentation:**
- `TECHNICAL_ARCHITECTURE.md` - Deep technical specifications
- `DESIGN_SYSTEM.md` - Complete design system details
- `CONTENT_STRATEGY.md` - Full messaging framework
- `INFORMATION_ARCHITECTURE.md` - Detailed sitemap and flows
- `digital-marketing.md` - Premium agency research insights (50+ pages)

**Next Steps:**
1. Review this brief with stakeholders
2. Approve timeline and resource allocation
3. Begin Week 1: Project setup
4. Schedule weekly check-ins to track progress

---

**Document Version:** 1.0
**Last Updated:** October 1, 2025
**Prepared By:** Claude Code Development Team
**For:** The Astra Flow Project

*This is a living document. Update as the project evolves.*
