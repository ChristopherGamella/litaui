# Shadcn-Angular Design System

A modern, accessible component library for Angular 20, inspired by shadcn/ui, built with TailwindCSS 4 and integrated with your existing professional color palette.

## 🚀 Features

- **shadcn/ui Inspired**: Modern design patterns with Angular integration
- **Type-Safe**: Full TypeScript support with comprehensive interfaces
- **Accessible**: WCAG 2.1 AA compliant with ARIA support
- **Customizable**: Easy theming with CSS custom properties
- **Tree Shakable**: Import only what you need
- **Lucide Icons**: Beautiful, consistent iconography
- **Responsive**: Mobile-first design with breakpoint utilities

## 📦 Installation

The design system is already integrated into your Angular project. Import components as needed:

```typescript
import { ButtonComponent } from './lib/components/ui/button.component';
import { cn, cva } from './lib/utils/cn';
import { semanticColors } from './lib/tokens/colors';
```

## 🎨 Design Tokens

### Colors
Your existing color system is fully integrated:

```typescript
import { semanticColors, componentColors } from './lib/tokens/colors';

// Use semantic colors
const primaryButton = semanticColors.primary; // var(--color-primary-900)

// Use component-specific colors
const buttonStyles = componentColors.button.primary;
```

### Typography
Consistent typography scale:

```typescript
import { typography, textUtilities } from './lib/tokens/typography';

// Use typography styles
const headingStyles = typography.h1;

// Use utility classes
const bodyClass = textUtilities.body;
```

### Spacing
Harmonious spacing system:

```typescript
import { spacing, semanticSpacing } from './lib/tokens/spacing';

// Use spacing values
const padding = semanticSpacing.component.padding.md; // 16px

// Use utility classes
const gapClass = spacingUtilities.gap.md; // gap-4
```

## 🧩 Components

### Button Component

```html
<!-- Basic usage -->
<lib-button>Click me</lib-button>

<!-- With variants -->
<lib-button variant="outline">Outline</lib-button>
<lib-button variant="destructive">Delete</lib-button>

<!-- With sizes -->
<lib-button size="sm">Small</lib-button>
<lib-button size="lg">Large</lib-button>

<!-- With icons -->
<lib-button [leftIcon]="StarIcon">Star</lib-button>

<!-- With states -->
<lib-button [loading]="true">Loading...</lib-button>
<lib-button [disabled]="true">Disabled</lib-button>
```

```typescript
// In your component
import { Star } from 'lucide-angular';

export class MyComponent {
  readonly StarIcon = Star;
}
```

### Utility Functions

#### `cn()` - Class Name Utility
Combines and merges Tailwind classes:

```typescript
import { cn } from './lib/utils/cn';

const classes = cn(
  'base-class',
  condition && 'conditional-class',
  'another-class'
);
```

#### `cva()` - Component Variant Architecture
Create variant-based components:

```typescript
import { cva } from './lib/utils/cn';

const buttonVariants = cva(
  'base-button-classes',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white',
        outline: 'border border-primary text-primary',
      },
      size: {
        sm: 'px-3 py-1 text-sm',
        lg: 'px-6 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'sm',
    },
  }
);

// Usage
const classes = buttonVariants({ variant: 'outline', size: 'lg' });
```

## 🎯 Best Practices

### 1. Use Semantic Colors
```typescript
// ✅ Good
class="bg-primary text-primary-foreground"

// ❌ Avoid
class="bg-slate-900 text-white"
```

### 2. Leverage Variants
```typescript
// ✅ Good - Use component variants
<lib-button variant="outline" size="lg">Button</lib-button>

// ❌ Avoid - Manual class overrides
<lib-button class="border border-slate-300 px-6 py-3">Button</lib-button>
```

### 3. Consistent Spacing
```typescript
// ✅ Good - Use semantic spacing
class="p-6 gap-4"

// ❌ Avoid - Arbitrary values
class="p-[23px] gap-[15px]"
```

### 4. Accessibility First
```typescript
// ✅ Good - Include ARIA labels
<lib-button ariaLabel="Save changes">Save</lib-button>

// ✅ Good - Handle keyboard events
<lib-button (onKeydown)="handleKeydown($event)">Button</lib-button>
```

## 🛠️ Development

### Adding New Components

1. **Create the component file** in `src/lib/components/ui/`
2. **Define variants** using `cva()`
3. **Add TypeScript interfaces** in `src/lib/types/`
4. **Export from index** in `src/lib/index.ts`
5. **Add to barrel exports**

### Component Structure
```typescript
// component-name.component.ts
import { cva } from '../../utils/cn';

export const componentVariants = cva('base-classes', {
  variants: { /* ... */ },
  defaultVariants: { /* ... */ },
});

@Component({
  selector: 'lib-component-name',
  // ... component config
})
export class ComponentNameComponent implements ComponentProps {
  // ... implementation
}
```

## 📚 Component Status

### ✅ Completed
- **Button**: Full variant system with icons, loading states, accessibility
- **Design Tokens**: Colors, typography, spacing fully integrated
- **Utilities**: `cn()`, `cva()`, theme management
- **TypeScript**: Comprehensive interfaces and types

### 🚧 In Progress
- **Card Component**: Basic structure with variants
- **Input Component**: Form integration with validation
- **Modal/Dialog**: Overlay management and accessibility

### 📋 Planned
- **Select/Dropdown**: Advanced selection with search
- **Form Components**: Validation, error states
- **Feedback Components**: Toast, alerts, progress
- **Layout Components**: Grid, stack, container
- **CLI Tool**: Component generation and theme management

## 🎨 Customization

### Theme Customization
```typescript
import { ThemeProvider } from './lib/utils/theme';

const themeProvider = new ThemeProvider('light');

// Switch themes
themeProvider.setScheme('dark');

// Generate custom CSS
const customCSS = generateThemeCSS('light');
```

### Color Customization
Extend your existing color system:

```css
/* In your styles.css */
:root {
  --color-brand-red: #your-brand-color;
  --color-primary-900: #your-primary-dark;
  /* ... other customizations */
}
```

## 🤝 Integration with Existing Code

### Migrating Existing Components
1. **Identify patterns** in your current components
2. **Map to design tokens** from your existing system
3. **Replace manual classes** with semantic tokens
4. **Add accessibility features** where missing

### Example Migration
```typescript
// Before
<button class="bg-slate-900 text-white px-4 py-2 rounded">Button</button>

// After
<lib-button variant="default" size="md">Button</lib-button>
```

## 📖 Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Angular Components Guide](https://angular.io/guide/component-overview)
- [Lucide Icons](https://lucide.dev/)

## 🤝 Contributing

1. Follow the established patterns for new components
2. Include comprehensive TypeScript interfaces
3. Add accessibility features (ARIA, keyboard navigation)
4. Test across different screen sizes
5. Update documentation

---

Built with ❤️ for modern Angular applications