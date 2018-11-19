
import { Component, OnInit, ViewChild } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { System } from '../../../entities/models/MenuDetails';
import { MenuDetailsService } from '../../../_services/_organization/MenuDetails.service';

@Component({
  selector: 'app-menu-details',
  templateUrl: 'menuDetails.component.html'
})

export class MenuDetailsComponent implements OnInit {
  systemForm: System;
  systems: System[];

  moduleForm: System;
  modules: System[];

  subModuleForm: System;
  subModules: System[];

  pageForm: System;
  pages: System[];

  actionForm: System;
  actions: System[];

  submit: boolean;
  submit2: boolean;
  submit3: boolean;
  submit4: boolean;
  submit5: boolean;

  systemTableColumns = ['select', 'ID', 'Name', 'Name2', 'Order', 'Url', 'actions'];
  systemsDataSource: MatTableDataSource<System>;

  moduleTableColumns = ['select', 'ID', 'Name', 'Name2', 'Order', 'System', 'actions'];
  modulesDataSource: MatTableDataSource<System>;

  subModuleTableColumns = ['select', 'ID', 'Name', 'Name2', 'Order', 'System', 'Module', 'actions'];
  subModulesDataSource: MatTableDataSource<System>;

  pageTableColumns = ['select', 'ID', 'Name', 'Name2', 'Order', 'System', 'Module', 'subModule', 'actions'];
  pagesDataSource: MatTableDataSource<System>;

  actionTableColumns = ['select', 'ID', 'Name', 'Name2', 'Order', 'System', 'Module', 'subModule', 'page', 'actions'];
  actionsDataSource: MatTableDataSource<System>;

  AddUpdateUrl: string;
  selection: SelectionModel<System>;
  selection2: SelectionModel<System>;
  selection3: SelectionModel<System>;
  selection4: SelectionModel<System>;
  selection5: SelectionModel<System>;

  uploader: FileUploader;
  extraForm: string;

  snackPosition: MatSnackBarHorizontalPosition;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;
  @ViewChild('paginator3') paginator3: MatPaginator;
  @ViewChild('paginator4') paginator4: MatPaginator;
  @ViewChild('paginator5') paginator5: MatPaginator;

  @ViewChild('table', { read: MatSort }) sort: MatSort;
  @ViewChild('table2', { read: MatSort }) sort2: MatSort;
  @ViewChild('table3', { read: MatSort }) sort3: MatSort;
  @ViewChild('table4', { read: MatSort }) sort4: MatSort;
  @ViewChild('table5', { read: MatSort }) sort5: MatSort;


  constructor(public snackBar: MatSnackBar, private http: HttpClient,
    private route: ActivatedRoute, private menuDetailsService: MenuDetailsService) { }

  ngOnInit() {
    this.extraForm = '';
    this.snackPosition = 'right';

    this.selection = new SelectionModel<System>(true, []);
    this.selection2 = new SelectionModel<System>(true, []);
    this.selection3 = new SelectionModel<System>(true, []);
    this.selection4 = new SelectionModel<System>(true, []);
    this.selection5 = new SelectionModel<System>(true, []);

    this.systemForm = new System();
    this.moduleForm = new System();
    this.subModuleForm = new System();
    this.pageForm = new System();
    this.actionForm = new System();

    this.submit = false;
    this.submit2 = false;
    this.submit3 = false;
    this.submit4 = false;
    this.submit5 = false;

    this.modules = [];
    this.subModules = [];
    this.pages = [];

    this.route.data.subscribe(data => {
      this.systems = data.systems;
      this.renderSystemTable(data.systems);
    });

  }

  applyFilter(filterValue: string) {
    switch (this.extraForm) {
      case '':
        this.systemsDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'module':
        this.modulesDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'subModule':
        this.subModulesDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'page':
        this.pagesDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'action':
        this.actionsDataSource.filter = filterValue.trim().toLowerCase();
        break;
    }
  }


