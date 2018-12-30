import { Service } from './../../../entities/Setup/Diagnosis';
import { SubLineOfBusiness } from './../../../entities/Setup/SubLineOfBusiness';
import { LineOfBusiness } from './../../../entities/Setup/lineOfBusiness';
import { SubBusinessService } from './../../../_services/_setup/SubBusiness.service';
import { ProductsDetailService } from './../../../_services/_setup/ProductsDetail.service';
import { Product, ProductsDetail } from './../../../entities/Product/Products';
import { CommonService } from './../../../_services/Common.service';
import { Wording, ProductAttachment, ProductReport, WordingDetail, Attachment } from './../../../entities/Product/Attachment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { LockUp } from '../../../entities/organization/LockUp';
import { WordingService } from '../../../_services/_products/Wording.service';
import { AttachmentsService } from '../../../_services/_products/Attachments.service';

@Component({
  selector: 'app-product-attachments',
  templateUrl: './product-attachments.component.html',
  styleUrls: ['./productAttachments.component.css']
})
export class ProductAttachmentsComponent implements OnInit {

  extraForm: string;
  snackPosition: MatSnackBarHorizontalPosition;

  noSelectedProduct = true;
  selectedProduct: Product;

  noSelectedWording = true;
  selectedWording: Wording;

  ProductFilter: number;
  attachmentFilter: number;
  attachmentsTypeFilter: number;
  wordingFilter: number;
  commisionFilter: number;

  Products: Product[];
  parentCodes: Product[];

  attachmentForm: ProductAttachment;
  productAttachment: ProductAttachment[];

  Attachments: Attachment[];

  wordingForm: Wording;
  wordings: Wording[];

  wordingDetailsForm: WordingDetail;
  wordingDetails: WordingDetail[];

  productReportForm: ProductReport;
  productReports: ProductReport[];

  AddUpdateUrl: string;

  submit: boolean;
  submit2: boolean;
  submit3: boolean;

  productTableColumns = ['ID', 'Name', 'Name2', 'ProductCode', 'EffectiveDate', 'ExpiryDate', 'GroupIndividual'];
  productsDataSource: MatTableDataSource<Product>;

  attachmentTableColumns = ['select', 'ID', 'NAME', 'NAME2', 'AttachmentLevel', 'IsRequired', 'Product', 'ProductDetail', 'actions'];
  attachmentsDataSource: MatTableDataSource<ProductAttachment>;

  wordingTableColumns = ['select', 'ID', 'NAME', 'NAME2', 'Type', 'Product', 'ProductDetail', 'actions'];
  wordingDataSource: MatTableDataSource<Wording>;

  wordingDetailsTableColumns = ['select', 'ID', 'Serial', 'Product', 'ProductDetail', 'Service', 'AutoAdd', 'actions'];
  wordingDetailsDataSource: MatTableDataSource<WordingDetail>;

  unrelatedProductReportTableColumns = ['select', 'ID', 'ReportName', 'ReportCode', 'ReportGroup'];
  unrelatedProductReportDataSource: MatTableDataSource<ProductReport>;

  productReportTableColumns = ['select', 'ID', 'ReportName', 'ReportCode', 'ReportGroup', 'Product',
    'productDetail', 'ReportLevel', 'Status', 'IsRequired'];

  productReportDataSource: MatTableDataSource<ProductReport>;

  selection: SelectionModel<ProductAttachment>;
  selection2: SelectionModel<Wording>;
  selection3: SelectionModel<WordingDetail>;
  selection4: SelectionModel<ProductReport>;
  selection5: SelectionModel<ProductReport>;


  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;
  @ViewChild('paginator4') paginator4: MatPaginator;
  @ViewChild('paginator5') paginator5: MatPaginator;
  @ViewChild('paginator6') paginator6: MatPaginator;

  @ViewChild('table', { read: MatSort }) sort: MatSort;
  @ViewChild('table2', { read: MatSort }) sort2: MatSort;
  @ViewChild('table3', { read: MatSort }) sort3: MatSort;
  @ViewChild('table4', { read: MatSort }) sort4: MatSort;
  @ViewChild('table5', { read: MatSort }) sort5: MatSort;
  @ViewChild('table6', { read: MatSort }) sort6: MatSort;


