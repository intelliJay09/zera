/**
 * Reusable Framer Motion Animation Variants
 * Premium animation library for The Astra Flow
 */

// Luxury easing curves - Refined for premium elegance
export const elegantEase = [0.19, 0.91, 0.38, 0.98] as const; // Gentle, sophisticated
export const luxurySlowEase = [0.33, 0.82, 0.44, 0.99] as const; // Ultra-smooth deceleration
export const luxuryEase = [0.25, 0.46, 0.45, 0.94] as const; // Smooth deceleration
export const powerEase = [0.16, 1, 0.3, 1] as const; // Dramatic entrances
export const playfulEase = [0.34, 1.56, 0.64, 1] as const; // Slight overshoot

// Hero section animations - Optimized 4-second sequence
export const heroHeadline = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(12px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.0,
      delay: 0.2,
      ease: elegantEase,
    },
  },
};

export const heroSubheadline = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 1.7,
      ease: luxurySlowEase,
    },
  },
};

export const heroCTAContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 3.4,
      staggerChildren: 0.4,
      delayChildren: 0,
    },
  },
};

// Ultra-smooth button ease
export const ultraSmoothEase = [0.25, 0.85, 0.35, 1.0] as const;

export const heroCTAItem = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.92,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.4,
      ease: ultraSmoothEase,
    },
  },
};

// Text reveal animations
export const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: luxuryEase },
  },
};

export const blurEscape = {
  hidden: {
    filter: 'blur(20px)',
    opacity: 0,
    y: 20,
  },
  visible: {
    filter: 'blur(0px)',
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

// Stagger container
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Button magnetic effect spring config
export const magneticSpring = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 20,
};

// Scroll indicator pulse
export const scrollIndicatorPulse = {
  y: [0, 8, 0],
  opacity: [0.5, 1, 0.5],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
};

// Two Pillars Section Animations
export const twoPillarsDivider = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 0.3,
    transition: {
      duration: 1.2,
      delay: 0.2,
      ease: luxuryEase,
    },
  },
};

export const twoPillarsOverline = {
  hidden: {
    opacity: 0,
    y: 20,
    letterSpacing: '0.35em',
  },
  visible: {
    opacity: 1,
    y: 0,
    letterSpacing: '0.25em',
    transition: {
      duration: 0.7,
      ease: elegantEase,
    },
  },
};

export const twoPillarsHeadline = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.0,
      delay: 0.3,
      ease: elegantEase,
    },
  },
};

// Card entrance from left (Custom Services - flagship)
export const cardEntranceLeft = {
  hidden: {
    opacity: 0,
    x: -100,
    scale: 0.95,
    rotateY: -15,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      delay: 0.8,
      ease: powerEase,
    },
  },
};

// Card entrance from right (WaaS)
export const cardEntranceRight = {
  hidden: {
    opacity: 0,
    x: 100,
    scale: 0.95,
    rotateY: 15,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      delay: 0.95,
      ease: powerEase,
    },
  },
};

// Card content stagger container
export const cardContentContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

// Card icon (elastic bounce)
export const cardIcon = {
  hidden: {
    scale: 0,
    rotate: -180,
  },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 20,
      delay: 0.3,
    },
  },
};

// Card text items (overline, headline, description, bullets)
export const cardTextItem = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: luxuryEase,
    },
  },
};

// Card CTA button
export const cardCTA = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: luxuryEase,
    },
  },
};

// WaaS Pricing Page Animations
// Hero Section
export const waasHeroOverline = {
  hidden: {
    opacity: 0,
    y: 20,
    letterSpacing: '0.35em',
  },
  visible: {
    opacity: 1,
    y: 0,
    letterSpacing: '0.25em',
    transition: {
      duration: 0.7,
      ease: elegantEase,
    },
  },
};

export const waasHeroHeadline = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(12px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.0,
      delay: 0.2,
      ease: elegantEase,
    },
  },
};

export const waasHeroDescription = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.5,
      ease: luxurySlowEase,
    },
  },
};

export const waasDecorativeBlob = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.5,
      ease: luxuryEase,
    },
  },
};

// Pricing Cards Section
export const waasPricingHeader = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: elegantEase,
    },
  },
};

export const waasPricingCardStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export const waasPricingCardEntrance = {
  hidden: {
    opacity: 0,
    y: 100,
    rotateX: -10,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.2,
      ease: powerEase,
    },
  },
};

export const waasPopularBadge = {
  hidden: {
    opacity: 0,
    scale: 0,
    y: -20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 20,
      delay: 0.2,
    },
  },
};

