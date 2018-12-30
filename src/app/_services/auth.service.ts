import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { User } from '../entities/organization/user';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  apiUrl: string = environment.azureUrl + 'auth/login';
  userToken: any;
  decoderToken: any;
  currentUser: User;
  jwHelper: JwtHelperService = new JwtHelperService();
  private photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();
  constructor(private http: HttpClient) {}

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http
      .post(this.apiUrl, model)
      .map((respone: Response) => {
        const res: any = respone;
        const user: any = res.user;
        const userCompany: any = res.userCompany;
        if (user) {
          localStorage.setItem('access_token', res.tokenString);
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('company', JSON.stringify(userCompany));
          this.decoderToken = this.jwHelper.decodeToken(res.tokenString);
          this.currentUser = user;
          this.userToken = res.tokenString;
        }
      }).catch(this.handelError);
  }

  loggedIn() {
    const token = localStorage.getItem('access_token');
    if (!token) { return false; }

    return !this.jwHelper.isTokenExpired(token);
  }
  private handelError(error: any) {
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
      return Observable.throw(applicationError);
    }
    const serverError = error.json();
    let modelStateError = '';
    if (serverError) {
      for (const key in serverError) {
        if (serverError[key]) {
          modelStateError += serverError[key] + '\n';
        }
      }
    }
    return Observable.throw(modelStateError || 'Server Error');
  }
}
