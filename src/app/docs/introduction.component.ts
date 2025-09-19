import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationComponent } from '../../lib/demo/components/documentation.component';

/**
 * Introduction page component
 */
@Component({
  selector: 'app-docs-introduction',
  standalone: true,
  imports: [CommonModule, DocumentationComponent],
  template: `
    <lib-documentation currentPageId="introduction">
      <div class="prose prose-gray max-w-none dark:prose-invert">
        <h1>shadcn/ui for Angular</h1>
        
        <p class="text-xl text-muted-foreground">
          Beautifully designed components that you can copy and paste into your apps. 
          Accessible. Customizable. Open Source.
        </p>
        
        <blockquote class="border-l-4 border-primary pl-6 py-4 my-8 bg-muted/50 rounded-r-lg">
          <div class="not-prose">
            <div class="text-lg font-semibold mb-2">Copy, paste, done.</div>
            <div class="text-muted-foreground">
              This is NOT a component library. It's a collection of re-usable components that you can copy and paste into your Angular apps.
            </div>
          </div>
        </blockquote>

        <div class="flex flex-wrap gap-2 mb-8">
          <img src="https://img.shields.io/badge/Angular-20+-red.svg" alt="Angular 20+">
          <img src="https://img.shields.io/badge/TypeScript-5.0+-blue.svg" alt="TypeScript 5.0+">
          <img src="https://img.shields.io/badge/TailwindCSS-4.0+-38bdf8.svg" alt="TailwindCSS 4.0+">
          <img src="https://img.shields.io/badge/Signals-Native-green.svg" alt="Angular Signals">
          <img src="https://img.shields.io/badge/Standalone-Components-orange.svg" alt="Standalone Components">
          <img src="https://img.shields.io/badge/WCAG-2.1%20AA-purple.svg" alt="WCAG 2.1 AA">
          <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License">
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 not-prose">
          <div class="border rounded-lg p-6 text-center">
            <div class="text-2xl font-bold text-primary mb-2">40+</div>
            <div class="text-sm text-muted-foreground">Production-Ready Components</div>
          </div>
          <div class="border rounded-lg p-6 text-center">
            <div class="text-2xl font-bold text-primary mb-2">100%</div>
            <div class="text-sm text-muted-foreground">TypeScript Coverage</div>
          </div>
          <div class="border rounded-lg p-6 text-center">
            <div class="text-2xl font-bold text-primary mb-2">0</div>
            <div class="text-sm text-muted-foreground">Runtime Dependencies</div>
          </div>
        </div>

        <p class="text-lg text-muted-foreground mb-8">
          Pick the components you need. Copy and paste the code into your project and customize to your needs. 
          The code is yours.
        </p>

        <h2 class="mb-6">FAQ</h2>

        <div class="space-y-6 mb-12">
          <div>
            <h3 class="font-semibold mb-2">Why copy/paste and not packaged as a dependency?</h3>
            <p class="text-muted-foreground">
              The idea behind this is to give you ownership and control over the code, allowing you to decide how the components are built and styled.
            </p>
            <p class="text-muted-foreground mt-2">
              Start with some sensible defaults, then customize the components to your needs.
            </p>
            <p class="text-muted-foreground mt-2">
              One of the drawback of packaging the components in an npm package is that the style is coupled with the implementation. The design of your components should be separate from their implementation.
            </p>
          </div>

          <div>
            <h3 class="font-semibold mb-2">Do you plan to publish it as an npm package?</h3>
            <p class="text-muted-foreground">
              No. I have no plans to publish it as an npm package.
            </p>
          </div>

          <div>
            <h3 class="font-semibold mb-2">Which frameworks are you planning to support?</h3>
            <p class="text-muted-foreground">
              This is specifically built for Angular 20+ with standalone components, signals, and modern Angular patterns.
            </p>
          </div>
        </div>

        <h2 class="mb-6">Philosophy</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 not-prose">
          <div class="border rounded-lg p-8">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">✓</div>
              <h3 class="font-semibold m-0">Own your code</h3>
            </div>
            <p class="text-sm text-muted-foreground m-0 leading-relaxed">Copy and paste the code into your project. Make it yours. No black box, no vendor lock-in.</p>
          </div>
          
          <div class="border rounded-lg p-8">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">⚡</div>
              <h3 class="font-semibold m-0">Built for Angular</h3>
            </div>
            <p class="text-sm text-muted-foreground m-0 leading-relaxed">Designed for Angular 20+ with standalone components, signals, and modern patterns.</p>
          </div>
          
          <div class="border rounded-lg p-8">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">🎨</div>
              <h3 class="font-semibold m-0">Customizable</h3>
            </div>
            <p class="text-sm text-muted-foreground m-0 leading-relaxed">Components are built using Tailwind CSS. Customize them to match your design requirements.</p>
          </div>
          
          <div class="border rounded-lg p-8">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold">♿</div>
              <h3 class="font-semibold m-0">Accessible</h3>
            </div>
            <p class="text-sm text-muted-foreground m-0 leading-relaxed">Components are built with accessibility in mind. They include proper ARIA attributes and keyboard support.</p>
          </div>
        </div>

        <h2 class="mb-6">Getting Started</h2>
        
        <p class="text-lg text-muted-foreground mb-8">
          Start by installing the dependencies and setting up your project.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 not-prose">
          <div class="border rounded-lg p-6 text-center">
            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold mx-auto mb-4">1</div>
            <div class="font-semibold mb-2">Install</div>
            <div class="text-sm text-muted-foreground">Set up Tailwind CSS and configure your Angular project.</div>
          </div>
          
          <div class="border rounded-lg p-6 text-center">
            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold mx-auto mb-4">2</div>
            <div class="font-semibold mb-2">Copy</div>
            <div class="text-sm text-muted-foreground">Browse components and copy the code you need.</div>
          </div>
          
          <div class="border rounded-lg p-6 text-center">
            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-xl font-bold mx-auto mb-4">3</div>
            <div class="font-semibold mb-2">Done</div>
            <div class="text-sm text-muted-foreground">Customize and use in your application.</div>
          </div>
        </div>

        <div class="flex flex-wrap gap-3 mb-16">
          <a href="/docs/installation" class="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors">
            Get Started
          </a>
          <a href="/docs/components" class="inline-flex items-center px-4 py-2 border border-border rounded-md font-medium hover:bg-muted transition-colors">
            Browse Components
          </a>
        </div>

        <h2 class="mb-6">Complete Component Ecosystem</h2>
        
        <p class="text-lg text-muted-foreground mb-8">
          A comprehensive collection of components designed for modern Angular applications.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 not-prose">
          <div class="border rounded-lg p-6">
            <div class="font-semibold mb-4 text-lg">Form Controls</div>
            <div class="text-sm text-muted-foreground space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Input, Textarea, Select</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Checkbox, Radio, Switch</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Date Picker, Range Slider</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Form Validation & Styling</span>
              </div>
            </div>
          </div>
          
          <div class="border rounded-lg p-6">
            <div class="font-semibold mb-4 text-lg">Navigation</div>
            <div class="text-sm text-muted-foreground space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Breadcrumbs, Pagination</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Tabs, Accordion</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Dropdown Menu, Command</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Navigation Menu</span>
              </div>
            </div>
          </div>
          
          <div class="border rounded-lg p-6">
            <div class="font-semibold mb-4 text-lg">Feedback</div>
            <div class="text-sm text-muted-foreground space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Alert, Toast, Banner</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Progress, Skeleton</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Badge, Avatar</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Loading States</span>
              </div>
            </div>
          </div>
          
          <div class="border rounded-lg p-6">
            <div class="font-semibold mb-4 text-lg">Overlay</div>
            <div class="text-sm text-muted-foreground space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Modal, Dialog, Drawer</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Popover, Tooltip</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Sheet, Collapsible</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Context Menu</span>
              </div>
            </div>
          </div>
          
          <div class="border rounded-lg p-6">
            <div class="font-semibold mb-4 text-lg">Data Display</div>
            <div class="text-sm text-muted-foreground space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Table, Data Table</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Card, Calendar</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Chart Integration</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Virtualized Lists</span>
              </div>
            </div>
          </div>
          
          <div class="border rounded-lg p-6">
            <div class="font-semibold mb-4 text-lg">Layout</div>
            <div class="text-sm text-muted-foreground space-y-3">
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Container, Stack, Grid</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Separator, Divider</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Aspect Ratio, Scroll Area</span>
              </div>
              <div class="flex items-center gap-3">
                <div class="w-1.5 h-1.5 bg-muted-foreground rounded-full"></div>
                <span>Responsive Utilities</span>
              </div>
            </div>
          </div>
        </div>

        <h2 class="mb-6">Built for Modern Angular Development</h2>
        
        <p class="text-lg text-muted-foreground mb-8">
          Uses the latest Angular features and patterns for optimal developer experience.
        </p>

        <div class="bg-muted/50 rounded-lg p-8 mb-16">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <div class="font-semibold mb-3 text-foreground">Angular 20+ Features</div>
              <ul class="space-y-1 text-muted-foreground">
                <li>• Standalone components (no NgModules)</li>
                <li>• Signal-based reactive state</li>
                <li>• Modern control flow (&#64;if, &#64;for, &#64;switch)</li>
                <li>• input() and output() functions</li>
                <li>• OnPush change detection strategy</li>
                <li>• computed() for derived state</li>
              </ul>
            </div>
            <div>
              <div class="font-semibold mb-3 text-foreground">Developer Experience</div>
              <ul class="space-y-1 text-muted-foreground">
                <li>• Full TypeScript strict mode support</li>
                <li>• IntelliSense and autocompletion</li>
                <li>• Comprehensive JSDoc documentation</li>
                <li>• Live examples in documentation</li>
                <li>• Copy-paste ready code snippets</li>
                <li>• Testing utilities and examples</li>
              </ul>
            </div>
          </div>
        </div>

        <h2 class="mb-6">Core Principles</h2>

        <div class="space-y-4 mb-8">
          <div class="border-l-4 border-blue-500 pl-4">
            <div class="font-semibold">Copy, Don't Install</div>
            <div class="text-muted-foreground text-sm">Get the actual source code and make it yours. No package dependencies, no version conflicts.</div>
          </div>
          
          <div class="border-l-4 border-green-500 pl-4">
            <div class="font-semibold">Composable by Design</div>
            <div class="text-muted-foreground text-sm">Build complex UIs from simple, reusable pieces. Every component follows composition patterns.</div>
          </div>
          
          <div class="border-l-4 border-purple-500 pl-4">
            <div class="font-semibold">Accessible by Default</div>
            <div class="text-muted-foreground text-sm">WCAG 2.1 AA compliance built into every component. Accessibility is not an afterthought.</div>
          </div>
          
          <div class="border-l-4 border-orange-500 pl-4">
            <div class="font-semibold">Performance Optimized</div>
            <div class="text-muted-foreground text-sm">Tree-shakable, lazy-loaded, and optimized for modern Angular change detection.</div>
          </div>
        </div>

        <h2 class="mb-6">Components</h2>
        
        <p class="text-lg text-muted-foreground mb-8">
          Over 40+ components built for Angular applications.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 not-prose">
          <div class="border rounded-lg p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">📖</div>
              <div class="font-semibold">Documentation</div>
            </div>
            <div class="space-y-3">
              <a href="/docs/installation" class="block text-sm text-primary hover:underline">→ Installation</a>
              <a href="/docs/components" class="block text-sm text-primary hover:underline">→ Components</a>
              <a href="/docs/theming" class="block text-sm text-primary hover:underline">→ Theming</a>
            </div>
          </div>
          
          <div class="border rounded-lg p-6">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">🚀</div>
              <div class="font-semibold">Examples</div>
            </div>
            <div class="space-y-3">
              <a href="/demo" class="block text-sm text-primary hover:underline">→ Component Demo</a>
              <a href="/examples/dashboard" class="block text-sm text-primary hover:underline">→ Dashboard</a>
              <a href="/examples/forms" class="block text-sm text-primary hover:underline">→ Forms</a>
            </div>
          </div>
        </div>
      </div>
    </lib-documentation>
  `
})
export class DocsIntroductionComponent {}