// Check icon drawing animation
export const waasCheckIcon = {
  hidden: {
    pathLength: 0,
    opacity: 0,
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: elegantEase,
    },
  },
};

export const waasCheckIconContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.4,
    },
  },
};

// FAQ Section
export const waasFAQSection = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.0,
      ease: elegantEase,
    },
  },
};

export const waasFAQCategoryStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export const waasFAQCategory = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: luxuryEase,
    },
  },
};

// Final CTA Section
export const waasCTASection = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.0,
      ease: elegantEase,
    },
  },
};

export const waasCTAButton = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: ultraSmoothEase,
    },
  },
};

// Contact Page Animations
// Hero Section
export const contactHeroOverline = {
  hidden: {
    opacity: 0,
    y: 20,
    letterSpacing: '0.35em',
  },
  visible: {
    opacity: 1,
    y: 0,
    letterSpacing: '0.25em',
    transition: {
      duration: 0.7,
      ease: elegantEase,
    },
  },
};

export const contactHeroHeadline = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(12px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.0,
      delay: 0.2,
      ease: elegantEase,
    },
  },
};

export const contactHeroDescription = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.5,
      ease: luxurySlowEase,
    },
  },
};

// Form Section
export const contactFormContainer = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.0,
      delay: 0.3,
      ease: powerEase,
    },
  },
};

export const contactFormFieldStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.5,
    },
  },
};

export const contactFormField = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: luxuryEase,
    },
  },
};

// Contact Info Section
export const contactInfoContainer = {
  hidden: {
    opacity: 0,
    x: 60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      delay: 0.5,
      ease: powerEase,
    },
  },
};

export const contactInfoItemStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.7,
    },
  },
};

export const contactInfoItem = {
  hidden: {
    opacity: 0,
    x: 40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: luxuryEase,
    },
  },
};

// Success State
export const contactSuccessContainer = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: playfulEase,
    },
  },
};

export const contactSuccessIcon = {
  hidden: {
    scale: 0,
    rotate: -180,
  },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 20,
      delay: 0.2,
    },
  },
};

// Cookie Consent Animations
// Banner slide-up
export const cookieBanner = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
};

// Cookie content fade-in
export const cookieContent = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      delay: 0.1,
      ease: elegantEase,
    },
  },
};

// Cookie category item (customize view)
export const cookieCategoryItem = {
  hidden: {
    opacity: 0,
    x: -20,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: luxuryEase,
    },
  },
};

// Toggle switch movement
export const cookieToggleSwitch = {
  transition: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1] as const,
  },
};

// ============================================
// CUSTOM WEB DEVELOPMENT PAGE ANIMATIONS
// ============================================

// Hero Section - Enhanced with dramatic blur escapes
export const customWebHeroOverline = {
  hidden: {
    opacity: 0,
    letterSpacing: '0.4em',
    y: -20,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    letterSpacing: '0.25em',
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: luxuryEase,
    },
  },
};

export const customWebHeroHeadline = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: 'blur(20px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.4,
      delay: 0.2,
      ease: elegantEase,
    },
  },
};

export const customWebHeroDescription = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(12px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.1,
      delay: 0.5,
      ease: luxurySlowEase,
    },
  },
};

// Features Section - Adding scroll-triggered animations
export const customWebFeaturesHeader = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(12px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1.0,
      ease: elegantEase,
    },
  },
};

export const customWebFeaturesCardStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

export const customWebFeaturesCard = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
    rotateX: 20,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: powerEase,
    },
  },
};

// Services Showcase Section
export const customWebServicesHeader = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: elegantEase,
    },
  },
};

export const customWebServicesCardStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export const customWebServicesCard = {
  hidden: {
    opacity: 0,
    y: 40,
    rotateX: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: powerEase,
    },
  },
};

// Process Section
export const customWebProcessHeader = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: elegantEase,
    },
  },
};

export const customWebProcessStepStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

export const customWebProcessStep = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: luxuryEase,
    },
  },
};

// Portfolio Section
export const customWebPortfolioHeader = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: elegantEase,
    },
  },
};

export const customWebPortfolioCardStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

export const customWebPortfolioCard = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: powerEase,
    },
  },
};

// FAQ Section
export const customWebFAQSection = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.9,
      ease: elegantEase,
    },
  },
};

export const customWebFAQCategoryStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

export const customWebFAQCategory = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: luxuryEase,
    },
  },
};

// Final CTA Section
export const customWebCTASection = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: powerEase,
    },
  },
};

export const customWebCTAButton = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      delay: 0.3,
      ease: elegantEase,
    },
  },
};
