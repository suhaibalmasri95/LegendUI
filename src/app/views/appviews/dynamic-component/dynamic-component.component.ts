import { ProductDynmicCategory } from './../../../entities/Dynamic/ProductDynmicCategory';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.css']
})
export class DynamicComponentComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('category') category: ProductDynmicCategory;


  constructor() { }

  ngOnInit() {
  }

}
