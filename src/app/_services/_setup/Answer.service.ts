
import {map} from 'rxjs/operators';
import { Answer } from './../../entities/Setup/Questionnaires';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  ApiUrl: string = environment.azureUrl + 'Answers/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  Answer: Answer[];

  constructor(private http: HttpClient) { }

  add(answer: Answer) {
    this.http.post(this.ApiUrl + 'Create', answer).pipe(map(
      (response) => {
        return response;
      }
    ));
  }

  update(answer: Answer) {
    this.http.post(this.ApiUrl + 'Update', Answer).pipe(map(
      (response) => {
        return response;
      }
    ));
  }

  delete(answer: Answer) {
    this.http.post(this.ApiUrl + 'Delete', answer).pipe(map(
      (response) => {
        return response;
      }
    ));
  }

  load(ID: number = null, QusID: number = null,
     langId: number = null): Observable<Answer[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }
    queryString += '&QusID=';
    if (QusID != null) {
      queryString += QusID;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
      return this.http.get<Answer[]>(this.ApiUrl + 'Load' + queryString);
    }
  }


}
