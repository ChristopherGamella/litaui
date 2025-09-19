# Command Component

A fast, composable, unstyled command menu for Angular. Built on top of modern Angular features with full keyboard navigation and search capabilities.

## Features

- 🔍 **Real-time Search** - Instant filtering as you type
- ⌨️ **Keyboard Navigation** - Full arrow key support with visual feedback
- 🏗️ **Composable** - Build complex command interfaces with simple building blocks
- ♿ **Accessible** - WCAG 2.1 AA compliant with proper ARIA attributes
- 🎨 **Themeable** - Consistent with shadcn/ui design system
- 📱 **Responsive** - Works great on desktop and mobile
- 🚀 **Modern Angular** - Built with signals, standalone components, and latest features

## Installation

The Command component is included in the shadcn-angular library:

```bash
npm install shadcn-angular lucide-angular class-variance-authority clsx tailwind-merge
```

## Components

| Component | Description |
|-----------|-------------|
| `CommandComponent` | Main command palette container |
| `CommandInputComponent` | Search input with filtering |
| `CommandListComponent` | Scrollable list container |
| `CommandEmptyComponent` | No results state |
| `CommandGroupComponent` | Grouped items with headings |
| `CommandItemComponent` | Individual selectable items |
| `CommandSeparatorComponent` | Visual dividers |
| `CommandShortcutComponent` | Keyboard shortcut display |
| `CommandDialogComponent` | Modal dialog wrapper |

## Basic Usage

```typescript
import { Component } from '@angular/core';
import { 
  CommandComponent,
  CommandInputComponent,
  CommandListComponent,
  CommandEmptyComponent,
  CommandGroupComponent,
  CommandItemComponent,
  CommandSeparatorComponent,
  CommandShortcutComponent
} from 'shadcn-angular';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [
    CommandComponent,
    CommandInputComponent,
    CommandListComponent,
    CommandEmptyComponent,
    CommandGroupComponent,
    CommandItemComponent,
    CommandSeparatorComponent,
    CommandShortcutComponent
  ],
  template: `
    <lib-command class="rounded-lg border shadow-md md:min-w-[450px]">
      <lib-command-input placeholder="Type a command or search..." />
      <lib-command-list>
        <lib-command-empty>No results found.</lib-command-empty>
        
        <lib-command-group heading="Suggestions">
          <lib-command-item 
            value="calendar" 
            (select)="onCommand('calendar')"
          >
            <lucide-icon name="calendar" class="mr-2 h-4 w-4"></lucide-icon>
            <span>Calendar</span>
          </lib-command-item>
          
          <lib-command-item 
            value="search-emoji" 
            (select)="onCommand('search-emoji')"
          >
            <lucide-icon name="smile" class="mr-2 h-4 w-4"></lucide-icon>
            <span>Search Emoji</span>
          </lib-command-item>
        </lib-command-group>
        
        <lib-command-separator />
        
        <lib-command-group heading="Settings">
          <lib-command-item 
            value="profile" 
            (select)="onCommand('profile')"
          >
            <lucide-icon name="user" class="mr-2 h-4 w-4"></lucide-icon>
            <span>Profile</span>
            <lib-command-shortcut>⌘P</lib-command-shortcut>
          </lib-command-item>
        </lib-command-group>
      </lib-command-list>
    </lib-command>
  `
})
export class ExampleComponent {
  onCommand(command: string): void {
    console.log('Command selected:', command);
  }
}
```

## Command Dialog

For a modal command palette experience:

```typescript
import { Component, signal } from '@angular/core';
import { CommandDialogComponent } from 'shadcn-angular';

@Component({
  selector: 'app-command-dialog-example',
  template: `
    <!-- Trigger Button -->
    <lib-button 
      variant="outline" 
      (click)="openCommand()"
      class="gap-2"
    >
      <lucide-icon name="command" class="h-4 w-4"></lucide-icon>
      Open Command Palette
      <kbd class="ml-auto px-1.5 py-0.5 text-xs bg-muted rounded">⌘K</kbd>
    </lib-button>

    <!-- Command Dialog -->
    <lib-command-dialog
      [open]="isOpen()"
      (openChange)="handleOpenChange($event)"
      title="Command Palette"
      description="Search for actions and commands..."
    >
      <lib-command-input placeholder="What do you want to do?" />
      <lib-command-list>
        <lib-command-empty>No commands found.</lib-command-empty>
        
        <lib-command-group heading="Quick Actions">
          <lib-command-item (select)="createNew()">
            <lucide-icon name="plus" class="mr-2 h-4 w-4"></lucide-icon>
            <span>Create New</span>
            <lib-command-shortcut>⌘N</lib-command-shortcut>
          </lib-command-item>
        </lib-command-group>
      </lib-command-list>
    </lib-command-dialog>
  `,
  host: {
    '(keydown)': 'onGlobalKeyDown($event)'
  }
})
export class CommandDialogExampleComponent {
  readonly isOpen = signal(false);

  openCommand(): void {
    this.isOpen.set(true);
  }

  handleOpenChange(open: boolean): void {
    this.isOpen.set(open);
  }

  onGlobalKeyDown(event: KeyboardEvent): void {
    // ⌘K or Ctrl+K to open command palette
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();
      this.isOpen.update(open => !open);
    }
  }

  createNew(): void {
    console.log('Creating new item...');
    this.isOpen.set(false);
  }
}
```

