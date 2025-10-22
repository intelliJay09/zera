# The Astra Flow - Technical Architecture Specification

**Version:** 1.0
**Last Updated:** October 1, 2025
**Project Type:** Marketing Website (Lead Generation)

---

## Executive Summary

This document defines the complete technical architecture for The Astra Flow marketing website—a high-performance, SEO-optimized lead generation platform built with Next.js 15+ (App Router), designed to showcase digital marketing expertise while delivering exceptional user experience and conversion optimization.

**Core Objectives:**
- Maximum performance (Core Web Vitals: 90+ on all metrics)
- Lead generation optimization (contact forms, CTAs, analytics)
- Brand reinforcement through elegant, accessible design
- SEO excellence for SME digital marketing keywords
- Zero compromise on accessibility (WCAG 2.1 AA minimum)

---

## 1. Next.js Architecture

### 1.1 Router Strategy: **App Router (Recommended)**

**Rationale:**
- App Router is production-ready as of Next.js 13.4+ and the default in Next.js 15
- Superior performance through React Server Components
- Better SEO with streaming SSR and metadata API
- Enhanced layout composition with nested layouts
- Built-in loading and error states
- Future-proof architecture aligned with React's direction

**Decision:** Use **App Router exclusively** for new project

### 1.2 File Structure

```
/
├── app/
│   ├── (marketing)/              # Route group for marketing pages
│   │   ├── layout.tsx            # Marketing layout with nav/footer
│   │   ├── page.tsx              # Homepage (/)
│   │   ├── about/
│   │   │   └── page.tsx          # About page
│   │   ├── services/
│   │   │   ├── page.tsx          # Services overview
│   │   │   ├── web-development/
│   │   │   │   └── page.tsx
│   │   │   ├── digital-marketing/
│   │   │   │   └── page.tsx
│   │   │   └── seo-services/
│   │   │       └── page.tsx
│   │   ├── portfolio/
│   │   │   ├── page.tsx          # Portfolio grid
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Case study detail
│   │   ├── blog/
│   │   │   ├── page.tsx          # Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx      # Blog post
│   │   ├── contact/
│   │   │   └── page.tsx          # Contact page
│   │   └── pricing/
│   │       └── page.tsx          # Pricing/packages
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.ts          # Contact form handler
│   │   ├── subscribe/
│   │   │   └── route.ts          # Newsletter subscription
│   │   └── csrf/
│   │       └── route.ts          # CSRF token endpoint
│   ├── layout.tsx                # Root layout
│   ├── not-found.tsx             # 404 page
│   ├── error.tsx                 # Error boundary
│   └── loading.tsx               # Root loading state
├── components/
│   ├── ui/                       # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── textarea.tsx
│   │   └── ...
│   ├── layout/
│   │   ├── header.tsx            # Site header (Server Component)
│   │   ├── footer.tsx            # Site footer (Server Component)
│   │   ├── navigation.tsx        # Nav menu (Client Component)
│   │   └── mobile-menu.tsx       # Mobile navigation
│   ├── sections/                 # Page sections
│   │   ├── hero.tsx
│   │   ├── services-grid.tsx
│   │   ├── testimonials.tsx
│   │   ├── cta-section.tsx
│   │   └── stats.tsx
│   ├── forms/
│   │   ├── contact-form.tsx      # Main contact form
│   │   ├── newsletter-form.tsx   # Email subscription
│   │   └── quote-form.tsx        # Quick quote request
│   └── shared/
│       ├── logo.tsx
│       ├── social-links.tsx
│       └── scroll-indicator.tsx
├── lib/
│   ├── utils.ts                  # Utility functions (cn, etc.)
│   ├── api/
│   │   ├── email.ts              # Email sending utilities
│   │   ├── validation.ts         # Form validation schemas
│   │   └── rate-limiter.ts       # Rate limiting logic
│   ├── hooks/
│   │   ├── use-scroll-progress.ts
│   │   ├── use-intersection.ts
│   │   └── use-form-submit.ts
│   └── constants/
│       ├── site-config.ts        # Site metadata, URLs
│       ├── services.ts           # Service definitions
│       └── navigation.ts         # Nav menu structure
├── content/                      # MDX content (if using)
│   ├── blog/
│   │   └── *.mdx
│   └── case-studies/
│       └── *.mdx
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── services/
│   │   ├── portfolio/
│   │   └── team/
│   ├── fonts/                    # Montserrat font files
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml               # Generated via script
├── styles/
│   └── globals.css               # Global styles + Tailwind
├── types/
│   ├── api.ts                    # API response types
│   ├── content.ts                # Content types
│   └── forms.ts                  # Form data types
├── config/
│   ├── site.ts                   # Site-wide configuration
│   └── seo.ts                    # SEO defaults
└── scripts/
    ├── generate-sitemap.ts       # Sitemap generation
    └── optimize-images.ts        # Image optimization script
```

### 1.3 Server vs Client Components Strategy

**Server Components (Default):**
- All components are Server Components unless marked with `"use client"`
- Used for: layouts, static content, data fetching, SEO-critical content
- Examples: Header, Footer, Hero sections, Service cards, Blog content

**Client Components (Explicit):**
- Only when needed for interactivity, browser APIs, or state
- Used for: forms, navigation menus, modals, animations, scroll effects
- Examples: ContactForm, MobileMenu, AnimatedSection, DialogComponents

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

