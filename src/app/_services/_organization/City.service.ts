
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { City } from '../../entities/organization/City';
import { Observable } from 'rxjs';

import { Http, Headers, RequestOptions, Response } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class CityService {

 cityApiUrl: string = environment.azureUrl + 'Cities/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  cities: City[];
  constructor(private http: HttpClient) {}



loadCities(countryId: number = null, cityId: number = null, langId: number = null): Observable<City[]> {
  let queryString = '?cityId=';

  if (cityId != null) {
    queryString += cityId;
  }
  queryString += '&countryId=';
  if (countryId != null) {
    queryString += countryId;
  }
  queryString += '&langId=';
  if (langId != null) {
    queryString += langId;
  }
  return this.http.get<City[]>(this.cityApiUrl + '/Load' + queryString);
}
addCity(city: City) {
  this.http.post(this.cityApiUrl + 'Create', city).pipe(map(
    (response) => {
      return response;
    }
  ));
}
updateCity(city: City) {
  this.http.post(this.cityApiUrl + 'Update', city).pipe(map(
    (response) => {
      return response;
    }
  ));
}
deleteCity(city: City) {
  this.http.post(this.cityApiUrl + 'delete', city).pipe(map(
    (response) => {
      return response;
    }
  ));
}
deleteCities(cities: City[]) {
  this.http.post(this.cityApiUrl + 'Delete', cities).pipe(map(
    (response) => {
      return response;
    }
  ));
}




}
