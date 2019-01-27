import { SearchService } from './../../../_services/search.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatTableDataSource, MatSnackBarHorizontalPosition, MatPaginator,
  MatSort, MatSnackBar, MatDialog, MatDialogConfig
} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from './../../../_services/Common.service';
import { Commission } from '../../../entities/Setup/Charges';
import { Customer } from '../../../entities/Financial/Customer';
import { CustomerType, CustomerContact, ProviderLicense } from '../../../entities/customer/customer';
import { CustomerTypeService } from '../../../_services/_customers/customerType.service';
import { CustomerContactService } from './../../../_services/_customers/customerContact.service';
import { CommissionService } from './../../../_services/_setup/Commission.service';
import { ProviderLicenseService } from './../../../_services/_customers/providerLicense.service';
import { SearchCustomersComponent } from './searchCustomers/search-customers.component';
import { LockUp } from '../../../entities/organization/LockUp';
import { LineOfBusiness } from '../../../entities/Setup/lineOfBusiness';
import { CustomerService } from '../../../_services/_customer/customer.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  AddUpdateUrl: string;

  customerForm: Customer;
  customers: Customer[];

  customerTypeForm: CustomerType;
  customerTypes: CustomerType[];

  customerContactForm: CustomerContact;
  customerContacts: CustomerContact[];


  commissionForm: Commission;
  commissions: Commission[];

  providerLicenseForm: ProviderLicense;
  providerLicenses: ProviderLicense[];

  CustomerTypesDDL: LockUp[];
  Titles: LockUp[];
  LineOfBusinesses: LineOfBusiness[];
  Departments: LockUp[];

  submit: boolean;
  submit2: boolean;
  submit3: boolean;

  customersTypesTableColumns = ['select', 'ID', 'CustomerName', 'CustomerType', 'GlId', 'actions'];
  customersTypesDataSource: MatTableDataSource<CustomerType>;

  customerContactsTableColumns = ['select', 'ID', 'NAME', 'NAME2', 'CustomerID', 'Mobile', 'Email', 'LOB', 'Department', 'actions'];
  customerContactsDataSource: MatTableDataSource<CustomerContact>;

  commissionTableColumns = ['select', 'ID', 'CustomerType', 'Product', 'LOB',
    'SubLob', 'CommissionType', 'CommissionPercent', 'CommissionAmount', 'actions'];

  commissionDataSource: MatTableDataSource<Commission>;

  providerLicenseTableColumns = ['select', 'ID', 'LICNESNO', 'EffectiveDate', 'EXP_DATE', 'Specialty', 'ProviderType', 'actions'];
  providerLicenseDataSource: MatTableDataSource<ProviderLicense>;

  selection: SelectionModel<CustomerType>;
  selection2: SelectionModel<CustomerContact>;
  selection3: SelectionModel<Commission>;
  selection4: SelectionModel<ProviderLicense>;

  uploader: FileUploader;
  extraForm: string = 'CustomerType';

  snackPosition: MatSnackBarHorizontalPosition = 'right'; CustomerSources: any;
  SalesAgentBrokerList: any[];
  BusinessSectors: any;
  TaxTypes: any;
  BankNames: any;
  BankBranches: any[];
  cities: any[];
  CommissionTypes: any[];
  Specialties: any[];
  ProviderTypes: any[];
  ProviderCodingSystems: any[];
  CustomerStatus: any;
  Status: any;
  Nationalities: any;
  userCompany: any;
  user: any;
  dropdownSettings = {};
  hasBeenSearched = false;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;
  @ViewChild('paginator3') paginator4: MatPaginator;

  @ViewChild('table', { read: MatSort }) sort: MatSort;
  @ViewChild('table2', { read: MatSort }) sort2: MatSort;
  @ViewChild('table3', { read: MatSort }) sort3: MatSort;
  @ViewChild('table3', { read: MatSort }) sort4: MatSort;
  currencies: any;
  countries: any;
  selectedCustomerTypes: any;
  customerSearch: FormControl = new FormControl();
  searchOnCustomerName: FormControl = new FormControl();
  CustomerSearchResult: Customer[] = [];
  submit4: boolean;
  submit5: boolean;

  constructor(public snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute,
    private customerTypeService: CustomerTypeService, private customerService: CustomerService,
    private customerContactService: CustomerContactService,
    private commissionService: CommissionService, private providerLicenseService: ProviderLicenseService,
    private commonService: CommonService, public dialog: MatDialog,
    private seracrhService: SearchService
  ) { }

  ngOnInit() {

    this.selection = new SelectionModel<CustomerType>(true, []);
    this.selection2 = new SelectionModel<CustomerContact>(true, []);
    this.selection3 = new SelectionModel<Commission>(true, []);
    this.selection4 = new SelectionModel<ProviderLicense>(true, []);
    this.userCompany = JSON.parse(localStorage.getItem('company'));
    this.user = JSON.parse(localStorage.getItem('user'));
    this.customerForm = new Customer();
    this.customerTypeForm = new CustomerType();
    this.customerContactForm = new CustomerContact();
    this.commissionForm = new Commission();
    this.providerLicenseForm = new ProviderLicense();
    this.submit = false;
    this.submit2 = false;
    this.submit3 = false;
    this.uploader = new FileUploader({ url: this.commonService.uploadImageUrl });


    this.route.data.subscribe(data => {
      this.CustomerTypesDDL = data.CustomerTypesDDL;
      this.LineOfBusinesses = data.LineOfBusinesses;
      this.Titles = data.Titles;
      this.Departments = data.Departments;
      this.currencies = data.currencies;
      this.countries = data.countries;
      this.CustomerSources = data.CustomerSources;
      this.BusinessSectors = data.BusinessSectors;
      this.TaxTypes = data.TaxTypes;
      this.BankNames = data.BankNames;
      this.CustomerStatus = data.CustomerStatus;
      this.Nationalities = data.Nationalities;
      this.CommissionTypes = data.CommissionTypes;
      this.Specialties = data.Specialties;
      this.ProviderTypes = data.ProviderTypes;
      this.ProviderCodingSystems = data.ProviderCodingSystems;
      this.Status = data.Status;
    });

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'MinorCode',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };

    this.customerSearch.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.seracrhService.search(null, null, null, term, null, null, null,
            1, null).subscribe(
              data => {
                if (data.length > 0) {
                  this.CustomerSearchResult = data;
                  this.hasBeenSearched = true;
                } else {
                  this.hasBeenSearched = false;
                }

              });
        } else {
          this.hasBeenSearched = false;
        }
      });
    this.searchOnCustomerName.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.seracrhService.search(null, term, null, null, null, null, null,
            1, null).subscribe(
              data => {
                if (data.length > 0) {
                  this.CustomerSearchResult = data;
                  this.hasBeenSearched = true;
                } else {
                  this.hasBeenSearched = false;
                }

              });
        } else {
          this.hasBeenSearched = false;
        }
      });
  }

  FillCustomerData() {

    this.hasBeenSearched = true;
    if (this.customerSearch.value !== null) {
      this.searchOnCustomerName.patchValue(this.customerSearch.value);
    } else {
      this.customerSearch.patchValue(this.searchOnCustomerName.value);
    }
    this.customerForm.Email = this.customerSearch.value.Email ? this.customerSearch.value.Email : this.searchOnCustomerName.value.Email;
    this.customerForm.ReferenceNo = this.customerSearch.value.ReferenceNo
      ? this.customerSearch.value.ReferenceNo : this.searchOnCustomerName.value.ReferenceNo;
    this.customerForm.Mobile = this.customerSearch.value.Mobile ?
      this.customerSearch.value.Mobile : this.searchOnCustomerName.value.Mobile;
    this.customerForm.CustomerNo = this.customerSearch.value.CustomerNo ?
      this.customerSearch.value.CustomerNo : this.searchOnCustomerName.value.CustomerNo;
    this.customerForm.ID = this.customerSearch.value.ID ?
      this.customerSearch.value.ID : this.searchOnCustomerName.value.ID;
    this.customerForm.Name = this.customerSearch.value.Name ?
      this.customerSearch.value.Name : this.searchOnCustomerName.value.Name;
    this.customerForm.CreatedBy = this.customerSearch.value.CreatedBy ?
      this.customerSearch.value.CreatedBy : this.searchOnCustomerName.value.CreatedBy;
    this.customerForm.CompanyID = this.customerSearch.value.CompanyID ?
      this.customerSearch.value.CompanyID : this.searchOnCustomerName.value.CompanyID;
    this.customerForm.CreationDate = this.customerSearch.value.CreationDate ?
      this.customerSearch.value.CreationDate : this.searchOnCustomerName.value.CreationDate;
    this.customerForm.Name2 = this.customerSearch.value.Name2 ?
      this.customerSearch.value.Name2 : this.searchOnCustomerName.value.Name2;

    this.customerForm.CommName = this.customerSearch.value.CommName ?
      this.customerSearch.value.CommName : this.searchOnCustomerName.value.CommName;
    this.customerForm.CurrencyCode = this.customerSearch.value.CurrencyCode ?
      this.customerSearch.value.CurrencyCode : this.searchOnCustomerName.value.CurrencyCode;
    this.customerForm.Fax = this.customerSearch.value.Fax ?
      this.customerSearch.value.Fax : this.searchOnCustomerName.value.Fax;
    this.customerForm.XCoordinates = this.customerSearch.value.XCoordinates ?
      this.customerSearch.value.XCoordinates : this.searchOnCustomerName.value.XCoordinates;
    this.customerForm.YCoordinates = this.customerSearch.value.YCoordinates ?
      this.customerSearch.value.YCoordinates : this.searchOnCustomerName.value.YCoordinates;
    this.customerForm.Website = this.customerSearch.value.Website ?
      this.customerSearch.value.Website : this.searchOnCustomerName.value.Website;
    this.customerForm.TaxNo = this.customerSearch.value.TaxNo ?
      this.customerSearch.value.TaxNo : this.searchOnCustomerName.value.TaxNo;
    this.customerForm.StatusNotes = this.customerSearch.value.StatusNotes ?
      this.customerSearch.value.StatusNotes : this.searchOnCustomerName.value.StatusNotes;
    this.customerForm.StatusDate = this.customerSearch.value.StatusDate ?
      this.customerSearch.value.StatusDate : this.searchOnCustomerName.value.StatusDate;
    this.customerForm.Status = this.customerSearch.value.Status ?
      this.customerSearch.value.Status : this.searchOnCustomerName.value.Status;
    this.customerForm.ShareType = this.customerSearch.value.ShareType ?
      this.customerSearch.value.ShareType : this.searchOnCustomerName.value.ShareType;
    this.customerForm.RefExpiryDate = this.customerSearch.value.RefExpiryDate ?
      this.customerSearch.value.RefExpiryDate : this.searchOnCustomerName.value.RefExpiryDate;
    this.customerForm.RefEffectiveDate = this.customerSearch.value.RefEffectiveDate ?
      this.customerSearch.value.RefEffectiveDate : this.searchOnCustomerName.value.RefEffectiveDate;
    this.customerForm.PostalCode = this.customerSearch.value.PostalCode ?
      this.customerSearch.value.PostalCode : this.searchOnCustomerName.value.PostalCode;
    this.customerForm.PoBox = this.customerSearch.value.PoBox ?
      this.customerSearch.value.PoBox : this.searchOnCustomerName.value.PoBox;
    this.customerForm.PhoneCode = this.customerSearch.value.PhoneCode ?
      this.customerSearch.value.PhoneCode : this.searchOnCustomerName.value.PhoneCode;
    this.customerForm.Phone = this.customerSearch.value.Phone ?
      this.customerSearch.value.Phone : this.searchOnCustomerName.value.Phone;
    this.customerForm.Nationality = this.customerSearch.value.Nationality ?
      this.customerSearch.value.Nationality : this.searchOnCustomerName.value.Nationality;
    this.customerForm.ModifiedBy = this.customerSearch.value.ModifiedBy ?
      this.customerSearch.value.ModifiedBy : this.searchOnCustomerName.value.ModifiedBy;

    this.customerForm.ModificationDate = this.customerSearch.value.ModificationDate ?
      this.customerSearch.value.ModificationDate : this.searchOnCustomerName.value.ModificationDate;
    this.customerForm.Logo = this.customerSearch.value.Logo ?
      this.customerSearch.value.Logo : this.searchOnCustomerName.value.Logo;
    this.customerForm.LockUpTitle = this.customerSearch.value.LockUpTitle ?
      this.customerSearch.value.LockUpTitle : this.searchOnCustomerName.value.LockUpTitle;
    this.customerForm.LockUpTaxType = this.customerSearch.value.LockUpTaxType ?
      this.customerSearch.value.LockUpTaxType : this.searchOnCustomerName.value.LockUpTaxType;
    this.customerForm.LockUpSecotor = this.customerSearch.value.LockUpSecotor ?
      this.customerSearch.value.LockUpSecotor : this.searchOnCustomerName.value.LockUpSecotor;
    this.customerForm.LockUpLanguage = this.customerSearch.value.LockUpLanguage ?
      this.customerSearch.value.LockUpLanguage : this.searchOnCustomerName.value.LockUpLanguage;

    this.customerForm.LockUpGender = this.customerSearch.value.LockUpGender ?
      this.customerSearch.value.LockUpGender : this.searchOnCustomerName.value.LockUpGender;
    this.customerForm.IsVip = this.customerSearch.value.IsVip ?
      this.customerSearch.value.IsVip : this.searchOnCustomerName.value.IsVip;
    this.customerForm.IndOrComp = this.customerSearch.value.IndOrComp ?
      this.customerSearch.value.IndOrComp : this.searchOnCustomerName.value.IndOrComp;
    this.customerForm.Iban = this.customerSearch.value.Iban ?
      this.customerSearch.value.Iban : this.searchOnCustomerName.value.Iban;
    this.customerForm.ID = this.customerSearch.value.ID ?
      this.customerSearch.value.ID : this.searchOnCustomerName.value.ID;
    this.customerForm.BirthDate = this.customerSearch.value.BirthDate ?
      this.customerSearch.value.BirthDate : this.searchOnCustomerName.value.BirthDate;
    this.customerForm.BankID = this.customerSearch.value.BankID ?
      this.customerSearch.value.BankID : this.searchOnCustomerName.value.BankID;
    this.customerForm.BankBranchID = this.customerSearch.value.BankBranchID ?
      this.customerSearch.value.BankBranchID : this.searchOnCustomerName.value.BankBranchID;
    this.customerForm.AreaID = this.customerSearch.value.AreaID ?
      this.customerSearch.value.AreaID : this.searchOnCustomerName.value.AreaID;
    this.customerForm.Address = this.customerSearch.value.Address ?
      this.customerSearch.value.Address : this.searchOnCustomerName.value.Address;


  }

  applyFilter(filterValue: string) {
    switch (this.extraForm) {
      // case '':
      //   this.customersDataSource.filter = filterValue.trim().toLowerCase();
      //   break;
      // case 'CustomerContact':
      //   this.customerContactsDataSource.filter = filterValue.trim().toLowerCase();
      //   break;
      // case 'department':
      //   this.commissionDataSource.filter = filterValue.trim().toLowerCase();
      //   break;
    }
  }
  checkCurrentCustomer() {
    if (this.CustomerSearchResult.length === 0 && (this.customerSearch.value === null || this.searchOnCustomerName.value === null)) {
      this.hasBeenSearched = false;
    }
  }
  showBranchAndDepartmentForm($event) {
    setTimeout(() => {
      switch ($event.index) {
        case 0:
          this.extraForm = 'CustomerType';
          this.reloadCustomerTypesTable(this.customerForm.ID ? this.customerForm.ID : null);
          break;
        case 1:
          this.extraForm = 'CustomerContacts';
          this.reloadCustomerContactsTable(this.customerForm.ID ? this.customerForm.ID : null);
          break;
        case 2:
          this.extraForm = 'commission';
          this.reloadCommissionTable(this.customerForm.ID ? this.customerForm.ID : null);
          break;
        case 3:
          this.extraForm = 'providerLicense';
          this.reloadProviderLicenseTable(this.customerForm.ID ? this.customerForm.ID : null);
          break;
      }
    });
  }


  reloadCustomerTypesTable(customerID = null) {
    this.customerTypeService.load(customerID, 1).subscribe(data => {
      this.renderCustomerTypesTable(data);
    });
  }
  reloadCustomerContactsTable(customerID = null) {
    this.customerContactService.load(null, customerID, 1).subscribe(data => {
      this.renderCustomerContactsTable(data);
    });
  }

  reloadCommissionTable(customerID = null) {
    this.commissionService.load(null, null, customerID, null, null).subscribe(data => {
      this.renderCommissionTable(data);
    });
  }
  reloadProviderLicenseTable(customerID = null) {
    this.providerLicenseService.load(null, null, customerID, null, null, null, null).subscribe(data => {
      this.renderProviderLicenseTable(data);
    });
  }

  // renderCustomerTable(data) {
  //   this.customers = data;
  //   this.customersDataSource = new MatTableDataSource<Customer>(data);
  //   this.customersDataSource.paginator = this.paginator;
  //   this.customersDataSource.sort = this.sort;
  //   this.selection = new SelectionModel<Customer>(true, []);
  //   this.customersDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
  //     if (!sortData[sortHeaderId]) {
  //       return this.sort.direction === 'asc' ? '3' : '1';
  //     }

  //     // tslint:disable-next-line:max-line-length
  //     return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();

  //   };
  // }

  renderCustomerTypesTable(data) {
    this.customerTypes = data;
    this.customersTypesDataSource = new MatTableDataSource<CustomerType>(data);
    this.customersTypesDataSource.paginator = this.paginator;
    this.customersTypesDataSource.sort = this.sort;
    this.selection = new SelectionModel<CustomerType>(true, []);
    this.customersTypesDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();

    };
  }

  renderCustomerContactsTable(data) {
    this.customerContacts = data;
    this.customerContactsDataSource = new MatTableDataSource<CustomerContact>(data);
    this.customerContactsDataSource.paginator = this.paginator2;
    this.customerContactsDataSource.sort = this.sort2;
    this.selection2 = new SelectionModel<CustomerContact>(true, []);
    this.customerContactsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort2.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();

    };
  }

  renderCommissionTable(data) {
    this.commissions = data;
    this.commissionDataSource = new MatTableDataSource<Commission>(data);
    this.commissionDataSource.paginator = this.paginator3;
    this.commissionDataSource.sort = this.sort3;
    this.selection3 = new SelectionModel<Commission>(true, []);
    this.commissionDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort3.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();

    };
  }
  renderProviderLicenseTable(data) {
    this.providerLicenses = data;
    this.providerLicenseDataSource = new MatTableDataSource<ProviderLicense>(data);
    this.providerLicenseDataSource.paginator = this.paginator4;
    this.providerLicenseDataSource.sort = this.sort4;
    this.selection4 = new SelectionModel<ProviderLicense>(true, []);
    this.providerLicenseDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort4.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();

    };
  }



  UploadFlag(form) {
    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        this.customerForm.Logo = response;
        if (this.customerForm.selected) {
          //   this.AddUpdateUrl = this.customerService.customerApiUrl + 'Update';
        } else {
          //   this.AddUpdateUrl = this.customerService.customerApiUrl + 'Create';
        }

        this.http.post(this.AddUpdateUrl, this.customerForm).subscribe(res => {
          this.uploader = new FileUploader({ url: this.commonService.uploadImageUrl });
          this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          //  this.reloadCustomerTable();
          this.customerForm = new Customer;
          this.submit = false;
          form.resetForm();
        });
      }
    };
  }



  // add update delete country

  saveCustomer(form) {
    if (form.invalid) {
      return;
    }

    this.customerForm = this.customerForm.selected ? this.customerForm : Object.assign({}, form.value);
    if (this.uploader.queue.length > 0) {
      this.UploadFlag(form);
    } else {
      if (typeof this.searchOnCustomerName.value === 'string') {
        this.customerForm.Name = this.searchOnCustomerName.value;
      }
      this.AddUpdateUrl = this.customerService.ApiUrl + 'Create';
      this.customerForm.CompanyID = this.userCompany.ID;
      this.http.post(this.AddUpdateUrl, this.customerForm).subscribe(res => {
        const result: any = res;

        for (let index = 0; index < this.selectedCustomerTypes.length; index++) {
          const element: any = this.selectedCustomerTypes[index];
          const customer: any = {
            CustomerID: result.ID,
            LocCustomerType: element.MinorCode,
            CreatedBy: this.user.Name,
            CreationDate: new Date()
          };

          this.http.post(this.customerService.ApiUrl + 'CreateCustomerType', customer).subscribe(types => {
          });
        }
        this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });

        // this.submit = false;
        // form.resetForm();
      });
    }
  }

  // deleteCustomer(id) {
  //   this.http.post(this.customerService.customerApiUrl + 'Delete', { ID: id }).subscribe(res => {
  //     this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
  //     this.reloadCustomerTable();
  //   });
  // }

  updateCustomer(customer: Customer) {
    window.scroll(0, 0);
    this.customerForm = new Customer;
    this.customerForm = customer;
    this.customerForm.selected = true;
  }


  // add update delete 

  saveCustomerType(form) {
    if (form.invalid) { return; }
    this.customerTypeForm = this.customerTypeForm.selected ? this.customerTypeForm : Object.assign({}, form.value);
    if (this.customerContactForm.selected) {
      this.AddUpdateUrl = this.customerTypeService.ApiUrl + '/CreateCustomerType';
    } else {
      this.AddUpdateUrl = this.customerTypeService.ApiUrl + 'CreateCustomerType';
    }
    this.customerTypeForm.CustomerID = this.customerForm.ID;
    this.customerTypeForm.CreatedBy = this.user.Name;
    this.customerTypeForm.CreationDate = new Date();
    this.http.post(this.AddUpdateUrl, this.customerTypeForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCustomerTypesTable(this.customerForm.ID ? this.customerForm.ID : null);
      this.customerTypeForm = new CustomerType;
      this.submit2 = false;
      form.resetForm();
    });

  }

  deleteCustomerType(id) {
    this.http.post(this.customerTypeService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCustomerTypesTable(this.customerForm.ID ? this.customerContactForm.ID : null);
    });
  }


  updateCustomerType(customerType: CustomerType) {
    window.scroll(0, 1000);
    this.customerTypeForm = new CustomerType;
    this.customerTypeForm = customerType;
    this.customerTypeForm.selected = true;
  }

  // add update delete 

  saveCustomerContact(form) {
    if (form.invalid) { return; }
    this.customerContactForm = this.customerContactForm.selected ? this.customerContactForm : Object.assign({}, form.value);
    if (this.customerContactForm.selected) {
      this.AddUpdateUrl = this.customerContactService.ApiUrl + '/Update';
    } else {
      this.AddUpdateUrl = this.customerContactService.ApiUrl + '/Create';
    }
    this.customerContactForm.CustomerID = this.customerForm.ID;
    this.customerContactForm.CreatedBy = this.user.Name;
    this.customerContactForm.CreationDate = new Date();
    this.http.post(this.AddUpdateUrl, this.customerContactForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCustomerContactsTable(this.customerForm.ID ? this.customerForm.ID : null);
      this.customerContactForm = new CustomerContact;
      this.submit3 = false;
      form.resetForm();
    });

  }

  deleteCustomerContact(id) {
    this.http.post(this.customerContactService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCustomerContactsTable(this.customerForm.ID ? this.customerForm.ID : null);
    });
  }

  updateCustomerContact(customerContact: CustomerContact) {
    window.scroll(0, 1000);
    this.customerContactForm = new CustomerContact;
    this.customerContactForm = customerContact;
    this.customerContactForm.selected = true;
  }

  // add update delete Area

  saveCommission(form) {
    if (form.invalid) { return; }

    this.commissionForm = this.commissionForm.selected ? this.commissionForm : Object.assign({}, form.value);
    if (this.commissionForm.selected) {
      this.AddUpdateUrl = this.commissionService.ApiUrl + '/Update';
    } else {
      this.AddUpdateUrl = this.commissionService.ApiUrl + '/Create';
    }
    this.commissionForm.CustomerID = this.customerForm.ID;
    this.commissionForm.CreatedBy = this.user.Name;
    this.commissionForm.CreationDate = new Date();
    this.http.post(this.AddUpdateUrl, this.commissionForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCommissionTable(this.customerForm.ID ? this.customerForm.ID : null);
      this.commissionForm = new Commission;
      form.resetForm();
      this.submit4 = false;
    });
  }

  deleteCommission(id) {
    this.http.post(this.commissionService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCommissionTable(this.customerForm.ID ? this.customerForm.ID : null);
    });
  }


  updateCommission(commission: Commission) {
    window.scroll(0, 0);
    this.commissionForm = new Commission;
    this.commissionForm = commission;
    this.commissionForm.selected = true;
  }


  // add update delete 

  saveProviderLicense(form) {
    if (form.invalid) { return; }
    this.providerLicenseForm = this.providerLicenseForm.selected ? this.providerLicenseForm : Object.assign({}, form.value);
    if (this.providerLicenseForm.selected) {
      this.AddUpdateUrl = this.providerLicenseService.ApiUrl + '/Update';
    } else {
      this.AddUpdateUrl = this.providerLicenseService.ApiUrl + '/Create';
    }
    this.providerLicenseForm.CustomerID = this.customerForm.ID;
    this.providerLicenseForm.CreatedBy = this.user.Name;
    this.providerLicenseForm.CreationDate = new Date();
    this.http.post(this.AddUpdateUrl, this.providerLicenseForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadProviderLicenseTable(this.customerForm.ID ? this.customerForm.ID : null);
      this.providerLicenseForm = new ProviderLicense;
      this.submit5 = false;
      form.resetForm();
    });

  }

  deleteProviderLicense(id) {
    this.http.post(this.providerLicenseService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadProviderLicenseTable(this.customerForm.ID ? this.customerForm.ID : null);
    });
  }

  updateProviderLicense(providerLicense: ProviderLicense) {
    window.scroll(0, 1000);
    this.providerLicenseForm = new ProviderLicense;
    this.providerLicenseForm = providerLicense;
    this.providerLicenseForm.selected = true;
  }


  loadCustomerContacts($event) {
    this.customerContactService.load(this.customerForm.ID
      , 1).subscribe(data => {
        this.customerContacts = data;
        this.customerContactsDataSource = new MatTableDataSource<CustomerContact>(this.customerContacts);
      });
  }


  replaceFileName(fileName) {
    return fileName ? fileName.substring(fileName.indexOf('Images')) : '';
  }

  export(type, data) {
    if (data === 'customer') {
      let body = {
        // 'items': this.customersDataSource.data,
        'FieldName': 'Organization.Customer',
        'Type': type,
      }
      this.commonService.Export(body).subscribe(res => {
        window.open(res.FilePath);
      });
    }
    if (data === 'CustomerContact') {
      let body = {
        'items': this.customerContactsDataSource.data,
        'FieldName': 'Organization.CustomerContact',
        'Type': type,
      }
      this.commonService.Export(body).subscribe(res => {
        window.open(res.FilePath);
      });
    }
    if (data === 'department') {
      let body = {
        'items': this.commissionDataSource.data,
        'FieldName': 'Organization.Department',
        'Type': type,
      };
      this.commonService.Export(body).subscribe(res => {
        window.open(res.FilePath);
      });
    }
  }


  getCustomerName(id: number) {
    for (let index = 0; index < this.customers.length; index++) {
      if (this.customers[index].ID === id) {
        return this.customers[index].Name;
      }
    }
  }


  isAllSelected() {
    return this.selection.selected.length === this.customersTypesDataSource.data.length;
  }
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.customersTypesDataSource.data.forEach(row => this.selection.select(row));
  }


  isAllSelected2() {
    return this.selection2.selected.length === this.customerContactsDataSource.data.length;
  }
  masterToggle2() {
    this.isAllSelected2() ? this.selection2.clear() : this.customerContactsDataSource.data.forEach(row => this.selection2.select(row));
  }


  isAllSelected3() {
    return this.selection3.selected.length === this.commissionDataSource.data.length;
  }
  masterToggle3() {
    this.isAllSelected3() ? this.selection3.clear() : this.commissionDataSource.data.forEach(row => this.selection3.select(row));
  }
  isAllSelected4() {
    return this.selection4.selected.length === this.providerLicenseDataSource.data.length;
  }
  masterToggle4() {
    this.isAllSelected4() ? this.selection4.clear() : this.providerLicenseDataSource.data.forEach(row => this.selection4.select(row));
  }

  resetForm(form) {
    // this.customerForm = new Customer();
    //this.submit = false;
    form.reset();
  }


  deleteSelectedData() {

    // tslint:disable-next-line:prefer-const
    let selectedData = [];
    switch (this.extraForm) {
      case 'CustomerType':
        for (let index = 0; index < this.selection.selected.length; index++) {
          selectedData.push(this.selection.selected[index].ID);
        }
        this.http.post(this.customerTypeService.ApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadCustomerContactsTable();
        });
        break;
      case 'CustomerContacts':
        for (let index = 0; index < this.selection2.selected.length; index++) {
          selectedData.push(this.selection2.selected[index].ID);
        }
        this.http.post(this.customerContactService.ApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadCustomerContactsTable();
        });
        break;
      case 'commission':
        for (let index = 0; index < this.selection3.selected.length; index++) {
          selectedData.push(this.selection3.selected[index].ID);
        }
        this.http.post(this.commissionService.ApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadCommissionTable();
        });
        break;
      case 'providerLicense':
        for (let index = 0; index < this.selection4.selected.length; index++) {
          selectedData.push(this.selection4.selected[index].ID);
        }
        this.http.post(this.providerLicenseService.ApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadProviderLicenseTable();
        });
        break;
    }
  }

  searchCustomers() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;

    const dialogRef = this.dialog.open(SearchCustomersComponent, {
      panelClass: 'full-width-dialog',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerForm = result;
        this.searchOnCustomerName.patchValue(this.customerForm);
        this.customerSearch.patchValue(this.customerForm);
        this.customerTypeService.load(this.customerForm.ID, 1).subscribe(res => {
          this.renderCustomerTypesTable(res);
        });
      }
    });
  }


  fillSalesAgentBrokerList() {
    this.SalesAgentBrokerList = [];
  }


  displayCustomerNumber(customer?: Customer): string | undefined {
    return customer ? customer.CustomerNo : '';
  }
  displayCustomerName(customer?: Customer): string | undefined {
    return customer ? customer.Name : '';
  }

  loadBankBranches() {
    this.BankBranches = [];
  }

  loadCities() {
    this.cities = [];
  }
  getCustomerType(id: number) {
    for (let index = 0; index < this.CustomerTypesDDL.length; index++) {
      if (this.CustomerTypesDDL[index].ID === id) {
        return this.CustomerTypesDDL[index].Name;
      }
    }
  }
  getCommissionType(id: number) {
    for (let index = 0; index < this.CommissionTypes.length; index++) {
      if (this.CommissionTypes[index].ID === id) {
        return this.CommissionTypes[index].Name;
      }
    }
  }
  getSpecialties(id: number) {
    for (let index = 0; index < this.Specialties.length; index++) {
      if (this.Specialties[index].ID === id) {
        return this.Specialties[index].Name;
      }
    }
  }
  getProviderTypes(id: number) {
    for (let index = 0; index < this.ProviderTypes.length; index++) {
      if (this.ProviderTypes[index].ID === id) {
        return this.ProviderTypes[index].Name;
      }
    }
  }
  getLocCustomerDept(id: number) {
    for (let index = 0; index < this.Departments.length; index++) {
      if (this.Departments[index].ID === id) {
        return this.Departments[index].Name;
      }
    }
  }

}
