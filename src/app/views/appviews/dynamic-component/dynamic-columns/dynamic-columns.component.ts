import { MajorCode } from './../../../../entities/models/majorCode';
import { SharedService } from './../../../../_services/sharedService.service';
import { SelectComponentComponent } from './../select-component/SelectComponentComponent';
import { Filter } from './../../../../entities/filter/filter';
import { DynamicService } from './../../../../_services/_dynamic/Dynamic.service';

import { ProductDynamicColumn } from './../../../../entities/Dynamic/ProductDynamicColumn';
import { Component, OnInit, Input, ViewChild, TemplateRef, ViewContainerRef, AfterContentInit } from '@angular/core';
import { a } from '@angular/core/src/render3';
@Component({
  selector: 'app-dynamic-columns',
  templateUrl: './dynamic-columns.component.html',
  styleUrls: ['./dynamic-columns.component.css']
})
export class DynamicColumnsComponent implements OnInit   {

  // tslint:disable-next-line:no-input-rename
  @Input('column') columns: ProductDynamicColumn[];
  // tslint:disable-next-line:no-input-rename
  @Input('list') list: ProductDynamicColumn[];
  // tslint:disable-next-line:no-input-rename
  filter: Filter;
  childs: ProductDynamicColumn[];
  constructor(private service: DynamicService) { }

  ngOnInit() {
    this.filter = new Filter();
    this.childs = [];
  }

  getChildren(item: ProductDynamicColumn) {
    if ( item.ChildCounts > 0) {
      this.filter.MajorCode = item.MajorCode;
      this.filter.parentID = item.ID;
      this.filter.LangID = 1;
      this.filter.MinorCode = item.ValueLockUpID;
      this.service.loadChildren(this.filter).subscribe(res => {
       if (this.childs.length > 0) {
        this.childs = this.getTheNewValues(this.childs , res);
        this.childs = [...this.childs, ...res];
        this.childs = this.arrayUnique(this.childs);
      } else {
      this.childs = res;
    }
      });
    }
  }

  arrayUnique(array) {
    const a = array.concat();
    for (let i = 0; i < a.length; ++i) {
      for (let j = i + 1; j < a.length; ++j) {
        if (a[i].ID === a[j].ID ) {
          a.splice(j--, 1);
        }
      }
    }

    return a;
  }


  getTheNewValues(oldArray , newArray) {
    const returnedArray = oldArray;
    for (let i = 0 ; i < oldArray.length ; i++) {
      for (let j = 0; j < newArray.length; j++) {
        if (oldArray[i].ID === newArray[j].ID ) {
          returnedArray.splice(i, 1);
           returnedArray.push(newArray[j]);
        }
      }
    }
    return returnedArray;
}
}
