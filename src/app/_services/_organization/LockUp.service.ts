import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import { LockUp } from '../../entities/organization/LockUp';


@Injectable({
  providedIn: 'root'
})
export class LockUpService {


  lockUpApiUrl: string = environment.azureUrl + 'LockUps/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  LockUps: LockUp[];
  constructor(private http: HttpClient) { }

  addLockUp(lockUp: LockUp) {
    this.http.post(this.lockUpApiUrl + 'Create', lockUp).map(
      (response) => {
        return response;
      }
    );
  }
  updateLockUp(lockUp: LockUp) {
    this.http.post(this.lockUpApiUrl + 'Update', lockUp).map(
      (response) => {
        return response;
      }
    );
  }
  deletleLockUp(lockUp: LockUp) {
    this.http.post(this.lockUpApiUrl + 'Delete', lockUp).map(
      (response) => {
        return response;
      }
    );
  }
  deleteLockUps(lockups: LockUp[]) {
    this.http.post(this.lockUpApiUrl + 'Delete', lockups).map(
      (response) => {
        return response;
      }
    );
  }
  LoadLockUpsByMajorCode(majorCode: number = 1): Observable<LockUp[]> {
    return this.http.get<LockUp[]>(this.lockUpApiUrl + 'LoadLockUps?MajorCode=' + majorCode);
  }
  LoadLockUpStatus(majorCode: number = 1): Observable<LockUp[]> {
    return this.http.get<LockUp[]>(this.lockUpApiUrl + 'Load?MajorCode=' + majorCode);
  }

  LoadLockUpsByMinorCode(minorCode: number = 1): Observable<LockUp[]> {
    return this.http.get<LockUp[]>(this.lockUpApiUrl + 'LoadLockUps?MinorCode=' + minorCode);
  }
  LoadLockUpsByParentID(LockupParentID: number = 1): Observable<LockUp[]> {
    return this.http.get<LockUp[]>(this.lockUpApiUrl + 'LoadLockUps?LockupParentID=' + LockupParentID);
  }
  loadMajorCodes(): Observable<LockUp[]> {
    return this.http.get<LockUp[]>(this.lockUpApiUrl + 'LoadLockUps');
  }
  loadMinorCodes(majorCode: number): Observable<LockUp[]> {
    let queryString = '';

    if (majorCode != null) {
      queryString += 'MajorCode=' + majorCode;
    }
    return this.http.get<LockUp[]>(this.lockUpApiUrl + '/LoadLockUpsMinorCode?' + queryString);
  }

  LoadLockUpsForQuestionnaire(languageID: number): Observable<LockUp[]> {
    let queryString = '';

    if (languageID != null) {
      queryString += 'languageID=' + languageID;
    }
    return this.http.get<LockUp[]>(this.lockUpApiUrl + '/LoadLockUpsForQuestionnaire?' + queryString);
  }
}
