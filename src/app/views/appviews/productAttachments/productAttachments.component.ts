import { LockUpService } from './../../../_services/_organization/LockUp.service';
import { ProductReportService } from './../../../_services/_products/ProductReport.service';
import { Service } from './../../../entities/Setup/Diagnosis';
import { SubLineOfBusiness } from './../../../entities/Setup/SubLineOfBusiness';
import { LineOfBusiness } from './../../../entities/Setup/lineOfBusiness';
import { SubBusinessService } from './../../../_services/_setup/SubBusiness.service';
import { ProductsDetailService } from './../../../_services/_setup/ProductsDetail.service';
import { Product, ProductsDetail } from './../../../entities/Product/Products';
import { CommonService } from './../../../_services/Common.service';
import { Wording, ProductAttachment, ProductReport, WordingDetail, Attachment } from './../../../entities/Product/Attachment';
import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
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
export class ProductAttachmentsComponent implements OnChanges {
  // tslint:disable-next-line:no-input-rename
  @Input('product') product: Product;
  // tslint:disable-next-line:no-input-rename
  extraForm: string;
  snackPosition: MatSnackBarHorizontalPosition;

  noSelectedProduct = true;
  selectedProduct: Product;



  ProductFilter: number;
  attachmentFilter: number;
  attachmentsTypeFilter: number;
  wordingFilter: number;
  commisionFilter: number;

  Products: Product[];
  parentCodes: Product[];

  attachmentForm: ProductAttachment;
  productAttachment: ProductAttachment[];
  RelatedproductAttachment: ProductAttachment[];
  Attachments: Attachment[];


  productReportForm: ProductReport;
  productReports: ProductReport[];

  AddUpdateUrl: string;

  submit: boolean;

  submit2: boolean;

  productTableColumns = ['ID', 'Name', 'Name2', 'ProductCode', 'EffectiveDate', 'ExpiryDate', 'GroupIndividual'];
  productsDataSource: MatTableDataSource<Product>;

  attachmentTableColumns = ['select',  'NAME', 'NAME2', 'AttachmentLevel', 'IsRequired', 'Product', 'ProductDetail', 'actions'];
  attachmentsDataSource: MatTableDataSource<ProductAttachment>;


  unrelatedProductReportTableColumns = ['select', 'ReportName', 'ReportCode', 'ReportGroup'];
  unrelatedProductReportDataSource: MatTableDataSource<ProductReport>;

  productReportTableColumns = ['select','ReportName', 'ReportCode', 'ReportGroup', 'Product',
    'productDetail', 'ReportLevel', 'Status', 'IsRequired'];

  productReportDataSource: MatTableDataSource<ProductReport>;

  selection: SelectionModel<ProductAttachment>;

  selection4: SelectionModel<ProductReport>;
  selection5: SelectionModel<ProductReport>;

  selectedAttachment: any;
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;

  @ViewChild('paginator5') paginator5: MatPaginator;
  @ViewChild('paginator6') paginator6: MatPaginator;

  @ViewChild('table', { read: MatSort }) sort: MatSort;
  @ViewChild('table2', { read: MatSort }) sort2: MatSort;

  @ViewChild('table5', { read: MatSort }) sort5: MatSort;
  @ViewChild('table6', { read: MatSort }) sort6: MatSort;

  dropdownSettings = {};
  // tslint:disable-next-line:no-input-rename
  @Input('status') status: LockUp[];
  ReportLevels: LockUp[];
  AttachmentLevels: LockUp[];
  GroupIndividualLockups: LockUp[];
  ProductDetails: ProductsDetail[];
  selectedProductDetail: ProductsDetail;
  user: any;
  // tslint:disable-next-line:no-input-rename
  @Input('Lobs') Lobs: LineOfBusiness[];
  SubLobs: SubLineOfBusiness[];
  Services: Service[];

  constructor(public snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute,
    private attachmentsService: AttachmentsService, private subLineService: SubBusinessService,
    private productsDetailService: ProductsDetailService,
    private commonService: CommonService,
    private productReportService: ProductReportService ,
    private lockUpService: LockUpService ) { }

