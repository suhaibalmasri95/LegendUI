import { Injectable } from '@angular/core';
import { Group } from '../../entities/organization/Group';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  apiUrl: string = environment.azureUrl + 'Group/';
  commonapiUrl: string = environment.azureUrl + 'Common/';
  groups: Group[];
  
  constructor(private http: HttpClient) { }
  
  
  load(): Observable<Group[]> {
    return this.http.get<Group[]>(this.apiUrl + 'Load ');
  }
  
  add(group: Group) {
    return this.http.post(this.apiUrl + 'Create', group).map(
      (response) => {
        return response;
      }
    );
  }
  update(group: Group) {
    return this.http.post(this.apiUrl + 'Update', group).map(
      (response) => {
        return response;
      }
    );
  }
  delete(group: Group) {
    return this.http.post(this.apiUrl + 'Delete', group).map(
      (response) => {
        return response;
      }
    );
  }
  deletes(groups: Group[]) {
    return this.http.post(this.apiUrl + 'Delete', groups).map(
      (response) => {
        return response;
      }
    );
  }


}
