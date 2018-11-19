import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../../entities/organization/User';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userApiUrl: string = environment.azureUrl + 'User/';
  userGroupApiUrl: string = environment.azureUrl + 'UserGroup/';
  commonApiUrl: string = environment.azureUrl + 'Common/';
  users: User[];

  constructor(private http: HttpClient) { }


  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userApiUrl + 'Load ');
  }

  loadUserGroups(userId: number): Observable<any> {
    return this.http.get(this.userGroupApiUrl + 'Load?userId=' + userId);
  }

  addUser(user: User) {
    return this.http.post(this.userApiUrl + 'Create', user).map(
      (response) => {
        return response;
      }
    );
  }
  updateUser(user: User) {
    return this.http.post(this.userApiUrl + 'Update', user).map(
      (response) => {
        return response;
      }
    );
  }
  deleteUser(user: User) {
    return this.http.post(this.userApiUrl + 'Delete', user).map(
      (response) => {
        return response;
      }
    );
  }
  deleteUsers(user: User[]) {
    return this.http.post(this.userApiUrl + 'Delete', user).map(
      (response) => {
        return response;
      }
    );
  }

}
