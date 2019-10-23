import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

import { CarViewComponent } from './components/car-view/car-view.component';
import { CarViewContainerComponent } from './components/car-view-container/car-view-container.component';
import { carViewReducer } from './car-view.reducer';
import { CarViewEffects } from './car-view.effects';
import { CarViewRouterModule } from './car-view.routing';

@NgModule({
  declarations: [CarViewComponent, CarViewContainerComponent],
  exports: [CarViewContainerComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('carView', carViewReducer),
    EffectsModule.forFeature([ CarViewEffects ]),
    CarViewRouterModule,
  ]
})
export class CarViewModule { }
