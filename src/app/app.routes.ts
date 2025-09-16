import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/test',
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
    path: '**',
    redirectTo: '/test'
  }
];
