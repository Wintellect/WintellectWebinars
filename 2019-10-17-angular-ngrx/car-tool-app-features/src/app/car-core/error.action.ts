import { createAction, props } from '@ngrx/store';

export const errorOccurred = createAction(
  '[Error] Error Occurred',
  props<{ errorMessage: string}>(),
);