  ngOnChanges() {
    this.extraForm = 'attachments';
    this.snackPosition = 'right';
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'ID',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
    this.user = JSON.parse(localStorage.getItem('user'));
    this.selection = new SelectionModel<ProductAttachment>(true, []);
    this.attachmentForm = new ProductAttachment();
    this.selection4 = new SelectionModel<ProductReport>(true, []);
    this.selection5 = new SelectionModel<ProductReport>(true, []);
    this.noSelectedProduct = false;
 
    this.loadProductDetails(this.product.ID);
 
    this.productReportForm = new ProductReport();
    this.reloadAttachmentTable(this.product.ID);
    this.selectedProduct = new Product();
    this.selectedProduct = this.product;
   

    this.submit = false;

    this.submit2 = false;

/*     this.route.data.subscribe(data => {
      this.status = data.Status;
      this.Lobs = data.lineOfBusiness;
      this.ReportLevels = data.ReportLevels;
   
      this.AttachmentLevels = data.AttachmentLevels;

    


    }); */
    
    this.lockUpService.GetLockUpsByMajorCode(24).subscribe(res => {
      this.AttachmentLevels = res;
    });

    this.lockUpService.GetLockUpsByMajorCode(26).subscribe(res => {
      this.ReportLevels = res;
    });
  }





