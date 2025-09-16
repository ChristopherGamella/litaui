import { Injectable, Renderer2, RendererFactory2, signal, computed, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

/**
 * Theme configuration interface
 */
export interface ThemeConfig {
  /** Default theme to use */
  defaultTheme?: Theme;
  /** Storage key for theme preference */
  storageKey?: string;
  /** Whether to use system preference */
  enableSystem?: boolean;
  /** Disable transitions when switching themes */
  disableTransitionOnChange?: boolean;
  /** Custom themes */
  themes?: string[];
  /** CSS attribute to set on document element */
  attribute?: 'class' | 'data-theme';
  /** Value to use for theme attribute */
  value?: Record<string, string>;
}

/**
 * Default theme configuration
 */
export const defaultThemeConfig: Required<ThemeConfig> = {
  defaultTheme: 'system',
  storageKey: 'shadcn-theme',
  enableSystem: true,
  disableTransitionOnChange: false,
  themes: ['light', 'dark'],
  attribute: 'class',
  value: {},
};

/**
 * Injectable theme service for managing application themes
 * 
 * Provides theme switching, persistence, and system preference detection.
 * Compatible with shadcn/ui theming patterns.
 * 
 * @example
 * ```typescript
 * @Component({
 *   template: `
 *     <button (click)="toggleTheme()">
 *       Current: {{ themeService.resolvedTheme() }}
 *     </button>
 *   `
 * })
 * export class ThemeToggleComponent {
 *   constructor(public themeService: ThemeService) {}
 * 
 *   toggleTheme() {
 *     const current = this.themeService.theme();
 *     this.themeService.setTheme(current === 'light' ? 'dark' : 'light');
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly rendererFactory = inject(RendererFactory2);
  private readonly renderer = this.rendererFactory.createRenderer(null, null);

  private readonly config: Required<ThemeConfig> = defaultThemeConfig;
  
  // Signals for reactive theme management
  private readonly _theme = signal<Theme>('system');
  private readonly _systemTheme = signal<ResolvedTheme>('light');
  
  // Public reactive signals
  readonly theme = this._theme.asReadonly();
  readonly systemTheme = this._systemTheme.asReadonly();
  
  // Computed resolved theme
  readonly resolvedTheme = computed<ResolvedTheme>(() => {
    const theme = this._theme();
    if (theme === 'system') {
      return this._systemTheme();
    }
    return theme as ResolvedTheme;
  });

  constructor() {
    this.initializeTheme();
    this.setupSystemThemeListener();
    this.setupThemeEffect();
  }

  /**
   * Configure the theme service
   */
  configure(config: Partial<ThemeConfig>): void {
    Object.assign(this.config, config);
  }

  /**
   * Set the current theme
   * @param theme - Theme to set ('light', 'dark', or 'system')
   */
  setTheme(theme: Theme): void {
    this._theme.set(theme);
    this.persistTheme(theme);
  }

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const current = this.resolvedTheme();
    this.setTheme(current === 'light' ? 'dark' : 'light');
  }

  /**
   * Get available themes
   */
  getThemes(): string[] {
    return this.config.themes;
  }

  /**
   * Check if a theme is available
   */
  isThemeAvailable(theme: string): boolean {
    return this.config.themes.includes(theme);
  }

  /**
   * Initialize theme from storage or system preference
   */
  private initializeTheme(): void {
    // Try to get theme from storage
    const storedTheme = this.getStoredTheme();
    
    if (storedTheme && this.isValidTheme(storedTheme)) {
      this._theme.set(storedTheme);
    } else {
      this._theme.set(this.config.defaultTheme);
    }

    // Initialize system theme
    this.updateSystemTheme();
  }

  /**
   * Setup system theme preference listener
   */
  private setupSystemThemeListener(): void {
    if (typeof window === 'undefined' || !this.config.enableSystem) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Update system theme when preference changes
    mediaQuery.addEventListener('change', () => {
      this.updateSystemTheme();
    });
  }

  /**
   * Setup effect to apply theme changes to DOM
   */
  private setupThemeEffect(): void {
    effect(() => {
      const resolvedTheme = this.resolvedTheme();
      this.applyTheme(resolvedTheme);
    });
  }

  /**
   * Update system theme based on media query
   */
  private updateSystemTheme(): void {
    if (typeof window === 'undefined') {
      return;
    }

    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this._systemTheme.set(isDark ? 'dark' : 'light');
  }

  /**
   * Apply theme to document element
   */
  private applyTheme(theme: ResolvedTheme): void {
    if (typeof document === 'undefined') {
      return;
    }

    const root = this.document.documentElement;

    // Disable transitions temporarily if configured
    if (this.config.disableTransitionOnChange) {
      this.disableTransitions();
    }

    // Remove all theme classes/attributes
    this.config.themes.forEach(t => {
      if (this.config.attribute === 'class') {
        this.renderer.removeClass(root, t);
      } else {
        this.renderer.removeAttribute(root, this.config.attribute);
      }
    });

    // Apply new theme
    const themeValue = this.config.value[theme] || theme;
    
    if (this.config.attribute === 'class') {
      this.renderer.addClass(root, themeValue);
    } else {
      this.renderer.setAttribute(root, this.config.attribute, themeValue);
    }

    // Re-enable transitions
    if (this.config.disableTransitionOnChange) {
      setTimeout(() => this.enableTransitions(), 0);
    }
  }

  /**
   * Temporarily disable CSS transitions
   */
  private disableTransitions(): void {
    const css = `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`;
    const style = this.document.createElement('style');
    style.appendChild(this.document.createTextNode(css));
    this.document.head.appendChild(style);
    
    // Store reference for removal
    (style as any).__themeTransitionDisabled = true;
  }

  /**
   * Re-enable CSS transitions
   */
  private enableTransitions(): void {
    const styles = this.document.head.querySelectorAll('style');
    styles.forEach(style => {
      if ((style as any).__themeTransitionDisabled) {
        this.document.head.removeChild(style);
      }
    });
  }

  /**
   * Persist theme to localStorage
   */
  private persistTheme(theme: Theme): void {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(this.config.storageKey, theme);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  }

  /**
   * Get stored theme from localStorage
   */
  private getStoredTheme(): Theme | null {
    if (typeof window === 'undefined') {
      return null;
    }

    try {
      return window.localStorage.getItem(this.config.storageKey) as Theme;
    } catch (error) {
      console.warn('Failed to read theme preference:', error);
      return null;
    }
  }

  /**
   * Check if theme value is valid
   */
  private isValidTheme(theme: string): theme is Theme {
    return ['light', 'dark', 'system'].includes(theme);
  }
}

