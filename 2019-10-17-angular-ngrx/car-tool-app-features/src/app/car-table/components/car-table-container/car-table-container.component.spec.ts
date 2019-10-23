import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarTableContainerComponent } from './car-table-container.component';

describe('CarTableContainerComponent', () => {
  let component: CarTableContainerComponent;
  let fixture: ComponentFixture<CarTableContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarTableContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarTableContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
