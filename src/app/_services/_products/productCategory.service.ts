import { Category } from './../../entities/Setup/Categories';
import { ProductColumnValidation } from './../../entities/Product/ProductColumnValidation';
import { ProductCategory } from './../../entities/Product/ProductCategory';
import { ProductColumns } from './../../entities/Product/ProductColumns';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  ApiUrlCategory: string = environment.azureUrl + 'ProductCategory/';
  ApiUrlColumn: string = environment.azureUrl + 'ProductColumn/';
  ApiUrlValidation: string = environment.azureUrl + 'ProductValidation/';
  commonApiUrl: string = environment.azureUrl + 'Common/';


  constructor(private http: HttpClient) { }

  loadCategory(ID: number = null, CategoryID: number = null, ProductID: number = null, ProductDetailID: number = null,
    CategoryLevel: number = null, LineOfBusniess: number = null,
    SubLineOfBusniess: number = null, langId: number = null): Observable<ProductCategory[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&CategoryID=';
    if (CategoryID != null) {
      queryString += CategoryID;
    }
    queryString += '&ProductID=';
    if (ProductID != null) {
      queryString += ProductID;
    }
    queryString += '&ProductDetailID=';
    if (ProductDetailID != null) {
      queryString += ProductDetailID;
    }
    queryString += '&CategoryLevel=';
    if (CategoryLevel != null) {
      queryString += CategoryLevel;
    }
    queryString += '&LineOfBusniess=';
    if (LineOfBusniess != null) {
      queryString += LineOfBusniess;
    }
    queryString += '&SubLineOfBusniess=';
    if (SubLineOfBusniess != null) {
      queryString += SubLineOfBusniess;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
    }

    return this.http.get<ProductCategory[]>(this.ApiUrlCategory + 'Load' + queryString);

  }
  loadUnRelatedCategory(ID: number = null, CategoryID: number = null, ProductID: number = null, ProductDetailID: number = null,
    CategoryLevel: number = null, LineOfBusniess: number = null,
    SubLineOfBusniess: number = null, langId: number = null): Observable<any> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&CategoryID=';
    if (CategoryID != null) {
      queryString += CategoryID;
    }
    queryString += '&ProductID=';
    if (ProductID != null) {
      queryString += ProductID;
    }
    queryString += '&ProductDetailID=';
    if (ProductDetailID != null) {
      queryString += ProductDetailID;
    }
    queryString += '&CategoryLevel=';
    if (CategoryLevel != null) {
      queryString += CategoryLevel;
    }
    queryString += '&LineOfBusniess=';
    if (LineOfBusniess != null) {
      queryString += LineOfBusniess;
    }
    queryString += '&SubLineOfBusniess=';
    if (SubLineOfBusniess != null) {
      queryString += SubLineOfBusniess;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
    }
    return this.http.get<any>(this.ApiUrlCategory + 'LoadUnRelatedCategory' + queryString);

  }

  loadColumn(ID: number = null, CategoryID: number = null, ProductID: number = null, ProductDetailID,
    ColumnType: number = null, LineOfBusniess: number = null, SubLineOfBusniess: number = null, langId): Observable<ProductColumns[]> {
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

    queryString += '&CategoryID=';
    if (CategoryID != null) {
      queryString += CategoryID;
    }

    queryString += '&ColumnType=';
    if (ColumnType != null) {
      queryString += ColumnType;
    }
    queryString += '&SubLineOfBusniess=';
    if (SubLineOfBusniess != null) {
      queryString += SubLineOfBusniess;
    }

    queryString += '&LineOfBusniess=';
    if (LineOfBusniess != null) {
      queryString += LineOfBusniess;
    }

    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
    }
    return this.http.get<ProductColumns[]>(this.ApiUrlColumn + 'Load' + queryString);

  }
  loadValidation(ID: number = null, CategoryID: number = null, ProductID: number = null, ProductDetailID,
    ColumnID: number = null, LocValidType: number = null, langId): Observable<ProductColumnValidation[]> {
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

    queryString += '&CategoryID=';
    if (CategoryID != null) {
      queryString += CategoryID;
    }

    queryString += '&ColumnID=';
    if (ColumnID != null) {
      queryString += ColumnID;
    }
    queryString += '&LocValidType=';
    if (LocValidType != null) {
      queryString += LocValidType;
    }



    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
    }
    return this.http.get<ProductColumnValidation[]>(this.ApiUrlValidation + 'Load' + queryString);
  }


}
