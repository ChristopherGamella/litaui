import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentationComponent } from '../../lib/demo/components/documentation.component';

/**
 * Installation guide component
 */
@Component({
  selector: 'app-docs-installation',
  standalone: true,
  imports: [CommonModule, DocumentationComponent],
  template: `
    <lib-documentation currentPageId="installation">
      <div class="prose prose-gray max-w-none dark:prose-invert">
        <h1>Installation</h1>
        
        <p class="text-xl text-muted-foreground mb-8">
          Get started with shadcn/ui for Angular in your project.
        </p>

        <h2 class="mt-12 mb-6">Prerequisites</h2>
        
        <p class="mb-4">Before you begin, ensure you have:</p>

        <ul class="mb-8">
          <li><strong>Node.js</strong> 18.10 or later</li>
          <li><strong>Angular CLI</strong> 20+</li>
          <li><strong>Angular</strong> 20+ project</li>
        </ul>

        <h2 class="mt-12 mb-6">Framework Setup</h2>

        <p class="mb-4">If you don't have an Angular project yet, create one:</p>

        <div class="bg-muted p-4 rounded-md mb-8">
          <code class="text-foreground">npm install -g @angular/cli<br>
          ng new my-shadcn-app<br>
          cd my-shadcn-app</code>
        </div>

        <h2 class="mt-12 mb-6">Install Dependencies</h2>

        <p class="mb-4">Install the required packages:</p>

        <div class="bg-muted p-4 rounded-md mb-6">
          <code class="text-foreground">npm install lucide-angular class-variance-authority clsx tailwind-merge</code>
        </div>

        <h3 class="mt-8 mb-4">Package Overview</h3>

        <ul class="mb-8">
          <li><strong>lucide-angular</strong>: Beautiful icon library</li>
          <li><strong>class-variance-authority</strong>: Utilities for component variants</li>
          <li><strong>clsx</strong>: Conditional class name utility</li>
          <li><strong>tailwind-merge</strong>: Tailwind CSS class merging utility</li>
        </ul>

        <h2 class="mt-12 mb-6">Configure Tailwind CSS</h2>

        <h3 class="mt-8 mb-4">1. Install Tailwind CSS</h3>

        <div class="bg-muted p-4 rounded-md mb-6">
          <code class="text-foreground">npm install -D tailwindcss @tailwindcss/typography postcss autoprefixer<br>
          npx tailwindcss init -p</code>
        </div>

        <h3 class="mt-8 mb-4">2. Configure Tailwind</h3>

        <p class="mb-6">Update your <code>tailwind.config.js</code> with the shadcn/ui color system and design tokens.</p>

        <h3 class="mt-8 mb-4">3. Add CSS Variables</h3>

        <p class="mb-8">Add the CSS variables to your <code>src/styles.css</code> for light and dark themes.</p>

        <h2 class="mt-12 mb-6">Copy Components</h2>

        <p class="mb-6">Now you can start copying components into your project. Each component page provides the source code that you can copy directly.</p>

        <h3 class="mt-8 mb-4">Recommended Structure</h3>

        <div class="bg-muted p-4 rounded-md mb-6">
          <code class="text-foreground">
            src/<br>
            ├── app/<br>
            │   └── components/<br>
            │       └── ui/<br>
            │           ├── button.component.ts<br>
            │           ├── card.component.ts<br>
            │           └── ...<br>
            └── styles.css
          </code>
        </div>

        <h3 class="mt-8 mb-4">Example: Adding a Button</h3>

        <ol class="mb-8">
          <li>Copy the button component code from the Button documentation</li>
          <li>Create <code>src/app/components/ui/button.component.ts</code></li>
          <li>Paste the code</li>
          <li>Import and use in your components</li>
        </ol>

        <h2 class="mt-12 mb-6">Verification</h2>

        <p class="mb-8">Test your setup by creating a simple component with Tailwind classes. If the styling looks correct, you're ready to start using components!</p>

        <h2 class="mt-12 mb-6">Next Steps</h2>

        <ul class="mb-8">
          <li><a href="/docs/quick-start">Quick Start Guide</a> - Build your first component</li>
          <li><a href="/docs/theming">Theming</a> - Customize colors and design tokens</li>
          <li><a href="/docs/components">Components</a> - Browse all available components</li>
        </ul>

        <h2 class="mt-12 mb-6">Troubleshooting</h2>

        <h3 class="mt-8 mb-4">Common Issues</h3>

        <ul class="mb-6">
          <li><strong>Styles not applying</strong>: Check Tailwind configuration and CSS variables</li>
          <li><strong>TypeScript errors</strong>: Verify dependencies and import paths</li>
          <li><strong>Build errors</strong>: Ensure all components are standalone and dependencies are installed</li>
        </ul>

        <p class="mb-0">Need help? Check our troubleshooting guide or open an issue on GitHub.</p>
      </div>
    </lib-documentation>
  `
})
export class DocsInstallationComponent {}