  changeTab($event) {
    setTimeout(() => {
      switch ($event.index) {
        case 0:
          this.extraForm = '';
          this.renderSystemTable(this.systems);
          break;
        case 1:
          this.extraForm = 'module';
          this.reloadModuleTable(this.systemForm.ID ? this.systemForm.SubMenuID : null);
          break;
        case 2:
          this.extraForm = 'subModule';
          if (this.modules.length === 0) {
            this.reloadModuleTable(this.systemForm.ID ? this.systemForm.SubMenuID : null);
          }
          this.reloadSubModuleTable(this.moduleForm.ID ? this.moduleForm.SubMenuID : null);

          break;
        case 3:
          this.extraForm = 'page';
          if (this.modules.length === 0) {
            this.reloadModuleTable(null);
          }
          if (this.subModules.length === 0) {
            this.reloadSubModuleTable(null);
          }
          this.reloadPageTable(this.subModuleForm.ID ? this.subModuleForm.SubMenuID : null);
          break;
        case 4:
          this.extraForm = 'action';
          if (this.modules.length === 0) {
            this.reloadModuleTable(null);
          }
          if (this.subModules.length === 0) {
            this.reloadSubModuleTable(null);
          }
          if (this.pages.length === 0) {
            this.reloadPageTable(null);
          }
          this.reloadActionTable(this.pageForm.ID ? this.pageForm.SubMenuID : null);
          break;
      }
    });
  }

  renderSystemTable(data) {
    this.systems = data;
    this.systemsDataSource = new MatTableDataSource<System>(data);
    this.systemsDataSource.paginator = this.paginator;
    this.systemsDataSource.sort = this.sort;
    this.selection = new SelectionModel<System>(true, []);
    this.systemsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }

