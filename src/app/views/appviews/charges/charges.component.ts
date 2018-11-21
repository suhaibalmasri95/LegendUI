import { Discount, Fee, Cover } from './../../../entities/Setup/Charges';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { LockUp } from '../../../entities/organization/LockUp';
import { DiscountService } from '../../../_services/_setup/Discount.service';
import { CoversService } from '../../../_services/_setup//Covers.service';
import { FeesService } from '../../../_services/_setup/Fees.service';

@Component({
  selector: 'app-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.css']
})
export class ChargesComponent implements OnInit {


  extraForm: string;
  snackPosition: MatSnackBarHorizontalPosition;

  coverForm: Cover;
  covers: Cover[];

  feeForm: Fee;
  fees: Fee[];

  discountForm: Discount;
  discounts: Discount[];

  LockUps: LockUp[];
  AddUpdateUrl: string;
  submit: boolean;
  submit2: boolean;
  submit3: boolean;

  coverTableColumns = ['select', 'ID', 'MAJOR_CODE', 'NAME', 'NAME2', 'ST_LOCKUP_ID', 'actions'];
  coversDataSource: MatTableDataSource<Cover>;

  feeTableColumns = ['select', 'ID', 'MAJOR_CODE', 'MINOR_CODE', 'NAME', 'NAME2', 'ST_LOCKUP_ID', 'actions'];
  feesDataSource: MatTableDataSource<Fee>;

  discountTableColumns = ['select', 'CODE', 'NAME', 'NAME2', 'actions'];
  discountDataSource: MatTableDataSource<Discount>;

  selection: SelectionModel<Cover>;
  selection2: SelectionModel<Fee>;
  selection3: SelectionModel<Discount>;


  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator2') paginator3: MatPaginator;

  @ViewChild('table', { read: MatSort }) sort: MatSort;
  @ViewChild('table2', { read: MatSort }) sort2: MatSort;
  @ViewChild('table3', { read: MatSort }) sort3: MatSort;

  parentFees: LockUp[];
  feeFilter: number;
  parentFeeFilter: number;
  filterParentFees: LockUp[];

  constructor(public snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute,
    private discountService: DiscountService, private coversService: CoversService, private feesService: FeesService) { }
  ngOnInit() {
    this.extraForm = '';
    this.snackPosition = 'right';

    this.selection = new SelectionModel<Cover>(true, []);
    this.selection2 = new SelectionModel<Fee>(true, []);
    this.selection3 = new SelectionModel<Discount>(true, []);


    this.coverForm = new Cover();
    this.feeForm = new Fee();
    this.discountForm = new Discount();

    this.submit = false;
    this.submit2 = false;
    this.submit3 = false;

    this.route.data.subscribe(data => {
      this.LockUps = data.lockUp;
      this.renderCoverTable(data.cover);
      this.renderDiscountsTable(data.discounts);
    });
    this.parentFees = null;
    this.filterParentFees = null;

  }


  applyFilter(filterValue: string) {
    switch (this.extraForm) {
      case '':
        this.coversDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'fees':
        this.feesDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'discounts':
        this.discountDataSource.filter = filterValue.trim().toLowerCase();
        break;

    }
  }


  changeTab($event) {
    setTimeout(() => {
      switch ($event.index) {
        case 0:
          this.extraForm = '';
          this.renderCoverTable(this.covers);
          break;
        case 1:
          this.extraForm = 'fees';
          this.reloadFeeTable();
          break;
        case 2:
          this.extraForm = 'discounts';
          this.reloadDiscountsTable();
          break;
      }
    });
  }

