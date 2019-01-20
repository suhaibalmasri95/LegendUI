import { Share } from './../../entities/production/Share';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharesService {
  ApiUrl: string = environment.azureUrl + 'Share/';
constructor(private http: HttpClient) { }

load(ID: number = null, ShareType: number = null, UWDocumentID: number , CustomerId: number = null ,
  StLOB: number = null, StSubLOB: number = null, langId: number = null):
Observable<Share[]> {
let queryString = '?ID=';
if (ID != null) {
  queryString += ID;
}
queryString += '&ShareType=';
if (ShareType != null) {
  queryString += ShareType;
}
queryString += '&UWDocumentID=';
if (UWDocumentID != null) {
  queryString += UWDocumentID;
}
queryString += '&StLOB=';
if (StLOB != null) {
  queryString += StLOB;
}
queryString += '&StSubLOB=';
if (StSubLOB != null) {
  queryString += StSubLOB;
}

queryString += '&langId=';
if (langId != null) {
  queryString += langId;
  return this.http.get<Share[]>(this.ApiUrl + 'Load' + queryString);
}
}
}
