import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Calculation } from '../../entities/production/Calculation';

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  ApiUrl: string = environment.azureUrl + 'Covers/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
constructor(private http: HttpClient) { }


load(ID: number = null, ChargeType: number = null,  DocumentId: number = null, RiskId: number = null ,langId: number = null): Observable<Calculation[]> {
  let queryString = '?ID=';

  if (ID != null) {
    queryString += ID;
  }
  queryString += '&ChargeType=';
  if (ChargeType != null) {
    queryString += ChargeType;
  }
  queryString += '&DocumentId=';
  if (DocumentId != null) {
    queryString += DocumentId;
  }
  queryString += '&RiskId=';
  if (RiskId != null) {
    queryString += RiskId;
  }
  queryString += '&langId=';
  if (langId != null) {
    queryString += langId;
  }
  // tslint:disable-next-line:max-line-length
  return this.http.get<Calculation[]>(this.ApiUrl + 'Load' + queryString);
}
}
