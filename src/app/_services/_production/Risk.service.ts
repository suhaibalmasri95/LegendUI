import { Risk } from './../../entities/production/Risk';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RiskService {


ApiUrl: string = environment.azureUrl + 'Risk/';
commonApiUrl: string = environment.azureUrl + 'Common/';
constructor(private http: HttpClient) { }
load(ID: number = null, UWDocumentID: number = null ,  langId: number = null , Serail: number = null , Name: string = null): Observable<Risk[]> {
let queryString = '?ID=';

if (ID != null) {
  queryString += ID;
}
queryString += '&UWDocumentID=';
if (UWDocumentID != null) {
  queryString += UWDocumentID;
}
queryString += '&Serail=';
if (Serail != null) {
  queryString += Serail;
}
queryString += '&Name=';
if (Name != null) {
  queryString += Name;
}


queryString += '&langId=';
if (langId != null) {
  queryString += langId;
}
// tslint:disable-next-line:max-line-length
return this.http.get<Risk[]>(this.ApiUrl + 'Load' + queryString);
}
}
