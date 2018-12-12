import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Currency } from '../../../entities/organization/Currency';
import { LockUp } from '../../../entities/organization/LockUp';
import { LockUpService } from './../../../_services/_organization/LockUp.service';
import { CurrencyService } from './../../../_services/_organization/Currency.service';

@Component({
  selector: 'app-lockup-and-currency',
  templateUrl: './lockupAndCurrency.component.html',
  styleUrls: ['./lockupAndCurrency.component.css']
})
export class LockupAndCurrencyComponent implements OnInit {


  extraForm: string;
  snackPosition: MatSnackBarHorizontalPosition;

  majorCodeForm: LockUp;
  majorCodes: LockUp[];

  minorCodeForm: LockUp;
  minorCodes: LockUp[];

  currencyForm: Currency;
  currencies: Currency[];

  LockUps: LockUp[];
  AddUpdateUrl: string;
  submit: boolean;
  submit2: boolean;
  submit3: boolean;

  majorCodeTableColumns = ['select', 'ID', 'MAJOR_CODE', 'NAME', 'NAME2', 'ST_LOCKUP_ID', 'actions'];
  majorCodesDataSource: MatTableDataSource<LockUp>;

  minorCodeTableColumns = ['select', 'ID', 'MAJOR_CODE', 'MINOR_CODE', 'NAME', 'NAME2', 'ST_LOCKUP_ID', 'actions'];
  minorCodesDataSource: MatTableDataSource<LockUp>;

  currencyTableColumns = ['select', 'CODE', 'NAME', 'NAME2', 'actions'];
  currencyDataSource: MatTableDataSource<Currency>;

  selection: SelectionModel<LockUp>;
  selection2: SelectionModel<LockUp>;
  selection3: SelectionModel<Currency>;


  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator2') paginator3: MatPaginator;

  @ViewChild('table', { read: MatSort }) sort: MatSort;
  @ViewChild('table2', { read: MatSort }) sort2: MatSort;
  @ViewChild('table3', { read: MatSort }) sort3: MatSort;

  parentMinorCodes: LockUp[];
  minorCodeFilter: number;
  parentMinorCodeFilter: number;
  filterParentMinorCodes: LockUp[];

  constructor(public snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute,
    private lockUpService: LockUpService, private currencyService: CurrencyService) { }
  ngOnInit() {
    this.extraForm = '';
    this.snackPosition = 'right';

    this.selection = new SelectionModel<LockUp>(true, []);
    this.selection2 = new SelectionModel<LockUp>(true, []);
    this.selection3 = new SelectionModel<Currency>(true, []);


    this.majorCodeForm = new LockUp();
    this.minorCodeForm = new LockUp();
    this.currencyForm = new Currency();

    this.submit = false;
    this.submit2 = false;
    this.submit3 = false;

    this.route.data.subscribe(data => {
      this.LockUps = data.lockUp;
      this.renderMajorCodeTable(data.majorCode);
      this.renderCurrenciesTable(data.currencies);
    });
    this.parentMinorCodes = null;
    this.filterParentMinorCodes = null;

  }


  applyFilter(filterValue: string) {
    switch (this.extraForm) {
      case '':
        this.majorCodesDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'minorCodes':
        this.minorCodesDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'currencies':
        this.currencyDataSource.filter = filterValue.trim().toLowerCase();
        break;

    }
  }


  changeTab($event) {
    setTimeout(() => {
      switch ($event.index) {
        case 0:
          this.extraForm = '';
          this.renderMajorCodeTable(this.majorCodes);
          break;
        case 1:
          this.extraForm = 'minorCodes';
          this.reloadMinorCodeTable(this.majorCodeForm.ID ? this.majorCodeForm.ID : null);
          if (this.majorCodeForm.LockUpID) {
            this.loadParentMinorCodes(this.majorCodeForm.LockUpID);
          }
          this.minorCodeFilter = this.majorCodeForm.ID ? this.majorCodeForm.ID : null;
          this.minorCodeForm.MajorCode = this.majorCodeForm.ID ? this.majorCodeForm.ID : null;
          break;
        case 2:
          this.extraForm = 'currencies';
          this.renderCurrenciesTable(this.currencies);
          break;
      }
    });
  }

