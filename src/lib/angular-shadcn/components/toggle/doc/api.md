# Toggle API Reference

## Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `variant` | `'default' \| 'outline'` | `'default'` | The visual variant of the toggle |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | The size of the toggle |
| `pressed` | `boolean` | `false` | Whether the toggle is in the pressed state |
| `disabled` | `boolean` | `false` | Whether the toggle is disabled |

## Outputs

| Property | Type | Description |
|----------|------|-------------|
| `pressedChange` | `boolean` | Emitted when the toggle state changes |

## Signals

The component uses Angular signals for reactive state management:

- `variant`: Signal for the variant input
- `size`: Signal for the size input
- `pressed`: Signal for the pressed state input
- `disabled`: Signal for the disabled state input
- `pressedChange`: Output signal for state changes

## CSS Classes

The component uses the following data attributes for styling:

- `data-state="on"`: Applied when the toggle is pressed
- `data-state="off"`: Applied when the toggle is not pressed

## Accessibility

- `aria-pressed`: Set to the current pressed state
- `role`: Implicit button role
- Keyboard support: Space and Enter keys toggle the state
- Focus management: Proper focus ring and outline