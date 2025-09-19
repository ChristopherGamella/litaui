# Installation

Get started with shadcn/ui for Angular in your project.

## Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.10 or later
- **Angular CLI** 20+ 
- **Angular** 20+ project

## Framework Setup

If you don't have an Angular project yet, create one:

```bash
npm install -g @angular/cli
ng new my-shadcn-app
cd my-shadcn-app
```

## Install Dependencies

Install the required packages:

```bash
npm install lucide-angular class-variance-authority clsx tailwind-merge
```

### Package Overview

- **lucide-angular**: Beautiful icon library
- **class-variance-authority**: Utilities for component variants
- **clsx**: Conditional class name utility
- **tailwind-merge**: Tailwind CSS class merging utility

## Configure Tailwind CSS

### 1. Install Tailwind CSS

```bash
npm install -D tailwindcss @tailwindcss/typography postcss autoprefixer
npx tailwindcss init -p
```

### 2. Configure Tailwind

Update your `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/shadcn-angular/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

### 3. Add CSS Variables

Add the following to your `src/styles.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## Copy Components

Now you can start copying components into your project. Each component page provides the source code that you can copy directly into your project.

### Create Component Structure

We recommend organizing components like this:

```
src/
├── app/
│   └── components/
│       └── ui/
│           ├── button.component.ts
│           ├── card.component.ts
│           └── ...
└── styles.css
```

### Example: Adding a Button

1. Copy the button component code from the [Button documentation](/docs/components/button)
2. Create `src/app/components/ui/button.component.ts`
3. Paste the code
4. Import and use in your components

```typescript
import { Component } from '@angular/core';
import { ButtonComponent } from './components/ui/button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <lib-button variant="default" size="lg">
      Get Started
    </lib-button>
  `
})
export class HomeComponent {}
```

## Verification

Test your setup with a simple component:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-test',
  standalone: true,
  template: `
    <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg">
      <h1 class="text-xl font-semibold text-gray-900">
        shadcn/ui for Angular
      </h1>
      <p class="text-gray-500">Setup complete!</p>
    </div>
  `
})
export class TestComponent {}
```

If the styling looks correct, you're ready to start using components!

## Next Steps

- [Quick Start Guide](/docs/quick-start) - Build your first component
- [Theming](/docs/theming) - Customize colors and design tokens
- [Components](/docs/components) - Browse all available components

## Troubleshooting

### Styles not applying

1. Ensure Tailwind CSS is properly configured
2. Check that CSS variables are defined in your `styles.css`
3. Verify content paths in `tailwind.config.js`

### TypeScript errors

1. Ensure all dependencies are installed
2. Check Angular version compatibility
3. Verify import paths are correct

### Build errors

1. Check for missing dependencies
2. Ensure Tailwind CSS is in your build pipeline
3. Verify all component imports are standalone

Need help? Check our [troubleshooting guide](/docs/guides/troubleshooting) or open an issue on GitHub.