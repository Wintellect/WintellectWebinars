import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {switchMap, map, catchError} from 'rxjs/operators';

import { errorOccurred } from '../car-core/error.action';
import {
  refreshCarRequest, refreshCarDone,
} from './car-view.actions';
import { Car } from '../car-core/models/car';

@Injectable({
  providedIn: 'root',
})
export class CarViewEffects {

  constructor(
    private httpClient: HttpClient,
    private actions$: Actions,
  ) { }

  refreshCars$ = createEffect(() => this.actions$.pipe(
    ofType(refreshCarRequest),
    switchMap((action) => {
      return this.httpClient
        .get<Car>(`http://localhost:4250/cars/${encodeURIComponent(String(action.carId))}`)
        .pipe(
          map(car => refreshCarDone({ car })),
          catchError(err => of(errorOccurred({ errorMessage: err.message }))),
        );
    }),
  ));

}
