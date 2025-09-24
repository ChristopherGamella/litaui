import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { buttonVariants, type ButtonVariant } from './button.variants';

/**
 * Button component following shadcn/ui design patterns
 * Built with modern Angular signals and standalone architecture
 *
 * @example
 * ```html
 * <!-- Basic usage -->
 * <lib-button>Click me</lib-button>
 *
 * <!-- Variants -->
 * <lib-button variant="outline">Outline</lib-button>
 * <lib-button variant="destructive">Delete</lib-button>
 * <lib-button variant="ghost">Ghost</lib-button>
 * <lib-button variant="link">Link</lib-button>
 *
 * <!-- Sizes -->
 * <lib-button size="sm">Small</lib-button>
 * <lib-button size="lg">Large</lib-button>
 * ```
 */
@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type()"
      [disabled]="disabled()"
      [class]="buttonClasses()"
      (click)="onClick.emit($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    button {
      width: 100%;
    }
  `]
})
export class ButtonComponent {
  // Signal inputs
  readonly variant = input<ButtonVariant['variant']>('primary');
  readonly size = input<ButtonVariant['size']>('md');
  readonly disabled = input<boolean>(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  // Signal output
  readonly onClick = output<Event>();

  /**
   * Computed button classes using the variant system
   */
  protected buttonClasses = computed(() => {
    return buttonVariants({
      variant: this.variant(),
      size: this.size(),
    });
  });
}