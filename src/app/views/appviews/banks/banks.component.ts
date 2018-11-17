
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Bank } from '../../../entities/organization/Bank';
import { BankBranch } from '../../../entities/organization/BankBranch';
import { LockUp } from '../../../entities/organization/LockUp';
import { Currency } from '../../../entities/organization/Currency';
import { Country } from '../../../entities/organization/Country';
import { City } from '../../../entities/organization/City';
import { BanksService } from './../../../_services/_organization/Banks.service';
import { BankBranchService } from './../../../_services/_organization/BankBranch.service';
import { CityService } from './../../../_services/_organization/City.service';



@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.css']
})
export class BanksComponent implements OnInit {


  bankForm: Bank;

  banks: Bank[];

  branchForm: BankBranch;
  branchs: BankBranch[];

  LockUps: LockUp[];
  currencies: Currency[];

  countries: Country[];
  cities: City[];

  submit: boolean;
  submit2: boolean;
  AddUpdateUrl: string;
  bankTableColumns = ['select', 'ID', 'CODE', 'NAME', 'NAME2', 'PHONE_CODE', 'PHONE', 'actions'];
  banksDataSource: MatTableDataSource<Bank>;

  branchTableColumns = ['select', 'ID', 'NAME', 'NAME2', 'BANK', 'actions'];
  branchsDataSource: MatTableDataSource<BankBranch>;

  selection: SelectionModel<Bank>;
  selection2: SelectionModel<BankBranch>;

  extraForm: string;

  snackPosition: MatSnackBarHorizontalPosition;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('table2', { read: MatSort }) sort2: MatSort;

  constructor(public snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute,
    private bankService: BanksService , private bankBranchService: BankBranchService, private cityService: CityService) { }

  ngOnInit() {
    this.extraForm = '';
    const initialSelection = [];

    this.selection = new SelectionModel<Bank>(true, initialSelection);
    this.selection2 = new SelectionModel<BankBranch>(true, initialSelection);

    this.snackPosition = 'right';

    this.bankForm = new Bank();
    this.branchForm = new BankBranch();

    this.submit = false;
    this.submit2 = false;
    this.route.data.subscribe(data => {
      this.LockUps = data.lockUp;
      this.currencies = data.currencies;
      this.countries = data.country;
      this.renderBankTable(data.banks);
    });


  }


  applyFilter(filterValue: string) {
    switch (this.extraForm) {
      case '':
        this.banksDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'branchs':
        this.branchsDataSource.filter = filterValue.trim().toLowerCase();
        break;
    }
  }


  changeTab($event) {
    setTimeout(() => {
      switch ($event.index) {
        case 0:
          this.extraForm = '';
          this.banksDataSource.paginator = this.banksDataSource.paginator ? this.banksDataSource.paginator : this.paginator;
          break;
        case 1:
          this.extraForm = 'branchs';
          this.reloadBranchTable(this.bankForm.ID ? this.bankForm.ID : null);
          break;
      }
    });
  }

