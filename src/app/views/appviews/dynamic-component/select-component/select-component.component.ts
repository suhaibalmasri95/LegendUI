import { Component, OnInit, Input } from '@angular/core';
import { ProductDynamicColumn } from './../../../../entities/Dynamic/ProductDynamicColumn';
import { SharedService } from './../../../../_services/sharedService.service';
import { LockUpService } from './../../../../_services/_organization/LockUp.service';
import { LockUp } from './../../../../entities/organization/LockUp';
@Component({
  selector: 'app-select-component',
  templateUrl: './select-component.component.html',
  styleUrls: ['./select-component.component.css']
})
export class SelectComponentComponent implements OnInit {
  lockups: LockUp[];
  constructor(private lockUpServce: LockUpService , private dataChangeService: SharedService) { }
  @Input('child') child: ProductDynamicColumn;
  sharedCode: number;
  ngOnInit() {
    this.dataChangeService.currentCode.subscribe(code=> {
      this.sharedCode = code;
      this.lockUpServce.GetLockUpsByMajorCode(this.sharedCode).subscribe( res => {
        this.lockups = res;
      });
    })
   
  }

}
