# Button

A versatile button component with multiple variants, sizes, and states.

## Installation

Copy and paste the following code into your project.

```typescript
import { 
  Component, 
  computed, 
  input, 
  output, 
  signal,
  booleanAttribute
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { cva, type VariantProps, cn } from '../../utils/cn';

/**
 * Button variant configuration using class-variance-authority
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-8 rounded-md px-2 text-xs",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  ariaDescribedby?: string;
}

@Component({
  selector: 'lib-button',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: \`
    <button
      [type]="type()"
      [disabled]="disabled() || loading()"
      [class]="computedClasses()"
      [attr.aria-label]="ariaLabel()"
      [attr.aria-describedby]="ariaDescribedby()"
      [attr.data-loading]="loading()"
      (click)="handleClick($event)"
    >
      <ng-content></ng-content>
    </button>
  \`,
  host: {
    '[class]': 'hostClasses()',
  }
})
export class ButtonComponent implements ButtonProps {
  // Input properties
  readonly variant = input<ButtonProps['variant']>('default');
  readonly size = input<ButtonProps['size']>('default');
  readonly loading = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly ariaLabel = input<string>();
  readonly ariaDescribedby = input<string>();
  readonly class = input<string>('');

  // Output events
  readonly onClick = output<MouseEvent>();

  // Computed properties
  readonly computedClasses = computed(() => {
    return cn(
      buttonVariants({
        variant: this.variant(),
        size: this.size()
      }),
      this.class()
    );
  });

  readonly hostClasses = computed(() => {
    return cn(
      'inline-block',
      this.loading() && 'cursor-wait',
      this.disabled() && 'cursor-not-allowed'
    );
  });

  /**
   * Handle button click events
   */
  handleClick(event: MouseEvent): void {
    if (this.disabled() || this.loading()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.onClick.emit(event);
  }
}
```

## Usage

### Basic Usage

```html
<lib-button>Click me</lib-button>
```

### Variants

```html
<lib-button variant="default">Default</lib-button>
<lib-button variant="secondary">Secondary</lib-button>
<lib-button variant="destructive">Destructive</lib-button>
<lib-button variant="outline">Outline</lib-button>
<lib-button variant="ghost">Ghost</lib-button>
<lib-button variant="link">Link</lib-button>
```

### Sizes

```html
<lib-button size="xs">Extra Small</lib-button>
<lib-button size="sm">Small</lib-button>
<lib-button size="default">Default</lib-button>
<lib-button size="lg">Large</lib-button>
<lib-button size="xl">Extra Large</lib-button>
<lib-button size="icon">
  <lucide-icon name="heart"></lucide-icon>
</lib-button>
```

### With Icons

```html
<lib-button>
  <lucide-icon name="mail" class="mr-2 h-4 w-4"></lucide-icon>
  Login with Email
</lib-button>

<lib-button variant="outline">
  Download
  <lucide-icon name="download" class="ml-2 h-4 w-4"></lucide-icon>
</lib-button>
```

### Loading State

```html
<lib-button [loading]="isLoading()" [disabled]="isLoading()">
  <lucide-icon name="loader-2" class="mr-2 h-4 w-4 animate-spin"></lucide-icon>
  Please wait
</lib-button>
```

### Event Handling

```typescript
@Component({
  template: \`
    <lib-button (onClick)="handleClick($event)">
      Click Handler
    </lib-button>
  \`
})
export class ExampleComponent {
  handleClick(event: MouseEvent) {
    console.log('Button clicked!', event);
  }
}
```

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive' \| 'outline' \| 'secondary' \| 'ghost' \| 'link'` | `'default'` | Visual style variant |
| `size` | `'xs' \| 'sm' \| 'default' \| 'lg' \| 'xl' \| 'icon'` | `'default'` | Button size |
| `loading` | `boolean` | `false` | Show loading state |
| `disabled` | `boolean` | `false` | Disable button |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `ariaLabel` | `string` | - | Accessibility label |
| `ariaDescribedby` | `string` | - | Accessibility description |

### Events

| Event | Type | Description |
|-------|------|-------------|
| `onClick` | `MouseEvent` | Fired when button is clicked |

### Styling

The button component uses Tailwind CSS classes and CSS variables for styling. You can customize the appearance by:

1. **CSS Variables**: Modify the design tokens in your CSS
2. **Class Override**: Pass custom classes via the `class` input
3. **Variant Modification**: Edit the `buttonVariants` configuration

### Accessibility

The button component includes:

- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Disabled state handling

## Examples

### Form Button

```html
<form (ngSubmit)="onSubmit()">
  <!-- form fields -->
  <lib-button type="submit" [disabled]="form.invalid">
    Submit Form
  </lib-button>
</form>
```

### Icon-Only Button

```html
<lib-button size="icon" ariaLabel="Settings">
  <lucide-icon name="settings" class="h-4 w-4"></lucide-icon>
</lib-button>
```

### Button Group

```html
<div class="flex gap-2">
  <lib-button variant="outline">Cancel</lib-button>
  <lib-button>Confirm</lib-button>
</div>
```

### Responsive Button

```html
<lib-button class="w-full sm:w-auto">
  Responsive Button
</lib-button>
```