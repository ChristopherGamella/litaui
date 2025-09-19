import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Sun, Moon } from 'lucide-angular';
import { ButtonComponent } from '../../lib/components/ui/button.component';
import { ThemeService } from '../../lib/utils/theme';

/**
 * Simple theme toggle component for light/dark mode switching
 * Following shadcn/ui patterns with proper icons and accessibility
 */
@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [
    CommonModule, 
    LucideAngularModule, 
    ButtonComponent
  ],
  template: `
    <lib-button 
      variant="ghost" 
      size="icon"
      (onClick)="toggleTheme()"
      [attr.aria-label]="'Switch to ' + (themeService.resolvedTheme() === 'light' ? 'dark' : 'light') + ' mode'"
      class="transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <lucide-angular 
        [img]="currentIcon()" 
        class="h-4 w-4 transition-all"
      ></lucide-angular>
      <span class="sr-only">Toggle theme</span>
    </lib-button>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ThemeToggleComponent {
  constructor(public readonly themeService: ThemeService) {}

  // Icons
  readonly icons = {
    sun: Sun,
    moon: Moon
  };

  /**
   * Current theme icon based on resolved theme
   */
  readonly currentIcon = computed(() => {
    const resolvedTheme = this.themeService.resolvedTheme();
    return resolvedTheme === 'dark' ? this.icons.sun : this.icons.moon;
  });

  /**
   * Toggle between light and dark themes
   */
  toggleTheme(): void {
    const currentTheme = this.themeService.resolvedTheme();
    this.themeService.setTheme(currentTheme === 'light' ? 'dark' : 'light');
  }
}