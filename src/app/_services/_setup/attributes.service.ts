import { Attribute } from './../../entities/Setup/Diagnosis';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  ApiUrl: string = environment.azureUrl + 'Charge/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  Attributes: Attribute[];

  constructor(private http: HttpClient) { }

  add(attribute: Attribute) {
    this.http.post(this.ApiUrl + 'Create', attribute).map(
      (response) => {
        return response;
      }
    );
  }

  update(attribute: Attribute) {
    this.http.post(this.ApiUrl + 'Update', attribute).map(
      (response) => {
        return response;
      }
    );
  }

  delete(attribute: Attribute) {
    this.http.post(this.ApiUrl + 'Delete', attribute).map(
      (response) => {
        return response;
      }
    );
  }

  load(ID: number = null, LockUpChargeType: number = null, LineOfBusinessCode: number = null,
    ChargeID: number = null, langId: number = null): Observable<Attribute[]> {
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
      return this.http.get<Attribute[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

}
