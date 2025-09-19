import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/docs',
    pathMatch: 'full'
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
          },
          {
            path: 'command',
            loadComponent: () => import('./docs/components/command.component').then(c => c.DocsCommandComponent),
            title: 'Command - Components'
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