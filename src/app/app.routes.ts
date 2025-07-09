import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CurrencyGraphComponent } from './components/currency-graph/currency-graph.component';
import { ExchangeListComponent } from './components/exchange-list/exchange-list.component';
import { NewNodeComponent } from './components/new-node/new-node.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'currency-graph',
    loadComponent: () =>
      import('./components/currency-graph/currency-graph.component').then(m => m.CurrencyGraphComponent)
  },
  {
    path: 'new-node',
    loadComponent: () =>
      import('./components/new-node/new-node.component').then(m => m.NewNodeComponent)
  }
];
