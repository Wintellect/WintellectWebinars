import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ViewCarRowComponent } from './view-car-row.component';

describe('ViewCarRowComponent', () => {

  let component: ViewCarRowComponent;
  let fixture: ComponentFixture<ViewCarRowComponent>;

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
      declarations: [ ViewCarRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCarRowComponent);
    component = fixture.componentInstance;
    component.car = car;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the columns', () => {

    const tds = fixture.debugElement.queryAll(By.css('td'));

    expect(Number(tds[0].nativeElement.innerText)).toEqual(car.id);
    expect(tds[1].nativeElement.innerText).toEqual(car.make);
    expect(tds[2].nativeElement.innerText).toEqual(car.model);
    expect(Number(tds[3].nativeElement.innerText)).toEqual(car.year);
    expect(tds[4].nativeElement.innerText).toEqual(car.color);
    expect(Number(tds[5].nativeElement.innerText)).toEqual(car.price);

  });

  it('should pass id when clicking edit', (done) => {

    const subscription = component.editCar.subscribe(carId => {
      expect(carId).toEqual(car.id);
      subscription.unsubscribe();
      done();
    });

    const buttonElement = fixture.debugElement.query(By.css('button')).nativeElement as HTMLButtonElement;

    buttonElement.dispatchEvent(new Event('click'));

  });

  it('should pass id when clicking delete', (done) => {

    const subscription = component.deleteCar.subscribe(carId => {
      expect(carId).toEqual(car.id);
      subscription.unsubscribe();
      done();
    });

    const buttonElement = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement as HTMLButtonElement;

    buttonElement.dispatchEvent(new Event('click'));

  });


});
