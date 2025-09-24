import { Component } from '@angular/core';
import { BadgeComponent } from '../badge.component';

@Component({
  selector: 'badge-secondary-demo',
  standalone: true,
  imports: [BadgeComponent],
  template: `<lib-badge variant="secondary">Secondary</lib-badge>`,
})
export default class BadgeSecondaryDemo {}