  renderMajorCodeTable(data) {
    this.majorCodes = data;
    this.majorCodesDataSource = new MatTableDataSource<LockUp>(data);
    this.majorCodesDataSource.paginator = this.paginator;
    this.majorCodesDataSource.sort = this.sort;
    this.selection = new SelectionModel<LockUp>(true, []);
    this.majorCodesDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  renderMinorCodeTable(data) {
    this.minorCodes = data;
    this.minorCodesDataSource = new MatTableDataSource<LockUp>(data);
    this.minorCodesDataSource.paginator = this.paginator2;
    this.minorCodesDataSource.sort = this.sort2;
    this.selection2 = new SelectionModel<LockUp>(true, []);

    this.minorCodesDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort2.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  renderCurrenciesTable(data) {
    this.currencies = data;
    this.currencyDataSource = new MatTableDataSource<Currency>(data);
    this.currencyDataSource.paginator = this.paginator3;
    this.currencyDataSource.sort = this.sort3;
    this.selection3 = new SelectionModel<Currency>(true, []);

    this.currencyDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort3.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  reloadMajorCodeTable() {
    this.lockUpService.LoadLockUpsByMinorCode(0).subscribe(data => {
      this.renderMajorCodeTable(data);
    });
  }

  reloadMinorCodeTable(majorCodeId = null) {
    this.lockUpService.loadMinorCodes(majorCodeId).subscribe(data => {
      this.renderMinorCodeTable(data);

    });
  }

  reloadCurrenciesTable() {
    this.currencyService.loadCurrencies().subscribe(data => {
      this.renderCurrenciesTable(data);
    });
  }


  // add update delete MajorCode

  saveMajorCode(form) {
    if (form.invalid) {
      return;
    }
    this.majorCodeForm = this.majorCodeForm.selected ? this.majorCodeForm : Object.assign({}, form.value);
    this.majorCodeForm.CreatedBy = 'Admin';
    this.majorCodeForm.MinorCode = 0;
    this.majorCodeForm.LockUpType = 2;

    if (this.majorCodeForm.selected) {
      this.AddUpdateUrl = this.lockUpService.lockUpApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.lockUpService.lockUpApiUrl + '/Create';
    }

    this.http.post(this.AddUpdateUrl, this.majorCodeForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadMajorCodeTable();
      this.majorCodeForm = new LockUp();
      this.submit = false;
      form.resetForm();
    });

  }

  deleteMajorCode(id) {
    this.http.post(this.lockUpService.lockUpApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadMajorCodeTable();
    });
    /* this.http.request('DELETE', this.coreService.DeleteUrl + '/DeleteLockUp?lockupID=' + id).subscribe(res => {
       this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
       this.reloadMajorCodeTable();
     });*/
  }

  updateMajorCode(majorCode: LockUp) {
    window.scroll(0, 0);
    this.majorCodeForm = new LockUp;
    this.majorCodeForm = majorCode;
    // this.majorCodeForm.NAME = majorCode.NAME;
    // this.majorCodeForm.NAME2 = majorCode.NAME2;
    // this.majorCodeForm.REF_NO = majorCode.REF_NO;
    // this.majorCodeForm.MODIFIED_BY = majorCode.MODIFIED_BY;
    // this.majorCodeForm.MODIFICATION_DATE = majorCode.MODIFICATION_DATE;
    // this.majorCodeForm.MINOR_CODE = majorCode.MINOR_CODE;
    // this.majorCodeForm.MAJOR_CODE = majorCode.MAJOR_CODE;
    // this.majorCodeForm.LOCKUP_TYPE = majorCode.LOCKUP_TYPE;
    // this.majorCodeForm.ST_LOCKUP_ID = majorCode.ST_LOCKUP_ID;
    // this.majorCodeForm.CREATED_BY = majorCode.CREATED_BY;
    // this.majorCodeForm.CREATION_DATE = majorCode.CREATION_DATE;
    // this.minorCodeForm.MAJOR_CODE = majorCode.ID;

    this.majorCodeForm.selected = true;
  }


  // add update delete MinorCode

  saveMinorCode(form) {

    if (form.invalid) { return; }
    this.minorCodeForm = this.minorCodeForm.selected ? this.minorCodeForm : Object.assign({}, form.value);
    this.minorCodeForm.CreatedBy = 'Admin';
    this.minorCodeForm.LockUpType = 2;
    if (this.minorCodeForm.selected) {
      this.AddUpdateUrl = this.lockUpService.lockUpApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.lockUpService.lockUpApiUrl + 'Create';
    }
    this.http.post(this.AddUpdateUrl, this.minorCodeForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadMinorCodeTable(this.majorCodeForm.ID ? this.majorCodeForm.ID : null);
      this.minorCodeForm = new LockUp;
      this.submit2 = false;
      form.resetForm();
    });

  }

