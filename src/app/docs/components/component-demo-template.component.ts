import { 
  Component, 
  input,
  signal,
  computed,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Code2, Palette, Zap } from 'lucide-angular';

// UI Components
import { BadgeComponent } from '../../../lib/components/ui/badge.component';
import { CardComponent } from '../../../lib/components/ui/card.component';
import { TabsComponent, TabItem } from '../../../lib/components/ui/tabs.component';
import { CodeBlockComponent } from '../../components/code-block.component';

export interface ComponentExample {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly code: string;
  readonly template: string;
}

export interface ComponentAPI {
  readonly name: string;
  readonly type: string;
  readonly default?: string;
  readonly description: string;
  readonly required?: boolean;
}

/**
 * Reusable component demo template for consistent documentation
 * Provides standardized sections for preview, code, API, and examples
 */
@Component({
  selector: 'app-component-demo-template',
  imports: [
    CommonModule,
    LucideAngularModule,
    BadgeComponent,
    CardComponent,
    TabsComponent,
    CodeBlockComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-8">
      <!-- Component Header -->
      <div class="space-y-4">
        <div class="flex items-center gap-3">
          <h1 class="text-3xl font-bold tracking-tight">{{ componentName() }}</h1>
          @if (version()) {
            <lib-badge variant="secondary">{{ version() }}</lib-badge>
          }
        </div>
        
        @if (description()) {
          <p class="text-xl text-muted-foreground">{{ description() }}</p>
        }

        @if (badges().length > 0) {
          <div class="flex flex-wrap gap-2">
            @for (badge of badges(); track badge.label) {
              <lib-badge [variant]="badge.variant || 'outline'" size="sm">
                {{ badge.label }}
              </lib-badge>
            }
          </div>
        }
      </div>

      <!-- Quick Example Section -->
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold">Preview</h2>
        <lib-card>
          <div class="p-8 min-h-[200px] bg-gradient-to-br from-background to-muted/20">
            <ng-content select="[slot=preview]"></ng-content>
          </div>
        </lib-card>
      </div>

      <!-- Code Tabs Section -->
      <div class="space-y-4">
        <h2 class="text-2xl font-semibold">Installation & Usage</h2>
        <lib-tabs 
          [tabs]="codeTabs()" 
          [activeTab]="activeCodeTab()"
          (activeTabChange)="setActiveCodeTab($event)">
          
          <div [attr.data-tab]="'usage'" class="space-y-4">
            <app-code-block
              [code]="usageCode()"
              language="html"
              title="Basic Usage"
            />
          </div>

          <div [attr.data-tab]="'import'" class="space-y-4">
            <app-code-block
              [code]="importCode()"
              language="typescript"
              title="Import Statement"
            />
          </div>

          @if (installationCode()) {
            <div [attr.data-tab]="'install'" class="space-y-4">
              <app-code-block
                [code]="installationCode()!"
                language="bash"
                title="Installation"
              />
            </div>
          }
        </lib-tabs>
      </div>

      <!-- Examples Section -->
      @if (examples().length > 0) {
        <div class="space-y-6">
          <h2 class="text-2xl font-semibold">Examples</h2>
          @for (example of examples(); track example.id) {
            <div class="space-y-4">
              <div>
                <h3 class="text-lg font-semibold">{{ example.title }}</h3>
                @if (example.description) {
                  <p class="text-muted-foreground">{{ example.description }}</p>
                }
              </div>
              
              <lib-card>
                <div class="p-6 border-b">
                  <ng-content [select]="'[slot=example-' + example.id + ']'"></ng-content>
                </div>
                <div class="bg-muted/50">
                  <app-code-block
                    [code]="example.code"
                    language="html"
                    title="Code"
                  />
                </div>
              </lib-card>
            </div>
          }
        </div>
      }

      <!-- API Reference Section -->
      @if (apiProperties().length > 0) {
        <div class="space-y-4">
          <h2 class="text-2xl font-semibold">API Reference</h2>
          <lib-card>
            <div class="p-6">
              <h3 class="text-lg font-semibold mb-4">{{ componentName() }} Properties</h3>
              <div class="overflow-x-auto">
                <table class="w-full text-sm">
                  <thead>
                    <tr class="border-b">
                      <th class="text-left py-2 pr-4 font-medium">Property</th>
                      <th class="text-left py-2 pr-4 font-medium">Type</th>
                      <th class="text-left py-2 pr-4 font-medium">Default</th>
                      <th class="text-left py-2 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    @for (prop of apiProperties(); track prop.name) {
                      <tr class="border-b border-border/50">
                        <td class="py-3 pr-4">
                          <code class="text-xs bg-muted px-1.5 py-0.5 rounded">{{ prop.name }}</code>
                          @if (prop.required) {
                            <span class="text-destructive text-xs ml-1">*</span>
                          }
                        </td>
                        <td class="py-3 pr-4">
                          <code class="text-xs bg-muted px-1.5 py-0.5 rounded">{{ prop.type }}</code>
                        </td>
                        <td class="py-3 pr-4 text-muted-foreground">
                          @if (prop.default) {
                            <code class="text-xs">{{ prop.default }}</code>
                          } @else {
                            <span class="text-xs">-</span>
                          }
                        </td>
                        <td class="py-3 text-muted-foreground">{{ prop.description }}</td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </lib-card>
        </div>
      }
    </div>
  `,
  styles: [`
    pre {
      font-family: 'SF Mono', Monaco, Inconsolata, 'Roboto Mono', Consolas, 'Courier New', monospace;
    }

    table {
      border-collapse: collapse;
    }

    [data-tab] {
      display: none;
    }

    [data-tab][data-active="true"] {
      display: block;
    }
  `]
})
export class ComponentDemoTemplateComponent {
  // Input signals following Angular 20+ standards
  componentName = input<string>('');
  description = input<string>('');
  version = input<string>('');
  usageCode = input<string>('');
  importCode = input<string>('');
  installationCode = input<string | null>(null);
  examples = input<ComponentExample[]>([]);
  apiProperties = input<ComponentAPI[]>([]);
  badges = input<{ label: string; variant?: 'default' | 'secondary' | 'destructive' | 'outline' }[]>([]);

  // Icons - readonly for performance
  readonly icons = {
    code: Code2,
    palette: Palette,
    zap: Zap
  } as const;

  // Private state signals
  private readonly _activeCodeTab = signal('usage');

  // Public readonly signals
  readonly activeCodeTab = this._activeCodeTab.asReadonly();

  // Computed properties following Angular 20+ standards
  readonly codeTabs = computed<TabItem[]>(() => {
    const tabs: TabItem[] = [
      { id: 'usage', label: 'Usage', icon: this.icons.code },
      { id: 'import', label: 'Import', icon: this.icons.zap }
    ];

    if (this.installationCode()) {
      tabs.push({ id: 'install', label: 'Install', icon: this.icons.palette });
    }

    return tabs;
  });

  setActiveCodeTab(tabId: string): void {
    this._activeCodeTab.set(tabId);
  }
}