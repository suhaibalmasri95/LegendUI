
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Group } from '../../../entities/organization/Group';
import { LockUp } from '../../../entities/organization/LockUp';
import { User } from '../../../entities/organization/user';
import { System } from '../../../entities/models/MenuDetails';
import { Report } from '../../../entities/organization/Report';
import { TreeviewConfig, TreeviewItem } from 'ngx-treeview';
import { UserService } from './../../../_services/_organization/User.service';
import { GroupService } from './../../../_services/_organization/Group.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css'],
  providers: []
})
export class GroupsComponent implements OnInit {
  dropdownEnabled = true;
  items: TreeviewItem[];
  values: number[];
  config = TreeviewConfig.create({
    hasAllCheckBox: true,
    hasFilter: true,
    hasCollapseExpand: true,
    decoupleChildFromParent: false,
    maxHeight: 400
  });

  buttonClasses = [
    'btn-outline-primary',
    'btn-outline-secondary',
    'btn-outline-success',
    'btn-outline-danger',
    'btn-outline-warning',
    'btn-outline-info',
    'btn-outline-light',
    'btn-outline-dark'
  ];
  buttonClass = this.buttonClasses[0];

  groupForm: Group;
  groups: Group[];
  groupUsers: User[];
  users: User[];
  groupActions: System[];
  actions: System[];
  groupReports: Report[];
  reports: Report[];
  LockUps: LockUp[];
  submit: boolean;

  groupTableColumns = ['select', 'ID', 'Name', 'Name2', 'Email', 'PDF', 'Word', 'RTF', 'Excel', 'Excel_Records', 'actions'];
  groupsDataSource: MatTableDataSource<Group>;

  groupUsersTableColumns = ['select', 'ID', 'Name'];
  groupUsersDataSource: MatTableDataSource<User>;

  usersTableColumns = ['select', 'ID', 'Name'];
  usersDataSource: MatTableDataSource<User>;

  actionsTableColumns = ['select', 'ID', 'Name'];
  actionsDataSource: MatTableDataSource<System>;

  groupActionsTableColumns = ['select', 'ID', 'Name'];
  groupActionsDataSource: MatTableDataSource<System>;

  reportsTableColumns = ['select', 'ID', 'Name'];
  reportsDataSource: MatTableDataSource<Report>;

  groupReportsTableColumns = ['select', 'ID', 'Name'];
  groupReportsDataSource: MatTableDataSource<Report>;

  selection: SelectionModel<Group>;
  selection2: SelectionModel<User>;
  selection3: SelectionModel<User>;
  selection4: SelectionModel<System>;
  selection5: SelectionModel<System>;
  selection6: SelectionModel<Report>;
  selection7: SelectionModel<Report>;

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

  AddUpdateUrl: string;
  extraForm: string;
  snackPosition: MatSnackBarHorizontalPosition;

  constructor(public snackBar: MatSnackBar, private http: HttpClient,
    private route: ActivatedRoute, private groupService: GroupService, private userService: UserService ) { }

  ngOnInit() {
    this.extraForm = '';
    this.snackPosition = 'right';

    this.selection = new SelectionModel<Group>(true, []);
    this.selection2 = new SelectionModel<User>(true, []);
    this.selection3 = new SelectionModel<User>(true, []);
    this.selection4 = new SelectionModel<System>(true, []);
    this.selection5 = new SelectionModel<System>(true, []);
    this.selection6 = new SelectionModel<Report>(true, []);
    this.selection7 = new SelectionModel<Report>(true, []);

    this.groupForm = new Group();

    this.submit = false;

    this.route.data.subscribe(data => {
      this.groups = data.group;
      this.LockUps = data.lockUp;
      // this.users = data.lockUp;
      // this.groups = data.groups;
      this.renderGroupTable(data.groups);
    });




  }

  onFilterChange(value: string) {
    console.log('filter:', value);
  }

