import { Component } from '@angular/core';
import { BadgeComponent } from '../badge.component';

@Component({
  selector: 'badge-outline-demo',
  standalone: true,
  imports: [BadgeComponent],
  template: `<lib-badge variant="outline">Outline</lib-badge>`,
})
export default class BadgeOutlineDemo {}