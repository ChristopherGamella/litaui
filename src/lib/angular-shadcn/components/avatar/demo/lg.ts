import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar.component';

@Component({
  selector: 'avatar-lg-demo',
  standalone: true,
  imports: [AvatarComponent],
  template: `<app-avatar size="lg" fallback="LG" />`
})
export default class LgAvatarDemo {}