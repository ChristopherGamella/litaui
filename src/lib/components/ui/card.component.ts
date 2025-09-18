import { Component, HostBinding, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { cva, type VariantProps } from '../../utils/cn';

/**
 * Card variants configuration
 * Following shadcn/ui design patterns with Angular integration
 */
export const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        elevated: "shadow-md",
        outlined: "border-2",
        filled: "bg-muted",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-6",
        lg: "p-8",
        xl: "p-12",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

export type CardVariant = VariantProps<typeof cardVariants>;

/**
 * Card component following shadcn/ui design patterns
 * Integrated with your existing color system and design tokens
 */
@Component({
  selector: 'lib-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div
      [class]="cardClasses()"
      [attr.data-testid]="dataTestid()"
    >
      <!-- Card Header -->
      <div *ngIf="header() || headerTemplate()" class="card-header">
        <ng-container *ngIf="headerTemplate(); else defaultHeader">
          <ng-content select="[card-header]"></ng-content>
        </ng-container>
        <ng-template #defaultHeader>
          <h3 *ngIf="header()" class="text-lg font-semibold leading-tight tracking-tight text-text-primary">
            {{ header() }}
          </h3>
        </ng-template>
      </div>

      <!-- Card Body -->
      <div class="card-body">
        <ng-content></ng-content>
      </div>

      <!-- Card Footer -->
      <div *ngIf="footer() || footerTemplate()" class="card-footer">
        <ng-container *ngIf="footerTemplate(); else defaultFooter">
          <ng-content select="[card-footer]"></ng-content>
        </ng-container>
        <ng-template #defaultFooter>
          <p *ngIf="footer()" class="text-sm text-text-muted">
            {{ footer() }}
          </p>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    .card-header {
      padding-bottom: var(--spacing-component-margin-md);
      border-bottom: 1px solid var(--color-border);
    }

    .card-body {
      flex: 1;
    }

    .card-footer {
      padding-top: var(--spacing-component-margin-md);
      border-top: 1px solid var(--color-border);
    }

    /* Hover effects for interactive cards */
    :host-context(.card-hover) {
      transition: all 0.2s ease-in-out;
    }

    :host-context(.card-hover:hover) {
      transform: translateY(-2px);
      box-shadow: var(--shadow-elegant-lg);
    }

    /* Clickable card styles */
    :host-context(.card-clickable) {
      cursor: pointer;
      transition: all 0.2s ease-in-out;
    }

    :host-context(.card-clickable:hover) {
      transform: translateY(-1px);
      box-shadow: var(--shadow-elegant);
    }

    :host-context(.card-clickable:active) {
      transform: translateY(0);
    }
  `]
})
export class CardComponent {
  // Signal inputs (fully zoneless)
  readonly variant = input<'default' | 'elevated' | 'outlined' | 'filled'>('default');
  readonly padding = input<'none' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  readonly header = input<string>();
  readonly footer = input<string>();
  readonly hoverable = input<boolean>(false);
  readonly clickable = input<boolean>(false);
  readonly id = input<string>();
  readonly class = input<string>();
  readonly dataTestid = input<string>();

  // Template inputs
  readonly headerTemplate = input<boolean>(false);
  readonly footerTemplate = input<boolean>(false);

  // Signal outputs (fully zoneless)
  readonly onClick = output<Event>();

  // Host bindings for dynamic classes
  @HostBinding('class')
  get hostClasses(): string {
    const classes = [];

    if (this.hoverable()) {
      classes.push('card-hover');
    }

    if (this.clickable()) {
      classes.push('card-clickable');
    }

    return classes.join(' ');
  }

  // Host listeners for clickable cards
  @HostBinding('attr.tabindex')
  get tabindex(): string | null {
    return this.clickable() ? '0' : null;
  }

  @HostBinding('attr.role')
  get role(): string | null {
    return this.clickable() ? 'button' : null;
  }

  /**
   * Computed card classes using the variant system
   */
  readonly cardClasses = computed(() => {
    const variantClasses = cardVariants({
      variant: this.variant(),
      padding: this.padding(),
    } as any);

    const classes = [variantClasses];

    // Add custom class if provided
    const customClass = this.class();
    if (customClass) {
      classes.push(customClass);
    }

    return classes.join(' ');
  });

  /**
   * Handle card click for clickable cards
   */
  onCardClick(event: Event): void {
    if (this.clickable()) {
      this.onClick.emit(event);
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.clickable() && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      this.onClick.emit(event);
    }
  }
}

/**
 * Card Header component for advanced layouts
 */
@Component({
  selector: 'lib-card-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col space-y-1.5 p-6">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CardHeaderComponent {}

/**
 * Card Content component for advanced layouts
 */
@Component({
  selector: 'lib-card-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6 pt-0">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CardContentComponent {}

/**
 * Card Footer component for advanced layouts
 */
@Component({
  selector: 'lib-card-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center p-6 pt-0">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class CardFooterComponent {}