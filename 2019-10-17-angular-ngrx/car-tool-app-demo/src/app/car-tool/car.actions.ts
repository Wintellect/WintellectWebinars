import { createAction, props } from '@ngrx/store';

import { Car } from './models/car';

export const refreshCarsRequest = createAction('[Car] Refresh Cars Request');
export const refreshCarsDone = createAction('[Car] Refresh Cars Done', props<{ cars: Car[] }>());
export const appendCarRequest = createAction('[Car] Append Car Request', props<{ car: Car }>());
export const replaceCarRequest = createAction('[Car] Replace Car Request', props<{ car: Car }>());
export const deleteCarRequest = createAction('[Car] Delete Car Request', props<{ carId: number }>());
export const editCar = createAction('[Car] Edit Car', props<{ carId: number }>());
export const cancelCar = createAction('[Car] Cancel Car');
