import { Component, Input, Output, EventEmitter, HostBinding, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { cva, type VariantProps } from '../../utils/cn';
import { AlertProps } from '../../types';

/**
 * Alert variants configuration
 * Following shadcn/ui design patterns with Angular integration
 */
export const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: "border-green-500/50 text-green-700 dark:border-green-500 [&>svg]:text-green-600",
        warning: "border-yellow-500/50 text-yellow-700 dark:border-yellow-500 [&>svg]:text-yellow-600",
        info: "border-blue-500/50 text-blue-700 dark:border-blue-500 [&>svg]:text-blue-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type AlertVariant = VariantProps<typeof alertVariants>;

/**
 * Alert component following shadcn/ui design patterns
 * Integrated with your existing color system and design tokens
 */
@Component({
  selector: 'lib-alert',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div
      role="alert"
      [class]="alertClasses"
      [attr.data-testid]="dataTestid"
    >
      <!-- Icon -->
      @if (icon) {
        <lucide-angular [img]="icon" size="16" class="flex-shrink-0"></lucide-angular>
      }

      <!-- Content -->
      <div class="flex-1">
        <!-- Title -->
        @if (title) {
          <h5 class="mb-1 font-medium leading-none tracking-tight text-foreground">
            {{ title }}
          </h5>
        }

        <!-- Description -->
        @if (description) {
          <div class="text-sm text-muted-foreground">
            <ng-content></ng-content>
            @if (!hasProjectedContent) {
              {{ description }}
            }
          </div>
        } @else {
          <ng-content></ng-content>
        }
      </div>

      <!-- Dismiss Button -->
      @if (dismissible) {
        <button
          type="button"
          class="absolute right-4 top-4 flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          (click)="handleDismiss($event)"
          [attr.aria-label]="'Dismiss ' + (title || 'alert')"
        >
          <lucide-angular [img]="XIcon()" size="16"></lucide-angular>
        </button>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    /* Auto-dismiss animation */
    .alert-fade-out {
      animation: alert-fade-out 0.3s ease-out forwards;
    }

    @keyframes alert-fade-out {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(-10px);
      }
    }

    /* Success variant styles */
    :host-context(.alert-success) {
      border-color: var(--color-green-500);
      background-color: var(--color-green-50);
    }

    /* Error/Destructive variant styles */
    :host-context(.alert-destructive) {
      border-color: var(--color-red-500);
      background-color: var(--color-red-50);
    }

    /* Warning variant styles */
    :host-context(.alert-warning) {
      border-color: var(--color-yellow-500);
      background-color: var(--color-yellow-50);
    }

    /* Info variant styles */
    :host-context(.alert-info) {
      border-color: var(--color-blue-500);
      background-color: var(--color-blue-50);
    }
  `]
})
export class AlertComponent implements AlertProps {
  // Component inputs
  @Input() variant: 'default' | 'destructive' | 'success' | 'warning' | 'info' = 'default';
  @Input() title?: string;
  @Input() description?: string;
  @Input() icon?: any;
  @Input() dismissible = false;
  @Input() autoClose?: number; // Auto close timeout in milliseconds
  @Input() id?: string;
  @Input() class?: string;
  @Input() dataTestid?: string;

  // Event outputs
  @Output() onDismiss = new EventEmitter<void>();
  @Output() onAutoClose = new EventEmitter<void>();

  // Internal state
  hasProjectedContent = false;
  private autoCloseTimer?: number;

  // Icon imports (for dismiss button)
  XIcon = signal<any>(null);

  constructor() {
    // Dynamic import for X icon (dismiss button)
    import('lucide-angular').then(({ X }) => {
      this.XIcon.set(X);
    });
  }

  ngOnInit(): void {
    // Set up auto-close timer if specified
    if (this.autoClose && this.autoClose > 0) {
      this.autoCloseTimer = window.setTimeout(() => {
        this.handleAutoClose();
        // Change detection is automatic with signals
      }, this.autoClose);
    }
  }

  ngOnDestroy(): void {
    // Clear auto-close timer
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
    }
  }

  ngAfterContentInit(): void {
    // Check if content is projected
    // This would be handled by Angular's content projection detection
  }

  /**
   * Computed alert classes using the variant system
   */
  get alertClasses(): string {
    const variantClasses = alertVariants({
      variant: this.variant as any,
    });

    const classes = [variantClasses];

    // Add custom class if provided
    if (this.class) {
      classes.push(this.class);
    }

    return classes.join(' ');
  }

  /**
   * Handle alert dismissal
   */
  handleDismiss(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    // Clear auto-close timer if it exists
    if (this.autoCloseTimer) {
      clearTimeout(this.autoCloseTimer);
    }

    // Add fade-out animation
    const element = event.target as HTMLElement;
    const alertElement = element.closest('[role="alert"]') as HTMLElement;
    if (alertElement) {
      alertElement.classList.add('alert-fade-out');

      // Emit event after animation
      setTimeout(() => {
        this.onDismiss.emit();
        // Change detection is automatic with signals
      }, 300);
    } else {
      this.onDismiss.emit();
    }
  }

  /**
   * Handle auto-close
   */
  private handleAutoClose(): void {
    this.onAutoClose.emit();
  }

  /**
   * Get the appropriate icon for the variant
   */
  getVariantIcon(): any {
    // This could return default icons based on variant
    // For now, users should provide their own icons
    return this.icon;
  }
}

/**
 * Alert Title component for better structure
 */
@Component({
  selector: 'lib-alert-title',
  standalone: true,
  template: `
    <h5 class="mb-1 font-medium leading-none tracking-tight">
      <ng-content></ng-content>
    </h5>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AlertTitleComponent {}

/**
 * Alert Description component for better structure
 */
@Component({
  selector: 'lib-alert-description',
  standalone: true,
  template: `
    <div class="text-sm [&_p]:leading-relaxed">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class AlertDescriptionComponent {}