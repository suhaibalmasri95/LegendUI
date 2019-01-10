import { DocumentAttachment } from './../../../entities/production/DocumentAttachment';
import { PolicyAttachmentService } from './../../../_services/_production/policyAttachment.service';
import { SharesService } from './../../../_services/_products/shares.service';
import { ProductDynamicColumn } from './../../../entities/Dynamic/ProductDynamicColumn';
import { PolicyService } from './../../../_services/_production/Policy.service';
import { DocumentService } from './../../../_services/DocumentService.service';
import { CustomerShare } from '../../../entities/production/CustomerShare';
import { Share } from './../../../entities/production/Share';
import { ProductDynmicCategory } from './../../../entities/Dynamic/ProductDynmicCategory';
import { DynamicService } from './../../../_services/_dynamic/Dynamic.service';
import { Currency } from './../../../entities/organization/Currency';
import { SearchService } from './../../../_services/search.service';
import { Customer } from './../../../entities/Financial/Customer';
import { CompanyBranch } from './../../../entities/organization/CompanyBranch';
import { Product} from './../../../entities/Product/Products';
import { LockUp } from './../../../entities/organization/LockUp';
import { HttpClient } from '@angular/common/http';
import { Documents } from './../../../entities/production/Documents';
import { Component, OnInit, ViewChild, Inject, Input, Output, EventEmitter } from '@angular/core';
import { SidenavService } from './../../../_services/sidenav/sidenav.service';
import { BsDatepickerDirective } from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { WizardState } from 'angular-archwizard';

