import { Component, Input, Output, EventEmitter, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps, cn } from '../../utils/cn';

/**
 * Simplified Button variants configuration for performance testing
 * Minimal implementation without heavy dependencies
 */
export const simpleButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-600 text-white hover:bg-gray-700",
        outline: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50",
        ghost: "text-gray-900 hover:bg-gray-100",
        destructive: "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        default: "h-10 px-4 py-2",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type SimpleButtonVariant = VariantProps<typeof simpleButtonVariants>;

/**
 * Simple Button component for performance testing
 * Minimal implementation without heavy dependencies like LucideAngular
 */
@Component({
  selector: 'lib-simple-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled() || loading()"
      [class]="buttonClasses()"
      (click)="handleClick($event)"
    >
      @if (loading()) {
        <div class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" aria-hidden="true"></div>
        Loading...
      } @else {
        <ng-content></ng-content>
      }
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    .animate-spin {
      animation: spin 1s linear infinite;
    }
  `]
})
export class SimpleButtonComponent {
  // Input signals (modern Angular approach)
  readonly variant = input<SimpleButtonVariant['variant']>('default');
  readonly size = input<SimpleButtonVariant['size']>('default');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  // Output events
  readonly onClick = output<MouseEvent>();

  // Computed classes
  readonly buttonClasses = computed(() => {
    return cn(
      simpleButtonVariants({
        variant: this.variant(),
        size: this.size(),
      })
    );
  });

  protected handleClick(event: MouseEvent): void {
    if (!this.disabled() && !this.loading()) {
      this.onClick.emit(event);
    }
  }
}