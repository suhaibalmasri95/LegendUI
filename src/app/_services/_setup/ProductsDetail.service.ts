import { ProductsDetail } from './../../entities/Product/Products';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class ProductsDetailService {


  ApiUrl: string = environment.azureUrl + 'ProductDetails/';
  ApiUrl2: string = environment.azureUrl + 'Attachment/';
  commonApiUrl: string = environment.azureUrl + 'ProductDetails/';
  ProductsDetails: ProductsDetail[];

  constructor(private http: HttpClient) { }

  add(productsDetail: ProductsDetail) {
    this.http.post(this.ApiUrl + 'Create', productsDetail).map(
      (response) => {
        return response;
      }
    );
  }

  update(productsDetail: ProductsDetail) {
    this.http.post(this.ApiUrl + 'Update', productsDetail).map(
      (response) => {
        return response;
      }
    );
  }

  delete(productsDetail: ProductsDetail) {
    this.http.post(this.ApiUrl + 'Delete', productsDetail).map(
      (response) => {
        return response;
      }
    );
  }

  load(ID: number = null, producID: number = null, langId: number = null): Observable<ProductsDetail[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&productID=';
    if (producID != null) {
      queryString += producID;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
      return this.http.get<ProductsDetail[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

  loadAttachments(ID: number = null, langId: number = null): Observable<ProductsDetail[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
      return this.http.get<ProductsDetail[]>(this.ApiUrl2 + 'Load' + queryString);
    }
  }

  loadRelated(producID: number = null, langId: number = null): Observable<any> {
    let queryString = '?productID=';
    if (producID != null) {
      queryString += producID;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;

      return this.http.get<any>(this.ApiUrl + 'LoadRelatedProduct' + queryString);
    }
  }

  loadSubjectTypes(productDetailID: number = null, langId: number = null): Observable<any> {
    let queryString = '?productDetailID=';
    if (productDetailID != null) {
      queryString += productDetailID;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;

      return this.http.get<any>(this.ApiUrl + 'LoadSubjectType' + queryString);
    }
  }
}
