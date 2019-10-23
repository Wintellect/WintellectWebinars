import { Routes, RouterModule } from '@angular/router';

import { CarHomeComponent } from './components/car-home/car-home.component';

export const routes: Routes = [
  {
    path: '',
    component: CarHomeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../car-table/car-table.module')
            .then(m => m.CarTableModule),
      },
      {
        path: 'view/:carId',
        loadChildren: () =>
          import('../car-view/car-view.module')
            .then(m => m.CarViewModule),
      },
    ],
  },
];

export const CarToolAppRouterModule = RouterModule.forChild(routes);
