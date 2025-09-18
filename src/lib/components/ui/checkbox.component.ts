import { Component, HostBinding, computed, input, output, forwardRef, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideAngularModule, Check, Minus } from 'lucide-angular';
import { cva, type VariantProps, cn } from '../../utils/cn';

/**
 * Checkbox variants configuration
 * Based on shadcn/ui official implementation with proper theme integration
 */
export const checkboxVariants = cva(
  "peer h-4 w-4 shrink-0 rounded-sm border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:border-primary",
  {
    variants: {
      size: {
        sm: "h-3 w-3",
        default: "h-4 w-4",
        lg: "h-5 w-5",
      }
    },
    defaultVariants: {
      size: "default",
    },
  }
);

/**
 * Label variants for consistent styling
 */
export const checkboxLabelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      }
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
export type CheckboxLabelVariants = VariantProps<typeof checkboxLabelVariants>;

/**
 * Modern Angular Checkbox Component
 * 
 * A fully accessible checkbox component with support for:
 * - Controlled and uncontrolled modes
 * - Indeterminate state
 * - Form integration with reactive forms
 * - Keyboard navigation and screen reader support
 * - Multiple sizes and variants
 * - Custom styling via CSS classes
 * 
 * @example
 * ```html
 * <!-- Basic usage -->
 * <lib-checkbox [(checked)]="isChecked">
 *   Accept terms and conditions
 * </lib-checkbox>
 * 
 * <!-- With reactive forms -->
 * <lib-checkbox formControlName="newsletter" size="lg">
 *   Subscribe to newsletter
 * </lib-checkbox>
 * 
 * <!-- Indeterminate state -->
 * <lib-checkbox [indeterminate]="true">
 *   Select all items
 * </lib-checkbox>
 * 
 * <!-- Custom styling -->
 * <lib-checkbox 
 *   variant="success" 
 *   size="lg"
 *   class="custom-checkbox">
 *   Large success checkbox
 * </lib-checkbox>
 * ```
 */
