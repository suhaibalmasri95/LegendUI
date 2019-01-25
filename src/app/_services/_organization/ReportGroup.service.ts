
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ReportsGroup } from '../../entities/organization/ReportsGroup';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsGroupService {


  apiUrl: string = environment.azureUrl + 'ReportGroup/';
  commonapiUrl: string = environment.azureUrl + 'Common/';
  groups: ReportsGroup[];

  constructor(private http: HttpClient) { }


  load(): Observable<ReportsGroup[]> {
    return this.http.get<ReportsGroup[]>(this.apiUrl + 'Load');
  }

  add(group: ReportsGroup) {
    return this.http.post(this.apiUrl + 'Create', group).pipe(map(
      (response) => {
        return response;
      }
    ));
  }
  update(group: ReportsGroup) {
    return this.http.post(this.apiUrl + 'Update', group).pipe(map(
      (response) => {
        return response;
      }
    ));
  }
  delete(group: ReportsGroup) {
    return this.http.post(this.apiUrl + 'Delete', group).pipe(map(
      (response) => {
        return response;
      }
    ));
  }
  deletes(groups: ReportsGroup[]) {
    return this.http.post(this.apiUrl + 'Delete', groups).pipe(map(
      (response) => {
        return response;
      }
    ));
  }


}
