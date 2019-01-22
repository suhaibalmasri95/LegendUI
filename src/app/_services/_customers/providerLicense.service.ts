import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { ProviderLicense } from '../../entities/customer/customer';

@Injectable({
  providedIn: 'root'
})
export class ProviderLicenseService {


  ApiUrl: string = environment.azureUrl + 'ProviderLicense/';
  commonApiUrl: string = environment.azureUrl + 'ProviderLicense/';

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

  load(ID: number = null, productID: number = null, langId: number = null): Observable<ProviderLicense[]> {
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
      return this.http.get<ProviderLicense[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

}
