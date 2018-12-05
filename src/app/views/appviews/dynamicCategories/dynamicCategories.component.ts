import { LockUpService } from './../../../_services/_organization/LockUp.service';
import { LockUp } from './../../../entities/organization/LockUp';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSort, MatPaginator, MatTableDataSource, MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Category, Column } from '../../../entities/Setup/Categories';
import { ColumnService } from '../../../_services/_setup/Column.service';
import { CategoryService } from '../../../_services/_setup/Category.service';
import { LineOfBusiness } from '../../../entities/Setup/lineOfBusiness';
import { SubLineOfBusiness } from '../../../entities/Setup/SubLineOfBusiness';

@Component({
  selector: 'app-dynamic-categories',
  templateUrl: './dynamicCategories.component.html',
  styleUrls: ['./dynamicCategories.component.css']
})
export class DynamicCategoriesComponent implements OnInit {
  categoryForm: Category;
  Categories: Category[];
  columnForm: Column;
  columns: Column[];

  submit: boolean;
  submit2: boolean;


  categoryTableColumns = ['select', 'ID', 'Name', 'Name2', 'Label', 'Label2',
    'LineOfBusiness', 'SubLineOfBusiness', 'Level', 'IsMultiRecords', 'actions'];
  categoriesDataSource: MatTableDataSource<Category>;

  columnTableColumns = ['select', 'ID', 'Name', 'Name2', 'Type', 'Category', 'ListReference', 'actions'];
  columnsDataSource: MatTableDataSource<Column>;

  AddUpdateUrl: string;
  selection: SelectionModel<Category>;
  selection2: SelectionModel<Column>;

  extraForm: string;

  snackPosition: MatSnackBarHorizontalPosition;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginator2') paginator2: MatPaginator;

  @ViewChild('table', { read: MatSort }) sort: MatSort;
  @ViewChild('table2', { read: MatSort }) sort2: MatSort;

  LineOfBusinesses: LineOfBusiness[];
  SubLineOfBusinesses: SubLineOfBusiness[];
  Status: LockUp[];
  Levels: LockUp[];
  ColumnTypes: LockUp[];
  columnLockUps: LockUp[];
  minor: LockUp;

  constructor(public snackBar: MatSnackBar, private http: HttpClient, private route: ActivatedRoute,
    private columnService: ColumnService, private columnGroupService: CategoryService, private lockUpService: LockUpService) { }

  ngOnInit() {
    this.extraForm = '';
    this.snackPosition = 'right';

    this.selection = new SelectionModel<Category>(true, []);
    this.selection2 = new SelectionModel<Column>(true, []);
    this.columnLockUps = [];
    this.categoryForm = new Category();
    this.columnForm = new Column();

    this.submit = false;
    this.submit2 = false;

    this.route.data.subscribe(data => {
      this.Status = data.Status;
      this.Levels = data.Levels;
      this.ColumnTypes = data.ColumnTypes;
      this.LineOfBusinesses = data.lineOfBusiness;
      this.SubLineOfBusinesses = data.subLineOfBusiness;
      this.renderCategoryTable(data.category);
    });
    this.minor = new LockUp();

  }

  applyFilter(filterValue: string) {
    switch (this.extraForm) {
      case '':
        this.categoriesDataSource.filter = filterValue.trim().toLowerCase();
        break;
      case 'column':
        this.columnsDataSource.filter = filterValue.trim().toLowerCase();
        break;
    }
  }


  showColumnAreaForm($event) {
    setTimeout(() => {
      switch ($event.index) {
        case 0:
          this.extraForm = '';
          this.renderCategoryTable(this.Categories);
          break;
        case 1:
          this.extraForm = 'column';
          this.reloadColumnTable(this.categoryForm.selected ? this.categoryForm.ID : null);
          break;

      }
    });
  }

