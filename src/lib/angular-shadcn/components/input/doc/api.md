# Input Component API

## Inputs

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'error' \| 'success'` | `'default'` | Visual variant of the input |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant of the input |
| `type` | `string` | `'text'` | HTML input type attribute |
| `placeholder` | `string` | `''` | Placeholder text |
| `disabled` | `boolean` | `false` | Whether the input is disabled |
| `leadingIcon` | `LucideIcon \| null` | `null` | Icon to display at the start of the input |
| `trailingIcon` | `LucideIcon \| null` | `null` | Icon to display at the end of the input |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `valueChange` | `string` | Emitted when the input value changes |

## Signals

| Name | Type | Description |
|------|------|-------------|
| `value` | `string` | Current value of the input |

## ControlValueAccessor

The component implements `ControlValueAccessor` for seamless integration with Angular reactive forms.