import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Plus, Check } from 'lucide-angular';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'lib-button-demo',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ButtonComponent],
  template: `
    <div class="space-y-8">
      <div class="mb-4">
        <h3 class="text-2xl font-semibold text-foreground mb-4">Variants</h3>
        <div class="flex flex-wrap gap-4 mb-4">
          <lib-button variant="default">Default</lib-button>
          <lib-button variant="secondary">Secondary</lib-button>
          <lib-button variant="destructive">Destructive</lib-button>
          <lib-button variant="outline">Outline</lib-button>
          <lib-button variant="ghost">Ghost</lib-button>
          <lib-button variant="link">Link</lib-button>
        </div>
      </div>

      <div class="mb-4">
        <h3 class="text-2xl font-semibold text-foreground mb-4">Sizes</h3>
        <div class="flex flex-wrap items-center gap-4 mb-4">
          <lib-button size="sm">Small</lib-button>
          <lib-button size="default">Default</lib-button>
          <lib-button size="lg">Large</lib-button>
          <lib-button size="icon">
            <lucide-angular [img]="plus" class="w-4 h-4"></lucide-angular>
          </lib-button>
        </div>
      </div>

      <div class="mb-4">
        <h3 class="text-2xl font-semibold text-foreground mb-4">States</h3>
        <div class="flex flex-wrap gap-4 mb-4">
          <lib-button [disabled]="true">Disabled</lib-button>
          <lib-button variant="outline" [disabled]="true">Disabled Outline</lib-button>
        </div>
      </div>

      <div class="mb-4">
        <h3 class="text-2xl font-semibold text-foreground mb-4">With Icons</h3>
        <div class="flex flex-wrap gap-4 mb-4">
          <lib-button>
            <lucide-angular [img]="check" class="w-4 h-4"></lucide-angular>
            With Icon
          </lib-button>
          <lib-button variant="outline" size="icon">
            <lucide-angular [img]="plus" class="w-4 h-4"></lucide-angular>
          </lib-button>
        </div>
      </div>

      <div class="mb-4">
        <h3 class="text-2xl font-semibold text-foreground mb-4">Interactive</h3>
        <div class="flex flex-wrap gap-4 mb-4">
          <lib-button (clicked)="handleClick()">Click me</lib-button>
          <lib-button type="submit">Submit</lib-button>
          <lib-button type="reset">Reset</lib-button>
        </div>
        <p class="mt-2 text-sm text-muted-foreground">Click count: {{ clickCount() }}</p>
      </div>
    </div>
  `,
})
export class ButtonDemoComponent {
  clickCount = signal(0);

  readonly plus = Plus;
  readonly check = Check;

  handleClick() {
    this.clickCount.update(count => count + 1);
  }
}