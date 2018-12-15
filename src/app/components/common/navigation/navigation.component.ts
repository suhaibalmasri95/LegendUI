import { Component } from '@angular/core';
import { Router } from '@angular/router';
import 'jquery-slimscroll';
import { AuthService } from '../../../_services/auth.service';
import { AlertifyService } from '../../../_services/alertify.service';
declare var jQuery: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navigation',
  templateUrl: 'navigation.template.html'
})

export class NavigationComponent {

  constructor(private router: Router , public authService: AuthService, private alertify: AlertifyService) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    jQuery('#side-menu').metisMenu();

    if (jQuery('body').hasClass('fixed-sidebar')) {
      jQuery('.sidebar-collapse').slimscroll({
        height: '100%'
      });
    }
  }

  activeRoute(routename: string): boolean {
    return this.router.url.indexOf(routename) > -1;
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