  renderCategoryTable(data) {
    this.Categories = data;
    this.categoriesDataSource = new MatTableDataSource<Category>(data);
    this.categoriesDataSource.paginator = this.paginator;
    this.categoriesDataSource.sort = this.sort;
    this.selection = new SelectionModel<Category>(true, []);
    this.categoriesDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();

    };
  }

  renderColumnTable(data) {
    this.columns = data;
    this.columnsDataSource = new MatTableDataSource<Column>(data);
    this.columnsDataSource.paginator = this.paginator2;
    this.columnsDataSource.sort = this.sort2;
    this.selection2 = new SelectionModel<Column>(true, []);
    this.columnsDataSource.sortingDataAccessor = (sortData, sortHeaderId) => {
      if (!sortData[sortHeaderId]) {
        return this.sort.direction === 'asc' ? '3' : '1';
      }
      // tslint:disable-next-line:max-line-length
      return /^\d+$/.test(sortData[sortHeaderId]) ? Number('2' + sortData[sortHeaderId]) : '2' + sortData[sortHeaderId].toString().toLocaleLowerCase();
    };
  }


  reloadCategoryTable() {
    this.columnGroupService.load(null, null, null, null, 1).subscribe(data => {
      this.renderCategoryTable(data);
    });
  }

  reloadColumnTable(categoryId = null) {
    this.columnService.load(null, categoryId, null, null, null, 1).subscribe(data => {
      this.renderColumnTable(data);
    });
  }


  // add update delete category

  saveCategory(form) {
    if (form.invalid) {
      return;
    }
    this.categoryForm = this.categoryForm.selected ? this.categoryForm : Object.assign({}, form.value);
    this.AddUpdateUrl = this.columnGroupService.ApiUrl + (this.categoryForm.selected ? 'Update' : 'Create');
    this.categoryForm.MultiRecord = this.categoryForm.isMultiRecord ? 1 : 0;
    this.http.post(this.AddUpdateUrl, this.categoryForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCategoryTable();
      this.categoryForm = new Category;
      this.submit = false;
      form.resetForm();
    });

  }

  deleteCategory(id) {
    this.http.post(this.columnGroupService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadCategoryTable();
    });
  }

  updateCategory(category: Category) {
    window.scroll(0, 0);
    this.categoryForm = new Category;
    this.categoryForm = category;
    this.categoryForm.isMultiRecord = category.MultiRecord === 1;
    this.columnForm.CategoryID = category.ID;
    this.categoryForm.selected = true;
  }


  // add update delete column

  saveColumn(form) {
    if (form.invalid) {
      return;
    }
    this.columnForm = this.columnForm.selected ? this.columnForm : Object.assign({}, form.value);
    this.AddUpdateUrl = this.columnService.ApiUrl + (this.columnForm.selected ? 'Update' : 'Create');

    this.http.post(this.AddUpdateUrl, this.columnForm).subscribe(res => {
      this.snackBar.open('Saved successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadColumnTable(this.categoryForm.ID ? this.categoryForm.ID : null);
      this.columnForm = new Column;
      this.submit2 = false;
      form.resetForm();
    });

  }

  deleteColumn(id) {
    this.http.post(this.columnService.ApiUrl + 'Delete', { ID: id }).subscribe(res => {
      this.snackBar.open('Deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
      this.reloadColumnTable(this.categoryForm.ID ? this.categoryForm.ID : null);
    });
  }

  updateColumn(column: Column) {
    window.scroll(0, 1000);
    this.columnForm = new Column;
    this.columnForm = column;
    // this.columnForm.Name = column.Name;
    // this.columnForm.Name2 = column.Name2;
    // this.columnForm.CountryID = column.CountryID;
    // //this.columnForm.REFERNCE_NO = column.REFERNCE_NO;
    // this.columnForm.LOC_STATUS = column.LOC_STATUS;
    this.columnForm.selected = true;
    this.checkColumnType(column.ColumnType);
  }


  export(type, data) {
    switch (type) {
      // case 'pdf':
      //   this.coreService.ExportToPdf(data, data);
      //   break;
      // case 'csv':
      //   this.coreService.ExportToCsv(data, data);
      //   break;
      // case 'excel':
      //   this.coreService.ExportToExcel(data, data);
      //   break;
    }

  }

  getCategoryName(id: number) {
    for (let index = 0; index < this.Categories.length; index++) {
      if (this.Categories[index].ID === id) {
        return this.Categories[index].Name;
      }
    }
  }

  getLineOfBusinessesName(id: number) {
    for (let index = 0; index < this.LineOfBusinesses.length; index++) {
      if (this.LineOfBusinesses[index].ID === id) {
        return this.LineOfBusinesses[index].Name;
      }
    }
  }
  getSubLineOfBusinessesName(id: number) {
    for (let index = 0; index < this.SubLineOfBusinesses.length; index++) {
      if (this.SubLineOfBusinesses[index].ID === id) {
        return this.SubLineOfBusinesses[index].Name;
      }
    }
  }
  getTypeName(id: number) {
    for (let index = 0; index < this.ColumnTypes.length; index++) {
      if (this.ColumnTypes[index].MinorCode === id) {
        return this.ColumnTypes[index].Name;
      }
    }
  }
  getSubLevelsName(id: number) {
    for (let index = 0; index < this.Levels.length; index++) {
      if (this.Levels[index].ID === id) {
        return this.Levels[index].Name;
      }
    }
  }
  getColumnLockUpsName(id: any) {
    for (let index = 0; index < this.columnLockUps.length; index++) {
      if (this.columnLockUps[index].ID.toString() === id) {
        return this.columnLockUps[index].Name;
      }
    }
  }


  isAllSelected() {
    return this.selection.selected.length === this.categoriesDataSource.data.length;
  }
  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.categoriesDataSource.data.forEach(row => this.selection.select(row));
  }


  isAllSelected2() {
    return this.selection2.selected.length === this.columnsDataSource.data.length;
  }
  masterToggle2() {
    this.isAllSelected2() ? this.selection2.clear() : this.columnsDataSource.data.forEach(row => this.selection2.select(row));
  }

  checkColumnType(type) {
    for (let index = 0; index < this.ColumnTypes.length; index++) {
      if (this.ColumnTypes[index].MinorCode === type) {
        this.minor = this.ColumnTypes[index];
      }
    }
    if (this.minor.MinorCode === 4) {
      this.lockUpService.LoadLockUpsForQuestionnaire(1).subscribe(res => {
        this.columnLockUps = res;
        this.columnForm.RefMajorCode = this.columnForm.RefMajorCode;
      });
    }
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

        this.http.post(this.columnGroupService.ApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadCategoryTable();
        });
        break;
      case 'column':
        for (let index = 0; index < this.selection2.selected.length; index++) {
          selectedData.push(this.selection2.selected[index].ID);
        }

        this.http.post(this.columnService.ApiUrl + 'DeleteMultiple', { IDs: selectedData }).subscribe(res => {
          this.snackBar.open('deleted successfully', '', { duration: 3000, horizontalPosition: this.snackPosition });
          this.reloadColumnTable(this.categoryForm.selected ? this.categoryForm.ID : null);
        });
        break;
    }

  }






}
