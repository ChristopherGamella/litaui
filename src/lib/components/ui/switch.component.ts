import { Component, Input, Output, EventEmitter, computed, input, output, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { cva, type VariantProps, cn } from '../../utils/cn';

/**
 * Switch variants configuration following shadcn/ui patterns
 */
export const switchVariants = cva(
  "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  {
    variants: {
      size: {
        default: "h-6 w-11",
        sm: "h-5 w-9",
        lg: "h-7 w-13",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform",
  {
    variants: {
      size: {
        default: "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        sm: "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
        lg: "h-6 w-6 data-[state=checked]:translate-x-6 data-[state=unchecked]:translate-x-0",
      },
    },
    defaultVariants: {
      size: "default",
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
      [attr.aria-checked]="checked()"
      [attr.data-state]="checked() ? 'checked' : 'unchecked'"
      [attr.id]="id"
      [disabled]="disabled"
      [class]="switchClasses()"
      (click)="toggle()"
      (keydown)="onKeydown($event)"
      (focus)="onFocus()"
      (blur)="onBlur()"
    >
      <span 
        [attr.data-state]="checked() ? 'checked' : 'unchecked'"
        [class]="thumbClasses()">
      </span>
    </button>
  `,
})
export class SwitchComponent implements ControlValueAccessor {
  // Signal inputs
  size = input<'default' | 'sm' | 'lg'>('default');
  checked = signal<boolean>(false);
  
  // Traditional inputs
  @Input() disabled = false;
  @Input() id?: string;
  @Input() class?: string;
  
  // Outputs
  checkedChange = output<boolean>();
  
  // ControlValueAccessor
  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  // Computed classes
  protected switchClasses = computed(() => {
    return cn(
      switchVariants({
        size: this.size(),
      }),
      this.class
    );
  });

  protected thumbClasses = computed(() => {
    return cn(
      switchThumbVariants({
        size: this.size(),
      })
    );
  });

  /**
   * Toggle the switch state
   */
  toggle(): void {
    if (this.disabled) return;
    
    const newValue = !this.checked();
    this.checked.set(newValue);
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
    this.checked.set(value || false);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}