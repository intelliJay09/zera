/**
 * Reusable Framer Motion Animation Variants
 * Premium animation library for ZERA
 */

// Luxury easing curves
export const elegantEase = [0.19, 0.91, 0.38, 0.98] as const;
export const luxurySlowEase = [0.33, 0.82, 0.44, 0.99] as const;
export const luxuryEase = [0.25, 0.46, 0.45, 0.94] as const;
export const powerEase = [0.16, 1, 0.3, 1] as const;
export const playfulEase = [0.34, 1.56, 0.64, 1] as const;

// Hero section — used by page.tsx
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

// Service tier grid — used by ServiceTierGrid.tsx
export const twoPillarsOverline = {
  hidden: {
    opacity: 0,
    y: 20,
    letterSpacing: '0.15em',
  },
  visible: {
    opacity: 1,
    y: 0,
    letterSpacing: '0.05em',
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

// Contact / Booking page — used by BookSessionContent.tsx
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

// Contact form fields — used by ContactForm.tsx
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

// Cookie consent — used by CookieConsent.tsx
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

export const cookieToggleSwitch = {
  transition: {
    duration: 0.3,
    ease: [0.4, 0, 0.2, 1] as const,
  },
};

// Asset accession — used by AssetAccessionContent.tsx
export const accessionFieldStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
};

export const accessionFieldItem = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: luxuryEase,
    },
  },
};
