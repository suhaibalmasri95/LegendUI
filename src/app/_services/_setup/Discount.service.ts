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

  ApiUrl: string = environment.azureUrl + 'Charge/';
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

  load(ID: number = null, LockUpChargeType: number = null, LineOfBusinessCode: number = null,
    ChargeID: number = null, langId: number = null): Observable<Discount[]> {
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
      return this.http.get<Discount[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

}
