import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-button-ghost-demo',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  template: `
    <lib-button variant="ghost">Ghost Button</lib-button>
  `
})
export class ButtonGhostDemoComponent {}