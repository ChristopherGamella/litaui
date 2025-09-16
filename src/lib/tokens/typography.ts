/**
 * Typography design tokens for the shadcn-inspired Angular component library
 * Integrated with existing typography system
 */

export const fontFamily = {
  sans: 'var(--font-family-sans)',
  mono: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
} as const;

export const fontSize = {
  xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
  sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
  base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
  lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
  xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
  '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
  '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
  '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
  '5xl': ['3rem', { lineHeight: '1' }],         // 48px
  '6xl': ['3.75rem', { lineHeight: '1' }],      // 60px
  '7xl': ['4.5rem', { lineHeight: '1' }],       // 72px
  '8xl': ['6rem', { lineHeight: '1' }],         // 96px
  '9xl': ['8rem', { lineHeight: '1' }],         // 128px
} as const;

export const fontWeight = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
} as const;

export const letterSpacing = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

export const lineHeight = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
} as const;

/**
 * Typography scale for consistent text styling
 */
export const typography = {
  // Headings
  h1: {
    fontSize: fontSize['4xl'][0],
    lineHeight: fontSize['4xl'][1].lineHeight,
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.tight,
  },
  h2: {
    fontSize: fontSize['3xl'][0],
    lineHeight: fontSize['3xl'][1].lineHeight,
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.tight,
  },
  h3: {
    fontSize: fontSize['2xl'][0],
    lineHeight: fontSize['2xl'][1].lineHeight,
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.tight,
  },
  h4: {
    fontSize: fontSize.xl[0],
    lineHeight: fontSize.xl[1].lineHeight,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
  },
  h5: {
    fontSize: fontSize.lg[0],
    lineHeight: fontSize.lg[1].lineHeight,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
  },
  h6: {
    fontSize: fontSize.base[0],
    lineHeight: fontSize.base[1].lineHeight,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.tight,
  },

  // Body text
  body: {
    fontSize: fontSize.base[0],
    lineHeight: fontSize.base[1].lineHeight,
    fontWeight: fontWeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  bodyLarge: {
    fontSize: fontSize.lg[0],
    lineHeight: fontSize.lg[1].lineHeight,
    fontWeight: fontWeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  bodySmall: {
    fontSize: fontSize.sm[0],
    lineHeight: fontSize.sm[1].lineHeight,
    fontWeight: fontWeight.normal,
    letterSpacing: letterSpacing.normal,
  },

  // UI text
  label: {
    fontSize: fontSize.sm[0],
    lineHeight: fontSize.sm[1].lineHeight,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.normal,
  },
  caption: {
    fontSize: fontSize.xs[0],
    lineHeight: fontSize.xs[1].lineHeight,
    fontWeight: fontWeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  overline: {
    fontSize: fontSize.xs[0],
    lineHeight: fontSize.xs[1].lineHeight,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.wide,
    textTransform: 'uppercase' as const,
  },

  // Interactive elements
  button: {
    fontSize: fontSize.sm[0],
    lineHeight: fontSize.sm[1].lineHeight,
    fontWeight: fontWeight.medium,
    letterSpacing: letterSpacing.normal,
  },
  link: {
    fontSize: fontSize.base[0],
    lineHeight: fontSize.base[1].lineHeight,
    fontWeight: fontWeight.normal,
    letterSpacing: letterSpacing.normal,
    textDecoration: 'underline' as const,
  },
} as const;

/**
 * Text utility classes for common patterns
 */
export const textUtilities = {
  // Heading utilities
  heading1: 'text-4xl font-bold leading-tight tracking-tight',
  heading2: 'text-3xl font-bold leading-tight tracking-tight',
  heading3: 'text-2xl font-bold leading-tight tracking-tight',
  heading4: 'text-xl font-semibold leading-tight tracking-tight',
  heading5: 'text-lg font-semibold leading-tight tracking-tight',
  heading6: 'text-base font-semibold leading-tight tracking-tight',

  // Body text utilities
  body: 'text-base leading-relaxed',
  bodyLarge: 'text-lg leading-relaxed',
  bodySmall: 'text-sm leading-relaxed',

  // UI text utilities
  label: 'text-sm font-medium leading-snug',
  caption: 'text-xs leading-snug text-muted-foreground',
  overline: 'text-xs font-semibold leading-snug tracking-wide uppercase',

  // Interactive utilities
  button: 'text-sm font-medium leading-tight tracking-normal',
  link: 'text-base leading-relaxed underline decoration-primary-200 underline-offset-2',
} as const;

export type TypographyScale = keyof typeof typography;
export type FontSize = keyof typeof fontSize;
export type FontWeight = keyof typeof fontWeight;
export type LetterSpacing = keyof typeof letterSpacing;
export type LineHeight = keyof typeof lineHeight;