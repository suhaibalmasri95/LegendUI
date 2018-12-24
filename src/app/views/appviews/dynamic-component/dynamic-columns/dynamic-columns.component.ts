import { ProductDynamicColumn } from './../../../../entities/Dynamic/ProductDynamicColumn';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-columns',
  templateUrl: './dynamic-columns.component.html',
  styleUrls: ['./dynamic-columns.component.css']
})
export class DynamicColumnsComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('column') column: ProductDynamicColumn;
  constructor() { }

  ngOnInit() {
  }

}
