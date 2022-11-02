import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
  filteredCars: Car[] = [];
  brands: string[] = [];
  models: string[] = [];
  years: string[] = [];
  currentUser: User = { id: 0, balance: 0 };

  selectedBrand = new FormControl('', [Validators.required]);
  selectedModel = new FormControl('', [Validators.required]);
  selectedYear = new FormControl('', [Validators.required]);

  constructor(
    private carService: CarService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute // private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedModel.disable();
    this.selectedYear.disable();
    this.activatedRoute.data.subscribe(({ cars }) => {
      this.cars = cars.data;
      this.cars.map((car) => {
        if (!this.brands.includes(car.attributes.brand)) {
          this.brands.push(car.attributes.brand);
        }
      });
    });
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
  }

  initialiseInvites(): void {
    this.filteredCars = [];
  }

  brandChange(): void {
    if (this.selectedBrand.valid) {
      this.models = [];
      this.years = [];
      this.selectedModel.reset();
      this.selectedYear.reset();
      this.cars.map((car) => {
        if (
          !this.models.includes(car.attributes.model) &&
          car.attributes.brand === this.selectedBrand.value
        ) {
          this.models.push(car.attributes.model);
        }
      });
      this.selectedModel.enable();
    }
  }

  modelChange(): void {
    if (this.selectedModel.valid) {
      this.years = [];
      this.selectedYear.reset();
      this.cars.map((car) => {
        if (
          !this.years.includes(car.attributes.year) &&
          car.attributes.model === this.selectedModel.value
        ) {
          this.years.push(car.attributes.year);
        }
      });
      this.selectedYear.enable();
    }
  }

  yearChange(): void {}

  logout(): void {
    this.authService.logout();
    location.reload();
  }

  handleSearch(): void {
    if (
      this.selectedBrand.valid &&
      this.selectedModel.valid &&
      this.selectedYear.valid
    ) {
      this.carService.getCars().subscribe((cars) => {
        this.filteredCars = cars.data.filter(
          (car: Car) =>
            car.attributes.brand === this.selectedBrand.value &&
            car.attributes.model === this.selectedModel.value &&
            car.attributes.year === this.selectedYear.value
        );
      });
    }
  }
}
