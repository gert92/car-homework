import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Login, User } from 'src/app/types/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(private authService: AuthService, private router: Router) {}

  handleLogin() {
    if (this.username.invalid || this.password.invalid) {
      console.log('FORM INVALID');
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
  ngOnInit(): void {}
}
