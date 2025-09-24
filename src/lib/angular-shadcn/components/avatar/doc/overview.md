# Avatar Component

The Avatar component displays user profile pictures with a fallback to initials or a custom placeholder. It supports multiple sizes and handles image loading errors gracefully.

## Design

- Circular profile images with rounded corners
- Automatic fallback to text when image fails to load or is not provided
- Consistent sizing across different use cases
- Accessible with proper alt text support

## Usage

```html
<!-- Basic avatar with image -->
<lib-avatar
  src="https://example.com/avatar.jpg"
  alt="User Name"
  fallback="UN">
</lib-avatar>

<!-- Avatar with initials only -->
<lib-avatar fallback="JD"></lib-avatar>

<!-- Different sizes -->
<lib-avatar size="sm" fallback="SM"></lib-avatar>
<lib-avatar size="lg" fallback="LG"></lib-avatar>
<lib-avatar size="xl" fallback="XL"></lib-avatar>
```