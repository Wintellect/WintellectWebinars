import { Routes, RouterModule } from '@angular/router';

import { CarViewContainerComponent} from './components/car-view-container/car-view-container.component';

export const routes: Routes = [
  { path: '', component: CarViewContainerComponent },
];

export const CarViewRouterModule = RouterModule.forChild(routes);
