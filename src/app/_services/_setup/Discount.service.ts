import { Discount } from './../../entities/Setup/Charges';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';


@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  ApiUrl: string = environment.azureUrl + 'Discounts/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  Discounts: Discount[];

  constructor(private http: HttpClient) { }

  add(discount: Discount) {
    this.http.post(this.ApiUrl + 'Create', discount).map(
      (response) => {
        return response;
      }
    );
  }

  update(discount: Discount) {
    this.http.post(this.ApiUrl + 'Update', discount).map(
      (response) => {
        return response;
      }
    );
  }

  delete(discount: Discount) {
    this.http.post(this.ApiUrl + 'Delete', discount).map(
      (response) => {
        return response;
      }
    );
  }

  load(): Observable<Discount[]> {
    return this.http.get<Discount[]>(this.ApiUrl + 'LoadDiscounts');
  }

}
