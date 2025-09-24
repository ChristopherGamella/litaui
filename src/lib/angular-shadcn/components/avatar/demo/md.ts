import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar.component';

@Component({
  selector: 'avatar-md-demo',
  standalone: true,
  imports: [AvatarComponent],
  template: `<app-avatar size="md" fallback="MD" />`
})
export default class MdAvatarDemo {}