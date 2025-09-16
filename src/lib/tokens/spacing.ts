/**
 * Spacing design tokens for the shadcn-inspired Angular component library
 * Based on a 4px grid system for consistency
 */

export const spacing = {
  // Base spacing scale (4px increments)
  0: '0px',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  7: '1.75rem',   // 28px
  8: '2rem',      // 32px
  9: '2.25rem',   // 36px
  10: '2.5rem',   // 40px
  11: '2.75rem',   // 44px
  12: '3rem',     // 48px
  14: '3.5rem',   // 56px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  28: '7rem',     // 112px
  32: '8rem',     // 128px
  36: '9rem',     // 144px
  40: '10rem',    // 160px
  44: '11rem',    // 176px
  48: '12rem',    // 192px
  52: '13rem',    // 208px
  56: '14rem',    // 224px
  60: '15rem',    // 240px
  64: '16rem',    // 256px
  72: '18rem',    // 288px
  80: '20rem',    // 320px
  96: '24rem',    // 384px
} as const;

/**
 * Semantic spacing tokens for consistent component spacing
 */
export const semanticSpacing = {
  // Component spacing
  component: {
    padding: {
      xs: spacing[2],    // 8px
      sm: spacing[3],    // 12px
      md: spacing[4],    // 16px
      lg: spacing[6],    // 24px
      xl: spacing[8],    // 32px
    },
    margin: {
      xs: spacing[1],    // 4px
      sm: spacing[2],    // 8px
      md: spacing[4],    // 16px
      lg: spacing[6],    // 24px
      xl: spacing[8],    // 32px
    },
    gap: {
      xs: spacing[2],    // 8px
      sm: spacing[3],    // 12px
      md: spacing[4],    // 16px
      lg: spacing[6],    // 24px
      xl: spacing[8],    // 32px
    },
  },

  // Layout spacing
  layout: {
    section: {
      xs: spacing[8],    // 32px
      sm: spacing[12],   // 48px
      md: spacing[16],   // 64px
      lg: spacing[20],   // 80px
      xl: spacing[24],   // 96px
    },
    container: {
      xs: spacing[4],    // 16px
      sm: spacing[6],    // 24px
      md: spacing[8],    // 32px
      lg: spacing[12],   // 48px
      xl: spacing[16],   // 64px
    },
  },

  // Interactive elements
  interactive: {
    button: {
      padding: {
        xs: `${spacing[1]} ${spacing[2]}`,     // 4px 8px
        sm: `${spacing[2]} ${spacing[3]}`,     // 8px 12px
        md: `${spacing[2]} ${spacing[4]}`,     // 8px 16px
        lg: `${spacing[3]} ${spacing[6]}`,     // 12px 24px
        xl: `${spacing[3]} ${spacing[8]}`,     // 12px 32px
      },
      gap: spacing[2],    // 8px
    },
    input: {
      padding: `${spacing[2]} ${spacing[3]}`,   // 8px 12px
      gap: spacing[2],    // 8px
    },
    card: {
      padding: spacing[6],    // 24px
      gap: spacing[4],        // 16px
    },
  },

  // Typography spacing
  typography: {
    lineHeight: {
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },
} as const;

/**
 * Spacing utility classes for common patterns
 */
export const spacingUtilities = {
  // Padding utilities
  padding: {
    xs: 'p-2',      // 8px
    sm: 'p-3',      // 12px
    md: 'p-4',      // 16px
    lg: 'p-6',      // 24px
    xl: 'p-8',      // 32px
  },

  // Margin utilities
  margin: {
    xs: 'm-1',      // -4px
    sm: 'm-2',      // -8px
    md: 'm-4',      // -16px
    lg: 'm-6',      // -24px
    xl: 'm-8',      // -32px
  },

  // Gap utilities
  gap: {
    xs: 'gap-2',    // 8px
    sm: 'gap-3',    // 12px
    md: 'gap-4',    // 16px
    lg: 'gap-6',    // 24px
    xl: 'gap-8',    // 32px
  },

  // Space between utilities
  space: {
    x: {
      xs: 'space-x-2',    // 8px
      sm: 'space-x-3',    // 12px
      md: 'space-x-4',    // 16px
      lg: 'space-x-6',    // 24px
      xl: 'space-x-8',    // 32px
    },
    y: {
      xs: 'space-y-2',    // 8px
      sm: 'space-y-3',    // 12px
      md: 'space-y-4',    // 16px
      lg: 'space-y-6',    // 24px
      xl: 'space-y-8',    // 32px
    },
  },
} as const;

/**
 * Responsive spacing breakpoints
 */
export const responsiveSpacing = {
  // Mobile first approach
  padding: {
    xs: 'p-2 sm:p-3 md:p-4 lg:p-6 xl:p-8',
    sm: 'p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12',
    md: 'p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16',
    lg: 'p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20',
    xl: 'p-8 sm:p-12 md:p-16 lg:p-20 xl:p-24',
  },

  margin: {
    xs: 'm-2 sm:m-3 md:m-4 lg:m-6 xl:m-8',
    sm: 'm-3 sm:m-4 md:m-6 lg:m-8 xl:m-12',
    md: 'm-4 sm:m-6 md:m-8 lg:m-12 xl:m-16',
    lg: 'm-6 sm:m-8 md:m-12 lg:m-16 xl:m-20',
    xl: 'm-8 sm:m-12 md:m-16 lg:m-20 xl:m-24',
  },

  gap: {
    xs: 'gap-2 sm:gap-3 md:gap-4 lg:gap-6 xl:gap-8',
    sm: 'gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-12',
    md: 'gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16',
    lg: 'gap-6 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-20',
    xl: 'gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24',
  },
} as const;

export type SpacingScale = keyof typeof spacing;
export type SemanticSpacing = typeof semanticSpacing;
export type SpacingUtilities = typeof spacingUtilities;