  renderModuleTable(data) {
    this.modules = data;
    this.modulesDataSource = new MatTableDataSource<System>(data);
    this.modulesDataSource.paginator = this.paginator2;
    this.modulesDataSource.sort = this.sort2;
    this.selection2 = new SelectionModel<System>(true, []);
    this.modulesDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();

    };
  }
  renderSubModuleTable(data) {
    this.subModules = data;
    this.subModulesDataSource = new MatTableDataSource<System>(data);
    this.subModulesDataSource.paginator = this.paginator3;
    this.subModulesDataSource.sort = this.sort3;
    this.selection3 = new SelectionModel<System>(true, []);
    this.subModulesDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();

    };
  }

  renderPageTable(data) {
    this.pages = data;
    this.pagesDataSource = new MatTableDataSource<System>(data);
    this.pagesDataSource.paginator = this.paginator4;
    this.pagesDataSource.sort = this.sort4;
    this.selection4 = new SelectionModel<System>(true, []);
    this.pagesDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();

    };
  }

  renderActionTable(data) {
    this.actions = data;
    this.actionsDataSource = new MatTableDataSource<System>(data);
    this.actionsDataSource.paginator = this.paginator5;
    this.actionsDataSource.sort = this.sort5;
    this.selection5 = new SelectionModel<System>(true, []);
    this.actionsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();

    };
  }

  reloadSystemTable() {
    this.menuDetailsService.load(1).subscribe(data => {
      this.renderSystemTable(data);
    });
  }

  reloadModuleTable(SubMenuID) {
    this.menuDetailsService.load(2, SubMenuID).subscribe(data => {
      this.renderModuleTable(data);
    });
  }

  reloadSubModuleTable(SubMenuID = null) {
    this.menuDetailsService.load(3, SubMenuID).subscribe(data => {
      this.renderSubModuleTable(data);
    });
  }

  reloadPageTable(SubMenuID = null) {
    this.menuDetailsService.load(4, SubMenuID).subscribe(data => {
      this.renderPageTable(data);
    });
  }

  reloadActionTable(SubMenuID = null) {
    this.menuDetailsService.load(5, SubMenuID).subscribe(data => {
      this.renderActionTable(data);
    });
  }



  // add update delete system

  saveSystem(form) {
    if (form.invalid) {
      return;
    }

    this.systemForm = this.systemForm.selected ? this.systemForm : Object.assign({}, form.value);
    this.AddUpdateUrl = this.menuDetailsService.apiUrl + (this.systemForm.selected ? 'Update' : 'Create');
    this.systemForm.Type = 1;
    this.systemForm.SubMenuID = 0;
    this.http.post(this.AddUpdateUrl, this.systemForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadSystemTable();
      this.systemForm = new System;
      this.submit = false;
      form.resetForm();
    });

  }

  deleteSystem(id) {
    this.http.post(this.menuDetailsService.apiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadSystemTable();
    });
  }

  updateSystem(system: System) {
    window.scroll(0, 0);
    this.systemForm = new System;
    this.systemForm = system;
    // this.systemForm.Name = system.Name;
    // this.systemForm.Name2 = system.Name2;
    // this.systemForm.REFERNCE_NO = system.REFERNCE_NO;
    // this.systemForm.LOC_STATUS = system.LOC_STATUS;
    this.systemForm.selected = true;
  }


  // add update delete module

  saveModule(form) {
    if (form.invalid) { return; }
    this.moduleForm = this.moduleForm.selected ? this.moduleForm : Object.assign({}, form.value);
    this.AddUpdateUrl = this.menuDetailsService.apiUrl + (this.moduleForm.selected ? 'Update' : 'Create');
    this.moduleForm.Type = 2;
    this.http.post(this.AddUpdateUrl, this.moduleForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadModuleTable(this.systemForm.ID ? this.systemForm.ID : null);
      this.moduleForm = new System;
      this.submit2 = false;
      form.resetForm();
    });

  }

  updateModule(module: System) {
    window.scroll(0, 1000);
    this.moduleForm = new System;
    this.moduleForm = module;
    // this.moduleForm.Name = module.Name;
    // this.moduleForm.Name2 = module.Name2;
    // this.moduleForm.ST_CNT_ID = module.ST_CNT_ID;
    // this.moduleForm.REFERNCE_NO = module.REFERNCE_NO;
    // this.moduleForm.LOC_STATUS = module.LOC_STATUS;
    this.moduleForm.selected = true;
  }




  // add update delete SubModule

  saveSubModule(form) {
    if (form.invalid) { return; }

    this.subModuleForm = this.subModuleForm.selected ? this.subModuleForm : Object.assign({}, form.value);
    this.AddUpdateUrl = this.menuDetailsService.apiUrl + (this.subModuleForm.selected ? 'Update' : 'Create');
    this.subModuleForm.Type = 3;
    this.http.post(this.AddUpdateUrl, this.subModuleForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadModuleTable(this.moduleForm.ID ? this.moduleForm.ID : null);
      this.subModuleForm = new System;
      form.resetForm();
      this.submit3 = false;
    });
  }



  updateSubModule(subModule: System) {
    window.scroll(0, 1000);
    this.subModuleForm = new System;
    this.subModuleForm = subModule;
    // this.subModuleForm.Name = subModule.Name;
    // this.subModuleForm.Name2 = subModule.Name2;
    // this.subModuleForm.ST_CTY_ID = subModule.ST_CTY_ID;
    // this.subModuleForm.ST_CNT_ID = subModule.ST_CNT_ID;
    // this.subModuleForm.REFERNCE_NO = subModule.REFERNCE_NO;
    // this.subModuleForm.LOC_STATUS = subModule.LOC_STATUS;
    this.subModuleForm.selected = true;
  }

  // add update delete SubModule

  savePage(form) {
    if (form.invalid) { return; }

    this.pageForm = this.pageForm.selected ? this.pageForm : Object.assign({}, form.value);
    this.AddUpdateUrl = this.menuDetailsService.apiUrl + (this.pageForm.selected ? 'Update' : 'Create');
    this.pageForm.Type = 4;
    this.http.post(this.AddUpdateUrl, this.pageForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadPageTable(this.subModuleForm.ID ? this.subModuleForm.ID : null);
      this.pageForm = new System;
      form.resetForm();
      this.submit4 = false;
    });
  }



  updatePage(page: System) {
    window.scroll(0, 100);
    this.pageForm = new System;
    this.pageForm = page;
    // this.pageForm.Name = page.Name;
    // this.pageForm.Name2 = page.Name2;
    // this.pageForm.ST_CTY_ID = page.ST_CTY_ID;
    // this.pageForm.ST_CNT_ID = page.ST_CNT_ID;
    // this.pageForm.REFERNCE_NO = page.REFERNCE_NO;
    // this.pageForm.LOC_STATUS = page.LOC_STATUS;
    this.pageForm.selected = true;
  }


  // add update delete SubModule

  saveAction(form) {
    if (form.invalid) { return; }

    this.actionForm = this.actionForm.selected ? this.actionForm : Object.assign({}, form.value);
    this.AddUpdateUrl = this.menuDetailsService.apiUrl + (this.actionForm.selected ? 'Update' : 'Create');
    this.actionForm.Type = 5;
    this.http.post(this.AddUpdateUrl, this.actionForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadActionTable(this.pageForm.ID ? this.pageForm.ID : null);
      this.actionForm = new System;
      form.resetForm();
      this.submit5 = false;
    });
  }


  updateAction(action: System) {
    window.scroll(0, 1000);
    this.actionForm = new System;
    this.actionForm = action;
    // this.actionForm.Name = action.Name;
    // this.actionForm.Name2 = action.Name2;
    // this.actionForm.ST_CTY_ID = action.ST_CTY_ID;
    // this.actionForm.ST_CNT_ID = action.ST_CNT_ID;
    // this.actionForm.REFERNCE_NO = action.REFERNCE_NO;
    // this.actionForm.LOC_STATUS = action.LOC_STATUS;
    this.actionForm.selected = true;
  }


  loadModules(systemId) {
    this.menuDetailsService.load(2, systemId).subscribe(data => {
      this.modules = data;
    });
  }

  loadSubModules(moduleId) {
    this.menuDetailsService.load(3, moduleId).subscribe(data => {
      this.subModules = data;
    });
  }

  loadPages(pageId) {
    this.menuDetailsService.load(4, pageId).subscribe(data => {
      this.pages = data;
    });
  }


  export(type, data) {
    // switch (type) {
    //   case 'pdf':
    //     this.menuDetailsService.ExportToPdf(data, data);
    //     break;
    //   case 'csv':
    //     this.menuDetailsService.ExportToCsv(data, data);
    //     break;
    //   case 'excel':
    //     this.menuDetailsService.ExportToExcel(data, data);
    //     break;
    // }

  }

  getSystemName(id: number, type: number) {
    let tempSystem: System;
    tempSystem = new System;

    for (let index = 0; index < this.systems.length; index++) {
      if (this.systems[index].ID === id) {
        tempSystem = this.systems[index]; break;
      }
    }

    for (let index = 0; index < this.modules.length; index++) {
      if (this.modules[index].ID === id) {
        tempSystem = this.modules[index]; break;
      }
    }

    for (let index = 0; index < this.subModules.length; index++) {
      if (this.subModules[index].ID === id) {
        tempSystem = this.subModules[index]; break;
      }
    }

    for (let index = 0; index < this.pages.length; index++) {
      if (this.pages[index].ID === id) {
        tempSystem = this.pages[index]; break;
      }
    }

    if (type === tempSystem.Type) {
      return tempSystem;
    } else if (type > 0) {
      return this.getSystemName(tempSystem.SubMenuID, type - 1);
    } else {
      return { ID: null, Name: '-' };
    }
  }

  isAllSelected() {
    return this.selection.selected.length === this.systemsDataSource.data.length;
  }
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.systemsDataSource.data.forEach(row => this.selection.select(row));
  }


  isAllSelected2() {
    return this.selection2.selected.length === this.modulesDataSource.data.length;
  }
  masterToggle2() {
    this.isAllSelected2() ? this.selection2.clear() : this.modulesDataSource.data.forEach(row => this.selection2.select(row));
  }

  isAllSelected3() {
    return this.selection3.selected.length === this.subModulesDataSource.data.length;
  }
  masterToggle3() {
    this.isAllSelected3() ? this.selection3.clear() : this.subModulesDataSource.data.forEach(row => this.selection3.select(row));
  }

  isAllSelected4() {
    return this.selection4.selected.length === this.pagesDataSource.data.length;
  }
  masterToggle4() {
    this.isAllSelected4() ? this.selection4.clear() : this.pagesDataSource.data.forEach(row => this.selection4.select(row));
  }

  isAllSelected5() {
    return this.selection5.selected.length === this.actionsDataSource.data.length;
  }
  masterToggle5() {
    this.isAllSelected5() ? this.selection5.clear() : this.actionsDataSource.data.forEach(row => this.selection5.select(row));
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

        this.http.post(this.menuDetailsService.apiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadSystemTable();
        });
        break;
      case 'module':
        for (let index = 0; index < this.selection2.selected.length; index++) {
          selectedData.push(this.selection2.selected[index].ID);
        }

        this.http.post(this.menuDetailsService.apiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadModuleTable(this.systemForm.ID ? this.systemForm.SubMenuID : null);
        });
        break;
      case 'subModule':
        for (let index = 0; index < this.selection3.selected.length; index++) {
          selectedData.push(this.selection3.selected[index].ID);
        }

        this.http.post(this.menuDetailsService.apiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadSubModuleTable(this.moduleForm.ID ? this.moduleForm.SubMenuID : null);
        });
        break;
      case 'page':
        for (let index = 0; index < this.selection4.selected.length; index++) {
          selectedData.push(this.selection4.selected[index].ID);
        }

        this.http.post(this.menuDetailsService.apiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadPageTable(this.subModuleForm.ID ? this.subModuleForm.SubMenuID : null);
        });
        break;
      case 'action':
        for (let index = 0; index < this.selection5.selected.length; index++) {
          selectedData.push(this.selection5.selected[index].ID);
        }

        this.http.post(this.menuDetailsService.apiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadActionTable(this.pageForm.ID ? this.pageForm.SubMenuID : null);
        });
        break;
    }

  }






}
