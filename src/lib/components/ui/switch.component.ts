import { Component, computed, input, output, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps, cn } from '../../utils/cn';

/**
 * Switch variants configuration following shadcn/ui patterns
 */
export const switchVariants = cva(
  "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        default: "h-6 w-11",
        sm: "h-5 w-9",
        lg: "h-7 w-13",
      },
      checked: {
        true: "bg-primary",           // shadcn/ui primary color (dark slate blue)
        false: "bg-muted",            // Better contrast than bg-input for unchecked state
      },
    },
    defaultVariants: {
      size: "default",
      checked: false,
    },
  }
);

export const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
  {
    variants: {
      size: {
        default: "h-5 w-5",
        sm: "h-4 w-4",
        lg: "h-6 w-6",
      },
      checked: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      // Default size translations
      { size: "default", checked: true, class: "translate-x-5" },
      { size: "default", checked: false, class: "translate-x-0" },
      // Small size translations
      { size: "sm", checked: true, class: "translate-x-4" },
      { size: "sm", checked: false, class: "translate-x-0" },
      // Large size translations
      { size: "lg", checked: true, class: "translate-x-6" },
      { size: "lg", checked: false, class: "translate-x-0" },
    ],
    defaultVariants: {
      size: "default",
      checked: false,
    },
  }
);

export type SwitchVariant = VariantProps<typeof switchVariants>;

/**
 * Switch Component
 * 
 * A toggle switch component following shadcn/ui design patterns
 * 
 * @example
 * ```html
 * <!-- Basic usage -->
 * <lib-switch [(ngModel)]="isEnabled"></lib-switch>
 * 
 * <!-- With label -->
 * <div class="flex items-center space-x-2">
 *   <lib-switch id="airplane-mode" [(ngModel)]="airplaneMode"></lib-switch>
 *   <label for="airplane-mode">Airplane Mode</label>
 * </div>
 * 
 * <!-- Different sizes -->
 * <lib-switch size="sm" [(ngModel)]="smallSwitch"></lib-switch>
 * <lib-switch size="lg" [(ngModel)]="largeSwitch"></lib-switch>
 * 
 * <!-- Disabled -->
 * <lib-switch [disabled]="true" [(ngModel)]="disabledSwitch"></lib-switch>
 * ```
 */
@Component({
  selector: 'lib-switch',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SwitchComponent),
      multi: true
    }
  ],
  template: `
    <button
      type="button"
      role="switch"
      [attr.aria-checked]="currentChecked()"
      [attr.id]="id()"
      [disabled]="isDisabled()"
      [class]="switchClasses()"
      (click)="toggle()"
      (keydown)="onKeydown($event)"
      (focus)="onFocus()"
      (blur)="onBlur()"
    >
      <span [class]="thumbClasses()"></span>
    </button>
  `,
})
export class SwitchComponent implements ControlValueAccessor {
  // Signal inputs
  readonly size = input<'default' | 'sm' | 'lg'>('default');
  readonly checked = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly id = input<string>();
  readonly class = input<string>();
  
  // Internal signal for the checked state
  private readonly _internalChecked = signal<boolean>(false);
  private readonly _formDisabled = signal<boolean>(false);
  
  // Signal outputs
  readonly checkedChange = output<boolean>();
  
  // ControlValueAccessor
  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  // Computed checked state - defaults to false, uses input or internal state
  protected readonly currentChecked = computed(() => {
    // Priority: explicit input value > internal state > false (default)
    const inputValue = this.checked();
    if (inputValue !== false && inputValue !== undefined) {
      return inputValue;
    }
    return this._internalChecked();
  });

  // Computed disabled state that combines input and form state
  protected readonly isDisabled = computed(() => this.disabled() || this._formDisabled());

  // Computed classes
  protected readonly switchClasses = computed(() => {
    return cn(
      switchVariants({
        size: this.size(),
        checked: this.currentChecked(),
      }),
      this.class()
    );
  });

  protected readonly thumbClasses = computed(() => {
    return cn(
      switchThumbVariants({
        size: this.size(),
        checked: this.currentChecked(),
      })
    );
  });

  /**
   * Toggle the switch state
   */
  toggle(): void {
    if (this.isDisabled()) return;
    
    const newValue = !this.currentChecked();
    this._internalChecked.set(newValue);
    this.onChange(newValue);
    this.checkedChange.emit(newValue);
  }

  /**
   * Handle keyboard events
   */
  protected onKeydown(event: KeyboardEvent): void {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      this.toggle();
    }
  }

  protected onFocus(): void {
    // Focus handling
  }

  protected onBlur(): void {
    this.onTouched();
  }

  // ControlValueAccessor implementation
  writeValue(value: boolean): void {
    this._internalChecked.set(value || false);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._formDisabled.set(isDisabled);
  }
}