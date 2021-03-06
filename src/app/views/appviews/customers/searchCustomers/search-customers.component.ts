import { SearchService } from './../../../../_services/search.service';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort, MatDialogRef } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Customer } from '../../../../entities/customer/customer';
import { CustomerService } from '../../../../_services/_customer/customer.service';


export interface DialogData {
  selectedCustomer: any;
}

@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.css']
})
export class SearchCustomersComponent implements OnInit {
  selectedCustomer: any;
  noData: boolean=true;

  constructor(private dialogRef: MatDialogRef<SearchCustomersComponent>,
    @Inject(MAT_DIALOG_DATA) data, private customerService: CustomerService , private searchSearvice: SearchService) { }

  customerSearchForm: Customer;
  customersTableColumns = ['ID', 'Name', 'Name2', 'CommercialName', 'Mobile', 'Phone', 'Email'];
  customersDataSource: MatTableDataSource<any>;

  selection: SelectionModel<any>;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('table', { read: MatSort }) sort: MatSort;
  submit: boolean;

  ngOnInit() {
    this.customerSearchForm = new Customer();
    this.selection = new SelectionModel<any>(true, []);
    this.submit = false;
    this.selectedCustomer = new Customer();

    //this.loadCustomers();


  }


  loadCustomers() {
    this.customerService.load(null, null, null, null, null, null, null, null, 1).subscribe(data => {
      this.renderCustomerTypesTable(data);
    });
  }
  renderCustomerTypesTable(data) {
    if (data.length) {
      this.noData = false;
      this.customersDataSource = new MatTableDataSource<Customer>(data);
      this.customersDataSource.paginator = this.paginator;
      this.customersDataSource.sort = this.sort;
      this.selection = new SelectionModel<Customer>(true, []);
      this.customersDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
        if (!sortData[sortHeaderId]) {
          return this.sort.direction === 'asc' ? '3' : '1';
        }
        // tslint:disable-next-line:max-line-length
        return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();

      };
    } else
      this.noData = true;
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

    this.searchSearvice.search(this.customerSearchForm.ID, this.customerSearchForm.Name,
     null, this.customerSearchForm.CustomerNo,  this.customerSearchForm.Email, this.customerSearchForm.Mobile,
      this.customerSearchForm.ReferenceNo,  this.customerSearchForm.IndOrComp,  1,
      this.customerSearchForm.CommName).subscribe(data => {
        this.renderCustomerTypesTable(data);
      });
  }


  selectCustomer(customer: any) {
    this.selectedCustomer = customer;
  }

  save() {
    this.dialogRef.close(this.selectedCustomer);
  }

  resetForm(form) {
    this.customerSearchForm = new Customer();
    this.submit = false;
    form.reset();
    this.noData = true;
  }

}
