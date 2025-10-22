/**
 * Responsive Layout System for The Astra Flow
 *
 * Standardized responsive patterns for consistent mobile-first design
 * across all sections and components.
 */

export const RESPONSIVE_GRID_PATTERNS = {
  // Standard grid patterns
  singleToDouble: 'grid grid-cols-1 lg:grid-cols-2',
  singleToTriple: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  singleToQuad: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',

  // Spacing patterns (progressive)
  gapProgressive: 'gap-4 sm:gap-6 lg:gap-8',
  gapCompact: 'gap-3 sm:gap-4 lg:gap-6',
  gapGenerous: 'gap-6 sm:gap-8 lg:gap-12',
  gapSection: 'gap-10 sm:gap-16 lg:gap-20',
} as const;

export const RESPONSIVE_TYPOGRAPHY = {
  // Hero and large headlines
  hero: 'text-3xl sm:text-5xl lg:text-6xl xl:text-7xl',

  // Section headlines
  h1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',
  h2: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',
  h3: 'text-xl sm:text-2xl lg:text-3xl',
  h4: 'text-lg sm:text-xl lg:text-2xl',

  // Body text
  body: 'text-base sm:text-lg',
  bodySmall: 'text-sm sm:text-base',
  small: 'text-xs sm:text-sm',
} as const;

export const RESPONSIVE_SPACING = {
  // Section vertical padding
  sectionPadding: 'py-16 sm:py-24 md:py-32 lg:py-40',
  sectionPaddingCompact: 'py-12 sm:py-16 md:py-20 lg:py-24',
  sectionPaddingGenerous: 'py-20 sm:py-28 md:py-36 lg:py-48',

  // Container horizontal padding
  containerPadding: 'px-4 sm:px-6 lg:px-8',

  // Card/component padding
  cardPadding: 'p-6 sm:p-8 lg:p-10',
  cardPaddingCompact: 'p-5 sm:p-6 lg:p-8',
  cardPaddingGenerous: 'p-8 sm:p-10 lg:p-12',
} as const;

export const RESPONSIVE_HEIGHTS = {
  // Common height patterns
  heroHeight: 'h-[400px] sm:h-[500px] lg:h-[600px]',
  cardHeight: 'h-auto md:h-[240px] lg:h-[280px]',
  iconContainer: 'w-16 h-16 sm:w-20 sm:h-20',
  iconSize: 'w-8 h-8 sm:w-10 sm:h-10',
} as const;