  renderCoverTable(data) {
    this.covers = data;
    this.coversDataSource = new MatTableDataSource<Cover>(data);
    this.coversDataSource.paginator = this.paginator;
    this.coversDataSource.sort = this.sort;
    this.selection = new SelectionModel<Cover>(true, []);
    this.coversDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  renderFeeTable(data) {
    this.fees = data;
    this.feesDataSource = new MatTableDataSource<Fee>(data);
    this.feesDataSource.paginator = this.paginator2;
    this.feesDataSource.sort = this.sort2;
    this.selection2 = new SelectionModel<Fee>(true, []);

    this.feesDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort2.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  renderDiscountsTable(data) {
    this.discounts = data;
    this.discountDataSource = new MatTableDataSource<Discount>(data);
    this.discountDataSource.paginator = this.paginator3;
    this.discountDataSource.sort = this.sort3;
    this.selection3 = new SelectionModel<Discount>(true, []);

    this.discountDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort3.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  reloadCoverTable() {
    this.coversService.load().subscribe(data => {
      this.renderCoverTable(data);
    });
  }

  reloadFeeTable() {
    this.feesService.load().subscribe(data => {
      this.renderFeeTable(data);

    });
  }

  reloadDiscountsTable() {
    this.discountService.load().subscribe(data => {
      this.renderDiscountsTable(data);
    });
  }


  // add update delete Cover

  saveCover(form) {
    if (form.invalid) {
      return;
    }
    this.coverForm = this.coverForm.selected ? this.coverForm : Object.assign({}, form.value);
    this.coverForm.CreatedBy = 'Admin';
    // this.coverForm.LockUpType = 2;

    if (this.coverForm.selected) {
      this.AddUpdateUrl = this.coversService.ApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.coversService.ApiUrl + '/Create';
    }

    this.http.post(this.AddUpdateUrl, this.coverForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCoverTable();
      this.coverForm = new Cover();
      this.submit = false;
      form.resetForm();
    });

  }

  deleteCover(id) {
    this.http.post(this.coversService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCoverTable();
    });
  }

  updateCover(cover: Cover) {
    window.scroll(0, 0);
    this.coverForm = new Cover;
    this.coverForm = cover;
    this.coverForm.selected = true;
  }


  // add update delete Fee

  saveFee(form) {

    if (form.invalid) { return; }
    this.feeForm = this.feeForm.selected ? this.feeForm : Object.assign({}, form.value);
    this.feeForm.CreatedBy = 'Admin';
    // this.feeForm.LockUpType = 2;
    if (this.feeForm.selected) {
      this.AddUpdateUrl = this.feesService.ApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.feesService.ApiUrl + 'Create';
    }
    this.http.post(this.AddUpdateUrl, this.feeForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadFeeTable();
      this.feeForm = new Fee;
      this.submit2 = false;
      form.resetForm();
    });

  }

  deleteFee(id) {
    this.http.post(this.feesService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadFeeTable();
    });
  }

  updateFee(fee: Fee) {
    window.scroll(0, 0);
    this.feeForm = new Fee;
    this.feeForm = fee;
    this.feeForm.selected = true;
  }


  // add update delete Discount

  saveDiscount(form) {
    if (form.invalid) { return; }
    this.discountForm = this.discountForm.selected ? this.discountForm : Object.assign({}, form.value);
    if (this.discountForm.selected) {
      this.AddUpdateUrl = this.discountService.ApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.discountService.ApiUrl + 'Create';
    }
    this.http.post(this.AddUpdateUrl, this.discountForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadDiscountsTable();
      this.discountForm = new Discount;
      this.submit3 = false;
      form.resetForm();
    });

  }

  deleteDiscount(id) {
    this.http.post(this.discountService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadDiscountsTable();
    });

  }

  updateDiscount(discount: Discount) {
    window.scroll(0, 0);
    this.discountForm = new Discount;
    this.discountForm = discount;
    this.discountForm.selected = true;
  }


  loadFees() {
    this.feesService.load().subscribe(data => {
      this.fees = data;
      this.feesDataSource = new MatTableDataSource<Fee>(this.fees);
    });
  }



  export(type, data) {
    switch (type) {
      case 'pdf':
        // this.coreService.ExportToPdf(data, data);
        break;
      case 'csv':
        // this.coreService.ExportToCsv(data, data);
        break;
      case 'excel':
        // this.coreService.ExportToExcel(data, data);
        break;
    }
  }

  getFeeName(id: number) {
    if (this.fees) {
      for (let index = 0; index < this.fees.length; index++) {
        if (this.fees[index].ID === id) {
          return this.fees[index].Name;
        }
      }
    }
  }


  getCoverName(id: number) {
    for (let index = 0; index < this.covers.length; index++) {
      if (this.covers[index].ID === id) {
        return this.covers[index].Name;
      }
    }
  }


  isAllSelected() {
    return this.selection.selected.length === this.coversDataSource.data.length;
  }
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.coversDataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected2() {
    return this.selection2.selected.length === this.feesDataSource.data.length;
  }
  masterToggle2() {
    this.isAllSelected2() ? this.selection2.clear() : this.feesDataSource.data.forEach(row => this.selection2.select(row));
  }

  isAllSelected3() {
    return this.selection3.selected.length === this.discountDataSource.data.length;
  }
  masterToggle3() {
    this.isAllSelected3() ? this.selection3.clear() : this.discountDataSource.data.forEach(row => this.selection3.select(row));
  }

  resetForm(form) {
    form.reset();
  }







  deleteSelectedData() {

    const selectedData = [];
    switch (this.extraForm) {
      case '':
        for (let index = 0; index < this.selection.selected.length; index++) {
          selectedData.push(this.selection.selected[index].ID);
        }
        this.http.post(this.coversService.ApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadCoverTable();
        });
        break;
      case 'fees':
        for (let index = 0; index < this.selection2.selected.length; index++) {
          selectedData.push(this.selection2.selected[index].ID);
        }
        this.http.post(this.feesService.ApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadFeeTable();
        });
        break;
      case 'discounts':
        for (let index = 0; index < this.selection3.selected.length; index++) {
          selectedData.push(this.selection3.selected[index].Code);
        }
        this.http.post(this.discountService.ApiUrl + 'DeleteMultiple', { Codes: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadDiscountsTable();
        });
        break;
    }


  }

}
