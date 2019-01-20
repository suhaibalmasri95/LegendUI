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

  subjectTypeForm: ProductSubjectType;
  subjectTypes: ProductSubjectType[];

  columnValidationForm: Validation;
  columnValidations: Validation[];

  categoryColumns: Column[];

  LockUps: LockUp[];
  ProductsDetailLockUp: LockUp[];

  Lobs: LineOfBusiness[];
  SubLobs: SubLineOfBusiness[];

  excessFroms: LockUp[];
  GroupIndividualLockups: LockUp[];
  ValidationTypes: LockUp[];


  showSubTypes = false;

  submit: boolean;
  submit2: boolean;
  submit3: boolean;
  AddUpdateUrl: string;
  productTableColumns = ['select', 'ID', 'Name', 'Name2', 'ProductCode', 'EffectiveDate', 'ExpiryDate', 'GroupIndividual', 'actions'];
  productsDataSource: MatTableDataSource<Product>;

  productsDetailTableColumns = ['select', 'ID', 'lob', 'subLob', 'EffectiveDate', 'ExpiryDate'];
  productsDetailsDataSource: MatTableDataSource<ProductsDetail>;

  subLineOfBusinessTableColumns = ['select', 'ID', 'lob', 'subLob'];
  subLOBDataSource: MatTableDataSource<ProductsDetail>;

  subjectTypesLobTableColumns = ['select', 'ID', 'SubjectType', 'ParentSubjectType', 'lob', 'subLob'];
  subjectTypesLobDataSource: MatTableDataSource<SubjectType>;

  subjectTypesPDTableColumns = ['select', 'ID', 'SubjectType', 'ParentSubjectType', 'lob', 'subLob', 'Product', 'ProductDetail'];
  subjectTypesPDDataSource: MatTableDataSource<ProductSubjectType>;

  notRelatedQuestionnairesColumns = ['select', 'ID', 'lob', 'subLob'];
  notRelatedQuestionnairesDataSource: MatTableDataSource<ProductQuestionnaire>;

  relatedQuestionnairesTableColumns = ['select', 'ID', 'lob', 'subLob', 'Product', 'ProductDetail'];
  relatedQuestionnairesDataSource: MatTableDataSource<ProductQuestionnaire>;

  notRelatedCategoriesColumns = ['select', 'ID', 'Name', 'lob', 'subLob', 'Level', 'IsMultiRecord'];
  notRelatedCategoriesDataSource: MatTableDataSource<Category>;

  relatedCategoriesTableColumns = ['select', 'ID', 'Name', 'lob', 'subLob', 'Level', 'IsMultiRecord',
    'Product', 'ProductDetail', 'Status', 'Order'];
  relatedCategoriesDataSource: MatTableDataSource<Category>;


  categoryColumnsTableColumns = ['select', 'ID', 'Label', 'ColumnType', 'Category', 'Product', 'ProductDetail', 'Status', 'ListReference'];
  categoryColumnsDataSource: MatTableDataSource<Column>;
  columnValidationsTableColumns = ['select', 'ID', 'Label', 'DataType', 'ValidationType', 'IsMandatory', 'CheckDuplication', 'MinValue',
    'MaxValue'];
  columnValidationsDataSource: MatTableDataSource<Validation>;



  user: any;
  selection: SelectionModel<Product>;
  selection2: SelectionModel<ProductsDetail>;
  selection3: SelectionModel<ProductsDetail>;
  selection4: SelectionModel<SubjectType>;
  selection5: SelectionModel<ProductSubjectType>;
  selection6: SelectionModel<ProductQuestionnaire>;
  selection7: SelectionModel<ProductQuestionnaire>;
  selection8: SelectionModel<Category>;
  selection9: SelectionModel<Category>;
  selection10: SelectionModel<Column>;
  selection11: SelectionModel<Validation>;
  extraForm: string;
  productDetail: ProductsDetail;
  snackPosition: MatSnackBarHorizontalPosition;
  productSubjectType: ProductSubjectType;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;
  @ViewChild('paginator4') paginator4: MatPaginator;
  @ViewChild('paginator5') paginator5: MatPaginator;
  @ViewChild('paginator6') paginator6: MatPaginator;
  @ViewChild('paginator7') paginator7: MatPaginator;
  @ViewChild('paginator8') paginator8: MatPaginator;
  @ViewChild('paginator9') paginator9: MatPaginator;
  @ViewChild('paginator10') paginator10: MatPaginator;
  @ViewChild('paginator11') paginator11: MatPaginator;

  @ViewChild('table', { read: MatSort }) sort: MatSort;
  @ViewChild('table2', { read: MatSort }) sort2: MatSort;
  @ViewChild('table3', { read: MatSort }) sort3: MatSort;
  @ViewChild('table4', { read: MatSort }) sort4: MatSort;
  @ViewChild('table5', { read: MatSort }) sort5: MatSort;
  @ViewChild('table6', { read: MatSort }) sort6: MatSort;
  @ViewChild('table7', { read: MatSort }) sort7: MatSort;
  @ViewChild('table8', { read: MatSort }) sort8: MatSort;
  @ViewChild('table9', { read: MatSort }) sort9: MatSort;
  @ViewChild('table10', { read: MatSort }) sort10: MatSort;
  @ViewChild('table11', { read: MatSort }) sort11: MatSort;

  constructor(public snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute,
    private productService: ProductsService, private productsDetailService: ProductsDetailService,
    private productQuestionnaireService: ProductQuestionnaireService,
    private subLineService: SubBusinessService, private commonService: CommonService,
    private subjectTypesService: SubjectTypesService,
    private productSubjectTypeService: ProductSubjectTypes) { }

  ngOnInit() {
    this.extraForm = '';
    const initialSelection = [];
    this.user = JSON.parse(localStorage.getItem('user'));
    this.selection = new SelectionModel<Product>(true, initialSelection);
    this.selection2 = new SelectionModel<ProductsDetail>(true, initialSelection);
    this.selection3 = new SelectionModel<ProductsDetail>(true, initialSelection);
    this.selection4 = new SelectionModel<SubjectType>(true, initialSelection);
    this.selection5 = new SelectionModel<ProductSubjectType>(true, initialSelection);
    this.selection6 = new SelectionModel<ProductQuestionnaire>(true, initialSelection);
    this.selection7 = new SelectionModel<ProductQuestionnaire>(true, initialSelection);
    this.selection8 = new SelectionModel<Category>(true, initialSelection);
    this.selection9 = new SelectionModel<Category>(true, initialSelection);
    this.selection10 = new SelectionModel<Column>(true, initialSelection);
    this.selection11 = new SelectionModel<Validation>(true, initialSelection);

    this.snackPosition = 'right';

    this.productForm = new Product();
    this.productsDetailForm = new ProductsDetail();
    this.subjectTypeForm = new ProductSubjectType();
    this.columnValidationForm = new Validation();

    this.submit = false;
    this.submit2 = false;
    this.route.data.subscribe(data => {
      this.products = data.products;
      this.Lobs = data.lineOfBusiness;
      this.LockUps = data.Status;
      this.excessFroms = data.excessFrom;
      this.GroupIndividualLockups = data.GroupIndividualLockups;
      this.ValidationTypes = data.ValidationTypes;

      this.renderProductTable(data.products);
    });

  }


  applyFilter(filterValue: string) {
    switch (this.extraForm) {
      case '':
        this.productsDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'productsDetails':
        this.productsDetailsDataSource.filter = filterValue.trim().toLowerCase();
        break;
      // case 'subjectTypes':
      //   this.subjectTypesDataSource.filter = filterValue.trim().toLowerCase();
      //   break;
    }
  }


  changeTab($event) {
    setTimeout(() => {
      switch ($event.index) {
        case 0:
          this.extraForm = '';
          this.renderProductTable(this.products);
          break;
        case 1:
          this.extraForm = 'productsDetails';
          this.reloadProductsDetailTable(this.productForm.ID ? this.productForm.ID : null);
          break;
        case 2:
          this.extraForm = 'ProductQuestionears';
          this.reloadQuestionnairesTable(this.productsDetailForm.ID ? this.productsDetailForm.ID : null);
          break;
      }
    });
  }

  renderProductTable(data) {
    this.products = data;
    this.productsDataSource = new MatTableDataSource<Product>(data);
    this.productsDataSource.paginator = this.paginator;
    this.productsDataSource.sort = this.sort;
    this.selection = new SelectionModel<Product>(true, []);
    this.productsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
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

  renderSubjectTypeTable(RelatedSubject, UnRelatedSubject) {
    this.subjectTypes = RelatedSubject;
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
  reloadProductTable() {
    this.productService.load(null, null, null, null, 1).subscribe(data => {
      this.renderProductTable(data);
    });
  }

  reloadProductsDetailTable(productsId = null) {
    this.productsDetailService.load(null, productsId, 1).subscribe(data => {
      this.renderProductsDetailTable(data);
    });
    this.productsDetailService.loadRelated(productsId, 1).subscribe(data => {
      this.rendersubLOBTable(data.UnRelatedSubLines);
    });

  }




  reloadSubjectType(productsId = null) {
    if (productsId === null) {
      this.renderSubjectTypeTable([], []);
    }
    this.productsDetailService.loadSubjectTypes(this.productsDetailForm.ID, 1).subscribe(data => {
      this.renderSubjectTypeTable(data.RelatedSubject, data.UnRelatedSubject);
    });
  }

  // RelatedQuestionnaires
  reloadQuestionnairesTable(productsDetailId = null) {
    this.productQuestionnaireService.loadRelated(null, productsDetailId, 1).subscribe(data => {
      this.rendernNotRelatedQuestionnairesTable(data.UnRelatedQuestionnaires);
    });

    this.productQuestionnaireService.load(null, null, productsDetailId, 1).subscribe(data => {
      this.renderRelatedQuestionnairesTable(data);
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
      this.reloadProductTable();
      this.productForm = new Product();
      this.submit = false;
      form.resetForm();
    });

  }

  saveProductsDetail(form) {
    if (form.invalid) {
      return;
    }
    this.productsDetailForm = this.productsDetailForm.selected ? this.productsDetailForm : Object.assign({}, form.value);
    if (this.productsDetailForm.selected) {
      this.AddUpdateUrl = this.productsDetailService.ApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.productsDetailService.ApiUrl + 'Create';
    }
    this.productsDetailForm.CreateBy = this.user.Name;
    this.productsDetailForm.CreationDate = new Date();
    this.http.post(this.AddUpdateUrl, this.productsDetailForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadProductsDetailTable(this.productForm.ID ? this.productForm.ID : null);
      this.productsDetailForm = new ProductsDetail();
      this.submit2 = false;
      form.resetForm();
    });

  }

  saveSubjectType(form) {
    if (form.invalid) {
      return;
    }
   
    this.subjectTypeForm = this.subjectTypeForm.selected ? this.subjectTypeForm : Object.assign({}, form.value);
    if (this.subjectTypeForm.selected) {
      this.AddUpdateUrl = this.productSubjectTypeService.sebjectTypeApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.productSubjectTypeService.sebjectTypeApiUrl + 'Create';
    }
    this.subjectTypeForm.CreateBy = this.user.Name;
    this.subjectTypeForm.CreationDate = new Date();
    this.subjectTypeForm.QuestionnaireID = this.productsDetailForm.ID;
    this.http.post(this.AddUpdateUrl, this.subjectTypeForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadSubjectType(this.productsDetailForm.ID);
      this.subjectTypeForm = new ProductSubjectType();
      this.submit3 = false;
      form.resetForm();
    });

  }
  deleteProduct(id) {

    this.http.post(this.productService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadProductTable();
    });
  }

  deleteProductsDetail(id) {
    this.http.post(this.productsDetailService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadProductsDetailTable(this.productForm.ID ? this.productForm.ID : null);
    });
  }

  deleteSubjectType(id) {
    this.http.post(this.subjectTypesService.sebjectTypeApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadSubjectType(this.productsDetailForm.ID);
    });
  }

  updateProduct(product: Product) {
    window.scroll(0, 0);
    this.productForm = new Product;
    this.productForm = product;
    this.productForm.selected = true;
  }


  updateProductsDetail(productsDetail: ProductsDetail) {
    this.productsDetailForm = productsDetail;

    this.productsDetailService.loadSubjectTypes(this.productsDetailForm.ID, 1).subscribe(data => {
      this.renderSubjectTypeTable(data.RelatedSubject, data.UnRelatedSubject);
      this.showSubTypes = true;
      window.scroll(0, 1000);
    

    });

  }



  updateSubjectType(subjectType: ProductSubjectType) {
    window.scroll(0, 0);
    this.subjectTypeForm = new ProductSubjectType();
    this.subjectTypeForm = subjectType;
    this.subjectTypeForm.selected = true;
  }


  export(type, data) {
    if (data === 'Product') {
      const body = {
        'items': this.productsDataSource.data,
        'FieldName': 'Setup.Product',
        'Type': type,
      };
      this.commonService.Export(body).subscribe(res => {
        window.open(res.FilePath);
      });
    }
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


  isAllSelected() {
    return this.selection.selected.length === this.productsDataSource.data.length;
  }
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.productsDataSource.data.forEach(row => this.selection.select(row));
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


  resetForm(form) {
    this.productForm = new Product();
    this.submit = false;
    this.subjectTypeForm = new ProductSubjectType();
    this.submit3 = false;
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
        this.http.post(this.productService.ApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadProductTable();
        });
        break;
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

        this.http.post(this.productsDetailService.ApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadSubjectType();
        });
        break;

    }

  }


  replaceFileName(fileName) {
    return fileName ? fileName.substring(fileName.indexOf('Images')) : '';
  }

  removeSubLineOfBusiness() {
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
      this.productDetail.Status = 1 ;
      this.productDetail.CreationDate = new Date();
    this.http.post(this.productsDetailService.ApiUrl + 'Create' , this.productDetail).subscribe(res => {
      console.log(res);
    });

    });
    console.log();
  }
addProductSubjectTypes() {
  this.selection4.selected.forEach(element => {
 this.productSubjectType = new ProductSubjectType();
   this.productSubjectType.SubjectTypeID = element.ID;
   this.productSubjectType.SubjectTypeParentID = element.Parent;
    this.productSubjectType.SubLineOfBusniess = element.SubLineOfBusniessID;
    this.productSubjectType.LineOfBusniess = element.LineOfBusniessID;
    this.productSubjectType.ProductID = this.productForm.ID;
    this.productSubjectType.ProductDetailsID = this.productsDetailForm.ID;
    this.productSubjectType.CreateBy = this.user.Name;
 
    this.productSubjectType.CreationDate = new Date();
  this.http.post(this.productSubjectTypeService.sebjectTypeApiUrl + 'Create' , this.productSubjectType).subscribe(res => {
    console.log(res);
  });

  });
}
  loadSubLinesOfBusiness(lob) {
    this.subLineService.load(null, lob ? lob : null, null, 1).subscribe(data => {
      this.SubLobs = data;
    });
  }




}
