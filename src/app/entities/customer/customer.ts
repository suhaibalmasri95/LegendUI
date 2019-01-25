import { IEntity } from '../interfaces/IEntity';

export class Customer implements IEntity {
    Name: string;
    Name2: string;
    LangID: number;
    ID: number;
    CustomerNo: string;
    LockUpTitle: number;
    IndOrComp: number;
    CommName: string;
    PhoneCode: string;
    Phone: string;
    Mobile: string;
    Fax: string;
    Email: string;
    Website: string;
    Address: string;
    LockUpLanguage: number;
    LockUpSecotor: number;
    CityID: number;
    StatusDate: Date;
    LockUpGender: number;
    BirthDate: Date;
    ReferenceNo: string;
    RefEffectiveDate: Date;
    RefExpiryDate: Date;
    LockUpTaxType: number;
    TaxNo: string;
    StartDate: Date;
    Iban: string;
    BankID: number;
    BankBranchID: number;
    Status: number;
    StatusNotes: string;
    CreatedBy: string;
    CreationDate: Date;
    ModifiedBy: string;
    ModificationDate: Date;
    CompanyID: number;
    CurrencyCode: string;
    CountryCode: number;
    AreaID: number;
    PoBox: string;
    PostalCode: string;
    Nationality: number;
    IsVip: number;
    XCoordinates: string;
    YCoordinates: string;
    Logo: string;
    CustomerType: number;
    selected: boolean;
    ShareType: number;
    AddUpdate: boolean;


}

export class CustomerType implements IEntity {
    selected: boolean;
    CreatedBy: string;
    CreationDate: Date;
    ModifiedBy: string;
    ModificationDate: Date;
    Name: string;
    Name2: string;
    LangID: number;
    ID: number;
    CustomerID: number;
    LocCustomerType: number;
    FinGlID: number;
}
export class CustomerContact implements IEntity {
    selected: boolean;
    CreatedBy: string;
    CreationDate: Date;
    ModifiedBy: string;
    ModificationDate: Date;
    Name: string;
    Name2: string;
    LangID: number;
    ID: number;
    CustomerID: number;
    LocCustomerDept: number;
    LineOfBusiness: number;
    Phone: string;
    Mobile: string;
    PhoneCode: string;
    Email: string;
}
export class ProviderLicense implements IEntity {
    ID: number;
    Name: string;
    Name2: string;
    Lable: string;
    Lable2: string;
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
