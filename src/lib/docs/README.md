# Documentation Structure Overview

This directory contains the organized documentation for the shadcn/ui Angular component library. The documentation has been split into focused sections to improve maintainability and user experience.

## Directory Structure

```
docs/
├── README.md              # This overview file
├── navigation.ts          # Navigation configuration and utilities
├── components/            # Individual component documentation
│   ├── button.md
│   ├── badge.md
│   ├── card.md
│   └── ...
├── guides/               # Implementation guides and tutorials
│   ├── installation.md
│   ├── theming.md
│   ├── design-system.md
│   └── ...
└── examples/             # Real-world usage examples
    ├── forms.md
    ├── dashboard.md
    └── ...
```

## Navigation Structure

The documentation follows a hierarchical structure:

1. **Getting Started** - Introduction, installation, and quick start
2. **Components** - Individual component documentation organized by category
3. **Guides** - In-depth guides for advanced topics
4. **Examples** - Real-world patterns and implementations
5. **Resources** - Contributing, roadmap, and additional resources

## Documentation Components

The documentation system includes:

- **Interactive Sidebar Navigation** - Easy browsing with search and filtering
- **Breadcrumb Navigation** - Clear path context
- **Live Code Examples** - Interactive component demos
- **API Documentation** - Comprehensive component APIs
- **Responsive Design** - Works on all device sizes

## Usage

The documentation is accessed through the `/docs` route in the application, which renders the `DocumentationComponent` with sidebar navigation.

Each documentation page includes:
- Navigation sidebar
- Main content area
- Table of contents (for longer pages)
- "Edit on GitHub" links
- Previous/Next navigation

## Contributing to Documentation

When adding new documentation:

1. Add the new page to `navigation.ts`
2. Create the markdown file in the appropriate directory
3. Update any cross-references
4. Test the navigation and links

## File Naming Conventions

- Use kebab-case for filenames: `dropdown-menu.md`
- Match the component selector names where applicable
- Use descriptive names for guides: `advanced-theming.md`

## Markdown Guidelines

- Use consistent heading levels (# for page title, ## for main sections)
- Include code examples with proper syntax highlighting
- Add frontmatter for metadata when needed
- Use relative links for internal navigation