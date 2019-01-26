import { ProductColumns } from './../../../entities/Product/ProductColumns';
import { ProductColumnValidation } from './../../../entities/Product/ProductColumnValidation';
import { LockUpService } from './../../../_services/_organization/LockUp.service';
import { ProductCategory } from './../../../entities/Product/ProductCategory';
import { ProductCategoryService } from './../../../_services/_products/productCategory.service';
import { SubjectType } from './../../../entities/Setup/SubjectType';
import { Category, Column, Validation } from './../../../entities/Setup/Categories';
import { ProductSubjectTypes } from './../../../_services/_setup/ProductSubjectTypes.service';
import { SubjectTypesService } from './../../../_services/_setup/SubjectTypes.service';
import { ProductQuestionnaireService } from './../../../_services/_setup/productQuestionnaires.service';
import { LineOfBusiness } from './../../../entities/Setup/lineOfBusiness';
import { CommonService } from './../../../_services/Common.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Product, ProductsDetail, ProductQuestionnaire, ProductSubjectType } from '../../../entities/Product/Products';
import { LockUp } from '../../../entities/organization/LockUp';
import { ProductsService } from '../../../_services/_setup/Products.service';
import { ProductsDetailService } from './../../../_services/_setup/ProductsDetail.service';
import { SubLineOfBusiness } from './../../../entities/Setup/SubLineOfBusiness';
import { SubBusinessService } from './../../../_services/_setup/SubBusiness.service';
import { forEach } from '@angular/router/src/utils/collection';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productForm: Product;

  products: Product[];

  productsDetailForm: ProductsDetail;
  productsDetails: ProductsDetail[];


  CategoriesDDL: Category[];
  columnValidationForm: ProductColumnValidation;
  columnValidations: Validation[];

  categoryColumns: Column[];
  productCategoryForm: ProductCategory;
  LockUps: LockUp[];
  ProductsDetailLockUp: LockUp[];

  Lobs: LineOfBusiness[];
  SubLobs: SubLineOfBusiness[];
  Levels: LockUp[];

  GroupIndividualLockups: LockUp[];
  ValidationTypes: LockUp[];
  productQuestionnaires: ProductQuestionnaire;
  productDetails: ProductsDetail[];
  showSubTypes = false;

  submit: boolean;
  submit2: boolean;

  AddUpdateUrl: string;
  productsDetailTableColumns = ['select', 'ID', 'lob', 'subLob', 'EffectiveDate', 'ExpiryDate'];
  productsDetailsDataSource: MatTableDataSource<ProductsDetail>;

  subLineOfBusinessTableColumns = ['select', 'ID', 'lob', 'subLob'];
  subLOBDataSource: MatTableDataSource<ProductsDetail>;



  notRelatedQuestionnairesColumns = ['select', 'ID', 'lob', 'subLob'];
  notRelatedQuestionnairesDataSource: MatTableDataSource<ProductQuestionnaire>;

  relatedQuestionnairesTableColumns = ['select', 'ID', 'lob', 'subLob', 'Product', 'ProductDetail'];
  relatedQuestionnairesDataSource: MatTableDataSource<ProductQuestionnaire>;

  notRelatedCategoriesColumns = ['select', 'ID', 'Name', 'lob', 'subLob', 'Level', 'IsMultiRecord'];
  notRelatedCategoriesDataSource: MatTableDataSource<Category>;

  relatedCategoriesTableColumns = ['select', 'ID', 'Name', 'lob', 'subLob', 'Level', 'IsMultiRecord',
    'Product', 'ProductDetail', 'Status', 'Order'];
  relatedCategoriesDataSource: MatTableDataSource<ProductCategory>;


  categoryColumnsTableColumns = ['select', 'ID', 'Lable', 'ColumnType', 'Category', 'Product', 'ProductDetail', 'Status', 'ListReference'];
  categoryColumnsDataSource: MatTableDataSource<ProductColumns>;
  columnValidationsTableColumns = ['select', 'ID', 'Lable', 'DataType', 'ValidationType', 'IsMandatory', 'CheckDuplication', 'MinValue',
    'MaxValue'];
  columnValidationsDataSource: MatTableDataSource<ProductColumnValidation>;


  productSearch: FormControl = new FormControl();
  user: any;
  selection2: SelectionModel<ProductsDetail>;
  selection3: SelectionModel<ProductsDetail>;
  dropdownSettings = {};
  unRelatedCategory: Category[];
  RelatedCategory: ProductCategory[];
  productColumns: ProductColumns[];
  selection6: SelectionModel<ProductQuestionnaire>;
  selection7: SelectionModel<ProductQuestionnaire>;
  selection8: SelectionModel<Category>;
  selection9: SelectionModel<ProductCategory>;
  selection10: SelectionModel<ProductColumns>;
  selection11: SelectionModel<ProductColumnValidation>;
  extraForm: string;
  productDetail: ProductsDetail;
  productQuestionnaireForm: ProductQuestionnaire;
  snackPosition: MatSnackBarHorizontalPosition;
  selectedCategories: any;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;

  @ViewChild('paginator4') paginator4: MatPaginator;

  @ViewChild('paginator6') paginator6: MatPaginator;
  @ViewChild('paginator7') paginator7: MatPaginator;
  @ViewChild('paginator8') paginator8: MatPaginator;
  @ViewChild('paginator9') paginator9: MatPaginator;
  @ViewChild('paginator10') paginator10: MatPaginator;
  @ViewChild('paginator11') paginator11: MatPaginator;

  @ViewChild('table2', { read: MatSort }) sort2: MatSort;

  @ViewChild('table4', { read: MatSort }) sort4: MatSort;

  @ViewChild('table6', { read: MatSort }) sort6: MatSort;
  @ViewChild('table7', { read: MatSort }) sort7: MatSort;
  @ViewChild('table8', { read: MatSort }) sort8: MatSort;
  @ViewChild('table9', { read: MatSort }) sort9: MatSort;
  @ViewChild('table10', { read: MatSort }) sort10: MatSort;
  @ViewChild('table11', { read: MatSort }) sort11: MatSort;
  hasBeenSearched = false;
  constructor(public snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute,
    private productService: ProductsService, private productsDetailService: ProductsDetailService,
    private productQuestionnaireService: ProductQuestionnaireService,
    private subLineService: SubBusinessService, private commonService: CommonService,
    private productCategorySerivce: ProductCategoryService,
    private lockupService: LockUpService
  ) { }

  ngOnInit() {
    this.extraForm = '';
    const initialSelection = [];
    this.productCategoryForm = new ProductCategory();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.selection2 = new SelectionModel<ProductsDetail>(true, initialSelection);
    this.selection3 = new SelectionModel<ProductsDetail>(true, initialSelection);
    this.productQuestionnaireForm = new ProductQuestionnaire();
    this.selection6 = new SelectionModel<ProductQuestionnaire>(true, initialSelection);
    this.selection7 = new SelectionModel<ProductQuestionnaire>(true, initialSelection);
    this.selection8 = new SelectionModel<Category>(true, initialSelection);
    this.selection9 = new SelectionModel<ProductCategory>(true, initialSelection);
    this.selection10 = new SelectionModel<ProductColumns>(true, initialSelection);
    this.selection11 = new SelectionModel<ProductColumnValidation>(true, initialSelection);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'ID',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
    this.snackPosition = 'right';

    this.productForm = new Product();
    this.productsDetailForm = new ProductsDetail();

    this.columnValidationForm = new ProductColumnValidation();

    this.submit = false;
    this.submit2 = false;
    this.route.data.subscribe(data => {

      this.Lobs = data.lineOfBusiness;
      this.LockUps = data.Status;

      this.GroupIndividualLockups = data.GroupIndividualLockups;
      this.ValidationTypes = data.ValidationTypes;


    });
    this.productSearch.valueChanges.subscribe(
      term => {
        if (term !== '') {
          this.productService.load(null, term, 1).subscribe(
            data => {
              if (data.length > 0) {
                this.products = data;
                this.hasBeenSearched = true;
              } else {
                this.hasBeenSearched = false;
              }

            });
        } else {
          this.hasBeenSearched = false;
        }
      });

    this.lockupService.GetLockUpsByMajorCode(19).subscribe(res => {
      this.Levels = res;
    });

  }

  displayProduct(product?: Product): string | undefined {
    return product ? product.Name : '';
  }
  applyFilter(filterValue: string) {
    switch (this.extraForm) {

      case 'productsDetails':
        this.productsDetailsDataSource.filter = filterValue.trim().toLowerCase();
        break;
      // case 'subjectTypes':
      //   this.subjectTypesDataSource.filter = filterValue.trim().toLowerCase();
      //   break;
    }
  }

  updateProductsDetail(productsDetail: ProductsDetail) {

    this.productsDetailForm = productsDetail;
    this.productsDetailForm.EffectiveDate = new Date(productsDetail.EffectiveDate);
    this.productsDetailForm.ExpiryDate = new Date(productsDetail.ExpiryDate);
    this.productsDetailForm.CreationDate = new Date(productsDetail.CreationDate);
    this.productsDetailForm.ModificationDate = new Date(productsDetail.ModificationDate);
    this.productsDetailForm.StatusDate = new Date(productsDetail.StatusDate);
    this.productsDetailForm.selected = true;
    this.productQuestionnaireForm.ProductDetailedID = this.productsDetailForm.ID ;
    this.reloadQuestionnairesTable(this.productsDetailForm.ID ? this.productsDetailForm.ID : null ,
      this.productsDetailForm.LineOfBusniess ? this.productsDetailForm.LineOfBusniess : null ,
      this.productsDetailForm.SubLineOfBusniess  );
  }

  FilterQustionnaires() {
    this.productDetails.forEach(element => {
      if (element.ID === this.productQuestionnaireForm.ProductDetailedID ) {
        this.reloadQuestionnairesTable(this.productQuestionnaireForm.ProductDetailedID ?
          this.productQuestionnaireForm.ProductDetailedID  : null ,
          element.LineOfBusniess ? element.LineOfBusniess : null ,
          element.SubLineOfBusniess ? element.SubLineOfBusniess : null );
          this.productsDetailForm = element;
      }
    });
  
  }
  changeTab($event) {
    setTimeout(() => {
      switch ($event.index) {
        case 1:
          this.extraForm = 'productsDetails';
          this.reloadProductsDetailTable(this.productForm.ID ? this.productForm.ID : null);
          break;
        case 2:
          this.extraForm = 'ProductQuestionears';
          //this.reloadQuestionnairesTable(this.productsDetailForm.ID ? this.productsDetailForm.ID : null);
          break;
      }
    });
  }

  loadProductUnRelatedCateogry() {

    this.productCategoryForm.ProductID = this.productForm.ID;
    this.productCategorySerivce.loadUnRelatedCategory(null, null, this.productCategoryForm.ProductID,
      this.productCategoryForm.ProductDetailID,
      this.productCategoryForm.CategoryLevel, this.productCategoryForm.LineOfBusniess,
      this.productCategoryForm.SubLineOfBusniess).subscribe(res => {
        const result: any = res;
        this.CategoriesDDL = result.UnRelatedCategories;
        this.unRelatedCategory = result.UnRelatedCategories;
        this.RelatedCategory = result.RelatedCategories;
        this.renderProductCategory(result.RelatedCategories);
      });
  }
  renderProductsDetailTable(data) {
    this.productsDetails = data;
    this.productsDetailsDataSource = new MatTableDataSource<ProductsDetail>(data);
    this.productsDetailsDataSource.paginator = this.paginator2;
    this.productsDetailsDataSource.sort = this.sort2;
    this.selection2 = new SelectionModel<ProductsDetail>(true, []);
    this.productsDetailsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort2.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };

    this.productsDetails = data;
  }


  rendersubLOBTable(data) {
    this.subLOBDataSource = new MatTableDataSource<ProductsDetail>(data);
    this.subLOBDataSource.paginator = this.paginator2;
    this.subLOBDataSource.sort = this.sort2;
    this.selection3 = new SelectionModel<ProductsDetail>(true, []);
    this.subLOBDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort2.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }




  reloadProductsDetailTable(productsId = null) {
    this.productsDetailService.load(null, productsId, 1).subscribe(data => {
      this.renderProductsDetailTable(data);
    });
    this.productsDetailService.loadRelated(productsId, 1).subscribe(data => {
      this.rendersubLOBTable(data.UnRelatedSubLines);
    });

  }




  resetForm(form) {
    this.productForm = new Product();
    this.submit = false;
    form.reset();
  }

  // RelatedQuestionnaires
  reloadQuestionnairesTable(productsDetailId = null , line , sub) {
    this.productQuestionnaireService.loadRelated(productsDetailId,
      line, sub, 1).subscribe(data => {
        this.rendernNotRelatedQuestionnairesTable(data.UnRelatedQuestionnaires);
        this.renderRelatedQuestionnairesTable(data.RelatedQuestionnaires);
      });


  }

  rendernNotRelatedQuestionnairesTable(data) {
    this.notRelatedQuestionnairesDataSource = new MatTableDataSource<ProductQuestionnaire>(data);
    this.notRelatedQuestionnairesDataSource.paginator = this.paginator6;
    this.notRelatedQuestionnairesDataSource.sort = this.sort6;
    this.selection6 = new SelectionModel<ProductQuestionnaire>(true, []);
    this.notRelatedQuestionnairesDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort6.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };

  }

  addQuestionaire() {
    this.selection6.selected.forEach(element => {
      this.productQuestionnaires = new ProductQuestionnaire();
      this.productQuestionnaires.ProductID = this.productForm.ID;
      this.productQuestionnaires.ProductDetailedID = this.productsDetailForm.ID;
      this.productQuestionnaires.LineOfBusniess = this.productsDetailForm.LineOfBusniess;
      this.productQuestionnaires.SubLineOfBusniess = this.productsDetailForm.SubLineOfBusniess;
      this.productQuestionnaires.QuestionnaireID = element.ID;
      this.productQuestionnaires.Status = 1;
      this.productQuestionnaires.CreateBy = this.user.Name;
      this.productQuestionnaires.CreationDate = new Date();
      this.productQuestionnaires.StatusDate = new Date();
      this.http.post(this.productQuestionnaireService.ApiUrl + 'Create', this.productQuestionnaires).subscribe(res => {
        this.reloadQuestionnairesTable(this.productsDetailForm.ID ,
          this.productsDetailForm.LineOfBusniess , this.productsDetailForm.SubLineOfBusniess);
      });
    });
  }

  removeQuestionaires() {
    
    const Ids = [];
    this.selection7.selected.forEach(element => {

      Ids.push(element.ID);
    });
    this.http.post(this.productQuestionnaireService.ApiUrl  + 'DeleteMultiple', { IDs: Ids }).subscribe(res => {
 
      this.reloadQuestionnairesTable(this.productsDetailForm.ID ,
        this.productsDetailForm.LineOfBusniess , this.productsDetailForm.SubLineOfBusniess);
    });
  }
  renderRelatedQuestionnairesTable(data) {
    this.relatedQuestionnairesDataSource = new MatTableDataSource<ProductQuestionnaire>(data);
    this.relatedQuestionnairesDataSource.paginator = this.paginator7;
    this.relatedQuestionnairesDataSource.sort = this.sort7;
    this.selection7 = new SelectionModel<ProductQuestionnaire>(true, []);
    this.relatedQuestionnairesDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort7.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }


  // add update delete Product

  saveProduct(form) {
    if (form.invalid) {
      return;
    }
    this.productForm = this.productForm.selected ? this.productForm : Object.assign({}, form.value);
    if (this.productForm.selected) {
      this.AddUpdateUrl = this.productService.ApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.productService.ApiUrl + 'Create';
    }
    this.http.post(this.AddUpdateUrl, this.productForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });

      // this.productForm = new Product();
      //  this.submit = false;
      //form.resetForm();
    });

  }

  saveProductsDetail(form) {
    if (form.invalid) {
      return;
    }
    this.productsDetailForm = this.productsDetailForm.selected ? this.productsDetailForm : Object.assign({}, form.value);
    if (this.productsDetailForm.selected) {
      this.AddUpdateUrl = this.productsDetailService.ApiUrl + 'Update';
      this.productsDetailForm.StatusDate = new Date();
      this.productsDetailForm.ModificationDate = new Date();
    } else {
      this.AddUpdateUrl = this.productsDetailService.ApiUrl + 'Create';
      this.productsDetailForm.CreateBy = this.user.Name;
      this.productsDetailForm.CreationDate = new Date();
      this.productsDetailForm.StatusDate = new Date();
    }

    this.http.post(this.AddUpdateUrl, this.productsDetailForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadProductsDetailTable(this.productForm.ID ? this.productForm.ID : null);
      this.productsDetailForm = new ProductsDetail();
      this.submit2 = false;
      form.resetForm();
    });

  }


  deleteProduct(id) {

    this.http.post(this.productService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
    });
  }

  deleteProductsDetail(id) {
    this.http.post(this.productsDetailService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadProductsDetailTable(this.productForm.ID ? this.productForm.ID : null);
    });
  }



  renderProductCategory(data) {
    this.relatedCategoriesDataSource = new MatTableDataSource<ProductCategory>(data);
    this.relatedCategoriesDataSource.paginator = this.paginator9;
    this.relatedCategoriesDataSource.sort = this.sort9;
    this.selection9 = new SelectionModel<ProductCategory>(true, []);
    this.relatedCategoriesDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort7.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }


  renderProductCategoryColumn(data) {
    this.categoryColumnsDataSource = new MatTableDataSource<ProductColumns>(data);
    this.categoryColumnsDataSource.paginator = this.paginator10;
    this.categoryColumnsDataSource.sort = this.sort10;
    this.selection10 = new SelectionModel<ProductColumns>(true, []);
    this.categoryColumnsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort7.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  renderProductCategoryValidation(data) {
    this.columnValidationsDataSource = new MatTableDataSource<ProductColumnValidation>(data);
    this.columnValidationsDataSource.paginator = this.paginator11;
    this.columnValidationsDataSource.sort = this.sort11;
    this.selection11 = new SelectionModel<ProductColumnValidation>(true, []);
    this.columnValidationsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort7.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }
  updateProduct(product: Product) {
    window.scroll(0, 0);
    this.productForm = new Product;
    this.productForm = product;
    this.productForm.selected = true;
    this.submit = true;
  }


  setCurrentProduct() {
    this.productForm = new Product;
    this.productForm = this.productSearch.value;
    this.productForm.CreationDate = new Date(this.productSearch.value.CreationDate);
    this.productForm.StatusDate = new Date(this.productSearch.value.CreationDate);
    this.productForm.ModificationDate = new Date(this.productSearch.value.CreationDate);
    this.productForm.EffectiveDate = new Date(this.productSearch.value.EffectiveDate);
    this.productForm.ExpiryDate = new Date(this.productSearch.value.ExpiryDate);
    this.submit = true;
    this.productForm.selected = true;
    this.productsDetailService.load(null, this.productForm.ID, 1).subscribe(res => {
      this.productDetails = res;
    });
    this.reloadProductsDetailTable(this.productForm.ID);
  }





  export(type, data) {
    if (data === 'ProductsDetail') {
      const body = {
        'items': this.productsDetailsDataSource.data,
        'FieldName': 'Setup.ProductsDetail',
        'Type': type,
      };
      this.commonService.Export(body).subscribe(res => {
        window.open(res.FilePath);
      });
    }

  }




  getProductName(id: number) {
    for (let index = 0; index < this.products.length; index++) {
      if (this.products[index].ID === id) {
        return this.products[index].Name;
      }
    }
  }

  getLobName(id: number) {
    for (let index = 0; index < this.Lobs.length; index++) {
      if (this.Lobs[index].ID === id) {
        return this.Lobs[index].Name;
      }
    }
  }




  isAllSelected2() {
    return this.selection2.selected.length === this.subLOBDataSource.data.length;
  }
  masterToggle2() {
    this.isAllSelected2() ? this.selection2.clear() : this.subLOBDataSource.data.forEach(row => this.selection2.select(row));
  }

  isAllSelected3() {
    return this.selection3.selected.length === this.productsDetailsDataSource.data.length;
  }
  masterToggle3() {
    this.isAllSelected3() ? this.selection3.clear() : this.productsDetailsDataSource.data.forEach(row => this.selection3.select(row));
  }



  isAllSelected6() {
    return this.selection6.selected.length === this.notRelatedQuestionnairesDataSource.data.length;
  }
  masterToggle6() {
    this.isAllSelected6() ? this.selection6.clear() :
      this.notRelatedQuestionnairesDataSource.data.forEach(row => this.selection6.select(row));
  }

  isAllSelected7() {
    return this.selection7.selected.length === this.relatedQuestionnairesDataSource.data.length;
  }
  masterToggle7() {
    this.isAllSelected7() ? this.selection7.clear() : this.relatedQuestionnairesDataSource.data.forEach(row => this.selection7.select(row));
  }

  isAllSelected8() {
    return this.selection8.selected.length === this.notRelatedCategoriesDataSource.data.length;
  }
  masterToggle8() {
    this.isAllSelected8() ? this.selection8.clear() :
      this.notRelatedCategoriesDataSource.data.forEach(row => this.selection8.select(row));
  }

  isAllSelected9() {
    return this.selection9.selected.length === this.relatedCategoriesDataSource.data.length;
  }
  masterToggle9() {
    this.isAllSelected9() ? this.selection9.clear() : this.relatedCategoriesDataSource.data.forEach(row => this.selection9.select(row));
  }

  isAllSelected10() {
    return this.selection10.selected.length === this.categoryColumnsDataSource.data.length;
  }
  masterToggle10() {
    this.isAllSelected10() ? this.selection10.clear() :
      this.categoryColumnsDataSource.data.forEach(row => this.selection10.select(row));
  }

  isAllSelected11() {
    return this.selection11.selected.length === this.columnValidationsDataSource.data.length;
  }
  masterToggle11() {
    this.isAllSelected11() ? this.selection11.clear() : this.columnValidationsDataSource.data.forEach(row => this.selection11.select(row));
  }


  SaveCateogryColumns() {
    for (let index = 0; index < this.selectedCategories.length; index++) {
      const element: any = this.selectedCategories[index];
      this.unRelatedCategory.forEach(item => {
        if (item.ID === element.ID) {
          const category: any = {
            CategoryID: item.ID,
            Lable: item.Lable,
            Lable2: item.Lable,
            Status: 1,
            StatusDate: new Date(),
            LineOfBusniess: item.LineOfBusniess,
            SubLineOfBusniess: item.SubLineOfBusniess,
            CategoryLevel: item.CategoryLevel,
            MultiRecord: item.MultiRecord,
            ProductID: this.productCategoryForm.ProductID,
            ProductDetailID: this.productCategoryForm.ProductDetailID,
            Order: this.productCategoryForm.Order,
            DictionaryID: this.productCategoryForm.DictionaryID,
            CreateBy: this.user.Name,
            CreationDate: new Date(),

          };

          this.http.post(this.productCategorySerivce.ApiUrlCategory + 'Create', category).subscribe(types => {

            this.productCategorySerivce.loadCategory(null, null,
              this.productCategoryForm.ProductID, this.productCategoryForm.ProductDetailID, this.productCategoryForm.CategoryLevel,
              this.productCategoryForm.LineOfBusniess, this.productCategoryForm.SubLineOfBusniess, 1).subscribe(res => {
                this.renderProductCategory(res);
              });

          });
        }
      });



    }
  }

  saveValidationColumns() {
    this.http.post(this.productCategorySerivce.ApiUrlValidation + 'Create' , this.columnValidationForm).subscribe(res => {
      this.productCategorySerivce.loadValidation(null, this.columnValidationForm.CategoryID,
        this.columnValidationForm.ProductID, this.columnValidationForm.ProductDetailID,
       null , this.columnValidationForm.LocValidType, 1
      ).subscribe(result => {
        this.renderProductCategoryValidation(result);
      });
    
      console.log(res);
    });
  }

  deleteSelectedData() {

    // tslint:disable-next-line:prefer-const
    let selectedData = [];
    switch (this.extraForm) {
      case 'productsDetails':
        for (let index = 0; index < this.selection2.selected.length; index++) {
          selectedData.push(this.selection2.selected[index].ID);
        }

        this.http.post(this.productsDetailService.ApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadProductsDetailTable();
        });
        break;
      case 'subjectTypes':
        for (let index = 0; index < this.selection2.selected.length; index++) {
          selectedData.push(this.selection2.selected[index].ID);
        }



    }

  }


  replaceFileName(fileName) {
    return fileName ? fileName.substring(fileName.indexOf('Images')) : '';
  }

  removeSubLineOfBusiness() {
  }


  UpdateProductCategory(data) {

    this.productCategorySerivce.loadColumn(null, data.CategoryID
      , data.ProductID, data.ProductDetailID, data.ColumnType,
      data.LineOfBusniess, data.SubLineOfBusniess, 1).subscribe(res => {
        this.productColumns = res;
        this.renderProductCategoryColumn(res);
      });


  }

  LoadProductCategoryCloumns() {

    this.productCategorySerivce.loadColumn(null, this.columnValidationForm.CategoryID
      , null, null, null,
      null, null, 1).subscribe(res => {
        this.productColumns = res;
        this.renderProductCategoryColumn(res);
      });


  }
  UpdateProductCategoryValidation(data) {
 
    this.productCategorySerivce.loadValidation(null, data.ProductCategoryID,
      this.columnValidationForm.ProductID, this.columnValidationForm.ProductDetailID,
      data.ID, this.columnValidationForm.LocValidType, 1
    ).subscribe(res => {
      if (res.length > 0) {
      this.columnValidationForm = res[0];
      this.renderProductCategoryValidation(res); 
    } else {
      this.columnValidationForm.Lable = data.Lable;
      this.columnValidationForm.Lable2 = data.Lable2;
      this.columnValidationForm.ColumnID = data.ID;
      this.columnValidationForm.CategoryID = data.ProductCategoryID;
      this.columnValidationForm.DataType = data.ColumnType;
      this.columnValidationForm.ProductDetailID = data.ProductDetailID;
      this.columnValidationForm.ProductID = data.ProductID;
    }
    });

  }
  updateValidationValues() {
    this.productColumns.forEach(element => {
      if (element.ID === this.columnValidationForm.ColumnID) {
        this.productCategorySerivce.loadValidation(null, element.ProductCategoryID,
          this.columnValidationForm.ProductID, this.columnValidationForm.ProductDetailID,
          element.ID, this.columnValidationForm.LocValidType, 1
        ).subscribe(res => {
          if (res.length > 0) {
          this.columnValidationForm = res[0];
          this.renderProductCategoryValidation(res);
        } else {
          this.columnValidationForm.Lable = element.Lable;
          this.columnValidationForm.Lable2 = element.Lable2;
          this.columnValidationForm.ColumnID = element.ID;
          this.columnValidationForm.CategoryID = element.ProductCategoryID;
          this.columnValidationForm.DataType = element.ColumnType;
          this.columnValidationForm.ProductDetailID = element.ProductDetailID;
          this.columnValidationForm.ProductID = element.ProductID;
        }
        });
      }
    });


  }
  updateValidations(row) {
    this.columnValidationForm = new ProductColumnValidation();
    this.columnValidationForm = row;
  }
  AddProductDetails() {
    this.selection2.selected.forEach(element => {
      this.productDetail = new ProductsDetail();
      this.productDetail.EffectiveDate = this.productForm.EffectiveDate;
      this.productDetail.ExpiryDate = this.productForm.ExpiryDate;
      this.productDetail.SubLineOfBusniess = element.ID;
      this.productDetail.LineOfBusniess = element.LineOfBusniess;
      this.productDetail.ProductID = this.productForm.ID;
      this.productDetail.CreateBy = this.user.Name;
      this.productDetail.Status = 1;
      this.productDetail.CreationDate = new Date();
      this.productDetail.StatusDate = new Date();
      this.http.post(this.productsDetailService.ApiUrl + 'Create', this.productDetail).subscribe(res => {
        this.reloadProductsDetailTable(this.productForm.ID);
      });

    });
    console.log();
  }
  deleteProductDetails() {

    const Ids = [];
    this.selection3.selected.forEach(element => {

      Ids.push(element.ID);
    });
    this.http.post(this.productsDetailService.ApiUrl + 'DeleteMultiple', { IDs: Ids }).subscribe(res => {
      console.log(res);
      this.reloadProductsDetailTable(this.productForm.ID);
    });
  }

  loadSubLinesOfBusiness(lob) {
    this.subLineService.load(null, lob ? lob : null, null, 1).subscribe(data => {
      this.SubLobs = data;
    });
    this.loadProductUnRelatedCateogry();
  }




}
