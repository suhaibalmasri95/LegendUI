
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

import { Service } from './../../entities/Setup/Diagnosis';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  ApiUrl: string = environment.azureUrl + 'MedicalServices/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  Services: Service[];

  constructor(private http: HttpClient) { }

  add(service: Service) {
    this.http.post(this.ApiUrl + 'Create', service).pipe(map(
      (response) => {
        return response;
      }
    ));
  }

  update(service: Service) {
    this.http.post(this.ApiUrl + 'Update', service).pipe(map(
      (response) => {
        return response;
      }
    ));
  }

  delete(service: Service) {
    this.http.post(this.ApiUrl + 'Delete', service).pipe(map(
      (response) => {
        return response;
      }
    ));
  }

  load(ID: number = null, ServiceType: number = null, CodeingSystem: number = null,
    IS_ICD_SERV_BEN: number = null, Parent: number = null, langId: number = null): Observable<Service[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&ServiceType=';
    if (ServiceType != null) {
      queryString += ServiceType;
    }
    queryString += '&CodeingSystem=';
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
      return this.http.get<Service[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

}
