import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { cn } from '../../../utils/cn';
import { avatarVariants, type AvatarVariant } from './avatar.variants';

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
  readonly size = input<AvatarVariant['size']>('default');
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