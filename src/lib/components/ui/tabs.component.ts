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
  ContentChildren,
  QueryList,
  AfterContentInit,
  TemplateRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { cva, type VariantProps, cn } from '../../utils/cn';

/**
 * Tab item interface
 */
export interface TabItem {
  /** Unique identifier for the tab */
  id: string;
  /** Tab label */
  label: string;
  /** Tab content */
  content?: string;
  /** Icon for the tab */
  icon?: any;
  /** Disabled state */
  disabled?: boolean;
  /** Closable tab */
  closable?: boolean;
  /** Badge content */
  badge?: string | number;
  /** Tab template ref */
  template?: TemplateRef<any>;
}

/**
 * Tabs variant configuration
 */
export const tabsVariants = cva(
  "flex",
  {
    variants: {
      orientation: {
        horizontal: "flex-col",
        vertical: "flex-row",
      },
      variant: {
        default: "",
        pills: "",
        underline: "",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      variant: "default",
    },
  }
);

/**
 * Tab list variant configuration
 */
export const tabListVariants = cva(
  "flex",
  {
    variants: {
      orientation: {
        horizontal: "flex-row border-b border-border",
        vertical: "flex-col border-r border-border min-w-[200px]",
      },
      variant: {
        default: "bg-muted p-1 rounded-md",
        pills: "gap-1",
        underline: "gap-4 border-b",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Tab trigger variant configuration
 */
export const tabTriggerVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
        pills: "rounded-md hover:bg-muted data-[state=active]:bg-background data-[state=active]:shadow-sm",
        underline: "border-b-2 border-transparent rounded-none hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground",
      },
      orientation: {
        horizontal: "",
        vertical: "justify-start w-full",
      },
      size: {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
      size: "md",
    },
  }
);

/**
 * Tab content variant configuration
 */
export const tabContentVariants = cva(
  "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      orientation: {
        horizontal: "w-full",
        vertical: "flex-1 ml-4",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

/**
 * Tabs component following shadcn/ui design patterns
 * Supports horizontal/vertical orientation, different styles, icons, and accessibility
 * 
 * @example
 * ```html
 * <!-- Basic tabs -->
 * <lib-tabs [tabs]="tabItems" [(activeTab)]="selectedTab"></lib-tabs>
 * 
 * <!-- Vertical tabs with icons -->
 * <lib-tabs 
 *   [tabs]="tabItems" 
 *   orientation="vertical"
 *   variant="pills"
 *   size="lg">
 * </lib-tabs>
 * 
 * <!-- Underline style -->
 * <lib-tabs 
 *   [tabs]="tabItems" 
 *   variant="underline"
 *   [closable]="true">
 * </lib-tabs>
 * ```
 */
@Component({
  selector: 'lib-tabs',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div [class]="containerClasses()" [attr.data-orientation]="orientation()">
      <!-- Tab List -->
      <div 
        [class]="tabListClasses()"
        role="tablist"
        [attr.aria-orientation]="orientation()"
        [attr.aria-label]="ariaLabel"
      >
        @for (tab of tabs(); track tab.id) {
          <button
            [class]="tabTriggerClasses()"
            [attr.data-state]="activeTab() === tab.id ? 'active' : 'inactive'"
            [attr.data-orientation]="orientation()"
            [attr.aria-selected]="activeTab() === tab.id"
            [attr.aria-controls]="'content-' + tab.id"
            [attr.id]="'tab-' + tab.id"
            [disabled]="tab.disabled"
            role="tab"
            tabindex="0"
            (click)="selectTab(tab.id)"
            (keydown)="handleKeyDown($event, tab.id)"
          >
            <!-- Icon -->
            @if (tab.icon) {
              <lucide-angular [img]="tab.icon" class="h-4 w-4"></lucide-angular>
            }
            
            <!-- Label -->
            <span>{{ tab.label }}</span>
            
            <!-- Badge -->
            @if (tab.badge) {
              <span class="ml-1 rounded-full bg-muted-foreground px-1.5 py-0.5 text-xs text-background">
                {{ tab.badge }}
              </span>
            }
            
            <!-- Close button -->
            @if (tab.closable && closable()) {
              <button
                type="button"
                class="ml-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                (click)="closeTab($event, tab.id)"
                [attr.aria-label]="'Close ' + tab.label"
              >
                <lucide-angular [img]="XIcon" class="h-3 w-3"></lucide-angular>
              </button>
            }
          </button>
        }
      </div>
      
      <!-- Tab Content -->
      <div [class]="tabContentClasses()">
        @for (tab of tabs(); track tab.id) {
          @if (activeTab() === tab.id) {
            <div
              [attr.id]="'content-' + tab.id"
              [attr.aria-labelledby]="'tab-' + tab.id"
              role="tabpanel"
              tabindex="0"
              class="animate-in fade-in-50 duration-200"
            >
              <!-- Template content -->
              @if (tab.template) {
                <ng-container [ngTemplateOutlet]="tab.template"></ng-container>
              }
              <!-- String content -->
              @else if (tab.content) {
                <div [innerHTML]="tab.content"></div>
              }
              <!-- Default slot content -->
              @else {
                <ng-content [select]="'[slot=' + tab.id + ']'"></ng-content>
              }
            </div>
          }
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    /* Smooth transitions */
    [role="tab"] {
      transition: all 0.2s ease-in-out;
    }

    /* Focus styles */
    [role="tab"]:focus-visible {
      outline: 2px solid var(--ring);
      outline-offset: 2px;
    }

    /* Animation for content */
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .animate-in.fade-in-50 {
      animation: fade-in 0.2s ease-out;
    }

    /* Disabled state */
    [role="tab"][disabled] {
      cursor: not-allowed;
      opacity: 0.5;
    }

    /* Close button hover */
    [role="tab"] button:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  `]
})
export class TabsComponent implements OnInit {
  // Modern signal inputs
  readonly tabs = input<TabItem[]>([]);
  readonly activeTab = input<string>('');
  readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
  readonly variant = input<'default' | 'pills' | 'underline'>('default');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly closable = input<boolean>(false);
  readonly loop = input<boolean>(true);

  // Traditional inputs
  @Input() id?: string;
  @Input() class?: string;
  @Input() dataTestid?: string;
  @Input() ariaLabel?: string;

  // Modern signal outputs
  readonly activeTabChange = output<string>();
  readonly tabClosed = output<string>();
  readonly tabSelected = output<TabItem>();

  // Icons
  XIcon: any;

  // Internal state
  private focusedTabIndex = signal(0);

  constructor() {
    // Dynamic import for X icon
    import('lucide-angular').then(({ X }) => {
      this.XIcon = X;
    });
  }

  ngOnInit(): void {
    // Set initial active tab if none specified
    if (!this.activeTab() && this.tabs().length > 0) {
      const firstEnabledTab = this.tabs().find(tab => !tab.disabled);
      if (firstEnabledTab) {
        this.selectTab(firstEnabledTab.id);
      }
    }
  }

  /**
   * Container classes
   */
  readonly containerClasses = computed(() => {
    return cn(
      tabsVariants({
        orientation: this.orientation(),
        variant: this.variant(),
      }),
      this.class
    );
  });

  /**
   * Tab list classes
   */
  readonly tabListClasses = computed(() => {
    return cn(
      tabListVariants({
        orientation: this.orientation(),
        variant: this.variant(),
        size: this.size(),
      })
    );
  });

  /**
   * Tab trigger classes
   */
  readonly tabTriggerClasses = computed(() => {
    return cn(
      tabTriggerVariants({
        variant: this.variant(),
        orientation: this.orientation(),
        size: this.size(),
      })
    );
  });

  /**
   * Tab content classes
   */
  readonly tabContentClasses = computed(() => {
    return cn(
      tabContentVariants({
        orientation: this.orientation(),
      })
    );
  });

  /**
   * Select a tab
   */
  selectTab(tabId: string): void {
    const tab = this.tabs().find(t => t.id === tabId);
    if (tab && !tab.disabled) {
      this.activeTabChange.emit(tabId);
      this.tabSelected.emit(tab);
    }
  }

  /**
   * Close a tab
   */
  closeTab(event: Event, tabId: string): void {
    event.stopPropagation();
    this.tabClosed.emit(tabId);
  }

  /**
   * Handle keyboard navigation
   */
  handleKeyDown(event: KeyboardEvent, tabId: string): void {
    const tabs = this.tabs().filter(tab => !tab.disabled);
    const currentIndex = tabs.findIndex(tab => tab.id === tabId);
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        newIndex = this.loop() 
          ? (currentIndex + 1) % tabs.length
          : Math.min(currentIndex + 1, tabs.length - 1);
        break;
      
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        newIndex = this.loop()
          ? (currentIndex - 1 + tabs.length) % tabs.length
          : Math.max(currentIndex - 1, 0);
        break;
      
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      
      case 'End':
        event.preventDefault();
        newIndex = tabs.length - 1;
        break;
      
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.selectTab(tabId);
        return;
      
      default:
        return;
    }

    // Focus and select the new tab
    if (newIndex !== currentIndex && tabs[newIndex]) {
      this.selectTab(tabs[newIndex].id);
      this.focusedTabIndex.set(newIndex);
      
      // Focus the tab element
      setTimeout(() => {
        const tabElement = document.getElementById(`tab-${tabs[newIndex].id}`);
        tabElement?.focus();
      });
    }
  }

  /**
   * Get tab by ID
   */
  getTab(tabId: string): TabItem | undefined {
    return this.tabs().find(tab => tab.id === tabId);
  }

  /**
   * Check if tab is active
   */
  isTabActive(tabId: string): boolean {
    return this.activeTab() === tabId;
  }
}