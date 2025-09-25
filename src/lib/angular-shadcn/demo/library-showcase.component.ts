import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../components/button/button.component';
import { BadgeComponent } from '../components/badge/badge.component';
import { BadgeDemoComponent } from '../components/badge/doc/demo.badge.component';
import { AvatarComponent } from '../components/avatar/avatar.component';
import { AvatarDemoComponent } from '../components/avatar/doc/demo.avatar.component';
import { AccordionDemoComponent } from '../components/accordion/doc/demo.accordion.component';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { BreadcrumbDemoComponent } from '../components/breadcrumb/doc/demo.breadcrumb.component';
import { ToastComponent } from '../components/toast/toast.component';
import { ToastDemoComponent } from '../components/toast/doc/demo.toast.component';
import { ToggleComponent } from '../components/toggle/toggle.component';
import { ToggleDemoComponent } from '../components/toggle/doc/demo.toggle.component';
import { ButtonDemoComponent } from '../components/button/doc/demo.button.component';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ToastData {
  id: string;
  variant?: 'default' | 'destructive';
  title?: string;
  description?: string;
  action?: string;
}

@Component({
  selector: 'lib-library-showcase',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    BadgeDemoComponent,
    AvatarDemoComponent,
    AccordionDemoComponent,
    BreadcrumbDemoComponent,
    ToastComponent,
    ToastDemoComponent,
    ToggleDemoComponent,
    ButtonDemoComponent
  ],
  template: `
    <div class="p-8 max-w-6xl mx-auto bg-background min-h-screen">
      <div class="space-y-12">
        <div class="text-center space-y-4">
          <h1 class="text-4xl font-bold text-foreground">
            Angular Shadcn Library Components
          </h1>
          <p class="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive showcase of all available components in the library.
          </p>
        </div>

        <!-- Buttons -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-foreground">Buttons</h2>
          <lib-button-demo></lib-button-demo>
        </section>

        <!-- Badges -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-foreground">Badges</h2>
          <lib-badge-demo></lib-badge-demo>
        </section>

        <!-- Toggles -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-foreground">Toggles</h2>
          <lib-toggle-demo></lib-toggle-demo>
        </section>

        <!-- Avatars -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-foreground">Avatars</h2>
          <lib-avatar-demo></lib-avatar-demo>
        </section>

        <!-- Accordions -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-foreground">Accordions</h2>
          <lib-accordion-demo></lib-accordion-demo>
        </section>

        <!-- Breadcrumbs -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-foreground">Breadcrumbs</h2>
          <lib-breadcrumb-demo></lib-breadcrumb-demo>
        </section>

        <!-- Toasts -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-foreground">Toasts</h2>
          <div class="space-y-4">
            <p class="text-sm text-muted-foreground">
              Toasts appear as temporary notifications, typically positioned in the bottom-right corner of the screen.
              Click the buttons below to see them in action.
            </p>
            <div class="flex flex-wrap gap-4">
              <lib-button (onClick)="showSuccessToast()">Show Success Toast</lib-button>
              <lib-button variant="destructive" (onClick)="showErrorToast()">Show Error Toast</lib-button>
              <lib-button variant="secondary" (onClick)="showInfoToast()">Show Info Toast</lib-button>
            </div>
          </div>
          <div class="mt-8">
            <h3 class="text-lg font-semibold mb-4">Static Toast Examples</h3>
            <lib-toast-demo></lib-toast-demo>
          </div>
        </section>
      </div>

      <!-- Toast Container - Positioned in bottom-right corner -->
      <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
        @for (toast of visibleToasts(); track toast.id) {
          <lib-toast
            [variant]="toast.variant"
            [title]="toast.title"
            [description]="toast.description"
            [action]="toast.action"
            (closeClicked)="hideToast(toast.id)"
            (actionClicked)="onToastAction(toast.id)"
          ></lib-toast>
        }
      </div>
    </div>
  `
})
export class LibraryShowcaseComponent {
  // Reactive state for toasts
  visibleToasts = signal<ToastData[]>([]);





  showSuccessToast() {
    const toast: ToastData = {
      id: `toast-${Date.now()}`,
      variant: 'default',
      title: 'Success!',
      description: 'Your changes have been saved successfully.',
      action: 'Undo'
    };
    this.addToast(toast);
  }

  showErrorToast() {
    const toast: ToastData = {
      id: `toast-${Date.now()}`,
      variant: 'destructive',
      title: 'Error',
      description: 'Something went wrong. Please try again.'
    };
    this.addToast(toast);
  }

  showInfoToast() {
    const toast: ToastData = {
      id: `toast-${Date.now()}`,
      variant: 'default',
      title: 'Notification',
      description: 'You have a new message.'
    };
    this.addToast(toast);
  }

  private addToast(toast: ToastData) {
    this.visibleToasts.update(toasts => [...toasts, toast]);
    // Auto-hide after 5 seconds
    setTimeout(() => {
      this.hideToast(toast.id);
    }, 5000);
  }

  hideToast(id: string) {
    this.visibleToasts.update(toasts => toasts.filter(t => t.id !== id));
  }

  onToastAction(id: string) {
    // Handle toast action (e.g., undo operation)
    console.log('Toast action clicked:', id);
    this.hideToast(id);
  }
}