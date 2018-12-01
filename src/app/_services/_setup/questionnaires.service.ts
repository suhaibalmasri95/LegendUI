import { Questionnaire } from '../../entities/Setup/Questionnaires';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class QuestionnairesService {

  ApiUrl: string = environment.azureUrl + 'Questionnaires/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  Questionnaires: Questionnaire[];

  constructor(private http: HttpClient) { }

  add(questionnaire: Questionnaire) {
    this.http.post(this.ApiUrl + 'Create', questionnaire).map(
      (response) => {
        return response;
      }
    );
  }

  update(questionnaire: Questionnaire) {
    this.http.post(this.ApiUrl + 'Update', questionnaire).map(
      (response) => {
        return response;
      }
    );
  }

  delete(questionnaire: Questionnaire) {
    this.http.post(this.ApiUrl + 'Delete', questionnaire).map(
      (response) => {
        return response;
      }
    );
  }

  load(ID: number = null, QusLevel: number = null, LineOfBusiness: number = null,
    SubLineOfBusiness: number = null, langId: number = null): Observable<Questionnaire[]> {
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
      return this.http.get<Questionnaire[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

}