  applyFilter(filterValue: string) {
    switch (this.extraForm) {
      case 'attachments':
        this.attachmentsDataSource.filter = filterValue.trim().toLowerCase();
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
          this.extraForm = 'ProductReport';
          this.reloadProductReportTable(this.selectedProduct.ID);
          break;
      }
    });
  }

  reloadProductReportTable(ProductId?) {
    this.productReportService.loadRelated(null, ProductId, null, 1).subscribe(data => {
      this.renderProductReportTable( data.UnRelatedReports , data.RelatedReports);
    });
  }
  loadProductDetails(productsId = null) {
    this.productsDetailService.load(null, productsId, 1).subscribe(data => {
      this.ProductDetails = data;
    });
  }
  loadAttachments() {
    this.selectedProductDetail  = new ProductsDetail();
    this.ProductDetails.forEach(element => {
      if(element.ID == this.attachmentForm.ProductDetailId){
        this.selectedProductDetail = element;
        this.subLineService.load(null, element.LineOfBusniess , null, 1).subscribe(data => {
          this.SubLobs = data;
        });
        this.attachmentForm.LineOfBusiness = element.LineOfBusniess;
        this.attachmentForm.SubLineOfBusiness = element.SubLineOfBusniess;
      }
    });
    
    this.productsDetailService.loadUnRelatedAttachments(null, this.product.ID ,
       this.attachmentForm.ProductDetailId ,
       this.attachmentForm.AttachmentLevel , 1).subscribe(data => {
         // check if selected display attachments null and load current attachment and set it as selected
         if(this.attachmentForm.selected) {
          this.attachmentsService.load(this.attachmentForm.ID , null , null , 1).subscribe(attachment => {
            this.selectedAttachment = [ attachment[0] ] ;
            this.Attachments = [];
          });
         } else{
          this.Attachments = data.UnRelatedAttachment;
         }
  
      this.RelatedproductAttachment = data.RelatedAttachment;
    });
  }

  loadSubLinesOfBusiness(lob) {

  }

  reloadAttachmentTable(ProductId) {
    this.attachmentsService.load(null, ProductId, null, 1).subscribe(data => {
      this.renderAttachmentTable(data);
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


  renderProductReportTable(unrelated, related) {
    this.productReports = related;
    this.productReportDataSource = new MatTableDataSource<ProductReport>(related);
    this.productReportDataSource.paginator = this.paginator5;
    this.productReportDataSource.sort = this.sort5;
    this.selection5 = new SelectionModel<ProductReport>(true, []);
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
    this.selection4 = new SelectionModel<ProductReport>(true, []);
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
      if(this.attachmentForm.IsRequiredTemp) {
        this.attachmentForm.IsRequired = 1;
      } else {
        this.attachmentForm.IsRequired = 0;
      }
      for (let index = 0; index < this.selectedAttachment.length; index++) {
        const element: any = this.selectedAttachment[index];
       
          
          this.attachmentForm.StatusDate = new Date();
          this.attachmentForm.AttachmentID = element.ID;
          this.attachmentForm.Name = element.Name;
          this.attachmentForm.ProductId = this.product.ID;
      
        this.http.post(this.AddUpdateUrl, this.attachmentForm).subscribe(res => {
          this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadAttachmentTable(this.product.ID);
          this.attachmentForm = new ProductAttachment;
          this.submit = false;
          form.resetForm();
  
      });
     
     
    }
    } else {
      this.AddUpdateUrl = this.attachmentsService.ApiUrl + 'Create';
      for (let index = 0; index < this.selectedAttachment.length; index++) {
        const element: any = this.selectedAttachment[index];
        this.Attachments.forEach(item => {
          if (item.ID === element.ID) {
          this.attachmentForm.StatusDate = new Date();
          this.attachmentForm.AttachmentID = element.ID;
          this.attachmentForm.Name = item.Name;
          this.attachmentForm.ProductId = this.product.ID;
          if(this.attachmentForm.IsRequiredTemp) {
            this.attachmentForm.IsRequired = 1;
          } else{
            this.attachmentForm.IsRequired = 0;
          }
        this.http.post(this.AddUpdateUrl, this.attachmentForm).subscribe(res => {
          this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadAttachmentTable(this.product.ID);
          this.attachmentForm = new ProductAttachment;
          this.submit = false;
          form.resetForm();
        });
      }
        });
     
    }
    }


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
    if(this.attachmentForm.IsRequired === 1 ) {
      this.attachmentForm.IsRequiredTemp = true;
    }
    this.loadAttachments();
  }


  // add update delete Wording




  // add update delete Wording







  // add update delete ProductReport

  saveProductReport() {

    if (this.productReportForm.TempIsRequired === true) {
      this.productReportForm.IsRequired = 1;
    } else {
      this.productReportForm.IsRequired = 0;
    }
    this.selection4.selected.forEach(element => {
    
      this.productReportForm.ReportId = element.ID;
      this.productReportForm.Status = 1;
      this.productReportForm.Name = element.Name;
      this.productReportForm.Name2 = element.Name2;
      this.productReportForm.ReportCode = element.ReportCode;
      
      this.productReportForm.StatusDate = new Date();
      this.productReportForm.ProductId = this.product.ID;
      this.ProductDetails.forEach(item => {
        if (item.ID === this.productReportForm.ProductDetailId) {
        this.productReportForm.SubLineOfBusiness  = item.SubLineOfBusniess;
        this.productReportForm.LineOfBusiness  = item.LineOfBusniess;
      }
      });
      this.productReportForm.CreateBy = this.user.Name;
      this.productReportForm.CreationDate = new Date();
      this.productReportForm.StatusDate = new Date();
      this.http.post(this.productReportService.ApiUrl + 'Create' , this.productReportForm).subscribe(res =>{
        this.reloadProductReportTable(this.product.ID);
      });
    });
  }

  RemoveProductReport() {

  

    const Ids = [];
    this.selection5.selected.forEach(element => {

      Ids.push(element.ID);
    });
    this.http.post(this.productReportService.ApiUrl  + 'DeleteMultiple', { IDs: Ids }).subscribe(res => {
 
      this.reloadProductReportTable(this.product.ID);
    });
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


  isAllSelected4() {
    return this.selection4.selected.length === this.unrelatedProductReportDataSource.data.length;
  }
  masterToggle4() {
    this.isAllSelected4() ? this.selection4.clear() :
     this.unrelatedProductReportDataSource.data.forEach(row => this.selection4.select(row));
  }
  isAllSelected5() {
    return this.selection4.selected.length === this.productReportDataSource.data.length;
  }
  masterToggle5() {
    this.isAllSelected5() ? this.selection5.clear() : this.productReportDataSource.data.forEach(row => this.selection5.select(row));
  }

  resetForm(form) {
    this.submit = false;
    form.reset();
  }


  /*  deleteSelectedData() {
 
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
 
 
   } */

}
