import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from 'src/app/services/car.service';
import { Car, User } from 'src/app/types/types';

@Component({
  selector: 'app-subnav',
  templateUrl: './subnav.component.html',
  styleUrls: ['./subnav.component.scss'],
})
export class SubnavComponent implements OnInit, OnDestroy {
  @Input() user!: User;
  currentRoute!: string;

  constructor(
    private route: ActivatedRoute,
    private carService: CarService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.carService.isEditing.next(false);
  }

  ngOnInit(): void {
    let r = this.route.toString();
    r = r.split(',')[1].trim().slice(6);
    r = r.slice(0, r.length - 2);
    this.currentRoute = r;
  }

  editCar(): void {
    this.carService.isEditing.next(!this.carService.getIsEditing().value);
  }

  deleteCar(): void {
    this.carService
      .deleteCar(this.route.snapshot.params['id'])
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
