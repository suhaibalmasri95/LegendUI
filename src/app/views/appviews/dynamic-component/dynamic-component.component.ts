import { TableComponent } from './table/table.component';
import { DynamicTable } from './../../../entities/Dynamic/dynamicTable';
import { ProductDynamicColumn } from './../../../entities/Dynamic/ProductDynamicColumn';
import { ProductDynmicCategory } from './../../../entities/Dynamic/ProductDynmicCategory';
import { Component, OnInit, Input, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import * as _ from 'lodash';
@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.css']
})
export class DynamicComponentComponent implements OnInit , AfterViewInit {

  // tslint:disable-next-line:no-input-rename
  @Input('category') category: ProductDynmicCategory;
  // tslint:disable-next-line:no-input-rename
@Input('updateModeForNotMultiRecord')updateModeForNotMultiRecord : boolean;
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
  columnsOnCategory: ProductDynamicColumn[];
  isUpdate = false;
  isDelete = false;
  updateModeForDocument = false;
  TableDataResult: Array<ProductDynamicColumn[]>;
  TableDataRow: ProductDynamicColumn[];
  constructor() { }

  ngOnInit() {
   // this.table = new TableComponent();

   this.TableDataRow = [];
   if (this.category.InsertedData.length > 0) {
     this.updateModeForDocument = true;
    this.updateMode(this.category.InsertedData, this.category.Columns.length);
  }
  if(this.category.Result){
    if(this.category.Result.length > 0)
    this.mapTwoDynamic(this.category.Result);
  }
   console.log('on init', this.tableSelector);
  }

  saveColumnsDataToTable(category: ProductDynmicCategory) {
    if (this.isDelete) {
      this.isDelete = false;
    }
    this.childsValue = [];

    this.dataSource = ['select' , 'action'];

    this.meregedArray = [];
    
    this.resetData(category.Columns);
    console.log(category);
   //
   if (this.updateModeForDocument) {
        this.temp = this.dynamicDataSources;
  } else {
    this.dynamicDataSources = [];
  }
    if (this.isUpdate) {
      this.temp[this.updatedIndex] = this.dynamicDataSource;
      this.isUpdate = false;
    } else {
   this.temp.push(this.dynamicDataSource); }

   this.dynamicDataSources = this.temp;
   category.ResultList = [];
   category.Result = [];

   const myClonedColumns  = _.cloneDeep(category.Columns);
   this.mapDataToResult(category, myClonedColumns, this.dynamicDataSources);
   this.controlsOn = true;
  }

  updateMode(columns: ProductDynamicColumn[] , orginalColumnCount: number) {

    this.dynamicDataSource = {};
    this.dataSource = ['select' , 'action'];
     this.sortArrayUpdateMode(columns);
     let columnCount = columns.length / orginalColumnCount;
     columnCount = Math.ceil(columnCount);
this.columnsOnCategory = [];
     // take every group of columns  depeneds on groups of category
     // take every catgory array as one object
     let count = 0;
     const length = columnCount;
     count = length;
     let j = 0 ;
     let rounds = orginalColumnCount;
     for (let index = 0; index < count; index++) {
        for ( j ; j < rounds; j++) {
          this.columnsOnCategory.push(columns[j]);
        }
        this.sortArrayOnColumnType(this.columnsOnCategory);
        this.resetData(this.columnsOnCategory);
        this.dynamicDataSources.push(this.dynamicDataSource);
        this.columnsOnCategory = [];
        rounds += orginalColumnCount;
     }
}
sortArrayUpdateMode(columns: ProductDynamicColumn[] ) {
  columns.sort(function(a, b) {
    return a.UnderWritingColCatID - b.UnderWritingColCatID;
  });

}

sortArrayOnColumnType(columns: ProductDynamicColumn[] ) {
  columns.sort(function(a, b) {
    return a.ColumnType - b.ColumnType;
  });

}
  resetData(columns: ProductDynamicColumn[] ) {
    this.dynamicDataSource = {};
    let i = 2;
    columns.forEach(element => {
      this.childValue = new DynamicTable();
      this.childValue = this.mapFeilds(this.childValue, element) ;
      this.childValue.UwColID = element.UwColID;
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
        const dateFormat = new Date(element.ValueDate);
        this.childValue.Value = new Date(dateFormat.getFullYear() , dateFormat.getMonth() , dateFormat.getDate());
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
   table['UwColID' + index] =  filed.UwColID ;
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
  if (this.isDelete) {
    this.isDelete = false;
  }
  const data = this.dynamicDataSources[index];
  let x = 2;
  this.isUpdate = true;
  this.updatedIndex = index;
  this.category.Columns.forEach(element => {
   this.mapAnyToProductDynamicColumn(x , data , element);
   x++;
  });
}
mapDataToResult(category: ProductDynmicCategory , columns: ProductDynamicColumn[] , anyArray: any[]) {
  this.TableDataResult = new Array<ProductDynamicColumn[]>();
  const concatArray = columns;
  for (let i = 0 ; i < anyArray.length ; i++) {
    let x = 2;
    concatArray.forEach(element => {
      this.TableDataRow.push(_.cloneDeep(this.mapAnyToProductDynamicColumn(x , anyArray[i] , element)));
      x++;
     });

     this.TableDataResult .push(_.cloneDeep( this.TableDataRow ));
     this.TableDataRow  = [];
  }
  category.Result =  this.TableDataResult ;
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
  filed.UwColID = table['UwColID' + index];
  
    return filed;
  }

  deleteChild(index: number) {
    if (this.dynamicDataSources.length === 1) {
      this.isDelete = true;
      this.dynamicDataSources.splice(index, 1 );
    } else {
      this.dynamicDataSources.splice(index, 1 );
    }

  }
  setCategoryChildData(childs: ProductDynamicColumn[]) {
    this.category.childsData = [];
    this.category.childsData = childs;
  }

  mapTwoDynamic(array: Array<ProductDynamicColumn[]>){
    this.dataSource = ['select' , 'action'];
    array.forEach(element => {
      
      this.resetData(element);
    
      this.dynamicDataSources.push(this.dynamicDataSource);
      
    });
  }
}
