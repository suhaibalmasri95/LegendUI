
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { System } from '../../entities/models/MenuDetails';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuDetailsService {
  apiUrl: string = environment.azureUrl + 'Menus/';
  commonApiUrl: string = environment.azureUrl + 'Common/';

  constructor(private http: HttpClient) { }


  load(Type: number, SubMenuID: number = null): Observable<System[]> {
    return this.http.get<System[]>(this.apiUrl + 'Load' + (Type ? '?Type=' + Type : '') + (SubMenuID ? '&SubMenuID=' + SubMenuID : ''));
  }

  add(system: System) {
    return this.http.post(this.apiUrl + 'Create', system).pipe(map(
      (response) => {
        return response;
      }
    ));
  }
  update(system: System) {
    return this.http.post(this.apiUrl + 'Update', system).pipe(map(
      (response) => {
        return response;
      }
    ));
  }
  delete(system: System) {
    return this.http.post(this.apiUrl + 'Delete', system).pipe(map(
      (response) => {
        return response;
      }
    ));
  }
  multiDelete(system: System[]) {
    return this.http.post(this.apiUrl + 'Delete', system).pipe(map(
      (response) => {
        return response;
      }
    ));
  }

}
