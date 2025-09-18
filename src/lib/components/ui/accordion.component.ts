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
  TemplateRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { cva, type VariantProps, cn } from '../../utils/cn';

/**
 * Accordion item interface
 */
export interface AccordionItem {
  /** Unique identifier for the accordion item */
  id: string;
  /** Accordion header title */
  title: string;
  /** Accordion content */
  content?: string;
  /** Icon for the accordion header */
  icon?: any;
  /** Disabled state */
  disabled?: boolean;
  /** Header template ref */
  headerTemplate?: TemplateRef<any>;
  /** Content template ref */
  contentTemplate?: TemplateRef<any>;
  /** Initial expanded state */
  expanded?: boolean;
}

/**
 * Accordion variant configuration
 */
export const accordionVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "border border-border rounded-md",
        ghost: "",
        separated: "space-y-2",
      },
      size: {
        sm: "text-sm",
        md: "text-base", 
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Accordion item variant configuration
 */
export const accordionItemVariants = cva(
  "border-b border-border last:border-b-0",
  {
    variants: {
      variant: {
        default: "",
        ghost: "border-b border-border",
        separated: "border border-border rounded-md bg-card",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Accordion trigger variant configuration
 */
export const accordionTriggerVariants = cva(
  "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
  {
    variants: {
      variant: {
        default: "px-4",
        ghost: "px-0",
        separated: "px-4",
      },
      size: {
        sm: "py-3 text-sm",
        md: "py-4 text-base",
        lg: "py-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Accordion content variant configuration
 */
export const accordionContentVariants = cva(
  "overflow-hidden text-sm transition-all",
  {
    variants: {
      variant: {
        default: "px-4",
        ghost: "px-0",
        separated: "px-4",
      },
      state: {
        open: "animate-accordion-down",
        closed: "animate-accordion-up",
      },
    },
    defaultVariants: {
      variant: "default",
      state: "closed",
    },
  }
);

/**
 * Accordion component following shadcn/ui design patterns
 * Supports single/multiple expansion, animations, and accessibility
 * 
 * @example
 * ```html
 * <!-- Basic accordion -->
 * <lib-accordion [items]="accordionItems"></lib-accordion>
 * 
 * <!-- Multiple selection -->
 * <lib-accordion 
 *   [items]="accordionItems" 
 *   [multiple]="true">
 * </lib-accordion>
 * 
 * <!-- Ghost variant -->
 * <lib-accordion 
 *   [items]="accordionItems" 
 *   variant="ghost"
 *   [collapsible]="true">
 * </lib-accordion>
 * ```
 */
@Component({
  selector: 'lib-accordion',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div [class]="containerClasses()" [attr.data-testid]="dataTestid">
      @for (item of items(); track item.id) {
        <div [class]="itemClasses()">
          <!-- Accordion Header/Trigger -->
          <h3>
            <button
              [class]="triggerClasses()"
              [attr.data-state]="isExpanded(item.id) ? 'open' : 'closed'"
              [attr.aria-expanded]="isExpanded(item.id)"
              [attr.aria-controls]="'content-' + item.id"
              [attr.id]="'trigger-' + item.id"
              [disabled]="item.disabled"
              type="button"
              (click)="toggle(item.id)"
              (keydown)="handleKeyDown($event, item.id)"
            >
              <!-- Icon -->
              @if (item.icon) {
                <lucide-angular [img]="item.icon" class="h-4 w-4 mr-2"></lucide-angular>
              }
              
              <!-- Custom header template -->
              @if (item.headerTemplate) {
                <ng-container [ngTemplateOutlet]="item.headerTemplate" [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
              }
              <!-- Default title -->
              @else {
                <span class="text-left flex-1">{{ item.title }}</span>
              }
              
              <!-- Chevron Icon -->
              <lucide-angular
                [img]="ChevronDownIcon()"
                class="h-4 w-4 shrink-0 transition-transform duration-200"
              ></lucide-angular>
            </button>
          </h3>
          
          <!-- Accordion Content -->
          <div
            [attr.id]="'content-' + item.id"
            [attr.aria-labelledby]="'trigger-' + item.id"
            role="region"
            [class]="contentClasses(item.id)"
            [attr.data-state]="isExpanded(item.id) ? 'open' : 'closed'"
            [style.display]="isExpanded(item.id) ? 'block' : 'none'"
          >
            <div [class]="contentInnerClasses()">
              <!-- Custom content template -->
              @if (item.contentTemplate) {
                <ng-container [ngTemplateOutlet]="item.contentTemplate" [ngTemplateOutletContext]="{ $implicit: item }"></ng-container>
              }
              <!-- String content -->
              @else if (item.content) {
                <div [innerHTML]="item.content"></div>
              }
              <!-- Slot content -->
              @else {
                <ng-content [select]="'[slot=' + item.id + ']'"></ng-content>
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

    /* Accordion animations */
    @keyframes accordion-down {
      from {
        height: 0;
        opacity: 0;
      }
      to {
        height: var(--accordion-content-height);
        opacity: 1;
      }
    }

    @keyframes accordion-up {
      from {
        height: var(--accordion-content-height);
        opacity: 1;
      }
      to {
        height: 0;
        opacity: 0;
      }
    }

    .animate-accordion-down {
      animation: accordion-down 0.2s ease-out;
    }

    .animate-accordion-up {
      animation: accordion-up 0.2s ease-out;
    }

    /* Smooth transitions */
    [data-state="open"] [role="region"] {
      transition: all 0.2s ease-out;
    }

    [data-state="closed"] [role="region"] {
      transition: all 0.2s ease-out;
    }

    /* Chevron rotation */
    button[data-state="open"] svg:last-child {
      transform: rotate(180deg);
    }

    /* Focus styles */
    button:focus-visible {
      outline: 2px solid var(--ring);
      outline-offset: 2px;
    }

    /* Disabled state */
    button[disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }

    button[disabled]:hover {
      text-decoration: none;
    }

    /* Hover effects */
    button:not([disabled]):hover {
      color: var(--foreground);
    }
  `]
})
export class AccordionComponent implements OnInit {
  // Modern signal inputs
  readonly items = input<AccordionItem[]>([]);
  readonly variant = input<'default' | 'ghost' | 'separated'>('default');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly multiple = input<boolean>(false);
  readonly collapsible = input<boolean>(true);
  readonly disabled = input<boolean>(false);

  // Traditional inputs
  @Input() id?: string;
  @Input() class?: string;
  @Input() dataTestid?: string;
  @Input() ariaLabel?: string;

  // Modern signal outputs
  readonly itemToggled = output<{ id: string; expanded: boolean }>();
  readonly expandedChanged = output<string[]>();

  // Icons
  ChevronDownIcon = signal<any>(null);

  // Internal state
  private expandedItems = signal<Set<string>>(new Set());

  constructor() {
    // Dynamic import for chevron icon
    import('lucide-angular').then(({ ChevronDown }) => {
      this.ChevronDownIcon.set(ChevronDown);
    });
  }

  ngOnInit(): void {
    // Initialize expanded items based on item configuration
    const initialExpanded = this.items()
      .filter(item => item.expanded && !item.disabled)
      .map(item => item.id);
    
    if (initialExpanded.length > 0) {
      if (this.multiple()) {
        this.expandedItems.set(new Set(initialExpanded));
      } else {
        // Only expand the first item if multiple is false
        this.expandedItems.set(new Set([initialExpanded[0]]));
      }
    }
  }

  /**
   * Container classes
   */
  readonly containerClasses = computed(() => {
    return cn(
      accordionVariants({
        variant: this.variant(),
        size: this.size(),
      }),
      this.class
    );
  });

  /**
   * Item classes
   */
  readonly itemClasses = computed(() => {
    return cn(
      accordionItemVariants({
        variant: this.variant(),
      })
    );
  });

  /**
   * Trigger classes
   */
  readonly triggerClasses = computed(() => {
    return cn(
      accordionTriggerVariants({
        variant: this.variant(),
        size: this.size(),
      })
    );
  });

  /**
   * Content classes
   */
  contentClasses(itemId: string): string {
    return cn(
      accordionContentVariants({
        variant: this.variant(),
        state: this.isExpanded(itemId) ? 'open' : 'closed',
      })
    );
  }

  /**
   * Content inner classes
   */
  readonly contentInnerClasses = computed(() => {
    const sizeClasses = {
      sm: "pb-3",
      md: "pb-4",
      lg: "pb-5",
    };
    return sizeClasses[this.size()];
  });

  /**
   * Check if an item is expanded
   */
  isExpanded(itemId: string): boolean {
    return this.expandedItems().has(itemId);
  }

  /**
   * Toggle an accordion item
   */
  toggle(itemId: string): void {
    const item = this.items().find(i => i.id === itemId);
    if (!item || item.disabled || this.disabled()) {
      return;
    }

    const currentExpanded = new Set(this.expandedItems());
    const isCurrentlyExpanded = currentExpanded.has(itemId);

    if (this.multiple()) {
      // Multiple mode: toggle individual items
      if (isCurrentlyExpanded) {
        currentExpanded.delete(itemId);
      } else {
        currentExpanded.add(itemId);
      }
    } else {
      // Single mode: only one item can be expanded
      if (isCurrentlyExpanded && this.collapsible()) {
        // Collapse if collapsible is true
        currentExpanded.clear();
      } else {
        // Expand this item and collapse others
        currentExpanded.clear();
        currentExpanded.add(itemId);
      }
    }

    this.expandedItems.set(currentExpanded);
    
    // Emit events
    this.itemToggled.emit({ 
      id: itemId, 
      expanded: currentExpanded.has(itemId) 
    });
    this.expandedChanged.emit(Array.from(currentExpanded));
  }

  /**
   * Expand an item
   */
  expand(itemId: string): void {
    if (!this.isExpanded(itemId)) {
      this.toggle(itemId);
    }
  }

  /**
   * Collapse an item
   */
  collapse(itemId: string): void {
    if (this.isExpanded(itemId)) {
      this.toggle(itemId);
    }
  }

  /**
   * Expand all items (only in multiple mode)
   */
  expandAll(): void {
    if (!this.multiple()) return;

    const allIds = this.items()
      .filter(item => !item.disabled)
      .map(item => item.id);
    
    this.expandedItems.set(new Set(allIds));
    this.expandedChanged.emit(allIds);
  }

  /**
   * Collapse all items
   */
  collapseAll(): void {
    this.expandedItems.set(new Set());
    this.expandedChanged.emit([]);
  }

  /**
   * Handle keyboard navigation
   */
  handleKeyDown(event: KeyboardEvent, itemId: string): void {
    const items = this.items().filter(item => !item.disabled);
    const currentIndex = items.findIndex(item => item.id === itemId);
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        newIndex = (currentIndex + 1) % items.length;
        break;
      
      case 'ArrowUp':
        event.preventDefault();
        newIndex = (currentIndex - 1 + items.length) % items.length;
        break;
      
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      
      case 'End':
        event.preventDefault();
        newIndex = items.length - 1;
        break;
      
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggle(itemId);
        return;
      
      default:
        return;
    }

    // Focus the new item
    if (newIndex !== currentIndex && items[newIndex]) {
      setTimeout(() => {
        const triggerElement = document.getElementById(`trigger-${items[newIndex].id}`);
        triggerElement?.focus();
      });
    }
  }

  /**
   * Get item by ID
   */
  getItem(itemId: string): AccordionItem | undefined {
    return this.items().find(item => item.id === itemId);
  }

  /**
   * Get all expanded item IDs
   */
  getExpandedItems(): string[] {
    return Array.from(this.expandedItems());
  }
}