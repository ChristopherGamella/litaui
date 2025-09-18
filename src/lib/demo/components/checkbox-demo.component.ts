import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { CheckboxComponent } from '../../../lib/components/ui/checkbox.component';
import { ButtonComponent } from '../../../lib/components/ui/button.component';
import { CardComponent } from '../../../lib/components/ui/card.component';

/**
 * Comprehensive Checkbox Demo Component
 * 
 * Demonstrates all checkbox features including:
 * - Basic usage with two-way binding
 * - Reactive forms integration
 * - Different sizes
 * - Indeterminate state
 * - Disabled states
 * - Accessibility features
 * - Custom styling
 */
@Component({
  selector: 'app-checkbox-demo',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    CheckboxComponent,
    ButtonComponent,
    CardComponent
  ],
  template: `
    <div class="p-6 space-y-8 max-w-4xl mx-auto">
      <header class="text-center">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Checkbox Component Demo</h1>
        <p class="text-gray-600">Comprehensive showcase of the Angular checkbox component</p>
      </header>

      <!-- Basic Usage -->
      <lib-card>
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-4">Basic Usage</h2>
          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <lib-checkbox 
                id="terms" 
                [(checked)]="basicChecked">
              </lib-checkbox>
              <label 
                for="terms" 
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Accept terms and conditions
              </label>
            </div>
            
            <div class="flex items-center space-x-2">
              <lib-checkbox 
                id="newsletter" 
                [(checked)]="newsletterChecked">
              </lib-checkbox>
              <label 
                for="newsletter" 
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Subscribe to newsletter
              </label>
            </div>
            
            <div class="flex items-center space-x-2">
              <lib-checkbox 
                id="marketing" 
                [(checked)]="marketingChecked">
              </lib-checkbox>
              <label 
                for="marketing" 
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Receive marketing emails
              </label>
            </div>
            
            <div class="mt-4 p-3 bg-gray-50 rounded">
              <strong>State:</strong> 
              Terms: {{ basicChecked() ? 'checked' : 'unchecked' }}, 
              Newsletter: {{ newsletterChecked() ? 'checked' : 'unchecked' }}, 
              Marketing: {{ marketingChecked() ? 'checked' : 'unchecked' }}
            </div>
          </div>
        </div>
      </lib-card>

      <!-- Different Sizes -->
      <lib-card>
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-4">Different Sizes</h2>
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <lib-checkbox 
                id="small" 
                size="sm" 
                [(checked)]="smallChecked">
              </lib-checkbox>
              <label for="small" class="text-xs">Small checkbox</label>
            </div>
            
            <div class="flex items-center space-x-2">
              <lib-checkbox 
                id="default" 
                size="default" 
                [(checked)]="defaultChecked">
              </lib-checkbox>
              <label for="default" class="text-sm">Default checkbox</label>
            </div>
            
            <div class="flex items-center space-x-2">
              <lib-checkbox 
                id="large" 
                size="lg" 
                [(checked)]="largeChecked">
              </lib-checkbox>
              <label for="large" class="text-base">Large checkbox</label>
            </div>
          </div>
        </div>
      </lib-card>

      <!-- Indeterminate State -->
      <lib-card>
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-4">Indeterminate State</h2>
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <lib-checkbox 
                id="parent" 
                [checked]="parentChecked()" 
                [indeterminate]="parentIndeterminate()"
                (checkedChange)="onParentChange($event)">
              </lib-checkbox>
              <label for="parent" class="text-sm font-medium">
                Select all items ({{ checkedCount() }}/{{ totalItems() }})
              </label>
            </div>
            
            <div class="ml-6 space-y-2">
              @for (item of items(); track item.id) {
                <div class="flex items-center space-x-2">
                  <lib-checkbox 
                    [id]="'item-' + item.id" 
                    [checked]="item.checked" 
                    (checkedChange)="onItemChange(item.id, $event)">
                  </lib-checkbox>
                  <label [for]="'item-' + item.id" class="text-sm">{{ item.name }}</label>
                </div>
              }
            </div>
            
            <div class="mt-4 p-3 bg-gray-50 rounded">
              <strong>Selected items:</strong> {{ selectedItems().join(', ') || 'None' }}
            </div>
          </div>
        </div>
      </lib-card>

      <!-- Reactive Forms -->
      <lib-card>
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-4">Reactive Forms Integration</h2>
          <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <lib-checkbox 
                  id="agree" 
                  formControlName="agree">
                </lib-checkbox>
                <label for="agree" class="text-sm font-medium">I agree to the terms of service</label>
              </div>
              
              <div class="flex items-center space-x-2">
                <lib-checkbox 
                  id="subscribe" 
                  formControlName="subscribe">
                </lib-checkbox>
                <label for="subscribe" class="text-sm font-medium">Subscribe to updates</label>
              </div>
              
              <div class="flex items-center space-x-2">
                <lib-checkbox 
                  id="notifications" 
                  formControlName="notifications">
                </lib-checkbox>
                <label for="notifications" class="text-sm font-medium">Enable notifications</label>
              </div>
            </div>
            
            <div class="flex space-x-2">
              <lib-button type="submit" [disabled]="form.invalid">
                Submit Form
              </lib-button>
              <lib-button type="button" variant="outline" (click)="resetForm()">
                Reset
              </lib-button>
            </div>
            
            <div class="mt-4 p-3 bg-gray-50 rounded">
              <strong>Form Value:</strong> {{ form.value | json }}
              <br>
              <strong>Form Valid:</strong> {{ form.valid }}
            </div>
          </form>
        </div>
      </lib-card>

      <!-- Disabled States -->
      <lib-card>
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-4">Disabled States</h2>
          <div class="space-y-3">
            <div class="flex items-center space-x-2">
              <lib-checkbox 
                id="disabled-unchecked" 
                [disabled]="true">
              </lib-checkbox>
              <label for="disabled-unchecked" class="text-sm font-medium">Disabled unchecked</label>
            </div>
            
            <div class="flex items-center space-x-2">
              <lib-checkbox 
                id="disabled-checked" 
                [disabled]="true" 
                [checked]="true">
              </lib-checkbox>
              <label for="disabled-checked" class="text-sm font-medium">Disabled checked</label>
            </div>
            
            <div class="flex items-center space-x-2">
              <lib-checkbox 
                id="disabled-indeterminate" 
                [disabled]="true" 
                [indeterminate]="true">
              </lib-checkbox>
              <label for="disabled-indeterminate" class="text-sm font-medium">Disabled indeterminate</label>
            </div>
          </div>
        </div>
      </lib-card>

      <!-- Accessibility -->
      <lib-card>
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-4">Accessibility Features</h2>
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <lib-checkbox 
                id="aria-checkbox" 
                ariaLabel="Accept privacy policy" 
                [(checked)]="accessibilityChecked">
              </lib-checkbox>
              <label for="aria-checkbox" class="text-sm font-medium">
                Accept privacy policy (with aria-label)
              </label>
            </div>
            
            <div class="flex items-center space-x-2">
              <lib-checkbox 
                id="described-checkbox" 
                ariaDescribedBy="checkbox-description" 
                [(checked)]="describedChecked">
              </lib-checkbox>
              <div class="flex flex-col">
                <label for="described-checkbox" class="text-sm font-medium">
                  Enable two-factor authentication
                </label>
                <p id="checkbox-description" class="text-xs text-gray-500">
                  This will add an extra layer of security to your account
                </p>
              </div>
            </div>
            
            <div class="text-sm text-gray-600">
              <p><strong>Keyboard navigation:</strong></p>
              <ul class="list-disc list-inside space-y-1">
                <li>Tab to focus checkboxes</li>
                <li>Space or Enter to toggle state</li>
                <li>Screen readers announce state changes</li>
              </ul>
            </div>
          </div>
        </div>
      </lib-card>

      <!-- Custom Styling -->
      <lib-card>
        <div class="p-6">
          <h2 class="text-xl font-semibold mb-4">Custom Styling</h2>
          <div class="space-y-4">
            <div class="flex items-center space-x-2">
              <lib-checkbox 
                id="custom-1" 
                class="border-blue-500 data-[state=checked]:bg-blue-500" 
                [(checked)]="customChecked1">
              </lib-checkbox>
              <label for="custom-1" class="text-sm font-medium">Blue themed checkbox</label>
            </div>
            
            <div class="flex items-center space-x-2">
              <lib-checkbox 
                id="custom-2" 
                class="border-green-500 data-[state=checked]:bg-green-500" 
                [(checked)]="customChecked2">
              </lib-checkbox>
              <label for="custom-2" class="text-sm font-medium">Green themed checkbox</label>
            </div>
            
            <div class="flex items-center space-x-2">
              <lib-checkbox 
                id="custom-3" 
                class="border-purple-500 data-[state=checked]:bg-purple-500 h-6 w-6" 
                [(checked)]="customChecked3">
              </lib-checkbox>
              <label for="custom-3" class="text-sm font-medium">Purple larger checkbox</label>
            </div>
          </div>
        </div>
      </lib-card>

      <!-- Action Buttons -->
      <div class="flex space-x-4 justify-center">
        <lib-button (click)="toggleAll()" variant="outline">
          Toggle All Basic Checkboxes
        </lib-button>
        <lib-button (click)="resetAll()" variant="outline">
          Reset All
        </lib-button>
      </div>
    </div>
  `
})
export class CheckboxDemoComponent {
  // Basic usage signals
  readonly basicChecked = signal(false);
  readonly newsletterChecked = signal(false);
  readonly marketingChecked = signal(false);

