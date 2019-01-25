
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { CompanyBranch } from '../../entities/organization/CompanyBranch';

@Injectable({
  providedIn: 'root'
})
export class CompanyBranchService {

  companyBranchApiUrl: string = environment.azureUrl + 'CompanyBranches/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  companyBranches: CompanyBranch[];
  constructor(private http: HttpClient) {}

  loadCopmanyBranches(ID: number = null, CompanyId: number = null, languageID: number = null): Observable<CompanyBranch[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&CompanyId=';
    if (CompanyId != null) {
      queryString += CompanyId;
    }
    queryString += '&languageID=';
    if (languageID != null) {
      queryString += languageID;
    }
    return this.http.get<CompanyBranch[]>(this.companyBranchApiUrl + 'Load' + queryString);
  }

addCompanyBranch(companyBranch: CompanyBranch) {
  this.http.post(this.companyBranchApiUrl + 'Create', companyBranch).pipe(map(
    (response) => {
      return response;
    }
  ));
}
updateCompanyBranch(companyBranch: CompanyBranch) {
  this.http.post(this.companyBranchApiUrl + 'Update', companyBranch).pipe(map(
    (response) => {
      return response;
    }
  ));
}
deletleCompanyBranch(companyBranch: CompanyBranch) {
  this.http.post(this.companyBranchApiUrl + 'Delete', companyBranch).pipe(map(
    (response) => {
      return response;
    }
  ));
}
deleteCompanyBranches(companyBranches: CompanyBranch[]) {
  this.http.post(this.companyBranchApiUrl + 'Delete', companyBranches).pipe(map(
    (response) => {
      return response;
    }
  ));
}




}
