# Button API Reference

## Inputs

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'secondary' \| 'ghost' \| 'destructive' \| 'outline' \| 'link'` | `'default'` | The visual variant of the button |
| `size` | `'sm' \| 'default' \| 'lg' \| 'icon'` | `'default'` | The size of the button |
| `disabled` | `boolean` | `false` | Whether the button is disabled |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | The HTML button type |
| `class` | `string` | `''` | Additional CSS classes to apply |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `clicked` | `MouseEvent` | Emitted when the button is clicked |

## Signals

The component uses Angular signals for reactive state management. All inputs are signal-based for optimal performance and zoneless compatibility.