import { Component, Input, Output, EventEmitter, HostBinding, ElementRef, ViewChild, AfterViewInit, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { cva, type VariantProps } from '../../utils/cn';
import { InputProps } from '../../types';

/**
 * Input variants configuration
 * Following shadcn/ui design patterns with Angular integration
 */
export const inputVariants = cva(
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        error: "border-destructive focus-visible:ring-destructive",
        success: "border-green-500 focus-visible:ring-green-500",
      },
      size: {
        sm: "h-8 px-2 py-1 text-xs",
        md: "h-10 px-3 py-2 text-sm",
        lg: "h-12 px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type InputVariant = VariantProps<typeof inputVariants>;

/**
 * Input component following shadcn/ui design patterns
 * Integrated with your existing color system and form validation
 */
@Component({
  selector: 'lib-input',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  template: `
    <div class="relative">
      <!-- Left Icon -->
      @if (leftIcon) {
        <div class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <lucide-angular [img]="leftIcon" size="16"></lucide-angular>
        </div>
      }

      <!-- Input Element -->
      <input
        #inputElement
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        [disabled]="disabled"
        [readonly]="readonly"
        [required]="required"
        [attr.aria-label]="ariaLabel"
        [attr.aria-describedby]="ariaDescribedBy"
        [attr.aria-invalid]="error"
        [attr.data-testid]="dataTestid"
        [class]="inputClasses"
        [class.pl-10]="leftIcon"
        [class.pr-10]="rightIcon || clearable"
        (input)="handleInput($event)"
        (focus)="focusChange.emit($event)"
        (blur)="handleBlur($event)"
        (keydown)="keydownChange.emit($event)"
      />

      <!-- Right Icon or Clear Button -->
      @if (rightIcon && !clearable) {
        <div class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <lucide-angular [img]="rightIcon" size="16"></lucide-angular>
        </div>
      }

      <!-- Clear Button -->
      @if (clearable && value && !disabled && !readonly) {
        <button
          type="button"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          (click)="clearInput()"
          [attr.aria-label]="'Clear ' + (ariaLabel || 'input')"
        >
          <lucide-angular [img]="XIcon" size="16"></lucide-angular>
        </button>
      }
    </div>

    <!-- Helper Text -->
    @if (helperText) {
      <p class="mt-1 text-xs text-muted-foreground" [id]="ariaDescribedBy">
        {{ helperText }}
      </p>
    }

    <!-- Error Message -->
    @if (error && errorMessage) {
      <p class="mt-1 text-xs text-destructive" [id]="ariaDescribedBy">
        {{ errorMessage }}
      </p>
    }
  `,
  styles: [`
    :host {
      display: block;
    }

    input {
      transition: all 0.2s ease-in-out;
    }

    input:focus {
      box-shadow: 0 0 0 2px var(--color-accent-100);
    }

    /* Error state styling */
    input[aria-invalid="true"] {
      border-color: var(--color-red-500);
    }

    input[aria-invalid="true"]:focus {
      box-shadow: 0 0 0 2px var(--color-red-100);
    }
  `]
})
export class InputComponent implements InputProps, AfterViewInit, ControlValueAccessor {
  @ViewChild('inputElement', { static: true }) inputElement!: ElementRef<HTMLInputElement>;

  // Component inputs
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' = 'text';
  @Input() variant: 'default' | 'error' | 'success' = 'default';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() placeholder?: string;
  @Input() value?: string | number = '';
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() error = false;
  @Input() errorMessage?: string;
  @Input() helperText?: string;
  @Input() leftIcon?: any;
  @Input() rightIcon?: any;
  @Input() clearable = false;
  @Input() id?: string;
  @Input() class?: string;
  @Input() dataTestid?: string;

  // Accessibility inputs
  @Input() ariaLabel?: string;
  @Input() ariaDescribedBy?: string;

  // Event outputs
  @Output() inputChange = new EventEmitter<Event>();
  @Output() focusChange = new EventEmitter<FocusEvent>();
  @Output() blurChange = new EventEmitter<FocusEvent>();
  @Output() keydownChange = new EventEmitter<KeyboardEvent>();
  @Output() valueChange = new EventEmitter<string | number>();

  // Icon imports (for clear button)
  XIcon: any;

  // ControlValueAccessor callbacks
  private onChange = (value: string | number) => {};
  private onTouched = () => {};

  constructor() {
    // Dynamic import for X icon (clear button)
    import('lucide-angular').then(({ X }) => {
      this.XIcon = X;
    });
  }

  ngAfterViewInit(): void {
    // Set up form control integration if needed
    if (this.inputElement) {
      // Additional setup can be done here
    }
  }

  /**
   * Computed input classes using the variant system
   */
  get inputClasses(): string {
    const variantClasses = inputVariants({
      variant: this.variant,
      size: this.size,
    } as any);

    const classes = [variantClasses];

    // Add custom class if provided
    if (this.class) {
      classes.push(this.class);
    }

    return classes.join(' ');
  }

  /**
   * Handle input events
   */
  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
    this.inputChange.emit(event);
    // Notify form control of change
    this.onChange(this.value);
  }

  /**
   * Handle blur events
   */
  handleBlur(event: FocusEvent): void {
    this.blurChange.emit(event);
    this.onTouched();
  }

  /**
   * Clear input value
   */
  clearInput(): void {
    this.value = '';
    this.valueChange.emit(this.value);

    // Focus back to input after clearing
    if (this.inputElement) {
      this.inputElement.nativeElement.focus();
    }
  }

  /**
   * Focus the input element
   */
  focus(): void {
    if (this.inputElement) {
      this.inputElement.nativeElement.focus();
    }
  }

  /**
   * Blur the input element
   */
  blur(): void {
    if (this.inputElement) {
      this.inputElement.nativeElement.blur();
    }
  }

  /**
   * Get the native input element
   */
  get nativeElement(): HTMLInputElement {
    return this.inputElement.nativeElement;
  }

  // ControlValueAccessor implementation
  writeValue(value: string | number): void {
    this.value = value || '';
    if (this.inputElement) {
      this.inputElement.nativeElement.value = String(this.value);
    }
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}