  status: LockUp[];
  ReportLevels: LockUp[];
  AttachmentLevels: LockUp[];
  GroupIndividualLockups: LockUp[];
  ProductDetails: ProductsDetail[];
  WordingTypes: LockUp[];
  Lobs: LineOfBusiness[];
  SubLobs: SubLineOfBusiness[];
  Services: Service[];

  constructor(public snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute,
    private wordingService: WordingService,
    private attachmentsService: AttachmentsService, private subLineService: SubBusinessService,
    private productsDetailService: ProductsDetailService, private commonService: CommonService) { }

  ngOnInit() {
    this.extraForm = 'attachments';
    this.snackPosition = 'right';

    this.selection = new SelectionModel<ProductAttachment>(true, []);
    this.selection2 = new SelectionModel<Wording>(true, []);
    this.selection3 = new SelectionModel<WordingDetail>(true, []);
    this.selection4 = new SelectionModel<ProductReport>(true, []);
    this.selection5 = new SelectionModel<ProductReport>(true, []);


    this.selectedProduct = new Product();

    this.attachmentForm = new ProductAttachment();
    this.wordingForm = new Wording();
    this.wordingDetailsForm = new WordingDetail();

    this.submit = false;
    this.submit2 = false;
    this.submit3 = false;

    this.route.data.subscribe(data => {
      this.Products = data.Products;
      this.status = data.Status;
      this.Lobs = data.lineOfBusiness;
      this.ReportLevels = data.ReportLevels;
      this.Services = data.Services;
      this.AttachmentLevels = data.AttachmentLevels;
      this.WordingTypes = data.WordingTypes;
      this.GroupIndividualLockups = data.GroupIndividualLockups;

      this.renderProductTable(data.Products);
    });

  }

  selectProduct(product) {

    this.noSelectedProduct = false;
    this.selectedProduct = product;
    this.loadProductDetails(product.ID);
    this.loadAttachments();

    switch (this.extraForm) {
      case 'attachments':
        this.reloadAttachmentTable(this.selectedProduct.ID);
        break;
      case 'wordings':
        this.reloadWordingsTable(this.selectedProduct.ID);
        break;
      case 'ProductReport':
        this.reloadProductReportTable(this.selectedProduct.ID);
        break;
    }

    window.scroll(1000, 1000);

  }

  selectWording(wording) {
    this.noSelectedWording = false;
    this.selectedWording = wording;
    this.reloadWordingsDetailsTable(wording.ID);
  }

  applyFilter(filterValue: string) {
    switch (this.extraForm) {
      case 'attachments':
        this.attachmentsDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'wordings':
        this.wordingDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'commision':
        this.productReportDataSource.filter = filterValue.trim().toLowerCase();
        break;

    }
  }

  changeTab($event) {
    setTimeout(() => {
      switch ($event.index) {
        case 0:
          this.extraForm = 'attachments';
          this.reloadAttachmentTable(this.selectedProduct.ID);
          break;
        case 1:
          this.extraForm = 'wordings';
          this.reloadWordingsTable(this.selectedProduct.ID);
          break;
        case 2:
          this.extraForm = 'ProductReport';
          this.reloadProductReportTable(this.selectedProduct.ID);
          break;
      }
    });
  }


  loadProductDetails(productsId = null) {
    this.productsDetailService.load(null, productsId, 1).subscribe(data => {
      this.ProductDetails = data;
    });
  }
  loadAttachments() {
    this.productsDetailService.loadAttachments(null, 1).subscribe(data => {
      this.Attachments = data;
    });
  }

  loadSubLinesOfBusiness(lob) {
    this.subLineService.load(null, lob ? lob : null, null, 1).subscribe(data => {
      this.SubLobs = data;
    });
  }

  reloadAttachmentTable(ProductId) {
    this.attachmentsService.load(null, ProductId, null, 1).subscribe(data => {
      this.renderAttachmentTable(data);
    });
  }

  reloadWordingsTable(ProductId) {
    this.wordingService.load(null, ProductId, null, 1).subscribe(data => {
      this.renderWordingsTable(data);
    });
  }
  reloadWordingsDetailsTable(wordingId) {
    this.wordingService.loadDetails(null, wordingId, null, 1).subscribe(data => {
      this.renderWordingsDetailsTable(data);
    });
  }

