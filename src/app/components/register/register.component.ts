import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/types/types';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  // email = new FormControl('', [Validators.required, Validators.email]);

  // user!: User;

  constructor(private authService: AuthService, private router: Router) {}

  handleRegister() {
    if (this.username.invalid || this.password.invalid) {
      console.log('FORM INVALID');
      return;
    }

    const user: User = {
      username: this.username.value!,
      // email: this.email.value!,
      password: this.password.value!,
      balance: 0,
    };

    this.authService.register(user).subscribe((user) => {
      localStorage.setItem('token', user.jwt!);
      this.authService.currentUser.next(user);
      this.router.navigate(['/']);
    });

    // this.user = this.authService.register(user);
  }
  ngOnInit(): void {}
}
