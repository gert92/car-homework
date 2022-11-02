import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private token: string = localStorage.getItem('token')!;

  constructor(private authservice: AuthService) {}

  ngOnInit(): void {
    console.log('app on init running');

    if (this.token) {
      console.log('inside token running');
     this.authservice.auth(this.token);
    }
  }
}
