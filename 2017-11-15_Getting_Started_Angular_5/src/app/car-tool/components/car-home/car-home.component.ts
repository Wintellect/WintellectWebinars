import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';


import { Car } from '../../models/car';
import { CarsService } from '../../services/cars.service';

@Component({
  selector: 'car-home',
  templateUrl: './car-home.component.html',
  styleUrls: ['./car-home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarHomeComponent implements OnInit {

  public cars: Car[] = [];
  public carForm: FormGroup;

  constructor(private carsSvc: CarsService) { }

  public refreshCars() {
    return this.carsSvc.all().then(cars => {
      this.cars = cars;
    });
  }

  ngOnInit() {
    this.refreshCars();
  }

  addCar(car: Car) {
    this.carsSvc.insert(car).then(() => this.refreshCars());
  }

  deleteCar(carId: number) {
    this.carsSvc.delete(carId).then(() => this.refreshCars());
  }

}
