import { 
  Component, 
  computed, 
  input, 
  output, 
  signal, 
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  HostListener,
  TemplateRef,
  ContentChildren,
  QueryList,
  AfterContentInit,
  inject,
  forwardRef,
  effect
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search } from 'lucide-angular';
import { ModalComponent } from './modal.component';
import { cva, type VariantProps, cn } from '../../utils/cn';

/**
 * Command item interface
 */
export interface CommandItem {
  /** Unique identifier */
  id: string;
  /** Item label/title */
  label: string;
  /** Item value for search/selection */
  value?: string;
  /** Icon for the item */
  icon?: any;
  /** Disabled state */
  disabled?: boolean;
  /** Command shortcut display */
  shortcut?: string;
  /** Keywords for search matching */
  keywords?: string[];
  /** Click handler */
  onSelect?: () => void;
}

/**
 * Command group interface
 */
export interface CommandGroup {
  /** Group identifier */
  id: string;
  /** Group heading */
  heading: string;
  /** Items in this group */
  items: CommandItem[];
}

/**
 * Command variants configuration
 */
export const commandVariants = cva(
  "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
  {
    variants: {
      variant: {
        default: "",
        dialog: "border-0 shadow-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Command input variants configuration
 */
export const commandInputVariants = cva(
  "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Command list variants configuration
 */
export const commandListVariants = cva(
  "max-h-[300px] overflow-y-auto overflow-x-hidden",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Command item variants configuration
 */
export const commandItemVariants = cva(
  "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 aria-selected:bg-accent aria-selected:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Command group variants configuration
 */
export const commandGroupVariants = cva(
  "overflow-hidden p-1 text-foreground [&_[data-command-group-heading]]:px-2 [&_[data-command-group-heading]]:py-1.5 [&_[data-command-group-heading]]:text-xs [&_[data-command-group-heading]]:font-medium [&_[data-command-group-heading]]:text-muted-foreground",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export type CommandVariant = VariantProps<typeof commandVariants>;
export type CommandInputVariant = VariantProps<typeof commandInputVariants>;
export type CommandListVariant = VariantProps<typeof commandListVariants>;
export type CommandItemVariant = VariantProps<typeof commandItemVariants>;
export type CommandGroupVariant = VariantProps<typeof commandGroupVariants>;

/**
 * Command Input Component
 * Search input for command palette
 */
@Component({
  selector: 'lib-command-input',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="flex items-center border-b px-3" data-command-input-wrapper>
      <lucide-icon name="search" class="mr-2 h-4 w-4 shrink-0 opacity-50"></lucide-icon>
      <input
        #inputRef
        [class]="inputClasses()"
        [placeholder]="placeholder()"
        [value]="value()"
        (input)="onInput($event)"
        (keydown)="onKeyDown($event)"
        [disabled]="disabled()"
        autocomplete="off"
        data-command-input
      />
    </div>
  `
})
export class CommandInputComponent implements OnInit {
  @ViewChild('inputRef', { static: true }) inputRef!: ElementRef<HTMLInputElement>;

  // Inputs
  readonly placeholder = input<string>('Search...');
  readonly disabled = input<boolean>(false);
  readonly variant = input<CommandInputVariant['variant']>('default');

  // Outputs
  readonly valueChange = output<string>();
  readonly keydown = output<KeyboardEvent>();

  // State
  readonly value = signal('');

  // Inject parent command component
  private commandComponent = inject(CommandComponent, { optional: true });

  // Computed
  readonly inputClasses = computed(() => 
    cn(commandInputVariants({ variant: this.variant() }))
  );

  ngOnInit(): void {
    // Auto-focus the input when created
    setTimeout(() => this.focus(), 0);
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value.set(value);
    this.valueChange.emit(value);
    
    // Update command component search query
    this.commandComponent?.setSearchQuery(value);
  }

  onKeyDown(event: KeyboardEvent): void {
    this.keydown.emit(event);
  }

  focus(): void {
    this.inputRef.nativeElement.focus();
  }

  clear(): void {
    this.value.set('');
    this.valueChange.emit('');
    this.inputRef.nativeElement.value = '';
  }
}

/**
 * Command Empty Component
 * Displayed when no results found
 */
@Component({
  selector: 'lib-command-empty',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="py-6 text-center text-sm" data-command-empty>
      <ng-content>No results found.</ng-content>
    </div>
  `
})
export class CommandEmptyComponent {}

/**
 * Command Item Component
 * Individual command item
 */
@Component({
  selector: 'lib-command-item',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div
      [class]="itemClasses()"
      [attr.data-disabled]="disabled() ? '' : null"
      [attr.aria-disabled]="disabled()"
      [attr.data-value]="value()"
      [attr.data-selected]="selected() ? '' : null"
      [attr.aria-selected]="selected()"
      (click)="onClick()"
      (keydown)="onKeyDown($event)"
      tabindex="-1"
      role="option"
      data-command-item
    >
      <lucide-icon 
        *ngIf="icon()" 
        [name]="icon()" 
        class="mr-2 h-4 w-4">
      </lucide-icon>
      
      <span class="flex-1"><ng-content></ng-content></span>
      
      <span 
        *ngIf="shortcut()" 
        class="ml-auto text-xs tracking-widest text-muted-foreground"
        data-command-shortcut
      >
        {{ shortcut() }}
      </span>
    </div>
  `
})
export class CommandItemComponent {
  // Inputs
  readonly value = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly selected = input<boolean>(false);
  readonly icon = input<string>();
  readonly shortcut = input<string>();
  readonly variant = input<CommandItemVariant['variant']>('default');

  // Outputs
  readonly select = output<void>();

  // Computed
  readonly itemClasses = computed(() => 
    cn(commandItemVariants({ variant: this.variant() }))
  );

  onClick(): void {
    if (this.disabled()) return;
    this.select.emit();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) return;
    
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.select.emit();
    }
  }
}

/**
 * Command Group Component
 * Groups of command items with heading
 */
@Component({
  selector: 'lib-command-group',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="groupClasses()" data-command-group>
      <div 
        *ngIf="heading()"
        class="px-2 py-1.5 text-xs font-medium text-muted-foreground"
        data-command-group-heading
      >
        {{ heading() }}
      </div>
      <ng-content></ng-content>
    </div>
  `
})
export class CommandGroupComponent {
  // Inputs
  readonly heading = input<string>();
  readonly variant = input<CommandGroupVariant['variant']>('default');

  // Computed
  readonly groupClasses = computed(() => 
    cn(commandGroupVariants({ variant: this.variant() }))
  );
}

/**
 * Command Separator Component
 * Visual separator between groups
 */
@Component({
  selector: 'lib-command-separator',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="-mx-1 h-px bg-border" data-command-separator></div>
  `
})
export class CommandSeparatorComponent {}

/**
 * Command List Component
 * Container for command items and groups
 */
@Component({
  selector: 'lib-command-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      [class]="listClasses()"
      role="listbox" 
      data-command-list
    >
      <ng-content></ng-content>
    </div>
  `
})
export class CommandListComponent {
  // Inputs
  readonly variant = input<CommandListVariant['variant']>('default');

  // Computed
  readonly listClasses = computed(() => 
    cn(commandListVariants({ variant: this.variant() }))
  );
}

/**
 * Command Shortcut Component
 * Keyboard shortcut display
 */
@Component({
  selector: 'lib-command-shortcut',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="ml-auto text-xs tracking-widest text-muted-foreground">
      <ng-content></ng-content>
    </span>
  `
})
export class CommandShortcutComponent {}

/**
 * Main Command Component
 * Command palette interface with search and keyboard navigation
 */
@Component({
  selector: 'lib-command',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div 
      [class]="commandClasses()"
      [attr.data-command-root]="true"
      role="combobox"
      [attr.aria-expanded]="true"
      [attr.aria-haspopup]="'listbox'"
      [attr.aria-owns]="'command-list'"
    >
      <ng-content></ng-content>
    </div>
  `,
  host: {
    '(keydown)': 'onKeyDown($event)',
    '[attr.data-command-filter]': 'filter() || ""'
  }
})
export class CommandComponent implements OnInit, OnDestroy, AfterContentInit {
  @ViewChild(CommandInputComponent) commandInput?: CommandInputComponent;
  @ContentChildren(CommandItemComponent, { descendants: true }) commandItems!: QueryList<CommandItemComponent>;

  // Inputs
  readonly variant = input<CommandVariant['variant']>('default');
  readonly filter = input<string>('');
  readonly shouldFilter = input<boolean>(true);
  readonly searchValue = input<string>('');

  // Outputs  
  readonly valueChange = output<string>();

  // State
  readonly selectedIndex = signal(-1);
  readonly filteredItems = signal<Element[]>([]);
  readonly searchQuery = signal('');
  
  // Computed
  readonly commandClasses = computed(() => 
    cn(commandVariants({ variant: this.variant() }))
  );

  // Effect to handle search filtering
  private searchEffect = effect(() => {
    const query = this.searchQuery();
    if (this.shouldFilter()) {
      this.filterItems(query);
    }
  });

  // Lifecycle
  ngOnInit(): void {
    this.setupKeyboardNavigation();
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  ngAfterContentInit(): void {
    // Initialize filtered items
    this.updateFilteredItems();
  }

  private setupKeyboardNavigation(): void {
    // Keyboard navigation will be handled in onKeyDown
  }

  onKeyDown(event: KeyboardEvent): void {
    const { key, target } = event;

    // Don't interfere with input typing
    if (target instanceof HTMLInputElement && target.hasAttribute('data-command-input')) {
      if (key === 'ArrowDown' || key === 'ArrowUp') {
        event.preventDefault();
        if (key === 'ArrowDown') {
          this.navigateNext();
        } else {
          this.navigatePrevious();
        }
      }
      return;
    }

    switch (key) {
      case 'ArrowDown':
        event.preventDefault();
        this.navigateNext();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.navigatePrevious();
        break;
      case 'Enter':
        event.preventDefault();
        this.selectCurrentItem();
        break;
      case 'Escape':
        event.preventDefault();
        this.clearSelection();
        break;
      case 'Home':
        event.preventDefault();
        this.navigateToFirst();
        break;
      case 'End':
        event.preventDefault();
        this.navigateToLast();
        break;
    }
  }

  private navigateNext(): void {
    const items = this.getNavigableItems();
    if (items.length === 0) return;

    const currentIndex = this.selectedIndex();
    const nextIndex = currentIndex + 1 >= items.length ? 0 : currentIndex + 1;
    this.selectedIndex.set(nextIndex);
    this.updateSelection(items);
  }

  private navigatePrevious(): void {
    const items = this.getNavigableItems();
    if (items.length === 0) return;

    const currentIndex = this.selectedIndex();
    const prevIndex = currentIndex <= 0 ? items.length - 1 : currentIndex - 1;
    this.selectedIndex.set(prevIndex);
    this.updateSelection(items);
  }

  private navigateToFirst(): void {
    const items = this.getNavigableItems();
    if (items.length === 0) return;

    this.selectedIndex.set(0);
    this.updateSelection(items);
  }

  private navigateToLast(): void {
    const items = this.getNavigableItems();
    if (items.length === 0) return;

    this.selectedIndex.set(items.length - 1);
    this.updateSelection(items);
  }

  private selectCurrentItem(): void {
    const items = this.getNavigableItems();
    const currentIndex = this.selectedIndex();
    
    if (currentIndex >= 0 && currentIndex < items.length) {
      const item = items[currentIndex] as HTMLElement;
      item.click();
    }
  }

  private clearSelection(): void {
    this.selectedIndex.set(-1);
    this.updateSelection([]);
  }

  private getNavigableItems(): Element[] {
    if (typeof document === 'undefined') return [];
    
    return Array.from(
      document.querySelectorAll('[data-command-item]:not([data-disabled]):not([hidden])')
    );
  }

  private updateSelection(items: Element[]): void {
    // Clear previous selection
    items.forEach((item, index) => {
      const isSelected = index === this.selectedIndex();
      item.setAttribute('aria-selected', isSelected.toString());
      if (isSelected) {
        item.setAttribute('data-selected', '');
        // Scroll into view if needed
        (item as HTMLElement).scrollIntoView({
          block: 'nearest'
        });
      } else {
        item.removeAttribute('data-selected');
      }
    });
  }

  private updateFilteredItems(): void {
    // This would be used with the search filter
    // For now, we'll keep it simple
    const items = this.getNavigableItems();
    this.filteredItems.set(items);
  }

  private filterItems(query: string): void {
    if (typeof document === 'undefined') return;

    const allItems = Array.from(
      document.querySelectorAll('[data-command-item]')
    ) as HTMLElement[];

    const allGroups = Array.from(
      document.querySelectorAll('[data-command-group]')
    ) as HTMLElement[];

    if (!query.trim()) {
      // Show all items and groups
      allItems.forEach(item => {
        item.style.display = '';
        item.removeAttribute('hidden');
      });
      allGroups.forEach(group => {
        group.style.display = '';
        group.removeAttribute('hidden');
      });
      return;
    }

    const searchLower = query.toLowerCase();

    // Filter items
    allItems.forEach(item => {
      const value = item.getAttribute('data-value') || '';
      const text = item.textContent || '';
      const keywords = item.getAttribute('data-keywords') || '';
      
      const searchText = `${value} ${text} ${keywords}`.toLowerCase();
      const matches = searchText.includes(searchLower);

      if (matches) {
        item.style.display = '';
        item.removeAttribute('hidden');
      } else {
        item.style.display = 'none';
        item.setAttribute('hidden', '');
      }
    });

    // Hide groups with no visible items
    allGroups.forEach(group => {
      const visibleItems = group.querySelectorAll('[data-command-item]:not([hidden])');
      if (visibleItems.length === 0) {
        group.style.display = 'none';
        group.setAttribute('hidden', '');
      } else {
        group.style.display = '';
        group.removeAttribute('hidden');
      }
    });

    // Reset selection after filtering
    this.selectedIndex.set(-1);
  }

  /**
   * Set search query and trigger filtering
   */
  setSearchQuery(query: string): void {
    this.searchQuery.set(query);
    this.valueChange.emit(query);
  }

  /**
   * Focus the command input
   */
  focusInput(): void {
    this.commandInput?.focus();
  }

  /**
   * Clear search and reset state
   */
  clear(): void {
    this.searchQuery.set('');
    this.selectedIndex.set(-1);
    this.commandInput?.clear();
  }
}

/**
 * Command Dialog Component
 * Command palette in a modal dialog
 */
@Component({
  selector: 'lib-command-dialog',
  standalone: true,
  imports: [CommonModule, ModalComponent, CommandComponent],
  template: `
    <lib-modal
      [open]="open()"
      (openChange)="openChange.emit($event)"
      [title]="title()"
      [description]="description()"
      [showCloseButton]="showCloseButton()"
      [closeOnOverlayClick]="closeOnOverlayClick()"
      [closeOnEscape]="closeOnEscape()"
      size="lg"
      [class]="'overflow-hidden p-0'"
    >
      <lib-command 
        variant="dialog" 
        [class]="commandDialogClasses()"
      >
        <ng-content></ng-content>
      </lib-command>
    </lib-modal>
  `
})
export class CommandDialogComponent {
  // Inputs
  readonly open = input<boolean>(false);
  readonly title = input<string>('Command Palette');
  readonly description = input<string>('Search for a command to run...');
  readonly showCloseButton = input<boolean>(true);
  readonly closeOnOverlayClick = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);

  // Outputs
  readonly openChange = output<boolean>();

  // Computed
  readonly commandDialogClasses = computed(() => 
    cn(
      "[&_[data-command-group-heading]]:px-2 [&_[data-command-group-heading]]:font-medium [&_[data-command-group-heading]]:text-muted-foreground",
      "[&_[data-command-group]:not([hidden])_~[data-command-group]]:pt-0 [&_[data-command-group]]:px-2",
      "[&_[data-command-input-wrapper]_lucide-icon]:h-5 [&_[data-command-input-wrapper]_lucide-icon]:w-5",
      "[&_[data-command-input]]:h-12 [&_[data-command-item]]:px-2 [&_[data-command-item]]:py-3",
      "[&_[data-command-item]_lucide-icon]:h-5 [&_[data-command-item]_lucide-icon]:w-5"
    )
  );
}