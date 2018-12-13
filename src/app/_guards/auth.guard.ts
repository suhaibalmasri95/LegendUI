import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService , private router: Router , private alertify: AlertifyService) { }
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
   if (this.authService.loggedIn()) {
     return true;
   }
   this.alertify.error('you need to logged in to access this area');
   this.router.navigate(['/login']);
   return false;
  }
}
