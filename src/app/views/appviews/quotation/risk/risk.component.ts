import { environment } from './../../../../../environments/environment.prod';
import { ProductDynamicColumn } from './../../../../entities/Dynamic/ProductDynamicColumn';
import { PolicyAttachmentService } from './../../../../_services/_production/policyAttachment.service';
import { DocumentAttachment } from './../../../../entities/production/DocumentAttachment';
import { ProductsDetailService } from './../../../../_services/_setup/ProductsDetail.service';
import { ProductDynmicCategory } from './../../../../entities/Dynamic/ProductDynmicCategory';
import { Documents } from './../../../../entities/production/Documents';
import { DynamicService } from './../../../../_services/_dynamic/Dynamic.service';
import { ProductSubjectTypes } from './../../../../_services/_setup/ProductSubjectTypes.service';
import { ProductsDetail, ProductSubjectType } from './../../../../entities/Product/Products';
import { Risk } from './../../../../entities/production/Risk';
import { Component, OnInit, Input, OnChanges, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatOption } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { WizardState } from 'angular-archwizard';
import * as _ from 'lodash';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-risk',
  templateUrl: './risk.component.html',
  styleUrls: ['./risk.component.css']
})
export class RiskComponent implements OnChanges, OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('document') document: Documents;
  riskForm: Risk;
  risks: Risk[];
  RiskTableColumns = ['select', 'ProductDetail', 'SubjectType', 'Name', 'EffectiveDate', 'ExpiryDate', 'ParentRisk', 'actions'];
  attachmentTableColumn = ['select', 'ID',
    'Name', 'Is Received', 'Received Date', 'Attached Path', 'Remarks', 'action'];
  RiskDataSource: MatTableDataSource<Risk>;
  selection: SelectionModel<Risk>;
  user: any;
  updateMode = false;
  attachmentForm: FormGroup;
  documentAttachments: DocumentAttachment[] = [];
  @ViewChild('allSelected') private allSelected: MatOption;
  previewLink = '';
  hostUrl: string = environment.hostUrl;
  isLessThan: boolean;
  selectedFile: File;
  selected = new FormControl(0);
  order: string = 'OrderID';
  next = false;
  hasValue = false;
  originalDynamicCategories: ProductDynmicCategory[];
  originalDynamicCategoriesMulti: ProductDynmicCategory[];
  productDynamicCategories: ProductDynmicCategory[] = [];
  productDynamicCategoriesMultiRecord: ProductDynmicCategory[] = [];
  userCompany: any;
  productDetails: ProductsDetail[];
  productDetail: ProductsDetail;
  productDetailsSubjectTypes: ProductSubjectType[];
  constructor(private http: HttpClient, private productSubjectTypeService: ProductSubjectTypes
    , private dynamicService: DynamicService,
    private productDetailService: ProductsDetailService,
    @Inject(WizardState) private wizard: WizardState, private attachmentService: PolicyAttachmentService,
    private fb: FormBuilder) { }

  ngOnInit() {
/*     this.risks = [];
    this.document = new Documents();
    this.riskForm = new Risk();
      this.http.get<Documents[]>(this.hostUrl+'api/Documents/Load?ID='  + 201 ).subscribe(doc => {
       this.document = doc[0];
       this.reInit(this.riskForm);
       this.updateMode = true;
     }); 
    this.http.get<Risk[]>(this.hostUrl+'api/Risk/Load?ID=' + 47).subscribe(doc => {
      this.risks = doc;
      this.renderTable(this.risks);
      //this.reInit(this.riskForm);
      this.riskForm = doc[0];
     // this.updateModeForRisk();
    
      // create header using child_id
    
      //this.reInit(this.riskForm);
      this.createSubForm(); 
      // this.wizard.navigationMode.goToStep(2);
    }); */ 
  }
  updateModeForRisk() {


    this.hasValue = true;

    this.updateMode = true;
    this.riskForm.UpdateMode = true;

    this.getDynamicCategoriesForRisk(this.riskForm.ProductID, this.riskForm.ProductDetailID);

    this.attachmentService.load(null, null, this.riskForm.ID, null, null, 3, 1).subscribe(attachments => {
      this.documentAttachments = attachments;
    });
    this.attachmentService.loadFull(null, this.riskForm.ID, null, 3, 1).subscribe(attachments => {
      this.attachmentForm.controls.attachmetValues.patchValue(attachments);
      this.attachmentForm.controls.defaultSelect.patchValue(true);
    });


  }
  nextClick() {
    this.next = true;
    this.submit();
  }

  ngOnChanges() {
     this.risks = [];
    // create header using child_id
    this.riskForm = new Risk();
    this.reInit(this.riskForm);
    this.createSubForm();  
  }

  reInit(riskForm: Risk) {
    this.isLessThan = false;
    this.productDetail = new ProductsDetail();
    this.user = JSON.parse(localStorage.getItem('user'));
    riskForm.CreatedBy = this.user.Name;
    const initialSelection = [];
    this.selection = new SelectionModel<Risk>(true, initialSelection);
    riskForm.EffectiveDate = new Date();
    riskForm.UwDocumentID = this.document.ID;
    this.document.EffectiveDate = new Date(this.document.EffectiveDate);
    riskForm.ExpiryDate = new Date(this.document.EffectiveDate.getFullYear() + 1,
      this.document.EffectiveDate.getMonth(), this.document.EffectiveDate.getDate() - 1);
    this.getProductDetails(this.document.ProductId);
  }
  updateAttachment(attachment: DocumentAttachment) {
    this.selectedFile = null;
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
  renderTable(data) {
    this.risks = data;
    this.RiskDataSource = new MatTableDataSource<Risk>(data);
    this.selection = new SelectionModel<Risk>(true, []);
  }

  updateRisk(risk: Risk, index: number) {
    this.riskForm = new Risk;
    if(risk.ID){
      this.updateMode = true;
      this.updateModeForRisk();
    }
    this.riskForm = risk;
    this.riskForm.index = index;
    this.riskForm.selected = true;
    this.riskForm.DynamicCategory.forEach(element => {
      if(element.IsMulitRecords ===1) {
        this.productDynamicCategoriesMultiRecord = [];
       
        this.productDynamicCategoriesMultiRecord.push(element);
      } else{
        this.productDynamicCategories = [];
        this.productDynamicCategories.push(element);
      }
    });

  }
  updateSelectedRisk() {
  
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
        this.riskForm.DynamicCategory = [...this.productDynamicCategories, ...this.productDynamicCategoriesMultiRecord];
      } else {
        this.riskForm.DynamicCategory = this.productDynamicCategories;
      }

    }
    
    this.productDynamicCategories = [];
    this.riskForm.UpdateMode = true;
    //this.productDynamicCategories = _.cloneDeep(this.originalDynamicCategories);
    this.productDynamicCategoriesMultiRecord = [];
    //this.productDynamicCategoriesMultiRecord = _.cloneDeep(this.originalDynamicCategoriesMulti);
    this.risks.push(this.riskForm);
    this.riskForm = new Risk();
  }
  
  addRisk(risk: Risk) {
    if (risk.selected) {
      this.risks[risk.index] = risk;
      this.renderTable(this.risks);
    } else {
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
          risk.DynamicCategory = [...this.productDynamicCategories, ...this.productDynamicCategoriesMultiRecord];
        } else {
          risk.DynamicCategory = this.productDynamicCategories;
        }

      }
      this.productDynamicCategories = [];
     // this.productDynamicCategories = _.cloneDeep(this.originalDynamicCategories);
      this.productDynamicCategoriesMultiRecord = [];
     // this.productDynamicCategoriesMultiRecord = _.cloneDeep(this.originalDynamicCategoriesMulti);
      this.risks.push(this.riskForm);
      this.renderTable(this.risks);
      this.riskForm = new Risk();
     // this.submit();

    }
  }

  deleteRisk(index: number) {
    this.risks.splice(index, 1);
  }

  getProductDetailSubjectType(productDetailID: number) {
    for (let i = 0; i < this.productDetails.length; i++) {
      if (this.productDetails[i].ID === productDetailID) {
        this.productDetail = this.productDetails[i];
      }
      
    }
    this.getDynamicCategoriesForRisk(this.document.ProductId, productDetailID);
    this.productSubjectTypeService.load(null, this.productDetail.ProductID,
      this.productDetail.ID, 1).subscribe(res => {
        this.productDetailsSubjectTypes = res;
      });

  }

  CheckIfLessThan($event: Date) {
    this.riskForm.EffectiveDate = new Date($event);
    if (this.riskForm.EffectiveDate < this.document.EffectiveDate) {
      this.isLessThan = true;
    } else {
      this.isLessThan = false;
    }
  }

  calculateSumInsuredLc(sumInusred: number, exrate: number) {
    this.riskForm.SuminsuredLC = sumInusred * exrate;
  }

  getDynamicCategoriesForRisk(productID: number, productDetailID: number) {
    this.hasValue = true;
    this.dynamicService.load(null, null, productID, productDetailID, 3, null, null, 1).subscribe(res => {
      this.productDynamicCategories = [];
      this.productDynamicCategoriesMultiRecord = [];
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
      this.originalDynamicCategories = _.cloneDeep(this.productDynamicCategories);
      this.originalDynamicCategoriesMulti = _.cloneDeep(this.productDynamicCategoriesMultiRecord);
    });
  }
  getProductDetails(productID: number) {
    this.productDetailService.load(null, productID, 1).subscribe(res => {
      this.productDetails = res;
    });
  }
  FilterAndMeargeArray(firstArray: ProductDynmicCategory[]) {
    this.productDynamicCategories = [];
    this.productDynamicCategoriesMultiRecord = [];
    this.dynamicService.UpdateMode(null, this.riskForm.ID, null, this.riskForm.ProductDetailID).subscribe(res => {
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
  filterColumnOnCategory(categoryID: number, array: ProductDynamicColumn[]) {
    const returnArray = [];
    array.forEach(element => {
      if (element.ProductCategoryID === categoryID) {
        returnArray.push(element);
      }
    });
    return returnArray;
  }
  removeFile() {
    this.attachmentForm.controls.File.patchValue({});
  }
  AddAttachment() {

    if (this.allSelected.selected) {
      for (let x = 0; x < this.attachmentForm.controls.attachmetValues.value.length; x++) {
        const input = new FormData();
        if (this.riskForm.ID) {
          input.append('RiskID', this.riskForm.ID.toString());
        } else {
          input.append('RiskID', '');
        }
        input.append('Type', 'Risk');
        input.append('Level', '3');
        if (this.attachmentForm.controls.attachmetValues.value[x].ID) {
          input.append('ID', this.attachmentForm.controls.attachmetValues.value[x].ID.toString());
        }
        input.append('CreatedBy', this.riskForm.CreatedBy);
        input.append('ProductAttachmentID', this.attachmentForm.controls.attachmetValues.value[x].ProductAttachmentID.toString());
        input.append('File', this.attachmentForm.controls.File.value);
        input.append('Serial', '1');

        if (this.selectedFile != null &&
          (this.attachmentForm.controls.IsReceived.value === '' || this.attachmentForm.controls.IsReceived.value == null)) {
          input.append('IsReceived', 'true');
        } else if (this.attachmentForm.controls.IsReceived.value === '' || this.attachmentForm.controls.IsReceived.value == null) {
          input.append('IsReceived', 'false');
        } else {
          input.append('IsReceived', this.attachmentForm.controls.IsReceived.value.toString());
        }
        input.append('Remarks', this.attachmentForm.controls.Remarks.value ? this.attachmentForm.controls.Remarks.value : '');
        // etc, etc
        this.http.post( this.hostUrl + 'api/Attachment/Create', input).subscribe(res => {
        });

        if (x === this.attachmentForm.controls.attachmetValues.value.length - 1) {
          this.attachmentService.load(null, null, this.riskForm.ID, null, null, 3, 1)
            .subscribe(attachments => {
              this.documentAttachments = attachments;
            });
        }
      }

    } else {
      for (let x = 0; x < this.attachmentForm.controls.attachments.value.length; x++) {
        const input = new FormData();
        if (this.riskForm.ID) {
          input.append('RiskID', this.riskForm.ID.toString());
        } else {
          input.append('RiskID', '');
        }
        input.append('Type', 'Risk');
        input.append('Level', '3');
        if (this.attachmentForm.controls.attachments.value[x].ID) {
          input.append('ID', this.attachmentForm.controls.attachments.value[x].ID.toString());
        }
        input.append('CreatedBy', this.riskForm.CreatedBy);
        input.append('ProductAttachmentID', this.attachmentForm.controls.attachments.value[x].ProductAttachmentID.toString());
        input.append('File', this.attachmentForm.controls.File.value);
        input.append('Serial', '1');
        input.append('RiskID', '');
        if (this.selectedFile != null &&
          (this.attachmentForm.controls.IsReceived.value === '' || this.attachmentForm.controls.IsReceived.value == null)) {
          input.append('IsReceived', 'true');
        } else if (this.attachmentForm.controls.IsReceived.value === '' || this.attachmentForm.controls.IsReceived.value == null) {
          input.append('IsReceived', 'false');
        } else {
          input.append('IsReceived', this.attachmentForm.controls.IsReceived.value.toString());
        }

        input.append('Remarks', this.attachmentForm.controls.Remarks.value ? this.attachmentForm.controls.Remarks.value : '');


        // etc, etc
        this.http.post('https://localhost:44322/api/Attachment/Create', input).subscribe(res => {
        });

        if (x === this.attachmentForm.controls.attachments.value.length - 1) {
          this.attachmentService.load(null, null, null, this.riskForm.ID, null, 3, 1)
            .subscribe(attachments => {
              this.documentAttachments = attachments;
            });
        }
      }

    }
  }
  onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
    this.attachmentForm.controls.File.patchValue(this.selectedFile);
  }
  toggleAllSelection() {
    if (this.allSelected.selected) {
      this.attachmentForm.controls.attachments.patchValue(this.attachmentForm.controls.attachmetValues.value);
    } else {
      this.attachmentForm.controls.attachments.patchValue([]);
    }
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
  submit() {
    this.http.post(this.hostUrl+'api/Risk/Create', { Risks: this.risks }).subscribe(res => {
      console.log(res);
      const status: any = res;
      if (status.ID) {
        this.riskForm.ID = status.ID;
        this.http.get<Risk[]>(this.hostUrl+'api/Risk/Load?UWDocumentID=' + this.document.ID).subscribe(doc => {
          this.risks = doc;
       
          this.reInit(this.riskForm);
          this.renderTable(this.risks);
          this.updateModeForRisk();
          if(this.next){
            this.wizard.navigationMode.goToStep(2);
          }
          
        });
      }
    });

  }

}
