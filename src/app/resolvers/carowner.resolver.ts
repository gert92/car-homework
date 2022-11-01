import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CarService } from '../services/car.service';
import { Car } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class CarownerResolver implements Resolve<Car[]> {
  constructor(private carService: CarService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Car[]> {
    return this.carService.getCarsByOwner(route.params['id']);
  }
}