/**
 * Theme provider function for standalone usage
 * 
 * @example
 * ```typescript
 * import { bootstrapApplication } from '@angular/platform-browser';
 * import { provideTheme } from './lib/utils/theme';
 * 
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideTheme({
 *       defaultTheme: 'dark',
 *       storageKey: 'my-app-theme'
 *     })
 *   ]
 * });
 * ```
 */
export function provideTheme(config?: Partial<ThemeConfig>) {
  return {
    provide: ThemeService,
    useFactory: () => {
      const service = new ThemeService();
      if (config) {
        service.configure(config);
      }
      return service;
    }
  };
}

/**
 * Generate CSS custom properties for themes
 * 
 * @param theme - Theme name to generate CSS for
 * @returns CSS string with custom properties
 */
export function generateThemeCSS(theme: 'light' | 'dark'): string {
  const lightTheme = `
    :root {
      --background: 0 0% 100%;
      --foreground: 222.2 84% 4.9%;
      --card: 0 0% 100%;
      --card-foreground: 222.2 84% 4.9%;
      --popover: 0 0% 100%;
      --popover-foreground: 222.2 84% 4.9%;
      --primary: 222.2 47.4% 11.2%;
      --primary-foreground: 210 40% 98%;
      --secondary: 210 40% 96%;
      --secondary-foreground: 222.2 47.4% 11.2%;
      --muted: 210 40% 96%;
      --muted-foreground: 215.4 16.3% 46.9%;
      --accent: 210 40% 96%;
      --accent-foreground: 222.2 47.4% 11.2%;
      --destructive: 0 84.2% 60.2%;
      --destructive-foreground: 210 40% 98%;
      --border: 214.3 31.8% 91.4%;
      --input: 214.3 31.8% 91.4%;
      --ring: 222.2 84% 4.9%;
      --radius: 0.5rem;
    }
  `;

  const darkTheme = `
    .dark {
      --background: 222.2 84% 4.9%;
      --foreground: 210 40% 98%;
      --card: 222.2 84% 4.9%;
      --card-foreground: 210 40% 98%;
      --popover: 222.2 84% 4.9%;
      --popover-foreground: 210 40% 98%;
      --primary: 210 40% 98%;
      --primary-foreground: 222.2 47.4% 11.2%;
      --secondary: 217.2 32.6% 17.5%;
      --secondary-foreground: 210 40% 98%;
      --muted: 217.2 32.6% 17.5%;
      --muted-foreground: 215 20.2% 65.1%;
      --accent: 217.2 32.6% 17.5%;
      --accent-foreground: 210 40% 98%;
      --destructive: 0 62.8% 30.6%;
      --destructive-foreground: 210 40% 98%;
      --border: 217.2 32.6% 17.5%;
      --input: 217.2 32.6% 17.5%;
      --ring: 212.7 26.8% 83.9%;
    }
  `;

  return theme === 'light' ? lightTheme : darkTheme;
}