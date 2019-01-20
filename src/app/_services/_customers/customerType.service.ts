import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { CustomerType } from '../../entities/customer/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerTypeService {

  ApiUrl: string = environment.azureUrl + 'CustomerType/';
  commonApiUrl: string = environment.azureUrl + 'CustomerType/';

  constructor(private http: HttpClient) { }

  add(d) {
    this.http.post(this.ApiUrl + 'Create', d).map(
      (response) => {
        return response;
      }
    );
  }

  update(d) {
    this.http.post(this.ApiUrl + 'Update', d).map(
      (response) => {
        return response;
      }
    );
  }

  delete(d) {
    this.http.post(this.ApiUrl + 'Delete', d).map(
      (response) => {
        return response;
      }
    );
  }


  load(ID: number = null, productID: number = null, langId: number = null): Observable<CustomerType[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&productID=';
    if (productID != null) {
      queryString += productID;
    }

    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
      return this.http.get<CustomerType[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

}
