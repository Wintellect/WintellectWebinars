import { Car } from './car-tool/models/car';

export interface AppState {
  cars: Car[];
  editCarId: number;
}