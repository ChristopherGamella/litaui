import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar.component';

@Component({
  selector: 'avatar-fallback-demo',
  standalone: true,
  imports: [AvatarComponent],
  template: `<app-avatar fallback="JD" />`
})
export default class FallbackAvatarDemo {}