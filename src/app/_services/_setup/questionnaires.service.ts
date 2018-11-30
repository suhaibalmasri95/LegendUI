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

  ApiUrl: string = environment.azureUrl + 'Charge/';
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

  load(ID: number = null, LockUpChargeType: number = null, LineOfBusinessCode: number = null,
    ChargeID: number = null, langId: number = null): Observable<Questionnaire[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&LockUpChargeType=';
    if (LockUpChargeType != null) {
      queryString += LockUpChargeType;
    }
    queryString += '&LineOfBusinessCode=';
    if (LineOfBusinessCode != null) {
      queryString += LineOfBusinessCode;
    }
    queryString += '&ChargeID=';
    if (ChargeID != null) {
      queryString += ChargeID;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
      return this.http.get<Questionnaire[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

}
