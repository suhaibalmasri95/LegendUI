import { TableComponent } from './table/table.component';
import { SharedColumn } from './../../../_services/sharedColumn.service';
import { DynamicDatasource } from './../../../entities/Dynamic/dynamicDatasource';
import { MajorCode } from './../../../entities/models/majorCode';
import { DynamicTable } from './../../../entities/Dynamic/dynamicTable';
import { SharedService } from './../../../_services/sharedService.service';
import { ProductDynamicColumn } from './../../../entities/Dynamic/ProductDynamicColumn';
import { ProductDynmicCategory } from './../../../entities/Dynamic/ProductDynmicCategory';
import { Component, OnInit, Input, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.css']
})
export class DynamicComponentComponent implements OnInit , AfterViewInit {

  // tslint:disable-next-line:no-input-rename
  @Input('category') category: ProductDynmicCategory;
  @ViewChildren('tableSelector')  tableSelector: QueryList<TableComponent>;
  meregedArray: ProductDynamicColumn[] = [];
  childsValue: DynamicTable[] = [];
  childValue: DynamicTable;
  newObject: ProductDynamicColumn;
  dataSource: string[];
  dynamicDataSources: any[] = [];
  temp: any[] = [];
  dynamicDataSource: any;
  controlsOn = false;
  updatedIndex: number;
  isUpdate: boolean = false;
  constructor() { }

  ngOnInit() {
   // this.table = new TableComponent();
   console.log('on init', this.tableSelector);
  }

  saveColumnsDataToTable(category: ProductDynmicCategory) {
    this.childsValue = [];
    this.dataSource = ['select'];
    this.meregedArray = [];
    this.dynamicDataSources = [];
    this.resetData(category.Columns, category.OriginalList);
    console.log(category);
   //
    if (this.isUpdate) {
      this.temp[this.updatedIndex] = this.dynamicDataSource;
      this.isUpdate = false;
    } else {
   this.temp.push(this.dynamicDataSource); }

   this.dynamicDataSources = this.temp;
   this.controlsOn = true;
  }


  resetData(columns: ProductDynamicColumn[] , dropDownList: ProductDynamicColumn[] ) {
    this.dynamicDataSource = {};
    this.meregedArray = [...columns , ...dropDownList];
    let i = 1;
    this.meregedArray.forEach(element => {
      this.childValue = new DynamicTable();
      this.childValue = this.mapFeilds(this.childValue, element) ;
      if (!this.dataSource.includes(element.Lable)) {
      this.dataSource.push(element.Lable);
    }
      if (element.ColumnType === 1) {
        this.dynamicDataSource['value' + i] = element.ValueDesc;
        this.childValue.Value = element.ValueDesc;
      }
      if (element.ColumnType === 2) {
        this.dynamicDataSource['value' + i] = element.ValueAmount;
        this.childValue.Value = element.ValueAmount;
      }
      if ( element.ColumnType === 3) {
        this.dynamicDataSource['value' + i] = element.ValueDate;
        this.childValue.Value = element.ValueDate;
      }
      if (element.ColumnType === 4) {
        this.dynamicDataSource['value' + i] = element.ValueLockUpID;
        this.childValue.Value = element.ValueLockUpID;
      }
      this.dynamicDataSource = this.mapToAny(i , this.dynamicDataSource , this.childValue);
      i++;
      element = this.clearFileds(element);
      this.childsValue.push(this.childValue);
    });

  }

  mapFeilds(table: DynamicTable , filed: ProductDynamicColumn ) {
    table.selected = filed.selected ;
    table.Name = filed.Name;
    table.Name2 = filed.Name2;
    table.LangID = filed.LangID;
    table.ID = filed.ID;
    table.Lable = filed.Lable;
    table.Lable2 = filed.Lable2;
    table.Status = filed.Status;
    table.StatusDate = filed.StatusDate;
    table.CreatedBy = filed.CreatedBy;
    table.CreationDate = filed.CreationDate;
    table.ModifiedBy = filed.ModifiedBy;
    table.ModificationDate = filed.ModificationDate;
    table.ColumnType = filed.ColumnType;
    table.LineOfBuisness = filed.LineOfBuisness;
    table.SubLineOfBuisness = filed.SubLineOfBuisness;
    table.LockUpLevel = filed.LockUpLevel;
    table.ProductColumnID = filed.ProductColumnID;
    table.ProductCategoryID = filed.ProductCategoryID;
    table.CategoryID = filed.CategoryID;
    table.ProductID = filed.ProductID;
    table.ProductDetailID = filed.ProductDetailID;
    table.ColumnOrder = filed.ColumnOrder;
    table.Dictionary = filed.Dictionary;
    table.DictionaryColumnID = filed.DictionaryColumnID;
    table.ReferenceTable = filed.ReferenceTable;
    table.WhereCondition = filed.WhereCondition;
    table.UnderWritingColCatID = filed.UnderWritingColCatID;
    table.UnderWritingProductColumnID = filed.UnderWritingProductColumnID;
    table.ValueDate = filed.ValueDate;
    table.ValueAmount = filed.ValueAmount;
    table.ValueDesc = filed.ValueDesc;
    table.ValueLockUpID = filed.ValueLockUpID;
    table.UnderWritingRiskID = filed.UnderWritingRiskID;
    table.UnderWritingDocID = filed.UnderWritingDocID;
    table.ExecludedColumn = filed.ExecludedColumn;
    table.MajorCode = filed.MajorCode;
    table.ChildCounts = filed.ChildCounts;
    return table;
  }

