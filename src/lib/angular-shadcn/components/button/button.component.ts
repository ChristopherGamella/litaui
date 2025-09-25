import { Component, computed, input, output, booleanAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { buttonVariants, type ButtonVariant } from './button.variants';
import { cn } from '../../../utils/cn';

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
 * <lib-button variant="default">Default</lib-button>
 * <lib-button variant="outline">Outline</lib-button>
 * <lib-button variant="destructive">Delete</lib-button>
 * <lib-button variant="ghost">Ghost</lib-button>
 * <lib-button variant="secondary">Secondary</lib-button>
 * <lib-button variant="link">Link</lib-button>
 *
 * <!-- Sizes -->
 * <lib-button size="sm">Small</lib-button>
 * <lib-button size="default">Default</lib-button>
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
      [class]="componentClasses()"
      (click)="clicked.emit($event)"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    :host {
      display: inline-block;
    }
  `]
})
export class ButtonComponent {
  // Signal inputs
  readonly variant = input<ButtonVariant['variant']>('default');
  readonly size = input<ButtonVariant['size']>('default');
  readonly disabled = input<boolean, string | boolean>(false, { transform: booleanAttribute });
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly class = input<string>('');

  // Signal output
  readonly clicked = output<MouseEvent>();

  /**
   * Computed button classes using the variant system
   */
  protected componentClasses = computed(() => cn(
    buttonVariants({
      variant: this.variant(),
      size: this.size()
    }),
    this.class()
  ));
}