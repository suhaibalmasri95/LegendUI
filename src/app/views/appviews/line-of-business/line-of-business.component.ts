
import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { LineOfBusiness } from '../../../entities/Setup/lineOfBusiness';
import { SubLineOfBusiness } from '../../../entities/Setup/SubLineOfBusiness';
import { LockUp } from '../../../entities/organization/LockUp';
import { SubjectType } from '../../../entities/Setup/SubjectType';
import { SubBusinessService } from '../../../_services/_setup/SubBusiness.service';
import { LineOfBusinessService } from '../../../_services/_setup/LineOfBusiness.service';
import { SubjectTypesService } from '../../../_services/_setup/SubjectTypes.service';

@Component({
  selector: 'app-line-of-business',
  templateUrl: './line-of-business.component.html',
  styleUrls: ['./line-of-business.component.css']
})

export class LineOfBusinessComponent implements OnInit {
  lineOfBusinessForm: LineOfBusiness;
  linesOfBusiness: LineOfBusiness[];
  subLineOfBusinessForm: SubLineOfBusiness;
  subLinesOfBusiness: SubLineOfBusiness[];
  subjectTypeForm: SubjectType;
  subjectTypes: SubjectType[];
  parentSubjectTypes: SubjectType[];
  LockUps: LockUp[];
  Lobs: LockUp[];
  excessFroms: LockUp[];
  Modules: LockUp[];
  SubLobs: LockUp[];
  ReinsTypes: LockUp[];
  submit: boolean;
  submit2: boolean;
  submit3: boolean;
  // tslint:disable-next-line:max-line-length
  lineOfBusinessTableColumns = ['select', 'ID', 'BasicLOB', 'CODE', 'NAME', 'NAME2', 'MODULE', 'actions'];
  linesOfBusinessDataSource: MatTableDataSource<LineOfBusiness>;

  subLineOfBusinessTableColumns = ['select', 'ID', 'NAME', 'NAME2', 'BasicLOB', 'actions'];
  subLinesOfBusinessDataSource: MatTableDataSource<SubLineOfBusiness>;

  subjectTypeTableColumns = ['select', 'ID', 'NAME', 'NAME2', 'LINEOFBUSINESS', 'SUBLINEOFBUSINESS', 'actions'];
  subjectTypesDataSource: MatTableDataSource<SubjectType>;
  AddUpdateUrl: string;
  selection: SelectionModel<LineOfBusiness>;
  selection2: SelectionModel<SubLineOfBusiness>;
  selection3: SelectionModel<SubjectType>;

  uploader: FileUploader;
  extraForm: string;

  snackPosition: MatSnackBarHorizontalPosition;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;

  @ViewChild('table', { read: MatSort }) sort: MatSort;
  @ViewChild('table2', { read: MatSort }) sort2: MatSort;
  @ViewChild('table3', { read: MatSort }) sort3: MatSort;

  constructor(public snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute,
    private SubLineService: SubBusinessService, private lineOfBusService: LineOfBusinessService
    , private SubjectTypeService: SubjectTypesService) { }

  ngOnInit() {
    this.extraForm = '';
    this.snackPosition = 'right';

    this.selection = new SelectionModel<LineOfBusiness>(true, []);
    this.selection2 = new SelectionModel<SubLineOfBusiness>(true, []);
    this.selection3 = new SelectionModel<SubjectType>(true, []);

    this.lineOfBusinessForm = new LineOfBusiness();
    this.subLineOfBusinessForm = new SubLineOfBusiness();
    this.subjectTypeForm = new SubjectType();
    this.submit = false;
    this.submit2 = false;
    this.submit3 = false;

    this.route.data.subscribe(data => {
      this.linesOfBusiness = data.lineOfBusiness;
      this.Lobs = data.lineOfBusinessLockUp;
      this.Modules = data.module;
      this.SubLobs = data.subLineOfBusinessLockUp;
      this.ReinsTypes = data.renisType;
      this.LockUps = data.lockUp;
      this.excessFroms = data.excessFrom;
      this.renderLineOfBusinessTable(data.lineOfBusiness);
    });

  }



