import { Component, TemplateRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from '../../components/ui/popover.component';
import { ButtonComponent } from '../../components/ui/button.component';
import { InputComponent } from '../../components/ui/input.component';

/**
 * Popover demo component showcasing various popover features
 * Demonstrates basic usage, placement options, controlled state, and form integration
 */
@Component({
  selector: 'lib-popover-demo',
  standalone: true,
  imports: [
    CommonModule, 
    PopoverComponent, 
    ButtonComponent,
    InputComponent
  ],
  template: `
    <div class="flex flex-col gap-8 p-6">
      <div class="space-y-2">
        <h2 class="text-2xl font-bold">Popover Demo</h2>
        <p class="text-muted-foreground">Interactive examples of the popover component.</p>
      </div>

      <!-- Basic Popover -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Basic Popover</h3>
        <lib-popover [contentTemplate]="basicContent">
          <lib-button variant="outline">Open popover</lib-button>
        </lib-popover>
      </div>

      <!-- Placement Options -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Placement Options</h3>
        <div class="grid grid-cols-3 gap-4 max-w-md">
          <!-- Top Row -->
          <lib-popover placement="top-start" [contentTemplate]="placementContent">
            <lib-button variant="outline" size="sm">Top Start</lib-button>
          </lib-popover>
          <lib-popover placement="top" [contentTemplate]="placementContent">
            <lib-button variant="outline" size="sm">Top</lib-button>
          </lib-popover>
          <lib-popover placement="top-end" [contentTemplate]="placementContent">
            <lib-button variant="outline" size="sm">Top End</lib-button>
          </lib-popover>

          <!-- Middle Row -->
          <lib-popover placement="left" [contentTemplate]="placementContent">
            <lib-button variant="outline" size="sm">Left</lib-button>
          </lib-popover>
          <div class="flex items-center justify-center">
            <span class="text-sm text-muted-foreground">Center</span>
          </div>
          <lib-popover placement="right" [contentTemplate]="placementContent">
            <lib-button variant="outline" size="sm">Right</lib-button>
          </lib-popover>

          <!-- Bottom Row -->
          <lib-popover placement="bottom-start" [contentTemplate]="placementContent">
            <lib-button variant="outline" size="sm">Bottom Start</lib-button>
          </lib-popover>
          <lib-popover placement="bottom" [contentTemplate]="placementContent">
            <lib-button variant="outline" size="sm">Bottom</lib-button>
          </lib-popover>
          <lib-popover placement="bottom-end" [contentTemplate]="placementContent">
            <lib-button variant="outline" size="sm">Bottom End</lib-button>
          </lib-popover>
        </div>
      </div>

      <!-- Controlled Popover -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Controlled Popover</h3>
        <div class="flex gap-2">
          <lib-popover 
            [isOpenControlled]="isControlledOpen()" 
            (openChange)="setControlledOpen($event)"
            [contentTemplate]="controlledContent">
            <lib-button variant="outline">Controlled Trigger</lib-button>
          </lib-popover>
          <lib-button 
            variant="secondary" 
            size="sm"
            (onClick)="toggleControlled()">
            {{ isControlledOpen() ? 'Close' : 'Open' }} Externally
          </lib-button>
        </div>
      </div>

      <!-- Form Example -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Form in Popover</h3>
        <lib-popover [contentTemplate]="formContent" placement="bottom-start">
          <lib-button variant="outline">Edit Profile</lib-button>
        </lib-popover>
      </div>

      <!-- Modal Popover -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Modal Popover</h3>
        <p class="text-sm text-muted-foreground">
          Modal popover prevents interaction with the background and traps focus.
        </p>
        <lib-popover 
          [modal]="true" 
          [contentTemplate]="modalContent"
          [closeOnClickOutside]="false">
          <lib-button variant="outline">Open Modal Popover</lib-button>
        </lib-popover>
      </div>

      <!-- Custom Styling -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Custom Styling</h3>
        <lib-popover 
          [contentTemplate]="customContent"
          class="w-96 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <lib-button variant="outline">Custom Styled</lib-button>
        </lib-popover>
      </div>
    </div>

    <!-- Content Templates -->
    <ng-template #basicContent>
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="font-medium leading-none">Dimensions</h4>
          <p class="text-sm text-muted-foreground">
            Set the dimensions for the layer.
          </p>
        </div>
        <div class="grid gap-2">
          <div class="grid grid-cols-3 items-center gap-4">
            <label class="text-sm">Width</label>
            <lib-input 
              placeholder="100%" 
              class="col-span-2 h-8">
            </lib-input>
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <label class="text-sm">Max. width</label>
            <lib-input 
              placeholder="300px" 
              class="col-span-2 h-8">
            </lib-input>
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <label class="text-sm">Height</label>
            <lib-input 
              placeholder="25px" 
              class="col-span-2 h-8">
            </lib-input>
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <label class="text-sm">Max. height</label>
            <lib-input 
              placeholder="none" 
              class="col-span-2 h-8">
            </lib-input>
          </div>
        </div>
      </div>
    </ng-template>

    <ng-template #placementContent>
      <div class="text-center p-2">
        <p class="text-sm">This popover shows placement options!</p>
      </div>
    </ng-template>

    <ng-template #controlledContent>
      <div class="space-y-3">
        <h4 class="font-medium">Controlled Popover</h4>
        <p class="text-sm text-muted-foreground">
          This popover's state is controlled by external buttons.
        </p>
        <div class="text-xs text-muted-foreground">
          Current state: {{ isControlledOpen() ? 'Open' : 'Closed' }}
        </div>
      </div>
    </ng-template>

    <ng-template #formContent>
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="font-medium leading-none">Edit profile</h4>
          <p class="text-sm text-muted-foreground">
            Make changes to your profile here. Click save when you're done.
          </p>
        </div>
        <div class="space-y-3">
          <div class="grid grid-cols-3 items-center gap-4">
            <label class="text-sm">Name</label>
            <lib-input 
              [value]="profileForm.name"
              (valueChange)="updateProfile('name', $event)"
              class="col-span-2 h-8">
            </lib-input>
          </div>
          <div class="grid grid-cols-3 items-center gap-4">
            <label class="text-sm">Username</label>
            <lib-input 
              [value]="profileForm.username"
              (valueChange)="updateProfile('username', $event)"
              class="col-span-2 h-8">
            </lib-input>
          </div>
        </div>
        <div class="flex justify-end">
          <lib-button size="sm" (onClick)="saveProfile()">
            Save changes
          </lib-button>
        </div>
      </div>
    </ng-template>

    <ng-template #modalContent>
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="font-medium leading-none">Modal Popover</h4>
          <p class="text-sm text-muted-foreground">
            This is a modal popover. It traps focus and prevents background interaction.
          </p>
        </div>
        <div class="flex gap-2">
          <lib-button size="sm" variant="outline">
            Action 1
          </lib-button>
          <lib-button size="sm" variant="outline">
            Action 2
          </lib-button>
        </div>
        <div class="text-xs text-muted-foreground">
          Press Escape to close or click the backdrop.
        </div>
      </div>
    </ng-template>

    <ng-template #customContent>
      <div class="grid gap-4">
        <div class="space-y-2">
          <h4 class="font-medium leading-none text-purple-900">Custom Styling</h4>
          <p class="text-sm text-purple-700">
            This popover has custom styling with gradients and colors.
          </p>
        </div>
        <div class="flex gap-2">
          <lib-button size="sm" variant="outline" class="border-purple-300 text-purple-700 hover:bg-purple-50">
            Purple Action
          </lib-button>
          <lib-button size="sm" variant="outline" class="border-pink-300 text-pink-700 hover:bg-pink-50">
            Pink Action
          </lib-button>
        </div>
      </div>
    </ng-template>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class PopoverDemoComponent {
  // Controlled popover state
  isControlledOpen = signal(false);

  // Form data
  profileForm = {
    name: 'John Doe',
    username: '@johndoe'
  };

  constructor() {}

  /**
   * Toggle controlled popover
   */
  toggleControlled(): void {
    this.isControlledOpen.update(open => !open);
  }

  /**
   * Set controlled popover state
   */
  setControlledOpen(isOpen: boolean): void {
    this.isControlledOpen.set(isOpen);
  }

  /**
   * Update profile form field
   */
  updateProfile(field: keyof typeof this.profileForm, value: string | number): void {
    this.profileForm = {
      ...this.profileForm,
      [field]: String(value)
    };
  }

  /**
   * Save profile changes
   */
  saveProfile(): void {
    console.log('Profile saved:', this.profileForm);
    // In a real app, you would save to a service
  }
}