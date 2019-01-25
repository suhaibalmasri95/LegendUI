import { LockUpService } from './../../../../../_services/_organization/LockUp.service';
import { CommonService } from './../../../../../_services/Common.service';
import { WordingService } from './../../../../../_services/_products/Wording.service';
import { HttpClient } from '@angular/common/http';
import { LockUp } from './../../../../../entities/organization/LockUp';
import { Wording, WordingDetail } from './../../../../../entities/Product/Attachment';
import { Product, ProductsDetail } from './../../../../../entities/Product/Products';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-productwording',
  templateUrl: './productwording.component.html',
  styleUrls: ['./productwording.component.css']
})
export class ProductwordingComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('product') product: Product;
  snackPosition: MatSnackBarHorizontalPosition;
  submit2: boolean;
  wordingDetailsForm: WordingDetail;
  wordingDetails: WordingDetail[];
  wordingForm: Wording;
  noSelectedWording = true;
  selectedWording: Wording;
  AddUpdateUrl: string;
  wordings: Wording[];
  submit3: boolean;
  wordingTableColumns = ['select', 'ID', 'NAME', 'NAME2', 'Type', 'Product', 'ProductDetail', 'actions'];
  wordingDataSource: MatTableDataSource<Wording>;
  WordingTypes: LockUp[];
  wordingDetailsTableColumns = ['select', 'ID', 'Serial', 'Product', 'ProductDetail', 'Service', 'AutoAdd', 'actions'];
  wordingDetailsDataSource: MatTableDataSource<WordingDetail>;
  selection2: SelectionModel<Wording>;
  selection3: SelectionModel<WordingDetail>;
  @ViewChild('paginator3') paginator3: MatPaginator;
  @ViewChild('paginator4') paginator4: MatPaginator;
  @ViewChild('table3', { read: MatSort }) sort3: MatSort;
  @ViewChild('table4', { read: MatSort }) sort4: MatSort;
  // tslint:disable-next-line:no-input-rename
  constructor(public snackBar: MatSnackBar, private http: HttpClient,
    private wordingService: WordingService,
    private commonService: CommonService,
    private lockUpService: LockUpService) { }

  ngOnInit() {
    this.selection2 = new SelectionModel<Wording>(true, []);
    this.selection3 = new SelectionModel<WordingDetail>(true, []);
    this.wordingForm = new Wording();
    this.submit2 = false;
    this.lockUpService.GetLockUpsByMajorCode(25).subscribe(res => {
      this.WordingTypes = res;
    });

    this.wordingService.load(null, null, null, 1).subscribe(res => {
      this.wordings = res;
    });



    this.wordingDetailsForm = new WordingDetail();

  }

  selectWording(wording) {
    this.noSelectedWording = false;
    this.selectedWording = wording;
    this.reloadWordingsDetailsTable(wording.ID);
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
      this.reloadWordingsTable(this.product);
      this.wordingForm = new Wording;
      this.submit2 = false;
      form.resetForm();
    });

  }

  deleteWording(id) {
    this.http.post(this.wordingService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadWordingsTable(this.product);
    });

  }

  updateWording(wording: Wording) {
    window.scroll(0, 0);
    this.wordingForm = new Wording;
    this.wordingForm = wording;
    this.wordingForm.selected = true;
  }

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

  export(type, data) {

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


}
