import { Benefit } from './../../entities/Setup/Diagnosis';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class BenefitService {

  ApiUrl: string = environment.azureUrl + 'Charge/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  Benefits: Benefit[];

  constructor(private http: HttpClient) { }

  add(benefit: Benefit) {
    this.http.post(this.ApiUrl + 'Create', benefit).map(
      (response) => {
        return response;
      }
    );
  }

  update(benefit: Benefit) {
    this.http.post(this.ApiUrl + 'Update', benefit).map(
      (response) => {
        return response;
      }
    );
  }

  delete(benefit: Benefit) {
    this.http.post(this.ApiUrl + 'Delete', benefit).map(
      (response) => {
        return response;
      }
    );
  }

  load(ID: number = null, LockUpChargeType: number = null, LineOfBusinessCode: number = null,
    ChargeID: number = null, langId: number = null): Observable<Benefit[]> {
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
      return this.http.get<Benefit[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

}
