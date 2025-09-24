import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { BadgeComponent } from './badge/badge.component';
import { AvatarComponent } from './avatar/avatar.component';
import { AccordionComponent } from './accordion/accordion.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ToastComponent } from './toast/toast.component';
import { ToggleComponent } from './toggle/toggle.component';

interface AccordionItem {
  id: string;
  title: string;
  content?: string;
  icon?: any;
  disabled?: boolean;
  headerTemplate?: any;
  contentTemplate?: any;
  expanded?: boolean;
}

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
    BadgeComponent,
    AvatarComponent,
    AccordionComponent,
    BreadcrumbComponent,
    ToastComponent,
    ToggleComponent
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
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <lib-button variant="primary">Primary</lib-button>
            <lib-button variant="secondary">Secondary</lib-button>
            <lib-button variant="destructive">Destructive</lib-button>
            <lib-button variant="outline">Outline</lib-button>
            <lib-button variant="ghost">Ghost</lib-button>
            <lib-button variant="link">Link</lib-button>
          </div>
        </section>

        <!-- Badges -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-foreground">Badges</h2>
          <div class="flex flex-wrap gap-4">
            <lib-badge variant="primary">Primary</lib-badge>
            <lib-badge variant="secondary">Secondary</lib-badge>
            <lib-badge variant="destructive">Destructive</lib-badge>
            <lib-badge variant="outline">Outline</lib-badge>
          </div>
        </section>

        <!-- Toggles -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-foreground">Toggles</h2>
          <div class="flex flex-wrap gap-4">
            <lib-toggle [pressed]="togglePressed1()" (pressedChange)="togglePressed1.set($event)">Default</lib-toggle>
            <lib-toggle variant="outline" [pressed]="togglePressed2()" (pressedChange)="togglePressed2.set($event)">Outline</lib-toggle>
            <lib-toggle size="sm" [pressed]="togglePressed3()" (pressedChange)="togglePressed3.set($event)">Small</lib-toggle>
            <lib-toggle size="lg" [pressed]="togglePressed4()" (pressedChange)="togglePressed4.set($event)">Large</lib-toggle>
          </div>
        </section>

        <!-- Avatars -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-foreground">Avatars</h2>
          <div class="flex gap-4">
            <lib-avatar>
              <img src="https://github.com/shadcn.png" alt="Avatar" />
            </lib-avatar>
            <lib-avatar fallback="CG">CG</lib-avatar>
          </div>
        </section>

        <!-- Accordions -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-foreground">Accordions</h2>
          <lib-accordion [items]="accordionItems"></lib-accordion>
        </section>

        <!-- Breadcrumbs -->
        <section class="space-y-6">
          <h2 class="text-2xl font-semibold text-foreground">Breadcrumbs</h2>
          <lib-breadcrumb [items]="breadcrumbItems"></lib-breadcrumb>
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

  // Toggle states
  togglePressed1 = signal(false);
  togglePressed2 = signal(false);
  togglePressed3 = signal(false);
  togglePressed4 = signal(false);

  accordionItems: AccordionItem[] = [
    {
      id: 'item-1',
      title: 'Is it accessible?',
      content: 'Yes. It adheres to the WAI-ARIA design pattern.'
    },
    {
      id: 'item-2',
      title: 'Is it styled?',
      content: 'Yes. It comes with default styles that match the other components.'
    },
    {
      id: 'item-3',
      title: 'Can it be customized?',
      content: 'Yes. You can customize the appearance and behavior using variants and props.'
    }
  ];

  breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', href: '/' },
    { label: 'Library', href: '/library' },
    { label: 'Components' }
  ];

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