import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { Alert, ApiResponse, Car, User } from 'src/app/types/types';

@Component({
  selector: 'app-single-car',
  templateUrl: './single-car.component.html',
  styleUrls: ['./single-car.component.scss'],
})
export class SingleCarComponent implements OnInit {
  car!: Car;
  user!: User;
  isEditing!: boolean;
  own: boolean = false;
  alerts: Alert[] = [];

  carBrand = new FormControl<string>('');
  carModel = new FormControl<string>('');
  carYear = new FormControl<string>('');
  carPrice = new FormControl<number>(0);
  carGear = new FormControl<string>('');
  carMotor = new FormControl<string>('');
  imageUrl = new FormControl<string>('');
  carDriveTrain = new FormControl<string>('');

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.carService.getIsEditing().subscribe((bool) => {
      this.isEditing = bool;
    });
    this.route.data.subscribe(({ user, car }) => {

      this.user = user;
      this.car = car.data;

      user.cars?.map((thisCar: Car) => {
        if (thisCar.id === this.car.id) {
          this.own = true;
        }
      });

      this.carBrand.setValue(this.car.attributes.brand);
      this.carModel.setValue(this.car.attributes.model);
      this.carYear.setValue(this.car.attributes.year);
      this.carPrice.setValue(this.car.attributes.price);
      this.carGear.setValue(this.car.attributes.details.gearbox);
      this.carMotor.setValue(this.car.attributes.details.motor);
      this.imageUrl.setValue(this.car.attributes.imageUrl!);
      this.carDriveTrain.setValue(this.car.attributes.details.drivetrain);
    });
  }

  updateCar(id: number): void {
    let newCar = {
      id: id,
      brand: this.carBrand.value!,
      model: this.carModel.value!,
      year: this.carYear.value!,
      price: this.carPrice.value!,
      imageUrl: this.imageUrl.value!,
      details: {
        gearbox: this.carGear.value!,
        motor: this.carMotor.value!,
        drivetrain: this.carDriveTrain.value!,
      },
    };
    this.carService.updateCar(newCar).subscribe((car: any) => {
      this.car = car.data;
      this.carService.getIsEditing().next(false);
    });
  }

  buyCar(car: Car): void {
    const evaluation = this.user.balance - this.car.attributes.price;
    if (evaluation < 0) {
      this.alertService
        .addAlert(
          'Your balance is too low, GO GET SOME MORE MONEY!!!!',
          'danger'
        )
        .subscribe((alerts) => {
          this.alerts = alerts;
        });
      return;
    }
    this.user.balance = evaluation;
    this.user.cars?.push(car);

    this.authService.buyCar(this.user).subscribe((user) => {
      this.user = user;
      this.own = true;
      this.alertService
        .addAlert('You bought a car!', 'success')
        .subscribe((alerts) => {
          this.alerts = alerts;
        });
    });
  }
}
