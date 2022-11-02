import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CarService } from '../services/car.service';
import { ApiResponse, Car } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class AllcarsResolver implements Resolve<ApiResponse> {
  constructor(private carService: CarService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ApiResponse> {
    return this.carService.getCars();
  }
}
