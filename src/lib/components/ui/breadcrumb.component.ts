import { 
  Component, 
  computed, 
  input, 
  output, 
  signal, 
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { cva, type VariantProps, cn } from '../../utils/cn';

/**
 * Breadcrumb item interface
 */
export interface BreadcrumbItem {
  /** Unique identifier */
  id: string;
  /** Breadcrumb label */
  label: string;
  /** URL or route */
  href?: string;
  /** Icon for the breadcrumb */
  icon?: any;
  /** Disabled state */
  disabled?: boolean;
  /** Is current page */
  current?: boolean;
  /** Custom template */
  template?: TemplateRef<any>;
  /** Click handler */
  onClick?: () => void;
}

/**
 * Breadcrumb variant configuration
 */
export const breadcrumbVariants = cva(
  "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground",
  {
    variants: {
      variant: {
        default: "",
        ghost: "text-foreground",
      },
      size: {
        sm: "text-xs gap-1",
        md: "text-sm gap-1.5",
        lg: "text-base gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Breadcrumb item variant configuration
 */
export const breadcrumbItemVariants = cva(
  "inline-flex items-center gap-1.5",
  {
    variants: {
      current: {
        true: "text-foreground font-medium",
        false: "text-muted-foreground hover:text-foreground transition-colors",
      },
      clickable: {
        true: "cursor-pointer hover:underline",
        false: "cursor-default",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
        false: "",
      },
    },
    defaultVariants: {
      current: false,
      clickable: false,
      disabled: false,
    },
  }
);

/**
 * Breadcrumb separator variant configuration
 */
export const breadcrumbSeparatorVariants = cva(
  "text-muted-foreground",
  {
    variants: {
      size: {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

/**
 * Breadcrumb component following shadcn/ui design patterns
 * Supports navigation, accessibility, and overflow handling
 * 
 * @example
 * ```html
 * <!-- Basic breadcrumb -->
 * <lib-breadcrumb [items]="breadcrumbItems"></lib-breadcrumb>
 * 
 * <!-- With custom separator -->
 * <lib-breadcrumb 
 *   [items]="breadcrumbItems"
 *   [separator]="ArrowRightIcon">
 * </lib-breadcrumb>
 * 
 * <!-- With overflow handling -->
 * <lib-breadcrumb 
 *   [items]="breadcrumbItems"
 *   [maxItems]="3"
 *   [showEllipsis]="true">
 * </lib-breadcrumb>
 * ```
 */
@Component({
  selector: 'lib-breadcrumb',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <nav [class]="containerClasses()" [attr.aria-label]="ariaLabel() || 'Breadcrumb'" [attr.data-testid]="dataTestid()">
      <ol class="flex flex-wrap items-center gap-1.5 break-words">
        @for (item of displayItems(); track item.id; let i = $index) {
          <li class="inline-flex items-center gap-1.5">
            <!-- Ellipsis for collapsed items -->
            @if (item.id === 'ellipsis') {
              <div class="flex items-center gap-1.5">
                @if (ellipsisDropdown()) {
                  <!-- Dropdown with collapsed items -->
                  <button
                    type="button"
                    class="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    [attr.aria-label]="'Show ' + collapsedItems().length + ' more items'"
                    (click)="toggleEllipsis()"
                  >
                    @if (MoreHorizontalIcon() && MoreHorizontalIcon() !== null) {
                      <lucide-angular [img]="MoreHorizontalIcon()" class="h-4 w-4"></lucide-angular>
                    }
                  </button>
                  
                  @if (showEllipsisMenu()) {
                    <div class="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
                      @for (collapsedItem of collapsedItems(); track collapsedItem.id) {
                        <div
                          [class]="ellipsisItemClasses(collapsedItem)"
                          (click)="selectBreadcrumb(collapsedItem)"
                        >
                          @if (collapsedItem.icon && collapsedItem.icon !== null && collapsedItem.icon !== undefined) {
                            <lucide-angular [img]="collapsedItem.icon" class="h-4 w-4"></lucide-angular>
                          }
                          <span>{{ collapsedItem.label }}</span>
                        </div>
                      }
                    </div>
                  }
                } @else {
                  <!-- Simple ellipsis -->
                  <span class="text-muted-foreground">...</span>
                }
                
                <!-- Separator after ellipsis -->
                @if (separator() && separator() !== null && separator() !== undefined) {
                  <lucide-angular [img]="separator()" [class]="separatorClasses()"></lucide-angular>
                }
              </div>
            } @else {
              <!-- Regular breadcrumb item -->
              <div
                [class]="itemClasses(item)"
                [attr.aria-current]="item.current ? 'page' : null"
              >
                @if (item.template) {
                  <!-- Custom template -->
                  <ng-container [ngTemplateOutlet]="item.template" [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
                } @else {
                  <!-- Default item content -->
                  @if (item.href && !item.disabled && !item.current) {
                    <!-- Clickable link -->
                    <a
                      [href]="item.href"
                      class="flex items-center gap-1.5 cursor-pointer hover:underline"
                      (click)="selectBreadcrumb(item, $event)"
                    >
                      @if (item.icon && item.icon !== null && item.icon !== undefined) {
                        <lucide-angular [img]="item.icon" class="h-4 w-4"></lucide-angular>
                      }
                      <span>{{ item.label }}</span>
                    </a>
                  } @else if (item.onClick && !item.disabled && !item.current) {
                    <!-- Clickable button -->
                    <button
                      type="button"
                      class="flex items-center gap-1.5 cursor-pointer hover:underline"
                      (click)="selectBreadcrumb(item)"
                    >
                      @if (item.icon && item.icon !== null && item.icon !== undefined) {
                        <lucide-angular [img]="item.icon" class="h-4 w-4"></lucide-angular>
                      }
                      <span>{{ item.label }}</span>
                    </button>
                  } @else {
                    <!-- Static item -->
                    <span class="flex items-center gap-1.5">
                      @if (item.icon && item.icon !== null && item.icon !== undefined) {
                        <lucide-angular [img]="item.icon" class="h-4 w-4"></lucide-angular>
                      }
                      <span>{{ item.label }}</span>
                    </span>
                  }
                }
              </div>
              
              <!-- Separator (not for last item) -->
              @if (i < displayItems().length - 1 && currentSeparator() && currentSeparator() !== null && currentSeparator() !== undefined) {
                <lucide-angular [img]="currentSeparator()" [class]="separatorClasses()"></lucide-angular>
              }
            }
          </li>
        }
      </ol>
    </nav>
  `,
  styles: [`
    :host {
      display: block;
    }

    /* Responsive behavior */
    @media (max-width: 640px) {
      .break-words {
        max-width: 100%;
        overflow-wrap: break-word;
      }
    }

    /* Focus styles */
    a:focus,
    button:focus {
      outline: 2px solid var(--ring);
      outline-offset: 2px;
      border-radius: 0.125rem;
    }

    /* Hover effects */
    a:hover,
    button:hover {
      color: var(--foreground);
    }

    /* Disabled styles */
    [aria-disabled="true"] {
      pointer-events: none;
      opacity: 0.5;
    }

    /* Ellipsis dropdown positioning */
    .absolute {
      position: absolute;
      top: 100%;
      left: 0;
      margin-top: 0.25rem;
    }
  `]
})
export class BreadcrumbComponent {
  // Signal inputs (fully zoneless)
  readonly items = input<BreadcrumbItem[]>([]);
  readonly variant = input<'default' | 'ghost'>('default');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly separator = input<any>(null);
  readonly maxItems = input<number>(0);
  readonly showEllipsis = input<boolean>(true);
  readonly ellipsisDropdown = input<boolean>(false);
  readonly id = input<string>();
  readonly class = input<string>();
  readonly dataTestid = input<string>();
  readonly ariaLabel = input<string>();

  // Signal outputs (fully zoneless)
  readonly itemSelected = output<BreadcrumbItem>();
  readonly itemClicked = output<{ item: BreadcrumbItem; event?: Event }>();

  // Icons
  ChevronRightIcon = signal<any>(null);
  SlashIcon = signal<any>(null);
  MoreHorizontalIcon = signal<any>(null);

  // Internal state
  private _showEllipsisMenu = signal(false);

  constructor() {
    // Dynamic import for icons
    import('lucide-angular').then(({ ChevronRight, Slash, MoreHorizontal }) => {
      this.ChevronRightIcon.set(ChevronRight);
      this.SlashIcon.set(Slash);
      this.MoreHorizontalIcon.set(MoreHorizontal);
    });
  }

  /**
   * Container classes
   */
  readonly containerClasses = computed(() => {
    return cn(
      breadcrumbVariants({
        variant: this.variant(),
        size: this.size(),
      }),
      this.class()
    );
  });

  /**
   * Item classes
   */
  itemClasses(item: BreadcrumbItem): string {
    return cn(
      breadcrumbItemVariants({
        current: item.current,
        clickable: !!(item.href || item.onClick) && !item.disabled && !item.current,
        disabled: item.disabled,
      })
    );
  }

  /**
   * Ellipsis item classes
   */
  ellipsisItemClasses(item: BreadcrumbItem): string {
    return cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
      item.disabled && "pointer-events-none opacity-50"
    );
  }

  /**
   * Separator classes
   */
  readonly separatorClasses = computed(() => {
    return cn(
      breadcrumbSeparatorVariants({
        size: this.size(),
      })
    );
  });

  /**
   * Get the current separator icon
   */
  readonly currentSeparator = computed(() => {
    return this.separator() || this.ChevronRightIcon();
  });

  /**
   * Items to display with ellipsis handling
   */
  readonly displayItems = computed(() => {
    const items = this.items();
    const maxItems = this.maxItems();

    if (maxItems <= 0 || items.length <= maxItems) {
      return items;
    }

    if (!this.showEllipsis()) {
      return items.slice(0, maxItems);
    }

    // Show first item, ellipsis, and last few items
    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 2));
    
    return [
      firstItem,
      { id: 'ellipsis', label: '...', current: false },
      ...lastItems
    ];
  });

  /**
   * Collapsed items (for ellipsis dropdown)
   */
  readonly collapsedItems = computed(() => {
    const items = this.items();
    const maxItems = this.maxItems();

    if (maxItems <= 0 || items.length <= maxItems) {
      return [];
    }

    // Return the middle items that are collapsed
    return items.slice(1, items.length - (maxItems - 2));
  });

  /**
   * Select a breadcrumb item
   */
  selectBreadcrumb(item: BreadcrumbItem, event?: Event): void {
    if (item.disabled || item.current) {
      event?.preventDefault();
      return;
    }

    // If it's a link navigation, let it proceed naturally
    if (item.href && !event?.defaultPrevented) {
      // Don't prevent default for link navigation
    } else {
      event?.preventDefault();
    }

    // Execute custom click handler
    if (item.onClick) {
      item.onClick();
    }

    // Emit events
    this.itemSelected.emit(item);
    this.itemClicked.emit({ item, event });

    // Close ellipsis menu if open
    if (this._showEllipsisMenu()) {
      this._showEllipsisMenu.set(false);
    }
  }

  /**
   * Toggle ellipsis menu
   */
  toggleEllipsis(): void {
    this._showEllipsisMenu.update(value => !value);
  }

  /**
   * Close ellipsis menu
   */
  closeEllipsis(): void {
    this._showEllipsisMenu.set(false);
  }

  /**
   * Get breadcrumb item by ID
   */
  getItem(itemId: string): BreadcrumbItem | undefined {
    return this.items().find(item => item.id === itemId);
  }

  /**
   * Get current breadcrumb item
   */
  getCurrentItem(): BreadcrumbItem | undefined {
    return this.items().find(item => item.current);
  }

  // Expose signals for template
  showEllipsisMenu(): boolean {
    return this._showEllipsisMenu();
  }
}