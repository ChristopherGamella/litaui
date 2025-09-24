# Button API Reference

## Inputs

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'destructive' \| 'outline' \| 'link'` | `'primary'` | The visual variant of the button |
| `size` | `'sm' \| 'md' \| 'lg' \| 'icon'` | `'md'` | The size of the button |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | The HTML button type |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `onClick` | `Event` | Emitted when the button is clicked |

## Signals

The component uses Angular signals for reactive state management. All inputs are signal-based for optimal performance.