import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleComponent } from '../toggle.component';
import { LucideAngularModule, Sun, Moon, Bold, Italic, Underline, icons } from 'lucide-angular';

@Component({
  selector: 'lib-toggle-demo',
  standalone: true,
  imports: [CommonModule, ToggleComponent, LucideAngularModule],
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
          <lib-toggle size="icon" aria-label="Icon size example" [pressed]="iconSizePressed()" (pressedChange)="iconSizePressed.set($event)">
            <lucide-angular [img]="icons.Sun" class="h-4 w-4"></lucide-angular>
          </lib-toggle>
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
          <lib-toggle size="icon" aria-label="Light mode" [pressed]="iconPressed1()" (pressedChange)="iconPressed1.set($event)">
            <lucide-angular [img]="icons.Sun" class="h-4 w-4"></lucide-angular>
          </lib-toggle>
          <lib-toggle size="icon" aria-label="Dark mode" [pressed]="iconPressed2()" (pressedChange)="iconPressed2.set($event)">
            <lucide-angular [img]="icons.Moon" class="h-4 w-4"></lucide-angular>
          </lib-toggle>
        </div>
        <p class="mt-2 text-sm text-muted-foreground">Icon-only toggles need accessible <code>aria-label</code>s.</p>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Rich Text (Exclusive Group)</h3>
        <div class="flex flex-wrap gap-2" role="radiogroup" aria-label="Text formatting">
          <lib-toggle size="icon" aria-label="Bold" [pressed]="formatSelected() === 'bold'" (pressedChange)="onFormatSelect('bold', $event)">
            <lucide-angular [img]="icons.Bold" class="h-4 w-4"></lucide-angular>
          </lib-toggle>
          <lib-toggle size="icon" aria-label="Italic" [pressed]="formatSelected() === 'italic'" (pressedChange)="onFormatSelect('italic', $event)">
            <lucide-angular [img]="icons.Italic" class="h-4 w-4"></lucide-angular>
          </lib-toggle>
          <lib-toggle size="icon" aria-label="Underline" [pressed]="formatSelected() === 'underline'" (pressedChange)="onFormatSelect('underline', $event)">
            <lucide-angular [img]="icons.Underline" class="h-4 w-4"></lucide-angular>
          </lib-toggle>
        </div>
        <p class="mt-2 text-sm text-muted-foreground">Only one formatting option can be active at a time (radio behavior built with toggles).</p>
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
  // Icon references (user requested explicit readonly declarations)
  readonly sun = Sun; // kept for potential direct binding use
  readonly moon = Moon;
  readonly bold = Bold;
  readonly italic = Italic;
  readonly underline = Underline;
  // icons collection for [img] binding (matches project convention)
  readonly icons = icons;
  // Individual toggle states
  defaultPressed1 = signal(false);
  outlinePressed = signal(true);
  smPressed = signal(false);
  mdPressed = signal(true);
  lgPressed = signal(false);
  iconSizePressed = signal(false);

  // Icon toggles
  iconPressed1 = signal(true);
  iconPressed2 = signal(false);

  // Multi-select group toggles
  groupPressed1 = signal(true);
  groupPressed2 = signal(false);
  groupPressed3 = signal(true);

  // Exclusive format selection (radio-like behavior)
  private _format = signal<'bold' | 'italic' | 'underline' | null>('bold');
  formatSelected = computed(() => this._format());

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

  onFormatSelect(format: 'bold' | 'italic' | 'underline', pressed: boolean) {
    if (pressed) {
      this._format.set(format);
    } else if (this._format() === format) {
      // Allow unselecting all (optional); remove this branch if always one must stay active
      this._format.set(null);
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