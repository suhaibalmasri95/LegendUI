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

  ApiUrl: string = environment.azureUrl + 'Charge/';
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

  load(ID: number = null, LockUpChargeType: number = null, LineOfBusinessCode: number = null,
    ChargeType: number = null, langId: number = null): Observable<Commission[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&LockUpChargeType=';
    if (LockUpChargeType != null) {
      queryString += LockUpChargeType;
    }
    queryString += '&LineOfBusinessCode=';
    if (LineOfBusinessCode != null) {
      queryString += LineOfBusinessCode;
    }
    queryString += '&ChargeType=';
    if (ChargeType != null) {
      queryString += ChargeType;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
      return this.http.get<Commission[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

}
