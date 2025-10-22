# The Astra Flow - Comprehensive Style Guide

> Complete design system documentation for The Astra Flow website. This guide serves as the single source of truth for all design decisions, patterns, and implementations.

**Last Updated:** October 6, 2025
**Version:** 1.0.0

---

## Table of Contents

1. [Color System](#color-system)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Component Styling](#component-styling)
5. [Animations & Transitions](#animations--transitions)
6. [Backgrounds & Effects](#backgrounds--effects)
7. [Border Radius](#border-radius)
8. [Shadows](#shadows)
9. [Design Patterns](#design-patterns)

---

## Color System

### Brand Colors

#### Primary: Copper Palette
The copper palette is the primary brand color, representing warmth, luxury, and premium quality.

```css
--color-copper-50: #FDF8F5   /* Lightest - subtle backgrounds */
--color-copper-100: #F9EEE7  /* Very light - highlights */
--color-copper-200: #F0D9C7  /* Light - soft accents */
--color-copper-300: #E7C4A7  /* Medium-light */
--color-copper-400: #D9A977  /* Medium */
--color-copper-500: #B87333  /* PRIMARY - main brand color */
--color-copper-600: #A66529  /* Medium-dark - hover states */
--color-copper-700: #945720  /* Dark */
--color-copper-800: #824918  /* Very dark */
--color-copper-900: #703B10  /* Darkest - deep accents */
```

**Primary Copper (500):** `#B87333` - `hsl(28 65% 45%)`
- Used for: Primary buttons, links, icons, accents, hover states

#### Secondary: Cream Palette
The cream palette provides elegance and sophistication, creating a luxurious foundation.

```css
--color-cream-50: #FDFCFA    /* Pure white alternative */
--color-cream-100: #F9F5EF   /* Very light cream */
--color-cream-200: #F3E9DC   /* DEFAULT - main cream color */
--color-cream-300: #ECD9C4   /* Medium-light */
--color-cream-400: #E5C9AC   /* Medium */
--color-cream-500: #DEB994   /* Medium-dark */
--color-cream-600: #D7A97C   /* Dark */
--color-cream-700: #C99660   /* Very dark */
--color-cream-800: #B87333   /* Merges with copper */
--color-cream-900: #A66529   /* Darkest cream */
```

**Default Cream (200):** `#F3E9DC`
- Used for: Backgrounds, cards, footer, secondary elements

### Semantic Colors

#### Background Colors
```css
/* Light Mode */
--background: hsl(0 0% 100%)           /* Pure white */
--foreground: hsl(0 0% 3.9%)           /* Near black text */
--card: hsl(0 0% 100%)                 /* White cards */
--card-foreground: hsl(0 0% 3.9%)     /* Card text */

/* Dark Mode */
--background: hsl(0 0% 3.9%)           /* Near black */
--foreground: hsl(0 0% 98%)            /* White text */
--card: hsl(0 0% 3.9%)                 /* Dark cards */
--card-foreground: hsl(0 0% 98%)      /* Light card text */
```

#### Text Colors
```css
--foreground: hsl(0 0% 3.9%)           /* Primary text color */
--muted-foreground: hsl(0 0% 45.1%)   /* Secondary/muted text */
--light-gray: #D3D3D3                  /* Light gray text */
--near-black: #050505                  /* Near black text */
```

**Usage:**
- `text-foreground` - Primary body text
- `text-muted-foreground` - Secondary descriptions, labels
- `text-near-black` - High-contrast headings
- `text-near-black/70` - 70% opacity for subheadings
- `text-light-gray` - Light text on dark backgrounds

#### Interactive Colors
```css
/* Primary (Copper) */
--primary: hsl(28 65% 45%)             /* Light mode */
--primary: hsl(28 65% 55%)             /* Dark mode */
--primary-foreground: hsl(0 0% 98%)   /* Text on primary */

/* Secondary (Cream) */
--secondary: hsl(30 20% 90%)           /* Light mode */
--secondary: hsl(0 0% 14.9%)           /* Dark mode */
--secondary-foreground: hsl(0 0% 9%)  /* Text on secondary */

/* Accent (Same as Primary) */
--accent: hsl(28 65% 45%)              /* Light mode */
--accent-foreground: hsl(0 0% 9%)
```

#### State Colors
```css
/* Destructive/Error */
--destructive: hsl(0 84.2% 60.2%)      /* Light mode - red */
--destructive: hsl(0 62.8% 30.6%)      /* Dark mode - darker red */
--destructive-foreground: hsl(0 0% 98%)

/* Borders & Inputs */
--border: hsl(0 0% 89.8%)              /* Light mode */
--border: hsl(0 0% 14.9%)              /* Dark mode */
--input: hsl(0 0% 89.8%)               /* Same as border */
--ring: hsl(28 65% 45%)                /* Focus ring - copper */
```

### Color Usage Patterns

#### Text on Backgrounds
```css
/* Light backgrounds */
text-near-black                        /* Main headings */
text-near-black/70                     /* Subheadings */
text-gray-600 or text-gray-700        /* Body text */
text-muted-foreground                  /* Muted text */

/* Dark backgrounds */
text-cream-50 or text-cream-200       /* Main headings */
text-cream-100 or text-cream-100/80   /* Body text */
text-light-gray                        /* Secondary text */
text-light-gray/70                     /* Muted text */
```

#### Interactive Elements
```css
/* Links & Buttons */
text-copper-500 hover:text-copper-600  /* Links */
text-copper-600 hover:text-copper-700  /* Secondary links */
bg-copper-500 hover:bg-copper-600      /* Primary buttons */
border-copper-500 text-copper-600      /* Secondary buttons */

/* Focus States */
focus-visible:ring-2 ring-copper-500   /* Focus rings */
focus:border-copper-500/50             /* Input focus */
```

---

## Typography

### Font Families

#### Primary: Montserrat (Sans-Serif)
```css
font-family: var(--font-montserrat), system-ui, sans-serif;
```
- **Usage:** Body text, UI elements, buttons, labels, navigation
- **Loading:** Google Fonts with `display: swap`
- **Utility:** `font-sans` or `font-montserrat`

#### Secondary: Playfair Display (Serif)
```css
font-family: var(--font-playfair), Georgia, serif;
```
- **Usage:** Headings (H1-H3), hero text, section titles, luxury emphasis
- **Loading:** Google Fonts with `display: swap`
- **Utility:** `font-serif` or `font-playfair`

### Font Sizes & Line Heights

```css
/* Base font size is larger than typical - 18px for better readability */

text-xs:     0.75rem (12px) | line-height: 1rem (16px)
text-sm:     0.875rem (14px) | line-height: 1.25rem (20px)
text-base:   1.125rem (18px) | line-height: 1.75rem (28px)  /* Default */
text-lg:     1.25rem (20px) | line-height: 1.875rem (30px)
text-xl:     1.5rem (24px) | line-height: 2rem (32px)
text-2xl:    2rem (32px) | line-height: 2.5rem (40px)
text-3xl:    3rem (48px) | line-height: 3.5rem (56px)      /* H1 */
text-4xl:    4.5rem (72px) | line-height: 5rem (80px)      /* Hero */
```

**Responsive Font Sizes (Mobile to Desktop):**
```css
/* Hero Headlines */
text-4xl sm:text-5xl lg:text-6xl xl:text-7xl

/* Section Headlines (H1) */
text-3xl sm:text-4xl lg:text-5xl xl:text-6xl

/* Section Headlines (H2) */
text-2xl sm:text-3xl lg:text-4xl

/* Card Headlines (H3) */
text-xl sm:text-2xl lg:text-3xl

/* Body Text */
text-base sm:text-lg
```

### Font Weights

```css
font-thin:        100  /* Not used */
font-extralight:  200  /* Not used */
font-light:       300  /* Body text, descriptions */
font-normal:      400  /* Default */
font-medium:      500  /* Buttons, labels, emphasized text */
font-semibold:    600  /* Subheadings, strong emphasis */
font-bold:        700  /* Rarely used */
```

**Common Patterns:**
- **Headings (Playfair):** `font-light` (300) - Creates elegant, airy feel
- **Body Text (Montserrat):** `font-light` (300) - Refined, readable
- **Buttons/CTAs:** `font-medium` (500) - Clear hierarchy
- **Labels/Small Text:** `font-medium` or `font-semibold` - Improves legibility

### Letter Spacing (Tracking)

```css
tracking-tighter:  -0.05em   /* Not used */
tracking-tight:    -0.025em  /* Headings */
tracking-normal:   0         /* Default */
tracking-wide:     0.025em   /* Body text */
tracking-wider:    0.05em    /* Not used */
tracking-widest:   0.1em     /* Not used */

/* Custom tracking for specific elements */
tracking-[0.15em]: 0.15em    /* Buttons, CTAs */
tracking-[0.2em]:  0.2em     /* Overlines */
tracking-[0.25em]: 0.25em    /* Section overlines */
tracking-[0.3em]:  0.3em     /* Uppercase labels */
```

**Common Patterns:**
```css
/* Section Overlines */
text-sm font-medium tracking-[0.25em] uppercase

/* Buttons */
font-medium text-base tracking-wide

/* Body Text */
font-light tracking-wide leading-relaxed

/* Hero Headlines */
font-light font-playfair tracking-tight
```

### Text Styles & Patterns

#### Hero Headline
```css
text-4xl sm:text-5xl lg:text-6xl xl:text-7xl
font-light
font-playfair
text-near-black
tracking-tight
leading-[1.1]
```

#### Section Headline (H2)
```css
text-4xl sm:text-5xl lg:text-6xl
font-light
font-playfair
text-near-black
tracking-tight
```

#### Section Overline
```css
text-sm
font-medium
tracking-[0.25em]
uppercase
text-copper-500
```

#### Body Text
```css
text-base sm:text-lg
font-light
text-near-black/70
tracking-wide
leading-relaxed
```

#### Muted Description
```css
text-sm
font-light
text-muted-foreground
leading-relaxed
tracking-wide
```

#### Card Headline
```css
text-2xl sm:text-3xl lg:text-4xl
font-light
font-playfair
text-near-black
tracking-tight
leading-[1.2]
```

#### Button Text
```css
font-medium
text-base
tracking-wide
```

---

## Spacing & Layout

### Spacing Scale (8px Grid System)

```css
/* Custom spacing tokens */
xs:   0.5rem (8px)
sm:   1rem (16px)
md:   1.5rem (24px)
lg:   2rem (32px)
xl:   3rem (48px)
2xl:  4rem (64px)
3xl:  6rem (96px)
4xl:  8rem (128px)

/* Standard Tailwind spacing also available */
0:    0
1:    0.25rem (4px)
2:    0.5rem (8px)
3:    0.75rem (12px)
4:    1rem (16px)
6:    1.5rem (24px)
8:    2rem (32px)
10:   2.5rem (40px)
12:   3rem (48px)
16:   4rem (64px)
20:   5rem (80px)
24:   6rem (96px)
32:   8rem (128px)
```

### Section Spacing (Vertical Rhythm)

```css
/* Section Padding - Top/Bottom */
py-16 sm:py-24 md:py-32 lg:py-40     /* Standard section */
py-24 sm:py-32 lg:py-40              /* Large section */
py-12 sm:py-16 lg:py-20              /* Compact section */

/* Hero Section Padding */
pt-44 pb-24 sm:pt-40 sm:pb-24 md:pt-48 md:pb-32
```

**Common Patterns:**
```css
/* Main sections */
py-24 sm:py-32 lg:py-40

/* Compact sections */
py-16 sm:py-20 lg:py-24

/* Hero sections */
min-h-screen with pt-44 pb-24
```

### Container & Max Widths

```css
/* Main container */
max-w-[1400px]                    /* Global max width */
px-4 sm:px-6 lg:px-8             /* Responsive padding */

/* Content containers */
max-w-7xl                         /* 1280px - hero content */
max-w-3xl                         /* 768px - centered text */
max-w-2xl                         /* 672px - narrow content */

/* Full pattern */
container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]
```

### Grid Layouts

#### Two Column (Asymmetric)
```css
/* Two Pillars Section - 7/5 split */
grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12
lg:col-span-7    /* Custom Services - larger */
lg:col-span-5    /* WaaS - smaller */
```

#### Standard Grid
```css
/* 1-2-3-4 responsive grid */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8

/* 1-2-3 responsive grid */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8

/* 1-2 responsive grid */
grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-20
```

### Spacing Patterns

#### Card Padding
```css
p-10 sm:p-12 lg:p-14              /* Standard card */
p-12 sm:p-14 lg:p-16              /* Large card */
p-6 sm:p-8 lg:p-10                /* Compact card */
```

#### Form Spacing
```css
space-y-8                         /* Between form sections */
space-y-4 sm:space-y-6           /* Between form fields */
space-y-3.5                       /* Between list items */
```

#### Button Gaps
```css
gap-3                             /* Icon to text */
gap-4                             /* Between buttons */
```

---

## Component Styling

### Buttons

#### Primary Button (Copper)
```css
/* Base styles */
bg-copper-500
text-white
shadow-lg shadow-copper-500/10
px-10 py-4 min-h-[52px]
font-medium text-base
tracking-wide
transition-all duration-300 ease-out
rounded-none
w-fit

/* Hover states */
hover:bg-copper-600
hover:scale-[1.02]
hover:shadow-2xl hover:shadow-copper-500/25

/* Focus states */
focus-visible:outline-none
focus-visible:ring-2 focus-visible:ring-copper-500
focus-visible:ring-offset-4

/* Disabled states */
disabled:pointer-events-none disabled:opacity-50
```

#### Secondary Button (Outlined)
```css
border-2 border-copper-500
text-copper-600
px-10 py-4 min-h-[52px]
font-medium text-base
tracking-wide
transition-all duration-300 ease-out
rounded-none
w-fit

/* Hover */
hover:bg-copper-50
hover:scale-[1.02]

/* Focus */
focus-visible:outline-none
focus-visible:ring-2 focus-visible:ring-copper-500
focus-visible:ring-offset-4
```

#### Ghost Button (Link-style)
```css
relative
text-copper-600
px-10 py-4 min-h-[52px]
font-medium text-base
transition-all duration-300
rounded-none
w-fit

/* Animated underline */
hover:text-copper-700
after:absolute after:bottom-0 after:left-[25%] after:right-[25%]
after:h-[1px] after:bg-copper-500
after:scale-x-0 after:origin-left
after:transition-transform after:duration-300 after:ease-out
hover:after:scale-x-100

/* Focus */
focus-visible:outline-none
focus-visible:ring-2 focus-visible:ring-copper-500
focus-visible:ring-offset-2
```

#### Button Sizes
```css
/* Small */
size="sm": px-8 py-3.5 min-h-[44px]

/* Default */
size="default": px-10 py-4 min-h-[52px]

/* Large */
size="lg": px-12 py-5 min-h-[56px]
```

#### Dark Background Buttons
```css
/* Near-black button on dark backgrounds */
bg-near-black text-cream-50
hover:bg-near-black/90
```

### Form Elements

#### Input Fields
```css
/* Base styles */
h-14 w-full
bg-white/60 backdrop-blur-sm
px-5 py-4
text-base text-near-black font-light tracking-wide
border border-cream-300/50
transition-all duration-300 ease-out

/* Placeholder */
placeholder:text-near-black/40 placeholder:font-light

/* Focus */
focus:border-copper-500/50
focus-visible:outline-none
focus-visible:ring-2 focus-visible:ring-copper-500/20
focus-visible:ring-offset-0

/* Hover */
hover:border-copper-500/30

/* Disabled */
disabled:cursor-not-allowed disabled:opacity-50
```

#### Textarea
```css
/* Same as input, plus: */
min-h-[140px]
resize-none
```

#### Select Dropdown
```css
/* Same as input, plus: */
appearance-none
pr-12
cursor-pointer

/* Icon positioning */
<ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-near-black/40" />
```

#### Labels
```css
text-sm
font-medium
text-foreground
mb-2
tracking-wide
```

#### Error Messages
```css
text-destructive
text-sm
mt-1
```

### Cards

#### Light Card (WaaS Style)
```css
/* Container */
relative h-full
bg-gradient-to-br from-cream-100 via-cream-50 to-white
rounded-none
p-10 sm:p-12 lg:p-14
border border-cream-300/50
overflow-hidden
transition-all duration-700 ease-out
group

/* Hover effects */
hover:shadow-2xl hover:shadow-copper-500/5
hover:scale-[1.02]
hover:-translate-y-2
hover:border-copper-500/30

/* Glow overlay (absolute positioned) */
bg-gradient-to-br from-copper-500/0 to-copper-500/3
opacity-0 group-hover:opacity-100
transition-opacity duration-700

/* Accent line (absolute positioned) */
h-px w-24 bg-gradient-to-l from-copper-500 to-transparent
group-hover:w-full transition-all duration-1000
```

#### Dark Card (Custom Services Style)
```css
/* Container */
relative h-full
bg-gradient-to-br from-near-black via-near-black/95 to-near-black/90
rounded-none
p-12 sm:p-14 lg:p-16
overflow-hidden
transition-all duration-700 ease-out
group

/* Hover effects */
hover:shadow-2xl hover:shadow-copper-500/10
hover:scale-[1.02]
hover:-translate-y-2

/* Glow overlay */
bg-gradient-to-br from-copper-500/0 via-copper-500/0 to-copper-500/5
opacity-0 group-hover:opacity-100
transition-opacity duration-700

/* Accent line */
h-px w-32 bg-gradient-to-r from-copper-500 to-transparent
group-hover:w-full transition-all duration-1000
```

#### Card Icons
```css
/* Light background */
w-14 h-14
rounded-full
bg-white shadow-sm
flex items-center justify-center
group-hover:shadow-md transition-shadow duration-500

<Package className="w-7 h-7 text-copper-500" strokeWidth={1.5} />

/* Dark background */
w-16 h-16
rounded-full
bg-copper-500/10 backdrop-blur-sm
flex items-center justify-center
group-hover:bg-copper-500/20 transition-colors duration-500

<Compass className="w-8 h-8 text-copper-500" strokeWidth={1.5} />
```

#### Card Feature Lists
```css
/* Container */
space-y-3.5 sm:space-y-4

/* List item */
flex items-start gap-3.5 sm:gap-4

/* Bullet */
w-2 h-2 rounded-full bg-copper-500 mt-2 flex-shrink-0

/* Text */
text-sm font-light text-near-black/60 tracking-wide  /* Light card */
text-sm font-light text-cream-100/70 tracking-wide   /* Dark card */
```

### Navigation (Header)

#### Header Base
```css
/* Transparent state */
.header-base {
  transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
  will-change: background, backdrop-filter;
}

/* Scrolled state */
.header-scrolled {
  background: rgba(243, 233, 220, 0.85);
  backdrop-filter: blur(16px) saturate(200%);
  -webkit-backdrop-filter: blur(16px) saturate(200%);
  border-bottom: 1px solid rgba(139, 115, 85, 0.12);
  box-shadow:
    0 1px 0 0 rgba(255, 255, 255, 0.6) inset,
    0 4px 24px rgba(139, 115, 85, 0.06);
}
```

### Footer

```css
/* Container */
bg-cream-200
text-gray-700
py-12 lg:py-16

/* Links */
text-sm
text-gray-600
transition-colors
hover:text-copper-500

/* Section headings */
text-sm
font-semibold
uppercase
tracking-wider
text-gray-900
```

### Accordion

```css
/* Trigger */
flex flex-1 items-center justify-between
py-6
text-left
font-medium
transition-all
hover:text-copper-600
[&[data-state=open]>svg]:rotate-180

/* Icon */
<ChevronDown className="h-5 w-5 shrink-0 text-copper-500 transition-transform duration-300" />

/* Content */
overflow-hidden
text-sm
transition-all
data-[state=closed]:animate-accordion-up
data-[state=open]:animate-accordion-down
pb-6 pt-0
```

---

## Animations & Transitions

### Easing Functions

```javascript
// Luxury easing curves
elegantEase: [0.19, 0.91, 0.38, 0.98]      // Gentle, sophisticated
luxurySlowEase: [0.33, 0.82, 0.44, 0.99]   // Ultra-smooth deceleration
luxuryEase: [0.25, 0.46, 0.45, 0.94]       // Smooth deceleration
powerEase: [0.16, 1, 0.3, 1]               // Dramatic entrances
playfulEase: [0.34, 1.56, 0.64, 1]         // Slight overshoot
ultraSmoothEase: [0.25, 0.85, 0.35, 1.0]   // Ultra-smooth buttons
```

### Duration Standards

```javascript
duration-200: 200ms    // Instant feedback (hover, click)
duration-300: 300ms    // Quick transitions (buttons, links)
duration-500: 500ms    // Standard transitions (cards, modals)
duration-700: 700ms    // Smooth animations (card effects)
duration-1000: 1000ms  // Dramatic effects (accent lines)
```

### Common Animation Patterns

#### Fade In Up
```javascript
// Framer Motion variant
{
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: luxuryEase }
  }
}
```

#### Blur Escape
```javascript
{
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(12px)'
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.0, ease: elegantEase }
  }
}
```

#### Scale & Fade
```javascript
{
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: powerEase }
  }
}
```

#### 3D Card Entrance
```javascript
// Left entrance
{
  hidden: {
    opacity: 0,
    x: -100,
    scale: 0.95,
    rotateY: -15,
    filter: 'blur(8px)'
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.2, ease: powerEase }
  }
}
```

#### Stagger Container
```javascript
{
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}
```

### Hero Section Animations

```javascript
// 1. Headline - appears first
heroHeadline: {
  hidden: { opacity: 0, y: 40, filter: 'blur(12px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 1.0, delay: 0.2, ease: elegantEase }
  }
}

// 2. Subheadline - follows headline
heroSubheadline: {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: 1.7, ease: luxurySlowEase }
  }
}

// 3. CTA buttons - appear last
heroCTAItem: {
  hidden: { opacity: 0, y: 50, scale: 0.92, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    transition: { duration: 1.4, ease: ultraSmoothEase }
  }
}
```

### Hover Animations

#### Button Hover
```css
/* Scale on hover */
hover:scale-[1.02] transition-all duration-300

/* Icon translation */
group-hover:translate-x-1.5 group-hover:scale-110 transition-all duration-300

/* Shadow enhancement */
hover:shadow-2xl hover:shadow-copper-500/25
```

#### Card Hover
```css
/* Transform */
hover:scale-[1.02] hover:-translate-y-2
transition-all duration-700 ease-out

/* Shadow */
hover:shadow-2xl hover:shadow-copper-500/5

/* Border */
hover:border-copper-500/30
```

#### Link Hover
```css
/* Color change */
hover:text-copper-500 transition-colors duration-300

/* Animated underline */
after:absolute after:bottom-0 after:left-0 after:right-0
after:h-[1px] after:bg-copper-500
after:scale-x-0 after:origin-left
after:transition-transform after:duration-300
hover:after:scale-x-100
```

### Magnetic Button Effect

```javascript
// Spring configuration
springConfig = { damping: 20, stiffness: 300 }

// Mouse move tracking
onMouseMove: (e) => {
  const rect = ref.current.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  x.set((e.clientX - centerX) * strength);  // strength = 0.3
  y.set((e.clientY - centerY) * strength);
}

// Hover scale
whileHover={{ scale: 1.03 }}
whileTap={{ scale: 0.97 }}
transition={{ type: 'spring', stiffness: 400, damping: 25 }}
```

### Tailwind CSS Animations

```css
/* Built-in Tailwind animations */
animate-fade-in      /* fadeIn 0.6s ease-in-out */
animate-slide-up     /* slideUp 0.6s ease-out */
animate-slide-down   /* slideDown 0.6s ease-out */
animate-scale-in     /* scaleIn 0.3s ease-out */
animate-accordion-down  /* accordion-down 0.2s ease-out */
animate-accordion-up    /* accordion-up 0.2s ease-out */
```

### Scroll Animations

```javascript
// useInView hook from Framer Motion
const ref = useRef(null);
const isInView = useInView(ref, { once: true, amount: 0.2 });

// Apply animations when in view
animate={isInView ? "visible" : "hidden"}
```

### Reduced Motion Support

```javascript
// Check user preference
const prefersReducedMotion = usePrefersReducedMotion();

// Disable animations if preferred
initial={prefersReducedMotion ? false : "hidden"}
animate={prefersReducedMotion ? false : "visible"}
```

---

## Backgrounds & Effects

### Gradient Backgrounds

#### Dark Gradient Background
```css
bg-gradient-to-br from-near-black via-near-black/95 to-near-black/90
```

#### Light Gradient Background
```css
bg-gradient-to-br from-cream-100 via-cream-50 to-white
```

#### Copper Glow Overlay
```css
/* Positioned absolutely over content */
absolute inset-0
bg-gradient-to-br from-copper-500/0 to-copper-500/3
opacity-0 group-hover:opacity-100
transition-opacity duration-700
```

### Ambient Effects

#### Copper Glow (Positioned)
```css
/* Large glow blob */
absolute top-0 left-1/3
w-[600px] h-[600px]
bg-copper-500/10
rounded-full
blur-[150px]
pointer-events-none
```

#### Decorative Lines
```css
/* Horizontal divider */
absolute top-0 left-0 w-full h-px
bg-gradient-to-r from-transparent via-copper-500/30 to-transparent

/* Vertical line */
absolute left-0 top-0 h-full w-px
bg-gradient-to-b from-transparent via-copper-500/30 to-transparent
```

#### Animated Accent Lines
```css
/* Top accent line that grows on hover */
absolute top-0 right-0 h-px w-24
bg-gradient-to-l from-copper-500 to-transparent
group-hover:w-full
transition-all duration-1000
```

### LiquidEther Background

**Description:** Animated canvas background with floating gradient blobs in cream and copper colors.

**Colors Used:**
```javascript
colors = [
  { r: 249, g: 245, b: 239 },  // cream-100
  { r: 243, g: 233, b: 220 },  // cream-200
  { r: 184, g: 115, b: 51 },   // copper-500
  { r: 168, g: 95, b: 36 },    // copper-600
  { r: 253, g: 248, b: 245 },  // copper-50
]
```

**Usage:**
```jsx
<LiquidEther />
// Positioned fixed with -z-10
// Blur filter applied: filter: 'blur(40px)'
```

### Backdrop Effects

#### Glassmorphism
```css
bg-white/60 backdrop-blur-sm       /* Light glass */
bg-white/5 backdrop-blur-sm        /* Dark glass */
bg-cream-200/85 backdrop-blur-sm   /* Cream glass */
```

#### Header Backdrop
```css
backdrop-filter: blur(16px) saturate(200%);
-webkit-backdrop-filter: blur(16px) saturate(200%);
background: rgba(243, 233, 220, 0.85);
```

---

## Border Radius

### Global Border Radius Setting

```css
--radius: 0  /* No border radius - sharp corners throughout */
```

**All components use sharp corners (rounded-none or no border-radius) for a modern, clean aesthetic.**

```css
rounded-none        /* 0px - used everywhere */
rounded-sm          /* calc(var(--radius) - 4px) = 0 */
rounded-md          /* calc(var(--radius) - 2px) = 0 */
rounded-lg          /* var(--radius) = 0 */

/* Exception: Only circular elements use rounding */
rounded-full        /* For icon containers, avatars, bullets */
```

### Circular Elements

```css
/* Bullets/Dots */
w-2 h-2 rounded-full bg-copper-500

/* Icon containers */
w-14 h-14 rounded-full bg-white shadow-sm

/* Avatar/Profile images */
rounded-full
```

---

## Shadows

### Shadow Scale

```css
/* Light shadows */
shadow-sm            /* 0 1px 2px 0 rgb(0 0 0 / 0.05) */
shadow               /* 0 1px 3px 0 rgb(0 0 0 / 0.1) */
shadow-md            /* 0 4px 6px -1px rgb(0 0 0 / 0.1) */

/* Medium shadows */
shadow-lg            /* Used on primary buttons */
shadow-xl            /* 0 20px 25px -5px rgb(0 0 0 / 0.1) */

/* Heavy shadows */
shadow-2xl           /* Used on hover states */

/* Colored shadows - Copper */
shadow-lg shadow-copper-500/10       /* Button default */
shadow-2xl shadow-copper-500/25      /* Button hover */
shadow-2xl shadow-copper-500/5       /* Light card hover */
shadow-2xl shadow-copper-500/10      /* Dark card hover */
```

### Shadow Patterns

#### Button Shadow
```css
/* Default */
shadow-lg shadow-copper-500/10

/* Hover */
hover:shadow-2xl hover:shadow-copper-500/25
```

#### Card Shadow
```css
/* Default - no shadow */

/* Hover */
hover:shadow-2xl hover:shadow-copper-500/5   /* Light cards */
hover:shadow-2xl hover:shadow-copper-500/10  /* Dark cards */
```

#### Inset Shadow (Header)
```css
box-shadow:
  0 1px 0 0 rgba(255, 255, 255, 0.6) inset,
  0 4px 24px rgba(139, 115, 85, 0.06);
```

---

## Design Patterns

### Section Structure

```jsx
<section className="relative bg-white py-24 sm:py-32 lg:py-40">
  {/* Decorative elements (absolute positioned) */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-copper-500/30 to-transparent" />

  {/* Container */}
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1400px]">
    {/* Section Header */}
    <div className="text-center mb-20">
      <p className="text-sm font-medium tracking-[0.25em] uppercase text-copper-500 mb-6">
        Overline Text
      </p>
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light font-playfair text-near-black tracking-tight">
        Section Headline
      </h2>
    </div>

    {/* Content */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Content here */}
    </div>
  </div>
</section>
```

### Hero Section Pattern

```jsx
<main className="relative h-screen">
  <LiquidEther />
  <div className="mx-auto max-w-7xl px-4 pt-44 pb-24 sm:px-6 lg:px-8">
    <div className="text-center">
      <motion.h1
        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light font-playfair text-near-black tracking-tight leading-[1.1] mb-8"
        variants={heroHeadline}
      >
        Hero Headline
        <span className="block mt-3 text-copper-500">
          Accented Line
        </span>
      </motion.h1>

      <motion.p
        className="mx-auto max-w-3xl text-lg sm:text-xl text-near-black/70 font-light tracking-wide leading-relaxed mb-12"
        variants={heroSubheadline}
      >
        Hero description text
      </motion.p>

      {/* CTA Buttons */}
    </div>
  </div>
</main>
```

### Card Grid Pattern

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {items.map((item, index) => (
    <motion.div
      key={index}
      className="group relative bg-gradient-to-br from-cream-100 via-cream-50 to-white rounded-none p-10 border border-cream-300/50 transition-all duration-700 hover:shadow-2xl hover:shadow-copper-500/5 hover:scale-[1.02] hover:-translate-y-2"
      variants={cardEntrance}
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-full bg-white shadow-sm flex items-center justify-center mb-6">
        <Icon className="w-7 h-7 text-copper-500" />
      </div>

      {/* Content */}
      <h3 className="text-2xl font-light font-playfair text-near-black mb-4">
        {item.title}
      </h3>
      <p className="text-base font-light text-near-black/70 leading-relaxed">
        {item.description}
      </p>
    </motion.div>
  ))}
</div>
```

### CTA Pattern

```jsx
<Link
  href="/path"
  className="inline-flex items-center gap-3 px-10 py-4 bg-copper-500 text-cream-50 font-medium text-base tracking-wide hover:bg-copper-600 transition-all duration-300 group/btn"
>
  <span>Button Text</span>
  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
</Link>
```

### Form Pattern

```jsx
<form className="space-y-4 sm:space-y-6">
  <div>
    <label className="block text-sm font-medium text-cream-200 mb-2 tracking-wide">
      Label Text *
    </label>
    <input
      type="text"
      className="w-full px-4 py-3 bg-white/5 border border-copper-500/20 rounded-sm text-cream-200 placeholder-light-gray/50 focus:outline-none focus:border-copper-500/60 transition-colors duration-300"
      placeholder="Placeholder"
      required
    />
  </div>
</form>
```

### Feature List Pattern

```jsx
<div className="space-y-3.5">
  <div className="flex items-start gap-3.5">
    <div className="w-2 h-2 rounded-full bg-copper-500 mt-2 flex-shrink-0" />
    <p className="text-sm font-light text-near-black/60 tracking-wide">
      Feature description text
    </p>
  </div>
</div>
```

---

## Usage Guidelines

### When to Use Each Font

- **Playfair Display (Serif):** Use for all major headings (H1-H3), hero text, section titles, and any text that needs elegance and sophistication.
- **Montserrat (Sans):** Use for body text, UI elements, buttons, labels, navigation, and any text that needs clarity and functionality.

### Color Combination Principles

1. **Light backgrounds:** Use `near-black` or `gray-700` text with `copper-500` accents
2. **Dark backgrounds:** Use `cream-50` or `cream-200` text with `copper-500` accents
3. **Always maintain sufficient contrast** for accessibility
4. **Use copper sparingly** for maximum impact on important elements

### Animation Best Practices

1. **Always check for reduced motion preference**
2. **Use `once: true` on scroll animations** to prevent re-triggering
3. **Stagger children animations** for visual interest (0.1-0.2s delay)
4. **Keep hero animations under 4 seconds** total duration
5. **Use blur effects sparingly** - they're performance intensive

### Responsive Design Principles

1. **Mobile-first approach:** Start with mobile styles, add desktop enhancements
2. **Test at breakpoints:** 375px (mobile), 768px (tablet), 1024px (desktop), 1440px (large)
3. **Reduce spacing on mobile:** Use responsive padding/margin utilities
4. **Stack cards vertically on mobile:** Use responsive grid utilities
5. **Maintain touch targets:** Minimum 44px for interactive elements

---

## File References

### Core Configuration
- `/tailwind.config.ts` - Tailwind configuration with color palette, spacing, typography
- `/src/app/globals.css` - Global styles, CSS variables, header animations
- `/src/app/layout.tsx` - Font loading and global layout structure

### Component Libraries
- `/src/components/ui/button.tsx` - Button component with variants
- `/src/components/ui/input.tsx` - Input field component
- `/src/components/ui/textarea.tsx` - Textarea component
- `/src/components/ui/select.tsx` - Select dropdown component
- `/src/components/ui/accordion.tsx` - Accordion component

### Animation Library
- `/src/lib/animation-variants.ts` - Reusable Framer Motion animation variants

### Background Effects
- `/src/components/backgrounds/LiquidEther.tsx` - Animated blob background

### Interactive Components
- `/src/components/animations/MagneticButton.tsx` - Magnetic hover effect

---

## Version History

**Version 1.0.0** - October 6, 2025
- Initial comprehensive style guide created
- Documented all color systems, typography, spacing, components, animations
- Established design patterns and usage guidelines

---

*This style guide is a living document. Update it whenever new design patterns or components are added to ensure consistency across the entire website.*
