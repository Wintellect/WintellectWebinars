import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CarsService } from './cars.service';

describe('CarsService', () => {

  let carsSvc: CarsService;
  let http: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
  }));

  beforeEach(() => {
    carsSvc = TestBed.get(CarsService);
    http = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: CarsService = TestBed.get(CarsService);
    expect(service).toBeTruthy();
  });

  it('should get all cars', () => {

    const expectedCars = [
      { id: 1, make: 'test make', model: 'test model', year: 2015, color: 'green', price: 10000 },
    ];

    carsSvc.all().subscribe(cars => {
      expect(cars).toEqual(expectedCars);
    });

    const testReq = http.expectOne('http://localhost:4250/cars');
    expect(testReq.request.method).toEqual('GET');

    testReq.flush(expectedCars);

  });

  afterEach(() => {
    http.verify();
  });



});
