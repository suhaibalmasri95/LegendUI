import { ProductsDetailService } from './../../../../_services/_setup/ProductsDetail.service';
import { ProductDynmicCategory } from './../../../../entities/Dynamic/ProductDynmicCategory';
import { Documents } from './../../../../entities/production/Documents';
import { DocumentService } from './../../../../_services/DocumentService.service';
import { DynamicService } from './../../../../_services/_dynamic/Dynamic.service';
import { ProductSubjectTypes } from './../../../../_services/_setup/ProductSubjectTypes.service';
import { ProductsDetail, ProductSubjectType } from './../../../../entities/Product/Products';
import { Risk } from './../../../../entities/production/Risk';
import { Component, OnInit, Input, OnChanges, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { WizardState } from 'angular-archwizard';

@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.css']
})
export class RiskComponent implements OnInit , OnChanges {
  // tslint:disable-next-line:no-input-rename
  document: Documents;
  riskForm: Risk;
  risks: Risk[];
  RiskTableColumns = ['select', 'ProductDetail', 'SubjectType', 'Name', 'EffectiveDate', 'ExpiryDate', 'ParentRisk', 'actions'];
  RiskDataSource: MatTableDataSource<Risk>;
  selection: SelectionModel<Risk>;
  user: any;
  isLessThan: boolean;
  productDynamicCategoriesRisk: ProductDynmicCategory[];
  userCompany: any;
  productDetails: ProductsDetail[];
  productDetail: ProductsDetail;
  productDetailsSubjectTypes: ProductSubjectType[];
  constructor(private http: HttpClient , private productSubjectTypeService: ProductSubjectTypes
    , private dynamicService: DynamicService ,
    private productDetailService: ProductsDetailService , private _docService: DocumentService,
      @Inject(WizardState) private wizard: WizardState, ) { }

  ngOnInit() {
    this._docService.currentDocument.subscribe(d =>{
      this.document = d;
    });
    this.isLessThan = false;
    this.riskForm = new Risk();
    this.productDetail  = new ProductsDetail();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.risks = [];
    this.riskForm.CreatedBy = this.user.Name;
    const initialSelection = [];
    this.selection = new SelectionModel<Risk>(true, initialSelection);
    this.riskForm.EffectiveDate = new Date();
    this.riskForm.UwDocumentID = this.document.ID;
    this.document.EffectiveDate = new Date(this.document.EffectiveDate);
    this.riskForm.ExpiryDate = new Date(this.document.EffectiveDate.getFullYear() + 1 ,
     this.document.EffectiveDate.getMonth(), this.document.EffectiveDate.getDate() - 1);
    this.getProductDetails(this.document.ProductId);
  }

  ngOnChanges() {
    this._docService.currentDocument.subscribe(d =>{
      this.document = d;
    });
    // create header using child_id
    this.isLessThan = false;
    this.riskForm = new Risk();
    this.productDetail = new ProductsDetail();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.risks = [];
    this.riskForm.CreatedBy = this.user.Name;
    const initialSelection = [];
    this.selection = new SelectionModel<Risk>(true, initialSelection);
    this.riskForm.EffectiveDate = new Date();
    this.riskForm.UwDocumentID = this.document.ID;
    this.document.EffectiveDate = new Date(this.document.EffectiveDate);
    this.riskForm.ExpiryDate = new Date(this.document.EffectiveDate.getFullYear() + 1 ,
     this.document.EffectiveDate.getMonth(), this.document.EffectiveDate.getDate() - 1);
    this.getProductDetails(this.document.ProductId);
  }
  renderTable(data) {
    this.risks = data;
    this.RiskDataSource = new MatTableDataSource<Risk>(data);
    this.selection = new SelectionModel<Risk>(true, []);
  }

  updateRisk(risk: Risk , index: number) {
    this.riskForm = new Risk;
    this.riskForm = risk;
    this.riskForm.index = index;
    this.riskForm.selected = true;
  }

  addRisk(risk: Risk) {
    if (risk.selected) {
      this.risks[risk.index] = risk;
      this.renderTable(this.risks);
    } else {
      this.productDynamicCategoriesRisk.forEach(element => {
        if (element.IsMulitRecords === 0) {
          element.ResultList = [...element.OriginalList , ...element.Columns];
        } else {
          if (element.Result === undefined) {
            element.Result = [];
          }
        }
      });
      risk.DynamicCategory = this.productDynamicCategoriesRisk;
      this.risks.push(risk);
      this.renderTable(this.risks);
    }
    this.riskForm = new Risk();
  }

  deleteRisk(index: number) {
   this.risks.splice(index , 1);
  }

  getProductDetailSubjectType(productDetailID: number) {
    for ( let i = 0; i < this.productDetails.length; i++) {
      if (this.productDetails[i].ID === productDetailID) {
        this.productDetail  = this.productDetails[i];
      }
      this.getDynamicCategoriesForRisk(this.document.ProductId, productDetailID);
    }
    this.productSubjectTypeService.load(null,  this.productDetail.ProductID ,
      this.productDetail.ID , 1).subscribe( res => {
      this.productDetailsSubjectTypes = res;
    });

  }

  CheckIfLessThan($event: Date) {
    this.riskForm.EffectiveDate = new Date($event);
    if (this.riskForm.EffectiveDate < this.document.EffectiveDate) {
      this.isLessThan = true;
    } else {
      this. isLessThan = false;
    }
  }

  calculateSumInsuredLc(sumInusred: number , exrate: number) {
    this.riskForm.SuminsuredLC = sumInusred * exrate;
    }

    getDynamicCategoriesForRisk( productID: number , productDetailID: number) {
      this.dynamicService.load(null, null , productID , productDetailID , 3, null , null , 1 ).subscribe(res => {
        this.productDynamicCategoriesRisk = res ;
      });
    }
    getProductDetails(productID: number) {
  this.productDetailService.load( null , productID , 1 ).subscribe(res => {
  this.productDetails = res;
  });
    }

    submit() {
      this.http.post('https://localhost:44322/api/Risk/Create' , { Risks: this.risks} ).subscribe( res => {
        console.log(res);
        const status: any = res;
        if (status.ID) {
          this.http.get<Documents[]>('https://localhost:44322/api/Documents/Load?ID=' + status.ID).subscribe(doc => {
          this.wizard.navigationMode.goToStep(2);
          });
      }
      });

    }

}
