import { Documents } from './../../entities/production/Documents';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {
  ApiUrl: string = environment.azureUrl + 'Documents/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
constructor(private http: HttpClient) { }
load(ID: number = null,  langId: number = null): Observable<Documents[]> {
  let queryString = '?ID=';

  if (ID != null) {
    queryString += ID;
  }

  queryString += '&langId=';
  if (langId != null) {
    queryString += langId;
  }
  // tslint:disable-next-line:max-line-length
  return this.http.get<Documents[]>(this.ApiUrl + 'Load' + queryString);
}

}
