/**
 * Design tokens for the shadcn-inspired Angular component library
 * Updated to work with modern OKLCH color system from tweakcn.com
 */

/**
 * Shadcn/ui semantic color tokens that map to CSS custom properties
 * These use the new OKLCH color format for better color accuracy and consistency
 */
export const colors = {
  // Core theme colors (directly map to CSS custom properties)
  background: 'var(--background)',
  foreground: 'var(--foreground)',
  
  // UI component colors
  card: 'var(--card)',
  'card-foreground': 'var(--card-foreground)',
  popover: 'var(--popover)',
  'popover-foreground': 'var(--popover-foreground)',
  
  // Brand colors
  primary: 'var(--primary)',
  'primary-foreground': 'var(--primary-foreground)',
  secondary: 'var(--secondary)',
  'secondary-foreground': 'var(--secondary-foreground)',
  
  // Interactive colors
  muted: 'var(--muted)',
  'muted-foreground': 'var(--muted-foreground)',
  accent: 'var(--accent)',
  'accent-foreground': 'var(--accent-foreground)',
  
  // Status colors
  destructive: 'var(--destructive)',
  'destructive-foreground': 'var(--destructive-foreground)',
  
  // Form and border colors
  border: 'var(--border)',
  input: 'var(--input)',
  ring: 'var(--ring)',
  
  // Chart colors
  'chart-1': 'var(--chart-1)',
  'chart-2': 'var(--chart-2)',
  'chart-3': 'var(--chart-3)',
  'chart-4': 'var(--chart-4)',
  'chart-5': 'var(--chart-5)',
  
  // Sidebar colors (for complex layouts)
  sidebar: 'var(--sidebar)',
  'sidebar-foreground': 'var(--sidebar-foreground)',
  'sidebar-primary': 'var(--sidebar-primary)',
  'sidebar-primary-foreground': 'var(--sidebar-primary-foreground)',
  'sidebar-accent': 'var(--sidebar-accent)',
  'sidebar-accent-foreground': 'var(--sidebar-accent-foreground)',
  'sidebar-border': 'var(--sidebar-border)',
  'sidebar-ring': 'var(--sidebar-ring)',
} as const;

/**
 * Design system spacing and radius tokens
 */
export const radius = {
  radius: 'var(--radius)',
  'radius-sm': 'var(--radius-sm)',
  'radius-md': 'var(--radius-md)', 
  'radius-lg': 'var(--radius-lg)',
  'radius-xl': 'var(--radius-xl)',
} as const;

/**
 * Typography tokens
 */
export const typographyTokens = {
  'font-sans': 'var(--font-sans)',
  'font-serif': 'var(--font-serif)',
  'font-mono': 'var(--font-mono)',
  
  'tracking-tighter': 'var(--tracking-tighter)',
  'tracking-tight': 'var(--tracking-tight)',
  'tracking-normal': 'var(--tracking-normal)',
  'tracking-wide': 'var(--tracking-wide)',
  'tracking-wider': 'var(--tracking-wider)',
  'tracking-widest': 'var(--tracking-widest)',
} as const;

/**
 * Shadow tokens
 */
export const shadows = {
  '2xs': 'var(--shadow-2xs)',
  'xs': 'var(--shadow-xs)',
  'sm': 'var(--shadow-sm)',
  'default': 'var(--shadow)',
  'md': 'var(--shadow-md)',
  'lg': 'var(--shadow-lg)',
  'xl': 'var(--shadow-xl)',
  '2xl': 'var(--shadow-2xl)',
} as const;

/**
 * Component-specific helper tokens for complex use cases
 */
export const componentHelpers = {
  button: {
    destructive: {
      background: colors.destructive,
      foreground: colors['destructive-foreground'],
      hover: colors.destructive, // Could be enhanced with opacity
    },
  },
  input: {
    error: {
      border: colors.destructive,
      ring: colors.destructive,
    },
  },
  card: {
    background: colors.card,
    foreground: colors['card-foreground'],
    border: colors.border,
  },
} as const;

/**
 * Theme configuration types
 */
export type ColorToken = keyof typeof colors;
export type RadiusToken = keyof typeof radius;
export type TypographyToken = keyof typeof typographyTokens;
export type ShadowToken = keyof typeof shadows;