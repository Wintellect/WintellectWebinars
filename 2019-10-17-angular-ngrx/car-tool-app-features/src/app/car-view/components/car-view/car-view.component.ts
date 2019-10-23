import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Car } from '../../../car-core/models/car';

@Component({
  selector: 'app-car-view',
  templateUrl: './car-view.component.html',
  styleUrls: ['./car-view.component.css']
})
export class CarViewComponent implements OnInit {

  @Input()
  car: Car;

  @Output()
  returnToTable = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
