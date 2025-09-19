/**
 * Documentation navigation structure
 * Defines the sidebar navigation for the documentation site
 */

export interface DocNavigationItem {
  id: string;
  title: string;
  href?: string;
  description?: string;
  items?: DocNavigationItem[];
  badge?: string;
  icon?: string;
}

export const DOC_NAVIGATION: DocNavigationItem[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    items: [
      {
        id: 'introduction',
        title: 'Introduction',
        href: '/docs/introduction',
        description: 'What is shadcn/ui for Angular and why use it?'
      },
      {
        id: 'installation',
        title: 'Installation',
        href: '/docs/installation',
        description: 'Get started with installation and setup'
      },
      {
        id: 'quick-start',
        title: 'Quick Start',
        href: '/docs/quick-start',
        description: 'Build your first component in minutes'
      },
      {
        id: 'theming',
        title: 'Theming',
        href: '/docs/theming',
        description: 'Customize colors, fonts, and design tokens'
      }
    ]
  },
  {
    id: 'components',
    title: 'Components',
    items: [
      {
        id: 'core',
        title: 'Core Components',
        items: [
          {
            id: 'button',
            title: 'Button',
            href: '/docs/components/button',
            description: 'Primary interaction element with variants'
          },
          {
            id: 'badge',
            title: 'Badge',
            href: '/docs/components/badge',
            description: 'Status indicators and labels'
          },
          {
            id: 'card',
            title: 'Card',
            href: '/docs/components/card',
            description: 'Content containers with headers/footers'
          },
          {
            id: 'command',
            title: 'Command',
            href: '/docs/components/command',
            description: 'Command palette with search and navigation'
          },
          {
            id: 'alert',
            title: 'Alert',
            href: '/docs/components/alert',
            description: 'Contextual feedback messages'
          },
          {
            id: 'avatar',
            title: 'Avatar',
            href: '/docs/components/avatar',
            description: 'User profile images and initials'
          }
        ]
      },
      {
        id: 'form',
        title: 'Form Components',
        items: [
          {
            id: 'input',
            title: 'Input',
            href: '/docs/components/input',
            description: 'Form inputs with validation states'
          },
          {
            id: 'checkbox',
            title: 'Checkbox',
            href: '/docs/components/checkbox',
            description: 'Boolean selection with indeterminate state'
          },
          {
            id: 'switch',
            title: 'Switch',
            href: '/docs/components/switch',
            description: 'Toggle switches with form integration'
          },
          {
            id: 'select',
            title: 'Select',
            href: '/docs/components/select',
            description: 'Dropdown selection with search'
          }
        ]
      },
      {
        id: 'navigation',
        title: 'Navigation',
        items: [
          {
            id: 'tabs',
            title: 'Tabs',
            href: '/docs/components/tabs',
            description: 'Navigation tabs with content management'
          },
          {
            id: 'breadcrumb',
            title: 'Breadcrumb',
            href: '/docs/components/breadcrumb',
            description: 'Navigation path indicators'
          },
          {
            id: 'dropdown-menu',
            title: 'Dropdown Menu',
            href: '/docs/components/dropdown-menu',
            description: 'Context menus with keyboard navigation'
          }
        ]
      },
      {
        id: 'feedback',
        title: 'Feedback',
        items: [
          {
            id: 'progress',
            title: 'Progress',
            href: '/docs/components/progress',
            description: 'Progress indicators with variants'
          },
          {
            id: 'tooltip',
            title: 'Tooltip',
            href: '/docs/components/tooltip',
            description: 'Contextual information popover'
          },
          {
            id: 'modal',
            title: 'Modal',
            href: '/docs/components/modal',
            description: 'Overlay dialogs with focus management'
          }
        ]
      },
      {
        id: 'layout',
        title: 'Layout',
        items: [
          {
            id: 'accordion',
            title: 'Accordion',
            href: '/docs/components/accordion',
            description: 'Collapsible content sections'
          },
          {
            id: 'popover',
            title: 'Popover',
            href: '/docs/components/popover',
            description: 'Floating content containers'
          }
        ]
      }
    ]
  },
  {
    id: 'guides',
    title: 'Guides',
    items: [
      {
        id: 'design-system',
        title: 'Design System',
        href: '/docs/guides/design-system',
        description: 'Building a consistent design system'
      },
      {
        id: 'advanced-usage',
        title: 'Advanced Usage',
        href: '/docs/guides/advanced-usage',
        description: 'Complex patterns and customization'
      },
      {
        id: 'accessibility',
        title: 'Accessibility',
        href: '/docs/guides/accessibility',
        description: 'WCAG compliance and best practices'
      },
      {
        id: 'testing',
        title: 'Testing',
        href: '/docs/guides/testing',
        description: 'Testing strategies for UI components'
      },
      {
        id: 'migration',
        title: 'Migration Guide',
        href: '/docs/guides/migration',
        description: 'Migrate from other component libraries'
      }
    ]
  },
  {
    id: 'examples',
    title: 'Examples',
    items: [
      {
        id: 'forms',
        title: 'Form Patterns',
        href: '/docs/examples/forms',
        description: 'Complex form layouts and validation'
      },
      {
        id: 'dashboard',
        title: 'Dashboard Layout',
        href: '/docs/examples/dashboard',
        description: 'Building admin dashboards'
      },
      {
        id: 'e-commerce',
        title: 'E-commerce UI',
        href: '/docs/examples/e-commerce',
        description: 'Product cards, shopping carts, and checkout'
      },
      {
        id: 'data-display',
        title: 'Data Display',
        href: '/docs/examples/data-display',
        description: 'Tables, lists, and data visualization'
      }
    ]
  },
  {
    id: 'resources',
    title: 'Resources',
    items: [
      {
        id: 'contributing',
        title: 'Contributing',
        href: '/docs/contributing',
        description: 'How to contribute to the project'
      },
      {
        id: 'roadmap',
        title: 'Roadmap',
        href: '/docs/roadmap',
        description: 'Future plans and upcoming features'
      },
      {
        id: 'changelog',
        title: 'Changelog',
        href: '/docs/changelog',
        description: 'Latest updates and releases'
      },
      {
        id: 'comparison',
        title: 'Comparison',
        href: '/docs/comparison',
        description: 'How we compare to other libraries'
      }
    ]
  }
];

/**
 * Get all navigation items as a flat array
 */
export function getAllNavigationItems(): DocNavigationItem[] {
  const items: DocNavigationItem[] = [];
  
  function collectItems(navItems: DocNavigationItem[]) {
    for (const item of navItems) {
      if (item.href) {
        items.push(item);
      }
      if (item.items) {
        collectItems(item.items);
      }
    }
  }
  
  collectItems(DOC_NAVIGATION);
  return items;
}

/**
 * Find navigation item by href
 */
export function findNavigationItem(href: string): DocNavigationItem | undefined {
  return getAllNavigationItems().find(item => item.href === href);
}

/**
 * Get breadcrumb path for a given href
 */
export function getBreadcrumbPath(href: string): DocNavigationItem[] {
  const breadcrumbs: DocNavigationItem[] = [];
  
  function findPath(items: DocNavigationItem[], targetHref: string, path: DocNavigationItem[]): boolean {
    for (const item of items) {
      const currentPath = [...path, item];
      
      if (item.href === targetHref) {
        breadcrumbs.push(...currentPath);
        return true;
      }
      
      if (item.items && findPath(item.items, targetHref, currentPath)) {
        return true;
      }
    }
    return false;
  }
  
  findPath(DOC_NAVIGATION, href, []);
  return breadcrumbs;
}