  // Size demo signals
  readonly smallChecked = signal(false);
  readonly defaultChecked = signal(true);
  readonly largeChecked = signal(false);

  // Indeterminate demo
  readonly items = signal([
    { id: 1, name: 'Item 1', checked: false },
    { id: 2, name: 'Item 2', checked: false },
    { id: 3, name: 'Item 3', checked: false },
    { id: 4, name: 'Item 4', checked: false },
  ]);

  readonly checkedCount = signal(0);
  readonly totalItems = signal(4);
  readonly parentChecked = signal(false);
  readonly parentIndeterminate = signal(false);

  // Accessibility demos
  readonly accessibilityChecked = signal(false);
  readonly describedChecked = signal(false);

  // Custom styling demos
  readonly customChecked1 = signal(false);
  readonly customChecked2 = signal(false);
  readonly customChecked3 = signal(false);

  // Reactive form
  readonly form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      agree: [false],
      subscribe: [true],
      notifications: [false]
    });
  }

  // Computed for selected items display
  readonly selectedItems = () => {
    return this.items().filter(item => item.checked).map(item => item.name);
  };

  // Indeterminate logic
  onParentChange(checked: boolean): void {
    const newItems = this.items().map(item => ({ ...item, checked }));
    this.items.set(newItems);
    this.updateParentState();
  }

  onItemChange(itemId: number, checked: boolean): void {
    const newItems = this.items().map(item => 
      item.id === itemId ? { ...item, checked } : item
    );
    this.items.set(newItems);
    this.updateParentState();
  }

  private updateParentState(): void {
    const checkedItems = this.items().filter(item => item.checked).length;
    const total = this.items().length;
    
    this.checkedCount.set(checkedItems);
    
    if (checkedItems === 0) {
      this.parentChecked.set(false);
      this.parentIndeterminate.set(false);
    } else if (checkedItems === total) {
      this.parentChecked.set(true);
      this.parentIndeterminate.set(false);
    } else {
      this.parentChecked.set(false);
      this.parentIndeterminate.set(true);
    }
  }

  // Form methods
  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
      alert('Form submitted successfully! Check console for values.');
    }
  }

  resetForm(): void {
    this.form.reset({
      agree: false,
      subscribe: false,
      notifications: false
    });
  }

  // Utility methods
  toggleAll(): void {
    const allChecked = this.basicChecked() && this.newsletterChecked() && this.marketingChecked();
    this.basicChecked.set(!allChecked);
    this.newsletterChecked.set(!allChecked);
    this.marketingChecked.set(!allChecked);
  }

  resetAll(): void {
    // Reset basic checkboxes
    this.basicChecked.set(false);
    this.newsletterChecked.set(false);
    this.marketingChecked.set(false);

    // Reset size demos
    this.smallChecked.set(false);
    this.defaultChecked.set(false);
    this.largeChecked.set(false);

    // Reset indeterminate demo
    const resetItems = this.items().map(item => ({ ...item, checked: false }));
    this.items.set(resetItems);
    this.updateParentState();

    // Reset accessibility demos
    this.accessibilityChecked.set(false);
    this.describedChecked.set(false);

    // Reset custom styling demos
    this.customChecked1.set(false);
    this.customChecked2.set(false);
    this.customChecked3.set(false);

    // Reset form
    this.resetForm();
  }
}