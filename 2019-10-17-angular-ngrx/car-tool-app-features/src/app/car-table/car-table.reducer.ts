import { createReducer, on } from '@ngrx/store';

import { CarTableState } from './car-table.state';
import { refreshCarsDone } from './car-table.actions';

export const carTableReducer = createReducer<CarTableState>(
  { cars: [] },
  on(refreshCarsDone, (state, action) => ({
    ...state,
    cars: action.cars
  })),
);
