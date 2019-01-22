import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap';

import { BasicLayoutComponent } from './basicLayout.component';
import { BlankLayoutComponent } from './blankLayout.component';


import { NavigationComponent } from './../navigation/navigation.component';
import { FooterComponent } from './../footer/footer.component';
import { TopNavbarComponent } from './../topnavbar/topnavbar.component';
import { TopNavigationNavbarComponent } from './../topnavbar/topnavigationnavbar.component';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';
import { HttpClientModule } from '@angular/common/http';
import { TopNavigationLayoutComponent } from './TopNavigationLayoutComponent';

@NgModule({
  declarations: [
    FooterComponent,
    BasicLayoutComponent,
    BlankLayoutComponent,
    NavigationComponent,
    TopNavigationLayoutComponent,
    TopNavbarComponent,
    TopNavigationNavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    HttpClientModule, // Import Http Client
    BlockUIModule.forRoot(), // Import BlockUIModule
    BlockUIHttpModule.forRoot({
      requestFilters: [
        { method: 'GET', url: /getPolicyHolders/ }
      ]
    }),
  ],
  exports: [
    FooterComponent,
    BasicLayoutComponent,
    BlankLayoutComponent,
    NavigationComponent,
    TopNavigationLayoutComponent,
    TopNavbarComponent,
    TopNavigationNavbarComponent
  ],
})

export class LayoutsModule { }
