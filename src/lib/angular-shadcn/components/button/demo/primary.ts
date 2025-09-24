import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-button-primary-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <lib-button variant="primary">Primary Button</lib-button>
  `
})
export class ButtonPrimaryDemoComponent {}