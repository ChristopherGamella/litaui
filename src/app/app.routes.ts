import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/test',
    pathMatch: 'full'
  },
  {
    path: 'test',
    loadComponent: () => import('../lib/components/ui/button-test.component').then(c => c.ButtonTestComponent),
    title: 'Button Test'
  },
  {
    path: 'minimal',
    loadComponent: () => import('../lib/components/ui/minimal-demo.component').then(c => c.MinimalDemoComponent),
    title: 'Minimal Demo'
  },
  {
    path: 'button-demo',
    loadComponent: () => import('../lib/components/ui/button-demo.component').then(c => c.ButtonDemoComponent),
    title: 'Button Demo'
  },
  {
    path: 'demo',
    loadComponent: () => import('../lib/components/ui/demo.component').then(c => c.DemoComponent),
    title: 'Component Demo'
  },
  {
    path: 'comprehensive',
    loadComponent: () => import('../lib/components/ui/shadcn-showcase.component').then(c => c.ShadcnShowcaseComponent),
    title: 'Comprehensive Demo'
  },
  {
    path: '**',
    redirectTo: '/test'
  }
];
