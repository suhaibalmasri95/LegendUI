import { Component } from '@angular/core';
import { Router } from '@angular/router';
import 'jquery-slimscroll';

declare var jQuery: any;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'navigation',
  templateUrl: 'navigation.template.html'
})

export class NavigationComponent {

  constructor(private router: Router) { }

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


}
