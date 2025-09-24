import { Component, input, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronRight } from 'lucide-angular';
import { breadcrumbVariants, breadcrumbItemVariants, breadcrumbSeparatorVariants } from './breadcrumb.variants';
import { cn } from '../../../utils/cn';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

@Component({
  selector: 'lib-breadcrumb',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <nav aria-label="breadcrumb">
      <ol [class]="breadcrumbClass()">
        @for (item of items(); track item.label; let isLast = $last) {
          <li [class]="itemClass()">
            @if (item.href) {
              <a [href]="item.href" class="hover:text-foreground transition-colors">
                {{ item.label }}
              </a>
            } @else {
              <span>{{ item.label }}</span>
            }
          </li>
          @if (!isLast) {
            <li [class]="separatorClass()" aria-hidden="true">
              <lucide-icon [img]="ChevronRight" class="h-4 w-4"></lucide-icon>
            </li>
          }
        }
      </ol>
    </nav>
  `,
})
export class BreadcrumbComponent {
  items = input.required<BreadcrumbItem[]>();
  size = input<'sm' | 'md' | 'lg'>('md');

  ChevronRight = ChevronRight;

  breadcrumbClass = computed(() => cn(breadcrumbVariants({ size: this.size() })));
  itemClass = computed(() => cn(breadcrumbItemVariants({ size: this.size() })));
  separatorClass = computed(() => cn(breadcrumbSeparatorVariants({ size: this.size() })));
}