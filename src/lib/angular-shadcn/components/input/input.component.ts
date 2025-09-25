import { Component, input, output, signal, computed, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { inputVariants, type InputVariants } from './input.variants';
import { cn } from '../../../utils/cn';

@Component({
  selector: 'lib-input',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="relative">
      @if (leadingIcon()) {
        <div class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <lucide-angular [img]="leadingIcon()!" class="h-4 w-4"></lucide-angular>
        </div>
      }
      <input
        [class]="inputClass()"
        [type]="type()"
        [placeholder]="placeholder()"
        [disabled]="disabled()"
        [value]="value()"
        (input)="onInput($event)"
        (blur)="onTouched()"
        #inputElement
      />
      @if (trailingIcon()) {
        <div class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          <lucide-angular [img]="trailingIcon()!" class="h-4 w-4"></lucide-angular>
        </div>
      }
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  // Variant props
  variant = input<InputVariants['variant']>('default');
  size = input<InputVariants['size']>('md');

  // Input props
  type = input<string>('text');
  placeholder = input<string>('');
  disabled = input<boolean>(false);
  class = input<string>('');

  // Icon props
  leadingIcon = input<any>(null);
  trailingIcon = input<any>(null);

  // Internal state
  private _value = signal<string>('');

  // Computed classes
  inputClass = computed(() => {
    const baseClasses = inputVariants({
      variant: this.variant(),
      size: this.size(),
    });

    let paddingClasses = '';
    if (this.leadingIcon()) paddingClasses += ' pl-10';
    if (this.trailingIcon()) paddingClasses += ' pr-10';

    return cn(baseClasses, paddingClasses.trim(), this.class());
  });

  // Value accessor
  value = computed(() => this._value());
  valueChange = output<string>();

  // ControlValueAccessor
  private onChange: (value: string) => void = () => {};
  public onTouched: () => void = () => {};

  writeValue(value: string): void {
    this._value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Handled via input binding
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const newValue = target.value;
    this._value.set(newValue);
    this.onChange(newValue);
    this.valueChange.emit(newValue);
  }
}