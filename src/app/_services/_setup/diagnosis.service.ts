import { Diagnose } from './../../entities/Setup/Diagnosis';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class DiagnosisService {

  ApiUrl: string = environment.azureUrl + 'Charge/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  Diagnoses: Diagnose[];

  constructor(private http: HttpClient) { }

  add(diagnose: Diagnose) {
    this.http.post(this.ApiUrl + 'Create', diagnose).map(
      (response) => {
        return response;
      }
    );
  }

  update(diagnose: Diagnose) {
    this.http.post(this.ApiUrl + 'Update', diagnose).map(
      (response) => {
        return response;
      }
    );
  }

  delete(diagnose: Diagnose) {
    this.http.post(this.ApiUrl + 'Delete', diagnose).map(
      (response) => {
        return response;
      }
    );
  }

  load(ID: number = null, LockUpChargeType: number = null, LineOfBusinessCode: number = null,
    ChargeID: number = null, langId: number = null): Observable<Diagnose[]> {
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
      return this.http.get<Diagnose[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

}
