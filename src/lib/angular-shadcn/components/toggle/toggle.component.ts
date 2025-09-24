import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toggleVariants, type ToggleVariant } from './toggle.variants';

/**
 * Toggle component following shadcn/ui design patterns
 * Built with modern Angular signals and standalone architecture
 *
 * @example
 * ```html
 * <!-- Basic usage -->
 * <lib-toggle>Toggle me</lib-toggle>
 *
 * <!-- Variants -->
 * <lib-toggle variant="outline">Outline</lib-toggle>
 *
 * <!-- Sizes -->
 * <lib-toggle size="sm">Small</lib-toggle>
 * <lib-toggle size="lg">Large</lib-toggle>
 *
 * <!-- Pressed state -->
 * <lib-toggle [pressed]="isPressed" (pressedChange)="onToggle($event)">Pressed</lib-toggle>
 * ```
 */
@Component({
  selector: 'lib-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      [disabled]="disabled()"
      [attr.aria-pressed]="pressed()"
      [attr.data-state]="pressed() ? 'on' : 'off'"
      [class]="toggleClasses()"
      (click)="onToggle()"
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
export class ToggleComponent {
  // Signal inputs
  readonly variant = input<ToggleVariant['variant']>('default');
  readonly size = input<ToggleVariant['size']>('md');
  readonly pressed = input<boolean>(false);
  readonly disabled = input<boolean>(false);

  // Signal output
  readonly pressedChange = output<boolean>();

  /**
   * Computed toggle classes using the variant system
   */
  protected toggleClasses = computed(() => {
    return toggleVariants({
      variant: this.variant(),
      size: this.size(),
    });
  });

  /**
   * Handle toggle click
   */
  protected onToggle() {
    if (!this.disabled()) {
      this.pressedChange.emit(!this.pressed());
    }
  }
}