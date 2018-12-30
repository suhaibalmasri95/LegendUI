
import { DynamicTable } from './../entities/Dynamic/dynamicTable';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedService {

  private columnSource = new BehaviorSubject(null);
  currentColumn = this.columnSource.asObservable();


constructor() { }

changeColumn(column: any) {
  this.columnSource.next(column);
}


}
