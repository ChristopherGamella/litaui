import { Component, HostBinding, computed, input, output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { cva, type VariantProps, cn } from '../../utils/cn';

/**
 * Button variants configuration
 * Following shadcn/ui pattern with Angular integration  
 * Using proper CSS custom properties that map to TailwindCSS 4 theme
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        success: "bg-success text-success-foreground hover:bg-success/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "text-foreground hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-8 rounded px-2 text-xs",
        sm: "h-9 rounded-md px-3",
        default: "h-10 px-4 py-2",
        md: "h-10 px-4 py-2",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonVariant = VariantProps<typeof buttonVariants>;

/**
 * Button component following shadcn/ui design patterns
 * Enhanced with modern Angular signals and updated styling
 * 
 * @example
 * ```html
 * <!-- Basic usage -->
 * <lib-button>Click me</lib-button>
 * 
 * <!-- Variants -->
 * <lib-button variant="outline">Outline</lib-button>
 * <lib-button variant="destructive">Delete</lib-button>
 * <lib-button variant="success">Save</lib-button>
 * <lib-button variant="ghost">Ghost</lib-button>
 * <lib-button variant="link">Link</lib-button>
 * 
 * <!-- Sizes -->
 * <lib-button size="sm">Small</lib-button>
 * <lib-button size="lg">Large</lib-button>
 * <lib-button size="icon">
 *   <lucide-angular [img]="heartIcon" size="16"></lucide-angular>
 * </lib-button>
 * 
 * <!-- With icons -->
 * <lib-button [leftIcon]="mailIcon">
 *   Send Email
 * </lib-button>
 * 
 * <!-- Loading state -->
 * <lib-button [loading]="isSubmitting">
 *   Submit Form
 * </lib-button>
 * 
 * <!-- Event handling -->
 * <lib-button (onClick)="handleSave()">
 *   Save Changes
 * </lib-button>
 * ```
 */
@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled() || loading()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-describedby]="ariaDescribedBy()"
      [attr.aria-expanded]="ariaExpanded()"
      [attr.role]="role()"
      [attr.tabindex]="tabIndex()"
      [attr.data-testid]="dataTestid()"
      [class]="buttonClasses()"
      (click)="handleClick($event)"
      (focus)="onFocus.emit($event)"
      (blur)="onBlur.emit($event)"
      (keydown)="handleKeydown($event)"
    >
      <!-- Loading spinner -->
      @if (loading()) {
        <div class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true"></div>
        @if (loadingText()) {
          {{ loadingText() }}
        } @else {
          <span class="sr-only">Loading</span>
        }
      } @else {
        <!-- Left icon -->
        @if (leftIcon() && leftIcon() !== null && leftIcon() !== undefined) {
          <lucide-angular
            [img]="leftIcon()"
            size="16"
            class="shrink-0"
            aria-hidden="true"
          ></lucide-angular>
        }

        <!-- Button content -->
        <ng-content></ng-content>

        <!-- Right icon -->
        @if (rightIcon() && rightIcon() !== null && rightIcon() !== undefined) {
          <lucide-angular
            [img]="rightIcon()"
            size="16"
            class="shrink-0"
            aria-hidden="true"
          ></lucide-angular>
        }
      }
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    button {
      width: 100%;
    }

    /* Icon buttons should maintain their fixed dimensions */
    button.h-10.w-10 {
      width: 2.5rem !important;
    }

    :host-context(.full-width) button {
      width: 100%;
    }

    :host-context(.full-width) button.h-10.w-10 {
      width: 2.5rem !important;
    }

    /* Animation for loading state */
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }

    .animate-spin {
      animation: spin 1s linear infinite;
    }
  `]
})
export class ButtonComponent implements OnInit {
  // Modern signal inputs (Angular 20+)
  readonly variant = input<'default' | 'destructive' | 'success' | 'outline' | 'secondary' | 'ghost' | 'link'>('default');
  readonly size = input<'xs' | 'sm' | 'default' | 'md' | 'lg' | 'xl' | 'icon'>('default');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly loadingText = input<string>();
  readonly leftIcon = input<any>();
  readonly rightIcon = input<any>();
  readonly fullWidth = input<boolean>(false);
  readonly id = input<string>();
  readonly class = input<string>();
  readonly dataTestid = input<string>();
  readonly ariaLabel = input<string>();
  readonly ariaDescribedBy = input<string>();
  readonly ariaExpanded = input<boolean>();
  readonly role = input<string>();
  readonly tabIndex = input<number>();

  // Modern signal outputs
  onClick = output<Event>();
  onFocus = output<FocusEvent>();
  onBlur = output<FocusEvent>();
  onKeydown = output<KeyboardEvent>();

  ngOnInit(): void {
    // Component initialization without forced change detection
    // Modern Angular with signals handles this automatically
  }

  // Host bindings for dynamic classes
  @HostBinding('class')
  get hostClasses(): string {
    return this.fullWidth() ? 'full-width' : '';
  }

  @HostBinding('attr.data-loading')
  get isLoading(): boolean {
    return this.loading();
  }

  @HostBinding('attr.data-disabled')
  get isDisabled(): boolean {
    return this.disabled() || this.loading();
  }

  /**
   * Computed button classes using the variant system
   */
  protected buttonClasses = computed(() => {
    return cn(
      buttonVariants({
        variant: this.variant(),
        size: this.size(),
      }),
      this.class()
    );
  });

  /**
   * Handle button click with loading state check
   */
  protected handleClick(event: Event): void {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.onClick.emit(event);
    // Removed problematic ApplicationRef.tick() call that was causing recursive errors
  }

  /**
   * Handle keyboard events for accessibility
   * Supports Enter and Space key activation
   */
  protected handleKeydown(event: KeyboardEvent): void {
    // Handle Enter and Space keys for button activation
    if (event.key === 'Enter' || event.key === ' ') {
      if (this.disabled() || this.loading()) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      // Prevent default to avoid double-firing for space
      if (event.key === ' ') {
        event.preventDefault();
      }

      // Create and dispatch click event
      const clickEvent = new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      });
      this.handleClick(clickEvent);
    }

    this.onKeydown.emit(event);
  }
}