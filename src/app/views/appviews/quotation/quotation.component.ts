import { Product, ProductsDetail, ProductSubjectType } from './../../../entities/Product/Products';
import { ProductDynmicCategory } from './../../../entities/Dynamic/ProductDynmicCategory';
import { DynamicService } from './../../../_services/_dynamic/Dynamic.service';
import { ProductSubjectTypes } from './../../../_services/_setup/ProductSubjectTypes.service';
import { Risk } from './../../../entities/production/Risk';
import { ProductsDetailService } from './../../../_services/_setup/ProductsDetail.service';
import { Currency } from './../../../entities/organization/Currency';
import { SearchService } from './../../../_services/search.service';
import { Customer } from './../../../entities/Financial/Customer';
import { CompanyBranch } from './../../../entities/organization/CompanyBranch';
import { LockUp } from './../../../entities/organization/LockUp';
import { HttpClient } from '@angular/common/http';
import { Documents } from './../../../entities/production/Documents';
import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { SidenavService } from './../../../_services/sidenav/sidenav.service';
import { BsDatepickerDirective } from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {
  @ViewChild(BsDatepickerDirective) datepicker: BsDatepickerDirective;
  text: string;
  value: string;
  icon = false;
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
  userCompany: any;
  status: LockUp[];
  productDynamicCategories: ProductDynmicCategory[];
  productDetails: ProductsDetail[];
  productDetailsSubjectTypes: ProductSubjectType[];
  isLessThan: boolean;
  riskForm: Risk;
  documentShareControl: FormControl = new FormControl('', [Validators.max(100), Validators.min(0)]);
  // @HostListener('window:scroll')
  /*onScrollEvent() {
    this.datepicker.hide();
  }*/
  constructor(private sidenavService: SidenavService,
    private http: HttpClient, private route: ActivatedRoute,
    private seracrhService: SearchService, private productDetailService: ProductsDetailService,
    private productSubjectTypeService: ProductSubjectTypes, private dynamicService: DynamicService) { }

  ngOnInit() {
    this.text = 'test';
    this.value = 'test';
    this.documentForm = new Documents();
    this.riskForm = new Risk();
    this.riskForm.productDetails = new ProductsDetail();
    this.riskForm.productSubjectType = new ProductSubjectType();
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
    this.isLessThan = false;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.documentForm.CreatedBy = this.user.Name;
    // this.documentForm.ModifiedBy = this.user.Name;
    this.documentForm.CreationDate = new Date();
    // this.documentForm.ModificationDate = new Date();

    this.riskForm.CreatedBy = this.user.Name;
    // this.documentForm.ModifiedBy = this.user.Name;
    this.riskForm.CreationDate = new Date();

    this.documentForm.StatusDate = new Date();
    this.documentForm.IssueDate = new Date();
    this.documentForm.EffectiveDate = new Date();

    this.documentForm.ExpiryDate = new Date(this.documentForm.EffectiveDate.getFullYear() + 1,
      this.documentForm.EffectiveDate.getMonth(), this.documentForm.EffectiveDate.getDate() - 1);
    this.riskForm.EffectiveDate = new Date();

    this.riskForm.ExpiryDate = new Date(this.documentForm.EffectiveDate.getFullYear() + 1,
      this.documentForm.EffectiveDate.getMonth(), this.documentForm.EffectiveDate.getDate() - 1); // plus 1 year -  day
    this.documentForm.FinancialDate = new Date();
    this.documentForm.FyrYear = new Date(this.documentForm.FinancialDate).getFullYear();
    this.documentForm.Status = 1;
    this.documentForm.CalcBases = 1;
    this.documentForm.PaymentId = 1;
    this.userCompany = JSON.parse(localStorage.getItem('company'));
    this.filterCurrency(this.currencies);
    this.documentForm.LocDistChnales = 1;
    this.documentShareControl.disable();
    this.documentForm.DocumentShare = 100;
    this.documentForm.Exrate = 1;
    this.policyholderSearch.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.seracrhService.search(term, null, 1, 1).subscribe(
            data => {
              this.policyHolders = data;
              // console.log(data[0].BookName);
            });
        }
      });

    this.beneficiarySearch.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.seracrhService.search(term, null, 1, 2).subscribe(
            data => {
              this.beneficiaries = data;
              // console.log(data[0].BookName);
            });
        }
      });
    this.salesPersonSearch.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.seracrhService.search(term, null, 1, 3).subscribe(
            data => {
              this.salesPersons = data;
              // console.log(data[0].BookName);
            });
        }
      });
    this.brokerSearch.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.seracrhService.search(term, null, 1, 5).subscribe(
            data => {
              this.brokers = data;
              // console.log(data[0].BookName);
            });
        }
      });
    this.agentSearch.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.seracrhService.search(term, null, 1, 4).subscribe(
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
  getProductDetails(productID: number) {
    if (this.documentForm.DocumentType === 1) {
      this.getDynamicCategoriesForPolicy(productID);
    } else if (this.documentForm.DocumentType === 1) {
      this.getDynamicCategoriesForQuotation(productID);
    }
    this.productDetailService.load(null, productID, 1).subscribe(res => {
      this.productDetails = res;
    });
  }
  getProductDetailSubjectType(productDetailID: number) {
    for (let i = 0; i < this.productDetails.length; i++) {
      if (this.productDetails[i].ID === productDetailID) {
        this.riskForm.productDetails = this.productDetails[i];
      }
    }
    this.productSubjectTypeService.load(null, this.riskForm.productDetails.ProductID,
      this.riskForm.productDetails.ID, 1).subscribe(res => {
        this.productDetailsSubjectTypes = res;
      });

  }
  filterCurrency(currencies: Currency[]) {
    for (let i = 0; i < currencies.length; i++) {
      if (currencies[i].Code === this.userCompany.CurrencyCode) {
        this.documentForm.CurrencyCode = currencies[i].Code;
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

  changeUwYear($event: Date) {

    this.documentForm.EffectiveDate = $event;
    this.documentForm.ExpiryDate = new Date(this.documentForm.EffectiveDate.getFullYear() + 1,
      this.documentForm.EffectiveDate.getMonth(), this.documentForm.EffectiveDate.getDate() - 1);
    this.documentForm.UwYear = new Date(this.documentForm.EffectiveDate).getFullYear();
  }
  changeFinancialDate($event: Date) {

    this.documentForm.IssueDate = $event;
    this.documentForm.FinancialDate = $event;
    this.documentForm.FyrYear = new Date(this.documentForm.FinancialDate).getFullYear();
  }
  CheckIfLessThan($event: Date) {
    this.riskForm.EffectiveDate = new Date($event);
    if (this.riskForm.EffectiveDate < this.documentForm.EffectiveDate) {
      this.isLessThan = true;
    } else {
      this.isLessThan = false;
    }
  }
  calculateSumInsuredLc(sumInusred: number, exrate: number) {
    this.riskForm.SuminsuredLC = sumInusred * exrate;
  }
  getDynamicCategoriesForPolicy(id: number) {
    this.dynamicService.load(null, null, id, null, 1, null, null, 1).subscribe(res => {
      this.productDynamicCategories = res;
    });
  }
  getDynamicCategoriesForQuotation(id: number) {
    this.dynamicService.load(null, null, id, null, 2, null, null, 1).subscribe(res => {
      this.productDynamicCategories = res;
    });
  }
  getDynamicCategoriesForRisk(id: number) {

  }
}
