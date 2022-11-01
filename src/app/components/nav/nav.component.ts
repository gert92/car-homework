import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/types/types';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  currentUser: User = {id: 0};

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
      this.activatedRoute.data.subscribe(({ user }) => {
        this.currentUser = user;
        // console.log(this.currentUser);
  
      });
  }

  logout(): void {
    this.authService.logout();
    location.reload();
  }
}
