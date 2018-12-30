import { ProductAttachment } from './../../entities/Product/Attachment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {


  ApiUrl: string = environment.azureUrl + 'ProductAttachment/';
  commonApiUrl: string = environment.azureUrl + 'ProductAttachment/';
  ProductAttachments: ProductAttachment[];

  constructor(private http: HttpClient) { }

  add(productAttachment: ProductAttachment) {
    this.http.post(this.ApiUrl + 'Create', productAttachment).map(
      (response) => {
        return response;
      }
    );
  }

  update(productAttachment: ProductAttachment) {
    this.http.post(this.ApiUrl + 'Update', productAttachment).map(
      (response) => {
        return response;
      }
    );
  }

  delete(productAttachment: ProductAttachment) {
    this.http.post(this.ApiUrl + 'Delete', productAttachment).map(
      (response) => {
        return response;
      }
    );
  }
  load(ID: number = null, ProductID: number = null, ProductDetailID: number = null, langId: number = null):
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
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
      return this.http.get<ProductAttachment[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

}
