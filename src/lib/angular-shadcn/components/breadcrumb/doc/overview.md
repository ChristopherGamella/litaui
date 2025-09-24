# Breadcrumb Component

The Breadcrumb component provides a navigation aid that allows users to keep track of their location within a website or application hierarchy. It displays a list of links separated by chevron icons, showing the path from the root to the current page.

## Design

- Uses ChevronRight icons as separators
- Muted text color for inactive items
- Hover effects on clickable links for better interactivity
- Supports different sizes (sm, md, lg) for various contexts
- Accessible with proper ARIA labels and semantic HTML

## Usage

```typescript
import { BreadcrumbComponent, BreadcrumbItem } from './breadcrumb.component';

const items: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Components', href: '/components' },
  { label: 'Breadcrumb' }
];
```

```html
<lib-breadcrumb [items]="items" size="md"></lib-breadcrumb>
```