import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/ui/button.component';
import { SimpleButtonComponent } from '../../components/ui/simple-button.component';

/**
 * Test button demo to debug text display issues
 */
@Component({
  selector: 'lib-button-test',
  standalone: true,
  imports: [CommonModule, ButtonComponent, SimpleButtonComponent],
  template: `
    <div class="p-8 max-w-4xl mx-auto min-h-screen">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold mb-2 text-gray-900">Button Text Display Test</h1>
        <p class="text-gray-600">Comparing different button implementations</p>
      </div>

      <!-- Original Button Component -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-900">Original Button Component</h2>
        <div class="flex flex-wrap gap-4 mb-4">
          <lib-button variant="default">Default Button</lib-button>
          <lib-button variant="secondary">Secondary Button</lib-button>
          <lib-button variant="success">Success Button</lib-button>
          <lib-button variant="outline">Outline Button</lib-button>
          <lib-button variant="ghost">Ghost Button</lib-button>
          <lib-button variant="destructive">Destructive Button</lib-button>
        </div>
        
        <h3 class="text-lg font-medium mb-2 text-gray-800">States</h3>
        <div class="flex flex-wrap gap-4">
          <lib-button>Normal State</lib-button>
          <lib-button [disabled]="true">Disabled State</lib-button>
          <lib-button [loading]="true">Loading State</lib-button>
        </div>
      </section>

      <!-- Simple Button Component -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-900">Simple Button Component</h2>
        <div class="flex flex-wrap gap-4 mb-4">
          <lib-simple-button variant="default">Default Simple</lib-simple-button>
          <lib-simple-button variant="secondary">Secondary Simple</lib-simple-button>
          <lib-simple-button variant="outline">Outline Simple</lib-simple-button>
          <lib-simple-button variant="ghost">Ghost Simple</lib-simple-button>
          <lib-simple-button variant="destructive">Destructive Simple</lib-simple-button>
        </div>
        
        <h3 class="text-lg font-medium mb-2 text-gray-800">States</h3>
        <div class="flex flex-wrap gap-4">
          <lib-simple-button>Normal State</lib-simple-button>
          <lib-simple-button [disabled]="true">Disabled State</lib-simple-button>
          <lib-simple-button [loading]="true">Loading State</lib-simple-button>
        </div>
      </section>

      <!-- Basic HTML Buttons for Comparison -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-900">Basic HTML Buttons</h2>
        <div class="flex flex-wrap gap-4">
          <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">HTML Button 1</button>
          <button class="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">HTML Button 2</button>
          <button class="px-4 py-2 border border-gray-300 bg-white rounded hover:bg-gray-50 text-gray-900">HTML Button 3</button>
        </div>
      </section>

      <!-- Debug Information -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold mb-4 text-gray-900">Debug Info</h2>
        <div class="bg-gray-100 p-4 rounded">
          <p class="text-sm text-gray-800">If you can see this text but button text is missing, there's a CSS issue.</p>
          <p class="text-sm text-gray-800">Check browser console for CSS or font loading errors.</p>
          <p class="text-sm text-gray-800">Check if TailwindCSS classes are being generated properly.</p>
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background: white;
    }
  `]
})
export class ButtonTestComponent {
  constructor() {
    console.log('ButtonTestComponent initialized');
  }
}