/**
 * Design tokens for the shadcn-inspired Angular component library
 * Integrated with existing color system from styles.css
 */

// Base color palette (from existing system)
export const colors = {
  // Brand colors (use sparingly)
  brand: {
    red: 'var(--color-brand-red)',
    redHover: 'var(--color-brand-red-hover)',
  },

  // Primary UI colors (modern professional)
  primary: {
    50: 'var(--color-primary-50)',
    100: 'var(--color-primary-100)',
    700: 'var(--color-primary-700)',
    800: 'var(--color-primary-800)',
    900: 'var(--color-primary-900)',
  },

  // Accent colors (vibrant blue for trust)
  accent: {
    50: 'var(--color-accent-50)',
    100: 'var(--color-accent-100)',
    400: 'var(--color-accent-400)',
    500: 'var(--color-accent-500)',
    600: 'var(--color-accent-600)',
  },

  // Background colors
  background: {
    main: 'var(--color-background-main)',
    subtle: 'var(--color-background-subtle)',
    elevated: 'var(--color-background-elevated)',
    accent: 'var(--color-background-accent)',
  },

  // Text colors
  text: {
    primary: 'var(--color-text-primary)',
    secondary: 'var(--color-text-secondary)',
    muted: 'var(--color-text-muted)',
    placeholder: 'var(--color-text-placeholder)',
    inverse: 'var(--color-text-inverse)',
  },

  // Status colors
  success: {
    50: 'var(--color-green-50)',
    100: 'var(--color-green-100)',
    500: 'var(--color-green-500)',
    600: 'var(--color-green-600)',
    700: 'var(--color-green-700)',
    800: 'var(--color-green-800)',
  },

  error: {
    50: 'var(--color-red-50)',
    100: 'var(--color-red-100)',
    500: 'var(--color-red-500)',
    600: 'var(--color-red-600)',
    700: 'var(--color-red-700)',
    800: 'var(--color-red-800)',
  },

  warning: {
    50: 'var(--color-yellow-50)',
    100: 'var(--color-yellow-100)',
    500: 'var(--color-yellow-500)',
    600: 'var(--color-yellow-600)',
    700: 'var(--color-yellow-700)',
    800: 'var(--color-yellow-800)',
  },

  info: {
    50: 'var(--color-blue-50)',
    100: 'var(--color-blue-100)',
    500: 'var(--color-blue-500)',
    600: 'var(--color-blue-600)',
    700: 'var(--color-blue-700)',
    800: 'var(--color-blue-800)',
  },

  // Utility colors
  white: 'var(--color-white)',
  black: 'var(--color-black)',
  transparent: 'var(--color-transparent)',
  current: 'var(--color-current)',
} as const;

/**
 * Shadcn-style semantic color tokens
 * These map to the base colors above for consistent theming
 */
export const semanticColors = {
  // Background colors
  background: colors.background.main,
  foreground: colors.text.primary,

  // Card colors
  card: colors.background.elevated,
  'card-foreground': colors.text.primary,

  // Popover colors
  popover: colors.background.elevated,
  'popover-foreground': colors.text.primary,

  // Primary colors
  primary: colors.primary[900],
  'primary-foreground': colors.white,

  // Secondary colors
  secondary: colors.primary[100],
  'secondary-foreground': colors.primary[900],

  // Muted colors
  muted: colors.primary[100],
  'muted-foreground': colors.text.muted,

  // Accent colors
  accent: colors.accent[100],
  'accent-foreground': colors.accent[600],

  // Destructive colors
  destructive: colors.error[500],
  'destructive-foreground': colors.white,

  // Success colors
  success: colors.success[600],
  'success-foreground': colors.white,

  // Border colors
  border: colors.primary[100],
  input: colors.primary[100],
  ring: colors.accent[600],

  // Radius (for border-radius)
  radius: '0.5rem',
} as const;

/**
 * Component-specific color mappings
 */
export const componentColors = {
  button: {
    primary: {
      background: colors.primary[900],
      foreground: colors.white,
      hover: colors.primary[800],
    },
    secondary: {
      background: colors.primary[100],
      foreground: colors.primary[900],
      hover: colors.primary[50],
    },
    outline: {
      background: 'transparent',
      foreground: colors.primary[900],
      border: colors.primary[700],
      hover: colors.primary[100],
    },
    ghost: {
      background: 'transparent',
      foreground: colors.primary[900],
      hover: colors.primary[100],
    },
    destructive: {
      background: colors.error[500],
      foreground: colors.white,
      hover: colors.error[600],
    },
  },

  input: {
    background: colors.white,
    foreground: colors.text.primary,
    border: colors.primary[100],
    focus: {
      border: colors.accent[600],
      ring: colors.accent[100],
    },
    error: {
      border: colors.error[500],
      ring: colors.error[50],
    },
  },

  card: {
    background: colors.background.elevated,
    foreground: colors.text.primary,
    border: colors.primary[100],
    shadow: 'var(--shadow-elegant)',
  },
} as const;

/**
 * Theme configuration for dark/light mode support
 */
export const themes = {
  light: {
    ...semanticColors,
  },
  dark: {
    // Dark theme colors (to be implemented)
    background: colors.primary[900],
    foreground: colors.white,
    // ... other dark theme mappings
  },
} as const;

export type ColorScheme = keyof typeof themes;
export type SemanticColor = keyof typeof semanticColors;