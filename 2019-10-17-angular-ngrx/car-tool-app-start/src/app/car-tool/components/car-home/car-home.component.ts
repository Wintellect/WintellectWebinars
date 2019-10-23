import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { concatMapTo, map } from 'rxjs/operators';

import { Car } from '../../models/car';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'car-home',
  templateUrl: './car-home.component.html',
  styleUrls: ['./car-home.component.css']
})
export class CarHomeComponent implements OnInit {

  headerText = 'Car Tool';

  cars: Car[] = [];

  editCarId = 0;

  constructor(private carsSvc: CarsService) { }

  refreshCars(mutate?: Observable<any>) {

    const pipes = [
      concatMapTo(this.carsSvc.all()),
      map( (cars: Car[]) => cars.slice(0, 3)),
    ];

    (mutate || of(null))
      .pipe(...pipes as [])
      .subscribe(cars => { this.cars = cars; }, err => {
        console.log(err);
        this.cars = [];
      }, () => {
        this.editCarId = 0;
      });
  }

  ngOnInit() {
    this.refreshCars();
  }

  doRefreshCars() {
    this.refreshCars();
  }

  doEditCar(carId) {
    this.editCarId = carId;
  }

  doCancelCar() {
    this.editCarId = 0;
  }

  doDeleteCar(carId) {
    this.refreshCars(this.carsSvc.delete(carId));
  }

  doReplaceCar(car: Car) {
    this.refreshCars(this.carsSvc.replace(car));
  }

  doAppendCar(newCar: Car) {
    this.refreshCars(this.carsSvc.append(newCar));
  }

}
