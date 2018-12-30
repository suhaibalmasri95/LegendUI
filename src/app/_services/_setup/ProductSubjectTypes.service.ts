import { ProductSubjectType } from './../../entities/Product/Products';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { SubjectType } from '../../entities/Setup/SubjectType';
@Injectable({
  providedIn: 'root'
})
export class ProductSubjectTypes {
  sebjectTypeApiUrl: string = environment.azureUrl + 'ProductsSubjectTypes/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  SsbjectTypes: SubjectType[];
  constructor(private http: HttpClient) {}

  // tslint:disable-next-line:max-line-length
  load(ID: number = null, productID: number = null, productDetailsID: number = null, langId: number = null): Observable<ProductSubjectType[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
    }
    queryString += '&productID=';
    if (productID != null) {
      queryString += productID;
    }
    queryString += '&productDetailsID=';
    if (productDetailsID != null) {
      queryString += productDetailsID;
    }
    // tslint:disable-next-line:max-line-length
    return this.http.get<ProductSubjectType[]>(this.sebjectTypeApiUrl + 'Load' + queryString);
  }

add(sebjectType: SubjectType) {
  this.http.post(this.sebjectTypeApiUrl + 'Create', sebjectType).map(
    (response) => {
      return response;
    }
  );
}
update(sebjectType: SubjectType) {
  this.http.post(this.sebjectTypeApiUrl + 'Update', sebjectType).map(
    (response) => {
      return response;
    }
  );
}
delete(sebjectType: SubjectType) {
  this.http.post(this.sebjectTypeApiUrl + 'delete', sebjectType).map(
    (response) => {
      return response;
    }
  );
}
deletes(sebjectTypes: SubjectType[]) {
  this.http.post(this.sebjectTypeApiUrl + 'Delete', sebjectTypes).map(
    (response) => {
      return response;
    }
  );
}





}
