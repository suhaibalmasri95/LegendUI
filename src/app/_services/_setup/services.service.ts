import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Service } from './../../entities/Setup/Diagnosis';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  ApiUrl: string = environment.azureUrl + 'Charge/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  Services: Service[];

  constructor(private http: HttpClient) { }

  add(service: Service) {
    this.http.post(this.ApiUrl + 'Create', service).map(
      (response) => {
        return response;
      }
    );
  }

  update(service: Service) {
    this.http.post(this.ApiUrl + 'Update', service).map(
      (response) => {
        return response;
      }
    );
  }

  delete(service: Service) {
    this.http.post(this.ApiUrl + 'Delete', service).map(
      (response) => {
        return response;
      }
    );
  }

  load(ID: number = null, LockUpChargeType: number = null, LineOfBusinessCode: number = null,
    ChargeID: number = null, langId: number = null): Observable<Service[]> {
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
      return this.http.get<Service[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

}
