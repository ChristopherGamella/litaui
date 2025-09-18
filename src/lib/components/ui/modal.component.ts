import { Component, computed, input, output, HostBinding, HostListener, ElementRef, ViewChild, AfterViewInit, OnDestroy, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { cva, type VariantProps } from '../../utils/cn';
import { ModalProps } from '../../types';

/**
 * Modal backdrop variants
 */
export const modalBackdropVariants = cva(
  "fixed inset-0 z-50 flex items-center justify-center",
  {
    variants: {
      position: {
        center: "items-center justify-center",
        top: "items-start justify-center pt-20",
        bottom: "items-end justify-center pb-20",
        left: "items-center justify-start pl-20",
        right: "items-center justify-end pr-20",
      },
    },
    defaultVariants: {
      position: "center",
    },
  }
);

/**
 * Modal content variants
 */
export const modalContentVariants = cva(
  "relative grid w-full gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
  {
    variants: {
      size: {
        xs: "max-w-xs",
        sm: "max-w-sm",
        md: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        "2xl": "max-w-2xl",
        "3xl": "max-w-3xl",
        "4xl": "max-w-4xl",
        "5xl": "max-w-5xl",
        full: "max-w-full h-full",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export type ModalBackdropVariant = VariantProps<typeof modalBackdropVariants>;
export type ModalContentVariant = VariantProps<typeof modalContentVariants>;

/**
 * Modal component following shadcn/ui design patterns
 * Integrated with your existing color system and accessibility features
 */
@Component({
  selector: 'lib-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <!-- Backdrop -->
    <div
      *ngIf="open()"
      class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      [class]="backdropClasses()"
      (click)="handleBackdropClick($event)"
      [attr.aria-hidden]="!open()"
    >
      <!-- Modal Content -->
      <div
        #modalContent
        role="dialog"
        [attr.aria-modal]="open()"
        [attr.aria-labelledby]="title() ? 'modal-title' : undefined"
        [attr.aria-describedby]="description() ? 'modal-description' : undefined"
        [attr.data-testid]="dataTestid()"
        [class]="contentClasses()"
        (keydown)="handleKeydown($event)"
        tabindex="-1"
      >
        <!-- Close Button -->
        @if (showCloseButton()) {
          <button
            class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
            (click)="closeModal()"
            [attr.aria-label]="'Close ' + (title() || 'modal')"
          >
            <lucide-angular [img]="XIcon" size="16" class="text-muted-foreground"></lucide-angular>
          </button>
        }

        <!-- Modal Header -->
        @if (title() || description()) {
          <div class="flex flex-col space-y-1.5 text-center sm:text-left">
            @if (title()) {
              <h2
                id="modal-title"
                class="text-lg font-semibold leading-none tracking-tight text-foreground"
              >
                {{ title() }}
              </h2>
            }
            @if (description()) {
              <p
                id="modal-description"
                class="text-sm text-muted-foreground"
              >
                {{ description() }}
              </p>
            }
          </div>
        }

        <!-- Modal Body -->
        <div class="flex-1 overflow-y-auto">
          <ng-content></ng-content>
        </div>

        <!-- Modal Footer -->
        <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <ng-content select="[modal-footer]"></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }

    /* Modal animations */
    .modal-enter {
      animation: modal-enter 0.2s ease-out;
    }

    .modal-exit {
      animation: modal-exit 0.2s ease-in;
    }

    @keyframes modal-enter {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes modal-exit {
      from {
        opacity: 1;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(0.95);
      }
    }

    /* Focus trap styles */
    .modal-content:focus {
      outline: none;
    }

    /* Prevent body scroll when modal is open */
    body.modal-open {
      overflow: hidden;
    }
  `]
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @ViewChild('modalContent') modalContent!: ElementRef<HTMLElement>;

  // Signal inputs
  readonly open = input<boolean>(false);
  readonly title = input<string>();
  readonly description = input<string>();
  readonly size = input<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
  readonly position = input<'center' | 'top' | 'bottom' | 'left' | 'right'>('center');
  readonly closeOnOverlayClick = input<boolean>(true);
  readonly closeOnEscape = input<boolean>(true);
  readonly showCloseButton = input<boolean>(true);
  readonly id = input<string>();
  readonly class = input<string>();
  readonly dataTestid = input<string>();

  // Signal outputs
  readonly openChange = output<boolean>();
  readonly onOpen = output<void>();
  readonly onClose = output<void>();

  // Icons
  readonly XIcon = X;

  // Focus management
  private previousFocusElement?: HTMLElement;
  private focusableElements: HTMLElement[] = [];

  constructor() {
    effect(() => {
      if (this.open()) {
        this.handleModalOpen();
      } else {
        this.handleModalClose();
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.open()) {
      this.handleModalOpen();
    }
  }

  ngOnDestroy(): void {
    this.restoreBodyScroll();
  }

  /**
   * Computed backdrop classes
   */
  readonly backdropClasses = computed(() => {
    return modalBackdropVariants({
      position: this.position(),
    } as any);
  });

  /**
   * Computed content classes
   */
  readonly contentClasses = computed(() => {
    const baseClasses = modalContentVariants({
      size: this.size(),
    } as any);

    const classes = [baseClasses];

    // Add custom class if provided
    const customClass = this.class();
    if (customClass) {
      classes.push(customClass);
    }

    // Add animation classes
    if (this.open()) {
      classes.push('modal-enter');
    }

    return classes.join(' ');
  });

  /**
   * Handle modal open state changes
   */
  @HostBinding('attr.aria-hidden')
  get ariaHidden(): boolean | null {
    return this.open() ? null : true;
  }

  /**
   * Handle modal opening
   */
  private handleModalOpen(): void {
    // Store previous focus element
    this.previousFocusElement = document.activeElement as HTMLElement;

    // Prevent body scroll
    this.preventBodyScroll();

    // Focus modal content
    setTimeout(() => {
      if (this.modalContent) {
        this.modalContent.nativeElement.focus();
        this.trapFocus();
      }
      // Change detection is automatic with signals
    }, 100);

    this.onOpen.emit();
  }

  /**
   * Handle modal closing
   */
  private handleModalClose(): void {
    // Restore body scroll
    this.restoreBodyScroll();

    // Restore previous focus
    if (this.previousFocusElement) {
      this.previousFocusElement.focus();
    }

    this.onClose.emit();
  }

  /**
   * Handle backdrop click
   */
  handleBackdropClick(event: Event): void {
    if (event.target === event.currentTarget && this.closeOnOverlayClick()) {
      this.closeModal();
    }
  }

  /**
   * Handle keyboard events
   */
  handleKeydown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Escape':
        if (this.closeOnEscape()) {
          event.preventDefault();
          this.closeModal();
        }
        break;
      case 'Tab':
        this.handleTabKey(event);
        break;
    }
  }

  /**
   * Handle tab key for focus trapping
   */
  private handleTabKey(event: KeyboardEvent): void {
    if (this.focusableElements.length === 0) return;

    const firstElement = this.focusableElements[0];
    const lastElement = this.focusableElements[this.focusableElements.length - 1];

    if (event.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    }
  }

  /**
   * Trap focus within modal
   */
  private trapFocus(): void {
    if (!this.modalContent) return;

    const modalElement = this.modalContent.nativeElement;
    this.focusableElements = Array.from(
      modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];

    // Add modal content itself if no focusable elements
    if (this.focusableElements.length === 0) {
      this.focusableElements = [modalElement];
    }
  }

  /**
   * Prevent body scroll
   */
  private preventBodyScroll(): void {
    document.body.classList.add('modal-open');
  }

  /**
   * Restore body scroll
   */
  private restoreBodyScroll(): void {
    document.body.classList.remove('modal-open');
  }

  /**
   * Close modal
   */
  closeModal(): void {
    this.openChange.emit(false);
  }

  /**
   * Open modal
   */
  openModal(): void {
    this.openChange.emit(true);
  }
}

/**
 * Modal Trigger component for opening modals
 */
@Component({
  selector: 'lib-modal-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-content
      (click)="handleTriggerClick()"
      [attr.aria-haspopup]="true"
      [attr.aria-expanded]="modal()?.open()"
    ></ng-content>
  `
})
export class ModalTriggerComponent {
  readonly modal = input<ModalComponent>();

  handleTriggerClick(): void {
    const modalInstance = this.modal();
    if (modalInstance) {
      modalInstance.openModal();
    }
  }
}

/**
 * Modal Header component
 */
@Component({
  selector: 'lib-modal-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col space-y-1.5 text-center sm:text-left">
      <ng-content></ng-content>
    </div>
  `
})
export class ModalHeaderComponent {}

/**
 * Modal Body component
 */
@Component({
  selector: 'lib-modal-body',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex-1 overflow-y-auto">
      <ng-content></ng-content>
    </div>
  `
})
export class ModalBodyComponent {}

/**
 * Modal Footer component
 */
@Component({
  selector: 'lib-modal-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
      <ng-content></ng-content>
    </div>
  `
})
export class ModalFooterComponent {}