import { SubjectType } from './../../entities/Setup/Products';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class SubjectTypeService {

  ApiUrl: string = environment.azureUrl + 'SubjectTypes/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  SubjectTypes: SubjectType[];

  constructor(private http: HttpClient) { }

  add(product: SubjectType) {
    this.http.post(this.ApiUrl + 'Create', product).map(
      (response) => {
        return response;
      }
    );
  }

  update(product: SubjectType) {
    this.http.post(this.ApiUrl + 'Update', product).map(
      (response) => {
        return response;
      }
    );
  }

  delete(product: SubjectType) {
    this.http.post(this.ApiUrl + 'Delete', product).map(
      (response) => {
        return response;
      }
    );
  }

  load(ID: number = null, QusLevel: number = null, LineOfBusiness: number = null,
    SubLineOfBusiness: number = null, langId: number = null): Observable<SubjectType[]> {
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
      return this.http.get<SubjectType[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

}