  renderBankTable(data) {
    this.banks = data;
    this.banksDataSource = new MatTableDataSource<Bank>(data);
    this.banksDataSource.paginator = this.paginator;
    this.banksDataSource.sort = this.sort;
    this.selection = new SelectionModel<Bank>(true, []);
    this.banksDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  renderBranchTable(data) {
    this.branchs = data;
    this.branchsDataSource = new MatTableDataSource<BankBranch>(data);
    this.branchsDataSource.paginator = this.paginator2;
    this.branchsDataSource.sort = this.sort2;
    this.selection2 = new SelectionModel<BankBranch>(true, []);
    this.branchsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort2.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  reloadBankTable() {

    this.bankService.loadBanks().subscribe(data => {
      this.renderBankTable(data);
    });
  }

  reloadBranchTable(bankId = null) {
    this.bankBranchService.loadBranches(bankId, null, 1).subscribe(data => {
      this.renderBranchTable(data);
    });
  }


  loadCities() {
    this.cityService.loadCities(this.branchForm.CountryID ? this.branchForm.CountryID : null, null, 1).subscribe(data => {
      this.cities = data;
    });
  }

  // add update delete Bank

  saveBank(form) {
    if (form.invalid) {
      return;
    }
    this.bankForm = this.bankForm.selected ? this.bankForm : Object.assign({}, form.value);
    if (this.bankForm.selected) {
      this.AddUpdateUrl = this.bankService.BankApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.bankService.BankApiUrl + 'Create';
    }
    this.http.post(this.AddUpdateUrl, this.bankForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadBankTable();
      this.bankForm = new Bank();
      this.submit = false;
      form.resetForm();
    });

  }

  deleteBank(id) {

    this.http.post(this.bankService.BankApiUrl + 'Delete' ,   {ID: id} ).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadBankTable();
    });
   /* this.http.request('DELETE', this.coreService.DeleteUrl + '/DeleteBank?bankID=' + id).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadBankTable();
    });*/
  }

  updateBank(bank: Bank) {
    window.scroll(0, 0);
    this.bankForm = new Bank;
    this.bankForm.ID = bank.ID;
    this.bankForm.Name = bank.Name;
    this.bankForm.Name2 = bank.Name2;
    this.bankForm.CurrencyCode = bank.CurrencyCode;
    this.bankForm.PhoneCode = bank.PhoneCode;
    this.bankForm.Phone = bank.Phone;
    this.bankForm.selected = true;
  }


  // add update delete city

  saveBranch(form) {
    if (form.invalid) { return; }
    this.branchForm = this.branchForm.selected ? this.branchForm : Object.assign({}, form.value);

    if (this.branchForm.selected) {
      this.AddUpdateUrl = this.bankBranchService.BankBranchApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.bankBranchService.BankBranchApiUrl + 'Create';
    }
    this.http.post(this.AddUpdateUrl, this.branchForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadBranchTable(this.bankForm.ID ? this.bankForm.ID : null);
      this.branchForm = new BankBranch;
      this.submit2 = false;
      form.resetForm();
    });

  }

  deleteBranch(id) {
    this.http.post(this.bankBranchService.BankBranchApiUrl + 'Delete' ,   {ID: id} ).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadBranchTable(this.bankForm.ID ? this.bankForm.ID : null);
    });
    /*this.http.request('DELETE', this.coreService.DeleteUrl + '/DeleteBankBranch?bankBranchesID=' + id).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadBranchTable(this.bankForm.ID ? this.bankForm.ID : null);
    });*/
  }

  updateBranch(bankcBranches: BankBranch) {
    window.scroll(0, 1000);
    this.branchForm = new BankBranch;
    this.branchForm.ID = bankcBranches.ID;
    this.branchForm.Name = bankcBranches.Name;
    this.branchForm.Name2 = bankcBranches.Name2;
    this.branchForm.CountryID = bankcBranches.CountryID;
    this.branchForm.CityID = bankcBranches.CityID;
    this.branchForm.BankID = bankcBranches.BankID;
    this.branchForm.CurrencyCode = bankcBranches.CurrencyCode;
    this.branchForm.Phone = bankcBranches.Phone;
    this.branchForm.PhoneCode = bankcBranches.PhoneCode;
    this.branchForm.selected = true;
  }


  loadBranchs() {
    this.bankBranchService.loadBranches(this.bankForm.ID ? this.bankForm.ID : null, null, 1).subscribe(data => {
      this.branchs = data;
      this.branchsDataSource = new MatTableDataSource<BankBranch>(this.branchs);
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

  getBranchName(id: number) {
    if (this.branchs) {
      for (let index = 0; index < this.branchs.length; index++) {
        if (this.branchs[index].ID === id) {
          return this.branchs[index].Name;
        }
      }
    }
  }


  getBankName(id: number) {
    for (let index = 0; index < this.banks.length; index++) {
      if (this.banks[index].ID === id) {
        return this.banks[index].Name;
      }
    }
  }


  isAllSelected() {
    return this.selection.selected.length === this.banksDataSource.data.length;
  }
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.banksDataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected2() {
    return this.selection2.selected.length === this.branchsDataSource.data.length;
  }
  masterToggle2() {
    this.isAllSelected2() ? this.selection2.clear() : this.branchsDataSource.data.forEach(row => this.selection2.select(row));
  }

  resetForm(form) {
    form.reset();
  }


  deleteSelectedData() {

    // tslint:disable-next-line:prefer-const
    let selectedData = [];
    switch (this.extraForm) {
      case '':
        for (let index = 0; index < this.selection.selected.length; index++) {
          selectedData.push(this.selection.selected[index].ID);
        }
        this.http.post(this.bankService.BankApiUrl + 'DeleteMultiple' ,   {IDs: selectedData} ).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadBankTable();
        });
        break;
      case 'branchs':
        for (let index = 0; index < this.selection2.selected.length; index++) {
          selectedData.push(this.selection2.selected[index].ID);
        }

        this.http.post(this.bankBranchService.BankBranchApiUrl + 'DeleteMultiple' ,   {IDs: selectedData} ).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadBranchTable();
        });
        break;

    }

  }

}
