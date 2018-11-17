import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Currency } from '../../entities/organization/Currency';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currencyApiUrl: string = environment.azureUrl + 'Currencies/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  currencies: Currency[];
  constructor(private http: HttpClient) {}

  loadCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(this.currencyApiUrl + 'Load');
  }

  addCurrency(currency: Currency) {
    this.http
      .post(this.currencyApiUrl + 'Create', currency)
      .map(response => {
        return response;
      })
      ;
  }
  updateCurrency(currency: Currency) {
    this.http
      .post(this.currencyApiUrl + 'Update', currency)
      .map(response => {
        return response;
      })
      ;
  }
  deleteCurrency(currency: Currency) {
    this.http
      .post(this.currencyApiUrl + 'Delete', currency)
      .map(response => {
        return response;
      })
      ;
  }
  deleteCurrencies(currencies: Currency[]) {
    this.http
      .post(this.currencyApiUrl + 'Delete', currencies)
      .map(response => {
        return response;
      })
      ;
  }


}
