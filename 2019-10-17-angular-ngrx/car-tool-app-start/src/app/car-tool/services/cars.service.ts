import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Car } from '../models/car';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  _baseUrl = 'http://localhost:4250/cars';

  constructor(private httpClient: HttpClient) { }

  private getCollectionUrl() {
    return this._baseUrl;
  }

  private getElementUrl(elementId: any) {
    return this._baseUrl + '/' + encodeURIComponent(String(elementId));
  }

  all() {
    return this.httpClient.get<Car[]>(this.getCollectionUrl());
  }

  append(car: Car) {
    return this.httpClient.post<Car>(this.getCollectionUrl(), car);
  }

  replace(car: Car) {
    return this.httpClient.put<Car>(this.getElementUrl(car.id), car);
  }

  delete(carId: number) {
    return this.httpClient.delete<Car>(this.getElementUrl(carId));
  }
}
