import { Component, input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { avatarVariants } from './avatar.variants';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (src() && !imageError()) {
      <img 
        [src]="src()" 
        [alt]="alt()" 
        class="aspect-square h-full w-full object-cover"
        (error)="onImageError()"
        (load)="onImageLoad()"
      />
    } @else {
      <div class="flex h-full w-full items-center justify-center bg-muted text-sm font-medium text-muted-foreground">
        {{ fallback() }}
      </div>
    }
  `,
  host: {
    '[class]': 'class()',
  },
})
export class AvatarComponent {
  src = input<string>();
  alt = input<string>('');
  size = input<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  fallback = input<string>('??');
  class = input<string>();

  imageError = signal<boolean>(false);

  computedClass = computed(() => avatarVariants({ size: this.size() }));

  onImageError(): void {
    this.imageError.set(true);
  }

  onImageLoad(): void {
    this.imageError.set(false);
  }
}