import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { User } from '../entities/organization/user';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {
  apiUrl: string = environment.azureUrl + 'auth/login';
  userToken: any;
  decoderToken: any;
  currentUser: User;
  jwHelper: JwtHelper = new JwtHelper();
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
        if (user) {
          localStorage.setItem('token', res.tokenString);
          localStorage.setItem('user', JSON.stringify(user));
          this.decoderToken = this.jwHelper.decodeToken(res.tokenString);
          this.currentUser = user;
          this.userToken = res.tokenString;
        }
      }).catch(this.handelError);
  }

  loggedIn() {
    return tokenNotExpired('token');
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