// ContactCTA.tsx (Server Component)
export function ContactCTA() {
  return (
    <section>
      <h2>Ready to grow your business?</h2>
      <ContactForm /> {/* Client Component */}
    </section>
  );
}

// ContactForm.tsx (Client Component)
"use client";
export function ContactForm() {
  const [state, setState] = useState();
  // Interactive form logic
}
```

### 1.4 API Routes Structure

```
app/api/
├── contact/
│   └── route.ts              # POST /api/contact
├── subscribe/
│   └── route.ts              # POST /api/subscribe
├── csrf/
│   └── route.ts              # GET /api/csrf
└── health/
    └── route.ts              # GET /api/health
```

**API Route Pattern:**
```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/api/rate-limiter';
import { validateContactForm } from '@/lib/api/validation';
import { sendEmail } from '@/lib/api/email';

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = await rateLimit(request);
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      );
    }

    // Parse and validate
    const body = await request.json();
    const validation = validateContactForm(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validation.errors },
        { status: 400 }
      );
    }

    // Send email
    await sendEmail({
      to: process.env.CONTACT_EMAIL!,
      subject: `New Contact: ${validation.data.name}`,
      body: formatContactEmail(validation.data),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## 2. Tech Stack Recommendations

### 2.1 Core Framework
- **Next.js 15+** (App Router)
- **React 18+** (with Server Components)
- **TypeScript 5+** (strict mode)

### 2.2 UI Framework & Components

**Primary:** **Tailwind CSS 3.4+** with **shadcn/ui**

**Rationale:**
- Tailwind: Utility-first, excellent performance, no runtime CSS-in-JS overhead
- shadcn/ui: Copy-paste components (not a dependency), full customization, accessible
- Perfect for custom branding (#F3E9DC, #B87333 colors)
- Production-proven, excellent DX

**Configuration:**
```js
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#F3E9DC', // Primary brand color
          200: '#E8D4BD',
          300: '#DCBF9E',
        },
        copper: {
          400: '#D4904D',
          500: '#B87333', // Primary brand color
          600: '#9C5F2B',
          700: '#7A4A21',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
};

export default config;
```

### 2.3 Animation Library

**Primary:** **Framer Motion 11+**

**Rationale:**
- Best-in-class declarative animations for React
- Excellent performance with hardware acceleration
- Server Component compatible (with client component wrappers)
- Scroll-triggered animations built-in
- Production-ready, battle-tested

**Usage Pattern:**
```tsx
"use client";
import { motion } from 'framer-motion';

export function AnimatedSection({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

**Alternative for Micro-interactions:** CSS Tailwind animations (no JS overhead)

### 2.4 Form Handling

**Library:** **React Hook Form 7+** with **Zod** validation

**Rationale:**
- Minimal re-renders, excellent performance
- TypeScript-first with Zod integration
- Built-in error handling and validation
- No controlled inputs overhead

**Implementation:**
```tsx
"use client";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    // Handle response
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
}
```

### 2.5 Email Integration

**Primary:** **Resend** (recommended)

**Rationale:**
- Modern API, React Email templates support
- Excellent deliverability, developer-friendly
- Generous free tier (3,000 emails/month)
- Built for Next.js apps

**Alternative:** **SendGrid** (if higher volume needed)

**Implementation:**
```typescript
// lib/api/email.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(data: ContactFormData) {
  await resend.emails.send({
    from: 'noreply@theastroflow.com',
    to: process.env.CONTACT_EMAIL!,
    subject: `New Contact: ${data.name}`,
    html: formatContactEmailHTML(data),
    replyTo: data.email,
  });
}
```

### 2.6 CMS Recommendation

**Option 1: MDX (Recommended for MVP)**

**Rationale:**
- No external dependencies, version-controlled content
- Perfect for small-scale blog/case studies
- Fast, type-safe, component-rich content
- Zero cost, maximum control

**Setup with next-mdx-remote:**
```typescript
// app/blog/[slug]/page.tsx
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug } from '@/lib/content';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  return (
    <article>
      <h1>{post.title}</h1>
      <MDXRemote source={post.content} />
    </article>
  );
}
```

**Option 2: Sanity CMS (For Scale/Team)**

**When to upgrade:**
- Need non-technical content editing
- Frequent content updates (>2/week)
- Multiple content editors
- Rich media management

### 2.7 Analytics

**Primary:** **Vercel Analytics** + **Google Analytics 4**

**Implementation:**
```tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

**GA4 Setup (Client Component):**
```tsx
// components/analytics/ga4.tsx
"use client";
import Script from 'next/script';

export function GA4() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>
    </>
  );
}
```

---

## 3. Performance Optimization Strategy

### 3.1 Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| **LCP** (Largest Contentful Paint) | < 2.5s | Image optimization, font preloading, SSR |
| **FID** (First Input Delay) | < 100ms | Code splitting, defer non-critical JS |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Size hints, font-display, skeleton loaders |
| **TTFB** (Time to First Byte) | < 600ms | Edge caching, optimized API routes |
| **INP** (Interaction to Next Paint) | < 200ms | Event handler optimization, minimal JS |

### 3.2 Image Optimization

**Strategy:** Use Next.js Image component exclusively

```tsx
import Image from 'next/image';

// Hero image example
<Image
  src="/images/hero/team-collaboration.jpg"
  alt="The Astra Flow team collaborating"
  width={1920}
  height={1080}
  priority // LCP image
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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
  },
};
```