import * as _ from 'lodash';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {
  @ViewChild(BsDatepickerDirective) datepicker: BsDatepickerDirective;
// tslint:disable-next-line: no-input-rename
   sharesTableColumn = ['select' , 'ID' , 'Customer Id' , 'Share Type' , 'Document ID' , 'action'];
   attachmentTableColumn = ['select' , 'ID' , 'Document ID' , 'Product Attachment ID' ,
    'Name' , 'Is Received' , 'Received Date' , 'Attached Path', 'action'];
   text: string;
   value: string;
   share: Share;
   customerUpdateForm: Customer;
   policyHolderUpdate: FormControl = new FormControl();
   shares: Share[];
   updateMode: boolean = false;
  hasBeenSearched: boolean = false;
   customer: CustomerShare;
   currentCustomer: Customer;
   icon = false;
   documentAttachments: DocumentAttachment[];
   documentForm: Documents;
   businessTypes: LockUp[];
   accountedFor: LockUp[];
   distributionChannel: LockUp[];
   products: Product[];
   branches: CompanyBranch[];
   policyHolders: Customer[];
   agents: Customer[];
   brokers: Customer[];
   salesPersons: Customer[];
   policyholderSearch: FormControl = new FormControl();
   beneficiarySearch: FormControl = new FormControl();
   agentSearch: FormControl = new FormControl();
   brokerSearch: FormControl = new FormControl();
   salesPersonSearch: FormControl = new FormControl();
   beneficiaries: Customer[];
   currencies: Currency[];
   openCoverType: LockUp[];
   calculateBase: LockUp[];
   paymentType: LockUp[];
   user: any;
   selected = new FormControl(0);
   userCompany: any;
   status: LockUp[];
   productDynamicCategories: ProductDynmicCategory[];
   productDynamicCategoriesMultiRecord: ProductDynmicCategory[];
   documentShareControl: FormControl = new FormControl('', [Validators.max(100), Validators.min(0)]);
  constructor(private sidenavService: SidenavService,
    private http: HttpClient, private route: ActivatedRoute,
    private seracrhService: SearchService,
     private dynamicService: DynamicService, @Inject(WizardState) private wizard: WizardState,
     private _documentService: DocumentService, private policyService: PolicyService,
     private shareService: SharesService  , private attachmentService: PolicyAttachmentService ) { }

  ngOnInit() {
    this.customerUpdateForm = new Customer();
    this.text = 'test';
    this.value = 'test';
    this.documentForm = new Documents();
    this.route.data.subscribe(res => {
      this.businessTypes = res.busniessTypes;
      this.products = res.products;
      this.branches = res.branches;
      this.accountedFor = res.accountedFor;
      this.distributionChannel = res.distributionChannel;
      this.currencies = res.currency;
      this.openCoverType = res.openCoverType;
      this.calculateBase = res.calculateBase;
      this.paymentType = res.paymentType;
      this.status = res.status;
    });
    this.policyHolders = [];
    this.shares = [];
    this.currentCustomer = new Customer();
    this.share = new Share();
    this.customer = new CustomerShare();
    this.share.customer = [];
    this.user = JSON.parse(localStorage.getItem('user'));
    this.share.CreatedBy = this.user.Name;
    this.share.CreationDate = new Date();
    this.documentForm.CreatedBy = this.user.Name;
    this.documentForm.CreationDate = new Date();
    this.documentForm.StatusDate = new Date();
    this.documentForm.IssueDate = new Date();
    this.documentForm.EffectiveDate = new Date();
    this.documentForm.ExpiryDate = new Date(this.documentForm.EffectiveDate.getFullYear() + 1 ,
     this.documentForm.EffectiveDate.getMonth(), this.documentForm.EffectiveDate.getDate() - 1) ;
    this.documentForm.FinancialDate = new Date();
    this.documentForm.FyrYear =  new Date(this.documentForm.FinancialDate).getFullYear();
    this.documentForm.Status = 1;
    this.documentForm.CalcBases = 1;
    this.documentForm.PaymentId = 1;
    this.documentAttachments = [];
    this.userCompany = JSON.parse(localStorage.getItem('company'));
    this.filterCurrency(this.currencies);
    this.documentForm.LocDistChnales = 1;
    this.documentShareControl.disable();
    this.documentForm.DocumentShare = 100;
    this.documentForm.Exrate = 1;
    this.policyService.load(107 , 1).subscribe( res => {
      this.documentForm = res[0];
      this.updateMode = true;
      this.getDynamicFileds(this.documentForm.ProductId);
    this.shareService.load(null, null , 107 , null , null , null , 1).subscribe( shares => {
      this.shares = shares;
    });
    this.attachmentService.load(null , 70 , null , 3 , null , 1 , 1 ). subscribe( attachments => {
      this.documentAttachments = attachments;
    });
  
    });
    this.productDynamicCategoriesMultiRecord = [];
    this.productDynamicCategories = [];
    this.policyholderSearch.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.seracrhService.search(null , null , term, null, null , null, null, 1 , 1).subscribe(
            data => {
              this.policyHolders = data;

              // console.log(data[0].BookName);
          });
        } else {
          this.hasBeenSearched = false;
        }
    });

    this.beneficiarySearch.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.seracrhService.search(null, null , term, null, null , null, null, 1 , 2).subscribe(
            data => {
              this.beneficiaries = data;
              // console.log(data[0].BookName);
          });
        }
    });
    this.salesPersonSearch.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.seracrhService.search(null , null , term, null, null , null, null, 1 , 3).subscribe(
            data => {
              this.salesPersons = data;
              // console.log(data[0].BookName);
          });
        }
    });
    this.brokerSearch.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.seracrhService.search(null, null , term, null, null , null, null, 1 , 5).subscribe(
            data => {
              this.brokers = data;
              // console.log(data[0].BookName);
          });
        }
    });
    this.agentSearch.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.seracrhService.search(null, null , term, null, null , null, null, 1 , 4).subscribe(
            data => {
              this.agents = data;
              // console.log(data[0].BookName);
          });
        }
    });
  }
  click() {
    this.icon = !this.icon;
  }
  toggleSidenav() {
    this.sidenavService.toggle();
  }

  displayFn(customer?: Customer): string | undefined {
    return customer ? customer.CustomerNo + ' ' + customer.Name   : undefined;
  }
  filterCurrency(currencies: Currency[]) {
    for ( let i = 0; i < currencies.length; i++) {
      if (currencies[i].Code === this.userCompany.CurrencyCode) {
        this.documentForm.CurrencyCode = currencies[i].Code;
      }
    }
  }
  setDocumentShare(busType: number){
    if (busType === 251) {
      this.documentForm.DocumentShare = 100;
      this.documentShareControl.disable();
    } else {
      this.documentForm.DocumentShare = 1;
      this.documentShareControl.enable();
    }
  }
  FillCustomerData() {
    this.hasBeenSearched = true;
    this.currentCustomer.Email = this.policyholderSearch.value.Email;
    this.currentCustomer.ReferenceNo = this.policyholderSearch.value.ReferenceNo;
    this.currentCustomer.Mobile = this.policyholderSearch.value.Mobile;
    this.currentCustomer.CustomerNo = this.policyholderSearch.value.CustomerNo;
  }
  SearchCustomerByEmail(email: string) {
    if (!this.hasBeenSearched && (email !== undefined && email !== '')) {
      this.seracrhService.search(null , null , null , null, email , null, null, 1 , 1).subscribe(
        data => {
          if (data.length > 0) {
          this.currentCustomer = data[0];
          this.policyholderSearch.patchValue( this.currentCustomer );
          this.hasBeenSearched = true;
        } else {
          this.hasBeenSearched = false;
        }
          // console.log(data[0].BookName);
      });
    }
  }
  SearchCustomerByPhoneNumber(mobile: string) {
    if (!this.hasBeenSearched  && (mobile !== undefined &&  mobile !== '')) {
      this.seracrhService.search(null, null , null , null, null , mobile, null, 1 , 1).subscribe(
        data => {
          if (data.length > 0) {
          this.currentCustomer = data[0];
          this.policyholderSearch.patchValue( this.currentCustomer );
          this.hasBeenSearched = true;
        } else {
          this.hasBeenSearched = false;
        }
      });
    }
  }
  SearchCustomerReferenceNumber(nationalID: string) {
    if (!this.hasBeenSearched  && (nationalID !== undefined &&  nationalID !== '' )) {
      this.seracrhService.search(null , null , null , null, null , null, nationalID, 1 , 1).subscribe(
        data => {
          if (data.length > 0) {
          this.currentCustomer = data[0];
          this.policyholderSearch.patchValue( this.currentCustomer );
          this.hasBeenSearched = true;
            }  else {
            this.hasBeenSearched = false;
          }
      });
    }
  }
  getDynamicFileds(productID: number) {
    if (productID) {
    if (this.documentForm.DocumentType === 1) {
      this.getDynamicCategoriesForPolicy(productID);
    } else if (this.documentForm.DocumentType === 2) {
      this.getDynamicCategoriesForQuotation(productID);
    }}
  }
  checkCurrentCustomer() {
    if (this.policyHolders.length === 0 && this.policyholderSearch.value === null) {
      this.hasBeenSearched = false;
    }
  }

  changeUwYear($event: Date) {

   this.documentForm.EffectiveDate = $event;
   this.documentForm.ExpiryDate = new Date(this.documentForm.ExpiryDate);
   this.documentForm.EffectiveDate = new Date(this.documentForm.EffectiveDate);

   this.documentForm.ExpiryDate = new Date(this.documentForm.ExpiryDate.getFullYear() + 1 ,
     this.documentForm.EffectiveDate.getMonth(), this.documentForm.EffectiveDate.getDate() - 1) ;
   this.documentForm.UwYear =  new Date(this.documentForm.EffectiveDate).getFullYear();
  }
  changeFinancialDate($event: Date) {

    this.documentForm.IssueDate = $event;
   this.documentForm.FinancialDate = $event;
   this.documentForm.FyrYear =  new Date(this.documentForm.FinancialDate).getFullYear();
  }
    getDynamicCategoriesForPolicy( id: number) {
      this.dynamicService.load(null, null , id , null , 1, null , null , 1 ).subscribe(res => {
        if (this.updateMode) {
          // mearge array and filter the columns
          this.FilterAndMeargeArray(res);
         //this.productDynamicCategories = res ;
        } else {
          res.forEach(element => {
            if (element.IsMulitRecords > 0 ) {
              element.InsertedData = [];
              this.productDynamicCategoriesMultiRecord.push(element);
            } else {
              element.InsertedData = [];
              this.productDynamicCategories.push(element);

            }
          });
        }
      });
    }
    getDynamicCategoriesForQuotation( id: number) {
      this.dynamicService.load(null, null , id , null , 2, null , null , 1 ).subscribe(res => {
      
        if (this.updateMode) {
          // mearge array and filter the columns
        } else {
          this.productDynamicCategories = res ;
        }
      });
    }
    FilterAndMeargeArray(firstArray: ProductDynmicCategory[]) {
      this.dynamicService.UpdateMode(this.documentForm.ID, null , this.documentForm.ProductId , 1 ).subscribe(res => {
        firstArray.forEach(element => {
          if (element.IsMulitRecords > 0 ) {

            element.InsertedData = this.filterColumnOnCategory(element.ID , res);
      this.productDynamicCategoriesMultiRecord.push(element);
          } else {
            element.InsertedData = [];
            element.Columns = this.filterColumnOnCategory(element.ID, res);
            this.productDynamicCategories.push(element);
          }
        });
      });

    }

    filterColumnOnCategory (categoryID: number , array: ProductDynamicColumn[]) {
      const returnArray = [];
      array.forEach(element => {
        if (element.ProductCategoryID === categoryID) {
          returnArray.push(element);
        }
      });
      return returnArray;
    }
    updateShare(share: Share) {
      this.seracrhService.search(share.CustomerId , null , null , null , null , null , null , 1 , null).subscribe(res => {
        this.customerUpdateForm = res[0];
        this.policyHolderUpdate.patchValue(res[0]);
      });
      console.log(share);
    }
    deleteShare(index: number) {
      console.log(index);
    }
    filterColumns (array: ProductDynamicColumn[]) {
      const returnArray = [];
      array.forEach(element => {
        if (element.ColumnType !== 4) {
          returnArray.push(element);
        }
      });
      return returnArray;
    }
    submit() {

      if (this.policyholderSearch.value &&  this.policyholderSearch.value.ID) {
        this.customer = new CustomerShare();
        this.customer.CustomerID = this.policyholderSearch.value.ID;
        this.customer.shareType = 1;
        this.share.customer.push(this.customer);
        this.customer = new CustomerShare();
        this.customer.CustomerID = this.policyholderSearch.value.ID;
        this.customer.shareType = 2;
        this.share.customer.push(this.customer);
      }
      if (this.beneficiarySearch.value &&  this.beneficiarySearch.value.ID) {
        this.customer = new CustomerShare();
        this.customer.CustomerID = this.beneficiarySearch.value.ID;
        this.customer.shareType = 2;
        this.share.customer.push(this.customer);
      }
      if (this.agentSearch.value &&  this.agentSearch.value.ID) {
        this.customer = new CustomerShare();
        this.customer.CustomerID = this.agentSearch.value.ID;
        this.customer.shareType = 3;
        this.share.customer.push(this.customer);
      }
      if (this.brokerSearch.value && this.brokerSearch.value.ID) {
        this.customer = new CustomerShare();
        this.customer.CustomerID = this.brokerSearch.value.ID;
        this.customer.shareType = 3;
        this.share.customer.push(this.customer);
      }
      if (this.salesPersonSearch.value && this.salesPersonSearch.value.ID) {
        this.customer = new CustomerShare();
        this.customer.CustomerID = this.salesPersonSearch.value.ID;
        this.customer.shareType = 3;
        this.share.customer.push(this.customer);
      }

      if(this.productDynamicCategories) {
      this.productDynamicCategories.forEach(element => {
        if (element.IsMulitRecords === 0) {
          element.ResultList = [ ...element.Columns, ...element.childsData];
        } else {
          if (element.Result === null) {
            element.Result = [[ ...element.Columns, ...element.childsData]];
          }
        }
      });
      if(this.productDynamicCategoriesMultiRecord.length > 0) {
        this.documentForm.DynamicCategories = [...this.productDynamicCategories , ...this.productDynamicCategoriesMultiRecord];
      } else {
        this.documentForm.DynamicCategories = this.productDynamicCategories;
      }

    }
      this.documentForm.StComId = this.userCompany.ID;
      this.documentForm.share = this.share;
      this.http.post('https://localhost:44322/api/Documents/Create' , this.documentForm).subscribe( res => {
        console.log(res);
        const status: any = res;
        if (status.ID) {
          this.http.get<Documents[]>('https://localhost:44322/api/Documents/Load?ID=' + status.ID).subscribe(doc => {
         this._documentService.changeColumn(doc[0]);
          this.wizard.navigationMode.goToStep(1);
          });
      }
      });

    }
}
