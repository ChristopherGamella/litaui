import { Component, HostBinding, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Loader2 } from 'lucide-angular';
import { buttonVariants, type ButtonVariant } from './button.variants';
import { cn } from '../../../utils/cn';

/**
 * Button component following shadcn/ui design patterns
 * Enhanced with modern Angular signals and updated styling
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
      [class]="buttonClasses()"
      (click)="handleClick($event)"
    >
      <!-- Loading spinner -->
      @if (loading()) {
        <lucide-angular
          [img]="loaderIcon"
          size="16"
          class="animate-spin"
          aria-hidden="true"
        ></lucide-angular>
        @if (loadingText()) {
          {{ loadingText() }}
        } @else {
          <span class="sr-only">Loading</span>
        }
      } @else {
        <!-- Left icon -->
        @if (leftIcon()) {
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
        @if (rightIcon()) {
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
export class ButtonComponent {
  // Lucide icons
  protected loaderIcon = Loader2;

  // Signal inputs
  readonly variant = input<ButtonVariant['variant']>('primary');
  readonly size = input<ButtonVariant['size']>('default');
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly loadingText = input<string>();
  readonly leftIcon = input<any>();
  readonly rightIcon = input<any>();
  readonly ariaLabel = input<string>();
  readonly class = input<string>();

  // Signal outputs
  readonly clicked = output<Event>();

  // Host bindings
  @HostBinding('class')
  get hostClasses(): string {
    return '';
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

    this.clicked.emit(event);
  }
}