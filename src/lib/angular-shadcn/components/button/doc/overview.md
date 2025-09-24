# Button Component

The Button component is a versatile UI element that provides consistent styling and behavior across the application. It follows the shadcn/ui design system with support for multiple variants, sizes, and states.

## Purpose

Buttons are used to trigger actions, submit forms, or navigate within the application. The Button component ensures a uniform look and feel while providing flexibility for different use cases.

## Design

- **Variants**: primary, secondary, ghost, destructive, outline, link
- **Sizes**: xs, sm, default, lg, xl, icon
- **States**: default, disabled, loading
- **Accessibility**: Full keyboard support, ARIA labels, focus management
- **Icons**: Support for Lucide icons in loading state and as left/right icons

## Props

- `variant`: Button style variant
- `size`: Button size
- `disabled`: Disables the button
- `loading`: Shows loading spinner
- `type`: Button type (button, submit, reset)
- `loadingText`: Text to show during loading
- `leftIcon`: Lucide icon for left side
- `rightIcon`: Lucide icon for right side
- `ariaLabel`: Accessibility label
- `class`: Additional CSS classes