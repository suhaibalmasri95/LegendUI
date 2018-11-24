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

  ApiUrl: string = environment.azureUrl + 'Charge/';
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

  load(ID: number = null, LockUpChargeType: number = null, LineOfBusinessCode: number = null,
    ChargeID: number = null, langId: number = null): Observable<Fee[]> {
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
    queryString += '&ChargeID=';
    if (ChargeID != null) {
      queryString += ChargeID;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
      return this.http.get<Fee[]>(this.ApiUrl + 'Load' + queryString);
    }
  }
}
