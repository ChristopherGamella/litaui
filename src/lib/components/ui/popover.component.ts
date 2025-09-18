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
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps, cn } from '../../utils/cn';

/**
 * Popover placement options
 */
export type PopoverPlacement = 
  | 'top' 
  | 'top-start' 
  | 'top-end'
  | 'right' 
  | 'right-start' 
  | 'right-end'
  | 'bottom' 
  | 'bottom-start' 
  | 'bottom-end'
  | 'left' 
  | 'left-start' 
  | 'left-end';

/**
 * Popover content variant configuration
 */
export const popoverContentVariants = cva(
  "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none",
  {
    variants: {
      animate: {
        true: "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        false: "",
      },
    },
    defaultVariants: {
      animate: true,
    },
  }
);

/**
 * Popover component following shadcn/ui design patterns
 * Provides a floating content area that can be triggered by user interaction
 * 
 * @example
 * ```html
 * <!-- Basic popover -->
 * <lib-popover>
 *   <lib-button>Open Popover</lib-button>
 *   <ng-template #popoverContent>
 *     <div class="grid gap-4">
 *       <h4 class="font-medium leading-none">Dimensions</h4>
 *       <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
 *     </div>
 *   </ng-template>
 * </lib-popover>
 * 
 * <!-- With custom placement -->
 * <lib-popover placement="top-start" [sideOffset]="8">
 *   <button class="custom-trigger">Custom Trigger</button>
 *   <ng-template #popoverContent>
 *     <p>Popover content here</p>
 *   </ng-template>
 * </lib-popover>
 * 
 * <!-- Controlled popover -->
 * <lib-popover [open]="isPopoverOpen" (openChange)="onPopoverToggle($event)">
 *   <lib-button>Controlled Popover</lib-button>
 *   <ng-template #popoverContent>
 *     <p>This is a controlled popover</p>
 *   </ng-template>
 * </lib-popover>
 * ```
 */
