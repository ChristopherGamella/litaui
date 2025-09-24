import { Component } from '@angular/core';
import { BadgeComponent } from '../badge.component';

@Component({
  selector: 'badge-default-demo',
  standalone: true,
  imports: [BadgeComponent],
  template: `<lib-badge>Default</lib-badge>`,
})
export default class BadgeDefaultDemo {}