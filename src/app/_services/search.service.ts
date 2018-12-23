import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, map } from 'rxjs/operators';
import { Customer } from '../entities/Financial/Customer';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  ApiUrl: string = environment.azureUrl + 'Customers/';
  constructor (private httpService: HttpClient) { }

  search(Name: string , CusNo: string , langId: number , CustomerType: number) {
    let queryString = '?Name=';

    if (Name != null) {
      queryString += Name;
    }
    queryString += '&CusNo=';
    if (CusNo != null) {
      queryString += CusNo;
    }
    queryString += '&languageID=';
    if (langId != null) {
      queryString += langId;
    }
    queryString += '&CustomerType=';
    if (CustomerType != null) {
      queryString += CustomerType;
    }
    return  this.httpService.get<Customer[]>(this.ApiUrl + 'getPolicyHolders' + queryString)
      .pipe(
          debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
       );
  }

}
