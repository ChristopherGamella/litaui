import { Component } from '@angular/core';
import { SimpleButtonComponent } from '../../components/ui/simple-button.component';

/**
 * Ultra-minimal button demo for maximum performance
 * No external dependencies, minimal styling
 */
@Component({
  selector: 'lib-minimal-demo',
  standalone: true,
  imports: [SimpleButtonComponent],
  template: `
    <div style="padding: 2rem; max-width: 800px; margin: 0 auto;">
      <h1 style="margin-bottom: 2rem; font-size: 2rem; font-weight: bold; color: #111827;">
        Minimal Button Demo
      </h1>
      
      <!-- Basic Test -->
      <section style="margin-bottom: 2rem;">
        <h2 style="margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600; color: #1f2937;">
          Basic Button
        </h2>
        <lib-simple-button>Click Me</lib-simple-button>
      </section>

      <!-- Variants -->
      <section style="margin-bottom: 2rem;">
        <h2 style="margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600; color: #1f2937;">
          Variants
        </h2>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <lib-simple-button variant="default">Default</lib-simple-button>
          <lib-simple-button variant="secondary">Secondary</lib-simple-button>
          <lib-simple-button variant="outline">Outline</lib-simple-button>
          <lib-simple-button variant="ghost">Ghost</lib-simple-button>
          <lib-simple-button variant="destructive">Destructive</lib-simple-button>
        </div>
      </section>

      <!-- Sizes -->
      <section style="margin-bottom: 2rem;">
        <h2 style="margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600; color: #1f2937;">
          Sizes
        </h2>
        <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
          <lib-simple-button size="sm">Small</lib-simple-button>
          <lib-simple-button size="default">Default</lib-simple-button>
          <lib-simple-button size="lg">Large</lib-simple-button>
        </div>
      </section>

      <!-- States -->
      <section style="margin-bottom: 2rem;">
        <h2 style="margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600; color: #1f2937;">
          States
        </h2>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <lib-simple-button>Normal</lib-simple-button>
          <lib-simple-button [disabled]="true">Disabled</lib-simple-button>
          <lib-simple-button [loading]="true">Loading</lib-simple-button>
        </div>
      </section>

      <!-- Performance Test -->
      <section style="margin-bottom: 2rem;">
        <h2 style="margin-bottom: 1rem; font-size: 1.25rem; font-weight: 600; color: #1f2937;">
          Performance Test (Many Buttons)
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 0.5rem; max-height: 200px; overflow-y: auto; border: 1px solid #ddd; padding: 1rem;">
          @for (i of buttonArray; track i) {
            <lib-simple-button size="sm">Button {{ i }}</lib-simple-button>
          }
        </div>
        <p style="margin-top: 0.5rem; color: #4b5563; font-size: 0.875rem;">
          Rendering {{ buttonArray.length }} buttons for performance testing
        </p>
      </section>
    </div>
  `
})
export class MinimalDemoComponent {
  // Create array of numbers for performance testing
  buttonArray = Array.from({ length: 100 }, (_, i) => i + 1);

  constructor() {
    console.log('MinimalDemoComponent initialized - Testing performance with', this.buttonArray.length, 'buttons');
  }
}