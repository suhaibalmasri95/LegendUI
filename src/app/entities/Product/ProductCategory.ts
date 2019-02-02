import { IEntity } from '../interfaces/IEntity';

export class ProductCategory implements IEntity {
    selected: boolean;
    ID: number;
    Name: string;
    Name2: string;
    LangID: number;
    Lable: string;
    Lable2: string;
    LineOfBusniess: number;
    SubLineOfBusniess: number;
    Status: number;
    StatusDate: Date;
    CreateBy: string;
    CreationDate: Date;
    ModifiedBy: string;
    ModificationDate: Date;
    CategoryLevel: number;
    MultiRecord: number;
    CategoryID: number;
    ProductID: number;
    ProductDetailID: number;
    Order: number;
    DictionaryID: number;
    
}
