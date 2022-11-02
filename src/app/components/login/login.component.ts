import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { Alert, Login, User } from 'src/app/types/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  alerts: Alert[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  handleLogin() {
    if (this.username.invalid || this.password.invalid) {
      this.alertService.addAlert('All fields are required!', 'danger');
      return;
    }

    const login: Login = {
      identifier: this.username.value!,
      password: this.password.value!,
    };

    this.authService.login(login).subscribe((user) => {
      localStorage.setItem('token', user.jwt!);
      this.authService.currentUser.next(user);
      this.router.navigate(['/']);
    });
  }
  ngOnInit(): void {
    this.alertService.getAlerts().subscribe((alerts) => {
      this.alerts = alerts;
    });
  }
}
