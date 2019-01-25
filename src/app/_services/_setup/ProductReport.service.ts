import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ProductReport } from './../../entities/Product/Attachment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductReportService {
  ApiUrl: string = environment.azureUrl + 'ProductReports/';
  commonApiUrl: string = environment.azureUrl + 'Common/';

  constructor(private http: HttpClient) { }
load(ID: number = null , ProductID: number = null , ProductDetailID: number = null,  langId: number = null): Observable<ProductReport[]> {
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
    return this.http.get<ProductReport[]>(this.ApiUrl + 'Load' + queryString);
  }
}
}
