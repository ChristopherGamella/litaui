# Breadcrumb API Reference

## Inputs

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `items` | `BreadcrumbItem[]` | required | Array of breadcrumb items to display |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant for the breadcrumb |

## Outputs

None

## Signals

None

## Interfaces

### BreadcrumbItem

```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;
}
```

- `label`: The text to display for the breadcrumb item
- `href`: Optional URL for the breadcrumb link. If not provided, renders as plain text

## Variants

- `size: 'sm'`: Small text size
- `size: 'md'`: Medium text size (default)
- `size: 'lg'`: Large text size