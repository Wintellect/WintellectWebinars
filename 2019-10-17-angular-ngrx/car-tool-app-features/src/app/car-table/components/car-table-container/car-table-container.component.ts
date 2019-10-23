import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, createFeatureSelector, createSelector, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CarTableState } from '../../car-table.state';
import { Car } from '../../../car-core/models/car';
import { refreshCarsRequest } from '../../car-table.actions';

const featureSelector = createFeatureSelector<{ carTable: CarTableState }, CarTableState>('carTable');
const carsSelector = createSelector(
  featureSelector,
  ({ cars }) => cars,
);

@Component({
  selector: 'app-car-table-container',
  templateUrl: './car-table-container.component.html',
  styleUrls: ['./car-table-container.component.css']
})
export class CarTableContainerComponent implements OnInit {

  errorMessage$: Observable<string>;
  cars$: Observable<Car[]>;

  constructor(
    private store: Store<{ carTable: CarTableState }>,
    private router: Router
  ) { }

  ngOnInit() {
    this.errorMessage$ = this.store.pipe(select('errorMessage'));
    this.cars$ = this.store.pipe(select(carsSelector));

    this.store.dispatch(refreshCarsRequest());
  }

  doRefreshCars() {
    this.store.dispatch(refreshCarsRequest());
  }

  doViewCar(carId: number) {
    this.router.navigateByUrl('/view/' + encodeURIComponent(String(carId)));
  }

}
