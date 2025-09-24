import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-button-outline-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <lib-button variant="outline">Outline Button</lib-button>
  `
})
export class ButtonOutlineDemoComponent {}