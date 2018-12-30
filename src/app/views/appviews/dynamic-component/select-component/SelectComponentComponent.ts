import { SharedService } from './../../../../_services/sharedService.service';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { ProductDynamicColumn } from './../../../../entities/Dynamic/ProductDynamicColumn';
@Component({
  selector: 'app-select-component',
  templateUrl: './select-component.component.html',
  styleUrls: ['./select-component.component.css']
})
export class SelectComponentComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
   @Input('child')child: ProductDynamicColumn;
  // tslint:disable-next-line:no-output-rename
  @Output()
  parent = new EventEmitter<ProductDynamicColumn>();
  newChild: ProductDynamicColumn;
  sharedCode: number;
  constructor() { }
  // tslint:disable-next-line:no-input-rename

  ngOnInit() {
  }

  getChildrenForChildComponent(item: ProductDynamicColumn) {
    this.parent.emit(item);
  }
 
}
