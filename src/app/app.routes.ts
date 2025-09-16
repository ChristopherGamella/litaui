import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/demo',
    pathMatch: 'full'
  },
  {
    path: 'demo',
    loadComponent: () => import('../lib/components/ui/demo.component').then(c => c.DemoComponent),
    title: 'Component Demo'
  },
  {
    path: 'comprehensive',
    loadComponent: () => import('../lib/components/ui/comprehensive-demo.component').then(c => c.ComprehensiveDemoComponent),
    title: 'Comprehensive Demo'
  },
  {
    path: '**',
    redirectTo: '/demo'
  }
];
