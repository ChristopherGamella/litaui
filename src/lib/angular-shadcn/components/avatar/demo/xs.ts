import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar.component';

@Component({
  selector: 'avatar-xs-demo',
  standalone: true,
  imports: [AvatarComponent],
  template: `<app-avatar size="xs" fallback="XS" />`
})
export default class XsAvatarDemo {}