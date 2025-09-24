import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button.component';
import { Mail, Heart } from 'lucide-angular';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <div class="p-8 space-y-8">
      <div>
        <h2 class="text-2xl font-bold mb-4">Button Variants</h2>
        <div class="flex flex-wrap gap-4">
          <lib-button variant="primary">Primary</lib-button>
          <lib-button variant="destructive">Destructive</lib-button>
          <lib-button variant="outline">Outline</lib-button>
          <lib-button variant="secondary">Secondary</lib-button>
          <lib-button variant="ghost">Ghost</lib-button>
          <lib-button variant="link">Link</lib-button>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-bold mb-4">Button Sizes</h2>
        <div class="flex flex-wrap items-center gap-4">
          <lib-button size="xs">Extra Small</lib-button>
          <lib-button size="sm">Small</lib-button>
          <lib-button size="default">Default</lib-button>
          <lib-button size="lg">Large</lib-button>
          <lib-button size="xl">Extra Large</lib-button>
          <lib-button size="icon" ariaLabel="Icon button">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
          </lib-button>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-bold mb-4">Button States</h2>
        <div class="flex flex-wrap gap-4">
          <lib-button [disabled]="true">Disabled</lib-button>
          <lib-button [loading]="true">Loading</lib-button>
          <lib-button [loading]="true" loadingText="Saving...">Saving...</lib-button>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-bold mb-4">Button with Icons</h2>
        <div class="flex flex-wrap gap-4">
          <lib-button [leftIcon]="mailIcon">Send Email</lib-button>
          <lib-button [rightIcon]="heartIcon">Like</lib-button>
          <lib-button variant="outline" [leftIcon]="mailIcon" [rightIcon]="heartIcon">Both Icons</lib-button>
        </div>
      </div>
    </div>
  `
})
export class ButtonDemoComponent {
  mailIcon = Mail;
  heartIcon = Heart;
}