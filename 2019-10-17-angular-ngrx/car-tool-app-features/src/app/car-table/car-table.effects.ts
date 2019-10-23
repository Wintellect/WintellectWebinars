import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {switchMap, map, catchError} from 'rxjs/operators';

import { errorOccurred } from '../car-core/error.action';
import { refreshCarsRequest, refreshCarsDone } from './car-table.actions';
import { Car } from '../car-core/models/car';


@Injectable({
  providedIn: 'root',
})
export class CarTableEffects {

  constructor(
    private httpClient: HttpClient,
    private actions$: Actions,
  ) { }

  refreshCars$ = createEffect(() => this.actions$.pipe(
    ofType(refreshCarsRequest),
    switchMap(() => {
      return this.httpClient
        .get<Car[]>('http://localhost:4250/cars')
        .pipe(
          map(cars =>
            refreshCarsDone({ cars })),
          catchError(err =>
              of(errorOccurred({ errorMessage: err.message }))),
        );
    }),
  ));

}
