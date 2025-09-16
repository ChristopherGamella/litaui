import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/ui/button.component';

/**
 * Minimal button demo component for performance testing
 * Only displays the button component with basic variations
 */
@Component({
  selector: 'lib-button-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="p-8 max-w-2xl mx-auto min-h-screen">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2 text-gray-900">Button Component Demo</h1>
        <p class="text-gray-600">Testing the button component with minimal overhead</p>
      </div>

      <!-- Basic Button Test -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-900">Basic Button</h2>
        <lib-button>Click Me</lib-button>
      </section>

      <!-- Variants -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-900">Variants</h2>
        <div class="flex flex-wrap gap-4">
          <lib-button variant="default">Default</lib-button>
          <lib-button variant="secondary">Secondary</lib-button>
          <lib-button variant="outline">Outline</lib-button>
          <lib-button variant="ghost">Ghost</lib-button>
          <lib-button variant="destructive">Destructive</lib-button>
        </div>
      </section>

      <!-- Sizes -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-900">Sizes</h2>
        <div class="flex flex-wrap items-center gap-4">
          <lib-button size="sm">Small</lib-button>
          <lib-button size="default">Default</lib-button>
          <lib-button size="lg">Large</lib-button>
        </div>
      </section>

      <!-- States -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-900">States</h2>
        <div class="flex flex-wrap gap-4">
          <lib-button>Normal</lib-button>
          <lib-button [disabled]="true">Disabled</lib-button>
          <lib-button [loading]="true">Loading</lib-button>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background: white;
    }
  `]
})
export class ButtonDemoComponent {
  constructor() {
    console.log('ButtonDemoComponent initialized');
  }
}