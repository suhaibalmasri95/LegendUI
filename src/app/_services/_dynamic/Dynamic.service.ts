import { ProductDynamicColumn } from './../../entities/Dynamic/ProductDynamicColumn';
import { Filter } from './../../entities/filter/filter';
import { Observable } from 'rxjs';
import { ProductDynmicCategory } from './../../entities/Dynamic/ProductDynmicCategory';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicService {

  dynamicApiUrl: string = environment.azureUrl + 'Dynamic/';
  commonApiUrl: string = environment.azureUrl + 'Common/';

  constructor(private http: HttpClient) {}


  load(ID: number = null, CategoryID: number = null, ProductID: number = null,
    ProductDetailID: number = null, CategoryLevel: number = null, LineOfBuisness: number = null,
     SubLineOfBuisness: number = null , langId: number = null)
  : Observable<ProductDynmicCategory[]> {
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
    queryString += '&LineOfBuisness=';
    if (LineOfBuisness != null) {
      queryString += LineOfBuisness;
    }
    queryString += '&SubLineOfBuisness=';
    if (SubLineOfBuisness != null) {
      queryString += SubLineOfBuisness;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
    }
    // tslint:disable-next-line:max-line-length
    return this.http.get<ProductDynmicCategory[]>(this.dynamicApiUrl + 'Load' + queryString);
  }
  loadChildren(fileterObject: Filter): Observable<ProductDynamicColumn[]> {

    let queryString = '?parentID=';

    if (fileterObject.parentID != null) {
      queryString += fileterObject.parentID;
    }
    queryString += '&MajorCode=';
    if (fileterObject.MajorCode != null) {
      queryString += fileterObject.MajorCode;
    }
    queryString += '&MinorCode=';
    if (fileterObject.MinorCode != null) {
      queryString += fileterObject.MinorCode;
    }
    queryString += '&LangID=';
    if (fileterObject.LangID != null) {
      queryString += fileterObject.LangID;
    }

    return this.http.get<ProductDynamicColumn[]>(this.dynamicApiUrl + 'LoadChild' + queryString);
  }
}
