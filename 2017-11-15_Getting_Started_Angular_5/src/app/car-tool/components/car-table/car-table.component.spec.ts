import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTableComponent } from './car-table.component';

describe('CarTableComponent', () => {
  let component: CarTableComponent;
  let fixture: ComponentFixture<CarTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
