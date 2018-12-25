import { Product } from './../../entities/Product/Products';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  ApiUrl: string = environment.azureUrl + 'Products/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  Products: Product[];

  constructor(private http: HttpClient) { }

  add(product: Product) {
    this.http.post(this.ApiUrl + 'Create', product).map(
      (response) => {
        return response;
      }
    );
  }

  update(product: Product) {
    this.http.post(this.ApiUrl + 'Update', product).map(
      (response) => {
        return response;
      }
    );
  }

  delete(product: Product) {
    this.http.post(this.ApiUrl + 'Delete', product).map(
      (response) => {
        return response;
      }
    );
  }

  load(ID: number = null, QusLevel: number = null, LineOfBusiness: number = null,
    SubLineOfBusiness: number = null, langId: number = null): Observable<Product[]> {
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
      return this.http.get<Product[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

}