  reloadProductReportTable(ProductId?) {
    this.wordingService.load(null, ProductId, null, 1).subscribe(data => {
      this.renderProductReportTable(data, data);
    });
  }


  renderProductTable(data) {
    this.Products = data;
    this.productsDataSource = new MatTableDataSource<Product>(data);
    this.productsDataSource.paginator = this.paginator;
    this.productsDataSource.sort = this.sort;
    this.productsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  renderAttachmentTable(data) {
    this.productAttachment = data;
    this.attachmentsDataSource = new MatTableDataSource<ProductAttachment>(data);
    this.attachmentsDataSource.paginator = this.paginator2;
    this.attachmentsDataSource.sort = this.sort2;
    this.selection = new SelectionModel<ProductAttachment>(true, []);
    this.attachmentsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort2.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  renderWordingsTable(data) {
    this.wordings = data;
    this.wordingDataSource = new MatTableDataSource<Wording>(data);
    this.wordingDataSource.paginator = this.paginator3;
    this.wordingDataSource.sort = this.sort3;
    this.selection2 = new SelectionModel<Wording>(true, []);
    this.wordingDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort3.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  renderWordingsDetailsTable(data) {
    this.wordings = data;
    this.wordingDetailsDataSource = new MatTableDataSource<WordingDetail>(data);
    this.wordingDetailsDataSource.paginator = this.paginator4;
    this.wordingDetailsDataSource.sort = this.sort4;
    this.selection3 = new SelectionModel<WordingDetail>(true, []);
    this.wordingDetailsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort4.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  renderProductReportTable(unrelated, related) {
    this.productReports = related;
    this.productReportDataSource = new MatTableDataSource<ProductReport>(related);
    this.productReportDataSource.paginator = this.paginator5;
    this.productReportDataSource.sort = this.sort5;
    this.selection4 = new SelectionModel<ProductReport>(true, []);
    this.productReportDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort5.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };


    this.unrelatedProductReportDataSource = new MatTableDataSource<ProductReport>(unrelated);
    this.unrelatedProductReportDataSource.paginator = this.paginator6;
    this.unrelatedProductReportDataSource.sort = this.sort6;
    this.selection5 = new SelectionModel<ProductReport>(true, []);
    this.unrelatedProductReportDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort6.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };

  }


  // add update delete Attachment

  saveAttachment(form) {
    if (form.invalid) { return; }
    this.attachmentForm = this.attachmentForm.selected ? this.attachmentForm : Object.assign({}, form.value);
    // this.attachmentForm.CreatedBy = 'Admin';
    // this.attachmentForm.LockUpType = 2;
    // this.attachmentForm.LockUpChargeType = 2;
    if (this.attachmentForm.selected) {
      this.AddUpdateUrl = this.attachmentsService.ApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.attachmentsService.ApiUrl + 'Create';
    }
    this.http.post(this.AddUpdateUrl, this.attachmentForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadAttachmentTable(this.selectedProduct.ID);
      this.attachmentForm = new ProductAttachment;
      this.submit = false;
      form.resetForm();
    });

  }

  deleteAttachment(id) {
    this.http.post(this.attachmentsService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadAttachmentTable(this.selectedProduct.ID);
    });
  }

  updateAttachment(attachment: ProductAttachment) {
    window.scroll(0, 0);
    this.attachmentForm = new ProductAttachment;
    this.attachmentForm = attachment;
    this.attachmentForm.selected = true;
  }


  // add update delete Wording

