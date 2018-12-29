import { DynamicTable } from './../../../../entities/Dynamic/dynamicTable';
import { SharedService } from './../../../../_services/sharedService.service';
import { ProductDynamicColumn } from './../../../../entities/Dynamic/ProductDynamicColumn';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  tableColumns = ['select', 'ID', 'NAME', 'NAME2', 'Value'];
  dataSource: MatTableDataSource<DynamicTable>;
  selection: SelectionModel<DynamicTable>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('table', { read: MatSort }) sort: MatSort;
  columns: DynamicTable[];
  column: DynamicTable;
  constructor(private shareService: SharedService) { }

  ngOnInit() {
    this.column = new DynamicTable();
    this.shareService.currentColumn.subscribe( res => {
      this.renderTable(res);

    });
  }

  applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    renderTable(columns: DynamicTable[]) {
      this.columns = columns;
      this.dataSource = new MatTableDataSource<DynamicTable>(columns);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selection = new SelectionModel<DynamicTable>(true, []);
      this.dataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
        if (!sortData[sortHeaderId]) {
          return this.sort.direction === 'asc' ? '3' : '1';
        }
        // tslint:disable-next-line:max-line-length
        return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
      };
    }
    update(col: DynamicTable) {
  
      //this.countryForm = new ProductDynamicColumn;
  
      //this.countryForm.selected = true;
    }
  }


