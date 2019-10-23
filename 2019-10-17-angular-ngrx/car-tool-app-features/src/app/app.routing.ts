import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // pathMatch: 'full',
    loadChildren: () => import('./car-tool-app/car-tool-app.module').then(m => m.CarToolAppModule),
  }
];

export const AppRouterModule = RouterModule.forRoot(routes);
