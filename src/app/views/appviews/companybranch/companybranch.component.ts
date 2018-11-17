
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSnackBarHorizontalPosition, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Country } from '../../../entities/organization/Country';
import { Company } from '../../../entities/organization/Company';
import { CompanyBranch } from '../../../entities/organization/CompanyBranch';
import { City } from '../../../entities/organization/City';
import { Department } from '../../../entities/organization/Department';
import { Currency } from '../../../entities/organization/Currency';
import { CompanyService } from './../../../_services/_organization/Company.service';
import { CityService } from './../../../_services/_organization/City.service';
import { CountryService } from './../../../_services/_organization/Country.service';
import { CommonService } from './../../../_services/Common.service';
import { CompanyBranchService } from './../../../_services/_organization/CompanyBranch.service';
import { DepartmentService } from './../../../_services/_organization/Department.service';


@Component({
  selector: 'app-companybranch',
  templateUrl: './companybranch.component.html',
  styleUrls: ['./companybranch.component.css']
})
export class CompanybranchComponent implements OnInit {


  companyForm: Company;
  countries: Country[];
  companies: Company[];
  companyBranchForm: CompanyBranch;
  companyBranches: CompanyBranch[];
  cities: City[];
  departmentFrom: Department;
  currencies: Currency[];
  submit: boolean;
  submit2: boolean;
  submit3: boolean;
  // tslint:disable-next-line:max-line-length
  companyTableColumns = ['select', 'ID', 'NAME', 'NAME2', 'ST_CNT_ID', 'ST_CUR_CODE', 'PHONE_CODE', 'PHONE', 'MOBILE', 'EMAIL', 'actions'];
  companiesDataSource: MatTableDataSource<Company>;
  companyBranchTableColumns = ['select', 'ID', 'NAME', 'NAME2', 'ST_COM_ID' , 'ST_CNT_ID' , 'ST_CTY_ID', 'CODE' , 'PHONE' ,   'actions'];
  companyBranchesDataSource: MatTableDataSource<CompanyBranch>;
  departments: Department[];
  departmentTableColumns = ['select', 'ID', 'NAME', 'NAME2', 'ST_COM_ID', 'EMAIL', 'actions'];
  departmentDataSource: MatTableDataSource<Department>;
  AddUpdateUrl: string;
  selection: SelectionModel<Company>;
  selection2: SelectionModel<CompanyBranch>;
  selection3: SelectionModel<Department>;

  uploader: FileUploader;
  extraForm: string;

  snackPosition: MatSnackBarHorizontalPosition;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;

  @ViewChild('table', { read: MatSort }) sort: MatSort;
  @ViewChild('table2', { read: MatSort }) sort2: MatSort;
  @ViewChild('table3', { read: MatSort }) sort3: MatSort;

  constructor(public snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute,
     private companyService: CompanyService , private cityService: CityService , private countryService: CountryService ,
     private commonService: CommonService , private departmentService: DepartmentService ,
     private compnayBranchService: CompanyBranchService
     ) { }

  ngOnInit() {
    this.extraForm = '';
    this.snackPosition = 'right';

    this.selection = new SelectionModel<Company>(true, []);
    this.selection2 = new SelectionModel<CompanyBranch>(true, []);
    this.selection3 = new SelectionModel<Department>(true, []);

    this.companyForm = new Company();
    this.companyBranchForm = new CompanyBranch();
    this.departmentFrom = new Department();
    this.submit = false;
    this.submit2 = false;
    this.submit3 = false;
    this.uploader = new FileUploader({ url: this.commonService.uploadImageUrl});


    this.route.data.subscribe(data => {
      this.countries = data.country;
      this.companies = data.company;
      this.currencies = data.currencies;
      this.cities = data.city;
      this.companyBranches = data.branches;
      this.renderCompanyTable(data.company);
    });

  }



  applyFilter(filterValue: string) {
    switch (this.extraForm) {
      case '':
        this.companiesDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'CompanyBranch':
        this.companyBranchesDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'department':
        this.departmentDataSource.filter = filterValue.trim().toLowerCase();
        break;
    }
  }
  loadCities($event) {
    this.cityService.loadCities($event, null, 1).subscribe(data => {
      this.cities = data;
    });
  }

