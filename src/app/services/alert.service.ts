import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alert } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alert = new BehaviorSubject({
    msg: '',
    type: '',
  });

  alerts: BehaviorSubject<Alert[]> = new BehaviorSubject([{}]);

  constructor() {}

  getAlerts(): BehaviorSubject<Alert[]> {
    return this.alerts;
  }

  addAlert(msg: string, type: string): BehaviorSubject<Alert[]> {
    // this.alert.next({ msg: msg, type: type });
    this.alerts.next([{msg: msg, type: type}]);
    setTimeout(()=> {
      this.alerts.next([{}]);
    }, 3000)
    return this.alerts;
  }
}
