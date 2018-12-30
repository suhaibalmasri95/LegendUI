import { Summary } from './../../../entities/production/Summary';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './Summary.component.html',
  styleUrls: ['./Summary.component.css']
})
export class SummaryComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('text') text: string;
  // tslint:disable-next-line:no-input-rename
  @Input('value') value: string;
  constructor() { }

  ngOnInit() {
  }

}
