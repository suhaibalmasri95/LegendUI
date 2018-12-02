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

  ApiUrl: string = environment.azureUrl + 'MedicalServices/';
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


  load(ID: number = null, ServiceType: number = null, CodeingSystem: number = null,
    IS_ICD_SERV_BEN: number = null, Parent: number = null, langId: number = null): Observable<Diagnose[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&ServiceType=';
    if (ServiceType != null) {
      queryString += ServiceType;
    }
    queryString += '&CodingSystem=';
    if (CodeingSystem != null) {
      queryString += CodeingSystem;
    }
    queryString += '&IS_ICD_SERV_BEN=';
    if (IS_ICD_SERV_BEN != null) {
      queryString += IS_ICD_SERV_BEN;
    }
    queryString += '&Parent=';
    if (Parent != null) {
      queryString += Parent;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
      return this.http.get<Diagnose[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

}
