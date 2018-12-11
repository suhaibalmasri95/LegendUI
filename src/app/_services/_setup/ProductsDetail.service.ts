import { ProductsDetail } from './../../entities/Setup/Products';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class ProductsDetailService {


  ApiUrl: string = environment.azureUrl + 'ProductsDetails/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
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

  load(ID: number = null, QusLevel: number = null, LineOfBusiness: number = null,
    SubLineOfBusiness: number = null, langId: number = null): Observable<ProductsDetail[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&QusLevel=';
    if (QusLevel != null) {
      queryString += QusLevel;
    }
    queryString += '&LineOfBusiness=';
    if (LineOfBusiness != null) {
      queryString += LineOfBusiness;
    }
    queryString += '&SubLineOfBusiness=';
    if (SubLineOfBusiness != null) {
      queryString += SubLineOfBusiness;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
      return this.http.get<ProductsDetail[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

}
