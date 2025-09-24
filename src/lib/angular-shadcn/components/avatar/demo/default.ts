import { Component } from '@angular/core';
import { AvatarComponent } from '../avatar.component';

@Component({
  selector: 'avatar-default-demo',
  standalone: true,
  imports: [AvatarComponent],
  template: `<app-avatar src="https://github.com/shadcn.png" alt="Avatar" />`
})
export default class DefaultAvatarDemo {}