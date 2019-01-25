
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Country } from '../../entities/organization/Country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

countryApiUrl: string = environment.azureUrl + 'Countries/';
commonApiUrl: string = environment.azureUrl + 'Common/';
countries: Country[];

constructor(private http: HttpClient) { }


loadCountries(): Observable<Country[]> {
  return this.http.get<Country[]>(this.countryApiUrl + 'Load ');
}

addCountry(country: Country) {
  return this.http.post(this.countryApiUrl + 'Create', country).pipe(map(
    (response) => {
      return response;
    }
  ));
}
updateCountry(country: Country) {
  return this.http.post(this.countryApiUrl + 'Update', country).pipe(map(
    (response) => {
      return response;
    }
  ));
}
deleteCountry(country: Country) {
  return this.http.post(this.countryApiUrl + 'Delete', country).pipe(map(
    (response) => {
      return response;
    }
  ));
}
deleteCountries(countries: Country[]) {
  return this.http.post(this.countryApiUrl + 'Delete', countries).pipe(map(
    (response) => {
      return response;
    }
  ));
}



}
