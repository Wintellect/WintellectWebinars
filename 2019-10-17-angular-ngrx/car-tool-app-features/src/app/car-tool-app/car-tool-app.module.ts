import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule} from '@ngrx/store-devtools';
import { CarHomeComponent } from './components/car-home/car-home.component';
import { CarToolAppRouterModule } from './car-tool-app.routing';
import { errorMessageReducer } from './error-message.reducer';

@NgModule({
  declarations: [CarHomeComponent],
  imports: [
    CommonModule,
    CarToolAppRouterModule,
    StoreModule.forRoot({
      router: routerReducer,
      errorMessage: errorMessageReducer,
    }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument(),
  ]
})
export class CarToolAppModule { }
