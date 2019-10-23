import { createAction, props } from '@ngrx/store';

import { Car } from '../car-core/models/car';

export const refreshCarRequest = createAction(
  '[CarView] Refresh Car Request',
  props<{ carId: number }>(),
);

export const refreshCarDone = createAction(
  '[CarView] Refresh Car Done',
  props<{ car: Car }>(),
);
