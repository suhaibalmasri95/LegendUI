
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { CustomerType } from '../../entities/customer/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerTypeService {

  ApiUrl: string = environment.azureUrl + 'Customers/';
  commonApiUrl: string = environment.azureUrl + 'Customers/';

  constructor(private http: HttpClient) { }

  add(d) {
    this.http.post(this.ApiUrl + 'Create', d).pipe(map(
      (response) => {
        return response;
      }
    ));
  }

  update(d) {
    this.http.post(this.ApiUrl + 'Update', d).pipe(map(
      (response) => {
        return response;
      }
    ));
  }

  delete(d) {
    this.http.post(this.ApiUrl + 'Delete', d).pipe(map(
      (response) => {
        return response;
      }
    ));
  }


  load(customerID: number = null,  langId: number = null): Observable<CustomerType[]> {
    let queryString = '?customerID=';

    if (customerID != null) {
      queryString += customerID;
    }


    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
      return this.http.get<CustomerType[]>(this.ApiUrl + 'LoadCustomerType' + queryString);
    }
  }

}
