import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Column } from 'src/app/entities/Setup/Categories';

@Injectable({
  providedIn: 'root'
})
export class ColumnService {


  ApiUrl: string = environment.azureUrl + 'Column/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  Columns: Column[];

  constructor(private http: HttpClient) { }

  add(column: Column) {
    this.http.post(this.ApiUrl + 'Create', column).map(
      (response) => {
        return response;
      }
    );
  }

  update(column: Column) {
    this.http.post(this.ApiUrl + 'Update', column).map(
      (response) => {
        return response;
      }
    );
  }

  delete(column: Column) {
    this.http.post(this.ApiUrl + 'Delete', column).map(
      (response) => {
        return response;
      }
    );
  }

  load(ID: number = null, LockUpChargeType: number = null, LineOfBusinessCode: number = null,
    ChargeType: number = null, langId: number = null): Observable<Column[]> {
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
    queryString += '&ChargeType=';
    if (ChargeType != null) {
      queryString += ChargeType;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
      return this.http.get<Column[]>(this.ApiUrl + 'Load' + queryString);
    }
  }

}
