# Accordion Component

The Accordion component provides a collapsible interface for displaying content in a compact, organized manner. It supports single or multiple item expansion, keyboard navigation, and various styling variants to match your design system.

## Design

The accordion follows shadcn/ui design principles with:
- Clean, minimal borders and spacing
- Smooth expand/collapse animations
- Consistent focus and hover states
- Support for icons and custom content
- Accessible keyboard navigation

## Variants

- **default**: Bordered accordion with rounded corners
- **ghost**: Minimal styling without borders
- **separated**: Individual bordered items with spacing

## Sizes

- **sm**: Compact spacing and smaller text
- **md**: Standard spacing (default)
- **lg**: Larger spacing and bigger text

## Usage

```html
<lib-accordion [items]="accordionItems"></lib-accordion>
```

## Props

- `items`: Array of accordion items
- `variant`: Visual style variant
- `size`: Size variant
- `multiple`: Allow multiple items to be expanded
- `collapsible`: Allow collapsing all items
- `disabled`: Disable the entire accordion