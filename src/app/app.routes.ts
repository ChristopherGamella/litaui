import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/docs',
    pathMatch: 'full'
  },
  {
    path: 'test',
    loadComponent: () => import('../lib/demo/components/button-test.component').then(c => c.ButtonTestComponent),
    title: 'Button Test'
  },
  {
    path: 'demo',
    loadComponent: () => import('../lib/demo/components/demo.component').then(c => c.DemoComponent),
    title: 'Component Demo'
  },
  {
    path: 'comprehensive',
    loadComponent: () => import('../lib/demo/components/shadcn-showcase.component').then(c => c.ShadcnShowcaseComponent),
    title: 'Comprehensive Demo'
  },
  {
    path: 'checkbox',
    loadComponent: () => import('../lib/demo/components/checkbox-demo.component').then(c => c.CheckboxDemoComponent),
    title: 'Checkbox Demo'
  },
  {
    path: 'checkbox-test',
    loadComponent: () => import('../lib/demo/components/checkbox-test.component').then(c => c.CheckboxTestComponent),
    title: 'Checkbox Test'
  },
  // Documentation routes
  {
    path: 'docs',
    children: [
      {
        path: '',
        redirectTo: 'introduction',
        pathMatch: 'full'
      },
      {
        path: 'introduction',
        loadComponent: () => import('./docs/introduction.component').then(c => c.DocsIntroductionComponent),
        title: 'Introduction - shadcn/ui for Angular'
      },
      {
        path: 'installation',
        loadComponent: () => import('./docs/installation.component').then(c => c.DocsInstallationComponent),
        title: 'Installation - shadcn/ui for Angular'
      },
      // Component documentation routes
      {
        path: 'components',
        children: [
          // Core Components
          {
            path: 'button',
            loadComponent: () => import('./docs/components/button.component').then(c => c.DocsButtonComponent),
            title: 'Button - Components'
          },
          {
            path: 'card',
            loadComponent: () => import('./docs/components/card.component').then(c => c.DocsCardComponent),
            title: 'Card - Components'
          }
          // TODO: Add remaining components as they are created
          // {
          //   path: 'badge',
          //   loadComponent: () => import('./docs/components/badge.component').then(c => c.DocsBadgeComponent),
          //   title: 'Badge - Components'
          // },
          // ... more components will be added here
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/docs'
  }
];