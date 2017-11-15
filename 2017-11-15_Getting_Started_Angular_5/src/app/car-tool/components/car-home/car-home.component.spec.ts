import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarHomeComponent } from './car-home.component';

describe('CarHomeComponent', () => {
  let component: CarHomeComponent;
  let fixture: ComponentFixture<CarHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
