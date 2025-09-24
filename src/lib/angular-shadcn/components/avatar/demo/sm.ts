import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar.component';

@Component({
  selector: 'avatar-sm-demo',
  standalone: true,
  imports: [AvatarComponent],
  template: `<app-avatar size="sm" fallback="SM" />`
})
export default class SmAvatarDemo {}