  mapToAny(index: number , table: any , filed: DynamicTable ) {
    table['selected' + index] = filed.selected ;
    table['Name' + index] = filed.Name ;
    table['Name2' + index] = filed.Name2 ;
    table['LangID' + index] = filed.LangID ;
    table['ID' + index] = filed.ID ;
    table['Lable' + index] = filed.Lable;
    table['Lable2' + index] = filed.Lable2;
    table['Status' + index] = filed.Status;
    table['StatusDate' + index] = filed.StatusDate;
    table['CreatedBy' + index] = filed.CreatedBy;
    table['CreationDate' + index] = filed.CreationDate;
    table['ModifiedBy' + index] = filed.ModifiedBy;
    table['ModificationDate' + index] = filed.ModificationDate;
    table['ColumnType' + index] = filed.ColumnType;
    table['LineOfBuisness' + index] = filed.LineOfBuisness;
    table['SubLineOfBuisness' + index] = filed.SubLineOfBuisness;
    table['LockUpLevel' + index] = filed.LockUpLevel;
    table['ProductColumnID' + index] = filed.ProductColumnID;
    table['ProductCategoryID' + index] = filed.ProductCategoryID;
    table['CategoryID' + index] = filed.CategoryID;
    table['ProductID' + index] = filed.ProductID;
    table['ProductDetailID' + index] = filed.ProductDetailID;
    table['ColumnOrder' + index] = filed.ColumnOrder;
    table['Dictionary' + index] = filed.Dictionary;
    table['DictionaryColumnID' + index] = filed.DictionaryColumnID;
    table['ReferenceTable' + index] = filed.ReferenceTable;
    table['WhereCondition' + index] = filed.WhereCondition;
    table['UnderWritingColCatID' + index] = filed.UnderWritingColCatID;
    table['UnderWritingProductColumnID' + index] = filed.UnderWritingProductColumnID;
    table['ValueDate' + index] = filed.ValueDate;
    table['ValueAmount' + index] = filed.ValueAmount;
    table['ValueDesc' + index] = filed.ValueDesc;
    table['ValueLockUpID' + index] = filed.ValueLockUpID;
    table['UnderWritingRiskID' + index] = filed.UnderWritingRiskID;
    table['UnderWritingDocID' + index] = filed.UnderWritingDocID;
    table['ExecludedColumn' + index] = filed.ExecludedColumn;
    table['MajorCode' + index] = filed.MajorCode;
    table['ChildCounts' + index] = filed.ChildCounts;
    return table;
  }
  clearFileds(filed: ProductDynamicColumn) {
    this.newObject = new ProductDynamicColumn();
    filed.ValueDate = this.newObject.ValueDate;
    filed.ValueAmount = this.newObject.ValueAmount;
    filed.ValueDesc = this.newObject.ValueDesc;
    filed.ValueLockUpID = this.newObject.ValueLockUpID;
    return filed;
  }


ngAfterViewInit() {

    // this returns null
  
}
updateChild(index: number) {
  const data = this.dynamicDataSources[index];
  let x = 1;
  this.isUpdate = true;
  this.updatedIndex = index;
  this.meregedArray.forEach(element => {
   this.mapAnyToProductDynamicColumn(x , data , element);
   x++;
  });
}
mapAnyToProductDynamicColumn(index: number , table: any , filed: ProductDynamicColumn ) {
  filed.selected = table['selected' + index];
  filed.Name = table['Name' + index];
  filed.Name2 = table['Name2' + index];
  filed.LangID = table['LangID' + index];
  filed.ID = table['ID' + index];
  filed.Lable = table['Lable' + index];
  filed.Lable2 = table['Lable2' + index];
  filed.Status = table['Status' + index];
  filed.StatusDate = table['StatusDate' + index];
  filed.CreatedBy = table['CreatedBy' + index];
  filed.CreationDate = table['CreationDate' + index];
  filed.ModifiedBy =  table['ModifiedBy' + index];
  filed.ModificationDate = table['ModificationDate' + index];
  filed.ColumnType = table['ColumnType' + index];
  filed.LineOfBuisness =  table['LineOfBuisness' + index];
  filed.SubLineOfBuisness = table['SubLineOfBuisness' + index];
  filed.LockUpLevel = table['LockUpLevel' + index];
  filed.ProductColumnID = table['ProductColumnID' + index];
  filed.ProductCategoryID = table['ProductCategoryID' + index];
  filed.CategoryID = table['CategoryID' + index];
  filed.ProductID = table['ProductID' + index];
  filed.ProductDetailID = table['ProductDetailID' + index];
  filed.ColumnOrder = table['ColumnOrder' + index];
  filed.Dictionary = table['Dictionary' + index];
  filed.DictionaryColumnID = table['DictionaryColumnID' + index];
  filed.ReferenceTable = table['ReferenceTable' + index];
  filed.WhereCondition = table['WhereCondition' + index];
  filed.UnderWritingColCatID = table['UnderWritingColCatID' + index];
  filed.UnderWritingProductColumnID = table['UnderWritingProductColumnID' + index];
  filed.ValueDate = table['ValueDate' + index];
  filed.ValueAmount = table['ValueAmount' + index];
  filed.ValueDesc = table['ValueDesc' + index];
  filed.ValueLockUpID = table['ValueLockUpID' + index];
  filed.UnderWritingRiskID = table['UnderWritingRiskID' + index];
  filed.UnderWritingDocID = table['UnderWritingDocID' + index];
  filed.ExecludedColumn = table['ExecludedColumn' + index];
  filed.MajorCode = table['MajorCode' + index];
  filed.ChildCounts = table['ChildCounts' + index];
    return filed;
  }
}
