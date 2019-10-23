import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { EditCarRowComponent } from './edit-car-row.component';

describe('EditCarRowComponent', () => {
  let component: EditCarRowComponent;
  let fixture: ComponentFixture<EditCarRowComponent>;

  const car = {
    id: 1,
    make: 'test make',
    model: 'test model',
    year: 2000,
    color: 'blue',
    price: 10000,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ EditCarRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarRowComponent);
    component = fixture.componentInstance;
    component.car = car;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should save car', (done) => {

    const inputs = fixture.debugElement.queryAll(By.css('input'));

    expect(inputs[0].nativeElement.value).toBe(car.make);
    expect(inputs[1].nativeElement.value).toBe(car.model);
    expect(Number(inputs[2].nativeElement.value)).toBe(car.year);
    expect(inputs[3].nativeElement.value).toBe(car.color);
    expect(Number(inputs[4].nativeElement.value)).toBe(car.price);

    const makeInput = inputs[0].nativeElement as HTMLInputElement;

    makeInput.value = 'new make';
    makeInput.dispatchEvent(new Event('input'));

    expect(component.editCarForm.controls.make.value).toBe('new make');

    const subscription = component.saveCar.subscribe(carToSave => {
      expect(carToSave).toEqual({
        ...car,
        make: 'new make',
      });
      subscription.unsubscribe();
      done();
    });

    const saveButton = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;
    saveButton.dispatchEvent(new Event('click'));


  });
});
