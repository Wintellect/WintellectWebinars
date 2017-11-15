import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

import { Car } from '../../models/car';

@Component({
  selector: 'car-table',
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CarTableComponent implements OnInit {

  @Input()
  cars: Car[];

  @Output()
  deleteCar = new EventEmitter<number>();

  constructor() { }

  ngOnInit() { }
}
