# Badge API Reference

## Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline'` | `'default'` | The visual variant of the badge |
| `class` | `string` | `undefined` | Additional CSS classes to apply |

## Outputs

None

## Signals

None

## Content

The badge content is provided via `<ng-content>`. Place text or other elements inside the badge tags.

```html
<lib-badge>Badge Text</lib-badge>
```

## Accessibility

- Uses semantic `<span>` element
- Inherits focus and keyboard navigation from parent context
- Supports screen readers through content projection