import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { LineOfBusiness } from '../../entities/Setup/lineOfBusiness';
@Injectable({
  providedIn: 'root'
})
export class LineOfBusinessService {

 LineOfApiUrl: string = environment.azureUrl + 'Business/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  lineOfBusiness: LineOfBusiness[];
  constructor(private http: HttpClient) {}

  load(ID: number = null, Code: string = null, Module: number = null, langId: number = null): Observable<LineOfBusiness[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&Code=';
    if (Code != null) {
      queryString += Code;
    }
    queryString += '&Module=';
    if (Module != null) {
      queryString += Module;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
    }
    // tslint:disable-next-line:max-line-length
    return this.http.get<LineOfBusiness[]>(this.LineOfApiUrl + 'Load' + queryString);
  }

add(lineOfBusiness: LineOfBusiness) {
  this.http.post(this.LineOfApiUrl + 'Create', lineOfBusiness).map(
    (response) => {
      return response;
    }
  );
}
update(lineOfBusiness: LineOfBusiness) {
  this.http.post(this.LineOfApiUrl + 'Update', lineOfBusiness).map(
    (response) => {
      return response;
    }
  );
}
delete(lineOfBusiness: LineOfBusiness) {
  this.http.post(this.LineOfApiUrl + 'delete', lineOfBusiness).map(
    (response) => {
      return response;
    }
  );
}
deletes(lineOfBusiness: LineOfBusiness[]) {
  this.http.post(this.LineOfApiUrl + 'Delete', lineOfBusiness).map(
    (response) => {
      return response;
    }
  );
}





}
