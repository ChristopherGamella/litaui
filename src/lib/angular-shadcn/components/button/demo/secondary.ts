import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-button-secondary-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <lib-button variant="secondary">Secondary Button</lib-button>
  `
})
export class ButtonSecondaryDemoComponent {}