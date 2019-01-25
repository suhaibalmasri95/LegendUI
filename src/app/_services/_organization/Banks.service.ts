
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Bank } from '../../entities/organization/Bank';



@Injectable({
  providedIn: 'root'
})
export class BanksService {

  BankApiUrl: string = environment.azureUrl + 'Banks/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  banks: Bank[];
  constructor(private http: HttpClient) {}

  loadBanks(): Observable<Bank[]> {
    return this.http.get<Bank[]>(this.BankApiUrl + 'Load');
  }

addBanks(bank: Bank) {
  this.http.post(this.BankApiUrl + 'Create', bank).pipe(map(
    (response) => {
      return response;
    }
  ));
}
updateBanks(bank: Bank) {
  this.http.post(this.BankApiUrl + 'Update', bank).pipe(map(
    (response) => {
      return response;
    }
  ));
}
deletleBank(bank: Bank) {
  this.http.post(this.BankApiUrl + 'Delete', bank).pipe(map(
    (response) => {
      return response;
    }
  ));
}
deleteBanks(banks: Bank[]) {
  this.http.post(this.BankApiUrl + 'Delete', banks).pipe(map(
    (response) => {
      return response;
    }
  ));
}





}
