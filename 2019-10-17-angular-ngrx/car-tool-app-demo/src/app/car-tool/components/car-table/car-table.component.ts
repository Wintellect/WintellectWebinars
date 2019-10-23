import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Car } from '../../models/car';

@Component({
  selector: 'car-table',
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.css'],
})
export class CarTableComponent {

  @Input()
  cars: Car[] = [];

  @Input()
  editCarId = 0;

  @Output()
  editCar = new EventEmitter<number>();

  @Output()
  deleteCar = new EventEmitter<number>();

  @Output()
  saveCar = new EventEmitter<Car>();

  @Output()
  cancelCar = new EventEmitter<void>();

  doEdit(carId: number) {
    this.editCar.emit(carId);
  }

  doDelete(carId: number) {
    this.deleteCar.emit(carId);
  }

  doSave(car: Car) {
    this.saveCar.emit(car);
  }

  doCancel() {
    this.cancelCar.emit();
  }

}
