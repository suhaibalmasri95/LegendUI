import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Fee } from '../../entities/Setup/Charges';


@Injectable({
  providedIn: 'root'
})
export class FeesService {

  ApiUrl: string = environment.azureUrl + 'Fees/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  Fees: Fee[];

  constructor(private http: HttpClient) { }

  add(fee: Fee) {
    this.http.post(this.ApiUrl + 'Create', fee).map(
      (response) => {
        return response;
      }
    );
  }

  update(fee: Fee) {
    this.http.post(this.ApiUrl + 'Update', fee).map(
      (response) => {
        return response;
      }
    );
  }

  delete(fee: Fee) {
    this.http.post(this.ApiUrl + 'Delete', fee).map(
      (response) => {
        return response;
      }
    );
  }

  load(): Observable<Fee[]> {
    return this.http.get<Fee[]>(this.ApiUrl + 'LoadFees');
  }

}
