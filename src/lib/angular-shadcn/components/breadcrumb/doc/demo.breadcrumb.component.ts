import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from '../breadcrumb.component';

@Component({
  selector: 'lib-breadcrumb-demo',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-4">Sizes</h3>
        <div class="space-y-4">
          <lib-breadcrumb [items]="breadcrumbItems" size="sm"></lib-breadcrumb>
          <lib-breadcrumb [items]="breadcrumbItems" size="md"></lib-breadcrumb>
          <lib-breadcrumb [items]="breadcrumbItems" size="lg"></lib-breadcrumb>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">With Links</h3>
        <lib-breadcrumb [items]="linkedItems"></lib-breadcrumb>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Mixed (Some Links, Some Text)</h3>
        <lib-breadcrumb [items]="mixedItems"></lib-breadcrumb>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Single Item</h3>
        <lib-breadcrumb [items]="singleItem"></lib-breadcrumb>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Long Path</h3>
        <lib-breadcrumb [items]="longPath"></lib-breadcrumb>
      </div>
    </div>
  `,
})
export class BreadcrumbDemoComponent {
  breadcrumbItems = [
    { label: 'Home' },
    { label: 'Components' },
    { label: 'Breadcrumb' }
  ];

  linkedItems = [
    { label: 'Home', href: '/' },
    { label: 'Library', href: '/library' },
    { label: 'Components', href: '/components' },
    { label: 'Breadcrumb' }
  ];

  mixedItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Projects' },
    { label: 'My Project', href: '/projects/my-project' },
    { label: 'Settings' }
  ];

  singleItem = [
    { label: 'Home' }
  ];

  longPath = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: 'Electronics', href: '/products/electronics' },
    { label: 'Smartphones', href: '/products/electronics/smartphones' },
    { label: 'iPhone 15', href: '/products/electronics/smartphones/iphone-15' },
    { label: 'Specifications' }
  ];
}