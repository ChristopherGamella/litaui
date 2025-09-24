import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-button-destructive-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <lib-button variant="destructive">Destructive Button</lib-button>
  `
})
export class ButtonDestructiveDemoComponent {}