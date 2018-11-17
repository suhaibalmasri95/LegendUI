import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SubLineOfBusiness } from '../../entities/Setup/SubLineOfBusiness';

@Injectable({
  providedIn: 'root'
})
export class SubBusinessService {

  SubBusinessApiUrl: string = environment.azureUrl + 'SubBusiness/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  SubLineOfBusiness: SubLineOfBusiness[];
  constructor(private http: HttpClient) {}

  load(ID: number = null, lineOfBus: number = null, BasicLine: number = null,  langId: number = null): Observable<SubLineOfBusiness[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&LineOfBusiness=';
    if (lineOfBus != null) {
      queryString += lineOfBus;
    }
    queryString += '&BasicLine=';
    if (BasicLine != null) {
      queryString += BasicLine;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
    }
    // tslint:disable-next-line:max-line-length
    return this.http.get<SubLineOfBusiness[]>(this.SubBusinessApiUrl + 'Load' + queryString);
  }

add(subLine: SubLineOfBusiness) {
  this.http.post(this.SubBusinessApiUrl + 'Create', subLine).map(
    (response) => {
      return response;
    }
  );
}
update(subLine: SubLineOfBusiness) {
  this.http.post(this.SubBusinessApiUrl + 'Update', subLine).map(
    (response) => {
      return response;
    }
  );
}
delete(subLine: SubLineOfBusiness) {
  this.http.post(this.SubBusinessApiUrl + 'delete', subLine).map(
    (response) => {
      return response;
    }
  );
}
deletes(subLines: SubLineOfBusiness[]) {
  this.http.post(this.SubBusinessApiUrl + 'Delete', subLines).map(
    (response) => {
      return response;
    }
  );
}





}
