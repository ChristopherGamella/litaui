import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Calendar, User, Settings, Search, Plus, Home, CreditCard } from 'lucide-angular';

// Documentation Template
import { 
  ComponentDemoTemplateComponent, 
  ComponentExample, 
  ComponentAPI 
} from './component-demo-template.component';
import { DocumentationComponent } from '../../../lib/demo/components/documentation.component';

// UI Components
import { 
  CommandComponent,
  CommandInputComponent,
  CommandListComponent,
  CommandEmptyComponent,
  CommandGroupComponent,
  CommandItemComponent,
  CommandSeparatorComponent,
  CommandShortcutComponent,
  CommandDialogComponent
} from '../../../lib/components/ui/command.component';
import { ButtonComponent } from '../../../lib/components/ui/button.component';

/**
 * Command component documentation and demo page
 */
@Component({
  selector: 'app-docs-command',
  imports: [
    CommonModule,
    LucideAngularModule,
    DocumentationComponent,
    ComponentDemoTemplateComponent,
    CommandComponent,
    CommandInputComponent,
    CommandListComponent,
    CommandEmptyComponent,
    CommandGroupComponent,
    CommandItemComponent,
    CommandSeparatorComponent,
    CommandShortcutComponent,
    CommandDialogComponent,
    ButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <lib-documentation currentPageId="command">
      <app-component-demo-template
        componentName="Command"
        description="Fast, composable, unstyled command menu for Angular with search and keyboard navigation."
        version="1.0.0"
        [usageCode]="usageCode"
        [importCode]="importCode"
        [examples]="examples"
        [apiProperties]="apiProperties"
        [badges]="badges"
      >
        <!-- Live Demo Section -->
        <div class="not-prose">
          <div class="p-6 border rounded-lg bg-card">
            <div class="flex justify-center">
              <lib-command class="rounded-lg border shadow-md w-full max-w-[450px]">
                <lib-command-input placeholder="Type a command or search..." />
                <lib-command-list>
                  <lib-command-empty>No results found.</lib-command-empty>
                  
                  <lib-command-group heading="Suggestions">
                    <lib-command-item 
                      value="calendar" 
                      (select)="onDemoCommand('calendar')"
                    >
                      <lucide-angular [img]="icons.calendar" class="mr-2 h-4 w-4"></lucide-angular>
                      <span>Calendar</span>
                    </lib-command-item>
                    
                    <lib-command-item 
                      value="search-emoji" 
                      (select)="onDemoCommand('search-emoji')"
                    >
                      <lucide-angular [img]="icons.search" class="mr-2 h-4 w-4"></lucide-angular>
                      <span>Search Emoji</span>
                    </lib-command-item>
                  </lib-command-group>
                  
                  <lib-command-separator />
                  
                  <lib-command-group heading="Settings">
                    <lib-command-item 
                      value="profile" 
                      (select)="onDemoCommand('profile')"
                    >
                      <lucide-angular [img]="icons.user" class="mr-2 h-4 w-4"></lucide-angular>
                      <span>Profile</span>
                      <lib-command-shortcut>⌘P</lib-command-shortcut>
                    </lib-command-item>
                    
                    <lib-command-item 
                      value="billing" 
                      (select)="onDemoCommand('billing')"
                    >
                      <lucide-angular [img]="icons.creditCard" class="mr-2 h-4 w-4"></lucide-angular>
                      <span>Billing</span>
                      <lib-command-shortcut>⌘B</lib-command-shortcut>
                    </lib-command-item>
                    
                    <lib-command-item 
                      value="settings" 
                      (select)="onDemoCommand('settings')"
                    >
                      <lucide-angular [img]="icons.settings" class="mr-2 h-4 w-4"></lucide-angular>
                      <span>Settings</span>
                      <lib-command-shortcut>⌘S</lib-command-shortcut>
                    </lib-command-item>
                  </lib-command-group>
                </lib-command-list>
              </lib-command>
            </div>
            
            <!-- Demo Command Display -->
            <div class="mt-4 p-3 bg-muted rounded text-center text-sm">
              {{ lastDemoCommand ? 'Last executed: ' + lastDemoCommand : 'Try searching and selecting a command above' }}
            </div>
          </div>
        </div>

        <!-- Command Dialog Demo -->
        <div class="not-prose mt-6">
          <div class="p-6 border rounded-lg bg-card">
            <div class="flex flex-col items-center gap-4">
              <p class="text-sm text-muted-foreground text-center">
                Press <kbd class="px-1.5 py-0.5 text-xs bg-muted rounded border">⌘J</kbd> 
                or click the button below
              </p>
              
              <lib-button 
                variant="outline" 
                (click)="openDialogDemo()"
                class="gap-2"
              >
                <lucide-angular [img]="icons.plus" class="h-4 w-4"></lucide-angular>
                Open Command Dialog
              </lib-button>
            </div>
          </div>

          <!-- Command Dialog Implementation -->
          <lib-command-dialog
            [open]="dialogDemoOpen"
            (openChange)="dialogDemoOpen = $event"
            title="Command Palette"
            description="Search for a command to run..."
          >
            <lib-command-input placeholder="Type a command or search..." />
            <lib-command-list>
              <lib-command-empty>No results found.</lib-command-empty>
              
              <lib-command-group heading="Quick Actions">
                <lib-command-item (select)="handleDialogDemoCommand('new')">
                  <lucide-angular [img]="icons.plus" class="mr-2 h-4 w-4"></lucide-angular>
                  <span>Create New</span>
                  <lib-command-shortcut>⌘N</lib-command-shortcut>
                </lib-command-item>
                
                <lib-command-item (select)="handleDialogDemoCommand('search')">
                  <lucide-angular [img]="icons.search" class="mr-2 h-4 w-4"></lucide-angular>
                  <span>Search</span>
                  <lib-command-shortcut>⌘F</lib-command-shortcut>
                </lib-command-item>
              </lib-command-group>
              
              <lib-command-separator />
              
              <lib-command-group heading="Navigation">
                <lib-command-item (select)="handleDialogDemoCommand('dashboard')">
                  <lucide-angular [img]="icons.home" class="mr-2 h-4 w-4"></lucide-angular>
                  <span>Dashboard</span>
                </lib-command-item>
                
                <lib-command-item (select)="handleDialogDemoCommand('profile')">
                  <lucide-angular [img]="icons.user" class="mr-2 h-4 w-4"></lucide-angular>
                  <span>Profile</span>
                </lib-command-item>
              </lib-command-group>
            </lib-command-list>
          </lib-command-dialog>
        </div>
      </app-component-demo-template>
    </lib-documentation>
  `,
  host: {
    '(keydown)': 'onGlobalKeyDown($event)'
  }
})
export class DocsCommandComponent {
  // Icons for examples
  readonly icons = {
    calendar: Calendar,
    user: User,
    settings: Settings,
    search: Search,
    plus: Plus,
    home: Home,
    creditCard: CreditCard
  } as const;

  // Demo state
  lastDemoCommand: string = '';
  dialogDemoOpen: boolean = false;

  readonly usageCode = `<lib-command class="rounded-lg border shadow-md md:min-w-[450px]">
  <lib-command-input placeholder="Type a command or search..." />
  <lib-command-list>
    <lib-command-empty>No results found.</lib-command-empty>
    
    <lib-command-group heading="Suggestions">
      <lib-command-item value="calendar" (select)="onCommand('calendar')">
        <lucide-angular name="calendar" class="mr-2 h-4 w-4"></lucide-angular>
        <span>Calendar</span>
      </lib-command-item>
    </lib-command-group>
  </lib-command-list>
</lib-command>`;

  readonly importCode = `import { 
  CommandComponent,
  CommandInputComponent,
  CommandListComponent,
  CommandEmptyComponent,
  CommandGroupComponent,
  CommandItemComponent,
  CommandSeparatorComponent,
  CommandShortcutComponent,
  CommandDialogComponent
} from './lib/components/ui/command.component';`;

  readonly badges = [
    { label: 'Stable', variant: 'default' as const },
    { label: 'Accessible', variant: 'secondary' as const },
    { label: 'Keyboard Navigation', variant: 'outline' as const }
  ];

  readonly examples: ComponentExample[] = [
    {
      id: 'basic',
      title: 'Basic Command Palette',
      description: 'A simple command palette with search and grouped items.',
      code: `<lib-command>
  <lib-command-input placeholder="Search commands..." />
  <lib-command-list>
    <lib-command-empty>No results found.</lib-command-empty>
    
    <lib-command-group heading="Actions">
      <lib-command-item value="new-file" (select)="createFile()">
        <lucide-angular name="file-plus" class="mr-2 h-4 w-4"></lucide-angular>
        <span>New File</span>
        <lib-command-shortcut>⌘N</lib-command-shortcut>
      </lib-command-item>
      
      <lib-command-item value="save" (select)="saveFile()">
        <lucide-angular name="save" class="mr-2 h-4 w-4"></lucide-angular>
        <span>Save</span>
        <lib-command-shortcut>⌘S</lib-command-shortcut>
      </lib-command-item>
    </lib-command-group>
  </lib-command-list>
</lib-command>`,
      template: ''
    },
    {
      id: 'dialog',
      title: 'Command Dialog',
      description: 'Modal command palette with global keyboard shortcuts.',
      code: `<!-- Trigger -->
<lib-button (click)="openCommandPalette()">
  Open Command Palette
  <kbd class="ml-2 px-1.5 py-0.5 text-xs bg-muted rounded">⌘K</kbd>
</lib-button>

<!-- Dialog -->
<lib-command-dialog
  [open]="isOpen()"
  (openChange)="handleOpenChange($event)"
  title="Command Palette"
  description="Search for commands and actions..."
>
  <lib-command-input placeholder="What do you want to do?" />
  <lib-command-list>
    <lib-command-empty>No commands found.</lib-command-empty>
    
    <lib-command-group heading="Quick Actions">
      <lib-command-item (select)="executeCommand('create')">
        <lucide-angular name="plus" class="mr-2 h-4 w-4"></lucide-angular>
        <span>Create New</span>
      </lib-command-item>
    </lib-command-group>
  </lib-command-list>
</lib-command-dialog>`,
      template: ''
    },
    {
      id: 'filtering',
      title: 'Custom Search Keywords',
      description: 'Add custom keywords for better search discoverability.',
      code: `<lib-command-item 
  value="user-profile"
  data-keywords="account settings preferences user profile"
  (select)="openProfile()"
>
  <lucide-angular name="user" class="mr-2 h-4 w-4"></lucide-angular>
  <span>Profile</span>
</lib-command-item>

<lib-command-item 
  value="billing-settings"
  data-keywords="payment subscription billing invoice"
  (select)="openBilling()"
>
  <lucide-angular name="credit-card" class="mr-2 h-4 w-4"></lucide-angular>
  <span>Billing</span>
</lib-command-item>`,
      template: ''
    },
    {
      id: 'disabled',
      title: 'Disabled Commands',
      description: 'Show unavailable commands in a disabled state.',
      code: `<lib-command-group heading="File">
  <lib-command-item value="save" (select)="save()">
    <lucide-angular name="save" class="mr-2 h-4 w-4"></lucide-angular>
    <span>Save</span>
  </lib-command-item>
  
  <lib-command-item 
    value="save-as" 
    [disabled]="!hasUnsavedChanges()"
    (select)="saveAs()"
  >
    <lucide-angular name="save-as" class="mr-2 h-4 w-4"></lucide-angular>
    <span>Save As...</span>
  </lib-command-item>
</lib-command-group>`,
      template: ''
    },
    {
      id: 'separators',
      title: 'Visual Separators',
      description: 'Use separators to create visual groups.',
      code: `<lib-command-list>
  <lib-command-group heading="File">
    <lib-command-item value="new">New File</lib-command-item>
    <lib-command-item value="open">Open File</lib-command-item>
  </lib-command-group>
  
  <lib-command-separator />
  
  <lib-command-group heading="Edit">
    <lib-command-item value="undo">Undo</lib-command-item>
    <lib-command-item value="redo">Redo</lib-command-item>
  </lib-command-group>
</lib-command-list>`,
      template: ''
    },
    {
      id: 'global-shortcuts',
      title: 'Global Keyboard Shortcuts',
      description: 'Implement global shortcuts to trigger the command palette.',
      code: `@Component({
  host: {
    '(keydown)': 'onGlobalKeyDown($event)'
  }
})
export class MyComponent {
  isCommandOpen = signal(false);

  onGlobalKeyDown(event: KeyboardEvent): void {
    // ⌘K or Ctrl+K to toggle command palette
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.isCommandOpen.update(open => !open);
    }
    
    // ⌘J for different command palette
    if ((event.metaKey || event.ctrlKey) && event.key === 'j') {
      event.preventDefault();
      this.openQuickActions();
    }
  }
}`,
      template: ''
    }
  ];

  readonly apiProperties: ComponentAPI[] = [
    // CommandComponent
    {
      name: 'CommandComponent',
      type: 'Component',
      description: 'Main command palette container with search filtering.'
    },
    {
      name: 'variant',
      type: '"default"',
      default: '"default"',
      description: 'Visual variant of the command palette.'
    },
    {
      name: 'shouldFilter',
      type: 'boolean',
      default: 'true',
      description: 'Enable/disable automatic search filtering.'
    },
    
    // CommandInputComponent  
    {
      name: 'CommandInputComponent',
      type: 'Component',
      description: 'Search input with auto-focus and filtering.'
    },
    {
      name: 'placeholder',
      type: 'string',
      default: '"Search..."',
      description: 'Input placeholder text.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the input is disabled.'
    },
    {
      name: 'valueChange',
      type: 'EventEmitter<string>',
      description: 'Emitted when search value changes.'
    },
    
    // CommandItemComponent
    {
      name: 'CommandItemComponent',
      type: 'Component',
      description: 'Individual selectable command item.'
    },
    {
      name: 'value',
      type: 'string',
      default: '""',
      description: 'Item value for search matching.'
    },
    {
      name: 'disabled',
      type: 'boolean',
      default: 'false',
      description: 'Whether the item is disabled.'
    },
    {
      name: 'selected',
      type: 'boolean',
      default: 'false',
      description: 'Whether the item is selected.'
    },
    {
      name: 'select',
      type: 'EventEmitter<void>',
      description: 'Emitted when item is selected.'
    },
    
    // CommandGroupComponent
    {
      name: 'CommandGroupComponent',
      type: 'Component',
      description: 'Container for grouped command items.'
    },
    {
      name: 'heading',
      type: 'string',
      description: 'Group heading text.'
    },
    
    // CommandDialogComponent
    {
      name: 'CommandDialogComponent',
      type: 'Component',
      description: 'Modal dialog wrapper for command palette.'
    },
    {
      name: 'open',
      type: 'boolean',
      default: 'false',
      description: 'Whether the dialog is open.'
    },
    {
      name: 'title',
      type: 'string',
      default: '"Command Palette"',
      description: 'Dialog title.'
    },
    {
      name: 'description',
      type: 'string',
      default: '"Search for a command to run..."',
      description: 'Dialog description.'
    },
    {
      name: 'openChange',
      type: 'EventEmitter<boolean>',
      description: 'Emitted when open state changes.'
    }
  ];

  /**
   * Handle demo command selection
   */
  onDemoCommand(command: string): void {
    this.lastDemoCommand = command;
    console.log('Demo command selected:', command);
  }

  /**
   * Handle dialog demo command selection
   */
  handleDialogDemoCommand(command: string): void {
    this.lastDemoCommand = command;
    this.dialogDemoOpen = false;
    console.log('Dialog demo command selected:', command);
  }

  /**
   * Open the dialog demo
   */
  openDialogDemo(): void {
    this.dialogDemoOpen = true;
  }

  /**
   * Handle global keyboard shortcuts for demo
   */
  onGlobalKeyDown(event: KeyboardEvent): void {
    // Command+J or Ctrl+J to toggle command dialog demo
    if ((event.metaKey || event.ctrlKey) && event.key === 'j') {
      event.preventDefault();
      this.dialogDemoOpen = !this.dialogDemoOpen;
    }
  }
}