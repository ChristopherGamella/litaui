# Toast API Reference

## Inputs

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'destructive'` | `'default'` | The visual variant of the toast |
| `title` | `string` | `undefined` | The title text displayed in the toast |
| `description` | `string` | `undefined` | The description text displayed in the toast |
| `action` | `string` | `undefined` | The text for the action button |

## Outputs

| Name | Type | Description |
|------|------|-------------|
| `actionClicked` | `void` | Emitted when the action button is clicked |
| `closeClicked` | `void` | Emitted when the close button is clicked |

## Signals

The component uses Angular signals for reactive state management of inputs and outputs.

## Accessibility

- Uses `role="status"` with `aria-live="assertive"` for screen reader announcements
- `aria-atomic="true"` ensures the entire toast is announced as a unit
- Close button has proper `aria-label`
- Focus management for interactive elements