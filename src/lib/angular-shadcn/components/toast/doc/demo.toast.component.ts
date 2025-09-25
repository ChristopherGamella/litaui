import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from '../toast.component';

@Component({
  selector: 'lib-toast-demo',
  standalone: true,
  imports: [CommonModule, ToastComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-4">Default Toast</h3>
        <div class="max-w-sm">
          <lib-toast
            title="Success!"
            description="Your changes have been saved successfully."
          ></lib-toast>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Toast with Action</h3>
        <div class="max-w-sm">
          <lib-toast
            title="Notification"
            description="You have a new message."
            action="View"
          ></lib-toast>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Destructive Toast</h3>
        <div class="max-w-sm">
          <lib-toast
            variant="destructive"
            title="Error"
            description="Something went wrong. Please try again."
            action="Retry"
          ></lib-toast>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Toast with Long Content</h3>
        <div class="max-w-sm">
          <lib-toast
            title="Important Update"
            description="This is a longer description that demonstrates how the toast handles more content. It should wrap appropriately and maintain readability."
            action="Learn More"
          ></lib-toast>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Title Only Toast</h3>
        <div class="max-w-sm">
          <lib-toast
            title="Quick Notification"
          ></lib-toast>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Description Only Toast</h3>
        <div class="max-w-sm">
          <lib-toast
            description="This toast only has a description without a title."
          ></lib-toast>
        </div>
      </div>
    </div>
  `,
})
export class ToastDemoComponent {}