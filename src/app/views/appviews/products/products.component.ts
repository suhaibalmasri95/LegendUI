import { SubjectTypesService } from './../../../_services/_setup/SubjectTypes.service';
import { ProductQuestionnaireService } from './../../../_services/_setup/productQuestionnaires.service';
import { LineOfBusiness } from './../../../entities/Setup/lineOfBusiness';
import { CommonService } from './../../../_services/Common.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Product, ProductsDetail, SubjectType, ProductQuestionnaire } from '../../../entities/Product/Products';
import { LockUp } from '../../../entities/organization/LockUp';
import { ProductsService } from '../../../_services/_setup/Products.service';
import { ProductsDetailService } from './../../../_services/_setup/ProductsDetail.service';
import { SubLineOfBusiness } from './../../../entities/Setup/SubLineOfBusiness';
import { SubBusinessService } from './../../../_services/_setup/SubBusiness.service';


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

  subjectTypeForm: SubjectType;
  subjectTypes: SubjectType[];

  LockUps: LockUp[];
  ProductsDetailLockUp: LockUp[];

  Lobs: LineOfBusiness[];
  SubLobs: SubLineOfBusiness[];

  excessFroms: LockUp[];
  GroupIndividualLockups: LockUp[];


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
  subjectTypesPDDataSource: MatTableDataSource<SubjectType>;

  notRelatedQuestionnairesColumns = ['select', 'ID', 'lob', 'subLob'];
  notRelatedQuestionnairesDataSource: MatTableDataSource<ProductQuestionnaire>;

  relatedQuestionnairesTableColumns = ['select', 'ID', 'lob', 'subLob', 'Product', 'ProductDetail'];
  relatedQuestionnairesDataSource: MatTableDataSource<ProductQuestionnaire>;

  selection: SelectionModel<Product>;
  selection2: SelectionModel<ProductsDetail>;
  selection3: SelectionModel<ProductsDetail>;
  selection4: SelectionModel<SubjectType>;
  selection5: SelectionModel<SubjectType>;
  selection6: SelectionModel<ProductQuestionnaire>;
  selection7: SelectionModel<ProductQuestionnaire>;
  extraForm: string;

  snackPosition: MatSnackBarHorizontalPosition;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;
  @ViewChild('paginator4') paginator4: MatPaginator;
  @ViewChild('paginator5') paginator5: MatPaginator;
  @ViewChild('paginator6') paginator6: MatPaginator;
  @ViewChild('paginator7') paginator7: MatPaginator;

  @ViewChild('table', { read: MatSort }) sort: MatSort;
  @ViewChild('table2', { read: MatSort }) sort2: MatSort;
  @ViewChild('table3', { read: MatSort }) sort3: MatSort;
  @ViewChild('table4', { read: MatSort }) sort4: MatSort;
  @ViewChild('table5', { read: MatSort }) sort5: MatSort;
  @ViewChild('table6', { read: MatSort }) sort6: MatSort;
  @ViewChild('table7', { read: MatSort }) sort7: MatSort;

  constructor(public snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute,
    private productService: ProductsService, private productsDetailService: ProductsDetailService,
    private productQuestionnaireService: ProductQuestionnaireService,
    private subLineService: SubBusinessService, private commonService: CommonService,
    private subjectTypesService: SubjectTypesService) { }

  ngOnInit() {
    this.extraForm = '';
    const initialSelection = [];

    this.selection = new SelectionModel<Product>(true, initialSelection);
    this.selection2 = new SelectionModel<ProductsDetail>(true, initialSelection);
    this.selection3 = new SelectionModel<ProductsDetail>(true, initialSelection);
    this.selection4 = new SelectionModel<SubjectType>(true, initialSelection);
    this.selection5 = new SelectionModel<SubjectType>(true, initialSelection);
    this.selection6 = new SelectionModel<ProductQuestionnaire>(true, initialSelection);
    this.selection7 = new SelectionModel<ProductQuestionnaire>(true, initialSelection);

    this.snackPosition = 'right';

    this.productForm = new Product();
    this.productsDetailForm = new ProductsDetail();
    this.subjectTypeForm = new SubjectType();

    this.submit = false;
    this.submit2 = false;
    this.route.data.subscribe(data => {
      this.products = data.products;
      this.Lobs = data.lineOfBusiness;
      this.LockUps = data.Status;
      this.excessFroms = data.excessFrom;
      this.GroupIndividualLockups = data.GroupIndividualLockups;

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

    this.subjectTypesPDDataSource = new MatTableDataSource<SubjectType>(UnRelatedSubject);
    this.subjectTypesPDDataSource.paginator = this.paginator5;
    this.subjectTypesPDDataSource.sort = this.sort5;
    this.selection5 = new SelectionModel<SubjectType>(true, []);
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
    this.productQuestionnaireService.LoadQuestionnaire(null, productsDetailId, 1).subscribe(data => {
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
      this.AddUpdateUrl = this.subjectTypesService.sebjectTypeApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.subjectTypesService.sebjectTypeApiUrl + 'Create';
    }
    this.subjectTypeForm.QuestionnaireID = this.productsDetailForm.ID;
    this.http.post(this.AddUpdateUrl, this.subjectTypeForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadSubjectType(this.productsDetailForm.ID);
      this.subjectTypeForm = new SubjectType();
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

    this.productsDetailService.loadSubjectTypes(this.productsDetailForm.ID, 1).subscribe(data => {
      this.renderSubjectTypeTable(data.RelatedSubject, data.UnRelatedSubject);
      this.showSubTypes = true;
      window.scroll(0, 1000);
      this.productsDetailForm = new ProductsDetail;
      this.productsDetailForm = productsDetail;
      this.productsDetailForm.selected = true;

    });

  }



  updateSubjectType(subjectType: SubjectType) {
    window.scroll(0, 0);
    this.subjectTypeForm = new SubjectType;
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


  resetForm(form) {
    this.productForm = new Product();
    this.submit = false;
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

  addSubLineOfBusiness() {
  }

  loadSubLinesOfBusiness(lob) {
    this.subLineService.load(null, lob ? lob : null, null, 1).subscribe(data => {
      this.SubLobs = data;
    });
  }




}
