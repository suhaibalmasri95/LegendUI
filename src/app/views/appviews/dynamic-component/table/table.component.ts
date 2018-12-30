import { SharedColumn } from './../../../../_services/sharedColumn.service';
import { DynamicDatasource } from './../../../../entities/Dynamic/dynamicDatasource';
import { DynamicTable } from './../../../../entities/Dynamic/dynamicTable';
import { SharedService } from './../../../../_services/sharedService.service';
import { ProductDynamicColumn } from './../../../../entities/Dynamic/ProductDynamicColumn';
import { Component, OnInit, ViewChild, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit , OnChanges {
  // tslint:disable-next-line:no-input-rename
  @Output()
  parent = new EventEmitter<number>();
  // tslint:disable-next-line:no-input-rename
  @Input('tableColumns') tableColumns = [];
  selected = false;
  // tslint:disable-next-line:no-input-rename
  @Input('list') list: DynamicTable[] = [];
  // tslint:disable-next-line:no-input-rename
  @Input('dynamicDataSource') dynamicDataSource: any[] = [];
  dataSource: MatTableDataSource<any>;
  selection: SelectionModel<any>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('table', { read: MatSort }) sort: MatSort;
  columns: any[];
  column: any;
  constructor() { }

  ngOnChanges() {
    // create header using child_id
    this.renderTable(this.dynamicDataSource);
  }
  ngOnInit() {
      this.renderTable(this.dynamicDataSource);
  }

  applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    renderTable(columns: any[]) {
      this.columns = columns;
      this.dataSource = new MatTableDataSource<any>(columns);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<any>(true, []);
      this.dataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
        if (!sortData[sortHeaderId]) {
          return this.sort.direction === 'asc' ? '3' : '1';
        }
        // tslint:disable-next-line:max-line-length
        return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
      };
    }
    update(col: any , index: number) {
      // save the current index

      for (let colIndex = 0; colIndex < this.dynamicDataSource.length; colIndex++) {
        if (colIndex === index) {
         const data =  this.dynamicDataSource[colIndex];
         data['selected' + colIndex]  = true;
        } else {
          const data =  this.dynamicDataSource[colIndex];
          data['selected' + colIndex]  = false;
        }
      }
      this.parent.emit(index);
      console.log(col);
    }

    isAllSelected() {
      return this.selection.selected.length === this.dataSource.data.length;
    }
    masterToggle() {
      this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
    }
  }



