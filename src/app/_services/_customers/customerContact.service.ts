
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { CustomerContact } from '../../entities/customer/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerContactService {



  ApiUrl: string = environment.azureUrl + 'CustomerContacts/';
  commonApiUrl: string = environment.azureUrl + 'CustomerContacts/';

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


  load(ID: number = null, CustomerID: number = null, langId: number = null): Observable<CustomerContact[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&CustomerID=';
    if (CustomerID != null) {
      queryString += CustomerID;
    }

    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
      return this.http.get<CustomerContact[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

}
