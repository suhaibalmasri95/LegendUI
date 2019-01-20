import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime, map } from 'rxjs/operators';
import { Customer } from '../entities/Financial/Customer';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  ApiUrl: string = environment.azureUrl + 'Customers/';
  constructor (private httpService: HttpClient) { }

  search(ID: number = null, Name: string , custOrName: string ,
     CusNo: string , email: string, mobile: string, nationID: string, langId: number , CustomerType: number) {
    let queryString = '?Name=';

    if (Name != null) {
      queryString += Name;
    }
    queryString += '&ID=';
    if (ID != null) {
      queryString += ID;
    }
    queryString += '&custOrName=';
    if (custOrName != null) {
      queryString += custOrName;
    }
    queryString += '&CusNo=';
    if (CusNo != null) {
      queryString += CusNo;
    }
    queryString += '&email=';
    if (email != null) {
      queryString += email;
    }
    queryString += '&mobile=';
    if (mobile != null) {
      queryString += mobile;
    }
    queryString += '&nationID=';
    if (nationID != null) {
      queryString += nationID;
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
