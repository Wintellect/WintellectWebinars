import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Car } from '../../../car-core/models/car';

@Component({
  selector: 'app-car-table',
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.css']
})
export class CarTableComponent implements OnInit {

  @Input()
  cars: Car[] = [];

  @Output()
  viewCar = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }
}
