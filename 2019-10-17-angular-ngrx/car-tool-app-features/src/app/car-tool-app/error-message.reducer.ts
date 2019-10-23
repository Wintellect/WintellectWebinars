import { createReducer, on } from '@ngrx/store';

import { errorOccurred } from '../car-core/error.action';

export const errorMessageReducer = createReducer('',
  on(errorOccurred, (_, action) => action.errorMessage),
);