  deleteMinorCode(id) {
    this.http.post(this.lockUpService.lockUpApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadMinorCodeTable(this.majorCodeForm.ID ? this.majorCodeForm.ID : null);
    });
    /* this.http.request('DELETE', this.coreService.DeleteUrl + '/DeleteLockUp?lockupID=' + id).subscribe(res => {
       this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
       this.reloadMinorCodeTable(this.majorCodeForm.ID ? this.majorCodeForm.ID : null);
     });*/
  }

  updateMinorCode(minorCode: LockUp) {
    window.scroll(0, 0);

    this.minorCodeForm = new LockUp;
    this.minorCodeForm.ID = minorCode.ID;
    this.minorCodeForm.Name = minorCode.Name;
    this.minorCodeForm.Name2 = minorCode.Name2;
    this.minorCodeForm.ReferenceNo = minorCode.ReferenceNo;
    this.minorCodeForm.ModifiedBy = minorCode.ModifiedBy;
    this.minorCodeForm.ModificationDate = minorCode.ModificationDate;
    this.minorCodeForm.MinorCode = minorCode.MinorCode;
    this.minorCodeForm.MajorCode = minorCode.MajorCode;
    this.minorCodeForm.LockUpType = minorCode.LockUpType;
    this.minorCodeForm.LockUpID = minorCode.LockUpID;
    this.minorCodeForm.CreatedBy = minorCode.CreatedBy;
    this.minorCodeForm.CreationDate = minorCode.CreationDate;
    this.minorCodeForm.selected = true;
  }


  // add update delete Currency

  saveCurrency(form) {
    if (form.invalid) { return; }
    this.currencyForm = this.currencyForm.selected ? this.currencyForm : Object.assign({}, form.value);
    if (this.currencyForm.selected) {
      this.AddUpdateUrl = this.currencyService.currencyApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.currencyService.currencyApiUrl + 'Create';
    }
    this.http.post(this.AddUpdateUrl, this.currencyForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCurrenciesTable();
      this.currencyForm = new Currency;
      this.submit3 = false;
      form.resetForm();
    });

  }

  deleteCurrency(id) {
    this.http.post(this.currencyService.currencyApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCurrenciesTable();
    });

  }

  updateCurrency(currency: Currency) {
    window.scroll(0, 0);
    this.currencyForm = new Currency;
    this.currencyForm = currency;
    this.currencyForm.selected = true;
  }


  loadMinorCodes() {
    this.lockUpService.loadMinorCodes(this.majorCodeForm.ID ? this.majorCodeForm.ID : null).subscribe(data => {
      this.minorCodes = data;
      this.minorCodesDataSource = new MatTableDataSource<LockUp>(this.minorCodes);
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

  getMinorCodeName(id: number) {
    if (this.minorCodes) {
      for (let index = 0; index < this.minorCodes.length; index++) {
        if (this.minorCodes[index].ID === id) {
          return this.minorCodes[index].Name;
        }
      }
    }
  }


  getMajorCodeName(id: number) {
    for (let index = 0; index < this.majorCodes.length; index++) {
      if (this.majorCodes[index].ID === id) {
        return this.majorCodes[index].Name;
      }
    }
  }


  isAllSelected() {
    return this.selection.selected.length === this.majorCodesDataSource.data.length;
  }
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.majorCodesDataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected2() {
    return this.selection2.selected.length === this.minorCodesDataSource.data.length;
  }
  masterToggle2() {
    this.isAllSelected2() ? this.selection2.clear() : this.minorCodesDataSource.data.forEach(row => this.selection2.select(row));
  }

  isAllSelected3() {
    return this.selection3.selected.length === this.currencyDataSource.data.length;
  }
  masterToggle3() {
    this.isAllSelected3() ? this.selection3.clear() : this.currencyDataSource.data.forEach(row => this.selection3.select(row));
  }

  resetForm(form) {
    this.minorCodeForm.MajorCode = null;
    this.majorCodeForm = new LockUp();
    this.submit = false;
    form.reset();
  }



  updateMajorCodeFromMinor(id) {
    for (let index = 0; index < this.majorCodes.length; index++) {
      if (this.majorCodes[index].ID === id) {
        if (this.majorCodes[index].LockUpID) {
          this.loadParentMinorCodes(this.majorCodes[index].LockUpID);
        } else {
          this.minorCodeForm.LockUpID = null;
        }
        this.parentMinorCodes = null;
        break;
      }
    }
  }


  loadParentMinorCodes(parent) {
    this.lockUpService.LoadLockUpsByMajorCode(parent).subscribe(data => {
      this.parentMinorCodes = data;
    });
  }


  checkFilterMajorCodeParent(id) {
    for (let index = 0; index < this.majorCodes.length; index++) {
      if (this.majorCodes[index].ID === id) {
        if (this.majorCodes[index].LockUpID) {
          this.loadFilterParentMinorCodes(this.majorCodes[index].LockUpID);
        } else {
          this.minorCodeFilter = null;
        }
        this.filterParentMinorCodes = null;
        break;
      }
    }
  }

  loadFilterParentMinorCodes(parent) {
    this.lockUpService.LoadLockUpsByMajorCode(parent).subscribe(data => {
      this.filterParentMinorCodes = data;
    });
  }


  filterMinorCodeTableByParentMinorCode(parent) {
    if (parent) {
      this.lockUpService.LoadLockUpsByParentID(parent).subscribe(data => {
        this.renderMinorCodeTable(data);
      });
    } else {
      this.reloadMinorCodeTable(this.minorCodeFilter);
      this.checkFilterMajorCodeParent(this.minorCodeFilter);
    }
  }


  deleteSelectedData() {

    const selectedData = [];
    switch (this.extraForm) {
      case '':
        for (let index = 0; index < this.selection.selected.length; index++) {
          selectedData.push(this.selection.selected[index].ID);
        }
        this.http.post(this.lockUpService.lockUpApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadMajorCodeTable();
        });
        break;
      case 'minorCodes':
        for (let index = 0; index < this.selection2.selected.length; index++) {
          selectedData.push(this.selection2.selected[index].ID);
        }
        this.http.post(this.lockUpService.lockUpApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadMinorCodeTable();
        });
        break;
      case 'currencies':
        for (let index = 0; index < this.selection3.selected.length; index++) {
          selectedData.push(this.selection3.selected[index].Code);
        }
        this.http.post(this.currencyService.currencyApiUrl + 'DeleteMultiple', { Codes: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadCurrenciesTable();
        });
        break;
    }


  }

}