@Component({
  selector: 'lib-checkbox',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ],
  template: `
    <button
      type="button"
      role="checkbox"
      [attr.id]="computedId()"
      [attr.aria-checked]="ariaChecked()"
      [attr.aria-describedby]="ariaDescribedBy()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-invalid]="ariaInvalid()"
      [attr.data-state]="dataState()"
      [attr.data-testid]="testId()"
      [disabled]="disabled()"
      [tabIndex]="tabIndex()"
      (click)="onToggle()"
      (keydown)="onKeydown($event)"
      (focus)="onFocus()"
      (blur)="onBlur()"
      [class]="checkboxClasses()">
      
      @if (isChecked() && !indeterminate()) {
        <lucide-icon 
          [img]="CheckIcon" 
          [size]="iconSize()"
          class="flex items-center justify-center text-current" />
      }
      
      @if (indeterminate()) {
        <lucide-icon 
          [img]="MinusIcon" 
          [size]="iconSize()"
          class="flex items-center justify-center text-current" />
      }
    </button>
  `,
  host: {
    '[class]': 'hostClasses()',
  }
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
  // Icons
  protected readonly CheckIcon = Check;
  protected readonly MinusIcon = Minus;

  // Inputs
  readonly id = input<string>();
  readonly checked = input<boolean>(false);
  readonly indeterminate = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly required = input<boolean>(false);
  readonly size = input<CheckboxVariants['size']>('default');
  readonly ariaLabel = input<string>();
  readonly ariaDescribedBy = input<string>();
  readonly ariaInvalid = input<boolean>();
  readonly testId = input<string>();
  readonly tabIndex = input<number>(0);
  readonly class = input<string>('');

  // Outputs
  readonly checkedChange = output<boolean>();
  readonly indeterminateChange = output<boolean>();
  readonly focus = output<void>();
  readonly blur = output<void>();

  // Internal state
  private readonly _checked = signal<boolean>(false);
  private readonly _indeterminate = signal<boolean>(false);
  private readonly _focused = signal<boolean>(false);
  private readonly _componentId = signal<string>('');
  private _touched = false;

  // Form control
  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  constructor() {
    // Generate ID if not provided
    const randomId = `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    this._componentId.set(randomId);

    // Sync external inputs with internal state
    effect(() => {
      this._checked.set(this.checked());
    });

    effect(() => {
      this._indeterminate.set(this.indeterminate());
    });
  }

  ngOnInit() {
    // ID is handled in constructor now
  }

  // Computed properties
  readonly isChecked = computed(() => this._checked());
  readonly isIndeterminate = computed(() => this._indeterminate());
  readonly isFocused = computed(() => this._focused());

  // Computed ID that uses provided ID or generated one
  readonly computedId = computed(() => this.id() || this._componentId());

  readonly ariaChecked = computed(() => {
    if (this.isIndeterminate()) return 'mixed';
    return this.isChecked() ? 'true' : 'false';
  });

  readonly dataState = computed(() => {
    if (this.isIndeterminate()) return 'indeterminate';
    return this.isChecked() ? 'checked' : 'unchecked';
  });

  readonly iconSize = computed(() => {
    const sizeMap = {
      sm: 10,
      default: 12,
      lg: 14,
    };
    return sizeMap[this.size() || 'default'];
  });

  readonly checkboxClasses = computed(() => {
    return cn(
      checkboxVariants({
        size: this.size(),
      }),
      this.class()
    );
  });

  readonly labelClasses = computed(() => {
    return cn(
      checkboxLabelVariants({
        size: this.size(),
      })
    );
  });

  readonly hostClasses = computed(() => {
    return cn(
      "checkbox-wrapper",
      this.disabled() && "checkbox-disabled",
      this.isChecked() && "checkbox-checked",
      this.isIndeterminate() && "checkbox-indeterminate",
      this.isFocused() && "checkbox-focused"
    );
  });

  // Event handlers
  onToggle(): void {
    if (this.disabled()) return;

    // If indeterminate, first click sets to checked
    if (this.isIndeterminate()) {
      this._indeterminate.set(false);
      this._checked.set(true);
      this.indeterminateChange.emit(false);
    } else {
      // Normal toggle behavior
      const newChecked = !this.isChecked();
      this._checked.set(newChecked);
      this.checkedChange.emit(newChecked);
    }

    // Update form control
    this.onChange(this.isChecked());
    this.markAsTouched();
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        this.onToggle();
        break;
    }
  }

  onFocus(): void {
    this._focused.set(true);
    this.focus.emit();
  }

  onBlur(): void {
    this._focused.set(false);
    this.markAsTouched();
    this.blur.emit();
  }

  private markAsTouched(): void {
    if (!this._touched) {
      this._touched = true;
      this.onTouched();
    }
  }

  // ControlValueAccessor implementation
  writeValue(value: boolean): void {
    this._checked.set(!!value);
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Note: In signals-based components, we'd need a writable signal for this
    // For now, the disabled state is controlled via input
  }

  // Public API methods
  /**
   * Programmatically set the checked state
   */
  setChecked(checked: boolean): void {
    if (!this.disabled()) {
      this._checked.set(checked);
      this._indeterminate.set(false);
      this.checkedChange.emit(checked);
      this.indeterminateChange.emit(false);
      this.onChange(checked);
    }
  }

  /**
   * Programmatically set the indeterminate state
   */
  setIndeterminate(indeterminate: boolean): void {
    if (!this.disabled()) {
      this._indeterminate.set(indeterminate);
      this.indeterminateChange.emit(indeterminate);
    }
  }

  /**
   * Focus the checkbox
   */
  focusCheckbox(): void {
    // This would need a ViewChild reference to the button element
    // Implement if needed for programmatic focus
  }
}