  showBranchAndDepartmentForm($event) {
    setTimeout(() => {
      switch ($event.index) {
        case 0:
          this.extraForm = '';
          this.companiesDataSource.paginator = this.companiesDataSource.paginator ? this.companiesDataSource.paginator : this.paginator;
          break;
        case 1:
          this.extraForm = 'CompanyBranch';
          this.reloadCompanyBranchTable(this.companyForm.ID ? this.companyForm.ID : null);
          this.companyBranchForm.CompanyID = this.companyForm.ID;
          break;
        case 2:
          this.extraForm = 'department';
          this.reloadDepartmentTable(this.companyForm.ID ? this.companyForm.ID : null);
          this.companyBranchForm.CompanyID = this.companyForm.ID;
          break;
      }
    });
  }

  renderCompanyTable(data) {
    this.companies = data;
    this.companiesDataSource = new MatTableDataSource<Company>(data);
    this.companiesDataSource.paginator = this.paginator;
    this.companiesDataSource.sort = this.sort;
    this.selection = new SelectionModel<Company>(true, []);
    this.companiesDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }

        // tslint:disable-next-line:max-line-length
        return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();

    };
  }

  renderCompanyBranchesTable(data) {
    this.companyBranches = data;
    this.companyBranchesDataSource = new MatTableDataSource<CompanyBranch>(data);
    this.companyBranchesDataSource.paginator = this.paginator2;
    this.companyBranchesDataSource.sort = this.sort2;
    this.selection2 = new SelectionModel<CompanyBranch>(true, []);
    this.companyBranchesDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }

        // tslint:disable-next-line:max-line-length
        return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();

    };
  }
  renderDepartmenetTable(data) {
    this.departments = data;
    this.departmentDataSource = new MatTableDataSource<Department>(data);
    this.departmentDataSource.paginator = this.paginator3;
    this.departmentDataSource.sort = this.sort3;
    this.selection3 = new SelectionModel<Department>(true, []);
    this.departmentDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }

        // tslint:disable-next-line:max-line-length
        return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();

    };
  }

  reloadCompanyTable() {
    this.companyService.loadCompanies().subscribe(data => {
      this.renderCompanyTable(data);
    });
  }

  reloadCompanyBranchTable(companyID = null) {
    this.compnayBranchService.loadCopmanyBranches(null, companyID, 1).subscribe(data => {
      this.renderCompanyBranchesTable(data);
    });
  }

  reloadDepartmentTable(companyID = null) {
    this.departmentService.loadCompanyDepartments(null, companyID , 1).subscribe(data => {
      this.renderDepartmenetTable(data);
    });
  }


  UploadFlag(form) {
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        this.companyForm.Logo = response;
        if (this.companyForm.selected) {
          this.AddUpdateUrl = this.companyService.companyApiUrl + 'Update';
        } else {
          this.AddUpdateUrl = this.companyService.companyApiUrl  + 'Create';
        }

        this.http.post(this.AddUpdateUrl, this.companyForm).subscribe(res => {
          this.uploader = new FileUploader({ url: this.commonService.uploadImageUrl});
          this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
         this.reloadCompanyTable();
          this.companyForm = new Company;
          this.submit = false;
          form.resetForm();
        });
      }
    };
  }



  // add update delete country

  saveCompany(form) {
    if (form.invalid) {
      return;
    }

    this.companyForm = this.companyForm.selected ? this.companyForm : Object.assign({}, form.value);
    if (this.uploader.queue.length > 0) {
      this.UploadFlag(form);
    } else {
      if (this.companyForm.selected) {
        this.AddUpdateUrl = this.companyService.companyApiUrl + 'Update';
      } else {
        this.AddUpdateUrl = this.companyService.companyApiUrl  + 'Create';
      }

      this.http.post(this.AddUpdateUrl, this.companyForm).subscribe(res => {
        this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
        this.reloadCompanyTable();
        this.companyForm = new Company;
        this.submit = false;
        form.resetForm();
      });
    }
  }

  deleteCompany(id) {
    this.http.post(this.companyService.companyApiUrl + 'Delete' , {ID: id}).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCompanyTable();
    });
   /* this.http.request('DELETE', this.coreService.DeleteUrl + '/DeleteCompany?CompanyID=' + id).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCompanyTable();
    });*/
  }

  updateCompany(company: Company) {
    window.scroll(0, 0);
    this.companyForm = new Company;
    this.companyForm.ID = company.ID;
    this.companyForm.Name = company.Name;
    this.companyForm.Name2 = company.Name2;
    this.companyForm.Phone = company.Phone;
    this.companyForm.CountryCode = company.CountryCode;
    this.companyForm.Mobile = company.Mobile;
    this.companyForm.Fax = company.Fax;
    this.companyForm.Email = company.Email;
    this.companyForm.Website = company.Website;
    this.companyForm.Address = company.Address;
    this.companyForm.Address2 = company.Address2;
    this.companyForm.Code = company.Code;
    this.companyForm.CurrencyCode = company.CurrencyCode;
    this.companyForm.CountryID = company.CountryID;
    this.companyForm.Logo = company.Logo;
    this.companyForm.PasswordMinLength = company.PasswordMinLength;
    this.companyForm.PasswordMinUpperCase = company.PasswordMinUpperCase;
    this.companyForm.PasswordMinLowerCase = company.PasswordMinLowerCase;
    this.companyForm.PasswordMinNumbers = company.PasswordMinNumbers;
    this.companyForm.PasswordMinSpecialCharacters = company.PasswordMinSpecialCharacters;
    this.companyForm.PasswordExpiryDays = company.PasswordExpiryDays;
    this.companyForm.PasswordFailedLoginAttempts = company.PasswordFailedLoginAttempts;
    this.companyForm.PasswordRepeats = company.PasswordRepeats;
    this.companyForm.selected = true;
  }


  // add update delete city

  saveCompanyBranch(form) {
    if (form.invalid) { return; }
    this.companyBranchForm = this.companyBranchForm.selected ? this.companyBranchForm : Object.assign({}, form.value);
    if (this.companyBranchForm.selected) {
      this.AddUpdateUrl = this.compnayBranchService.companyBranchApiUrl + '/Update';
    } else {
      this.AddUpdateUrl = this.compnayBranchService.companyBranchApiUrl + '/Create';
    }
    this.http.post(this.AddUpdateUrl, this.companyBranchForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCompanyBranchTable(this.companyBranchForm.ID ? this.companyBranchForm.ID : null);
      this.companyBranchForm = new CompanyBranch;
      this.submit2 = false;
      form.resetForm();
    });

  }

  deleteCompanyBranch(id) {

    this.http.post(this.compnayBranchService.companyBranchApiUrl + 'Delete' , {ID: id}).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCompanyBranchTable(this.companyForm.ID ? this.companyBranchForm.ID : null);
    });
    /*this.http.request('DELETE', this.coreService.DeleteUrl + '/DeleteCompanyBranch?BranchID=' + id).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCompanyBranchTable(this.companyBranchForm.ID ? this.companyBranchForm.ID : null);
    });*/
  }

  updateCompanyBranch(companyBranch: CompanyBranch) {
    window.scroll(0, 1000);
    this.companyBranchForm = new CompanyBranch;
    this.companyBranchForm.ID = companyBranch.ID;
    this.companyBranchForm.Name = companyBranch.Name;
    this.companyBranchForm.Name2 = companyBranch.Name2;
    this.companyBranchForm.Code = companyBranch.Code;
    this.companyBranchForm.Phone = companyBranch.Phone;
    this.companyBranchForm.Fax = companyBranch.Fax;
    this.companyBranchForm.Email = companyBranch.Email;
    this.companyBranchForm.Address = companyBranch.Address;
    this.companyBranchForm.Address2 = companyBranch.Address2;
    this.companyBranchForm.CompanyID = companyBranch.CompanyID;
    this.companyBranchForm.CityID = companyBranch.CityID;
    this.companyBranchForm.CountryCode = companyBranch.CountryCode;
    this.companyBranchForm.CurrencyCode = companyBranch.CurrencyCode;
    this.companyBranchForm.selected = true;
  }




  // add update delete Area

  saveDepartment(form) {
    if (form.invalid) { return; }

    this.departmentFrom = this.departmentFrom.selected ? this.departmentFrom : Object.assign({}, form.value);
    if (this.departmentFrom.selected) {
      this.AddUpdateUrl = this.departmentService.deparmentApiUrl + '/Update';
    } else {
      this.AddUpdateUrl = this.departmentService.deparmentApiUrl + '/Create';
    }
    this.http.post(this.AddUpdateUrl, this.departmentFrom).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadDepartmentTable(this.companyForm.ID ? this.companyForm.ID : null);
      this.departmentFrom = new Department;
      form.resetForm();
      this.submit3 = false;
    });
  }

  deleteDepartment(id) {
    this.http.post(this.departmentService.deparmentApiUrl + 'Delete' ,  {ID: id}).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadDepartmentTable( this.companyForm.ID ? this.companyForm.ID : null);
    });

    /*this.http.request('DELETE', this.coreService.DeleteUrl + '/DeleteCompanyDepartment?DepartmentID=' + id).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadDepartmentTable( this.companyBranchForm.ST_COM_ID ? this.companyBranchForm.ST_COM_ID : null);
    });*/
  }

  updateDepartment(department: Department) {
    window.scroll(0, 1000);
    this.departmentFrom = new Department;
    this.departmentFrom.ID = department.ID;
    this.departmentFrom.Name = department.Name;
    this.departmentFrom.Name2 = department.Name2;
    this.departmentFrom.Address = department.Address;
    this.departmentFrom.Email = department.Email;
    this.departmentFrom.CompanyID = department.CompanyID;
    this.departmentFrom.selected = true;
  }



  loadCompanyBranches($event) {

    this.compnayBranchService.loadCopmanyBranches(this.companyForm.ID ? this.companyForm.ID : null, null, 1).subscribe(data => {
      this.companyBranches = data;
      this.companyBranchesDataSource = new MatTableDataSource<CompanyBranch>(this.companyBranches);
    });
  }


  replaceFileName(fileName) {
    return fileName ? fileName.substring(fileName.indexOf('Images')) : '';
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



  getCityName(id: number) {
    if (this.cities) {
      for (let index = 0; index < this.cities.length; index++) {
        if (this.cities[index].ID === id) {
          return this.cities[index].Name;
        }
      }
    }
  }


  getCountryName(id: number) {
    for (let index = 0; index < this.countries.length; index++) {
      if (this.countries[index].ID === id) {
        return this.countries[index].Name;
      }
    }
  }
  getCompanyName(id: number) {
    for (let index = 0; index < this.companies.length; index++) {
      if (this.companies[index].ID === id) {
        return this.companies[index].Name;
      }
    }
  }

  getBranchName(id: number) {
    for (let index = 0; index < this.companyBranches.length; index++) {
      if (this.companyBranches[index].CompanyID === id) {
        return this.companyBranches[index].Name;
      }
    }
  }
  isAllSelected() {
    return this.selection.selected.length === this.companiesDataSource.data.length;
  }
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.companiesDataSource.data.forEach(row => this.selection.select(row));
  }


  isAllSelected2() {
    return this.selection2.selected.length === this.companyBranchesDataSource.data.length;
  }
  masterToggle2() {
    this.isAllSelected2() ? this.selection2.clear() : this.companyBranchesDataSource.data.forEach(row => this.selection2.select(row));
  }


  isAllSelected3() {
    return this.selection3.selected.length === this.departmentDataSource.data.length;
  }
  masterToggle3() {
    this.isAllSelected3() ? this.selection3.clear() : this.departmentDataSource.data.forEach(row => this.selection3.select(row));
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
        this.http.post(this.companyService.companyApiUrl + 'DeleteMultiple' ,   {IDs: selectedData} ).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadCompanyTable();
        });
        break;
      case 'CompanyBranch':
        for (let index = 0; index < this.selection2.selected.length; index++) {
          selectedData.push(this.selection2.selected[index].ID);
        }
        this.http.post(this.compnayBranchService.companyBranchApiUrl + 'DeleteMultiple' ,   {IDs: selectedData} ).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadCompanyBranchTable();
        });
        break;
      case 'department':
        for (let index = 0; index < this.selection3.selected.length; index++) {
          selectedData.push(this.selection3.selected[index].ID);
        }
        this.http.post(this.departmentService.deparmentApiUrl + 'DeleteMultiple' ,   {IDs: selectedData} ).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadDepartmentTable();
        });
        break;
    }

  }



}
