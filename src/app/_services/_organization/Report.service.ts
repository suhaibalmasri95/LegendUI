
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Report } from '../../entities/organization/Report';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {


  apiUrl: string = environment.azureUrl + 'Report/';
  commonapiUrl: string = environment.azureUrl + 'Common/';
  groups: Report[];

  constructor(private http: HttpClient) { }


  load(reportReport): Observable<Report[]> {
    return this.http.get<Report[]>(this.apiUrl + 'Load' + (reportReport ? '?ReportGroupID=' + reportReport : ''));
  }

  add(group: Report) {
    return this.http.post(this.apiUrl + 'Create', group).pipe(map(
      (response) => {
        return response;
      }
    ));
  }
  update(group: Report) {
    return this.http.post(this.apiUrl + 'Update', group).pipe(map(
      (response) => {
        return response;
      }
    ));
  }
  delete(group: Report) {
    return this.http.post(this.apiUrl + 'Delete', group).pipe(map(
      (response) => {
        return response;
      }
    ));
  }
  deletes(groups: Report[]) {
    return this.http.post(this.apiUrl + 'Delete', groups).pipe(map(
      (response) => {
        return response;
      }
    ));
  }


}
