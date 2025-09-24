# Accordion API Reference

## Inputs

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `AccordionItem[]` | `[]` | Array of accordion items to display |
| `variant` | `'default' \| 'ghost' \| 'separated'` | `'default'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant affecting spacing and text |
| `multiple` | `boolean` | `false` | Allow multiple items to be expanded simultaneously |
| `collapsible` | `boolean` | `true` | Allow collapsing all items (single mode only) |
| `disabled` | `boolean` | `false` | Disable the entire accordion |
| `id` | `string` | - | Unique identifier for the accordion |
| `class` | `string` | - | Additional CSS classes |
| `dataTestid` | `string` | - | Test identifier for automated testing |
| `ariaLabel` | `string` | - | Accessibility label |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `itemToggled` | `{ id: string; expanded: boolean }` | Emitted when an item is toggled |
| `expandedChanged` | `string[]` | Emitted when expanded items change |

## Signals

The component uses Angular signals for reactive state management:

- `items`: Input signal for accordion items
- `variant`, `size`, `multiple`, `collapsible`, `disabled`: Input signals for configuration
- `expandedItems`: Internal signal tracking expanded item IDs

## AccordionItem Interface

```typescript
interface AccordionItem {
  id: string;           // Unique identifier
  title: string;        // Display title
  content?: string;     // Content as HTML string
  icon?: any;           // Lucide icon
  disabled?: boolean;   // Disable this item
  expanded?: boolean;   // Initial expanded state
  headerTemplate?: TemplateRef<any>;  // Custom header template
  contentTemplate?: TemplateRef<any>; // Custom content template
}
```

## Methods

| Name | Parameters | Return | Description |
|------|------------|--------|-------------|
| `toggle` | `itemId: string` | `void` | Toggle an item's expanded state |
| `expand` | `itemId: string` | `void` | Expand a specific item |
| `collapse` | `itemId: string` | `void` | Collapse a specific item |
| `expandAll` | - | `void` | Expand all items (multiple mode only) |
| `collapseAll` | - | `void` | Collapse all items |
| `isExpanded` | `itemId: string` | `boolean` | Check if an item is expanded |
| `getItem` | `itemId: string` | `AccordionItem \| undefined` | Get item by ID |
| `getExpandedItems` | - | `string[]` | Get all expanded item IDs |