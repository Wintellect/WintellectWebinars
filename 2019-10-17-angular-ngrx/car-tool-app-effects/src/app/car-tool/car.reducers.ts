import { createReducer, on } from '@ngrx/store';

import { refreshCarsDone, editCar, cancelCar  } from './car.actions';
import { Car } from './models/car';

export const carsReducer = createReducer<Car[]>([],
  on(refreshCarsDone, (_, action) => action.cars),
);

export const editCarIdReducer = createReducer<number>(-1,
  on(editCar, (_, action) => action.carId),
  on(cancelCar, () => -1),
  on(refreshCarsDone, () => -1),
);
