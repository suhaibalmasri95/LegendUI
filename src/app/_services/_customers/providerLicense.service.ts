
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { ProviderLicense } from '../../entities/customer/customer';

@Injectable({
  providedIn: 'root'
})
export class ProviderLicenseService {


  ApiUrl: string = environment.azureUrl + 'CustomerLicense/';
  commonApiUrl: string = environment.azureUrl + 'CustomerLicense/';

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


  load(ID: number = null, LicenseNo: number = null, CustomerID: number = null,
    SptID: number = null, ProviderType: number = null, Code: number = null, langId: number = null): Observable<ProviderLicense[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&LicenseNo=';
    if (LicenseNo != null) {
      queryString += LicenseNo;
    }
    queryString += '&CustomerID=';
    if (CustomerID != null) {
      queryString += CustomerID;
    }
    queryString += '&SptID=';
    if (SptID != null) {
      queryString += SptID;
    }
    queryString += '&ProviderType=';
    if (ProviderType != null) {
      queryString += ProviderType;
    }
    queryString += '&Code=';
    if (Code != null) {
      queryString += Code;
    }

    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
    }
    return this.http.get<ProviderLicense[]>(this.ApiUrl + 'Load' + queryString);

  }

}
