import {
  appendCar, replaceCar, deleteCar,
  editCar, cancelCar,
} from './car.actions';

import { createReducer, on } from '@ngrx/store';

import { Car } from './models/car';

const initialCars: Car[] = [
  { id: 1, make: 'Ford', model: 'Fusion Hybrid', year: 2018, color: 'black', price: 25000 },
  { id: 2, make: 'Tesla', model: 'S', year: 2018, color: 'red', price: 125000 },
];

export const carsReducer = createReducer<Car[]>(initialCars,
  on(appendCar, (state, action) => state.concat({
    ...action.car,
    id: Math.max(...state.map(c => c.id), 0) + 1,
  })),
  on(replaceCar, (state, action) => {
    const newCars = state.concat();
    newCars[newCars.findIndex(c => c.id === action.car.id)] = action.car;
    return newCars;
  }),
  on(deleteCar, (state, action) => state.filter(
    c => c.id !== action.carId)),
);

export const editCarIdReducer = createReducer<number>(-1,
    on(editCar, (_, action) => action.carId),
    on(replaceCar, () => -1),
    on(deleteCar, () => -1),
    on(cancelCar, () => -1),
  );
