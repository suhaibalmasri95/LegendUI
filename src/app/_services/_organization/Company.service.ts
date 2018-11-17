import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Company } from '../../entities/organization/Company';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  companyApiUrl: string = environment.azureUrl + 'Companies/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  companies: Company[];
  constructor(private http: HttpClient) {}


loadCompanies(): Observable<Company[]> {
  return this.http.get<Company[]>(this.companyApiUrl + 'Load ');
}

addCompany(company: Company) {
  this.http.post(this.companyApiUrl + 'Create', company).map(
    (response) => {
      return response;
    }
  );
}
updateCompany(company: Company) {
  this.http.post(this.companyApiUrl + 'Update', company).map(
    (response) => {
      return response;
    }
  );
}
deletleCompany(company: Company) {
  this.http.post(this.companyApiUrl + 'Delete', company).map(
    (response) => {
      return response;
    }
  );
}
deleteCompanies(companies: Company[]) {
  this.http.post(this.companyApiUrl + 'Delete', companies).map(
    (response) => {
      return response;
    }
  );
}




}
