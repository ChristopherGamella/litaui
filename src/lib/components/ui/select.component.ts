import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, ChangeDetectionStrategy, signal, computed, input, output, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ChevronDown, Check, Search, X, icons } from 'lucide-angular';
import { cva, type VariantProps } from '../../utils/cn';
import { SelectProps, SelectOption } from '../../types';

/**
 * Select trigger variants configuration
 */
export const selectTriggerVariants = cva(
  "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
  {
    variants: {
      variant: {
        default: "",
        error: "border-destructive focus:ring-destructive",
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

/**
 * Select content variants configuration
 */
export const selectContentVariants = cva(
  "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
  {
    variants: {
      position: {
        'top-left': "slide-in-from-top-2",
        'top-right': "slide-in-from-top-2",
        'bottom-left': "slide-in-from-bottom-2",
        'bottom-right': "slide-in-from-bottom-2",
      },
    },
    defaultVariants: {
      position: "bottom-left",
    },
  }
);

/**
 * Select item variants configuration
 */
export const selectItemVariants = cva(
  "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        destructive: "text-destructive focus:bg-destructive/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type SelectTriggerVariant = VariantProps<typeof selectTriggerVariants>;
export type SelectContentVariant = VariantProps<typeof selectContentVariants>;
export type SelectItemVariant = VariantProps<typeof selectItemVariants>;

/**
 * Select component following shadcn/ui design patterns
 * Integrated with your existing color system and form validation
 */
@Component({
  selector: 'lib-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="relative">
      <!-- Select Trigger -->
      <button
        type="button"
        [class]="triggerClasses()"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-haspopup]="true"
        [attr.aria-label]="ariaLabel() || placeholder() || 'Select option'"
        [attr.data-testid]="dataTestid()"
        (click)="toggleDropdown()"
        (keydown)="handleKeydown($event)"
        #triggerButton
      >
        <!-- Selected Value Display -->
        <span [class]="displayTextClass()">
          {{ displayText() }}
        </span>

        <!-- Icons -->
        <div class="flex items-center space-x-1">
          @if (clearable() && (multiple() ? selectedValues().length > 0 : selectedValue())) {
            <button
              type="button"
              class="flex-shrink-0 hover:bg-muted rounded-full p-0.5"
              (click)="clearSelection($event)"
              [attr.aria-label]="'Clear selection'"
            >
              <lucide-angular [img]="XIcon" size="14"></lucide-angular>
            </button>
          }
          <lucide-angular
            [img]="ChevronDownIcon"
            size="16"
            class="flex-shrink-0 opacity-50"
            [class.rotate-180]="isOpen()"
          ></lucide-angular>
        </div>
      </button>

      <!-- Dropdown Content -->
      @if (isOpen()) {
        <div
          class="absolute top-full left-0 z-50 mt-1 min-w-full"
          #dropdownContent
        >
          <div class="rounded-md border bg-popover text-popover-foreground shadow-md">
            <!-- Search Input -->
            @if (searchable()) {
              <div class="p-2 border-b">
                <div class="relative">
                  <lucide-angular 
                    [img]="SearchIcon" 
                    size="16" 
                    class="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                  </lucide-angular>
                  <input
                    type="text"
                    [placeholder]="'Search ' + (placeholder()?.toLowerCase() || 'options...')"
                    [value]="searchQuery()"
                    (input)="onSearchInput($event)"
                    class="w-full pl-10 pr-3 py-2 text-sm bg-background border rounded focus:outline-none focus:ring-2 focus:ring-ring"
                    #searchInput
                  />
                </div>
              </div>
            }

            <!-- Options List -->
            <div class="max-h-60 overflow-y-auto p-1">
              @if (filteredOptions().length === 0) {
                <div class="py-6 text-center text-sm text-muted-foreground">
                  {{ searchQuery() ? 'No options found' : 'No options available' }}
                </div>
              } @else {
                @for (option of filteredOptions(); track option.value) {
                  <div
                    [class]="getOptionClasses(option)"
                    [attr.data-value]="option.value"
                    [attr.aria-selected]="isSelected(option)"
                    (click)="selectOption(option)"
                    (mouseenter)="setHighlightedIndex(filteredOptions().indexOf(option))"
                  >
                    <!-- Option Content with improved spacing -->
                    <div class="flex items-center space-x-3 relative">
                      <!-- Check Icon for Selected -->
                      @if (isSelected(option)) {
                        <lucide-angular 
                          [img]="CheckIcon" 
                          size="16" 
                          class="absolute left-0 top-1/2 -translate-y-1/2 flex-shrink-0 text-primary">
                        </lucide-angular>
                      }
                      
                      <!-- Content with margin to accommodate check icon -->
                      <div class="flex items-center space-x-3 ml-6">
                        @if (option.icon) {
                          <lucide-angular [img]="getIcon(option.icon)" size="16" class="flex-shrink-0"></lucide-angular>
                        }
                        <div class="flex-1 min-w-0">
                          <div class="font-medium truncate">{{ option.label }}</div>
                          @if (option.description) {
                            <div class="text-xs text-muted-foreground truncate">{{ option.description }}</div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                }
              }
            </div>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    /* Dropdown animations */
    .animate-in {
      animation: select-in 0.15s ease-out;
    }

    .fade-in-80 {
      animation: fade-in-80 0.15s ease-out;
    }

    .slide-in-from-bottom-2 {
      animation: slide-in-from-bottom-2 0.15s ease-out;
    }

    @keyframes select-in {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes fade-in-80 {
      from { opacity: 0; }
      to { opacity: 0.8; }
    }

    @keyframes slide-in-from-bottom-2 {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* Rotate animation for chevron */
    .rotate-180 {
      transform: rotate(180deg);
    }

    /* Focus styles */
    button:focus {
      outline: none;
    }

    /* Option hover and selection styles */
    .select-option {
      position: relative;
      cursor: pointer;
    }

    .select-option:hover {
      background-color: var(--color-accent);
      color: var(--color-accent-foreground);
    }

    .select-option.selected {
      background-color: var(--color-accent);
      color: var(--color-accent-foreground);
    }
  `]
})
export class SelectComponent implements AfterViewInit, OnDestroy {
  @ViewChild('triggerButton') triggerButton!: ElementRef<HTMLButtonElement>;
  @ViewChild('dropdownContent') dropdownContent?: ElementRef<HTMLDivElement>;
  @ViewChild('searchInput') searchInput?: ElementRef<HTMLInputElement>;

  // Component inputs using new signal-based approach
  options = input<SelectOption[]>([]);
  multiple = input(false);
  placeholder = input<string>();
  searchable = input(false);
  clearable = input(false);
  disabled = input(false);
  loading = input(false);
  maxHeight = input<string>();
  variant = input<'default' | 'error'>('default');
  size = input<'sm' | 'md' | 'lg'>('md');
  id = input<string>();
  class = input<string>();
  dataTestid = input<string>();

  // Accessibility inputs
  ariaLabel = input<string>();

  // Value input and outputs
  value = input<any>();
  valueChange = output<any>();
  selectionChange = output<SelectOption | SelectOption[]>();

  // Internal state using signals
  isOpen = signal(false);
  searchQuery = signal('');
  highlightedIndex = signal(-1);
  selectedValue = signal<any>(null);
  selectedValues = signal<any[]>([]);

  // Icons
  readonly ChevronDownIcon = ChevronDown;
  readonly CheckIcon = Check;
  readonly SearchIcon = Search;
  readonly XIcon = X;

  /**
   * Get icon by name
   */
  getIcon(iconName: string) {
    return (icons as any)[iconName];
  }

  // Outside click handler
  private clickOutsideHandler?: (event: Event) => void;

  constructor() {
    // Effect to sync value input with internal state
    effect(() => {
      const currentValue = this.value();
      if (currentValue !== undefined) {
        if (this.multiple()) {
          const newValues = Array.isArray(currentValue) ? currentValue : [];
          if (JSON.stringify(newValues) !== JSON.stringify(this.selectedValues())) {
            this.selectedValues.set(newValues);
          }
        } else {
          if (currentValue !== this.selectedValue()) {
            this.selectedValue.set(currentValue);
          }
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.setupOutsideClickHandler();
    
    // Initialize internal signals based on input values
    if (this.value()) {
      if (this.multiple()) {
        this.selectedValues.set(Array.isArray(this.value()) ? this.value() : []);
      } else {
        this.selectedValue.set(this.value());
      }
    }
  }

  ngOnDestroy(): void {
    this.removeOutsideClickHandler();
  }

  /**
   * Computed trigger classes
   */
  triggerClasses = computed(() => {
    const baseClasses = selectTriggerVariants({
      variant: this.variant(),
      size: this.size(),
    } as any);

    const classes = [baseClasses];

    if (this.class()) {
      classes.push(this.class()!);
    }

    if (this.disabled()) {
      classes.push('cursor-not-allowed opacity-50');
    }

    return classes.join(' ');
  });

  /**
   * Get filtered options based on search query
   */
  filteredOptions = computed(() => {
    if (!this.searchable() || !this.searchQuery().trim()) {
      return this.options();
    }

    const query = this.searchQuery().toLowerCase();
    return this.options().filter(option =>
      option.label.toLowerCase().includes(query) ||
      (option.description && option.description.toLowerCase().includes(query))
    );
  });

  /**
   * Get display text for the trigger
   */
  displayText = computed(() => {
    if (this.multiple()) {
      if (this.selectedValues().length === 0) {
        return this.placeholder() || 'Select options...';
      }
      if (this.selectedValues().length === 1) {
        const option = this.options().find(opt => opt.value === this.selectedValues()[0]);
        return option?.label || this.placeholder() || 'Select options...';
      }
      return `${this.selectedValues().length} selected`;
    } else {
      if (!this.selectedValue()) {
        return this.placeholder() || 'Select option...';
      }
      const option = this.options().find(opt => opt.value === this.selectedValue());
      return option?.label || this.placeholder() || 'Select option...';
    }
  });

  /**
   * Get display text class
   */
  displayTextClass = computed(() => {
    const hasValue = this.multiple() ? this.selectedValues().length > 0 : !!this.selectedValue();
    return hasValue ? 'text-foreground' : 'text-muted-foreground';
  });

  /**
   * Check if option is selected
   */
  isSelected(option: SelectOption): boolean {
    if (this.multiple()) {
      return this.selectedValues().includes(option.value);
    }
    return this.selectedValue() === option.value;
  }

  /**
   * Get option classes
   */
  getOptionClasses(option: SelectOption): string {
    const baseClasses = selectItemVariants({
      variant: option.disabled ? 'destructive' : 'default',
    });

    const classes = [baseClasses, 'select-option'];

    if (this.isSelected(option)) {
      classes.push('selected');
    }

    if (option.disabled) {
      classes.push('opacity-50 cursor-not-allowed');
    }

    return classes.join(' ');
  }

  /**
   * Toggle dropdown visibility
   */
  toggleDropdown(): void {
    if (this.disabled()) return;

    this.isOpen.update(current => !current);

    if (this.isOpen()) {
      this.highlightedIndex.set(-1);
      // Focus search input if searchable
      if (this.searchable()) {
        // Use requestAnimationFrame instead of setTimeout for better performance
        requestAnimationFrame(() => {
          this.searchInput?.nativeElement?.focus();
        });
      }
    }
  }

  /**
   * Select an option
   */
  selectOption(option: SelectOption): void {
    if (option.disabled) return;

    if (this.multiple()) {
      const currentValues = this.selectedValues();
      const index = currentValues.indexOf(option.value);
      if (index > -1) {
        this.selectedValues.update(values => values.filter(v => v !== option.value));
      } else {
        this.selectedValues.update(values => [...values, option.value]);
      }
      this.valueChange.emit(this.selectedValues());
    } else {
      this.selectedValue.set(option.value);
      this.isOpen.set(false);
      this.valueChange.emit(option.value);
    }

    const selectedOptions = this.multiple() 
      ? this.selectedValues().map(val =>
          this.options().find(opt => opt.value === val)
        ).filter((opt): opt is SelectOption => opt !== undefined)
      : option;

    this.selectionChange.emit(selectedOptions);
  }

  /**
   * Clear selection
   */
  clearSelection(event: Event): void {
    event.stopPropagation();

    if (this.multiple()) {
      this.selectedValues.set([]);
      this.valueChange.emit([]);
      this.selectionChange.emit([]);
    } else {
      this.selectedValue.set(null);
      this.valueChange.emit(null);
      // For single select, emit empty array when clearing
      this.selectionChange.emit([]);
    }
  }

  /**
   * Handle search input
   */
  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
    this.highlightedIndex.set(-1);
  }

  /**
   * Handle keyboard navigation
   */
  handleKeydown(event: KeyboardEvent): void {
    const filteredOptions = this.filteredOptions();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.setHighlightedIndex(Math.min(this.highlightedIndex() + 1, filteredOptions.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.setHighlightedIndex(Math.max(this.highlightedIndex() - 1, 0));
        break;
      case 'Enter':
        event.preventDefault();
        if (this.highlightedIndex() >= 0 && this.highlightedIndex() < filteredOptions.length) {
          this.selectOption(filteredOptions[this.highlightedIndex()]);
        }
        break;
      case 'Escape':
        event.preventDefault();
        this.isOpen.set(false);
        this.triggerButton.nativeElement.focus();
        break;
      case 'Tab':
        if (this.isOpen()) {
          event.preventDefault();
          this.isOpen.set(false);
        }
        break;
    }
  }

  /**
   * Set highlighted index
   */
  setHighlightedIndex(index: number): void {
    this.highlightedIndex.set(index);
  }

  /**
   * Setup outside click handler
   */
  private setupOutsideClickHandler(): void {
    this.clickOutsideHandler = (event: Event) => {
      const target = event.target as HTMLElement;
      const triggerElement = this.triggerButton?.nativeElement;
      const dropdownElement = this.dropdownContent?.nativeElement;

      if (triggerElement && dropdownElement &&
          !triggerElement.contains(target) &&
          !dropdownElement.contains(target)) {
        this.isOpen.set(false);
      }
    };

    document.addEventListener('click', this.clickOutsideHandler);
  }

  /**
   * Remove outside click handler
   */
  private removeOutsideClickHandler(): void {
    if (this.clickOutsideHandler) {
      document.removeEventListener('click', this.clickOutsideHandler);
    }
  }
}