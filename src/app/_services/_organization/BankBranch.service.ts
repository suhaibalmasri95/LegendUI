import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { BankBranch } from '../../entities/organization/BankBranch';

@Injectable({
  providedIn: 'root'
})
export class BankBranchService {

  BankBranchApiUrl: string = environment.azureUrl + 'BankBranches/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  bankBranches: BankBranch[];
  constructor(private http: HttpClient) {}

  loadBranches(countryId: number = null, cityId: number = null, langId: number = null): Observable<BankBranch[]> {
    return this.http.get<BankBranch[]>(this.BankBranchApiUrl + 'Load');
  }

addBankBranch(bankBranch: BankBranch) {
  this.http.post(this.BankBranchApiUrl + 'Create', bankBranch).map(
    (response) => {
      return response;
    }
  );
}
updateBankBranch(bankBranch: BankBranch) {
  this.http.post(this.BankBranchApiUrl + 'Update', bankBranch).map(
    (response) => {
      return response;
    }
  );
}
deletleBankBranch(bankBranch: BankBranch) {
  this.http.post(this.BankBranchApiUrl + 'Delete', bankBranch).map(
    (response) => {
      return response;
    }
  );
}
deleteBankBranches(bankBranches: BankBranch[]) {
  this.http.post(this.BankBranchApiUrl + 'Delete', bankBranches).map(
    (response) => {
      return response;
    }
  );
}




}
