import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Calculator, Calendar, CreditCard, Settings, Smile, User, Command as CommandIcon } from 'lucide-angular';
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
} from '../../components/ui/command.component';
import { ButtonComponent } from '../../components/ui/button.component';

/**
 * Command Demo Component
 * Comprehensive demonstration of Command component features
 */
@Component({
  selector: 'lib-command-demo',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
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
  template: `
    <div class="space-y-8">
      <!-- Basic Command Demo -->
      <section>
        <h3 class="text-lg font-semibold mb-4">Basic Command Palette</h3>
        <div class="flex justify-center">
          <lib-command class="rounded-lg border shadow-md w-full max-w-[450px]">
            <lib-command-input placeholder="Type a command or search..." />
            <lib-command-list>
              <lib-command-empty>No results found.</lib-command-empty>
              
              <lib-command-group heading="Suggestions">
                <lib-command-item 
                  value="calendar" 
                  icon="calendar"
                  (select)="onCommandSelect('calendar')"
                >
                  <lucide-icon name="calendar" class="mr-2 h-4 w-4"></lucide-icon>
                  <span>Calendar</span>
                </lib-command-item>
                
                <lib-command-item 
                  value="search-emoji" 
                  icon="smile"
                  (select)="onCommandSelect('search-emoji')"
                >
                  <lucide-icon name="smile" class="mr-2 h-4 w-4"></lucide-icon>
                  <span>Search Emoji</span>
                </lib-command-item>
                
                <lib-command-item 
                  value="calculator" 
                  icon="calculator"
                  [disabled]="true"
                  (select)="onCommandSelect('calculator')"
                >
                  <lucide-icon name="calculator" class="mr-2 h-4 w-4"></lucide-icon>
                  <span>Calculator</span>
                </lib-command-item>
              </lib-command-group>
              
              <lib-command-separator />
              
              <lib-command-group heading="Settings">
                <lib-command-item 
                  value="profile" 
                  icon="user"
                  shortcut="⌘P"
                  (select)="onCommandSelect('profile')"
                >
                  <lucide-icon name="user" class="mr-2 h-4 w-4"></lucide-icon>
                  <span>Profile</span>
                  <lib-command-shortcut>⌘P</lib-command-shortcut>
                </lib-command-item>
                
                <lib-command-item 
                  value="billing" 
                  icon="credit-card"
                  shortcut="⌘B"
                  (select)="onCommandSelect('billing')"
                >
                  <lucide-icon name="credit-card" class="mr-2 h-4 w-4"></lucide-icon>
                  <span>Billing</span>
                  <lib-command-shortcut>⌘B</lib-command-shortcut>
                </lib-command-item>
                
                <lib-command-item 
                  value="settings" 
                  icon="settings"
                  shortcut="⌘S"
                  (select)="onCommandSelect('settings')"
                >
                  <lucide-icon name="settings" class="mr-2 h-4 w-4"></lucide-icon>
                  <span>Settings</span>
                  <lib-command-shortcut>⌘S</lib-command-shortcut>
                </lib-command-item>
              </lib-command-group>
            </lib-command-list>
          </lib-command>
        </div>
      </section>

      <!-- Command Dialog Demo -->
      <section>
        <h3 class="text-lg font-semibold mb-4">Command Dialog</h3>
        <div class="flex flex-col items-center gap-4">
          <p class="text-sm text-muted-foreground text-center">
            Press <kbd class="px-1.5 py-0.5 text-xs bg-muted rounded border">⌘J</kbd> 
            or click the button below to open the command dialog
          </p>
          
          <lib-button 
            variant="outline" 
            (click)="openDialog()"
            class="gap-2"
          >
            <lucide-icon name="command" class="h-4 w-4"></lucide-icon>
            Open Command Dialog
          </lib-button>

          <!-- Command Dialog -->
          <lib-command-dialog
            [open]="dialogOpen()"
            (openChange)="dialogOpen.set($event)"
            title="Command Palette"
            description="Search for a command to run..."
          >
            <lib-command-input placeholder="Type a command or search..." />
            <lib-command-list>
              <lib-command-empty>No results found.</lib-command-empty>
              
              <lib-command-group heading="Suggestions">
                <lib-command-item 
                  value="calendar" 
                  (select)="handleDialogCommand('calendar')"
                >
                  <lucide-icon name="calendar" class="mr-2 h-4 w-4"></lucide-icon>
                  <span>Calendar</span>
                </lib-command-item>
                
                <lib-command-item 
                  value="search-emoji" 
                  (select)="handleDialogCommand('search-emoji')"
                >
                  <lucide-icon name="smile" class="mr-2 h-4 w-4"></lucide-icon>
                  <span>Search Emoji</span>
                </lib-command-item>
                
                <lib-command-item 
                  value="calculator" 
                  (select)="handleDialogCommand('calculator')"
                >
                  <lucide-icon name="calculator" class="mr-2 h-4 w-4"></lucide-icon>
                  <span>Calculator</span>
                </lib-command-item>
              </lib-command-group>
              
              <lib-command-separator />
              
              <lib-command-group heading="Settings">
                <lib-command-item 
                  value="profile" 
                  (select)="handleDialogCommand('profile')"
                >
                  <lucide-icon name="user" class="mr-2 h-4 w-4"></lucide-icon>
                  <span>Profile</span>
                  <lib-command-shortcut>⌘P</lib-command-shortcut>
                </lib-command-item>
                
                <lib-command-item 
                  value="billing" 
                  (select)="handleDialogCommand('billing')"
                >
                  <lucide-icon name="credit-card" class="mr-2 h-4 w-4"></lucide-icon>
                  <span>Billing</span>
                  <lib-command-shortcut>⌘B</lib-command-shortcut>
                </lib-command-item>
                
                <lib-command-item 
                  value="settings" 
                  (select)="handleDialogCommand('settings')"
                >
                  <lucide-icon name="settings" class="mr-2 h-4 w-4"></lucide-icon>
                  <span>Settings</span>
                  <lib-command-shortcut>⌘S</lib-command-shortcut>
                </lib-command-item>
              </lib-command-group>
            </lib-command-list>
          </lib-command-dialog>
        </div>
      </section>

      <!-- Results Display -->
      <section>
        <h3 class="text-lg font-semibold mb-4">Last Command</h3>
        <div class="p-4 bg-muted rounded-lg">
          <p class="text-sm">
            {{ lastCommand() ? 'Last executed: ' + lastCommand() : 'No command executed yet' }}
          </p>
        </div>
      </section>

      <!-- Usage Instructions -->
      <section>
        <h3 class="text-lg font-semibold mb-4">Keyboard Navigation</h3>
        <div class="space-y-2 text-sm text-muted-foreground">
          <div class="flex items-center gap-2">
            <kbd class="px-1.5 py-0.5 text-xs bg-muted rounded border">↑ ↓</kbd>
            <span>Navigate through items</span>
          </div>
          <div class="flex items-center gap-2">
            <kbd class="px-1.5 py-0.5 text-xs bg-muted rounded border">Enter</kbd>
            <span>Select highlighted item</span>
          </div>
          <div class="flex items-center gap-2">
            <kbd class="px-1.5 py-0.5 text-xs bg-muted rounded border">Esc</kbd>
            <span>Clear selection</span>
          </div>
          <div class="flex items-center gap-2">
            <kbd class="px-1.5 py-0.5 text-xs bg-muted rounded border">⌘J</kbd>
            <span>Open/close command dialog</span>
          </div>
        </div>
      </section>
    </div>
  `,
  host: {
    '(keydown)': 'onGlobalKeyDown($event)'
  }
})
export class CommandDemoComponent {
  // State
  readonly dialogOpen = signal(false);
  readonly lastCommand = signal<string>('');

  /**
   * Handle command selection
   */
  onCommandSelect(command: string): void {
    this.lastCommand.set(command);
    console.log('Command selected:', command);
  }

  /**
   * Handle dialog command selection
   */
  handleDialogCommand(command: string): void {
    this.lastCommand.set(command);
    this.dialogOpen.set(false);
    console.log('Dialog command selected:', command);
  }

  /**
   * Open the command dialog
   */
  openDialog(): void {
    this.dialogOpen.set(true);
  }

  /**
   * Handle global keyboard shortcuts
   */
  onGlobalKeyDown(event: KeyboardEvent): void {
    // Command+J or Ctrl+J to toggle command dialog
    if ((event.metaKey || event.ctrlKey) && event.key === 'j') {
      event.preventDefault();
      this.dialogOpen.update(open => !open);
    }
  }
}