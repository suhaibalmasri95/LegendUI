import { LockUpService } from './../../../_services/_organization/LockUp.service';
import { SubjectTypeService } from './../../../_services/_setup/SubjectType.service';
import { LineOfBusiness } from './../../../entities/Setup/lineOfBusiness';
import { CommonService } from './../../../_services/Common.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Product, ProductsDetail, SubjectType } from '../../../entities/Setup/Products';
import { LockUp } from '../../../entities/organization/LockUp';
import { Currency } from '../../../entities/organization/Currency';
import { ProductsService } from '../../../_services/_setup/Products.service';
import { ProductsDetailService } from './../../../_services/_setup/ProductsDetail.service';
import { SubLineOfBusiness } from './../../../entities/Setup/SubLineOfBusiness';


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
  ProductLevel: LockUp[];

  ProductsDetailType: LockUp[];
  LineOfBusinesses: LineOfBusiness[];
  SubLineOfBusinesses: SubLineOfBusiness[];
  currencies: Currency[];
  minor: LockUp;

  submit: boolean;
  submit2: boolean;
  submit3: boolean;
  AddUpdateUrl: string;
  productTableColumns = ['select', 'ID', 'Name', 'Name2', 'APPLYON', 'LINEOFBUSINESS', 'SUBLINEOFBUSINESS', 'actions'];
  productsDataSource: MatTableDataSource<Product>;

  productsDetailTableColumns = ['select', 'ID', 'Name', 'Name2', 'ORDER', 'QUESTIONTYPE', 'QUESTIONNAIRE', 'actions'];
  productsDetailsDataSource: MatTableDataSource<ProductsDetail>;

  subjectTypesTableColumns = ['select', 'ID', 'Name', 'Name2', 'ORDER', 'actions'];
  subjectTypesDataSource: MatTableDataSource<SubjectType>;

  selection: SelectionModel<Product>;
  selection2: SelectionModel<ProductsDetail>;
  selection3: SelectionModel<SubjectType>;
  extraForm: string;

  snackPosition: MatSnackBarHorizontalPosition;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;

  @ViewChild('table', { read: MatSort }) sort: MatSort;
  @ViewChild('table2', { read: MatSort }) sort2: MatSort;
  @ViewChild('table3', { read: MatSort }) sort3: MatSort;

  constructor(public snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute,
    private productService: ProductsService, private productsDetailService: ProductsDetailService,
    private commonService: CommonService, private subjectTypeService: SubjectTypeService, private lockUpService: LockUpService) { }

  ngOnInit() {
    this.extraForm = '';
    const initialSelection = [];

    this.selection = new SelectionModel<Product>(true, initialSelection);
    this.selection2 = new SelectionModel<ProductsDetail>(true, initialSelection);

    this.snackPosition = 'right';

    this.productForm = new Product();
    this.productsDetailForm = new ProductsDetail();
    this.subjectTypeForm = new SubjectType();

    this.submit = false;
    this.submit2 = false;
    this.route.data.subscribe(data => {
      this.products = data.products;
      this.ProductLevel = data.appliedOn;
      this.LineOfBusinesses = data.lineOfBusiness;
      this.SubLineOfBusinesses = data.subLineOfBusiness;
      this.LockUps = data.Status;
      this.renderProductTable(data.products);
    });

    this.minor = new LockUp();
  }


  applyFilter(filterValue: string) {
    switch (this.extraForm) {
      case '':
        this.productsDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'productsDetails':
        this.productsDetailsDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'subjectTypes':
        this.subjectTypesDataSource.filter = filterValue.trim().toLowerCase();
        break;
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
          this.loadQuestType();
          this.reloadProductsDetailTable(this.productForm.ID ? this.productForm.ID : null);
          //  this.reloadSubjectTypeTableTable(this.productsDetailForm.ID ? this.productsDetailForm.ID : null);
          break;

      }
    });
  }

  loadQuestType() {
    this.lockUpService.LoadLockUpsByMajorCode(18).subscribe(res => {
      this.ProductsDetailType = res;
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
  }

  renderSubjectTypeTable(data) {
    this.subjectTypes = data;
    this.subjectTypesDataSource = new MatTableDataSource<SubjectType>(data);
    this.subjectTypesDataSource.paginator = this.paginator3;
    this.subjectTypesDataSource.sort = this.sort3;
    this.selection3 = new SelectionModel<SubjectType>(true, []);
    this.subjectTypesDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort2.direction === 'asc' ? '3' : '1';
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

  reloadProductsDetailTable(productsDetailId = null) {
    this.productsDetailService.load(null, null, productsDetailId, 1).subscribe(data => {
      this.renderProductsDetailTable(data);
    });
  }
  reloadSubjectTypeTableTable(productsDetail = null) {
    if (productsDetail === null) {
      this.renderSubjectTypeTable([]);
    }
    this.subjectTypeService.load(null, productsDetail, 1).subscribe(data => {
      this.renderSubjectTypeTable(data);
    });
  }


  onProductsDetailType(productsDetailType) {
    for (let index = 0; index < this.ProductsDetailType.length; index++) {
      if (this.ProductsDetailType[index].ID === productsDetailType) {
        this.minor = this.ProductsDetailType[index];
      }
    }
    if (this.minor.MinorCode === 5) {
      this.lockUpService.LoadLockUpsForQuestionnaire(1).subscribe(res => {
        this.ProductsDetailLockUp = res;
      });
    }
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
      this.AddUpdateUrl = this.subjectTypeService.ApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.subjectTypeService.ApiUrl + 'Create';
    }
    this.subjectTypeForm.QuestionnaireID = this.productsDetailForm.ID;
    this.http.post(this.AddUpdateUrl, this.subjectTypeForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadSubjectTypeTableTable(this.productsDetailForm.ID);
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
    this.http.post(this.subjectTypeService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadSubjectTypeTableTable(this.productsDetailForm.ID);
    });
  }

  updateProduct(product: Product) {
    window.scroll(0, 0);
    this.productForm = new Product;
    this.productForm = product;
    this.productForm.selected = true;
  }


  updateProductsDetail(productsDetail: ProductsDetail) {
    window.scroll(0, 1000);
    this.productsDetailForm = new ProductsDetail;
    this.productsDetailForm = productsDetail;
    this.productsDetailForm.selected = true;

    this.reloadSubjectTypeTableTable(this.productsDetailForm.ID);
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
        'items': this.subjectTypesDataSource.data,
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


  isAllSelected() {
    return this.selection.selected.length === this.productsDataSource.data.length;
  }
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.productsDataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected2() {
    return this.selection2.selected.length === this.productsDetailsDataSource.data.length;
  }
  masterToggle2() {
    this.isAllSelected2() ? this.selection2.clear() : this.productsDetailsDataSource.data.forEach(row => this.selection2.select(row));
  }

  isAllSelected3() {
    return this.selection3.selected.length === this.subjectTypesDataSource.data.length;
  }
  masterToggle3() {
    this.isAllSelected2() ? this.selection3.clear() : this.subjectTypesDataSource.data.forEach(row => this.selection3.select(row));
  }


  resetForm(form) {
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

        this.http.post(this.subjectTypeService.ApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadSubjectTypeTableTable();
        });
        break;

    }

  }

}
