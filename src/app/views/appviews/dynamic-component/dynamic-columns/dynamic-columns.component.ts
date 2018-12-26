
import { ProductDynamicColumn } from './../../../../entities/Dynamic/ProductDynamicColumn';
import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from './../../../../_services/sharedService.service';
@Component({
  selector: 'app-dynamic-columns',
  templateUrl: './dynamic-columns.component.html',
  styleUrls: ['./dynamic-columns.component.css']
})
export class DynamicColumnsComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('column') columns: ProductDynamicColumn[];
  // tslint:disable-next-line:no-input-rename
  @Input('withChildren') Cddl: ProductDynamicColumn[];
  // tslint:disable-next-line:no-input-rename
  @Input('withoutChildren') Pddl: ProductDynamicColumn[];
  
  constructor(private dataShareing: SharedService) { }

  ngOnInit() {
  }

  getChildLockUp(majorCode: number) {
    this.dataShareing.changeCode(majorCode);
  
  }

}
