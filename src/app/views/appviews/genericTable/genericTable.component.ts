import { Component, OnInit, Output, EventEmitter, Input, ViewChild, OnChanges } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-generictable',
  templateUrl: './genericTable.component.html',
  styleUrls: ['./genericTable.component.css']
})
export class GenericTableComponent implements OnInit , OnChanges {
  @Output()
  update = new EventEmitter<number>();
  @Output()
  delete = new EventEmitter<number>();
  // tslint:disable-next-line:no-input-rename
  @Input('tableColumns') tableColumns = [];
  // tslint:disable-next-line:no-input-rename
  @Input('DataSource') DataSource: any[] = [];
  dataSource: MatTableDataSource<any>;
  selection: SelectionModel<any>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('table', { read: MatSort }) sort: MatSort;
  columns: any[];
  column: any;
  constructor() { }

  ngOnChanges() {
    // create header using child_id
    this.column = {};
    this.column.ID = null;
    this.renderTable(this.DataSource);
  }
  ngOnInit() {
      this.renderTable(this.DataSource);
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
    deleteRow(index: number) {
      this.delete.emit(index);
    }

    isAllSelected() {
      return this.selection.selected.length === this.dataSource.data.length;
    }
    masterToggle() {
      this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
    }
    updateRow(row: any) {
      this.column = row;
      this.update.emit(row);
    }
    getValue(element: any , column: any) {
      return element[column.replace(/\s+/g, '')];
    }
}
