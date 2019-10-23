import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarViewContainerComponent } from './car-view-container.component';

describe('CarViewContainerComponent', () => {
  let component: CarViewContainerComponent;
  let fixture: ComponentFixture<CarViewContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarViewContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarViewContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
