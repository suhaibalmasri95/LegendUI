import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Column } from '../../entities/Setup/Categories';

@Injectable({
  providedIn: 'root'
})
export class WordingService {


  ApiUrl: string = environment.azureUrl + 'ProductWordings/';
  commonApiUrl: string = environment.azureUrl + 'ProductWordingDetails/';
  Columns: Column[];

  constructor(private http: HttpClient) { }

  add(column: Column) {
    this.http.post(this.ApiUrl + 'Create', column).map(
      (response) => {
        return response;
      }
    );
  }

  update(column: Column) {
    this.http.post(this.ApiUrl + 'Update', column).map(
      (response) => {
        return response;
      }
    );
  }

  delete(column: Column) {
    this.http.post(this.ApiUrl + 'Delete', column).map(
      (response) => {
        return response;
      }
    );
  }

  load(ID: number = null, productID: number = null, ProductDetailID: number = null, langId: number = null): Observable<Column[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&productID=';
    if (productID != null) {
      queryString += productID;
    }
    queryString += '&ProductDetailID=';
    if (ProductDetailID != null) {
      queryString += ProductDetailID;
    }

    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
      return this.http.get<Column[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

  loadDetails(ID: number = null, productID: number = null, ProductDetailID: number = null, langId: number = null): Observable<Column[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&productID=';
    if (productID != null) {
      queryString += productID;
    }
    queryString += '&ProductDetailID=';
    if (ProductDetailID != null) {
      queryString += ProductDetailID;
    }

    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
      return this.http.get<Column[]>(this.commonApiUrl + 'Load' + queryString);
    }
  }

}
