import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { badgeVariants, type BadgeVariant } from './badge.variants';

/**
 * Badge component following shadcn/ui design patterns
 * Built with modern Angular signals and standalone architecture
 *
 * @example
 * ```html
 * <!-- Basic usage -->
 * <lib-badge>New</lib-badge>
 *
 * <!-- Variants -->
 * <lib-badge variant="secondary">Secondary</lib-badge>
 * <lib-badge variant="destructive">Error</lib-badge>
 * <lib-badge variant="outline">Outline</lib-badge>
 *
 * <!-- Sizes -->
 * <lib-badge size="sm">Small</lib-badge>
 * <lib-badge size="lg">Large</lib-badge>
 * ```
 */
@Component({
  selector: 'lib-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [class]="badgeClasses()">
      <ng-content></ng-content>
    </span>
  `,
  styles: [`
    :host {
      display: inline-flex;
    }
  `]
})
export class BadgeComponent {
  // Signal inputs
  readonly variant = input<BadgeVariant['variant']>('primary');
  readonly size = input<BadgeVariant['size']>('md');

  /**
   * Computed badge classes using the variant system
   */
  protected badgeClasses = computed(() => {
    return badgeVariants({
      variant: this.variant(),
      size: this.size(),
    });
  });
}