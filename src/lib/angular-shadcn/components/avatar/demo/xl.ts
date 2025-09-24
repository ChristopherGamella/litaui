import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar.component';

@Component({
  selector: 'avatar-xl-demo',
  standalone: true,
  imports: [AvatarComponent],
  template: `<app-avatar size="xl" fallback="XL" />`
})
export default class XlAvatarDemo {}