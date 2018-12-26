import { LockUp } from './../../../../entities/organization/LockUp';
import { LockUpService } from './../../../../_services/_organization/LockUp.service';
import { ProductDynamicColumn } from './../../../../entities/Dynamic/ProductDynamicColumn';
import { Component, OnInit, Input } from '@angular/core';

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
  lockups: LockUp[];
  constructor(private lockUpServce: LockUpService) { }

  ngOnInit() {
  }

  getChildLockUp(majorCode: number) {
    this.lockUpServce.GetLockUpsByMajorCode(majorCode).subscribe( res => {
      this.lockups = res;
    });
  }

}
