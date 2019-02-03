import { AlertifyService } from './../../../_services/alertify.service';
import { environment } from './../../../../environments/environment.prod';
import { ProductAttachment } from './../../../entities/Product/Attachment';
import { ProductAttachmentService } from './../../../_services/_products/productAttachment.service';
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
import { Product } from './../../../entities/Product/Products';
import { LockUp } from './../../../entities/organization/LockUp';
import { HttpClient } from '@angular/common/http';
import { Documents } from './../../../entities/production/Documents';
import { Component, OnInit, ViewChild, Inject, Input, Output, EventEmitter } from '@angular/core';
import { SidenavService } from './../../../_services/sidenav/sidenav.service';
import { BsDatepickerDirective } from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { WizardState } from 'angular-archwizard';

import * as _ from 'lodash';
import { MatOption } from '@angular/material';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {
  @ViewChild(BsDatepickerDirective) datepicker: BsDatepickerDirective;
  // tslint:disable-next-line: no-input-rename
  order: string = 'OrderID';
  sharesTableColumn = ['select', 'Share Type', 'Name', 'Customer No', 'Share Percent', 'Commission Percent', 'action'];
  attachmentTableColumn = ['select', 'ID',
    'Name', 'Is Received', 'Received Date', 'Attached Path', 'Remarks', 'action'];
  text: string;
  value: string;
  previewLink = '';
  hostUrl: string = environment.hostUrl;
  share: Share;
  attachmentForm: FormGroup;
  customerUpdateForm: Customer;
  policyHolderUpdate: FormControl = new FormControl();
  shares: Share[];
  updateMode = false;
  
  hasBeenSearched = false;
  next = false;
  customer: CustomerShare;
  currentCustomer: Customer;
  @ViewChild('allSelected') private allSelected: MatOption;
  icon = false;
  documentAttachments: DocumentAttachment[];
  hasValue = false;
  documentForm: Documents;
  businessTypes: LockUp[];
  accountedFor: LockUp[];
  distributionChannel: LockUp[];
  products: Product[];
  branches: CompanyBranch[];
  policyHolders: Customer[];
  customers: Customer[];
  agents: Customer[];
  brokers: Customer[];
  selectedFile: File;
  salesPersons: Customer[];
  policyholderSearch: FormControl = new FormControl();
  beneficiarySearch: FormControl = new FormControl();
  agentSearch: FormControl = new FormControl();
  brokerSearch: FormControl = new FormControl();
  salesPersonSearch: FormControl = new FormControl();
  newCustomer: Customer;
  beneficiaries: Customer[];
  currencies: Currency[];
  openCoverType: LockUp[];
  calculateBase: LockUp[];
  paymentType: LockUp[];
  user: any;
  selected = new FormControl(0);
  ProductAttachments: ProductAttachment[];
  orginalAttachments: ProductAttachment[];
  userCompany: any;
  status: LockUp[];
  newShare: Share;
  productDynamicCategories: ProductDynmicCategory[];
  productDynamicCategoriesMultiRecord: ProductDynmicCategory[];
  documentShareControl: FormControl = new FormControl('', [Validators.max(100), Validators.min(0)]);
  constructor(private sidenavService: SidenavService,
    private http: HttpClient, private route: ActivatedRoute,
    private seracrhService: SearchService,
    private dynamicService: DynamicService, @Inject(WizardState) private wizard: WizardState,
    private _documentService: DocumentService, private policyService: PolicyService,
    private shareService: SharesService, private attachmentService: PolicyAttachmentService,
    private fb: FormBuilder,
    private prodAttachmentService: ProductAttachmentService, private alert: AlertifyService) { }

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
    this.documentForm.ExpiryDate = new Date(this.documentForm.EffectiveDate.getFullYear() + 1,
      this.documentForm.EffectiveDate.getMonth(), this.documentForm.EffectiveDate.getDate() - 1);
    this.documentForm.FinancialDate = new Date();
    this.documentForm.FyrYear = new Date(this.documentForm.FinancialDate).getFullYear();
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
    this.createSubForm();

    this.productDynamicCategoriesMultiRecord = [];
    this.productDynamicCategories = [];
    this.policyHolderUpdate.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.seracrhService.search(null, null, term, null, null, null, null,
            1, this.customerUpdateForm.ShareType).subscribe(
              data => {
                if (data.length > 0) {
                  this.customers = data;
                  this.hasBeenSearched = true;
                } else {
                  this.hasBeenSearched = false;
                }

              });
        } else {
          this.hasBeenSearched = false;
        }
      });

    this.policyholderSearch.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.seracrhService.search(null, null, term, null, null, null, null, 1, 1).subscribe(
            data => {
              if (data.length > 0) {
                this.policyHolders = data;
                this.hasBeenSearched = true;
              } else {
                this.hasBeenSearched = false;
              }
            });
        } else {
          this.hasBeenSearched = false;
        }
      });

    this.beneficiarySearch.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.seracrhService.search(null, null, term, null, null, null, null, 1, 2).subscribe(
            data => {
              this.beneficiaries = data;
            });
        }
      });
    this.salesPersonSearch.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.seracrhService.search(null, null, term, null, null, null, null, 1, 5).subscribe(
            data => {
              this.salesPersons = data;
            });
        }
      });
    this.brokerSearch.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.seracrhService.search(null, null, term, null, null, null, null, 1, 4).subscribe(
            data => {
              this.brokers = data;
            });
        }
      });
    this.agentSearch.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.seracrhService.search(null, null, term, null, null, null, null, 1, 3).subscribe(
            data => {
              this.agents = data;
            });
        }
      });
    /*   this.http.get<Documents[]>('https://localhost:44322api/Documents/Load?ID='  + 201 ).subscribe(doc => {
        this.documentForm = doc[0];
        this.updateMode = true;
      this.updateDocumentMode(this.documentForm .ID , this.documentForm.ProductId);
      }); */

  }
  click() {
    this.icon = !this.icon;
  }
  toggleSidenav() {
    this.sidenavService.toggle();
  }

  updateDocumentMode(documentID: number, productID: number) {
    this.newShare = new Share();

    this.hasValue = true;

    this.updateMode = true;
    this.documentForm.UpdateMode = true;

    this.getDynamicFileds(productID);
    this.shareService.load(null, null, documentID, null, null, null, 1).subscribe(shares => {
      this.shares = shares;
      this.getCustomerDependsOnShareType();
    });
    this.attachmentService.load(null, documentID, null, null, null, this.documentForm.DocumentType, 1).subscribe(attachments => {
      this.documentAttachments = attachments;
    });
    this.attachmentService.loadFull(documentID, null, null, this.documentForm.DocumentType, 1).subscribe(attachments => {
      this.attachmentForm.controls.attachmetValues.patchValue(attachments);
      this.attachmentForm.controls.defaultSelect.patchValue(true);
    });


  }
  nextClick() {
    this.next = true;
    this.submit();
  }
  getCustomerDependsOnShareType() {
    this.shares.forEach(element => {
      this.seracrhService.search(element.CustomerId, null, null, null, null,
        null, null, 1, element.LocShareType).subscribe(res => {
          if (element.LocShareType === 1 || element.LocShareType === 2) {
            this.policyholderSearch.patchValue(res[0]);
            this.beneficiarySearch.patchValue(res[0]);
            this.FillCustomerData(false);
          }
          if (element.LocShareType === 3) {
            this.agentSearch.patchValue(res[0]);
          }
          if (element.LocShareType === 4) {
            this.brokerSearch.patchValue(res[0]);
          }
          if (element.LocShareType === 5) {
            this.salesPersonSearch.patchValue(res[0]);
          }
        });
    });

  }

  createSubForm() {

    this.attachmentForm = this.fb.group({
      attachments: new FormControl(''),
      DocumentID: new FormControl(''),
      CreatedBy: new FormControl(''),
      CreationDate: new FormControl(new Date()),
      RiskID: new FormControl(''),
      IsReceived: new FormControl(''),
      ReceivedDate: new FormControl(''),
      Remarks: new FormControl(''),
      ProductAttachmentID: new FormControl(''),
      ClaimID: new FormControl(''),
      Level: new FormControl(''),
      Type: new FormControl(''),
      File: new FormControl(''),
      attachmetValues: new FormControl(''),
      enableMultiSelect: new FormControl(false),
      defaultSelect: new FormControl(false),
    });
  }

  get f() {
    return this.attachmentForm.controls;
  }

  displayFn(customer?: Customer): string | undefined {
    return customer ? customer.CustomerNo + ' ' + customer.Name : undefined;
  }
  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.attachmentForm.controls.attachments.patchValue(this.attachmentForm.controls.attachmetValues.value);
    } else {
      this.attachmentForm.controls.attachments.patchValue([]);
    }
  }
  onFileChanged(event) {
 
    this.selectedFile = event.target.files[0];
    this.attachmentForm.controls.File.patchValue(this.selectedFile);
  }
  filterCurrency(currencies: Currency[]) {
    for (let i = 0; i < currencies.length; i++) {
      if (currencies[i].Code === this.userCompany.CurrencyCode) {
        this.documentForm.CurrencyCode = currencies[i].Code;
      }
    }
  }
  removeFile() {
    this.attachmentForm.controls.File.patchValue({});
  }
  AddAttachment() {

    if (this.allSelected.selected) {
      for (let x = 0; x < this.attachmentForm.controls.attachmetValues.value.length; x++) {
        const input = new FormData();
        if (this.documentForm.ID) {
          input.append('DocumentID', this.documentForm.ID.toString());
        } else {
          input.append('DocumentID', '');
        }
        if (this.documentForm.DocumentType === 1) {
          input.append('Type', 'Policy');
          input.append('Level', '1');
        }
        if (this.documentForm.DocumentType === 2) {
          input.append('Type', 'Quotation');
          input.append('Level', '2');
        }
        if (this.attachmentForm.controls.attachmetValues.value[x].ID) {
          input.append('ID', this.attachmentForm.controls.attachmetValues.value[x].ID.toString());
        }
        input.append('CreatedBy', this.documentForm.CreatedBy);
        input.append('ProductAttachmentID', this.attachmentForm.controls.attachmetValues.value[x].ProductAttachmentID.toString());
        input.append('File', this.attachmentForm.controls.File.value);
        input.append('Serial', '1');
        input.append('RiskID', '');
        if (this.selectedFile != null &&
          (this.attachmentForm.controls.IsReceived.value === ''  || this.attachmentForm.controls.IsReceived.value == null )) {
          input.append('IsReceived', 'true');
        } else if (this.attachmentForm.controls.IsReceived.value === ''  || this.attachmentForm.controls.IsReceived.value == null ) {
          input.append('IsReceived', 'false');
        } else {
          input.append('IsReceived', this.attachmentForm.controls.IsReceived.value.toString());
        }
       
        input.append('Remarks', this.attachmentForm.controls.Remarks.value ?  this.attachmentForm.controls.Remarks.value : '');

        // etc, etc
        this.http.post(this.hostUrl + 'api/Attachment/Create', input).subscribe(res => {

          if (x === this.attachmentForm.controls.attachmetValues.value.length - 1) {
            this.attachmentService.load(null, this.documentForm.ID, null, null, null, this.documentForm.DocumentType, 1)
              .subscribe(attachments => {
                this.documentAttachments = attachments;
                this.attachmentForm.controls.File.patchValue({});
              });
          }
        });

     
      }

    } else {
      for (let x = 0; x < this.attachmentForm.controls.attachments.value.length; x++) {
        const input = new FormData();
        if (this.documentForm.ID) {
          input.append('DocumentID', this.documentForm.ID.toString());
        } else {
          input.append('DocumentID', '');
        }
        if (this.documentForm.DocumentType === 1) {
          input.append('Type', 'Policy');
          input.append('Level', '1');
        }
        if (this.documentForm.DocumentType === 2) {
          input.append('Type', 'Quotation');
          input.append('Level', '2');
        }
        if (this.attachmentForm.controls.attachments.value[x].ID) {
          input.append('ID', this.attachmentForm.controls.attachments.value[x].ID.toString());
        }
        input.append('CreatedBy', this.documentForm.CreatedBy);
        input.append('ProductAttachmentID', this.attachmentForm.controls.attachments.value[x].ProductAttachmentID.toString());
        input.append('File', this.attachmentForm.controls.File.value);
        input.append('Serial', '1');
        input.append('RiskID', '');
        if (this.selectedFile != null &&
          (this.attachmentForm.controls.IsReceived.value === ''  || this.attachmentForm.controls.IsReceived.value == null )) {
          input.append('IsReceived', 'true');
        } else if (this.attachmentForm.controls.IsReceived.value === ''  || this.attachmentForm.controls.IsReceived.value == null ) {
          input.append('IsReceived', 'false');
        } else {
          input.append('IsReceived', this.attachmentForm.controls.IsReceived.value.toString());
        }
        input.append('Remarks', this.attachmentForm.controls.Remarks.value ?  this.attachmentForm.controls.Remarks.value : '');

        // etc, etc
        this.http.post(this.hostUrl + 'api/Attachment/Create', input).subscribe(res => {
          if (x === this.attachmentForm.controls.attachments.value.length - 1) {
            this.attachmentService.load(null, this.documentForm.ID, null, null, null, this.documentForm.DocumentType, 1)
              .subscribe(attachments => {
                this.documentAttachments = attachments;
                this.attachmentForm.controls.File.patchValue({});
              });
          }
        });

     
      }

    }
  }
  setDocumentShare(busType: number) {
    if (busType === 251) {
      this.documentForm.DocumentShare = 100;
      this.documentShareControl.disable();
    } else {
      this.documentForm.DocumentShare = 1;
      this.documentShareControl.enable();
    }
  }
  FillCustomerData(updateMode: boolean) {
    if (!updateMode) {
      this.hasBeenSearched = true;
      this.currentCustomer.Email = this.policyholderSearch.value.Email;
      this.currentCustomer.ReferenceNo = this.policyholderSearch.value.ReferenceNo;
      this.currentCustomer.Mobile = this.policyholderSearch.value.Mobile;
      this.currentCustomer.CustomerNo = this.policyholderSearch.value.CustomerNo;
      this.currentCustomer.ID = this.policyholderSearch.value.ID;
      this.currentCustomer.Name = this.policyholderSearch.value.Name;
      this.currentCustomer.CreatedBy = this.policyholderSearch.value.CreatedBy;
      this.currentCustomer.CompanyID = this.policyholderSearch.value.CompanyID;
      this.currentCustomer.CreationDate = this.policyholderSearch.value.CreationDate;
      this.currentCustomer.ID = this.policyholderSearch.value.ID;

    } else {
      this.hasBeenSearched = true;
      this.customerUpdateForm.Email = this.policyHolderUpdate.value.Email;
      this.customerUpdateForm.ReferenceNo = this.policyHolderUpdate.value.ReferenceNo;
      this.customerUpdateForm.Mobile = this.policyHolderUpdate.value.Mobile;
      this.customerUpdateForm.CustomerNo = this.policyHolderUpdate.value.CustomerNo;
      this.customerUpdateForm.Name = this.policyHolderUpdate.value.Name;
      this.customerUpdateForm.CreatedBy = this.policyHolderUpdate.value.CreatedBy;
      this.customerUpdateForm.CompanyID = this.policyHolderUpdate.value.CompanyID;
      this.customerUpdateForm.CreationDate = this.policyHolderUpdate.value.CreationDate;
      this.customerUpdateForm.ID = this.policyHolderUpdate.value.ID;
    }
  }
  SearchCustomerByEmail(email: string, updateMode: boolean) {
    if (!this.hasBeenSearched && (email !== undefined && email !== '')) {
      this.seracrhService.search(null, null, null, null, email, null, null, 1, 1).subscribe(
        data => {
          if (data.length > 0) {
            if (!updateMode) {
              this.currentCustomer = data[0];
              this.policyholderSearch.patchValue(this.currentCustomer);
            } else {
              const shareType = this.customerUpdateForm.ShareType;
              this.customerUpdateForm = data[0];
              this.customerUpdateForm.ShareType = shareType;
              this.policyHolderUpdate.patchValue(this.customerUpdateForm);
            }
            this.hasBeenSearched = true;
          } else {
            this.hasBeenSearched = false;
          }
          // console.log(data[0].BookName);
        });
    }
  }
  SearchCustomerByPhoneNumber(mobile: string, updateMode: boolean) {
    if (!this.hasBeenSearched && (mobile !== undefined && mobile !== '')) {
      this.seracrhService.search(null, null, null, null, null, mobile, null, 1, 1).subscribe(
        data => {
          if (data.length > 0) {
            if (!updateMode) {
              this.currentCustomer = data[0];
              this.policyholderSearch.patchValue(this.currentCustomer);
            } else {
              const shareType = this.customerUpdateForm.ShareType;
              this.customerUpdateForm = data[0];
              this.customerUpdateForm.ShareType = shareType;
              this.policyHolderUpdate.patchValue(this.customerUpdateForm);
            }
            this.hasBeenSearched = true;
          } else {
            this.hasBeenSearched = false;
          }
        });
    }
  }
  SearchCustomerReferenceNumber(nationalID: string, updateMode: boolean) {
    if (!this.hasBeenSearched && (nationalID !== undefined && nationalID !== '')) {
      this.seracrhService.search(null, null, null, null, null, null, nationalID, 1, 1).subscribe(
        data => {
          if (data.length > 0) {
            if (!updateMode) {
              this.currentCustomer = data[0];
              this.policyholderSearch.patchValue(this.currentCustomer);
            } else {
              const shareType = this.customerUpdateForm.ShareType;
              this.customerUpdateForm = data[0];
              this.customerUpdateForm.ShareType = shareType;
              this.policyHolderUpdate.patchValue(this.customerUpdateForm);
            }
            this.hasBeenSearched = true;
          } else {
            this.hasBeenSearched = false;
          }
        });
    }
  }
  getDynamicFileds(productID: number) {
    if (productID) {
      this.hasValue = true;
      if (this.documentForm.DocumentType === 1) {
        this.getDynamicCategoriesForPolicy(productID);
      } else if (this.documentForm.DocumentType === 2) {
        this.getDynamicCategoriesForQuotation(productID);
      }
    }
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

    this.documentForm.ExpiryDate = new Date(this.documentForm.ExpiryDate.getFullYear() + 1,
      this.documentForm.EffectiveDate.getMonth(), this.documentForm.EffectiveDate.getDate() - 1);
    this.documentForm.UwYear = new Date(this.documentForm.EffectiveDate).getFullYear();
  }
  changeFinancialDate($event: Date) {

    this.documentForm.IssueDate = $event;
    this.documentForm.FinancialDate = $event;
    this.documentForm.FyrYear = new Date(this.documentForm.FinancialDate).getFullYear();
  }
  getDynamicCategoriesForPolicy(id: number) {
    this.dynamicService.load(null, null, id, null, 1, null, null, 1).subscribe(res => {
      if (this.updateMode) {
        this.FilterAndMeargeArray(res);
      } else {
        res.forEach(element => {
          if (element.IsMulitRecords > 0) {
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
  getDynamicCategoriesForQuotation(id: number) {
    this.dynamicService.load(null, null, id, null, 2, null, null, 1).subscribe(res => {

      if (this.updateMode) {
        this.FilterAndMeargeArray(res);
      } else {
        res.forEach(element => {
          if (element.IsMulitRecords > 0) {
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
  FilterAndMeargeArray(firstArray: ProductDynmicCategory[]) {
    this.productDynamicCategories = [];
    this.productDynamicCategoriesMultiRecord = [];
    this.dynamicService.UpdateMode(this.documentForm.ID, null, this.documentForm.ProductId, 1).subscribe(res => {
      firstArray.forEach(element => {
        if (element.IsMulitRecords > 0) {

          element.InsertedData = this.filterColumnOnCategory(element.ID, res);
          this.productDynamicCategoriesMultiRecord.push(element);
        } else {
          element.InsertedData = [];
          element.Columns = this.filterColumnOnCategory(element.ID, res);
          this.productDynamicCategories.push(element);
        }
      });
    });

  }
  AddUpdateShare() {
    if (this.policyHolderUpdate.value.ID === undefined) {
      this.newShare.ID = null ;
      this.customerUpdateForm.Name = this.policyHolderUpdate.value;
      this.customerUpdateForm.CreatedBy = this.user.Name;
      this.currentCustomer.CreationDate = new Date();
    }
    this.customerUpdateForm.CompanyID = this.userCompany.ID;
    this.http.post(this.seracrhService.ApiUrl + 'Create', this.customerUpdateForm).subscribe(res => {
      const result: any = res;
      if (result.ID) {
        // check if has more than one beni and policy holder
        let countForPolicyHolder = 0;
        let countForBen = 0;
        this.shares.forEach(element => {
          if (element.LocShareType === 1) {
            countForPolicyHolder++;
          }
          if (element.LocShareType === 2) {
            countForBen++;
          }
        });
        if (((countForBen <= 1 || countForPolicyHolder <= 1) && this.policyHolderUpdate.value.ID !== undefined ) &&
            (this.customerUpdateForm.ShareType !== 1 &&    this.customerUpdateForm.ShareType !== 2) ) {
          this.alert.error('You can not change  beneificary type when document only contain only one ');
        } else {
          this.InsertLoadShare(result.ID);
        }


      }
    });

  }
  InsertLoadShare(customerID: number) {
    this.newShare.LocShareType = this.customerUpdateForm.ShareType;
    this.newShare.CustomerId = customerID;
    this.newShare.DocumentID = this.documentForm.ID;
    this.newShare.CreatedBy = this.user.Name;
    this.newShare.CreationDate = new Date();
    this.http.post(this.shareService.ApiUrl + 'Create', this.newShare).subscribe(shareResult => {
      console.log(shareResult);
      this.shareService.load(null, null, this.documentForm.ID, null, null, null, 1).subscribe(shares => {
        this.shares = shares;
        this.getCustomerDependsOnShareType();
      });
    });
  }
  filterColumnOnCategory(categoryID: number, array: ProductDynamicColumn[]) {
    const returnArray = [];
    array.forEach(element => {
      if (element.ProductCategoryID === categoryID) {
        returnArray.push(element);
      }
    });
    return returnArray;
  }
  updateShare(share: Share) {
    this.newShare.ID = share.ID;
    this.seracrhService.search(share.CustomerId, null, null, null, null, null, null, 1, share.LocShareType).subscribe(res => {
      this.customerUpdateForm = res[0];
      this.policyHolderUpdate.patchValue(res[0]);
      this.customerUpdateForm.ShareType = share.LocShareType;
    });
    console.log(share);
  }
  updateAttachment(attachment: DocumentAttachment) {
    this.selectedFile = null ;
    this.f.File.patchValue({});
    this.attachmentForm.controls.Remarks.patchValue(attachment.Remarks);
    this.attachmentForm.controls.IsReceived.patchValue(attachment.IsReceived);
    this.attachmentForm.controls.attachmetValues.value.forEach(element => {
      if (element.ProductAttachmentID === attachment.ProductAttachmentID) {
        this.attachmentForm.controls.attachments.patchValue([element]);
      }
    });
    this.previewLink = this.hostUrl + attachment.AttachedPath;
  }
  deleteAttachment(index: number) {
    console.log(index);
  }
  deleteShare(index: number) {
    console.log(index);
  }
  filterColumns(array: ProductDynamicColumn[]) {
    const returnArray = [];
    array.forEach(element => {
      if (element.ColumnType !== 4) {
        returnArray.push(element);
      }
    });
    return returnArray;
  }
  submit() {
    if (this.policyholderSearch.value.ID === undefined) {
      this.newCustomer = new Customer();
      this.newCustomer = this.currentCustomer;
      this.newCustomer.Name = this.policyholderSearch.value;
      this.newCustomer.AddUpdate = true;

    }
    if (this.policyholderSearch.value.ID !== undefined) {
      this.customer = new CustomerShare();
      this.customer.CustomerID = this.policyholderSearch.value.ID;
      this.customer.shareType = 1;
      this.share.customer.push(this.customer);
      this.customer = new CustomerShare();
      this.customer.CustomerID = this.policyholderSearch.value.ID;
      this.customer.shareType = 2;
      this.share.customer.push(this.customer);
    }

    if (this.agentSearch.value && this.agentSearch.value.ID) {
      this.customer = new CustomerShare();
      this.customer.CustomerID = this.agentSearch.value.ID;
      this.customer.shareType = 3;
      this.share.customer.push(this.customer);
    }
    if (this.brokerSearch.value && this.brokerSearch.value.ID) {
      this.customer = new CustomerShare();
      this.customer.CustomerID = this.brokerSearch.value.ID;
      this.customer.shareType = 4;
      this.share.customer.push(this.customer);
    }
    if (this.salesPersonSearch.value && this.salesPersonSearch.value.ID) {
      this.customer = new CustomerShare();
      this.customer.CustomerID = this.salesPersonSearch.value.ID;
      this.customer.shareType = 5;
      this.share.customer.push(this.customer);
    }

    if (this.productDynamicCategories) {
      this.productDynamicCategories.forEach(element => {
        if (element.IsMulitRecords === 0) {
          element.ResultList = [...element.Columns, ...element.childsData];
        } else {
          if (element.Result === null) {
            element.Result = [[...element.Columns, ...element.childsData]];
          }
        }
      });
      if (this.productDynamicCategoriesMultiRecord.length > 0) {
        this.documentForm.DynamicCategories = [...this.productDynamicCategories, ...this.productDynamicCategoriesMultiRecord];
      } else {
        this.documentForm.DynamicCategories = this.productDynamicCategories;
      }

    }
    this.documentForm.StComId = this.userCompany.ID;
    if (!this.updateMode) {
      this.documentForm.share = this.share;
    } else {
      this.share.customer = [];
      this.shares.forEach(element => {
        this.customer = new CustomerShare();
        this.customer.CustomerID = element.CustomerId;
        this.customer.shareType = element.LocShareType;
        this.customer.Commision = element.Percent;
        this.customer.ShareID = element.ID;
        this.share.customer.push(this.customer);
      });
      this.share.CreatedBy = this.user.Name;
      this.documentForm.share = this.share;
      this.documentForm.UpdateMode = true;
    }

    if (this.newCustomer !== undefined && this.newCustomer.AddUpdate === true) {
      this.documentForm.NewCustomer = this.newCustomer;
      this.documentForm.NewCustomer.CreatedBy = this.user.Name;
      this.documentForm.NewCustomer.CreationDate = new Date();
      this.documentForm.NewCustomer.CompanyID = this.userCompany.ID;
    } else {
      this.documentForm.NewCustomer = new Customer();
      this.documentForm.NewCustomer.ModifiedBy = this.user.Name;
      this.documentForm.NewCustomer.ModificationDate = new Date();
      this.documentForm.NewCustomer = this.currentCustomer;

    }
    if (this.updateMode) {
      this.documentForm.UpdateMode = true;
    }

    this.http.post(this.hostUrl + 'api/Documents/Create', this.documentForm).subscribe(res => {
      console.log(res);
      const status: any = res;
      if (status.ID) {
        this.http.get<Documents[]>(this.hostUrl +'api/Documents/Load?ID=' + status.ID).subscribe(doc => {
          this.documentForm = doc[0];
          this.updateMode = true;
          this.updateDocumentMode(this.documentForm.ID, this.documentForm.ProductId);
        if (this.next) {
           this._documentService.changeColumn(doc[0]);
          this.wizard.navigationMode.goToStep(1); }
        });
      }
    });

  }
}
