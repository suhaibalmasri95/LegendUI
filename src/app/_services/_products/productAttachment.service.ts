import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { ProductAttachment } from './../../entities/Product/Attachment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductAttachmentService {

  ApiUrl: string = environment.azureUrl + 'ProductAttachment/';
  commonApiUrl: string = environment.azureUrl + 'ProductAttachment/';
  ProductAttachments: ProductAttachment[];

  constructor(private http: HttpClient) { }

  load(ID: number = null, ProductID: number = null, ProductDetailID: number = null, langId: number = null, AttachmentLevel: number = null):
  Observable<ProductAttachment[]> {
  let queryString = '?ID=';
  if (ID != null) {
    queryString += ID;
  }
  queryString += '&ProductID=';
  if (ProductID != null) {
    queryString += ProductID;
  }
  queryString += '&ProductDetailID=';
  if (ProductDetailID != null) {
    queryString += ProductDetailID;
  }
  queryString += '&AttachmentLevel=';
  if (AttachmentLevel != null) {
    queryString += AttachmentLevel;
  }
  queryString += '&langId=';
  if (langId != null) {
    queryString += langId;
    return this.http.get<ProductAttachment[]>(this.ApiUrl + 'Load' + queryString);
  }
}

}
