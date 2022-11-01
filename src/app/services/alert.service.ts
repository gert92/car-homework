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

  alerts: Alert[] = [];

  constructor() {}

  getAlerts(): Alert[] {
    return this.alerts;
  }

  addAlert(msg: string, type: string): Alert[] {
    this.alert.next({ msg: msg, type: type });
    this.alerts.push(this.alert.value);
    this.alert.next({ msg: '', type: '' });
    return this.alerts;
  }
}
