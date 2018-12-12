import { Component, OnInit } from '@angular/core';
import { detectBody } from '../../../app.helpers';

declare var jQuery:any;

@Component({
  selector: 'topnavigationlayout',
  templateUrl: 'topNavigationlayout.template.html',
  host: {
    '(window:resize)': 'onResize()'
  }
})
export class TopNavigationLayoutComponent implements OnInit {
    ngOnInit(): void {
        detectBody();
    }
    public onResize() {
        detectBody();
      }
}