## API Reference

### CommandComponent

Main container for the command palette.

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default'` | `'default'` | Visual variant |
| `filter` | `string` | `''` | Custom filter function |
| `shouldFilter` | `boolean` | `true` | Enable/disable search filtering |

#### Methods
| Method | Description |
|--------|-------------|
| `focusInput()` | Focus the command input |
| `clear()` | Clear search and reset state |

### CommandInputComponent

Search input with auto-focus and filtering.

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `placeholder` | `string` | `'Search...'` | Input placeholder text |
| `disabled` | `boolean` | `false` | Disable the input |

#### Events
| Event | Type | Description |
|-------|------|-------------|
| `valueChange` | `string` | Emitted when search value changes |
| `keydown` | `KeyboardEvent` | Emitted on keydown events |

### CommandItemComponent

Individual selectable command item.

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | `''` | Item value for search matching |
| `disabled` | `boolean` | `false` | Disable the item |
| `selected` | `boolean` | `false` | Selected state |
| `icon` | `string` | `undefined` | Lucide icon name |
| `shortcut` | `string` | `undefined` | Keyboard shortcut display |

#### Events
| Event | Type | Description |
|-------|------|-------------|
| `select` | `void` | Emitted when item is selected |

### CommandGroupComponent

Container for grouped command items.

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heading` | `string` | `undefined` | Group heading text |

### CommandDialogComponent

Modal dialog wrapper for command palette.

#### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Dialog open state |
| `title` | `string` | `'Command Palette'` | Dialog title |
| `description` | `string` | `'Search for a command to run...'` | Dialog description |
| `showCloseButton` | `boolean` | `true` | Show close button |
| `closeOnOverlayClick` | `boolean` | `true` | Close on overlay click |
| `closeOnEscape` | `boolean` | `true` | Close on escape key |

#### Events
| Event | Type | Description |
|-------|------|-------------|
| `openChange` | `boolean` | Emitted when open state changes |

## Keyboard Navigation

The Command component provides comprehensive keyboard navigation:

| Key | Action |
|-----|--------|
| `↑` / `↓` | Navigate through items |
| `Enter` | Select highlighted item |
| `Escape` | Clear selection or close dialog |
| `Home` | Go to first item |
| `End` | Go to last item |
| `⌘K` / `Ctrl+K` | Toggle command dialog (when implemented) |

## Search Filtering

The search functionality works across:

- Item `value` property
- Item text content
- Custom keywords (via `data-keywords` attribute)

### Custom Keywords

Add searchable keywords to items:

```html
<lib-command-item 
  value="profile"
  data-keywords="user account settings preferences"
  (select)="openProfile()"
>
  <span>Profile</span>
</lib-command-item>
```

## Styling

The Command component uses consistent design tokens:

```css
/* Custom styling example */
.my-command {
  --command-border: hsl(var(--border));
  --command-background: hsl(var(--popover));
  --command-foreground: hsl(var(--popover-foreground));
}
```

### CSS Variables

| Variable | Description |
|----------|-------------|
| `--border` | Border color |
| `--popover` | Background color |
| `--popover-foreground` | Text color |
| `--muted-foreground` | Muted text color |
| `--accent` | Highlight color |
| `--accent-foreground` | Highlight text color |

## Advanced Examples

### Recent Commands

Track and display recently used commands:

```typescript
@Component({
  template: `
    <lib-command>
      <lib-command-input placeholder="Search commands..." />
      <lib-command-list>
        <lib-command-empty>No results found.</lib-command-empty>
        
        <!-- Recent Commands -->
        <lib-command-group 
          *ngIf="recentCommands().length > 0" 
          heading="Recent"
        >
          <lib-command-item 
            *ngFor="let cmd of recentCommands()" 
            [value]="cmd.value"
            (select)="executeCommand(cmd)"
          >
            <lucide-icon [name]="cmd.icon" class="mr-2 h-4 w-4"></lucide-icon>
            <span>{{ cmd.label }}</span>
          </lib-command-item>
        </lib-command-group>
        
        <lib-command-separator *ngIf="recentCommands().length > 0" />
        
        <!-- All Commands -->
        <lib-command-group heading="All Commands">
          <!-- ... other commands -->
        </lib-command-group>
      </lib-command-list>
    </lib-command>
  `
})
export class AdvancedCommandComponent {
  readonly recentCommands = signal([
    { value: 'dashboard', label: 'Dashboard', icon: 'home' },
    { value: 'profile', label: 'Profile', icon: 'user' }
  ]);

