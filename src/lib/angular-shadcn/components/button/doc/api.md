# Button API Reference

## Inputs

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'destructive' \| 'outline' \| 'link'` | `'primary'` | Button style variant |
| `size` | `'xs' \| 'sm' \| 'default' \| 'lg' \| 'xl' \| 'icon'` | `'default'` | Button size |
| `disabled` | `boolean` | `false` | Disables the button |
| `loading` | `boolean` | `false` | Shows loading spinner |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type |
| `loadingText` | `string` | - | Text to show during loading |
| `leftIcon` | `any` | - | Lucide icon to display on the left |
| `rightIcon` | `any` | - | Lucide icon to display on the right |
| `ariaLabel` | `string` | - | Accessibility label |
| `class` | `string` | - | Additional CSS classes |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `clicked` | `Event` | Emitted when button is clicked |

## Signals

All inputs are reactive signals that automatically update the component when changed.