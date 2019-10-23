import { Routes, RouterModule } from '@angular/router';

import { CarTableContainerComponent} from './components/car-table-container/car-table-container.component';

export const routes: Routes = [
  { path: '', component: CarTableContainerComponent },
];

export const CarTableRouterModule = RouterModule.forChild(routes);