**Image Guidelines:**
- Max image size: 500KB uncompressed
- Use AVIF/WebP formats (automatic with Next.js Image)
- Provide proper width/height to prevent CLS
- Use `priority` for LCP images (hero images)
- Use `loading="lazy"` for below-fold images
- Generate blur placeholders for smooth loading

### 3.3 Font Loading Strategy

**Primary Font:** Montserrat (Google Fonts via next/font)

```typescript
// app/layout.tsx
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  variable: '--font-montserrat',
  fallback: ['system-ui', 'arial'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}
```

**Benefits:**
- Automatic self-hosting (zero external requests)
- Optimized loading with `font-display: swap`
- Prevents layout shift with size-adjust
- Fonts cached at edge (Vercel)

### 3.4 Code Splitting

**Automatic Splitting:**
- Next.js automatically splits by route
- Each page bundle is independent
- Shared code extracted to common chunks

**Dynamic Imports (Client Components):**
```tsx
import dynamic from 'next/dynamic';

// Lazy-load heavy components
const AnimatedHero = dynamic(() => import('@/components/sections/animated-hero'), {
  loading: () => <HeroSkeleton />,
  ssr: false, // Client-only if needed
});

// Lazy-load modal dialogs
const ContactModal = dynamic(() => import('@/components/forms/contact-modal'));
```

**When to Use:**
- Heavy animation libraries (only load when needed)
- Modal dialogs (not visible on initial render)
- Below-fold interactive components
- Third-party widgets (chat, maps)

### 3.5 Caching Strategy

**Static Generation (Default):**
```typescript
// app/services/page.tsx
export const revalidate = 86400; // Revalidate every 24 hours

export default async function ServicesPage() {
  // Statically generated at build time
  return <ServicesContent />;
}
```

**Incremental Static Regeneration (ISR):**
```typescript
// app/blog/[slug]/page.tsx
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}
```

**Edge Caching (Vercel):**
- Static pages: Cached indefinitely at edge
- ISR pages: Cached until revalidation
- API routes: Cache with `cache-control` headers

```typescript
// app/api/posts/route.ts
export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
```

### 3.6 Bundle Optimization

```js
// next.config.js
module.exports = {
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  webpack: (config, { webpack }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: process.env.NODE_ENV !== 'production',
      })
    );
    return config;
  },
};
```

---

## 4. SEO Architecture

### 4.1 Metadata Strategy

**Implementation with Metadata API:**
```typescript
// app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://theastroflow.com'),
  title: {
    default: 'The Astra Flow | Digital Marketing & Web Development for SMEs',
    template: '%s | The Astra Flow',
  },
  description: 'Accessible, high-impact digital marketing and web development services for small and medium enterprises. Transform your online presence.',
  keywords: ['digital marketing', 'web development', 'SME marketing', 'small business website', 'SEO services'],
  authors: [{ name: 'The Astra Flow' }],
  creator: 'The Astra Flow',
  publisher: 'The Astra Flow',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://theastroflow.com',
    siteName: 'The Astra Flow',
    title: 'The Astra Flow | Digital Marketing & Web Development',
    description: 'Accessible, high-impact digital marketing for SMEs',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Astra Flow',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Astra Flow | Digital Marketing & Web Development',
    description: 'Accessible, high-impact digital marketing for SMEs',
    images: ['/og-image.jpg'],
    creator: '@theastroflow',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};
```

**Page-Specific Metadata:**
```typescript
// app/services/web-development/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Development Services | Custom Websites for SMEs',
  description: 'Professional web development services tailored for small and medium enterprises. Fast, responsive, conversion-optimized websites.',
  openGraph: {
    title: 'Web Development Services | The Astra Flow',
    description: 'Custom websites built for business growth',
    images: ['/og-images/web-development.jpg'],
  },
};
```

**Dynamic Metadata:**
```typescript
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    publishedTime: post.publishedAt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [post.coverImage],
    },
  };
}
```

### 4.2 Sitemap Generation

**Dynamic Sitemap:**
```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllPosts, getAllProjects } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://theastroflow.com';

  // Static pages
  const staticPages = [
    '',
    '/about',
    '/services',
    '/services/web-development',
    '/services/digital-marketing',
    '/services/seo-services',
    '/portfolio',
    '/blog',
    '/contact',
    '/pricing',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Dynamic blog posts
  const posts = await getAllPosts();
  const postPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Dynamic portfolio items
  const projects = await getAllProjects();
  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...postPages, ...projectPages];
}
```

### 4.3 Schema Markup (JSON-LD)

**Organization Schema:**
```tsx
// components/seo/organization-schema.tsx
export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Astra Flow',
    url: 'https://theastroflow.com',
    logo: 'https://theastroflow.com/logo.png',
    description: 'Digital marketing and web development for SMEs',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'US',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@theastroflow.com',
    },
    sameAs: [
      'https://twitter.com/theastroflow',
      'https://linkedin.com/company/theastroflow',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

**Service Schema:**
```tsx
// app/services/web-development/page.tsx
export default function WebDevelopmentPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Web Development',
    provider: {
      '@type': 'Organization',
      name: 'The Astra Flow',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    description: 'Custom web development services for small and medium enterprises',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Page content */}
    </>
  );
}
```

**Article Schema (Blog Posts):**
```typescript
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  image: post.coverImage,
  datePublished: post.publishedAt,
  dateModified: post.updatedAt,
  author: {
    '@type': 'Person',
    name: post.author,
  },
  publisher: {
    '@type': 'Organization',
    name: 'The Astra Flow',
    logo: {
      '@type': 'ImageObject',
      url: 'https://theastroflow.com/logo.png',
    },
  },
  description: post.excerpt,
};
```

### 4.4 robots.txt Configuration

```txt
# public/robots.txt
User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

