import { MajorCode } from './../../../entities/models/majorCode';
import { DynamicTable } from './../../../entities/Dynamic/dynamicTable';
import { SharedService } from './../../../_services/sharedService.service';
import { ProductDynamicColumn } from './../../../entities/Dynamic/ProductDynamicColumn';
import { ProductDynmicCategory } from './../../../entities/Dynamic/ProductDynmicCategory';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.css']
})
export class DynamicComponentComponent implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('category') category: ProductDynmicCategory;

  childsValue: DynamicTable[];
  childValue: DynamicTable;
  newObject: ProductDynamicColumn;
  constructor(private shareService: SharedService) { }

  ngOnInit() {
    this.childsValue = [];

  }

  saveColumnsDataToTable(category: ProductDynmicCategory) {
    this.resetData(category.Columns, category.OriginalList);
    console.log(category);
    this.shareService.changeColumn(this.childsValue);
  }


  resetData(columns: ProductDynamicColumn[] , dropDownList: ProductDynamicColumn[] ) {

    columns.forEach(element => {
      this.childValue = new DynamicTable();
      this.childValue = this.mapFeilds(this.childValue, element) ;
      if (element.ColumnType === 1) {
        this.childValue.Value = element.ValueDesc;
      }
      if (element.ColumnType === 2) {
        this.childValue.Value = element.ValueAmount;
      }
      if ( element.ColumnType === 3) {
        this.childValue.Value = element.ValueDate;
      }
      element = this.clearFileds(element);
      this.childsValue.push(this.childValue);
    });
    dropDownList.forEach(element => {
      this.childValue = new DynamicTable();
      this.childValue = this.mapFeilds(this.childValue, element) ;
      if (element.ColumnType === 4) {
        this.childValue.Value = element.ValueLockUpID;
        element.ValueLockUpID = null;
      }
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
  clearFileds(filed: ProductDynamicColumn) {
    this.newObject = new ProductDynamicColumn();
    filed.ValueDate = this.newObject.ValueDate;
    filed.ValueAmount = this.newObject.ValueAmount;
    filed.ValueDesc = this.newObject.ValueDesc;
    filed.ValueLockUpID = this.newObject.ValueLockUpID;
    return filed;
  }
}
