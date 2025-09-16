/**
 * Theme utilities for the shadcn-inspired Angular component library
 * Provides centralized theme management and CSS custom property generation
 */

import { semanticColors, componentColors, themes, type ColorScheme } from '../tokens/colors';
import { typography, textUtilities } from '../tokens/typography';
import { spacing, semanticSpacing } from '../tokens/spacing';

/**
 * Generate CSS custom properties for a given color scheme
 */
export function generateThemeCSS(colorScheme: ColorScheme = 'light'): string {
  const theme = themes[colorScheme];
  const cssVars: string[] = [];

  // Generate semantic color variables
  Object.entries(theme).forEach(([key, value]) => {
    cssVars.push(`  --${key}: ${value};`);
  });

  // Generate component-specific variables
  Object.entries(componentColors).forEach(([component, variants]) => {
    Object.entries(variants).forEach(([variant, colors]) => {
      if (typeof colors === 'object') {
        Object.entries(colors).forEach(([property, value]) => {
          cssVars.push(`  --${component}-${variant}-${property}: ${value};`);
        });
      }
    });
  });

  // Generate typography variables
  Object.entries(typography).forEach(([key, styles]) => {
    Object.entries(styles).forEach(([property, value]) => {
      const cssProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
      cssVars.push(`  --typography-${key}-${cssProperty}: ${value};`);
    });
  });

  // Generate spacing variables
  Object.entries(semanticSpacing).forEach(([category, values]) => {
    Object.entries(values).forEach(([subcategory, subvalues]) => {
      if (typeof subvalues === 'object') {
        Object.entries(subvalues).forEach(([size, value]) => {
          cssVars.push(`  --spacing-${category}-${subcategory}-${size}: ${value};`);
        });
      }
    });
  });

  return `:root {\n${cssVars.join('\n')}\n}`;
}

/**
 * Theme provider class for Angular applications
 */
export class ThemeProvider {
  private currentScheme: ColorScheme = 'light';

  constructor(initialScheme: ColorScheme = 'light') {
    this.currentScheme = initialScheme;
    this.applyTheme();
  }

  /**
   * Set the current color scheme
   */
  setScheme(scheme: ColorScheme): void {
    this.currentScheme = scheme;
    this.applyTheme();
  }

  /**
   * Get the current color scheme
   */
  getScheme(): ColorScheme {
    return this.currentScheme;
  }

  /**
   * Toggle between light and dark themes
   */
  toggleScheme(): void {
    this.currentScheme = this.currentScheme === 'light' ? 'dark' : 'light';
    this.applyTheme();
  }

  /**
   * Apply the current theme to the document
   */
  private applyTheme(): void {
    if (typeof document !== 'undefined') {
      const root = document.documentElement;

      // Remove previous theme classes
      root.classList.remove('light', 'dark');

      // Add current theme class
      root.classList.add(this.currentScheme);

      // Update CSS custom properties
      const themeCSS = generateThemeCSS(this.currentScheme);
      this.injectThemeCSS(themeCSS);
    }
  }

  /**
   * Inject theme CSS into the document head
   */
  private injectThemeCSS(css: string): void {
    if (typeof document !== 'undefined') {
      let styleElement = document.getElementById('theme-css') as HTMLStyleElement;

      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'theme-css';
        document.head.appendChild(styleElement);
      }

      styleElement.textContent = css;
    }
  }
}

/**
 * Utility function to get theme-aware class names
 */
export function themedClass(baseClass: string, themeOverrides?: Record<ColorScheme, string>): string {
  if (!themeOverrides) return baseClass;

  const classes = [baseClass];

  Object.entries(themeOverrides).forEach(([scheme, overrideClass]) => {
    classes.push(`${scheme}:${overrideClass}`);
  });

  return classes.join(' ');
}

/**
 * Component variant resolver with theme support
 */
export function resolveComponentVariant<T extends Record<string, any>>(
  componentName: string,
  variant: keyof T,
  size?: keyof T[keyof T],
  theme: ColorScheme = 'light'
): string {
  const baseClasses: string[] = [];

  // Add component base class
  baseClasses.push(`${componentName}`);

  // Add variant class
  if (variant && variant !== 'default') {
    baseClasses.push(`${componentName}-${String(variant)}`);
  }

  // Add size class
  if (size && size !== 'default') {
    baseClasses.push(`${componentName}-${String(size)}`);
  }

  // Add theme class
  baseClasses.push(`${componentName}-theme-${theme}`);

  return baseClasses.join(' ');
}

/**
 * Color utility functions
 */
export const colorUtils = {
  /**
   * Get a semantic color value
   */
  getSemanticColor: (color: keyof typeof semanticColors): string => {
    return semanticColors[color];
  },

  /**
   * Get component-specific colors
   */
  getComponentColor: (
    component: keyof typeof componentColors,
    variant: string,
    property: string
  ): string => {
    const componentVariants = componentColors[component];
    if (componentVariants && componentVariants[variant as keyof typeof componentVariants]) {
      const variantColors = componentVariants[variant as keyof typeof componentVariants];
      if (typeof variantColors === 'object' && property in variantColors) {
        return variantColors[property as keyof typeof variantColors];
      }
    }
    return '';
  },

  /**
   * Generate color palette for a component
   */
  generateComponentPalette: (component: keyof typeof componentColors) => {
    return componentColors[component];
  },
};

/**
 * Typography utility functions
 */
export const typographyUtils = {
  /**
   * Get typography styles for a text variant
   */
  getTypographyStyles: (variant: keyof typeof typography) => {
    return typography[variant];
  },

  /**
   * Get text utility class
   */
  getTextClass: (variant: keyof typeof textUtilities): string => {
    return textUtilities[variant];
  },

  /**
   * Generate responsive typography classes
   */
  responsiveText: (mobile: string, tablet?: string, desktop?: string): string => {
    const classes = [mobile];
    if (tablet) classes.push(`sm:${tablet}`);
    if (desktop) classes.push(`md:${desktop}`);
    return classes.join(' ');
  },
};

/**
 * Spacing utility functions
 */
export const spacingUtils = {
  /**
   * Get semantic spacing value
   */
  getSemanticSpacing: (category: keyof typeof semanticSpacing, subcategory: string, size: string) => {
    const categorySpacing = semanticSpacing[category];
    if (categorySpacing && typeof categorySpacing === 'object') {
      const subcategorySpacing = (categorySpacing as any)[subcategory];
      if (subcategorySpacing && typeof subcategorySpacing === 'object') {
        return subcategorySpacing[size] || '';
      }
    }
    return '';
  },

  /**
   * Generate responsive spacing classes
   */
  responsiveSpacing: (property: 'p' | 'm' | 'gap', mobile: string, tablet?: string, desktop?: string): string => {
    const classes = [`${property}-${mobile}`];
    if (tablet) classes.push(`sm:${property}-${tablet}`);
    if (desktop) classes.push(`md:${property}-${desktop}`);
    return classes.join(' ');
  },
};

/**
 * Export utilities for easy access
 */
export const themeUtils = {
  colors: colorUtils,
  typography: typographyUtils,
  spacing: spacingUtils,
  themedClass,
  resolveComponentVariant,
  generateThemeCSS,
};