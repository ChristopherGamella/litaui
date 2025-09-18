import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps, cn } from '../../utils/cn';

/**
 * Progress bar variants configuration
 */
export const progressVariants = cva(
  "relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-secondary",
        success: "bg-green-100",
        warning: "bg-yellow-100", 
        error: "bg-red-100",
      },
      size: {
        xs: "h-1",
        sm: "h-2",
        md: "h-3",
        lg: "h-4",
        xl: "h-6",
      },
      type: {
        linear: "w-full rounded-full",
        circular: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      type: "linear",
    },
  }
);

/**
 * Progress fill variants
 */
export const progressFillVariants = cva(
  "h-full transition-all duration-500 ease-out",
  {
    variants: {
      variant: {
        default: "bg-primary",
        success: "bg-green-500",
        warning: "bg-yellow-500",
        error: "bg-red-500",
      },
      type: {
        linear: "rounded-full",
        circular: "rounded-full",
      },
      indeterminate: {
        true: "animate-pulse",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      type: "linear",
      indeterminate: false,
    },
  }
);

/**
 * Progress component following shadcn/ui design patterns
 * Supports both linear and circular progress indicators
 * 
 * @example
 * ```html
 * <!-- Linear progress -->
 * <lib-progress [value]="75" showLabel></lib-progress>
 * 
 * <!-- Circular progress -->
 * <lib-progress type="circular" [value]="50" size="lg"></lib-progress>
 * 
 * <!-- Indeterminate loading -->
 * <lib-progress [indeterminate]="true" variant="default"></lib-progress>
 * 
 * <!-- With custom label -->
 * <lib-progress [value]="60" label="Uploading files..."></lib-progress>
 * ```
 */
@Component({
  selector: 'lib-progress',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="containerClasses()">
      <!-- Linear Progress -->
      @if (type() === 'linear') {
        <div
          [class]="progressClasses()"
          role="progressbar"
          [attr.aria-valuenow]="normalizedValue()"
          [attr.aria-valuemin]="0"
          [attr.aria-valuemax]="max()"
          [attr.aria-label]="ariaLabel()"
          [attr.data-testid]="dataTestid()"
        >
          <div
            [class]="fillClasses()"
            [style.width.%]="progressPercentage()"
            [style.animation-duration.ms]="animationDuration()"
          ></div>
        </div>
        
        <!-- Linear Progress Label -->
        @if (shouldShowLabel()) {
          <div class="mt-2 flex justify-between text-xs text-muted-foreground">
            <span>{{ displayLabel() }}</span>
            @if (showLabel() && !indeterminate()) {
              <span>{{ Math.round(progressPercentage()) }}%</span>
            }
          </div>
        }
      }

      <!-- Circular Progress -->
      @if (type() === 'circular') {
        <div 
          class="relative inline-flex items-center justify-center"
          [style.width.px]="circularSize()"
          [style.height.px]="circularSize()"
        >
          <svg
            [attr.width]="circularSize()"
            [attr.height]="circularSize()"
            class="transform -rotate-90"
            role="progressbar"
            [attr.aria-valuenow]="normalizedValue()"
            [attr.aria-valuemin]="0"
            [attr.aria-valuemax]="max()"
            [attr.aria-label]="ariaLabel()"
            [attr.data-testid]="dataTestid()"
          >
            <!-- Background circle -->
            <circle
              [attr.cx]="circularSize() / 2"
              [attr.cy]="circularSize() / 2"
              [attr.r]="circularRadius()"
              [attr.stroke-width]="strokeWidth()"
              [class]="backgroundCircleClasses()"
              fill="none"
            />
            <!-- Progress circle -->
            <circle
              [attr.cx]="circularSize() / 2"
              [attr.cy]="circularSize() / 2"
              [attr.r]="circularRadius()"
              [attr.stroke-width]="strokeWidth()"
              [class]="progressCircleClasses()"
              fill="none"
              [attr.stroke-dasharray]="circumference()"
              [attr.stroke-dashoffset]="indeterminate() ? 0 : strokeDashOffset()"
              [style.animation]="indeterminate() ? 'spin 2s linear infinite' : 'none'"
              [style.transition]="!indeterminate() ? 'stroke-dashoffset 0.5s ease-out' : 'none'"
            />
          </svg>
          
          <!-- Circular Progress Label -->
          @if (shouldShowLabel()) {
            <div class="absolute inset-0 flex items-center justify-center">
              @if (showLabel() && !indeterminate()) {
                <span class="text-xs font-medium text-foreground">
                  {{ Math.round(progressPercentage()) }}%
                </span>
              } @else if (label()) {
                <span class="text-xs font-medium text-foreground text-center px-2">
                  {{ label() }}
                </span>
              }
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    /* Indeterminate animation for linear progress */
    @keyframes indeterminate {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    .indeterminate-fill {
      animation: indeterminate 1.5s ease-in-out infinite;
      width: 40% !important;
    }

    /* Spin animation for circular progress */
    @keyframes spin {
      from {
        transform: rotate(-90deg);
      }
      to {
        transform: rotate(270deg);
      }
    }

    /* Smooth transitions */
    .progress-fill {
      transition: width 0.5s ease-out;
    }

    /* Accessibility improvements */
    [role="progressbar"] {
      border-radius: inherit;
    }
  `]
})
export class ProgressComponent {
  // Modern signal inputs
  readonly value = input<number>(0);
  readonly max = input<number>(100);
  readonly variant = input<'default' | 'success' | 'warning' | 'error'>('default');
  readonly size = input<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  readonly type = input<'linear' | 'circular'>('linear');
  readonly indeterminate = input<boolean>(false);
  readonly showLabel = input<boolean>(false);
  readonly label = input<string>('');
  readonly animationDuration = input<number>(500);

  // Signal inputs (fully zoneless)
  readonly id = input<string>();
  readonly class = input<string>();
  readonly dataTestid = input<string>();
  readonly ariaLabel = input<string>();

  // Expose Math for template
  readonly Math = Math;

  /**
   * Normalized value ensuring it's within bounds
   */
  readonly normalizedValue = computed(() => {
    const val = this.value();
    const maxVal = this.max();
    return Math.max(0, Math.min(val, maxVal));
  });

  /**
   * Progress percentage for display
   */
  readonly progressPercentage = computed(() => {
    if (this.indeterminate()) return 0;
    return (this.normalizedValue() / this.max()) * 100;
  });

  /**
   * Container classes
   */
  readonly containerClasses = computed(() => {
    return cn("w-full", this.class());
  });

  /**
   * Progress bar classes for linear type
   */
  readonly progressClasses = computed(() => {
    return cn(
      progressVariants({
        variant: this.variant(),
        size: this.size(),
        type: this.type(),
      })
    );
  });

  /**
   * Fill classes for linear progress
   */
  readonly fillClasses = computed(() => {
    return cn(
      progressFillVariants({
        variant: this.variant(),
        type: this.type(),
        indeterminate: this.indeterminate(),
      }),
      this.indeterminate() && "indeterminate-fill"
    );
  });

  /**
   * Circular progress size in pixels
   */
  readonly circularSize = computed(() => {
    const sizeMap = {
      xs: 16,
      sm: 24,
      md: 32,
      lg: 48,
      xl: 64,
    };
    return sizeMap[this.size()];
  });

  /**
   * Circular progress radius
   */
  readonly circularRadius = computed(() => {
    return (this.circularSize() - this.strokeWidth()) / 2;
  });

  /**
   * Stroke width for circular progress
   */
  readonly strokeWidth = computed(() => {
    const strokeMap = {
      xs: 1,
      sm: 2,
      md: 2,
      lg: 3,
      xl: 4,
    };
    return strokeMap[this.size()];
  });

  /**
   * Circle circumference
   */
  readonly circumference = computed(() => {
    return 2 * Math.PI * this.circularRadius();
  });

  /**
   * Stroke dash offset for progress
   */
  readonly strokeDashOffset = computed(() => {
    const progress = this.progressPercentage() / 100;
    return this.circumference() * (1 - progress);
  });

  /**
   * Background circle classes
   */
  readonly backgroundCircleClasses = computed(() => {
    const variantMap = {
      default: "stroke-secondary",
      success: "stroke-green-100",
      warning: "stroke-yellow-100",
      error: "stroke-red-100",
    };
    return variantMap[this.variant()];
  });

  /**
   * Progress circle classes
   */
  readonly progressCircleClasses = computed(() => {
    const variantMap = {
      default: "stroke-primary",
      success: "stroke-green-500",
      warning: "stroke-yellow-500",
      error: "stroke-red-500",
    };
    return cn(
      variantMap[this.variant()],
      "transition-all duration-500 ease-out",
      this.indeterminate() && "animate-pulse"
    );
  });

  /**
   * Whether to show any label
   */
  readonly shouldShowLabel = computed(() => {
    return this.showLabel() || !!this.label();
  });

  /**
   * Display label text
   */
  readonly displayLabel = computed(() => {
    return this.label() || '';
  });
}