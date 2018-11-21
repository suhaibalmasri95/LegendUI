import { Cover } from './../../entities/Setup/Charges';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';


@Injectable({
  providedIn: 'root'
})
export class CoversService {

  ApiUrl: string = environment.azureUrl + 'Covers/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  Covers: Cover[];

  constructor(private http: HttpClient) { }

  add(cover: Cover) {
    this.http.post(this.ApiUrl + 'Create', cover).map(
      (response) => {
        return response;
      }
    );
  }

  update(cover: Cover) {
    this.http.post(this.ApiUrl + 'Update', cover).map(
      (response) => {
        return response;
      }
    );
  }

  delete(cover: Cover) {
    this.http.post(this.ApiUrl + 'Delete', cover).map(
      (response) => {
        return response;
      }
    );
  }

  load(): Observable<Cover[]> {
    return this.http.get<Cover[]>(this.ApiUrl + 'LoadCovers');
  }

}
