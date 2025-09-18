# Checkbox Component

A modern, accessible checkbox component for Angular applications, following the shadcn/ui design system principles.

## Features

- ✅ **Fully Accessible**: WCAG compliant with proper ARIA attributes
- ✅ **Reactive Forms Support**: Works seamlessly with Angular reactive forms
- ✅ **Multiple Sizes**: Small, default, and large variants
- ✅ **Color Variants**: Default, destructive, and success themes
- ✅ **Indeterminate State**: Support for three-state checkboxes
- ✅ **Keyboard Navigation**: Full keyboard support (Space/Enter)
- ✅ **Custom Styling**: Easy to customize with CSS classes
- ✅ **TypeScript**: Fully typed with comprehensive type definitions
- ✅ **Modern Angular**: Built with signals and standalone components

## Installation

The checkbox component is part of the shadcn-angular component library:

```typescript
import { CheckboxComponent } from '@your-org/shadcn-angular';
```

## Basic Usage

### Simple Checkbox

```html
<lib-checkbox [(checked)]="isAccepted">
  Accept terms and conditions
</lib-checkbox>
```

```typescript
export class MyComponent {
  readonly isAccepted = signal(false);
}
```

### With Reactive Forms

```html
<form [formGroup]="myForm">
  <lib-checkbox formControlName="newsletter">
    Subscribe to newsletter
  </lib-checkbox>
</form>
```

```typescript
export class MyComponent {
  readonly myForm = this.fb.group({
    newsletter: [false]
  });

  constructor(private fb: FormBuilder) {}
}
```

## API Reference

### Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `checked` | `boolean` | `false` | Checked state of the checkbox |
| `indeterminate` | `boolean` | `false` | Indeterminate state (tri-state) |
| `disabled` | `boolean` | `false` | Disabled state |
| `required` | `boolean` | `false` | Required field indicator |
| `size` | `'sm' \| 'default' \| 'lg'` | `'default'` | Size variant |
| `variant` | `'default' \| 'destructive' \| 'success'` | `'default'` | Color variant |
| `id` | `string` | Auto-generated | Element ID |
| `ariaLabel` | `string` | `undefined` | ARIA label for accessibility |
| `ariaDescribedBy` | `string` | `undefined` | ARIA described-by reference |
| `ariaInvalid` | `boolean` | `undefined` | ARIA invalid state |
| `testId` | `string` | `undefined` | Test ID for testing |
| `tabIndex` | `number` | `0` | Tab index for keyboard navigation |
| `class` | `string` | `''` | Additional CSS classes |

### Outputs

| Event | Type | Description |
|-------|------|-------------|
| `checkedChange` | `boolean` | Emitted when checked state changes |
| `indeterminateChange` | `boolean` | Emitted when indeterminate state changes |
| `focus` | `void` | Emitted when checkbox receives focus |
| `blur` | `void` | Emitted when checkbox loses focus |

### Public Methods

| Method | Description |
|--------|-------------|
| `setChecked(checked: boolean)` | Programmatically set checked state |
| `setIndeterminate(indeterminate: boolean)` | Programmatically set indeterminate state |

## Examples

### Sizes

```html
<lib-checkbox size="sm" [(checked)]="small">Small</lib-checkbox>
<lib-checkbox size="default" [(checked)]="default">Default</lib-checkbox>
<lib-checkbox size="lg" [(checked)]="large">Large</lib-checkbox>
```

### Variants

```html
<lib-checkbox variant="default" [(checked)]="normal">Normal</lib-checkbox>
<lib-checkbox variant="destructive" [(checked)]="danger">Danger</lib-checkbox>
<lib-checkbox variant="success" [(checked)]="success">Success</lib-checkbox>
```

### Indeterminate State (Select All Pattern)

```html
<lib-checkbox 
  [indeterminate]="someSelected() && !allSelected()" 
  [checked]="allSelected()"
  (checkedChange)="toggleAll($event)">
  Select all items
</lib-checkbox>

<div class="ml-6">
  <lib-checkbox [(checked)]="item1" (checkedChange)="updateSelectAll()">Item 1</lib-checkbox>
  <lib-checkbox [(checked)]="item2" (checkedChange)="updateSelectAll()">Item 2</lib-checkbox>
  <lib-checkbox [(checked)]="item3" (checkedChange)="updateSelectAll()">Item 3</lib-checkbox>
</div>
```

```typescript
export class SelectAllExample {
  readonly item1 = signal(false);
  readonly item2 = signal(false);
  readonly item3 = signal(false);

  readonly allSelected = computed(() => 
    this.item1() && this.item2() && this.item3()
  );

  readonly someSelected = computed(() => 
    this.item1() || this.item2() || this.item3()
  );

  toggleAll(checked: boolean): void {
    this.item1.set(checked);
    this.item2.set(checked);
    this.item3.set(checked);
  }

  updateSelectAll(): void {
    // Computed properties will handle the state automatically
  }
}
```

### Accessibility

```html
<!-- With ARIA label -->
<lib-checkbox 
  ariaLabel="Accept terms and conditions"
  [(checked)]="termsAccepted">
  Terms & Conditions
</lib-checkbox>

<!-- With description -->
<lib-checkbox 
  id="newsletter"
  ariaDescribedBy="newsletter-description"
  [(checked)]="newsletter">
  Newsletter
</lib-checkbox>
<p id="newsletter-description">
  Receive weekly updates about new features and products.
</p>

<!-- With validation -->
<lib-checkbox 
  [ariaInvalid]="form.get('required')?.invalid"
  formControlName="required">
  Required field *
</lib-checkbox>
```

### Custom Styling

```html
<lib-checkbox class="custom-checkbox" [(checked)]="custom">
  Custom styled checkbox
</lib-checkbox>
```

