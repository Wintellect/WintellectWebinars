import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Car } from '../../models/car';

@Component({
  selector: 'car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarFormComponent implements OnInit {

  public carForm: FormGroup;

  @Output()
  addCar = new EventEmitter<Car>();

  constructor(
    private fb: FormBuilder,
  ) {
    this.carForm = this.fb.group({
      makeInput: '',
      modelInput: '',
      yearInput: '',
      colorInput: '',
      priceInput: '',
    });

  }

  submitCar() {

    const carFormValues = this.carForm.value;

    const car: Car = {
      make: carFormValues.makeInput,
      model: carFormValues.modelInput,
      year: carFormValues.yearInput,
      color: carFormValues.colorInput,
      price: carFormValues.priceInput,
    };

    this.addCar.emit(car);
  }

  ngOnInit() {
  }

}
