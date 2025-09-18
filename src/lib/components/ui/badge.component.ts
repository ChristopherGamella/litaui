import { Component, computed, input, output, HostBinding, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { cva, type VariantProps } from '../../utils/cn';
import { BadgeProps } from '../../types';

/**
 * Badge variants configuration
 * Following shadcn/ui design patterns with Angular integration
 */
export const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        success: "border-transparent bg-green-500 text-white hover:bg-green-600",
        warning: "border-transparent bg-yellow-500 text-white hover:bg-yellow-600",
        info: "border-transparent bg-blue-500 text-white hover:bg-blue-600",
      },
      size: {
        xs: "px-1.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-xs",
        lg: "px-3 py-1 text-sm",
      },
      shape: {
        rounded: "rounded-full",
        square: "rounded-md",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      shape: "rounded",
    },
  }
);

export type BadgeVariant = VariantProps<typeof badgeVariants>;

/**
 * Badge component following shadcn/ui design patterns
 * Integrated with your existing color system and design tokens
 */
@Component({
  selector: 'lib-badge',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <span
      [class]="badgeClasses()"
      [attr.data-testid]="dataTestid()"
    >
      <!-- Left Icon -->
      @if (leftIcon()) {
        <lucide-angular [img]="leftIcon()" size="12" class="mr-1 flex-shrink-0"></lucide-angular>
      }

      <!-- Badge Content -->
      <ng-content></ng-content>

      <!-- Right Icon -->
      @if (rightIcon()) {
        <lucide-angular [img]="rightIcon()" size="12" class="ml-1 flex-shrink-0"></lucide-angular>
      }

      <!-- Dismiss Button -->
      @if (dismissible()) {
        <button
          type="button"
          class="ml-1 flex-shrink-0 hover:bg-black/10 rounded-full p-0.5 transition-colors"
          (click)="handleDismiss($event)"
          [attr.aria-label]="'Remove ' + (ariaLabel() || 'badge')"
        >
          <lucide-angular [img]="XIcon()" size="10"></lucide-angular>
        </button>
      }
    </span>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    /* Ensure proper spacing and alignment */
    span {
      display: inline-flex;
      align-items: center;
      white-space: nowrap;
    }

    /* Focus styles for interactive badges */
    :host-context(.badge-focusable) span:focus {
      outline: 2px solid var(--color-ring);
      outline-offset: 2px;
    }
  `]
})
export class BadgeComponent {
  // Signal inputs
  readonly variant = input<'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info'>('default');
  readonly size = input<'xs' | 'sm' | 'md' | 'lg'>('md');
  readonly shape = input<'rounded' | 'square' | 'pill'>('rounded');
  readonly leftIcon = input<any>();
  readonly rightIcon = input<any>();
  readonly dismissible = input<boolean>(false);
  readonly id = input<string>();
  readonly class = input<string>();
  readonly dataTestid = input<string>();
  readonly ariaLabel = input<string>();

  // Signal outputs
  readonly onDismiss = output<void>();

  // Icon imports (for dismiss button)
  XIcon = signal<any>(null);

  constructor() {
    // Dynamic import for X icon (dismiss button)
    import('lucide-angular').then(({ X }) => {
      this.XIcon.set(X);
    });
  }

  /**
   * Computed badge classes using the variant system
   */
  readonly badgeClasses = computed(() => {
    const variantClasses = badgeVariants({
      variant: this.variant() as any,
      size: this.size() as any,
      shape: this.shape() as any,
    });

    const classes = [variantClasses];

    // Add custom class if provided
    const customClass = this.class();
    if (customClass) {
      classes.push(customClass);
    }

    return classes.join(' ');
  });

  /**
   * Handle badge dismissal
   */
  handleDismiss(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.onDismiss.emit();
  }

  /**
   * Get the badge text content (for accessibility)
   */
  get textContent(): string {
    // This would be used for screen readers if needed
    return this.ariaLabel() || '';
  }
}