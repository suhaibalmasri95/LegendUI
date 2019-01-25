
import {map} from 'rxjs/operators';
import { Cover } from './../../entities/Setup/Charges';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class CoversService {

  ApiUrl: string = environment.azureUrl + 'Charge/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  Covers: Cover[];

  constructor(private http: HttpClient) { }

  add(cover: Cover) {
    this.http.post(this.ApiUrl + 'Create', cover).pipe(map(
      (response) => {
        return response;
      }
    ));
  }

  update(cover: Cover) {
    this.http.post(this.ApiUrl + 'Update', cover).pipe(map(
      (response) => {
        return response;
      }
    ));
  }

  delete(cover: Cover) {
    this.http.post(this.ApiUrl + 'Delete', cover).pipe(map(
      (response) => {
        return response;
      }
    ));
  }

  load(ID: number = null, LockUpChargeType: number = null, LineOfBusinessCode: number = null,
    ChargeType: number = null, langId: number = null): Observable<Cover[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&LockUpChargeType=';
    if (LockUpChargeType != null) {
      queryString += LockUpChargeType;
    }
    queryString += '&LineOfBusinessCode=';
    if (LineOfBusinessCode != null) {
      queryString += LineOfBusinessCode;
    }
    queryString += '&ChargeType=';
    if (ChargeType != null) {
      queryString += ChargeType;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
      return this.http.get<Cover[]>(this.ApiUrl + 'Load' + queryString);
    }
  }
}