  applyFilter(filterValue: string) {
    switch (this.extraForm) {
      case '':
        this.groupsDataSource.filter = filterValue.trim().toLowerCase();
        break;
      // case 'city':
      //   this.citiesDataSource.filter = filterValue.trim().toLowerCase();
      //   break;
      // case 'area':
      //   this.areasDataSource.filter = filterValue.trim().toLowerCase();
      //   break;
    }
  }


  changeTab($event) {
    setTimeout(() => {
      switch ($event.index) {
        case 0:
          this.extraForm = '';
          this.groupsDataSource.paginator = this.groupsDataSource.paginator ? this.groupsDataSource.paginator : this.paginator;
          break;
        case 1:
          this.extraForm = 'groups';
          this.reloadUsersTables(this.groupForm.selected ? this.groupForm.ID : null);
          break;
        case 2:
          this.extraForm = 'menus';
          break;
        case 3:
          this.extraForm = 'actions';
          break;
        case 4:
          this.extraForm = 'group';
          break;
      }
    });
  }

  renderGroupTable(data) {
    this.groups = data;
    this.groupsDataSource = new MatTableDataSource<Group>(data);
    this.groupsDataSource.paginator = this.paginator;
    this.groupsDataSource.sort = this.sort;
    this.selection = new SelectionModel<Group>(true, []);
    this.groupsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }

      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();

    };
  }


  reloadUsersTables(groupId) {
    this.userService.loadGroupUsers(groupId).subscribe(data => {
      this.groupUsers = data;
      this.renderUsersTables(this.groupUsers, this.users);
    });
  }


  renderUsersTables(groupUsers, users) {
    this.usersDataSource = new MatTableDataSource<User>(users);
    this.usersDataSource.paginator = this.paginator2;
    this.usersDataSource.sort = this.sort2;
    this.selection2 = new SelectionModel<User>(true, []);
    this.usersDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };

    this.groupUsersDataSource = new MatTableDataSource<User>(groupUsers);
    this.groupUsersDataSource.paginator = this.paginator3;
    this.groupUsersDataSource.sort = this.sort3;
    this.selection3 = new SelectionModel<User>(true, []);
    this.groupUsersDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  renderActionsTables(groupActions, actions) {
    this.actionsDataSource = new MatTableDataSource<System>(actions);
    this.actionsDataSource.paginator = this.paginator4;
    this.actionsDataSource.sort = this.sort4;
    this.selection4 = new SelectionModel<System>(true, []);
    this.actionsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };

    this.groupActionsDataSource = new MatTableDataSource<System>(groupActions);
    this.groupActionsDataSource.paginator = this.paginator5;
    this.groupActionsDataSource.sort = this.sort5;
    this.selection5 = new SelectionModel<System>(true, []);
    this.groupActionsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  renderReportsTables(groupReports, reports) {
    this.reportsDataSource = new MatTableDataSource<Report>(reports);
    this.reportsDataSource.paginator = this.paginator6;
    this.reportsDataSource.sort = this.sort6;
    this.selection6 = new SelectionModel<Report>(true, []);
    this.reportsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };

    this.groupReportsDataSource = new MatTableDataSource<Report>(groupReports);
    this.groupReportsDataSource.paginator = this.paginator7;
    this.groupReportsDataSource.sort = this.sort7;
    this.selection7 = new SelectionModel<Report>(true, []);
    this.groupReportsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  reloadGroupTable() {
    this.groupService.load().subscribe(data => {
      this.renderGroupTable(data);
    });
  }


  // add update delete group

  saveGroup(form) {
    if (form.invalid) {
      return;
    }

    this.groupForm = this.groupForm.selected ? this.groupForm : Object.assign({}, form.value);

    this.AddUpdateUrl = this.groupService.apiUrl + (this.groupForm.selected ? 'Update' : 'Create');

    this.groupForm.IsPdf = this.groupForm.IsPdfTemp ? 1 : 0;
    this.groupForm.IsRef = this.groupForm.IsRefTemp ? 1 : 0;
    this.groupForm.IsWord = this.groupForm.IsWordTemp ? 1 : 0;
    this.groupForm.IsExcel = this.groupForm.IsExcelTemp ? 1 : 0;
    this.groupForm.IsExcelRecord = this.groupForm.IsExcelRecordTemp ? 1 : 0;

    this.http.post(this.AddUpdateUrl, this.groupForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadGroupTable();
      this.groupForm = new Group;
      this.submit = false;
      form.resetForm();
    });

  }

  deleteGroup(id) {
    this.http.post(this.groupService.apiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadGroupTable();
    });

  }

  updateGroup(group: Group) {
    window.scroll(0, 0);
    this.groupForm = new Group;
    this.groupForm = group;

    this.groupForm.IsPdfTemp = group.IsPdf === 1;
    this.groupForm.IsRefTemp = group.IsRef === 1;
    this.groupForm.IsWordTemp = group.IsWord === 1;
    this.groupForm.IsExcelTemp = group.IsExcel === 1;
    this.groupForm.IsExcelRecordTemp = group.IsExcelRecord === 1;
    // this.groupForm.REFERNCE_NO = group.REFERNCE_NO;
    // this.groupForm.LOC_STATUS = group.LOC_STATUS;
    // this.groupForm.PHONE_CODE = group.PHONE_CODE;
    // this.groupForm.FLAG = group.FLAG;
    this.groupForm.selected = true;
  }





  export(type, data) {
    switch (type) {
      case 'pdf':
        //    this.groupService.ExportToPdf(data, data);
        break;
      case 'csv':
        //    this.groupService.ExportToCsv(data, data);
        break;
      case 'excel':
        //   this.groupService.ExportToExcel(data, data);
        break;
    }
  }


  getGroupName(id: number) {
    for (let index = 0; index < this.groups.length; index++) {
      if (this.groups[index].ID === id) {
        return this.groups[index].Name;
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
    return this.selection.selected.length === this.groupsDataSource.data.length;
  }
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.groupsDataSource.data.forEach(row => this.selection.select(row));
  }


  isAllSelected2() {
    return this.selection2.selected.length === this.usersDataSource.data.length;
  }
  masterToggle2() {
    this.isAllSelected2() ? this.selection2.clear() : this.usersDataSource.data.forEach(row => this.selection2.select(row));
  }


  isAllSelected3() {
    return this.selection3.selected.length === this.groupUsersDataSource.data.length;
  }
  masterToggle3() {
    this.isAllSelected3() ? this.selection3.clear() : this.groupUsersDataSource.data.forEach(row => this.selection3.select(row));
  }


  isAllSelected4() {
    return this.selection4.selected.length === this.actionsDataSource.data.length;
  }
  masterToggle4() {
    this.isAllSelected4() ? this.selection4.clear() : this.actionsDataSource.data.forEach(row => this.selection4.select(row));
  }

  isAllSelected5() {
    return this.selection5.selected.length === this.groupActionsDataSource.data.length;
  }
  masterToggle5() {
    this.isAllSelected3() ? this.selection5.clear() : this.groupActionsDataSource.data.forEach(row => this.selection5.select(row));
  }

  isAllSelected6() {
    return this.selection6.selected.length === this.reportsDataSource.data.length;
  }
  masterToggle6() {
    this.isAllSelected6() ? this.selection6.clear() : this.reportsDataSource.data.forEach(row => this.selection6.select(row));
  }

  isAllSelected7() {
    return this.selection7.selected.length === this.groupReportsDataSource.data.length;
  }
  masterToggle7() {
    this.isAllSelected7() ? this.selection7.clear() : this.groupReportsDataSource.data.forEach(row => this.selection7.select(row));
  }
  resetForm(form) {
    form.reset();
  }



  deleteSelectedData() {

    // var selectedData = [];

    // switch (this.extraForm) {
    //   case '':
    //     for (let index = 0; index < this.selection.selected.length; index++)
    //       selectedData.push(this.selection.selected[index].ID)

    //     this.http.post('DELETE', this.groupService.apiUrl + 'DeleteGroups', { body: selectedData }).subscribe(res => {
    //       this.snackBar.open('deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
    //       this.reloadGroupTable();
    //     });

    //     break;

    // }

  }



  addUser() {

    if (!this.selection2.hasValue()) {
      return;
    }
    for (let index = 0; index < this.selection2.selected.length; index++) {
      this.users.push(this.selection2.selected[index]);
    }

    for (let index = 0; index < this.selection2.selected.length; index++) {
      for (let index2 = 0; index2 < this.groupUsers.length; index2++) {
        if (this.selection2.selected[index].ID === this.groupUsers[index2].ID) {
          this.groupUsers.splice(index2, 1);
        }
      }
    }
    this.renderUsersTables(this.groupUsers, this.users);

  }


  removeUser() {
    if (!this.selection3.hasValue()) {
      return;
    }
    for (let index = 0; index < this.selection3.selected.length; index++) {
      this.users.push(this.selection3.selected[index]);
    }

    for (let index = 0; index < this.selection3.selected.length; index++) {
      for (let index2 = 0; index2 < this.users.length; index2++) {
        if (this.selection3.selected[index].ID === this.users[index2].ID) {
          this.users.splice(index2, 1);
        }
      }
    }
    this.renderUsersTables(this.groupUsers, this.users);

  }

  addAction() {

    if (!this.selection4.hasValue()) {
      return;
    }
    for (let index = 0; index < this.selection4.selected.length; index++) {
      this.actions.push(this.selection4.selected[index]);
    }

    for (let index = 0; index < this.selection4.selected.length; index++) {
      for (let index2 = 0; index2 < this.groups.length; index2++) {
        if (this.selection4.selected[index].ID === this.groups[index2].ID) {
          this.groups.splice(index2, 1);
        }
      }
    }
    this.renderActionsTables(this.groupActions, this.actions);

  }


  removeAction() {
    if (!this.selection5.hasValue()) {
      return;
    }
    for (let index = 0; index < this.selection5.selected.length; index++) {
      this.actions.push(this.selection5.selected[index]);
    }

    for (let index = 0; index < this.selection5.selected.length; index++) {
      for (let index2 = 0; index2 < this.groupActions.length; index2++) {
        if (this.selection5.selected[index].ID === this.groupActions[index2].ID) {
          this.groupActions.splice(index2, 1);
        }
      }
    }
    this.renderActionsTables(this.groupActions, this.actions);

  }

  addReport() {

    if (!this.selection6.hasValue()) {
      return;
    }
    for (let index = 0; index < this.selection6.selected.length; index++) {
      this.groupReports.push(this.selection6.selected[index]);
    }

    for (let index = 0; index < this.selection6.selected.length; index++) {
      for (let index2 = 0; index2 < this.reports.length; index2++) {
        if (this.selection6.selected[index].ID === this.reports[index2].ID) {
          this.reports.splice(index2, 1);
        }
      }
    }
    this.renderReportsTables(this.groupReports, this.reports);

  }


  removeReport() {
    if (!this.selection7.hasValue()) {
      return;
    }
    for (let index = 0; index < this.selection7.selected.length; index++) {
      this.reports.push(this.selection7.selected[index]);
    }

    for (let index = 0; index < this.selection7.selected.length; index++) {
      for (let index2 = 0; index2 < this.groupReports.length; index2++) {
        if (this.selection7.selected[index].ID === this.groupReports[index2].ID) {
          this.groupReports.splice(index2, 1);
        }
      }
    }
    this.renderReportsTables(this.groupReports, this.reports);

  }


}
