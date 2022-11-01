import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { identity, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { Car, User } from 'src/app/types/types';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  cars: Car[] = [];
  brands: string[] = [];
  models: string[] = [];
  years: string[] = [];
  currentUser: User = { id: 0 };

  selectedBrand: string = 'Brand';
  selectedModel: string = 'Model';
  selectedYear: string = 'Year';

  constructor(
    private carService: CarService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute // private router: Router
  ) {}

  ngOnInit(): void {
    this.getCars();
  }

  logout(): void {
    this.authService.logout();
    location.reload();
  }

  // getUser(): Observable<User> {
  //   return this.authService.currentUser;
  // }

  getCars(): void {
    this.carService.getCars().subscribe((cars) => {
      this.cars = cars.data;
      
      this.cars.map((car) => {
        this.brands.push(car.attributes.brand);
        this.models.push(car.attributes.model);
        this.years.push(car.attributes.year);
      });
    });
  }
}
