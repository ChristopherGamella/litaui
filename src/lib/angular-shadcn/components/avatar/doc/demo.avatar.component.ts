import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../avatar.component';

@Component({
  selector: 'lib-avatar-demo',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  template: `
    <div class="space-y-8">
      <div>
        <h3 class="text-lg font-semibold mb-4">Sizes</h3>
        <div class="flex items-center gap-4">
          <lib-avatar size="sm" fallback="SM"></lib-avatar>
          <lib-avatar size="default" fallback="MD"></lib-avatar>
          <lib-avatar size="lg" fallback="LG"></lib-avatar>
          <lib-avatar size="xl" fallback="XL"></lib-avatar>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">With Images</h3>
        <div class="flex items-center gap-4">
          <lib-avatar
            src="https://github.com/shadcn.png"
            alt="Shadcn"
            fallback="SC"
          ></lib-avatar>
          <lib-avatar
            src="https://github.com/vercel.png"
            alt="Vercel"
            fallback="VC"
          ></lib-avatar>
          <lib-avatar
            src="https://invalid-image-url.com/avatar.jpg"
            alt="Invalid Image"
            fallback="II"
          ></lib-avatar>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Fallback Only</h3>
        <div class="flex items-center gap-4">
          <lib-avatar fallback="JD"></lib-avatar>
          <lib-avatar fallback="AB"></lib-avatar>
          <lib-avatar fallback="XY"></lib-avatar>
        </div>
      </div>

      <div>
        <h3 class="text-lg font-semibold mb-4">Custom Fallback Text</h3>
        <div class="flex items-center gap-4">
          <lib-avatar fallback="User"></lib-avatar>
          <lib-avatar fallback="Admin"></lib-avatar>
          <lib-avatar fallback="Guest"></lib-avatar>
        </div>
      </div>
    </div>
  `,
})
export class AvatarDemoComponent {}