import { LockUpService } from './../../../../../_services/_organization/LockUp.service';
import { LockUp } from './../../../../../entities/organization/LockUp';
import { SubLineOfBusiness } from './../../../../../entities/Setup/SubLineOfBusiness';
import { LineOfBusiness } from './../../../../../entities/Setup/lineOfBusiness';
import { SubBusinessService } from './../../../../../_services/_setup/SubBusiness.service';
import { LineOfBusinessService } from './../../../../../_services/_setup/LineOfBusiness.service';
import { CommonService } from './../../../../../_services/Common.service';
import { ProductsDetailService } from './../../../../../_services/_setup/ProductsDetail.service';
import { HttpClient } from '@angular/common/http';
import { SubjectTypesService } from './../../../../../_services/_setup/SubjectTypes.service';
import { ProductSubjectTypes } from './../../../../../_services/_setup/ProductSubjectTypes.service';
import { SubjectType } from './../../../../../entities/Setup/SubjectType';
import { Product, ProductsDetail, ProductSubjectType } from './../../../../../entities/Product/Products';
import { Component, OnInit, Input, ViewChild, OnChanges } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';


@Component({
  selector: 'app-productsubjecttype',
  templateUrl: './productSubjectType.component.html',
  styleUrls: ['./productSubjectType.component.css']
})
export class ProductSubjectTypeComponent implements OnChanges {

  // tslint:disable-next-line:no-input-rename
  @Input('product') product: Product;
  // tslint:disable-next-line:no-input-rename
  @Input('productDetails') productDetails: ProductsDetail[] = [];
  subjectTypeForm: ProductSubjectType;
  subjectTypes: ProductSubjectType[];
  subjectTypesLobTableColumns = ['select',  'SubjectType', 'ParentSubjectType', 'lob', 'subLob'];
  subjectTypesLobDataSource: MatTableDataSource<SubjectType>;
  submit3: boolean;
  user: any;
  hasSelected = false;
  SubjectTypes: SubjectType[];
  subjectTypesPDTableColumns = ['select',  'SubjectType', 'ParentSubjectType', 'lob', 'subLob', 'Product'];
  subjectTypesPDDataSource: MatTableDataSource<ProductSubjectType>;
  AddUpdateUrl: string;
  Lobs: LineOfBusiness[];
  SubLobs: SubLineOfBusiness[];
  productSubjectType: ProductSubjectType;
  snackPosition: MatSnackBarHorizontalPosition;
  selection4: SelectionModel<SubjectType>;
  selection5: SelectionModel<ProductSubjectType>;
  selectedProductDetail: ProductsDetail;
  excessFroms: LockUp[];
  @ViewChild('paginator3') paginator3: MatPaginator;
  @ViewChild('paginator5') paginator5: MatPaginator;
  @ViewChild('table3', { read: MatSort }) sort3: MatSort;
  @ViewChild('table5', { read: MatSort }) sort5: MatSort;
  constructor(private subjectTypesService: SubjectTypesService,
    private productSubjectTypeService: ProductSubjectTypes, private http: HttpClient,
    private productsDetailService: ProductsDetailService,
    private commonService: CommonService,
    public snackBar: MatSnackBar,
    private lineOfBussinessService: LineOfBusinessService,
    private subLineService: SubBusinessService,
    private subjectTypeService: SubjectTypesService,
    private lockUpService: LockUpService
  ) { }



  ngOnChanges() {
    this.snackPosition = 'right';
    const initialSelection = [];
    this.user = JSON.parse(localStorage.getItem('user'));
    this.subjectTypeForm = new ProductSubjectType();
    this.selection4 = new SelectionModel<SubjectType>(true, initialSelection);
    this.selection5 = new SelectionModel<ProductSubjectType>(true, initialSelection);


    this.lineOfBussinessService.load().subscribe(res => {
      this.Lobs = res;
    });
    this.lockUpService.LoadLockUpsByMajorCode(7).subscribe(res => {
      this.excessFroms = res;
    });
    this.selectedProductDetail = new ProductsDetail;
    this.selectedProductDetail.ProductID = this.product.ID;
    this.reloadSubjectType(this.selectedProductDetail);

  }
  loadSubLinesOfBusiness(lob) {
  
  }
  loadRelatedSubjectType() {
    
    this.productDetails.forEach(element => {
      if (element.ID === this.subjectTypeForm.ProductDetailsID) {
        this.subLineService.load(element.SubLineOfBusniess, element.LineOfBusniess, 
           null, 1).subscribe(data => {
          this.SubLobs = data;
        });
        this.subjectTypeForm.SubLineOfBusniess = element.SubLineOfBusniess;
        this.subjectTypeForm.LineOfBusniess = element.LineOfBusniess;
        this.reloadSubjectType(element);
        this.selectedProductDetail = element;
      }
    });
  }
  renderSubjectTypeTable(RelatedSubject, UnRelatedSubject) {
    this.subjectTypes = UnRelatedSubject;
    this.subjectTypesLobDataSource = new MatTableDataSource<SubjectType>(RelatedSubject);
    this.subjectTypesLobDataSource.paginator = this.paginator3;
    this.subjectTypesLobDataSource.sort = this.sort3;
    this.selection4 = new SelectionModel<SubjectType>(true, []);
    this.subjectTypesLobDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort3.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };

