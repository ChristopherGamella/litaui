# Avatar

The Avatar component is used to display user profile pictures. It supports fallback to display initials or a default placeholder when the image fails to load or is not provided.

## Design

Avatars are circular by default and come in various sizes. They use a consistent design with proper aspect ratios and overflow handling.

## Props

- `src`: The source URL of the avatar image.
- `alt`: Alternative text for the image.
- `size`: The size of the avatar (xs, sm, md, lg, xl).
- `fallback`: The text to display when no image is available (defaults to "??").