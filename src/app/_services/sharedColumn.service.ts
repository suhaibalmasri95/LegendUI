import { DynamicDatasource } from '../entities/Dynamic/dynamicDatasource';
import { DynamicTable } from '../entities/Dynamic/dynamicTable';

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SharedColumn {

  private columnSource = new BehaviorSubject(null);
  currentColumn = this.columnSource.asObservable();

constructor() { }

changeColumn(column: string[]) {
  this.columnSource.next(column);
}



}
