import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { API_TOKEN, API_URL } from '../config';
import { Car, Login, User } from '../types/types';

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
export class AuthService {
  private url = API_URL;
  authUrl = this.url + 'auth/local/';
  registerUrl = this.authUrl + 'register';
  loginUrl = this.authUrl;
  meUrl = this.url + 'users/me';
  usersUrl = this.url + 'users/';

  currentUser = new BehaviorSubject<User>({ id: 0 });

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('An Error Ocurred');
    } else if (error.status === 401) {
      localStorage.clear();
      location.reload();
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user, httpOptions);
  }

  login(login: Login): Observable<User> {
    return this.http.post<User>(this.loginUrl, login);
  }

  logout(): void {
    localStorage.clear();
  }

  auth(jwt: string): Observable<User> {
    const customHttpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt,
      }),
      params: {
        populate: '*',
      },
    };

    return this.http
      .get<User>(this.meUrl, customHttpOptions)
      .pipe(catchError(this.handleError));
  }

  getCurrentUser(): Observable<User> {
    const token: string = localStorage.getItem('token')!;
    if (token) {
      return this.auth(token).pipe(catchError(this.handleError));
    }
    return this.currentUser;
  }

  updateUser(user: User): Observable<User> {
    return this.http.put(this.usersUrl + user.id, user, httpOptions);
  }

  buyCar(car: Car, user: User): Observable<User> {
    user.cars?.push(car.data.id);
    return this.http.put(this.usersUrl + user.id, user, httpOptions);
  }
}
