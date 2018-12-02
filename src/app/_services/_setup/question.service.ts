import { Question } from './../../entities/Setup/Questionnaires';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  ApiUrl: string = environment.azureUrl + 'Questions/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  Questions: Question[];

  constructor(private http: HttpClient) { }

  add(questions: Question) {
    this.http.post(this.ApiUrl + 'Create', questions).map(
      (response) => {
        return response;
      }
    );
  }

  update(questions: Question) {
    this.http.post(this.ApiUrl + 'Update', questions).map(
      (response) => {
        return response;
      }
    );
  }

  delete(questions: Question) {
    this.http.post(this.ApiUrl + 'Delete', questions).map(
      (response) => {
        return response;
      }
    );
  }

  load(ID: number = null, QusType: number = null, QusID: number = null,
     langId: number = null): Observable<Question[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&QusType=';
    if (QusType != null) {
      queryString += QusType;
    }
    queryString += '&QusID=';
    if (QusID != null) {
      queryString += QusID;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
      return this.http.get<Question[]>(this.ApiUrl + 'Load' + queryString);
    }
  }


}
