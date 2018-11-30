import { Question } from '../../entities/Setup/Questionnaires';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  ApiUrl: string = environment.azureUrl + 'Charge/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  Questions: Question[];

  constructor(private http: HttpClient) { }

  add(question: Question) {
    this.http.post(this.ApiUrl + 'Create', question).map(
      (response) => {
        return response;
      }
    );
  }

  update(question: Question) {
    this.http.post(this.ApiUrl + 'Update', question).map(
      (response) => {
        return response;
      }
    );
  }

  delete(question: Question) {
    this.http.post(this.ApiUrl + 'Delete', question).map(
      (response) => {
        return response;
      }
    );
  }

  load(ID: number = null, LockUpChargeType: number = null, LineOfBusinessCode: number = null,
    ChargeID: number = null, langId: number = null): Observable<Question[]> {
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
      return this.http.get<Question[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

}
