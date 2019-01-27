
import { map } from 'rxjs/operators';
import { Commission } from './../../entities/Setup/Charges';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CommissionService {

  ApiUrl: string = environment.azureUrl + 'CustomerCommission/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  Commissions: Commission[];

  constructor(private http: HttpClient) { }

  add(commission: Commission) {
    this.http.post(this.ApiUrl + 'Create', commission).pipe(map(
      (response) => {
        return response;
      }
    ));
  }

  update(commission: Commission) {
    this.http.post(this.ApiUrl + 'Update', commission).pipe(map(
      (response) => {
        return response;
      }
    ));
  }

  delete(commission: Commission) {
    this.http.post(this.ApiUrl + 'Delete', commission).pipe(map(
      (response) => {
        return response;
      }
    ));
  }

  load(ID, ProductDetailID, CustomerID, ProductID, CommissionType): Observable<Commission[]> {
    let queryString = '?ID=';
    if (ID != null) {
      queryString += ID;
    }
    queryString += '&ProductDetailID=';
    if (ProductDetailID != null) {
      queryString += ProductDetailID;
    }
    queryString += '&CustomerID=';
    if (CustomerID != null) {
      queryString += CustomerID;
    }
    queryString += '&ProductID=';
    if (ProductID != null) {
      queryString += ProductID;
    }
    queryString += '&CommissionType=';
    if (CommissionType != null) {
      queryString += CommissionType;
    }
    return this.http.get<Commission[]>(this.ApiUrl + 'Load' + queryString);

  }

}
