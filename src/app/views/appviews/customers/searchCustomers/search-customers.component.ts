import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort, MatDialogRef } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Customer } from '../../../../entities/customer/customer';

export interface DialogData {
  selectedCustomer: any
}

@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.css']
})
export class SearchCustomersComponent implements OnInit {
  selectedCustomer: any;

  constructor(private dialogRef: MatDialogRef<SearchCustomersComponent>,
    @Inject(MAT_DIALOG_DATA) data) { }

  customerSearchForm: any;
  customersTableColumns = ['ID', 'CustomerName', 'CustomerType', 'GlId'];
  customersDataSource: MatTableDataSource<any>;

  selection: SelectionModel<any>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('table', { read: MatSort }) sort: MatSort;
  submit: boolean;

  ngOnInit() {
    this.customerSearchForm = {}
    this.selection = new SelectionModel<any>(true, []);
    this.submit = false;
    this.selectedCustomer =new Customer()
  }

  isAllSelected() {
    return this.selection.selected.length === this.customersDataSource.data.length;
  }
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.customersDataSource.data.forEach(row => this.selection.select(row));
  }

  searchCustomer(form) {
    if (form.invalid) {
      return;
    }
    this.customerSearchForm = Object.assign({}, form.value);
  }


  selectCustomer(Customer: any) {
    this.selectedCustomer = Customer;
  }

  save() {
    this.dialogRef.close(this.selectedCustomer);
  }
}
