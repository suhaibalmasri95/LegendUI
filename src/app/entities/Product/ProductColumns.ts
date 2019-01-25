import { IEntity } from '../interfaces/IEntity';

export class ProductColumns implements IEntity {
    selected: boolean;
    Name: string;
    Name2: string;
    LangID: number;
    ID: number;
    Lable: string;
    Lable2: string;
    Status: number;
    StatusDate: Date;
    ColumnType: number;
    LineOfBusniess: number;
    SubLineOfBusniess: number;
    CreateBy: string;
    CreationDate: Date;
    ModifiedBy: string;
    ModificationDate: Date;
    CategoryID: number;
    RefTableName: string;
    RefMajorCode: string;
    RefColDetailsID: string;
    ProductCategoryID: number;
    PrdColumnID: number;
    ColumnID: number;
    ProductID: number;
    ProductDetailID: number;
    Order: number;
    DictionaryID: number;
    DictionaryColumnID: number;
    LocLevel: number;
    WhereCondition: string;
    RefTable: string;
}