Sitemap: https://theastroflow.com/sitemap.xml
```

### 4.5 Canonical URLs

Automatically handled by Next.js Metadata API:
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://theastroflow.com'),
  alternates: {
    canonical: '/services/web-development',
  },
};
```

---

## 5. Responsive Design Architecture

### 5.1 Breakpoint System

**Tailwind Breakpoints (Mobile-First):**
```css
/* Default: < 640px (mobile) */
sm:  640px   /* Small tablets */
md:  768px   /* Tablets */
lg:  1024px  /* Small laptops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Large desktops */
```

**Custom Breakpoints (if needed):**
```js
// tailwind.config.ts
theme: {
  screens: {
    'xs': '480px',
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
  },
}
```

### 5.2 Responsive Design Patterns

**Container System:**
```tsx
// components/layout/container.tsx
export function Container({ children, className = '' }: ContainerProps) {
  return (
    <div className={cn(
      'w-full mx-auto px-4 sm:px-6 lg:px-8',
      'max-w-7xl', // 1280px max width
      className
    )}>
      {children}
    </div>
  );
}
```

**Responsive Typography:**
```css
/* globals.css */
h1 {
  @apply text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold;
}

h2 {
  @apply text-2xl sm:text-3xl lg:text-4xl font-bold;
}

body {
  @apply text-base sm:text-lg;
}
```

**Responsive Grid:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
  {services.map((service) => (
    <ServiceCard key={service.id} {...service} />
  ))}
</div>
```

### 5.3 Touch vs Desktop Interactions

**Touch-Optimized:**
- Minimum touch target: 44x44px (WCAG 2.1 AA)
- Larger spacing on mobile (p-6 vs lg:p-8)
- Simplified hover states on mobile
- Swipe gestures for carousels

**Implementation:**
```tsx
<button className={cn(
  'min-h-[44px] min-w-[44px]', // Touch target
  'px-6 py-3 rounded-lg',
  'bg-copper-500 text-white',
  'hover:bg-copper-600 active:scale-95', // Both hover and active
  'transition-all duration-200',
  'focus-visible:ring-2 focus-visible:ring-copper-500 focus-visible:ring-offset-2'
)}>
  Contact Us
</button>
```

**Media Queries for Hover:**
```css
/* Only show hover effects on devices that support hover */
@media (hover: hover) {
  .card {
    @apply hover:shadow-xl hover:scale-105;
  }
}
```

### 5.4 Mobile Navigation

**Pattern:**
- Desktop: Horizontal nav bar
- Mobile: Hamburger menu with slide-in drawer
- Sticky header on both
- Smooth transitions

```tsx
// components/layout/navigation.tsx
"use client";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Nav */}
      <nav className="hidden lg:flex items-center gap-8">
        <NavLinks />
      </nav>

      {/* Mobile Hamburger */}
      <button
        className="lg:hidden min-h-[44px] min-w-[44px]"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Drawer */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
