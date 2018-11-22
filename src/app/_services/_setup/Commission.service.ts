import { Commission } from './../../entities/Setup/Charges';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';


@Injectable({
  providedIn: 'root'
})
export class CommissionService {

  ApiUrl: string = environment.azureUrl + 'Commissions/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  Commissions: Commission[];

  constructor(private http: HttpClient) { }

  add(commission: Commission) {
    this.http.post(this.ApiUrl + 'Create', commission).map(
      (response) => {
        return response;
      }
    );
  }

  update(commission: Commission) {
    this.http.post(this.ApiUrl + 'Update', commission).map(
      (response) => {
        return response;
      }
    );
  }

  delete(commission: Commission) {
    this.http.post(this.ApiUrl + 'Delete', commission).map(
      (response) => {
        return response;
      }
    );
  }

  load(): Observable<Commission[]> {
    return this.http.get<Commission[]>(this.ApiUrl + 'LoadCommissions');
  }

}
