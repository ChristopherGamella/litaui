import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Star, Heart, Download, Settings } from 'lucide-angular';
import { ButtonComponent } from './button.component';

/**
 * Demo component showcasing the shadcn-inspired Angular component library
 * This demonstrates how to use the design system with your existing color palette
 */
@Component({
  selector: 'lib-demo',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ButtonComponent],
  template: `
    <div class="p-8 max-w-4xl mx-auto bg-background-main min-h-screen">
      <div class="space-y-12">
        <!-- Header -->
        <div class="text-center space-y-4">
          <h1 class="text-4xl font-bold text-text-primary">
            Shadcn-Angular Design System
          </h1>
          <p class="text-lg text-text-secondary max-w-2xl mx-auto">
            A modern, accessible component library built with Angular 20, TailwindCSS 4,
            and your existing professional color palette.
          </p>
        </div>

        <!-- Button Variants Demo -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-text-primary">Button Variants</h2>
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
          <h2 class="text-2xl font-semibold text-text-primary">Button Sizes</h2>
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
          <h2 class="text-2xl font-semibold text-text-primary">Buttons with Icons</h2>
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
          <h2 class="text-2xl font-semibold text-text-primary">Button States</h2>
          <div class="flex flex-wrap gap-4">
            <lib-button [disabled]="true">Disabled</lib-button>
            <lib-button [loading]="true">Loading</lib-button>
            <lib-button [loading]="true" loadingText="Saving...">Custom Loading</lib-button>
          </div>
        </section>

        <!-- Color System Demo -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-text-primary">Color System Integration</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Primary Colors -->
            <div class="space-y-3">
              <h3 class="text-lg font-medium text-text-primary">Primary Colors</h3>
              <div class="space-y-2">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded bg-primary-900"></div>
                  <span class="text-sm text-text-secondary">Primary 900</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded bg-primary-700"></div>
                  <span class="text-sm text-text-secondary">Primary 700</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded bg-primary-100"></div>
                  <span class="text-sm text-text-secondary">Primary 100</span>
                </div>
              </div>
            </div>

            <!-- Accent Colors -->
            <div class="space-y-3">
              <h3 class="text-lg font-medium text-text-primary">Accent Colors</h3>
              <div class="space-y-2">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded bg-accent-600"></div>
                  <span class="text-sm text-text-secondary">Accent 600</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded bg-accent-500"></div>
                  <span class="text-sm text-text-secondary">Accent 500</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded bg-accent-100"></div>
                  <span class="text-sm text-text-secondary">Accent 100</span>
                </div>
              </div>
            </div>

            <!-- Status Colors -->
            <div class="space-y-3">
              <h3 class="text-lg font-medium text-text-primary">Status Colors</h3>
              <div class="space-y-2">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded bg-green-500"></div>
                  <span class="text-sm text-text-secondary">Success</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded bg-red-500"></div>
                  <span class="text-sm text-text-secondary">Error</span>
                </div>
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 rounded bg-yellow-500"></div>
                  <span class="text-sm text-text-secondary">Warning</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Typography Demo -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-text-primary">Typography Scale</h2>
          <div class="space-y-4">
            <div>
              <p class="text-xs text-text-muted">Extra Small (text-xs)</p>
              <p class="text-sm text-text-secondary">Small (text-sm)</p>
              <p class="text-base text-text-primary">Base (text-base)</p>
              <p class="text-lg text-text-primary">Large (text-lg)</p>
              <p class="text-xl font-medium text-text-primary">Extra Large (text-xl)</p>
              <p class="text-2xl font-semibold text-text-primary">2XL (text-2xl)</p>
            </div>
          </div>
        </section>

        <!-- Usage Instructions -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-text-primary">How to Use</h2>
          <div class="bg-background-elevated p-6 rounded-lg border border-primary-100">
            <div class="space-y-4">
              <div>
                <h3 class="text-lg font-medium text-text-primary mb-2">1. Import Components</h3>
                <pre class="bg-background-subtle p-3 rounded text-sm overflow-x-auto"><code>import {{ '{' }} ButtonComponent {{ '}' }} from './lib/components/ui/button.component';</code></pre>
              </div>

              <div>
                <h3 class="text-lg font-medium text-text-primary mb-2">2. Use in Templates</h3>
                <pre class="bg-background-subtle p-3 rounded text-sm overflow-x-auto"><code><lib-button variant="outline" size="lg">
  Click me
</lib-button></code></pre>
              </div>

              <div>
                <h3 class="text-lg font-medium text-text-primary mb-2">3. With Icons</h3>
                <pre class="bg-background-subtle p-3 rounded text-sm overflow-x-auto"><code><lib-button [leftIcon]="StarIcon" (onClick)="handleClick()">
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
export class DemoComponent {
  // Icon imports for demo
  readonly StarIcon = Star;
  readonly HeartIcon = Heart;
  readonly DownloadIcon = Download;
  readonly SettingsIcon = Settings;

  handleClick(): void {
    console.log('Button clicked!');
  }
}