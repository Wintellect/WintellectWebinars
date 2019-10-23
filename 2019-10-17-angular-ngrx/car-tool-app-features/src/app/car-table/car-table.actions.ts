import { createAction, props } from '@ngrx/store';

import { Car } from '../car-core/models/car';

export const refreshCarsRequest = createAction('[CarTable] Refresh Cars Request');
export const refreshCarsDone = createAction(
  '[CarTable] Refresh Cars Done',
  props<{ cars: Car[] }>());
