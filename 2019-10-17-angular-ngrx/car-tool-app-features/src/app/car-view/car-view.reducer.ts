import { createReducer, on } from '@ngrx/store';

import { CarViewState } from './car-view.state';
import { refreshCarDone } from './car-view.actions';


export const carViewReducer = createReducer<CarViewState>({ car: null },
  on(refreshCarDone, (state, action) => ({
    ...state,
    car: action.car
  })),
);

