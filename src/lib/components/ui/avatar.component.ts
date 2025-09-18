import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cva, type VariantProps, cn } from '../../utils/cn';

/**
 * Avatar variants configuration following shadcn/ui patterns
 */
export const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        default: "h-10 w-10", 
        lg: "h-12 w-12",
        xl: "h-16 w-16",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export type AvatarVariant = VariantProps<typeof avatarVariants>;

/**
 * Avatar Component
 * 
 * Display user profile pictures with fallback to initials
 * 
 * @example
 * ```html
 * <!-- With image -->
 * <lib-avatar 
 *   src="https://github.com/shadcn.png"
 *   alt="@shadcn"
 *   fallback="CN">
 * </lib-avatar>
 * 
 * <!-- With initials only -->
 * <lib-avatar fallback="JD"></lib-avatar>
 * 
 * <!-- Different sizes -->
 * <lib-avatar size="sm" fallback="SM"></lib-avatar>
 * <lib-avatar size="lg" fallback="LG"></lib-avatar>
 * <lib-avatar size="xl" fallback="XL"></lib-avatar>
 * ```
 */
@Component({
  selector: 'lib-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="containerClasses()">
      @if (src() && !imageError()) {
        <img 
          [src]="src()"
          [alt]="alt()"
          [class]="imageClasses"
          (error)="onImageError()"
          (load)="onImageLoad()"
        />
      }
      
      @if (!src() || imageError()) {
        <div [class]="fallbackClasses">
          {{ fallback() }}
        </div>
      }
    </div>
  `,
})
export class AvatarComponent {
  // Signal inputs
  readonly size = input<'sm' | 'default' | 'lg' | 'xl'>('default');
  readonly src = input<string>();
  readonly alt = input<string>();
  readonly fallback = input<string>('??');
  readonly class = input<string>();

  // Internal state
  protected imageError = signal<boolean>(false);

  // Computed classes
  protected containerClasses = computed(() => {
    return cn(
      avatarVariants({
        size: this.size(),
      }),
      this.class()
    );
  });

  protected imageClasses = "aspect-square h-full w-full object-cover";
  protected fallbackClasses = "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground";

  protected onImageError(): void {
    this.imageError.set(true);
  }

  protected onImageLoad(): void {
    this.imageError.set(false);
  }
}