
import {map} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Area } from '../../entities/organization/Area';
@Injectable({
  providedIn: 'root'
})
export class AreaService {

 areaApiUrl: string = environment.azureUrl + 'Areas/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  areas: Area[];
  constructor(private http: HttpClient) {}

  loadAreas(areaId: number = null, cityId: number = null, countryId: number = null, langId: number = null): Observable<Area[]> {
    let queryString = '?areaId=';

    if (areaId != null) {
      queryString += areaId;
    }
    queryString += '&cityId=';
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
    // tslint:disable-next-line:max-line-length
    return this.http.get<Area[]>(this.areaApiUrl + 'Load' + queryString);
  }

addArea(area: Area) {
  this.http.post(this.areaApiUrl + 'Create', area).pipe(map(
    (response) => {
      return response;
    }
  ));
}
updateArea(area: Area) {
  this.http.post(this.areaApiUrl + 'Update', area).pipe(map(
    (response) => {
      return response;
    }
  ));
}
deleteArea(area: Area) {
  this.http.post(this.areaApiUrl + 'delete', area).pipe(map(
    (response) => {
      return response;
    }
  ));
}
deleteAreas(areas: Area[]) {
  this.http.post(this.areaApiUrl + 'Delete', areas).pipe(map(
    (response) => {
      return response;
    }
  ));
}





}