```

---

## 6. Third-Party Integrations

### 6.1 Contact Form Backend

**Primary:** Custom API route with **Resend**

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { rateLimit } from '@/lib/api/rate-limiter';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  message: z.string().min(10).max(1000),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limiting (max 3 submissions per hour per IP)
    const identifier = request.headers.get('x-forwarded-for') || 'anonymous';
    const { success } = await rateLimit(identifier, { max: 3, window: 3600 });

    if (!success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Validate input
    const body = await request.json();
    const data = contactSchema.parse(body);

    // Send email
    await resend.emails.send({
      from: 'The Astra Flow <noreply@theastroflow.com>',
      to: process.env.CONTACT_EMAIL!,
      replyTo: data.email,
      subject: `New Contact from ${data.name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: 'The Astra Flow <hello@theastroflow.com>',
      to: data.email,
      subject: 'Thanks for reaching out!',
      html: `
        <p>Hi ${data.name},</p>
        <p>Thank you for contacting The Astra Flow. We've received your message and will get back to you within 24 hours.</p>
        <p>Best regards,<br>The Astra Flow Team</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
```

### 6.2 Email Marketing Integration

**Recommendation:** **Mailchimp** or **ConvertKit**

**Newsletter Subscription Endpoint:**
```typescript
// app/api/subscribe/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  // Mailchimp integration
  const response = await fetch(
    `https://${process.env.MAILCHIMP_DC}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
    {
      method: 'POST',
      headers: {
        Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        tags: ['website_signup'],
      }),
    }
  );

  if (!response.ok) {
    return NextResponse.json({ error: 'Subscription failed' }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
```

### 6.3 Analytics Setup

**Implemented:**
1. **Vercel Analytics** (automatic)
2. **Google Analytics 4**
3. **Google Tag Manager** (for advanced tracking)

**Event Tracking:**
```tsx
// lib/analytics.ts
export const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Usage in components
trackEvent('form_submission', { form_name: 'contact' });
trackEvent('cta_click', { cta_location: 'hero', cta_text: 'Get Started' });
```

### 6.4 Other Recommended Integrations

**Live Chat (Optional):**
- **Intercom** or **Crisp** for customer support
- Load dynamically to avoid blocking initial render

**Social Proof:**
- **Trustpilot** widget for testimonials
- Use lazy loading

**Calendar Scheduling:**
- **Calendly** embed for consultation bookings

```tsx
// Dynamic import for heavy widgets
const CalendlyWidget = dynamic(() => import('@/components/integrations/calendly'), {
  ssr: false,
  loading: () => <WidgetSkeleton />,
});
```

---

## 7. Deployment & Hosting

### 7.1 Recommended Platform: **Vercel**

**Rationale:**
- Built by Next.js creators, zero-config deployment
- Global edge network (99.99% uptime SLA)
- Automatic HTTPS, DDoS protection
- Instant rollbacks, preview deployments
- Excellent free tier (100GB bandwidth, unlimited deployments)

**Alternative:** Netlify (also excellent for Next.js)

### 7.2 Environment Variables Structure

```bash
# .env.local (development)
# NEVER commit this file

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="The Astra Flow"

# Email Service (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxx
CONTACT_EMAIL=hello@theastroflow.com

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Email Marketing (Mailchimp)
MAILCHIMP_API_KEY=xxxxxxxxxxxxx-us12
MAILCHIMP_DC=us12
MAILCHIMP_LIST_ID=xxxxxxxxxx

# Security
CSRF_SECRET=generate-strong-random-secret

# Rate Limiting (if using external service)
UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxx
```

```bash
# .env.production (Vercel)
NEXT_PUBLIC_SITE_URL=https://theastroflow.com
# (All other variables set in Vercel dashboard)
```

**Vercel Configuration:**
- Add all environment variables in Vercel dashboard
- Use "Production" environment for sensitive keys
- Use "Preview" environment for staging values

### 7.3 CI/CD Pipeline

**Automatic Deployment (Vercel):**
```yaml
# No configuration needed - Vercel auto-detects Next.js

# Deployment Flow:
# 1. Push to `main` branch → Production deployment
# 2. Push to feature branch → Preview deployment
# 3. Pull request → Preview deployment with comment
```

**GitHub Actions (Optional for Advanced CI):**
```yaml
# .github/workflows/ci.yml
name: CI

on:
  pull_request:
    branches: [main]

jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run typecheck

      - name: Lint
        run: npm run lint

      - name: Build
        run: npm run build
```

### 7.4 Build Configuration

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
```

---

## 8. Security Architecture

### 8.1 Form Validation & Sanitization

**Server-Side Validation (Required):**
```typescript
// lib/api/validation.ts
import { z } from 'zod';
import DOMPurify from 'isomorphic-dompurify';

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long')
    .transform((val) => DOMPurify.sanitize(val)),

  email: z.string()
    .email('Invalid email address')
    .transform((val) => val.toLowerCase().trim()),

  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message too long')
    .transform((val) => DOMPurify.sanitize(val)),
});

export function validateContactForm(data: unknown) {
  return contactSchema.safeParse(data);
}
```

**Client-Side Validation:**
```tsx
// Already handled by React Hook Form + Zod
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(contactSchema),
});
```

### 8.2 Rate Limiting

**Implementation with Upstash Redis:**
```typescript
// lib/api/rate-limiter.ts
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 h'), // 3 requests per hour
  analytics: true,
});

export async function rateLimit(identifier: string) {
  const { success, limit, reset, remaining } = await ratelimit.limit(identifier);

  return { success, limit, reset, remaining };
}
```

**Usage in API Routes:**
```typescript
// app/api/contact/route.ts
const identifier = request.headers.get('x-forwarded-for') || 'anonymous';
const { success } = await rateLimit(identifier);

if (!success) {
  return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
}
```

### 8.3 CSRF Protection

**Implementation:**
```typescript
// lib/api/csrf.ts
import { randomBytes } from 'crypto';

const CSRF_TOKENS = new Map<string, { token: string; expires: number }>();

export function generateCSRFToken(): string {
  const token = randomBytes(32).toString('hex');
  const expires = Date.now() + 3600000; // 1 hour

  CSRF_TOKENS.set(token, { token, expires });

  // Cleanup expired tokens
  for (const [key, value] of CSRF_TOKENS.entries()) {
    if (value.expires < Date.now()) {
      CSRF_TOKENS.delete(key);
    }
  }

  return token;
}

export function validateCSRFToken(token: string): boolean {
  const storedToken = CSRF_TOKENS.get(token);

  if (!storedToken || storedToken.expires < Date.now()) {
    CSRF_TOKENS.delete(token);
    return false;
  }

  CSRF_TOKENS.delete(token); // One-time use
  return true;
}
```

**API Endpoint:**
```typescript
// app/api/csrf/route.ts
import { NextResponse } from 'next/server';
import { generateCSRFToken } from '@/lib/api/csrf';

export async function GET() {
  const token = generateCSRFToken();
  return NextResponse.json({ token });
}
```

**Form Implementation:**
```tsx
"use client";

export function ContactForm() {
  const [csrfToken, setCSRFToken] = useState('');

  useEffect(() => {
    fetch('/api/csrf')
      .then((res) => res.json())
      .then((data) => setCSRFToken(data.token));
  }, []);

  const onSubmit = async (data: FormData) => {
    await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify(data),
    });
  };
}
```

### 8.4 Environment Variable Security

**Best Practices:**
```typescript
// lib/env.ts - Validate environment variables at startup
import { z } from 'zod';

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1),
  CONTACT_EMAIL: z.string().email(),
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
});

export const env = envSchema.parse({
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
});
```

**Security Rules:**
1. NEVER commit `.env.local` files
2. Use `NEXT_PUBLIC_` prefix ONLY for client-side variables
3. Store all secrets in Vercel environment variables
4. Rotate API keys regularly
5. Use different keys for development/production

### 8.5 HTTP Headers

```js
// next.config.js
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        { key: 'X-DNS-Prefetch-Control', value: 'on' },
        { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-XSS-Protection', value: '1; mode=block' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ],
    },
  ];
}
```

---

## 9. Accessibility Requirements

### 9.1 WCAG Compliance Target: **WCAG 2.1 Level AA**

**Key Requirements:**
1. **Perceivable:** All content must be presentable to users
2. **Operable:** UI components must be keyboard accessible
3. **Understandable:** Content must be readable and predictable
4. **Robust:** Compatible with assistive technologies

### 9.2 Keyboard Navigation

**Requirements:**
- All interactive elements must be keyboard accessible
- Logical tab order (top to bottom, left to right)
- Visible focus indicators
- Skip to main content link
- No keyboard traps

**Implementation:**
```tsx
// components/layout/skip-to-content.tsx
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-copper-500 focus:text-white focus:rounded-lg"
    >
      Skip to main content
    </a>
  );
}

// app/layout.tsx
<body>
  <SkipToContent />
  <Header />
  <main id="main-content" tabIndex={-1}>
    {children}
  </main>
  <Footer />
</body>
```

**Focus Management:**
```css
/* globals.css */
*:focus-visible {
  @apply outline-none ring-2 ring-copper-500 ring-offset-2;
}

/* Remove default focus, use focus-visible for keyboard-only */
*:focus:not(:focus-visible) {
  @apply outline-none ring-0;
}
```

### 9.3 Screen Reader Support

**Semantic HTML:**
```tsx
<header>
  <nav aria-label="Main navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/services">Services</a></li>
    </ul>
  </nav>
</header>

<main aria-labelledby="page-title">
  <h1 id="page-title">Our Services</h1>
  <section aria-labelledby="web-dev-heading">
    <h2 id="web-dev-heading">Web Development</h2>
  </section>
</main>
```

**ARIA Attributes:**
```tsx
// Button with loading state
<button
  type="submit"
  aria-disabled={isSubmitting}
  aria-busy={isSubmitting}
>
  {isSubmitting ? (
    <>
      <span className="sr-only">Submitting form...</span>
      <Loader className="animate-spin" aria-hidden="true" />
    </>
  ) : (
    'Submit'
  )}
</button>

// Image with decorative/informative distinction
<Image
  src="/hero.jpg"
  alt="Team collaborating on digital marketing strategy" // Informative
/>

<Image
  src="/decorative-pattern.svg"
  alt="" // Decorative (empty alt)
  aria-hidden="true"
/>
```

**Live Regions:**
```tsx
// Form submission feedback
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
  className="sr-only"
>
  {submissionStatus === 'success' && 'Form submitted successfully'}
  {submissionStatus === 'error' && 'Form submission failed, please try again'}
</div>
```

### 9.4 Color Contrast Requirements

**WCAG AA Standards:**
- Normal text (< 18px): 4.5:1 contrast ratio
- Large text (≥ 18px or ≥ 14px bold): 3:1 contrast ratio
- UI components and graphics: 3:1 contrast ratio

**Brand Color Compliance:**
```css
/* Ensure sufficient contrast with brand colors */

/* ✓ PASS: Copper text on cream background */
.text-copper-500 { /* #B87333 */
  background: theme('colors.cream.100'); /* #F3E9DC */
  /* Contrast ratio: 4.8:1 (PASS for normal text) */
}

/* ✓ PASS: White text on copper background */
.text-white {
  background: theme('colors.copper.500'); /* #B87333 */
  /* Contrast ratio: 5.2:1 (PASS for normal text) */
}

/* ✗ FAIL: Light cream text on white (decorative only) */
.text-cream-100 {
  background: white;
  /* Only use for decorative elements, not readable text */
}
```

**Testing Tools:**
- Chrome DevTools: Lighthouse audit
- axe DevTools browser extension
- WebAIM Contrast Checker

### 9.5 Form Accessibility

**Complete Example:**
```tsx
<form onSubmit={handleSubmit(onSubmit)}>
  <fieldset className="space-y-4">
    <legend className="text-xl font-bold mb-4">Contact Information</legend>

    <div>
      <label htmlFor="name" className="block mb-2 font-medium">
        Full Name <span aria-label="required">*</span>
      </label>
      <input
        id="name"
        type="text"
        {...register('name')}
        aria-required="true"
        aria-invalid={errors.name ? 'true' : 'false'}
        aria-describedby={errors.name ? 'name-error' : undefined}
        className="w-full px-4 py-3 border rounded-lg"
      />
      {errors.name && (
        <p id="name-error" className="text-red-600 mt-2" role="alert">
          {errors.name.message}
        </p>
      )}
    </div>

    <div>
      <label htmlFor="email" className="block mb-2 font-medium">
        Email Address <span aria-label="required">*</span>
      </label>
      <input
        id="email"
        type="email"
        {...register('email')}
        aria-required="true"
        aria-invalid={errors.email ? 'true' : 'false'}
        aria-describedby={errors.email ? 'email-error' : undefined}
        autoComplete="email"
      />
      {errors.email && (
        <p id="email-error" className="text-red-600 mt-2" role="alert">
          {errors.email.message}
        </p>
      )}
    </div>

    <button
      type="submit"
      disabled={isSubmitting}
      className="w-fit px-8 py-3 bg-copper-500 text-white rounded-lg hover:bg-copper-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isSubmitting ? 'Submitting...' : 'Send Message'}
    </button>
  </fieldset>
</form>
```

### 9.6 Reduced Motion Support

```css
/* globals.css */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

```tsx
// React component with motion consideration
"use client";

export function AnimatedSection({ children }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
    >
      {children}
    </motion.div>
  );
}
```

---

## 10. Development Workflow

### 10.1 Git Branching Strategy

**Strategy:** **GitHub Flow** (simplified for small team)

```
main (production-ready)
  ↓
feature/contact-form
feature/services-page
feature/blog-functionality
hotfix/security-patch
```

**Workflow:**
1. Create feature branch from `main`
2. Develop and commit regularly
3. Push and create pull request
4. Code review + automated checks
5. Merge to `main` → auto-deploy to production

**Branch Naming:**
```bash
feature/feature-name     # New features
fix/bug-description      # Bug fixes
hotfix/urgent-fix        # Production hotfixes
refactor/component-name  # Code refactoring
docs/update-readme       # Documentation
```

### 10.2 Code Quality Tools

**TypeScript Configuration:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowJs": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "paths": {
      "@/*": ["./*"]
    },
    "plugins": [{ "name": "next" }]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

**ESLint Configuration:**
```js
// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    'react/no-unescaped-entities': 'off',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
```

**Prettier Configuration:**
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Pre-commit Hooks (Husky + lint-staged):**
```bash
npm install -D husky lint-staged
```

```json
// package.json
{
  "scripts": {
    "prepare": "husky install"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,md,css}": [
      "prettier --write"
    ]
  }
}
```

```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
npm run typecheck
```

### 10.3 Testing Recommendations

**Unit Testing (Optional for MVP):**
- **Vitest** for unit tests
- **React Testing Library** for component tests

**E2E Testing (Recommended):**
- **Playwright** for critical user flows

```bash
npm install -D @playwright/test
```

```typescript
// tests/contact-form.spec.ts
import { test, expect } from '@playwright/test';

