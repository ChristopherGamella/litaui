# Toggle Component

A toggle component that allows users to switch between two states: on and off. It follows the shadcn/ui design system and provides a clean, accessible way to represent binary choices.

## Design

The toggle component is styled as a button that visually indicates its pressed state through background color changes and semantic data attributes. It supports different variants and sizes to fit various design contexts.

## Usage

```html
<!-- Basic toggle -->
<lib-toggle>Toggle</lib-toggle>

<!-- Controlled toggle -->
<lib-toggle [pressed]="isActive" (pressedChange)="onToggle($event)">
  Active
</lib-toggle>

<!-- Different variants -->
<lib-toggle variant="outline">Outline Toggle</lib-toggle>

<!-- Different sizes -->
<lib-toggle size="sm">Small</lib-toggle>
<lib-toggle size="lg">Large</lib-toggle>
```

## Accessibility

- Uses `aria-pressed` attribute to indicate the toggle state
- Supports keyboard navigation
- Respects disabled state
- Provides proper focus management