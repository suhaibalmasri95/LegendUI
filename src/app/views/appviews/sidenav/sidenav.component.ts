import { Component, OnInit, ViewChild, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { SidenavService } from './../../../_services/sidenav/sidenav.service';
import { MatSidenav } from '@angular/material';
import {MediaMatcher} from '@angular/cdk/layout';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit , OnDestroy {
  @ViewChild('sidenav') public sidenav: MatSidenav;
  screenWidth: number;
  BasicOptions: any;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(private sidenavService: SidenavService , changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  this.BasicOptions = [
    {
      name: 'Login',
      routeUrl: '/login',
      iconName: 'input'
    },
    {
      name: 'Home',
      routeUrl: '/patients',
      iconName: 'home'

    }
    ,
    {
      name: 'Doctor',
      routeUrl: '/doctor',
      iconName: 'face'
    },
    {
      name: 'Add Patient',
      routeUrl: '/patient-registration',
      iconName: 'face'
    }
    ,
    {
      name: 'teeth',
      routeUrl: '/teeth',
      iconName: 'face'
    }
  ];

  }

  ngOnInit() {
    this.sidenavService.setSidenav(this.sidenav);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
