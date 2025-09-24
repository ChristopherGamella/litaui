import { Component } from '@angular/core';
import { BadgeComponent } from '../badge.component';

@Component({
  selector: 'badge-destructive-demo',
  standalone: true,
  imports: [BadgeComponent],
  template: `<lib-badge variant="destructive">Destructive</lib-badge>`,
})
export default class BadgeDestructiveDemo {}