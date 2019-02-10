import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Risk } from '../entities/production/Risk';

@Injectable({
  providedIn: 'root'
})
export class RiskListenerService {


  private riskSource = new BehaviorSubject([]);
  currentRisks = this.riskSource.asObservable();


constructor() { }

changeColumn(risks: Risk[]) {
  this.riskSource.next(risks);
}
}
