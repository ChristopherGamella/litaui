# shadcn/ui for Angular

> The definitive shadcn/ui port for Angular applications. Modern, accessible, and developer-friendly.

<div align="center">

[![npm version](https://badge.fury.io/js/shadcn-angular.svg)](https://badge.fury.io/js/shadcn-angular)
[![Angular](https://img.shields.io/badge/Angular-20+-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.0+-38bdf8.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>

A complete Angular implementation of shadcn/ui - **copy, paste, and customize**. Built for Angular 20+ with standalone components, signals, and modern development practices.

## ✨ What is this?

This is **not a component library**. It's a collection of **copy-and-paste components** that you can use to build your own component library.

Pick the components you need. Copy the code. Paste into your project. Customize to your heart's content.

### Why copy-paste?

- **You own the code** - No black box, no surprises
- **Complete customization** - Change anything, anytime  
- **No dependencies** - No package updates breaking your UI
- **Modern Angular** - Built with signals, standalone components, and latest patterns

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install lucide-angular class-variance-authority clsx tailwind-merge
```

### 2. Setup Tailwind CSS

```bash
npm install -D tailwindcss @tailwindcss/typography
npx tailwindcss init
```

Configure your `tailwind.config.js` and add our CSS variables to `styles.css`. 

**→ [Full installation guide](src/lib/docs/installation.md)**

### 3. Copy your first component

Browse our [component library](src/lib/docs/components/) and copy the code for any component:

```typescript
// Copy from docs, paste into your project
import { ButtonComponent } from './components/ui/button.component';

@Component({
  template: `<lib-button variant="default">Get Started</lib-button>`
})
export class MyComponent {}
```

## 📚 Documentation Structure

Our documentation is organized into focused sections with sidebar navigation:

### 🚀 [Getting Started](src/lib/docs/)
- [Introduction](src/lib/docs/introduction.md) - What and why
- [Installation](src/lib/docs/installation.md) - Setup guide  
- [Quick Start](src/lib/docs/quick-start.md) - First component
- [Theming](src/lib/docs/theming.md) - Customization

### 🧩 [Components](src/lib/docs/components/)
**Core Components**
- [Button](src/lib/docs/components/button.md) - Buttons with variants
- [Badge](src/lib/docs/components/badge.md) - Status indicators
- [Card](src/lib/docs/components/card.md) - Content containers
- [Alert](src/lib/docs/components/alert.md) - Feedback messages
- [Avatar](src/lib/docs/components/avatar.md) - User profiles

**Form Components**
- [Input](src/lib/docs/components/input.md) - Text inputs
- [Checkbox](src/lib/docs/components/checkbox.md) - Boolean selection
- [Switch](src/lib/docs/components/switch.md) - Toggle switches
- [Select](src/lib/docs/components/select.md) - Dropdown selection

**Navigation**
- [Tabs](src/lib/docs/components/tabs.md) - Tab navigation
- [Breadcrumb](src/lib/docs/components/breadcrumb.md) - Path indicators
- [Dropdown Menu](src/lib/docs/components/dropdown-menu.md) - Context menus

**Feedback & Layout**
- [Progress](src/lib/docs/components/progress.md) - Progress indicators
- [Tooltip](src/lib/docs/components/tooltip.md) - Contextual help
- [Modal](src/lib/docs/components/modal.md) - Dialog overlays
- [Accordion](src/lib/docs/components/accordion.md) - Collapsible content
- [Popover](src/lib/docs/components/popover.md) - Floating content

### 📖 [Guides](src/lib/docs/guides/)
- [Design System](src/lib/docs/guides/design-system.md) - Building consistency
- [Advanced Usage](src/lib/docs/guides/advanced-usage.md) - Complex patterns  
- [Accessibility](src/lib/docs/guides/accessibility.md) - WCAG compliance
- [Testing](src/lib/docs/guides/testing.md) - Component testing
- [Migration](src/lib/docs/guides/migration.md) - From other libraries

### 💻 [Examples](src/lib/docs/examples/)
- [Form Patterns](src/lib/docs/examples/forms.md) - Complex forms
- [Dashboard Layout](src/lib/docs/examples/dashboard.md) - Admin interfaces
- [E-commerce UI](src/lib/docs/examples/e-commerce.md) - Product displays
- [Data Display](src/lib/docs/examples/data-display.md) - Tables and lists

## 🎨 Live Demo

Experience the components in action:

```bash
npm start
```

Then visit:
- `/demo` - Interactive component showcase
- `/docs` - Full documentation with sidebar navigation
- `/comprehensive` - Complete component gallery

## ✨ Key Features

- 🎯 **Perfect shadcn/ui Parity** - Identical API to React version
- 🚀 **Angular Native** - Signals, standalone components, modern patterns
- 📱 **Fully Responsive** - Mobile-first design
- ♿ **Accessibility First** - WCAG 2.1 AA compliant
- 🎨 **Themeable** - Dark mode, CSS variables, custom schemes
- 📦 **Tree Shakeable** - Import only what you need
- 🔧 **Developer Experience** - TypeScript, IntelliSense, documentation
- 🧪 **Battle Tested** - Production ready with comprehensive tests

## 🏆 Comparison

| Feature | shadcn/ui Angular | Angular Material | PrimeNG |
|---------|-------------------|------------------|---------|
| **Bundle Size** | 🟢 Minimal (only what you use) | 🟡 Large | 🔴 Very Large |
| **Customization** | 🟢 Full Control | 🟡 Limited | 🟡 Theme-based |
| **Modern Angular** | 🟢 Signals + Standalone | 🟡 Partial | 🟡 Partial |
| **Copy & Paste** | 🟢 Yes | ❌ No | ❌ No |
| **shadcn/ui Parity** | 🟢 100% | ❌ No | ❌ No |

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](src/lib/docs/contributing.md) for details.

### Areas for Contribution
- 🐛 Bug reports and fixes
- ✨ New components and features  
- 📖 Documentation improvements
- 🧪 Test coverage
- ♿ Accessibility enhancements

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

## 🙏 Acknowledgments

- [shadcn](https://twitter.com/shadcn) for the original design system
- [Radix UI](https://www.radix-ui.com/) for accessibility primitives  
- [Tailwind CSS](https://tailwindcss.com/) for the utility framework
- [Angular Team](https://angular.io/) for the amazing framework

---

<div align="center">

**[Get Started](src/lib/docs/installation.md)** • **[Browse Components](src/lib/docs/components/)** • **[View Examples](src/lib/docs/examples/)** • **[Contribute](src/lib/docs/contributing.md)**

Made with ❤️ by the Angular community

</div>