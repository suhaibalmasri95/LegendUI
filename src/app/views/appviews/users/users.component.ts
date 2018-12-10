import { CommonService } from './../../../_services/Common.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { User } from '../../../entities/organization/user';
import { LockUp } from '../../../entities/organization/LockUp';
import { Country } from '../../../entities/organization/country';
import { Company } from '../../../entities/organization/Company';
import { CompanyBranch } from '../../../entities/organization/CompanyBranch';
import { Group } from '../../../entities/organization/Group';
import { CountryService } from './../../../_services/_organization/Country.service';
import { CompanyBranchService } from './../../../_services/_organization/CompanyBranch.service';
import { LockUpService } from './../../../_services/_organization/LockUp.service';
import { UserService } from './../../../_services/_organization/User.service';
import { GroupService } from './../../../_services/_organization/Group.service';
import { UserGroup } from '../../../entities/organization/UserGroup';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  extraForm: string;

  userForm: User;
  users: User[];
  groups: Group[];

  LockUps: LockUp[];
  companies: Company[];
  userTypes: LockUp[];
  countries: Country[];
  userGroups: Group[];
  companyBranches: CompanyBranch[];

  submit: boolean;
  AddUpdateUrl: string;

  userTableColumns = ['select', 'ID', 'Username', 'Name', 'Name2', 'Company', 'Country', 'email', 'actions'];
  usersDataSource: MatTableDataSource<User>;

  groupsTableColumns = ['select', 'ID', 'Name'];
  groupsDataSource: MatTableDataSource<Group>;

  userGroupsTableColumns = ['select', 'ID', 'Name'];
  userGroupsDataSource: MatTableDataSource<Group>;


  selection: SelectionModel<User>;
  selection2: SelectionModel<Group>;
  selection3: SelectionModel<Group>;

  snackPosition: MatSnackBarHorizontalPosition;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator') paginator2: MatPaginator;
  @ViewChild('paginator') paginator3: MatPaginator;

  @ViewChild('table', { read: MatSort }) sort: MatSort;
  @ViewChild('table2', { read: MatSort }) sort2: MatSort;
  @ViewChild('table3', { read: MatSort }) sort3: MatSort;

  selectedItems = [];
  dropdownSettings = {};

  constructor(public snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute, private countryService: CountryService,
    private companyBranchService: CompanyBranchService, private userService: UserService,
    private groupService: GroupService, private commonService: CommonService
  ) { }

  ngOnInit() {
    this.selection = new SelectionModel<User>(true, []);
    this.selection2 = new SelectionModel<Group>(true, []);
    this.selection3 = new SelectionModel<Group>(true, []);
    this.snackPosition = 'right';
    this.userForm = new User();
    this.submit = false;

    this.route.data.subscribe(data => {
      this.LockUps = data.lockUp;
      this.userTypes = data.userTypes;
      this.countries = data.country;
      this.companies = data.company;
      // this.groups = data.groups;

      this.renderUserTable(data.users ? data.users : []);
    });


    this.userGroups = [];

    this.selectedItems = [];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'ID',
      textField: 'Name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      allowSearchFilter: true
    };
  }





  applyFilter(filterValue: string) {
    this.usersDataSource.filter = filterValue.trim().toLowerCase();
  }

  changeTab($event) {
    setTimeout(() => {
      switch ($event.index) {
        case 0:
          this.extraForm = '';
          this.renderUserTable(this.users);
          break;
        case 1:
          this.extraForm = 'groups';
          this.reloadGroupsTables(this.userForm.ID ? this.userForm.ID : null);
          break;

      }
    });
  }



  renderUserTable(data) {
    this.users = data;
    this.usersDataSource = new MatTableDataSource<User>(data);
    this.usersDataSource.paginator = this.paginator;
    this.usersDataSource.sort = this.sort;
    this.selection = new SelectionModel<User>(true, []);
    this.usersDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }


  reloadUserTable() {
    this.userService.loadUsers().subscribe(data => {
      this.renderUserTable(data);
    });
  }

  renderGroupsTables(userGroupsData, groupsData) {
    this.groupsDataSource = new MatTableDataSource<Group>(groupsData);
    this.groupsDataSource.paginator = this.paginator2;
    this.groupsDataSource.sort = this.sort2;
    this.selection2 = new SelectionModel<Group>(true, []);
    this.groupsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };

    this.userGroupsDataSource = new MatTableDataSource<Group>(userGroupsData);
    this.userGroupsDataSource.paginator = this.paginator3;
    this.userGroupsDataSource.sort = this.sort3;
    this.selection3 = new SelectionModel<Group>(true, []);
    this.userGroupsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  reloadGroupsTables(userId) {
    if (userId) {
      this.userService.loadUserGroups(userId).subscribe(data => {
        this.userGroups = data.RelatedGroups;
        this.groups = data.UnRelatedGroups;
        this.renderGroupsTables(this.userGroups, this.groups);
      });
    } else {
      this.renderGroupsTables([], []);
    }
  }


  loadCompanyBranches() {
    // tslint:disable-next-line:max-line-length
    this.companyBranchService.loadCopmanyBranches(null, this.userForm.CompanyID ? Number(this.userForm.CompanyID) : null, 1).subscribe(data => {
      this.companyBranches = data;
      if (this.userForm.UserRelations) {
        this.selectedItems = [];
        for (let index = 0; index < this.userForm.UserRelations.length; index++) {
          const element = this.userForm.UserRelations[index];
          for (let index2 = 0; index2 < this.companyBranches.length; index2++) {
            const element2 = this.companyBranches[index2];
            if (element.UserRelationID === element2.ID) {
              this.selectedItems.push({ 'ID': element2.ID, 'Name': element2.Name });
            }
          }
        }
      }
    });
  }

  // add update delete User

  saveUser(form) {
    if (form.invalid) {
      return;
    }
    this.userForm = this.userForm.selected ? this.userForm : Object.assign({}, form.value);
    this.userForm.CreatedBy = 'Admin';

    this.userForm.EffectiveDate = new Date(this.userForm.EffectiveDate);
    this.userForm.ExpiryDate = new Date(this.userForm.ExpiryDate);

    this.userForm.UserRelations = [];
    this.userForm.Branches = [];
    for (let index = 0; index < this.selectedItems.length; index++) {
      const element = this.selectedItems[index];
      this.userForm.Branches.push(element.ID);
    }
    this.userForm.UserRelationID = 1;

    if (this.userForm.selected) {
      this.AddUpdateUrl = this.userService.userApiUrl + 'Update';
    } else {
      this.AddUpdateUrl = this.userService.userApiUrl + 'Create';
    }

    this.http.post(this.AddUpdateUrl, this.userForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadUserTable();
      this.userForm = new User();
      this.submit = false;
      form.resetForm();
    });

  }

  deleteUser(id) {
    this.http.post(this.userService.userApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.userForm = new User();
      this.reloadUserTable();
    });
    /* this.http.request('DELETE', this.userService.userApiUrl + '/DeleteUser?userID=' + id).subscribe(res => {
       this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
       this.reloadUserTable();
     });*/
  }

  updateUser(user: User) {
    window.scroll(0, 0);
    this.userForm = new User;
    this.userForm = user;
    // this.userForm.UserName = user.UserName;
    // this.userForm.Name = user.Name;
    // this.userForm.Name2 = user.Name2;
    this.selectedItems = user.UserRelations;
    this.userForm.EffectiveDate = new Date(this.userForm.EffectiveDate);
    this.userForm.ExpiryDate = new Date(this.userForm.ExpiryDate);
    this.loadCompanyBranches();
    this.userForm.selected = true;
  }

  export(type, data) {
    if (data === 'User') {
      const body = {
        'items': this.usersDataSource.data,
        'FieldName': 'Setup.Category',
        'Type': type,
      };
      this.commonService.Export(body).subscribe(res => {
        window.open(res.FilePath);
      });
    }
  }

  getUserName(id: number) {
    for (let index = 0; index < this.users.length; index++) {
      if (this.users[index].ID === id) {
        return this.users[index].Name;
      }
    }
  }


  isAllSelected() {
    return this.selection.selected.length === this.usersDataSource.data.length;
  }
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.usersDataSource.data.forEach(row => this.selection.select(row));
  }

  isAllSelected2() {
    return this.selection2.selected.length === this.groupsDataSource.data.length;
  }
  masterToggle2() {
    this.isAllSelected2() ? this.selection2.clear() : this.groupsDataSource.data.forEach(row => this.selection2.select(row));
  }

  isAllSelected3() {
    return this.selection3.selected.length === this.userGroupsDataSource.data.length;
  }
  masterToggle3() {
    this.isAllSelected3() ? this.selection3.clear() : this.userGroupsDataSource.data.forEach(row => this.selection3.select(row));
  }


  resetForm(form) {
    form.reset();
  }


  deleteSelectedData() {
    const selectedData = [];

    for (let index = 0; index < this.selection.selected.length; index++) {
      selectedData.push(this.selection.selected[index].ID);
    }
    this.http.post(this.userService.userApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
      this.snackBar.open('deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadUserTable();
    });

  }

  replaceFileName(fileName) {
    return fileName ? fileName.substring(fileName.indexOf('Flags')) : '';
  }

  addGroup() {

    if (!this.selection2.hasValue()) {
      return;
    }
    const ids = [];
    for (let index = 0; index < this.selection2.selected.length; index++) {
      ids.push(this.selection2.selected[index].ID);
    }

    this.http.post(this.userService.userGroupApiUrl + 'create',
      {
        GroupIDs: ids,
        UserID: this.userForm.ID,
        UserName: this.userForm.UserName,
        UserRelationID: 2
      }).subscribe(res => {
        this.snackBar.open('added successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
        this.reloadGroupsTables(this.userForm.ID ? this.userForm.ID : null);
      });

  }


  removeGroup() {
    if (!this.selection3.hasValue()) {
      return;
    }

    const ids = [];

    for (let index = 0; index < this.selection3.selected.length; index++) {
      ids.push(this.selection3.selected[index].UserRelationID);
    }

    this.http.post(this.userService.userGroupApiUrl + 'DeleteMultiple',
      {
        IDs: ids
      }).subscribe(res => {
        this.snackBar.open('removed successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
        this.reloadGroupsTables(this.userForm.ID ? this.userForm.ID : null);
      });

  }


}


