
import {map} from 'rxjs/operators';
import { ProductQuestionnaire } from './../../entities/Product/Products';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductQuestionnaireService {

  ApiUrl: string = environment.azureUrl + 'ProductQuestionnaire/';
  commonApiUrl: string = environment.azureUrl + 'ProductQuestionnaire/';
  Questionnaires: ProductQuestionnaire[];

  constructor(private http: HttpClient) { }

  add(questionnaire: ProductQuestionnaire) {
    this.http.post(this.ApiUrl + 'Create', questionnaire).pipe(map(
      (response) => {
        return response;
      }
    ));
  }

  update(questionnaire: ProductQuestionnaire) {
    this.http.post(this.ApiUrl + 'Update', questionnaire).pipe(map(
      (response) => {
        return response;
      }
    ));
  }

  delete(questionnaire: ProductQuestionnaire) {
    this.http.post(this.ApiUrl + 'Delete', questionnaire).pipe(map(
      (response) => {
        return response;
      }
    ));
  }

  load(ID: number = null, productID: number = null, productDetailedID: number = null, langId: number = null): Observable<any> {
    let queryString = '?productID=';
    if (productID != null) {
      queryString += productID;
    }
    queryString += '&productDetailedID=';
    if (productDetailedID != null) {
      queryString += productDetailedID;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
    }
    return this.http.get<ProductQuestionnaire[]>(this.ApiUrl + 'Load' + queryString);

  }

  loadRelated(productDetailID: number = null, LineOfBusiness: number = null ,
    SubLine: number = null, langId: number = null): Observable<any> {
   let queryString = '?productDetailedID=';
   if (productDetailID != null) {
     queryString += productDetailID;
   }
   queryString += '&LineOfBusiness=';
   if (LineOfBusiness != null) {
     queryString += LineOfBusiness;
   }
     queryString += '&SubLine=';
     if (SubLine != null) {
       queryString += SubLine;
     }
   queryString += '&langId=';
   if (langId != null) {
     queryString += langId;
   }

        return this.http.get<any>(this.ApiUrl + 'LoadRelatedQuestionnaire' + queryString);
      }


  LoadQuestionnaire(productID: number = null, productDetailedID: number = null, langId: number = null):
   Observable<any> {
    let queryString = '?productID=';
    if (productID != null) {
      queryString += productID;
    }
    queryString += '&productDetailedID=';
    if (productDetailedID != null) {
      queryString += productDetailedID;

      queryString += '&langId=';
      if (langId != null) {
        queryString += langId;

        return this.http.get<any>(this.ApiUrl + 'LoadQuestionnaire' + queryString);
      }
    }

  }
}
