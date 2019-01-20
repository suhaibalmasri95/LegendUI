import { ProductQuestionnaire } from './../../entities/Product/Products';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class ProductQuestionnaireService {

  ApiUrl: string = environment.azureUrl + 'ProductQuestionnaire/';
  commonApiUrl: string = environment.azureUrl + 'ProductQuestionnaire/';
  Questionnaires: ProductQuestionnaire[];

  constructor(private http: HttpClient) { }

  add(questionnaire: ProductQuestionnaire) {
    this.http.post(this.ApiUrl + 'Create', questionnaire).map(
      (response) => {
        return response;
      }
    );
  }

  update(questionnaire: ProductQuestionnaire) {
    this.http.post(this.ApiUrl + 'Update', questionnaire).map(
      (response) => {
        return response;
      }
    );
  }

  delete(questionnaire: ProductQuestionnaire) {
    this.http.post(this.ApiUrl + 'Delete', questionnaire).map(
      (response) => {
        return response;
      }
    );
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

  loadRelated(productID: number = null, productDetailedID: number = null, langId: number = null): Observable<any> {
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

        return this.http.get<any>(this.ApiUrl + 'LoadRelatedQuestionnaire' + queryString);
      }
    }

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
