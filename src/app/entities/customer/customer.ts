import { IEntity } from '../interfaces/IEntity';

export class Customer implements IEntity {
    ID: number;
    Name: string;
    Name2: string;
    Label: string;
    Label2: string;
    LangID: number;
    ModifiedBy: string;
    CreateBy: string;
    LineOfBusniess: number;
    SubLineOfBusniess: number;
    Status: number;
    StatusDate: Date;
    CreationDate: Date;
    ModificationDate: Date;
    CategoryLevel: number;
    isMultiRecord: boolean;
    MultiRecord: number;
    selected: boolean;


}

export class CustomerType implements IEntity {
    ID: number;
    Name: string;
    Name2: string;
    Label: string;
    Label2: string;
    LangID: number;
    ModifiedBy: string;
    CreateBy: string;
    LineOfBusniess: number;
    SubLineOfBusniess: number;
    Status: number;
    StatusDate: Date;
    CreationDate: Date;
    ModificationDate: Date;
    ColumnType: number;
    CategoryID: number;
    RefTableName: string;
    RefMajorCode: string;
    RefColDetailsID: string;
    selected: boolean;
}
export class CustomerContact implements IEntity {
    ID: number;
    Name: string;
    Name2: string;
    Label: string;
    Label2: string;
    LangID: number;
    ModifiedBy: string;
    CreateBy: string;
    LineOfBusniess: number;
    SubLineOfBusniess: number;
    Status: number;
    StatusDate: Date;
    CreationDate: Date;
    ModificationDate: Date;
    ColumnType: number;
    CategoryID: number;
    RefTableName: string;
    RefMajorCode: string;
    RefColDetailsID: string;
    selected: boolean;
}
export class ProviderLicense implements IEntity {
    ID: number;
    Name: string;
    Name2: string;
    Label: string;
    Label2: string;
    LangID: number;
    ModifiedBy: string;
    CreateBy: string;
    LineOfBusniess: number;
    SubLineOfBusniess: number;
    Status: number;
    StatusDate: Date;
    CreationDate: Date;
    ModificationDate: Date;
    ColumnType: number;
    CategoryID: number;
    RefTableName: string;
    RefMajorCode: string;
    RefColDetailsID: string;
    selected: boolean;
}
