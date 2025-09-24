import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X } from 'lucide-angular';
import { toastVariants, type ToastVariant } from './toast.variants';

@Component({
  selector: 'lib-toast',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div
      [class]="toastClasses()"
      role="status"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div class="grid gap-1">
        @if (title()) {
          <div class="text-sm font-semibold">
            {{ title() }}
          </div>
        }
        @if (description()) {
          <div class="text-sm opacity-90">
            {{ description() }}
          </div>
        }
      </div>
      @if (action()) {
        <div class="flex flex-col gap-2">
          <button
            (click)="actionClicked.emit()"
            class="inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive"
          >
            {{ action() }}
          </button>
        </div>
      }
      <button
        (click)="closeClicked.emit()"
        class="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600"
        aria-label="Close"
      >
        <lucide-icon [img]="XIcon" class="h-4 w-4" />
      </button>
    </div>
  `,
})
export class ToastComponent {
  readonly XIcon = X;

  variant = input<ToastVariant['variant']>('default');
  title = input<string>();
  description = input<string>();
  action = input<string>();

  actionClicked = output<void>();
  closeClicked = output<void>();

  /**
   * Computed toast classes using the variant system
   */
  protected toastClasses = computed(() => {
    return toastVariants({
      variant: this.variant(),
    });
  });
}