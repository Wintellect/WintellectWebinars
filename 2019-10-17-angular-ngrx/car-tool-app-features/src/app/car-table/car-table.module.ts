import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CarCoreModule } from '../car-core/car-core.module';
import { CarTableRouterModule } from './car-table.routing';
import { carTableReducer } from './car-table.reducer';
import { CarTableEffects } from './car-table.effects';

import { CarTableComponent } from './components/car-table/car-table.component';
import { CarTableContainerComponent } from './components/car-table-container/car-table-container.component';

@NgModule({
  declarations: [CarTableComponent, CarTableContainerComponent],
  exports: [CarTableContainerComponent],
  imports: [
    CommonModule,
    CarCoreModule,
    CarTableRouterModule,
    StoreModule.forFeature('carTable', carTableReducer),
    EffectsModule.forFeature([ CarTableEffects ]),
  ]
})
export class CarTableModule { }
