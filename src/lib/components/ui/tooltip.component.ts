import { 
  Component, 
  Input, 
  TemplateRef, 
  ViewChild, 
  ElementRef,
  computed,
  input,
  signal,
  effect,
  OnDestroy,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule, Overlay, OverlayRef, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { cn } from '../../utils/cn';

/**
 * Tooltip Component
 * 
 * A tooltip component with positioning support using Angular CDK Overlay
 * 
 * @example
 * ```html
 * <!-- Basic tooltip -->
 * <lib-tooltip content="Add to library">
 *   <button>Hover me</button>
 * </lib-tooltip>
 * 
 * <!-- With custom positioning -->
 * <lib-tooltip 
 *   content="This is a tooltip"
 *   position="top">
 *   <span>Top tooltip</span>
 * </lib-tooltip>
 * 
 * <!-- With template content -->
 * <lib-tooltip [contentTemplate]="tooltipTemplate">
 *   <button>Rich content</button>
 * </lib-tooltip>
 * 
 * <ng-template #tooltipTemplate>
 *   <div class="flex items-center gap-2">
 *     <span>Custom content</span>
 *     <kbd class="px-1 py-0.5 text-xs bg-muted rounded">⌘K</kbd>
 *   </div>
 * </ng-template>
 * ```
 */
@Component({
  selector: 'lib-tooltip',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  template: `
    <!-- Trigger element -->
    <span 
      #trigger
      (mouseenter)="show()"
      (mouseleave)="hide()"
      (focus)="show()"
      (blur)="hide()"
      class="inline-block"
    >
      <ng-content></ng-content>
    </span>

    <!-- Tooltip content template -->
    <ng-template #tooltipTemplate>
      <div 
        [class]="tooltipClasses()"
        role="tooltip"
        [attr.aria-describedby]="ariaDescribedBy"
      >
        @if (content) {
          {{ content }}
        } @else if (contentTemplate) {
          <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
        }
      </div>
    </ng-template>
  `,
})
export class TooltipComponent implements OnDestroy {
  @ViewChild('trigger', { static: true }) triggerRef!: ElementRef;
  @ViewChild('tooltipTemplate', { static: true }) tooltipTemplateRef!: TemplateRef<any>;

  // Signal inputs
  position = input<'top' | 'bottom' | 'left' | 'right'>('top');
  
  // Traditional inputs  
  @Input() content?: string;
  @Input() contentTemplate?: TemplateRef<any>;
  @Input() disabled = false;
  @Input() showDelay = 700;
  @Input() hideDelay = 300;
  @Input() class?: string;
  @Input() ariaDescribedBy?: string;

  // Internal state
  private overlayRef?: OverlayRef;
  private showTimeout?: number;
  private hideTimeout?: number;
  private isVisible = signal(false);

  // Computed classes
  protected tooltipClasses = computed(() => {
    return cn(
      'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95',
      this.getPositionClasses(),
      this.class
    );
  });

  constructor(
    private overlay: Overlay,
    private overlayPositionBuilder: OverlayPositionBuilder
  ) {}

  ngOnDestroy(): void {
    this.hide();
    if (this.overlayRef) {
      this.overlayRef.dispose();
    }
  }

  /**
   * Show the tooltip
   */
  show(): void {
    if (this.disabled || this.isVisible()) return;

    // Clear any pending hide timeout
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }

    // Set show timeout
    this.showTimeout = window.setTimeout(() => {
      this.createOverlay();
      this.isVisible.set(true);
      // Signal change detection is automatic
    }, this.showDelay);
  }

  /**
   * Hide the tooltip
   */
  hide(): void {
    // Clear any pending show timeout
    if (this.showTimeout) {
      clearTimeout(this.showTimeout);
      this.showTimeout = undefined;
    }

    if (!this.isVisible()) return;

    // Set hide timeout
    this.hideTimeout = window.setTimeout(() => {
      if (this.overlayRef) {
        this.overlayRef.detach();
      }
      this.isVisible.set(false);
      // Signal change detection is automatic
    }, this.hideDelay);
  }

  /**
   * Create and position the overlay
   */
  private createOverlay(): void {
    if (this.overlayRef) {
      const portal = new TemplatePortal(this.tooltipTemplateRef, this.triggerRef as any);
      this.overlayRef.attach(portal);
      return;
    }

    const positionStrategy = this.overlayPositionBuilder
      .flexibleConnectedTo(this.triggerRef)
      .withPositions(this.getPositions())
      .withPush(false)
      .withFlexibleDimensions(true)
      .withViewportMargin(8);

    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy: this.overlay.scrollStrategies.close(),
      hasBackdrop: false,
    });

    const portal = new TemplatePortal(this.tooltipTemplateRef, this.triggerRef as any);
    this.overlayRef.attach(portal);
  }

  /**
   * Get position classes for animation
   */
  private getPositionClasses(): string {
    const position = this.position();
    const classes = {
      top: 'data-[side=top]:slide-in-from-bottom-2',
      bottom: 'data-[side=bottom]:slide-in-from-top-2', 
      left: 'data-[side=left]:slide-in-from-right-2',
      right: 'data-[side=right]:slide-in-from-left-2',
    };
    return classes[position] || classes.top;
  }

  /**
   * Get overlay positions based on preferred position
   */
  private getPositions() {
    const position = this.position();
    
    switch (position) {
      case 'top':
        return [
          {
            originX: 'center' as const,
            originY: 'top' as const,
            overlayX: 'center' as const,
            overlayY: 'bottom' as const,
            offsetY: -8
          },
          {
            originX: 'center' as const,
            originY: 'bottom' as const,
            overlayX: 'center' as const,
            overlayY: 'top' as const,
            offsetY: 8
          }
        ];
      case 'bottom':
        return [
          {
            originX: 'center' as const,
            originY: 'bottom' as const,
            overlayX: 'center' as const,
            overlayY: 'top' as const,
            offsetY: 8
          },
          {
            originX: 'center' as const,
            originY: 'top' as const,
            overlayX: 'center' as const,
            overlayY: 'bottom' as const,
            offsetY: -8
          }
        ];
      case 'left':
        return [
          {
            originX: 'start' as const,
            originY: 'center' as const,
            overlayX: 'end' as const,
            overlayY: 'center' as const,
            offsetX: -8
          },
          {
            originX: 'end' as const,
            originY: 'center' as const,
            overlayX: 'start' as const,
            overlayY: 'center' as const,
            offsetX: 8
          }
        ];
      case 'right':
        return [
          {
            originX: 'end' as const,
            originY: 'center' as const,
            overlayX: 'start' as const,
            overlayY: 'center' as const,
            offsetX: 8
          },
          {
            originX: 'start' as const,
            originY: 'center' as const,
            overlayX: 'end' as const,
            overlayY: 'center' as const,
            offsetX: -8
          }
        ];
      default:
        return [];
    }
  }
}