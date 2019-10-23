import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';


import { CarToolModule } from './car-tool/car-tool.module';
import { AppRoutingModule } from './app-routing.module';

import { carsReducer, editCarIdReducer } from './car-tool/car.reducers';
import { CarEffects } from './car-tool/car.effects';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({
      cars: carsReducer,
      editCarId: editCarIdReducer,
    }),
    EffectsModule.forRoot([ CarEffects ]),
    StoreDevtoolsModule.instrument(),
    CarToolModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
