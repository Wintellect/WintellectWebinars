import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { CarsService } from './services/cars.service';
import { CarHomeComponent } from './components/car-home/car-home.component';
import { CarTableComponent } from './components/car-table/car-table.component';
import { CarFormComponent } from './components/car-form/car-form.component';

@NgModule({
  imports: [
    CommonModule, HttpClientModule, ReactiveFormsModule,
  ],
  declarations: [CarHomeComponent, CarTableComponent, CarFormComponent],
  exports: [CarHomeComponent],
  providers: [CarsService],
})
export class CarToolModule { }