@Component({
  selector: 'lib-popover',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative inline-block" #popoverContainer>
      <!-- Trigger -->
      <div 
        #trigger
        (click)="toggle()"
        (keydown)="handleTriggerKeyDown($event)"
        [attr.aria-expanded]="isOpen()"
        [attr.aria-haspopup]="true"
        [attr.aria-controls]="isOpen() ? 'popover-content-' + popoverId : null"
        [attr.aria-describedby]="isOpen() ? 'popover-content-' + popoverId : null"
        role="button"
        [attr.tabindex]="triggerTabIndex()"
        class="inline-flex cursor-pointer"
      >
        <ng-content></ng-content>
      </div>

      <!-- Popover Content -->
      @if (isOpen()) {
        <div
          #popoverContent
          [id]="'popover-content-' + popoverId"
          role="dialog"
          [attr.aria-modal]="modal()"
          [attr.aria-labelledby]="ariaLabelledBy()"
          [attr.aria-describedby]="ariaDescribedBy()"
          [attr.data-state]="isOpen() ? 'open' : 'closed'"
          [attr.data-side]="currentSide()"
          [class]="contentClasses()"
          [style]="contentStyles()"
          (keydown)="handleContentKeyDown($event)"
          (click)="handleContentClick($event)"
        >
          <ng-container [ngTemplateOutlet]="contentTemplate()"></ng-container>
        </div>
      }

      <!-- Backdrop for modal behavior -->
      @if (isOpen() && modal()) {
        <div 
          class="fixed inset-0 z-40 bg-transparent"
          (click)="handleBackdropClick()"
        ></div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
    }

    /* Animation classes for smooth transitions */
    [data-state="open"] {
      animation-duration: 200ms;
      animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
      animation-fill-mode: forwards;
    }

    [data-state="closed"] {
      animation-duration: 150ms;
      animation-timing-function: ease-in;
      animation-fill-mode: forwards;
    }

    /* Position-specific animations */
    @keyframes slideInFromTop {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideInFromBottom {
      from { opacity: 0; transform: translateY(4px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideInFromLeft {
      from { opacity: 0; transform: translateX(-4px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes slideInFromRight {
      from { opacity: 0; transform: translateX(4px); }
      to { opacity: 1; transform: translateX(0); }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes zoomIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }

    [data-side="top"].animate-in {
      animation-name: slideInFromTop, fadeIn, zoomIn;
    }

    [data-side="bottom"].animate-in {
      animation-name: slideInFromBottom, fadeIn, zoomIn;
    }

    [data-side="left"].animate-in {
      animation-name: slideInFromLeft, fadeIn, zoomIn;
    }

    [data-side="right"].animate-in {
      animation-name: slideInFromRight, fadeIn, zoomIn;
    }

    /* Focus styles */
    [role="button"]:focus {
      outline: 2px solid var(--ring);
      outline-offset: 2px;
      border-radius: 0.125rem;
    }

    [role="dialog"]:focus {
      outline: none;
    }

    /* Make sure popover content appears above other elements */
    [role="dialog"] {
      position: absolute;
      z-index: 50;
    }
  `]
})
export class PopoverComponent implements OnInit, OnDestroy, AfterViewInit {
  // Signal inputs
  readonly isOpenControlled = input<boolean>();
  readonly placement = input<PopoverPlacement>('bottom');
  readonly sideOffset = input<number>(4);
  readonly alignOffset = input<number>(0);
  readonly modal = input<boolean>(false);
  readonly closeOnEscape = input<boolean>(true);
  readonly closeOnClickOutside = input<boolean>(true);
  readonly closeOnFocusOutside = input<boolean>(true);
  readonly animate = input<boolean>(true);
  readonly disabled = input<boolean>(false);
  readonly contentTemplate = input<TemplateRef<any>>();
  readonly triggerTabIndex = input<number>(0);
  readonly class = input<string>();
  readonly id = input<string>();
  readonly ariaLabel = input<string>();
  readonly ariaLabelledBy = input<string>();
  readonly ariaDescribedBy = input<string>();

  // Signal outputs
  readonly openChange = output<boolean>();
  readonly focusOutside = output<FocusEvent>();
  readonly escapeKeyDown = output<KeyboardEvent>();
  readonly pointerDownOutside = output<PointerEvent>();

  // ViewChild references
  @ViewChild('trigger', { static: true }) triggerRef!: ElementRef<HTMLElement>;
  @ViewChild('popoverContent') popoverContentRef?: ElementRef<HTMLElement>;
  @ViewChild('popoverContainer', { static: true }) containerRef!: ElementRef<HTMLElement>;

  // Internal state
  private _isOpen = signal(false);
  private _currentSide = signal<string>('bottom');
  private _contentStyles = signal<Record<string, string>>({});
  
  // Unique identifier for this popover
  readonly popoverId = Math.random().toString(36).substr(2, 9);

  // Computed properties
  readonly isOpen = computed(() => {
    const controlled = this.isOpenControlled();
    return controlled !== undefined ? controlled : this._isOpen();
  });

  readonly currentSide = computed(() => this._currentSide());

  readonly contentStyles = computed(() => {
    const styles = this._contentStyles();
    return Object.entries(styles)
      .map(([key, value]) => `${key}: ${value}`)
      .join('; ');
  });

  readonly contentClasses = computed(() => {
    return cn(
      popoverContentVariants({
        animate: this.animate(),
      }),
      this.class()
    );
  });

  constructor() {}

  ngOnInit(): void {
    // Set up initial state
    this.updateOpenState(this.isOpen());
  }

  ngAfterViewInit(): void {
    // Calculate initial position if open
    if (this.isOpen()) {
      setTimeout(() => this.calculatePosition(), 0);
    }
  }

  ngOnDestroy(): void {
    // Cleanup any active listeners
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('focusin', this.handleDocumentFocusIn);
  }

  /**
   * Toggle popover open/close state
   */
  toggle(): void {
    if (this.disabled()) return;
    
    const newState = !this.isOpen();
    this.updateOpenState(newState);
  }

  /**
   * Open the popover
   */
  openPopover(): void {
    if (this.disabled()) return;
    this.updateOpenState(true);
  }

  /**
   * Close the popover
   */
  close(): void {
    this.updateOpenState(false);
  }

  /**
   * Handle trigger keyboard navigation
   */
  handleTriggerKeyDown(event: KeyboardEvent): void {
    if (this.disabled()) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.toggle();
        break;
      case 'Escape':
        if (this.isOpen()) {
          event.preventDefault();
          this.close();
        }
        break;
    }
  }

  /**
   * Handle content keyboard navigation
   */
  handleContentKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        if (this.closeOnEscape()) {
          event.preventDefault();
          this.escapeKeyDown.emit(event);
          this.close();
          // Focus back to trigger
          this.triggerRef.nativeElement.focus();
        }
        break;
      case 'Tab':
        // Handle focus trapping if modal
        if (this.modal()) {
          this.handleTabKeyInModal(event);
        }
        break;
    }
  }

  /**
   * Handle content clicks (prevent propagation for modal behavior)
   */
  handleContentClick(event: MouseEvent): void {
    // Prevent clicks inside the popover from closing it
    event.stopPropagation();
  }

  /**
   * Handle backdrop clicks for modal behavior
   */
  handleBackdropClick(): void {
    if (this.closeOnClickOutside()) {
      this.close();
    }
  }

  /**
   * Handle tab key navigation in modal mode
   */
  private handleTabKeyInModal(event: KeyboardEvent): void {
    if (!this.popoverContentRef) return;

    const focusableElements = this.popoverContentRef.nativeElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (event.shiftKey) {
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }
  }

  /**
   * Update open state and handle side effects
   */
  private updateOpenState(isOpen: boolean): void {
    const wasOpen = this.isOpen();
    
    // Update internal state only if not controlled
    if (this.isOpenControlled() === undefined) {
      this._isOpen.set(isOpen);
    }

    // Emit change event
    if (wasOpen !== isOpen) {
      this.openChange.emit(isOpen);
    }

    // Handle side effects
    if (isOpen && !wasOpen) {
      this.onPopoverOpen();
    } else if (!isOpen && wasOpen) {
      this.onPopoverClose();
    }
  }

  /**
   * Handle popover opening
   */
  private onPopoverOpen(): void {
    // Calculate position
    setTimeout(() => this.calculatePosition(), 0);

    // Add document listeners
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    if (this.closeOnClickOutside()) {
      document.addEventListener('click', this.handleDocumentClick);
    }
    if (this.closeOnFocusOutside()) {
      document.addEventListener('focusin', this.handleDocumentFocusIn);
    }

    // Focus content if modal
    if (this.modal()) {
      setTimeout(() => {
        const firstFocusable = this.popoverContentRef?.nativeElement.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as HTMLElement;
        firstFocusable?.focus();
      }, 0);
    }
  }

  /**
   * Handle popover closing
   */
  private onPopoverClose(): void {
    // Remove document listeners
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
    document.removeEventListener('click', this.handleDocumentClick);
    document.removeEventListener('focusin', this.handleDocumentFocusIn);
  }

  /**
   * Handle document-level keyboard events
   */
  private handleDocumentKeyDown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape' && this.closeOnEscape()) {
      this.escapeKeyDown.emit(event);
      this.close();
    }
  };

  /**
   * Handle document-level click events
   */
  private handleDocumentClick = (event: MouseEvent): void => {
    const target = event.target as Element;
    const container = this.containerRef.nativeElement;
    
    if (!container.contains(target)) {
      this.pointerDownOutside.emit(event as any);
      this.close();
    }
  };

  /**
   * Handle document-level focus events
   */
  private handleDocumentFocusIn = (event: FocusEvent): void => {
    const target = event.target as Element;
    const container = this.containerRef.nativeElement;
    
    if (!container.contains(target)) {
      this.focusOutside.emit(event);
      if (this.closeOnFocusOutside()) {
        this.close();
      }
    }
  };

  /**
   * Calculate and set popover position
   */
  private calculatePosition(): void {
    if (!this.triggerRef || !this.popoverContentRef) return;

    const trigger = this.triggerRef.nativeElement;
    const content = this.popoverContentRef.nativeElement;
    const placement = this.placement();
    const sideOffset = this.sideOffset();
    const alignOffset = this.alignOffset();

    const triggerRect = trigger.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = 0;
    let left = 0;
    let side = placement.split('-')[0];

    // Calculate position based on placement
    switch (side) {
      case 'top':
        top = triggerRect.top - contentRect.height - sideOffset;
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
        break;
      case 'bottom':
        top = triggerRect.bottom + sideOffset;
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2;
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
        left = triggerRect.left - contentRect.width - sideOffset;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height - contentRect.height) / 2;
        left = triggerRect.right + sideOffset;
        break;
    }

    // Handle alignment for start/end variants
    if (placement.includes('-start')) {
      if (side === 'top' || side === 'bottom') {
        left = triggerRect.left + alignOffset;
      } else {
        top = triggerRect.top + alignOffset;
      }
    } else if (placement.includes('-end')) {
      if (side === 'top' || side === 'bottom') {
        left = triggerRect.right - contentRect.width - alignOffset;
      } else {
        top = triggerRect.bottom - contentRect.height - alignOffset;
      }
    }

    // Viewport collision detection and adjustment
    if (left < 0) {
      left = 8; // Minimum distance from edge
    } else if (left + contentRect.width > viewportWidth) {
      left = viewportWidth - contentRect.width - 8;
    }

    if (top < 0) {
      // Flip to bottom if there's more space
      if (triggerRect.bottom + contentRect.height + sideOffset < viewportHeight) {
        top = triggerRect.bottom + sideOffset;
        side = 'bottom';
      } else {
        top = 8;
      }
    } else if (top + contentRect.height > viewportHeight) {
      // Flip to top if there's more space
      if (triggerRect.top - contentRect.height - sideOffset > 0) {
        top = triggerRect.top - contentRect.height - sideOffset;
        side = 'top';
      } else {
        top = viewportHeight - contentRect.height - 8;
      }
    }

    // Update position and side
    this._currentSide.set(side);
    this._contentStyles.set({
      position: 'fixed',
      top: `${top}px`,
      left: `${left}px`,
      'z-index': '50'
    });
  }

  // Host listeners for window events
  @HostListener('window:resize')
  onWindowResize(): void {
    if (this.isOpen()) {
      this.calculatePosition();
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (this.isOpen()) {
      this.calculatePosition();
    }
  }
}