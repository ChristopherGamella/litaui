import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from '../../../lib/components/ui/checkbox.component';

/**
 * Simple Checkbox Test Component
 * 
 * A minimal test component to verify the checkbox functionality
 */
@Component({
  selector: 'app-checkbox-test',
  standalone: true,
  imports: [CommonModule, CheckboxComponent],
  template: `
    <div class="p-8 space-y-6 max-w-2xl">
      <h1 class="text-2xl font-bold">Checkbox Test</h1>
      
      <div class="space-y-4">
        <h2 class="text-lg font-semibold">Basic Checkbox</h2>
        
        <div class="flex items-center space-x-2">
          <lib-checkbox id="test-basic" [(checked)]="isChecked"></lib-checkbox>
          <label for="test-basic" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Check me!
          </label>
        </div>
        
        <p class="text-sm">
          Current state: {{ isChecked() ? 'Checked' : 'Unchecked' }}
        </p>
      </div>
      
      <div class="space-y-4">
        <h2 class="text-lg font-semibold">Different Sizes</h2>
        
        <div class="flex items-center space-x-2">
          <lib-checkbox id="test-small" size="sm" [(checked)]="smallChecked"></lib-checkbox>
          <label for="test-small" class="text-xs">Small checkbox</label>
        </div>
        
        <div class="flex items-center space-x-2">
          <lib-checkbox id="test-default" size="default" [(checked)]="defaultChecked"></lib-checkbox>
          <label for="test-default" class="text-sm">Default checkbox</label>
        </div>
        
        <div class="flex items-center space-x-2">
          <lib-checkbox id="test-large" size="lg" [(checked)]="largeChecked"></lib-checkbox>
          <label for="test-large" class="text-base">Large checkbox</label>
        </div>
      </div>
      
      <div class="space-y-4">
        <h2 class="text-lg font-semibold">Indeterminate</h2>
        
        <div class="flex items-center space-x-2">
          <lib-checkbox id="test-indeterminate" [indeterminate]="true"></lib-checkbox>
          <label for="test-indeterminate" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Indeterminate checkbox
          </label>
        </div>
      </div>
      
      <div class="space-y-4">
        <h2 class="text-lg font-semibold">Disabled States</h2>
        
        <div class="flex items-center space-x-2">
          <lib-checkbox id="test-disabled-unchecked" [disabled]="true" [checked]="false"></lib-checkbox>
          <label for="test-disabled-unchecked" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Disabled unchecked
          </label>
        </div>
        
        <div class="flex items-center space-x-2">
          <lib-checkbox id="test-disabled-checked" [disabled]="true" [checked]="true"></lib-checkbox>
          <label for="test-disabled-checked" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Disabled checked
          </label>
        </div>
      </div>
    </div>
  `
})
export class CheckboxTestComponent {
  readonly isChecked = signal(false);
  readonly smallChecked = signal(false);
  readonly defaultChecked = signal(true);
  readonly largeChecked = signal(false);
}