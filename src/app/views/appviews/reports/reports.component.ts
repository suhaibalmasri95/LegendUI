import { CommonService } from './../../../_services/Common.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { ReportsGroup } from '../../../entities/organization/ReportsGroup';
import { Report } from '../../../entities/organization/Report';
import { ReportService } from '../../../_services/_organization/Report.service';
import { ReportsGroupService } from '../../../_services/_organization/ReportGroup.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reportsGroupForm: ReportsGroup;
  reportsGroups: ReportsGroup[];
  reportForm: Report;
  reports: Report[];

  submit: boolean;
  submit2: boolean;

  reportsGroupTableColumns = ['select', 'ID', 'Name', 'Name2', 'OrderBy', 'actions'];
  reportsGroupsDataSource: MatTableDataSource<ReportsGroup>;

  reportTableColumns = ['select', 'ID', 'Code', 'Name', 'Name2', 'Order', 'ReportGroupID', 'actions'];
  reportsDataSource: MatTableDataSource<Report>;

  AddUpdateUrl: string;
  selection: SelectionModel<ReportsGroup>;
  selection2: SelectionModel<Report>;

  extraForm: string;

  snackPosition: MatSnackBarHorizontalPosition;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;

  @ViewChild('table', { read: MatSort }) sort: MatSort;
  @ViewChild('table2', { read: MatSort }) sort2: MatSort;

  constructor(public snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute,
    private reportService: ReportService, private reportGroupService: ReportsGroupService, private commonService: CommonService) { }

  ngOnInit() {
    this.extraForm = '';
    this.snackPosition = 'right';

    this.selection = new SelectionModel<ReportsGroup>(true, []);
    this.selection2 = new SelectionModel<Report>(true, []);

    this.reportsGroupForm = new ReportsGroup();
    this.reportForm = new Report();

    this.submit = false;
    this.submit2 = false;

    this.route.data.subscribe(data => {
      this.reportsGroups = data.reportsGroup;
      this.renderReportsGroupTable(data.reportsGroup);
    });

  }

  applyFilter(filterValue: string) {
    switch (this.extraForm) {
      case '':
        this.reportsGroupsDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'report':
        this.reportsDataSource.filter = filterValue.trim().toLowerCase();
        break;
    }
  }


  showReportAreaForm($event) {
    setTimeout(() => {
      switch ($event.index) {
        case 0:
          this.extraForm = '';
          this.renderReportsGroupTable(this.reportsGroups);
          break;
        case 1:
          this.extraForm = 'report';
          this.reloadReportTable(this.reportsGroupForm.selected ? this.reportsGroupForm.ID : null);
          break;

      }
    });
  }

  renderReportsGroupTable(data) {
    this.reportsGroups = data;
    this.reportsGroupsDataSource = new MatTableDataSource<ReportsGroup>(data);
    this.reportsGroupsDataSource.paginator = this.paginator;
    this.reportsGroupsDataSource.sort = this.sort;
    this.selection = new SelectionModel<ReportsGroup>(true, []);
    this.reportsGroupsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();

    };
  }

  renderReportTable(data) {
    this.reports = data;
    this.reportsDataSource = new MatTableDataSource<Report>(data);
    this.reportsDataSource.paginator = this.paginator2;
    this.reportsDataSource.sort = this.sort2;
    this.selection2 = new SelectionModel<Report>(true, []);
    this.reportsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }


  reloadReportsGroupTable() {
    this.reportGroupService.load().subscribe(data => {
      this.renderReportsGroupTable(data);
    });
  }

  reloadReportTable(reportsGroupId = null) {
    this.reportService.load(reportsGroupId).subscribe(data => {
      this.renderReportTable(data);
    });
  }


  // add update delete reportsGroup

  saveReportsGroup(form) {
    if (form.invalid) {
      return;
    }
    this.reportsGroupForm = this.reportsGroupForm.selected ? this.reportsGroupForm : Object.assign({}, form.value);
    this.AddUpdateUrl = this.reportGroupService.apiUrl + (this.reportsGroupForm.selected ? 'Update' : 'Create');

    this.http.post(this.AddUpdateUrl, this.reportsGroupForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadReportsGroupTable();
      this.reportsGroupForm = new ReportsGroup;
      this.submit = false;
      form.resetForm();
    });

  }

  deleteReportsGroup(id) {
    this.http.post(this.reportGroupService.apiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadReportsGroupTable();
    });
  }

  updateReportsGroup(reportsGroup: ReportsGroup) {
    window.scroll(0, 0);
    this.reportsGroupForm = new ReportsGroup;
    this.reportsGroupForm = reportsGroup;
    // this.reportsGroupForm.Name = reportsGroup.Name;
    // this.reportsGroupForm.Name2 = reportsGroup.Name2;
    // //this.reportsGroupForm.NATIONALITY = reportsGroup.NATIONALITY;
    // this.reportsGroupForm.ST_CUR_CODE = reportsGroup.ST_CUR_CODE;
    // //this.reportsGroupForm.REFERNCE_NO = reportsGroup.REFERNCE_NO;
    // //this.reportsGroupForm.LOC_STATUS = reportsGroup.LOC_STATUS;
    // this.reportsGroupForm.PHONE_CODE = reportsGroup.PHONE_CODE;
    // //this.reportsGroupForm.FLAG = reportsGroup.FLAG;
    this.reportsGroupForm.selected = true;
  }


  // add update delete report

  saveReport(form) {
    if (form.invalid) {
      return;
    }
    this.reportForm = this.reportForm.selected ? this.reportForm : Object.assign({}, form.value);
    this.AddUpdateUrl = this.reportService.apiUrl + (this.reportForm.selected ? 'Update' : 'Create');

    this.http.post(this.AddUpdateUrl, this.reportForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadReportTable(this.reportsGroupForm.ID ? this.reportsGroupForm.ID : null);
      this.reportForm = new Report;
      this.submit2 = false;
      form.resetForm();
    });

  }

  deleteReport(id) {
    this.http.post(this.reportService.apiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadReportTable(this.reportsGroupForm.ID ? this.reportsGroupForm.ID : null);
    });
  }

  updateReport(report: Report) {
    window.scroll(0, 1000);
    this.reportForm = new Report;
    this.reportForm = report;
    // this.reportForm.Name = report.Name;
    // this.reportForm.Name2 = report.Name2;
    // this.reportForm.CountryID = report.CountryID;
    // //this.reportForm.REFERNCE_NO = report.REFERNCE_NO;
    // this.reportForm.LOC_STATUS = report.LOC_STATUS;
    this.reportForm.selected = true;
  }


  export(type, data) {
    if (data === 'reportsGroup') {
      const body = {
        'items': this.reportsGroupsDataSource.data,
        'FieldName': 'Organization.ReportGroup',
        'Type': type,
      };
      this.commonService.Export(body).subscribe(res => {
        window.open(res.FilePath);
      });
    }
    if (data === 'report') {
      const body = {
        'items': this.reportsDataSource.data,
        'FieldName': 'Organization.Report',
        'Type': type,
      };
      this.commonService.Export(body).subscribe(res => {
        window.open(res.FilePath);
      });
    }
  }


  getReportsGroupName(id: number) {
    for (let index = 0; index < this.reportsGroups.length; index++) {
      if (this.reportsGroups[index].ID === id) {
        return this.reportsGroups[index].Name;
      }
    }
  }


  isAllSelected() {
    return this.selection.selected.length === this.reportsGroupsDataSource.data.length;
  }
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.reportsGroupsDataSource.data.forEach(row => this.selection.select(row));
  }


  isAllSelected2() {
    return this.selection2.selected.length === this.reportsDataSource.data.length;
  }
  masterToggle2() {
    this.isAllSelected2() ? this.selection2.clear() : this.reportsDataSource.data.forEach(row => this.selection2.select(row));
  }


  resetForm(form) {
    this.reportsGroupForm = new ReportsGroup();
    this.submit = false;
    form.reset();
  }


  deleteSelectedData() {

    const selectedData = [];

    switch (this.extraForm) {
      case '':
        for (let index = 0; index < this.selection.selected.length; index++) {
          selectedData.push(this.selection.selected[index].ID);
        }

        this.http.post(this.reportGroupService.apiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadReportsGroupTable();
        });
        break;
      case 'report':
        for (let index = 0; index < this.selection2.selected.length; index++) {
          selectedData.push(this.selection2.selected[index].ID);
        }

        this.http.post(this.reportService.apiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadReportTable(this.reportsGroupForm.selected ? this.reportsGroupForm.ID : null);
        });
        break;
    }

  }






}
