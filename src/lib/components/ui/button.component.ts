import { Component, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { cva, type VariantProps } from '../../utils/cn';
import { ButtonProps } from '../../types';

/**
 * Button variants configuration
 * Following shadcn/ui pattern with Angular integration
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-7 px-2 text-xs",
        sm: "h-9 px-3 rounded-md",
        md: "h-10 py-2 px-4",
        lg: "h-11 px-8 rounded-md",
        xl: "h-12 px-10 text-lg rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type ButtonVariant = VariantProps<typeof buttonVariants>;

/**
 * Button component following shadcn/ui design patterns
 * Integrated with your existing color system and Lucide icons
 */
@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [attr.aria-label]="ariaLabel"
      [attr.aria-describedby]="ariaDescribedBy"
      [attr.aria-expanded]="ariaExpanded"
      [attr.role]="role"
      [attr.tabindex]="tabIndex"
      [attr.data-testid]="dataTestid"
      [class]="buttonClasses"
      (click)="handleClick($event)"
      (focus)="onFocus.emit($event)"
      (blur)="onBlur.emit($event)"
      (keydown)="onKeydown.emit($event)"
    >
      <!-- Loading spinner -->
      @if (loading) {
        <div class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
        {{ loadingText || 'Loading...' }}
      } @else {
        <!-- Left icon -->
        @if (leftIcon) {
          <lucide-angular
            [img]="leftIcon"
            size="16"
            class="mr-2 flex-shrink-0"
          ></lucide-angular>
        }

        <!-- Button content -->
        <ng-content></ng-content>

        <!-- Right icon -->
        @if (rightIcon) {
          <lucide-angular
            [img]="rightIcon"
            size="16"
            class="ml-2 flex-shrink-0"
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

    :host-context(.full-width) button {
      width: 100%;
    }
  `]
})
export class ButtonComponent implements ButtonProps {
  // Component inputs
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' = 'default';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() loadingText?: string;
  @Input() leftIcon?: any;
  @Input() rightIcon?: any;
  @Input() fullWidth = false;
  @Input() id?: string;
  @Input() class?: string;
  @Input() dataTestid?: string;

  // Accessibility inputs
  @Input() ariaLabel?: string;
  @Input() ariaDescribedBy?: string;
  @Input() ariaExpanded?: boolean;
  @Input() role?: string;
  @Input() tabIndex?: number;

  // Event outputs
  @Output() onClick = new EventEmitter<Event>();
  @Output() onFocus = new EventEmitter<FocusEvent>();
  @Output() onBlur = new EventEmitter<FocusEvent>();
  @Output() onKeydown = new EventEmitter<KeyboardEvent>();

  // Host bindings for dynamic classes
  @HostBinding('class')
  get hostClasses(): string {
    return this.fullWidth ? 'full-width' : '';
  }

  /**
   * Computed button classes using the variant system
   */
  get buttonClasses(): string {
    const variantClasses = buttonVariants({
      variant: this.variant as any,
      size: this.size as any,
    });

    const classes = [variantClasses];

    // Add custom class if provided
    if (this.class) {
      classes.push(this.class);
    }

    // Add disabled styles
    if (this.disabled || this.loading) {
      classes.push('cursor-not-allowed');
    }

    return classes.join(' ');
  }

  /**
   * Handle button click with loading state check
   */
  handleClick(event: Event): void {
    if (this.disabled || this.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.onClick.emit(event);
  }

  /**
   * Handle keyboard events for accessibility
   */
  @HostListener('keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    // Handle Enter and Space keys for button activation
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (!this.disabled && !this.loading) {
        this.handleClick(event);
      }
    }

    this.onKeydown.emit(event);
  }
}