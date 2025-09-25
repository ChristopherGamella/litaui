import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from '../badge.component';

@Component({
  selector: 'lib-badge-demo',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-4">Variants</h3>
        <div class="flex flex-wrap gap-4">
          <lib-badge variant="primary">Primary</lib-badge>
          <lib-badge variant="secondary">Secondary</lib-badge>
          <lib-badge variant="destructive">Destructive</lib-badge>
          <lib-badge variant="outline">Outline</lib-badge>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Sizes</h3>
        <div class="flex flex-wrap items-center gap-4">
          <lib-badge size="sm">Small</lib-badge>
          <lib-badge size="md">Medium</lib-badge>
          <lib-badge size="lg">Large</lib-badge>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Common Use Cases</h3>
        <div class="flex flex-wrap gap-4">
          <lib-badge variant="secondary">New</lib-badge>
          <lib-badge variant="destructive">Error</lib-badge>
          <lib-badge variant="outline">Beta</lib-badge>
          <lib-badge>Default</lib-badge>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">With Icons</h3>
        <div class="flex flex-wrap gap-4">
          <lib-badge variant="secondary">
            <span class="mr-1">★</span>
            Featured
          </lib-badge>
          <lib-badge variant="destructive">
            <span class="mr-1">⚠</span>
            Warning
          </lib-badge>
          <lib-badge variant="outline">
            <span class="mr-1">✓</span>
            Verified
          </lib-badge>
        </div>
      </div>
    </div>
  `,
})
export class BadgeDemoComponent {}