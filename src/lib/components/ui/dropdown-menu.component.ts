import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  computed, 
  input, 
  output, 
  signal, 
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  HostListener,
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { cva, type VariantProps, cn } from '../../utils/cn';

/**
 * Dropdown menu item interface
 */
export interface DropdownMenuItem {
  /** Unique identifier */
  id: string;
  /** Item label */
  label: string;
  /** Item value */
  value?: any;
  /** Icon for the item */
  icon?: any;
  /** Disabled state */
  disabled?: boolean;
  /** Item type */
  type?: 'item' | 'separator' | 'label' | 'checkbox' | 'radio' | 'destructive';
  /** Checked state for checkbox/radio items */
  checked?: boolean;
  /** Keyboard shortcut */
  shortcut?: string;
  /** Submenu items */
  submenu?: DropdownMenuItem[];
  /** Custom template */
  template?: TemplateRef<any>;
  /** Click handler */
  action?: () => void;
}

/**
 * Dropdown content variant configuration
 */
export const dropdownContentVariants = cva(
  "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
  {
    variants: {
      side: {
        top: "animate-in slide-in-from-bottom-2",
        bottom: "animate-in slide-in-from-top-2",
        left: "animate-in slide-in-from-right-2",
        right: "animate-in slide-in-from-left-2",
      },
      size: {
        sm: "min-w-[6rem] text-xs",
        md: "min-w-[8rem] text-sm",
        lg: "min-w-[12rem] text-base",
      },
    },
    defaultVariants: {
      side: "bottom",
      size: "md",
    },
  }
);

/**
 * Dropdown item variant configuration
 */
export const dropdownItemVariants = cva(
  "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      variant: {
        default: "hover:bg-accent hover:text-accent-foreground",
        destructive: "text-red-600 focus:bg-red-50 focus:text-red-600 hover:bg-red-50 hover:text-red-600",
      },
      inset: {
        true: "pl-8",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      inset: false,
    },
  }
);

/**
 * Dropdown separator variant configuration
 */
export const dropdownSeparatorVariants = cva(
  "-mx-1 my-1 h-px bg-muted"
);

/**
 * Dropdown label variant configuration
 */
export const dropdownLabelVariants = cva(
  "px-2 py-1.5 text-sm font-semibold text-muted-foreground"
);

/**
 * Dropdown Menu component following shadcn/ui design patterns
 * Supports nested menus, keyboard navigation, and various item types
 * 
 * @example
 * ```html
 * <!-- Basic dropdown -->
 * <lib-dropdown-menu [items]="menuItems">
 *   <lib-button>Open Menu</lib-button>
 * </lib-dropdown-menu>
 * 
 * <!-- With custom trigger -->
 * <lib-dropdown-menu [items]="menuItems" placement="bottom-start">
 *   <button class="custom-trigger">
 *     Custom Trigger
 *   </button>
 * </lib-dropdown-menu>
 * ```
 */