  applyFilter(filterValue: string) {
    switch (this.extraForm) {
      case '':
        this.linesOfBusinessDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'subLineOfBusiness':
        this.subLinesOfBusinessDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'subjectType':
        this.subjectTypesDataSource.filter = filterValue.trim().toLowerCase();
        break;
    }
  }


  changeTab($event) {
    setTimeout(() => {
      switch ($event.index) {
        case 0:
          this.extraForm = '';
          // tslint:disable-next-line:max-line-length
          this.linesOfBusinessDataSource.paginator = this.linesOfBusinessDataSource.paginator ? this.linesOfBusinessDataSource.paginator : this.paginator;
          break;
        case 1:
          this.extraForm = 'subLineOfBusiness';
          this.reloadSubLineOfBusinessTable(this.lineOfBusinessForm.ID ? this.lineOfBusinessForm.ID : null);
          break;
        case 2:
          this.extraForm = 'subjectType';
          this.LoadparentSubjectTypes();
          // tslint:disable-next-line:max-line-length
          this.reloadSubjectTypeTable(this.subLineOfBusinessForm.ID ? this.subLineOfBusinessForm.ID : null, this.subLineOfBusinessForm.ID ? this.subLineOfBusinessForm.ID : null);
          break;
      }
    });
  }

  renderLineOfBusinessTable(data) {
    this.linesOfBusiness = data;
    this.linesOfBusinessDataSource = new MatTableDataSource<LineOfBusiness>(data);
    this.linesOfBusinessDataSource.paginator = this.paginator;
    this.linesOfBusinessDataSource.sort = this.sort;
    this.selection = new SelectionModel<LineOfBusiness>(true, []);
    this.linesOfBusinessDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }

      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();

    };
  }

  LoadparentSubjectTypes() {
    this.SubjectTypeService.load().subscribe(res => {
      this.parentSubjectTypes = res;
    });
  }
  renderSubLineOfBusinessTable(data) {
    this.subLinesOfBusiness = data;
    this.subLinesOfBusinessDataSource = new MatTableDataSource<SubLineOfBusiness>(data);
    this.subLinesOfBusinessDataSource.paginator = this.paginator2;
    this.subLinesOfBusinessDataSource.sort = this.sort2;
    this.selection2 = new SelectionModel<SubLineOfBusiness>(true, []);
    this.subLinesOfBusinessDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
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
        return this.sort.direction === 'asc' ? '3' : '1';
      }

      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();

    };
  }

  reloadLineOfBusinessTable() {
    this.lineOfBusService.load().subscribe(data => {
      this.renderLineOfBusinessTable(data);
    });
  }

  reloadSubLineOfBusinessTable(lineOfBusinessId = null) {
    this.SubLineService.load(null, null, lineOfBusinessId, 1).subscribe(data => {
      this.renderSubLineOfBusinessTable(data);
    });
  }

  reloadSubjectTypeTable(lineOfBusinessId = null, subLineOfBusinessId = null) {
    this.SubjectTypeService.load(null, lineOfBusinessId, subLineOfBusinessId, 1).subscribe(data => {
      this.renderSubjectTypeTable(data);
    });
  }


  // add update delete lineOfBusiness

  saveLineOfBusiness(form) {
    if (form.invalid) {
      return;
    }

    this.lineOfBusinessForm = this.lineOfBusinessForm.selected ? this.lineOfBusinessForm : Object.assign({}, form.value);

    if (this.lineOfBusinessForm.selected) {
      this.AddUpdateUrl = this.lineOfBusService.LineOfApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.lineOfBusService.LineOfApiUrl + 'Create';
    }

    this.http.post(this.AddUpdateUrl, this.lineOfBusinessForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadLineOfBusinessTable();
      this.lineOfBusinessForm = new LineOfBusiness;
      this.submit = false;
      form.resetForm();
    });

  }

  deleteLineOfBusiness(id) {
    this.http.post(this.lineOfBusService.LineOfApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadLineOfBusinessTable();
    });
  }

  updateLineOfBusiness(lineOfBusiness: LineOfBusiness) {
    window.scroll(0, 0);
    this.lineOfBusinessForm = new LineOfBusiness;
    this.lineOfBusinessForm.ID = lineOfBusiness.ID;
    this.lineOfBusinessForm.Name = lineOfBusiness.Name;
    this.lineOfBusinessForm.Name2 = lineOfBusiness.Name2;
    this.lineOfBusinessForm.Code = lineOfBusiness.Code;
    this.lineOfBusinessForm.Status = lineOfBusiness.Status;
    this.lineOfBusinessForm.LineOfBusiness = lineOfBusiness.LineOfBusiness;
    this.lineOfBusinessForm.Module = lineOfBusiness.Module;
    this.lineOfBusinessForm.selected = true;
  }


  // add update delete subLineOfBusiness

  saveSubLineOfBusiness(form) {
    if (form.invalid) { return; }
    this.subLineOfBusinessForm = this.subLineOfBusinessForm.selected ? this.subLineOfBusinessForm : Object.assign({}, form.value);
    if (this.subLineOfBusinessForm.selected) {
      this.AddUpdateUrl = this.SubLineService.SubBusinessApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.SubLineService.SubBusinessApiUrl + 'Create';
    }
    this.http.post(this.AddUpdateUrl, this.subLineOfBusinessForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadSubLineOfBusinessTable(this.lineOfBusinessForm.ID ? this.lineOfBusinessForm.ID : null);
      this.subLineOfBusinessForm = new SubLineOfBusiness;
      this.submit2 = false;
      form.resetForm();
    });

  }

  deleteSubLineOfBusiness(id) {
    this.http.post(this.SubLineService.SubBusinessApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadSubLineOfBusinessTable(this.lineOfBusinessForm.ID ? this.lineOfBusinessForm.ID : null);
    });
  }

  updateSubLineOfBusiness(subLineOfBusiness: SubLineOfBusiness) {
    window.scroll(0, 1000);
    this.subLineOfBusinessForm = new SubLineOfBusiness;
    this.subLineOfBusinessForm.ID = subLineOfBusiness.ID;
    this.subLineOfBusinessForm.Name = subLineOfBusiness.Name;
    this.subLineOfBusinessForm.Name2 = subLineOfBusiness.Name2;
    this.subLineOfBusinessForm.Code = subLineOfBusiness.Code;
    this.subLineOfBusinessForm.LineOfBusniess = subLineOfBusiness.LineOfBusniess;
    this.subLineOfBusinessForm.BasicLineOfBusniess = subLineOfBusiness.BasicLineOfBusniess;
    this.subLineOfBusinessForm.ReinsType = subLineOfBusiness.ReinsType;
    this.subLineOfBusinessForm.Status = subLineOfBusiness.Status;
    this.subLineOfBusinessForm.selected = true;
  }




  // add update delete SubjectType

  saveSubjectType(form) {
    if (form.invalid) { return; }
    this.subjectTypeForm = this.subjectTypeForm.selected ? this.subjectTypeForm : Object.assign({}, form.value);
    if (this.subjectTypeForm.selected) {
      this.AddUpdateUrl = this.SubjectTypeService.sebjectTypeApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.SubjectTypeService.sebjectTypeApiUrl + 'Create';
    }
    this.http.post(this.AddUpdateUrl, this.subjectTypeForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      // tslint:disable-next-line:max-line-length
      this.reloadSubjectTypeTable(this.subLineOfBusinessForm.ID ? this.subLineOfBusinessForm.ID : null, this.subLineOfBusinessForm.ID ? this.subLineOfBusinessForm.ID : null);
      this.subjectTypeForm = new SubjectType;
      form.resetForm();
      this.submit3 = false;
    });
  }

  deleteSubjectType(id) {
    this.http.post(this.SubjectTypeService.sebjectTypeApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      // tslint:disable-next-line:max-line-length
      this.reloadSubjectTypeTable(this.subLineOfBusinessForm.ID ? this.subLineOfBusinessForm.ID : null, this.subLineOfBusinessForm.ID ? this.subLineOfBusinessForm.ID : null);
    });
  }

  updateSubjectType(subjectType: SubjectType) {
    window.scroll(0, 1000);
    this.subjectTypeForm = new SubjectType;
    this.subjectTypeForm.ID = subjectType.ID;
    this.subjectTypeForm.Name = subjectType.Name;
    this.subjectTypeForm.Name2 = subjectType.Name2;
    this.subjectTypeForm.LineOfBusniessID = subjectType.LineOfBusniessID;
    this.subjectTypeForm.SubLineOfBusniessID = subjectType.SubLineOfBusniessID;
    this.subjectTypeForm.Parent = subjectType.Parent;
    this.subjectTypeForm.ExcessPercentage = subjectType.ExcessPercentage;
    this.subjectTypeForm.MinExcessAmount = subjectType.MinExcessAmount;
    this.subjectTypeForm.MaxExcessAmount = subjectType.MaxExcessAmount;
    this.subjectTypeForm.From = subjectType.From;
    this.subjectTypeForm.selected = true;
  }



  loadSubLinesOfBusiness() {
    this.SubLineService.load(null, this.lineOfBusinessForm.ID ? this.lineOfBusinessForm.ID : null, null, 1).subscribe(data => {
      this.subLinesOfBusiness = data;
      this.subLinesOfBusinessDataSource = new MatTableDataSource<SubLineOfBusiness>(this.subLinesOfBusiness);
    });
  }



  export(type, data) {
    /*switch (type) {
     case 'pdf':
       this.coreService.ExportToPdf(data, data);
       break;
     case 'csv':
       this.coreService.ExportToCsv(data, data);
       break;
     case 'excel':
       this.coreService.ExportToExcel(data, data);
       break;
   }*/

  }



  getSubLineOfBusinessName(id: number) {
    if (this.subLinesOfBusiness) {
      for (let index = 0; index < this.subLinesOfBusiness.length; index++) {
        if (this.subLinesOfBusiness[index].ID === id) {
          return this.subLinesOfBusiness[index].Name;
        }
      }
    }
  }


  getLineOfBusinessName(id: number) {
    for (let index = 0; index < this.linesOfBusiness.length; index++) {
      if (this.linesOfBusiness[index].ID === id) {
        return this.linesOfBusiness[index].Name;
      }
    }
  }

  getStatusName(id: number) {
    for (let index = 0; index < this.LockUps.length; index++) {
      if (this.LockUps[index].ID === id) {
        return this.LockUps[index].Name;
      }
    }
  }


  isAllSelected() {
    return this.selection.selected.length === this.linesOfBusinessDataSource.data.length;
  }
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.linesOfBusinessDataSource.data.forEach(row => this.selection.select(row));
  }


  isAllSelected2() {
    return this.selection2.selected.length === this.subLinesOfBusinessDataSource.data.length;
  }
  masterToggle2() {
    this.isAllSelected2() ? this.selection2.clear() : this.subLinesOfBusinessDataSource.data.forEach(row => this.selection2.select(row));
  }


  isAllSelected3() {
    return this.selection3.selected.length === this.subjectTypesDataSource.data.length;
  }
  masterToggle3() {
    this.isAllSelected3() ? this.selection3.clear() : this.subjectTypesDataSource.data.forEach(row => this.selection3.select(row));
  }

  resetForm(form) {
    form.reset();
  }




  deleteSelectedData() {
    const selectedData = [];

    switch (this.extraForm) {
      case '':
        for (let index = 0; index < this.selection.selected.length; index++) {
          selectedData.push(this.selection.selected[index].ID);
        }

        this.http.post(this.lineOfBusService.LineOfApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadLineOfBusinessTable();
        });
        break;
      case 'subLineOfBusiness':
        for (let index = 0; index < this.selection2.selected.length; index++) {
          selectedData.push(this.selection2.selected[index].ID);
        }
        this.http.post(this.SubLineService.SubBusinessApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadSubLineOfBusinessTable();
        });
        break;
      case 'subjectType':
        for (let index = 0; index < this.selection3.selected.length; index++) {
          selectedData.push(this.selection3.selected[index].ID);
        }
        this.http.post(this.SubjectTypeService.sebjectTypeApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadSubjectTypeTable();
        });
        break;
    }

  }






}
