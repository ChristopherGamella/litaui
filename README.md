# shadcn-ui-angular

> A modern Angular component library inspired by shadcn/ui. Copy, paste, and customize.

[![Angular](https://img.shields.io/badge/Angular-20+-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0+-38bdf8.svg)](https://tailwindcss.com/)

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.1.

## 🚀 Quick Start

### Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. 

### Explore the Components

Visit these routes to see the components in action:

- `/test` - Button component testing
- `/demo` - Basic component showcase  
- `/comprehensive` - Complete component gallery
- **`/docs` - 📚 Full documentation with sidebar navigation**

## 📚 Documentation Structure

This project now features an organized documentation system similar to shadcn/ui:

### Interactive Documentation (`/docs`)
- **Sidebar Navigation** - Easy browsing with search
- **Structured Content** - Organized by category
- **Live Examples** - Interactive component demos
- **Copy-Paste Ready** - Full source code provided

### Documentation Sections
- **Getting Started** - Introduction, installation, quick start
- **Components** - Individual component docs with examples
- **Guides** - Design system, theming, accessibility
- **Examples** - Real-world usage patterns

## 🧩 Component Library

Our component library is located in `src/lib/` and includes:

### Core Components ✅
- Button, Badge, Card, Alert, Avatar
- Input, Checkbox, Switch, Select  
- Progress, Tooltip, Modal, Popover
- Tabs, Breadcrumb, Dropdown Menu, Accordion
- **Command** - Search palette with keyboard navigation 🆕

### Organization
```
src/lib/
├── components/ui/           # Individual components
├── docs/                   # Documentation files  
├── demo/components/        # Demo & showcase components
├── styles/                 # Design tokens & themes
└── utils/                  # Utilities (cn, theme, etc.)
```

## 🎨 Design System

- **CSS Variables** - Easy theming and customization
- **Dark Mode** - Built-in light/dark theme support
- **Responsive** - Mobile-first design patterns
- **Accessible** - WCAG 2.1 AA compliant
- **Consistent** - Unified design tokens

## 🛠️ Development

### Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory.

### Running tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use:

```bash
ng test
```

### Adding Components

1. Create component in `src/lib/components/ui/`
2. Add documentation in `src/lib/docs/components/`
3. Update navigation in `src/lib/docs/navigation.ts`
4. Export from `src/lib/index.ts`

## 📖 Full Documentation

For comprehensive documentation including installation guides, component APIs, and examples, visit:

**👉 [Complete Documentation](src/lib/docs/README.md)**

Or run the development server and navigate to `/docs` for the interactive documentation experience.

## 🤝 Contributing

We welcome contributions! See our [contributing guide](src/lib/docs/contributing.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- [shadcn](https://twitter.com/shadcn) for the original design system
- [Angular Team](https://angular.io/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility framework

---

For more information on using the Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
