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
    path: 'assets',
    loadComponent: () =>
      import('./features/assets/assets').then(m => m.Assets)
  },
  {
    path: 'assets/:id',
    loadComponent: () =>
      import('./features/assets/asset-detail').then(m => m.AssetDetailComponent)
  },
  {
    path: 'personnel',
    loadComponent: () =>
      import('./features/personnel/personnel').then(m => m.PersonnelComponent)
  },
  {
    path: 'personnel/:id',
    loadComponent: () =>
      import('./features/personnel/personnel-detail').then(m => m.PersonnelDetailComponent)
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
    path: 'incidents/:id',
    loadComponent: () =>
      import('./features/incidents/incident-detail').then(m => m.IncidentDetailComponent)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];