import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleComponent } from '../toggle.component';

@Component({
  selector: 'lib-toggle-demo',
  standalone: true,
  imports: [CommonModule, ToggleComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-4">Variants</h3>
        <div class="flex flex-wrap gap-4">
          <lib-toggle [pressed]="defaultPressed1()" (pressedChange)="defaultPressed1.set($event)">Default</lib-toggle>
          <lib-toggle variant="outline" [pressed]="outlinePressed()" (pressedChange)="outlinePressed.set($event)">Outline</lib-toggle>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Sizes</h3>
        <div class="flex flex-wrap items-center gap-4">
          <lib-toggle size="sm" [pressed]="smPressed()" (pressedChange)="smPressed.set($event)">Small</lib-toggle>
          <lib-toggle size="md" [pressed]="mdPressed()" (pressedChange)="mdPressed.set($event)">Medium</lib-toggle>
          <lib-toggle size="lg" [pressed]="lgPressed()" (pressedChange)="lgPressed.set($event)">Large</lib-toggle>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">States</h3>
        <div class="flex flex-wrap gap-4">
          <lib-toggle [pressed]="true">Always On</lib-toggle>
          <lib-toggle [pressed]="false">Always Off</lib-toggle>
          <lib-toggle [disabled]="true">Disabled</lib-toggle>
          <lib-toggle [disabled]="true" [pressed]="true">Disabled On</lib-toggle>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">With Icons</h3>
        <div class="flex flex-wrap gap-4">
          <lib-toggle [pressed]="iconPressed1()" (pressedChange)="iconPressed1.set($event)">
            <span class="mr-2">🔅</span>
            Light
          </lib-toggle>
          <lib-toggle [pressed]="iconPressed2()" (pressedChange)="iconPressed2.set($event)">
            <span class="mr-2">🌙</span>
            Dark
          </lib-toggle>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Interactive Group</h3>
        <div class="flex flex-wrap gap-4">
          <lib-toggle [pressed]="groupPressed1()" (pressedChange)="onGroupToggle(1, $event)">Option 1</lib-toggle>
          <lib-toggle [pressed]="groupPressed2()" (pressedChange)="onGroupToggle(2, $event)">Option 2</lib-toggle>
          <lib-toggle [pressed]="groupPressed3()" (pressedChange)="onGroupToggle(3, $event)">Option 3</lib-toggle>
        </div>
        <p class="mt-2 text-sm text-muted-foreground">
          Selected: {{ getSelectedOptions() }}
        </p>
      </div>
    </div>
  `,
})
export class ToggleDemoComponent {
  // Individual toggle states
  defaultPressed1 = signal(false);
  outlinePressed = signal(true);
  smPressed = signal(false);
  mdPressed = signal(true);
  lgPressed = signal(false);

  // Icon toggles
  iconPressed1 = signal(true);
  iconPressed2 = signal(false);

  // Group toggles
  groupPressed1 = signal(true);
  groupPressed2 = signal(false);
  groupPressed3 = signal(true);

  onGroupToggle(option: number, pressed: boolean) {
    switch (option) {
      case 1:
        this.groupPressed1.set(pressed);
        break;
      case 2:
        this.groupPressed2.set(pressed);
        break;
      case 3:
        this.groupPressed3.set(pressed);
        break;
    }
  }

  getSelectedOptions(): string {
    const selected = [];
    if (this.groupPressed1()) selected.push('1');
    if (this.groupPressed2()) selected.push('2');
    if (this.groupPressed3()) selected.push('3');
    return selected.length > 0 ? selected.join(', ') : 'None';
  }
}