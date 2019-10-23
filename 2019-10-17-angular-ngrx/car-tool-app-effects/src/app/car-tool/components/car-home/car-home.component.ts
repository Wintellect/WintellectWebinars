import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from '../../../app-state';
import { Car } from '../../models/car';
import {
  refreshCarsRequest,
  appendCarRequest,
  replaceCarRequest,
  deleteCarRequest,
  editCar,
  cancelCar
} from '../../car.actions';

@Component({
  selector: 'car-home',
  templateUrl: './car-home.component.html',
  styleUrls: ['./car-home.component.css']
})
export class CarHomeComponent implements OnInit {
  cars$ = this.store.pipe(select(state => state.cars));
  editCarId$ = this.store.pipe(select('editCarId'));

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(refreshCarsRequest());
  }

  doAppendCar(car: Car) {
    this.store.dispatch(appendCarRequest({ car }));
  }

  doReplaceCar(car: Car) {
    this.store.dispatch(replaceCarRequest({ car }));
  }

  doDeleteCar(carId: number) {
    this.store.dispatch(deleteCarRequest({ carId }));
  }

  doEditCar(carId: number) {
    this.store.dispatch(editCar({ carId }));
  }

  doCancelCar() {
    this.store.dispatch(cancelCar());
  }
}