  executeCommand(command: any): void {
    // Execute command logic
    console.log('Executing:', command);
    
    // Add to recent commands
    this.addToRecent(command);
  }

  private addToRecent(command: any): void {
    const recent = this.recentCommands();
    const exists = recent.findIndex(cmd => cmd.value === command.value);
    
    if (exists >= 0) {
      recent.splice(exists, 1);
    }
    
    recent.unshift(command);
    
    // Keep only last 5
    if (recent.length > 5) {
      recent.splice(5);
    }
    
    this.recentCommands.set([...recent]);
  }
}
```

### Dynamic Commands

Load commands dynamically from an API:

```typescript
@Component({
  template: `
    <lib-command>
      <lib-command-input 
        placeholder="Search files, commands, and more..."
        (valueChange)="onSearchChange($event)"
      />
      <lib-command-list>
        <lib-command-empty>
          {{ isLoading() ? 'Searching...' : 'No results found.' }}
        </lib-command-empty>
        
        <!-- Files -->
        <lib-command-group 
          *ngIf="searchResults().files.length > 0" 
          heading="Files"
        >
          <lib-command-item 
            *ngFor="let file of searchResults().files" 
            [value]="file.name"
            (select)="openFile(file)"
          >
            <lucide-icon name="file" class="mr-2 h-4 w-4"></lucide-icon>
            <span>{{ file.name }}</span>
          </lib-command-item>
        </lib-command-group>
        
        <!-- Commands -->
        <lib-command-group 
          *ngIf="searchResults().commands.length > 0" 
          heading="Commands"
        >
          <lib-command-item 
            *ngFor="let cmd of searchResults().commands" 
            [value]="cmd.name"
            (select)="executeCommand(cmd)"
          >
            <lucide-icon [name]="cmd.icon" class="mr-2 h-4 w-4"></lucide-icon>
            <span>{{ cmd.name }}</span>
            <lib-command-shortcut *ngIf="cmd.shortcut">
              {{ cmd.shortcut }}
            </lib-command-shortcut>
          </lib-command-item>
        </lib-command-group>
      </lib-command-list>
    </lib-command>
  `
})
export class DynamicCommandComponent {
  readonly isLoading = signal(false);
  readonly searchResults = signal({ files: [], commands: [] });

  async onSearchChange(query: string): Promise<void> {
    if (!query.trim()) {
      this.searchResults.set({ files: [], commands: [] });
      return;
    }

    this.isLoading.set(true);
    
    try {
      const results = await this.searchService.search(query);
      this.searchResults.set(results);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  openFile(file: any): void {
    // Open file logic
  }

  executeCommand(command: any): void {
    // Execute command logic
  }
}
```

## Accessibility

The Command component implements comprehensive accessibility features:

### ARIA Attributes

- `role="combobox"` on the main container
- `role="listbox"` on the command list
- `role="option"` on command items
- `aria-selected` for highlighted items
- `aria-expanded` for the combobox state

### Screen Reader Support

- Proper labeling and descriptions
- Live regions for search results
- Keyboard navigation announcements

### Focus Management

- Auto-focus on input when opened
- Visual focus indicators
- Focus trapping in dialog mode

## Best Practices

1. **Keep Commands Organized**: Use groups to organize related commands
2. **Provide Shortcuts**: Add keyboard shortcuts for frequently used commands
3. **Use Icons**: Visual icons help users quickly identify commands
4. **Implement Search Keywords**: Add searchable keywords for better discoverability
5. **Handle Loading States**: Show loading indicators for async operations
6. **Preserve Recent Commands**: Track and display recently used commands
7. **Global Shortcuts**: Implement global keyboard shortcuts (⌘K)
8. **Mobile Considerations**: Ensure the command palette works well on touch devices

## Troubleshooting

### Common Issues

**Search not working**
- Ensure `shouldFilter` is set to `true` (default)
- Check that items have proper `value` attributes
- Verify search terms match item content

**Keyboard navigation not working**
- Make sure the command component has focus
- Check that items are not disabled
- Ensure proper ARIA attributes are present

**Styling issues**
- Verify CSS custom properties are properly defined
- Check that Tailwind classes are being applied
- Ensure theme tokens are configured correctly

### Performance Optimization

For large command lists:

```typescript
// Use trackBy for better performance
@Component({
  template: `
    <lib-command-item 
      *ngFor="let cmd of commands; trackBy: trackByCommand" 
      [value]="cmd.value"
      (select)="executeCommand(cmd)"
    >
      {{ cmd.label }}
    </lib-command-item>
  `
})
export class OptimizedCommandComponent {
  trackByCommand(index: number, command: any): any {
    return command.id || command.value;
  }
}
```

## Contributing

Found a bug or want to contribute? Please check our [contributing guidelines](../CONTRIBUTING.md) and submit issues or pull requests on our [GitHub repository](https://github.com/your-username/shadcn-angular).