import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Installment } from '../../entities/production/Installment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstallmentService {

  ApiUrl: string = environment.azureUrl + 'Installments/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  constructor(private http: HttpClient) { }


  load(ID: number = null, DocumentId: number = null, langId: number = null): Observable<Installment[]> {
    let queryString = '?ID=';

    if (ID != null) {
      queryString += ID;
    }

    queryString += '&DocumentId=';
    if (DocumentId != null) {
      queryString += DocumentId;
    }

    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
    }
    // tslint:disable-next-line:max-line-length
    return this.http.get<Installment[]>(this.ApiUrl + 'Load' + queryString);
  }

}
