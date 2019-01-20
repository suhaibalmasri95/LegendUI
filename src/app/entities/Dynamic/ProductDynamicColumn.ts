import { LockUp } from './../organization/LockUp';
import { IEntity } from './../interfaces/IEntity';
export class ProductDynamicColumn implements IEntity {
    selected: boolean;
    Name: string;
    Name2: string;
    LangID: number;
    ID: number;
    Lable: string;
    Lable2: string;
    Status: number;
    StatusDate: Date;
    CreatedBy: string;
    CreationDate: Date;
    ModifiedBy: string;
    ModificationDate: Date;
    ColumnType: number;
    LineOfBuisness: number;
    SubLineOfBuisness: number;
    LockUpLevel: number;
    ProductColumnID: number;
    ProductCategoryID: number;
    CategoryID: number;
    ProductID: number;
    ProductDetailID: number;
    ColumnOrder: number;
    Dictionary: number;
    DictionaryColumnID: number;
    ReferenceTable: string;
    WhereCondition: string;
    UnderWritingColCatID: number;
    UnderWritingProductColumnID: number;
    ValueDate: Date;
    ValueAmount: number;
    ValueDesc: string;
    ValueLockUpID: number;
    UnderWritingRiskID: number;
    UnderWritingDocID: number;
    ExecludedColumn: number;
    MajorCode: number;
    LockUps: LockUp[];
    ChildCounts: number;
    milesecond: number;
    UwColID: number;
    childsData: ProductDynamicColumn[];
    ParentID: number;
    OrginalLockUp: LockUp[];
}
