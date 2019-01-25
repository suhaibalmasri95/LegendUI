import { IEntity } from '../interfaces/IEntity';

export class ProductColumnValidation implements IEntity {
    selected: boolean;
    Name: string;
    Name2: string;
    LangID: number;
    ID: number;
    Lable: string;
    Lable2: string;
    Status: number;
    DateTime: Date;
    ColumnType: number;
    CategoryID: number;
    RefTableName: string;
    RefMajorCode: string;
    RefColDetailsID: string;
    ProductCategoryID: number;
    ColumnID: number;
    ProductID: number;
    ProductDetailID: number;
    DataType: number;
    LocValidType: number;
    IsMandetory: number;
    MaxValue: number;
    MinValue: number;
    CheckDuplication: number;

}
