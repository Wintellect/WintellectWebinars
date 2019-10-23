import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, createFeatureSelector, createSelector, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { refreshCarRequest } from '../../car-view.actions';
import { CarViewState } from '../../car-view.state';
import { Car } from '../../../car-core/models/car';

const carViewSelector = createFeatureSelector<{ carView: CarViewState }, CarViewState>('carView');

const carSelector = createSelector(carViewSelector, state => state.car);

@Component({
  selector: 'app-car-view-container',
  templateUrl: './car-view-container.component.html',
  styleUrls: ['./car-view-container.component.css']
})
export class CarViewContainerComponent implements OnInit {

  car$: Observable<Car>;

  constructor(
    private store: Store<{ carView: CarViewState }>,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.car$ = this.store.pipe(select(carSelector));

    this.store.dispatch(refreshCarRequest({
      carId: Number(this.route.snapshot.params.carId),
    }));
  }

  doReturnToTable() {
    this.router.navigateByUrl('/');
  }
}
