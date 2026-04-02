import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard').then(m => m.DashboardComponent)
  },
  {
    path: 'sites',
    loadComponent: () =>
    import('./features/sites/sites').then(m => m.SitesComponent)
  },
  {
    path: 'sites/:id',
    loadComponent: () =>
      import('./features/sites/site-detail').then(m => m.SiteDetailComponent)
  },
  {
    path: 'assets',
    loadComponent: () =>
      import('./features/assets/assets').then(m => m.Assets)
  },
  {
    path: 'personnel',
    loadComponent: () =>
      import('./features/personnel/personnel').then(m => m.PersonnelComponent)
  },
  {
    path: 'inspections',
    loadComponent: () =>
      import('./features/inspections/inspections').then(m => m.InspectionsComponent)
  },
  {
    path: 'work-orders',
    loadComponent: () =>
      import('./features/work-orders/work-orders').then(m => m.WorkOrdersComponent)
  },
  {
    path: 'incidents',
    loadComponent: () =>
      import('./features/incidents/incidents').then(m => m.IncidentsComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];