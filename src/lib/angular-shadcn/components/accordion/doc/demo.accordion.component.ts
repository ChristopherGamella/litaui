import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Settings, User, CreditCard } from 'lucide-angular';
import { AccordionComponent } from '../accordion.component';
import { AccordionItem } from '../../../../types';

@Component({
  selector: 'lib-accordion-demo',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, AccordionComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-4">Default Variant</h3>
        <lib-accordion [items]="defaultItems"></lib-accordion>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Ghost Variant</h3>
        <lib-accordion [items]="defaultItems" variant="ghost"></lib-accordion>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Separated Variant</h3>
        <lib-accordion [items]="defaultItems" variant="separated"></lib-accordion>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Sizes</h3>
        <div class="space-y-4">
          <lib-accordion [items]="sizeItems" size="sm"></lib-accordion>
          <lib-accordion [items]="sizeItems" size="md"></lib-accordion>
          <lib-accordion [items]="sizeItems" size="lg"></lib-accordion>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Multiple Selection</h3>
        <lib-accordion [items]="defaultItems" [multiple]="true"></lib-accordion>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">With Icons</h3>
        <lib-accordion [items]="iconItems"></lib-accordion>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Disabled Items</h3>
        <lib-accordion [items]="disabledItems"></lib-accordion>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Interactive Controls</h3>
        <div class="flex flex-wrap gap-4 mb-4">
          <button
            class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            (click)="expandAll()"
          >
            Expand All
          </button>
          <button
            class="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80"
            (click)="collapseAll()"
          >
            Collapse All
          </button>
          <button
            class="px-4 py-2 bg-outline border border-input rounded-md hover:bg-accent"
            (click)="toggleMultiple()"
          >
            Toggle Multiple: {{ multipleMode() }}
          </button>
        </div>
        <lib-accordion
          #interactiveAccordion
          [items]="defaultItems"
          [multiple]="multipleMode()"
        ></lib-accordion>
      </div>
    </div>
  `,
})
export class AccordionDemoComponent {
  readonly Settings = Settings;
  readonly User = User;
  readonly CreditCard = CreditCard;

  multipleMode = signal(false);

  defaultItems: AccordionItem[] = [
    {
      id: 'item-1',
      title: 'Is it accessible?',
      content: 'Yes. It adheres to the WAI-ARIA design pattern.'
    },
    {
      id: 'item-2',
      title: 'Is it styled?',
      content: 'Yes. It comes with default styles that match the other components\' aesthetic.'
    },
    {
      id: 'item-3',
      title: 'Can it be customized?',
      content: 'Yes. You can customize the appearance and behavior using variants and props.'
    }
  ];

  sizeItems: AccordionItem[] = [
    {
      id: 'size-1',
      title: 'Small Size',
      content: 'This accordion uses small size variant.'
    },
    {
      id: 'size-2',
      title: 'Medium Size',
      content: 'This accordion uses medium size variant.'
    },
    {
      id: 'size-3',
      title: 'Large Size',
      content: 'This accordion uses large size variant.'
    }
  ];

  iconItems: AccordionItem[] = [
    {
      id: 'icon-1',
      title: 'Settings',
      content: 'Configure your preferences and options.',
      icon: this.Settings
    },
    {
      id: 'icon-2',
      title: 'User Profile',
      content: 'Manage your account and personal information.',
      icon: this.User
    },
    {
      id: 'icon-3',
      title: 'Payment Methods',
      content: 'Add or update your payment information.',
      icon: this.CreditCard
    }
  ];

  disabledItems: AccordionItem[] = [
    {
      id: 'enabled-1',
      title: 'Enabled Item',
      content: 'This item can be expanded.'
    },
    {
      id: 'disabled-1',
      title: 'Disabled Item',
      content: 'This item is disabled and cannot be expanded.',
      disabled: true
    },
    {
      id: 'enabled-2',
      title: 'Another Enabled Item',
      content: 'This item can also be expanded.'
    }
  ];

  expandAll() {
    // Note: This would require a reference to the accordion component
    // For demo purposes, we'll just show the concept
    console.log('Expand all clicked');
  }

  collapseAll() {
    console.log('Collapse all clicked');
  }

  toggleMultiple() {
    this.multipleMode.update(current => !current);
  }
}