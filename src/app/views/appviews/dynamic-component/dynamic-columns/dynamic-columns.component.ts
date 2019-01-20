
import { Filter } from './../../../../entities/filter/filter';
import { DynamicService } from './../../../../_services/_dynamic/Dynamic.service';
import { ProductDynamicColumn } from './../../../../entities/Dynamic/ProductDynamicColumn';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-dynamic-columns',
  templateUrl: './dynamic-columns.component.html',
  styleUrls: ['./dynamic-columns.component.css']
})
export class DynamicColumnsComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('column') columns: ProductDynamicColumn[];
  @Input('updateMode') updateMode: boolean;
  // tslint:disable-next-line:no-input-rename
  order: string = 'ColumnOrder';

  // tslint:disable-next-line:no-input-rename

  @Output() childsData = new EventEmitter<ProductDynamicColumn[]>();
  // tslint:disable-next-line:no-input-rename

  childs: ProductDynamicColumn[];
  constructor(private service: DynamicService) { }

  ngOnInit() {
    this.childs = [];
    if (this.updateMode) {
      this.columns.forEach(element => {
        if (element.ChildCounts > 0) {
          this.columns.forEach(item => {
            if (item.ParentID === element.ID) {
              item.LockUps = [];
              item.OrginalLockUp.forEach(lockUp => {
                if (lockUp.LockUpID === element.ValueLockUpID) {
                  item.LockUps.push(lockUp);
                }
              });
            }
          });
        }


      });
    }
  }

  getChildren(item: ProductDynamicColumn) {
    if (item.ChildCounts > 0) {
      console.log(this.columns);
      this.columns.forEach(element => {
        if (element.ParentID === item.ID) {
          element.LockUps = [];
          element.OrginalLockUp.forEach(lockUp => {
            if (lockUp.LockUpID === item.ValueLockUpID) {
              element.LockUps.push(lockUp);
            }
          });
        }
      });
    }
    this.childsData.emit(this.childs);

  }

  arrayUnique(array) {
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        if (a[i].ID === a[j].ID) {
          a.splice(j--, 1);
        }
      }
    }

    return a;
  }


  getTheNewValues(oldArray, newArray) {
    const returnedArray = oldArray;
    for (let i = 0; i < oldArray.length; i++) {
      for (let j = 0; j < newArray.length; j++) {
        if (oldArray[i].ID === newArray[j].ID) {
          returnedArray.splice(i, 1);
          returnedArray.push(newArray[j]);
        }
      }
    }
    return returnedArray;
  }
}
