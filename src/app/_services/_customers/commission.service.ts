
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { Commission } from '../../entities/Setup/Charges';

@Injectable({
  providedIn: 'root'
})
export class CommissionService {

  ApiUrl: string = environment.azureUrl + 'Commission/';
  commonApiUrl: string = environment.azureUrl + 'Commission/';

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

  load(ID: number = null, productID: number = null, langId: number = null): Observable<Commission[]> {
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
      return this.http.get<Commission[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

}
