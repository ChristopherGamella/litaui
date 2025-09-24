# Avatar API Reference

## Inputs

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `size` | `'sm' \| 'default' \| 'lg' \| 'xl'` | `'default'` | Controls the size of the avatar |
| `src` | `string` | `undefined` | URL of the avatar image |
| `alt` | `string` | `undefined` | Alt text for the image |
| `fallback` | `string` | `'??'` | Text to display when image is not available |
| `class` | `string` | `undefined` | Additional CSS classes |

## Outputs

None

## Signals

None (internal state managed with signals)

## Variants

### Size Variants

- `sm`: 32x32px (h-8 w-8)
- `default`: 40x40px (h-10 w-10)
- `lg`: 48x48px (h-12 w-12)
- `xl`: 64x64px (h-16 w-16)

## Accessibility

- Images include proper `alt` text
- Fallback text is announced by screen readers
- Component maintains focus behavior for interactive contexts