  saveWording(form) {
    if (form.invalid) { return; }
    this.wordingForm = this.wordingForm.selected ? this.wordingForm : Object.assign({}, form.value);
    // this.wordingForm.LockUpChargeType = 3;
    if (this.wordingForm.selected) {
      this.AddUpdateUrl = this.wordingService.ApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.wordingService.ApiUrl + 'Create';
    }
    this.http.post(this.AddUpdateUrl, this.wordingForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadWordingsTable(this.selectedProduct);
      this.wordingForm = new Wording;
      this.submit2 = false;
      form.resetForm();
    });

  }

  deleteWording(id) {
    this.http.post(this.wordingService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadWordingsTable(this.selectedProduct);
    });

  }

  updateWording(wording: Wording) {
    window.scroll(0, 0);
    this.wordingForm = new Wording;
    this.wordingForm = wording;
    this.wordingForm.selected = true;
  }
  // add update delete Wording

  saveWordingDetails(form) {
    if (form.invalid) { return; }
    this.wordingDetailsForm = this.wordingDetailsForm.selected ? this.wordingDetailsForm : Object.assign({}, form.value);
    // this.wordingForm.LockUpChargeType = 3;
    if (this.wordingDetailsForm.selected) {
      this.AddUpdateUrl = this.wordingService.ApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.wordingService.ApiUrl + 'Create';
    }
    this.http.post(this.AddUpdateUrl, this.wordingDetailsForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadWordingsDetailsTable(this.selectedWording);
      this.wordingDetailsForm = new WordingDetail;
      this.submit3 = false;
      form.resetForm();
    });

  }

  deleteWordingDetails(id) {
    this.http.post(this.wordingService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadWordingsDetailsTable(this.selectedWording);
    });

  }

  updateWordingDetails(wordingDetails: WordingDetail) {
    window.scroll(0, 0);
    this.wordingDetailsForm = new WordingDetail;
    this.wordingDetailsForm = wordingDetails;
    this.wordingDetailsForm.selected = true;
  }



  // add update delete ProductReport

  saveProductReport() {


  }

  deleteProductReport() {


  }

  updateProductReport(productReport: ProductReport) {

  }


  export(type, data) {
    if (data === 'attachments') {
      const body = {
        'items': this.attachmentsDataSource.data,
        'FieldName': 'Setup.Charge',
        'Type': type,
      };
      this.commonService.Export(body).subscribe(res => {
        window.open(res.FilePath);
      });
    }
    if (data === 'wording') {
      const body = {
        'items': this.wordingDataSource.data,
        'FieldName': 'Setup.Charge',
        'Type': type,
      };
      this.commonService.Export(body).subscribe(res => {
        window.open(res.FilePath);
      });
    }
    if (data === 'wordingDetails') {
      const body = {
        'items': this.wordingDetailsDataSource.data,
        'FieldName': 'Setup.Charge',
        'Type': type,
      };
      this.commonService.Export(body).subscribe(res => {
        window.open(res.FilePath);
      });
    }
    if (data === 'productReport') {
      const body = {
        'items': this.productReportDataSource.data,
        'FieldName': 'Setup.Charge',
        'Type': type,
      };
      this.commonService.Export(body).subscribe(res => {
        window.open(res.FilePath);
      });
    }
  }

  getProductName(id: number) {
    for (let index = 0; index < this.Products.length; index++) {
      if (this.Products[index].ID === id) {
        return this.Products[index].Name;
      }
    }
  }



  isAllSelected() {
    return this.selection.selected.length === this.attachmentsDataSource.data.length;
  }
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.attachmentsDataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected2() {
    return this.selection2.selected.length === this.wordingDataSource.data.length;
  }
  masterToggle2() {
    this.isAllSelected2() ? this.selection2.clear() : this.wordingDataSource.data.forEach(row => this.selection2.select(row));
  }

  isAllSelected3() {
    return this.selection3.selected.length === this.wordingDetailsDataSource.data.length;
  }
  masterToggle3() {
    this.isAllSelected3() ? this.selection3.clear() : this.wordingDetailsDataSource.data.forEach(row => this.selection3.select(row));
  }
  isAllSelected4() {
    return this.selection4.selected.length === this.productReportDataSource.data.length;
  }
  masterToggle4() {
    this.isAllSelected4() ? this.selection4.clear() : this.productReportDataSource.data.forEach(row => this.selection4.select(row));
  }

  resetForm(form) {
    this.submit = false;
    form.reset();
  }


  deleteSelectedData() {

    const selectedData = [];
    switch (this.extraForm) {

      case 'attachments':
        for (let index = 0; index < this.selection2.selected.length; index++) {
          selectedData.push(this.selection2.selected[index].ID);
        }
        this.http.post(this.attachmentsService.ApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadAttachmentTable(this.selectedProduct.ID);
        });
        break;
      case 'wordings':
        for (let index = 0; index < this.selection3.selected.length; index++) {
          selectedData.push(this.selection3.selected[index].ID);
        }
        this.http.post(this.wordingService.ApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadWordingsTable(this.selectedProduct.ID);
        });
        break;
    }


  }

}
