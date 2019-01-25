
import {map} from 'rxjs/operators';
import { Product } from './../../entities/Product/Products';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  ApiUrl: string = environment.azureUrl + 'Products/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  Products: Product[];

  constructor(private http: HttpClient) { }

  add(product: Product) {
    this.http.post(this.ApiUrl + 'Create', product).pipe(map(
      (response) => {
        return response;
      }
    ));
  }

  update(product: Product) {
    this.http.post(this.ApiUrl + 'Update', product).pipe(map(
      (response) => {
        return response;
      }
    ));
  }

  delete(product: Product) {
    this.http.post(this.ApiUrl + 'Delete', product).pipe(map(
      (response) => {
        return response;
      }
    ));
  }

  load(ID: number = null, Name: string = null,  langId: number = null): Observable<Product[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&Name=';
    if (Name != null) {
      queryString += Name;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
      return this.http.get<Product[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

}
