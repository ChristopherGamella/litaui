import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, CreditCard, Star, Settings } from 'lucide-angular';

// Documentation Template
import { 
  ComponentDemoTemplateComponent, 
  ComponentExample, 
  ComponentAPI 
} from './component-demo-template.component';
import { DocumentationComponent } from '../../../lib/demo/components/documentation.component';

// UI Components
import { CardComponent } from '../../../lib/components/ui/card.component';
import { ButtonComponent } from '../../../lib/components/ui/button.component';
import { BadgeComponent } from '../../../lib/components/ui/badge.component';

/**
 * Card component documentation and demo page
 */
@Component({
  selector: 'app-docs-card',
  imports: [
    CommonModule,
    LucideAngularModule,
    DocumentationComponent,
    ComponentDemoTemplateComponent,
    CardComponent,
    ButtonComponent,
    BadgeComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lib-documentation currentPageId="card">
      <app-component-demo-template
        componentName="Card"
        description="A versatile container for grouping related content with optional headers and footers."
        version="1.0.0"
        [usageCode]="usageCode"
        [importCode]="importCode"
        [examples]="examples"
        [apiProperties]="apiProperties"
        [badges]="badges"
      >
        <!-- Preview Slot -->
        <div slot="preview" class="max-w-sm">
          <lib-card>
            <div class="p-6">
              <div class="flex items-center space-x-4">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
                  <lucide-angular [img]="icons.creditCard" class="h-5 w-5 text-primary-foreground"></lucide-angular>
                </div>
                <div class="space-y-1">
                  <h3 class="text-sm font-medium">Card Title</h3>
                  <p class="text-sm text-muted-foreground">
                    This is a basic card with some example content.
                  </p>
                </div>
              </div>
            </div>
          </lib-card>
        </div>

        <!-- Example: With Header -->
        <div slot="example-header" class="max-w-sm mb-6">
          <lib-card>
            <div class="p-6 pb-4 border-b">
              <h3 class="text-lg font-semibold">Card Header</h3>
              <p class="text-sm text-muted-foreground">Card description goes here</p>
            </div>
            <div class="p-6 pt-4">
              <p>This card has a distinct header section that's separated from the main content.</p>
            </div>
          </lib-card>
        </div>

        <!-- Example: With Footer -->
        <div slot="example-footer" class="max-w-sm mb-6">
          <lib-card>
            <div class="p-6 pb-4">
              <h3 class="text-lg font-semibold">Project Alpha</h3>
              <p class="text-sm text-muted-foreground mt-2">
                A comprehensive redesign of our core platform with improved performance.
              </p>
            </div>
            <div class="p-6 pt-4 border-t bg-muted/50 flex items-center justify-between">
              <lib-badge variant="secondary">In Progress</lib-badge>
              <lib-button size="sm">
                <lucide-angular [img]="icons.settings" class="h-4 w-4 mr-2"></lucide-angular>
                Manage
              </lib-button>
            </div>
          </lib-card>
        </div>

        <!-- Example: Interactive -->
        <div slot="example-interactive" class="max-w-sm mb-6">
          <lib-card class="hover:shadow-lg transition-all cursor-pointer hover:border-primary/50">
            <div class="p-6">
              <div class="flex items-start justify-between">
                <div class="space-y-1">
                  <h3 class="text-lg font-semibold">Interactive Card</h3>
                  <p class="text-sm text-muted-foreground">Hover for subtle animation</p>
                </div>
                <div class="flex items-center space-x-1">
                  <lucide-angular [img]="icons.star" class="h-4 w-4 text-yellow-500"></lucide-angular>
                  <span class="text-sm font-medium">4.8</span>
                </div>
              </div>
              <div class="mt-4 flex items-center justify-between">
                <span class="text-2xl font-bold">$29</span>
                <lib-button size="sm">Select Plan</lib-button>
              </div>
            </div>
          </lib-card>
        </div>

        <!-- Additional Information -->
        <div slot="additional" class="space-y-6">
          <div class="border-t pt-6">
            <h2 class="text-2xl font-semibold mb-4">Design Guidelines</h2>
            <div class="prose prose-gray max-w-none dark:prose-invert">
              <p>
                Cards are flexible containers that follow these design principles:
              </p>
              <ul>
                <li><strong>Grouping:</strong> Related content is visually grouped together</li>
                <li><strong>Hierarchy:</strong> Clear visual hierarchy through typography and spacing</li>
                <li><strong>Scannable:</strong> Information is easy to scan and digest</li>
                <li><strong>Actionable:</strong> Clear call-to-action when interaction is expected</li>
              </ul>
            </div>
          </div>
        </div>
      </app-component-demo-template>
    </lib-documentation>
  `
})
export class DocsCardComponent {
  readonly icons = {
    creditCard: CreditCard,
    star: Star,
    settings: Settings
  } as const;

  readonly usageCode = `<lib-card>
  <div class="p-6">
    <h3 class="text-lg font-semibold">Card Title</h3>
    <p class="text-sm text-muted-foreground">
      Card content goes here
    </p>
  </div>
</lib-card>`;

  readonly importCode = `import { CardComponent } from './lib/components/ui/card.component';`;

  readonly badges = [
    { label: 'Stable', variant: 'default' as const },
    { label: 'Layout', variant: 'secondary' as const }
  ];

  readonly examples: ComponentExample[] = [
    {
      id: 'header',
      title: 'Card with Header',
      description: 'Cards with separated header sections for better content organization.',
      code: `<lib-card>
  <div class="p-6 pb-4 border-b">
    <h3 class="text-lg font-semibold">Card Header</h3>
    <p class="text-sm text-muted-foreground">Card description</p>
  </div>
  <div class="p-6 pt-4">
    <p>Main content goes here</p>
  </div>
</lib-card>`,
      template: ''
    },
    {
      id: 'footer',
      title: 'Card with Footer',
      description: 'Cards with footer sections for actions and metadata.',
      code: `<lib-card>
  <div class="p-6 pb-4">
    <h3 class="text-lg font-semibold">Project Name</h3>
    <p class="text-sm text-muted-foreground">Project description</p>
  </div>
  <div class="p-6 pt-4 border-t bg-muted/50 flex justify-between">
    <lib-badge variant="secondary">Status</lib-badge>
    <lib-button size="sm">Action</lib-button>
  </div>
</lib-card>`,
      template: ''
    },
    {
      id: 'interactive',
      title: 'Interactive Card',
      description: 'Cards that respond to user interaction with hover effects.',
      code: `<lib-card class="hover:shadow-lg transition-all cursor-pointer hover:border-primary/50">
  <div class="p-6">
    <h3 class="text-lg font-semibold">Interactive Card</h3>
    <p class="text-sm text-muted-foreground">Hover for effects</p>
    <div class="mt-4 flex justify-between items-center">
      <span class="text-2xl font-bold">$29</span>
      <lib-button size="sm">Select</lib-button>
    </div>
  </div>
</lib-card>`,
      template: ''
    }
  ];

  readonly apiProperties: ComponentAPI[] = [
    {
      name: 'class',
      type: 'string',
      description: 'Additional CSS classes to apply to the card container.'
    },
    {
      name: 'variant',
      type: '"default" | "outline"',
      default: '"default"',
      description: 'The visual style variant of the card.'
    }
  ];
}