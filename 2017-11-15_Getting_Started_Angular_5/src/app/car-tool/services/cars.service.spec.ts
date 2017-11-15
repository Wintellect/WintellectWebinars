import { TestBed, inject } from '@angular/core/testing';

import { CarsService } from './cars.service';

describe('CarsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CarsService]
    });
  });

  it('should be created', inject([CarsService], (service: CarsService) => {
    expect(service).toBeTruthy();
  }));
});
