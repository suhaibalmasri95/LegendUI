import { Component } from '@angular/core';
import { smoothlyMenu } from '../../../app.helpers';
import { Router } from '@angular/router';

import { AuthService } from '../../../_services/auth.service';
import { AlertifyService } from '../../../_services/alertify.service';
declare var jQuery:any;

@Component({
  selector: 'topnavbar',
  templateUrl: 'topnavbar.template.html'
})
export class TopNavbarComponent {

  constructor(private router: Router , public authService: AuthService, private alertify: AlertifyService) { }

  toggleNavigation(): void {
    jQuery("body").toggleClass("mini-navbar");
    smoothlyMenu();
  }
  logout() {
    this.authService.userToken = null;
    this.authService.currentUser = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    this.alertify.message('logged out');
    this.router.navigate(['/login']);
  }
}
