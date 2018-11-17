import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Department } from '../../entities/organization/Department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  deparmentApiUrl: string = environment.azureUrl + 'Departments/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  departments: Department[];
  constructor(private http: HttpClient) {}

  loadCompanyDepartments(ID: number = null, CompanyId: number = null, languageID: number = null): Observable<Department[]> {
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
    return this.http.get<Department[]>(this.deparmentApiUrl + '/Load' + queryString);
  }

addDepartment(department: Department) {
  this.http.post(this.deparmentApiUrl + 'Create', department).map(
    (response) => {
      return response;
    }
  );
}
updateDepratment(department: Department) {
  this.http.post(this.deparmentApiUrl + 'Update', department).map(
    (response) => {
      return response;
    }
  );
}
deletleDepartment(department: Department) {
  this.http.post(this.deparmentApiUrl + 'Delete', department).map(
    (response) => {
      return response;
    }
  );
}
deleteDepartments(departments: Department[]) {
  this.http.post(this.deparmentApiUrl + 'Delete', departments).map(
    (response) => {
      return response;
    }
  );
}




}
