import { DocumentAttachment } from './../../entities/production/DocumentAttachment';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicyAttachmentService {

  ApiUrl: string = environment.azureUrl + 'Attachment/';
  constructor (private http: HttpClient) { }
  load(ID: number = null , DocumentID: number = null , RiskID: number = null , ProductAttachmentID: number = null 
    , ClaimID: number = null , Level: number , langId: number ): Observable<DocumentAttachment[]> {
    let queryString = '?ID=';
    if (ID != null) {
      queryString += ID;
    }
    queryString += '&DocumentID=';
    if (DocumentID != null) {
      queryString += DocumentID;
    }
    queryString += '&RiskID=';
    if (RiskID != null) {
      queryString += RiskID;
    }
    queryString += '&ProductAttachmentID=';
    if (ProductAttachmentID != null) {
      queryString += ProductAttachmentID;
    }
    queryString += '&ClaimID=';
    if (ClaimID != null) {
      queryString += ClaimID;
    }
    queryString += '&Level=';
    if (Level != null) {
      queryString += Level;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
    }
    // tslint:disable-next-line:max-line-length
    return this.http.get<DocumentAttachment[]>(this.ApiUrl + 'Load' + queryString);
  }
}
