import { IEntity } from './../interfaces/IEntity';
import { ProductDynamicColumn } from './ProductDynamicColumn';
export class ProductDynmicCategory implements IEntity {
    selected: boolean;
    Name: string;
    Name2: string;
    LangID: number;
    ID: number;
    CategoryID: number;
    Lable: string;
    Lable2: string;
    Status: number;
    StatusDate: Date;
    CreatedBy: string;
    CreationDate: Date;
    ModifiedBy: string;
    ModificationDate: Date;
    CategoryLevel: number;
    IsMulitRecords: number;
    ProductID: number;
    ProductDetailID: number;
    OrderID: number;
    Dictionary: number;
    LineOfBuisness: number;
    SubLineOfBuisness: number;
    Columns: ProductDynamicColumn[];
    Lists: ProductDynamicColumn[];
    OriginalList: ProductDynamicColumn[];
}
