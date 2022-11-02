import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { debounceTime } from 'rxjs';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { Alert, Car, User } from 'src/app/types/types';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user!: User;
  createdAt!: string;
  balance = new FormControl<number>(0);
  alerts: Alert[] = [];
  myCars: Car[] = [];

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe(({ user, cars }) => {
      this.user = user;
      this.myCars = cars.data;
      this.createdAt = new Date(user.createdAt).toDateString();
      this.balance.setValue(user.balance);
    });

    this.alertService.getAlerts().subscribe((alerts) => {
      this.alerts = alerts;
    });
  }

  handleUpdate(): void {
    this.user.balance = this.balance.value!;
    this.authService.updateUser(this.user).subscribe((user) => {
      if (user) {
        this.user = user;
        this.alertService.setAlerts('Profile updated successfully!', 'success');
        return;
      }
      this.alertService.setAlerts('Something went wrong...', 'danger');
    });
  }

  sellCar(carId: any, price: number): void {
    const newUser = this.user;
    const evaluation = Number(this.user.balance) + Number(price);
    newUser.balance = evaluation;
    newUser.cars = this.myCars.filter((car: Car) => car.id !== carId);
    this.authService
      .sellCar(newUser)
      .pipe(debounceTime(2000))
      .subscribe((user) => {       
        this.authService.currentUser.next(user);
        this.balance.setValue(user.balance);
        this.myCars = this.myCars.filter((car) => car.id !== carId);
        this.alertService.setAlerts('Car sold successfully!', 'success');
      });
  }
}