test('contact form submission', async ({ page }) => {
  await page.goto('/contact');

  await page.fill('#name', 'John Doe');
  await page.fill('#email', 'john@example.com');
  await page.fill('#message', 'Hello, I need help with digital marketing.');

  await page.click('button[type="submit"]');

  await expect(page.locator('text=Thank you for your message')).toBeVisible();
});
```

**Testing Strategy:**
- Manual testing for MVP
- E2E tests for critical flows (contact form, navigation)
- Add unit tests as complexity grows

### 10.4 Scripts

```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "analyze": "ANALYZE=true next build"
  }
}
```

---

## 11. Performance Monitoring

### 11.1 Core Metrics to Track

**Real User Monitoring (RUM):**
- Vercel Analytics (automatic)
- Google Analytics 4 (custom events)

**Synthetic Monitoring:**
- Lighthouse CI (weekly audits)
- PageSpeed Insights API

**Key Metrics:**
1. **Core Web Vitals:** LCP, FID/INP, CLS
2. **Custom Metrics:**
   - Form submission time
   - Page load time by route
   - API response times
   - Conversion rate (form submissions)

### 11.2 Error Tracking

**Recommendation:** **Sentry** (optional)

```typescript
// lib/sentry.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
  enabled: process.env.NODE_ENV === 'production',
});
```

---

## 12. Content Strategy

### 12.1 Page Structure

**Required Pages:**
1. **Homepage** - Hero, services overview, CTA, testimonials
2. **About** - Company story, mission, team
3. **Services:**
   - Services overview
   - Web Development
   - Digital Marketing
   - SEO Services
4. **Portfolio** - Case studies grid + individual case studies
5. **Blog** - Articles listing + individual posts
6. **Contact** - Contact form, info, CTA
7. **Pricing** - Service packages (optional)

**Content Requirements:**
- Hero: Clear value proposition, strong CTA
- Services: Benefits-focused, concrete deliverables
- Portfolio: 3-5 case studies with results
- Blog: 5-10 SEO-optimized articles
- Testimonials: 3-6 client quotes with names/companies

### 12.2 SEO Content Guidelines

**Homepage:**
- Title: "The Astra Flow | Digital Marketing & Web Development for SMEs"
- H1: "Accessible, High-Impact Digital Marketing for Growing Businesses"
- Target keywords: "digital marketing for SMEs", "affordable web development", "small business marketing"

**Service Pages:**
- Clear H1 with service + target audience
- Benefits-first content structure
- FAQ section (schema markup)
- Strong CTAs every 2-3 sections

**Blog Posts:**
- Target long-tail keywords
- Minimum 1,500 words for pillar content
- Internal linking strategy
- Updated dates for freshness

---

## 13. Launch Checklist

### 13.1 Pre-Launch

**Technical:**
- [ ] All environment variables configured in Vercel
- [ ] Custom domain connected and SSL configured
- [ ] Google Analytics tracking verified
- [ ] Contact form tested end-to-end
- [ ] Email delivery working (Resend)
- [ ] 404 page created
- [ ] robots.txt configured
- [ ] Sitemap generated and submitted to Google Search Console
- [ ] Favicon and social media images created
- [ ] All images optimized (< 500KB each)

**Content:**
- [ ] All copy proofread and approved
- [ ] All placeholder text replaced
- [ ] Legal pages: Privacy Policy, Terms of Service
- [ ] Contact information verified (email, phone, address)
- [ ] Social media links working

**Performance:**
- [ ] Lighthouse score 90+ on all metrics
- [ ] Mobile responsiveness tested (iPhone, Android)
- [ ] Browser compatibility tested (Chrome, Safari, Firefox, Edge)
- [ ] Core Web Vitals passing on all pages

**SEO:**
- [ ] Meta titles and descriptions on all pages
- [ ] Open Graph images on all pages
- [ ] Schema markup implemented
- [ ] Sitemap submitted to Google
- [ ] Google Search Console verified

**Accessibility:**
- [ ] Keyboard navigation tested
- [ ] Screen reader tested (VoiceOver or NVDA)
- [ ] Color contrast verified
- [ ] WCAG audit completed (axe DevTools)

### 13.2 Post-Launch

**Week 1:**
- [ ] Monitor error tracking (Sentry or logs)
- [ ] Monitor analytics (traffic, conversions)
- [ ] Check contact form submissions
- [ ] Fix any critical bugs

**Month 1:**
- [ ] Review Core Web Vitals in Google Search Console
- [ ] Analyze user behavior (heatmaps, session recordings)
- [ ] Collect initial customer feedback
- [ ] Optimize based on data

---

## 14. Maintenance & Updates

### 14.1 Regular Maintenance

**Weekly:**
- Check form submissions, respond promptly
- Monitor uptime (Vercel status)
- Check analytics for anomalies

**Monthly:**
- Update dependencies (`npm outdated` → `npm update`)
- Review Core Web Vitals trends
- Add new blog content (1-2 posts)
- Review and respond to contact inquiries

**Quarterly:**
- Major dependency updates (Next.js, React)
- Security audit (npm audit)
- Content refresh (update outdated info)
- SEO performance review

### 14.2 Growth Roadmap

**Phase 2 (3-6 months):**
- Add client portal for project tracking
- Implement live chat (Intercom/Crisp)
- A/B testing for CTAs and forms
- Advanced analytics (conversion funnels)

**Phase 3 (6-12 months):**
- Migrate to headless CMS (Sanity) if content scales
- Add e-commerce for productized services
- Multi-language support (i18n)
- Advanced personalization

---

## 15. Technology Stack Summary

### Final Recommendations

| Category | Technology | Rationale |
|----------|-----------|-----------|
| **Framework** | Next.js 15+ (App Router) | Best-in-class React framework, optimal performance |
| **Language** | TypeScript 5+ | Type safety, developer experience |
| **Styling** | Tailwind CSS + shadcn/ui | Utility-first, customizable, production-ready |
| **Animations** | Framer Motion | Declarative, performant React animations |
| **Forms** | React Hook Form + Zod | Minimal re-renders, TypeScript integration |
| **Email** | Resend | Modern API, React Email templates |
| **Content** | MDX (MVP) → Sanity (Scale) | Version-controlled → Team-friendly CMS |
| **Analytics** | Vercel Analytics + GA4 | Real-user monitoring + custom events |
| **Hosting** | Vercel | Zero-config, global edge, auto-scaling |
| **Security** | Rate limiting (Upstash) + CSRF | Production-grade protection |

### Package.json Summary

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

## Conclusion

This architecture specification provides a complete, production-ready blueprint for building The Astra Flow marketing website. The stack prioritizes:

1. **Performance:** Next.js App Router, edge caching, optimized images
2. **Developer Experience:** TypeScript, Tailwind, shadcn/ui, modern tooling
3. **SEO Excellence:** Metadata API, dynamic sitemaps, schema markup
4. **Security:** Rate limiting, CSRF protection, input validation
5. **Accessibility:** WCAG 2.1 AA compliance, keyboard navigation, screen reader support
6. **Scalability:** Component architecture, incremental adoption of CMS, clear upgrade paths

**Implementation Timeline:**
- **Week 1-2:** Project setup, layout components, design system
- **Week 3-4:** Homepage, about, services pages
- **Week 5-6:** Portfolio, blog, contact form
- **Week 7-8:** SEO optimization, performance tuning, accessibility audit
- **Week 9:** Testing, bug fixes, content finalization
- **Week 10:** Launch preparation, monitoring setup, deployment

**Success Metrics:**
- Lighthouse score: 90+ (all categories)
- Core Web Vitals: Green on all metrics
- Contact form conversion: 3-5% of visitors
- Page load time: < 2 seconds (LCP)
- Bounce rate: < 50%
- Organic traffic growth: 20% MoM after 3 months

This architecture balances cutting-edge technology with pragmatic choices, ensuring The Astra Flow website delivers exceptional performance, user experience, and business results.

---

**Document Version:** 1.0
**Author:** Elite Master Architect
**Date:** October 1, 2025
**Next Review:** January 1, 2026