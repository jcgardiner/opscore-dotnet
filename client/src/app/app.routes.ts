import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login').then(m => m.LoginComponent)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: 'sites',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/sites/sites').then(m => m.SitesComponent)
  },
  {
    path: 'sites/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/sites/site-detail').then(m => m.SiteDetailComponent)
  },
  {
    path: 'assets',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/assets/assets').then(m => m.Assets)
  },
  {
    path: 'assets/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/assets/asset-detail').then(m => m.AssetDetailComponent)
  },
  {
    path: 'personnel',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/personnel/personnel').then(m => m.PersonnelComponent)
  },
  {
    path: 'personnel/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/personnel/personnel-detail').then(m => m.PersonnelDetailComponent)
  },
  {
    path: 'inspections',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/inspections/inspections').then(m => m.InspectionsComponent)
  },
  {
    path: 'inspections/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/inspections/inspection-detail').then(m => m.InspectionDetailComponent)
  },
  {
    path: 'work-orders',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/work-orders/work-orders').then(m => m.WorkOrdersComponent)
  },
  {
    path: 'work-orders/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/work-orders/work-order-detail').then(m => m.WorkOrderDetailComponent)
  },
  {
    path: 'incidents',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/incidents/incidents').then(m => m.IncidentsComponent)
  },
  {
    path: 'incidents/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/incidents/incident-detail').then(m => m.IncidentDetailComponent)
  },
  {
    path: 'analytics',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/analytics/analytics').then(m => m.AnalyticsComponent)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];