    this.subjectTypesPDDataSource = new MatTableDataSource<ProductSubjectType>(UnRelatedSubject);
    this.subjectTypesPDDataSource.paginator = this.paginator5;
    this.subjectTypesPDDataSource.sort = this.sort5;
    this.selection5 = new SelectionModel<ProductSubjectType>(true, []);
    this.subjectTypesPDDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort5.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  saveSubjectType(form) {
    if (form.invalid) {
      return;
    }
    this.subjectTypeForm = this.subjectTypeForm.selected ? this.subjectTypeForm : Object.assign({}, form.value);
    this.subjectTypeForm.ProductID = this.product.ID;
    this.subjectTypeForm.LineOfBusniess = this.selectedProductDetail.LineOfBusniess;
    this.subjectTypeForm.SubLineOfBusniess = this.selectedProductDetail.SubLineOfBusniess;
    if (this.subjectTypeForm.selected) {
      this.AddUpdateUrl = this.productSubjectTypeService.sebjectTypeApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.productSubjectTypeService.sebjectTypeApiUrl + 'Create';
    }
    this.subjectTypeForm.ProductID = this.product.ID;
    this.subjectTypeForm.CreateBy = this.user.Name;
    this.subjectTypeForm.CreationDate = new Date();

    this.http.post(this.AddUpdateUrl, this.subjectTypeForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
       this.reloadSubjectType(this.selectedProductDetail);
      this.subjectTypeForm = new ProductSubjectType();
      this.submit3 = false;
      form.resetForm();
    });

  }
  deleteSubjectType(id) {
    this.http.post(this.subjectTypesService.sebjectTypeApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadSubjectType(this.selectedProductDetail);
    });
  }

  updateSubjectType(subjectType: ProductSubjectType) {
    window.scroll(0, 0);
    this.subjectTypeForm = new ProductSubjectType();
    this.subjectTypeForm = subjectType;
    this.subjectTypeForm.selected = true;
  }

  resetForm(form) {

    this.subjectTypeForm = new ProductSubjectType();
    this.submit3 = false;

  }

  reloadSubjectType(productDetail: ProductsDetail) {
    if (productDetail === null) {
      this.renderSubjectTypeTable([], []);
    }
    this.productsDetailService.loadSubjectTypes(productDetail.ID, productDetail.LineOfBusniess,
      productDetail.SubLineOfBusniess, 1 ,productDetail.ProductID).subscribe(data => {
        this.renderSubjectTypeTable(data.RelatedSubject, data.UnRelatedSubject);
      });
  }



  export(type, data) {

    if (data === 'SubjectType') {
      const body = {
        'items': this.subjectTypesPDDataSource.data,
        'FieldName': 'Setup.SubjectType',
        'Type': type,
      };
      this.commonService.Export(body).subscribe(res => {
        window.open(res.FilePath);
      });
    }
  }

  isAllSelected4() {
    return this.selection4.selected.length === this.subjectTypesLobDataSource.data.length;
  }
  masterToggle4() {
    this.isAllSelected4() ? this.selection4.clear() : this.subjectTypesLobDataSource.data.forEach(row => this.selection4.select(row));
  }

  isAllSelected5() {
    return this.selection5.selected.length === this.subjectTypesPDDataSource.data.length;
  }
  masterToggle5() {
    this.isAllSelected5() ? this.selection5.clear() : this.subjectTypesPDDataSource.data.forEach(row => this.selection5.select(row));
  }

  deleteSelectedData() {

    // tslint:disable-next-line:prefer-const
    let selectedData = [];
    /*
    
    
        for (let index = 0; index < this.selection2.selected.length; index++) {
          selectedData.push(this.selection2.selected[index].ID);
        }
    
        this.http.post(this.productsDetailService.ApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadSubjectType();
        });
    
    
     */

  }
  deleteProductSubjectType() {

    const Ids = [];
    this.selection5.selected.forEach(element => {

      Ids.push(element.ID);
    });
    this.http.post(this.productSubjectTypeService.sebjectTypeApiUrl + 'DeleteMultiple', { IDs: Ids }).subscribe(res => {
      console.log(res);
      this.reloadSubjectType(this.selectedProductDetail);
    });
  }
  addProductSubjectTypes() {
    if(!this.subjectTypeForm.ProductDetailsID){
      this.hasSelected = true;
      return ;
    }
    this.hasSelected = false;
    this.selection4.selected.forEach(element => {
      this.productSubjectType = new ProductSubjectType();
      this.productSubjectType.SubjectTypeID = element.ID;
      this.productSubjectType.SubjectTypeParentID = element.Parent;
      this.productSubjectType.SubLineOfBusniess = element.SubLineOfBusniessID;
      this.productSubjectType.LineOfBusniess = element.LineOfBusniessID;
      this.productSubjectType.ProductID = this.product.ID;
      this.productSubjectType.ProductDetailsID = this.selectedProductDetail.ID;
      this.productSubjectType.CreateBy = this.user.Name;

      this.productSubjectType.CreationDate = new Date();
      this.http.post(this.productSubjectTypeService.sebjectTypeApiUrl + 'Create', this.productSubjectType).subscribe(res => {
        console.log(res);
        this.reloadSubjectType(this.selectedProductDetail);
      });

    });
  }
}
