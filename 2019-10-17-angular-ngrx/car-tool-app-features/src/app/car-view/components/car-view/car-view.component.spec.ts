import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarViewComponent } from './car-view.component';

describe('CarViewComponent', () => {
  let component: CarViewComponent;
  let fixture: ComponentFixture<CarViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
