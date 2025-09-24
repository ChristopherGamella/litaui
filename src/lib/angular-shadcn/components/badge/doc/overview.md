# Badge Component

The Badge component is a small status descriptor or label that can be used to highlight information, tags, or statuses in your application.

## Design

Badges are compact elements that provide visual cues about content. They feature rounded corners, subtle borders, and support multiple color variants to convey different meanings.

## Variants

- **Default**: Primary badge style with filled background
- **Secondary**: Muted secondary style
- **Destructive**: Red variant for warnings or errors
- **Outline**: Border-only style with transparent background

## Usage

```html
<lib-badge>Default Badge</lib-badge>
<lib-badge variant="secondary">Secondary</lib-badge>
<lib-badge variant="destructive">Error</lib-badge>
<lib-badge variant="outline">Outline</lib-badge>
```