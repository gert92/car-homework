import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  balance = new FormControl<string>('');
  alerts: Alert[] = [];
  myCars!: Car[];

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
      console.log(cars);
    });
  }

  handleUpdate(): void {
    this.user.balance = this.balance.value!;
    this.authService.updateUser(this.user).subscribe((user) => {
      if (user) {
        this.user = user;
        this.alertService
          .addAlert('Profile updated successfully!', 'success')
          .subscribe((alerts) => {
            this.alerts = alerts;
          });
        return;
      }
      this.alertService
        .addAlert('Something went wrong...', 'danger')
        .subscribe((alerts) => {
          this.alerts = alerts;
        });
    });
  }
}
