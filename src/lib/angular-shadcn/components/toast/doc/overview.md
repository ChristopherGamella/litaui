# Toast Component

A toast notification component that displays brief messages to users, typically for feedback on actions or system status.

## Design

The toast component follows the shadcn/ui design system with a clean, minimal appearance that integrates seamlessly with the application's theme. It supports different variants for various message types and includes proper animations and accessibility features.

## Usage

```html
<lib-toast title="Success!" description="Your changes have been saved." action="Undo"></lib-toast>
```

## Positioning

Toasts should be positioned in a fixed container, typically in the bottom-right corner of the screen. Use a container with `fixed bottom-4 right-4 z-50` classes to achieve proper positioning:

```html
<div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
  <!-- Toast components here -->
</div>
```

## Variants

- `default`: Standard toast appearance
- `destructive`: For error or warning messages

## Features

- Accessible with proper ARIA attributes
- Supports title, description, and action button
- Close button for dismissal
- Smooth slide-in/slide-out animations
- Responsive design
- Theme-aware styling