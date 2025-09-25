import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../input.component';
import { LucideAngularModule, Search, Mail, User, Check } from 'lucide-angular';

@Component({
  selector: 'lib-input-demo',
  standalone: true,
  imports: [CommonModule, InputComponent, LucideAngularModule],
  template: `
    <div class="space-y-8">
      <div>
        <h3 class="text-2xl font-semibold text-foreground mb-4">Variants</h3>
        <div>
          <lib-input class="mb-4" placeholder="Default input" />
          <lib-input class="mb-4" variant="error" placeholder="Error input" />
          <lib-input variant="success" placeholder="Success input" />
        </div>
      </div>

      <div>
        <h3 class="text-2xl font-semibold text-foreground mb-4">Sizes</h3>
        <div>
          <lib-input class="mb-4" size="sm" placeholder="Small input" />
          <lib-input class="mb-4" size="md" placeholder="Medium input" />
          <lib-input size="lg" placeholder="Large input" />
        </div>
      </div>

      <div>
        <h3 class="text-2xl font-semibold text-foreground mb-4">With Icons</h3>
        <div>
          <lib-input class="mb-4" [leadingIcon]="search" placeholder="Search..." />
          <lib-input class="mb-4" [trailingIcon]="mail" placeholder="Email" />
          <lib-input [leadingIcon]="user" [trailingIcon]="check" placeholder="Username" />
        </div>
      </div>

      <div>
        <h3 class="text-2xl font-semibold text-foreground mb-4">States</h3>
        <div>
          <lib-input class="mb-4" placeholder="Normal state" />
          <lib-input class="mb-4" [disabled]="true" placeholder="Disabled input" />
          <lib-input variant="error" placeholder="Error input" />
        </div>
      </div>

      <div>
        <h3 class="text-2xl font-semibold text-foreground mb-4">Input Types</h3>
        <div>
          <lib-input class="mb-4" type="email" placeholder="Email" />
          <lib-input class="mb-4" type="password" placeholder="Password" />
          <lib-input type="number" placeholder="Number" />
        </div>
      </div>
    </div>
  `,
})
export class InputDemoComponent {
  readonly search = Search;
  readonly mail = Mail;
  readonly user = User;
  readonly check = Check;
}