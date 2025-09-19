import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Mail, Download, Github, Loader2 } from 'lucide-angular';

// Documentation Template
import { 
  ComponentDemoTemplateComponent, 
  ComponentExample, 
  ComponentAPI 
} from './component-demo-template.component';
import { DocumentationComponent } from '../../../lib/demo/components/documentation.component';

// UI Components
import { ButtonComponent } from '../../../lib/components/ui/button.component';

/**
 * Button component documentation and demo page
 */
@Component({
  selector: 'app-docs-button',
  imports: [
    CommonModule,
    LucideAngularModule,
    DocumentationComponent,
    ComponentDemoTemplateComponent,
    ButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lib-documentation currentPageId="button">
      <app-component-demo-template
        componentName="Button"
        description="Trigger actions and state changes with accessible, customizable buttons."
        version="1.0.0"
        [usageCode]="usageCode"
        [importCode]="importCode"
        [examples]="examples"
        [apiProperties]="apiProperties"
        [badges]="badges"
      >
        <!-- Preview Slot -->
        <div slot="preview" class="flex items-center justify-center">
          <div class="space-y-4">
            <div class="flex flex-wrap items-center gap-x-4 justify-center [&>*]:mb-3">
              <lib-button>Default</lib-button>
              <lib-button variant="destructive">Destructive</lib-button>
              <lib-button variant="outline">Outline</lib-button>
              <lib-button variant="secondary">Secondary</lib-button>
              <lib-button variant="ghost">Ghost</lib-button>
              <lib-button variant="link">Link</lib-button>
            </div>
          </div>
        </div>

        <!-- Example: Sizes -->
        <div slot="example-sizes" class="flex items-center justify-center">
          <div class="space-y-4">
            <div class="flex flex-wrap items-center gap-x-4 justify-center [&>*]:mb-3">
              <lib-button size="sm">Small</lib-button>
              <lib-button size="default">Default</lib-button>
              <lib-button size="lg">Large</lib-button>
              <lib-button size="icon">
                <lucide-angular [img]="icons.mail" class="h-4 w-4"></lucide-angular>
              </lib-button>
            </div>
          </div>
        </div>

        <!-- Example: With Icons -->
        <div slot="example-icons" class="flex items-center justify-center">
          <div class="space-y-4">
            <div class="flex flex-wrap items-center gap-x-4 justify-center [&>*]:mb-3">
              <lib-button>
                <lucide-angular [img]="icons.mail" class="mr-2 h-4 w-4"></lucide-angular>
                Email
              </lib-button>
              <lib-button variant="outline">
                <lucide-angular [img]="icons.download" class="mr-2 h-4 w-4"></lucide-angular>
                Download
              </lib-button>
              <lib-button variant="secondary">
                <lucide-angular [img]="icons.github" class="mr-2 h-4 w-4"></lucide-angular>
                GitHub
              </lib-button>
            </div>
          </div>
        </div>

        <!-- Example: Loading States -->
        <div slot="example-loading" class="flex items-center justify-center">
          <div class="space-y-4">
            <div class="flex flex-wrap items-center gap-x-4 justify-center [&>*]:mb-3">
              <lib-button [loading]="true" [disabled]="true">
                <lucide-angular [img]="icons.loader" class="mr-2 h-4 w-4 animate-spin"></lucide-angular>
                Please wait
              </lib-button>
              <lib-button [loading]="true" loadingText="Saving..." variant="outline">
                Save changes
              </lib-button>
            </div>
          </div>
        </div>

        <!-- Example: States -->
        <div slot="example-states" class="flex items-center justify-center">
          <div class="space-y-4">
            <div class="flex flex-wrap items-center gap-x-4 justify-center [&>*]:mb-3">
              <lib-button>Normal</lib-button>
              <lib-button [disabled]="true">Disabled</lib-button>
              <lib-button [loading]="true">Loading</lib-button>
            </div>
          </div>
        </div>

        
        
      </app-component-demo-template>
    </lib-documentation>
  `
})
export class DocsButtonComponent {
  readonly icons = {
    mail: Mail,
    download: Download,
    github: Github,
    loader: Loader2
  } as const;

  readonly usageCode = `<lib-button>Click me</lib-button>
<lib-button variant="destructive">Delete</lib-button>
<lib-button variant="outline">Cancel</lib-button>`;

  readonly importCode = `import { ButtonComponent } from './lib/components/ui/button.component';`;

  readonly badges = [
    { label: 'Stable', variant: 'default' as const },
    { label: 'Accessible', variant: 'secondary' as const }
  ];

  readonly examples: ComponentExample[] = [
    {
      id: 'sizes',
      title: 'Button Sizes',
      description: 'Different button sizes for various use cases.',
      code: `<lib-button size="sm">Small</lib-button>
<lib-button size="default">Default</lib-button>
<lib-button size="lg">Large</lib-button>
<lib-button size="icon">
  <lucide-angular [img]="MailIcon" class="h-4 w-4"></lucide-angular>
</lib-button>`,
      template: ''
    },
    {
      id: 'icons',
      title: 'Buttons with Icons',
      description: 'Enhance buttons with meaningful icons.',
      code: `<lib-button>
  <lucide-angular [img]="MailIcon" class="mr-2 h-4 w-4"></lucide-angular>
  Email
</lib-button>
<lib-button variant="outline">
  <lucide-angular [img]="DownloadIcon" class="mr-2 h-4 w-4"></lucide-angular>
  Download
</lib-button>`,
      template: ''
    },
    {
      id: 'loading',
      title: 'Loading States',
      description: 'Show progress for async operations.',
      code: `<lib-button [loading]="true" [disabled]="true">
  <lucide-angular [img]="Loader2Icon" class="mr-2 h-4 w-4 animate-spin"></lucide-angular>
  Please wait
</lib-button>
<lib-button [loading]="true" loadingText="Saving...">
  Save changes
</lib-button>`,
      template: ''
    },
    {
      id: 'states',
      title: 'Button States',
      description: 'Normal, disabled, and loading states.',
      code: `<lib-button>Normal</lib-button>
<lib-button [disabled]="true">Disabled</lib-button>
<lib-button [loading]="true">Loading</lib-button>`,
      template: ''
    }
  ];

  readonly apiProperties: ComponentAPI[] = [
    {
      name: 'variant',
      type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
      default: '"default"',
      description: 'The visual style variant of the button.'
    },
    {
      name: 'size',
      type: '"default" | "sm" | "lg" | "icon"',
      default: '"default"',
      description: 'The size of the button.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the button is disabled.'
    },
    {
      name: 'loading',
      type: 'boolean',
      default: 'false',
      description: 'Whether the button is in a loading state.'
    },
    {
      name: 'loadingText',
      type: 'string',
      description: 'Text to show when loading (overrides button content).'
    },
    {
      name: 'type',
      type: '"button" | "submit" | "reset"',
      default: '"button"',
      description: 'The HTML button type.'
    },
    {
      name: 'onClick',
      type: 'EventEmitter<void>',
      description: 'Event emitted when the button is clicked.'
    }
  ];
}