```css
.custom-checkbox .peer {
  border-color: hsl(262.1 83.3% 57.8%); /* Purple */
  border-radius: 50%;
}

.custom-checkbox .peer[data-state="checked"] {
  background-color: hsl(262.1 83.3% 57.8%);
}
```

## Accessibility

The checkbox component is built with accessibility in mind:

- **Keyboard Navigation**: Full support for Space and Enter keys
- **Screen Reader Support**: Proper ARIA attributes and state announcements
- **Focus Management**: Clear focus indicators and proper tab order
- **Label Association**: Automatic label association for screen readers
- **State Communication**: Clear communication of checked/unchecked/indeterminate states

### ARIA Attributes

The component automatically manages these ARIA attributes:

- `role="checkbox"`: Identifies the element as a checkbox
- `aria-checked`: Communicates the current state (true/false/mixed)
- `aria-describedby`: Links to descriptive text
- `aria-label`: Provides accessible name when no visible label
- `aria-invalid`: Indicates validation state

## Form Integration

The checkbox component implements `ControlValueAccessor` for seamless integration with Angular forms:

### Template-Driven Forms

```html
<lib-checkbox 
  name="newsletter" 
  [(ngModel)]="newsletter"
  #newsletterControl="ngModel">
  Subscribe to newsletter
</lib-checkbox>
```

### Reactive Forms

```typescript
export class FormExample {
  readonly form = this.fb.group({
    preferences: [false],
    notifications: [true],
    terms: [false, Validators.requiredTrue]
  });

  constructor(private fb: FormBuilder) {}
}
```

```html
<form [formGroup]="form">
  <lib-checkbox formControlName="preferences">Preferences</lib-checkbox>
  <lib-checkbox formControlName="notifications">Notifications</lib-checkbox>
  <lib-checkbox formControlName="terms">Accept Terms *</lib-checkbox>
</form>
```

## Styling

The checkbox component uses Tailwind CSS v4's @theme directive and follows the design token system:

### CSS Custom Properties

The checkbox component integrates with Tailwind CSS v4's theme system:

```css
@theme {
  --color-checkbox-border: 214.3 31.8% 91.4%;
  --color-checkbox-checked: 222.2 84% 4.9%;
  --color-checkbox-checked-foreground: 210 40% 98%;
  --color-checkbox-focus-ring: 222.2 84% 4.9%;
}
```

### Custom Styling with Tailwind CSS v4

For custom colors, use HSL values directly or extend the theme:

```css
/* Direct HSL values */
.custom-checkbox .peer {
  border-color: hsl(262.1 83.3% 57.8%); /* Purple */
}

/* Or extend the @theme directive */
@theme {
  --color-purple-500: 262.1 83.3% 57.8%;
  --color-green-500: 142.1 76.2% 36.3%;
}
```

### Design Tokens

The component integrates with the library's design token system:

- **Colors**: Uses semantic color tokens (primary, destructive, success)
- **Spacing**: Consistent spacing and sizing
- **Typography**: Harmonious with the typography scale
- **Border Radius**: Consistent with the border radius system

## Testing

### Unit Testing

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
  });

  it('should toggle checked state on click', () => {
    const button = fixture.nativeElement.querySelector('button');
    
    expect(component.isChecked()).toBe(false);
    
    button.click();
    fixture.detectChanges();
    
    expect(component.isChecked()).toBe(true);
  });

  it('should emit checkedChange event', () => {
    spyOn(component.checkedChange, 'emit');
    
    component.onToggle();
    
    expect(component.checkedChange.emit).toHaveBeenCalledWith(true);
  });
});
```

### E2E Testing

```typescript
import { test, expect } from '@playwright/test';

test('checkbox interaction', async ({ page }) => {
  await page.goto('/checkbox-test');
  
  const checkbox = page.locator('lib-checkbox').first();
  
  // Initial state
  await expect(checkbox.locator('button')).toHaveAttribute('aria-checked', 'false');
  
  // Click to check
  await checkbox.click();
  await expect(checkbox.locator('button')).toHaveAttribute('aria-checked', 'true');
  
  // Keyboard interaction
  await checkbox.locator('button').press('Space');
  await expect(checkbox.locator('button')).toHaveAttribute('aria-checked', 'false');
});
```

## Performance

The checkbox component is optimized for performance:

- **Signals**: Uses Angular signals for reactive state management
- **OnPush**: Optimized change detection strategy
- **Tree Shaking**: Standalone component supports tree shaking
- **Bundle Size**: Minimal bundle impact with selective imports
- **Runtime**: Efficient event handling and state updates

## Browser Support

The checkbox component supports all modern browsers:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Migration

### From HTML Input

```html
<!-- Before -->
<input type="checkbox" id="terms" [(ngModel)]="terms">
<label for="terms">Accept terms</label>

<!-- After -->
<lib-checkbox [(checked)]="terms">Accept terms</lib-checkbox>
```

### From Angular Material

```html
<!-- Before -->
<mat-checkbox [(ngModel)]="checked">Check me!</mat-checkbox>

<!-- After -->
<lib-checkbox [(checked)]="checked">Check me!</lib-checkbox>
```

## Contributing

When contributing to the checkbox component:

1. Follow the component architecture patterns
2. Maintain accessibility standards
3. Update tests for new features
4. Document API changes
5. Consider design system consistency

## Related Components

- **Switch**: For binary on/off states
- **Radio**: For single selection from multiple options
- **Form**: For form layout and validation
- **Button**: For action triggers

## Examples and Demos

Visit the component demo pages:

- Basic usage: `/checkbox-test`
- Comprehensive examples: `/checkbox`
- Interactive playground: `/comprehensive`
