import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API_TOKEN, API_URL } from '../config';
import { ApiResponse, Car } from '../types/types';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + API_TOKEN,
  }),
  params: {
    populate: '*',
  },
};

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private url = API_URL;
  carsUrl = this.url + 'cars/';
  isEditing = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  getCars(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.carsUrl, httpOptions);
  }

  getCar(id: number): Observable<Car> {
    return this.http.get<Car>(this.carsUrl + id, httpOptions);
  }

  getCarsByOwner(id: number): Observable<Car[]> {
    const customHttp = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + API_TOKEN,
      }),
      params: new HttpParams({
        fromString: 'filters[users]=' + id + '&populate=details',
      }),
    };

    return this.http.get<Car[]>(this.carsUrl, customHttp);
  }

  getIsEditing(): BehaviorSubject<boolean> {
    return this.isEditing;
  }

  createCar(car: any): Observable<Car> {
    const data = { data: { ...car } };
    return this.http.post<Car>(this.carsUrl, data, httpOptions);
  }

  updateCar(car: any): Observable<Car> {
    const data = { data: { ...car } };
    return this.http.put<Car>(this.carsUrl + car.id, data, httpOptions);
  }

  deleteCar(carId: number): Observable<unknown> {
    return this.http.delete(this.carsUrl + carId, httpOptions);
  }
}