@Component({
  selector: 'lib-dropdown-menu',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="relative inline-block" #dropdownContainer>
      <!-- Trigger -->
      <div 
        #trigger
        (click)="toggle()"
        (keydown)="handleTriggerKeyDown($event)"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-haspopup]="true"
        [attr.aria-controls]="isOpen() ? 'dropdown-content-' + dropdownId : null"
        role="button"
        tabindex="0"
        class="inline-flex"
      >
        <ng-content></ng-content>
      </div>

      <!-- Dropdown Content -->
      @if (isOpen()) {
        <div
          #content
          [attr.id]="'dropdown-content-' + dropdownId"
          [class]="contentClasses()"
          [style]="positionStyles()"
          role="menu"
          [attr.aria-labelledby]="trigger"
          (keydown)="handleMenuKeyDown($event)"
          class="absolute z-50"
        >
          @for (item of items(); track item.id) {
            @switch (item.type || 'item') {
              @case ('separator') {
                <div [class]="separatorClasses()" role="separator"></div>
              }
              
              @case ('label') {
                <div [class]="labelClasses()">{{ item.label }}</div>
              }
              
              @default {
                <div
                  [class]="itemClasses(item)"
                  [attr.data-disabled]="item.disabled"
                  [attr.aria-disabled]="item.disabled"
                  [attr.tabindex]="item.disabled ? -1 : 0"
                  role="menuitem"
                  (click)="selectItem(item, $event)"
                  (keydown)="handleItemKeyDown($event, item)"
                  (mouseenter)="highlightItem(item.id)"
                >
                  <!-- Checkbox/Radio indicator -->
                  @if (item.type === 'checkbox' || item.type === 'radio') {
                    <span class="w-4 h-4 flex items-center justify-center">
                      @if (item.checked) {
                        <lucide-angular
                          [img]="item.type === 'checkbox' ? CheckIcon() : CircleIcon()"
                          class="h-3 w-3"
                        ></lucide-angular>
                      }
                    </span>
                  }
                  
                  <!-- Icon -->
                  @if (item.icon && item.type !== 'checkbox' && item.type !== 'radio') {
                    <lucide-angular [img]="item.icon" class="h-4 w-4"></lucide-angular>
                  }
                  
                  <!-- Custom template -->
                  @if (item.template) {
                    <ng-container [ngTemplateOutlet]="item.template" [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
                  }
                  <!-- Default label -->
                  @else {
                    <span class="flex-1">{{ item.label }}</span>
                  }
                  
                  <!-- Shortcut -->
                  @if (item.shortcut) {
                    <span class="ml-auto text-xs tracking-widest text-muted-foreground">
                      {{ item.shortcut }}
                    </span>
                  }
                  
                  <!-- Submenu indicator -->
                  @if (item.submenu && item.submenu.length > 0) {
                    <lucide-angular [img]="ChevronRightIcon()" class="h-4 w-4 ml-auto"></lucide-angular>
                  }
                </div>
                
                <!-- Submenu (if any) -->
                @if (item.submenu && item.submenu.length > 0 && getHighlightedItem() === item.id) {
                  <div class="absolute left-full top-0 ml-1">
                    <div [class]="contentClasses()">
                      @for (subItem of item.submenu; track subItem.id) {
                        <div
                          [class]="itemClasses(subItem)"
                          [attr.data-disabled]="subItem.disabled"
                          [attr.aria-disabled]="subItem.disabled"
                          role="menuitem"
                          (click)="selectItem(subItem, $event)"
                        >
                          @if (subItem.icon) {
                            <lucide-angular [img]="subItem.icon" class="h-4 w-4"></lucide-angular>
                          }
                          <span>{{ subItem.label }}</span>
                          @if (subItem.shortcut) {
                            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
                              {{ subItem.shortcut }}
                            </span>
                          }
                        </div>
                      }
                    </div>
                  </div>
                }
              }
            }
          }
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    /* Animation styles */
    .animate-in {
      animation-duration: 0.15s;
      animation-fill-mode: both;
    }

    .slide-in-from-top-2 {
      animation-name: slideInFromTop;
    }

    .slide-in-from-bottom-2 {
      animation-name: slideInFromBottom;
    }

    .slide-in-from-left-2 {
      animation-name: slideInFromLeft;
    }

    .slide-in-from-right-2 {
      animation-name: slideInFromRight;
    }

    @keyframes slideInFromTop {
      from {
        opacity: 0;
        transform: translateY(-0.5rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideInFromBottom {
      from {
        opacity: 0;
        transform: translateY(0.5rem);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideInFromLeft {
      from {
        opacity: 0;
        transform: translateX(-0.5rem);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideInFromRight {
      from {
        opacity: 0;
        transform: translateX(0.5rem);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    /* Focus styles */
    [role="menuitem"]:focus {
      outline: none;
      background-color: var(--accent);
      color: var(--accent-foreground);
    }

    /* Disabled styles */
    [data-disabled="true"] {
      pointer-events: none;
      opacity: 0.5;
    }

    /* Submenu positioning */
    .absolute.left-full {
      z-index: 51;
    }
  `]
})
export class DropdownMenuComponent implements OnInit, OnDestroy {
  // Modern signal inputs
  readonly items = input<DropdownMenuItem[]>([]);
  readonly placement = input<'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'>('bottom-start');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly disabled = input<boolean>(false);
  readonly closeOnSelect = input<boolean>(true);

  // Traditional inputs
  @Input() id?: string;
  @Input() class?: string;
  @Input() dataTestid?: string;

  // Modern signal outputs
  readonly itemSelected = output<DropdownMenuItem>();
  readonly openChanged = output<boolean>();

  // ViewChild references
  @ViewChild('trigger') trigger!: ElementRef<HTMLElement>;
  @ViewChild('content') content!: ElementRef<HTMLElement>;
  @ViewChild('dropdownContainer') dropdownContainer!: ElementRef<HTMLElement>;

  // Icons
  CheckIcon = signal<any>(null);
  CircleIcon = signal<any>(null);
  ChevronRightIcon = signal<any>(null);

  // Internal state
  private _isOpen = signal(false);
  private _highlightedItem = signal<string>('');
  protected dropdownId = `dropdown-${Math.random().toString(36).substr(2, 9)}`;

  constructor() {
    // Dynamic import for icons
    import('lucide-angular').then(({ Check, Circle, ChevronRight }) => {
      this.CheckIcon.set(Check);
      this.CircleIcon.set(Circle);
      this.ChevronRightIcon.set(ChevronRight);
    });
  }

  ngOnInit(): void {
    // Initialize component
  }

  ngOnDestroy(): void {
    // Cleanup if needed
  }

  // Listen for clicks outside to close dropdown
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (this.dropdownContainer && !this.dropdownContainer.nativeElement.contains(event.target as Node)) {
      this.close();
    }
  }

  // Listen for escape key to close dropdown
  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.close();
  }

  /**
   * Get dropdown open state
   */
  isOpen(): boolean {
    return this._isOpen();
  }

  /**
   * Get highlighted item
   */
  getHighlightedItem(): string {
    return this._highlightedItem();
  }

  /**
   * Content classes
   */
  readonly contentClasses = computed(() => {
    const side = this.placement().split('-')[0] as 'top' | 'bottom' | 'left' | 'right';
    return cn(
      dropdownContentVariants({
        side,
        size: this.size(),
      })
    );
  });

  /**
   * Item classes
   */
  itemClasses(item: DropdownMenuItem): string {
    return cn(
      dropdownItemVariants({
        variant: item.type === 'destructive' ? 'destructive' : 'default',
        inset: item.type === 'checkbox' || item.type === 'radio',
      })
    );
  }

  /**
   * Separator classes
   */
  readonly separatorClasses = computed(() => {
    return dropdownSeparatorVariants();
  });

  /**
   * Label classes
   */
  readonly labelClasses = computed(() => {
    return dropdownLabelVariants();
  });

  /**
   * Position styles for dropdown content
   */
  readonly positionStyles = computed(() => {
    const placement = this.placement();
    const styles: any = {};

    if (placement.includes('top')) {
      styles.bottom = '100%';
      styles.marginBottom = '0.25rem';
    } else if (placement.includes('bottom')) {
      styles.top = '100%';
      styles.marginTop = '0.25rem';
    }

    if (placement.includes('start')) {
      styles.left = '0';
    } else if (placement.includes('end')) {
      styles.right = '0';
    } else if (placement.includes('left')) {
      styles.right = '100%';
      styles.marginRight = '0.25rem';
    } else if (placement.includes('right')) {
      styles.left = '100%';
      styles.marginLeft = '0.25rem';
    }

    return styles;
  });

  /**
   * Toggle dropdown open/close
   */
  toggle(): void {
    if (this.disabled()) return;
    
    if (this._isOpen()) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Open dropdown
   */
  open(): void {
    if (this.disabled()) return;
    
    this._isOpen.set(true);
    this.openChanged.emit(true);
    
    // Focus first menu item
    setTimeout(() => {
      this.focusFirstItem();
    });
  }

  /**
   * Close dropdown
   */
  close(): void {
    this._isOpen.set(false);
    this._highlightedItem.set('');
    this.openChanged.emit(false);
    
    // Return focus to trigger
    this.trigger.nativeElement.focus();
  }

  /**
   * Select an item
   */
  selectItem(item: DropdownMenuItem, event?: Event): void {
    if (item.disabled) {
      event?.preventDefault();
      return;
    }

    // Handle checkbox/radio toggle
    if (item.type === 'checkbox') {
      item.checked = !item.checked;
    } else if (item.type === 'radio') {
      // Uncheck other radio items in the same group
      this.items().forEach(i => {
        if (i.type === 'radio' && i !== item) {
          i.checked = false;
        }
      });
      item.checked = true;
    }

    // Execute action
    if (item.action) {
      item.action();
    }

    // Emit selection
    this.itemSelected.emit(item);

    // Close dropdown if configured to do so
    if (this.closeOnSelect() && item.type !== 'checkbox') {
      this.close();
    }
  }

  /**
   * Highlight an item
   */
  highlightItem(itemId: string): void {
    this._highlightedItem.set(itemId);
  }

  /**
   * Handle trigger keydown
   */
  handleTriggerKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        event.preventDefault();
        this.open();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.open();
        setTimeout(() => this.focusLastItem());
        break;
    }
  }

  /**
   * Handle menu keydown navigation
   */
  handleMenuKeyDown(event: KeyboardEvent): void {
    const menuItems = this.items().filter(item => 
      item.type !== 'separator' && item.type !== 'label' && !item.disabled
    );

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusNextItem(menuItems);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusPreviousItem(menuItems);
        break;
      case 'Home':
        event.preventDefault();
        this.focusFirstItem();
        break;
      case 'End':
        event.preventDefault();
        this.focusLastItem();
        break;
      case 'Escape':
        event.preventDefault();
        this.close();
        break;
    }
  }

  /**
   * Handle item keydown
   */
  handleItemKeyDown(event: KeyboardEvent, item: DropdownMenuItem): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectItem(item);
        break;
    }
  }

  /**
   * Focus first menu item
   */
  private focusFirstItem(): void {
    const firstItem = this.content.nativeElement.querySelector('[role="menuitem"]:not([data-disabled="true"])') as HTMLElement;
    firstItem?.focus();
  }

  /**
   * Focus last menu item
   */
  private focusLastItem(): void {
    const menuItems = Array.from(this.content.nativeElement.querySelectorAll('[role="menuitem"]:not([data-disabled="true"])')) as HTMLElement[];
    menuItems[menuItems.length - 1]?.focus();
  }

  /**
   * Focus next menu item
   */
  private focusNextItem(menuItems: DropdownMenuItem[]): void {
    const activeElement = document.activeElement as HTMLElement;
    const currentIndex = Array.from(this.content.nativeElement.querySelectorAll('[role="menuitem"]')).indexOf(activeElement);
    const nextIndex = (currentIndex + 1) % menuItems.length;
    const nextElement = this.content.nativeElement.querySelectorAll('[role="menuitem"]:not([data-disabled="true"])')[nextIndex] as HTMLElement;
    nextElement?.focus();
  }

  /**
   * Focus previous menu item
   */
  private focusPreviousItem(menuItems: DropdownMenuItem[]): void {
    const activeElement = document.activeElement as HTMLElement;
    const currentIndex = Array.from(this.content.nativeElement.querySelectorAll('[role="menuitem"]')).indexOf(activeElement);
    const previousIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
    const previousElement = this.content.nativeElement.querySelectorAll('[role="menuitem"]:not([data-disabled="true"])')[previousIndex] as HTMLElement;
    previousElement?.focus();
  }
}