import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from '../../../app-state';
import { Car } from '../../models/car';
import {
  appendCar,
  replaceCar,
  deleteCar,
  editCar,
  cancelCar
} from '../../car.actions';

@Component({
  selector: 'car-home',
  templateUrl: './car-home.component.html',
  styleUrls: ['./car-home.component.css']
})
export class CarHomeComponent {
  cars$ = this.store.pipe(select(state => state.cars));
  editCarId$ = this.store.pipe(select('editCarId'));

  constructor(private store: Store<AppState>) {}

  doAddCar(car: Car) {
    this.store.dispatch(appendCar({ car }));
  }

  doReplaceCar(car: Car) {
    this.store.dispatch(replaceCar({ car }));
  }

  doDeleteCar(carId: number) {
    this.store.dispatch(deleteCar({ carId }));
  }

  doEditCar(carId: number) {
    this.store.dispatch(editCar({ carId }));
  }

  doCancelCar() {
    this.store.dispatch(cancelCar());
  }
}
