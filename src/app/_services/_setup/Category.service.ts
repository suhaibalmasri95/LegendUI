import { Category } from './../../entities/Setup/Categories';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  ApiUrl: string = environment.azureUrl + 'Categories/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  Categories: Category[];

  constructor(private http: HttpClient) { }

  add(category: Category) {
    this.http.post(this.ApiUrl + 'Create', category).map(
      (response) => {
        return response;
      }
    );
  }

  update(category: Category) {
    this.http.post(this.ApiUrl + 'Update', category).map(
      (response) => {
        return response;
      }
    );
  }

  delete(category: Category) {
    this.http.post(this.ApiUrl + 'Delete', category).map(
      (response) => {
        return response;
      }
    );
  }

  load(ID: number = null, lineOfBussniess: number = null, subLineOfBussniess: number = null,
    categoryLevel: number = null, langId: number = null): Observable<Category[]> {

    let queryString = '?ID=';
    if (ID != null) {
      queryString += ID;
    }
    queryString += '&lineOfBussniess=';
    if (lineOfBussniess != null) {
      queryString += lineOfBussniess;
    }
    queryString += '&subLineOfBussniess=';
    if (subLineOfBussniess != null) {
      queryString += subLineOfBussniess;
    }
    queryString += '&categoryLevel=';
    if (categoryLevel != null) {
      queryString += categoryLevel;
    }
    queryString += '&langId=';
    if (langId != null) {
      queryString += langId;
      return this.http.get<Category[]>(this.ApiUrl + 'Load' + queryString);
    }
  }
}

