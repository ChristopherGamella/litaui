import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { badgeVariants, type BadgeVariant } from './badge.variants';
import { cn } from '../../../utils/cn';

/**
 * Badge component following shadcn/ui design patterns
 * Displays small status descriptors or labels
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
      display: inline-block;
    }
  `]
})
export class BadgeComponent {
  // Signal inputs
  readonly variant = input<BadgeVariant['variant']>('default');
  readonly class = input<string>();

  /**
   * Computed badge classes using the variant system
   */
  protected badgeClasses = computed(() => {
    return cn(
      badgeVariants({
        variant: this.variant(),
      }),
      this.class()
    );
  });
}