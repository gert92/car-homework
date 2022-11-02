import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CarService } from 'src/app/services/car.service';
import { Alert, Car } from 'src/app/types/types';

@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.scss'],
})
export class AddcarComponent implements OnInit {
  addCarForm = new FormGroup({
    brand: new FormControl('', [Validators.required]),
    model: new FormControl('', [Validators.required]),
    year: new FormControl('', [Validators.required]),
    price: new FormControl(0, [
      Validators.required,
      Validators.pattern('[0-9]+'),
    ]),
    imageUrl: new FormControl('', [Validators.required]),
    details: new FormGroup({
      gearbox: new FormControl('', [Validators.required]),
      motor: new FormControl('', [Validators.required]),
      drivetrain: new FormControl('', [Validators.required]),
    }),
  });

  alerts: Alert[] = [];

  constructor(
    private carService: CarService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.addCarForm.invalid) {
      console.log('THERE ARE MISSING FIELDS');
      this.alertService
        .addAlert('Form not valid', 'danger')
        .subscribe((alerts) => {
          this.alerts = alerts;
        });
      return;
    }

    this.carService.createCar(this.addCarForm.value).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
