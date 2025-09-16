import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Star, Heart, Download, Settings, Sun, Moon } from 'lucide-angular';
import { ButtonComponent } from '../../components/ui/button.component';
import { ThemeService } from '../../utils/theme';

/**
 * Demo component showcasing the shadcn-inspired Angular component library
 * This demonstrates how to use the design system with your existing color palette
 */
@Component({
  selector: 'lib-demo',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ButtonComponent],
  template: `
    <div class="p-8 max-w-4xl mx-auto bg-background min-h-screen">
      <div class="space-y-12">
        <!-- Header with Theme Toggle -->
        <div class="text-center space-y-4">
          <div class="flex justify-end mb-4">
            <lib-button 
              variant="outline" 
              size="icon"
              (onClick)="toggleTheme()"
              [attr.aria-label]="themeService.resolvedTheme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              <lucide-angular 
                [img]="themeService.resolvedTheme() === 'dark' ? SunIcon : MoonIcon" 
                size="16"
              ></lucide-angular>
            </lib-button>
          </div>
          
          <h1 class="text-4xl font-bold text-foreground">
            Shadcn-Angular Design System
          </h1>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
            A modern, accessible component library built with Angular 20, TailwindCSS 4,
            and your existing professional color palette.
          </p>
        </div>

        <!-- Button Variants Demo -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-foreground">Button Variants</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <lib-button variant="default">Default</lib-button>
            <lib-button variant="secondary">Secondary</lib-button>
            <lib-button variant="outline">Outline</lib-button>
            <lib-button variant="ghost">Ghost</lib-button>
            <lib-button variant="link">Link</lib-button>
            <lib-button variant="destructive">Destructive</lib-button>
          </div>
        </section>

        <!-- Button Sizes Demo -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-foreground">Button Sizes</h2>
          <div class="flex flex-wrap items-center gap-4">
            <lib-button size="xs">Extra Small</lib-button>
            <lib-button size="sm">Small</lib-button>
            <lib-button size="md">Medium</lib-button>
            <lib-button size="lg">Large</lib-button>
            <lib-button size="xl">Extra Large</lib-button>
          </div>
        </section>

        <!-- Button with Icons Demo -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-foreground">Buttons with Icons</h2>
          <div class="flex flex-wrap gap-4">
            <lib-button [leftIcon]="StarIcon">
              Star
            </lib-button>
            <lib-button variant="outline" [rightIcon]="HeartIcon">
              Like
            </lib-button>
            <lib-button variant="secondary" [leftIcon]="DownloadIcon">
              Download
            </lib-button>
            <lib-button variant="ghost" [rightIcon]="SettingsIcon">
              Settings
            </lib-button>
          </div>
        </section>

        <!-- Button States Demo -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-foreground">Button States</h2>
          <div class="flex flex-wrap gap-4">
            <lib-button [disabled]="true">Disabled</lib-button>
            <lib-button [loading]="true">Loading</lib-button>
            <lib-button [loading]="true" loadingText="Saving...">Custom Loading</lib-button>
          </div>
        </section>

        <!-- Theme Switching Demo -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-foreground">Theme Switching</h2>
          <div class="bg-card p-6 rounded-lg border border-border">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-lg font-medium text-foreground">Current Theme</h3>
                  <p class="text-sm text-muted-foreground">
                    Currently using {{ themeService.resolvedTheme() }} mode
                  </p>
                </div>
                <lib-button 
                  variant="outline"
                  (onClick)="toggleTheme()"
                >
                  <lucide-angular 
                    [img]="themeService.resolvedTheme() === 'dark' ? SunIcon : MoonIcon" 
                    size="16" 
                    class="mr-2"
                  ></lucide-angular>
                  Switch to {{ themeService.resolvedTheme() === 'dark' ? 'Light' : 'Dark' }} Mode
                </lib-button>
              </div>
              
              <div class="text-sm text-muted-foreground">
                <p>• Theme preference is saved to localStorage</p>
                <p>• Respects system preference on first visit</p>
                <p>• All components automatically adapt to theme changes</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Color System Demo -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-foreground">Color System Integration</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Primary Colors -->
            <div class="space-y-3">
              <h3 class="text-lg font-medium text-foreground">Primary Colors</h3>
              <div class="space-y-2">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded bg-primary"></div>
                  <span class="text-sm text-muted-foreground">Primary</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded bg-primary/90"></div>
                  <span class="text-sm text-muted-foreground">Primary 90%</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded bg-primary/10"></div>
                  <span class="text-sm text-muted-foreground">Primary 10%</span>
                </div>
              </div>
            </div>

            <!-- Accent Colors -->
            <div class="space-y-3">
              <h3 class="text-lg font-medium text-foreground">Secondary Colors</h3>
              <div class="space-y-2">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded bg-secondary"></div>
                  <span class="text-sm text-muted-foreground">Secondary</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded bg-accent"></div>
                  <span class="text-sm text-muted-foreground">Accent</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded bg-muted"></div>
                  <span class="text-sm text-muted-foreground">Muted</span>
                </div>
              </div>
            </div>

            <!-- Status Colors -->
            <div class="space-y-3">
              <h3 class="text-lg font-medium text-foreground">Status Colors</h3>
              <div class="space-y-2">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded bg-green-500"></div>
                  <span class="text-sm text-muted-foreground">Success</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded bg-destructive"></div>
                  <span class="text-sm text-muted-foreground">Destructive</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded bg-yellow-500"></div>
                  <span class="text-sm text-muted-foreground">Warning</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Typography Demo -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-foreground">Typography Scale</h2>
          <div class="space-y-4">
            <div>
              <p class="text-xs text-muted-foreground">Extra Small (text-xs)</p>
              <p class="text-sm text-muted-foreground">Small (text-sm)</p>
              <p class="text-base text-foreground">Base (text-base)</p>
              <p class="text-lg text-foreground">Large (text-lg)</p>
              <p class="text-xl font-medium text-foreground">Extra Large (text-xl)</p>
              <p class="text-2xl font-semibold text-foreground">2XL (text-2xl)</p>
            </div>
          </div>
        </section>

        <!-- Usage Instructions -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-foreground">How to Use</h2>
          <div class="bg-card p-6 rounded-lg border border-border">
            <div class="space-y-4">
              <div>
                <h3 class="text-lg font-medium text-foreground mb-2">1. Import Components</h3>
                <pre class="bg-muted p-3 rounded text-sm overflow-x-auto"><code>import {{ '{' }} ButtonComponent {{ '}' }} from './lib/components/ui/button.component';</code></pre>
              </div>

              <div>
                <h3 class="text-lg font-medium text-foreground mb-2">2. Use in Templates</h3>
                <pre class="bg-muted p-3 rounded text-sm overflow-x-auto"><code><lib-button variant="outline" size="lg">
  Click me
</lib-button></code></pre>
              </div>

              <div>
                <h3 class="text-lg font-medium text-foreground mb-2">3. With Icons</h3>
                <pre class="bg-muted p-3 rounded text-sm overflow-x-auto"><code><lib-button [leftIcon]="StarIcon" (onClick)="handleClick()">
  Star this repo
</lib-button></code></pre>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class DemoComponent implements OnInit {
  // Icon imports for demo
  readonly StarIcon = Star;
  readonly HeartIcon = Heart;
  readonly DownloadIcon = Download;
  readonly SettingsIcon = Settings;
  readonly SunIcon = Sun;
  readonly MoonIcon = Moon;

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {
    // Theme is handled by ThemeService now
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  handleClick(): void {
    console.log('Button clicked!');
  }
}