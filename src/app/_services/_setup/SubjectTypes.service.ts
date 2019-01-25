
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SubjectType } from '../../entities/Setup/SubjectType';
@Injectable({
  providedIn: 'root'
})
export class SubjectTypesService {

  sebjectTypeApiUrl: string = environment.azureUrl + 'SubjectType/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  SsbjectTypes: SubjectType[];
  constructor(private http: HttpClient) {}

  // tslint:disable-next-line:max-line-length
  load(ID: number = null, LineOfBusniess: number = null, SubLineOfBusniess: number = null, langId: number = null): Observable<SubjectType[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&LineOfBusniess=';
    if (LineOfBusniess != null) {
      queryString += LineOfBusniess;
    }
    queryString += '&SubLineOfBusniess=';
    if (SubLineOfBusniess != null) {
      queryString += SubLineOfBusniess;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
    }
    // tslint:disable-next-line:max-line-length
    return this.http.get<SubjectType[]>(this.sebjectTypeApiUrl + 'Load' + queryString);
  }

add(sebjectType: SubjectType) {
  this.http.post(this.sebjectTypeApiUrl + 'Create', sebjectType).pipe(map(
    (response) => {
      return response;
    }
  ));
}
update(sebjectType: SubjectType) {
  this.http.post(this.sebjectTypeApiUrl + 'Update', sebjectType).pipe(map(
    (response) => {
      return response;
    }
  ));
}
delete(sebjectType: SubjectType) {
  this.http.post(this.sebjectTypeApiUrl + 'delete', sebjectType).pipe(map(
    (response) => {
      return response;
    }
  ));
}
deletes(sebjectTypes: SubjectType[]) {
  this.http.post(this.sebjectTypeApiUrl + 'Delete', sebjectTypes).pipe(map(
    (response) => {
      return response;
    }
  ));
}





}
